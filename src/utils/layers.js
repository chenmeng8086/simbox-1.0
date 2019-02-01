/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 20:04:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-30 16:30:47
 */
/** 将选择的图层转换为symbol */
// https://sketchplugins.com/d/65-create-symbol-api-reference/4
const selectedLayerToSymbol = (layer) => {
  // eslint-disable-next-line no-undef
  var layers = MSLayerArray.arrayWithLayers([layer])
  // eslint-disable-next-line no-undef
  if (MSSymbolCreator.canCreateSymbolFromLayers(layers)) {
    var symbolName = layer.name()
    // Create symbol from layers and don't send to symbol page
    // eslint-disable-next-line no-undef
    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layers, symbolName, false)
    var symbolMaster = symbolInstance.symbolMaster()

    // Move symbol to same place of layer
    symbolMaster.setRect(symbolInstance.absoluteRect().rect())
    // Collapse artboard
    symbolMaster.setLayerListExpandedType(1)
    // Remove symbol instance
    symbolInstance.removeFromParent()
  }
}
export default {
  selectedLayerToSymbol
}
