<template>
  <div class="tag">
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">标签</h1>
    </div>

    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签 - {{ count }}</div>
      <div class="tag-cloud">
        <router-link
          :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
          v-for="item of tagList"
          :key="item.id"
          :to="'/tags/' + item.id"
        >
          {{ item.tagName }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup name="Tag">
import { reqTagsData } from "@/api/tag";
import { tagInfo, TagsResp } from "@/api/tag/type";
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
  getTagsData();
});

let count = ref(0);
let tagList = ref([] as tagInfo[]);
const getTagsData = async () => {
  let result: TagsResp = await reqTagsData();
  console.log(result);
  count.value = result.data.count;
  result.data.recordList.forEach((it) => {
    tagList.value.push(it);
  });
};
</script>

<style scoped lang="scss">
.tag {
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
    .tag-cloud-title {
      line-height: 2;
      font-size: 36px;
      text-align: center;
    }
    .tag-cloud {
        text-align: center;
        a {
          color: #616161;
          display: inline-block;
          text-decoration: none;
          padding: 0 8px;
          line-height: 2;
          transition: all 0.3s;
          &:hover {
            color: #03a9f4 !important;
            transform: scale(1.1);
          }
        }
      }
  }
}
</style>
