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
    <!-- <div class="container">
      <enhanced-el-tree
        tree-node-wrapper-class="hello"
        horizontal
        show-checkbox
        node-key="id"
        :data="data"
      ></enhanced-el-tree>
      <el-cascader
        placeholder="试试搜索：指南"
        :options="options"
        filterable
        change-on-select
      ></el-cascader>
    </div> -->
  </el-scrollbar>
</template>
<script>
import {symbolsRecords} from './config.js'
import EnhancedElTree from '@xlaoyu/enhanced-el-tree'
import getUUID from '../../../utils/uuid.js'
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
      options: [],
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
    // console.log('sy', this.symbolsRecords)
    // const data = this.formDataRecords()
    // console.log('data', JSON.stringify(data))
    // var tree = new TreeUtil(data, 'id', 'parent')
    // this.options = tree.toTree()
    // console.log(tree.toTree())
  },
  // watch: {
  //   records: function () {
  //     const data = this.formDataRecords()
  //     var tree = new TreeUtil(data, 'id', 'parent')
  //     this.options = tree.toTree()
  //     console.log(tree.toTree())
  //   }
  // },
  methods: {
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    },
    findItemByName (arr, name) {
      return arr.filter(item => item.name === name)
    },
    formDataRecords (records) {
      const _records = this.symbolsRecords
      var arr = []
      console.log('_records', _records)
      _records.forEach((item, idx) => {
        const {id, name} = item
        const _names = name.split('/')
        const len = _names.length
        if (idx === 0) {
          const idsArr = new Array(len).fill('0').map(item => getUUID())
          for (let i = 0; i < len; i++) {
            arr.push({
              parent: i === 0 ? 0 : idsArr[i - 1],
              id: i === len - 1 ? id : idsArr[i],
              name: _names[i]
            })
            console.log('----------arr---------', arr)
          }
        }

        console.log(arr)
        // 需要判断是否在arr中

        for (let i = 0; i < len; i++) {
          const idsArr = new Array(len).fill('0').map(item => getUUID())
          const findItemByName = arr.find(item => item.name === _names[i]) || {}
          // 如果不存在时候
          if (!findItemByName.id) {
            // 找出他的父节点
            const name = _names[i]
            const pName = _names[i - 1]
            const findPItemByName = arr.find(item => item.name === pName) || {}
            arr.push({
              parent: i === 0 ? 0 : findPItemByName.id,
              id: i === len - 1 ? id : idsArr[i],
              name
            })
          }
        }
      })
      return arr
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
