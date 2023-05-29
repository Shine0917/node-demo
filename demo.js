const { analysisMap } = Tabledata;
console.log(
  "%c [ analysisMap ]-2",
  "font-size:13px; background:#d393cc; color:#ffd7ff;",
  Object.keys(analysisMap)
);

let TypeOptions = {
  sum: '总和',
  min: '最小值',
  max: '最大值',
  avg: '均值',
  cg_count: '客群人数'
}
// 对象转换为数组
let sourceCols = [];
_.forEach(analysisMap, (list) => {
  if (!_.isEmpty(list) && _.isEmpty(sourceCols)) {
    sourceCols = list[0];
  }
});

// 格式化数组 item
const columns = _.map(sourceCols, (column) => {
  console.log(
    "%c [ column ]-13",
    "font-size:13px; background:#db23e9; color:#ff67ff;",
    column
  );
  const cgTitle = Object.keys(analysisMap);
  if (column.analysisType === "Y") {
    return {
      title: `${cgTitle}(${column.labelName})的${TypeOptions[column.analysisDimension]}`,
      key: column.labelCode,
      dataIndex: column.labelCode,
    };
  }
  return {
    title: column.labelName,
    key: column.labelCode,
    dataIndex: column.labelCode,
  };
});
console.log(
  "%c [ columns ]-13",
  "font-size:13px; background:#5db725; color:#a1fb69;",
  columns
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
