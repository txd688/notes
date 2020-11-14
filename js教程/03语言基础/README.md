## 语言基础  

### 区分大小写
无论变量、函数名还是操作符，都区分大小写。

### 标识符
变量、函数、属性或函数参数的名称。可以由一或多个下列字符组成：
* 第一个字符必须是一个字母、下划线(_)或者美元符号($)；
* 剩下的其他字符可以是字母、下划线、美元符号或者数字。
>注:一般使用驼峰大小写形式(例:doSomethingImportant)

### 注释
```
//单行注释

/*
多
行
注
释
*/
```

### 严格模式
ECMAScript3的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。要对整个脚本启用严格模式，在脚本开头加上这一行:
`  "use strict"  `
预处理指令。也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可：
```
function doSomething(){
  "user strict"
  //函数体
 }
```

### 关键字与保留字
#### 一些特殊用途的关键字  
break         do         in        typeof        case        else        instanceof        var   
catch         export     new       void          class       extends     return            while  
const         finally    super     with          continue    for         switch            yield
debugger      function   this      default       if          throw       delete           import     try

#### 未来保留字

始终保留：  
enum  

严格模式下保留:  
implements    package   public   interface   protected   static   let    private

模块代码中保留：  
await  
这些词汇不能用作标识符，但现在还可以作对象的属性名。一般来说，再好还是不要使用。

### 变量
可以用于保存任何类型的数据。每个变量只不过是个用于保存任意值得命名占位符。var 、 const 和 let 。  

### var
声明提升
```
function test(){
  message = 'hi';//全局变量
}
console.log(message);  //"hi"

function foo(){
  console.log(age);
  var age = 26;
}
foo();  //underfined
///等价于
function foo(){
  var age;
  console.log(age);
  age = 26;
}
// 提升（hoist），把所有变量声明都拉到函数作用域的顶部。此外反复多次使用var声明同一个变量也没有问题。
```

### let
区别：let声明的范围是块作用域，而var声明的范围是函数作用域。
```
if(true){
  var name = "Matt";
  console.log(name);    //Matt
}
console.log(name);     //Matt

if(true){
  let age = 36;
  console.log(age);    //26
}
console.log(age);     //ReferenceError:age 没有定义
```
在这里，age变量之所以不能再if块外部被引用，是因为它的作用域仅限于该块内部。  
另外let也不允许同一个块作用域多次声明，导致报错。
1. 暂时性死区
let 与 var 另一个区别： let 声明的变量不会再作用域中被提升
```
console.log(name);    //undefined
var name = "matt";

cosole.log(age);     //ReferenceError: age 没有定义
let age = 26
```
2. 全局声明
使用let在全局作用域中声明的变量不会成为window 对象的属性(var 声明的变量则会)。
```
var name = "matt";
console.log(window.name);     //"matt"

let age = 26;
console.log(window.age);     //undefined
```

3. 条件声明
```
if(typeof name === 'undefined'){  
  let name;
}
name = 'matt';
```
### const
行为为与let基本相同，区别是用它声明的变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误。
 ```
 const age = 36;
 age = 23;    //TypeError:给常量赋值
```

## 数据类型
6种简单数据类型：
* Underfined
* Null
* Boolean
* Number
* String
* Symbol
复杂数据类型 Object

### typeof 操作符
对一个值使用typeof 操作符会返回下列字符串之一：
* "undefined" 表示值为定义
* "boolean" 表示值为布尔值
* "string" 表示值为字符串
* "number" 表示值为数值
* "object" 表示值为对象（而不是函数）或null(null被认为是一个对空对象的引用)
* "function" 表示值为函数
* "symbol" 表示值为符号

### Undefined 类型
Undefined类型只有一个值，就是特殊值undefined。当使用var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了undefined值。
```
let message;
console.log(message == undefined); // true

let age;
console.log(typeof age);  //"undefined"
console.log(typeof demo); //"underfined"
```
上面有个小点，在对未初始化的变量调用typeof时，返回的结果是"undefined",但对未声明的变量调用也是"undefiled"。

### Null类型
Null类型同样只有一个值，即特殊值null。表示一个空对象指针。
`console.log(null == undefined);  //true  `

### Boolean 类型
有两个字面值：true 和 false。

### Number 类型
Number 类型使用了IEEE 754 格式表示整数和浮点数(双精度值)。
 
