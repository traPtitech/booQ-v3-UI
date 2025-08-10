import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/pages/registerView.vue';
import ReturnCheck from '@/pages/ReturnCheck.vue';
import ReturnCheckOk from '@/pages/ReturnCheckOK.vue';

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
    path: '/return-check/:userName/:productTitle',
    name: 'return-check',
    component: ReturnCheck,
    props: true,
  },
  {
    path: '/return-check/ok',
    name: 'return-check-ok',
    component: ReturnCheckOk,
  },
];

export default createRouter({
  history: routerHistory,
  routes,
});
