import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CommonLayout from '@/layouts/CommonLayout.vue';
import Layout from '@/layouts';
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

  {
    path: "/",
    name: "Home",
    meta: { title: 'Home' },
    component: Layout,
    children: [{
      path: "/Home",
      name: "Home",
      meta: { title: 'Home' },
      component: () => import('@/views/home/index.vue')
    }]

  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
