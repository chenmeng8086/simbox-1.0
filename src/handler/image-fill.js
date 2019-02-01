/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 19:30:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-01 10:52:40
 * @Des 图片快填
 * https://github.com/turbobabr/Sketch-Plugins-Cookbook#create-custom-shape
 * https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server/4
 */
import dialog from '@skpm/dialog'
import fetch from 'sketch-polyfill-fetch'
import FormData from 'sketch-polyfill-fetch/lib/form-data'

const imageFillHandler = (context, data) => {
  /* eslint-disable */
    const FillType = { Solid: 0, Gradient: 1, Pattern: 4, Noise: 5 }
    const PatternFillType = { Tile: 0, Fill: 1, Stretch: 2, Fit: 3}
    function fetchImage (url, ingnoreCache) {
      const request = ingnoreCache ? NSURLRequest.requestWithURL_cachePolicy_timeoutInterval(NSURL.URLWithString(url), NSURLRequestReloadIgnoringLocalCacheData, 60) : NSURLRequest.requestWithURL(NSURL.URLWithString(url))
      const responsePtr = MOPointer.alloc().init()
      const errorPtr = MOPointer.alloc().init()
      const data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr)
      if (errorPtr.value() != null) {
        print(errorPtr.value())
        return null
      }
      const response = responsePtr.value()
      if (response.statusCode() != 200) {
        return null
      }

      const mimeType = response.allHeaderFields()['Content-Type']
      if (!mimeType || !mimeType.hasPrefix('image/')) {
        return null
      }
      return NSImage.alloc().initWithData(data)
    }
    //https://sketchplugins.com/d/758-how-to-get-current-context-selection-when-nspanel-is-opened
    //直接使用context.selection不会随着sketch选中而更新
    const layerArr = context.document.selectedLayers().layers()
    if(layerArr.length === 0){
      UI.message('请先选择一个图层了')
      return
    }
    layerArr.forEach(layer => {
      if (layer && layer.style().firstEnabledFill()) {
        const fill = layer.style().firstEnabledFill()
        const image = fetchImage(data.url)
        if (image) {
          fill.fillType = FillType.Pattern
          fill.patternFillType = PatternFillType.Fill
          fill.image = MSImageData.alloc().initWithImage(image)
        } else {
          UI.message("Can't load image!")
        }
      } else {
        UI.message('Select a layer that has at least one fill style')
      }
    })
}

const uploadImageHandler = (context, webContents) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function (filenames) {
    const fileNamesStr = JSON.stringify(filenames)
    webContents
      .executeJavaScript(`imageFillSelectedImageName(${fileNamesStr})`)
      .catch(console.error)
  })
}

const addFillImageHandler = (context, data) => {
  console.log('我是添加的图片啊')
  console.log(data)
  console.log(JSON.stringify(data))
  // const filePath = path.join(templatePath, templateFile)
  // const formData = new FormData()
  // formData.append('template', {
  //   fileName: templateFile,
  //   mimeType: 'image/png', // or whichever mime type is your file
  //   data: NSData.alloc().initWithContentsOfFile(filePath)
  // })
  // const fetchOptions = {
  //     method: 'PUT',
  //     // headers: { 'Content-Type': 'multipart/form-data' } <- no need, it's automatically set by fetch when providing a FormData
  //     body: formData
  // }
  // fetch(`${baseURL}/image/${imageId}/template/${fileHash}`, fetchOptions)
  //     .then( checkStatus )
  //     .then(response => response.json())
  //     .then(data => log(data))
  //     .catch(err => log(err))
}

export default {imageFillHandler,uploadImageHandler, addFillImageHandler}
