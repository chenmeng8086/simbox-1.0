<template>
  <div class="textFillContainer">
    <div class="content">
    <el-scrollbar
    wrap-class="scrollbar__wrap"
    view-class="scrollbar__view"
    >
      <Container @drop="onDrop" :get-ghost-parent="getGhostParent" drag-handle-selector=".column-drag-handle" lock-axis="y">
        <Draggable v-for="config in textData" :key="config.textId">
          <div class="dragItem" @click="fillClick(config)" @mouseover="mouseover(config)">
            <!-- 自定义 -->
            <template v-if="config.isCustom">
              <div class="custom">
                <div class="customText">
                  <!-- <i class="h-icon-fold"></i> -->
                  <svg-icon iconClass="document"></svg-icon>
                  <span class="text">{{config.name}}</span>
                </div>
                <template v-if="config.id==activeId">
                  <i class="h-icon-update column-drag-handle sort" style = "top:12px;"></i>
                </template>
                <div v-if="isEdit" class="toolbarIcons">
                  <i class="h-icon-edit" @click="editClick(config)"></i>
                  <i class="h-icon-circle_error" @click="deleteClick(config)"></i>
                </div>
              </div>
            </template>
            <!-- 剩余 -->
            <template v-else-if="config.collapse">
              <svg-icon :iconClass="config.icon"></svg-icon>
              <!-- <i :class="config.icon"></i> -->
              <span class="text" @click="fillClick(config)">{{config.name}}</span>
              <el-radio-group v-model="form[config.icon]" @change="fillClick(config)">
                <el-radio-button
                  v-for="opt in config.opts"
                  :label="opt.value"
                  :key="opt.value">
                  {{opt.label}}
                </el-radio-button>
              </el-radio-group>
              <template v-if="config.id==activeId">
                <i class="h-icon-update column-drag-handle sort" style = "top:12px;"></i>
              </template>
              <template v-if='collapse'>
                <i class='h-icon-angle-sm-down' @click="downClick"></i>
              </template>
              <template v-else>
                <i class='h-icon-angle-sm-up' @click="upClick"></i>
              </template>
              <template v-if="collapse">
                <div class='collapseSecond'>
                  <el-radio-group v-model="form[config.icon]">
                    <el-radio-button
                      v-for="opt in config.opts_2"
                      :label="opt.value"
                      :key="opt.value">
                      {{opt.label}}
                    </el-radio-button>
                  </el-radio-group>
                </div>
                <div class='collapseThird'>
                  <el-radio-group v-model="form[config.icon]">
                    <el-radio-button
                      v-for="opt in config.opts_3"
                      :label="opt.value"
                      :key="opt.value">
                      {{opt.label}}
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </template>
            </template>
            <!-- 日期 -->
            <template v-else>
              <!-- <i :class="config.icon"></i> -->
              <svg-icon :iconClass="config.icon"></svg-icon>
              <span class="text">{{config.name}}</span>
              <el-radio-group v-model="form[config.icon]" @change="fillClick(config)">
                <el-radio-button
                  v-for="opt in config.opts"
                  :label="opt.value"
                  :key="opt.value">
                  {{opt.label}}
                </el-radio-button>
              </el-radio-group>
              <template v-if="config.id==activeId">
                <i class="h-icon-update column-drag-handle sort" style = "top:12px;"></i>
              </template>
            </template>
          </div>
        </Draggable>
      </Container>
    </el-scrollbar>
    </div>
      <div class="toolbar">
        <i class="h-icon-plus" @click="addClick"></i>
        <i class="h-icon-edit" @click="toolbarEditClick"></i>
      </div>
      <add-text-dialog
        ref="addText"
        @submit="submit">
      </add-text-dialog>
  </div>
</template>
<script>
import {
  configs,
  generateLandline,
  generateMobile,
  getCNWeekByNum,
  getCNMonthByNum,
  getENMonthByNum,
  getTimeByNum
} from './config.js'
import addTextDialog from './add-text-dialog'
import getUUID from '../../../utils/uuid.js'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from './helper'
import randomName from 'chinese-random-name'
import starwarsNames from 'starwars-names'
import moment from 'moment'
import { textApi } from '@/api'
import {reduceByKey} from '../../../utils/commonFn.js'
export default {
  name: 'textFill',
  components: {
    addTextDialog,
    Container,
    Draggable
  },
  data () {
    return {
      textData: [],
      isEdit: false,
      collapse: false,
      activeId: '',
      form: {
        name: '',
        phone: '',
        time: '',
        date: '',
        month: '',
        week: ''
      }
    }
  },
  mounted () {
    this.textList()
  },
  methods: {
    async textList (customParams) {
      try {
        const {data = []} = await textApi.textList()
        const newData = data.map((item) => {
          const selectedItem = configs.find(configItem => configItem.name === item.name) || {}
          if (selectedItem.name) {
            return {...selectedItem, ...item, isCustom: item.type, id: getUUID()}
          }
          return {...item, isCustom: item.type, id: getUUID(), icon: 'custom'}
        })
        this.textData = newData
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
    fillClick (item) {
      const text = this.proTypeToText(item)
      window.postMessage('onTextFill', {text})
    },
    addClick () {
      this.$refs.addText.showDialog({mode: 'add'})
    },
    proTypeToText (item) {
      const {icon} = item
      const key = this.form[icon]
      switch (icon) {
        case 'name':
          if (key === 'EN') return starwarsNames.random()
          return randomName.generate()
        case 'mobile':
          if (key === 'mobile') return generateMobile()
          return generateLandline()
        case 'mail':
          return 'dabai@hikvision.com.cn'
        case 'address':
          return '杭州滨江区阡陌路555号'
        case 'time':
          const time = moment().format('ahh:mm')
          return getTimeByNum(key, time)
        case 'date':
          return moment().format(key)
        case 'month':
          const monthStr = moment().format('MM')
          const month = key === 'CN' ? getCNMonthByNum(monthStr) : getENMonthByNum(monthStr)
          return month
        case 'week':
          const week = key === 'CN' ? getCNWeekByNum(moment().day()) : moment().format('dddd')
          return week
        case 'custom':
        // 此处使用随机数实现换行输入
        // Math.floor(Math.random()*10);    // 可均衡获取 0 到 9 的随机整数。
        // Math.ceil(Math.random() * item.contentArray.length)
          return item.contentArray[Math.floor(Math.random() * item.contentArray.length)]
        default:
          return '默认'
      }
    },
    toolbarEditClick () {
      // this.isEdit = true
      if (this.isEdit === false) {
        this.isEdit = true
      } else {
        this.isEdit = false
      }
    },
    /** 单条信息编辑 */
    editClick (item) {
      this.$refs.addText.showDialog({mode: 'edit', data: item})
    },
    /** 删除 */
    deleteClick (item) {
      const {textId} = item
      try {
        this.$confirm('删除后无法恢复，确定删除吗', '提示', {
          type: 'question'
        }).then(() => {
          const params = {textId}
          textApi.deleteText({params}).then(rsp => {
            this.textList()
          })
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    },
    submit (form) {
      let params = {}
      const {mode, name, content, textId} = form
      if (mode === 'add') {
        params = {name, content, type: 1}
      } else {
        params = {name, content, textId, type: 1}
      }
      textApi.saveText({params}).then(rsp => {
        this.textList()
      })
    },
    onDrop (dropResult) {
      this.textData = applyDrag(this.textData, dropResult)
      const textIdList = reduceByKey(this.textData, 'textId')
      const params = {textIdList}
      textApi.sortText({params}).then(rsp => {
        this.textList()
      })
    },
    getGhostParent () {
      return document.body
    },
    downClick (e) {
      e.stopPropagation()
      this.collapse = !this.collapse
    },
    upClick (e) {
      e.stopPropagation()
      this.collapse = !this.collapse
    },
    mouseover (item) {
      this.activeId = item.id
    },
    saveText (item) {
      const params = {...item}
      textApi.saveText({params}).then(rsp => {
        this.textList()
      })
    }
  }
}
</script>
<style lang="less" scoped>

  /deep/.smooth-dnd-draggable-wrapper{
    position: relative;
  }
  .content{
    height: 480px;
  }
  /deep/.el-radio-group{
    margin-left: 12px;
    .el-radio-button{
      margin-left: 12px;
      .el-radio-button__inner{
        padding: 0px 12px;
        border: 1px solid #D8D8D8;
        border-radius: 5px;
        font-size: 14px;
        max-width: 192px;
        font-size: 14px;
        color: rgba(24,25,26,0.70);
        text-align: center;
        line-height: 24px;
      }
      .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        border: none;
        color: #fff;
      }
    }
  }
  .sort{
    position: absolute;
    right: 12px;
    top: -5px;
    padding: 0px;
    border-radius: 50%;
    background-color: #D8D8D8;
  }
  .textFillContainer{
    height: 524px;
    text-align: left;
    color:#000;
    .dragItem{
      margin: 4px 0px;
      padding-left: 12px;
      svg{
        fill: currentColor;
      }
    }
    .text{
      width: 100%;
      height: 36px;
      line-height: 40px;
      margin-top: 10px;
    }
    .custom{
      height: 36px;
      line-height: 40px;
      .customText{
        float: left;
      }
      .toolbarIcons{
        position: absolute;
        right: 29px;
        /*top: -16px;*/
        i{
          // width: 20px;
          border-radius: 50%;
          background-color: #D8D8D8;
        }
      }
    }
    .text{
      font-size: 14px;
      color: rgba(24,25,26,0.90);
    }
    .toolbar{
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      text-align: center;
      border-top: 1px solid #E6E6E6;
      background-color: #fff;
      height: 36px;
      line-height: 36px;
      i {
        display: inline-block;
        width: 36px;
        height: 36px;
      }
    }
    .collapse{
      margin-left: 42px;
    }
    .collapseSecond{
      margin-left: 42px;
    }
    .collapseThird{
      margin-left: 42px;
      margin-top: 8px;
      margin-bottom: 4px;
    }
    /deep/.scrollbar__wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .dragItem:hover{
      color: #3C99FC;
      background-color: #F5F6F8;
      .customText{
        color: #3C99FC;
      }
      .text{
        color: #3C99FC;
      }
      svg {
        fill: currentColor;
      }
      .sort {
        color: #000!important;
      }
      .toolbarIcons{
        fill: #000;
        color: #000!important;
      }
    }
  }
</style>
