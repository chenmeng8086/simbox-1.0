<template>
  <el-dialog title="新建图片" :visible.sync="visible" center :show-close="false" :append-to-body="true">
    <el-form :model="form" label-position="left" ref="addImageForm">
      <el-form-item label="类别">
        <el-input v-model="form.type" auto-complete="off" placeholder="请输入图片类别名称"></el-input>
      </el-form-item>
      <el-form-item label="选择文件">
        <!-- <el-button type="primary" @click="uploadClick">上传文件</el-button>
        <span>{{fileName}}</span> -->
        <el-input placeholder="支持仅含图片的文件" v-model="fileName">
          <template slot="append"><i @click="uploadClick">...</i></template>
        </el-input>
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
        type: ''
      },
      fileName: '',
      path: ''
    }
  },
  methods: {
    showDialog ({mode, data}) {
      this.$refs.addImageForm && this.$refs.addImageForm.resetFields()
      this.visible = true
      if (mode === 'add') {
        this.form = {}
      } else {
        this.form = {type: data.label}
      }
    },
    /** 保存接口 */
    okClick () {
      this.$emit('submit', this.form)
      this.visible = false
      const params = {fileName: this.fileName, type: this.form.type, path: this.path}
      window.postMessage('addFillImage', params)
    },
    uploadClick () {
      window.postMessage('uploadClick')
      const _this = this
      window.imageFillSelectedImageName = function (params) {
        const {fileName, path} = params
        _this.fileName = fileName
        _this.path = path
      }
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-dialog{
    left:206px !important;
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
