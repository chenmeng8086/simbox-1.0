/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-18 20:05:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-19 19:32:06
 */
const AVAILABLE_EXT = ['svg', 'pdf', 'png', 'jpg', 'jpeg', 'sketch']
/**
 * @name selectIconsFiles
 * @description display modal selection file and return them
 * @returns {Array}
 */
function selectIconsFiles () {
  // eslint-disable-next-line no-undef
  var panel = NSOpenPanel.openPanel()
  panel.setCanChooseDirectories(false)
  panel.setAllowsMultipleSelection(true)
  panel
  panel.setCanCreateDirectories(true)
  panel.setMessage('select file')
  panel.setAllowedFileTypes(AVAILABLE_EXT)
  panel.setPrompt('Select')
  let result
  // eslint-disable-next-line no-undef
  if (panel.runModal() === NSOKButton) {
    result = panel.URL().path()
  }
  return result
}
export default selectIconsFiles
const getFile = function () {
  var fileTypes = ['pdf', 'jpg', 'tiff']
  // eslint-disable-next-line no-undef
  const panel = NSOpenPanel.openPanel()
  panel.setAllowsMultipleSelection(0)
  panel.setCanChooseDirectories(0)
  panel.setCanChooseFiles(1)
  panel.setFloatingPanel(1)
  panel.setMessage('Choose file')
  // eslint-disable-next-line no-undef
  var result = panel.runModalForDirectory_file_types(nil, nil, fileTypes)
  // eslint-disable-next-line no-undef
  if (result !== NSOKButton) {
    return 0
  }
  if (panel.URLs().count() < 1) {
    return 0
  }
  return panel.URLs()[0]
}
