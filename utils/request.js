import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8099' : 'https://open.furuzix.top/api/web';

const errCodeMessage = {
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

function errorHandle(statusCode) {
  if (statusCode === 401) {
    Dialog.alert({
      title: '警告',
      message: '授权过期,请重新登录'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  } else
    if (process.env.NODE_ENV === 'development' || statusCode >= 500)
    Dialog.alert({
      title: '错误',
      message: `${statusCode}: ${errCodeMessage[statusCode]}`,
    })
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  },
});

instance.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use( response => {
  return response;
}, error => {
  // errorHandle(error)
  return Promise.reject(error);
});

export default instance;

