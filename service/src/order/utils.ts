import * as dayjs from "dayjs";
import { toJSON } from "../utils";
import { getWhiteHour, getBlackHour, getNextWhiteHour, isWhiteHour } from "../utils/sailings";


/**
 * 获取对象在每个item的orders数组中，根据time和duration属性计算最晚开始时间后的位置下标
 * @param {Object} obj - 包含time和duration属性的对象
 * @param {Array} arr - 包含item的数组，每个item中有一个orders数组
 * @returns {Array} - 每个item的orders数组中，根据最晚开始时间排序后的下标
 */
export function getOrderPositions(obj, arr, priority) {
  const result = [];
  let index =[];
  arr.forEach((item) => {
    const { orders: orderList = [] } = item;

    let mold = obj.mold;
    let orders = toJSON(orderList);
    // 计算每小时的产量
    let hourNums = mold.halfDayNums * 2 / 24 / 60;
    // 初始化新订单信息
    /** 版产量/24 得到每小时的产量，再用订单总数/每小时产量，得到需要多少个小时*/
    obj.durationTime = obj.nums / hourNums;
    // 计算新订单的最晚开始时间
    obj.latestStartTime = dayjs(parseInt(obj.deliveryAt))
        .subtract(obj.durationTime, 'minute').subtract(2,'day')
        .valueOf();

    // 机器订单表为空
    if(orders.length == 0){
      index.push(0);
    }
    // 机器订单表不为空，判断首位以及其他位置是否适合插入
    else{
      // 首位是否适合插入
      let now = dayjs();
      if(!isWhiteHour(now.get('hour'))){
        now = dayjs(getNextWhiteHour());
      }
      if(item.mold.id != obj.requireMold){
        now = now.add(1.5,"hour");
      }
      // if(now.valueOf() < orderList[0].latestStartTime){
      //   index.push(0);
      // }
      let bindex = [];
      // 先找到相同优先级的位置
      // if(priority == 1){
      //   priIndexs = orders.findIndex((order) => order.priority === 1);
      // }else if(priority == 2){
      //   priIndexs = orders.findIndex((order) => order.priority === 2);
      // }else{
      //   priIndexs = orders.findIndex((order) => order.priority === 3);
      // }
      orders.reduce(
          (acc,order,index) => {
            if(index == 0){
              let objEndTime = dayjs();
              if(item.mold.id != obj.requireMold){
                if(!isWhiteHour(objEndTime.get("hour"))){
                  objEndTime = dayjs(getNextWhiteHour());
                }
                objEndTime = objEndTime.add(1.5,"hour");
              }
              objEndTime = objEndTime.add(obj.durationTime,"minute")
              if(objEndTime.valueOf() < order.latestStartTime){
                if(order.priority == priority){
                  bindex.push(0);
                }
              }
            }
            let objEndTime = dayjs(parseInt(order.endTime));
            if(order.requireMold != obj.requireMold){
              if(!isWhiteHour(objEndTime.get("hour"))){
                objEndTime = dayjs(getNextWhiteHour());
              }
              objEndTime = objEndTime.add(1.5,"hour");
            }
            objEndTime = objEndTime.add(obj.durationTime,"minute")
            if(objEndTime.valueOf() < obj.latestStartTime){
              if(order.priority == priority){
                bindex.push(index+1);
              }
            }
            return acc;
          }, []);
          
      if(bindex.length > 0){
        index = index.concat(bindex);
      }
    }
    if (index.length > 0) {
      for (let i = 0; i < index.length; i++) {
        let nOrder = [];
        let oldOrders = JSON.parse(JSON.stringify(orders));
        let changeTimes = 0;
        if(orders.length == 0){
          if(item.mold.id != obj.requireMold){
              obj.durationTime = obj.durationTime + 1.5*60;
              obj.isChangeMold = 1;
              changeTimes += 1;
          }
          obj.startTime = isWhiteHour(dayjs().get("hour")) ? dayjs().valueOf() : getNextWhiteHour?.().valueOf();
          obj.endTime = dayjs(parseInt(obj.startTime)).add(obj.durationTime,"minute").valueOf();
          obj.position = 0;
          nOrder.push(obj);
        }else{
          nOrder = nOrder.concat(oldOrders.slice(0,index[i]));
          oldOrders.splice(index[i],0,obj);
          for (let j = index[i]; j < oldOrders.length; j++) {
            oldOrders[j].startTime = nOrder.length!=0?nOrder[nOrder.length-1].endTime: dayjs().valueOf();
            if(j==0 && (oldOrders[j].requireMold != item.mold.id)){
              if(!isWhiteHour(dayjs().get("hour"))){
                oldOrders[j].startTime = getNextWhiteHour()?.valueOf();
              }
              oldOrders[j].startTime = dayjs(parseInt(oldOrders[j].startTime)).add(1.5,"hour").valueOf();
            }
            if(j!=0 && (oldOrders[j].requireMold != nOrder[nOrder.length-1].requireMold)){
              if(!isWhiteHour(dayjs(parseInt(nOrder[nOrder.length-1].endTime)).get("hour"))){
                oldOrders[j].startTime = getNextWhiteHour()?.valueOf();
              }
              oldOrders[j].startTime = dayjs(parseInt(oldOrders[j].startTime)).add(1.5,"hour").valueOf();
              oldOrders[j].isChangeMold = 1;
              changeTimes += 1;
            }
            oldOrders[j].endTime = dayjs(parseInt(oldOrders[j].startTime)).add(oldOrders[j].durationTime,"minute").valueOf();
            if(oldOrders[j].endTime > oldOrders[j].deliveryAt){
              break;
            }
            if(nOrder.length!=0 &&nOrder[nOrder.length-1].endTime > oldOrders[j].latestStartTime){
              break;
            }
            nOrder.push({
              ...oldOrders[j],
              position:j,
            });
          }
        }
        if(nOrder.length >= oldOrders.length){
          result.push({
            mechineId: item.id,
            index: index[i],
            nOrder,
            changeTimes,
            startTime: nOrder[index[i]].startTime,
          });
        }
      }
      index = [];
    }
  });
  return result;
}

/** 查看当前订单是否适合分配到机器中 */
export function assignNewOrderToMachines(newOrder, machines) {
  newOrder = {
    ...newOrder,
    isChangeMold:0,
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
    return {
      msg:"执行失败，未找到对应产品类型的机器。",
      data: {
        machine: targetMachine,
        position,
      }
    }
  }else{
    if (newOrder.priority == 1) {
      let positions = getOrderPositions(newOrder, allTargetMachines, 1);
      if(positions.length > 0){
        position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
        positions = positions.filter((item) => item.changeTimes == position.changeTimes);
        position = positions.sort((a,b) => b.startTime - a.startTime)[0];
      }else{
        positions = getOrderPositions(newOrder, allTargetMachines, 2);
        if(positions.length > 0){
          position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
          positions = positions.filter((item) => item.changeTimes == position.changeTimes);
          position = positions.sort((a,b) => a.startTime - b.startTime)[0];
        }else{
          positions = getOrderPositions(newOrder, allTargetMachines, 3);
          if(positions.length > 0){
            position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
            positions = positions.filter((item) => item.changeTimes == position.changeTimes);
            position = positions.sort((a,b) => a.startTime - b.startTime)[0];
          }
        }
      }
    }
    if (newOrder.priority == 2) {
      let positions = getOrderPositions(newOrder, allTargetMachines,2);
      if(positions.length > 0){
        // 取需要更换模具最少的队列
        position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
        positions = positions.filter((item) => item.changeTimes == position.changeTimes);
        position = positions.sort((a,b) => b.startTime - a.startTime)[0];
      }else{
        // 在一般优先级找
        positions = getOrderPositions(newOrder, allTargetMachines,1);
        if(positions.length > 0){
          // 取需要更换模具最少的队列
          position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
          positions = positions.filter((item) => item.changeTimes == position.changeTimes);
          position = positions.sort((a,b) => b.startTime - a.startTime)[0];
        }else{
          positions = getOrderPositions(newOrder, allTargetMachines,3);
          if(positions.length > 0){
            position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
            positions = positions.filter((item) => item.changeTimes == position.changeTimes);
            position = positions.sort((a,b) => a.startTime - b.startTime)[0];
          }
          
        }
      }
    }
    // 最低优先级，在相同优先级内找，找到放第一个；没找到找上级优先级，找到放最后一个，还没找到找最上级优先级，找到放最后一个
    if (newOrder.priority == 3) {
      // 在最低优先级找。
      let positions = getOrderPositions(newOrder, allTargetMachines,3);
      if(positions.length > 0){
        // 取需要更换模具最少的队列
        position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
        positions = positions.filter((item) => item.changeTimes == position.changeTimes);
        position = positions.sort((a,b) => b.startTime - a.startTime)[0];
      }else{
        // 在一般优先级找
        positions = getOrderPositions(newOrder, allTargetMachines,2);
        if(positions.length > 0){
          // 取需要更换模具最少的队列
          position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
          positions = positions.filter((item) => item.changeTimes == position.changeTimes);
          position = positions.sort((a,b) => b.startTime - a.startTime)[0];
        }else{
          // 在最高优先级找
          positions = getOrderPositions(newOrder, allTargetMachines,1);
          if(positions.length > 0){
            // 取需要更换模具最少的队列
            position = positions.sort((a,b) => a.changeTimes - b.changeTimes)[0];
          positions = positions.filter((item) => item.changeTimes == position.changeTimes);
          position = positions.sort((a,b) => b.startTime - a.startTime)[0];
          }else{
            position = null;
            msg="执行失败，未找到合适位置。"
          }
        }
      } 
    }
    targetMachine = allTargetMachines.find(
        (machine) => machine.id === position?.mechineId,
    );
  }
  console.log('targetMachine:', targetMachine);
  console.log('newOrder:', newOrder);
  if(!targetMachine){
    return {
      code: 1,
      msg:"执行失败，未找到合适位置。",
      data: {
        machine: targetMachine,
        position,
      }
    };
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
