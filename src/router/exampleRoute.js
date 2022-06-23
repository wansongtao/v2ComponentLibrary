const exampleRoutes = [
  {
    path: 'domtoimg',
    name: 'domtoimg',
    component: () => import('@/views/domToImg/index.vue'),
    meta: {
      title: '页面元素转图片'
    }
  }
];

export default exampleRoutes;