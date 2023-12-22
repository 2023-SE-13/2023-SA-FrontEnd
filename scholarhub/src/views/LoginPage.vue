<template>
  <div class="box">
    <div class="main">
      <div class="login">
        <span class="title">
          ScholorHub登录
        </span>
        <el-form :model="loginForm" ref="loginForm" class="form">
          <el-form-item prop="username">
            <span class="smallword">账号</span>
            <el-input style="width: 65%;" type="text" v-model="loginForm.username" autocomplete="off"
                      prefix-icon="el-icon-user" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="smallword">密码</span>
            <el-input style="width: 65%;" type="password" v-model="loginForm.password" show-password
                      autocomplete="off" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="navigation">
            <a href="/register" style="background-color: white;color: black; width: 25%;font-size: 15px;">注册账号</a>
            <span> | </span>
            <a href="/" style="background-color: white;color: black; width: 25%;font-size: 15px;">返回首页</a>
          </div>
          <el-form-item>
            <el-button id="LoginButton" type="primary" @click="login()" class="button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {Login} from "@/api/api";
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    login() {
      if (typeof this.loginForm.username == "undefined" || this.loginForm.username == null || this.loginForm.username === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '用户名不能为空',
          type: 'warning'
        });
        return;
      }
      if (typeof this.loginForm.password == "undefined" || this.loginForm.password == null || this.loginForm.password === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '密码不能为空',
          type: 'warning'
        });
        return;
      }
      let form_data = new FormData()
      form_data.append('username', this.loginForm.username)
      form_data.append('password', this.loginForm.password)
      //TODO: 发送登录请求
      Login(form_data).then(res => {
        if (res.data.result === 0) {
          this.$router.push("/")
        } else {
          this.$notify({
            title: '警告',
            message: '用户名或密码错误',
            type: 'warning'
          });
        }
      })
    },
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

.login {
  width: 440px;
  height: 450px;
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
  margin-right: 20px;

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

a {
  text-decoration: none;
}
</style>