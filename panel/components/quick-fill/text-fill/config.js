import getUUID from '../../../utils/uuid.js'
const configs = [{
  name: '姓名',
  type: 'name',
  opts: [{label: '中', value: 'CN'}, {label: '英', value: 'EN'}],
  icon: 'name',
  textId: '1'
}, {
  name: '电话',
  type: 'phone',
  opts: [{label: '手机', value: 'mobile'}, {label: '座机', value: 'landline'}],
  icon: 'mobile',
  textId: '2'
}, {
  name: '邮箱',
  type: 'email',
  icon: 'mail',
  textId: '3'
}, {
  name: '地址',
  type: 'address',
  icon: 'address',
  textId: '4'
}, {
  name: '时刻',
  type: 'time',
  opts: [{label: '上午xx:xx', value: 'CN'}, {label: 'xx:xxAM', value: 'EN'}],
  icon: 'time',
  textId: '5'
}, {
  name: '日期',
  type: 'date',
  opts: [{label: '年月日', value: 'YYYY年MM月DD日'},
    {label: '年/月/日', value: 'YYYY年/MM月/DD日'}
  ],
  opts_2: [
    {label: '年-月-日', value: 'YYYY年-MM月-DD日'},
    {label: '2018-11-19', value: 'YYYY-MM-DD'}
  ],
  opts_3: [
    {label: '20181119', value: 'YYYYMMDD'},
    {label: '2018/11/19', value: 'YYYY/MM/DD'}
  ],
  collapse: true,
  icon: 'date',
  textId: '6'
}, {
  name: '星期',
  type: 'week',
  opts: [{label: '中', value: 'CN'}, {label: '英', value: 'EN'}],
  icon: 'week',
  textId: '7'
}, {
  name: '月份',
  type: 'month',
  opts: [{label: '中', value: 'CN'}, {label: '英', value: 'EN'}],
  icon: 'month',
  textId: '8'
}].map(item => ({...item, id: getUUID()}))
const prefixMobil = [139, 138, 137, 136, 135, 134, 159, 158, 157, 150, 151, 152, 147, 188, 187, 182, 183, 184, 178, 130, 131, 132, 156, 155, 186, 185, 145, 176, 133, 153, 189, 180, 181, 177, 173]
const generateMobile = () => {
  const num = Math.floor(Math.random() * prefixMobil.length)
  return `${prefixMobil[num]}${generateRandomNum(8)}`
}
const generateLandline = () => {
  return `0${generateRandomNum(2)}-${generateRandomNum(7)}`
}
const generateRandomNum = (num) => {
  return new Array(num).fill(0).reduce((accStr, item) => {
    return `${accStr}${Math.floor(Math.random() * 10)}`
  }, '')
}
const getCNWeekByNum = (num) => {
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return week[num - 1]
}
const getCNMonthByNum = (str) => {
  let num
  try {
    num = Number(str)
  } catch (error) {
    num = 1
  }
  const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return month[num - 1]
}
const getENMonthByNum = (str) => {
  let num
  try {
    num = Number(str)
  } catch (error) {
    num = 1
  }
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return month[num - 1]
}
const getTimeByNum = (type, time) => {
  const prefix = time.substring(0, 2)
  const _time = time.substring(2)
  return type === 'CN' ? `${prefix === 'am' ? '上午' : '下午'}${_time}` : `${_time}${prefix === 'am' ? 'AM' : 'PM'}`
}
export {
  configs,
  generateRandomNum,
  generateMobile,
  generateLandline,
  getCNWeekByNum,
  getCNMonthByNum,
  getENMonthByNum,
  getTimeByNum
}
