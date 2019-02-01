<template>
  <div class="iconsManagementContainer">
    <el-collapse accordion>
      <el-collapse-item v-for="item in records" :key="item.id">
        <template slot="title">
          <i>{{item.name}}</i>
          <i class="h-icon-trashcan" @click="e => deleteClick(e, item)"></i>
          <i class="h-icon-edit" @click="e => editClick(e, item)"></i>
          <i class="h-icon-upload" @click="uploadClick"></i>
        </template>
        <div>{{item.name}}</div>
      </el-collapse-item>
      <upload-icons-dialog ref="upload"></upload-icons-dialog>
      <add-group-dialog ref="addParam"></add-group-dialog>
    </el-collapse>
  </div>
</template>
<script>
import QueryBar from './query-bar'
import NoGroupContainer from './no-group-container'
import UploadIconsDialog from './upload-icons-dialog'
import AddGroupDialog from './add-group-dialog'
export default {
  name: 'groupContainer',
  props: {
    records: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    QueryBar,
    NoGroupContainer,
    UploadIconsDialog,
    AddGroupDialog
  },
  data () {
    return {

    }
  },
  methods: {
    /** 上传图片 */
    uploadClick: function (e) {
      e.stopPropagation()
      this.$refs.upload.showDialog()
    },
    /** 编辑分组 */
    editClick: function (e, item) {
      e.stopPropagation()
      this.$refs.addParam.showDialog({mode: 'edit', data: Object.assign({}, item)})
    },
    /** 删除分组 */
    deleteClick: function (e) {
      e.stopPropagation()
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'question'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .iconsManagementContainer{
    margin-top: 12px;
    /deep/.el-collapse-item__header{
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      i:nth-child(1){
        float: left;
        margin-top: 12px;
      }
      i:nth-child(2){
        float: left;
      }
      i:nth-child(3), i:nth-child(4), i:nth-child(5){
        float: right;
        margin-left: 12px;
        margin-top: 12px;
      }
    }
  }
</style>
