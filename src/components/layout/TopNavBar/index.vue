<template>
  <v-app-bar
    :class="navClass"
    :elevation="0"
    scroll-behavior="hide"
    scroll-threshold="60"
  >
    <!-- 折叠的导航栏 -->
    <div class="d-md-none nav-mobile-container">XXXXXXXXXXXXX</div>

    <!-- 展开的导航栏 -->
    <div class="d-md-block d-none nav-container">
      <!-- 左侧博主名称 -->
      <div class="float-left blog-title">
        <router-link to="/">
          {{ homeStore.indexInfo.websiteConfig?.websiteAuthor }}
        </router-link>
      </div>
      <!-- 右侧菜单栏 -->
      <div class="float-right nav-title">
        <!-- 搜索 -->
        <div class="menus-item">
          <a class="menu-btn" @click="openSearch">
            <v-icon icon="mdi-magnify" /> 搜索
          </a>
        </div>
        <!-- 首页 -->
        <div class="menus-item">
          <router-link class="menu-btn" to="/">
            <v-icon icon="mdi-home-account" /> 首页
          </router-link>
        </div>
        <!-- 发现 -->
        <div class="menus-item">
          <a class="menu-btn">
            <v-icon icon="mdi-compass" /> 发现
            <v-icon icon="mdi-chevron-down" />
          </a>
          <ul class="menus-submenu">
            <li>
              <router-link to="/archives">
                <v-icon size="small" icon="mdi-file-document-multiple" /> 归档
              </router-link>
            </li>
            <li>
              <router-link to="/categories">
                <v-icon size="small" icon="mdi-view-grid" /> 分类
              </router-link>
            </li>
            <li>
              <router-link to="/tags">
                <v-icon size="small" icon="mdi-tag-multiple" /> 标签
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 娱乐 -->
        <div class="menus-item">
          <a class="menu-btn">
            <v-icon size="small" icon="mdi mdi-pinwheel" /> 娱乐
            <v-icon icon="mdi-chevron-down" />
          </a>
          <ul class="menus-submenu">
            <li>
              <router-link to="/albums">
                <v-icon size="small" icon="mdi-image-size-select-actual" /> 相册
              </router-link>
            </li>
            <li>
              <router-link to="/talks">
                <v-icon size="small" icon="mdi-message-processing" /> 说说
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 友链 -->
        <div class="menus-item">
          <router-link class="menu-btn" to="/links">
            <v-icon size="small" icon="mdi-transit-connection-variant" /> 友链
          </router-link>
        </div>
        <!-- 关于 -->
        <div class="menus-item">
          <router-link class="menu-btn" to="/about">
            <v-icon size="small" icon="mdi-butterfly" /> 关于
          </router-link>
        </div>
        <!-- 留言 -->
        <div class="menus-item">
          <router-link class="menu-btn" to="/message">
            <v-icon size="small" icon="mdi-message-text" /> 留言
          </router-link>
        </div>
        <!-- 登录 -->
        <div class="menus-item">
          <a class="menu-btn" v-if="true" @click="openLogin">
            <v-icon icon="mdi-account" /> 登录
          </a>
          <template v-else>
            <img
              class="user-avatar"
              :src="homeStore.indexInfo.websiteConfig.userAvatar"
              height="30"
              width="30"
            />
            <ul class="menus-submenu">
              <li>
                <router-link to="/user">
                  <i class="iconfont icongerenzhongxin" /> 个人中心
                </router-link>
              </li>
              <li>
                <!-- <a @click="logout"><i class="iconfont icontuichu" /> 退出</a> -->
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts" name="TopNavBar">
import { onMounted } from "vue";
import useHomeStore from "@/store/modules/home";

let navClass = "nav";
let homeStore = useHomeStore();

onMounted(() => {
  window.addEventListener("scroll", scroll);
});

const scroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  if (scrollTop > 60) {
    navClass = "nav-fixed";
  } else {
    navClass = "nav";
  }
};

const openSearch = () => {
  console.log("Search");
  homeStore.searchFlag = !homeStore.searchFlag;
};

const openLogin = () => {
  alert("暂未开放");
};
</script>

<style scoped lang="scss">
@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}

.nav {
  background: rgba(255, 0, 0, 0) !important;

  a {
    color: #eee !important;
  }
}

.nav-fixed {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
}

.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-container {
  font-size: 14px;
  width: 100%;
  height: 100%;
  padding: 10px 35px;
}

.blog-title,
.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}

.blog-title a {
  font-size: 18px;
  font-weight: bold;
}

.nav-fixed .blog-title a {
  text-shadow: none;
}

.nav .blog-title a {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
}

.menus-item {
  position: relative;
  display: inline-block;
  margin: 0 0 0 0.875rem;
}

.menus-item a {
  transition: all 0.2s;
}

.menu-btn:hover:after {
  width: 100%;
}

// 鼠标hover触发：菜单文字下方出现逐渐变长的蓝横线
.menus-item a:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: -1;
  width: 0;
  height: 3px;
  background-color: #80c8f8;
  content: "";
  transition: all 0.3s ease-in-out;
}

.menus-item:hover .menus-submenu {
  display: block;
}

// 鼠标hover触发：标题上的下拉菜单栏由下至上浮现的动画
.menus-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;
}

// 该伪元素的作用是让弹出的子菜单栏前面的伸出一小部分使和菜单项重叠，
// 这样鼠标下滑的时候不至于子菜单栏突然消失，导致选不中子菜单栏中的内容
.menus-submenu:before {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}

.menus-submenu a {
  line-height: 2;
  color: #4c4948 !important;
  text-shadow: none;
  display: block;
  padding: 6px 14px;
}

.menus-submenu a:hover {
  background: #4ab1f4;
}

//---------------------
:deep(.v-toolbar__content) {
  background-color: rgba(15, 5, 5, 0.2);
  overflow: visible;
}
</style>
