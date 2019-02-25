<template>
  <div id="app">
    <div :class="[!isFold ? 'displayBlock' : 'displayNone', 'left']">
      <div class="logo"><img src="./assets/logo.png"/></div>
      <p v-for="(item, index) in config" :key="item.value" :tabindex="index" @click="click(item)" :class='{selectedColor:_router() ===item.router}'>
        <svg-icon :iconClass="item.icon"></svg-icon>{{item.label}}
      </p>
    </div>
    <div class="center" @mouseover="mouseover" @mouseout="mouseout">
      <p @click="arrowClick">
        <img :src='src'/>
      </p>
    </div>
    <div class="right"><router-view/></div>
  </div>
</template>

<script>
import collapseHov from './assets/collapseHov.png'
import collapseNor from './assets/collapseNor.png'
import expandHov from './assets/expandHov.png'
import expandNor from './assets/expandNor.png'
const config = [{
  label: '组件库',
  value: 'symbol',
  router: '/components',
  icon: 'symbollogo'
}, {
  label: '图标库',
  value: 'icon',
  router: '/icons',
  icon: 'h-icon-performance'
}, {
  label: '快填',
  value: 'quickFill',
  router: '/quickFill',
  icon: 'quicklogo'
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
    src () {
      if (!this.isFold && this.isArrow) {
        return collapseHov
      }
      if (!this.isFold && !this.isArrow) {
        return collapseNor
      }
      if (this.isFold && this.isArrow) {
        return expandHov
      }
      if (this.isFold && !this.isArrow) {
        return expandNor
      }
    }
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
  width: 100px;
  flex: 0 0 auto;
  background: #F5F6F8;
  box-shadow: inset -1px 0 0 0 #E6E6E6;
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
  width: 12px;
  flex: 0 0 auto;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .arrow{
    width: 12px;
    border-radius: 4px;
    height: 48px;
    background-color:#2c3e50;
    margin: 0;
  }
  img{
    width: 100%;
    height: 100%;
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
.logo{
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
