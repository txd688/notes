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
* 模块化了txt文件
* 模块化css
  * style-loader 将css样式写入到我们的应用中
  * css-loader 读取css，识别css   (cnpm install style-loader --save-dev 这是放到开发环境下devDependencies)
* 模块化scss(是一种css预处理器和一种语言)
  * style-loader 将css样式写入到我们的应用中
  * css-loader 读取css，识别css   (cnpm install style-loader --save-dev 这是放到开发环境下devDependencies)
  * cnpm install node-sass  sass-loader --save-dev
* 配置高版本js语法(当遇到浏览器无法识别的高版本语法，转换为可以识别的es5版本语法)
  * 安装 cnpm install babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties --save-dev

> 这里配置详情看webpack.config.js

### 在 webpack.config.js 中配置 plugins
* cnpm install terser-webpack-plugin --save-dev 该插件可以打包优化，减小包的大小（new TerserPlugin()）
* cnpm i mini-css-extract-plugin --save=dve 分离css(原本写在index.html 的head中，把它分离成另外的css文件)
* cnpm install --save-dev clean-webpack-plugin 在打包之前清除打包目录下的所有文件
* cnpm i --save-dev html-webpack-plugin 打包自动生成html文件

### 配置开发环境和生产环境
* 分别创建了webpack.dev.config.js 和 webpack.production.config.js 文件管理这两个不同环境
* config.js 文件中的 mode 设置为相对于的环境
* package.json 配置了打包的方法(dev 和 build)。
* 可以通过 process.env.NODE_ENV 识别是哪个环境

### 开发服务器(devServer)
* npm install webpack-dev-server --save-dev
在 package.json 的dev中添加 serve ，在dev.config.js 添加对应端口（devServer）
