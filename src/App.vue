<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    <!-- 内容 -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- 页脚 -->
    <Footer></Footer>
  </v-app>
</template>

<script setup lang="ts">
import TopNavBar from "@/components/TopNavBar/index.vue";
import Footer from "@/components/Footer/index.vue";
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
  console.log("-->", result);
  if (result.code == 20000) {
    homeStore.indexInfo = result.data;
  }
};
</script>

<style scoped lang="scss">
.topMargin {
  margin-top: 60px;
}

:deep(.v-container) {
  background-color: #cecece;
}
</style>
