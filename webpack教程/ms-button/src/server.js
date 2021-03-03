const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const readFile = fs.readFileSync(path.resolve(__dirname,'../dist/ms-button.html'), 'utf-8');
  res.send(readFile);
});

//为了提供对静态资源文件（图片，css，js文件）的服务，请使用Express内置的中间函数express.static.
//为了给静态资源文件创建一个虚拟的文件前缀（文件系统中不存在），可以使用express.static函数指定一个虚拟的静态目录
app.use('/', express.static(path.resolve(__dirname,"../dist")));

//服务对象监听服务器地址及端口
app.listen(1001,function(){
  console.log('服务启动了!!!!');
});
