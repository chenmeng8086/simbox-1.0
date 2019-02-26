<template>
  <el-dialog title="添加分组" :visible.sync="visible" :append-to-body="true">
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
