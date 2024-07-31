import { Resp } from "@/api/public/type";

export interface ArchivesResp extends Resp {
  data: ArchivesDataResp;
}

export interface ArchivesDataResp extends ArchivesResp {
  count: number;
  recordList: Archive[];
}

export interface Archive {
  articleTitle: string;
  createTime: string;
  id: number;
}