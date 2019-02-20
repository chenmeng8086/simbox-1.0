const IconQueryBarOption = [{
  'value': 'all',
  'label': '全部'
}, {
  'value': 'louyu',
  'label': '楼宇事业部'
}]

const Tabs = [{
  label: '图标',
  value: 'icons'
}, {
  label: '图标管理',
  value: 'iconManagement'
}, {
  label: '组件',
  value: 'symbols'
}]

const VisionOpts = [{
  value: 'v2.1',
  label: 'v2.1'
}, {
  value: 'v1.1',
  label: 'v1.1'
}, {
  value: 'v0.1',
  label: 'v0.1'
}]

const symbolsRecords = [{name: '文字/禁用文字/左/W55%', id: '1'},
  {name: '文字/禁用文字/左/W45%', id: '2'},
  {name: '文字/禁用文字/左/W35%', id: '3'},
  {name: '文字/禁用文字/左/W65%', id: '4'}]

function TreeUtil (data, key, parentKey, map) {
  this.data = data
  this.key = key
  this.parentKey = parentKey
  this.treeParentKey = parentKey // parentKey要转换成什么属性名称
  this.treeKey = key // key要转换成什么属性名称
  this.map = map
  if (map) {
    if (map[key]) this.treeKey = map[key]
  }
  this.toTree = function () {
    var data = this.data
    var pos = {}
    var tree = []
    var i = 0
    while (data.length != 0) {
      if (data[i][this.parentKey] == 0) {
        var _temp = this.copy(data[i])
        tree.push(_temp)
        pos[data[i][this.key]] = [tree.length - 1]
        data.splice(i, 1)
        i--
      } else {
        var posArr = pos[data[i][this.parentKey]]
        if (posArr != undefined) {
          var obj = tree[posArr[0]]
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]]
          }
          var _temp = this.copy(data[i])
          obj.children.push(_temp)
          pos[data[i][this.key]] = posArr.concat([obj.children.length - 1])
          data.splice(i, 1)
          i--
        }
      }
      i++
      if (i > data.length - 1) {
        i = 0
      }
    }
    return tree
  }
  this.copy = function (item) {
    var _temp = {
      children: []
    }
    _temp[this.treeKey] = item[this.key]
    for (var _index in item) {
      if (_index != this.key && _index != this.parentKey) {
        var _property = item[_index]
        if ((!!this.map) && this.map[_index]) { _temp[this.map[_index]] = _property } else { _temp[_index] = _property }
      }
    }
    return _temp
  }
}

export {IconQueryBarOption, Tabs, VisionOpts, symbolsRecords, TreeUtil}
