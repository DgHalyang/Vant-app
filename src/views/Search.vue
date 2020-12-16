<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon @click="$router.goBack()" name="arrow-left" class="arr-left" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="placeholder"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon name="cart-o" id="shop-car" :badge="sum" />
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell @click="onSearch(item)" v-for="item in likeList" :key="item">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-card" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <card
          v-for="(item, index) in goodsList"
          :num="counterMap[item.id]"
          :key="index"
          v-bind="item"
        />
      </van-list>
    </div>
    <div class="my-history" v-if="likeList.length <= 0 && showList">
      <my-history :searchList="searchList" @search="onSearch"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../api/good';
import Card from '../components/Card.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  components: {
    Card,
    MyHistory,
  },
  data() {
    return {
      placeholder: '酒',
      value: this.placeholder,
      // 模糊搜索列表
      likeList: [],
      // 防抖
      timer: null,
      showList: true,
      // 搜索列表所需数据
      page: 1,
      size: 5,
      // vant-list数据
      loading: false,
      finished: false,
      goodsList: [],
      total: 0,
      // 搜索后的结果展示
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    // 购物车图标展示
    sum() {
      // 拿到本地存储所有的键值对的值
      // 然后开始累加
      const sum = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (sum > 99) {
        return '99+';
      }
      return sum;
    },
  },
  methods: {
    // goHome() {
    //   this.$router.push({
    //     name: 'Classify',
    //   });
    // },
    async onSearch(keyWord) {
      if (keyWord) {
        this.value = keyWord;
      } else {
        this.value = this.placeholder;
      }
      // 逻辑 -> 先从搜索列表中找是否有查找过,
      // 是则按时间排序,否则加入到数组最前面
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        console.log('gg');
        this.searchList.unshift({
          value: this.value,
          time: new Date().getTime(),
        });
        console.log(this.searchList);
        // this.searchList.unshift({ value: this.keyWord, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      // 在用来展示搜索结果的列表头部添加信息
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      // 清空模糊搜索列表
      this.likeList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },
    // 防抖
    async input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await api.likeSearch(this.value);
          // console.log(value);
          this.likeList = [];
          this.likeList = value.result;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    // 格式化模式搜索的选项
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
    // 获取搜索列表 列表显示方法
    async onLoad() {
      // this.goodsList = [];
      const searchList = await api.search(this.value, this.page, this.size);
      // console.log(searchList);
      this.goodsList = [...this.goodsList, ...searchList.list];
      this.total = searchList.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
  },
  created() {
    // 获取搜索结果并展示
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 50;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
  }
  .like-search {
    top: 50px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .my-history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
