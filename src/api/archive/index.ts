// 统一管理归档模块接口
import request from "@/utils/request";
import { ArchivesResp } from "@/api/archive/type";

// 通过枚举管理归档模块的接口地址
enum API {
  // 获取所有文章的时间归档（名称及创建日期）
  ARCHIVE_TIME_URL = "/articles/archives",
}

// 获取文章数据
export const reqArchives = (cur: number) =>
  request.get<any, ArchivesResp>(API.ARCHIVE_TIME_URL + `?current=${cur}`);

