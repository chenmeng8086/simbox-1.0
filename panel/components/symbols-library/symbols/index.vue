<template>
  <div class="symbolContainer">
    <div class="iconQueryBar">
      <el-input
        placeholder="请输入名称搜索"
        v-model.trim="name"
        clearable
        icon="h-icon-search"
        :on-icon-click="handleIconClick"
        :clear-icon-click="clearIconClick"
        @keyup.enter.native="handleIconClick">>
        <!--改-->
        <!--<el-select v-model="group" slot="prepend" placeholder="请选择分组" @change='groupChange'>
          <el-option label="第一分组" value="1"></el-option>
        </el-select>-->
        <el-select v-model="value" slot="prepend" placeholder="请选择分组" @change='groupChange'>
          <el-option v-for="group in groups" :key="group.value" :label="group.label" :value="group.value"></el-option>
        </el-select>
      </el-input>
    </div>
    <el-scrollbar
      wrap-class="scrollbar__wrap"
      view-class="scrollbar__view"
    >
      <symbols-container :records="records"></symbols-container>
      <div class="vision">
        <label class="label">当前版本</label>
        <el-select
          v-model="version"
          @change="visionChange"
          placeholder="">
          <el-option
            v-for="item in VisionOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-scrollbar>
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
      records: [],
      // 改
      // version: '--',
      version: 'v2.1.0',
      name: '',
      // group: '',
      value: '分组一',
      groups: [{
        label: '分组一', value: 'value1'
      }, {
        label: '分组二', value: 'value2'
      }],
      Tabs: []
    }
  },
  watch: {
    department () {
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
  .symbolContainer{
    transform: scale(1);
    height: 100%;
  }
  .vision{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: left;
    /*padding-right: 0 !important;*/
    background-color: #fff;
    .label{
      display: inline-block;
      /*width: 30%;*/
    }
    /deep/.el-select{
      /*border: red 1px solid;*/
      display: inline-block;
      width: 20%;
      /*width: 10px;*/
      input{
        border: 0;
        background: transparent;
      }
    }
  }
  .iconQueryBar{
    display: flex;
    /deep/.el-input-group{
      width: 90%;
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
    width: 40%;
  }
  /deep/.scrollbar__wrap {
    height: 490px;
    width: 400px;
  }
</style>
