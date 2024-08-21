<template>
  <div class="category">
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">分类</h1>
    </div>

    <!-- 分类列表 -->
    <v-card class="blog-container">
      <div class="category-title">分类 - {{ count }}</div>
      <ul class="category-list">
        <li
          class="category-list-item"
          v-for="item of categoryList"
          :key="item.id"
        >
          <router-link :to="'/categories/' + item.id">
            {{ item.categoryName }}
            <span class="category-count">({{ item.articleCount }})</span>
          </router-link>
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script lang="ts" setup name="Category">
import { reqCategoriesData } from "@/api/category";
import { CategoriesInfo, CategoriesResp } from "@/api/category/type";
import useHomeStore from "@/store/modules/home";
import { computed, onMounted, ref } from "vue";

let homeStore = useHomeStore();
let cover = computed(() => {
  var cover = "";
  homeStore.indexInfo.pageList?.forEach((item) => {
    if (item.pageLabel == "link") {
      cover = item.pageCover;
    }
  });
  return "background: url(" + cover + ") center center / cover no-repeat";
});

onMounted(() => {
  getCategoriesData();
});

let count = ref(0);
let categoryList = ref([] as CategoriesInfo[]);
const getCategoriesData = async () => {
  let result: CategoriesResp = await reqCategoriesData();
  console.log(result);
  count.value = result.data.count;
  result.data.recordList.forEach((it) => {
    categoryList.value.push(it);
  });
};
</script>

<style scoped lang="scss">
.category {
  position: relative;
  flex: 1 1 auto;
  max-width: 100%;

  .banner {
    background-color: #49b1f5 !important;
    height: 400px;
    animation: header-effect 1s;
    .banner-title {
      animation: title-scale 1s;
      position: absolute;
      top: 12.5rem;
      padding: 0 0.5rem;
      width: 100%;
      font-size: 2.5rem;
      text-align: center;
      color: #eee;
    }
  }

  .blog-container {
    max-width: 970px;
    padding: 40px 40px;
    margin: 40px auto;
    border-radius: 8px;
    background: #fff !important;
    color: #4c4948;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06) !important;
    .category-title {
      text-align: center;
      font-size: 36px;
      line-height: 2;
    }
    .category-list {
      margin: 0 1.8rem;
      list-style: none;
      .category-list-item {
        padding: 8px 1.8rem 8px 0;
        &:before {
          display: inline-block;
          position: relative;
          left: -0.75rem;
          width: 12px;
          height: 12px;
          border: 0.2rem solid #49b1f5;
          border-radius: 50%;
          background: #fff;
          content: "";
          transition-duration: 0.3s;
        }
        &:hover:before {
          border: 0.2rem solid #ff7242;
        }
        a:hover {
          transition: all 0.3s;
          color: #8e8cd8;
        }
        .category-count {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          color: #858585;
        }
      }
    }
  }
}
</style>
