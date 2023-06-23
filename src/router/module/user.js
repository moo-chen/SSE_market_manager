const userRoutes = [
  // path是路径，在浏览器搜索是用的
  // name是名字，在跳转页面时用，具体使用参见'views/layout/NavbarView.vue'
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
    path: '/checkPost',
    name: 'checkPost',
    meta: {
      auth: true,
    },
    component: () => import('@/views/checkPost/checkPostView.vue'),
  },
  {
    path: '/addAdmin',
    name: 'addAdmin',
    meta: {
      auth: true,
    },
    component: () => import('@/views/addAdmin/addAdmin.vue'),
  },
  {
    path: '/deleteAdmin',
    name: 'deleteAdmin',
    meta: {
      auth: true,
    },
    component: () => import('@/views/deleteAdmin/deleteAdmin.vue'),
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    meta: {
      auth: true,
    },
    component: () => import('@/views/changePassword/changePasswordView.vue'),
  },
];

export default userRoutes;
