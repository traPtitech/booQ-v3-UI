import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/pages/registerView.vue';
import ReturnCheck from '@/pages/ReturnCheck.vue';
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
    component: RegisterView,
  },
  {
    path: '/return-check/:userName/:itemId',
    name: 'return-check',
    component: ReturnCheck,
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('@/pages/Playground.vue'),
  },
  {
    path: '/request',
    name: 'request',
    component: () => import('@/pages/RequestView.vue'),
  },
];

export default createRouter({
  history: routerHistory,
  routes,
});
