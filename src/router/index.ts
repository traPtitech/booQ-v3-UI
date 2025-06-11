import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import registerView from '@/pages/registerView.vue';
import returnCheck from '@/pages/ReturnCheck.vue';
import returnCheckok from '@/pages/ReturnCheckOK.vue';

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
    path: '/return-check',
    name: 'return-check',
    component: returnCheck,
  },
  {
    path: '/return-check/ok',
    name: 'return-check-ok',
    component: returnCheckok,
  },
];

export default createRouter({
  history: routerHistory,
  routes,
});
