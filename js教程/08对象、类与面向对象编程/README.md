## 对象、类与面向对象编程
#### 属性分为：数据属性和访问器属性。
1. 数据属性
报错数据值的位置。值会从这个位置读取，也会写入到这个位置。有4个特性。
* [[Configurable]]:表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改成访问器属性。默认为true。
* [[Enumberable]]:表示属性是否可以通过for-in循环返回。默认为true。
* [[Writable]]:表示属性的值是否可以被修改。默认为true。
* [[Value]]:包含属性实际的值。默认为undefined。
修改属性的默认特性使用`Object.defineProperty()`方法。接收3个参数：属性对象、属性名称、一个描述符对象。最后一个描述符对象其实是上面4个特性。
```
let person = {};
Object.defineProperty(person, "name",{
  writable:false,
  value: "Nicholas"
});
console.log(perpson.name);     // "Nicholas"
person.name = "Greg";
console.log(perpson.name);     // "Nicholas"
```
如果设置了`configurable`为false，那么该属性不能从对象上删除，变成不可配置，再也不能变回可配置的了。
2. 访问器属性
不包含数值。包含一对getter和setter函数。访问器属性不能直接定义，要通过Object.defineProperty()这个方法来定义。
* [[Configurable]]:表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改成访问器属性。默认为true。
* [[Enumberable]]:表示属性是否可以通过for-in循环返回。默认为true。
* [[Get]]:获取函数。在读取属性时调用。
* [[Set]]:设置函数。在写入属性时调用。
```
//包含私有属性year_ 和公共成员 edition
let book = {
  year_: 2017,
  edition:1
 }
 Object.defineProperty(book,"year",{
  get(){
    return this.year_;
  },
  set(newValue){
    if(newValue > 2017){
      this.year_ = newValue;
      this.edition += newValue - 2017;
    }
  }
 });
 book.year = 2018;
 console.log(book.edition);      // 2
```
#### 定义多个属性
```
let book = {};
Object.defineProperties(book,{
  year_:{
    value:2017
  },
  edition:{
    value:1
  },
  year: {
    get(){
      return this.year_;
    },
    set(){
      if(newValue > 2017){
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    }
  }
});
```

#### 读取属性的特性
使用`Object.getOwnPropertyDescriptor()`方法读取指定属性的属性描述符。接收两个参数：属性所在的对象和要取得其描述符的属性名。
```
//这里直接连接上面代码
let descriptor = Object.getOwnPropertyDescriptor(book,"year_");
console.log(descriptor.value);     // 2017
console.log(descriptor.configurable);    // false
console.log(descriptor.get);           // "undefined"
```
使用`Object.getOwnPropertyDescriptors()`静态方法，会在每个自有属性上调用`Object.defineProperties()`并在一个新对象中返回它。
```
console.log(Object.getOwnPropertyDescriptors(book));
/*
{
  edition:{
    configurable: false
    enumerable: false
    value: 1
    writable: false
  },
  year:{
    configurable: false
    enumerable: false
    get: ƒ get()
    set: ƒ set()
  },
  year_{
    configurable: false
    enumerable: false
    value: 2017
    writable: false
  }
}
*/
```
#### 合并对象
` Object.assign(target, ...sources)`目标对象和源对象  
描述  
如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。  
Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的\[\[Get\]\]和目标对象的\[\[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。  
String类型和Symbol类型的属性都会被拷贝。 
在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。 
注意，Object.assign 不会跳过那些值为 [null] 或 [undefined]的源对象。 

#### 对象标识及相等判定
`Object.is()` 处理===操作符也无能为力的场景。
```
true === 1;           // false
Object.is(true,1);   // false
+0 === -0;           // true
Object.is(+0,-0);   // false
true === 1;           // false
// 判定是否为NaN
NaN === NaN
isNaN(NaN)         // true  要用讨厌的isNaN()
Object.is(NaN,NaN)    // true

// 要检查超过两个值，用递归进行相等性传递
function recur(x,...rest){
  return Object.is(x,rest[0]) && (rest.length < 2) || recur(...rest);
}
```

#### 增强的对象语法
1. 属性值简写
```
let name = "Matt";
let preson = {
  name: name
}
// ====
let person = {
  name
}
```
2. 可计算属性
```
const nameKey = "name";
const ageKey = "age";
const jobKey = "job";
let person = {
  [nameKey]:"Matt",
  [ageKey]:27,
  [jobKey]:'writer'
};
person;            // {name: "Matt", age: 27, job: "writer"}

let num = 0;
function getUniqueKey(key){
  return `${key}_${num++}`;
}
let person = {
  [getUniqueKey(nameKey)]:"Matt",
  [getUniqueKey(ageKey)]:27,
  [getUniqueKey(jobKey)]:'writer'
};
person;        // {name_0: "Matt", age_1: 27, job_2: "writer"}
```
3. 简写方法名
```
let person = {
  sayName: function(name){
    console.log(`my name is ${name}`;
  }
}
//等同于
let person = {
  sayName(name){
    console.log(`my name is ${name}`;
  }
}
//简写方法名与计算属性键相互兼容
const methKey = 'sayName'
let person = {
  [methKey](name){
    console.log(`my name is ${name}`;
  }
}
```

#### 对象解构
可以在一条语句中使用嵌套数据实现一个或多个赋值操作。就是使用与对象匹配结构来实现对象属性赋值。
