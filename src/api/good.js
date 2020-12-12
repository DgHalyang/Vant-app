import axios from '@/axios';

export default {
  getSidebar(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
};
