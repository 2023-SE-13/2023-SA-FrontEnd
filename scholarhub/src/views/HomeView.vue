<template lang="html">
  <div>
    <NaviBar />
    <router-view></router-view>
  </div>
</template>
<script>
import NaviBar from '@/components/NaviBar.vue';

export default {
  components: { // 在这里注册想要在本页面中使用的子组件
    NaviBar,
  },
}
</script>
<style lang="">
  
</style>