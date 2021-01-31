## BOM

### window 对象
BOM的核心是window对象，表示浏览器的实例。windon对象在浏览器中有两重身份：ECMAScript中的Global对象 和 浏览器窗口的Javascirpt 接口。

### Global 作用域
所有通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。
```
var age = 28;
var sayAge = () => console.log(this.age);
window.age;           // 28
sayAge();             // 28
```
而 let 或 const 不会把变量添加给全局对象。

### 窗口关系
top 对象始终指向最外层窗口，即浏览器窗口本身。parent 对象指向当前窗口的父窗口。如果当前窗口已经是最上层，则这两个相等。还有一个 self 对象，始终指向window。因此访问 `window.parent、window.top、window.self`都可以。

### 窗口位置与像素比

`screenLeft` 和 `screenTop`，表示窗口相对于**屏幕**左侧和顶部的位置。  

 `moveTo`和`moveBy`方法移动窗口。都接受两个参数,其中moveTo接收要移动到新位置的绝对坐标x和y。moveBy接收相对当前位置在两个方向移动的像素数。
从Firefox 7开始,如果符合下列情况,则普通网页中的JavaScript无法通过调用该函数来移动浏览器窗口  
* 当前窗口或标签页不是由window.open方法创建的  
* 当前标签页所在的窗口包含有多个标签页  
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
<script>
function openWin(){
	myWindow=window.open('','','width=200,height=100');
	myWindow.document.write("<p>这是我的窗口</p>");
}
function moveWin(){
	myWindow.moveTo(0,0);
	myWindow.focus();
}
</script>
</head>
<body>

<input type="button" value="打开窗口" onclick="openWin()" />
<br><br>
<input type="button" value="移动窗口" onclick="moveWin()" />

</body>
</html>
```
简单来说就是通过window.open打开的窗口才能使用moveTo。

#### 像素比
CSS像素是Web开发中使用的同一像素单位。其实是一个角度：0.0213° 。在适配不同分辨率，物理像素与CSS像素之间的转换比率由`window.devicePixelRatio`属性提供，与每英寸像素数对应。  
DPI 表示单位像素密度。而`window.devicePixelRatio`表示物理像素与逻辑像素之间的缩放系数。

#### 窗口大小
123

