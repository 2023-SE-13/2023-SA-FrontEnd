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
          <el-button v-if="!isBound" type="primary" round @click="toggleBinding">去认证</el-button>
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
          <el-button v-if="!isBound" type="primary" round @click="toggleBinding">去绑定</el-button>
        </div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定邮箱</span>
          <span style="margin-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Email : '未绑定' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="toggleBinding">去绑定</el-button>
        </div>
        <el-divider></el-divider>
        <div class="cell">
          <span style="font-size: 16px;font-weight: bold;margin-left: 3%">绑定微信</span>
          <span style="margin-left: 10%;margin-right: 50%;color: darkgrey">
            {{ isBound ? Wechat : '未绑定' }}
          </span>
          <el-button v-if="!isBound" type="primary" round @click="toggleBinding">去绑定</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isBound: false, // 初始状态为未绑定
      Name: '张三',
      Phone: '0123456789',
      Email: 'test@buaa.edu.cn',
      Wechat: 'Zhangsan'
    };
  },
  methods: {
    // 在需要的时候修改绑定状态
    toggleBinding() {
      this.isBound = !this.isBound; // 在实际应用中，根据实际逻辑来修改绑定状态
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

/* 修改折叠面板的标题样式 */
.el-collapse .el-collapse-item__header {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px;
  padding-left: 15px;
  margin: 0 5px 0 5px;
  font-size: 16px;
  font-weight: bold;
}

/* 修改折叠面板展开时的标题样式 */
.el-collapse .el-collapse-item__header.is-active {
  background-color: #eaeaea;
}

/* 修改折叠面板内容区域的样式 */
.el-collapse .el-collapse-item__wrap {
}
</style>