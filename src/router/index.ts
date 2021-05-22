import { createRouter, createWebHashHistory } from "vue-router";
import CommonLayout from '@/layouts/CommonLayout.vue';
import Layout from '@/layouts';
import { MenuRouteItem } from './typing';

const staticRoutes: MenuRouteItem[] = [
  {
    path: "/Login",
    name: "Login",
    meta: { title: 'Login', hideInMenu: true, },
    component: CommonLayout,
    children: [{
      path: "/login",
      name: "Login",
      meta: { title: 'Login' },
      component: () => import('@/views/login/index.vue')
    }]

  },


];


export const defaultRoutes: MenuRouteItem[] = [
  {
    path: '/',
    name: "home",
    meta: { title: 'home' },
    redirect: '/home',
    component: Layout,
    children: [{
      path: "/home",
      name: "homepage",
      meta: { title: '工作台' },
      component: () => import('@/views/home/index.vue')
    }]
  },
  {
    path: '/example',
    meta: {
      title: '组件案例',
    },
    name: 'example',
    redirect: '/example/table',
    component: Layout,
    children: [
      {
        path: '/example/table',
        name: 'example-table',
        meta: { title: '表格页' },
        component: () => import('@/views/example/table.vue'),     
      },
      {
        path: '/example/form',
        name: 'example-form',
        meta: { title: '表单页' },
        component: () => import('@/views/example/form.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
