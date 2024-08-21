// 统一管理友联模块接口
import request from "@/utils/request";
import { CategoriesResp } from "@/api/category/type";

// 通过枚举管理首页模块的接口地址
enum API {
  // 获取友链数据
  CATEGORIES_URL = "/categories",
}

// 获取友链数据
export const reqCategoriesData = () =>
  request.get<any, CategoriesResp>(API.CATEGORIES_URL);
