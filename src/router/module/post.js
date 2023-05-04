const postRoutes = [
  {
    path: '/postDetails',
    name: 'postDetails',
    component: () => import('@/views/postDetails/PostDetailsView.vue'),
  },
];

export default postRoutes;
