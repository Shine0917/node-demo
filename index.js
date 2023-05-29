const Tabledata = {
  flag: 4,
  analysisMap: {
    "50_客群多维分析-勿动": [
      [
        {
          labelCode: "ol_cls_246",
          labelName: "分类标签-有明细表-无明细条件",
          analysisType: "X",
          value: "女",
        },
        {
          labelCode: "ol_cls_229",
          labelName: "分类标签--无明细表数据",
          analysisType: "X",
          value: "JDZAD",
        },
        {
          labelCode: "ol_stats_161",
          labelName: "统计标签-有条件（单字段_string_不等于）-次数",
          analysisType: "Y",
          analysisDimension: "min",
          value: "",
        },
        {
          labelCode: "ol_stats_200",
          labelName: "统计标签-有条件（单字段_布尔类型）-无值-次数",
          analysisType: "Y",
          analysisDimension: "sum",
          value: "2.0000",
        },
        {
          labelCode: "ol_stats_201",
          labelName: "统计标签-有条件（单字段_布尔类型）-有值-次数",
          analysisType: "Y",
          analysisDimension: "avg",
          value: "6.000000",
        },
        {
          labelCode: "ol_stats_202",
          labelName: "统计标签-有条件（单字段_布尔类型）-有值-次数",
          analysisType: "Y",
          analysisDimension: "max",
          value: "11.0000",
        },
        {
          labelCode: "cg_count",
          labelName: "客群人数",
          analysisType: "Y",
          analysisDimension: "cg_count",
          value: "1",
        },
      ],
      [
        {
          labelCode: "ol_cls_246",
          labelName: "分类标签-有明细表-无明细条件",
          analysisType: "X",
          value: "男",
        },
        {
          labelCode: "ol_cls_229",
          labelName: "分类标签--无明细表数据",
          analysisType: "X",
          value: "JDZAD",
        },
        {
          labelCode: "ol_stats_161",
          labelName: "统计标签-有条件（单字段_string_不等于）-次数",
          analysisType: "Y",
          analysisDimension: "min",
          value: "",
        },
        {
          labelCode: "ol_stats_200",
          labelName: "统计标签-有条件（单字段_布尔类型）-无值-次数",
          analysisType: "Y",
          analysisDimension: "sum",
          value: "3.0000",
        },
        {
          labelCode: "ol_stats_201",
          labelName: "统计标签-有条件（单字段_布尔类型）-有值-次数",
          analysisType: "Y",
          analysisDimension: "avg",
          value: "7.000000",
        },
        {
          labelCode: "ol_stats_202",
          labelName: "统计标签-有条件（单字段_布尔类型）-有值-次数",
          analysisType: "Y",
          analysisDimension: "max",
          value: "11.0000",
        },
        {
          labelCode: "cg_count",
          labelName: "客群人数",
          analysisType: "Y",
          analysisDimension: "cg_count",
          value: "1",
        },
      ],
    ],
  },
};

// 简化版原始数据
const sourceData = {
  flag: 4,
  analysisMap: {
    "50_客群多维分析-勿动": [
      [
        {
          labelCode: "ol_cls_246",
          labelName: "分类标签-有明细表-无明细条件",
          analysisType: "X",
          value: "女",
        },
      ],
    ],
  },
};

// 转换后的期望数据格式
// const columns = [
//   {
//     title: "分类标签-有明细表-无明细条件",
//     key: "ol_cls_246",
//   },
// ];

// 转换后的 dataSource
// const dataSource = [
//   {
//     ol_cls_246: '女' // labelCode: value
//   }
// ]

