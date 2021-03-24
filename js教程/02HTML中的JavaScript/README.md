## HTML中的JavaScript

### \<script>元素有下列 8 个属性

- **async**: 可选。立即开始下载脚本，不阻止其他页面动作。异步地执行（当页面继续进行解析时，脚本将被执行）。只对外部脚本文件有效。
- **charset**: 可选。 例:charset="UTF-8"。指定字符集。(很少使用，多被浏览器无视)。
- **crossorigin**: 可选。配置相关请求的 CORS（跨源资源共享）设置。默认不使用。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorgin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
- **defer**: 可选。在文档解析和显示完成后再执行脚本。只对外部脚本有效，再 IE7 及更早版本中，对行内脚本也可以指定这个属性。
- **integrity**: 可选。允许对比接收到的资源和指定的加密签名以验证子资源完整性(SRL,Subresource Intergrity)。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN，Content Delivery Network)不会提供恶意内容。
- **language**: 废弃。最初用于表示代码块中的脚本语言。
- **src**: 可选。要执行的代码的外部文件。
- **type**: 可选。代替 language，表示代码块中脚本语言的内容类型(也称 MIME 类型)。例：type="text/javascript"(已废弃)、MIME 类型通常是: "application/x-javascript"、module(ES6 模块)。

### 使用\<script>的两种方式

**嵌入式**

```
  <script>
    function sayHi(){
      console.log("Hi");
    }
  </script>
```

代码从上往下解释

**引用外链**  
 `<script src="example.js"></script>`

**还有一种动态加载(以这种方式获取资源对浏览器预加载是不可可见的。这会严重影响它们在资源获取队列中的优先级)**

```
let srcipt = document.createElement('script');
script.src = 'emxample.js';
preloadLink.rel = "preload";
document.head.appendChild(script);
```

要想让预加载器知道这些动态请求文件的存在，可以再文档头部显式的声明它们。
`<link rel="preload" href="emxample.js"/>`

### XHTML 的变化

再 XHTML 代码中不允许直接使用 > 。例如: if(a > b)这样,要使用&lt; 如：if(a &lt; b)。还有另一种方法如下:

```
<script type="text/javascript"><![CDATA[
   if(a > b){
     console.log('a 大于 b');
   }
]]></script>
```

在兼容 XHTML 的浏览器中，这样能解决问题。但在不支持 CDATA 块的非 XHTML 兼容浏览器中则不行。为此，CDATA 标记必须使用 JavaScript 注释来抵消:

```
<script type="text/javascript">
//<![CDATA[
  if(a > b){
    console.log('a 大于 b');
  }
//]]>
</script>
```

这种格式适用于所有现代浏览器。虽然有点黑科技的味道，但它可以通过 XHTML 验证，而且对 XHTML 之前的浏览器也能优雅地降级。

### \<noscript>元素。用于给不支持 JavaScript 的浏览器提供替代内容
