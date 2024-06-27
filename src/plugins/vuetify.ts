import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

// 自定义主题配置
const myCustomTheme: any = {
  light: {},
  dark: {},
};

export default createVuetify({
  // 默认设置
  defaults: {
    global: {
      // 默认开启波纹效果
      ripple: true,
    },
    VSheet: {
      // 阴影深度
      elevation: 4,
    },
  },
  // 主题
  theme: {
    // 默认主题
    defaultTheme: "light",
    // 自定义主题
    themes: {
      myCustomTheme,
    },
  },
  // 图标
  icons: {
    defaultSet: "mdi",
  },
});
