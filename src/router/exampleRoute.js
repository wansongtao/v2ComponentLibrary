const exampleRoutes = [
  {
    path: 'domtoimg',
    name: 'domtoimg',
    component: () => import('@/views/domToImg/index.vue'),
    meta: {
      title: '页面元素转图片'
    }
  },
  {
    path: 'file',
    name: 'file',
    component: () => import('@/views/fileExample/index.vue'),
    meta: {
      title: '文件选择器'
    }
  }
];

export default exampleRoutes;