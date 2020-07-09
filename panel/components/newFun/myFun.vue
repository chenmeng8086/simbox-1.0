<template>
  <div>
    123
  </div>
</template>
<script>
export default {
  name: '',
  data () {
  },
  components: {
  },
  methods: {
    handleClick (tab, event) {
      const { name } = tab
      this.currentTab = name
      if (name === 'symbols') {
        window.postMessage('onTabClick', name)
      }
    },
    iconTypeChange (val) {
      this.currentTab = 'icons'
    }
  }
}
</script>
<style lang="less" scoped>
</style>
