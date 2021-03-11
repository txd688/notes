export const u = navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

/*
 * @Description: 获取URL后缀
*/
export const GetQuery = (key) => {
  let after = window.location.search;
  after = after.substr(1) || window.location.hash.split('?')[1];
  if (after) {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
    const r = after.match(reg);
    if (r != null) {
      return (r[2]);
    }
    return null;
  }
  return null;
};

/*
 * @Description: 是否微信
*/
export const IsWechat = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger';
};

/*
 * @param {}
 * @Description: 判断是否PC端
*/
export const IsPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/*
 * @param {string, string} date, fmt
 * @Description:  对Date的扩展，将 Date 转化为指定格式的String
 *                月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *                (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *                (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @return: string
*/
export function DateFormat(date, fmt) { // author: meizz
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  // eslint-disable-next-line
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length)); }
  // eslint-disable-next-line
  for (const k in o) {
    // eslint-disable-next-line
    if (new RegExp(`(${k})`).test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  }
  return fmt;
}

/*
 * @Description: 判断手机号是否正确
*/
export function isphone(num){
  if(/^1[3456789]\d{9}$/.test(num)){ 
    return true; 
  } 
  return false;
}


/**
 * @des: 实现数字每三位数逗号分隔
*/
export function thousandBitSeparator(textValue) {
  if (textValue === '') return '';
  var textValueFormat = Number(textValue);
  if (!isNaN(textValueFormat)) {
    return textValueFormat.toLocaleString('en-US');
  } else {
    return textValue;
  }
}
