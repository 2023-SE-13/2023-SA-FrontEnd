<template lang="html">
  <div class="navi">
    <div class="navi-item">
      <router-link to="/home">首页</router-link>
    </div>
    <div class="navi-item">
      <router-link to="/introduce">资源介绍</router-link>
    </div>
    <div class="navi-item">
      <router-link to="/temp1">学术交流</router-link>
    </div>
    <div class="navi-item">
      <router-link to="/temp1">网站声明</router-link>
    </div>
    <div class="navi-item">
      <router-link to="/about">关于我们</router-link>
    </div>
    <div class="navi-item">
      <input type="text">
    </div>
    <div class="navi-item">
      <button>登录</button>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="css">
  .navi {
    border: 1px solid #ccc;
    padding: 3px;
  }
  .navi-item {
    display: inline-block;
    margin-left: 20px;
    padding: 3px;
    border: 1px solid #ccc;
  }
</style>
