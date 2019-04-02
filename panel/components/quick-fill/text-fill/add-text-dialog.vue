<template>
  <el-dialog :title="`${mode==='add' ? '新建': '编辑'}文本`" :visible.sync="visible" :show-close="false" :append-to-body="true" center>
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
        name: '',
        content: ''
      },
      mode: 'add'
    }
  },
  methods: {
    showDialog ({mode, data}) {
      this.$refs.addTextForm && this.$refs.addTextForm.resetFields()
      this.visible = true
      this.mode = mode
      if (mode === 'add') {
        this.form = {}
      } else {
        console.log('data', data)
        this.form = {...data, content: data.contentArray[0], mode: this.mode}
      }
    },
    /** 保存接口 */
    okClick () {
      console.log('this.form', this.form)
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
  .el-dialog__header{
    text-align: center;
    border: none;
  }
  .el-dialog__footer{
    background-color: #fff;
  }
}
</style>
