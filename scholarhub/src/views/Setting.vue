<template>

  <div>
    <div class="title">
      <span style="margin-right: 2%">账号设置</span><i class="el-icon-user-solid"></i>
    </div>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="实名认证" name="1">
        <div class="note">平台部分功能使用需要先完成实名认证</div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">个人认证</span>
          <span style="padding-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Name : '未实名' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="gotoBinding">去认证</el-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="绑定账户" name="2">
        <div class="note">绑定手机、邮箱和微信，可以使用任意方式进行登录</div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定手机</span>
          <span style="margin-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Phone : '未绑定' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="EditPhone = true">去绑定</el-button>
          <el-button v-if="isBound" type="danger" round @click="EditEmail = true">解绑</el-button>
        </div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定邮箱</span>
          <span style="margin-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Email : '未绑定' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="EditEmail = true">去绑定</el-button>
          <el-button v-if="isBound" type="danger" round @click="EditEmail = true">解绑</el-button>
        </div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定微信</span>
          <span style="margin-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Wechat : '未绑定' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="EditWechat = true">去绑定</el-button>
          <el-button v-if="isBound" type="danger" round @click="EditEmail = true">解绑</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
        title="绑定手机号"
        :visible.sync="EditPhone"
        width="50%"
        :before-close="handleClose">
      <span>手机验证通过后，可以使用绑定的手机号登录</span>
      <el-form :model="phoneForm" :rules="phoneFormRules" ref="regForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="phoneForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button @click="sendVerificationCode" :disabled="verificationSent">
            {{ verificationSent ? '已发送' : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model=phoneForm.code></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditPhone = false">取 消</el-button>
        <el-button type="primary" @click="submitPhone">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="绑定手机号"
        :visible.sync="EditEmail"
        width="50%"
        :before-close="handleClose">
      <span>邮箱验证通过后，可以使用绑定的邮箱登录</span>
      <el-form :model="emailForm" :rules="emailFormRules" ref="regForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="emailForm.phone"></el-input>
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

  </div>


</template>

<script>
export default {
  data() {
    return {
      verificationSent: false,
      EditPhone: false,
      phoneForm:{
        phone: '',
        code: ''
      },
      phoneFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/, // 使用正则表达式限制为11位数字，并且以1开头
            message: '请输入合法的手机号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入6位验证码', trigger: 'blur' },
        ]
      },
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
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      EditWechat: false,
      wechatForm:{
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

    async submitPhone() {
      try {
        await this.$refs.regForm.validate();
        const { phone, code } = this.phoneForm;
        const response = await this.$axios.post('/api/submit', {
          phone,
          code
        });
        console.log('提交成功', response.data);
        this.EditPhone = false;
      } catch (error) {
        console.error('绑定失败', error);
      }
    },

    async submitEmail() {
      try {
        await this.$refs.regForm.validate();
        const { email, code } = this.phoneForm;
        const response = await this.$axios.post('/api/submit', {
          email,
          code
        });
        console.log('提交成功', response.data);
        this.EditPhone = false;
      } catch (error) {
        console.error('绑定失败', error);
      }
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