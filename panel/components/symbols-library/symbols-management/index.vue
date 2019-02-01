<template>
  <el-scrollbar
  wrap-class="el-demo2-scrollbar__wrap"
  view-class="el-demo2-scrollbar__view">
  <template v-if="display === 'tree'">
    <div class="tree-wrap">
      <el-tree
        :data.sync="simpleData"
        node-key="id"
        parent-key="pId"
        :props="defaultProps"
        ref="simpleTree"
        simple-data
        show-checkbox
        @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data, store }">
            <span>
              <span>{{ node.label }}</span>
            </span>
            <span class="custom-tree-btn">
              <el-button size="mini" @click="() => downClickSingle(store, data)">下载</el-button>
              <el-button size="mini" @click="() => downClickAgain(store, data)">已下载</el-button>
            </span>
          </span>
        </el-tree>
    </div>
    </template>
    <template v-else>
      <div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A">
            <div class="hello">hello</div>
          </el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </div>
    </template>
    <div class="toolbar">
      <p class="left">
        <template v-if="display === 'card'">
          <i class="h-icon-menu_leftbar" @click="tableClick"></i>
        </template>
        <template v-else>
          <i class="h-icon-menu_panel" @click="cardClick"></i>
        </template>
      </p>
      <p class="right">
        <i class="h-icon-trashcan"></i>
        <i class="h-icon-plus" @click="addClick"></i>
        <i class="h-icon-download"></i>
        <i class="h-icon-upload" @click="uploadClick"></i>
      </p>
    </div>
    <add-file ref="addFile"></add-file>
    <upload-file ref="uploadFile"></upload-file>
  </el-scrollbar>
</template>
<script>
import addFile from './add-file'
import uploadFile from './upload-file'
export default {
  name: 'symbolsManagement',
  props: {
    department: String
  },
  components: {
    addFile,
    uploadFile
  },
  data () {
    return {
      display: 'tree',
      simpleData: [{
        id: 1,
        label: '表格组件库'
      }, {
        id: 4,
        pId: 1,
        label: '表格头'
      }, {
        id: 9,
        pId: 4,
        label: '表头一'
      }, {
        id: 10,
        pId: 4,
        label: '表头二'
      }, {
        id: 2,
        label: '导航组件库'
      }, {
        id: 5,
        pId: 2,
        label: '导航一'
      }, {
        id: 6,
        pId: 2,
        label: '导航二'
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      },
      checkList: ['选中且禁用', '复选框 A']
    }
  },
  methods: {
    getCheckedNodes_simple () {
      console.log(this.$refs.simpleTree.getCheckedNodes())
    },
    getCheckedKeys_simple () {
      console.log(this.$refs.simpleTree.getCheckedKeys())
    },
    handleNodeClick () {

    },
    addClick () {
      this.$refs.addFile.showDialog({mode: 'add'})
    },
    uploadClick () {
      this.$refs.uploadFile.showDialog({})
    },
    downClickSingle () {

    },
    downClickAgain () {

    },
    tableClick () {
      this.display = 'tree'
    },
    cardClick () {
      this.display = 'card'
    }

  }
}
</script>
<style lang="less" scoped>
  .toolbar{
    position: fixed;
    bottom: 4px;
    width: 100%;
    text-align: center;
    background-color: #ededed;
    height: 36px;
    line-height: 36px;
    display: flex;
    .left{
      width: 20%;
      margin: 0;
      height: 100%;
      line-height: 36px;
      flex: 0 0 auto;
    }
    .right{
      flex: 1 1 auto;
      line-height: 36px;
      margin: 0;
      height: 100%;
      // text-align: right;
    }
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
  /deep/.el-demo2-scrollbar__wrap {
    max-height: 500px;
  }
  .tree-wrap{
    text-align: left;
    /deep/.el-tree-node__content{
      // .el-checkbox{
      //   display: none;
      // }
    }
  }
  .hello{
    width: 100px;
    height: 100px;
    border: 1px solid red;
  }
</style>
