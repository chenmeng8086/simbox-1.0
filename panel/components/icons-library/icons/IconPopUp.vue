<template>
  <div class="IconPopUp" :class="{iconActive: visible}">
    <div class="left">
      <span id='svg' v-html="iconItem['svg']"></span>
    </div>
    <div class="center">
      <p class="name">{{iconItem.name}}</p>
      <p class="library">{{iconItem.iconLibraryName}}</p>
      <p class="person">{{`上传人：${iconItem.uploadUser}`}}</p>
      <!-- <p class="time">{{iconItem.uploadTime}}</p> -->
    </div>
    <div class="right">
      <ul class="top">
        <li v-for="item in colorConfig" :key="item.id" @click="colorClick(item)" :style="{backgroundColor: item.color}"></li>
      </ul>
      <div class="bottom">
        <el-color-picker v-model="iconColor" @change="colorChange"></el-color-picker>
        <div class="sizeContainer">
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
    </div>
  </div>
</template>

<script>
import {sizeOpts, defaultColor, defaultSize, colorConfig} from './config.js'
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
      iconSize: defaultSize,
      colorConfig
    }
  },
  methods: {
    selectChange (val) {
      this.$emit('sizeChange', {...this.iconItem, size: val})
    },
    colorChange (val) {
      this.$emit('colorChange', {...this.iconItem, color: val})
      this.setSvgFill(val)
    },
    setDefault () {
      this.iconColor = defaultColor
      this.iconSize = defaultSize
    },
    colorClick (item) {
      const {color} = item
      this.$emit('colorChange', {...this.iconItem, color})
      this.setSvgFill(color)
    },
    setSvgFill (color) {
      const pathNodeArr = document.getElementById('svg').getElementsByTagName('path')
      for (let i = 0; i < pathNodeArr.length; i++) {
        pathNodeArr[i].setAttribute('fill', color)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .IconPopUp{
    padding: 12px 0px;
    text-align: left;
    position: fixed;
    bottom: -16px;
    left: 0px;
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
    width: 60px;
    height: 60px;
    flex: 0 0 auto;
    text-align: center;
    /deep/svg{
      width: 3em!important;
      height: 3em!important;
      margin-top: 12px;
    }
    background-image:url("../../../assets/bg.png");
    background-repeat: no-repeat;
    margin-right: 2%;
  }
  .center{
    width: 40%;
    height: 100%;
    flex: 0 0 auto;
    p{
      margin: 0 0;
      font-size: 12px;
      color: rgba(24,25,26,0.30);
      line-height: 16px;
    }
    .name{
      font-size: 14px;
      color: rgba(24,25,26,0.70);
      line-height: 17px;
    }
    .library{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      color: rgba(24,25,26,0.50);
      line-height: 26px;
    }
  }
  .right{
    width: 30%;
    height: 100%;
    flex: 1 1 auto;
    overflow: hidden;
    .bottom{
      display: flex;
      /deep/.el-color-picker{
        width: 44%!important;
        height: 32px;
        margin-right: 12px;
        .el-color-picker__trigger{
          width: 100%;
        }
        /deep/.el-color-picker__icon{
          float: right;
          line-height: 36px;
        }
        /deep/.el-color-picker__color{
          width: 18px;
          height: 18px;
        }
        flex: 0 0 auto;
      }
      .sizeContainer{
        width: 100%;
        flex: 0 0 auto;
        margin: 0;
        .size{
          width: 48%;
          display: block;
        }
        /deep/.el-input__inner{
          height: 36px;
        }
      }
    }
    .top{
      display: flex;
      margin-bottom: 12px;
      li{
        flex: 0 0 auto;
        width: 7%;
        height: 16px;
      }
    }
  }
</style>
