## webpack

起步:  
npm init  

相关包： 
* cnpm install --save-dev webpack
* cnpm install --save-dev webpack-cli

打包命令(自动生成dist文件夹)：npx webapck 或者 npm run build （这是自己配置了打包命令）

配置文件名：webpack.config.js  

### 在 webpack.config.js 中配置 module
webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力本文件实例：
* 配置了图片(png,jpg)。
  * 安装了 cnpm i file-loader --save（这放到了生产环境dependencies）

* 模块化css
  * style-loader 将css样式写入到我们的应用中
  * css-loader 读取css，识别css   (cnpm install style-loader --save-dev 这是放到开发环境下devDependencies)

* 模块化scss(是一种css预处理器和一种语言)
  * style-loader 将css样式写入到我们的应用中
  * sass-loader 读取sass，识别sass   (cnpm install style-loader --save-dev 这是放到开发环境下devDependencies)
  * cnpm install node-sass  sass-loader --save-dev
  
* 配置高版本js语法(当遇到浏览器无法识别的高版本语法，转换为可以识别的es5版本语法)
  * 安装 cnpm install babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
```
module:{
  rules:[
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
}
```

* 配置html文件
  * cnpm i --save-dev html-loader extract-loader file-loader 
```
{
  test:/\.html$/,
  use:[
    'file-loader',"extract-loader","html-loader"
  ]
}
```

### 在 webpack.config.js 中配置 plugins
* cnpm install terser-webpack-plugin --save-dev 该插件可以打包优化，减小包的大小（new TerserPlugin()）
```
const TerserPlugin = require("terser-webpack-plugin");

plugins:[
  new TerserPlugin(),
]
```

* cnpm i mini-css-extract-plugin --save-dve 分离css(原本写在index.html 的head中，把它分离成另外的css文件,还需要在规则中设置)
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

{
  test:/\.css$/,
  use:[
    MiniCssExtractPlugin.loader,"css-loader"
  ]
}

new MiniCssExtractPlugin({
  filename:"[name].[contenthash].css",//分离出来css的文件名
}),
```

* cnpm install --save-dev clean-webpack-plugin 在打包之前清除打包目录下的所有文件
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['**/*',path.join(process.cwd(),"build/**/*")],//删除dist所有文件，另外测试配置了build文件下所有内容
}),
```

* cnpm i --save-dev html-webpack-plugin 打包自动生成html文件
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
  title:'ms-button',                 //title
  filename : 'ms-button.html',       //生成文件名
  chunks:['ms-button'],              //传入chunk
  minify:false,                      //是否压缩
  meta:{
    description:'ms-button',         //注入meta标签。描述
  },
  template:'index.html',             //模板
}),
```

* new webpack.BannerPlugin()  内置，首行注释，为的就是在发生问题时可以找到当时写代码的人。有时候也用于版权声明。

> 这里配置详情看webpack.config.js

### 配置开发环境和生产环境
* 分别创建了webpack.dev.config.js 和 webpack.production.config.js 文件管理这两个不同环境
* config.js 文件中的 mode 设置为相对于的环境
* package.json 配置了打包的方法(dev 和 build)。
* 可以通过 process.env.NODE_ENV 识别是哪个环境

### 开发服务器(devServer)
* npm install webpack-dev-server --save-dev
在 package.json 的dev中添加 serve ，在webpack.dev.config.js 添加对应端口（devServer）
```
"dev": "webpack serve --config webpack.dev.config.js"

devServer: {
  contentBase: path.join(__dirname, './dist'),
  compress: true,
  port: 9000,
  hot:true
},
```
### 设置多个入口文件，多个css和js
* 配置 entry 为对象
* output.filename 和 MiniCssExtractPlugin 设置为动态name
```
entry:{
  "ms-button":"./src/ms-button.js",
  "ms-image":"./src/ms-image.js"
}

output:{
  filename:"[name].[contenthash].js", // 使用入口名称, chunk的名称
  path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
  publicPath:"auto",//图片路径, 或者 "/dist/"
},
```
见 webpack.production.config.js

### 设置多个html文件
配置 HtmlWebpackPlugin
```
new HtmlWebpackPlugin({
  title:'ms-button', //title
  filename : 'ms-button.html',//生成文件名
  chunks:['ms-button'], //传入chunk
  minify:false,//是否压缩
  meta:{
    description:'ms-button', //注入meta标签。描述
  },
  template:'index.html', //模板
}),
```

### 优化引用第三方插件
把整个第三方单独打出一个文件，实现共用。
```
optimization:{
  splitChunks:{
    chunks: 'all',
    minSize:3000,          //生成 chunk 的最小体积， 如果第三方库大于30kb，也会单独打包出一个文件(没加的话，如果第三方库过小，不会自动打包到项目文件中)
  }
}
```

### webpack 融合express读取静态文件
* cnpm i express --save-dev

```
const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();

app.get('/ms-button', (req, res) => {
  const readFile = fs.readFileSync(path.resolve(__dirname,'../dist/ms-button.html'), 'utf-8');
  res.send(readFile);
});

//为了提供对静态资源文件（图片，css，js文件）的服务，请使用Express内置的中间函数express.static.
//为了给静态资源文件创建一个虚拟的文件前缀（文件系统中不存在），可以使用express.static函数指定一个虚拟的静态目录
app.use('/static', express.static(path.resolve(__dirname,"../dist")));

//服务对象监听服务器地址及端口
app.listen(3000,function(){
  console.log('服务启动了!!!!');
});


// 配置 webpack.production.config.js
output.publicPath = '/static/'
```

### 拆分两个独立的app
将原本的两个html抽离成两个独立文件夹，ms-button 和 ms-image。

### 动态加载代码和共享依赖

B項目使用A項目模快内容
```
// A項目
//webpack.production.config.js
const { ModuleFederationPlugin } = require("webpack").container;
```
const { ModuleFederationPlugin } = require("webpack").container;

publicPath:"http://localhost:1001/",//图片路径, 或者 "/dist/"
//暴露方法
new ModuleFederationPlugin({
  name:'MsButtonApp',//名称
  filename:'remoteEntry.js',//重命名
  exposes:{
    "./MsButton":'./src/components/ms-button/ms-button.js',//对外部进行暴露，名称和地址
  }
})

output:{
  filename:"[name].[contenthash].js", // 使用入口名称, chunk的名称
  path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
  publicPath:"http://location:1001/",//图片路径, 或者 "/dist/"
}
//server.js
app.use('/', express.static(path.resolve(__dirname,"../dist")));
//服务对象监听服务器地址及端口
app.listen(1001,function(){
  console.log('服务启动了!!!!');
});

//B項目
// webpack.production.config.js
const { ModuleFederationPlugin } = require("webpack").container;
});

app.use('/', express.static(path.resolve(__dirname,"../dist")));


const { ModuleFederationPlugin  } = require("webpack").container;
// 导入方法
new ModuleFederationPlugin({
  name:'MsImageApp',
  remotes:{
    MsButton:"MsButtonApp@http://localhost:1001/remoteEntry.js"
  }
})

output:{
  filename:"[name].[contenthash].js", // 使用入口名称, chunk的名称
  path:path.resolve(__dirname,"./dist"),// 放到哪个文件下（相对路径，dirname是当前文件夹路径）
  publicPath:"/static/",//图片路径, 或者 "/dist/"
}

// server.js 
app.use('/static', express.static(path.resolve(__dirname,"../dist")));

//服务对象监听服务器地址及端口
app.listen(1002,function(){
  console.log('服务启动了!!!!');
});

});
// 使用
import("MsButton/MsButton").then(res=>{
  const msButton = res.default;
  const msButton2 = new msButton();
  msButton2.render();
});
```