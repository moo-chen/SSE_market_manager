import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import userRoutes from './module/user';
import postRoutes from './module/post';

Vue.use(VueRouter);

const routes = [
// 路由的meta字段是用来存储额外信息的对象。这个对象可以包含任意的键值对，这些键值对可以在路由导航时被访问到。
// 这里这个属性实际上表示该路由需要进行身份验证，只能被已登录的用户访问。这个信息可以被路由守卫等代码使用，以强制用户进行身份验证或跳转到登录页面。
  {
    path: '/',
    name: 'profile',
    meta: {
      auth: true,
    },
    component: () => import('@/views/profile/ProfileView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/AboutView.vue'),
  },
  {
    path: '/post',
    name: 'post',
    meta: {
      auth: true,
    },
    component: () => import('../views/post/PostView.vue'),
  },
  ...userRoutes, // 引入userRoutes中的路由
  ...postRoutes, // 引入postRoutes中的路由
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
