import UI from 'sketch/ui'
import sketch from 'sketch/dom'
function MSColorFromString (color) {
  // eslint-disable-next-line no-undef
  return MSImmutableColor.colorWithSVGString(color).newMutableCounterpart()
}
export default (context, data) => {
  // TODO:添加缺省图
  // eslint-disable-next-line no-undef
  const svgString = NSString.stringWithString(data['svg'])
  // eslint-disable-next-line no-undef
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding)
  // eslint-disable-next-line no-undef
  const svgImporter = MSSVGImporter.svgImporter()
  svgImporter.prepareToImportFromData(svgData)
  const svgLayer = svgImporter.importAsLayer()
  svgLayer.setName('LayerName')
  const {size = 64, color = '#666'} = data
  const svgLayerFrame = svgLayer.frame()
  svgLayerFrame.setWidth(size)
  svgLayerFrame.setHeight(size)
  const layer = svgLayer.layers().firstObject()
  if (layer && layer.style().firstEnabledFill()) {
    console.log('传过来的color')
    console.log(color)
    const fill = layer.style().firstEnabledFill()
    fill.color = MSColorFromString(color)
  }
  context.document.currentPage().addLayers([svgLayer])
  // 导入的icon自动被选中
  // https:// sketchplugins.com/d/305-how-to-select-a-svg-automatically
  svgLayer.select_byExtendingSelection(true, false)
  // layersProvider.selectedLayerToSymbol(svgLayer)
  const doc = sketch.getSelectedDocument()
  const _layer = doc.getLayersNamed('SVG Layer').pop()
  const canvasView = context.document.contentDrawView()
  const center = canvasView.viewCenterInAbsoluteCoordinatesForViewPort(canvasView.viewPort())
  const shiftX = _layer.frame.width / 2
  const shiftY = _layer.frame.height / 2
  const centerX = center.x - shiftX
  const centerY = center.y - shiftY
  positionInArtboard(_layer, centerX, centerY)
  UI.message('icon inserted!')
}

function positionInArtboard (layer, x, y) {
  const parentOffset = parentOffsetInArtboard(layer)
  const Rectangle = sketch.Rectangle
  const newFrame = new Rectangle(layer.frame)
  newFrame.x = x - parentOffset.x
  newFrame.y = y - parentOffset.y
  layer.frame = newFrame
}
function parentOffsetInArtboard (layer) {
  const offset = {x: 0, y: 0}
  let parent = layer.parent
  while (parent.name && parent.type !== 'Artboard') {
    offset.x += parent.frame.x
    offset.y += parent.frame.y
    parent = parent.parent
  }
  return offset
}
