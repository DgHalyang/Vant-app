<template>
    <div>
        <router-view></router-view>
        <tab-bar />
    </div>
</template>

<script>
import TabBar from '../components/TabBar.vue';

export default {
  components: {
    TabBar,
  },
};
</script>
