<template>
  <el-dialog title="上传图标库至Simbox" :visible.sync="visible" :append-to-body="true" :show-close="false">
    <el-form :model="form">
      <el-form-item label="选择图标库">
        <!-- <el-button type="primary" @click="uploadIconLibraryClick">上传图标库</el-button>
        <span>{{libraryName}}</span> -->
        <el-input placeholder="请选择图标库" v-model="libraryName">
          <template slot="append"><i @click="uploadIconLibraryClick">...</i></template>
        </el-input>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-input placeholder="请选择要上传的图片" v-model="coverPhotoName">
          <template slot="append"><i @click="uploadCoverPhotoClick">...</i></template>
        </el-input>
        <!-- <el-button type="primary" >选择图片</el-button>
        <span>{{coverPhotoName}}</span> -->
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
      groupId: '',
      libraryPath: '',
      coverPhotoPath: ''
    }
  },
  methods: {
    uploadIconLibraryClick () {
      window.postMessage('uploadIconLibraryClick')
      const _this = this
      window.uploadIconLibraryName = function (params) {
        const {fileName, path} = params
        _this.libraryName = fileName
        _this.libraryPath = path
      }
    },
    uploadCoverPhotoClick () {
      window.postMessage('uploadCoverPhotoClick')
      const _this = this
      window.uploadCoverPhotoName = function (params) {
        const {fileName, path} = params
        _this.coverPhotoName = fileName
        _this.coverPhotoPath = path
      }
    },
    showDialog: function (item) {
      this.visible = true
      this.groupId = item.groupId
      this.libraryName = ''
      this.coverPhotoName = ''
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
    },
    okClick () {
      this.$emit('submit', this.form)
      this.visible = false
      const params = {groupId: this.groupId,
        libraryName: this.libraryName,
        coverPhotoName: this.coverPhotoName,
        libraryPath: this.libraryPath,
        coverPhotoPath: this.coverPhotoPath
      }
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
    /deep/.el-input-group__append{
      background-color: #F5F5F5;
    }
  }
</style>
