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
    },
    {
      path: "/articles/:articleId",
      component: () => import("@/pages/article/index.vue"),
    },
    {
      path: "/archives",
      component: () => import("@/pages/archive/index.vue"),
      meta: {
        title: "归档",
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
