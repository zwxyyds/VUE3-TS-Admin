import { requestPage } from '../request'
import { TableParams, TableRequset } from './typing'


//获取用户信息
export function GetTableList(params: TableParams) {
    return requestPage<TableParams, TableRequset>(`/table/getTableList`, params);
}