<template lang="html">
  <div class="navi">
    <div class="navi-inner">
      <img class="logo" alt="logo" src="../assets/logo.png" @click="gotoMain">
      <div class="navi-item" v-for="(naviUnit, index) in naviUnits" :key="index" @click="changeActive(index)"
           :class="{ active: activeIndex === index }">
        <router-link :to="naviUnit.link_to">{{ naviUnit.content }}</router-link>
      </div>
      <div class="navi-search" v-show="this.$route.path !== '/main'">
        <el-input placeholder="请输入内容" v-model="input1">
          <el-select v-model="select" slot="prepend" placeholder="">
            <el-option label="标题" value="1" @click="select='标题'"></el-option>
            <el-option label="关键词" value="2" @click="select='关键词'"></el-option>
            <el-option label="作者" value="3" @click="select='作者'"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="photo">
        <el-dropdown placement="bottom">
          <el-avatar :size="35" src="../assets/cover.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>主页</el-dropdown-item>
            <el-dropdown-item>收藏</el-dropdown-item>
            <el-dropdown-item>推荐</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: null,
      naviUnits: [
        { content: "首页", link_to: "/main" },
        { content: "资源介绍", link_to: "/introduce" },
        { content: "学术交流", link_to: "/temp1" },
        { content: "网站声明", link_to: "/temp1" },
        { content: "关于我们", link_to: "/about" }
      ],
      input1: '',
      select: '标题'
    }
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index
      console.log(this.activeIndex)
    },
    gotoMain() {
      this.$router.push("/main")
    }
  },
  created() {
    const currentRouteIndex = this.naviUnits.findIndex(unit => unit.link_to == this.$route.path);
    this.activeIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;


    this.$watch('$route', () => {
      const currentRouteIndex = this.naviUnits.findIndex(unit => unit.link_to === this.$route.path);
      this.activeIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;
    })
  }
}
</script>
<style lang="css">
.navi {
  width: 100%;
  background-color: #2f3a91;
  height: 60px;
  padding-left: 7%;
  padding-right: 7%;
}

.navi-inner{
  width: 86%;
  height: 100%;
  position: relative;
}

.navi-inner .logo{
  display: inline-block;
  width: 150px;
  height: 60px;
  float: left;
  opacity: 0.75;
}

.navi-inner .navi-item {
  display: inline-block;
  float: left;
  height: 60px;
  position: relative;
  left: 10px;
}

.navi-inner .navi-item a {
  display: inline-block;
  color: #d5d8e9;
  line-height: 60px;
  text-decoration: none;
  padding: 0 15px;
}

.navi-inner .navi-item:hover {
  background-color: #4e57a1;
}

.navi-inner .navi-item:hover a {
  color: #fff;
}

.navi-inner .navi-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #ddbb34;
  opacity: 0;
}

.navi-inner .navi-item.active::after {
  opacity: 1;
}

.navi-inner .navi-item.active {
  background-color: #4e57a1;
}

.navi-inner .navi-item.active a {
  font-weight: bold;
  color: #fff;
}

.navi-inner .el-input {
  width: 90px;
  height: 40px;
  float: left;
  position: relative;
  top: 10px;
  left: 20px;
}

.navi-inner .el-select {
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  float: left;
  position: relative;
  bottom: 10px;
  right: 15px;
}

.navi-inner .el-input-group>.el-input__inner {
  width: 416px;
  height: 40px;
  float: left;
  position: relative;
  background-color: #2f3a91;
}

.navi-inner .photo {
  display: inline-block;
  float: right;
  position: relative;
  height: 60px;
  width: 60px;
}

.navi-inner .photo .el-avatar {
  position: relative;
  top: 12.5px;
}
</style>
