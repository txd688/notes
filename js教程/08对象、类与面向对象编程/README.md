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

> 提示： \_\_proto__ 是历史遗留属性，实际上是基于 \[\[Prototype]]的访问器属性（getter/setter）。它是因为历史原因而保留下来的。现在可以使用 Object.getPrototypeOf/Object.setPrototypeOf 方式替代直接操作 \_\_proto__，用来获取和设置原型。  

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
为了减少代码冗余，视觉上更好的封装原型功能，可以通过一个包含所有属性和方法的对象字面量来重写原型。
```
function Person(){}
Person.prototype = {
  name: 'Admin',
  age: 29,
  job: 'writer',
  sayName(){
    console.log(this.name);
  }
}
```
但是这样重写后Person.prototype的constructor属性就不指向Person了,而指向了Ojbject构造函数。虽然instanceof操作符可以正确返回，但是不能通过constructor属性识别标识了。
```
let friend = new Person();
console.log(friend instanceof Object);          // true
console.log(friend instanceof Person);          // true
console.log(friend.constructor == Object);      // true
console.log(friend.constructor == Person);      // false
```
如果constructor很重要，可以再重写原型对象是专门设置一它的值：
```
function Person(){}
Person.prototype = {
  constructor: Person,
  name: 'Admin',
  age: 29,
  job: 'writer',
  sayName(){
    console.log(this.name);
  }
}
// 但是通过这方式恢复constructor属性会创建一个[[Enumerable]]为true的属性，而原生的是不可以枚举的。可以使用Object.defineProperty()方法定义constructor属性。
Object.definePropertype(Person.prototype,"constructor",{
  enumerable: false,
  value: Perosn
});
```

2. 原型的动态性
从原型上搜索值是动态的。
```
let frined = new Person();
Person.prototype.sayHi = function(){
  console.log('hi');
}
```
即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改都会在实例上反映出来。   

重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。(实例只有指向原型的指针，没有指向构造函数的指针)如下：
```
function Person(){}
let frined = new Person();
Person.prototype = {
  constructor: Person,
  name: 'Bob',
  age:29
}
frined.age;    // 错误
```
重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最初的原型。  
  
3. 原型对象原型
例子：给String原型值包装类型的实例添加一个startsWith()方法：
```
String.prototype.startsWith = function(text){
  return this.indexOf(text) == 0;
};
let mes = 'Hello world';
console.log(mes.startsWith('Hello'));   // true
```
在读取mes时会自动创建String的包装实例，从而找到并调用startsWith()方法。

4. 原型的问题
正因为是共享的，在处理引用值(数组、对象)的时候，一个实例对其修改后，也会影响的其他实例。

### 继承

#### 原型链
通过原型继承多个引用类型的属性和方法。
```
function Super(){
  this.property = true;
}
Super.prototype.getSuperValue = function(){
  return this.property;
}

function Demo(){
  this.sub = false;
}
Demo.prototype = new Super();
Demo.prototype.getDemoValue = function(){
  return this.sub;
}
let instance = new Demo();
console.log(instance.getSuperValue());        // true
```
instanceof() 和 isPrototypeOf()两种方法可以确定原型与实例的关系。
问题：还是引用值的问题，还有一种是：子类型在实例化时不能给父类型的构造函数传参。

#### 盗用构造函数
为了解决原型包含引用值导致的继承问题。思路：在自雷构造函数调用父类构造函数。call()和apply();
```
function SuperType(){
  this.colors = ['red','blue','green'];
}
function Demo(){
  SuperType.call(this); 、、 继承SuperType
}
let instance = new Demo();
instance.colors.push('yellow');
console.log(instance.colors);       // ['red','blue','green','yellow'];

let instance2 = new Demo();
instance2.colors;                   // ['red','blue','green'];
```
这相当于在Demo对象上运行了SuperType()函数中的初始化代码。

1. 传递参数
相比于原型链，盗用构造函数还可以再子类构造函数中向父类构造函数传参。
```
function SuperType(name){
  this.name = name;
}
funciton Demo(){
  SuperType.call(this,'Bob');
  this.age = 27;   // 实例属性
}
let instance = new Demo();
console.log(instance.name);       // 'Bob'
```
2. 盗用构造函数的问题
同样也是构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。

#### 组合继承
也叫伪经典继承。思路：使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
```
function SuperType(name){
  this.name = name;
  this.colors = ['red','blue','green'];
}
SuperType.prototype.sayName = function(){
  console.log(this.name);
}

function Demo(name,age){
  SuperType.call(this,name);
  this.age = age;
}
Demo.prototype = new SuperType();
Demo.prototype.sayAge = function(){
  console.log(this.age);
}

let instance1 = new Demo('Bob',27);
instance1.colors.push('yellow');
console.log(instance1.colors);      // ['red','blue','green','yello'];
instance1.sayName();                // 'Bob'
instance1.sayAge();                 // 27;

let instance2 = new Demo('Greg',29);
console.log(instance2.colors);     // ['red','blue','green'];
instance2.sayName();               // 'Greg'
instance2.sayAge();                // 29
```

#### 原型式继承
即使不自定义类型也可以通过原型实现对象之间的信息共享。
```
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
```
原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象之间共享信息的场合。但记住，属性中包含的引用值始终会在相关对象间共享，跟使用原型模式一样。
```
let person = {
  name: "Bob",
  friends: ['Van','Cidy']
};
let p1 = object(person);
p1.name = 'Greg';
p1.friends.push('Rob');

let p2 = object(person);
p2.name = 'Linda';
p2.friends.push('adgn');

console.log(person.friends);         // ["Van", "Cidy", "Rob", "adgn"]   
```

es5通过Object.create()方法将原型式继承的概念规范化了。接收两个参数：作为新对象原型的对象，以及给新对象额外的属性的对象(可选)。在只有一个参数时，和object()方法效果相同。
```
let person = {
  name: "Bob",
  friends: ['Van','Cidy']
};
let p1 = Object.create(person);
p1.name = 'Greg';
p1.friends.push('Rob');

let p2 = Object.create(person);
p2.name = 'Linda';
p2.friends.push('adgn');

console.log(person.friends);         // ["Van", "Cidy", "Rob", "adgn"] 
```

#### 寄生式继承
暂
#### 寄生式组合继承
暂

### 类
#### 类定义
```
//类声明
class Person{}
//类表达式
const Animal = class {};
```
与函数表达式不同，不会被提升。另一个与函数声明不同，函数受作用域限制，类受块作用域限制。  
类可以包含：构造函数方法(constructor)、实例方法、获取函数(get)、设置函数(set)和静态类方法(static)。

#### 类构造函数
constructor 关键字用于在类定义内部创建类的构造函数。会告诉解释器在使用new操作符创建类的新实例时，应该调用这个函数。
1. 实例化
使用new调用类的构造函数会执行如下操作：
* 在内存中创建一个新对象
* 这个新对象内部\[\[Prototype]]指针被赋值为构造函数的prototype属性。
* 构造函数内部的this被赋值为这个新对象。
* 执行构造函数内部的代码(给新对象添加属性)。
* 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
```
class Person{
  constructor(){
    this.color = 'orange';
  }
}
let person = new Person();
```
默认情况下,类构造函数执行之后会返回this对象，如果返回其他对象，则instanceof操作符则检测不出关联。  

类构造函数与构造函数的主要区别：调用类构造函数必须使用new操作符。而普通构造函数如果不是用new，会用全局的this作为内部对象。如果类不加new，则抛出错误。    
类构造函数实例化之后，会成为普通的实例方法。因此，实例化之后可以再实例上引用它：
```
class Person{}
let p1 = new Person();
p1.constructor();      //Uncaught TypeError: Class constructor Person cannot be invoked without 'new'
let p2 = new p1.constructor();
```

2. 把类当成特殊函数
```
class Person{};
console.log(typeof Person);        // function
```
所以类标签符有prototype属性，而这个原型也有一个constructor属性指向类自身；
```
class Person{}
console.log(Person.prototype);          // {constructor: ƒ}
console.log(Person === Person.prototype.constructor);        // true

let p1 = new Person();
console.log(p1.constructor === Person);           // true
console.log(p1 instanceof Person);                // true
console.log(p1 instanceof Person.constructor);    // flase
let p2 = new Person.constructor();
console.log(p2.constructor === Person);           // false
console.log(p2 instanceof Person);                // false
console.log(p2 instanceof Person.constructor);    // true
```

也可以像对象或函数引用一样把类作为参数传递。也可以立即实例化。

#### 实例、原型和类成员
1. 实例成员
每次通过new调用类标识符，都会执行类构造函数(constructor())。在这个函数内部，可以为新创建的实例添加"自有"属性，是什么样的属性没有限制。  
每个实例都对应一个唯一的成员对象，不会在原型上共享。
2. 原型方法和访问器
为了在实例间共享方法，类定义语法把类块中定义的方法作为原型方法。在类块中定义的所有方法都会定义在类的原型上。
```
class Person{
  constructor(){
    //实例上
    this.locate = ()=>console.log('instance);    
  }
  locate(){
    //原型上
    console.log('prototype');
  }
}
let p = new Person();
p.locate();    // instance
Person.prototype.locate();      // prototype
```
<类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键。  
类定义也支持获取和设置访问器。
```
class Person{
  set name(newName){
    this.name_ = newName;
  }
  get name(){
    return this.name_;
  }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name);     // Jake
```

3. 静态类方法
这些方法通常用于不特定于实例的操作。每一个类只有一个静态成员。在静态成员中，this引用类自身。
```
class Person{
  constructor(){
    this.locate = ()=>console.log(this);
  }
  locate(){
    console.log(this);
  }
  static locate(){
    console.log(this);
  }
}
let p = new Person();

p.locate();        // Person {locate: ƒ}
Person.prototype.locate();          // {constructor: ƒ, locate: ƒ}
Person.locate();                    // class, class Person{...}

// 静态类方法非常适合作为实例工厂：
...
static create(){
  return new Person();
}
...
Person.create()
```

4. 非函数原型和类成员
虽然类不支持在原型或类上添加成员，但可以在类外部手动添加。
```
class Person{
  sayName(){
    console.log(`My name is ${this.name}`);
  }
}
Person.prototype.name = 'Jack';
let p = new Person();
p.sayName();
```

5. 迭代器与生成器方法
```
class Person{
    *createIterator(){
        yield 'Jack';
        yield 'Bob';
    }
}
let p = new Person();
let iterator = p.createIterator();
iterator.next().value;                      // 'Jack'
iterator.next().value;                      // 'Bob'
iterator.next().value;                      // undefined

class Person{
    constructor(){
        this.nicknames = ['jack','bob'];
    }
    *[Symbol.iterator](){
        yield *this.nicknames.entries()
    }
}
let p = new Person();
for (let [idx,name] of p){
    console.log(name);
}
// jack
// bob
```

#### 继承
1. 继承基础(extends)
可以继承任何拥有\[\[Construct]]和原型的对象。不仅可以继承类，也可以继承构造函数。
```
class Person{}
class p2 extends Person{}

function text(){}
class text2 extends text{}
```

2. 构造函数、HomeObject 和 super()
super()关键点：
* 只能在派生类构造函数和静态方法中使用。
* 不能单独引用super关键字
* 调用super()会调用父类构造函数，并将返回的实例赋值给this
* super的行为如同调用构造函数。如果需要给父类构造函数传参，则需要手动添加
* 如果没有定义类构造函数，在实例化派生类时会调用super，而且会传入所有传给派生类的参数
* 在类构造函数中，不能在调用super()之前引用this
* 如果在派生类中显式定义了构造函数，则要么必须在其中调用super，要么必须在其中返回一个对象。

3. 抽象基类
供其他类继承，但本身不会被实例。通过new.target实现，它保存通过new关键字调用的类或函数，检测是不是抽象基类，并阻止对抽象基类实例化。
```
class Person{
  constructor(){
    if(new.target == Person){
      throw new Error('Person 不能被实例化');
    }
    
    //这里也可以进行检测，要求派生类必须定义某个方法
    if(this.foo){
      throw new Error('foo() is define');
    }
  }
}
```
4. 继承内置类型

5. 类混入
