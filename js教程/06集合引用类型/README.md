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

**Array.of()**
