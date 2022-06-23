/**
 * @description 判断是否为iPhone/iPad
 * @returns {Boolean}
 */
export const isIos = () => {
  const { userAgent } = navigator;

  return userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1;
};

/**
 * @description 判断是否为手机打开(含iPad)
 * @returns {Boolean}
 */
export const isMobile = () => {
  const clientTexts = ['iPhone', 'iPad', 'Android', 'Mobile'];
  const { userAgent } = navigator;

  return clientTexts.some((item) => userAgent.indexOf(item) > -1);
};
