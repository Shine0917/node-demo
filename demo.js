const { analysisMap } = Tabledata;

let TypeOptions = {
  sum: "总和",
  min: "最小值",
  max: "最大值",
  avg: "均值",
  cg_count: "客群人数",
};

function getCols() {
  const xSource = [];
  const ySource = [];

  _.forEach(analysisMap, (list, key) => {
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

  const y1 = [];
  const y2 = [];
  let yy = [];
  const yLen = ySource.length;

  // 如果是多个 key 则分成两个数组
  const keys = Object.keys(analysisMap);

  // 判断有几个 key
  if (keys.length > 1) {
    _.forEach(ySource, (item, index) => {
      if (index < (yLen - 1) / 2) {
        y1.push(item);
      } else {
        y2.push(item);
      }
    });

    _.forEach(y1, (_item, idx) => {
      const y1IdxItem = y1[idx];
      const y1Item = {
        title: `${keys[0]}（${y1IdxItem.labelName}的 ${
          TypeOptions[y1IdxItem.analysisDimension]
        }）`,
        key: `${y1IdxItem.labelCode}_0`,
        dataIndex: `${y1IdxItem.labelCode}_0`,
      };

      const y2IdxItem = y2[idx];
      const y2Item = {
        title: `${keys[1]}（${y2IdxItem.labelName}的 ${
          TypeOptions[y2IdxItem.analysisDimension]
        }）`,
        key: `${y2IdxItem.labelCode}_1`,
        dataIndex: `${y2IdxItem.labelCode}_1`,
      };
      yy.push(y1Item);
      yy.push(y2Item);
    });
  } else {
    yy = ySource;
  }
  return [...xSource, ...yy];
}

const cols = getCols();

console.log(
  "%c [ cols ]-56",
  "font-size:13px; background:#14844b; color:#58c88f;",
  cols
);

// 数组对象
let dataSource = [];
_.forEach(analysisMap, (column) => {
  _.forEach(column, (list) => {
    let obj = {};
    _.map(list, (listItem) => {
      obj[listItem.labelCode] = listItem.value;
    });
    dataSource.push(obj);
  });
});

console.log(
  "%c [ dataSource ]-21",
  "font-size:13px; background:#a43e59; color:#e8829d;",
  dataSource
);
