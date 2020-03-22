import axios from 'axios';
import { baseURL } from 'config/baseURL';
import QS from 'qs';
// import router from '../router';
import { message } from 'antd';
// 配置axios基础url
const defaultBaseUrl = 'http://localhost:8080/';
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    message.info({
        content: msg,
        duration: 1000,
    });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//     router.replace({
//         path: '/login',
//         query: {
//             redirect: router.currentRoute.fullPath,
//         },
//     });
// };

// 错误处理
const errorBase = {
    400: function(msg) {},
    401: function(msg) {},
    403: function(msg) {},
    404: function(msg) {},
    500: function(msg) {
        tip(msg);
    },
    501: function(msg) {},
    502: function(msg) {},
    503: function(msg) {},
    504: function(msg) {},
    505: function(msg) {},
};

const errorHandle = function(status, errMsg) {
    return errorBase[status](errMsg);
};

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });

// 数据接口域名统一配置.env
instance.defaults.baseURL = baseURL || defaultBaseUrl;

// 配置post请求的请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// http request 拦截器
instance.interceptors.request.use(
    config => {
        // 判断是否存在usertoken 如果存在就每次请求带在请求头
        const userToken = store.state.userToken || system.setValue('usertoken');
        userToken && (config.headers.Authorization = userToken);
        // post请求体自带参数
        // config.data.userToken = userToken
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// http response 拦截器
instance.interceptors.response.use(
    // 请求成功
    response =>
        response.status === 200 ? Promise.resolve(response.data.data) : Promise.reject(response),
    error => {
        const { response } = error;
        if (response) {
            // console.log(response.statusText)
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.statusText);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    },
);
export default instance;

export function post(url, data) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, QS.stringify(data))
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, { params })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
