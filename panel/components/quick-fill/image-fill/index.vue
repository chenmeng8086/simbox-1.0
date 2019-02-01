<template>
  <div class="container">
    <el-scrollbar
    wrap-class="el-demo2-scrollbar__wrap"
    view-class="el-demo2-scrollbar__view"
    tag="ul">
      <Container @drop="onDrop" :get-ghost-parent="getGhostParent">
        <Draggable v-for="item in config" :key="item.type">
          <div class="draggable-item" @click="click(item)">
            <i :class="item.icon"></i>
            <span>{{item.label}}</span>
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
      config
    }
  },
  methods: {
    click (item) {
      window.postMessage('onImageFill', item)
    },
    addClick () {
      this.$refs.addImage.showDialog({mode: 'add'})
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
  background-color: #ededed;
  text-align: left;
  .smooth-dnd-draggable-wrapper{
    height: 48px;
    background-color: #fff;
    line-height: 48px;
    margin-bottom: 4px;
  }
  .text{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color:#fff;
    margin-top: 10px;
  }
  .toolbar{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: center;
    background-color: #ededed;
    height: 36px;
    line-height: 36px;
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
  /deep/.el-demo2-scrollbar__wrap {
    max-height: 500px;
  }
}
</style>
