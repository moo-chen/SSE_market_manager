import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import userRoutes from './module/user';
import feedbackRoutes from './module/feedback';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
    },
  },
  ...userRoutes, // 引入userRoutes中的路由
  ...feedbackRoutes, // 引入feedbackRoutes中的路由
];

// VueRouter是一个用于处理路由的插件。可以使用它来定义应用程序的路由映射，并在用户浏览时动态地更新视图，以此构建单页应用程序。
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 判断是否需要登录
    // 判断用户是否登录
    if (store.state.userModule.token) {
      // 这里还要判断token 的有效性 比如有没有过期 需要后台发放token 的时候 带上token 的有效期，
      // 如果 token 无效 需要 请求token
      next();
    } else {
      // 跳转登录
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
