<template>
  <div>
    <div class="iconQueryBar">
      <el-input
        placeholder="请输入名称搜索"
        v-model.trim="name"
        clearable
        icon="h-icon-search"
        :on-icon-click="handleIconClick"
        :clear-icon-click="clearIconClick"
        @keyup.enter.native="handleIconClick">>
        <el-select v-model="group" slot="prepend" placeholder="请选择分组" @change='groupChange'>
          <el-option label="第一分组" value="1"></el-option>
        </el-select>
      </el-input>
    </div>
    <symbols-container :records="records"></symbols-container>
    <div class="vision">
      <label class="label">当前版本：</label>
      <el-select
        v-model="version"
        @change="visionChange"
        placeholder="请选择当前版本">
        <el-option
          v-for="item in VisionOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import SymbolsContainer from './symbols-container'
import {VisionOpts, IconQueryBarOption} from './config.js'
export default {
  name: 'symbols',
  props: {
    department: String
  },
  components: {
    SymbolsContainer
  },
  data () {
    return {
      VisionOpts,
      options: IconQueryBarOption,
      records: [{id: '1', name: '22'}],
      version: '--',
      name: '',
      group: ''
    }
  },
  watch: {
    department: function () {
      /** name group vision department */
      this.getSymbols()
    }
  },
  created () {
    this.getSymbols()
  },
  methods: {
    getSymbols (e) {
      // // this.$emit('search', arr)
      window.postMessage('onTabClick', e)
      const _this = this
      window.setRandomNumber = function (arr = []) {
        _this.records = arr
      }
    },
    visionChange (val) {
      this.getSymbols()
    },
    /** 名称发生变化 */
    handleIconClick () {
      this.getSymbols()
    },
    /** 清除名称后 */
    clearIconClick () {
      this.name = ''
      this.getSymbols()
    },
    groupChange (val) {
      this.getSymbols()
    }
  }
}
</script>
<style lang="less" scoped>
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
  .iconQueryBar{
    display: flex;
    /deep/.el-input-group{
      width: 70%;
    }
    margin-bottom: 12px;
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
</style>
