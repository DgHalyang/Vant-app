import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/good';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边栏
    sideBarList: [],
  },
  mutations: {
    setSideBarList(state, list) {
      state.sideBarList = list;
    },
  },
  actions: {
    async setSideBarList({ commit }, type) {
      const list = await api.getSidebar(type);
      commit('setSideBarList', list);
    },
  },
  modules: {
  },
});
