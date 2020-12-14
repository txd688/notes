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

