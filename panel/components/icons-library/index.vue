<template>
  <div class="container">
    <el-radio-group v-model="iconType" class="iconType" @change="iconTypeChange">
      <el-radio v-for="item in IconTypeOpts" :key="item.value" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in Tabs"
        :label="item.label"
        :name="item.value"
        :key="item.value">
      </el-tab-pane>
    </el-tabs>
    <component :is="currentTab" :iconType="iconType" :currentTab="currentTab"></component>
  </div>
</template>
<script>
import { IconTypeOpts, Tabs } from './config.js'
import iconManagement from './icons-management/index'
import icons from './icons/index'
export default {
  name: 'iconsLibraryTabs',
  data () {
    return {
      Tabs,
      IconTypeOpts,
      currentTab: 'icons',
      iconType: 'common'
    }
  },
  components: {
    iconManagement,
    icons
  },
  methods: {
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      if (name === 'symbols') {
        window.postMessage('onTabClick', name)
      }
    },
    search (val) {
      console.log('result' + val)
    },
    iconTypeChange (val) {
      this.currentTab = 'icons'
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  .iconType{
    /deep/.el-radio__inner{
      display: none;
    }
    /deep/.is-checked{
      color: #2080f7;
      font-weight: bold;
    }
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
}
</style>
