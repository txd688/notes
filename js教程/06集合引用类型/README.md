## 集合引用类型

### Array

```
new Array(20);    //初始一个length为20的数组
[1,2,,,,]
```

**Array.from()** 将类数组结构转换为数组实例。

```
//字符串会被拆分为单子符数组
Array.from("Matt");      // ["M","a","t","t"];

//可以将集合和映射转换为一个数组
new Map().set(1,2).set(3,4);       // [[1,2],[3,4]]
new Set().add(1).add(2).add(3);    // [1,2,3]

//对现有数组执行浅复制
const a1 = [1,2,3];
const a2 = Array.from(a1);
a1 === a2;      //false

//可以使用任何迭代对象
const iter = {
  *[Symbol.iterator](){
      yield 1;
      yield 2;
      yield 3;
  }
}
Array.from(iter);    // [1,2,3]

// arguments 对象可以转换为数组
function getArray(){
  return Array.from(arguments);
}

//可以转换对象属性
var  arrObj3 = {
    a:1,
    b:2,
    0:3,
    1:234,
    length:3
}
Array.from(arrObj3);      // [3, 234, undefined]
```

第二个参数类似Array.from().map()。第三个参数是指定映射函数中this的值(在箭头函数中不起作用)。
`Array.from(a1,function(x){return x**this.exponent},{exponent:2});`
**Array.of()**
可以把一组参数转化为数组。  
`Array.of(1,2,3,4);      // [1,2,3,4]`

**length** 可以修改数组，如果小于长度，会删除。大于长度会用undefined填充

```
let color = ['red','bule'];
color.length = 1;       // ['red']
color.length = 2;       // ['red', empty]
```

#### 检测数组

instanceof  
Array.isArray(value)  

#### 迭代器方法

**keys()** 返回数组的索引
**values()** 返回数组元素的迭代器(值)
**entries()** 返回索引/值对的迭代器

#### 复制和填充方法

**fill()** 插入全部或部分内容，第一个参数是内容,第二和三分别是开始位置和结束位置(可选)
**copyWithin()**

#### 转换方法

**toLocaleString()** 返回数组每个值用逗号拼接而成的字符串  
**toString()** 同上(alert()隐式调用这个)
**valueOf()** 返回数组本身
**join(val)** 接收字符串分隔符，返回拼接后字符串

#### 栈方法

后进先出(LIFO) **push()** 和 **pop()**

#### 队列方法

先进先出(FIFO) **shift()** 和 **push()**  
另外使用 **unshift()** 和 **pop()** 可以实现在相反方向上模拟队列(先进后出)

#### 排序方法

**reverse()** 将数组元素反向排列  
**sort()** 会按照字符串形式重新排序。可以接收一个比较函数，比较函数接收两个参数，如果第一个参数排在第二个参数前面返回负值，相等返回0，后面返回-1.

#### 操作方法

**concat()** 合并数组。默认打平数组。

```
let colors = ["red","blue","green"];
let color2 = colors.concat("yellow",["black","brown"]);
color2;               //  ["red", "blue", "green", "yellow", "black", "brown"]

// Symbol.isConcatSpreadable 可以阻止打平数组
let newColors = ["black","brown"];
newColors[Symbol.isConcatSpreadable] = false;
let a = colors.concat(newColors);
/*
 ["red", "blue", "green", Array(2)]
0: "red"
1: "blue"
2: "green"
3: (2) ["black", "brown", Symbol(Symbol.isConcatSpreadable): false]
length: 4
__proto__: Array(0)
*/
```

**slice()** 截取数组，接收一个或两个参数，返回元素开始索引和结束索引。(不改变原有数组)  

**splice()**  (不改变原有数组)

* 删除。需要传2个参数：要删除的第一个元素的位置和要删除元素的数量。
* 插入。3个参数：开始位置、0(要删除的元素数量)、要插入的元素(可以再传任意数量元素)。
* 替换。再删除元素的同时可以再指定位置插入新的元素。

#### 搜索和位置方法

1. 严格相等
**indexOf()** 从数组开头搜索。未找到返回-1；  
**lastIndexOf()** 从数组末搜索，未找到返回-1；
**includes()** 返回布尔值，表示是否至少找到一个与指定元素匹配的项。  
都接收两个参数：要查找的元素和一个可选的起始的搜索位置。(会使用 === 比较)
2. 断言函数
每个索引都会调用这个函数，返回的值决定了相应索引的元素是否被认定匹配。  
断言函数接收3个参数：元素、索引和数组本身。
**find()** 和 **findIndex()** ，都从最小索引开始，一个返回匹配元素，另一个返回索引。都接收第二个可选参数，用于指定断言函数内部this的值。找到匹配项以后不再继续检查。

```
const people = [
 {
  name:'Matt',
  age:27
 },
 {
  name:'Admin',
  age:29
 }
];
people.find((element, index, array) => element.age < 28);    // {name:'Matt',age:27}
people.findIndex((element, index, array) => element.age < 28);    // 0
```

#### 迭代方法

接收两个参数：以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象。传给每个方法的函数接收3个参数：数组元素、元素索引和数组本身。  
**every()** 对数组每一项都运行都传入的函数，如果对每一项函数都返回true，则这个方法返回ture。
**filter()** 对数组每一项都运行传入的函数，函数返回true的项会组成数组之后返回。  
**forEach()** 对数组每一项都运行传入的函数，没有返回值。  
**map()** 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的函数。  
**some()** 对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true。
这些方法都不改变调用它们的数组。

```
// some() 和 every()相似。一个只要一个符合就true，另一个必须所有符合。
let nums = [1,2,3,4,5];
nums.every((item,index,array) => item > 2);        // false
nums.some((item,index,array) => item > 2);         // true

//filter()可以用来过滤数组
nums.filter((item,index,array) => item > 2);      // [3, 4, 5]

//map()可以用来修改函数
nums.map((item,index,array) => item * 2);        // [2, 4, 6, 8, 10]

// forEach() 只会对每一项运行传入的函数，没有返回值。本质上相等于for循环遍历数组
nums.forEach((item,index,array) => {
    // 执行某些操作
});
```

#### 归并方法

**reduce()** 和 **reduceRight()** ,这两个方法都会迭代数组所有项，并在此基础上构建一个最终返回值。区别是遍历数组的方向。
接收2个参数：对每一项都运行归并函数，以及可选的归并起点的初始值。  
这两个方法参数的函数有4个参数：上一个归并值、当前项、当前项索引和数值本身。  

```
//实现数值累加
let values = [1,2,3,4];
let sum = values.reduce((prev,cur,index,array) => prev + cur);       
sum;         // 10
```

### 定型数组

暂时跳过...

### Map

需要包含键/值对数组。
**size()** 获取数量  
**set()** 再添加键/值对  
**get()** 和 **has()** 查询  
**delete()** 和 **clear()** 删除值（删除某一个和清空所有）  

```
const m = new Map([
 ['key1','val1'],
 ['key2','val2'],
 ['key3','val3']
]);
m.size;      // 3
m.has('first'); // false
m.get('first'); // undefind
m.set('key4','val4').set('key5','val5');

//使用自定义迭代器初始化映射
const m2 = new Map([
 [Symbol.iterator[:function* (){
  yield ['key1','val1'];
  yield ['key2','val2'];
  yield ['key3','val3'];
 }
]);
```

Map可以使用任何js数据类型作为键。

#### 顺序与迭代

Map 实例具有顺序，因此可以根据插入顺序进行迭代操作。  
**entries()** 和 **\[Symbol.iterator]()**进行迭代。

```
const m = new Map([
 ['key1','val1'],
 ['key2','val2'],
 ['key3','val3']
]);
m.entries === m[Symbol.iterator];       // true

for(let p of m[Symbol.iterator[(){
 console.log(p);
}
//[key1,val1]
//...

[...m];      // 可以解构

m.forEach((val,key) => console.log(`${key}->${val}`));

//keys() 和 values();   //分别返回值和键
```

#### 选择Object还是Map

1. 内存占用
相同内存，Map大约Object多存储50%
2. 插入性能
消耗相当,Map稍微优一点。随着量增大，Map更优
3. 查找速度
Object更优
4. 删除性能
Map更优

### WeakMap

弱映射，键只能是Object或者继承自Object类型，否则报TypeError  
**set()**、**get()**、**has()**、**delete()** 方法

```
const key1 = {id:1},stringKey = new String('key1');
const wm1 = new WeakMap({
 [key1,'val1'],
 [stringKey,'val2']
});
```

#### 弱键

**WeakMap** 键只能是对象，键如果没有被其他引用会被垃圾回收，所以没有迭代和clear()  

```
// 实现私有变量
const User = (()=>{
    const wm = new WeakMap();
    class User{
        constructor(id){
            this.idProperty = Symbol('id');
            this.setId(id);
        }
        setId(id){
            this.setPrivate(this.idProperty,id);
        }
        setPrivate(pro, val){
            const privateMembers = wm.get(this) || {};
            privateMembers[pro] = val;
            wm.set(this,privateMembers);
        }
        getId(){
            return this.getPrivate(this.idProperty);
        }
        getPrivate(property){
            return wm.get(this)[property];
        }
    }
    return User;
})();
const user = new User(123);
user.getId();           // 123
user.setId(456);
user.getId();           // 456

//适合Dom节点元数据
const m = new Map();
const loginButton = document.querySelector("#login");
m.set(loginButton, {disabled: true});
//如果按钮从DOM树中删除，但由于映射中还保存着按钮引用，仍会逗留在内存，除非明确将其删除或者映射本身被销毁，可改成如下：
const m = new WeakMap();
const loginButton = document.querySelector("#login");
m.set(loginButton, {disabled: true});
```

### Set

与map类似

### WeakSet

与weakMap类似
