import router from './router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = process.env.VUE_APP_TITLE;
  }

  // 可以在这里处理路由权限相关逻辑

  next();
});

router.afterEach(() => {
  NProgress.done();
});