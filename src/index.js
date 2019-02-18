import BrowserWindow from 'sketch-module-web-view'
import {
  textFillHandler,
  imageHandler,
  iconDragHandler,
  symbolHandler,
  dragSymbolHandler,
  libraryHandler
} from './handler'
import {openURL} from './utils'
const isDev = process.env.NODE_ENV === 'development'
const Panel = isDev ? 'http://localhost:8080' : 'http://10.10.64.16:8080'
export default context => {
  const panelID = 'sketch-simbox.panel'
  const browserWindow = new BrowserWindow({
    identifier: panelID,
    x: 60,
    y: 100,
    width: 540,
    height: 600,
    title: 'simbox',
    onlyShowCloseButton: true,
    // hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    // frame: false,
    movable: true
  })
  // 加载index.html
  browserWindow.loadURL(Panel)
  const webContents = browserWindow.webContents
  webContents.on('onDragIcons', data => {
    iconDragHandler(context, data)
  })
  webContents.on('onTextFill', data => {
    textFillHandler(context, data)
  })
  webContents.on('onImageFill', data => {
    imageHandler.imageFillHandler(context, data)
  })
  webContents.on('onTabClick', data => {
    symbolHandler(context, webContents)
  })
  webContents.on('onOpenUrl', url => {
    openURL(url)
  })
  webContents.on('onDragSymbol', data => {
    dragSymbolHandler(context, data)
  })
  webContents.on('uploadClick', data => {
    imageHandler.uploadImageHandler(context, webContents)
  })
  webContents.on('addFillImage', data => {
    imageHandler.addFillImageHandler(context, data)
  })
  webContents.on('uploadIconLibraryClick', data => {
    libraryHandler.uploadIconLibraryHandler(context, webContents)
  })
  webContents.on('uploadCoverPhotoClick', data => {
    libraryHandler.uploadCoverPhotoHandler(context, webContents)
  })
  webContents.on('uploadLibrary', data => {
    libraryHandler.uploadLibraryHandler(context, data)
  })
}
