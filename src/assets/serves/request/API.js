import config from "@/assets/config/config";
import axios from "axios";
import router from "@/router";

const request = axios.create(config);
import {Message} from "element-ui";

request.interceptors.request.use(
    (config) => {
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
            Message({
                showClose: true,
                message: '请先登录 (>_<) !!',
                type: 'error'
            });
            router.push("/")
        }
        return response.data;
    },
    (error) => {
        Message({type: "error",message: "服务器超时,请重试!", center: true,showClose: true,})
        router.push("/")
        // 处理请求失败的逻辑
        return Promise.reject(error);
    }
);

export default request;