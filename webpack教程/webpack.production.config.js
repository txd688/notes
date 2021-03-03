const path = require("path");  // 该模块系统提供，不需要安装
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry:{
    "ms-button":"./src/ms-button.js",
    "ms-image":"./src/ms-image.js"//如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个属性的键(key)会是 chunk 的名称，该属性的值描述了 chunk 的入口点。
  },
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
        test:/\.(png|jpg)$/,//正则
        use:[
          "file-loader"
        ]
      },// 配置了图片
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
      chunks:['ms-button'],//传入chunk
      minify:false,//是否压缩
      meta:{
        description:'ms-button',//注入meta标签。描述
      },
      template:'index.html',//模板
    }),
    new HtmlWebpackPlugin({
      title:'ms-image',
      filename : 'ms-image.html',
      chunks:['ms-image'],
      meta:{
        description:'ms-image'
      },
      template:'index.html'
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