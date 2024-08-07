import { createApp } from "vue";
import App from "@/App.vue";
import "@/style/reset.scss";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn"; // element-plus语言
import vuetify from "@/plugins/vuetify";
import pinia from "@/store"; // 引入pinia仓库
import router from "@/router";
import "animate.css/animate.min.css";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const app = createApp(App);

app.component("infinite-loading", InfiniteLoading);

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(vuetify);
app.use(pinia);
app.mount("#app");
