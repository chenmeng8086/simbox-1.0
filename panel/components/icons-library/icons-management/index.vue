<template>
  <div>
    <query-bar :iconType="iconType"></query-bar>
    <template v-if="records.length === 0">
      <no-group-container @addClick="addClick"></no-group-container>
    </template>
    <template v-else>
      <group-container :records="records"></group-container>
    </template>
    <div class="toolbar">
      <i class="h-icon-trashcan"></i>
      <i class="h-icon-download"></i>
      <i class="h-icon-plus"></i>
      <i class="h-icon-edit"></i>
    </div>
  </div>
</template>
<script>
import QueryBar from './query-bar'
import NoGroupContainer from './no-group-container'
import GroupContainer from './group-container'
import getUUID from '../../quick-fill/text-fill/uuid.js'
export default {
  name: 'iconsMangement',
  props: {
    iconType: {
      type: String,
      default: 'common'
    }
  },
  components: {
    QueryBar,
    NoGroupContainer,
    GroupContainer
  },
  data () {
    return {
      records: []
    }
  },
  methods: {
    addClick: function (form) {
      this.records = this.records.concat(new Array({id: getUUID(), name: form.name}))
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
    i {
      display: inline-block;
      width: 36px;
      height: 36px;
    }
  }
</style>
