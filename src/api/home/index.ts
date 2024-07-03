// 统一管理首页模块接口1
import request from "@/utils/request";
import { IndexResp } from "@/api/home/type";

// 通过枚举管理首页模块的接口地址
enum API {
  // 博客基础信息
  INDEX_INFO_URL = "/",
}

// 获取博客的基础信息
export const reqIndexInfo = () =>request.get<any, IndexResp>(API.INDEX_INFO_URL);
