<template>
  <div class="iconsManagementContainer">
    <!-- <query-bar :isPublic="isPublic"></query-bar> -->
    <div class="iconQueryBar">
      <el-input placeholder="请输入名称搜索"
        v-model.trim="libraryName"
        clearable
        icon="h-icon-search"
        :on-icon-click="handleIconClick"
        :clear-icon-click="clearIconClick"
        @keyup.enter.native="handleIconClick"></el-input>
      <el-select
        class="iconQueryBarSelect"
        v-model="deptId"
        placeholder="请选择">
        <el-option
          v-for="item in departmentOpts"
          :key="item.id"
          :label="item.initial"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <el-scrollbar
      wrap-class="scrollbar__wrap"
      view-class="scrollbar__view">
    <template v-if="records.length === 0">
      <div class="noGroupContainer">
        <img :src="defaultUrl" />
        <p>这里太空旷，快来上传第一个图标库吧</p>
        <el-button type="primary" @click="addGlobalClick">新建分组</el-button>
      </div>
    </template>
    <template v-else>
      <div class="listContainer">
        <el-collapse accordion  @change="handleChange">
          <el-collapse-item v-for="item in records" :key="item.groupId" @click="handleChange(item)" :name="item.groupId">
            <!-- 头部 -->
            <template slot="title">
              <i>{{item.name}}</i>
              <i class="h-icon-trashcan" @click="e => deleteClick(e, item)"></i>
              <i class="h-icon-edit" @click="e => editClick(e, item)"></i>
              <i class="h-icon-upload" @click="e => uploadClick(e, item)"></i>
            </template>
            <!-- 内容 -->
            <ul class="card">
              <li class="cardList" v-for="_item in simpleData" :key="_item.iconLibraryId">
                <div class="top">
                  <div class="checkbox"><el-checkbox v-model="checkedList[_item.iconLibraryId]"></el-checkbox></div>
                  <div class="name">
                    <img :src="_item.coverPhotoUrl"/>
                  </div>
                </div>
                <div class="name">{{_item.name}}</div>
                <div class="upload"><el-button class="button" @click="() => downClickAgain(item)">下载</el-button></div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </template>
    <div class="toolbar">
      <i class="h-icon-trashcan" @click="deleteLibrary"></i>
      <i class="h-icon-download" @click="downloadGlobalClick"></i>
      <i class="h-icon-plus" @click="addGlobalClick"></i>
      <i class="h-icon-edit"></i>
    </div>
    <add-group-dialog ref="addGroup" @addClick="addClick"></add-group-dialog>
    <upload-icons-dialog ref="upload"></upload-icons-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import QueryBar from './query-bar'
import AddGroupDialog from './add-group-dialog'
import UploadIconsDialog from './upload-icons-dialog'
import { iconApi } from '@/api'
import defaultUrl from '../../../assets/noData.png'
export default {
  name: 'iconsMangement',
  props: {
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  components: {
    QueryBar,
    AddGroupDialog,
    UploadIconsDialog
  },
  data () {
    return {
      records: [{}],
      mode: 'add',
      simpleData: [],
      checkedList: {},
      groupId: '',
      libraryName: '',
      departmentOpts: [],
      deptId: '',
      defaultUrl
    }
  },
  created () {
    this.getGroups()
    this.getDepartment()
  },
  methods: {
    /** 获取所在事业群 获取后台接口 */
    async getDepartment (customParams) {
      try {
        const {data = []} = await iconApi.getDeptList({params: {deptId: 1, isPublic: true}})
        this.departmentOpts = data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
    handleIconClick () {
      this.getGroups()
    },
    clearIconClick () {
      this.libraryName = ''
      this.getGroups()
    },
    handleChange (groupId) {
      if (groupId) {
        this.addLibraryByGroupId(groupId)
        this.groupId = groupId
      }
    },
    addGlobalClick () {
      this.mode = 'add'
      this.$refs.addGroup.showDialog({mode: 'add'})
    },
    /** 全局下载 */
    downloadGlobalClick () {
      console.log(this.checkedList)
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
    formDataLibraryIds () {
      const idsObj = this.checkedList
      let arr = []
      Object.keys(idsObj).forEach(item => arr.push(item))
      return arr
    },
    deleteLibrary () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'question'
      }).then(() => {
        // TODO：需要处理checkedList,为字符串
        console.log(this.checkedList)
        const params = {ids: this.formDataLibraryIds()}
        try {
          iconApi.deleteLibrary({params}).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.addLibraryByGroupId(this.groupId)
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
    },
    /** 获取分组信息 获取后台接口 */
    async getGroups (customParams) {
      try {
        const {data = []} = await iconApi.getGroupList({params: {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: this.isPublic, libraryName: this.libraryName}})
        this.records = data
      } catch (error) {
        this.errorHandler(error)
        this.records = []
      }
    },
    /** 添加分组 */
    async addGroups (customParams) {
      const params = {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: this.isPublic, name: customParams.name}
      try {
        await iconApi.addGroup({params})
        this.getGroups()
      } catch (error) {
        this.errorHandler(error)
        this.records = []
      }
    },
    /** 添加分组 */
    async addLibraryByGroupId (groupId) {
      const params = {groupId}
      try {
        const {data = []} = await iconApi.getLibraryList({params})
        this.simpleData = data
      } catch (error) {
        this.errorHandler(error)
        this.simpleData = []
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
    uploadClick: function (e, item) {
      e.stopPropagation()
      this.$refs.upload.showDialog(item)
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
  .iconsManagementContainer{
    transform: scale(1);
  }
  .iconQueryBar{
    display: flex;
    /deep/.el-input-group{
      width: 70%;
    }
  }
  .iconQueryBarSelect{
    width: 30%;
    /deep/.el-input{
      input {
        border: 0;
        background: transparent;
      }
    }
  }
  .iconQueryBarInput{
    display: inline-block;
    width: 50%;
  }
  /deep/.el-input-group__prepend{
    width: 20%;
  }
  .toolbar{
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #E6E6E6;
    background-color: #fff;
    height: 40px;
    line-height: 36px;
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
  .listContainer{
    margin-top: 12px;
    /deep/.el-collapse-item__header{
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      padding: 0px;
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
    /deep/.el-button{
      width: 250px;
      height: 44px;
      background: #3C99FC;
      box-shadow: 0 6px 24px 0 rgba(60,153,252,0.24);
      border-radius: 22px;
    }
  }
  .card{
    display: flex;
    flex-wrap: wrap;
    .cardList{
      width: 180px;
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
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .upload{
        margin-top: 10px;
        /deep/.el-button{
          border: 1px solid #D8D8D8;
          border-radius: 50px;
          width: 70px;
          height: 24px;
          padding: 0px;
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(24,25,26,0.70);
            text-align: center;
            line-height: 17px;
          }
        }
      }
    }
  }
  /deep/.scrollbar__wrap {
    height: 474px;
    margin-bottom: -16px!important;
  }
</style>
