const { analysisMap } = Tabledata;

let TypeOptions = {
  sum: "总和",
  min: "最小值",
  max: "最大值",
  avg: "均值",
  cg_count: "客群人数",
};

const analysisMapClone = _.cloneDeep(analysisMap);
// 全局使用的 keys
const keys = Object.keys(analysisMapClone);

// 小于一半
function lessHalf(list, idx) {
  // 如果只有一个 key 则不需要分组
  if (keys.length < 2) {
    return true;
  }
  return idx < (list.length - 1) / 2;
}

// 区分 key 用的 index
function getIdx(list, idx) {
  return lessHalf(list, idx) ? 0 : 1;
}

function getTitle(list, idx, item) {
  const titlePrefix = lessHalf(list, idx, keys) ? keys[0] : keys[1];
  const prefix = titlePrefix.split("_")[1];
  const titleItem =
    item.analysisDimension === "cg_count"
      ? "客群人数"
      : `${item.labelName}的${TypeOptions[item.analysisDimension]}`;
  const title = `${prefix}(${titleItem})`;
  return title;
}

function getCols() {
  const xSource = [];
  const ySource = [];

  _.forEach(analysisMapClone, (list) => {
    const xItem = _.filter(list[0], (item) => item.analysisType === "X");
    const xList = _.map(xItem, (item) => {
      return {
        title: item.labelName,
        key: item.labelCode,
        dataIndex: item.labelCode,
      };
    });
    if (_.isEmpty(xSource)) {
      xSource.push(...xList);
    }
    ySource.push(..._.filter(list[0], (item) => item.analysisType === "Y"));
  });

  const yList = _.map(ySource, (item, idx) => {
    const title = getTitle(ySource, idx, item);
    return {
      title,
      key: `${item.labelCode}_${getIdx(ySource, idx, keys)}`,
      dataIndex: `${item.labelCode}_${getIdx(ySource, idx, keys)}`,
    };
  });

  return [...xSource, ...yList];
}

const cols = getCols();

function getCompareList(sortList) {
  const [maxLengthArr, minLengthArr] = sortList;
  const compareMinList = [];
  const compareMaxList = [];
  _.forEach(maxLengthArr, (itemList, index) => {
    for (let idx = 0; idx < itemList.length; idx++) {
      const maxItem = itemList[idx];
      if (maxItem.analysisType !== "X") return;
      const minItem = minLengthArr[index]?.[idx];

      if (!compareMinList[index]) compareMinList[index] = [];
      if (minItem) compareMinList[index].push(minItem.value);

      if (!compareMaxList[index]) compareMaxList[index] = [];
      compareMaxList[index].push(maxItem.value);
    }
  });
  return [compareMinList, compareMaxList];
}

// 数组对齐
function listAlignment(obj) {
  const arr = _.map(obj, (item) => item);

  // 如果只有一项则不需要补齐直接返回
  if (arr.length === 1) return arr;

  // 如果一样长则不做处理直接返回
  if (arr[0].length === arr[1].length) return arr;

  // 按照数组的 length 长度，进行排序
  const sortList = arr.sort((a, b) => b.length - a.length);

  // 取出长的数组进行遍历，补齐短的数组，
  const [maxLengthArr, minLengthArr] = sortList;

  const minArr = [];

  const [compareMinList, compareMaxList] = getCompareList(sortList);

  console.log(
    "%c [ compareMinList ]-99",
    "font-size:13px; background:#826b31; color:#c6af75;",
    compareMinList
  );
  console.log(
    "%c [ compareMaxList ]-108",
    "font-size:13px; background:#93d0f9; color:#d7ffff;",
    compareMaxList
  );

  _.map(compareMaxList, (item, i) => {
    const minMaxIsEq = _.find(compareMinList, (minItem) =>
      _.isEqual(minItem, item)
    );

    console.log(
      "%c [ minMaxIsEq ]-126",
      "font-size:13px; background:#d3b287; color:#fff6cb;",
      minMaxIsEq
    );
  });
}

listAlignment(analysisMapClone);
