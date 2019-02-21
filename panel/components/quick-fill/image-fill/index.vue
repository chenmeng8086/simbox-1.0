<template>
  <div class="container">
    <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
    tag="ul">
      <Container @drop="onDrop" :get-ghost-parent="getGhostParent" drag-handle-selector=".column-drag-handle" lock-axis="y">
        <Draggable v-for="item in config" :key="item.type">
          <div @click="click(item)" @mouseover="mouseover(item)" :class='{active:item.value==activeId, dragItem: true}'>
            <svg-icon :iconClass="item.icon"></svg-icon>
            <!-- <i :class="item.icon"></i> -->
            <span class="text">{{item.label}}</span>
            <template v-if="item.value==activeId">
              <i class="h-icon-update column-drag-handle" style="float:right; padding:10px;"></i>
            </template>
          </div>
        </Draggable>
      </Container>
      <div class="toolbar">
        <i class="h-icon-plus" @click="addClick"></i>
        <i class="h-icon-edit" @click="toolbarEditClick"></i>
      </div>
      <add-image-dialog
        ref="addImage"
      ></add-image-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import {config} from './config.js'
import addImageDialog from './add-image-dialog'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '../text-fill/helper.js'
export default {
  name: 'imageFill',
  components: {
    addImageDialog,
    Container,
    Draggable
  },
  data () {
    return {
      config,
      activeId: '0'
    }
  },
  methods: {
    click (item) {
      window.postMessage('onImageFill', item)
    },
    addClick () {
      this.$refs.addImage.showDialog({mode: 'add'})
    },
    mouseover (item) {
      this.activeId = item.value
    },
    toolbarEditClick () {

    },
    getGhostParent () {
      return document.body
    },
    onDrop (dropResult) {
      this.config = applyDrag(this.config, dropResult)
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  // background-color: #ededed;
  text-align: left;
  .dragItem{
    padding: 4px 20px;
  }
  .text{
    width: 100%;
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
  }
  .toolbar{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #E6E6E6;
    background-color: #fff;
    height: 36px;
    line-height: 36px;
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
  /deep/.scrollbar__wrap {
    height: 400px;
    margin-bottom: -16px!important;
  }
  .active{
    background-color: #F5F6F8;
  }
  .text{
    font-size: 14px;
    color: rgba(24,25,26,0.90);
  }
}
</style>
