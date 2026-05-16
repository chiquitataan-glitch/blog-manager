# 99blog

99blog 是赵春昊（清9半斛）的个人博客与作品展示站，用于沉淀文章、项目、经历与外部内容分发能力。

当前项目已经完成网页前端主体，后续重点是补齐真实内容、替换占位数据、优化公众号导出链路和部署配置。

## 技术栈

- Next.js 16.2.6
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- MDX
- gray-matter
- reading-time
- next-mdx-remote
- better-sqlite3
- framer-motion
- lucide-react

## 快速开始

```bash
npm install
npm run dev
```

启动后访问本地开发地址查看页面。

## 常用命令

```bash
# 本地开发
npm run dev

# 代码检查
npm run lint

# 生产构建
npm run build

# 启动生产构建
npm run start

# 按 99blog 生产端口启动
npm run start:99blog
```

## 项目结构

```text
src/
├── app/                    # Next.js App Router 页面
├── components/             # 复用组件和业务区块
├── content/posts/          # MDX 文章
├── data/                   # 个人资料、项目、经历、链接等静态数据
└── lib/                    # 文章读取、搜索、公众号导出等逻辑

public/                     # 图片、SVG、动效资产
docs/                       # 开发文档
```

## 内容维护

### 文章

文章存放在：

```text
src/content/posts/*.mdx
```

每篇文章建议包含 frontmatter：

```md
---
title: "文章标题"
date: "2026-05-14"
summary: "文章摘要"
category: "产品思考"
cover: "/post-cover-ai.svg"
featured: true
---
```

### 个人资料

个人介绍、技能和联系方式维护在：

```text
src/data/profile.ts
src/data/links.ts
```

### 项目作品

项目数据维护在：

```text
src/data/projects.ts
```

### 经历时间线

经历数据维护在：

```text
src/data/experience.ts
```

## 本机后台

启动开发服务后访问：

```text
/admin
```

后台已通过应用层 Basic Auth 保护 `/admin` 和 `/api/admin/*`。本地开发环境未配置账号密码时允许访问，生产环境必须设置：

```bash
ADMIN_BASIC_AUTH_USER=admin
ADMIN_BASIC_AUTH_PASSWORD=请替换为强密码
```

当前采用“左侧导航 + 右侧模块内容区”的工作台布局，方便长期清晰管理：

- 概览：查看链接、项目、经历、文案、图片数量，并快速进入常用模块。
- 个人资料：修改姓名、别名、头像路径、简介等信息。
- 链接：维护联系方式和外部入口。
- 项目：采用列表 + 详情编辑，前台 `/projects` 会优先读取 SQLite 后台数据。
- 经历：采用列表 + 详情编辑，前台 `/experience` 会优先读取 SQLite 后台数据。
- 文案：保存文章 / 公众号文案到 SQLite，并可生成公众号 HTML。
- 图片：上传图片到 `public/uploads/YYYY/MM/`，复制 public 路径用于头像、项目封面或文章封面。
- 公众号：预览并复制通过 `md2wechat` 生成的 HTML。

默认 SQLite 数据库路径：

```text
data/99blog.sqlite
```

后续部署服务器时可通过环境变量覆盖：

```bash
BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite
```

### 头像

请把真实头像放到固定路径：

```text
D:/99blog/public/profile/avatar.webp
```

前端访问路径为：

```text
/profile/avatar.webp
```

如果使用其他文件名，需要同步修改后台个人资料中的头像路径。

## 开发文档

详细开发进展、占位清单和后续路线图见：

```text
docs/DEVELOPMENT.md
```

后台管理系统使用、数据路径、部署注意事项见：

```text
ADMIN_README.md
```

## 当前状态

已完成：

- 首页、文章、项目、经历、关于、联系等主要页面。
- 首页和关于页头像展示，默认头像路径为 `/profile/avatar.webp`。
- 本机轻量后台 `/admin` 已改为左侧导航工作台，并通过 Basic Auth 保护后台页面和后台 API，支持概览、资料、链接、项目、经历、文案、图片和公众号 HTML 预览。
- 前台首页、关于、联系、项目、经历页已接入后台 SQLite 优先读取，静态数据作为 fallback。
- SQLite 本地数据存储，默认数据库为 `data/99blog.sqlite`。
- MDX 文章读取和文章详情渲染。
- 本地搜索索引。
- 简易公众号 HTML 导出页面。
- 日式漫画 / 纸张 / 樱花视觉风格。

待完善：

- 替换 `siteConfig.origin` 中的占位域名。
- 补齐 GitHub、Demo、资料等真实链接。
- 替换项目占位封面。
- 补齐真实校园、比赛、创业和工作经历。
- 将公众号导出从轻量转换升级为更稳定的 md2wechat 工作流。

## Next.js 16 注意事项

本项目使用 Next.js 16。开发时不要直接套用旧版 Next.js 经验，涉及 App Router、动态路由、metadata、Server Component / Client Component 边界时，应优先查看本地文档：

```text
node_modules/next/dist/docs/
```

当前动态路由已采用 Next.js 16 的 `params: Promise<...>` 写法。