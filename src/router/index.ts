import type { LocationQueryValue, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/pages/registerView.vue';
import ReturnCheck from '@/pages/ReturnCheck.vue';
export const routerHistory = createWebHistory();

// モック画面の表示確認用。?owners=3 のように所有件数を切り替える。
function mockOwnerCount(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return undefined;
  const count = Number(value);
  return Number.isSafeInteger(count) ? count : undefined;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/items/:itemId/owners-modal',
    name: 'item-detail-owners-modal',
    component: () => import('@/pages/ItemDetailView.vue'),
    props: (route) => ({
      kind: route.params['itemId'] === 'equipment' ? 'equipment' : 'personal',
      ownerCount: mockOwnerCount(route.query['owners']),
      ownersVariant: 'modal',
    }),
  },
  {
    path: '/items/:itemId',
    name: 'item-detail',
    component: () => import('@/pages/ItemDetailView.vue'),
    // API 接続までの表示確認用。personal / equipment で両方の画面を確認する。
    props: (route) => ({
      kind: route.params['itemId'] === 'equipment' ? 'equipment' : 'personal',
      ownerCount: mockOwnerCount(route.query['owners']),
    }),
  },
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
