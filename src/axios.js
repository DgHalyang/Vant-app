import axios from 'axios';

const appkey = 'Halyang_1606814712244';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey,
  },
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

// 添加响应拦截器
instance.interceptors.response.use((response) => response.data);

export default instance;
