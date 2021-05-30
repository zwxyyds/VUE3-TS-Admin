import Mock from "mockjs";
import user from "./user";
import table from "./table";
import { MockParams } from "./typing";
const mocks = [...user, ...table];
//设置延时时间
Mock.setup({
  timeout: "300-600",
});

export function mockXHR() {
  let i: MockParams;
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || "get", i.response);
  }
}
