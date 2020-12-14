import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/good';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边栏
    sideBarList: [],
    // 切换时显示loading
    showContent: false,
    size: 5,
    goodsList: [],
    type: null,
    // 购物车数量
    counterMap: {},
  },
  mutations: {
    setSideBarList(state, list) {
      state.sideBarList = list;
    },
    setShowContent(state, boolean) {
      state.showContent = boolean;
      console.log(state.showContent);
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[id] === 1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async setSideBarList({ commit }, type) {
      commit('setShowContent', false);
      const list = await api.getSidebar(type);
      commit('setSideBarList', list);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      const type = options.type || state.type;
      commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
