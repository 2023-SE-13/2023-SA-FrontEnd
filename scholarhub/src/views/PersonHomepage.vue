<template>
  <div>
    <div class="navi">
      <NaviBar />
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
          <img class="image-container" id="Photo" :src=this.imageUrl alt="头像"  width="170px" height="170px">
          <div class="image-black-cover"><i class="el-icon-plus"></i></div>
        </el-upload>
        <div class="PersonalInfo">
          <p style="font-size: 20px;color: black;font-weight: bold">
            用户名：{{ username }}
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
                  <el-input v-model="username" placeholder="请输用户名" :disabled="inputDisabled"></el-input>
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
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#d7ecff"
                 text-color="#121212" active-text-color="#2f3a91">
          <el-menu-item index="1">我的成果</el-menu-item>
          <el-menu-item index="2">我的收藏</el-menu-item>
          <el-menu-item index="3">浏览记录</el-menu-item>
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
                作者筛选<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>第一作者</el-dropdown-item>
                <el-dropdown-item>第二作者</el-dropdown-item>
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
          <el-table :data="collect_data.slice(begin3, end3)" style="width: 100%">
            <template slot-scope="scope">
              <el-table-column label="学术成果" prop="paper_name" @click="gotoColArt(scope.row.paper_id)"></el-table-column>
            </template>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total=Math.ceil(collect_data.length/10) @prev-click="prev3" @next-click="next3" @current-change="pageChange3">
          </el-pagination>
        </div>
        <div class="BottomContent3" v-show="MidNavIdx === '3'">
          <el-button class="clear_button">清空</el-button>
          <el-table :data="visit_data.slice(begin4, end4)" style="width: 100%">
            <el-table-column label="浏览记录" prop="work_name"></el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total=Math.ceil(visit_data.length/10) @prev-click="prev4" @next-click="next4" @current-change="pageChange4">
          </el-pagination>
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
            <el-table :data="scholar_certification.slice(begin1, end1)">
              <el-table-column prop="datetime" label="申请时间" width="240">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.datetime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="username" label="申请用户" width="240">
                <template slot-scope="scope">
                  <el-popover placement="top" trigger="hover">
                    <el-descriptions title="用户信息" :column="3" border>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-user"></i>
                          <span style="margin-left: 3px">用户名</span>
                        </template>
                        {{ scope.row.username }}
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
                      <el-tag size="medium">{{ scope.row.username }}</el-tag>
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
                        {{ scope.row.username }}
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
                <template slot-scope="scope">
                  <el-button class="check" @click="accept(scope.$index)"><i class="el-icon-check"></i></el-button>
                  <el-button class="close" @click="refuse(scope.$index)"><i class="el-icon-close"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total=Math.ceil(scholar_certification.length/10) @prev-click="prev" @next-click="next" @current-change="pageChange">
            </el-pagination>
          </div>
          <div class="right4_2" v-show="Menu4Idx === '2'">
            <el-table :data="work_certification.slice(begin2, end2)">
              <el-table-column prop="datetime" label="申请时间" width="240">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.datetime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="send_user" label="申请用户" width="240">
                <template slot-scope="scope">
                  <el-popover placement="top" trigger="hover">
                    <el-descriptions title="用户信息" :column="3" border>
                      <el-descriptions-item>
                        <template slot="label">
                          <i class="el-icon-user"></i>
                          <span style="margin-left: 3px">用户名</span>
                        </template>
                        {{ scope.row.send_user }}
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
                      <el-tag size="medium">{{ scope.row.send_user }}</el-tag>
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
                <template slot-scope="scope">
                  <el-button class="check" @click="accept2(scope.$index)"><i class="el-icon-check"></i></el-button>
                  <el-button class="close" @click="refuse2(scope.$index)"><i class="el-icon-close"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total=Math.ceil(this.work_certification.length/10) @prev-click="prev2" @next-click="next2" @current-change="pageChange2">
            </el-pagination>
          </div>
          <div class="right4_3" v-show="Menu4Idx === '3'">
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
import {ShowFavorites} from "@/api/api";
import {GetWorkList} from "@/api/api";

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
    getInformation(this.token).then(res => {
      if (res.data.result === 0){
        if (res.data.id === parseInt(this.$route.params.id)) {
          this.isSelf = true
        } else {
          this.isSelf = false
        }
        this.email = res.data.email
        this.username = res.data.username
        this.name = res.data.name
        this.imageUrl = res.data.photo_url_out
        if (res.data.is_author) {
          this.isAuthor = true
          this.aid = res.data.author_id;
          console.log(this.aid)
          GetAuthor(this.aid).then(res => {
            console.log(res)
            console.log(res.data._source)
            if (res.data._source.last_known_institution === null) {
              this.institution = "暂无机构信息";
            } else {
              this.institution = res.data._source.last_known_institution.display_name
            }
            if (res.data._source.display_name === null) {
              this.name = null;
            } else {
              this.name = res.data._source.display_name
            }
          })
        } else {
          this.isAuthor = false
          this.name = null
          this.institution = "暂无机构信息"
        }
        this.isManager = res.data.is_admin
        if (this.isManager) {
          ShowAuthorMessage(this.token).then(res => {
            if (res.data.result === 0) {
              this.scholar_certification = res.data.messages
              console.log(this.scholar_certification)
            } else {
              console.log(res.data.messages)
            }
          })
          ShowPaperMessage(this.token).then(res => {
            if (res.data.result === 0) {
              this.work_certification = res.data.messages
              console.log(this.work_certification)
            } else {
              console.log(res.data.messages)
            }
          })
        }
      } else {
        this.$notify({
          title: '错误',
          message: '获取用户信息失败',
          type: 'error'
        });
        return;
      }
    })
    ShowFavorites(this.token).then(res => {
      if (res.data.result === 0) {
        this.collect_data = res.data.messages
      } else {
        this.$notify({
          title: '错误',
          message: '获取收藏成果失败',
          type: 'error'
        });
        return;
      }
    })
    GetWorkList(this.token).then(res => {
      console.log(res)
      if (res.data.result === 0) {
        console.log("1")
        console.log(res.data.objects, "33333")
        this.visit_data = res.data.objects
      } else {
        this.$notify({
          title: '错误',
          message: '获取浏览记录失败',
          type: 'error'
        });
        return;
      }
    })
  },
  data() {
    return {
      aid: "",
      token: null,
      is_black: false,
      username: "username",
      name: "name",
      institution: "institution",
      email: '',
      imageUrl: '',
      MidNavIdx: '1',
      Menu1Idx: '1',
      Menu4Idx: '1',
      keywordsInput: "",
      isMasterpieceOnly: false,
      isAuthor: false,
      isManager: false,
      isSelf: false,
      isInterested: false,
      isCancel: false,
      begin1: 0,
      end1: 10,
      begin2: 0,
      end2: 10,
      begin3: 0,
      end3: 0,
      begin4:0,
      end4:0,
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
      collect_data: [
        {
          paper_id: '',
          paper_name: '',
        }
      ],
      visit_data: [
        {
          id: '',
          work_name: "",
          work_id: "",
          time: ""
        }
      ],
      infoDialog: false,
      infoDialogTitle: true,
      dialogVisible: false,
      inputDisabled: true,
    };
  },
  methods: {
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
    },
    gotoColArt(val) {
      this.$router.push("/paper/" + btoa(encodeURIComponent(JSON.stringify(val))))
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
    prev3() {
      if (this.begin3 >= 10) {
        this.begin3 -= 10;
        this.end3 -= 10;
      } else {
        this.begin3 = 0;
        this.end3 = 10;
      }
    },
    next3() {
      this.begin3 += 10;
      this.end3 += 10;
    },
    pageChange3(val) {
      console.log(val)
      this.begin3 = (val - 1) * 10;
      this.end3 = val * 10;
    },
    prev4() {
      if (this.begin4 >= 10) {
        this.begin4 -= 10;
        this.end4 -= 10;
      } else {
        this.begin4 = 0;
        this.end4 = 10;
      }
    },
    next4() {
      this.begin4 += 10;
      this.end4 += 10;
    },
    pageChange4(val) {
      console.log(val)
      this.begin4 = (val - 1) * 10;
      this.end4 = val * 10;
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

.Info .avatar_upload .image-black-cover:hover{
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

.Info .avatar_upload .image-black-cover .el-icon-plus{
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
  background: rgba(0,0,0,.45);
  box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
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

.BottomContent2 {
  margin: 0 7.5%;
  padding: 1% 1% 0;
  width: 82.6%;
  height: 98%;
  background-color: white;
}

.BottomContent3 {
  margin: 0 7.5%;
  padding: 1% 1% 0;
  width: 82.6%;
  height: 98%;
  background-color: white;
}

.BottomContent3 .el-table {
  position: relative;
  top: -30px;
}

.BottomContent3 .clear_button {
  width: 80px;
  height: 40px;
  float: right;
  background-color: #67C23A;
  color: white;
  font-size: 16px;
  padding: 12px;
  position: relative;
  top: 10px;
  right: 20px;
  z-index: 500;
}

.BottomContent3 .clear_button:hover {
  filter: brightness(1.2);
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

.check {
  width: 30px;
  height: 30px;
  padding: 5px 5px;
  background-color: #67C23A;
  color: white;
  opacity: 0.8;
  filter: brightness(1.0);
}

.check:hover {
  background-color: #57ff2A;
  opacity: 2.0;
  filter: brightness(1.2);
}

.check.is-active {
  border: 1px solid white;
}

.close {
  width: 30px;
  height: 30px;
  padding: 5px 5px;
  background-color: #F56C6C;
  color: white;
  opacity: 0.8;
  filter: brightness(1.0);
}

.close:hover {
  background-color: #ff4844;
  opacity: 2.0;
  filter: brightness(1.0);
}

.close.is-active {
  border: 1px solid white;
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
