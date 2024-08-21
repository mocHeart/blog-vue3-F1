import { Resp } from "@/api/public/type";

export interface CategoriesResp extends Resp {
  data: CategoriesDataResp;
}

export interface CategoriesDataResp extends CategoriesResp {
  count: number;
  recordList: CategoriesInfo[];
}

export interface CategoriesInfo {
  id: number;
  categoryName: string;
  articleCount: number;
}
