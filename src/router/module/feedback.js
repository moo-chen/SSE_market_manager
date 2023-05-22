import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const feedbackRoutes = [
// 路由的meta字段是用来存储额外信息的对象。这个对象可以包含任意的键值对，这些键值对可以在路由导航时被访问到。
// 这里这个属性实际上表示该路由需要进行身份验证，只能被已登录的用户访问。这个信息可以被路由守卫等代码使用，以强制用户进行身份验证或跳转到登录页面。
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/UserInfoView.vue'),
  },
];

export default feedbackRoutes;
