// 统一管理文章模块接口
import request from "@/utils/request";
import { ArticleResp } from "@/api/article/type";

// 通过枚举管理文章模块的接口地址
enum API {
  ARTICLE_DETAIL_URL = "/articles/",
}

// 获取文章数据
export const reqArticleDetail = (article_id: number) =>
  request.get<any, ArticleResp>(API.ARTICLE_DETAIL_URL + `${article_id}`);

