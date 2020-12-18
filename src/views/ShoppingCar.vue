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
          <!-- 向组件传递该物品的数量:num="counterMap[item.id]"  -->
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
      // 选中之后会加入到result数组之中
      result: [],
      // 购物车数组
      list: [],
      // 全选按钮
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
        // 确认框
        await Dialog.confirm({ message: '您是否要删除已选中商品?' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
          // 筛选出购物车中没有该id的商品，即没有删除的商品，再渲染列表
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        Toast('用户已取消!');
      }
    },
    async getAllDate() {
      // 所有购物车数据的物品的id的数组
      console.log(this.counterMap);
      const result = Object.keys(this.counterMap);
      console.log(result);
      const res = await api.getGoodsById(result.join());
      // 可以渲染的购物车数组
      this.list = res.list;
      // console.log(this.list);
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    // 提交按钮
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
      // 获取到选中的数据
      const result = this.list.filter((item) => this.result.includes(item.id));
      // console.log(result);
      return result.reduce((prev, next) => {
        // 下一项是否有个数数据，没有则为0
        const num = this.counterMap[next.id] || 0;
        // 因为有小数点后两位 所以 * 100;
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
