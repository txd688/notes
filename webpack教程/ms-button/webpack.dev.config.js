const path = require("path");  // 该模块系统提供，不需要安装
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry:"./src/index.js", // 需要打包文件(跟它有关的东西都会打包)
  output:{
    filename:"bundle.js", // 打包后的名字
    path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
    publicPath:"http://localhost:1001/",//图片路径, 或者 "/dist/"
  },
  mode:"development",//none
  module:{
    //规则
    rules:[
      {
        test:/\.scss$/,
        use:[
          "style-loader","css-loader","sass-loader"
          //MiniCssExtractPlugin.loader,"css-loader","sass-loader"
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
    new HtmlWebpackPlugin({
      title:'ms-button',//title
      minify:false,//是否压缩
      meta:{
        description:'ms-button',//注入meta标签。描述
      },
    }),
    new ModuleFederationPlugin({
      name:'MsButtonApp',//名称
      filename:'remoteEntry.js',//重命名
      exposes:{
        "./MsButton":'./src/components/ms-button/ms-button.js',//对外部进行暴露，名称和地址
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 1001,
    hot:true,
    open:true
  },
}