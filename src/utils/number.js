/**
 * @description 获取两个数字之间的所有整数
 * @param {number} min
 * @param {number} max
 * @param {boolean} [isContain=true] 是否包含自身
 * @returns {object[]} 返回降序数组
 */
export const getMinToMaxNums = (min, max, isContain = true) => {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    typeof isContain !== 'boolean'
  ) {
    throw new TypeError('argument type error');
  }

  // 取整
  min = min | 0;
  max = max | 0;

  if (min > max) {
    [min, max] = [max, min];
  }

  const arr = [];

  if (isContain) {
    arr.push(max);
  }

  while (max - min > 1) {
    max--;
    arr.push(max);
  }

  if (isContain && min !== max) {
    arr.push(min);
  }

  return arr;
};

/**
 * @description 获取一个简单的数字数组，里面的元素
 * 不存在倍数/约数的关系，例如：[2, 4, 6, 8, 9] => [2, 9]
 * @param {object[]} arr
 * @returns {object[]} 返回一个新数组，不改变原数组
 */
export const getSimpleDigitArr = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }

  if (!arr.length) {
    return [];
  }

  // 排除元素类型不为number的元素
  let cloneArr = arr.filter((item) => typeof item === 'number');
  if (!cloneArr.length) {
    return [];
  }
  // 排序，方便比较
  cloneArr.sort((a, b) => a - b);

  const newArr = [];
  while (cloneArr.length) {
    const compareVal = cloneArr.splice(0, 1)[0];

    // 任何数都是1的倍数
    if (compareVal === 1) {
      return [1];
    }

    newArr.push(compareVal);

    cloneArr = cloneArr.filter((item) => item % compareVal !== 0);
  }

  return newArr;
};

/**
 * @description 判断是否为素数，只需要判断该数是否
 * 能整除（2-该数的开平方）中的任何一个数
 * @param {number} num 一个正整数
 * @returns {boolean} 是返回true，反正false
 */
export const isPrime = (num) => {
  if (typeof num !== 'number') {
    return false;
  }

  if (!Number.isInteger(num)) {
    return false;
  }

  if (num <= 1) {
    return false;
  }

  let sqrtNum = Math.sqrt(num);
  if (Number.isInteger(sqrtNum)) {
    return false;
  }

  sqrtNum = sqrtNum | 0;

  while (sqrtNum >= 2) {
    if (num % sqrtNum === 0) {
      return false;
    }

    sqrtNum--;
  }

  return true;
};
