// 定义响应数据的顶层数据类型
export interface Resp {
  code: number; // 响应码，成功：20000
  message: string; // 响应结果消息："操作成功"
  flag: boolean; // 请求是否成功
}
