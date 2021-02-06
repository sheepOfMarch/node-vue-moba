<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-row type="flex" justify="space-between">
        <h1>iHistory后台管理系统</h1>
        <span
          ><span>{{ adminUserName || "" }}</span
          ><i class="el-icon-switch-button exit" @click="exit"></i
        ></span>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          router
          :default-openeds="['1', '2', '3']"
          unique-opened
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">历史管理</template>
            <el-menu-item index="/dynasties/list">朝代列表</el-menu-item>
            <el-menu-item index="/emperors/list">帝王列表</el-menu-item>
            <el-menu-item index="/others/list">人物列表</el-menu-item>
            <el-menu-item index="/things/list">事件列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">会员管理</template>
            <el-menu-item index="/users/create">添加会员</el-menu-item>
            <el-menu-item index="/users/list">会员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">系统设置</template>
            <el-menu-item index="/adminUsers/create">新建管理员</el-menu-item>
            <el-menu-item index="/adminUsers/list">管理员列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.exit {
  margin-top: 22px;
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      adminUserName: "",
    };
  },
  created() {
    this.adminUserName = JSON.parse(localStorage.getItem("adminUserName"));
  },
  methods: {
    exit() {
      this.$confirm(`退出iHistory后台管理系统${this.adminUserName}的登录, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          localStorage.clear();
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>
