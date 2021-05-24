import router, { defaultRoutes } from "./index";
import type { MenuRouteItem } from "./typing";
import { MenuItem } from "@/store/modules/user/typing";
import { getToken } from "@/utils/cookie";
import store from "@/store";
import Layout from "@/layouts";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  const { userInfo } = (store.state as any).user;
  document.title = process.env.VUE_APP_TITLE + " " + to?.meta?.title;
  if (whiteList.includes(to.path)) {
    if (token) {
      next("/");
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (token) {
        if (JSON.stringify(userInfo) == "{}") {
          const res = await store.dispatch("user/getUserInfo");
          if (res.code === 200) {
            const menuRoutes = [
              ...defaultRoutes,
              ...filterRoutes(res.data?.menus ?? []),
            ];
            console.log(menuRoutes);
            menuRoutes.forEach((item: MenuRouteItem) => {
              router.addRoute(item);
            });

            next(to.path);
          }
        } else {
          next();
        }
      } else {
        next("/login");
      }
    }
  }
});

function filterRoutes(asRoutes: MenuItem[] = []): MenuRouteItem[] {
  //filter your Routes
  const newRoutes: MenuRouteItem[] = [];
  asRoutes.forEach(async (item) => {
    if (item.path.indexOf("http") === -1) {
      newRoutes.push({
        path: item.path,
        name: item.menuId,
        meta: {
          hideInMenu: false,
          title: item.name,
          keepAlive: item.keepAlive,
          sort: item.sort,
          icon: item.icon,
        },
        component:
          item.parentId === "-1"
            ? Layout
            : () => import(`@/views${item.path}.vue`),
        children: filterRoutes(item.childrenList),
      });
    }
  });
  return newRoutes;
}
