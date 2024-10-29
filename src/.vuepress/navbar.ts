import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "后端",
    icon: "pen-to-square",
    prefix: "/posts/backend/",
    children: [
      {
        text: "java",
        icon: "pen-to-square",
        link: "java/"
      },
      {
        text: "python",
        icon: "pen-to-square",
        link: "python/",
      },
      { 
        text: "rust",
        icon: "pen-to-square", 
        link: "rust/",
      },
    ],
  },
  {
    text: "前端",
    icon: "book",
    prefix: "/post/frontend/",
    children: [

    ]
  },
  {
    text: "随笔",
    icon: "book",
    prefix: "/post/wander",
    children: [

    ]
  }
]);
