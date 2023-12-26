<template>
  <div>
    <div class="navi">
      <NaviBar/>
    </div>
    <div class="phpContainer">
      <div class="Info">
        <el-upload
            class="avatar_upload"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadPic">
          <img class="image-container" id="Photo" :src=this.imageUrl alt="头像" width="170px" height="170px">
          <div class="image-black-cover"><i class="el-icon-plus"></i></div>
        </el-upload>
        <div class="PersonalInfo">
          <p style="font-size: 20px;color: black;font-weight: bold">
            {{ name }}
            <span>
            <i class="el-icon-edit" @click="modify" v-show="isSelf">详细资料</i>
            <el-dialog class="info_dialog" :visible.sync="infoDialog" :append-to-body="true">
              <el-descriptions :column="1" :label-style="{'font-size': '20px'}">
                <span v-if="infoDialogTitle" slot="title" style="font-size: 25px">
                  <i class="el-icon-postcard"></i>
                  资料
                </span>
                <span v-else slot="title" style="font-size: 25px">
                  <i class="el-icon-edit-outline"></i>
                  编辑资料
                </span>
                <template v-if="infoDialogTitle" slot="extra">
                  <el-button type="primary" size="small" @click="modify_info">编辑</el-button>
                </template>
                <template v-else slot="extra">
                  <el-button type="primary" size="small" @click="modify_confirm()">确认</el-button>
                  <el-button type="danger" size="small" @click="modify_cancel">取消</el-button>
                  <el-button type="warning" size="small" @click="modify_clear">清空</el-button>
                </template>
                <el-descriptions-item label="用户名">
                  <el-input v-model="username" placeholder="请输入用户名" :disabled="inputDisabled"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="真实姓名">
                  <el-input v-model="name" placeholder="请输入真实姓名" :disabled="inputDisabled"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="机构">
                  <el-input v-model="institution" placeholder="请输入机构" :disabled="inputDisabled"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  <el-input v-model="email" placeholder="请输入邮箱" :disabled="inputDisabled"></el-input>
                </el-descriptions-item>
              </el-descriptions>
            </el-dialog>
            <el-button class="el-button-interest" @click="turn" v-show="!is_applied">
              <i class="el-icon-plus">认领</i>
            </el-button>
              <el-dialog title="认领" :visible.sync="this.dialogVisible" :append-to-body="true" width="30%">
                <!--需要输入真实姓名，描述内容，照片-->
                <el-form :model="form" ref="form" label-width="80px">
                  <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="描述内容" prop="description">
                    <el-input v-model="form.description"></el-input>
                    </el-form-item>
                  <el-form-item label="照片" prop="photo">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :http-request="uploadPic2">
                      <img class="avatar" :src="form.photo" alt="">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="interest">确 定</el-button>
              </el-dialog>
            <el-button class="el-button-interested" v-show="is_applied" @click="cancel_interest"
                       @mouseover.native="cancel_display" @mouseleave.native="cancel_hide">
              <i class="el-icon-finished">已认领</i>
            </el-button>
          </span>
          </p>
          <p style="font-size: 16px;color: #8590a6;">机构：{{ institution }}</p>
        </div>
      </div>
      <div class="MidNav">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 background-color="#d7ecff"
                 text-color="#121212" active-text-color="#2f3a91">
          <el-menu-item index="1">我的成果</el-menu-item>
        </el-menu>
      </div>
      <div class="Bottom">
        <div class="BottomContent1" v-show="MidNavIdx === '1'">
          <el-menu default-active="1" class="el-menu1-demo" mode="horizontal" @select="handleSelect1">
            <el-menu-item index="1">论文</el-menu-item>
            <el-menu-item id="item2" index="2">专利</el-menu-item>
          </el-menu>
          <div v-show="Menu1Idx === '1'">
<!--            <el-input class="keywordSearch" placeholder="关键词检索" v-model="keywordsInput"-->
<!--                      @keyup.enter.native="search">-->
<!--              <el-button slot="suffix" icon="el-icon-search" @click="search"></el-button>-->
<!--            </el-input>-->
<!--            <el-switch class="mp_switch" v-model="isMasterpieceOnly" active-text="仅看代表作" active-color="#2f3a91"-->
<!--                       inactive-color="#646464"></el-switch>-->
<!--            <el-dropdown class="dropdown">-->
<!--              <el-button>-->
<!--                更多菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--              </el-button>-->
<!--              <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item>黄金糕</el-dropdown-item>-->
<!--                <el-dropdown-item>狮子头</el-dropdown-item>-->
<!--                <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
<!--                <el-dropdown-item>双皮奶</el-dropdown-item>-->
<!--                <el-dropdown-item>蚵仔煎</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </el-dropdown>-->
            <el-empty class="empty"
                      image="https://p3-bcy-sign.bcyimg.com/banciyuan/98758c3b7b734765a1d72d8adce82a65~tplv-banciyuan-w650.image?x-expires=1704558020&x-signature=pKwEtXe1SEZI7S9mE2pfRusp%2BRU%3D"
                      description="空空如也~"></el-empty>
          </div>
          <div v-show="Menu1Idx === '2'">
<!--            <el-input class="keywordSearch" placeholder="关键词检索" v-model="keywordsInput"-->
<!--                      @keyup.enter.native="search">-->
<!--              <el-button slot="suffix" icon="el-icon-search" @click="search"></el-button>-->
<!--            </el-input>-->
            <el-empty class="empty"
                      image="https://p3-bcy-sign.bcyimg.com/banciyuan/98758c3b7b734765a1d72d8adce82a65~tplv-banciyuan-w650.image?x-expires=1704558020&x-signature=pKwEtXe1SEZI7S9mE2pfRusp%2BRU%3D"
                      description="空空如也~"></el-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from "@/components/NaviBar.vue";
import index from "vuex";
import {getInformation} from "@/api/api";
import {ShowAuthorMessage} from "@/api/api";
import {ShowPaperMessage} from "@/api/api";
import {HandleAuthorMessage} from "@/api/api";
import {HandlePaperMessage} from "@/api/api";
import {UploadAvatar} from "@/api/api";
import {GetAuthor} from "@/api/api";
import {ApplyAuthor} from "@/api/api";

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
    this.token = localStorage.getItem("token")
    if (this.token === null) {
      this.$router.push("/login")
    }
    this.imageUrl = "http://116.63.49.180/avatar/default_avatar.png"
    this.form.author_id = decodeURIComponent(atob(this.$route.params.id))
    GetAuthor(decodeURIComponent(atob(this.$route.params.id))).then(res => {
      this.name = res.data._source.display_name
      if (res.data._source.last_known_institution === null) {
        this.institution = "未知"
      } else {
        this.institution = res.data._source.last_known_institution.display_name
      }
      this.is_applied = res.data.is_applied
    })
  },
  data() {
    return {
      form: {
        author_id:'',
        name: '',
        description: '',
        photo: '',
      },
      file: null,
      is_applied: false,
      token: null,
      is_black: false,
      username: "username",
      name: "name",
      institution: "institution",
      email: "email",
      imageUrl: '',
      MidNavIdx: '1',
      Menu1Idx: '1',
      Menu4Idx: '1',
      keywordsInput: "",
      isMasterpieceOnly: false,
      isManager: true,
      isSelf: false,
      isInterested: false,
      isCancel: false,
      begin1: 0,
      end1: 10,
      begin2: 0,
      end2: 10,
      scholar_certification: [
        {
          id: '',
          author_id: '',
          username: '',
          send_user_id: '',
          datetime: '',
        }
      ],
      work_certification: [
        {
          id: '',
          work_id: '',
          send_user: '',
          send_user_id: '',
          author_id: '',
          datetime: '',
        }
      ],
      infoDialog: false,
      infoDialogTitle: true,
      dialogVisible: false,
      inputDisabled: true,
    };
  },
  methods: {
    turn(){
      this.dialogVisible = true;
    },
    modify() {
      // this.$router.push("/authentication");
      this.infoDialog = true;
    },
    modify_info() {
      this.infoDialogTitle = false;
      this.inputDisabled = false;
    },
    modify_confirm() {
      this.infoDialogTitle = true;
      this.inputDisabled = true;
    },
    modify_cancel() {
      this.infoDialogTitle = true;
      this.inputDisabled = true;
    },
    modify_clear() {
      this.username = '';
      this.name = '';
      this.institution = '';
      this.email = '';
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
      this.dialogVisible = false
      this.form.photo = this.file
      const formData = new FormData();
      formData.append('author_id', this.form.author_id);
      formData.append('name', this.form.name);
      formData.append('content', this.form.description);
      formData.append('photo', this.form.photo);
      ApplyAuthor(formData, this.token).then(res=>{
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '申请成功',
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: '申请失败',
            type: 'warning'
          });
        }
      })
    },
    cancel_display() {
      this.isCancel = true;
    },
    cancel_hide() {
      this.isCancel = false;
    },
    cancel_interest() {
      this.isInterested = false;
    },
    accept(num) {
      console.log(num);
      const formData = new FormData();
      formData.append('result', '1');
      formData.append('message_id', this.scholar_certification[num].id);
      HandleAuthorMessage(formData, this.token).then(res => {
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '已同意',
            type: 'success'
          });
          this.scholar_certification.splice(num, 1)
        } else {
          this.$notify({
            title: '警告',
            message: '操作失败',
            type: 'warning'
          });
        }
      })
    },
    refuse(num) {
      console.log(num);
      const formData = new FormData();
      formData.append('result', '0');
      formData.append('message_id', this.scholar_certification[num].id);
      HandleAuthorMessage(formData, this.token).then(res => {
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '已拒绝',
            type: 'success'
          });
          this.scholar_certification.splice(num, 1)
        } else {
          this.$notify({
            title: '警告',
            message: '操作失败',
            type: 'warning'
          });
        }
      })
    },
    accept2(num) {
      console.log(num);
      const formData = new FormData();
      formData.append('result', '1');
      formData.append('message_id', this.work_certification[num].id);
      HandlePaperMessage(formData, this.token).then(res => {
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '已同意',
            type: 'success'
          });
          this.work_certification.splice(num, 1)
        } else {
          this.$notify({
            title: '警告',
            message: '操作失败',
            type: 'warning'
          });
        }
      })
    },
    refuse2(num) {
      console.log(num);
      const formData = new FormData();
      formData.append('result', '0');
      formData.append('message_id', this.work_certification[num].id);
      HandlePaperMessage(formData, this.token).then(res => {
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '已拒绝',
            type: 'success'
          });
          this.work_certification.splice(num, 1)
        } else {
          this.$notify({
            title: '警告',
            message: '操作失败',
            type: 'warning'
          });
        }
      })
    },
    prev() {
      if (this.begin1 >= 10) {
        this.begin1 -= 10;
        this.end1 -= 10;
      } else {
        this.begin1 = 0;
        this.end1 = 10;
      }
    },
    next() {
      this.begin1 += 10;
      this.end1 += 10;
    },
    pageChange(val) {
      console.log(val)
      this.begin1 = (val - 1) * 10;
      this.end1 = val * 10;
    },
    prev2() {
      if (this.begin2 >= 10) {
        this.begin2 -= 10;
        this.end2 -= 10;
      } else {
        this.begin2 = 0;
        this.end2 = 10;
      }
    },
    next2() {
      this.begin2 += 10;
      this.end2 += 10;
    },
    pageChange2(val) {
      console.log(val)
      this.begin2 = (val - 1) * 10;
      this.end2 = val * 10;
    },
    uploadPic(file) {
      const formData = new FormData();
      formData.append('avatar', file.file);
      console.log(file.file)
      UploadAvatar(formData, this.token).then(res => {
        if (res.data.result === 0) {
          this.$notify({
            title: '成功',
            message: '上传成功',
            type: 'success'
          });
          this.$router.go(0)
        } else {
          this.$notify({
            title: '警告',
            message: '上传失败',
            type: 'warning'
          });
        }
      })
    },
    uploadPic2(file) {
      this.file = file.file;
    },
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
  top: 9%;
  left: 10%;
  border-radius: 4px;
  margin-right: 2%;
}

.Info .avatar_upload .image-container {
  position: relative;
}

.Info .avatar_upload .image-black-cover {
  width: 170px;
  height: 170px;
  border-radius: 5px;
  background-color: #121212;
  display: block;
  position: absolute;
  opacity: 0;
  top: 0;
}

.Info .avatar_upload .image-black-cover:hover {
  animation: move 0.6s forwards;
}

@keyframes move {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.Info .avatar_upload .image-black-cover .el-icon-plus {
  font-size: 30px;
  position: relative;
  color: white;
  top: 70px;
}

.Info .PersonalInfo {
  height: 65%;
  float: left;
  position: relative;
  top: 15%;
  left: 11%;
  text-align: left;
  line-height: 250%;
}

/deep/ .Info .PersonalInfo .info_dialog .el_dialog__body {
  background-color: #00b1fd;
}

.Info .PersonalInfo .el-icon-edit {
  margin: 0 0 0 12px;
  font-size: 14px;
  color: #8590a6
}

.Info .PersonalInfo .el-icon-edit:hover {
  color: black;
}

.Info .PersonalInfo .el-button-interest {
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

.Info .PersonalInfo .el-icon-plus {
  position: relative;
  right: 8px;
  bottom: 4px;
}

.Info .PersonalInfo .el-button-interest:hover {
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.7);
}

.Info .PersonalInfo .el-button-interested {
  margin: 0 0 0 12px;
  position: relative;
  top: 3px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  color: white;
  background: rgba(0, 0, 0, .45);
  box-shadow: 0 0 0 2px hsla(0, 0%, 100%, .3);
  border-radius: 4px;
}

.Info .PersonalInfo .el-icon-finished {
  position: relative;
  right: 15px;
  bottom: 4px;
}

.Info .PersonalInfo .el-icon-cancel {
  position: relative;
  right: 12.5px;
  bottom: 4px;
}

.Info .PersonalInfo .el-button-interested:hover {
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

.BottomContent4 .left4 .el-menu4-demo {
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

.BottomContent4 .right4_2 {
  width: 78%;
  height: 100%;
  float: left;
}

.BottomContent4 .right4_2 .detail-button {
  width: 80px;
  font-size: 14px;
  background: #e5f0fa;
  opacity: 0.8;
  padding: 12px;
}

.BottomContent4 .right4_2 .detail-button:hover {
  background: #e5f0fa;
  opacity: 1;
}

.BottomContent4 .right4_3 {
  width: 78%;
  height: 100%;
  float: left;
}

.BottomContent4 .right4_3 .detail-button {
  width: 80px;
  font-size: 14px;
  background: #e5f0fa;
  opacity: 0.8;
  padding: 12px;
}

.BottomContent4 .right4_3 .detail-button:hover {
  background: #e5f0fa;
  opacity: 1;
}
</style>
