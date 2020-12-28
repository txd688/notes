## 对象、类与面向对象编程
#### 属性分为：数据属性和访问器属性。
1. 数据属性
报错数据值的位置。值会从这个位置读取，也会写入到这个位置。有4个特性。
* \[\[Configurable]]:表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改成访问器属性。默认为true。
* \[\[Enumberable]]:表示属性是否可以通过for-in循环返回。默认为true。
* \[\[Writable]]:表示属性的值是否可以被修改。默认为true。
* \[\[Value]]:包含属性实际的值。默认为undefined。
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
* \[\[Configurable]]:表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改成访问器属性。默认为true。
* \[\[Enumberable]]:表示属性是否可以通过for-in循环返回。默认为true。
* \[\[Get]]:获取函数。在读取属性时调用。
* \[\[Set]]:设置函数。在写入属性时调用。
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
在自定义构造函数时，原型对象默认只会获得constructor属性，其他的所有方法都继承自Object。最主要的是：*实例与构造函数原型之间有直接联系，实例和构造函数之间没有联系*
```
function Person(){}
Person.prototype.constructor === Person;      // true
Person.prototype.__proto__ === Object.prototype;   // true
Person.prototype.__proto__.constructor === Object;    // true
person.prototype.__proto__.__proto__ === null;       // true

let person1 = new Person();
person1.__proto__ === Person.prototype;   // true
person1.__proto__.constructor === Person;    // true

// instanceof检查实例的原型链中是否包含指定构造函数的原型 
person1 instanceof Person;       // true
person1 instanceof Object;       // true
Person.prototype instanceof Object;     // true
```
>提示： \_\_proto__ 是历史遗留属性，实际上是基于 \[\[Prototype]]的访问器属性（getter/setter）。它是因为历史原因而保留下来的。现在可以使用 Object.getPrototypeOf/Object.setPrototypeOf 方式替代直接操作 \_\_proto__，用来获取和设置原型。  
可以使用`isPrototypeOf()`方法确定两个对象关系：判断指定对象object1是否存在于另一个对象object2的原型链中，是则返回true，否则返回false。    
`Person.prototype.isPrototypeOf(person1); // true`  
`Object.getPrototypeOf()`方法返回参数内部特性\[\[Prototype]]的值。
`Object.getPrototypeOf(person1) === Person.prototype;   // true`  
`setPrototypeOf()`方法可以先实例的私有特性\[\[Prototype]]写入一个新值。
```
let bieped = {
  numLegs: 2
};
let person = {
  name: 'Matt'
};
Object.setPrototypeOf(person, biped);
person.name;    // Matt
person.numLegs;    // 2
Object.getPrototypeOf(person) === biped;  // true
```
但这个方法会造成性能下架，可以通过`Object.create()`来创建一个新对象，同时为其指定原型：
```
let biped = {
  numLegs: 2
};
let person = Object.create(biped);
person.name = 'Matt';
person.name;    // Matt
person.numLegs;    // 2
Object.getPrototypeOf(person) === biped;  // true
```

2. 原型层级
在通过对象访问属性时，会先搜索对象实例本身，如果未找到，则沿着指针进入原型对象查找。  
同样在对象实例上修改属性，只会在实例上创建这个属性，从而实现**遮蔽**原型对象上的属性。可以通过`delete`操作符完全删除实例上的这个属性，从而使标识符解析过程中继续搜索原型对象。  
`hasOwnPrototype()`方法用于确定某个属性是在实例上还是在原型对象上。
```
function Person(){}
Person.prototype.name = 'Nicholas';
let person1 = new Person();
person1.hasOwnPrototype('name');    // false  来自原型
person.age  = 27;
person1.hasOwnPrototype('age');    // true    来自实例
```

3. 原型和in操作符
有两种方式使用in：单独使用和for-in循环中使用。在单独使用时，in操作符会在可以通过对象访问指定属性时返回true，无论该属性在实例上或者在原型上。
```
//代码连接上面
'name' in person1;       // true
//可以使用这两个，判断该属性在原型上还是在实例上
function hasPrototypeProperty(object,name){
  return !Object.hasOwnProperty(name) && (name in Object);
}
//如果in返回true，hasOwnProperty()返回false，则说明该属性在原型上。
```

4. 属性枚举顺序
`for-in`:顺序不确定；返回可枚举的实例属性和原型属性。  
`Ojbect.keys()`:顺序不确定；返回可枚举的实例属性。  
`Ojbect.getOwnPropertyNames()`:顺序确定；无论是否可枚举的，都返回实例属性。  
`Object.getOwnPropertySymbols()`:顺序确定；只针对符号。    
`Ojbect.assign()`:顺序确定；

#### 对象迭代
`Object.values()`：返回对象值的数组。  
`Object.entries`：返回键/值对的数组。  
>注意：非字符串属性会被转换为字符串输出。符号属性会被忽略。
1. 其他原型语法
```

```
