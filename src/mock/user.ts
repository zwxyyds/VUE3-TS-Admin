export default [
    // GetUserInfo
    {
        url: '/upms/user/info',
        type: 'get',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
                    name: 'testName',
                },
            };
        },
    },
    // getToken
    {
        url: '/auth/oauth/token',
        type: 'post',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
                    access_token: "d28494aa-5459-45a2-a803-3209796034b0",
                    dept_id: "1",
                    email: "111111@qq.com",
                    expires_in: 19220,
                    license: "made by zwx",
                    name: "前端大佬",
                    refresh_token: "d89569b5-5576-4eeb-adc4-79dd42bef270",
                    scope: "server",
                    token_type: "bearer",
                    user_id: "1",
                    username: "张大大",
                },
            };
        },
    },
];
