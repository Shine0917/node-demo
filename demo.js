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
      console.log(
        "%c [ y1 ]-49",
        "font-size:13px; background:#17b536; color:#5bf97a;",
        y1
      );
      const y1Item = {
        title: `${keys[0]}（${y1[idx].labelName}的 ${
          TypeOptions[y1[idx].analysisDimension]
        }）`,
        key: `${y1[idx].labelCode}_0`,
        dataIndex: `${y1[idx].labelCode}_0`,
      };
      const y2Item = {
        title: `${keys[1]}（${y2[idx].labelName}的 ${
          TypeOptions[y2[idx].analysisDimension]
        }）`,
        key: `${y2[idx].labelCode}_1`,
        dataIndex: `${y2[idx].labelCode}_1`,
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

// console.log(
//   "%c [ ySource ]-22",
//   "font-size:13px; background:#d24fe4; color:#ff93ff;",
//   ySource
// );
// // 去重数组
// console.log(
//   "%c [ xSource ]-35",
//   "font-size:13px; background:#9be044; color:#dfff88;",
//   xSource
// );

// const sourceCols = [...xSource, ...ySource];
// console.log(
//   "%c [ sourceCols ]-39",
//   "font-size:13px; background:#d7f257; color:#ffff9b;",
//   sourceCols
// );

// // 格式化数组 item
// const columns = _.map(sourceCols, (column) => {
//   const cgTitle = Object.keys(analysisMap);
//   console.log('%c [ cgTitle ]-27', 'font-size:13px; background:#5ff632; color:#a3ff76;', cgTitle)
//   if (column.analysisType === "Y") {
//     return {
//       title: `${cgTitle}(${column.labelName})的${
//         TypeOptions[column.analysisDimension]
//       }`,
//       key: column.labelCode,
//       dataIndex: column.labelCode,
//     };
//   }
//   return {
//     title: column.labelName,
//     key: column.labelCode,
//     dataIndex: column.labelCode,
//   };
// });

// console.log(
//   "%c [ columns ]-13",
//   "font-size:13px; background:#5db725; color:#a1fb69;",
//   columns
// );

// // 数组对象
// let dataSource = [];
// _.forEach(analysisMap, (column) => {
//   _.forEach(column, (list) => {
//     let obj = {};
//     _.map(list, (listItem) => {
//       obj[listItem.labelCode] = listItem.value;
//     });
//     dataSource.push(obj);
//   });
// });

// console.log(
//   "%c [ dataSource ]-21",
//   "font-size:13px; background:#a43e59; color:#e8829d;",
//   dataSource
// );
