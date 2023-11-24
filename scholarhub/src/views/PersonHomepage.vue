<template>
  <div>
    <NaviBar/>
    <div class="Info">
      <img id="Photo" src="../assets/photo.png" alt="头像" width="10%" height="65%">
      <div id="PersonalInfo">
        <p style="font-size: 20px;color: white;">
          用户名：{{username}}
          <span>
           <i class="el-icon-edit">编辑姓名和机构</i>
          </span>
        </p>
        <p style="font-size: 16px;color: #8590a6;">机构：{{institution}}</p>
      </div>
    </div>
    <div class="MidNav">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#e5f0fa"
      text-color="#121212" active-text-color="#2f3a91">
        <el-menu-item index="1">我的成果</el-menu-item>
        <el-menu-item index="2">我的文库</el-menu-item>
        <el-menu-item index="3">我的收藏</el-menu-item>
        <el-menu-item index="4">我的评论</el-menu-item>
        <el-menu-item index="5">我的推荐</el-menu-item>
      </el-menu>
    </div>
    <div class="Bottom">
      <div class="BottomContent1" v-show="MidNavIdx === '1'">
        <el-menu default-active="1" class="el-menu1-demo" mode="horizontal" @select="handleSelect1">
          <el-menu-item index="1">论文</el-menu-item>
          <el-menu-item id="item2" index="2">专利</el-menu-item>
        </el-menu>
        <div v-show="Menu1Idx === '1'">
          <el-input class="keywordSearch" placeholder="关键词检索" v-model="keywordsInput" @keyup.enter.native="search">
            <el-button slot="suffix" icon="el-icon-search" @click="search" ></el-button>
          </el-input>
          <el-switch class="mp_switch" v-model="isMasterpieceOnly" active-text="仅看代表作" active-color="#2f3a91" inactive-color="#646464"></el-switch>
        </div>
        <div v-show="Menu1Idx === '2'">

        </div>
      </div>
      <div class="BottomContent2" v-show="MidNavIdx === '2'">

      </div>
      <div class="BottomContent3" v-show="MidNavIdx === '3'">

      </div>
      <div class="BottomContent4" v-show="MidNavIdx === '4'">

      </div>
      <div class="BottomContent5" v-show="MidNavIdx === '5'">

      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from "@/components/NaviBar.vue";
import index from "vuex";

export default {
  name: "PersonHomepage",
  computed: {
    index() {
      return index
    }
  },
  components: {
    NaviBar,
  },
  mounted() {
    this.username = "younsur";
    this.institution = "清华大学";
  },
  data() {
    return {
      username: "username",
      institution: "institution",
      MidNavIdx: '1',
      Menu1Idx: '1',
      keywordsInput: "",
      isMasterpieceOnly: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.MidNavIdx = key;
    },
    handleSelect1(key, keyPath) {
      console.log(key, keyPath);
      this.Menu1Idx = key;
    },
    search() {
      alert(this.keywordsInput)
    }
  }
}
</script>

<style scoped>
.Info{
  width: 100%;
  height: 28vh;
  background-color: darkblue;
}

.Info #Photo{
  float: left;
  position: relative;
  top: 16%;
  left: 10%;
}

.Info #PersonalInfo{
  height: 65%;
  float: left;
  position: relative;
  top: 18%;
  left: 11%;
  text-align: left;
  line-height: 250%;
}

.Info #PersonalInfo .el-icon-edit{
  margin: 0 0 0 12px;
  font-size: 14px;
  color: #8590a6
}

.Info #PersonalInfo .el-icon-edit:hover{
  color: white;
}

.MidNav{
  width: 100%;
}

.MidNav .el-menu-demo{
  padding-left: 10%;
}

.MidNav .el-menu-demo .el-menu-item{
  font-size: 16px;
  font-weight: 600;
  font-family: pingfang SC,helvetica neue,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
  width: 10.3%;
  align-items: center;
  padding: 0 32px 0 32px;
}

.Bottom{
  width: 100%;
  height: 55vh;
  background-color: #f6f6f6;
}

.BottomContent1{
  margin: 0 7.5%;
  padding: 1%;
  width: 82.6%;
  height: 92%;
  background-color: white;
}

.BottomContent1 .el-menu1-demo{
  height: 11%;
  border-bottom: 1px solid #2f3a91;
  margin-bottom: 2%;
}

.BottomContent1 .el-menu1-demo .el-menu-item{
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-family: pingfang SC,helvetica neue,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
  width: 9%;
  height: 100%;
  line-height: 320%;
  border: 1px solid #dcdfe6;
  border-right: none;
  border-bottom: none;
}

.BottomContent1 .el-menu1-demo #item2{
  border: 1px solid #dcdfe6;
  border-bottom: none;
}

.BottomContent1 .el-menu1-demo .el-menu-item:hover{
  background-color: #2f3a91;
  color: white;
}

.BottomContent1 .el-menu1-demo .el-menu-item.is-active{
  background-color: #2f3a91;
  color: white;
}

.BottomContent1 .keywordSearch{
  width: 25%;
  height: 34px;
  float: left;
}

::v-deep.BottomContent1 .keywordSearch .el-input__inner{
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background-color: #f4f4f4;
}

::v-deep.BottomContent1 .keywordSearch .el-button{
  height: 100%;
  position: relative;
  left: 6%;
  background-color: transparent;
  border: none;
  border-radius: 0 20px 20px 0;
  color: #121212;
  display: inline-block;
}

::v-deep.BottomContent1 .keywordSearch .el-button:hover{
  color: #2f3a91;
}

.BottomContent1 .mp_switch{
  float: left;
  position: relative;
  left: 1%;
  top: 7px;
}

::v-deep.BottomContent1 .mp_switch .el-switch__label{
  color: #646464;
}

::v-deep.BottomContent1 .mp_switch .el-switch__label.is-active{
  color: #2f3a91;
}
</style>
