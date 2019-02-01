// https://sketchplugins.com/d/900-using-local-file-for-sketch-fetch-post-request
// https://sketchplugins.com/d/1107-how-to-use-formdata-for-uploading-files-to-private-server
// https://github.com/skpm/sketch-polyfill-fetch/blob/master/lib/__tests__/form-data.test.js
export default (url, filePath, fileName) => {
  // const filePath = path.join(templatePath, templateFile)
  const formData = new FormData()
  formData.append('template', {
    fileName,
    mimeType: 'image/png', // or whichever mime type is your file
    // eslint-disable-next-line no-undef
    data: NSData.alloc().initWithContentsOfFile(filePath)
  })
  const fetchOptions = {
    method: 'PUT',
    // headers: { 'Content-Type': 'multipart/form-data' } <- no need, it's automatically set by fetch when providing a FormData
    body: formData
  }
  fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}
