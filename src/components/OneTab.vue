<template>
  <div class="one-tab-wrapper" ref="oneTab">
    <div
      class="tab-item"
      v-for="(item, ind) in menuList"
      :key="item.title"
      :class="{ active: index === ind }"
      @touchend="scrollTo(ind, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-box active">
        <img :src="item.imgURL" />
      </div>
      <div class="title-box">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tool from '@/utils/tool';

export default {
  data() {
    return {
      move: false,
      index: 0,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['setSideBarList']),
    // 手指离开的时候触发
    scrollTo(index, e) {
      if (this.move) {
        return;
      }
      this.index = index;
      /**
       * 计算移动的距离
       * father.offsetWidth/2  父级元素的一半
       * son.offsetWidth/2     每个menu的一半
       * son.getBoundingClientRect().left  每个menu到父级的距离
       * 公式等于
       * son.offsetWidth/2 + son.getBoundingClientRect().left
       * - father.offsetWidth/2
       */
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const fatherWidth = oneTab.offsetWidth;
      // oneTab.scrollLeft += itemWidth / 2 + itemLeft - fatherWidth / 2;
      tool.moveScroll(oneTab.scrollLeft, itemWidth / 2 + itemLeft - fatherWidth / 2, oneTab, 'scrollLeft');
      // 获取侧边栏数据，然后保存到store.js中,让侧边栏组件读取数据
      this.setSideBarList(this.menuList[index].title);
    },
  },
  created() {
    this.setSideBarList(this.menuList[0].title);
  },
};
</script>

<style lang="less" scoped>
.one-tab-wrapper {
  width: 100%;
  height: 104px;
  display: flex;
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    text-align: center;
    .img-box {
      width: 100%;
      height: 50px;
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-radius: 23px;
      img {
        width: 45px;
        height: 45px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }
  }
  .active {
    .img-box {
      background: #fff;
      border-color: #d13193;
    }
    .title-box {
      color: #fff;
      background: #d13193;
      font-weight: bold;
      border-radius: 30px;
    }
  }
}
// 滚动条去掉
.tab-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
