import { Resp } from "@/api/public/type";

export interface ArticleResp extends Resp {
  data: ArticleDataResp;
}

export interface ArticleDataResp extends ArticleResp {
  articleContent: string;
  articleCover: string;
  articleTitle: string;
  categoryId: number;
  categoryName: string;
  createTime: string;
  id: number;
  lastArticle: ArticleInfo;
  likeCount: number | null;
  newestArticleList: ArticleInfo[];
  nextArticle: ArticleInfo;
  originalUrl: string;
  recommendArticleList: ArticleInfo[];
  tagDTOList: TagDTO[];
  type: number;
  updateTime: string;
  viewsCount: number;
}

export interface ArticleInfo {
  id: number;
  articleTitle: string;
  articleCover: string;
  createTime: string | null | undefined;
}

export interface TagDTO {
  id: number;
  tagName: string;
}
