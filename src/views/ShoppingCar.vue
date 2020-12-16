<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        right-arrow
        @click-right="onClickRight"
      />
    </div>
    <div class="card-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <card v-bind="item" :num="counterMap[item.id]" :nofly="true" />
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${total})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Dialog, Toast } from 'vant';
import api from '@/api/good';
import Card from '../components/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  created() {
    this.getAllDate();
  },
  methods: {
    ...mapMutations(['storageChange']),
    // 删除按钮
    async onClickRight() {
      if (this.result.length === 0) {
        Toast('你没有选中商品!');
      }
      try {
        await Dialog.confirm({ message: '您是否要删除已选中商品?' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        Toast('用户已取消!');
      }
    },
    async getAllDate() {
      const result = Object.keys(this.counterMap);
      console.log(result);
      const res = await api.getGoodsById(result.join());
      this.list = res.list;
      console.log(this.list);
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    onSubmit() {},
  },
  watch: {
    // 监测是否全选
    result() {
      // result->选中后会加入数组
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  computed: {
    // 购物车数据
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    // 总额
    allMoney() {
      const result = this.list.filter((item) => this.result.includes(item.id));
      return result.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      }, 0);
    },
    // 总件数
    total() {
      const result = this.list.filter((item) => this.result.includes(item.id));
      const res = result.reduce(
        (prev, next) => prev + this.counterMap[next.id] || 0,
        0,
      );
      return res;
    },
  },
};
</script>

<style lang="less">
.shopping {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
