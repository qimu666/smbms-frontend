// import axios from "axios";
//
// const _axios = axios.create({
//     baseURL: 'http://localhost:8080',
//     withCredentials: true
// });
//
// _axios.interceptors.request.use(
//     function (config) {
//         // 比如在这里添加统一的 headers
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );
// _axios.interceptors.response.use(
//     function (response) {
//         // 2xx 范围内走这里
//         return response;
//     },
//     function (error) {
//         // 超出 2xx, 比如 4xx, 5xx 走这里
//         return Promise.reject(error);
//     }
// );
//
// export default _axios