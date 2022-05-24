export interface PageRequestData<T> {
  list: Array<T>;
  size: number;
  total: string;
}

export interface PageRequest<T = any> {
  code: number;
  data: PageRequestData<T>;
  msg: string;
}

export interface Request<T = any> {
  code: number;
  data: Array<T>;
  msg: string;
}
