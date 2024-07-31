<template>
  <div class="archive">
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="archive-list">
      <div class="archive-total">目前共计{{ count }}篇文章，继续加油！</div>
      <v-timeline side="end" truncate-line="both">
        <v-timeline-item
          v-for="(item, index) of archiveList"
          :key="item.id"
          size="x-small"
          :dot-color="getColorOfTen(index)"
        >
          <template v-slot:opposite>
            <div>{{ getConvertDate(item.createTime) }}</div>
          </template>

          <!-- 文章标题 -->
          <router-link :to="'/articles/' + item.id">
            {{ item.articleTitle }}
          </router-link>
        </v-timeline-item>
      </v-timeline>
      <!-- 分页按钮 -->
      <v-pagination
        v-model="currentPage"
        class="pagination"
        :length="Math.ceil(count / 10)"
        total-visible="7"
        color="rgb(0, 196, 182)"
        size="34px"
        elevation="1"
        ellipsis="..."
      >
      </v-pagination>
    </v-card>
  </div>
</template>

<script setup lang="ts" name="Archive">
import useHomeStore from "@/store/modules/home";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { reqArchives } from "@/api/archive";
import { ArchivesResp, Archive } from "@/api/archive/type";
import { getConvertDate } from "@/utils/timeUtil.ts";
import { getColorOfTen } from "@/utils/colorUtil.ts";

let homeStore = useHomeStore();
let count = ref(0);
let archiveList: Archive[] = reactive([]);

onMounted(() => {
  getArchivesData();
});

let currentPage = ref(1);
const getArchivesData = async () => {
  let result: ArchivesResp = await reqArchives(currentPage.value);
  count.value = result.data.count;
  archiveList.length = 0;
  archiveList.push(...result.data.recordList);
};

let cover = computed(() => {
  var cover = "";
  homeStore.indexInfo.pageList?.forEach((item) => {
    if (item.pageLabel == "archive") {
      cover = item.pageCover;
    }
  });
  return "background: url(" + cover + ") center center / cover no-repeat";
});

watch(currentPage, (val) => {
  console.log("currentPage变化了", val);
  getArchivesData();
});
</script>

<style scoped lang="scss">
@keyframes title-scale {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: scale(1);
  }
}

.archive {
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
  .archive-list {
    max-width: 970px;
    padding: 40px 40px;
    margin: 40px auto;
    border-radius: 8px;
    background: #fff !important;
    color: #4c4948;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06) !important;
    .archive-total {
      padding: 0 5px 20px;
      color: rgb(55, 65, 74);
      font-weight: bold;
    }
  }
  .pagination {
    margin-top: 20px;
  }
}

:deep(.v-timeline-item__body) {
  width: 720px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
