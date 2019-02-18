<template>
  <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
  >
    <!-- <el-collapse accordion class="collapse">
      <el-collapse-item v-for="item in records" :key="item.id">
        <template slot="title">
          <i>{{item.name}}</i>
        </template>
        <i class="h-icon-calendar"></i>
        <i draggable="true" @dragend="dragend(item)">{{item.name}}</i>
      </el-collapse-item>
    </el-collapse> -->
    <div class="container">
      <enhanced-el-tree
        tree-node-wrapper-class="hello"
        horizontal
        show-checkbox
        node-key="id"
        :data="data"
      ></enhanced-el-tree>
    </div>
  </el-scrollbar>
</template>
<script>
import {symbolsRecords} from './config.js'
import EnhancedElTree from '@xlaoyu/enhanced-el-tree'
export default {
  name: 'symbolsContainer',
  props: {
    records: Array
  },
  components: {
    EnhancedElTree
  },
  data () {
    return {
      str2: 'hello',
      str: '',
      symbolsRecords,
      data: [
        {
          id: 1,
          label: 'node-1',
          name: 'node-1',
          children: [
            {
              id: 11,
              label: 'node-11',
              children: [
                {
                  id: 111,
                  label: 'node-111'
                },
                {
                  id: 112,
                  label: 'node-112'
                },
                {
                  id: 113,
                  label: 'node-113'
                }
              ]
            },
            {
              id: 12,
              label: 'node-12'
            }
          ]
        },
        {
          id: 2,
          label: 'node-2',
          children: [
            {
              id: '21',
              label: 'node-21'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.formDataRecords()
  },
  methods: {
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    },

    formDataRecords (records) {
      const _records = this.symbolsRecords
      _records.forEach(item => {
        const {id, name} = item
        const _names = name.split('/')
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .container{
    width: 600px;
    text-align: left;
    /deep/.el-tree-node-block{
      width: 60px!important;
      min-width: 0px!important;
      border: 1px solid green;
    }
    /deep/.el-tree-node__content{
      width: 80px!important;
      border: 1px solid red;
      min-width: 0px!important;
    }
    .hello{
      background-color: blue;
    }
  }
  /deep/.scrollbar__wrap {
    height: 420px;
    width: 400px;
  }
  /deep/.collapse{
    i{
      font-style: normal!important;
    }
  }
  /deep/.el-checkbox{
    display: none;
  }
  /deep/.el-tree-node__expand-icon{
    display: none;
  }
</style>
