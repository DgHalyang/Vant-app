import axios from '@/axios';

export default {
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
};
