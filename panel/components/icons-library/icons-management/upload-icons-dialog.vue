<template>
  <el-dialog title="上传图标库至Simbox" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="选择图标库">
        <el-button type="primary" @click="uploadIconLibraryClick">上传图标库</el-button>
        <span>{{libraryName}}</span>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-button type="primary" @click="uploadCoverPhotoClick">选择图片</el-button>
        <span>{{coverPhotoName}}</span>
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
      form: {},
      libraryName: '',
      coverPhotoName: '',
      groupId: ''
    }
  },
  methods: {
    uploadIconLibraryClick () {
      window.postMessage('uploadIconLibraryClick')
      const _this = this
      window.uploadIconLibraryName = function (fileName) {
        _this.libraryName = fileName[0]
      }
    },
    uploadCoverPhotoClick () {
      window.postMessage('uploadCoverPhotoClick')
      const _this = this
      window.uploadCoverPhotoName = function (fileName) {
        _this.coverPhotoName = fileName[0]
      }
    },
    showDialog: function (item) {
      this.visible = true
      this.groupId = item.groupId
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
      this.$emit('submit', this.form)
      this.visible = false
      const params = {groupId: this.groupId, libraryName: this.libraryName, coverPhotoName: this.coverPhotoName}
      window.postMessage('uploadLibrary', params)
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
