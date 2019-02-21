<template>
  <div class="IconPopUp" :class="{iconActive: visible}">
    <div class="left">
      <span v-html="iconItem['svg']"></span>
    </div>
    <div class="center">
      <p class="name">{{iconItem.name}}</p>
      <p class="library">{{iconItem.library}}</p>
      <p class="person">{{`上传人：${iconItem.uploadUser}`}}</p>
      <p class="time">{{iconItem.uploadTime}}</p>
    </div>
    <div class="right">
      <el-color-picker v-model="iconColor" @change="colorChange"></el-color-picker>
      <el-select v-model="iconSize" placeholder="请选择" class="size" @change="selectChange" color-format="rgb">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import {sizeOpts, defaultColor, defaultSize} from './config.js'
export default {
  name: 'iconPopUp',
  props: {
    visible: Boolean,
    iconItem: Object
  },
  data () {
    return {
      options: sizeOpts,
      iconColor: defaultColor,
      iconSize: defaultSize
    }
  },
  methods: {
    selectChange (val) {
      this.$emit('sizeChange', {...this.iconItem, size: val})
    },
    colorChange (val) {
      this.$emit('colorChange', {...this.iconItem, color: val})
    },
    setDefault () {
      this.iconColor = defaultColor
      this.iconSize = defaultSize
    }
  }
}
</script>
<style lang="less" scoped>
  .IconPopUp{
    padding: 8px;
    text-align: left;
    position:fixed;
    bottom: 36px;
    width: 100%;
    height: 105px;
    background-color: #fff;
    display: none;
  }
  .iconActive{
    display: block;
    display: flex;
  }
  .left{
    width: 30%;
    height: 100%;
    flex: 0 0 auto;
    text-align: center;
    line-height: 92px;
    /deep/svg{
      width: 3em!important;
      height: 3em!important;
    }
  }
  .center{
    width: 30%;
    height: 100%;
    flex: 0 0 auto;
    p{
      margin: 0 0;
      line-height: 20px;
    }
    .name{
      font-weight: bold;
      font-size: 14px;
    }
    .library{
      font-weight: bold;
    }
  }
  .right{
    width: 30%;
    height: 100%;
    flex: 1 1 auto;
    overflow: hidden;
    .size{
      margin-top: 12px;
      width: 48%;
      display: block;
    }
    /deep/.el-color-picker{
      width: 48%;
      .el-color-picker__trigger{
        width: 100%;
      }
      /deep/.el-color-picker__icon{
        float: right;
        line-height: 36px;
      }
    }
  }
</style>
