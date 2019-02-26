<template>
  <div class="iconContainer">
    <div class="iconQueryBar">
        <el-input placeholder="请输入名称搜索"
          v-model.trim="name"
          clearable
          icon="h-icon-search"
          :on-icon-click="handleIconClick"
          :clear-icon-click="clearIconClick"
          @keyup.enter.native="handleIconClick">
          <el-select v-model="groupId" slot="prepend" placeholder="请选择分组" @change="groupChange">
            <el-option label="全部" value=""></el-option>
          <el-option v-for="opt in groupOpts" :key="opt.groupId" :value="opt.groupId" :label="opt.name"></el-option>
          </el-select>
        </el-input>
        <template v-if="isPublic">
          <el-select
            class="iconQueryBarSelect"
            v-model="deptId"
            @change="departmentChange"
            placeholder="请选择">
            <el-option
              v-for="opt in departmentOpts"
              :key="opt.id"
              :label="opt.initial"
              :value="opt.id">
            </el-option>
          </el-select>
        </template>
    </div>
      <el-scrollbar
        wrap-class="scrollbar__wrap"
        view-class="scrollbar__view"
      >
        <icon-container :iconList.sync="iconList"></icon-container>
      </el-scrollbar>
      <div class="vision">
        <label class="label">当前版本：</label>
        <el-select
          v-model="version"
          @change="visionChange"
          placeholder="请选择当前版本">
          <el-option
            v-for="item in visionOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
  </div>
</template>
<script>
import IconContainer from './IconContainer'
import { VisionOpts } from './config.js'
import { iconApi } from '@/api'
import getUUID from '../../../utils/uuid.js'
export default {
  name: 'icons',
  props: {
    isPublic: {
      type: Boolean,
      default: true
    },
    currentTab: {
      type: String,
      default: 'icons'
    }
  },
  components: {
    IconContainer
  },
  data () {
    return {
      visionOpts: [],
      groupOpts: [],
      departmentOpts: [],
      options: [],
      groupId: '',
      deptId: '',
      name: '',
      iconList: [],
      version: '--'
    }
  },
  created () {
    this.getGroups()
    this.getDepartment()
    this.getIconList()
    this.getVisions()
  },
  watch: {
    isPublic () {
      this.getGroups()
      this.getDepartment()
      this.getIconList()
      this.getVisions()
    }
  },
  methods: {
    getIconList () {
      this.getIcons()
    },
    /** 获取icon信息 */
    async getIcons (customParams) {
      try {
        const {data = []} = await iconApi.getIconList({params: {groupId: this.groupId, isPublic: this.isPublic, name: this.name}})
        const _data = data.map(item => ({...item, iconId: getUUID()}))
        this.iconList = _data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
    /** 获取分组信息 */
    async getGroups (customParams) {
      try {
        const {data = []} = await iconApi.getGroupList({params: {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: this.isPublic}})
        this.groupOpts = data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
    /** 获取所在事业群 */
    async getDepartment (customParams) {
      try {
        const {data = []} = await iconApi.getDeptList({params: {deptId: '33c5d86b-6bdb-4527-a8c3-4c0796a0ea20', isPublic: this.isPublic}})
        this.departmentOpts = data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
    getVisions () {
      this.visionOpts = VisionOpts
    },
    /** 分组发生变化 */
    groupChange (val) {
      this.getIconList()
    },
    /** 名称发生变化 */
    handleIconClick () {
      this.getIconList()
    },
    /** 清除名称后 */
    clearIconClick () {
      this.name = ''
      this.getIconList()
    },
    /** 事业部发生变化时 */
    departmentChange () {
      this.getIconList()
    },
    visionChange (val) {
      this.vision = val
      this.getIconList()
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.scrollbar__wrap {
    height: 458px;
  }
  .iconContainer{
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
    text-align: right;
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
    width: 40%;
  }
  .vision{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: left;
    background-color: #fff;
    .label{
      display: inline-block;
      width: 30%;
    }
    /deep/.el-select{
      display: inline-block;
      width: 40%;
      input{
        border: 0;
        background: transparent;
      }
    }
  }
</style>
