<template>
  <div class="quickFillContainer">
    <el-tabs v-model="currentTab" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabs"
        :label="item.label"
        :name="item.value"
        :key="item.value">
      </el-tab-pane>
    </el-tabs>
    <component :is="currentTab"></component>
  </div>
</template>
<script>
import { Tabs } from './config.js'
import textFill from './text-fill/index'
import imageFill from './image-fill/index'
export default {
  name: 'quickFill',
  data () {
    return {
      tabs: Tabs,
      currentTab: 'textFill'
    }
  },
  components: {
    textFill,
    imageFill
  },
  methods: {
    tabClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      if (name === 'symbols') {
        window.postMessage('onTabClick', name)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .quickFillContainer{
    position: relative;
    /deep/.el-tabs{
      display: flex;
      justify-content: center;
    }
  }
</style>
