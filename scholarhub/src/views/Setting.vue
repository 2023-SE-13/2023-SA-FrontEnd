<template>

  <div>
    <div class="title">
      <span style="margin-right: 2%">账号信息</span><i class="el-icon-user-solid"></i>
    </div>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="实名认证" name="1">
        <div class="note">平台部分功能使用需要先完成实名认证</div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">个人认证</span>
          <span style="padding-left: 10%;margin-right: 60%;color: darkgrey">
            {{ isBound ? Name : '未实名' }}
          </span>
          <el-button class="" v-if="!isBound" type="primary" round @click="gotoBinding">去认证</el-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="账户设置" name="2">
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">修改密码</span>
          <el-button class="edit-pwd-btn" type="danger" round @click="EditPwd = true" style="margin-left: 72.5%">修改</el-button>
        </div>

        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定邮箱</span>
          <span style="margin-left: 10%;margin-right: 60%;color: darkgrey">
            {{ isBound ? Email : '未绑定' }}
          </span>
          <el-button class="edit-email-btn" v-if="!isBound" type="primary" round @click="EditEmail = true">绑定</el-button>
          <el-button class="edit-email-btn-btn" v-if="isBound" type="danger" round @click="EditEmail = true">解绑</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
        title="绑定邮箱"
        :visible.sync="EditEmail"
        width="500px"
        :before-close="handleClose">
      <span>邮箱验证通过后，可以使用绑定的邮箱登录</span>
      <el-form :model="emailForm" :rules="emailFormRules" ref="regForm">
        <el-form-item label="绑定邮箱" prop="email">
          <el-input v-model="emailForm.email"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button @click="sendVerificationCode" :disabled="verificationSent">
            {{ verificationSent ? '已发送' : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model=emailForm.code></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditEmail = false">取 消</el-button>
        <el-button type="primary" @click="submitEmail">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="修改密码"
        :visible.sync="EditPwd"
        width= 350px
        :before-close="handleClose">
      <el-form :model="pwdForm" :rules="pwdFormRules" ref="regForm">
        <el-form-item label="原先密码" prop="pwd">
          <el-input v-model="pwdForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="pwdForm.new_pwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditPwd = false">取 消</el-button>
        <el-button type="primary" @click="saveNewPwd">确 定</el-button>
      </span>
    </el-dialog>

  </div>


</template>

<script>
export default {
  data() {
    return {
      verificationSent: false,
      EditEmail: false,
      emailForm:{
        email: '',
        code: ''
      },
      emailFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: '请输入合法的邮箱',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入6位验证码', trigger: 'blur' },
        ]
      },
      EditPwd: false,
      pwdForm:{
        pwd: '',
        new_pwd: ''
      },
      pwdFormRules: {
        pwd: [
          { required: true, message: '请输入原先密码', trigger: 'blur' },
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    // 在需要的时候修改绑定状态
    gotoBinding() {
      this.$router.push("/authentication");
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    sendVerificationCode() {
      // 处理发送验证码的逻辑
      // 可以调用接口发送验证码等操作
      this.verificationSent = true; // 标记验证码已发送
    },

    async submitEmail() {
      try {
        await this.$refs.regForm.validate();
        const { email, code } = this.emailForm;
        const response = await this.$axios.post('/api/submit', {
          email,
          code
        });
        console.log('提交成功', response.data);
        this.EditEmail = false;
      } catch (error) {
        console.error('绑定失败', error);
      }
    },

    async saveNewPwd() {

    }
  }
};

</script>

<style>
/* 标题 */
.title {
  padding: 15px;
  font-size: 22px;
  font-weight: bold;
}
/* 折叠面板格子 */
.cell {
  text-align: left;
}

/* 折叠面板注释 */
.note {
  color: darkgrey;
  margin-top: 3%;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

/* 修改折叠面板的标题样式 */
.el-collapse .el-collapse-item__header {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 8px 8px 15px;
  margin: 0 5px 0 5px;
  font-size: 16px;
  font-weight: bold;
}

/* 修改折叠面板展开时的标题样式 */
.el-collapse .el-collapse-item__header.is-active {
  background-color: #eaeaea;
}

</style>