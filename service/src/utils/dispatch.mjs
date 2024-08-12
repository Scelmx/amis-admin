import dayjs from 'dayjs';

class Order {
  id;
  productType;
  creationTime;
  materialInfo;
  deliveryTime;
  rawMaterialType;
  quantity;
  requireMold;
  priority;
  constructor(
    id,
    productType,
    creationTime,
    deliveryTime,
    materialInfo,
    rawMaterialType,
    quantity,
    requireMold,
    priority,
  ) {
    this.id = id; // 订单ID
    this.productType = productType; // 产品类型
    this.creationTime = creationTime; // 创建时间
    this.deliveryTime = deliveryTime; // 交付时间
    this.materialInfo = materialInfo; // 物料信息
    this.rawMaterialType = rawMaterialType; // 原料类型
    this.quantity = quantity; // 数量
    this.requireMold = requireMold; //所需模具
    this.priority = priority; //优先级
  }
}

const machines = [
  {
    id: 4,
    type: 'O型圈/垫片,工业膜8寸',
    mode: 400,
    dayNums: 150,
    mold:"YY-151",
    orders: [
      new Order(
        1,
        "O型圈",
        new Date('2024-06-08').valueOf(),
        new Date('2024-06-12').valueOf(),
        'O型圈',
        '塑料',
        800,
          "YY-151",
          1,

      ),
      new Order(
          5,
          "O型圈",
          new Date('2024-07-08').valueOf(),
          new Date('2024-07-12').valueOf(),
          'O型圈',
          '塑料',
          400,
          "YY-151",
          5,
      ),
    ],
  },
  {
    id: 7,
    type: '密封圈,工业膜4寸',
    mode: 42,
    dayNums: 150,
    mold:"YY-144",
    orders: [
      new Order(
        2,
        "密封圈",
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-15').valueOf(),
        '工业膜密封圈',
        '塑料',
        200,
          "YY-144",
          1,
      ),
      new Order(
          6,
          "密封圈",
          new Date('2024-08-02').valueOf(),
          new Date('2024-09-15').valueOf(),
          '工业膜密封圈',
          '塑料',
          400,
          "YY-144",
          1,
      ),
    ],
  },
  {
    id: 6,
    type: 'O型圈/垫片,工业膜8寸',
    mode: 16,
    dayNums: 150,
    mold:"YY-015",
    orders: [
      new Order(
        3,
        "工业膜",
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-13').valueOf(),
        '工业膜密封圈',
        '塑料',
        800,
          "YY-015",
          6,
      ),
    ],
  },
  {
    id: 2,
    type: '密封圈',
    mode: 42,
    dayNums: 150,
    mold:"YY-028",
    orders: [
      new Order(
        4,
        "密封圈",
        new Date('2024-06-02').valueOf(),
        new Date('2024-06-18').valueOf(),
        'O型圈',
        '塑料',
        2000,
          "YY-028",
          7,
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
  const { deliveryTime, quantity } = obj;
  let conflict = false;

  arr.forEach((item) => {

    /** 每台机器的生产能力/每天 */
    const nums = item.mode * item.dayNums * 2;
    const duration = parseFloat(quantity / nums).toFixed(1);
    // 计算新订单的最晚开始时间
    const latestStartTime = dayjs(deliveryTime)
      .subtract(duration + 2, 'day')
      .valueOf();
    const { orders } = item;

    // 如果订单列表长度为0
    if(orders.length === 0) {
      result.push({
        mechineId:item.id,
        index:-1,
        deliveryTime:new Date().valueOf(),
      })
      return;
    }

    // 计算机器中排队的每个订单的最晚开始时间和结束时间
    const ordersWithTimes = orders.map((order) => {
      const startTime = dayjs(order.deliveryTime)
        .subtract(duration + 2, 'day')
        .valueOf();
      return {
        ...order,
        latestStartTime: startTime,
      };
    });

    // 机器中排队的队列按照最晚开始时间排序
    const sortedOrders = ordersWithTimes.sort(
      (a, b) => a.latestStartTime - b.latestStartTime,
    );

    // 找到最后一个订单交付时间小于新增订单最晚开始时间的索引,正向查
    let index = sortedOrders.findLastIndex(
        (order) => order.deliveryTime < latestStartTime,
    )

    // 如果没找到，说明列表中的交付大于该订单的最晚开始时间
    if(index === -1) {
      // 其中可能该订单的交付时间，都大于列表中的最晚开始时间，反向查
      if(deliveryTime < sortedOrders[0].latestStartTime) {
        result.push({
          mechineId:item.id,
          index:-1,
          deliveryTime:new Date().valueOf(),
        })
        return;
      }
      if(index === -1) {
        return;
      }
    }
    // 如果有合适位置，则判断其后面订单的最晚开始时间是否大于新增订单的交付时间
    // 如果是最后位index+1为空
    if(sortedOrders[index+1] == undefined || deliveryTime < sortedOrders[index+1].latestStartTime) {
      result.push({
        mechineId:item.id,
        index:index,
        deliveryTime:sortedOrders[index].deliveryTime,
      })
    }else{
      return;
    }
  });
  return result;
}
/** 查看当前订单是否适合分配到机器中 */
function assignNewOrderToMachines(newOrder, machines) {
  let targetMachines = [];
  let targetMachine = [];
  let position = {}
  // 找到所有生产这类产品的机器
  let allTargetMachines = machines.filter((machine) => {
    return (
        machine.type.indexOf(newOrder.productType) > -1
    );
  });
  // 如果没有相同模具的机器，并且生产这类产品的机器也没有合适位置插入该订单
  if (allTargetMachines.length === 0) {
    console.log('No suitable machine found for this order.');
    return;
  }

  // 正常优先级，如果有相同模具的机器，则选择最早开始，如果没有则选择最晚结束的订单后
  if(newOrder.priority === 2 ){
    // 找到生产这类产品，模具相同的机器
    let moldTargetMachines = allTargetMachines.filter(machine => machine.mold === newOrder.requireMold)
    console.log('moldTargetMachines:', moldTargetMachines)
    // 如果moldTargetMachines>0 说明有相同模具的机器
    if(moldTargetMachines.length > 0){
      // targetMachines.push(...moldTargetMachines)
      // 正常优先级，如果有相同模具的机器，则选择最早开始的机器。
      let positions = getOrderPositions(newOrder, moldTargetMachines);
      position = positions.sort((a,b) => a.deliveryTime - b.deliveryTime)[0]
    }
    // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器
    if(moldTargetMachines.length <= 0 && allTargetMachines.length > 0){
      // targetMachines.push(...allTargetMachines)
      // 如果没有相同模具的机器，则在生产这类产品的机器中选择最晚开始的机器
      let positions = getOrderPositions(newOrder, allTargetMachines);
      position = positions.sort((a,b) => b.deliveryTime - a.deliveryTime)[0]
    }
  }
  // 最低优先级,计算出最晚结束的订单位置，在后面插入
  if(newOrder.priority === 3){
    // 找到生产这类产品，模具相同的机器
    let moldTargetMachines = allTargetMachines.filter(machine => machine.mold === newOrder.requireMold)
    // 如果moldTargetMachines>0 说明有相同模具的机器
    // 最低优先级，在有相同模具的机器内选最晚开始的位置
    if(moldTargetMachines.length > 0){
      // targetMachines.push(...moldTargetMachines)
      let positions = getOrderPositions(newOrder, moldTargetMachines);
      position = positions.sort((a,b) => b.deliveryTime - a.deliveryTime)[0]
    }
    // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器
    if(moldTargetMachines.length <= 0 && allTargetMachines.length > 0){
      // targetMachines.push(...allTargetMachines)
      // 最低优先级，没有相同模具的机器，就在生产这类产品的机器中选择最晚开始的机器
      let positions = getOrderPositions(newOrder, allTargetMachines);
      position = positions.sort((a,b) => b.deliveryTime - a.deliveryTime)[0]
    }
  }
  // 最高优先级，将所有合适位置订单的交付时间进行排序，取最早结束的订单位置插入
  if(newOrder.priority === 1 ){
    let positions = getOrderPositions(newOrder, allTargetMachines);
    position = positions.sort((a,b) => a.deliveryTime - b.deliveryTime)[0]
  }

  console.log('目标机器和位置：',position)
  // const list = getOrderPositions(newOrder, targetMachines || machines);
  // console.log("合适位置：",list)

  // 插入订单到目标机器的订单列表
  targetMachine = allTargetMachines.find(machine => machine.id === position.mechineId)
  console.log('targetMachine:', targetMachine)
  console.log('newOrder:', newOrder)
  targetMachine.orders.splice(position.index+1, 0, newOrder)
}

console.log('start');
// 分配订单到机器
assignNewOrderToMachines(
    new Order(
        10,
        "密封圈",
        new Date('2024-06-20').valueOf(),
        new Date('2024-06-25').valueOf(),
        '工业膜密封圈',
        '塑料',
        100,
        "YY-144",
        3
        ),
  machines,
);

// 输出分配结果
machines.forEach((machine,index) => {
  console.log(`Machine ${machine.id} (${machine.type}) has orders:`);
  machine.orders.forEach((order) => {
    console.log(`  Order ${order.id}`);
  });
});
