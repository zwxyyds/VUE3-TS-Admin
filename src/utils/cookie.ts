import Cookies from 'js-cookie';

const TokenKey = 'Authorization';

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