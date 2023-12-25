<template>
  <div class="container-auth">
  <div class="body-form-auth">
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
      <el-form-item label="您的机构" prop="institution">
        <el-input v-model="formData.institution" class="input-box"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="id">
        <el-input v-model="formData.id" class="input-box"></el-input>
      </el-form-item>
      <div>
        <el-tooltip placement="bottom">
          <div slot="content">请您提交申请后耐心等待审核，审核通<br/>过后，可使用成果、文库等功能。</div>
          <el-button class="submit-btn" type="primary" @click="submitForm">提交</el-button>
        </el-tooltip>
      </div>
    </el-form>
  </div>
  </div>
</template>

<script>
import { Authentication } from "@/api/api";

export default {
  data() {
    return {
      formData: {
        realName: '',
        institution: '',
        id: '',
      },
      formRules: {
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        institution: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
      },
    };
  },
  methods: {
    submitForm() {
      const data = new FormData();
      data.append('true_name', this.formData.realName);
      data.append('id', this.formData.id);
      data.append('institution', this.formData.institution);
      Authentication(data, localStorage.getItem('token')).then(res => {
        console.log(res);
        this.$router.push("/settings");
      })
    }
  }
};
</script>

<style>
.container-auth{
  display: flex;
  justify-content: center; /* 水平居中 */
}

.body-form-auth {
  padding: 5%;
  display: flex;
  background-color: white;
  height: 100vh;
  width: 600px;
  border: 1px solid #ccc;
  justify-content: center; /* 水平居中 */
}

/* 标题 */
.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 50px;
}

.submit-btn {
  background-color: #2f3a91;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
  margin-top: 40px; /* 设置间距 */
  width: 250px;
  letter-spacing: 8px
}
.submit-btn:hover {
  background-color: #45519a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 13px 20px;
  font-size: 16px;
  width: 250px;
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
