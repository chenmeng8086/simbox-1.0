<template>
  <el-dialog title="批量配置组件封面" :visible.sync="visible" :show-close="false">
    <el-form :model="form">
      <el-form-item label="所属组件库" :label-width="formLabelWidth">
        <treeselect
          v-model="form.position"
          :options="options"
          placeholder='请选择上传位置'/>
      </el-form-item>
      <el-form-item label="选择文件" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="okClick">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'batch-upload-picture',
  components: { Treeselect },
  data () {
    return {
      visible: false,
      form: {
        position: '',
        name: ''
      },
      formLabelWidth: '120px',
      options: [ {
        id: 'a444',
        label: 'a',
        children: [ {
          id: 'aa4',
          label: 'aa'
        }, {
          id: 'ab222',
          label: 'ab'
        } ]
      }, {
        id: 'bwwwww',
        label: 'b'
      }, {
        id: 'c444',
        label: 'c'
      } ],
      value: null
    }
  },
  methods: {
    showDialog ({mode = 'add', data}) {
      this.visible = true
      if (mode === 'edit') {
        this.form = data
      } else {
        this.form = {}
      }
    },
    okClick () {
      this.visible = false
      console.log(this.form)
      this.$emit('okClick', this.form)
    }
  }
}
</script>
