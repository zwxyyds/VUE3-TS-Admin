import axios from "axios";
import store from "@/store";
import { createVNode } from "vue";
import { getToken } from "@/utils/cookie";
import { Modal, message as Message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// import { PageParam } from './typing';
const service = axios.create({
  timeout: 15000,
  headers: { "content-type": "application/json;charset=UTF-8" },
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken()
      ? `Bearer ${getToken()}`
      : `Basic ${btoa(process.env.VUE_APP_BASIC_KEY)}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200 && res.code !== 204) {
      Message.error(res.msg || "Error", 3);
      return Promise.reject(res.msg || "Error");
    } else {
      return res;
    }
  },
  (err) => {
    if (err.response.status === 401) {
      Modal.confirm({
        title: "warning",
        icon: createVNode(ExclamationCircleOutlined),
        content: "quit",
        onOk() {
          return new Promise((resolve) => {
            store.dispatch("user/logout").then(() => {
              resolve(true);
              window.location.reload();
            });
          });
        },
      });
    } else {
      Message.error(err.response.data?.msg || "Request Error", 3);
    }
    return Promise.reject(err);
  }
);

export default service;

export const requestPage = <T, U>(url: string, data: any) => {
  return service.post<T, U>(url, data);
};

