<template>
  <van-tabbar v-model="active" route fixed>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/home/shoppingCar">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/home/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
