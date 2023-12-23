<template lang="html">
  <div class="main-body">
    <div class="navi">
      <NaviBar />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="foot">
      <FootBar />
    </div>

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
.navi {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.content{
  flex: 1;
}
.foot {
  position: sticky;
  bottom: -50;
  z-index: 1000;
}
</style>
