/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 20:11:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-25 10:04:21
 */
// https://sketchplugins.com/d/900-using-local-file-for-sketch-fetch-post-request/6
// https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server/7
// 接口https://sketchplugins.com/d/75-ajax-fetch-api/11
const fetch = require('sketch-polyfill-fetch')
function uploadImage (context, url, fullpathFilename) {
  let readBinaryFile = (filepath) => {
    // eslint-disable-next-line no-undef
    return NSData.alloc().initWithContentsOfFile(filepath)
  }
  let uploadImage = (url, fullpathFilename) => {
    // https://developer.sketchapp.com/reference/api/#async
    let fiber = require('sketch/async').createFiber()
    let body = readBinaryFile(fullpathFilename)
    let headers = {'Content-Type': 'image/png'}
    return fetch(url, {
      method: 'POST',
      body: body,
      headers: headers
    }).then(response =>
      response.text()
    ).then(text => {
      // Since we're done with the promise,
      // let Sketch know it can cleanup after this callstack unwinds
      fiber.cleanup()
      context.document.showMessage('File uploaded! 🙌 ' + text)
      console.log(text)
    }
    ).catch(e => console.error(e))
  }
  // uploadImage('http://localhost:8144', '/tmp/test.png')
  uploadImage(url, fullpathFilename)
}
export default uploadImage
