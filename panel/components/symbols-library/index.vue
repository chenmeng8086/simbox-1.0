<template>
  <div class="symbolsContainer">
    <div class="header">
      <el-tabs v-model="currentTab" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="item in tabs"
          :label="item.label"
          :name="item.value"
          :key="item.value">
        </el-tab-pane>
      </el-tabs>
      <div class="department">
        <el-select
          class="iconQueryBarSelect"
          v-model="department"
          placeholder="请选择">
          <el-option
            v-for="item in departmentOpts"
            :key="item.id"
            :label="item.initial"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="upload" @click="batchUploadPicture"><svg-icon iconClass="document"></svg-icon></div>
    </div>
    <component :is="currentTab" :department="department"></component>
    <batch-upload-picture ref="batchUploadPicture"></batch-upload-picture>
  </div>
</template>
<script>
import { Tabs } from './config.js'
import symbols from './symbols/index'
import symbolsManagement from './symbols-management/index'
import { iconApi } from '@/api'
import batchUploadPicture from './bacth-upload-pictures'
export default {
  name: 'iconsLibraryTabs',
  data () {
    return {
      tabs: Tabs,
      currentTab: 'symbols',
      department: '',
      options: [],
      departmentOpts: []
    }
  },
  components: {
    symbols,
    symbolsManagement,
    batchUploadPicture
  },
  created () {
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
    handleTabClick (tab, event) {
      const { name } = tab
      this.currentTab = name
    },
    batchUploadPicture () {
      this.$refs.batchUploadPicture.showDialog({mode: 'add'})
    }
  }
}
</script>
<style lang="less" scoped>
  .symbolsContainer{
    .header{
      overflow: hidden;
      /deep/.el-tabs{
        width: 40%;
        float: left;
      }
      .upload{
        width: 5%;
        float: right;
        margin-top: 16px;
      }
      .department{
        width: 20%;
        float: right;
        margin-top: 10px;
        .iconQueryBarSelect{
          /deep/.el-input{
            input {
              border: 0;
              background: transparent;
            }
          }
        }
      }
    }
  }
</style>
