<template>
  <div class="container">
  <div class="body-form">
    <el-form :model="formData" :rules="formRules" ref="form" label-width="100px">
      <div class="title">
        <span style="margin-right: 2%;">实名认证</span><i class="el-icon-user-solid"></i>
      </div>
      <el-alert style="margin-bottom: 40px;margin-top: -30px;width: 500px;margin-left: 10px"
          title="请填写真实的姓名和机构；请尊重知识产权，勿冒认他人身份;"
          type="warning"
          show-icon>
      </el-alert>
      <el-form-item label="您的姓名" prop="realName">
        <el-input v-model="formData.realName" class="input-box"></el-input>
      </el-form-item>
      <el-form-item label="您的机构" prop="organization">
        <el-input v-model="formData.organization" class="input-box"></el-input>
      </el-form-item>
      <el-form-item label="您的邮箱" prop="email">
        <el-input v-model="formData.email" class="input-box"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <div class="verification-code">
          <el-input
              v-for="index in 6"
              :key="index"
              v-model="formData.verificationCode[index - 1]"
              :maxlength="1"
              ref="verificationInputs"
              style="width: 40px; margin-right: 5px; text-align: center;"
              @input="handleVerificationInput(index)"
          ></el-input>
        </div>
        <el-button class="custom-btn" @click="sendVerificationCode" :disabled="verificationSent">
          {{ verificationSent ? '已发送' : '发送验证码' }}
        </el-button>

        <div>
          <el-tooltip placement="bottom">
            <div slot="content">请您提交申请后耐心等待审核，审核通<br/>过后，可使用成果、文库等功能。</div>
            <el-button class="submit-btn" type="primary" @click="submitForm">提交</el-button>
          </el-tooltip>
      </div>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        realName: '',
        organization: '',
        email: '',
        verificationCode: ['', '', '', '', '', '']
      },
      formRules: {
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        organization: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入合法的邮箱地址', trigger: ['blur', 'change'] }
        ],
        verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      verificationSent: false // 是否已发送验证码
    };
  },
  methods: {
    sendVerificationCode() {
      // 处理发送验证码的逻辑
      this.verificationSent = true; // 标记验证码已发送
    },
    handleVerificationInput(index) {
      const verificationCode = this.formData.verificationCode[index - 1];
      if (verificationCode.length === 1 && index < 6) {
        // 移动焦点到下一个输入框
        this.$refs.verificationInputs[index].focus();
      } else if (verificationCode.length === 0 && index > 1) {
        // 如果删除字符时，回退到前一个输入框
        this.$refs.verificationInputs[index - 2].focus();
      }
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('提交的认证信息:', this.formData);
          this.$router.push("/settings");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.container{
  justify-content: center; /* 水平居中 */
}

.body-form {
  padding: 5%;
  display: flex;
  background-color: white;
  height: 100vh;
  width: 650px;
  border: 1px solid #ccc;
  justify-content: center; /* 水平居中 */
}

/* 标题 */
.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 50px;
}
/* 自定义按钮样式 */
.custom-btn {
  background-color: #ff9900;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
  margin-left: 280px;
}

.custom-btn:hover {
  background-color: #f6b549;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
  margin-top: 40px; /* 设置间距 */
  width: 300px;
}
.submit-btn:hover {
  background-color: #5dd59e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
  margin-top: 40px; /* 设置间距 */
  width: 300px;
}

/* 输入框样式 */
.input-box {
  display: flex;
  justify-content: flex-start;
  width: 400px;
  margin-left: 3px;
}
/* 验证码输入框样式 */
.verification-code {
  display: flex;
  position: absolute;
  align-items: center;
  margin-top: -45px;
  margin-left: -10px;
}

</style>
