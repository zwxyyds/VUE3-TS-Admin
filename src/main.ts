import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  Select,
  Button,
  Checkbox,
  Tabs,
  Tag,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Tooltip,
  Space,
  Steps,
  Divider,
  Descriptions,
  Alert,
  Result,
  Statistic,
  Popconfirm,
  Popover,
  Table,
  Avatar,
  List,
  Progress,
  Switch,
  Modal,
  Rate,
  ConfigProvider,
  Empty,
  Spin,
  Drawer,
} from "ant-design-vue";

import { useIcons } from "@/icons";

import { mockXHR } from "@/mock/index";

import "@/router/permissoin";

import "./global.less";

if (process.env.NODE_ENV === "mock") {
  // 判断是否为mock模式
  mockXHR();
}

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(Layout)
  .use(Menu)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Form)
  .use(Dropdown)
  .use(Select)
  .use(Button)
  .use(Checkbox)
  .use(Tabs)
  .use(Tag)
  .use(Input)
  .use(DatePicker)
  .use(TimePicker)
  .use(Radio)
  .use(Tooltip)
  .use(Space)
  .use(Steps)
  .use(Divider)
  .use(Descriptions)
  .use(Alert)
  .use(Result)
  .use(Statistic)
  .use(Popconfirm)
  .use(Popover)
  .use(Table)
  .use(Avatar)
  .use(List)
  .use(Progress)
  .use(Switch)
  .use(Modal)
  .use(Rate)
  .use(ConfigProvider)
  .use(Empty)
  .use(Spin)
  .use(Drawer);
useIcons(app);
app.mount("#app");
