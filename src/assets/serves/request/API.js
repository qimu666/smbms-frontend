import config from "@/assets/config/config";
import axios from "axios";

const request = axios.create(config);
import {Message} from "element-ui";
import router from "@/router";
// 请求检验白名单
const NO_LOGIN_CHECK = ['/']

request.interceptors.request.use(
    (config) => {
        // 获取当前路由path
        // console.log(router.currentRoute.path)
        let loginUser = sessionStorage.getItem("loginUser");
        loginUser = JSON.parse(loginUser)
        if (!loginUser) {
            // 如果当前session中不包含用户并且NO_LOGIN_CHECK不包含当前路由地址就会重定向到登录页面
            if (!NO_LOGIN_CHECK.includes(router.currentRoute.path)) {
                Message({
                    type: 'error',
                    center: true,
                    duration: 1500,
                    message: "登录过期,请重新登录(>_<)!"
                })
                router.replace("/").catch(e => console.log(e))
            }
        }
        // 处理请求前的逻辑
        return config;
    },
    (error) => {
        // 处理请求前发生的错误
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        // 处理请求成功的逻辑
        if (response.data.code === 40100) {
            if (!NO_LOGIN_CHECK.includes(router.currentRoute.path)) {
                Message({
                    showClose: true,
                    center: true,
                    message: '登录过期,请重新登录(>_<)!',
                    duration: 1500,
                    type: 'error',
                });
                router.replace("/").catch(e => {
                    console.log(e)
                })
            }
        }
        return response.data;
    },
    (error) => {
        Message({type: "error", message: "服务器超时,请重试!", center: true, showClose: true, duration: 1500,})
        router.replace("/").catch(e => {
            console.log(e)
        })
        // 处理请求失败的逻辑
        return Promise.reject(error);
    }
);

export default request;