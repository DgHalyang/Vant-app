<template>
  <div class="history">
      <h4>历史记录:</h4>
      <div @click="search(item.value)" class="his-item" v-for="item in searchList" :key="item.time">
          {{item.value}}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    // 没有传值的话默认返回空数组
    searchList: {
      defalut() {
        return [];
      },
    },
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
  created() {
    console.log(this.searchList);
  },
};
</script>

<style lang="less" scoped>
.his-item {
  padding: 15px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>
