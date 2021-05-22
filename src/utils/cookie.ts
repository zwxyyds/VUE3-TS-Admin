import Cookies from 'js-cookie';

const TokenKey = 'Authorization';

const Layout = 'layout';
const LayoutCol = 'layoutCollapsed';

// Token
export function getToken(): string {
  return Cookies.get(TokenKey);
}

export function setToken(token: string): void {
  return Cookies.set(TokenKey, token);
}

export function removeToken(): void {
  return Cookies.remove(TokenKey);
}

// layout
export function getLayout(): string {
  return Cookies.get(Layout);
}

export function setLayout(layout: string): void {
  return Cookies.set(Layout, layout);
}

// layoutCol
export function getLayoutCol(): string {
  return Cookies.get(LayoutCol);
}

export function setLayoutCol(layoutCol: boolean): void {
  return Cookies.set(LayoutCol, layoutCol);
}
