<template>
  <div class="link">
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">友情链接</h1>
    </div>

    <!-- 正文-->
    <v-card class="blog-container">
      <!-- 大佬链接 -->
      <div class="link-title mb-1">
        <v-icon icon="mdi-link-variant" size="24" color="blue" /> 大佬链接
      </div>
      <v-row class="link-container">
        <v-col
          class="link-wrapper"
          md="4"
          cols="12"
          v-for="item of friendLinkList"
          :key="item.id"
        >
          <a :href="item.linkAddress" target="_blank">
            <v-avatar size="65" class="link-avatar">
              <img :src="item.linkAvatar" />
            </v-avatar>
            <div style="width: 100%; z-index: 10">
              <div class="link-name">{{ item.linkName }}</div>
              <div class="link-intro">{{ item.linkIntro }}</div>
            </div>
          </a>
        </v-col>
      </v-row>

      <!-- 添加友链 -->
      <div class="link-title mt-4 mb-4">
        <v-icon
          icon="mdi-dots-horizontal-circle"
          size="24"
          color="blue"
        />添加友链
      </div>
      <blockquote>
        <div>名称：{{ homeStore.indexInfo.websiteConfig.websiteName }}</div>
        <div>简介：{{ homeStore.indexInfo.websiteConfig.websiteIntro }}</div>
        <div>头像：{{ homeStore.indexInfo.websiteConfig.websiteAvatar }}</div>
      </blockquote>
      <div class="mt-5 mb-5">需要交换友链的可在下方留言💖</div>
      <blockquote class="mb-10">
        友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像
      </blockquote>
    </v-card>

    <div style="height: 1500px; background-color: pink">12345</div>
  </div>
</template>

<script setup lang="ts" name="Link">
import useHomeStore from "@/store/modules/home";
import { computed, onMounted, ref } from "vue";
import { reqLinksData } from "@/api/link";
import { LinksDataResp, LinksResp } from "@/api/link/type";

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
  getLinksData();
});

let friendLinkList = ref([] as LinksDataResp[]);
const getLinksData = async () => {
  let result: LinksResp = await reqLinksData();
  console.log(result);
  result.data.forEach((it) => {
    friendLinkList.value.push(it);
  });
};
</script>

<style scoped lang="scss">
.link {
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
    .link-title {
      color: #344c67;
      font-size: 21px;
      font-weight: bold;
      line-height: 2;
      font-size: 21px;
      :deep(.mdi-dots-horizontal-circle) {
        margin-right: 3px;
      }
    }
    .link-container {
      margin: 10px 10px 0;
      .link-wrapper {
        position: relative;
        transition: all 0.3s;
        border: 1px dashed #dde6ec;
        border-radius: 8px;
        &:hover {
          box-shadow: 0 2px 20px #49b1f5;
          &:before {
            transform: scale(1);
          }
          a {
            color: #fff;
          }
          .link-avatar {
            transform: rotate(360deg);
          }
          .link-intro {
            color: #fff;
          }
        }
        &:before {
          position: absolute;
          border-radius: 8px;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: #49b1f5 !important;
          content: "";
          transition-timing-function: ease-out;
          transition-duration: 0.3s;
          transition-property: transform;
          transform: scale(0);
        }
        a {
          color: #333;
          text-decoration: none;
          display: flex;
          height: 100%;
          width: 100%;
          .link-avatar {
            margin-top: 5px;
            margin-left: 10px;
            transition: all 0.5s;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .link-name {
            text-align: center;
            font-size: 1.25rem;
            font-weight: bold;
            z-index: 1000;
          }
          .link-intro {
            text-align: center;
            padding: 16px 10px;
            height: 50px;
            font-size: 13px;
            color: #1f2d3d;
            width: 100%;
          }
        }
      }
    }
    blockquote {
      line-height: 2;
      margin: 0;
      font-size: 15px;
      border-left: 0.2rem solid #49b1f5;
      padding: 10px 1rem !important;
      background-color: #ecf7fe;
      border-radius: 4px;
    }
  }
}
</style>
