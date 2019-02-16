<template>
  <el-dialog title="上传图标库至Simbox" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="选择图标库">
        <el-button size="small" type="primary" @click="click">选取文件</el-button>
      </el-form-item>
      <el-form-item label="选择图片">
        <input type='file' />
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import pluginCall from 'sketch-module-web-view/client'
export default {
  name: 'uploadIconsDialog',
  data () {
    return {
      visible: false,
      fileList: [],
      formLabelWidth: '120px',
      form: {}
    }
  },
  methods: {
    showDialog: function () {
      this.visible = true
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    click: function () {
      console.log('选择图片')
      // pluginCall('onUpload')
    }
  }
}
</script>
