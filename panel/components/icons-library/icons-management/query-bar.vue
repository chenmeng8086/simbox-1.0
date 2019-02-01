<template>
  <div class="iconQueryBar">
    <el-input placeholder="请输入名称搜索" v-model="input5" clearable icon="h-icon-search">
    </el-input>
    <template v-if="iconType==='common'">
      <el-select
      class="iconQueryBarSelect"
      v-model="value2"
      placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
import { IconQueryBarOption } from '../config.js'
export default {
  name: 'queryBar',
  props: {
    iconType: {
      type: String,
      default: 'common'
    }
  },
  data () {
    return {
      options: IconQueryBarOption,
      select: '3',
      value2: 'all',
      input5: ''
    }
  },
  methods: {
    handleIconClick: function () {

    },
    clearIconClick: function () {

    }
  }
}
</script>
<style lang="less" scoped>
.iconQueryBar{
  display: flex;
  /deep/.el-input-group{
    width: 70%;
  }
}
.iconQueryBarSelect{
  width: 30%;
  /deep/.el-input{
    input {
      border: 0;
      background: transparent;
    }
  }
}
.iconQueryBarInput{
  display: inline-block;
  width: 50%;
}
/deep/.el-input-group__prepend{
  width: 20%;
}
</style>
