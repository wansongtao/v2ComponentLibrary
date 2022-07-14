/**
 * 默认前缀
 */
const PREFIX = 'v3-';

/**
 * 本地/会话存储，支持设置过期时间
 * @param {object} config
 * @param {boolean} [config.isLocalStorage] 是否本地存储
 * @param {string} config.key 名称
 * @param {any} config.value 值
 * @param {number} [config.maxAge] 多少秒后过期
 * @param {string} [config.prefix] 名称前缀
 * @returns
 */
export const setStorage = ({
  isLocalStorage = true,
  key,
  value,
  maxAge,
  prefix = PREFIX
}) => {
  const storage = { data: value, expire: 0 };

  if (typeof maxAge === 'number') {
    storage.expire = Date.now() + maxAge * 1000;
  }

  try {
    const data = JSON.stringify(storage);
    const name = `${prefix}${key}`;

    if (isLocalStorage) {
      localStorage.setItem(name, data);
      return;
    }

    sessionStorage.setItem(name, data);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * 取出本地/会话存储中未过期的数据，已过期、未找到返回null
 * @param {string} key
 * @param {boolean} [isLocalStorage=true] 是否本地存储
 * @param {string} [prefix]
 * @returns
 */
export const getStorage = (key, isLocalStorage = true, prefix = PREFIX) => {
  const name = `${prefix}${key}`;
  const storage = isLocalStorage
    ? localStorage.getItem(name)
    : sessionStorage.getItem(name);

  if (storage === null) {
    console.error(`not found ${name}`);
    return null;
  }

  const value = JSON.parse(storage);
  if (value.expire && value.expire <= Date.now()) {
    console.error(`${name}: data expired!`);
    return null;
  }

  return value.data;
};

/**
 * 取出本地/会话存储中未过期的数据，已过期、未找到返回null
 * @param {string} key
 * @param {boolean} [isLocalStorage=true] 是否本地存储
 * @param {string} [prefix]
 * @returns
 */
export const removeStorage = (key, isLocalStorage = true, prefix = PREFIX) => {
  const name = `${prefix}${key}`;

  if (isLocalStorage) {
    localStorage.removeItem(name);
  } else {
    sessionStorage.removeItem(name);
  }
};
