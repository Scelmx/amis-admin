import dayjs from 'dayjs';
class Order {
  id;
  creationTime;
  materialInfo;
  deliveryTime;
  rawMaterialType;
  quantity;
  constructor(
    id,
    creationTime,
    deliveryTime,
    materialInfo,
    rawMaterialType,
    quantity,
  ) {
    this.id = id; // 订单ID
    this.creationTime = creationTime; // 创建时间
    this.deliveryTime = deliveryTime; // 交付时间
    this.materialInfo = materialInfo; // 物料信息
    this.rawMaterialType = rawMaterialType; // 原料类型
    this.quantity = quantity; // 数量
  }
}

const machines = [
  {
    id: 1,
    type: 'A,B',
    mode: 20,
    dayNums: 180,
    orders: [
      new Order(
        1,
        new Date('2024-06-08').valueOf(),
        new Date('2024-06-12').valueOf(),
        '皮碗',
        '皮碗',
        800,
      ),
    ],
  },
  {
    id: 2,
    type: 'A,C',
    mode: 24,
    dayNums: 150,
    orders: [
      new Order(
        2,
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-15').valueOf(),
        'Y型圈',
        'Y型圈',
        200,
      ),
    ],
  },
  {
    id: 3,
    type: 'A,C',
    mode: 30,
    dayNums: 160,
    orders: [
      new Order(
        3,
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-13').valueOf(),
        'Y型圈',
        'Y型圈',
        800,
      ),
    ],
  },
  {
    id: 4,
    type: 'A,B',
    mode: 18,
    dayNums: 180,
    orders: [
      new Order(
        4,
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-18').valueOf(),
        'O型圈',
        'O型圈',
        2000,
      ),
    ],
  },
].map((item) => ({
  ...item,
  addOrder(order) {
    this.orders.push(order);
  },
}));

/**
 * 获取对象在每个item的orders数组中，根据time和duration属性计算最晚开始时间后的位置下标
 * @param {Object} obj - 包含time和duration属性的对象
 * @param {Array} arr - 包含item的数组，每个item中有一个orders数组
 * @returns {Array} - 每个item的orders数组中，根据最晚开始时间排序后的下标
 */
function getOrderPositions(obj, arr) {
  const result = [];
  const { time, quantity } = obj;

  arr.forEach((item) => {
    /** 每台机器的生产能力/每天 */
    const nums = item.mode * item.dayNums * 2;
    const duration = parseFloat(quantity / nums).toFixed(1);
    const latestStartTime = dayjs(time)
      .subtract(duration + 2, 'day')
      .valueOf();
    const { orders } = item;

    // 计算每个订单的最晚开始时间和结束时间
    const ordersWithTimes = orders.map((order) => {
      const startTime = dayjs(order.deliveryTime)
        .subtract(duration + 2, 'day')
        .valueOf();
      return {
        ...order,
        latestStartTime: startTime,
      };
    });

    // 按照最晚开始时间排序
    const sortedOrders = ordersWithTimes.sort(
      (a, b) => a.latestStartTime - b.latestStartTime,
    );

    // 找到obj.latestStartTime在排序后的orders数组中的位置，并检查是否会冲突
    let index = sortedOrders.findIndex(
      (order) => order.latestStartTime >= latestStartTime,
    );

    // 如果找不到合适的位置，说明latestStartTime比所有的都大，应该放在最后
    if (index === -1) {
      index = sortedOrders.length;
    }

    // 检查插入后是否会导致冲突
    let conflict = false;
    if (
      index > 0 &&
      latestStartTime <
        dayjs(sortedOrders[index - 1].deliveryTime)
          .subtract(2, 'day')
          .valueOf()
    ) {
      conflict = true;
    }
    if (
      index < sortedOrders.length &&
      time > sortedOrders[index].latestStartTime
    ) {
      conflict = true;
    }

    // 如果冲突，找下一个不冲突的位置
    while (conflict && index < sortedOrders.length) {
      index++;
      conflict = false;
      if (
        index < sortedOrders.length &&
        time > sortedOrders[index].latestStartTime
      ) {
        conflict = true;
      }
    }

    // 将最终位置添加到结果数组
    result.push(index);
  });

  return result;
}
/** 查看当前订单是否适合分配到机器中 */
function assignNewOrderToMachines(newOrder, machines) {
  // 找到适合的机器
  let targetMachines = machines.filter((machine) => {
    return (
      (newOrder.materialInfo === '皮碗' &&
        newOrder.rawType === '皮碗' &&
        machine.type.indexOf('A') > -1) ||
      (newOrder.materialInfo === 'O型圈' &&
        newOrder.rawType === 'O型圈' &&
        machine.type.indexOf('B') > -1) ||
      (newOrder.materialInfo === 'Y型圈' &&
        newOrder.rawType === 'Y型圈' &&
        machine.type.indexOf('C') > -1)
    );
  });

  // 优先级2：仅匹配物料信息的机器
  if (targetMachines.length === 0) {
    targetMachines = machines.filter((machine) => {
      return (
        (newOrder.materialInfo === '皮碗' && machine.type.indexOf('A') > -1) ||
        (newOrder.materialInfo === 'O型圈' && machine.type.indexOf('B') > -1) ||
        (newOrder.materialInfo === 'Y型圈' && machine.type.indexOf('C') > -1)
      );
    });
  }

  const list = getOrderPositions(newOrder, targetMachines || machines);

  console.log(list, targetMachines, 'ccc');

  // 处理找不到合适的机器情况
  if (targetMachines.length === 0) {
    console.log('No suitable machine found for this order.');
    return;
  }

  // 插入订单到目标机器的订单列表
  [targetMachines[0]].forEach((machine) => {
    let inserted = false;
    for (let i = 0; i < machine.orders.length; i++) {
      if (newOrder.deliveryTime < machine.orders[i].deliveryTime) {
        machine.orders.splice(i, 0, newOrder);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      machine.addOrder(newOrder);
    }
  });
}

console.log('start');
// 分配订单到机器
assignNewOrderToMachines(
  new Order(
    5,
    new Date('2024-06-05').valueOf(),
    new Date('2024-06-12').valueOf(),
    'O型圈',
    '硅胶',
    1000,
  ),
  machines,
);

// 输出分配结果
machines.forEach((machine) => {
  console.log(`Machine ${machine.id} (${machine.type}) has orders:`);
  machine.orders.forEach((order) => {
    console.log(`  Order ${order.id}`);
  });
});
