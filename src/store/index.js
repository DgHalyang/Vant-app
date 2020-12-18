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
    // 获取侧边栏的子数据的列表(右边数据)时所用的参数
    type: null,
    size: 5,
    goodsList: [],
    // 购物车数量
    counterMap: {},
  },
  mutations: {
    // 获取侧边栏数据
    setSideBarList(state, list) {
      state.sideBarList = list;
    },
    // 侧边栏有数据时才显示
    setShowContent(state, boolean) {
      state.showContent = boolean;
    },
    // 清空侧边栏获取的子数据的列表，然后再获取
    resetGoodsList(state) {
      state.goodsList = [];
    },
    // 获取侧边栏获取的子数据的列表,因为有滚动加载
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    // 保存侧边栏点击品种
    setGoodsType(state, type) {
      state.type = type;
    },
    // 购物车数据
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    // 本地化存储，购物车数据
    storageChange(state, { id, value }) {
      // 如果购物车对象中有此物品，进入判断
      if (state.counterMap[id]) {
        // 如果点击的是 减 按钮，并且物品数量为1时，对象中删除此商品
        // || 或购物车页面传递删除信息 value === -Infinity 对象中删除此商品
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          // 如果点击的是 加 按钮，此物品数量加1
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        // 如果购物车对象中没有此物品，对象中加入此对象，数量为1
        Vue.set(state.counterMap, id, 1);
      }
      // JSON.stringify()的作用是将 JavaScript 对象转换为 JSON 字符串，
      // 而JSON.parse()可以将JSON字符串转为一个对象。
      // App.vue中使用
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    // 获取侧边栏数据 type参数 ===>
    // OneTab.vue -> this.menuList[index].title --> 传过来标题的名字。
    async setSideBarList({ commit }, type) {
      commit('setShowContent', false);
      const list = await api.getSidebar(type);
      commit('setSideBarList', list);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      // 名字，页数，排序方法
      const { page, sortType } = options;
      const type = options.type || state.type;
      // console.log(type);
      // 保存侧边栏点击品种
      commit('setGoodsType', type);
      // 获取到品种下的数据列表和total总数
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      commit('setGoodsList', list);
      // 数据总数
      console.log(total);
      // 加载总数
      console.log(state.goodsList.length);
      // 当加载总数 > 数据总数
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
