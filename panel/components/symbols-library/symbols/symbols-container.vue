<template>
  <div>
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
        <!-- 第一层children -->
        <ul class="firstChildren">
          <li class="bottomItem" v-for="item in currentChildren" :key="item.id">
            <template v-if="!item['is_leaf']">
              <span @click="nodeContentClick(item)">{{item.name}}</span>
            </template>
            <template v-else>
              <span class="leaf" @mouseenter="mouseenter(item)" @mouseleave="mouseleave">{{item.name.split('_')[0]}}</span>
              <p class="picture" :class="{active: activeId === item.id, noActive: activeId !== item.id}"><img src="../../../assets/logo.png"/></p>
            </template>
            <template v-if="!item['is_leaf']">
              <span class="svg"><svg-icon iconClass="expand"></svg-icon></span>
            </template>
          </li>
        </ul>
      </template>
      <!-- children的children -->
      <template v-else>
        <div class="childrenContainer">
          <div class="top">
            <span v-for="(item, idx) in parentRecords" :key="item.id" @click="nodeContentClick(item)">
              {{item.name}}
              <i v-if="idx !==parentRecords.length-1">></i>
            </span>
          </div>
          <div class="bottom">
            <ul>
              <li class="bottomItem" v-for="item in content" :key="item.id">
                <template v-if="!item['is_leaf']">
                  <span @click="nodeContentClick(item)">{{item.name}}</span>
                  <span class="svg"><svg-icon iconClass="expand"></svg-icon></span>
                </template>
                <template v-else>
                  <p class="leaf" draggable="true" @dragend="dragend(item)" @mouseenter="mouseenter(item)" @mouseleave="mouseleave">{{item.name.split('_')[0]}}</p>
                  <p class="picture" :class="{active: activeId === item.id, noActive: activeId !== item.id}"><img src="../../../assets/logo.png"/></p>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {TreeUtil} from './config.js'
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
      currentTab: '',
      options: [],
      children: [],
      display: 'list',
      parentRecords: [],
      content: [],
      originData: [],
      activeId: ''
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
      const parallelData = this.process_symbols(this.records.slice())
      const freezeData = parallelData.slice()
      this.originData = freezeData
      const tree = new TreeUtil(freezeData.slice(), 'id', 'parent_id')
      const treeData = tree.toTree()
      this.options = treeData
    }
  },
  methods: {
    getTitle (selectedItem) {
      let str = selectedItem.name
      const data = this.originData
      const _item = data.find(item => item.id === selectedItem.id) || {}
      let parentId = _item['parent_id']
      let arr = [selectedItem]
      while (parentId !== 0) {
        const _selectedItem = data.find(item => item.id === parentId) || {}
        str = `${_selectedItem.name}/${str}/`
        arr.push(_selectedItem)
        parentId = _selectedItem['parent_id'] || 0
      }
      return arr.filter(item => item['parent_id'] !== 0).reverse()
    },
    mouseenter (item) {
      this.activeId = item.id
    },
    mouseleave () {
      this.activeId = ''
    },
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      this.display = 'list'
    },
    nodeContentClick (item) {
      this.display = 'breadcrumb'
      const selectedItem = this.deepQuery(this.options, item.id)
      this.content = selectedItem.children
      this.parentRecords = this.getTitle(selectedItem)
    },
    dragend (item) {
      const {name} = item
      const id = name.split('_')[1]
      const libraryID = this.records[0].libraryID
      const dragItem = {name, id, libraryID}
      window.postMessage('onDragSymbol', dragItem)
    },
    findItemByName (arr, name) {
      return arr.filter(item => item.name === name)
    },
    deepQuery (tree, id) {
      let isGet = false
      let retNode = null
      function deepSearch (tree, id) {
        for (let i = 0; i < tree.length; i++) {
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
      let destDict = {}
      for (let i = 0; i < params.length; i++) {
        let tmp = params[i]
        let tmpStr = tmp['name'] + '_' + tmp['id']
        let tmpArr = tmpStr.split('/')
        let parentId = 0
        let id = getUUID()
        for (let j = 0; j < tmpArr.length; j++) {
          let tmpKey = `${parentId}_${tmpArr[j]}`
          let isLeaf = j === tmpArr.length - 1
          let tmpVal = {'id': id, 'parent_id': parentId, 'name': tmpArr[j], 'is_leaf': isLeaf}
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
  /deep/.el-tabs__header{
    margin: 0px;
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
  .noLeaf{
    cursor:pointer
  }
  .firstChildren{
    text-align: left;
    position: relative;
  }
  .childrenContainer{
    text-align: left;
    .top{
      display: flex;
      background: #FBFBFB;
      height: 32px;
      line-height: 32px;
      span{
        display: inline-block;
        width: 70px;
        text-align: center;
      }
      // span:nth-child(n+2)::before {
      //   content: '>';
      // }
      span:nth-last-child(1){
        color: #3C99FC;
      }
      cursor:pointer
    }
  }
  .active{
    display: block;
  }
  .noActive{
    display: none;
  }
  .bottomItem{
    line-height: 40px;
    position: relative;
    .svg{
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
    .picture{
      position: absolute;
      top: 0;
      left: 60px;
      width: 300px;
      height: 300px;
      border: 1px solid rgb(204, 204, 204);
      text-align: center;//图片水平居中
      padding-top: 50px;
    }
  }
</style>
