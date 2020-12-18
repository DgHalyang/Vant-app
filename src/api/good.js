import axios from '@/axios';

export default {
  // 获取侧边栏数据
  getSidebar(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
  getGoodsList(type, page, size, sort) {
    return axios.get('/getGoodsList', {
      params: {
        type, page, size, sort,
      },
    });
  },
  // 模糊搜索
  likeSearch(value) {
    return axios.get('/likeSearch', { params: { likeValue: value } });
  },
  // 搜索
  search(type, page, size) {
    return axios.get('/search', {
      params: {
        type,
        page,
        size,
      },
    });
  },
  // 购物车
  getGoodsById(value) {
    return axios.get('/getGoodsByIds', { params: { value } });
  },
};
