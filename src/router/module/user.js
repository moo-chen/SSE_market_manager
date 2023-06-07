const userRoutes = [
  // path是路径，在浏览器搜索是用的
  // name是名字，在跳转页面时用，具体使用参见'views/layout/NavbarView.vue'
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    meta: {
      auth: true,
    },
    component: () => import('@/views/userInfo/UserInfoView.vue'),
  },
  {
    path: '/addAdmin',
    name: 'addAdmin',
    component: () => import('@/views/addAdmin/addAdmin.vue'),
  },
  {
    path: '/deleteAdmin',
    name: 'deleteAdmin',
    component: () => import('@/views/deleteAdmin/deleteAdmin.vue'),
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('@/views/changePassword/changePasswordView.vue'),
  },
];

export default userRoutes;
