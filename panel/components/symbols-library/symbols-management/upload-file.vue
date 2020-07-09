<template>
  <el-dialog title="上传文件至simbox" :visible.sync="visible" :append-to-body="true" :show-close="false">
    <el-form :model="form">
      <el-form-item label="上传位置" :label-width="formLabelWidth">
        <treeselect
          v-model="form.position"
          :options="options"
          placeholder='请选择上传位置'/>
      </el-form-item>
      <el-form-item label="选择文件" :label-width="formLabelWidth">
        <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
        <el-input v-model="libraryName" auto-complete="off">
          <template slot="append"><i @click="uploadSymbolLibraryClick">...</i></template>
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'uploadFile',
  components: { Treeselect },
  data () {
    return {
      libraryPath: '',
      libraryName: '',
      visible: false,
      form: {
        position: '',
        name: ''
      },
      formLabelWidth: '120px',
      options: [ {
        id: 'a444',
        label: 'a',
        children: [ {
          id: 'aa4',
          label: 'aa'
        }, {
          id: 'ab222',
          label: 'ab'
        } ]
      }, {
        id: 'bwwwww',
        label: 'b'
      }, {
        id: 'c444',
        label: 'c'
      } ],
      value: null
    }
  },
  methods: {
    uploadSymbolLibraryClick () {
      window.postMessage('uploadSymbolLibraryClick')
      const _this = this
      window.uploadSymbolLibraryName = function (params) {
        const {fileName, path} = params
        _this.libraryName = fileName
        // _this.form.name = path
        // console.log(_this.form.name)
        _this.libraryPath = path
      }
    },
    showDialog ({mode = 'add', data}) {
      this.visible = true
      if (mode === 'edit') {
        this.form = data
      } else {
        this.form = {}
      }
    },
    okClick () {
      this.visible = false
      console.log(1)
      console.log(this.form)
      this.$emit('okClick', this.form)
      const params = {uploadPlace: this.form.position,
        libraryName: this.libraryName,
        libraryPath: this.libraryPath
      }
      console.log(params)
      window.postMessage('uploadLibraryHandler', params)
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-dialog{
    width: 400px;
    height: 400px;
    left: 206px !important;
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
