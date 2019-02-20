<template>
  <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
  >
  <el-tabs v-model="currentTab" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in options"
      :label="item.label"
      :name="item.id"
      :key="item.id">
    </el-tab-pane>
    </el-tabs>
    <enhanced-el-tree
    highlight-current
    ref="tree"
    horizontal
    :accordion="true"
    :data="currentChildren"
    tree-node-wrapper-class="treeNodeclass"
    @node-click="handleNodeClick"></enhanced-el-tree>
   <!-- <tree-horizontal :data="options" :id="currentTab"></tree-horizontal> -->
  </el-scrollbar>
</template>
<script>
import {symbolsRecords, TreeUtil} from './config.js'
import EnhancedElTree from '@xlaoyu/enhanced-el-tree'
import getUUID from '../../../utils/uuid.js'
import TreeHorizontal from './tree-horizontal'
import _ from 'lodash'
export default {
  name: 'symbolsContainer',
  props: {
    records: Array
  },
  components: {
    EnhancedElTree,
    TreeHorizontal
  },
  data () {
    return {
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      str2: 'hello',
      str: '',
      currentTab: '',
      symbolsRecords,
      options: [],
      children: [],
      data: [
        {
          id: '1',
          label: 'node-1',
          name: 'node-1',
          children: [
            {
              id: '11',
              label: 'node-11',
              children: [
                {
                  id: '111',
                  label: 'node-111',
                  children: [
                    {
                      id: '1111',
                      label: 'node-1111',
                      children: {
                        id: '11111',
                        label: 'node-11111'
                      }
                    }
                  ]
                },
                {
                  id: '112',
                  label: 'node-112'
                },
                {
                  id: '113',
                  label: 'node-113'
                }
              ]
            },
            {
              id: '12',
              label: 'node-12'
            }
          ]
        },
        {
          id: '2',
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
  computed: {
    currentChildren () {
      const _data = this.options.find(item => item.id === this.currentTab) || {}
      console.log(JSON.stringify(_data))
      return _data.children
    }
  },
  watch: {
    records: function () {
      // this.str = JSON.stringify(this.records)
      const data = this.formDataRecords()
      // this.str = JSON.stringify(data)
      var tree = new TreeUtil(data, 'id', 'parent')
      var _data = tree.toTree()
      this.str = JSON.stringify(_data)
      this.options = _data
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log('selected', JSON.stringify(data))
    },
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      console.log(name)
    },
    getAllCheckedKeys (keys) {
      console.log(keys, 'keys')
    },
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    },
    findItemByName (arr, name) {
      return arr.filter(item => item.name === name)
    },
    formDataRecords (records) {
      const _records = this.records
      var arr = []
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
              label: _names[i]
            })
          }
        }
        // 需要判断是否在arr中
        for (let i = 0; i < len; i++) {
          const idsArr = new Array(len).fill('0').map(item => getUUID())
          // 判断是否存在时
          const findItemByName = arr.find(item => item.label === _names[i]) || {}
          // 如果不存在时候
          if (!findItemByName.id) {
            // 找出他的父节点
            const name = _names[i]
            const pName = _names[i - 1]
            const findPItemByName = arr.find(item => item.label === pName) || {}
            arr.push({
              parent: i === 0 ? 0 : findPItemByName.id,
              id: i === len - 1 ? id : idsArr[i],
              label: name
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
  /deep/.el-tree-node-wrapper{
    width: 300px;
    border: 1px solid red;
  }
</style>
