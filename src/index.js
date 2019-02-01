import BrowserWindow from 'sketch-module-web-view'
import {
  textFillHandler,
  imageHandler,
  iconDragHandler,
  symbolHandler,
  dragSymbolHandler
} from './handler'
import {openURL} from './utils'
const isDev = process.env.NODE_ENV === 'development'
const Panel = isDev ? 'http://localhost:8080' : 'index.html'
export default context => {
  const panelID = 'sketch-simbox.panel'
  const browserWindow = new BrowserWindow({
    identifier: panelID,
    x: 60,
    y: 100,
    width: 600,
    height: 800,
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
}
