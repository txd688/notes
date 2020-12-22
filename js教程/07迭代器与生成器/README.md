## 迭代器与生成器
\[Symbol.iterator]:支持迭代的自我识别能力和创建实现Iterator接口的对象能力。如字符串、数组、映射、集合、arguments对象、NodeList等DOM集合类型。
```
class Counter{
  constructor(limit){
    this.limit = limit;
   }
   [Symbol.iterator](){
    let count = 1, limit = this.limit;
    return {
      next(){
        if(count <= limit){
          return {done:false, value: count++};
        } else {
          return {done:true, value:undefined};
        }
      }
    }
   }
}
for (let i of counter){console.log(i);}         // 1 2 3
```
### 提前终止迭代器
可选的return()方法用于指定在迭代器提前关闭时执行的逻辑。  
for-of 通过break、continue、return、trhow 提前退出(调用return())。
```
class Counter{
  constructor(limit){
    this.limit = limit;
   }
   [Symbol.iterator](){
    let count = 1, limit = this.limit;
    return {
      next(){
        if(count <= limit){
          return {done:false, value: count++};
        } else {
          return {done:true, value:undefined};
        }
      },
      return(){
        console.log('Exiting');
        return {done:true};
      }
    }
   }
}

let count1 = new Counter(5);
for(let i of count1){
    if(i > 2){
        break;
    }
    console.log(i);
}
/*
1
2
Exiting
*/

let count2 = new Counter(5);
for(let i of count1){
    if(i > 2){
        throw 'err';
    }
    console.log(i);
}
/*
1
2
Exiting
Uncaught err
*/
```
如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，数组的迭代器就是不能关闭的。
```
let a = [1,2,3,4,5];
let iter = a[Symbol.iterator]();
for (let i of iter){
    console.log(i);
    if(i > 2){
        break;
    }
}
/*
1
2
3
*/

for (let i of iter){
    console.log(i);
}
/*
4
5
*/
```
因为return()方法是可选的，所以并非所有迭代器都是可关闭的。可以测试这个迭代器是否有return属性。  
不过，仅仅给一个不可关闭的迭代器增加这个方法并不能让它变成可关闭的，这是因为调用return()不会强制迭代器进入关闭状态。即便如此，return()方法还是会被调用。
```
let a = [1,2,3,4,5];
let iter = a[Symbol.iterator]();
iter.return = function(){
    console.log('Exiting');
    return {done:true};
}

for (let i of iter){
    console.log(i);
    if(i > 2){
        break;
    }
}
/*
1
2
3
Exiting
*/

for (let i of iter){
    console.log(i);
}
/*
4
5
*/
```

### 生成器

