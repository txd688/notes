## 基本引用类型
引用值（或者对象）是某个特定引用类型的实例。

### Date
创建日期对象
`let now = new Date();`
#### Date.parse() 和 Date.UTC() (会被隐式调用)
Date.parse()接收一下格式：
* "月/日/年",如"5/23/2019"
* "月名 日,年",如"May 23, 2019"
* "周几 月名 日 年 时:分:秒 时区",如"Tue May 23 2019 00:00:00 GMT-0700"
* "YYYY-MM-DDTHH:mm:ss.sssZ",如"2019-05-23T00:00:00"
```
new Date(Date.parse("May 23, 2019"));
//等价于
new Date("May 23,2019");
```

Date.UTC()支持参数：年、零起点月数、日、时、分、秒和毫秒
`new Date(Date.UTC(2005, 4, 5, 17, 55, 55));//GMT时间2005年5月5日下午5点55分55秒`

#### 继承的方法
toLocaleString()、toString()和valueOf()
```
let b = new Date('May 23,2019');
b.toLocaleDateString();           // "2019/5/23"
b.toString();                     // "Thu May 23 2019 00:00:00 GMT+0800 (中国标准时间)"
b.valueOf();                      // 1558540800000     (所以可以通过比较日期)
```
#### 日期格式化方法
```
b.toDateString()         //"Thu May 23 2019"
b.toTimeString()         // "00:00:00 GMT+0800 (中国标准时间)"
b.toLocaleDateString()    // "2019/5/23"
b.toLocaleTimeString()    // "上午12:00:00"
b.toUTCString()          // "Wed, 22 May 2019 16:00:00 GMT"
```

#### 日期/时间组件方法
|  方法   | 说明  |
|  ----  | ----  |
| getTime()  | 返回日期毫秒；与valueOf()相同 |
| setTime(milliseconds)  | 设置日期毫秒，从而修改整个日期 |
| getFullYear()  | 返回4位数年 |
| getUTCFullYear()  | 返回UTC日期的4位数年 |
| setUTCYear(year) | 设置日期的年 |
| getMonth | 返回日期的月 |
| getUTCMonth()  | 返回UTC日期的月 |
| setMonth(month)  | 设置日期的月 |
| setUTCMonth(month)  | 设置UTC日期的月 |
| getDate()  | 返回日期的日 |
| getUTCDate()  |  返回UTC日期的日 |
| setDate(date)  | 设置日 |
| setUTCDate()  | 设置UTC日 |
| getDay()  | 返回日期中的周几(0-6) |
| getUTCDay()  |  返回UTC周几 |
| getHours()  | 返回时(0-23) |
| getUTCHours()  | 返回UTC时 |
| setHours(hours)  | 设置时 |
| setUTCHours(hours)  | 设置UTC时 |
| getMinutes()  | 返回分(0-59) |
| getUTCMinutes()  | 返回UTC分 |
| setMinutes(minutes)  | 设置分 |
| setUTCMinutes(minutes)  | 设置UTC分 |
| getSeconds()  | 返回秒(0-59) |
| getUTCSeconds()  | 返回UTC秒 |
| setSeconds(seconds)  | 设置秒 |
| setUTCSeconds(seconds)  | 设置UTC秒 |
| getMillseconds()  | 返回毫秒(0-59) |
| getUTCMillseconds()  | 返回UTC毫秒 |
| setMillseconds(millseconds)  | 设置毫秒 |
| setUTCMillseconds(millseconds)  | 设置UTC毫秒 |
| getTimezoneOffset()  | 返回以分钟计的UTC与本地时区的偏移量 |

### RegExp
`let expression = /pattern/flags;`
匹配模式的标记(flag)(可以带零个或多个)
| 模式 | 作用 |
|------|------|
| g    | 全局模式，找到所有匹配内容 |
| i    | 不区分大小写 |
| m    | 多行模式，到一行文本末尾会继续查找 |
| y    | 粘附模式，只查找从lastIndex开始及之后的字符串 |
| u    | Unicode模式，启用Unicode模式 |
| s    | dotAll模式，表示元字符，匹配任何字符(包含\n或\r) |
```
let pattern1 = /[bc]at/i;                     // 字面量形式
//等价于
let pattern2 = new RegExp("[bc]at","i");      //这个参数是字符串，要进行二次转义
```

#### 实例属性
| global | 布尔值，表示是否设置了g标记 |
| ignoreCase | i |
| unciode |  u |
| sticky |  y  |
| lastIndex | 整数，表示在下次搜索的开始位置 |
| multiline | m |
| dotAll | s |
| source | 字面的字符串 |
| flags | 标记字符串(flag) |
```
let pattern = new RegExg("\\[bc\\]at","i");
pattern.flags;    // "i"
```

#### 实例方法
exec(string) 用于配合捕获组使用。  
test(string) 返回布尔值，是否匹配

### 原始值包装类型
使用原始值的方法或属性会在后台执行以下3步(通过string类型举例)：
* 创建一个String类型的实例
* 调用实例上的特定方法
* 销毁实例
引用类型与原始值类型的主要区别在于生命周期，一个在离开作用域时销毁，另一个在于访问它的那行代码执行期间，所以原始值不能添加属性和方法。(type 和 instanceof 用于检测)
#### Boolean
`new Boolean(true);`
重写valueOf()、toString() 返或"true"和"false"
#### Number
`new Number()`
valueOf()返回原始数值，toLocaleString()和toString()返回原始数值字符串。toString()方法可接收一个表示基数的参数，并返回相应基数形式的数值字符串。  
**toFixed()** 返回指定小数点位数的字符串,如果小数位数超过则四舍五入。  
**toExponential()** 返回科学计数法(也称指数计数法)的数值字符串。
**toPrecision()** 会根据情况返回合理的输出结果
**Number.isInteger(number)** 返回布尔值，判断一个数值是否为整数
**Number.isSafeInteger(number)** 判断是否在数值的最大和最小范围
```
let num = 10;
console.log(num.toFixed(2));   // "10.00"
num.toExponential(1);         // "1.0e+1"
num.toPrecision(1);           // "1e+2"    四舍五入100
```
### String
`new String("hello world")`
1. JavaScript 字符  
有16位码元组成，每16位码元对应一个字符。  
**chartAt()** 返回给定索引位置的字符。  
**charCodeAt()** 返回指定索引位置的码元值。  
**fromCharCode()** 接收任意数值，并返回所有数值对应的字符拼接的字符串。  
为表示更多的字符，Unicode 采用一个策略，即每一个字符使用另外16位去选择一个**增补平面**。这种每一个字符用两个16位码元的策略称为**代理对**。  
length和charAt()会出现问题。但fromCharCode()方法仍能返回正确结果，因为它基于提供的二进制表示直接组合成字符。  
**codePointAt()** 接收16位码元的索引并返回该索引的码点。  
**fromCodePoint()** 同样接收任意数量码点，返回对应字符串。  
```
String.fromCodePoint(0x1F60A);         // "😊"
let message = "ab😊cd";               // length 为 6
message.codePointAt(3);               // 56842
```
2. normalize()规范化
4种规范形式：NFD、NFC、NFKD、NFKC。

3. 字符串操作方法
