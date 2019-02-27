<template>
  <el-dialog :title="title" :visible.sync="visible" :append-to-body="true" :show-close="false">
    <el-form :model="form">
      <el-form-item label="分组名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
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
  name: 'addGroupDialog',
  data () {
    return {
      visible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    title () {
      return `${this.mode === 'add' ? '添加' : '编辑'}分组`
    }
  },
  methods: {
    showDialog ({mode, data}) {
      this.visible = true
      if (mode === 'edit') {
        this.form = data
      } else {
        this.form = {}
      }
    },
    okClick () {
      this.visible = false
      this.$emit('addClick', this.form)
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-dialog{
    width: 400px;
    height: 180px;
    .el-dialog__header{
      text-align: center;
      border: none;
    }
    .el-dialog__footer{
      background-color: #fff;
    }
    /deep/.el-input-group__append{
      background-color: #F5F5F5;
    }
  }
</style>
