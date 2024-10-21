import * as dayjs from "dayjs";
import { toJSON, toString } from "../utils";
import {sailings, getWhiteHour, getBlackHour} from "../utils/sailings";

/**
 * 获取对象在每个item的orders数组中，根据time和duration属性计算最晚开始时间后的位置下标
 * @param {Object} obj - 包含time和duration属性的对象
 * @param {Array} arr - 包含item的数组，每个item中有一个orders数组
 * @returns {Array} - 每个item的orders数组中，根据最晚开始时间排序后的下标
 */
export function getOrderPositions(obj, arr) {
  const result = [];
  arr.forEach((item) => {
    const { orders: orderList = [] } = item;
    let orders = toJSON(orderList);
    // 计算每小时的产量
    let hourNums = item.mold.halfDayNums * 2 / 24
    // 初始化新订单信息
    /** 版产量/24 得到每小时的产量，再用订单总数/每小时产量，得到需要多少个小时*/
    const duration = (obj.nums / hourNums)?.toFixed(3);
    // 计算新订单的最晚开始时间
    obj.latestStartTime = dayjs(obj.deliveryTime)
        .subtract(parseFloat(duration), 'hour').subtract(2,'day')
        .valueOf();
    // 如果该机器没有订单，则直接返回
    if (orders?.length === 0 || !orders) {
      result.push({
        mechineId: item.id,
        index: -1,
        order:null
      });
      return;
    }
    // 找交付时间小于该订单的最晚开始时间的订单
    let index = orders.findLastIndex(
      (order) => order?.deliveryTime < obj.latestStartTime,
    );

    // 如果没找到，可能是在第一位插入，也可能是没有合适位置插入
    if (index === -1) {
      // 第一个位置插入
      if (obj.deliveryTime < orders[0].latestStartTime) {
        result.push({
          mechineId: item.id,
          index: -1,
          order:null
        });
        return;
      }else{
        // 没有合适位置插入
        return;
      }
    }else{
      // 找到最后一个订单交付时间小于该订单的最晚开始时间
      if (
          orders[index + 1] == undefined ||
          obj.deliveryTime < orders[index + 1].latestStartTime
      ) {
        // 找到最后一个订单的最晚开始时间大于该订单的交付时间的阿位置
        result.push({
          mechineId: item.id,
          index: index,
          order: orders[index],
        });
      } else {
        // 没找到后一个订单的最晚开始时间大于该订单的交付时间的位置
        return;
      }
    }
  });
  return result;
}

/** 查看当前订单是否适合分配到机器中 */
export function assignNewOrderToMachines(newOrder, machines) {
  let msg = "执行成功";
  let targetMachine: any = [];
  let position: any = {};
  // 找到所有生产这类产品的机器
  let allTargetMachines = machines?.filter((machine) => machine.type.indexOf(newOrder?.type) > -1);
  console.log('newOrder:', newOrder);
  console.log("====>machines", machines);
  console.log('allTargetMachines:', allTargetMachines);
  // 如果没有相同模具的机器，并且生产这类产品的机器也没有合适位置插入该订单
  if (allTargetMachines.length === 0) {
    msg = "执行失败，未找到对应产品类型的机器。"
  }else{
    // 需要更换模具，则将更换模具的时间算入订单执行时间，交付时间向前提1.5小时
    // 正常优先级，如果有相同模具的机器，则选择最早开始，如果没有则选择最晚结束的订单后
    if (newOrder.priority == 2) {
      // 找到生产这类产品，模具相同的机器
      let moldTargetMachines = allTargetMachines.filter(
          (machine) => machine.mold.templateNo === newOrder.requireMold,
      );
      // console.log('moldTargetMachines:', moldTargetMachines);
      if (moldTargetMachines.length > 0) {
        let positions = getOrderPositions(newOrder, moldTargetMachines);
        // 选择最早开始的机器。
        position = positions.sort((a, b) => a.deliveryTime - b.deliveryTime)[0];
      }
      // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器  需要更换模具
      if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
        newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf().valueOf();
        //选择最晚开始的机器
        let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
          return item.order && item.order.isWhite;
        });
        position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
      }
    }
    // 最低优先级,计算出最晚结束的订单位置，在后面插入
    if (newOrder.priority == 3) {
      // 找到生产这类产品，模具相同的机器
      let moldTargetMachines = allTargetMachines.filter(
          (machine) => machine.mold.templateNo === newOrder.requireMold,
      );
      // 如果moldTargetMachines>0 说明有相同模具的机器
      // 最低优先级，在有相同模具的机器内选最晚开始的位置
      if (moldTargetMachines.length > 0) {
        let positions = getOrderPositions(newOrder, moldTargetMachines);
        position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
      }
      // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器  需要更换模具
      if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
        // 最低优先级，没有相同模具的机器，就在生产这类产品的机器中选择最晚开始的机器
        newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf();
        let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
          return item.order && item.order.isWhite;
        });
        position = positions.sort((a, b) => b.deliveryTime - a.deliveryTime)[0];
      }
    }
    // 最高优先级，将所有合适位置订单的交付时间进行排序，取最早结束的订单位置插入  需要更换模具
    if (newOrder.priority == 1) {
      newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf();
      let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
        return item.order && item.order.isWhite;
      });
      position = positions.sort((a, b) => a.deliveryTime - b.deliveryTime)[0];
    }
    // console.log('目标机器和位置：', position);
    // 插入订单到目标机器的订单列表
    targetMachine = allTargetMachines.find(
        (machine) => machine.id === position?.mechineId,
    );
  }
  console.log('targetMachine:', targetMachine);
  console.log('newOrder:', newOrder);
  if(!targetMachine){
    msg = "执行失败，未找到合适位置。";
  }
  return {
    code: 1,
    msg,
    data: {
      machine: targetMachine,
      position,
    }
  };
}
/** 将新订单插入到指定机器的对应位置 */
export const insertOrderToMachine = ({machine, position, newOrder }) => {
  let orders = machine?.orders && machine.orders?.length > 0
    ? machine.orders.splice(position?.index + 1, 0, newOrder)
    : machine.orders = [newOrder];
  // 计算机器中排队的每个订单的最晚开始时间和结束时间
  let hourNums = machine.mold.halfDayNums * 2 / 24

  let endTime = 0;
  // 计算机器中排队的每个订单的最晚开始时间和结束时间
  machine.orders = orders?.map((order) => {
    const latestStartTime = dayjs(order.deliveryTime)
        .subtract(parseFloat((order.nums / hourNums)?.toFixed(3)), 'hour').subtract(2,'day')
        .valueOf();
    const duration = (order.nums / hourNums)?.toFixed(3);
    // 上一个订单的结束时间是当前订单的开始时间
    const startTime = endTime!=0?endTime:dayjs(order.createdAt).valueOf();
    // 计算出当前订单的结束时间
    endTime = dayjs(startTime).add(parseFloat(duration),"hour").valueOf()
    return {
      ...order,
      latestStartTime,
      startTime,
      endTime,
      duration,
      isWhite:(dayjs(startTime).get("hour") > getBlackHour() && dayjs(startTime).get("hour") < getWhiteHour() )
    }
  });
  // 遍历orders，计算出每个订单得开始时间
  return machine;
};
