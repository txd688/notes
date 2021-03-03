const path = require("path");  // 该模块系统提供，不需要安装
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry:"./src/index.js",
  output:{
    filename:"[name].[contenthash].js", // 使用入口名称, chunk的名称
    path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
    publicPath:"/static/",//图片路径, 或者 "/dist/"
  },
  mode:"production",//none
  module:{
    //规则
    rules:[
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
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename:"[name].[contenthash].css",//分离出来css的文件名
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*',path.join(process.cwd(),"build/**/*")],//删除dist所有文件，另外测试配置了build文件下所有内容
    }),
    new HtmlWebpackPlugin({
      title:'ms-button',//title
      filename : 'ms-button.html',//生成文件名
      minify:false,//是否压缩
      meta:{
        description:'ms-button',//注入meta标签。描述
      },
      template:'index.html',//模板
    })
  ],
  performance:{
    hints:false
  },//图片内存过大，导致警告，消除警告
  optimization:{
    splitChunks:{
      chunks: 'all',
      minSize:3000
    }
  }
}