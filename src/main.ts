import { createApp } from "vue";
import App from "@/App.vue";
import { registerPlugins } from "./plugins";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn"; // element-plus语言

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
registerPlugins(app);
app.mount("#app");
