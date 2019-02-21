<template>
  <el-dialog title="新建文本" :visible.sync="visible" :center="true" :show-close="false">
    <el-form :model="form" label-position="left" ref="addTextForm">
      <el-form-item label="类别">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入文本类别名称"></el-input>
      </el-form-item>
      <el-form-item label="文本内容">
        <el-input type="textarea" v-model="form.content" placeholder="请输入文本，换行实现分割填充"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="okClick">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'addTextDialog',
  data () {
    return {
      visible: false,
      form: {
        type: '',
        content: ''
      }
    }
  },
  methods: {
    showDialog ({mode, data}) {
      this.$refs.addTextForm && this.$refs.addTextForm.resetFields()
      this.visible = true
      if (mode === 'add') {
        this.form = {}
      } else {
        this.form = data
      }
    },
    /** 保存接口 */
    okClick () {
      this.$emit('submit', this.form)
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog{
  width: 400px;
  height: 400px;
}
</style>
