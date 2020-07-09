import dialog from '@skpm/dialog'
import fetch from 'sketch-polyfill-fetch'
import FormData from 'sketch-polyfill-fetch/lib/form-data'
import file from './file'
const uploadIconLibraryHandler = (context, webContents) => {
  // dialog.showOpenDialog({
  //   properties: ['openFile', 'openDirectory', 'multiSelections']
  // }, function (filenames) {
  //   const fileNamesStr = JSON.stringify(filenames)
  //   console.log('fileNamesStr', fileNamesStr)
  //   webContents
  //     .executeJavaScript(`uploadIconLibraryName(${fileNamesStr})`)
  //     .catch(console.error)
  // })
  file.selectIconsFiles(function (resultUrl) {
    const firstUrl = resultUrl[0]
    const path = String(firstUrl.path())
    const name = firstUrl.lastPathComponent().split('.')[0]
    const extension = firstUrl.lastPathComponent().split('.')[1]
    const fileName = name + '.' + extension
    const params = {fileName: fileName, path: path}
    const paramsStr = JSON.stringify(params)
    console.log('fileNamesStr', paramsStr)
    webContents
      .executeJavaScript(`uploadIconLibraryName(${paramsStr})`)
      .catch(console.error)
  })
}

const uploadCoverPhotoHandler = (context, webContents) => {
  // dialog.showOpenDialog({
  //   properties: ['openFile', 'openDirectory', 'multiSelections']
  // }, function (filenames) {
  //   const fileNamesStr = JSON.stringify(filenames)
  //   console.log('fileNamesStr', fileNamesStr)
  //   webContents
  //     .executeJavaScript(`uploadCoverPhotoName(${fileNamesStr})`)
  //     .catch(console.error)
  // })
  file.selectIconsFiles(function (resultUrl) {
    const firstUrl = resultUrl[0]
    const path = String(firstUrl.path())
    const name = firstUrl.lastPathComponent().split('.')[0]
    const extension = firstUrl.lastPathComponent().split('.')[1]
    const fileName = name + '.' + extension
    const params = {fileName: fileName, path: path}
    const paramsStr = JSON.stringify(params)
    console.log('fileNamesStr', paramsStr)
    webContents
      .executeJavaScript(`uploadCoverPhotoName(${paramsStr})`)
      .catch(console.error)
  })
}

// https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server
/* eslint-disable */
const uploadLibraryHandler = (context, data) => {
  const {groupId, libraryName, coverPhotoName, libraryPath, coverPhotoPath} = data
  const coverPhotoFilePath = coverPhotoPath
  const formData = new FormData()
  // formData.append('groupId', 'ff38a23c-ec9e-4f19-b801-032e20a67ce1')
  formData.append('coverPhoto', {
    fileName: coverPhotoName,
    mimeType: 'image/jpg', // or whichever mime type is your file
    data: NSData.alloc().initWithContentsOfFile(coverPhotoFilePath)
  })
  console.log('coverPhoto', NSData.alloc().initWithContentsOfFile(coverPhotoFilePath))


  const libraryFilePath = libraryPath
  formData.append('iconLibrary', {
    fileName: libraryName,
    mimeType: 'application/zip', // or whichever mime type is your file
    // data: NSData.alloc().initWithContentsOfFile(_filePath)
    data: NSData.alloc().initWithContentsOfFile(libraryFilePath)
  })
  console.log('iconLibrary', NSData.alloc().initWithContentsOfFile(libraryFilePath))
  const fetchOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' } <- no need, it's automatically set by fetch when providing a FormData
    body: formData
  }
  const url = 'http://10.11.65.24:9090/icon/icon/upload?groupId='+groupId
  // const url = 'http://10.11.65.24:9090/swagger-ui.html#/operations/icon-controller/iconUploadUsingPOST'

  fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => log(data))
    .catch(err => {
      log(err)
      log(err.encodeWithCoder())
    })
}

export default {uploadIconLibraryHandler, uploadCoverPhotoHandler, uploadLibraryHandler}
