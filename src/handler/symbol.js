import sketch from 'sketch/dom'
import UI from 'sketch/ui'
// https://sketchplugins.com/d/104-adding-symbol-to-artboard/9
// https://github.com/BohemianCoding/SketchAPI/blob/develop/Source/dom/models/__tests__/Library.test.js
// https://sketchplugins.com/d/430-library-importing-api-inquiry/7
// https://sketchplugins.com/d/201-inserting-a-layer-into-a-document-with-sketch-ux/6
// https://sketchplugins.com/d/839-importing-from-library-and-placing-with-your-mouse
export default (context, webContents) => {
  // https://sketchplugins.com/d/104-adding-symbol-to-artboard/4
  const Library = sketch.Library
  const libraries = Library.getLibraries()
  const lib = Library.getLibraryForDocumentAtPath(
    '~/Desktop/BUI.sketch'
  )
  const id = lib.id
  console.log('id')
  console.log(id)
  // get first library
  const library = libraries.find(l => l.id === id)
  if (!library) {
    UI.message('未选择一个库')
    return
  }
  console.log('选择的库')
  // console.log(library)
  // // 获取所有的组件
  // const symbolReferences = library.getImportableSymbolReferencesForDocument(
  //   context.document
  // )
  // const symbolReferencesStr = JSON.stringify(symbolReferences)

  // eslint-disable-next-line no-undef
  const _libraries = NSApp.delegate().librariesController().libraries()
  // eslint-disable-next-line no-undef
  let idx = 0
  for (let i = 0; i < _libraries.length; i++) {
    if (_libraries[i].libraryID() == id) idx = i
  }

  const _library = _libraries.objectAtIndex(idx)
  const symbolMasters = _library.document().localSymbols()
  const arr = []
  // https://sketchplugins.com/d/910-get-objectid-class-displayname-name-as-a-string(不适用String()的话，JSON.stringify失效)
  for (let k = 0; k < symbolMasters.length; k++) {
    const symbolID = symbolMasters[k].symbolID()
    const name = symbolMasters[k].name()
    const json = {}
    json['id'] = String(symbolID)
    json['name'] = String(name)
    json['libraryID'] = String(id)
    arr.push(json)
  }
  const symbolReferencesStr = JSON.stringify(arr)
  webContents
    .executeJavaScript(`setRandomNumber(${symbolReferencesStr})`)
    .catch(console.error)
}
