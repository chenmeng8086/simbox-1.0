/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 19:31:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-25 19:46:41
 * @Des: 文本快填
 */
import sketch from 'sketch/dom'
import { mapLayers } from '../utils'
import UI from 'sketch/ui'
export default (context, data) => {
  const document = sketch.fromNative(context.document)
  const { Texts } = mapLayers(document.selectedLayers)
  const length = Texts.length
  if (length > 0) {
    const {text = '默认'} = data
    Texts.forEach(textItem => {
      textItem.text = text
    })
  } else {
    UI.alert('请选择一个文本图层')
  }
}
