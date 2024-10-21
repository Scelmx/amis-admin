import { ProductDto } from "./product.dto";
export function createObjectWithBaseName(baseName: string, array: any[]) {
  if (!array) return undefined; 
  const result = {};
  array.forEach((item, index) => {
    const key = `${baseName}${index}`;
    result[key] = item?.url || item;
  });
  return result;
}

/** 获取公差范围 */
export function getRangeArray({ base, size = 10, max, min }) {
  // 确定随机数的上下界
  const lowerBound = base + (min > 0 ? -min : min)
  const upperBound = base + max;

  // 检查上下界是否设置正确
  if (lowerBound > upperBound) {
    throw new Error('Invalid range: lowerBound is greater than upperBound.');
  }

  // 初始化数组和第一个随机数的标志（大于或等于基数或小于基数）
  const list = [];
  const firstRandomValue = Math.random() * (upperBound - lowerBound) + lowerBound;
  const isGreaterThanBase = firstRandomValue >= base;

  // 生成随机数数组
  for (let i = 0; i < size; i++) {
    let randomValue;
    if (isGreaterThanBase) {
      // 如果第一个随机数大于等于基数，则后续随机数都大于等于基数
      randomValue = Math.random() * (upperBound - base) + base;
    } else {
      // 如果第一个随机数小于基数，则后续随机数都小于基数
      randomValue = Math.random() * (base - lowerBound) + lowerBound;
    }

    // 保留两位小数并添加到数组中
    list.push(parseFloat(randomValue.toFixed(3)));
  }

  return list;
}
/** 生成公差 */
export function generateRolerance(data: ProductDto) {
  return {
    ...createObjectWithBaseName('size1', getRangeArray({ base: Number(data.size1), min: Number(data.realSize1Down || data.size1Down), max: Number(data.realSize1Top || data.size1Top) })),
    ...createObjectWithBaseName('size2', getRangeArray({ base: Number(data.size2), min: Number(data.realSize2Down || data.size2Down), max: Number(data.realSize2Top || data.size2Top) })),
    ...createObjectWithBaseName('size3', data.size3 ? getRangeArray({ base: Number(data.size3), min: Number(data.realSize3Down || data.size3Down), max: Number(data.realSize3Top || data.size3Down) }) : getArray())
  }
}

export function getArray() {
  const arr = Array(10).fill('');
  return arr;
}