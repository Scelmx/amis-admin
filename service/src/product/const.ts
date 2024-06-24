export enum Pd {
    pw = 'pw',
    oxq = 'oxq',
    yxq = 'yxq'
}

export enum ProductName {
    pw = '皮碗',
    oxq = 'O型橡胶圈',
    yxq = 'Y型橡胶圈'
}

/** O型圈 */
export enum OXQ {
    inner = 10, // 内径
    innerRange = 0.19, // 公差
    line = 3.2,
    lineRange = 0.1
}

/** Y型圈 */
export enum YXQ {
    inner = 86, // 内径
    innerRange = 0.7, // 公差
    out = 102.8, // 外径
    outRange = 0.7, // 公差
    height = 6.5, // 高
    heightRange = 2
}

/** 皮碗 */
export enum PW {
    radius = 24,
    radiusRange = 0.25,
    diameter = 55,
    diameterRange = 0.5,
    height = 44,
    heightRange = 0.5
}
