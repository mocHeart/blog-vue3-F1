import { Resp } from "@/api/public/type";

export interface LinksResp extends Resp {
  data: LinksDataResp[];
}

export interface LinksDataResp extends LinksResp {
  id: number;
  linkAddress: string;
  linkAvatar: string;
  linkIntro: string;
  linkName: string;
}
