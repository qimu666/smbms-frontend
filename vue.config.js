const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8089,
        //代理
        proxy: {
            '/api': {
                target: ' http://localhost:8090/',
                changeOrigin: true
            }
        }
    }
})
