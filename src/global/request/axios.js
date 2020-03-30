import axios from "axios";
import { Message, Notification } from "element-ui"; //通知
import Cookie from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;

// 全局错误处理
const handleErrorRequest = error => {
  let response = error.response;
  let status = response ? response.status : 0;
  let data = response.data;
  let errors = data.msg;
  let message = data.message || "请求发送失败~";
  if (!status) {
    // eslint-disable-next-line
    // console.log('请求超时，请检查网络后刷新页面 ～')
    Notification.error({
      title: "请求超时",
      message: message,
      duration: 0,
      customClass: "global-error"
    });
    return;
  }

  if (status === 401) {
    // eslint-disable-next-line
    // console.log('没有登录')
    Notification.error({
      title: "没有登录 401",
      message: message,
      customClass: "global-error"
    });
  } else if (status === 419) {
    // eslint-disable-next-line
    // console.log('页面过期 没有 CSRF')
    Notification.error({
      title: "页面过期 419",
      message: message,
      customClass: "global-error"
    });
  } else if (status === 422 || status === 423) {
    // eslint-disable-next-line
    // console.log('参数校验失败',errors)
    Message.error(errors);
  } else {
    // 一般情况下需要上报
    // eslint-disable-next-line
    // console.log('其他错误',message)
    Notification.error({
      title: "网络错误",
      message: message,
      customClass: "global-error"
    });
  }
};

// 添加一个请求拦截器（ 一般用于鉴权 )
// import DataStore from '@/global/storage/datastore.js';
axios.interceptors.request.use(
  function(config) {
    const newConfig = { ...config };
    const TOKEN = Cookie.get("web_admin_token");
    if (TOKEN) {
      newConfig.headers.Authorization = TOKEN;
    }
    return newConfig;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // 兼容包了一层 { code, data } 的情况
    switch (true) {
      // data.code 返回不等于200 代表业务错误
      case res.data.error_code === 0:
        return res.data.data;
      case !!res.data.error_code:
        Message.error(res.data.msg);
        return Promise.reject(res.data);
      case !!res.data.code:
        Message.error(res.data.msg);
        return Promise.reject(res.data);
      default:
        return res.data;
    }
  },
  error => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

/* [请求库]
 ** @params url         { string }   @default => '' [接口地址，统一在global/resource文件中]
 ** @params data/params { object }   @default => {} [发送数据]
 ** @params config      { object }   配置
 */

export default {
  post: function(url = "", data = {}, config) {
    return axios.post(url, data, config);
  },

  put: function(url = "", data = {}, config) {
    return axios.put(url, data, config);
  },

  get: function(url, params = {}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.get(url, OPTIONS);
  },

  delete: function(url = "", params = {}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.delete(url, OPTIONS);
  }
};
