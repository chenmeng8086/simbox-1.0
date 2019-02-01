<template>
  <div id="app">
    <ul :class="[!isFold ? 'displayBlock' : 'displayNone', 'left']">
      <li v-for="(item, index) in config" :key="item.value" :tabindex="index" @click="click(item)" :class="_router()===item.router? 'selectedColor' : ''">
        {{item.label}}
      </li>
    </ul>
    <div class="center" @mouseover="mouseover" @mouseout="mouseout">
      <p
        :class="[isArrow ? 'displayBlock' : 'displayNone', 'arrow']"
        @click="arrowClick">
      </p>
    </div>
    <div class="right"><router-view/></div>
  </div>
</template>

<script>
const config = [{
  label: '组件库',
  value: 'symbol',
  router: '/components'
}, {
  label: '图标库',
  value: 'icon',
  router: '/icons'
}, {
  label: '快填',
  value: 'quickFill',
  router: '/quickFill'
}, {
  label: '交流群',
  value: 'communicate'
}]
export default {
  name: 'App',
  data () {
    return {
      config,
      className: '',
      isArrow: false,
      isFold: false
    }
  },
  watch: {
  },
  computed: {
    // _router: function () {
    //   return this.$router.currentRoute.fullPath
    // }
  },
  methods: {
    click: function (item) {
      const {value, router} = item
      if (value === 'communicate') {
        window.postMessage('onOpenUrl', 'https://www.baidu.com/')
        return
      }
      this.$router.push(router)
      // this.className = 'selectedColor'
    },
    _router: function () {
      return this.$router.currentRoute.fullPath
    },
    mouseover () {
      this.isArrow = true
    },
    mouseout () {
      this.isArrow = false
    },
    arrowClick () {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang="less" scoped>
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
.left{
  width: 10%;
  flex: 0 0 auto;
  background-color: #f2f2f2;
  li{
    height: 15%;
    text-align: center;
    line-height: 60px;
  }
  .selectedColor{
    color:#2080f7;
    font-weight: bold;
  }

}
.center{
  width: 1%;
  flex: 0 0 auto;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .arrow{
    width: 8px;
    border-radius: 4px;
    height: 30%;
    background-color:#2c3e50;
    margin: 0;
  }
}
.right{
  flex: 1 1 auto;
  position: relative;
  height: 100%;
  padding: 2%;
}
.displayBlock{
  display: block;
}
.displayNone{
  display: none;
}
</style>
