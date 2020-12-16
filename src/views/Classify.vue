<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" :to="{name:'Search'}">
      <van-icon name="search" />
      搜索框
    </router-link>
    <one-tab />
    <div class="classify-content">
      <side-bar />
      <good-list />
    </div>
  </div>
</template>

<script>
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodList from '../components/GoodList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodList,
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
