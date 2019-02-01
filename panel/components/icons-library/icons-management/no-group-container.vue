<template>
  <div class="noGroupContainer">
    <p>这里太空旷，快来上传第一个图标库吧</p>
    <el-button type="primary" @click="addGroupClick">新建分组</el-button>
    <add-group-dialog ref="addParam" @okClick="okClick"></add-group-dialog>
  </div>
</template>
<script>
import AddGroupDialog from './add-group-dialog'
export default {
  name: 'no-group-container',
  components: {
    AddGroupDialog
  },
  methods: {
    addGroupClick () {
      this.$refs.addParam.showDialog({mode: 'add'})
    },
    okClick (form) {
      this.$emit('addClick', form)
    }
  }
}
</script>
<style lang="less" scoped>
  .noGroupContainer{
    text-align: center;
  }
</style>
