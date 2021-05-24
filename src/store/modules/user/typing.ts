import { CommonField } from "@/store/typing";
import { MenuRouteItem } from "@/router/typing";
export interface UserInfo extends CommonField {
  userId: string;
  username: string;
  avatar: string;
  deptName: string;
  sex: number;
  password: string;
}

export interface UserState {
  token?: string;
  userInfo: UserInfo;
  roles: string[];
  permissions: string[];
  menus: MenuRouteItem[];
}

export interface MenuItem extends CommonField {
  childrenList: MenuItem[];
  extra: string;
  icon: string;
  keepAlive: string;
  menuId: string;
  name: string;
  parentId: string;
  path: string;
  permission: string;
  sort: number;
  type: string;
}
