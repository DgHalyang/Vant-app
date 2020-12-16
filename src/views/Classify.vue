<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" :to="{name:'Search'}">
      <van-icon name="search" />
      搜索框
    </router-link>
    <one-tab />
    <div class="classify-content" v-if="showContent">
      <side-bar />
      <good-list />
    </div>
    <van-loading size="2rem" vertical v-else />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodList from '../components/GoodList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideBarList: (state) => state.sideBarList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideBarList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
  width: 100%;
  .search-btn {
    width: 355px;
    margin: 11px auto 0;
    height: 33px;
    line-height: 33px;
    background-color: #eee;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
