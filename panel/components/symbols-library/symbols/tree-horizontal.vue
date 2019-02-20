<template>
  <div>
    <div class="container" id="container">
      <ul>
        <li v-for="item in currentChildren.children" :key="item.id" :class="{active: activeId === item.id}" @click="click(item)">{{item.name}}
        </li>
      </ul>
      <template>
        <ul><li v-for="_item in currentChildren.children[0].children" :key="_item.id">{{_item.name}}</li></ul>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tree-horizontal',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    id: String
  },
  data () {
    return {
      activeId: ''
    }
  },
  computed: {
    currentChildren () {
      const _data = this.data.find(item => item.id === this.id) || {}
      console.log(_data)
      return _data
    }
  },
  methods: {
    getChildrenById () {
      const _data = this.data.find(item => item.id === this.id) || {}
      console.log(_data)
      return _data
    },
    click (item) {
      this.activeId = item.id
    }
  }
}
</script>
<style lang="less" scoped>
  .container{
    display: flex;
    ul{
      width: 100px;
      flex: 0 0 auto;
    }
    .active{
      background-color: red;
    }
  }
</style>
