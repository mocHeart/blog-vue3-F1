// 统一管理友联模块接口
import request from "@/utils/request";
import { LinksResp } from "@/api/link/type";

// 通过枚举管理首页模块的接口地址
enum API {
  // 获取友链数据
  LINKS_URL = "/links",
}

// 获取友链数据
export const reqLinksData = () =>
  request.get<any, LinksResp>(API.LINKS_URL);
