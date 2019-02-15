<template>
  <div>
    <query-bar :iconType="iconType"></query-bar>
    <template v-if="records.length === 0">
      <div class="noGroupContainer">
        <p>这里太空旷，快来上传第一个图标库吧</p>
        <el-button type="primary" @click="addGlobalClick">新建分组</el-button>
      </div>
    </template>
    <template v-else>
      <div class="iconsManagementContainer">
        <el-collapse accordion>
          <el-collapse-item v-for="item in records" :key="item.id">
            <template slot="title">
              <i>{{item.name}}</i>
              <i class="h-icon-trashcan" @click="e => deleteClick(e, item)"></i>
              <i class="h-icon-edit" @click="e => editClick(e, item)"></i>
              <i class="h-icon-upload" @click="uploadClick"></i>
            </template>
            <ul class="card">
              <li class="cardList" v-for="item in simpleData" :key="item.id">
                <div class="top">
                  <div class="checkbox"><el-checkbox v-model="checkedList[item.id]"></el-checkbox></div>
                  <div class="name">{{item.label}}</div>
                </div>
                <div class="name">{{item.label}}</div>
                <div class="upload"><el-button size="primary" @click="() => downClickAgain(item)">下载</el-button></div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </template>
    <div class="toolbar">
      <i class="h-icon-trashcan"></i>
      <i class="h-icon-download"></i>
      <i class="h-icon-plus" @click="addGlobalClick"></i>
      <i class="h-icon-edit"></i>
    </div>
    <add-group-dialog ref="addGroup" @addClick="addClick"></add-group-dialog>
    <upload-icons-dialog ref="upload"></upload-icons-dialog>
  </div>
</template>
<script>
import QueryBar from './query-bar'
import NoGroupContainer from './no-group-container'
import AddGroupDialog from './add-group-dialog'
import UploadIconsDialog from './upload-icons-dialog'
import { iconApi } from '@/api'
export default {
  name: 'iconsMangement',
  props: {
    iconType: {
      type: String,
      default: 'common'
    }
  },
  components: {
    QueryBar,
    NoGroupContainer,
    AddGroupDialog,
    UploadIconsDialog
  },
  data () {
    return {
      records: [],
      mode: 'add',
      simpleData: [{
        id: 1,
        label: '表格组件库'
      }, {
        id: 4,
        pId: 1,
        label: '表格头'
      }, {
        id: 9,
        pId: 4,
        label: '表头一'
      }, {
        id: 10,
        pId: 4,
        label: '表头二'
      }, {
        id: 2,
        label: '导航组件库'
      }, {
        id: 5,
        pId: 2,
        label: '导航一'
      }, {
        id: 6,
        pId: 2,
        label: '导航二'
      }],
      checkedList: {}
    }
  },
  created () {
    this.getGroups()
  },
  methods: {
    addGlobalClick () {
      this.mode = 'add'
      this.$refs.addGroup.showDialog({mode: 'add'})
    },
    /** 编辑分组 */
    editClick: function (e, item) {
      e.stopPropagation()
      this.mode = 'edit'
      this.$refs.addGroup.showDialog({mode: 'edit', data: Object.assign({}, item)})
    },
    addClick (form) {
      const {mode} = this
      if (mode === 'add') {
        this.addGroups(form)
      } else {
        this.editGroups(form)
      }
    },
    /** 获取分组信息 获取后台接口 */
    async getGroups (customParams) {
      try {
        const {data = []} = await iconApi.getGroupList({params: {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: true}})
        this.records = data
      } catch (error) {
        this.errorHandler(error)
        this.records = []
      }
    },
    /** 添加分组 */
    async addGroups (customParams) {
      const params = {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: true, name: customParams.name}
      try {
        await iconApi.addGroup({params})
        this.getGroups()
      } catch (error) {
        this.errorHandler(error)
        this.records = []
      }
    },
    /** 编辑分组 */
    async editGroups (customParams) {
      const {groupId, name} = customParams
      const params = {groupId, name}
      try {
        await iconApi.editGroup({params})
        this.getGroups()
      } catch (error) {
        this.errorHandler(error)
        this.records = []
      }
    },
    /** 上传图片 */
    uploadClick: function (e) {
      e.stopPropagation()
      this.$refs.upload.showDialog()
    },
    /** 删除分组 */
    async deleteClick (e, item) {
      e.stopPropagation()
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'question'
      }).then(() => {
        const {groupId} = item
        const params = {groupId}
        try {
          iconApi.deleteGroup({params}).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getGroups()
          })
        } catch (error) {
          this.errorHandler(error)
          this.records = []
        }
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
  .toolbar{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: center;
    background-color: #ededed;
    height: 36px;
    line-height: 36px;
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
  .iconsManagementContainer{
    margin-top: 12px;
    /deep/.el-collapse-item__header{
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      i{
        font-style: normal!important;
      }
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
    /deep/.el-collapse{
      border: none!important;
      .el-collapse-item__header{
        border: none;
      }
      .el-collapse-item__wrap{
        border: none;
      }
    }
    /deep/.is-active{
       .el-collapse-item__header{
        border: none;
        background-color: #fafafa;
      }
      .el-collapse-item__wrap{
        border: none;
        background-color: #fafafa;
      }
    }
  }
  .noGroupContainer{
    text-align: center;
  }
  .card{
    display: flex;
    flex-wrap: wrap;
    .cardList{
      width: 200px;
      margin-bottom: 24px;
      .top{
        display: flex;
        background-color: #fff;
        padding: 10px;
        margin-right: 24px;
        .checkbox{
          width: 20%;
        }
        .name{
          width: 80%;
          height: 100px;
          border: 1px solid #ededed;
        }
      }
      .upload{
        margin-top: 10px;
      }
    }
  }
</style>
