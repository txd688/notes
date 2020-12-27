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
```
let person = {
  name: 'Matt',
  age: 27
};
let {name: personName, age: personAge} = person;
//等同于 简写
let {name, age} = person;
let {name, job="writer"} = person;        // 也可以给默认值，如果没有，则为undefined
```
解构在内部使用函数ToObject()把源数据结构转化为对象，也就是原始值会被当成对象。如果是null 和 undefined不能被结构，否则会抛出错误。
```
let { length } = 'foobar';       
console.log(length);          // 6
```
解构如果是变量必须声明，或者包含在一对括号中。
```
ler personName, personAge;
let person = {
  name: 'Matt',
  age: 27
};
({name:personName, age: personAge} = person);
```
嵌套解构
```
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software'
  }
};
let personCopy = {}
({
  name: personCopy.name,
  age: personCopy.age,
  job: personCopy.job
} = person);
// 引用赋值，如果修改会一起修改。
// 或者
let { job: {title} } = person;

// 在外层属性没有定义的情况下不能使用嵌套。无论是源对象还是目标对象都一样。
// 如果后面赋值错误，只会解构前面成功的，是部分解构。
```

### 创建对象

#### 工厂模式
```
function createPerson(name, age, job){
  let o = new Ojbect();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
    
  };
  return o;
}
let person1 = createPerson("Admin", 29, "writer");
let person2= createPerson("Cidy", 20, "doctor");
```
解决了创建多个类型对象的问题，但没有解决对象标识问题(即新创建对象是什么类型)；
#### 构造函数模式
```
function Person(name, job, age){
  this.name = name;
  this.job = job;
  this.age = age;
  this.sayName = function(){
    console.log(this.name);
  }
}
let person1 = new Person("Admin", 29, "writer");
let person2= new Person("Cidy", 20, "doctor");
```
Person() 构造函数代替了createPerson()工厂函数。   
区别：
* 没有显式地创建对象。
* 属性和方法直接赋值给了this。
* 没有return。
要创建Person实例，应使用new操作符。以这种方式调用构造函数会执行如下操作：
* 在内存中创建一个新对象
* 这个新对象内部的\[\[Prototype]]特性被赋值为构造函数的prototype属性
* 构造函数内部的this被赋值为这个新对象。(即this指向新对象)
* 执行构造函数内部的代码(给新对象添加属性)。
* 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象。
上面person1和person2分别保存着Person不同实例，但都有一个constructor属性指向Person,如下所示：
```
console.log(person1.constructor == Person);      // true
console.log(person2.constructor == Person);      // true
```
constructor 本来是用于标识对象类型的。不过一般认为instanceof操作符值确定对象类型更可靠的方式。  
构造函数不仅可以写成函数声明形式，也可以写成函数表达式。
```
let Person = function(name, age, job){
  ...
}
```
1. 构造函数也是函数
与普遍函数区别：是否调用new操作符。否则为普通函数。
```
//作为构造函数
let person1 = new Person("Admin", 29, "writer");
person.sayName();

//作为函数调用
Person("Greg", 27, "docutor");
window.sayName();

//在另外一个对象的作用域中调用
let o = new Object();
person.call(o,"Greg", 27, "docutor");
o.sayName();
```
2. 构造函数的问题
其定义的方法会在每一个实例上都创建一遍。比如person1 和 person2都有名为sayName()方法，但这两个方法不是同一个Function实例。
可以通过以下方式解决，但是全局作用域也被搞乱。
```
function Person(name, job, age){
  this.name = name;
  this.job = job;
  this.age = age;
  this.sayName = sayName;
}
function sayName(){
  console.log(this.name);
}
```
#### 原型模式
每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法，实现属性和方式的共享。
```
function Person(){}
Person.prototype.name = "Bob";
Person.prototype.age = 27;
Person.prototype.job = "docoter";
Person.prototype.sayName = function(){
  console.log(this.name);
};
let person1 = new Person();
person1.sayName();   // "Bob"

let person2 = new Person();
person2.sayName();   // "Bob"
person1.sayName() == person2.sayName();       // true
```
这里的属性和sayName()方法都直接添加到了Person的prototype属性上，构造函数体中什么也没有。
1. 理解原型
无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个prototype属性(指向原型对象)。默认情况下，所有原型对象自动获得一个名为constructor的属性，指向与之关联的构造函数。如前面,Person.prototype.constructor指向Person,然后因构造函数而异，可能会给原型对象添加其他属性和方法。  
在自定义构造函数时，原型对象默认只会获得constructor属性，其他的所有方法都继承自Object。每次调用构造函数创建一个新实例
