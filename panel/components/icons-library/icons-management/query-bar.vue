<template>
  <div class="iconQueryBar">
    <el-input placeholder="请输入名称搜索" v-model="input5" clearable icon="h-icon-search">
    </el-input>
    <template v-if="isPublic">
      <el-select
      class="iconQueryBarSelect"
      v-model="deptId"
      placeholder="请选择">
        <el-option
          v-for="item in departmentOpts"
          :key="item.id"
          :label="item.initial"
          :value="item.id">
        </el-option>
      </el-select>
    </template>
  </div>
</template>
<script>
import { iconApi } from '@/api'
export default {
  name: 'queryBar',
  props: {
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      departmentOpts: [],
      select: '3',
      deptId: '',
      input5: ''
    }
  },
  created () {
    this.getDepartment()
  },
  methods: {
    /** 获取所在事业群 获取后台接口 */
    async getDepartment (customParams) {
      try {
        const {data = []} = await iconApi.getDeptList({params: {deptId: 1, isPublic: true}})
        this.departmentOpts = data
      } catch (error) {
        this.errorHandler(error)
      } finally {
        this.loading = false
      }
    },
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
