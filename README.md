## 1. 项目构建

### 1.1 Vite构建项目

```shell
jianyaoli@jianyaolideMini vue3 % npm create vite
Need to install the following packages:
create-vite@5.2.3
Ok to proceed? (y) y
✔ Project name: … blogF1Vue3
✔ Package name: … blog
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript

Scaffolding project in /Users/jianyaoli/moc/home/myWeb/vue3/blogF1Vue3...

Done. Now run:

  cd blogF1Vue3
  npm install
  npm run dev

jianyaoli@jianyaolideMini vue3 % cd blogF1Vue3 
jianyaoli@jianyaolideMini blogF1Vue3 % npm install  

added 44 packages, and audited 45 packages in 37s

5 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 1.2 依赖添加

+ 参数说明：

  1）`--save` 等同于 `-S`（默认，保存在package.json文件中），安装包信息将加入到*dependencies*（生产阶段的依赖，也就是项目运行时的依赖，就是程序上线后仍然需要的依赖）；
  2）`--save-dev` 等同于 `-D`，安装包信息将加入到*devDependencies*（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用）。

|        依赖名称        | 安装命令                               |
| :--------------------: | -------------------------------------- |
|        SCSS样式        | pnpm i sass                            |
|        路由组件        | pnpm i vue-router                      |
|       TS声明文件       | pnpm i --D  @types/node                |
|        路由组件        | pnpm i vue-router                      |
|        Vuetify        | pnpm i vuetify                         |
|    Vuetify自动导入    | pnpm i vite-plugin-vuetify             |
| Material Design 图标库 | pnpm add @mdi/font -D                  |
|         aixos         | pnpm i axios                           |
|      Element Plus      | pnpm install element-plus              |
|         pinia         | pnpm i pinia                           |
|    快捷设置组件名称    | pnpm i vite-plugin-vue-setup-extend -D |
|     animate 动画库     | pnpm install animate.css               |
|     打字机效果插件     | pnpm install easy-typer-js             |
|       日期工具类       | pnpm install dayjs                     |
|      无限加载插件      | pnpm install v3-infinite-loading       |
|     Markdown解析器     | pnpm install markdown-it               |
|    vite require支持    | pnpm i vite-plugin-require             |
|      代码语法高亮      | pnpm install highlight.js              |
|                        |                                        |

### 1.3 配置vite.config

+ src别名配置
  在 `vite.config.ts`中配置:

  *如果红色语法提示请安装@types/node 是 TypeScript 的一个声明文件包，用于描述 Node.js 核心模块和常用的第三方库的类型信息*

  ```ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  // 引入node提供内置模块path：可以获取绝对路径
  import path from 'path';

  export default defineConfig({
    plugins: [vue()],
    // src文件夹别名配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
  ```

  找到 `tsconfig.json`配置文件,找到配置项 `compilerOptions`添加配置,这一步的作用是让 `IDE`可以对路径进行智能提示：

  ```json
  "paths": {
    "@/*": [
      "src/*"
    ]
  }
  ```

### 1.4 引入Vuetify

```typescript
# 导入依赖
pnpm i vuetify
# 导入自动导入插件
pnpm i vite-plugin-vuetify
# 导入图标库
pnpm add @mdi/font -D

vite.config.ts中配置：
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    // vuetify插件
    vuetify({
      autoImport: { labs: true },
    }),
  ],
});

# 创建文件 plugins\vuetify.ts 
# 创建文件 plugins\index.ts
# 详细配置见文件

# main.ts 引入依赖
import { registerPlugins } from "./plugins";
registerPlugins(app);
```

### 1.5 scss样式自动导入

每个 `<style lang=scss>`标签中自动导入全局scss样式，vite.config.ts 中配置：

```json
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
```

main.scss：

```scss
$bgColor: #cccccc;
```

sytle标签中无需引入直接使用：

```html
<style scoped lang="scss">
.bg {
  background-color: $bgColor;
}
</style>
```

### 1.6 快捷设置组件名称

安装依赖：

```shell
pnpm i vite-plugin-vue-setup-extend -D
```

`vite.config.ts` 中导入并注册：

```ts
// 快捷配置组件名称
import VitePluginExtend from "vite-plugin-vue-setup-extend"

export default defineConfig({
  plugins: [
    vue(),
    ...
    VitePluginExtend(),
  ],
  ...
});
```

使用：

```html
<script setup lang="ts" name="Home">  // 添加name属性
```

### 1.7 动画库Animate.css的使用

安装依赖：

```shell
pnpm install animate.css 
```

main.ts里面进行引用：

```ts
import "animate.css/animate.min.css";
```

然后在[animate.css官网](https://animate.style/)找到你想要的动画效果，直接如下使用：
注意：animate__animated 这个类名是固定的，然后后面再跟上一个动画的类名

```html
<h1 class="blog-title animate__animated animate__headShake">CSS</h1>
```

## 2. 遇到的问题

### 2.1 v-app-bar不能正常渲染

```html
<v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Application Bar</v-app-bar-title>
</v-app-bar>
```

直接在组件中使用上述官网实例的内容，浏览器页面没有对应的显示，控制台有如下错误：

```shell
Error: [Vuetify] Could not find injected layout
    at useLayoutItem (chunk-UF5MSZ3W.js?v=3e758b40:59:22)
    at Object.setup [as _setup] (vuetify_lib_components_VAppBar_index__mjs.js?v=3e758b40:836:9)
    at setup (chunk-R5VCFHL5.js?v=3e758b40:515:37)
    ...
```

原因是 Vuetify 的该组件需要在 `v-app` 组件下，在 `App.vue` 中如下配置：

```html
<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>
    ...
  </v-app>
</template>

```

## 3. 网络API

| 名称 | 类型 | 说明                 | 接口示例                | 官网                                    |
| ---- | ---- | -------------------- | ----------------------- | --------------------------------------- |
| 一言 | 文字 | 分享感动你的那个句子 | https://v1.hitokoto.cn/ | https://developer.hitokoto.cn/sentence/ |
|      |      |                      |                         |                                         |
