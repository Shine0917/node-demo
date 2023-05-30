const { analysisMap } = Tabledata

let TypeOptions = {
  sum: "总和",
  min: "最小值",
  max: "最大值",
  avg: "均值",
  cg_count: "客群人数",
}

const analysisMapClone = _.cloneDeep(analysisMap)
// 全局使用的 keys
const keys = Object.keys(analysisMapClone)

// 小于一半
function lessHalf(list, idx) {
  // 如果只有一个 key 则不需要分组
  if (keys.length < 2) {
    return true
  }
  return idx < (list.length - 1) / 2
}

// 区分 key 用的 index
function getIdx(list, idx) {
  return lessHalf(list, idx) ? 0 : 1
}

function getTitle(list, idx, item) {
  const titlePrefix = lessHalf(list, idx, keys) ? keys[0] : keys[1]
  const prefix = titlePrefix.split("_")[1]
  const title = `${prefix}「${item.labelName}的${TypeOptions[item.analysisDimension]}」`
  return title
}

function getCols() {
  const xSource = []
  const ySource = []

  _.forEach(analysisMapClone, (list) => {
    const xItem = _.filter(list[0], (item) => item.analysisType === "X")
    const xList = _.map(xItem, (item) => {
      return {
        title: item.labelName,
        key: item.labelCode,
        dataIndex: item.labelCode,
      }
    })
    if (_.isEmpty(xSource)) {
      xSource.push(...xList)
    }
    ySource.push(..._.filter(list[0], (item) => item.analysisType === "Y"))
  })

  const yList = _.map(ySource, (item, idx) => {
    const title = getTitle(ySource, idx, item)
    return {
      title,
      key: `${item.labelCode}_${getIdx(ySource, idx, keys)}`,
      dataIndex: `${item.labelCode}_${getIdx(ySource, idx, keys)}`,
    }
  })

  return [...xSource, ...yList]
}

const cols = getCols()

console.log("%c [ cols ]-56", "font-size:13px; background:#14844b; color:#58c88f;", cols)

// 数组对象
// let dataSource = []
// _.forEach(analysisMapClone, (column) => {
//   console.log("%c AT 🥝 column 🥝-86", "font-size:13px; background:#d09064; color:#ffd4a8;", column)
//   let obj = {}
//   _.forEach(column, (list) => {
//     _.map(list, (listItem) => {
//       obj[listItem.labelCode] = listItem.value
//     })
//   })
//   dataSource.push(obj)
// })

// const ll = []
// _.forEach(analysisMapClone, (col) => {
//   _.forEach(col, (lItem, idx) => {
//     // console.log('%c AT 🥝 idx 🥝-92', 'font-size:13px; background:#a8a66f; color:#eceab3;', idx)
//     // console.log('%c AT 🥝 lItem 🥝-92', 'font-size:13px; background:#8adc5d; color:#ceffa1;', lItem)
//     if (_.isEmpty(ll[idx])) {
//       ll[idx] = []
//     }
//     // ll[idx].push(...lItem)
//     _.forEach(lItem, (item) => {
//       console.log("%c AT 🥝 item 🥝-99", "font-size:13px; background:#1a91d4; color:#5ed5ff;", item)
//     })
//   })
// })

// console.log("%c AT 🥝 ll 🥝-92", "font-size:13px; background:#9059fa; color:#d49dff;", ll)
