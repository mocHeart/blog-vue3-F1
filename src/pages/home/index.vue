<template>
  <!-- banner -->
  <div class="home-banner" :style="cover">
    <div class="banner-container">
      <!-- 网站名称 -->
      <h1 class="blog-title animate__animated animate__zoomIn">
        {{ homeStore.indexInfo.websiteConfig.websiteName }}
      </h1>
      <!-- 一言 -->
      <div class="blog-intro">
        {{ obj.output }} <span class="animate__animated animate__flash">|</span>
      </div>
      <!-- 向下滚动 -->
      <div class="scroll-down" @click="scrollDown">
        <v-icon
          class="scroll-down-effects"
          color="success"
          icon="mdi-chevron-down"
        />
      </div>
    </div>
  </div>

  <!-- 主页文章 -->
  <v-row class="home-container">
    <v-col md="9" cols="12">
      <!-- 说说轮播 -->
      <v-card
        class="animate__animated animate__zoomIn"
        v-if="talkList.length > 0"
      >
        <Swiper :list="talkList" />
      </v-card>
      <!-- 主页文章 -->
      <v-card
        class="article-card animate__animated animate__zoomIn"
        style="border-radius: 12px 8px 8px 12px"
        v-for="(item, index) of articleList"
        :key="item.id"
      >
        <!-- 文章封面图 -->
        <div :class="isRight(index)">
          <router-link :to="'/articles/' + item.id">
            <v-img
              class="on-hover"
              width="100%"
              height="100%"
              cover
              :src="item.articleCover"
            />
          </router-link>
        </div>
        <!-- 文章信息 -->
        <div class="article-wrapper">
          <div style="line-height: 1.4">
            <router-link :to="'/articles/' + item.id">
              {{ item.articleTitle }}
            </router-link>
          </div>
          <div class="article-info">
            <!-- 是否置顶 -->
            <span v-if="item.isTop == 1">
              <span style="color: #ff7242">
                <v-icon size="16" icon="mdi-arrow-up-bold" />置顶
              </span>
              <span class="separator">|</span>
            </span>
            <!-- 发表时间 -->
            <v-icon size="16" icon="mdi-calendar-month-outline" />
            {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
            <span class="separator">|</span>
            <!-- 文章分类 -->
            <router-link :to="'/categories/' + item.categoryId">
              <v-icon size="16" icon="mdi-inbox-full" />
              {{ item.categoryName }}
            </router-link>
            <span class="separator">|</span>
            <!-- 文章标签 -->
            <router-link
              style="display: inline-block"
              :to="'/tags/' + tag.id"
              class="mr-1"
              v-for="tag of item.tagDTOList"
              :key="tag.id"
            >
              <v-icon size="16" icon="mdi-tag-multiple" />{{ tag.tagName }}
            </router-link>
          </div>
          <!-- 文章内容 -->
          <div class="article-content">
            {{ item.articleContent }}
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col md="3" cols="12" class="d-md-block d-none"> 2222 </v-col>
  </v-row>
</template>

<script setup lang="ts" name="Home">
import useHomeStore from "@/store/modules/home";
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  Ref,
} from "vue";
import EasyTyper from "easy-typer-js";
import { reqArticles, reqTalksData } from "@/api/home";
import { ArticleInfo, HomeArticlesResp, HomeTalksResp } from "@/api/home/type";
import Swiper from "@/components/widget/Swiper/index.vue";

let homeStore = useHomeStore();
let dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
let cover = computed(() => {
  var cover = "";
  homeStore.indexInfo.pageList?.forEach((item) => {
    if (item.pageLabel == "home") {
      cover = item.pageCover;
    }
  });
  return "background: url(" + cover + ") center center / cover no-repeat";
});

let obj = reactive({
  output: "", // 初始显示的内容
  isEnd: false, // 全局控制是否终止
  speed: 200, // 打字速度,打一个字需要的毫秒数
  singleBack: false, // 单次的回滚（优先级高于type)
  sleep: 0, // 完整输出完一句话后，睡眠一定时间后触发回滚事件
  type: "normal", // 下一次的行为 'rollback', 'normal', 'custom' 有且仅有此三种
  backSpeed: 0, // 回滚速度
  sentencePause: false, // 整个生命周期运行完毕后，句子是否暂停显示（仅在回滚模式下生效）
});

onMounted(() => {
  // 网站标题
  document.title = homeStore.indexInfo.websiteConfig?.websiteName;

  // 一言Api进行打字机循环输出效果
  fetch("https://v1.hitokoto.cn")
    .then((res) => {
      return res.json();
    })
    .then(({ hitokoto, from_who, from }) => {
      // 第一个匿名函数：完成一次output输出后的回调函数
      // 第二个匿名函数：钩子钩在每一帧将要完成的时间片段上
      new EasyTyper(
        obj,
        hitokoto + " — " + (from_who ?? from ?? "佚名"),
        () => {},
        () => {}
      );
    });

  // 获取说说数据
  getTalksData();

  // 获取文章数据
  getArticles();
});

const scrollDown = () => {
  window.scrollTo({
    behavior: "smooth",
    top: document.documentElement.clientHeight,
  });
};

let talkList: Ref<string[]> = ref([]);
const getTalksData = async () => {
  let result: HomeTalksResp = await reqTalksData();
  talkList.value = result.data;
};

let articleList: Ref<ArticleInfo[]> = ref([]);
const getArticles = async () => {
  let result: HomeArticlesResp = await reqArticles(1);
  articleList.value = result.data;
};
let isRight = computed(() => {
  return (index: number) => {
    if (index % 2 == 0) {
      return "article-cover left-radius";
    }
    return "article-cover right-radius";
  };
});
</script>

<style scoped lang="scss">
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}

.home-banner {
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
  .banner-container {
    margin-top: 43vh;
    line-height: 1.5;
    color: #eee;
    .blog-title {
      font-size: 2.5rem;
    }
    .blog-intro {
      font-size: 1.5rem;
      span {
        --animate-duration: 2s; // 单次动画执行时间
        animation-iteration-count: infinite; // 动画循环次数
      }
    }
    .scroll-down {
      cursor: pointer;
      position: absolute;
      bottom: 15px;
      width: 100%;
      i {
        font-size: 2rem;
      }
      .scroll-down-effects {
        color: #eee !important;
        text-align: center;
        text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
        line-height: 1.5;
        display: inline-block;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        animation: scroll-down-effect 1.5s infinite;
      }
    }
  }
}

.home-container {
  max-width: 1200px;
  margin: calc(100vh + 20px) auto 28px auto;
  padding: 0 5px;

  .article-card {
    display: flex;
    align-items: center;
    height: 280px;
    width: 100%;
    margin-top: 20px;
    &:hover .on-hover img {
      transform: scale(1.1);
    }
    .article-cover {
      overflow: hidden;
      height: 100%;
      width: 45%;
    }
    .left-radius {
      border-radius: 8px 0 0 8px !important;
      order: 0;
    }
    .right-radius {
      border-radius: 0 8px 8px 0 !important;
      order: 1;
    }
    .article-wrapper {
      padding: 0 2.5rem;
      width: 55%;
      a {
        font-size: 1.5rem;
        transition: all 0.3s;
        &:hover {
          color: #8e8cd8;
        }
      }
      .article-info {
        font-size: 95%;
        color: #858585;
        line-height: 2;
        margin: 0.375rem 0;
        a {
          font-size: 95%;
          color: #858585 !important;
        }
      }
      .article-content {
        line-height: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}

:deep(.v-card) {
  border-radius: 8px;
}
</style>
