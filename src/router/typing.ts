import { RouteRecordRaw, RouteMeta } from 'vue-router';

export interface MenuRouteMeta {
  title?: string;
}

export type MenuRouteItem = {
  children?: MenuRouteItem[];
  meta?: MenuRouteMeta & RouteMeta;
} & RouteRecordRaw;