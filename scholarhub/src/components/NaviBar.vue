<template lang="html">
  <div class="navi">
    <div class="navi-item" v-for="(naviUnit, index) in naviUnits" :key="index" @click="changeActive(index)"
      :class="{ active: activeIndex === index }">
      <router-link :to="naviUnit.link_to">{{ naviUnit.content }}</router-link>
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
  data() {
    return {
      activeIndex: null,
      naviUnits: [
        { content: "首页", link_to: "/main" },
        { content: "资源介绍", link_to: "/introduce" },
        { content: "学术交流", link_to: "/temp1" },
        { content: "网站声明", link_to: "/temp1" },
        { content: "关于我们", link_to: "/about" }
      ]
    }
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index
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
  /* border: 1px solid #ccc; */
  /* padding: 3px; */
  background-color: #2f3a91;
  height: 60px;
}

.navi-item {
  display: inline-block;
  /* margin-left: 20px; */
  /* border: 1px solid #ccc; */
  position: relative;
  /* padding-bottom: 2px; */
}

.navi .navi-item a {
  display: inline-block;
  color: #d5d8e9;
  line-height: 60px;
  text-decoration: none;
  padding: 0 15px;
}

.navi .navi-item:hover {
  background-color: #4e57a1;
}

.navi .navi-item:hover a {
  color: #fff;
}

.navi .navi-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #ddbb34;
  opacity: 0;
}

.navi .navi-item.active::after {
  opacity: 1;
}

.navi .navi-item.active {
  background-color: #4e57a1;
}

.navi .navi-item.active a {
  font-weight: bold;
  color: #fff;
}
</style>
