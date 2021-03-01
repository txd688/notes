## 模块化 module

* 必须通过使用 <script type="module"> 特性（attribute）
* 模块始终默认使用 use strict
* 模块代码仅会在第一次导入时执行
* 在一个模块中，“this” 是 undefined
* 

#### import.meta
对象包含关于当前模块的信息。在浏览器环境中，它包含当前脚本的 URL，或者如果它是在 HTML 中的话，则包含当前页面的 URL。

#### 模块脚本是延迟的
不会阻塞 HTML 的处理，它们会与其他资源并行加载。在 HTML 页面加载完成后才会执行 JavaScript 模块。
```
<script type="module">
  alert(typeof button); // object：脚本可以“看见”下面的 button
  // 因为模块是被延迟的（deferred，所以模块脚本会在整个页面加载完成后才运行
</script>

相较于下面这个常规脚本：

<script>
  alert(typeof button); // button 为 undefined，脚本看不到下面的元素
  // 常规脚本会立即运行，常规脚本的运行是在在处理页面的其余部分之前进行的
</script>

<button id="button">Button</button>
```

#### 导入与导出

```
function sayHi(user) {
  alert(`Hello, ${user}!`);
}
function sayBye(user) {
  alert(`Bye, ${user}!`);
}
export {sayHi, sayBye}; //  export {sayHi as hi, sayBye as bye};   将函数导出为 hi 和 bye：

//import {...}
import {sayHi, sayBye} from './say.js';
sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!


// import * as <obj>
import * as say from './say.js';
say.sayHi('John');
say.sayBye('John');


// Import “as”
import {sayHi as hi, sayBye as bye} from './say.js';
hi('John'); // Hello, John!
bye('John'); // Bye, John!


// 默认导出
export default class User { // 只需要添加 "default" 即可
  constructor(name) {
    this.name = name;
  }
}

import User from './user.js'; // 不需要花括号 {User}，只需要写成 User 即可
new User('John');
```

#### 动态导入
import(module) 表达式加载模块并返回一个 promise。

```
import('./say.js')
.then(obj => console.log(obj.sayHi('jjj')))
.catch(err =>err);

 async function load() {
  let {sayHi} = await import('./say.js');
  console.log(sayHi(1231));
}
load();
```