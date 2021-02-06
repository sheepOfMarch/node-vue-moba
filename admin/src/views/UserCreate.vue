<template>
    <div>
        <h1>添加会员</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.user_name"></el-input>
            </el-form-item>
            <el-form-item label="发表数量">
                <el-input v-model="model.releaseArticles"></el-input>
            </el-form-item>
            <el-form-item label="回复数量">
                <el-input v-model="model.replies"></el-input>
            </el-form-item>
            <el-form-item label="获赞数量">
                <el-input v-model="model.praises"></el-input>
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
          this.$http.post('users', this.model)
          this.$router.push('/users/list')
          this.$message({
              type: 'success',
              message: '保存成功'
          })
        }
    }
}
</script>

