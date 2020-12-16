<template>
  <div id="app">
    <!-- 切换页面时的动画效果 -->
    <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'left',
    };
  },
  created() {
    // 一开始取值解析并赋值到store.js
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  // 判断路由实现页面切换动画
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
  // 切换时会有bug->store.js->action方法中的setSideBarList
  // 因为是异步的，所以会有冲突
  // Classify组件中，监测showContent并请求数据
  // SideBar组件请求数据注释掉
};
</script>

<style lang="less">
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all .3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
