/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 19:30:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-26 21:19:49
 * @Des 图片快填
 * https://github.com/turbobabr/Sketch-Plugins-Cookbook#create-custom-shape
 * https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server/4
 */
import dialog from '@skpm/dialog'
import fetch from 'sketch-polyfill-fetch'
import FormData from 'sketch-polyfill-fetch/lib/form-data'
import fs from '@skpm/fs'
import file from './file'
import UI from 'sketch/ui'

console.log('FormData')
console.log(FormData)

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
        // const image = fetchImage(data.url)
        const image = fetchImage("https://s3.amazonaws.com/sketch-plugins-cookbook/jake_the_dog.png")
        // const image = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4066156726,250262276&fm=26&gp=0.jpg'
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

//https://sketchplugins.com/d/811-how-to-access-a-file-for-upload-via-web-view/5
// 选中上传图片的路径以及名字
const uploadImageHandler = (context, webContents) => {
  file.selectIconsFiles(function(resultUrl){
    const firstUrl = resultUrl[0]
    const path = String(firstUrl.path())
    const name = firstUrl.lastPathComponent().split('.')[0]
    const extension = firstUrl.lastPathComponent().split('.')[1]
    const fileName = name + '.'+ extension
    const params = {fileName: fileName, path: path}
    const paramsStr = JSON.stringify(params)
    console.log('fileNamesStr', paramsStr)
    webContents
      .executeJavaScript(`imageFillSelectedImageName(${paramsStr})`)
      .catch(console.error)
  })
  // dialog.showOpenDialog({
  //   properties: ['openFile', 'openDirectory', 'multiSelections']
  // }, function (filenames) {
  //   const fileNamesStr = JSON.stringify(filenames)
  //   console.log('fileNamesStr', fileNamesStr)
  //   webContents
  //     .executeJavaScript(`imageFillSelectedImageName(${fileNamesStr})`)
  //     .catch(console.error)
  // })
}


function getScriptFolder(context) {
  const parts = context.scriptPath.split('/')
  parts.pop()
  return parts.join('/')
}

//https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server
const addFillImageHandler = (context, data) => {
  console.log('我是添加的图片啊')
  console.log(data)
  console.log(JSON.stringify(data))
  // const filePath = '/Users/yunmoushijue/Desktop/dog/hello.jpg'
  const filePath = '/Users/yunmoushijue/Desktop/dog/hello.jpg'
  const formData = new FormData()
  // formData.append('groupId', 'ff38a23c-ec9e-4f19-b801-032e20a67ce1')
  formData.append('coverPhoto', {
    fileName: 'hello.jpg',
    mimeType: 'image/jpg', // or whichever mime type is your file
    data: NSData.alloc().initWithContentsOfFile(filePath)
  })
  // const _filePath = '/Users/yunmoushijue/Desktop/font.zip'
  const _filePath = '/Users/chengyuanyuan/Desktop/font.zip'
  formData.append('iconLibrary', {
    fileName: 'font.zip',
    mimeType: 'application/zip', // or whichever mime type is your file
    // data: NSData.alloc().initWithContentsOfFile(_filePath)
    data: NSData.alloc().initWithContentsOfFile(_filePath),
  })
  console.log('iconLibrary', NSData.alloc().initWithContentsOfFile(_filePath))
  const fetchOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' } <- no need, it's automatically set by fetch when providing a FormData
      body: formData
  }
  // const imageLibraryUrl = 'http://10.10.83.30:9090/icon/icon/upload?groupId=ff38a23c-ec9e-4f19-b801-032e20a67ce1'
  const imageLibraryUrl = 'http://10.11.65.24:9090/icon/icon/upload?groupId=ff38a23c-ec9e-4f19-b801-032e20a67ce1'
  fetch(imageLibraryUrl, fetchOptions)
      .then(response => response.json())
      .then(data => log(data))
      .catch(err => {
        log(err)
        log(err.encodeWithCoder())
      })
}

export default {imageFillHandler,uploadImageHandler, addFillImageHandler}
