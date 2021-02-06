<template>
  <div class="userlist">
    <h1>会员列表</h1>

    <el-table :data="items" empty-text="-">
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <!-- <el-table-column prop="_id" label="ID"></el-table-column> -->
      <el-table-column prop="releaseArticles" label="发表"></el-table-column>
      <el-table-column prop="replies" label="回复"></el-table-column>
      <el-table-column prop="praises" label="获赞"></el-table-column>
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
      const res = await this.$http.get("users");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除用户'${row.user_name}', 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`users/${row._id}`);
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
