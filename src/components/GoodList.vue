<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div :class="{ active: type === 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: type === 'sale' }" @touchend="changeType('sale')">
        销量
      </div>
      <div
        :class="{
          'price-up': type === 'price-up',
          'price-down': type === 'price-down',
        }"
        class="price"
        @touchend="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content" v-if="showContent">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- <p>刷新次数: {{ count }}</p> -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- v-bind="item"将所有内容传递给子组件 -->
          <card
            v-for="(item, index) in goodsList"
            :num="counterMap[item.id]"
            :key="index"
            v-bind="item"
          />
        </van-list>
      </van-pull-refresh>
    </div>
    <van-loading class="center" size="1.3rem" color="pink" v-else />
  </div>
</template>

<script>
// import { Toast } from 'vant';
import { mapActions, mapMutations, mapState } from 'vuex';
import Card from './Card.vue';

export default {
  data() {
    return {
      type: 'price-up',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      // 数据列表数组
      goodsList: (state) => state.goodsList,
      showContent: (state) => state.showContent,
      counterMap: (state) => state.counterMap,
    }),
  },
  components: {
    Card,
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    changeType(type) {
      if (type === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = type;
      }
      this.onRefresh();
    },
    // 下拉刷新
    onRefresh() {
      // 底部刷新重置为true
      this.isLoading = true;
      this.finished = false;
      this.loading = false;
      this.page = 1;
      this.resetGoodsList();
      this.getGoodsList({ page: 1, sortType: this.type });
      this.isLoading = false;
      this.finished = true;
    },
    // 在store.js中判断是否需要继续滚动加载
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.getGoodsList({
        page: this.page,
        sortType: this.type,
      });
      console.log(result);
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.list-wrapper {
  transform: translateY(0);
  transition: all 0.3s;
  position: fixed;
  border-top: 1px solid #eee;
  top: 135px;
  right: 0;
  width: 296px;
  bottom: 50px;
  overflow: auto;
  .list-header {
    position: sticky;
    top: 0;
    height: 25px;
    width: 280px;
    padding: 0 8px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    z-index: 100;
    background: #fff;
    > div {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      color: #aaa;
      position: relative;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content {
    position: relative;
    transition: translateY 0.3s linear;
    .list-item {
      background: red;
      border-bottom: 1px solid white;
    }
  }
}
.list::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.card {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    > div {
      width: 190px;
      font-size: 12px;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 400;
    }
    .desc {
      color: #aaa;
      margin-bottom: 3px;
    }
    .tags {
      display: flex;
      margin-bottom: 3px;
      > div {
        border: 1px solid #aaa;
        padding: 1px;
        color: #aaa;
        border-radius: 3px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      .price-off {
        font-size: 14px;
        color: pink;
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
    bottom: 5px;
    right: 15px;
    justify-content: flex-end;
    > div:not(.num) {
      font-size: 22px;
      width: 22px;
      height: 22px;
      line-height: 19px;
      border-radius: 11px;
      color: white;
      font-weight: 700;
      background: lime;
      text-align: center;
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
}
.van-pull-refresh {
  overflow: unset;
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
