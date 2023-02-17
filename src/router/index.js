import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/Index.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/views/Products.vue'),
      },
      {
        path: 'products/:id',
        name: 'product',
        component: () => import('@/views/Product.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/Cart.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'adminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('@/views/Dashboard/Products.vue'),
      },
      {
        path: 'orders',
        name: 'adminOrders',
        component: () => import('@/views/Dashboard/Orders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
