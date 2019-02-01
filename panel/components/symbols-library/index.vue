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
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <component :is="currentTab" :department="department"></component>
  </div>
</template>
<script>
import { Tabs } from './config.js'
import symbols from './symbols/index'
import symbolsManagement from './symbols-management/index'
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
    symbolsManagement
  },
  created () {
    this.getDepartment()
  },
  methods: {
    getDepartment () {
      this.departmentOpts = [{label: 'BBG', value: 'BBG'}, {label: 'PBG', value: 'PBG'}]
    },
    handleTabClick (tab, event) {
      const { name } = tab
      this.currentTab = name
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
