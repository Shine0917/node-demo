// 1. 数据补齐
// 补齐之后，dataSource

// 数据补齐
// 先拿到两个对象的 value，然后排序（谁的 length 长就排前面）
// 遍历长的数组对短的数组进行补齐
// 同时将 Y 的 labelCode 补下标 数组1： ol_stats_161_0  数组2：ol_stats_161_1




// 如何将数据转换成下面
const list = [
  { labelCode: "ol_cls_246", value: "男" },
  {
    labelCode: "ol_cls_229",
    value: "JDZAD",
  },
  {
    labelcode: "ol_stats_161_0",
    value: "",
  },
  {
    labelcode: "ol_stats_161_1",
    value: "3",
  },
];

// const res = list.map((item) => {
//   return {
//     [item.labelCode]: item.value,
//   };
// });
