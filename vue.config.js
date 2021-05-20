const {
    getThemeVariables
} = require('ant-design-vue/dist/theme');

const commonProxy = {
    target: process.env.VUE_APP_BASE_URL,
    ws: false,
    changeOrigin: true,
};
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        ...getThemeVariables()
                    },
                    // DO NOT REMOVE THIS LINE
                    javascriptEnabled: true,
                },
                // 如果你不需要多主题，可以注释 additionalData
                // additionalData,
            },
        },
    },
    devServer: {
        port: 8000,
        proxy: {
            '/auth': commonProxy,
            '/upms': commonProxy,
        },
    },
};