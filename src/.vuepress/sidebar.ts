import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/posts/backend/java": "structure",
  "/posts/backend/python": "structure",
  "/posts/backend/rust": "structure",
  // fallback
  "/": [
    "" /* / */,
    "contact" /* /contact.html */,
    "about" /* /about.html */,
  ],
});
