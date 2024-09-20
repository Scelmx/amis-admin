export enum ORDER_STATUS {
  /** 未开始 */
  WAIT = 'wait',
  /** 已开始 */
  PROCESS = 'process',
  /** 已完成 */
  FINISH = 'finish',
}

export const orderStatusMap = {
    [ORDER_STATUS.WAIT]: '未开始',
    [ORDER_STATUS.PROCESS]: '生产中',
    [ORDER_STATUS.FINISH]: '已完成',
}

export const orderStatusColorMap = {
    [ORDER_STATUS.WAIT]: '',
    [ORDER_STATUS.PROCESS]: 'processing',
    [ORDER_STATUS.FINISH]: 'success',
}