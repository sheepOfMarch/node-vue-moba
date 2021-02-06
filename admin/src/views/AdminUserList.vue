<template>
  <div class="userlist">
    <h1>管理员列表</h1>

    <el-table :data="items" empty-text="-">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          > -->
          <el-button size="mini" type="danger" plain @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("adminUsers");
      // console.log(res.data)
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除用户'${row.username}', 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`adminUsers/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
