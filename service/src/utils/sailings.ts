/** 班次 */
export enum sailings {
    /** 白班 */
    white = '18:00:00',
    /** 夜班 */
    black = '07:00:00',
}
/** 获取白班时间 */
export const getWhiteTime = () => {
    // 白班时间 = 白班下班时间-夜班下班时间
    var [wh,wm,ws] = sailings.white.split(":");
    var [bh,bm,bs] = sailings.black.split(":");
    return ((parseInt(wh,10)*3600 + parseInt(wm,10)*60 + parseInt(ws,10))
        - (parseInt(bh,10)*3600 + parseInt(bm,10)*60 + parseInt(bs,10)))/3600
}
export const getBlackTime = () => {
    var [wh,wm,ws] = sailings.white.split(":");
    var [bh,bm,bs] = sailings.black.split(":");
    return (24*3600 - (parseInt(wh,10)*3600 + parseInt(wm,10)*60 + parseInt(ws,10))
        + (parseInt(bh,10)*3600 + parseInt(bm,10)*60 + parseInt(bs,10)))/3600
}
export const getWhiteHour=()=>{
    return parseInt(sailings.white.split(":")[0], 10)
}
export const getBlackHour=()=>{
    return parseInt(sailings.black.split(":")[0], 10)
}