import request from '../request';
import { LoginParams } from './typing';


//登录接口
export function Login(params: LoginParams) {
    return request.post(`/auth/oauth/token?username=${
        params.username
        }&password=${(params.password)}`)
}

//获取用户信息
export function GetUserInfo() {
    return request.get(`/user/getUserInfo`)
}

//登出接口
export function Logout() {
    return request.get(`/user/logout`)
}