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
1. 符号的基本使用
```
let sym = Symbol();   
console.log(typeof sym);       // symbol

//添加描述，方便未来调试.与标识无关。
let fooSymbol = Symbol('foo');
let otherSymbol = Symbol('foo');
console.log(fooSymbol == otherSymbol);       //false
```
没有字面量语法，只要创建一个Symbol()实例将其用作对象的新属性，不会覆盖已有的对象属性。不能用作构造函数。  

2. 使用**全局符号**注册表
Symbol.for()方法可以重用和共享符号实例。该方法执行幂等操作，会检测全局运行的注册表，如果不存在创建，存在返回。(传入字符串，任何值都会被转为字符串)
```
let fooGlobalSymbol = Symbol.for('foo');       //创建新的符号
let otherGlobalSymbol = Symbol.for('foo')；    // 重用已有符号
console.log(fooGlobalSymbol == otherGlobalSymbol);        //true
```
Symbol.keyFor()来查询是否有全局符号。(对应上面的方法)该方法接收一个符号，如果不是报错。
```
//创建全局符号
let a = Symbol.for('foo');
console.log(Symbol.keyFor(a));     // foo

//创建普通符号
let b = Symbol('foo');
console.log(Symbol.keyFor(b));   // undefined
```

3. 使用符号作属性
凡是可以使用字符串或数值作为属性的地方，都可以使用符号。
```
let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');
let obj = {
  [s1] : 'foo val'
};
//如果是变量，要有[]包裹，也可使用：obj[s1] = 'foo val';
console.log(obj);     //{Symbol(foo): foo val}
Object.defineProperty(obj, s2, {value: 'bar val'});
Object.defineProperties(obj, {
   [s3]: {value: 'baz value'},
   [s4]: {value: 'qux value}
 });
 //上述4种方法都可以使用。
 ```
 另外 Object.getOwnPropertyNames()返回常规属性数组，Object.getOwnPropertySymbols()返回符号属性数组。Reflect.ownKeys()返回这两种。
 ```
 let s1 = Symbol('foo');
 let s2 = Symbol('bar');
 let obj = {
    [s1]: 'foo val',
    [s2]: 'bar val',
    baz: 'baz val',
    qux: 'qux val'
  }
  console.log(Object.getOwnPropertyNames(obj));          // ["baz", "qux"]
  console.log(Object.getOwnPropertySymbols(obj));        // [Symbol(foo), Symbol(bar)]
  console.log(Reflect.ownKeys(obj));                     // ["baz", "qux", Symbol(foo), Symbol(bar)]
 ```
 如果没有显式地保存这些属性的应用，必须遍历对象的所有符号属性才能找到相应的属性键：
 ```
let obj = {
  [Symbol('foo')]: 'foo val',
  [Symbol('bar')]: 'bar val',
  baz: 'baz val',
  qux: 'qux val'
}
let barSymbol = Object.getOwnPropertySymbols(obj).find((sym) => sym.toString().match(/bar/))
console.log(barSymbol);            // Symbol(bar)
 ```
 
4. 常用内容符号
用于暴露语言内部行为，可以直接访问、重写或模拟这些行为。

5. Symbol.asyncIterator
一个方法，该方法返回对象默认的AsyncIterator.由 for-await-of 语句使用。实现异步迭代器API的函数。
for-await-of 循环会利用这个函数执行异步迭代操作。循环时，它们会调用以Symbol.asyncIterator为键的函数，并期望这个函数会返回一个实现迭代器API的对象。很多时候返回的是AsyncGenerator：
```
class Foo{
    async *[Symbol.asyncIterator](){}
}
let f = new Foo();
console.log(f[Symbol.asyncIterator]());
//AsyncGenerator {<suspended>}
```
技术上，这个有Symbol.asyncIterator 函数生成的对象应该通过其next()方法陆续返回Promise实例。可以先显式地调用next()方法返回，也可以隐式地通过异步生成函数返回。
```
class Emitter{
    constructor(max){
        this.max = max;
        this.asyncIdx = 0;
    }
    
    async *[Symbol.asyncIterator](){
        while(this.asyncIdx < this.max){
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}

async function asyncCount(){
    let emitter = new Emitter(5);
    
    for await(const x of emitter){
        console.log(x);
    }
}

asyncCount()
/*
0
1
2
3
4
*/
```
6. Symbol.hasInstance
一个方法，该方法决定一个构造函数对象是否认可一个对象是它的实例。由 instanceof 操作符使用。instanceof 操作符可以用来确定一个对象实例的原型链上是否有原型。
```
function Foo(){}
let f = new Foo();
console.log(f instanceof Foo);   // true

class Bar{}
let b = new Bar()
console.log(b instanceof Bar)     //true
```
在ES6中，instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系。以 Symbol.hasInstance 为键的函数执行同样的操作，只是操作数对调了一下：
```
function Foo() {}
let f = new Foo()
console.log(Foo[Symbol.hasInstance](f))        // true

class Bar{}
let b = new Bar()
console.log(Bar[Symbol.hasInstance](b))       // true
```
这个属性定义在 Function 的原型上，因此默认在所有函数和类上都可以调用。由于 instanceof 操作符会在原型链上寻找这个属性定义，就跟在原型链上寻找其他属性一样，因此可以再继承的类上通过静态方法重新定义这个函数：
```
class Bar {}
class Baz extends Bar{
    static [Symbol.hasInstance](){
        return false;
    }
}
let b = new Bar();

console.log(Bar[Symbol.hasInstance](b));       //true
console.log(b instanceof Bar);                // true 
console.log(Baz[Symbol.hasInstance](b));      // false
console.log(b instanceof Baz);                // false
```

7. Symbol.isConcatSpreadable
用于配置某对象作为 Array.prototype.concat()方法的参数时是否展开其数组元素，如果为 true ,则应该用 Array.prototype.concat() 打平其**数组元素**，追加到数组末尾。如果为 false 或者假值会导致**整个对象**被追加到数组末尾。(提示：Array.prototype.concat() 这个方法用来合并数组)。
```
let initial = ['foo'];
let array = ['bar'];
console.log(array[Symbol.isConcatSpreadable]);        // undefined
console.log(initial.concat(array));                  // ["foo", "bar"]

array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array));                 // ["foo", Array(1)]

let arrayLikeObject = { length: 1, 0:'baz'};       //这是个类数组
let initial2 = ['foo']
console.log(arrayLikeObject[Symbol.isConcatSpreadable])     // undefined
console.log(initial2.concat(arrayLikeObject));              //  ["foo", {…}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial2.concat(arrayLikeObject));              //   ["foo", "baz"]
```

8. Symbol.iteartor
一个方法，该方法返回对象默认的迭代器。由 for-of 语句使用。
```
class Foo{
    *[Symbol.iterator]() {}
}
let f = new Foo();
console.log(f[Symbol.iterator]());       // Generator {<suspended>}
```
可以通过next()显式地返回，也可以隐式地通过生成器函数返回：
```
class Emitter{
    constructor(max){
        this.max = max;
        this.idx = 0;
    }
    
    *[Symbol.iterator](){
        while(this.idx < this.max){
            yield this.idx++;
        }
    }
}

function count(){
    let emitter = new Emitter(5);
    
    for (const x of emitter){
        console.log(x);
    }
}
count();
/*
0
1
2
3
4
*/
```

9. Symbol.match
一个正则表达式方法，该方法用正则表达式去匹配字符串。正则表达式的原型上默认有这个函数的定义。因此所有正则表达式实例默认是这个String 方法的有效参数。由String.prototype.match() 使用。
```
console.log(RegExp.prototype[Symbol.match]);        // [Symbol.match]() { [native code] }

console.log('foobar'.match(/bar/));             // ["bar", index: 3, input: "foobar", groups: undefined]
```
String.prototype.match() 传入非正则表达式会转化为RegExp对象。如果想改变这种行为，让方法直接使用参数，则重新定义 Symbol.match 函数以取代默认对正则表达式求值的行为。返回值没有限制。
```
class FooMatcher{
    static [Symbol.match](target){
        return target.includes('foo');
    }
}

console.log('foobar'.match(FooMatcher));       // true
console.log('barbar'.match(FooMatcher));       // false

// 小提示：上述是静态方法，下面是实例方法。具体查询 static

class StringMatcher{
    constructor(str){
        this.str = str;
    }
    
    [Symbol.match](target){
        return target.includes(this.str);
    }
}
console.log('foobar'.match(new StringMatcher('foo')));      // true
console.log('foobar'.match(new StringMatcher('aa')));       // false
```

10. Symbol.replace
一个正则表达式方法，该方法替换一个字符串中匹配的子串。由 String.prototype.replace() 使用。与上述类似。
```
console.log(RegExp.prototype[Symbol.replace]);      // [Symbol.replace]() { [native code] }

class FooReplace{
    static [Symbol.replace](target,replacement){
        return target.split('foo').join(replacement);
    }
}
console.log('barfoobaz'.replace(FooReplace,'qux'));      // barquxbaz
```

11. Symbol.search
一个正则方法，该方法返回字符串中匹配正则表达式的索引。由 String.prototype.search() 方法使用。
```
console.log(RegExp.prototype[Symbol.search]);        // [Symbol.search]() { [native code] }
console.log('foobar'.search(/bar/));                 //  3

class FooSearch{
    static [Symbol.search](target){
        return target.indexOf('foo');
    }
}
console.log('foobar'.search(FooSearch));          // 0
console.log('barfoobar'.search(FooSearch));       // 3
```
12. Symbol.split
一个正则表达式方法，该方法匹配正则表达式的索引位置拆分字符串。由 String.propotype.split() 方法使用。
```
console.log(RegExp.prototype[Symbol.split]);          // [Symbol.split]() { [native code] }
console.log(('foobarbaz').split(/bar/));              //   ["foo", "baz"]

class FooSplitter{
    static [Symbol.split](target){
        return target.split('foo');
    }
}
console.log('barfoobaz'.split(FooSplitter));        // ["bar", "baz"]

```

13. Symbol.species
一个函数值，该函数作为创建派生对象的结构函数。用于对内置类型实例方法的返回值暴露实例化派生对象的方法。
```
class Bar extends Array {}
class Baz extends Array {
    static get [Symbol.species](){
        return Array;
    }
}

let bar = new Bar();
console.log(bar instanceof Array);         // true
console.log(bar instanceof Bar);          // true
bar = bar.concat('bar');
console.log(bar instanceof Array);         // true
console.log(bar instanceof Bar);          // true

let baz = new Baz();
console.log(baz instanceof Array);         // true
console.log(baz instanceof Baz);          // true
baz = baz.concat('baz');
console.log(baz instanceof Array);         // true
console.log(baz instanceof Baz);          // false
```

14. Symbol.toprimitive
一个方法，该方法将对象转换为相应的原始值。
```
class Foo {}
let foo = new Foo();
console.log(3 + foo);       // 3[object Object]
console.log( 3 - foo);      // console.log( 3 - foo);
console.log(String(foo));   // console.log(String(foo));

class Baz {
    constructor(){
        this[Symbol.toPrimitive] = function(hint){
            switch(hint){
                case 'number':
                    return 3;
                case 'string':
                    return 'string bar';
                case 'default':
                default:
                    return 'default bar';    
            }  
        }
    }  
}
let baz = new Baz();
console.log(3 + baz);    // 3default bar
console.log(3 - baz);    // 0
console.log(String(baz));  //string bar
```

15. Symbol.toStringTag
一个字符串，该字符串用于创建对象的默认字符串描述。由 Object.protoype.toString() 使用。通过 toString() 方法获取对象标识时，会检索由 Symbol.toStringTag 指定的实例标识符，默认为 "Object"。内置类型已经指定了这个值，但自定义类型实例还需要明确定义。
```
let s = new Set();
console.log(s);        // Set(0) {}
console.log(s.toString());      // [object Set]
console.log(s[Symbol.toStringTag]);      // Set

class Foo {}
let foo = new Foo();
console.log(foo);         // Foo {}
console.log(foo.toString());       // [object Object]
console.log(foo[Symbol.toStringTag]);       // undefined

class Bar {
    constructor(){
        this[Symbol.toStringTag] = "Bar";
    }
}
let bar = new Bar();
console.log(bar);            // Bar {Symbol(Symbol.toStringTag): "Bar"}
console.log(bar.toString());      // [object Bar]
console.log(bar[Symbol.toStringTag]);        // Bar
```

16. Symbol.unscopables
一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中排除。让其映射对应属性的键值为true，就可以阻止该属性出现在with环境绑定中。
```
let o = {foo :'bar'};
with (o){
    console.log(foo);          // bar
}
o[Symbol.unscopables] = {
    foo: true
};
with (o){
    console.log(foo);       // ReferenceError
}
```
### Object 类型
一组数据与功能的集合。创建实例，再添加属性与方法。`let obj = new Object();`
每一 Object 的实例都有如下属性和方法：
* constructor:是一种创建和初始化class创建的对象的特殊方法。
* hasOwnProperty: 用于判断当前对象实例(不是原型)上是否存在给定的属性。
* isPrototypeof: 判断当前对象是否为另一个对象的原型。
* propertyIsEnumerable: 判断给定的属性是否可以使用。
* toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
* toString(): 返回对象的字符串表示。
* valueOf(): 返回对象对应的字符串、数值或布尔值表示。

### 操作符

#### 一元操作符
1. 递增/递减操作符
```
let age = 29;
++age;   // 30
--age    // 29
age++;  //30
age--;  //29
//区别：前缀版在操作的变量前发生，后缀版在操作的变量后发生
let anotherAge = ++age +2;
cosole.log(age);     // 30
console.log(anotherAge);  // 32

let num1 = 2;
let num2 = 20;
let num3 = num1-- + num2;
let num4 = num1 + num2;
console.log(num3);     // 22
console.log(num4);     // 21
```
2. 一元加和减
放在数值前无影响，但放在非数值的，会执行与使用与Number()转型函数一样的类型转换：布尔值false和true转换为0和1，字符串根据特殊规则进行解析，对象会掉用它们的valueOf()和/或toString()方法以得到可以转换的值。
```
let num = 25;
num = +num;
console.log(num);        // 25

let s1 = "01";
let s2 = "1.1";
let s3 = "z";
let b = false;
let f =1.1;
let o = {
  valueOf(){
     return -1;
  }
};

s1 = +s1;   // 1
s2 = +s2;   // 1.1
s3 = +s3;  // NaN
b = +b;    // 0
f = +f;    // 1.1
o = +o;    // -1
```

3. 位操作符
数值的底层操作，也就是操作内存中表示数据的比特(位)。ECMAScript中的所有数值都以IEEE 754 64位格式存储，但位操作并不直接应用到64位表示，而是先把值转化为32位整数，在进行位操作，之后再把结果转化为64位。因为64位整数存储格式是不可见的，就只需要考虑32位整数即可。  
前31位表示整数值，第32位表示数值符号，0表示正，1表示负，这一位称为符号位，它决定了数值其余部分的格式。
**正值**以真正的二进制格式存储，即31位中的每一位都代表2的幂。比如：数值18的二进制格式为 0000000000000000010010 或更为精简的 10010。后者是用到的5个有效位，决定了实际的值。如下所示：
```
1             0              0           1                0
2**4 * 1      2**3 * 0     2**2 * 0     2**1 * 1       2**0 * 0
```
**负值** 以一种称为二补数的二进制编码存储。一个数值的二补数通过如下3个步骤计算得到：
  1. 确定绝对值的二进制表示(如，对于-18，先确定18的二进制表示)
  2. 找到数值的一补数，换句话说，就是每个0都变成1，每个1变成0
  3. 给结果加1
基于上述步骤确定-18的二进制表示：
  1. `0000  0000  0000  0000  0000  0000  0001  0010`
  2. `1111  1111  1111  1111  1111  1111  1110  1101`
  3. `1111  1111  1111  1111  1111  1111  1110  1110` 所以这是-18的二进制表示。
ECMAScript 会帮我们记录这些信息。在把负值输出为一个二进制字符串时，我们会得到一个前面加了减号的绝对值,如下
```
let num = -18;
console.log(num.toString(2));      // "-10010"
```
在将-18转换为二进制字符串时，结果得到-10010。转换过程会求得二补数，然后在一更符合逻辑的形式表示出来。  
注意: 默认情况下，ECMScript 中的所有整数都表示为有符号数。不过，确实存在无符号整数。对无符号整数来说。第32位不表示符号，因为只有正值，所以无符号数比有符号数整数的范围更大。  
在对ECMAScript中的数值应用位操作符时，后台会发生转换：64位数值会转换为32位数值，然后执行位操作，最后再把结果从32位转换位64位存储起来。整个过程就像处理32位数值一样。这也导致了一个奇特的副属性，即特殊值NaN和Infinity 在位操作中都会被当成0处理。  
如果位操作符应用到非数值，那么会先使用Number()函数转为数值，然后在应用位操作。最终结果是数值。

1. 按位非(~)
返回数值的补数。按位非的最终结果是对数值取反减1.
```
let num1 = 25;              //二进制 00000000000000000000000000011001
let num2 = ~num1;           //二进制 11111111111111111111111111100110
console.log(num2);          // -26
//与如下操作结果一样
let num1 = 25;
let num2 = -num1 - 1;
console.log(num2);    // -26
```
位操作的速度更快。因为位操作是在数值底层表示上完成的。

2. 按位与(&)
有两个操作数，将两个数的每一个位对齐。按真值表规则，对每一位执行相应的操作。
|  第一个数值的位   | 第二个数值的位  |   结果    |
|         1        |        1        |     1     |
|         1        |        0        |     0     |
|         0        |        1        |     0     |
|         0        |        0        |     0     |
在两个都是1时返回1，在任何一位为0时返回0  
下面例子，对数值25和3求与操作
```
let result = 25 & 3;
console.log(result);         // 1
```
25 = 0000  0000  0000  0000  0000  0000  0001  1001  
3  = 0000  0000  0000  0000  0000  0000  0000  0011  
\---------------------------------------------------  
AND= 0000  0000  0000  0000  0000  0000  0000  0001  
因此结果就是 1

3. 按位或(|)
有两个操作符。在至少一位是1时返回1，两位都是0返回0。
```
let result = 25 | 3;
console.log(result);     // 27
```
25 = 0000  0000  0000  0000  0000  0000  0001  1001  
3  = 0000  0000  0000  0000  0000  0000  0000  0011  
\---------------------------------------------------  
OR = 0000  0000  0000  0000  0000  0000  0001  1011    
因此结果就是 27

4. 按位异或(^)
两个操作符。


