<template>
  <ul>
    <li v-for="item in records" :key="item.id">

    </li>
  </ul>
</template>
<script>
export default {
  name: 'iconsMangement',
  props: {
    iconType: {
      type: String,
      default: 'common'
    }
  },
  data () {
    return {
      records: []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
