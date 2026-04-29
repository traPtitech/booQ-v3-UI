import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import registerView from '@/pages/registerView.vue';

export const routerHistory = createWebHistory();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/DashBoard.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: registerView,
  },
  {
    path: '/sample',
    name: 'sample',
    component: () => import('@/pages/SamplePage.vue'),
  },
];

export default createRouter({
  history: routerHistory,
  routes,
});
