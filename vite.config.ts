import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'

// 引入node提供内置模块path：可以获取绝对路径
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    // vuetify插件
    vuetify({
      autoImport: { labs: true },
    }),
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
        additionalData: `@use "@/style/main.scss" as *;`
      }
    }
  }
});
