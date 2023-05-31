const { analysisMap } = Tabledata
console.log("%c [ analysisMap ]-2", "font-size:13px; background:#f4a17c; color:#ffe5c0;", analysisMap)

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
  const titleItem = item.analysisDimension === "cg_count" ? "客群人数" : `${item.labelName}的${TypeOptions[item.analysisDimension]}`
  const title = `${prefix}(${titleItem})`
  return title
}

function getKey(item, ySource, idx, keys) {
  if (keys.length === 1) return item.labelCode
  return `${item.labelCode}_${getIdx(ySource, idx, keys)}`
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
      key: getKey(item, ySource, idx, keys),
      dataIndex: getKey(item, ySource, idx, keys),
    }
  })

  return [...xSource, ...yList]
}

const cols = getCols()
console.log("%c AT 🥝 cols 🥝-77", "font-size:13px; background:#7370c4; color:#b7b4ff;", cols)

function getCompareList(sortList) {
  const [maxLengthArr, minLengthArr] = sortList
  const compareMinList = []
  const compareMaxList = []
  _.forEach(maxLengthArr, (itemList, index) => {
    for (let idx = 0; idx < itemList.length; idx++) {
      const maxItem = itemList[idx]
      if (maxItem.analysisType !== "X") return
      const minItem = minLengthArr[index]?.[idx]

      if (!compareMinList[index]) compareMinList[index] = []
      if (minItem) compareMinList[index].push(minItem.value)

      if (!compareMaxList[index]) compareMaxList[index] = []
      compareMaxList[index].push(maxItem.value)
    }
  })
  return [compareMinList, compareMaxList]
}

// 数组对齐
function listAlignment(obj) {
  const arr = _.map(obj, (item) => item)

  // 如果只有一项则不需要补齐直接返回
  if (arr.length === 1) return arr

  // 如果一样长则不做处理直接返回
  if (arr[0].length === arr[1].length) return arr

  // 按照数组的 length 长度，进行排序
  const sortList = arr.sort((a, b) => b.length - a.length)

  // 取出长的数组进行遍历，补齐短的数组，
  const [maxLengthArr, minLengthArr] = sortList

  const minArr = []

  const [compareMinList, compareMaxList] = getCompareList(sortList)

  console.log("%c [ compareMinList ]-99", "font-size:13px; background:#826b31; color:#c6af75;", compareMinList)
  console.log("%c [ compareMaxList ]-108", "font-size:13px; background:#93d0f9; color:#d7ffff;", compareMaxList)

  _.map(compareMaxList, (item, i) => {
    const minMaxIsEq = _.find(compareMinList, (minItem) => _.isEqual(minItem, item))

    console.log("%c [ minMaxIsEq ]-126", "font-size:13px; background:#d3b287; color:#fff6cb;", minMaxIsEq)
  })
}

listAlignment(analysisMapClone)

function getList() {
  const list = []
  _.forEach(analysisMapClone, (item, i) => {
    list.push(item)
  })
  if (list.length === 1) return list
  return [list[0], list[1]]
}

// 分别拿到两个数组
// 将第二个数组中每一项的 Y 留下
// 遍历第一个数组，将 Y 填充进去
function sourceDataFormat(analysisMapClone) {
  const [list1, list2] = getList(analysisMapClone)

  const list1Format = _.map(list1, (item) => {
    return _.map(item, (it) => {
      return {
        ...it,
        labelCode: `${it.labelCode}_0`,
      }
    })
  })
  if (!list2) return formatObj(list1)

  const list2List = []
  _.forEach(list2, (itemList, i) => {
    for (let idx = 0; idx < itemList.length; idx++) {
      const item = itemList[idx]
      item.labelCode = `${item.labelCode}_1`
      if (item.analysisType !== "X") {
        if (!list2List[i]) list2List[i] = []
        list2List[i].push(item)
      }
    }
  })

  // 遍历 list1，将 list2List 填充进去
  const arr = _.map(list1Format, (item, idx) => {
    item.push(...list2List[idx])
    return item
  })

  return formatObj(arr)
}

function formatObj(arr) {
  console.log("%c [ arr ]-191", "font-size:13px; background:#95f3ce; color:#d9ffff;", arr)
  return {}
}

sourceDataFormat(analysisMapClone)
