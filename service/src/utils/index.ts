import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import * as fs from 'fs';
import * as path from 'path';
import { ListDto } from '../common/common.dto';
import { FindManyOptions } from 'typeorm';
import { Common } from '../common/common.entity';
const ImageModule = require('docxtemplater-image-module-free');
/** 渲染数据到模板中 */
export function renderDataToDocx(filePath: string, data) {
  const opts = {
    centered: false, // 是否总是居中
    fileType: 'docx',
    getImage: (tagValue) => {
      // return base64DataURLToArrayBuffer(tag);
      return fs.readFileSync(tagValue.replace('http://localhost:3000/', ''));
    },
    getSize: (img, tagValue, tagName) => {
      if (tagName === 'productImage') {
        return [480, 390];
      }
      return [260, 185];
    },
  };
  const imageModule = new ImageModule(opts);

  const content = fs.readFileSync(filePath, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    modules: [imageModule],
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  const fileName = new Date().getTime();
  fs.writeFileSync(
    path.resolve(__dirname, `./assets/output/${fileName}.docx`),
    buf,
  );
  return {
    filePath: path.join(__dirname, `./assets/output/${fileName}.docx`),
    fileName,
  };
}

/** 获取随机图片列表 */
export function getRandomList(arr, count = 10) {
  if (count > arr.length) {
    return arr;
    // throw new Error('Count cannot be greater than the length of the array');
  }

  // 创建一个数组副本，以避免修改原始数组
  let tempArray = [...arr];

  let result = [];
  for (let i = 0; i < count; i++) {
    // 生成一个随机索引
    let randomIndex = Math.floor(Math.random() * tempArray.length);

    // 将随机索引的元素添加到结果数组中
    result.push(tempArray[randomIndex]);

    // 从临时数组中删除该元素，以避免重复
    tempArray.splice(randomIndex, 1);
  }

  return result;
}

/** 对象属性值转换 */
export function convertUndefinedToEmptyString(obj) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] === undefined || obj[key] === null) {
      obj[key] = '';
    }
  }
  return obj;
}

/**
 * 列表页查询条件生成函数
 * @param params 分页参数
 * @param where 查询条件
 * @returns 
 */
export function genWhereObj(params: ListDto, where?: any, order?: any) {
  const { page = 1, pageSize = 10 } = params
  const skip = page > 0 ? (page - 1) * pageSize : 0
  const options: FindManyOptions<Common> = {
    skip,
    take: pageSize,
    order: order || { id: 'DESC' },
    where: { ...(where || {}), isDeleted: 0 }
  }
  return options;
}

/**
 * 对象转options
 * @param obj enum对象 | 对象
 * @returns <{ label: string, value: string }[]>
 */
export function ObjToArray(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc.push({
      label: obj[key],
      value: key
    });
    return acc;
  }, []);
}


/**
 * 字符串转JSON
 * @param str string
 * @returns JSON 对象
 */
export const toJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return str;
  }
}

/**
 * 对象转字符串
 * @param obj any
 * @returns string
 */
export const toString = (obj: any) => {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    return obj;
  }
}

/**
 * 范围数据格式化函数
 * @param data any
 * @param msg 错误提示
 * @returns 
 */
export const returnData = (data?: any, msg?: string) => {
  return {
    data,
    msg
  }
}