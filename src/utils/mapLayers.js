export default page => {
  const All = []
  const Artboards = []
  const Texts = []
  const mapLayers = layers => {
    layers.forEach(layer => {
      All.push(layer)
      if (layer.type === 'Artboard') Artboards.push(layer)
      if (layer.type === 'Text') Texts.push(layer)
      if (layer.layers) {
        mapLayers(layer.layers)
      }
    })
  }
  mapLayers(page.layers)
  return {
    All,
    Artboards,
    Texts
  }
}
