<template>
  <div class="side-bar-wrapper" ref="side">
    <div
      v-for="(item, ind) in sideList"
      :key="item"
      :class="{ active: ind === index }"
      @touchstart="move = false"
      @touchmove="move = true"
      @touchend="scrollTo(item, ind, $event)"
    >
      {{ ind === 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import tool from '@/utils/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(item, index, e) {
      if (this.move) {
        return;
      }
      this.index = index;
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      // side.scrollTop += sonTop + sonHeight / 2 - pTop - pHeight / 2;
      tool.moveScroll(
        side.scrollTop,
        sonTop + sonHeight / 2 - pTop - pHeight / 2,
        side,
        'scrollTop',
      );
      // 获取右侧列表信息
      this.resetGoodsList();
      this.getGoodsList({
        type: this.sideList[index],
        page: 1,
        sortType: 'all',
      });
    },
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideBarList,
    }),
  },
  mounted() {
    // setTimeout(() => {
    //   this.resetGoodsList();
    //   this.getGoodsList({
    //     type: this.sideList[0],
    //     page: 1,
    //     sortType: 'all',
    //   });
    // }, 500);
  },
};
</script>

<style lang="less" scoped>
.side-bar-wrapper {
  position: fixed;
  top: 135px;
  left: 0;
  width: 79px;
  bottom: 1.33333rem;
  background: #f8f8f8;
  overflow: auto;
  div {
    width: 100%;
    text-align: center;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
.side-bar-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
