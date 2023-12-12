<template>
  <div class="box">
    <div class="main">
      <div class="register">
        <span class="title">
          ScholorHub注册
        </span>
        <el-form :model="registerForm" ref="registerForm" class="form">
          <el-form-item prop="username">
            <div style="width:20%;"><span class="smallword">账号</span></div>
            <el-input style="width: 65%;" type="text" v-model="registerForm.username" autocomplete="off"
                      prefix-icon="el-icon-user" placeholder="邮箱/手机号/用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <div style="width:20%"><span class="smallword">密码</span></div>
            <el-input style="width: 65%;" type="password" v-model="registerForm.password" show-password
                      autocomplete="off" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <div style="width:20%"><span class="smallword">确认密码</span></div>
            <el-input style="width: 65%;" type="password" v-model="registerForm.password2" show-password
                      autocomplete="off" prefix-icon="el-icon-lock" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <div style="width:20%"><span class="smallword">邮箱</span></div>
            <el-input style="width: 65%;" type="text" v-model="registerForm.email"
                      autocomplete="off" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <div class="navigation">
            <a @click="toLogin()" style="background-color: white;color: black; width: 25%;font-size: 15px;">返回登录</a>
            <span> | </span>
            <a href="/" style="background-color: white;color: black; width: 25%;font-size: 15px; text-decoration: none">返回首页</a>
          </div>
          <el-form-item>
            <el-button type="primary" @click="register()" class="button">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        password2: '',
        email: ''
      }
    }
  },

  methods: {
    register() {
      if (typeof this.registerForm.username == "undefined" || this.registerForm.username == null || this.registerForm.username === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '用户名不能为空',
          type: 'warning'
        });
        return;
      }
      if (typeof this.registerForm.password == "undefined" || this.registerForm.password == null || this.registerForm.password === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '密码不能为空',
          type: 'warning'
        });
        return;
      }
      if (this.registerForm.password !== this.registerForm.password2) {
        this.$notify({
          title: '警告',
          message: '两次密码不一致',
          type: 'warning'
        });
        return;
      }
      let form_data = new FormData()
      form_data.append('username', this.registerForm.username)
      form_data.append('password', this.registerForm.password)
      form_data.append('email', this.registerForm.email)
      this.$axios.post('user/register', form_data).then(res => {
        if (res.status === 200) {//TODO 此判断仅用于本地测试
          this.$router.push('/login')
        } else {
          this.$notify({
            title: '大失败！',
            message: "注册失败了",
            type: 'error'
          });
        }
      })
    },
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0;
}

.main {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/loginBG.png");
  display: flex;
  justify-content: center;
  align-items: center;
}

.register {
  width: 440px;
  height: 600px;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.form {
  height: 50vh;
  width: 100%;
  display: block;
  margin-top: 20px;
}

.title {
  width: 100%;
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 40px;
  text-align: left;
  color: black;
  font-size: 20px;
  font-weight: 800;
  text-decoration: underline #0066FF;
  text-underline-offset: 20px;
  text-decoration-thickness: 3px;
}

.smallword {
  font-size: 20px;
  font-weight: 200;
  font-family: 黑体, serif;
  text-align: right;
}

.button {
  width: 80%;
  height: 50px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 200;
  font-family: 黑体, serif;
  color: white;
  background-image: linear-gradient(to bottom right, #2799D3, #004DAA);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.navigation {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 40px;
}


.el-form-item /deep/ .el-form-item__content {
  display: flex;
  justify-content: center;
}


a:hover {
  cursor: pointer;
}
</style>