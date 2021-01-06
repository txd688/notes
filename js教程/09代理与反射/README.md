## 代理与反射
proxy构造函数创建。接收两个参数：目标对象和处理程序对象。  
使用代理的主要目的是可以定义捕获器(trap),就是在处理程序对象中定义的'基本操作的拦截器'。  
get()捕获器有三个参数：目标对象、要查询的对象和代理对象。proxy\[property]、proxy.property或Object.create(proxy)\[property]等操作都会触发get();  
```
const target = {
    foo: 'bar'
}
const handle = {
    get(obj, property, receiver){
        console.log(obj === target);
        console.log(property);
        console.log(receiver === proxy);
    }
};
const proxy = new Proxy(target,handle);
proxy.foo;                // true   foo  true
``
