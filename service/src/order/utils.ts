import * as dayjs from "dayjs";
import { toJSON, toString } from "../utils";
import {sailings, getWhiteHour, getBlackHour} from "../utils/sailings";
import { startWith } from "rxjs";

/**
 * 获取对象在每个item的orders数组中，根据time和duration属性计算最晚开始时间后的位置下标
 * @param {Object} obj - 包含time和duration属性的对象
 * @param {Array} arr - 包含item的数组，每个item中有一个orders数组
 * @returns {Array} - 每个item的orders数组中，根据最晚开始时间排序后的下标
 */
export function getOrderPositions(obj, arr) {
  const result = [];
  let index =[];
  arr.forEach((item) => {
    const { orders: orderList = [] } = item;
    let orders = toJSON(orderList);
    // 计算每小时的产量
    let hourNums = item.mold.halfDayNums * 2 / 24
    // 初始化新订单信息
    /** 版产量/24 得到每小时的产量，再用订单总数/每小时产量，得到需要多少个小时*/
    obj.durationTime = parseFloat((obj.nums / hourNums)?.toFixed(3));

    // 如果需要更换模具，则将订单的持续时间延长1.5小时
    if(obj.isChangeMold){
        obj.durationTime = obj.durationTime + 1.5
    }

    // 计算新订单的最晚开始时间
    obj.latestStartTime = dayjs(obj.deliveryAt)
        .subtract(obj.durationTime, 'hour').subtract(2,'day')
        .valueOf();

    // 首位插入订单是否满足
    if (!orders[0] || dayjs().add(obj.durationTime).valueOf() < parseInt(orders[0].latestStartTime)) {
      index.push(-1);
    }

    // 往各个订单后面插入订单
    let indexs = orders.reduce(
      (acc,order,index) => {
        if(dayjs(order.endTime).add(obj.durationTime).valueOf() < obj.latestStartTime){
          acc.push(index);
        }
        return acc;
      }, []);
    index = index.concat(indexs === -1?[] : indexs)
    // 如果有合适位置，则循环index列表，重新渲染orders列表
    if (index.length > 0) {
      for (let i = 0; i < index.length; i++) {
        let nOrder = [];
        // 将新订单插入到订单表中，重新计算订单中的相关时间。
        // 循环，将合适位置之前直接插入新订单，到合适位置的时候将新订单插入，开始计算系列数据。
        for (let j = 0; j < orders.length+1; j++) {
          if(j <= index[i]){
            // 如果小于等于index，直接插入
            nOrder.push(orders[j]);
          }else{  
            let addOrder = orders[j-1];
            if (j === index[i]+1) {
              addOrder = obj;
            }
            // 如果等于index+1，则将新订单插入,并用nOrder的前一个订单即j-1来计算新订单的开始时间和结束时间
            let startTime = j!=0?nOrder[j-1].endTime:dayjs().valueOf();
            let endTime = dayjs(parseInt(startTime)).add(addOrder.durationTime,"hour").valueOf()
            if(endTime >addOrder.deliveryAt){
              break;
            }
            nOrder.push({
              ...addOrder,
              position:j,
              startTime,
              endTime,
            });
          }
        }
        result.push({
          mechineId: item.id,
          index: index[i]+1,
          endTime: nOrder[index[i]+1].startTime,
          nOrder,
          newOrder: obj,
        });
      }
    }
  });
  return result;
}

/** 查看当前订单是否适合分配到机器中 */
export function assignNewOrderToMachines(newOrder, machines) {
  newOrder = {
    ...newOrder,
    isChangeMold:false,
  }
  let msg = "执行成功";
  let targetMachine: any = [];
  let position: any = {};

  // 找到所有生产这类产品的机器
  let allTargetMachines = machines?.filter((machine) => machine.type.includes(newOrder?.productType));
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
        position = positions.sort((a, b) => a.index - b.index)[0];
      }
      // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器  需要更换模具
      if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
        // newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf().valueOf();
        newOrder.isChangeMold = true;
        //选择最晚开始的机器
        let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
          return (dayjs(item.endTime).get("hour") > getBlackHour() && dayjs(item.endTime).get("hour") < getWhiteHour() )
        });
        position = positions.sort((a, b) => b.index - a.index)[0];
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
        position = positions.sort((a, b) => b.index - a.index)[0];
      }
      // 如果没有相同模具的机器，只有在生产这类产品的机器内选择机器  需要更换模具
      if (moldTargetMachines.length <= 0 && allTargetMachines.length > 0) {
        // 最低优先级，没有相同模具的机器，就在生产这类产品的机器中选择最晚开始的机器
        // newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf();
        newOrder.isChangeMold = true;
        let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
          return (dayjs(item.endTime).get("hour") > getBlackHour() && dayjs(item.endTime).get("hour") < getWhiteHour() )
        });
        position = positions.sort((a, b) => b.index - a.index)[0];
      }
    }
    // 最高优先级，将所有合适位置订单的交付时间进行排序，取最早结束的订单位置插入  需要更换模具
    if (newOrder.priority == 1) {
      // newOrder.deliveryTime = dayjs(newOrder.deliveryTime).subtract(1.5*60,"minutes").valueOf();
      newOrder.isChangeMold = true;
      let positions = getOrderPositions(newOrder, allTargetMachines).filter((item)=>{
        return (dayjs(item.endTime).get("hour") > getBlackHour() && dayjs(item.endTime).get("hour") < getWhiteHour() )
      });
      debugger
      position = positions.sort((a, b) => a.index - b.index)[0];
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
  machine.orders = orders?.map((order,index) => {
    const latestStartTime = dayjs(order.deliveryAt)
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
      position:index,
      isWhite:(dayjs(startTime).get("hour") > getBlackHour() && dayjs(startTime).get("hour") < getWhiteHour() )
    }
  });
  // 遍历orders，计算出每个订单得开始时间
  return machine;
};
