/* eslint-disable */
export default {
  selectIconsFiles
}

const AVAILABLE_EXT = ['svg', 'pdf', 'png', 'jpg', 'jpeg']

/**
 * @name selectIconsFiles
 * @description display modal selection file and return them
 * @returns {Array}
 */
function selectIconsFiles (callback) {
  const panel = NSOpenPanel.openPanel()
  panel.setAllowsMultipleSelection(true)
  panel.setCanChooseDirectories(true)
  panel.setAllowedFileTypes(AVAILABLE_EXT)
  panel.setCanChooseFiles(true)
  panel.setPrompt('Select')

  if (panel.runModal() === NSFileHandlingPanelOKButton){
    const result = []

    getFilesByUrls(panel.URLs(), result)

    callback(result)

    return result
  }
  return []
}

/**
 * @name getFilesByUrls
 * @description get file from list of folder and path
 * @param urls {Array}
 * @param result {Array}
 * @returns {Array}
 */
function getFilesByUrls (urls, result) {
  for (let i = 0; i < urls.length; i++) {
    if (urls[i].hasDirectoryPath()) {
      getFilesByUrls(NSFileManager.defaultManager().contentsOfDirectoryAtURL_includingPropertiesForKeys_options_error(urls[i], null, null, null), result)
    } else {
      const ext = String(urls[i].pathExtension()).toLowerCase()
      if (AVAILABLE_EXT.indexOf(ext) !== -1) {
        result.push(urls[i])
      }
    }
  }
}
