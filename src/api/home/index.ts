// 统一管理首页模块接口1
import request from "@/utils/request";
import { IndexResp, HomeTalksResp } from "@/api/home/type";

// 通过枚举管理首页模块的接口地址
enum API {
  // 博客基础信息
  INDEX_INFO_URL = "/",
  // 获取说说数据
  TALKS_DATA_URL = "/home/talks",
}

// 获取博客的基础信息
export const reqIndexInfo = () =>request.get<any, IndexResp>(API.INDEX_INFO_URL);
// 获取说说数据
export const reqTalksData = () =>request.get<any, HomeTalksResp>(API.TALKS_DATA_URL);
