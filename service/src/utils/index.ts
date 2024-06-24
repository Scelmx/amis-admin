import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import * as fs from 'fs';
import * as path from 'path';
const Expressions = require('angular-expressions');
const ImageModule = require('docxtemplater-image-module-free');
/** 小驼峰转下划线 */
export function camelToSnakeCase(obj) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const snakeKey = key.replace(
      /([A-Z])/g,
      (match) => `_${match.toLowerCase()}`,
    );
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // 递归转换嵌套的对象
      result[snakeKey] = camelToSnakeCase(obj[key]);
    } else {
      result[snakeKey] = obj[key];
    }
  });

  return result;
}

/** 下划线转小驼峰 */
export function snakeToCamelCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const isArray = Array.isArray(obj);
  const result: any = isArray ? [] : {};

  Object.keys(obj).forEach((key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const value = obj[key];

    if (isArray) {
      // 如果是数组，直接递归赋值
      result.push(snakeToCamelCase(value));
    } else {
      // 递归处理对象的每个值
      result[camelCaseKey] =
        typeof value === 'object' && value !== null
          ? snakeToCamelCase(value)
          : value;
    }
  });

  return result;
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err); // 如果有错误，使用reject回调
      } else {
        const base64Image = data.toString('base64');
        resolve(`data:image/png;base64,${base64Image}`); // 如果没有错误，使用resolve回调
      }
    });
  });
}

function base64DataURLToArrayBuffer(dataURL) {
  const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
  if (!base64Regex.test(dataURL)) {
    return false;
  }
  const stringBase64 = dataURL.replace(base64Regex, '');
  let binaryString;
  if (typeof window !== 'undefined') {
    binaryString = window.atob(stringBase64);
  } else {
    binaryString = new Buffer(stringBase64, 'base64').toString('binary');
  }
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}

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
