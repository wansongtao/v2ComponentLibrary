import Vue from 'vue';
import VueRouter from 'vue-router';
import layout from '@/layout/layout.vue';
import exampleRoutes from './exampleRoute'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/example',
    name: 'example',
    component: layout,
    children: exampleRoutes
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
