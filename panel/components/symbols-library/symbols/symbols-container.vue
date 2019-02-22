<template>
  <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
  >
  <div>{{JSON.stringify(originData)}}</div>
  <el-tabs v-model="currentTab" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in options"
      :label="item.name"
      :name="item.id"
      :key="item.id">
    </el-tab-pane>
  </el-tabs>
  <div>
    <template v-if="display==='list'">
      <ul>
        <li v-for="item in currentChildren" :key="item.id">
          <template v-if="!item['is_leaf']">
            <span @click="nodeClick(item)">{{item.name}}</span>
          </template>
          <template v-else>
            <span style="color: red">{{item.name}}</span>
          </template>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="childrenContainer">
        <div class="top" style="color: green;border:1px solid red;">{{breadcrumbTitle}}</div>
        <div class="bottom">
          <ul>
            <li v-for="item in content" :key="item.id">
              <template v-if="!item['is_leaf']">
                <span @click="nodeContentClick(item)">{{item.name}}</span>
              </template>
              <template v-else>
                <span style="color: red">{{item.name}}</span>
              </template>
            </li>
          </ul>
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
      display: 'list',
      breadcrumbTitle: '',
      content: [],
      originData: []
    }
  },
  computed: {
    currentChildren () {
      const data = this.options.find(item => item.id === this.currentTab) || {}
      return data.children
    }
  },
  watch: {
    records: function () {
      const parallelData = this.process_symbols(this.records)
      this.originData = parallelData
      console.log(this.originData)
      const tree = new TreeUtil(parallelData, 'id', 'parent_id')
      const treeData = tree.toTree()
      this.options = treeData
      console.log(this.originData)
      console.log('hello')
    }
  },
  methods: {
    getTitle (selectedItem) {
      var str = selectedItem.name
      const data = this.originData
      console.log(data)
      const _item = data.find(item => item.id === selectedItem.id) || {}
      var parentId = _item['parent_id']
      while (parentId !== 0) {
        const _selectedItem = data.find(item => item.id === parentId) || {}
        console.log(JSON.stringify(_selectedItem))
        str = `${str}/${_selectedItem.name}`
        parentId = _selectedItem['parent_id'] || 0
      }
      return str
    },
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      this.display = 'list'
    },
    nodeClick (item) {
      this.display = 'breadcrumb'
      const selectedItem = this.deepQuery(this.options, item.id)
      this.content = selectedItem.children
      this.breadcrumbTitle = this.getTitle(selectedItem)
    },
    nodeContentClick (item) {
      this.display = 'breadcrumb'
      const selectedItem = this.deepQuery(this.options, item.id)
      console.log(this.originData, 'hello')
      this.content = selectedItem.children
      this.breadcrumbTitle = this.getTitle(selectedItem)
    },
    dragend (item) {
      window.postMessage('onDragSymbol', item)
    },
    findItemByName (arr, name) {
      return arr.filter(item => item.name === name)
    },
    deepQuery (tree, id) {
      var isGet = false
      var retNode = null
      function deepSearch (tree, id) {
        for (var i = 0; i < tree.length; i++) {
          if (tree[i].children && tree[i].children.length > 0) {
            deepSearch(tree[i].children, id)
          }
          if (id === tree[i].id || isGet) {
            isGet || (retNode = tree[i])
            isGet = true
            break
          }
        }
      }
      deepSearch(tree, id)
      return retNode
    },
    process_symbols (params) {
      var destDict = {}
      for (var i = 0; i < params.length; i++) {
        var tmp = params[i]
        var tmpStr = tmp['name'] + '_' + tmp['id']
        var tmpArr = tmpStr.split('/')
        var parentId = 0
        var id = getUUID()
        for (var j = 0; j < tmpArr.length; j++) {
          var tmpKey = `${parentId}_${tmpArr[j]}`
          var isLeaf = j === tmpArr.length - 1
          var tmpVal = {'id': id, 'parent_id': parentId, 'name': tmpArr[j], 'is_leaf': isLeaf}
          if (tmpKey in destDict) {
            parentId = destDict[tmpKey]['id']
          } else {
            destDict[tmpKey] = tmpVal
            parentId = id
            id = getUUID()
          }
        }
      }
      return Object.values(destDict)
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
