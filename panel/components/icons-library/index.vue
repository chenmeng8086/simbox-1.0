<template>
  <div class="iconsLibraryContainer">
    <el-radio-group v-model="isPublic" class="iconType" @change="iconTypeChange">
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
    <component :is="currentTab" :isPublic="isPublic" :currentTab="currentTab"></component>
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
      isPublic: true
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
    iconTypeChange (val) {
      this.currentTab = 'icons'
    }
  }
}
</script>
<style lang="less" scoped>
.iconsLibraryContainer{
  margin-top: 12px;
  .iconType{
    /deep/.el-radio__inner{
      display: none;
    }
    /deep/.is-checked{
      font-weight: bold;
      background: #F5F6F8;
      border-radius: 4px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #50545D;
      line-height: 21px;
    }
    /deep/.el-radio{
      width: 100px;
      height: 28px;
      line-height: 28px;
    }
    /deep/.el-radio__label{
      font-size: 14px;
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
