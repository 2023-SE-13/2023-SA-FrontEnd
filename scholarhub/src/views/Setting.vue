<template>
  <div class="container">
    <div class="left-bar">
      <el-divider></el-divider>
      <div class="title-s"><span style="margin-right: 2%;">账号信息</span><i class="el-icon-user-solid"></i>
      </div>
      <el-divider></el-divider>
    </div>

    <div class="body-setting">
      <div class="cell certification">
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 18px;font-weight: bold;margin-left: 3%;"><i class="el-icon-info"
              style="margin-right: 4px"></i>实名认证</span>
          <span style="color: darkgrey; margin-left: 8%">平台部分功能使用需要先完成实名认证</span>
        </div>
        <el-divider></el-divider>
      </div>

      <div class="cell content">
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">实名认证</span>
          <span style="padding-left: 10%;margin-right: 60%;color: darkgrey">
            {{ realName }}
          </span>
          <el-button class="binding-btn" v-if="!(realName === '')" type="primary" round
            @click="gotoBinding">认证</el-button>
        </div>
        <el-divider></el-divider>
      </div>

      <div class="cell">
        <span style="font-size: 16px;font-weight: bold;margin-left: 3%">管理员认证</span>
        <span style="padding-left: 8.5%;margin-right: 38%;color: darkgrey">
          {{ isAdmin ? '已认证' : '' }}
        </span>
        <el-input v-if="!isAdmin" placeholder="" v-model="AdminCode" show-password style="width: 200px;"></el-input>
        <el-button class="admin-btn" v-if="!isAdmin" type="primary" round @click="applyAdmin()">认证</el-button>
      </div>

      <div class="cell account-settings">
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 18px;font-weight: bold;margin-left: 3%"><i class="el-icon-s-tools"
              style="margin-right: 4px"></i>账号设置</span>
        </div>
        <el-divider></el-divider>
      </div>

      <div class="cell">
        <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定邮箱</span>
        <span style="margin-left: 10%;margin-right: 60%;color: darkgrey">
          {{ email }}
        </span>
        <el-button class="edit-email-btn" type="danger" round @click="EditEmail = true">换绑</el-button>
      </div>
      <el-divider></el-divider>

      <div class="cell content">
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">修改密码</span>
          <el-button class="edit-pwd-btn" type="danger" round @click="EditPwd = true"
            style="margin-left: 72.5%">修改</el-button>
        </div>
        <el-divider></el-divider>
      </div>

      <el-dialog title="换绑邮箱" :visible.sync="EditEmail" width="500px" :before-close="handleClose">
        <span>邮箱验证通过后，更换账号绑定的邮箱</span>
        <el-form :model="emailForm" :rules="emailFormRules" ref="regForm">
          <el-form-item label="新绑定邮箱" prop="email">
            <el-input v-model="emailForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="sendCode-btn" @click="sendVerificationCode" :disabled="verificationSent">
              {{ verificationSent ? '已发送' : '发送验证码' }}
            </el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="verification-code">
              <el-input v-for="index in 4" :key="index" v-model="verificationCode1[index - 1]" :maxlength="1"
                ref="verificationInputs" style="width: 40px; margin-right: 5px; text-align: center;"
                @input="handleVerificationInput1(index)"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="EditEmail = false">取 消</el-button>
          <el-button type="primary" @click="changeEmail">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="修改密码" :visible.sync="EditPwd" width=350px :before-close="handleClose">
        <el-form :model="pwdForm" :rules="pwdFormRules" ref="regForm">
          <el-form-item label="原先密码" prop="pwd">
            <el-input v-model="pwdForm.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-link type="primary" @click="ForgetPwd = true">忘记密码</el-link>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="EditPwd = false">取 消</el-button>
          <el-button type="primary" @click="changePwd()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <el-dialog title="忘记密码" :visible.sync="ForgetPwd" width="500px" :before-close="handleClose">
      <span>请输入需要找回密码的账号邮箱</span>
      <el-form :model="forgetForm" :rules="forgetFormRules" ref="regForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forgetForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="sendCode-btn" @click="sendVerificationCode2" :disabled="verificationSent">
            {{ verificationSent ? '已发送' : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="forgetForm.new_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="verification-code">
            <el-input v-for="index in 4" :key="index" v-model="verificationCode2[index - 1]" :maxlength="1"
              ref="verificationInputs2" style="width: 40px; margin-right: 5px; text-align: center;"
              @input="handleVerificationInput2(index)"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="ForgetPwd = false">取 消</el-button>
        <el-button type="primary" @click="changePwdByEmail">确 定</el-button>
      </span>
    </el-dialog>

    <div class="right-bar">
      <div class="placeholder">
        <div class="icon-stt">
          <i class="el-icon-setting" style="color: #f3f5f8"></i>
          <i class="el-icon-setting" style="margin-left: -100px;font-size: 150px;margin-right: 50px"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SendCode, ApplyAdmin, ChangeUserPassword, ChangeUserEmail, getInformation } from "@/api/api";

export default {
  mounted() {
    this.token = localStorage.getItem("token")
    getInformation(this.token).then(res => {
      if (res.data.result === 0) {
        this.realName = res.data.name
        this.email = res.data.email
        this.isAdmin = res.data.is_admin
        window.isAdmin = res.data.is_admin
      } else {
        this.$notify({
          title: '警告',
          message: '获取用户信息失败',
          type: 'warning'
        });
        return;
      }
    })
    if (this.token === null) {
      this.$router.push("/login")
    }
  },
  data() {
    return {
      isAdmin: window.isAdmin,
      email: '',
      realName: '',
      verificationSent: false,
      verificationCode1: ['', '', '', ''],
      verificationCode2: ['', '', '', ''],
      AdminCode: '',
      ForgetPwd: false,
      forgetForm: {
        email: '',
        new_pwd: '',
        code: ['', '', '', '']
      },
      forgetFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        code: [
          { required: true, message: ' ', trigger: 'blur' },
        ]
      },

      EditEmail: false,
      emailForm: {
        email: '',
        code: ['', '', '', '']
      },
      emailFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        code: [
          { required: true, message: ' ', trigger: 'blur' },
        ]
      },
      EditPwd: false,
      pwdForm: {
        pwd: '',
        new_pwd: ''
      },
      password: { password: '' },
      pwdFormRules: {
        pwd: [
          { required: true, message: '请输入原先密码', trigger: 'blur' },
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          //密码校验规则
        ]
      },

    };
  },
  methods: {
    gotoBinding() {
      this.$router.push("/authentication");
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    handleVerificationInput1(index) {
      const code = this.verificationCode1[index - 1];
      if (code.length === 1 && index < 4) {
        // 移动焦点到下一个输入框
        this.$refs.verificationInputs[index].focus();
      } else if (code.length === 0 && index > 1) {
        // 如果删除字符时，回退到前一个输入框
        this.$refs.verificationInputs[index - 2].focus();
      }
    },
    handleVerificationInput2(index) {
      const code = this.verificationCode2[index - 1];
      if (code.length === 1 && index < 4) {
        // 移动焦点到下一个输入框
        this.$refs.verificationInputs2[index].focus();
      } else if (code.length === 0 && index > 1) {
        // 如果删除字符时，回退到前一个输入框
        this.$refs.verificationInputs2[index - 2].focus();
      }
    },

    sendVerificationCode() {
      // 处理发送验证码的逻辑
      let formdata = new FormData();
      if (typeof this.emailForm.email == "undefined" || this.emailForm.email == null || this.emailForm.email === "") {
        this.$notify({
          title: '警告',
          message: '邮箱不能为空',
          type: 'warning'
        });
        return;
      }
      //正则表达式判断邮箱格式
      let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!emailReg.test(this.emailForm.email)) {
        this.$notify({
          title: '警告',
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return;
      }
      formdata.append('email', this.emailForm.email)
      SendCode(formdata)
      this.verificationSent = true; // 标记验证码已发送
    },

    sendVerificationCode2() {
      // 处理发送验证码的逻辑
      let formdata = new FormData();
      if (typeof this.forgetForm.email == "undefined" || this.forgetForm.email == null || this.forgetForm.email === "") {
        this.$notify({
          title: '警告',
          message: '邮箱不能为空',
          type: 'warning'
        });
        return;
      }
      //正则表达式判断邮箱格式
      let emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!emailReg.test(this.forgetForm.email)) {
        this.$notify({
          title: '警告',
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return;
      }
      formdata.append('email', this.forgetForm.email)
      SendCode(formdata)
      this.verificationSent = true; // 标记验证码已发送
    },

    async changeEmail() {
      this.email.new_email = this.emailForm.email
      ChangeUserEmail(this.email.new_email, localStorage.getItem('token')).then(res => {
        console.log(res);
        this.$message({
          type:'success',
          message:'邮箱修改成功！'
        })
        this.EditEmail = false;
      })
    },

    changePwd() {
      this.password.password = this.pwdForm.new_pwd
      console.log(localStorage.getItem('token'))
      console.log(this.password.password)
      ChangeUserPassword(this.password.password, localStorage.getItem('token')).then(res => {
        console.log(res);
        this.$message({
          type:'success',
          message:'密码修改成功！'
        })
        this.EditPwd = false;
      })
    },

    async changePwdByEmail() {
      this.password.password = this.forgetForm.new_pwd
      ChangeUserPassword(this.password, localStorage.getItem('token')).then(res => {
        console.log(res);
        this.$message({
          type:'success',
          message:'密码修改成功！'
        })
        this.ForgetPwd = false;
        this.EditPwd = false;
      })
    },

    async applyAdmin() {
      const data = new FormData();
      data.append('code', this.AdminCode);
      ApplyAdmin(data, localStorage.getItem('token')).then(res => {
        console.log(res);
        window.isAdmin = true;
        this.isAdmin = true;
      })
    },
  }
};

</script>

<style>
.container {
  display: flex;
  background-color: #f5f5f5;
}

.left-bar {
  width: 180px;
  height: 100vh;
  /* 设置边栏高度与视口高度一致 */
  text-align: center;
  margin-left: 170px;
  border: 1px solid #ccc;
  padding-top: 6px;
  background-color: white;
}

/* 标题 */
.title-s {
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  margin-right: 30px;
}

.body-setting {
  width: 900px;
  margin: 0 auto;
  border: 1px solid #ccc;
  height: 100vh;
  flex: 1;
  background-color: white;
}

.right-bar {
  width: 350px;
  /* 右侧边栏的宽度 */
  height: 100vh;
  border: 1px solid #ccc;
  position: relative;
  /* 样式 */
}

.placeholder {
  padding: 20px;
  text-align: center;
}

/* 单元格 */
.cell {
  text-align: left;
  position: relative;
  margin: 30px 0 30px 0;
}

/* 实名认证和账号设置的背景颜色 */
.certification,
.account-settings {
  background-color: #f5f5f5;
}

.content {
  background-color: white;
}

.edit-pwd-btn,
.edit-email-btn,
.binding-btn,
.admin-btn {
  position: absolute;
  right: 40px;
  /* 距离右侧的距离 */
  top: -10px;
}

/* 按钮样式 */
.binding-btn,
.sendCode-btn,
.admin-btn {
  background-color: #45519a;
}

.admin-btn {
  top: 0px;
}

/* 按钮悬停时的样式 */
.binding-btn:hover,
.sendCode-btn:hover,
.admin-btn:hover {
  background-color: #2f3a91;
}

.sendCode-btn,
.sendCode-btn:hover {
  color: whitesmoke;
  position: absolute;
  right: 45px;
}

.verification-code {
  display: flex;
  position: absolute;
  top: 48px;
  left: 15px;
  align-items: center;
}

.icon-stt {
  color: #e9eaee;
  font-size: 200px;
  z-index: -10;
  margin-left: -580px;
  margin-top: 570px;
}
</style>
