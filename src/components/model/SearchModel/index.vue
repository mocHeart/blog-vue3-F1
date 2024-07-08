<template>
  <!-- 搜索框 -->
  <v-dialog v-model="homeStore.searchFlag" max-width="600">
    <v-card class="search-wrapper" style="border-radius: 4px">
      <!-- 标题栏 -->
      <div class="mb-3">
        <span class="search-title">本地搜索</span>
        <!-- 关闭按钮 -->
        <v-icon class="float-right" @click="homeStore.searchFlag = false">
          mdi-close
        </v-icon>
      </div>
      <!-- 输入框 -->
      <div class="search-input-wrapper">
        <v-icon>mdi-magnify</v-icon>
        <input v-model="keywords" placeholder="输入文章标题或内容..." />
      </div>
      <!-- 搜索结果 -->
      <div class="search-result-wrapper">
        <hr class="divider" />
        <!-- 搜索结果不存在提示 -->
        <div v-show="true" style="font-size: 0.875rem">
          找不到您查询的内容：{{ keywords }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts" name="SearchModel">
import useHomeStore from "@/store/modules/home";
import { ref } from "vue";

let homeStore = useHomeStore();
let keywords = ref("");
</script>

<style scoped lang="scss">
.search-wrapper {
  padding: 1.25rem;
  height: 100%;
  background: #fff !important;
  .search-title {
    color: #49b1f5;
    font-size: 1.25rem;
    line-height: 1;
  }
  .search-input-wrapper {
    display: flex;
    padding: 5px;
    height: 35px;
    width: 100%;
    border: 2px solid #8e8cd8;
    border-radius: 2rem;
    input {
      width: 100%;
      margin-left: 5px;
      outline: none;
    }
  }
  .search-result-wrapper{
    padding-right: 5px;
    height: 450px;
    overflow: auto;
    .divider{
      margin: 20px 0;
      border: 2px dashed #d2ebfd;
    }
  }
}
</style>
