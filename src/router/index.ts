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
    // {
    //   path: "/articles/:articleId",
    //   component: () => import("../views/article/Article.vue"], resolve)
    // },
    {
      path: "/archives",
      component: () => import("@/pages/archive/index.vue"),
      meta: {
        title: "归档"
      }
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
