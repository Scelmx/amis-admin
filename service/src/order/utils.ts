import * as dayjs from "dayjs";
import { toJSON, toString } from "../utils";

/**
 * 获取对象在每个item的orders数组中，根据time和duration属性计算最晚开始时间后的位置下标
 * @param {Object} obj - 包含time和duration属性的对象
 * @param {Array} arr - 包含item的数组，每个item中有一个orders数组
 * @returns {Array} - 每个item的orders数组中，根据最晚开始时间排序后的下标
 */
export function getOrderPositions(obj, arr) {
  const result = [];
  const { deliveryAt :deliveryTime, nums } = obj;
  let conflict = false;

  arr.forEach((item) => {
    /** 每台机器的生产能力/每天 */
    const nums = item.mode * item.dayNums * 2;
    const duration = (nums / nums)?.toFixed(1);
    // 计算新订单的最晚开始时间
    const latestStartTime = dayjs(deliveryTime)
      .subtract(parseFloat(duration) + 2, 'day')
      .valueOf();
    const { orders: orderList = [] } = item;
    let orders = toJSON(orderList);
    // 如果订单列表长度为0
    if (orders?.length === 0 || !orders) {
      result.push({
        mechineId: item.id,
        index: -1,
        deliveryTime: new Date().valueOf(),
      });
      return;
    }

    // 计算机器中排队的每个订单的最晚开始时间和结束时间
    const ordersWithTimes = orders?.map((order) => {
      const startTime = dayjs(order.deliveryTime)
        .subtract(parseFloat(duration) + 2, 'day')
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
      (order) => order?.deliveryTime < latestStartTime,
    );

    // 如果没找到，说明列表中的交付大于该订单的最晚开始时间
    if (index === -1) {
      // 其中可能该订单的交付时间，都大于列表中的最晚开始时间，反向查
      if (deliveryTime < sortedOrders[0].latestStartTime) {
        result.push({
          mechineId: item.id,
          index: -1,
          deliveryTime: new Date().valueOf(),
        });
        return;
      }
      if (index === -1) {
        return;
      }
    }
    // 如果有合适位置，则判断其后面订单的最晚开始时间是否大于新增订单的交付时间
    // 如果是最后位index+1为空
    if (
      sortedOrders[index + 1] == undefined ||
      deliveryTime < sortedOrders[index + 1].latestStartTime
    ) {
      result.push({
        mechineId: item.id,
        index: index,
        deliveryTime: sortedOrders[index].deliveryTime,
      });
    } else {
      return;
    }
  });
  return result;
}
/** 查看当前订单是否适合分配到机器中 */
export function assignNewOrderToMachines(newOrder, machines) {
  let targetMachines = [];
  let targetMachine: any = [];
  let position: any = {};
  // 找到所有生产这类产品的机器
  let allTargetMachines = machines?.filter((machine) => machine.type.indexOf(newOrder?.productType) > -1);
  console.log('newOrder:', newOrder);
  console.log("====>machines", machines);
  console.log('allTargetMachines:', allTargetMachines);
  // 如果没有相同模具的机器，并且生产这类产品的机器也没有合适位置插入该订单
  if (allTargetMachines.length === 0) {
    console.log('No suitable machine found for this order.');
    return undefined;
  }

  // 正常优先级，如果有相同模具的机器，则选择最早开始，如果没有则选择最晚结束的订单后
  if (newOrder.priority == 2) {
    // 找到生产这类产品，模具相同的机器
    let moldTargetMachines = allTargetMachines.filter(
      (machine) => machine.mold === newOrder.requireMold,
    );
    console.log('moldTargetMachines:', moldTargetMachines);
    // 如果moldTargetMachines>0 说明有相同模具的机器
    if (moldTargetMachines.length > 0) {
      // targetMachines.push(...moldTargetMachines)
      // 正常优先级，如果有相同模具的机器，则选择最早开始的机器。
      let positions = getOrderPositions(newOrder, moldTargetMachines);
      position = positions.sort((a, b) => a.deliveryTime - b.deliveryTime)[0];
    }
    // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器
    if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
      // targetMachines.push(...allTargetMachines)
      // 如果没有相同模具的机器，则在生产这类产品的机器中选择最晚开始的机器
      let positions = getOrderPositions(newOrder, allTargetMachines);
      position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
    }
  }
  // 最低优先级,计算出最晚结束的订单位置，在后面插入
  if (newOrder.priority == 3) {
    // 找到生产这类产品，模具相同的机器
    let moldTargetMachines = allTargetMachines.filter(
      (machine) => machine.mold === newOrder.requireMold,
    );
    // 如果moldTargetMachines>0 说明有相同模具的机器
    // 最低优先级，在有相同模具的机器内选最晚开始的位置
    if (moldTargetMachines.length > 0) {
      // targetMachines.push(...moldTargetMachines)
      let positions = getOrderPositions(newOrder, moldTargetMachines);
      position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
    }
    // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器
    if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
      // targetMachines.push(...allTargetMachines)
      // 最低优先级，没有相同模具的机器，就在生产这类产品的机器中选择最晚开始的机器
      let positions = getOrderPositions(newOrder, allTargetMachines);
      position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
    }
  }
  // 最高优先级，将所有合适位置订单的交付时间进行排序，取最早结束的订单位置插入
  if (newOrder.priority == 1) {
    let positions = getOrderPositions(newOrder, allTargetMachines);
    position = positions.sort((a, b) => a.deliveryTime - b.deliveryTime)[0];
  }

  console.log('目标机器和位置：', position);
  // const list = getOrderPositions(newOrder, targetMachines || machines);
  // console.log("合适位置：",list)

  // 插入订单到目标机器的订单列表
  targetMachine = allTargetMachines.find(
    (machine) => machine.id === position?.mechineId,
  );
  console.log('targetMachine:', targetMachine);
  console.log('newOrder:', newOrder);
  return {
    machine: targetMachine,
    position,
  };
}

/** 将新订单插入到指定机器的对应位置 */
export const insertOrderToMachine = ({machine, position, newOrder }) => {
  machine.orders = toString(machine?.orders && machine.orders?.length > 0 
    ? machine.orders.splice(position?.index + 1, 0, newOrder.id) 
    : machine.orders = [newOrder?.id]);
  return machine;
};