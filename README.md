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

|  依赖名称  | 安装命令                |
| :--------: | ----------------------- |
|  SCSS样式  | pnpm i scss             |
|  路由组件  | pnpm i vue-router       |
| TS声明文件 | pnpm i --D  @types/node |
|  路由组件  | pnpm i vue-router       |

### 1.3 配置vite.config

+ src别名配置
  在 `vite.config.ts`中配置:

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
