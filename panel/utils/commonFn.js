// 把一个对象数组中的某个字段合并成字符串
const reduceByKey = (arr, key) => {
  if (!arr) return []
  if (!Array.isArray(arr)) return []
  return arr.reduce((acc, item, index) => {
    if (index === 0) return [item[key]]
    return acc.concat(new Array(item[key]))
  }, [])
}
export {reduceByKey}
