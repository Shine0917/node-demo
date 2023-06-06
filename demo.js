1
const { analysisMap } = Tabledata

let TypeOptions = {
  sum: "总和",
  min: "最小值",
  max: "最大值",
  avg: "均值",
  cg_count: "客群人数",
}

const analysisMapClone = _.cloneDeep(analysisMap)
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

  const y1 = []
  const y2 = []
  let yy = []
  const yLen = ySource.length

  // 如果是多个 key 则分成两个数组
  const keys = Object.keys(analysisMapClone)

  // 判断有几个 key
  if (keys.length > 1) {
    _.forEach(ySource, (item, index) => {
      if (index < (yLen - 1) / 2) {
        y1.push(item)
      } else {
        y2.push(item)
      }
    })

    _.forEach(y1, (_item, idx) => {
      const y1IdxItem = y1[idx]
      const y1Item = {
        title: `${keys[0]}（${y1IdxItem.labelName}的 ${TypeOptions[y1IdxItem.analysisDimension]}）`,
        key: `${y1IdxItem.labelCode}_0`,
        dataIndex: `${y1IdxItem.labelCode}_0`,
      }

      const y2IdxItem = y2[idx]
      const y2Item = {
        title: `${keys[1]}（${y2IdxItem.labelName}的 ${TypeOptions[y2IdxItem.analysisDimension]}）`,
        key: `${y2IdxItem.labelCode}_1`,
        dataIndex: `${y2IdxItem.labelCode}_1`,
      }
      yy.push(y1Item)
      yy.push(y2Item)
    })
  } else {
    yy = ySource
  }
  return [...xSource, ...yy]
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

// const list = [
//   {
//     ol_cls_246: "男",
//     ol_cls_229: "JDZAD",
//     ol_stats_161_0: "",
//     ol_stats_161_1: "",
//     ol_stats_200_0: "2.0000",
//     ol_stats_200_1: "2.0000",
//     ol_stats_201_0: "6.000000",
//     ol_stats_201_1: "6.000000",
//     ol_stats_202_0: "11.0000",
//     ol_stats_202_1: "11.0000",
//     cg_count_0: "1",
//     cg_count_1: "1",
//   },
//   {
//     ol_cls_246: "男",
//     ol_cls_229: "JDZAD",
//     ol_stats_161_0: "",
//     ol_stats_161_1: "",
//     ol_stats_200_0: "2.0000",
//     ol_stats_200_1: "2.0000",
//     ol_stats_201_0: "6.000000",
//     ol_stats_201_1: "6.000000",
//     ol_stats_202_0: "11.0000",
//     ol_stats_202_1: "11.0000",
//     cg_count_0: "1",
//     cg_count_1: "1",
//   },
// ];