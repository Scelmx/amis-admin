// multer.config.ts
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs'

export function getMulterConfig() {
  const appRoot = path.resolve(__dirname, '..');
  const uploadDir = path.join(appRoot, 'uploads');
  
  const multerConfig = {
    storage: diskStorage({
      // 指定文件存储目录
      destination: (req, file, cb) => {
        // 检查目录是否存在，如果不存在则创建它
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // 指定上传文件的保存目录
      },
      // 通过时间戳来重命名上传的文件名
      filename: (_, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        return callback(null, fileName);
      },
    })
  };
  return multerConfig
}