<template>
  <div class="IconContainer">
    <el-scrollbar
    wrap-class="el-demo2-scrollbar__wrap"
    view-class="el-demo2-scrollbar__view"
    tag="ul">
     <ul class="box">
      <li
        v-for="item in iconList"
        :key="item.id"
        @click="clickIcon(item)"
        draggable="true"
        @dragend="dragend(item)"
        :class="item.className"
      >
        <span v-html="item['show_svg']" :style="{color: item.color}"></span>
      </li>
    </ul>
    <IconPopUp
      ref="iconPopUp"
      :visible="visible"
      :iconItem="iconItem"
      @sizeChange="sizeChange"
      @colorChange="colorChange"
    />
    </el-scrollbar>
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
      const {id} = item
      this.$data.visible = true
      this.iconItem = item
      const iconList = this.iconList.map(item => {
        if (item.id === id) return {...item, className: 'selectedClick'}
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
      const {id} = selectedItem
      console.log(selectedItem)
      const iconList = this.iconList.slice().map(item => {
        if (item.id === id) return {...item, ...selectedItem, color: this.color}
        return {...item}
      })
      this.size = selectedItem.size
      this.$emit('update:iconList', iconList)
    },
    /** 颜色发生变化时 */
    colorChange (selectedItem) {
      const {id} = selectedItem
      console.log(selectedItem)
      const iconList = this.iconList.slice().map(item => {
        if (item.id === id) return {...item, ...selectedItem, size: this.size}
        return {...item}
      })
      this.color = selectedItem.color
      this.$emit('update:iconList', iconList)
    }
  }
}
</script>
<style lang="less" scoped>
  .IconContainer{
    margin-top: 20px;
    // height: 300px;
    overflow: auto;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 15%;
      background-color: #ededed;
      border: 1px solid #fff;
      height: 5em;
      line-height: 5em;
      /deep/svg{
        width: 3em!important;
        height: 3em!important;
        vertical-align: middle!important;
      }
    }
  }
  .selectedClick{
    border: 1px solid #666!important;
  }
  /deep/.el-demo2-scrollbar__wrap {
    max-height: 400px;
  }
</style>
