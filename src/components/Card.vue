<template>
  <div class="card van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" ref="img" />
    </div>
    <div class="card-content">
      <div class="overflow-hidden title">{{ title }}</div>
      <div class="overflow-hidden desc">{{ desc }}</div>
      <div class="overflow-hidden tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="overflow-hidden prices">
        <div class="price-off">￥{{ price }}</div>
        <!-- <div class="price" v-if="priceOff">￥{{ price }}</div> -->
        <!-- <div class="price">￥{{ price }}</div> -->
      </div>
      <div class="counter">
        <div @touchend="counter(id, -1)" v-if="num">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div @touchend="counter(id, +1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
      <!-- <div class="smaller">找相似</div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate';

export default {
  data() {
    return {
      sellOut: false,
    };
  },
  props: ['images', 'desc', 'tags', 'title', 'price', 'id', 'num', 'nofly'],
  methods: {
    // 本地化存储 存储购物车的数据
    ...mapMutations(['storageChange']),
    // 本地化存储 传入id 以及 是+1还是-1
    counter(id, num) {
      this.storageChange({ id, value: num });
      if (num === -1) {
        return;
      }
      if (this.nofly) {
        return;
      }
      // 飞入购物车动画实现
      // 读取列表中图片的位置及宽高
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      // 根据id获取到TabBar组件里的购物车dom,并获取位置及宽高
      const shopCar = document.getElementById('shop-car');
      const { top: carY, left: carX } = shopCar.getBoundingClientRect();
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      // console.log(top, left, shopCar);
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      // 写一个动画方法
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    position: relative;
    flex: 1;
    > div:not(.smaller) {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        border: 1px solid #aaa;
        padding: 1px 2px 2px 2px;
        color: #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      .price-off {
        font-size: 14px;
        color: #ff1a90;
        font-weight: 600;
        margin-right: 5px;
      }
      .price {
        font-size: 12px;
        color: #aaa;
        text-decoration: line-through;
      }
    }
  }
  .counter {
    display: flex;
    position: absolute;
    bottom: 12px;
    right: 15px;
    justify-content: flex-end;
    align-items: center;
    > div:not(.num) {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
  .smaller {
    text-align: right;
    justify-content: flex-end;
    position: absolute;
    bottom: 9px;
    right: 15px;
    border: 1px solid #ff1a90;
    border-radius: 4px;
    padding: 2px;
    width: 38px;
    color: #ff1a90;
    font-size: 12px;
  }
  .move-dot {
    position: relative;
    z-index: 500;
    height: 90px;
    width: 90px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
