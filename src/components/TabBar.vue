<template>
  <van-tabbar route fixed>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item
    :badge="sum"
    icon="friends-o"
    to="/home/shoppingCar"
    id="shop-car"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" to="/home/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // 拿到store.js中购物车对象
      counterMap: (state) => state.counterMap,
    }),
    sum() {
      // Object.values()返回一个数组，其元素是在对象上找到的可枚举属性值
      // var obj = { foo: 'bar', baz: 42 };
      // console.log(Object.values(obj)); // ['bar', 42]
      const sum = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (sum > 99) {
        return '99+';
      } if (sum === 0) {
        return '';
      }
      return sum;
    },
  },
};
</script>
