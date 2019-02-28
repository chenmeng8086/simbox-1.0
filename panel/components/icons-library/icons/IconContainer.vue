<template>
  <div class="iconListContainer">
    <ul class="box">
      <li
        :class="item.className"
        v-for="item in iconList"
        :id="item.iconId"
        :key="item.iconId"
        @click="clickIcon(item)"
        draggable="true"
        @dragend="dragend(item)"
      >
        <span v-html="item['svg']"></span>
      </li>
    </ul>
    <IconPopUp
      ref="iconPopUp"
      :visible="visible"
      :iconItem="iconItem"
      @sizeChange="sizeChange"
      @colorChange="colorChange"
    />
  </div>
</template>
<script>
import IconPopUp from './IconPopUp'
import {defaultColor, defaultSize} from './config.js'
export default {
  name: 'iconsContainer',
  props: {
    iconList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    IconPopUp
  },
  data () {
    return {
      iconItem: {id: '', class: ''},
      visible: false,
      color: defaultColor,
      size: defaultSize
    }
  },
  methods: {
    /** 点击图标 */
    clickIcon: function (item) {
      const {iconId} = item
      this.$data.visible = true
      this.iconItem = item
      const iconList = this.iconList.map(item => {
        if (item.iconId === iconId) return {...item, className: 'selectedClick'}
        return {...item, className: '', color: defaultColor}
      })
      this.$emit('update:iconList', iconList)
      // color和size设置为默认值
      this.$refs.iconPopUp.setDefault()
    },
    /** 拖拽效果 */
    dragend: function (item) {
      window.postMessage('onDragIcons', item)
    },
    /** 尺寸大小发生变化时 */
    sizeChange (selectedItem) {
      const {iconId} = selectedItem
      const iconList = this.iconList.slice().map(item => {
        if (item.iconId === iconId) return {...item, ...selectedItem, color: this.color, className: 'selectedClick'}
        return {...item}
      })
      this.size = selectedItem.size
      this.$emit('update:iconList', iconList)
    },
    /** 颜色发生变化时 */
    colorChange (selectedItem) {
      const {iconId} = selectedItem
      const iconList = this.iconList.slice().map(item => {
        if (item.iconId === iconId) return {...item, ...selectedItem, size: this.size, className: 'selectedClick'}
        return {...item}
      })
      const color = selectedItem.color
      this.color = color
      this.$emit('update:iconList', iconList)
      // 修改path的填充
      // const pathNodeArr = document.getElementById(iconId).getElementsByTagName('path')
      // for (let i = 0; i < pathNodeArr.length; i++) {
      //   pathNodeArr[i].setAttribute('fill', color)
      // }
    }
  }
}
</script>
<style lang="less" scoped>
  .iconListContainer{
    margin-top: 20px;
    overflow: auto;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 52px;
      background-color:#F5F6F8;
      border: 1px solid #fff;
      height: 52px;
      line-height: 52px;
      border-radius: 6px;
      margin-right: 12px;
      margin-bottom: 12px;
      /deep/svg{
        width: 21px!important;
        height: 21px!important;
        vertical-align: middle!important;
      }
    }
  }
  .selectedClick{
    border: 1px solid #3C99FC!important;
    background-color: #FFF!important;
  }
</style>
