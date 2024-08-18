// 统一管理友联模块接口
import request from "@/utils/request";
import { TagsResp } from "@/api/tag/type";

// 通过枚举管理首页模块的接口地址
enum API {
  // 获取友链数据
  TAGS_URL = "/tags",
}

// 获取友链数据
export const reqTagsData = () =>
  request.get<any, TagsResp>(API.TAGS_URL);
