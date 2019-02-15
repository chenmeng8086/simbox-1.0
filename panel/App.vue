<template>
  <div id="app">
    <div :class="[!isFold ? 'displayBlock' : 'displayNone', 'left']">
      <div class="logo">Simbox</div>
      <p v-for="(item, index) in config" :key="item.value" :tabindex="index" @click="click(item)" :class='{selectedColor:_router() ===item.router}'>
        <i :class="item.icon"></i>{{item.label}}
      </p>
    </div>
    <div class="center" @mouseover="mouseover" @mouseout="mouseout">
      <p :class="[isArrow ? 'displayBlock' : 'displayNone', 'arrow']" @click="arrowClick"></p>
    </div>
    <div class="right"><router-view/></div>
  </div>
</template>

<script>
const config = [{
  label: '组件库',
  value: 'symbol',
  router: '/components',
  icon: 'h-icon-internet'
}, {
  label: '图标库',
  value: 'icon',
  router: '/icons',
  icon: 'h-icon-performance'
}, {
  label: '快填',
  value: 'quickFill',
  router: '/quickFill',
  icon: 'h-icon-stick'
}, {
  label: '交流群',
  value: 'communicate',
  icon: 'h-icon-user'
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
  .logo{
    margin: 24px 0px 60px 0px;
    font-size: 24px;
    font-family: LucidaGrande;
    color: #3A3A3A;
    letter-spacing: 2.16px;
  }
  width: 180px;
  flex: 0 0 auto;
  background-color: #f2f2f2;
  p{
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 5%;
    width: 80%;
    margin-left: 10%;
    font-size: 14px;
  }
  .selectedColor{
    font-family: PingFangSC-Medium;
    color: #50545D;
    line-height: 40px;
    font-weight: bold;
    background: #E8EBEF;
    border-radius: 3px;
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
    width: 5px;
    border-radius: 4px;
    height: 42px;
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
