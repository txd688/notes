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
第二个参数类似Array.from().map()。  
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
