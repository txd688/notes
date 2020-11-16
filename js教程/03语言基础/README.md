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
八进制：第一个数字必须是零(0)，es6后改为: 0o。例：070 // 56。
十六进制：以 0x 开头（区分大小写）后面是（0-9 以及 A-F）。例： 0xA  //10         0x1f   //31   

1.浮点数
数值中必须包含小数点，而且小数点后面必须至少一个数字。存在精度问题。0.1 + 0.2 //0.30000000000000004
```
let a = 1.1;
let b = .1; //有效，但不推荐
let c = 3.125e7  //科学计数法 等于3.125 * 10的7次幂  31250000
let b = 3.1e-7    //0.0000003.1
```

2.值得范围
最小值：`Number.MIN_VALUE` 5e-324
最大值：`Number.MAX_VALUE` 1.7976931348623157e+308
如果超过最大值会转化为 Infinity(正无穷大) 或 -Infinity(负无穷大)。
isFinite(num) 这个函数可以检测是否超出有限数值范围。

3.NaN
"不是数值"(Not a Number),用来表示本来要返回数值的操作失败了(而不是抛出错误)。比如 0/0 返回NaN。如果分母为0, 5/0 会返回Infinity。
涉及NaN的操作始终返回NaN。NaN 不等于包括NaN在内的任何值。NaN == NaN //false
`isNaN()`
该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。吧一个值传给isNaN()后，改函数会尝试把它转化为数值。某些非数值的值可以直接转化为数值，如字符串"10"或布尔值。任何不能转化为数值的值都会导致这个函数返回true。例：
```
console.log(isNaN(NaN));   //true
console.log(isNaN(NaN));   //false , 10是一个数值
console.log(isNaN("10"));  //false
console.log(isNaN("bulue"));   //true
console.log(isNaN(true));     //false
```

4. 数值转换
**Number()**  
是转型函数，可用于任何数据类型。
 * 布尔值，true 转为 1，false 转为 0。
 * 数值，直接返回
 * null，返回 0.
 * undefined，返回NaN
 * 字符串，应用一下规则：
    * 如果字符串包含数值字符，转换为一个十进制数值。因此，Number("1")返回1 。
    * 如果字符串包含有效浮点数，则会转换为相应浮点数。
    * 如果包含有效的十六进制格式如"0xf",转换为对应的十进制整数值。
    * 如果是空字符串返回 0 。
    * 如果字符串包含除上述情况之外的其他字符，返回NaN。
* 对象，调用 valueOf() 方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString() 方法，再按照转换字符串的规则转换。 

**parseInt()**
从第一个字符开始检测，直到末尾或者中途配到非数值字符停止。第二个参数用于指定底数(进制数)。
```
let num1 = parseInt("12a23b");           // 12
let num2 = parseInt("");                 // NaN
let num3 = parseInt("0xA");              //16 解释为十六进制整数
let num4 = parseInt("1.34");             // 1

let num5 = parseInt("AF", 16);          //175   如果指定进制可以省略 0x
let num5 = parseInt("AF");
```

**parseFloat()**
与parseInt()类似，区别始终忽略字符串开头的零。
```
let num1 = parseFloat("123blue");      // 1234
let num2 = parseFloat("0xA");          // 0
let num3 = parseFloat("22.31.123");    // 22.31
let num4 = parseFloat("3.12e6");       // 3120000  与parseInt()不同可以识别科学计数法
```

### String 类型
表示零或多个16位Unicode字符序列。可以使用双引号(")、单引号(')、反引号(`)；  

1. 字符字面量
\n        换行
\t        制表
\b        退格
\r        回车
\f        换页
\\        反斜杠
\'        单引号
\"        双引号
\`        反引号
\xnn      以十六进制编码nn表示的字符
\unnn     以十六进制编码nnn表示Unicode字符

2. 字符串的特点
不可变(immutable),一旦创建，它们的值就不能变了。要修改某个变量中的字符串，必须销毁原始字符串，然后将新值得另一个字符串保存到该变量。

3. 转换字符串
有两种方法： dateObject.toString() 和 String()；
**toString()** 方法可用于数值、布尔值、对象和字符串值。null 和 undefined 没有这个方法。可以接收一个底数参数。
```
let age = 11;
let ageString = age.toString();      // "11"
let found = true;
let foundString = found.toString();  // "true"
let num = 10;
console.log(num.toString());         // "10"
console.log(num.toString(2));        // "1010"
console.log(num.toString(8));        // "12"
console.log(num.toString(10));       // "10"
console.log(num.toString(16));       // "a"
```
**String()** 始终返回表示相应类型的字符串。遵循以下规则：
 * 如果值有toString()方法，则调用该方法（不传参数）并返回结果
 * 如果值为 null，返回"null" 。
 * 如果值为 undefined，返回 "undefined" 。、
 
 4. 模板字面量
 ECMScript6 新增。可以保留换行字符，可以跨行定义字符串。
 ```
 let pageHTML = `
 <div>
  <a href="#">
    <span>Jake</span>
  </a>
</div>`;
```
5. 字符串插值
在模板字符串中使用 ${} ,所有插入的值都会使用toString()强制转型为字符串。也可以调用函数和方法。

6. 模板字面量标签函数
标签函数接收一个被插值分割后的的模板和对每一个插值表达式的结果。
```
let a = 6;
let b= 9;
function simpleTag(strings,a1,a2,sum){
  console.log(strings);
  console.log(a1);
  console.log(a2);
  console.log(sum);
  return 'foot';
}
let tag = simpleTag`${ a } + ${ b } = ${ a + b }`;  
//  ["", " + ", " = ", ""]
//  6
//  9
//  15
console.log(tag);         //   foot

//函数可以转变为以下：
function simpleTag2(strings,...arg){
  console.log(strings);
  for(const i of arg){
    console.log(i);
  }
  return 'foot';
}

//过滤HTML字符串，防止用户输入恶意内容
function filterSpitefulCode(strings,...values){
   return strings.reduce((s,v,idx)=>{
       if(idx>0){
           const prev=values[idx-1].replace(/</g,"&lt;")
           .replace(/>/g,"&gt;")
           .replace(/&/g, "&amp;");
           s+=prev
       }
       return s+v
   },'')
}

const badCode= '<script>alert("abc")</script>'
const message=filterSpitefulCode`<p>${badCode} has been transformed safely~`

console.log(message)
```

7. 原始字符串
使用模板字面量可以直接获取原始的模板字面内容，而不是转义后的字符。使用默认 String.raw 标签函数：
```
console.log(`\u00A9`);       // ©
console.log(String.raw`\u00A9`);     // \u00A9      
console.log(`first line \nsecond line`);
//  first line 
//  second line
console.log(String.raw`first line \nsecond line`);
//  first line \nsecond line

//也可以通过标签函数第一个参数，.raw 属性取得每个字符串的原始内容：
function printRaw(strings){
    for(const i of strings){
        console.log(i);
    }
    console.log('--------------------------------');
    for(const j of strings.raw){
        console.log(j);
    }
}
printRaw`\u00A9 ${ 'and' } \n`;
//   ©
//     
//   --------------------------------
//   \u00A9 
//   \n
```

### Symbol 类型
符号是原始值，且是唯一、不可变得。用途：确保对象属性使用唯一标识符，不会发生属性冲突的危险。

