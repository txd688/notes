const path = require("path");  // 该模块系统提供，不需要安装
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:"./src/index.js", // 需要打包文件(跟它有关的东西都会打包)
  output:{
    filename:"bundle.[contenthash].js", // 打包后的名字
    path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
    publicPath:"auto",//图片路径, 或者 "/dist/"
  },
  mode:"development",//none
  module:{
    //规则
    rules:[
      {
        test:/\.(png|jpg)$/,//正则
        use:[
          "file-loader"
        ]
      },// 配置了图片
      { test: /\.txt$/, use: 'raw-loader' }, // 允许了txt文件
      {
        test:/\.css$/,
        use:[
          // "style-loader","css-loader"
          MiniCssExtractPlugin.loader,"css-loader"
        ]
      },
      {
        test:/\.scss$/,
        use:[
          // "style-loader","css-loader","sass-loader"
          MiniCssExtractPlugin.loader,"css-loader","sass-loader"
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,//排除文件
        use:{
          loader:"babel-loader",//将最新语法转换为浏览器可以识别的语言
          options:{
            presets:["@babel/env"],//对应环境，包含es6,es7,es8...高版本语法
            plugins:["@babel/plugin-proposal-class-properties"]
          }
        }
      },//当找到高版本语法，就会借助babel-loader进行转换，会使用这个插件转为es5
    ]
  },
  plugins:[
    new TerserPlugin(),//打包优化
    new MiniCssExtractPlugin({
      filename:"styles.[contenthash].css",//分离出来css的文件名
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*',path.join(process.cwd(),"build/**/*")],//删除dist所有文件，另外测试配置了build文件下所有内容
    }),
    new HtmlWebpackPlugin({
      title:'webpack5'
    })
  ]
}