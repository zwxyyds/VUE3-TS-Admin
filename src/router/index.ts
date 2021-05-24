import { createRouter, createWebHashHistory } from "vue-router";
import CommonLayout from "@/layouts/CommonLayout.vue";
import Layout from "@/layouts";
import { MenuRouteItem } from "./typing";

const staticRoutes: MenuRouteItem[] = [
  {
    path: "/Login",
    name: "Login",
    meta: { title: "Login", hideInMenu: true },
    component: CommonLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        meta: { title: "Login" },
        component: () => import("@/views/login/index.vue"),
      },
    ],
  },
];

export const defaultRoutes: MenuRouteItem[] = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "home",
      icon: "HomeOutlined",
    },
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "homepage",
        meta: {
          title: "工作台",
          icon: "DashboardOutlined",
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/example",
    meta: {
      title: "组件案例",
      icon: "TableOutlined",
    },
    name: "example",
    redirect: "/example/table",
    component: Layout,
    children: [
      {
        path: "/example/table",
        name: "example-table",
        meta: {
          title: "表格页",
          icon: "TableOutlined",
        },
        component: () => import("@/views/example/table.vue"),
      },
      {
        path: "/example/form",
        name: "example-form",
        meta: {
          title: "表单页",
          icon: "FormOutlined",
        },
        component: () => import("@/views/example/form.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export default router;
