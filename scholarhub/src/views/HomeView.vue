<template lang="html">
  <div class="main-body">
    <NaviBar />
    <div class="content">
      <router-view></router-view>
    </div>
    <FootBar />
  </div>
</template>
<script>
import NaviBar from '@/components/NaviBar.vue';
import FootBar from '@/components/FootBar.vue'
export default {
  components: { // 在这里注册想要在本页面中使用的子组件
    NaviBar,
    FootBar
  },
}
</script>
<style lang="scss" scoped>
// html,
// body {
//   height: 100%;
//   margin: 0;
//   padding: 0;
// }
.main-body{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content{
  flex: 1;
}
</style>
