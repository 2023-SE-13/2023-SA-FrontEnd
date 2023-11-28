<template>
  <div class="body">
    <el-form :model="formData" :rules="formRules" ref="form" label-width="100px">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="formData.realName"></el-input>
      </el-form-item>
      <el-form-item label="机构名称" prop="organization">
        <el-input v-model="formData.organization"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="formData.verificationCode"></el-input>
        <div class="button-container">
        <el-button class="custom-button" @click="sendVerificationCode" :disabled="verificationSent">
          {{ verificationSent ? '已发送' : '发送验证码' }}
        </el-button>
          <el-button type="primary" @click="submitForm" class="custom-button" style="background-color: #42b983">提交</el-button>
      </div>
      </el-form-item>
    </el-form>
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
        verificationCode: ''
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
      // 可以调用接口发送验证码等操作
      this.verificationSent = true; // 标记验证码已发送
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
.body {
  padding: 10%;
}

.custom-button {
  /* 自定义按钮样式 */
  background-color: #ff9900;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 5%;
}

.button-container {
  display: flex;
  justify-content: space-between; /* 两个按钮水平等间距排列 */
  margin-top: 20px; /* 设置间距 */
}

</style>
