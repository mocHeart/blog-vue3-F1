import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// 引入node提供内置模块path：可以获取绝对路径
import path from "path";

// 快捷配置组件名称
import VitePluginExtend from "vite-plugin-vue-setup-extend"

export default defineConfig({
  plugins: [
    vue(),
    // vuetify插件
    vuetify({
      autoImport: { labs: true },
    }),
    VitePluginExtend(),
  ],
  // src文件夹别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // scss样式自动导入
  css: {
    preprocessorOptions: {
      // 自动导入，无需手动引用
      // 想当于在每个组件的style标签中默认添加了这个导入--- `@use "@/style/main.scss" as *;`
      scss: {
        additionalData: `@use "@/style/main.scss" as *;`,
      },
    },
  },
  // 配置代理跨域
  server: {
    proxy: {
      "/api": {
        target: "http://116.198.231.162:90",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
