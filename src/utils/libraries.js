const getLibById = (libraryId) => {
  let library
  // eslint-disable-next-line no-undef
  let availableLibraries = AppController.sharedInstance().librariesController().availableLibraries()
  for (let i = 0; i < availableLibraries.length; i++) {
    if (String(libraryId) === String(availableLibraries[i].libraryID())) {
      library = availableLibraries[i]
      break
    }
  }
  return library
}
const getSymbolFromDocument = (document, symbolId) => {
  let symbol
  let localSymbols = document.localSymbols()
  for (let i = 0; i < localSymbols.length; i++) {
    if (String(localSymbols[i].symbolID()) === String(symbolId)) {
      symbol = localSymbols[i]
      break
    }
  }
  return symbol
}
export default {
  getSymbolFromDocument,
  getLibById
}
