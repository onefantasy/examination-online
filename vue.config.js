module.exports = {
    configureWebpack:{
        resolve: {
            // 使用别名
            alias:{
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            },
        }
    },
    devServer: {
        port: 8081, // 端口
    },
};
