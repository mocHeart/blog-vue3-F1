// 颜色工具类

// 十种颜色的一组
const colorList: string[] = [
  "#FFAD5C",
  "#FFFF99",
  "#B5FF91",
  "#94DBFF",
  "#FFBAFF",
  "#FFBD9D",
  "#C7A3ED",
  "#CC9898",
  "#8AC007",
  "#CCC007",
];

/**
 * 随机生成一种颜色，如 #23D1F4
 * @returns {string}
 */
export function randomColor(): string {
  var max = 0xffffff;
  return "#" + Math.round(Math.random() * max).toString(16);
}

/**
 * 根据索引从10种颜色中选出一种
 * @returns {string}
 */
export function getColorOfTen(index: number): string {
  return colorList[index % 10];
}
