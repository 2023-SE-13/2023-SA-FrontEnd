<template lang="html">
  <div class="navi">
    <div class="navi-inner">
      <img class="logo" alt="logo" src="../assets/logo.png" @click="gotoMain">
      <div class="navi-item" v-for="(naviUnit, index) in naviUnits" :key="index" @click="changeActive(index)"
           :class="{ active: activeIndex === index }">
        <router-link :to="naviUnit.link_to">{{ naviUnit.content }}</router-link>
      </div>
      <div class="navi-search" v-show="this.$route.path !== '/main'">
        <el-select v-model="select" :popper-append-to-body="false" slot="prepend" class="navi-select">
          <el-option label="标题" value="1" @click="select='标题'"></el-option>
          <el-option label="关键词" value="2" @click="select='关键词'"></el-option>
          <el-option label="作者" value="3" @click="select='作者'"></el-option>
        </el-select>
        <el-input placeholder="搜索你感兴趣的内容" v-model="input1" class="navi-input" @input="allow" @keyup.enter.native="search">
          <el-button slot="suffix" icon="el-icon-search" @click="search" ref="button"></el-button>
        </el-input>
        
      </div>
      <div class="photo">
        <el-dropdown placement="bottom" @command="handleCommand">
          <el-avatar :size="35" src="../assets/cover.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">主页</el-dropdown-item>
            <el-dropdown-item command="b">收藏</el-dropdown-item>
            <el-dropdown-item command="c">推荐</el-dropdown-item>
            <el-dropdown-item divided command="d">设置</el-dropdown-item>
            <el-dropdown-item command="e">退出</el-dropdown-item>
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
      if(this.$route.path!=="/main"){
        this.$router.push("/main")
      }
    },
    handleCommand(command) {
      if (command === 'a') {
        this.$router.push("/personHomepage")
      }
    },
    search() {
      alert(this.input1)
    },
    allow() {
      if (this.input1 !== null && this.input1 !== '') {
        this.$refs.button.$el.style.cursor = 'pointer'
      } else {
        this.$refs.button.$el.style.cursor = 'not-allowed'
      }
    }
  },
  mounted() {
    if (this.input1 === null || this.input1 === '') {
      this.$refs.button.$el.style.cursor = 'not-allowed'
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

.navi-search {
  width: 496px;
  float: left;
  position: relative;
  top: 10px;
  left: 30px;
  border-radius: 20px 0 0 20px;
}

.navi-search .el-select {
  float: left;
  width: 80px;
  height: 40px;
}

.navi-search .el-select .el-input__inner {
  background-color: #ffffff33;
  color: #ffffffcc;
  border-radius: 20px 0 0 20px;
  border: 1px solid transparent;
  padding: 10px 10px 10px 15px;
  font-size: 12px;
}

.navi-search .el-select:hover .el-input__inner{
  border: 1px solid transparent;
}

.navi-search .el-select .el-input__inner:focus{
  color: #2f3a91;
  background-color: #ffffff;
  border: 1px solid transparent;
}

.navi-search .el-select .el-input.is-focus .el-input__inner {
  border: 1px solid transparent;
}

.navi-search .navi-input {
  float: left;
  width: 416px;
}

.navi-search .navi-input>.el-input__inner {
  float: left;
  width: 416px;
  color: #ffffffcc;
  background-color: #ffffff33;
  font-size: 12px;
  border-radius: 0 20px 20px 0;
  border: 1px solid transparent;
}

.navi-search .navi-input>.el-input__inner:focus{
  color: #2f3a91;
  background-color: #ffffff;
}

.navi-search .navi-input .el-button {
  height: 40px;
  position: relative;
  left: 5px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0 20px 20px 0;
  color: #bbbbbb;
}

.navi-search .navi-input .el-button:hover {
  color: #2f3a91;
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
