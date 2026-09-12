import { defineConfig } from 'vite';

// 相对路径 base：兼容任意部署场景（GitHub Pages 子路径 /LifeLoop/、Vercel 根路径、本地 dev）。
// 项目为纯状态路由（无 URL 路由），相对资源引用不会产生深链接刷新问题。
export default defineConfig({
  base: './',
});