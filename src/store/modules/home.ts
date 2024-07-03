import { defineStore } from "pinia";

// 引入详情数据的ts类型
import type { IndexDataResp } from "@/api/home/type";

// pinia仓库写法： 组合式API 和 选择式API 写法
// 组合式API写法
const useHomeStore = defineStore("Home", {
  state: () => {
    return {
      // 首页页面数据信息
      indexInfo: {} as IndexDataResp,
    };
  },
  actions: {},
  getters: {},
});

// 获取仓库的方法对外暴露
export default useHomeStore;
