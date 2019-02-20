import dialog from '@skpm/dialog'
import fetch from 'sketch-polyfill-fetch'
import FormData from 'sketch-polyfill-fetch/lib/form-data'
const uploadIconLibraryHandler = (context, webContents) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function (filenames) {
    const fileNamesStr = JSON.stringify(filenames)
    console.log('fileNamesStr', fileNamesStr)
    webContents
      .executeJavaScript(`uploadIconLibraryName(${fileNamesStr})`)
      .catch(console.error)
  })
}

const uploadCoverPhotoHandler = (context, webContents) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function (filenames) {
    const fileNamesStr = JSON.stringify(filenames)
    console.log('fileNamesStr', fileNamesStr)
    webContents
      .executeJavaScript(`uploadCoverPhotoName(${fileNamesStr})`)
      .catch(console.error)
  })
}

// https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server
/* eslint-disable */
const uploadLibraryHandler = (context, data) => {
  const {groupId, libraryName, coverPhotoName} = data
  const filePath = coverPhotoName + '/photo.jpg'
  const formData = new FormData()
  // formData.append('groupId', 'ff38a23c-ec9e-4f19-b801-032e20a67ce1')
  formData.append('coverPhoto', {
    fileName: 'photo.jpg',
    mimeType: 'image/jpg', // or whichever mime type is your file
    data: NSData.alloc().initWithContentsOfFile(filePath)
  })
  console.log('coverPhoto', NSData.alloc().initWithContentsOfFile(filePath))
  const _filePath = libraryName + '/font.zip'
  formData.append('iconLibrary', {
    fileName: 'font.zip',
    mimeType: 'application/zip', // or whichever mime type is your file
    // data: NSData.alloc().initWithContentsOfFile(_filePath)
    data: NSData.alloc().initWithContentsOfFile(_filePath)
  })
  console.log('iconLibrary', NSData.alloc().initWithContentsOfFile(_filePath))
  const fetchOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' } <- no need, it's automatically set by fetch when providing a FormData
    body: formData
  }
  const url = 'http://10.10.83.30:9090/icon/icon/upload?groupId='+groupId
  fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => log(data))
    .catch(err => {
      log(err)
      log(err.encodeWithCoder())
    })
}

export default {uploadIconLibraryHandler, uploadCoverPhotoHandler, uploadLibraryHandler}
