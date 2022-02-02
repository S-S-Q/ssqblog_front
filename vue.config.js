//访问8080接口但是转发到其他接口
module.exports={
    devServer:{
        proxy: {
            '/api': {
                target: 'http://localhost:8081',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/'//重写,
                }
            }
        }
    }
}

