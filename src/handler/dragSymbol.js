import UI from 'sketch/ui'
import librariesProvider from '../utils/libraries'
/**
 * 根据symbolID获取symbol
 * https://sketchplugins.com/d/145-how-to-get-master-symbol-by-symbolid
 * 一些library的操作
 * https://sketchplugins.com/d/430-library-importing-api-inquiry/3
 * https://sketchplugins.com/d/407-programmatically-insert-instance-from-library/3
*/
export default (context, data) => {
  if (!data || !data.id) {
    UI.alert('error', 'symbol不存在')
  }
  // const symbolMaster = context.document.documentData().symbolWithID(data.id)
  // const instance = symbolMaster.newSymbolInstance()
  // context.document.currentPage().addLayers([instance])
  const libraryID = data.libraryID
  // eslint-disable-next-line no-undef
  // var libraries = NSApp.delegate().librariesController().libraries()
  // var idx = 0
  // for (var i = 0; i < libraries.length; i++) {
  //   if (libraries[i].libraryID() == libraryID) idx = i
  // }
  // var library = libraries.objectAtIndex(idx)
  const library = librariesProvider.getLibById(libraryID)
  const symbolID = data.id
  // var symbols = library.document().localSymbols()
  // var symbolIdx = 0
  // for (var j = 0; j < symbols.length; j++) {
  //   if (symbols[j].symbolID() == symbolID) symbolIdx = j
  // }
  // var symbol = library.document().localSymbols().objectAtIndex(symbolIdx)
  const symbol = librariesProvider.getSymbolFromDocument(library.document(), symbolID)
  // eslint-disable-next-line no-undef
  const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(symbol, library)
  context.document.documentData().addForeignSymbol(foreignSymbol)
  const instance = foreignSymbol.symbolMaster().newSymbolInstance()
  context.document.currentPage().addLayers([instance])
  instance.select_byExtendingSelection(true, false)
}
