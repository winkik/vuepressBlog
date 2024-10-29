import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "winkit的博客",
  description: "二三事与碎碎念",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
