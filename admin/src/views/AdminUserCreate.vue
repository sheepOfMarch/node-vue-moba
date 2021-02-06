<template>
    <div>
        <h1>添加管理员</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            model: {}
        }
    },
    methods: {
       save(){
          this.$http.post('adminUsers', this.model)
          this.$router.push('/adminUsers/list')
          this.$message({
              type: 'success',
              message: '保存成功'
          })
        }
    }
}
</script>

