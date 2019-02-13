<template>
  <el-scrollbar
    wrap-class="el-demo2-scrollbar__wrap"
    view-class="el-demo2-scrollbar__view"
  >
    <el-collapse accordion>
      <el-collapse-item v-for="item in records" :key="item.id">
        <template slot="title">
          <i>{{item.name}}</i>
        </template>
        <i class="h-icon-calendar"></i>
        <i draggable="true" @dragend="dragend(item)">{{item.name}}</i>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>
<script>
export default {
  name: 'symbolsContainer',
  props: {
    records: Array
  },
  data () {
    return {
      str2: 'hello',
      str: ''
    }
  },
  methods: {
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    }
  }
}
</script>
<style lang="less" scoped>
  .IconContainer{
    margin-top: 20px;
    height: 300px;
    overflow: auto;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 15%;
      background-color: #ededed;
      border: 1px solid #fff;
      height: 60px;
      line-height: 60px;
    }
  }
  /deep/.el-demo2-scrollbar__wrap {
    max-height: 420px;
  }
</style>
