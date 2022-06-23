import axios from 'axios';
import { Message } from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (store.getters.token || getToken()) {
    //   config.headers['authorization'] = `Bearer ${store.getters.token || getToken()}`
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if (res.code !== 0 && res.code !== undefined) {
    //   Message({
    //     message: res.msg || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   if (res.code === 100108) {
    //     // to re-login
    //     MessageBox.confirm('token过期，请重新登录！', '提示', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }

    //   return Promise.reject(new Error(res || 'Error'))
    // } else {
    //   return res
    // }

    return res;
  },
  (error) => {
    console.log('err' + error); // for debug
    Message({
      message: error.message || '响应错误',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
