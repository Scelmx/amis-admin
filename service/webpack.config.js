const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const tsConfigFile = 'tsconfig.build.json'

module.exports = {
  // 指定了 webpack 的入口文件
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'main.ts'), // 请替换为你的主文件路径
  // 指定了输出文件的名称和路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  // 用于处理 TypeScript 文件的加载器
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // 这里可以添加其他文件类型的加载器，如 CSS、图片等
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // 包含 TypeScript 文件扩展名
  },
  devServer: {
    hot: true
  },
  plugins: [
    // 复制静态资源到输出目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'), // 静态资源目录
          to: path.resolve(__dirname, 'dist/assets'), // 输出目录
        },
      ],
    }),
  ],
  // 这里可以添加其他 Webpack 配置，如 mode、devtool 等
};
