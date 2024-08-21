import { createRouter, createWebHistory } from "vue-router";

// createRouter方法，创建路由器实例，管理多个路由
export default createRouter({
  // 路由器的模式设置
  history: createWebHistory(),
  // 管理路由
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/articles/:articleId",
      component: () => import("@/pages/article/index.vue"),
      meta: {
        title: "文章详情",
      },
    },
    {
      path: "/archives",
      component: () => import("@/pages/archive/index.vue"),
      meta: {
        title: "归档",
      },
    },
    {
      path: "/categories",
      component: () => import("@/pages/category/index.vue"),
      meta: {
        title: "分类"
      }
    },
    {
      path: "/tags",
      component: () => import("@/pages/tag/index.vue"),
      meta: {
        title: "标签"
      },
    },
    {
      path: "/links",
      component: () => import("@/pages/link/index.vue"),
      meta: {
        title: "友链列表",
      },
    },
  ],
  // 滚动行为(路由跳转后滚到指定位置)
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
