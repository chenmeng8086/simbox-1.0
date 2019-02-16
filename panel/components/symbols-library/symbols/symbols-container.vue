<template>
  <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
  >
    <el-collapse accordion class="collapse">
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
  /deep/.scrollbar__wrap {
    max-height: 420px;
  }
  .collapse{
    i{
      font-style: normal!important;
    }
  }
</style>
