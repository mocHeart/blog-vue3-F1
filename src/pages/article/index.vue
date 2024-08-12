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
    <!-- 内容 -->
    <v-row class="article-container" style="border: 2px solid darkcyan">
      <!-- 左边文章主体 -->
      <v-col md="9" cols="12">
        <v-card class="article-wrapper" elevation="10" rounded-lg>
          <!--  Markdown文章  -->
          <article
            class="article-content markdown-body"
            v-html="articleContent"
            ref="article"
          />
          <!-- 版权声明 -->
          <div class="aritcle-copyright">
            <div>
              <span>文章作者：</span>
              <router-link to="/">
                {{ homeStore.indexInfo.websiteConfig.websiteAuthor }}
              </router-link>
            </div>
            <div>
              <span>文章链接：</span>
              <a :href="articleHref" target="_blank">{{ articleHref }} </a>
            </div>
            <div>
              <span>版权声明：</span>本博客所有文章除特别声明外，均采用
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>
              许可协议。转载请注明文章出处。
            </div>
          </div>
          <!-- 标签和分享(未实现) -->
          <div class="article-operation">
            <div class="tag-container">
              <router-link
                v-for="item of tagDTOList"
                :key="item.id"
                :to="'/tags/' + item.id"
              >
                {{ item.tagName }}
              </router-link>
            </div>
          </div>
          <!-- 点赞打赏等 -->
          <div class="article-reward">
            <!-- 点赞按钮 -->
            <a :class="isLike" @click="cLick">
              <v-icon icon="mdi-thumb-up" size="small" color="#fff" /> 点赞
              <span v-show="1 > 0">{{ 1 + 1 }}</span>
            </a>
            <a
              class="reward-btn"
              v-if="homeStore.indexInfo.websiteConfig.isReward == 0"
            >
              <!-- 打赏按钮 -->
              <v-icon icon="mdi-qrcode" size="small" color="#fff" /> 打赏
              <!-- 二维码 -->
              <div class="animate__animated animate__fadeInDown reward-main">
                <ul class="reward-all">
                  <li class="reward-item">
                    <img
                      class="reward-img"
                      src="https://macwoss.oss-cn-beijing.aliyuncs.com/config/16449fed803e665ebecb3055a5c992e2.jpg"
                    />
                    <div class="reward-desc">微信</div>
                  </li>
                  <li class="reward-item">
                    <img
                      class="reward-img"
                      src="https://macwoss.oss-cn-beijing.aliyuncs.com/config/16449fed803e665ebecb3055a5c992e2.jpg"
                    />
                    <div class="reward-desc">支付宝</div>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <!-- 上下一篇文章 -->
          <div class="pagination-post">
            <!-- 上一篇 -->
            <div class="post" v-if="lastArticle.id">
              <router-link :to="'/articles/' + lastArticle.id">
                <img class="post-cover" :src="lastArticle.articleCover" />
                <div class="post-info">
                  <div class="label">上一篇</div>
                  <div class="post-title">
                    {{ lastArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
            <!-- 下一篇 -->
            <div class="post" v-if="nextArticle.id">
              <router-link :to="'/articles/' + nextArticle.id">
                <img class="post-cover" :src="nextArticle.articleCover" />
                <div class="post-info" style="text-align: right">
                  <div class="label">下一篇</div>
                  <div class="post-title">
                    {{ nextArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div class="recommend-container" v-if="recommendArticleList.length">
            <div class="recommend-title">
              <v-icon icon="mdi-thumb-up" size="20" color="#4c4948" /> 相关推荐
            </div>
            <div class="recommend-list">
              <div
                class="recommend-item"
                v-for="item of recommendArticleList"
                :key="item.id"
              >
                <router-link :to="'/articles/' + item.id">
                  <img class="recommend-cover" :src="item.articleCover" />
                  <div class="recommend-info">
                    <div class="recommend-date">
                      <v-icon icon="mdi-calendar-month-outline" size="14" />
                      {{ getConvertDate(item.createTime as string) }}
                    </div>
                    <div>{{ item.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 分割线 -->
          <hr />
        </v-card>
      </v-col>
      <!-- 侧边功能 -->
      <v-col
        md="3"
        cols="12"
        class="d-md-block d-none"
        style="border: 2px solid blue"
      >
        2222
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts" name="Article">
import useHomeStore from "@/store/modules/home";
import { reqArticleDetail } from "@/api/article";
import { ArticleInfo, ArticleResp, TagDTO } from "@/api/article/type";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getConvertDate } from "@/utils/timeUtil";
import { md } from "@/plugins/markdown-it";
import "@/style/markdown.scss";

const route = useRoute();
let homeStore = useHomeStore();

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
let articleHref = ref(window.location.href);
let tagDTOList = ref([] as TagDTO[]);
let lastArticle = reactive({} as ArticleInfo);
let nextArticle = reactive({} as ArticleInfo);
let recommendArticleList = ref([] as ArticleInfo[]);
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
  result.data.tagDTOList.forEach((it: TagDTO) => {
    tagDTOList.value.push(it);
  });
  lastArticle = result.data.lastArticle;
  nextArticle = result.data.nextArticle;
  result.data.recommendArticleList.forEach((it: ArticleInfo) => {
    recommendArticleList.value.push(it);
  });
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

let like = ref(false);
let isLike = computed(() => {
  return like.value ? "like-btn-active" : "like-btn";
});
let cLick = () => {
  like.value = !like.value;
};
</script>

<style scoped lang="scss">
@keyframes main {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}

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
        .first-line,
        .first-line {
          margin: 5px auto;
        }
      }
    }
  }

  .article-container {
    animation: main 1s;
    max-width: 1300px;
    margin: 25px auto 0;
    padding: 0 10px;
    .article-wrapper {
      padding: 50px 40px;
      border-radius: 10px;
      .aritcle-copyright {
        position: relative;
        margin-top: 35px;
        margin-bottom: 10px;
        font-size: 0.875rem;
        line-height: 2;
        padding: 0.625rem 1rem;
        border: 1px solid #eee;
        span {
          color: #49b1f5;
          font-weight: bold;
        }
        a {
          text-decoration: underline !important;
          color: #99a9bf !important;
        }
        &::before {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 1rem;
          height: 1rem;
          border-radius: 1rem;
          background: #49b1f5;
          content: "";
        }
        &::after {
          position: absolute;
          top: 0.95rem;
          right: 0.95rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.5em;
          background: #fff;
          content: "";
        }
      }
      .article-operation {
        display: flex;
        align-items: center;
        .tag-container {
          a {
            display: inline-block;
            margin: 0.5rem 0.5rem 0.5rem 0;
            padding: 0 0.75rem;
            width: fit-content;
            border: 1px solid #49b1f5;
            border-radius: 1rem;
            color: #49b1f5 !important;
            font-size: 12px;
            line-height: 2;
            &:hover {
              color: #fff !important;
              background: #49b1f5;
              transition: all 0.5s;
            }
          }
        }
      }
      .article-reward {
        margin-top: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .like-btn {
          display: inline-block;
          width: 100px;
          background: #969696;
          color: #fff !important;
          text-align: center;
          line-height: 36px;
          font-size: 0.875rem;
        }
        .like-btn-active {
          display: inline-block;
          width: 100px;
          background: #ec7259;
          color: #fff !important;
          text-align: center;
          line-height: 36px;
          font-size: 0.875rem;
        }
        .reward-btn {
          position: relative;
          display: inline-block;
          width: 100px;
          background: #49b1f5;
          margin: 0 1rem;
          color: #fff !important;
          text-align: center;
          line-height: 36px;
          font-size: 0.875rem;
          .reward-main {
            display: none;
            position: absolute;
            bottom: 40px;
            left: 0;
            margin: 0;
            padding: 0 0 15px;
            width: 100%;
            .reward-all {
              display: inline-block;
              margin: 0 0 0 -110px;
              padding: 20px 10px 8px !important;
              width: 320px;
              border-radius: 4px;
              background: #f5f5f5;
              &::before {
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 20px;
                content: "";
              }
              &::after {
                content: "";
                position: absolute;
                right: 0;
                bottom: 2px;
                left: 0;
                margin: 0 auto;
                width: 0;
                height: 0;
                border-top: 13px solid #f5f5f5;
                border-right: 13px solid transparent;
                border-left: 13px solid transparent;
              }
              .reward-item {
                display: inline-block;
                padding: 0 8px;
                list-style-type: none;
                .reward-img {
                  width: 130px;
                  height: 130px;
                  display: block;
                }
              }
            }
          }
          &:hover {
            .reward-main {
              display: block;
            }
          }
        }
      }
      .pagination-post {
        display: flex;
        margin-top: 25px;
        overflow: hidden;
        width: 100%;
        background: #000;
        .post {
          width: 100% !important;
          position: relative;
          height: 150px;
          overflow: hidden;
          &:hover {
            .post-cover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
          a {
            position: relative;
            display: block;
            overflow: hidden;
            height: 150px;
            .post-cover {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0.4;
              transition: all 0.6s;
              object-fit: cover;
            }
            .post-info {
              position: absolute;
              top: 50%;
              padding: 20px 40px;
              width: 100%;
              transform: translate(0, -50%);
              line-height: 2;
              font-size: 14px;
              .label {
                font-size: 90%;
                color: #eee;
              }
              .post-title {
                font-weight: 500;
                color: #fff;
              }
            }
          }
        }
      }
      .recommend-container {
        margin-top: 25px;
        .recommend-title {
          font-size: 20px;
          line-height: 2;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .recommend-list {
          .recommend-item {
            position: relative;
            display: inline-block;
            overflow: hidden;
            margin: 3px;
            width: calc(33.333% - 6px);
            height: 200px;
            background: #000;
            vertical-align: bottom;
            &:hover {
              .recommend-cover {
                opacity: 0.8;
                transform: scale(1.1);
              }
            }
            a {
              .recommend-cover {
                width: 100%;
                height: 100%;
                opacity: 0.4;
                transition: all 0.6s;
                object-fit: cover;
              }
              .recommend-info {
                line-height: 2;
                color: #fff;
                position: absolute;
                top: 50%;
                padding: 0 20px;
                width: 100%;
                transform: translate(0, -50%);
                text-align: center;
                font-size: 14px;
                .recommend-date {
                  font-size: 90%;
                }
              }
            }
          }
        }
      }
      hr {
        position: relative;
        margin: 30px auto;
        border: 2px dashed #d2ebfd;
        width: calc(100% - 4px);
      }
    }
  }
}
</style>
