import { Resp } from "@/api/public/type";

export interface TagsResp extends Resp {
  data: TagsDataResp;
}

export interface TagsDataResp extends TagsResp {
  count: number;
  recordList: tagInfo[];
}

export interface tagInfo {
  id: number;
  tagName: string;
}
