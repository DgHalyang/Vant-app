<template>
  <van-tabbar v-model="active" route fixed>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item :badge="sum" icon="friends-o" to="/home/shoppingCar"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" to="/home/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    sum() {
      // 拿到本地存储所有的键值对的值
      // 然后开始累加
      const sum = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (sum > 99) {
        return '99+';
      }
      return sum;
    },
  },
};
</script>
