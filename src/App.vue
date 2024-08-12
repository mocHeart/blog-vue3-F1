<template>
  <v-app class="appp">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>

    <!-- 内容 -->
    <div class="main">
      <!-- :key="$route.fullPath" 跳转至相同路由(参数不同)时,强制刷新页面 -->
      <router-view :key="$route.fullPath"></router-view>
    </div>

    <!-- 页脚 -->
    <Footer></Footer>

    <!-- 搜索模态框 -->
    <SearchModel></SearchModel>
  </v-app>
</template>

<script setup lang="ts">
import TopNavBar from "@/components/layout/TopNavBar/index.vue";
import Footer from "@/components/layout/Footer/index.vue";
import SearchModel from "@/components/model/SearchModel/index.vue";
import { onMounted } from "vue";
import { reqIndexInfo } from "@/api/home";
import useHomeStore from "@/store/modules/home";
import { IndexResp } from "@/api/home/type";

// 获取仓库对象
let homeStore = useHomeStore();

onMounted(() => {
  // 获取首页基础信息
  getIndexInfo();
});

// 获取博客基础信息
const getIndexInfo = async () => {
  let result: IndexResp = await reqIndexInfo();
  if (result.code == 20000) {
    homeStore.indexInfo = result.data;
  }
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  min-height: calc(100vh - 138px);
}
</style>
