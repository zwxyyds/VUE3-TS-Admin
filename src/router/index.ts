import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CommonLayout from '@/layouts/CommonLayout.vue';
import { MenuRouteItem } from './typing';
import Title from 'ant-design-vue/lib/typography/Title';

const staticRoutes: MenuRouteItem[] = [
  {
    path: "/Login",
    name: "Login",
    meta: { title: 'Login' },
    component: CommonLayout,
    children: [{
      path: "/login",
      name: "Login",
      meta: { title: 'Login' },
      component: () => import('@/views/login/index.vue')
    }]

  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
