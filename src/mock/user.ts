export default [
  // GetUserInfo
  {
    url: "/user/getUserInfo",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          user: {
            name: "前端大佬",
            avatar:
              "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
            deptName: "Vue爱好者研发中心",
            sex: 1,
          },
        },
      };
    },
  },
  // getToken
  {
    url: "/auth/oauth/token",
    type: "post",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          access_token: "d28494aa-5459-45a2-a803-3209796034b0",
          dept_id: "1",
          email: "1048334128@qq.com",
          expires_in: 19220,
          name: "前端大佬",
          user_id: "1",
          username: "张大大",
        },
      };
    },
  },

  // logout
  {
    url: "/user/logout",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "登出成功",
      };
    },
  },
];
