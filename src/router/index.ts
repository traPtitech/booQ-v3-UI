import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

export const routerHistory = createWebHistory();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/DashBoard.vue'),
  },
];

export default createRouter({
  history: routerHistory,
  routes,
});
