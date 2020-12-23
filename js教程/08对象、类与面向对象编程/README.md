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
-
