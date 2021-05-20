import service from '../request';
import { LoginParams } from './typing';


//登录接口
export function Login(params: LoginParams) {
    return service.post(`/auth/oauth/token?username=${
        params.username
        }&password=${(params.password)}`)
}

//获取用户信息
export function GetUserInfo() {
    return service.get(`/upms/user/info`)
}

//登出接口
export function Logout() {
    return service.delete(`auth/token/logout`)
}