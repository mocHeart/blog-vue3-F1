import { Resp } from "@/api/public/type";

// 获取首页/返回的数据ts类型
export interface IndexResp extends Resp {
  data: IndexDataResp;
}

// 首页/返回的数据data
export interface IndexDataResp {
  articleCount: number; // 文章数量
  categoryCount: number; // 分类数量
  tagCount: number; // 标签数量
  viewsCount: string; // 总访问量
  pageList: PageListResp[]; // 菜单栏信息
  websiteConfig: WebConfigResq; // 网站配置信息
}

// 菜单栏数据
export interface PageListResp {
  id: number; // 菜单序号
  pageCover: string; // 菜单封面
  pageLabel: string; // 菜单标签
  pageName: string; // 菜单名称
}

// 网站配置信息
export interface WebConfigResq {
  websiteAvatar: string;
  websiteName: string;
  websiteAuthor: string;
  websiteIntro: string;
  websiteNotice: string;
  websiteCreateTime: string;
  websiteRecordNo: string;
  socialLoginList: string[];
  socialUrlList: string[];
  qq: string;
  github: string;
  gitee: string;
  touristAvatar: string;
  userAvatar: string;
  isCommentReview: number;
  isMessageReview: number;
  isEmailNotice: number;
  isReward: number;
  weiXinQRCode: string;
  alipayQRCode: string;
  isChatRoom: number;
  websocketUrl: string;
  isMusicPlayer: number;
}

// 获取说说/home/talks返回的数据ts类型
export interface HomeTalksResp extends Resp {
  data: string[];
}

// 获取说说/home/talks返回的数据ts类型
export interface HomeArticlesResp extends Resp {
  data: ArticleInfo[];
}

export interface ArticleInfo {
  id: number;
  articleCover: string;
  articleTitle: string;
  articleContent: string;
  createTime: string;
  isTop: number;
  type: number;
  categoryId: number;
  categoryName: string;
  tagDTOList: tagDTO[];
}

export interface tagDTO {
  id: number;
  tagName: string;
}
