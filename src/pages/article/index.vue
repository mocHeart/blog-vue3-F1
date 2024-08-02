<template>
  <div class="article">
    <!-- 封面图 -->
    <div class="banner" :style="cover">
      <div class="article-info-container">
        <!-- 文章标题 -->
        <div class="article-title">{{ articleTitle }}</div>
        <!-- 文章信息 -->
        <div class="article-info">
          <div class="first-line">
            <!-- 发表时间 -->
            <span>
              <v-icon icon="mdi-calendar-month-outline" size="x-small" />
              发表于 {{ getConvertDate(createTime) }}
            </span>
            <span class="separator">|</span>
            <!-- 发表时间 -->
            <span>
              <v-icon icon="mdi-update" size="x-small" />
              更新于
              <template v-if="updateTime">
                {{ getConvertDate(updateTime) }}
              </template>
              <template v-else>
                {{ getConvertDate(createTime) }}
              </template>
            </span>
            <span class="separator">|</span>
            <!-- 文章分类 -->
            <span class="article-category">
              <v-icon icon="mdi-shape-plus" size="x-small" />
              <router-link :to="'/categories/' + categoryId">
                {{ categoryName }}
              </router-link>
            </span>
          </div>
          <div class="second-line">
            <!-- 字数统计 -->
            <span>
              <v-icon icon="mdi-text-recognition" size="x-small" />
              字数统计: {{ wordNum }}
            </span>
            <span class="separator">|</span>
            <!-- 阅读时长 -->
            <span>
              <v-icon icon="mdi-clock-time-three-outline" size="x-small" />
              阅读时长: {{ readTime }}
            </span>
            <span class="separator">|</span>
            <!-- 阅读量 -->
            <span>
              <v-icon icon="mdi-eye-outline" size="x-small" />
              阅读量: {{ viewsCount }}
            </span>
            <span class="separator">|</span>
            <!-- 评论量 -->
            <span>
              <v-icon icon="mdi-comment-multiple-outline" size="x-small" />
              评论数: {{ commentCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1000px; background-color: aquamarine">12222</div>
  </div>
</template>

<script setup lang="ts" name="Article">
import { reqArticleDetail } from "@/api/article";
import { ArticleResp } from "@/api/article/type";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getConvertDate } from "@/utils/timeUtil";
import { md } from "@/plugins/markdown-it";

const route = useRoute();

let articleId = 0;
let articleCover = ref("");
let articleTitle = ref("");
let createTime = ref("");
let updateTime = ref("");
let categoryId = ref(0);
let categoryName = ref("");
let articleContent = ref("");
let wordNum = ref(0);
let readTime = ref("");
let viewsCount = ref(0);
let commentCount = ref(0);
onMounted(() => {
  articleId = parseInt(route.params?.articleId as string);
  getArticle();
});

const getArticle = async () => {
  let result: ArticleResp = await reqArticleDetail(articleId);
  console.log("@##", result);
  articleCover.value = result.data.articleCover;
  articleTitle.value = result.data.articleTitle;
  createTime.value = result.data.createTime;
  updateTime.value = result.data.updateTime;
  categoryId.value = result.data.categoryId;
  categoryName.value = result.data.categoryName;
  articleContent.value = md.render(result.data.articleContent);
  wordNum.value = deleteHTMLTag(articleContent.value).length;
  readTime.value = Math.round(wordNum.value / 300) + "分钟";
  viewsCount.value = result.data.viewsCount;
};

let cover = computed(() => {
  return (
    "background: url(" +
    articleCover.value +
    ") center center / cover no-repeat"
  );
});

const deleteHTMLTag = (content: string) => {
  return content
    .replace(/<\/?[^>]*>/g, "") // 去除HTML Tag
    .replace(/[|]*\n/, "") // 去除行尾空格
    .replace(/&npsp;/gi, ""); // 去除空格
};
</script>

<style scoped lang="scss">
.article {
  position: relative;
  flex: 1 1 auto;
  max-width: 100%;

  .banner {
    position: relative;
    color: #eee !important;
    height: 400px;
    animation: header-effect 1s;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 400px;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .article-info-container {
      position: absolute;
      top: 160px;
      padding: 0 8%;
      width: 100%;
      text-align: center;
      .article-title {
        font-size: 35px;
        margin: 20px 0 10px;
      }
      .article-info {
        font-size: 14px;
        line-height: 1.9;
        display: inline-block;
        .separator {
          margin: 0 6px;
        }
        a {
          color: #fff !important;
          margin-left: 4px;
        }
        .first-line, .first-line {
          margin: 5px auto;
        }
      }
    }
  }
}
</style>
