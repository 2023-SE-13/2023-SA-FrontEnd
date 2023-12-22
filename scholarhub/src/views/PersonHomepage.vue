<template>
  <div>
    <div class="navi">
      <NaviBar />
    </div>
    <div class="phpContainer">
      <div class="Info">
        <el-upload
            class="avatar_upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="!imageUrl" id="Photo" src="../assets/photo.png" alt="头像" width="100%" height="100%">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div id="PersonalInfo">
          <p style="font-size: 20px;color: black;font-weight: bold">
            用户名：{{ username }}
            <span>
            <i class="el-icon-edit" @click="modify" v-show="isSelf">详细资料</i>
            <el-dialog>

            </el-dialog>
            <el-button class="el-button-interest" v-show="!isSelf && !isInterested" @click="interest">
              <i class="el-icon-plus">关注</i>
            </el-button>
            <el-button class="el-button-interested" v-show="!isSelf && isInterested" @click="cancel_interest" @mouseover.native="cancel_display" @mouseleave.native="cancel_hide">
              <i class="el-icon-finished" v-if="!isCancel">已关注</i>
              <span class="el-icon-cancel" v-if="isCancel">取消关注</span>
            </el-button>
          </span>
          </p>
          <p style="font-size: 16px;color: #8590a6;">机构：{{ institution }}</p>
        </div>
      </div>
      <div class="MidNav">
        <el-menu default-active="4" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#d7ecff"
                 text-color="#121212" active-text-color="#2f3a91">
          <el-menu-item index="1">我的成果</el-menu-item>
          <el-menu-item index="2">我的文库</el-menu-item>
          <el-menu-item index="3">我的收藏</el-menu-item>
          <el-menu-item v-show="isManager" index="4">待办审核</el-menu-item>
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
              <el-button slot="suffix" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-switch class="mp_switch" v-model="isMasterpieceOnly" active-text="仅看代表作" active-color="#2f3a91"
                       inactive-color="#646464"></el-switch>
            <el-dropdown class="dropdown">
              <el-button>
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-empty class="empty" image="https://p3-bcy-sign.bcyimg.com/banciyuan/98758c3b7b734765a1d72d8adce82a65~tplv-banciyuan-w650.image?x-expires=1704558020&x-signature=pKwEtXe1SEZI7S9mE2pfRusp%2BRU%3D" description="空空如也~"></el-empty>
          </div>
          <div v-show="Menu1Idx === '2'">
            <el-input class="keywordSearch" placeholder="关键词检索" v-model="keywordsInput" @keyup.enter.native="search">
              <el-button slot="suffix" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-empty class="empty" image="https://p3-bcy-sign.bcyimg.com/banciyuan/98758c3b7b734765a1d72d8adce82a65~tplv-banciyuan-w650.image?x-expires=1704558020&x-signature=pKwEtXe1SEZI7S9mE2pfRusp%2BRU%3D" description="空空如也~"></el-empty>
          </div>
        </div>
        <div class="BottomContent2" v-show="MidNavIdx === '2'">

        </div>
        <div class="BottomContent3" v-show="MidNavIdx === '3'">

        </div>
        <div class="BottomContent4" v-show="MidNavIdx === '4'">
          <div class="left4">
            <el-menu class="el-menu4-demo" mode="vertical" default-active="1" @select="handleSelect4">
              <el-menu-item index="1">待认证学者</el-menu-item>
              <el-menu-item index="2">待认领成果</el-menu-item>
              <el-menu-item index="3">待处理申诉</el-menu-item>
            </el-menu>
          </div>
          <div class="right4_1" v-show="Menu4Idx === '1'">
            <el-table :data="scholar_certification">
              <el-table-column prop="date" label="申请时间" width="240">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}{{ scope.row.$index }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="申请用户" width="240">
                <template slot-scope="scope">
                  <el-popover placement="top" trigger="hover">
                    <el-descriptions title="用户信息" :column="3" border>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-user"></i>
                          <span style="margin-left: 3px">用户名</span>
                        </template>
                        {{ scope.row.name }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-message"></i>
                          <span style="margin-left: 3px">邮箱</span>
                        </template>
                        1060592547@qq.com
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-postcard">居住地</i>
                        </template>
                        苏州市
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-tickets">备注</i>
                        </template>
                        <el-tag size="small">学校</el-tag>
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-office-building"></i>
                          <span style="margin-left: 3px">机构</span>
                        </template>
                        江苏省苏州市吴中区吴中大道 1188 号
                      </el-descriptions-item>
                    </el-descriptions>
                    <div slot="reference">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="detail" label="详情" width="240">
                <template slot-scope="scope">
                  <el-button class="detail-button" @click="dialogVisible = true">点击查看</el-button>
                  <el-dialog title="认证学者申请" :visible.sync="dialogVisible" :append-to-body="true">
                    <el-descriptions :column="1" border>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-user"></i>
                          用户名
                        </template>
                        {{ scope.row.name }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-mobile-phone"></i>
                          真实姓名
                        </template>
                        杨硕
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-location-outline"></i>
                          描述
                        </template>
                        xxxxxxxxxxxxxxxxx
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-tickets"></i>
                          备注
                        </template>
                        <el-tag size="small">学校</el-tag>
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-dialog>
                </template>
              </el-table-column>
              <el-table-column prop="operator" label="处理操作">
                <el-button>同意</el-button>
                <el-button>拒绝</el-button>
              </el-table-column>
            </el-table>
          </div>
          <div class="right4_2" v-show="Menu4Idx === '2'"></div>
          <div class="right4_3" v-show="Menu4Idx === '3'"></div>
        </div>
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
    this.username = "younsur" + this.$route.params.id.toString();
    this.institution = "清华大学";
  },
  data() {
    return {
      username: "username",
      institution: "institution",
      imageUrl: '',
      MidNavIdx: '4',
      Menu1Idx: '1',
      Menu4Idx: '1',
      keywordsInput: "",
      isMasterpieceOnly: false,
      isManager: true,
      isSelf: true,
      isInterested: false,
      isCancel: false,
      scholar_certification: [
        {
          date: '2023-12-22',
          name: 'young'
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    modify() {
      this.$router.push("/authentication");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.MidNavIdx = key;
    },
    handleSelect1(key, keyPath) {
      console.log(key, keyPath);
      this.Menu1Idx = key;
    },
    handleSelect4(key, keyPath) {
      console.log(key, keyPath);
      this.Menu4Idx = key;
    },
    search() {
      alert(this.keywordsInput)
    },
    interest() {
      this.isInterested = true;
    },
    cancel_display() {
      this.isCancel = true;
    },
    cancel_hide() {
      this.isCancel = false;
    },
    cancel_interest() {
      this.isInterested = false;
    }
  }
}
</script>

<style scoped>
.navi {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.phpContainer {
  position: relative;
  width: 100%;
  overflow-y: auto;
}

.Info {
  width: 100%;
  height: 28vh;
  background: #e5f0fa;
}

.Info .avatar_upload {
  width: 10%;
  height: 65%;
  float: left;
  position: relative;
  top: 16%;
  left: 10%;
}

.Info #PersonalInfo {
  height: 65%;
  float: left;
  position: relative;
  top: 18%;
  left: 11%;
  text-align: left;
  line-height: 250%;
}

.Info #PersonalInfo .el-icon-edit {
  margin: 0 0 0 12px;
  font-size: 14px;
  color: #8590a6
}

.Info #PersonalInfo .el-icon-edit:hover {
  color: black;
}

.Info #PersonalInfo .el-button-interest {
  margin: 0 0 0 12px;
  position: relative;
  top: 3px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  color: #8590a6;
  background-color: transparent;
  border: 1px solid #8590a6;
  border-radius: 4px;
}

.Info #PersonalInfo .el-icon-plus {
  position: relative;
  right: 8px;
  bottom: 4px;
}

.Info #PersonalInfo .el-button-interest:hover {
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.7);
}

.Info #PersonalInfo .el-button-interested {
  margin: 0 0 0 12px;
  position: relative;
  top: 3px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  color: white;
  background: rgba(0,0,0,.45);
  box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
  border-radius: 4px;
}

.Info #PersonalInfo .el-icon-finished {
  position: relative;
  right: 15px;
  bottom: 4px;
}

.Info #PersonalInfo .el-icon-cancel {
  position: relative;
  right: 12.5px;
  bottom: 4px;
}

.Info #PersonalInfo .el-button-interested:hover {
  border: none;
  box-shadow: 0 0 0 2px #8590a6;
}

.MidNav {
  width: 100%;
}

.MidNav .el-menu-demo {
  padding-left: 10%;
}

.MidNav .el-menu-demo .el-menu-item {
  font-size: 16px;
  font-weight: 600;
  font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  width: 10.3%;
  align-items: center;
  padding: 0 32px 0 32px;
}

.Bottom {
  width: 100%;
  height: 85vh;
  background-color: #f6f6f6;
}

.BottomContent1 {
  margin: 0 7.5%;
  padding: 1% 1% 0;
  width: 82.6%;
  height: 98%;
  background-color: white;
}

.BottomContent1 .el-menu1-demo {
  height: 8%;
  border-bottom: 1px solid #2f3a91;
  margin-bottom: 2%;
}

.BottomContent1 .el-menu1-demo .el-menu-item {
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  width: 9%;
  height: 100%;
  line-height: 360%;
  border: 1px solid #dcdfe6;
  border-right: none;
  border-bottom: none;
}

.BottomContent1 .el-menu1-demo #item2 {
  border: 1px solid #dcdfe6;
  border-bottom: none;
}

.BottomContent1 .el-menu1-demo .el-menu-item:hover {
  background-color: #2f3a91;
  color: white;
}

.BottomContent1 .el-menu1-demo .el-menu-item.is-active {
  background-color: #2f3a91;
  color: white;
}

.BottomContent1 .keywordSearch {
  width: 25%;
  height: 34px;
  float: left;
}

::v-deep.BottomContent1 .keywordSearch .el-input__inner {
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background-color: #f4f4f4;
}

::v-deep.BottomContent1 .keywordSearch .el-button {
  height: 100%;
  position: relative;
  left: 6%;
  background-color: transparent;
  border: none;
  border-radius: 0 20px 20px 0;
  color: #121212;
  display: inline-block;
}

::v-deep.BottomContent1 .keywordSearch .el-button:hover {
  color: #2f3a91;
}

.BottomContent1 .mp_switch {
  float: left;
  position: relative;
  left: 1%;
  top: 7px;
}

::v-deep.BottomContent1 .mp_switch .el-switch__label {
  color: #646464;
}

::v-deep.BottomContent1 .mp_switch .el-switch__label.is-active {
  color: #2f3a91;
}

.BottomContent1 .dropdown {
  width: 100px;
  float: left;
  position: relative;
  left: 2%;
}

::v-deep.BottomContent1 .dropdown .el-button {
  padding: 10px 0 10px 0;
  width: 90%;
  color: #2f3a91;
  font-size: 12px;
  font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serify;
  text-align: center;
  background-color: #eaebf4;
}

::v-deep.BottomContent1 .el-empty {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
}

::v-deep.BottomContent1 .el-empty .el-empty__description p {
  margin: 0;
  font-size: 14px;
  color: #8590a6;
}

.BottomContent4 {
  margin: 0 7.5%;
  padding: 1% 1% 0;
  width: 82.6%;
  height: 98%;
  background-color: white;
}

.BottomContent4 .left4 {
  width: 20%;
  height: 100%;
  float: left;
  margin-right: 2%;
}

.BottomContent4 .left4 .el-menu4-demo{
  border: 1px solid #ebebeb;
  border-top: 5px solid #828ad8;
  padding-top: 20px;
  height: 80%;
}

.BottomContent4 .left4 .el-menu4-demo .el-menu-item {
  height: 60px;
  font-family: pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #121212;
}

.BottomContent4 .left4 .el-menu4-demo .el-menu-item:hover {
  background-color: #e5f0fa;
}

.BottomContent4 .left4 .el-menu4-demo .el-menu-item.is-active {
  background-color: #e5f0fa;
}

.BottomContent4 .right4_1 {
  width: 78%;
  height: 100%;
  float: left;
}

.BottomContent4 .right4_1 .detail-button {
  width: 80px;
  font-size: 14px;
  background: #e5f0fa;
  opacity: 0.8;
  padding: 12px;
}

.BottomContent4 .right4_1 .detail-button:hover {
  background: #e5f0fa;
  opacity: 1;
}
</style>
