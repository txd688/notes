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
`innerWidth` 和 `innerHeight` 返回浏览器窗口中页面视口大小。(不包括浏览器边框和工具栏，测试发现包括滚动条)  
`outerWidth` 和 `outerWidth` 返回浏览器自身大小。  
`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight`返回页面视口宽度和高度。  
浏览器窗口自身的精确尺寸不好确定，但可以确定页面视口的大小。如下：
```
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

if(typeof pageWidth != 'number'){
	if(document.compatMode == 'CSS1Compat'){
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else{
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}
//document.compatMode 两种返回值：BackCompat和CSS1Compat。 
//BackCompat：标准兼容模式关闭。浏览器客户区宽度是document.body.clientWidth；CSS1Compat：标准兼容模式开启。 浏览器客户宽度是document.documentElement.clientWidth。 
```

#### 视口位置
`window.pageXoffset / window.scrollX` 和 `window.pageYoffset / window.scrollY` 返回视口滚动距离。  
`scroll()`、`scrollBy()`和`scrollTo()`方法滚动页面，都接收表示相对视口距离的x和y坐标。
```
window.scrollBy(0,100);
//都接收一个ScrollToOptions字典。
window.scrollTo({
	left:100,
	top:500,
	behavior'smooth'                 // 是否平滑滚动
});

// 这里测试 scrollBy 不可以 大变小。比如 x 为1000，改为 10，不会滚动，另外两个方法可以。
```

#### 导航与打开新窗口
`window.open()`方法导航到指定URL，也可以打开新窗口。  
接收4个方法：
* 要加载的URL
* 目标窗口
* 特性字符串
* 表示新窗口在浏览器历史记录中是否代替当前加载也面的布尔值
第二个参数是窗口(frame)名字，如果存在，则在这个frame中打开这个网址，否则打开一个新页面(名字为这个值)。如果是新打开的页面，就可以接收第三个参数，是打开窗口的特性，如下：

设置  | 值  | 说明
 ---- | ----- | ------  
 fullscreen  | 'yes'或'no' | 表示窗口是否最大化，仅限IE支持 
 height  | 数值 | 窗口高度，不能少于100
 width   | 数值 | 窗口宽度，不能少于100
 left    | 数值 | 新窗口x轴坐标
 top     | 数值 | y坐标
 location | 'yes' or 'no' | 表示是否显示地址栏。(具体取决于浏览器)
 Menubar   | 'yes' or 'no' | 表示是否显示菜单栏，默认no
 resizable | 'yes' or 'no' | 表示是否可以拖动改变新窗口带小，默认no
 scrollbars | 'yes' or 'no' | 表示是否可以在内容过长时滚动（no）
 status     | yes or no    | 是否显示状态栏
 toolbar    | yes or no    | 是否显示工具栏(no) 
 
 ```
 let frame = window.open('https://www.baidu.com','newFrame','width=500,height=200,resizable=yes')
//新打开的页面可以使用如下
//缩放
frame.resizeTo(100,100);
//移动
frame.moveTo(100,100);
//可以关闭
frame.close();
//关闭后引用仍然存在，因此可以检查其属性（关闭后，仅此而已）
frame.closed;    

// opener属性指向打开它的窗口
frame.opener === window ;     // true
//因此可以通过这个属性，切断通信，成为一个独立的进程
frame.opener = null;
 ```

 安全限制：导致但三个参数一些功能没有效果。  

 弹窗屏蔽程序：大多都内置了，阻止弹窗，可以通过以下方法：
 ```
let blocked = false;
try{
	let frame = window.open('https://www.baidu.com','_blank');
	if(frame == null){
		blocked = true;
	}
} catch (ex){
	blocked = true;
}
if(blocked){
	alert('不可用')
}
 ```

 #### 定时器
 `setTimeout()` 用于指定在一定时间后执行某些代码。接收两个参数，第一个类似eval()的字符串，第二个参数是时间。
 `setInterval()` 用于指定每一段时间执行某些代码。
 `clearTimeout(timeoutId)`  和 `clearInterval()`取消超时任务

 #### 系统对话框
`alert()` 警告框，如果传入参数不是原始字符串，会调用toString()方法  
`confirm()` 确认框，有两个按钮Cancel 、 OK, 返回布尔值
`prompt()` 提示框。用户输入内容。两个参数：要显示的文本，文本框默认值。
`window.print()` 显示打印对话框。
`window.find()` 显示查找对话框。这两个与上诉不同，是异步的。

#### location 对象
提供了当前窗口中加载文档的信息，以及通常的导航功能。它既是window属性也是document属性。因此`window.location`和`document.location`指向同一个对象。  
假设浏览器当前加载的URL是`http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents`,location对象内容如下：

|    属性  |    值 |   说明 |
|------| -----| ------|
| location.hash | #contents  | URL散列值(井号后跟零或多个字符串) |
| location.host | www.wrox.com:80 | 服务器及端口号 |
| location.hostname | www.wrox.com | 服务器名 |
| location.href    | http://www.wrox.com:80/WileyCDA/?q=javascript#contents | 完整的URL |
| location.pathname | /WileyCDA/ | URL中的路径和文件名 |
| location.port    | 80 | 端口号 |
| location.protocol | http:  | 页面使用的协议 |
| locaiton.username | foouser | 域名前指定的用户名 |
| location.password | barpassword | 域名前指定的密码 |
| location.origin | http://www.wrox.com | URL的源地址 |

#### 查询字符串
```
//获取url相关信息
let getQueryStringArgs = ()=>{
    let qs = location.search.length > 0 ? location.search.substring(1) : '';
    args = {};
    for(let item of qs.split('&').map(k => k.split('='))){
        let name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}
//这里假设 location.search = 'https://translate.google.cn/?page=1&size=8'
let args = getQueryStringArgs();
args[page];       // 1

//也可以通过另一种方式  URLSearchParams  
//这个函数暴露了 get()、has()、delete()等方法
let searchUrl = new URLSearchParams(location.search);;
searchUrl.toString();           // "page=1&size=8"
searchUrl.has('page');         // true
searchUrl.get('page');         // 1
searchUrl.set('page',4444);      
searchUrl.toString();         // "page=4444&size=8"
searchUrl.delete('page');    // "size=8"
// 也支持迭代
for(let i of searchUrl)console.log(i);
// ["page", "4444"]
//  ["size", "8"]
```

#### 操作地址
调整新地址
`location.assign(url)` 和 `window.location=url`、`window.href=url`。这三者方法会增加历史记录。如果不需要可以使用`locaiton.replace(url)`;  
刷新页面
`location.reload()`和 `location.reload(true)`,第一个从缓冲中加载，第二个从服务器中加载。

#### navigator 对象

| 属性/方法 | 说明 |
| ---- | ---- |
| appCodeName | 浏览器的名称。通常都是Mozilla，即使在非Mozilla浏览器中也是如此|
| appMinorVersion | 次版本信息 |
| appName	| 完整的浏览器名称 |
| appVersion	 | 浏览器的版本。	|
|buildID | 	浏览器编译版本	|
| cookieEnabled	| 表示cookie是否启用	|
| cpuClass |	客户端计算机中使用的CPU类型|
| javaEnabled()	| 表示当前浏览器中是否启用了Java	|
| language |	浏览器的主语言 |
| mimeTypes	| 在浏览器中注册的MIME类型数组	|
| onLine |	表示浏览器是否连接到了因特网	|
| oscpu |	客户端计算机的操作系统或使用的CPU	|
| platform |	浏览器所在的系统平台|
| plugins	| 浏览器中安装的插件信息的数组 |
| preference() |	设置用户的首选项 |
| product	| 产品名称（如 Gecko）|
| productSub |	关于产品的次要信息（如Gecko的版本）	|
| registerContentHandler() |	针对特定的MIME类型将一个站点注册为处理程序	|
| registerProtocolHandler() |	针对特定的协议将一个站点注册为处理程序	|
| systemLanguage |	操作系统的语言	|
| userAgent |	浏览器的用户代理字符串	|
| userLanguage |	操作系统的默认语言	|
| userProfile	| 借以访问用户个人信息的对象	|
| vendor |	浏览器的品牌 |
| vendorSub |	有关供应商的次要信息 |

#### 检测插件
`window.navigator.plugins` 中有 name:插件名称、description：插件介绍、filename：插件的文件名、
length：由当前插件处理的MIME类型数量。  
检测插件方法
```
// IE10 以上
et hasPlugin = function(name){
    name = name.toLowerCase();
    for(let plugin of window.navigator.plugins){
        if(plugin.name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }
    return false;    
}
// 旧版本
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(ex){
        return false;
    }
}
```


### screen对象
保存客户端能力信息
| 属性 | 说明 |
|----| ----|
|window.screen.availHeight| 屏幕像素高度减去系统组件高度|
|availLeft| 没有被系统组件占用的屏幕的最左侧像素|
|availTop|没有被系统组件占用屏幕的最顶端像素|
|availWidth|宽度|
|colorDepth|屏幕颜色的位数|
|height| 屏幕像素高度|
|left|当前屏幕左边的像素距离|
|pixeDepth | 屏幕的位深|
|top | 当前屏幕顶端的像素距离|
|width | 屏幕像素宽度|
|orientation|返回Screen Orientation API 中屏幕朝向|

### history对象
表示当前窗口首次使用以来用户的导航历史记录。
```
// 后退一页
history.go(-1);

//前进一页
history.go(1);
//前进两页
history.go(2);

//参数也可以是一个字符串，会导航到历史中包含该字符串的第一个位置。可能涉及前进或后退。
// 导航到最近的baidu页面
history.go('baidu');

//两种简写方法
history.back(); // 后退
history.forward();  // 前进
history.length;   // 返回历史记录条目
```

#### 历史状态管理
`pushState`
