<template>
  <el-dialog title="上传图标库至Simbox" :visible.sync="visible" :append-to-body="true">
    <el-form :model="form">
      <el-form-item label="选择图标库">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/icon/icon/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="onFileChange2"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/icon/icon/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-change="onFileChange"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="okClick">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { iconApi } from '@/api'
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
    onFileChange (file) {
      console.log(file.name)
      this.form.iconLibrary = file.name
    },
    onFileChange2 (file) {
      console.log(file.name)
      this.form.coverPhoto = file.name
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
    },
    okClick () {
      let formData = new FormData()
      formData.append('iconLibrary', this.form.iconLibrary)
      formData.append('coverPhoto', this.form.coverPhoto)
      // formData.append('groupId', '7a60a41c-0b83-406d-83f8-37cfd88e737a')
      this.uploadImage(formData)
    },
    async uploadImage (formData) {
      try {
        await iconApi.uploadLibrary({
          data: formData
        })
      } catch (error) {
        this.errorHandler(error)
      }
    }
  }
}
</script>
