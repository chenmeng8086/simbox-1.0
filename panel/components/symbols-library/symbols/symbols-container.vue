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
  <div>
    <template v-if="display==='list'">
      <ul>
        <li v-for="item in currentChildren" :key="item.id" @click="itemClick">
          {{item.label}}
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="childrenContainer">
        <div class="top">hello</div>
        <div class="bottom">
          world
        </div>
      </div>
    </template>
  </div>
   <!-- <tree-horizontal :data="options" :id="currentTab"></tree-horizontal> -->
  </el-scrollbar>
</template>
<script>
import {symbolsRecords, TreeUtil} from './config.js'
import EnhancedElTree from '@xlaoyu/enhanced-el-tree'
import getUUID from '../../../utils/uuid.js'
import TreeHorizontal from './tree-horizontal'
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
      data: symbolsRecords,
      display: 'list'
    }
  },
  created () {
    const symbolsRecords = [{name: '文字/禁用文字/左/W55%', id: '1'},
      {name: '文字/二级标题/文字/左/W45%', id: '2'},
      {name: '文字/禁用文字/左/W35%', id: '3'},
      {name: '文字/禁用文字/左/W65%', id: '4'}]
    const data = this.formDataRecordsNew(symbolsRecords)
    console.log('data处理过后的', JSON.stringify(data))
  },
  computed: {
    currentChildren () {
      const data = this.options.find(item => item.id === this.currentTab) || {}
      return data.children
    }
  },
  watch: {
    records: function () {
      // this.str = JSON.stringify(this.records)
      const data = this.formDataRecords()
      // this.str = JSON.stringify(data)
      var tree = new TreeUtil(data, 'id', 'parent')
      var _data = tree.toTree()
      this.options = _data
    }
  },
  methods: {
    handleNodeClick (data) {
    },
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      this.display = 'list'
    },
    itemClick () {
      this.display = 'breadcrumb'
    },
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    },
    findItemByName (arr, name) {
      return arr.filter(item => item.name === name)
    },
    getParentId (names, i, obj, idsArr) {
      if (i === 0) return 0
      const parentName = names[i - 1]
      const parentItem = Object.values(obj).find(item => item.label === parentName) || {}
      if (parentItem.id) return parentItem.id
      return idsArr[i - 1]
    },
    formDataRecordsNew (records) {
      const _records = records
      var obj = {}
      _records.forEach((item, idx) => {
        const {id, name} = item
        const _names = name.split('/')
        const len = _names.length
        _names.forEach((_item, _idx) => {
          const idsArr = new Array(len).fill('0').map(item => getUUID())
          // 判断是否在
          let parentId = this.getParentId(_names, _idx, obj, idsArr)
          let label = _names[_idx]
          let _id = _idx === len - 1 ? id : idsArr[_idx]
          obj[`${parentId}_${label}`] = {
            parent: parentId,
            id: _id,
            label
          }
        })
      })
      return Object.values(obj)
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
  .childrenContainer{

  }
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
