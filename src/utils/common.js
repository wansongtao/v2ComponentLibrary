/**
 * @description 获取参数数据类型
 * @param {*} obj 任意参数
 * @returns {string} 返回数据类型字符串（小写）
 */
export const getDataType = (obj) => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
};

/**
 * @description 复制内容到剪贴板（document.execCommand已废弃，推荐使用库）
 * @param {string} text 要复制的文本
 */
export const clipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  /**
   * 检查之前是否曾选中过内容
   * 如果找到，则保存选中
   * 没有标记为false
   */
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  // 复制 - 仅当作为用户操作的响应结果时才可以工作(比如，点击事件)
  document.execCommand('copy');
  document.body.removeChild(el);

  // 如果在复制前已存在选中的内容
  if (selected) {
    // 取消 HTML 文档中所有的选中部分，恢复原来的选中
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

/**
 * @description 阿里云图片缩放，详情参考：https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.742.e60658cduqjUhj
 * @param {string} url 阿里云图片链接
 * @param {object} data
 * @param {string} [data.m='fill'] 缩放模式，默认fill，等比缩放对超出部分进行居中裁剪
 * @param {number} [data.w] 宽度
 * @param {number} [data.h] 高度
 * @param {number} [data.l] 指定长边
 * @param {number} [data.s] 指定短边
 * @param {number} [data.limit] 指定当目标缩放图大于原图时是否进行缩放。
 * @param {string} [data.color] 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色。
 */
export const aliCloudResizeImg = (url, data) => {
  if (typeof url !== 'string') {
    console.error('argument type error.');
    return '';
  }

  if (!data || data === [] || data === {}) {
    return url;
  }

  if (
    !(
      typeof data.w === 'number' ||
      typeof data.h === 'number' ||
      typeof data.l === 'number' ||
      typeof data.s === 'number'
    )
  ) {
    return url;
  }

  let suffix = 'x-oss-process=image/resize';

  if (data.m) {
    suffix += `,m_${data.m}`;
  } else {
    suffix += ',m_fill';
  }

  if (data.w) {
    suffix += `,w_${data.w}`;
  }

  if (data.h) {
    suffix += `,h_${data.h}`;
  }

  if (data.l) {
    suffix += `,l_${data.l}`;
  }

  if (data.s) {
    suffix += `,s_${data.s}`;
  }

  if (data.limit) {
    suffix += `,limit_${data.limit}`;
  }

  if (data.color) {
    suffix += `,color_${data.color}`;
  }

  if (url.indexOf('?') > -1) {
    // eslint-disable-next-line no-param-reassign
    url += `&${suffix}`;
  } else {
    // eslint-disable-next-line no-param-reassign
    url += `?${suffix}`;
  }

  return url;
};

/**
 * @description 根据时间生成问候语
 * @param {number} [hour] 小时，默认当前时间
 * @returns {string} 返回问候语
 */
export const getTimeGreeting = (hour = new Date().getHours()) => {
  if (typeof hour !== 'number' || hour < 0 || hour > 24) {
    return '您好';
  }

  // 位运算取整
  hour = hour | 0;

  const weeHoursText = '凌晨好';
  const matinalText = '早上好';
  const amText = '上午好';
  const noonText = '中午好';
  const pmText = '下午好';
  const nightText = '晚上好';

  const timeGteetingObj = {
    0: weeHoursText,
    1: weeHoursText,
    2: weeHoursText,
    3: weeHoursText,
    4: weeHoursText,
    5: weeHoursText,
    6: matinalText,
    7: matinalText,
    8: amText,
    9: amText,
    10: amText,
    11: amText,
    12: noonText,
    13: noonText,
    14: pmText,
    15: pmText,
    16: pmText,
    17: pmText,
    18: nightText,
    19: nightText,
    20: nightText,
    21: nightText,
    22: nightText,
    23: nightText,
    24: nightText
  };

  return timeGteetingObj[hour];
};

/**
 * @description 获取相应的时间格式字符串
 * @param {Date} [date] Date对象，默认当前时间
 * @param {String} [format] 输出格式字符串，默认：yyyy/MM/dd HH:mm:ss。yy: 输出两位数的年份，
 * h：输出12小时制，H：输出24小时制，M：月份，m：分钟，一位字母则不补零
 * @returns {String}
 */
export const formatTime = (
  date = new Date(),
  format = 'yyyy/MM/dd HH:mm:ss'
) => {
  if (!(date instanceof Date) || typeof format !== 'string') {
    throw new TypeError('argument type error');
  }

  if (!format) {
    return format;
  }

  const formatObj = {
    yy: () => {
      return date.getFullYear().toString().substring(2, 4);
    },
    yyyy: () => {
      return date.getFullYear().toString();
    },
    M: () => {
      const month = date.getMonth() + 1;
      return month.toString();
    },
    MM: () => {
      const month = date.getMonth() + 1;
      return month.toString().padStart(2, '0');
    },
    d: () => {
      return date.getDate().toString();
    },
    dd: () => {
      return date.getDate().toString().padStart(2, '0');
    },
    h: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString();
    },
    hh: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString().padStart(2, '0');
    },
    H: () => {
      return date.getHours().toString();
    },
    HH: () => {
      return date.getHours().toString().padStart(2, '0');
    },
    m: () => {
      return date.getMinutes().toString();
    },
    mm: () => {
      return date.getMinutes().toString().padStart(2, '0');
    },
    s: () => {
      return date.getSeconds().toString();
    },
    ss: () => {
      return date.getSeconds().toString().padStart(2, '0');
    }
  };

  const replaceFunc = (val) => {
    let func = formatObj[val];
    if (func) {
      return func();
    }

    func = formatObj[val.toLowerCase()];
    if (func) {
      return func();
    }

    // 没有匹配的方法，返回原字符串
    return val;
  };

  return format.replace(
    /([Yy]{2,4}|[M]+|[Dd]+|[Hh]+|[m]+|[Ss]+)/g,
    replaceFunc
  );
};

/**
 * @description 对函数进行柯理化
 * @param {Function} fn
 * @param  {...any} args
 * @returns
 */
export const curry = (fn, ...args) => {
  // 获取函数参数个数
  const len = fn.length;

  if (args.length >= len) {
    // 当参数个数超出时，返回执行结果
    return fn(...args);
  }
  // 当参数个数小于fn可以接收的参数个数时，返回一个函数继续接收参数
  return (...nums) => curry(fn, ...args, ...nums);
};

/**
 * @description 函数式编程实现，从左往右依次执行每个函数
 * @param  {Function[]} funcs
 * @returns {Function}
 */
export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  const isNotFunc = funcs.some((item) => typeof item !== 'function');
  if (isNotFunc) {
    return funcs;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        b(a(...args))
  );
};

/**
 * @description 将文件切片
 * @param {File} file 文件对象
 * @param {number} [start = 0] 从文件的哪里开始，默认0
 * @param {number} [piece = 1024 * 512] 每一块大小，默认512k
 * @returns {blob[]} 返回一个文件切片数组
 */
export const fileSlice = (file, start = 0, piece = 1024 * 512) => {
  const total = file.size;
  let end = start + piece;

  // 结束位置不能超出文件大小
  if (end > total) {
    end = total;
  }

  const chunks = [];
  while (end <= total) {
    const blob = file.slice(start, end);
    chunks.push(blob);

    if (end === total) {
      break;
    }

    start = end;
    end = start + piece;

    // 结束位置不能超出文件大小
    if (end > total) {
      end = total;
    }
  }

  return chunks;
};

/**
 * @description 节流函数，函数触发一次后，下次触发需要间隔一定时间
 * @param {Function} fn 需要节流的函数，传入箭头函数会丢失this
 * @param {number} [dealy=1000] 间隔时间，单位毫秒
 * @returns {Function} 该函数可以接收多个参数，原样传入待执行的函数中
 */
export const throttle = (fn, delay = 1000) => {
  if (typeof fn !== 'function') {
    throw new TypeError('throttle function argument type error');
  }

  if (typeof delay !== 'number') {
    throw new TypeError('throttle function argument type error');
  }

  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  let lastTime = 0;

  return function (...params) {
    const nowTime = Date.now();

    if (nowTime - lastTime < delay) {
      return;
    }

    lastTime = nowTime;
    fn.call(this, ...params);
  };
};

/**
 * @description 防抖函数，一定时间内多次触发，只执行最后触发的一次，可能永远不会执行
 * @param {Function} fn 待执行的函数，传入箭头函数会丢失this
 * @param {Number} [delay=200] 间隔时间，默认200ms
 * @param {Boolean} [immediate=false] 第一次是否立即执行，默认false
 * @returns {Function} 该函数可以接收多个参数，原样传入待执行的函数中
 */
export const debounce = (fn, delay = 200, immediate = false) => {
  if (typeof fn !== 'function') {
    throw new TypeError('debounce function argument type error');
  }

  if (typeof delay !== 'number') {
    throw new TypeError('debounce function argument type error');
  }

  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  if (typeof immediate !== 'boolean') {
    immediate = !!immediate;
  }

  let timer = null;
  let isFirst = true;

  return function (...params) {
    timer && clearTimeout(timer);

    if (isFirst && immediate) {
      isFirst = false;

      fn.call(this, ...params);
      return;
    }

    timer = setTimeout(() => {
      fn.call(this, ...params);
    }, delay);
  };
};

/**
 * @description 希尔排序，改变原数组
 * @param {object[]} arr 待排序的数组
 * @param {Function} [fn] 比较函数，如：降序 (a, b) => a - b > 0
 * @returns {object[]} 成功返回排序好的数组，失败返回空数组
 */
export const shellSort = (arr, fn) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('argument type error');
  }

  if (arr.length < 2) {
    return arr;
  }

  // 设置动态间隔
  let h = 1;
  while (h < arr.length / 3) {
    h = h * 3 + 1;
  }

  while (h > 0) {
    for (let i = 0; i < arr.length; i++) {
      let prevIdx = i - h;
      const currVal = arr[i];

      while (
        prevIdx >= 0 &&
        (fn instanceof Function
          ? fn(currVal, arr[prevIdx])
          : arr[prevIdx] > currVal)
      ) {
        arr[prevIdx + h] = arr[prevIdx];
        prevIdx -= h;
      }

      arr[prevIdx + h] = currVal;
    }

    h = (h - 1) / 3;
  }

  return arr;
};

/**
 * @description 预加载图片
 * @param {string[]} imgs 图片列表
 * @returns {Promise<void>} 全部加载成功resolve()，有一张图片加载失败reject(url)
 */
export const preloadingImgs = (imgs) => {
  if (!Array.isArray(imgs) || !imgs.length) {
    throw 'argument error';
  }

  /**
   * @description 加载图片
   * @param {string} url
   * @returns {Promise} 成功resolve()，失败reject(url)
   */
  const loadImg = (url) => {
    return new Promise((resolve, reject) => {
      const imgEle = new Image();

      imgEle.onload = () => {
        resolve();
      };

      imgEle.onerror = () => {
        reject(url);
      };

      imgEle.src = url;
    });
  };

  return Promise.all(imgs.map((item) => loadImg(item)));
};

/**
 * @description 时区转换
 * @param {Date|String|Number} time 待转换时间
 * @param {Number} [timeZone=8] 转换后时间的时区，默认东八区(东区传入1至12，西区传入-1~-12)
 * @param {Number} [currTimeZone] 传入时间的时区，默认本地时区(东区传入1至12，西区传入-1~-12)
 * @returns {Date} 返回对应时区时间
 */
export const convertTimeZone = (time, timeZone = 8, currTimeZone) => {
  let newTime = null;

  if (time instanceof Date) {
    newTime = time;
  } else if (typeof time === 'string') {
    // 在safari中，Date构造函数不能识别‘-’
    const str = time.replace('-', '/');
    newTime = new Date(str);

    if (isNaN(newTime)) {
      throw new Error('time argument error');
    }
  } else if (typeof time === 'number') {
    newTime = new Date(time);

    if (isNaN(newTime)) {
      throw new Error('time argument error');
    }
  } else {
    throw new TypeError('time argument type error');
  }

  if (typeof timeZone !== 'number' || timeZone < -12 || timeZone > 12) {
    throw new Error('timeZone argument error');
  }

  let offset = 0; // 传入时间与格林威治时间的时间差，单位毫秒
  if (currTimeZone === undefined) {
    // 获取本地时间与格林威治时间的时间差
    offset = new Date().getTimezoneOffset() * 60 * 1000;
  } else if (typeof currTimeZone !== 'number') {
    throw new TypeError('currTimeZone argument type error');
  } else if (currTimeZone >= -12 && currTimeZone <= 12) {
    offset -= currTimeZone * 60 * 60 * 1000;
  } else {
    throw new Error('currTimeZone argument error');
  }

  const locale = newTime.getTime() + offset + timeZone * 60 * 60 * 1000;
  return new Date(locale);
};

/**
 * @description 获取一个月的最大天数
 * @param {Date|String|Number} [date] 不传默认当前日期
 * @returns {Number} 成功返回天数
 */
export const getMonthDays = (date) => {
  let dateObj = null;
  if (date === undefined || date === null) {
    dateObj = new Date();
  } else if (typeof date === 'string') {
    dateObj = new Date(date.replace('-', '/'));

    if (isNaN(dateObj)) {
      throw new Error('date argument error');
    }
  } else if (typeof date === 'number') {
    dateObj = new Date(date);

    if (isNaN(dateObj)) {
      throw new Error('date argument error');
    }
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    throw new TypeError('date argument type error');
  }

  /**
   * Date对象的构造函数接收月份索引（0-11）。
   * 将月份设置为下个月且天数设置为0，Date对象将自动设置为上个月最后一天。
   */
  const newDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);

  return newDate.getDate();
};

/**
 * @description 获取传入月份的天数
 * @param {number} month 月份（1-12）
 * @param {number} [year] 年份，2月份必须传入
 * @returns {number} 天数
 */
export const getDays = (month, year) => {
  if (typeof month !== 'number') {
    throw new TypeError('month type error.');
  }

  if (month <= 0 || month > 12) {
    throw new RangeError('month range error.');
  } else {
    month = Math.trunc(month);
  }

  if (month === 2) {
    if (typeof year !== 'number' || year <= 0) {
      throw new Error('year error.');
    } else {
      year = Math.trunc(year);
    }

    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      return 29;
    }

    return 28;
  }

  const dayObj = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  return dayObj[month];
};

/**
 * @description 是否为闰年
 * @param {number} year 年份
 * @returns {Boolean} 是true，否false
 */
export const isLeapYear = (year) => {
  if (typeof year !== 'number') {
    throw new TypeError('year argument type error');
  }

  // 能被400整除为闰年
  if (year % 400 === 0) {
    return true;
  }

  // 能被4整除但不能被100整除为闰年
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }

  return false;
};

/**
 * @description 深拷贝实现(支持Map、Set、RegExp、Date、Function类型和循环引用，不会拷贝symbo属性)
 * @param {object} obj 需要深拷贝的对象
 * @returns {object} 返回一个新对象
 */
export const deepClone = (obj) => {
  // 用来保存引用关系，解决循环引用问题
  const copyObj = {};

  const clone = (data) => {
    // 简单数据类型直接返回值
    if (!(data instanceof Object)) {
      return data;
    }

    const newObj = Array.isArray(data) ? [] : {};

    for (const key in data) {
      // 跳过原型上的属性
      // if (!data.hasOwnProperty(key)) {
      //   continue;
      // }

      // 简单数据类型直接返回值
      if (!(data[key] instanceof Object)) {
        newObj[key] = data[key];
        continue;
      }

      if (data[key] instanceof Date) {
        newObj[key] = new Date(data[key].getTime());
        continue;
      }

      if (data[key] instanceof RegExp) {
        newObj[key] = new RegExp(data[key]);
        continue;
      }

      if (data[key] instanceof Function) {
        // 处理es6简写方法名的问题，例如：{hi() {return 1;}}
        const funcStr = data[key].toString().replace(/^function/, '');
        newObj[key] = new Function(`return function ${funcStr}`)();
        continue;
      }

      if (data[key] instanceof Map) {
        newObj[key] = new Map();

        data[key].forEach((val, mapKey) => {
          if (!(mapKey instanceof Object) && !(val instanceof Object)) {
            newObj[key].set(mapKey, val);
          } else {
            newObj[key].set(clone(mapKey), clone(val));
          }
        });

        continue;
      }

      if (data[key] instanceof Set) {
        newObj[key] = new Set();
        data[key].forEach((val) => {
          if (!(val instanceof Object)) {
            newObj[key].add(val);
          } else {
            newObj[key].add(clone(val));
          }
        });

        continue;
      }

      // 判断是否为循环引用
      if (copyObj[key] === data[key]) {
        newObj[key] = data[key];
        continue;
      }

      copyObj[key] = data[key];
      newObj[key] = clone(data[key]);
    }

    return newObj;
  };

  return clone(obj);
};

/**
 * @description 创建a标签下载文件
 * @param {string} url 下载地址
 * @param {string} [filename] 自定义下载文件名
 */
export const createAEleDownloadFile = (url, filename) => {
  if (!url) {
    return;
  }

  const aElement = document.createElement('a');
  aElement.download = filename || Date.now();
  aElement.href = url;
  aElement.click();
};
