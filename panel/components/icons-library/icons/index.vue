<template>
  <div>
    <div class="iconQueryBar">
      <el-input placeholder="请输入名称搜索"
        v-model.trim="name"
        clearable
        icon="h-icon-search"
        :on-icon-click="handleIconClick"
        :clear-icon-click="clearIconClick"
        @keyup.enter.native="handleIconClick">
        <el-select v-model="group" slot="prepend" placeholder="请选择分组" @change="groupChange">
          <el-option label="全部" value="all"></el-option>
        <el-option v-for="opt in groupOpts" :key="opt.value" :value="opt.value" :label="opt.label"></el-option>
        </el-select>
      </el-input>
      <template v-if="iconType==='common'">
        <el-select
          class="iconQueryBarSelect"
          v-model="department"
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
    <icon-container :iconList.sync="iconList"></icon-container>
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
import {iconData} from './mockData.js'
import getUUID from '../../quick-fill/text-fill/uuid.js'
import { VisionOpts } from './config.js'
import { iconApi } from '@/api'
export default {
  name: 'icons',
  props: {
    iconType: {
      type: String,
      default: 'common'
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
      group: 'all',
      department: '',
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
  methods: {
    getIconList () {
      this.iconList = iconData.sort(function randomSort (a, b) { return Math.random() > 0.5 ? -1 : 1 }).map(item => ({...item, id: getUUID()}))
    },
    /** 获取分组信息 获取后台接口 */
    async getGroups (customParams) {
      try {
        const {data = []} = await iconApi.getGroupList({params: {deptId: 1, isPublic: true}})
        this.groupOpts = data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
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
    getVisions () {
      this.visionOpts = VisionOpts
    },
    /** 分组发生变化 */
    groupChange (val) {
      console.log('分组发生变化', val)
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
    width: 20%;
  }
  .vision{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: left;
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
