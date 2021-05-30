import { PageRequest } from '../typing'
export type TableParams = {
    pageSize: number
    pageNum: number
}

//返回的数据类型
export interface TableInfo {
    key: string,
    name: string,
    age: number,
    address: string,
    tags: string[],
}
export type TableRequset = PageRequest<TableInfo>;

