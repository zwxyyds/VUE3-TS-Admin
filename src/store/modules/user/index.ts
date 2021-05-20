import { getToken, setToken, removeToken } from '@/utils/cookie';
import { Login, GetUserInfo, Logout } from '@/api/user/login';
import type { UserInfo, UserState } from './typing';
import type { MenuRouteItem } from '@/router/typing';
import type { LoginParams } from '@/api/user/typing';
import type { Commit } from 'vuex';
const state = {
    token: getToken() || '',
    userInfo: {},
    roles: [],
    permissions: [],
    menus: [],
};

const mutations = {
    SET_TOKEN: (state: UserState, token: string) => {
        state.token = token;
    },
    SET_USER_INFO: (state: UserState, userInfo: UserInfo) => {
        state.userInfo = userInfo;
    },
    SET_MENUS: (state: UserState, menus: MenuRouteItem[]) => {
        state.menus = menus;
    },
    SET_PERMISSIONS: (state: UserState, permissions: string[]) => {
        state.permissions = permissions;
    },
    SET_ROLES: (state: UserState, roles: string[]) => {
        state.roles = roles;
    },
};

const actions = {
    async login({ commit }: { commit: Commit }, userInfo: LoginParams) {
        try {
            const res = await Login(userInfo);
            const token = res.data.access_token;
            commit('SET_TOKEN', res.data.access_token);
            setToken(token);
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(e);
        }
    },

    async getUserInfo({ commit }: { commit: Commit }) {
        try {
            const res = await GetUserInfo();
            commit('SET_USER_INFO', res.data?.user);
            commit('SET_PERMISSIONS', res.data?.permissions);
            commit('SET_MENUS', res.data?.menus);
            commit('SET_ROLES', res.data?.roles);
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(e);
        }
    },

    async logout({ commit }: { commit: Commit }) {
        try {
            const res = await Logout();
            commit('SET_TOKEN', '');
            commit('SET_USER_INFO', {});
            commit('SET_MENUS', []);
            commit('SET_PERMISSIONS', []);
            commit('SET_ROLES', []);
            removeToken();
            return Promise.resolve(res);
        } catch (e) {
            return Promise.resolve(e);
        }
    },
};

const userStore = {
    namespaced: true,
    state,
    mutations,
    actions,
};

export default userStore;
