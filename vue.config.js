const {
    getThemeVariables
} = require('ant-design-vue/dist/theme');
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
};