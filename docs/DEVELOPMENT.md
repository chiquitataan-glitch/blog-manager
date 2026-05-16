# 99blog 开发文档

更新时间：2026-05-16 03:50:38

## 1. 项目定位

99blog 是赵春昊（清9半斛）的个人博客与作品展示站，核心目标不是单纯展示静态信息，而是形成一套长期可维护的个人内容系统：

- 展示个人介绍、技能方向、项目作品与经历。
- 沉淀产品思考、AI 原生创业、Agent 开发等文章。
- 为公众号等外部平台提供内容导出与再分发入口。
- 用统一的日式漫画 / 纸张 / 樱花视觉风格强化个人品牌识别。

当前前端主体已经完成，下一阶段重点是补齐真实内容、替换占位资产、完善内容生产与导出链路。

## 2. 技术栈

- Next.js 16.2.6，App Router。
- React 19.2.4。
- TypeScript，开启 strict 模式。
- Tailwind CSS v4。
- MDX 内容系统。
- gray-matter：解析文章 frontmatter。
- reading-time：计算阅读时间。
- next-mdx-remote：渲染 MDX 内容。
- better-sqlite3：本机后台 SQLite 数据存储。
- framer-motion：页面过渡和动效。
- lucide-react：图标。
- clsx：条件 className 拼接。

## 3. 目录说明

```text
D:/99blog
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx             # 首页
│   │   ├── posts/               # 文章列表、详情、公众号导出
│   │   ├── projects/            # 项目页
│   │   ├── experience/          # 经历页
│   │   ├── about/               # 关于页
│   │   ├── admin/               # 本机内容后台
│   │   ├── api/admin/           # 后台 API Routes
│   │   └── contact/             # 联系页
│   ├── components/              # UI 组件
│   │   ├── layout/              # 导航与页面布局
│   │   ├── sections/            # 首页、项目、经历等业务区块
│   │   ├── posts/               # 文章展示与筛选组件
│   │   ├── admin/               # 本机后台组件
│   │   └── wechat/              # 公众号导出面板
│   ├── content/posts/           # MDX 文章源文件
│   ├── data/                    # 个人信息、项目、经历、链接等静态数据
│   └── lib/                     # 内容读取、搜索、公众号导出逻辑
├── public/                      # 图片、SVG、动效资产
├── docs/                        # 项目开发文档
└── .zcf/plan/                   # zcf 工作流计划记录
```

## 4. 页面地图

| 页面 | 路径 | 当前状态 | 说明 |
|---|---|---|---|
| 首页 | `/` | 已完成主体 | 使用 `CinematicHero` 与四个入口卡片 |
| 文章列表 | `/posts` | 已完成主体 | 支持搜索和分类筛选 |
| 文章详情 | `/posts/[slug]` | 已完成主体 | 从 `src/content/posts/*.mdx` 读取内容 |
| 公众号导出 | `/posts/[slug]/wechat-export` | 临时可用 | 生成内联样式 HTML 并支持复制 |
| 项目页 | `/projects` | 已完成主体 | 优先读取 SQLite 后台项目数据，静态数据 fallback；占位链接显示为待补充 |
| 经历页 | `/experience` | 已完成主体 | 优先读取 SQLite 后台经历数据，已展示组织、时间和亮点 |
| 关于页 | `/about` | 已完成主体 | 读取 `profile` 数据，展示头像与技能 |
| 本机后台 | `/admin` | 工作台可用 | 已通过 Basic Auth 保护 `/admin` 和 `/api/admin/*`；采用左侧导航 + 右侧模块内容区，支持资料、链接、项目、经历、文案、图片和公众号 HTML 预览 |
| 联系页 | `/contact` | 已完成主体 | GitHub 等链接仍待补齐 |

## 5. 当前已完成能力

### 5.1 视觉与交互

- 已建立日式漫画 / 纸张 / 樱花风格。
- 全局样式中已有 `.manga-panel`、`.paper-card`、`.ink-button`、`.prose-blog` 等可复用样式。
- 页面包含基础转场和卡片悬停效果。

### 5.2 内容系统

- 文章使用 MDX 文件维护。
- `src/lib/posts.ts` 已完成文章 slug、frontmatter、阅读时间、排序等处理。
- 文章卡片和详情页已接入内容读取链路。

### 5.3 搜索系统

- `src/lib/search.ts` 已聚合文章、项目、经历为统一搜索索引。
- 当前搜索是本地字符串包含匹配，适合早期内容规模。

### 5.4 公众号导出

- `src/lib/wechat-export.ts` 已提供简易 Markdown 到公众号 HTML 的转换。
- 导出页可复制 HTML。
- 当前实现适合作为临时方案，不建议视为最终排版系统。

### 5.5 本机后台

- `/admin` 已实现轻量内容后台，并通过 `proxy.ts` 对 `/admin` 与 `/api/admin/*` 增加 Basic Auth 保护。
- 后台采用“左侧导航 + 右侧模块内容区”的工作台布局，包含概览、个人资料、链接、项目、经历、文案、图片、公众号预览模块。
- 概览模块展示链接、项目、经历、文案、图片数量，并提供常用入口。
- 项目和经历模块采用“列表 + 详情编辑”，内容多起来后仍能快速选择和维护。
- 后台支持维护个人资料、头像路径、链接、项目、经历、文章 / 公众号文案、图片上传。
- 前台首页、关于、联系、项目、经历页已接入 SQLite 优先读取，静态数据作为 fallback。
- SQLite 默认数据库路径为 `data/99blog.sqlite`，可通过 `BLOG_DB_PATH` 覆盖。
- 生产环境必须设置 `ADMIN_BASIC_AUTH_USER` 和 `ADMIN_BASIC_AUTH_PASSWORD`，本地开发未设置时允许访问后台。
- 图片上传目录为 `public/uploads/YYYY/MM/`。
- 公众号 HTML 生成通过 `md2wechat convert` 执行，初版只生成 HTML，不自动上传草稿。

### 5.6 头像配置

- 真实头像固定建议路径：`D:/99blog/public/profile/avatar.webp`。
- 前端访问路径：`/profile/avatar.webp`。
- 当前首页 Hero 与关于页已接入 `profile.avatar`。

## 6. 占位清单

### 6.1 站点配置

文件：`src/data/site.ts`

- `origin: "https://example.com"` 是占位，需要部署后替换为真实域名。

### 6.2 个人资料

文件：`src/data/profile.ts`

- 头像字段默认使用 `/profile/avatar.webp`，需要将真实头像放到 `public/profile/avatar.webp`。
- GitHub 联系方式为“待补充”。
- 多个联系链接使用空字符串表示待补充，前台展示为不可点击信息。

### 6.3 外部链接

文件：`src/data/links.ts`

- GitHub 链接为“待补充”。
- 部分链接仍使用空字符串表示待补充，前台展示为不可点击信息。

### 6.4 项目数据

文件：`src/data/projects.ts`

- 项目封面使用 `/project-placeholder.svg`，可通过后台替换为真实封面。
- GitHub / Demo / 资料链接存在占位；前台遇到空链接或历史 `href: "#"` 时展示“待补充”，不再跳转。
- 项目阶段和成果描述可继续补真实数据。

### 6.5 经历数据

文件：`src/data/experience.ts`

- 校园经历、比赛、社团、荣誉、工作经历仍需补真实内容。
- `ExperienceTimeline` 已展示 organization、period、highlights，后续重点是补内容与分组筛选。

### 6.6 文章内容

目录：`src/content/posts/`

- 目前已有 2 篇文章。
- 后续需要持续扩充文章，并统一 frontmatter 字段。

## 7. 后续开发路线图

### 第一阶段：真实内容补全

目标：让网站从“前端样板”变成可公开访问的个人站。

- 替换 `siteConfig.origin` 为真实域名。
- 补全 GitHub、个人站、作品链接等联系方式。
- 补全项目真实截图、仓库、Demo、文档链接。
- 补全经历页真实组织、时间、成果和亮点。
- 增加 3-5 篇高质量文章，覆盖 AI 原生、产品思考、个人创业、项目复盘。

### 第二阶段：占位链接体验优化

目标：避免用户点击 `#` 产生无反馈。

- 项目卡片遇到空链接或历史 `href: "#"` 时不渲染为可点击链接，改为“待补充”。（已完成）
- 联系方式遇到空链接或历史 `href: "#"` 时展示纯文本信息，不再渲染为可点击链接。（已完成）
- 增加数据层约定：空链接统一使用空字符串，减少 `#` 的语义混乱。（已完成）

### 第三阶段：经历页信息增强

目标：让经历页更像履历，而不是简单时间线。

- 在时间线中展示 organization、period、highlights。（已完成）
- 增加类型筛选或分组。
- 对创业实践、项目经历、校园荣誉进行差异化展示。

### 第四阶段：公众号导出升级

目标：从临时 HTML 转换升级到稳定排版工作流。

- 保留当前 `wechat-export` 作为本地快速复制入口。
- 正式文章排版建议接入 `md2wechat` CLI 或独立排版服务。
- 明确导出流程：MDX 原文 -> Markdown/HTML 转换 -> md2wechat 排版 -> 微信公众号草稿。
- 如涉及真实上传或草稿创建，必须先校验 WeChat 配置并获得用户明确确认。

### 第五阶段：工程质量和部署

目标：具备长期维护能力。

- 增加基础构建检查：`npm run lint`、`npm run build`。
- 部署到正式域名后更新 metadata、Open Graph、站点地图。
- 根据内容规模考虑全文搜索增强。
- 为项目图片增加更完整的 alt 文案和尺寸策略。

## 8. 开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 代码检查
npm run lint

# 生产构建
npm run build

# 启动生产构建
npm run start
```

### 本机后台

```bash
# 启动后访问 /admin
npm run dev
```

后台默认数据文件：

```text
data/99blog.sqlite
```

服务器部署时可设置：

```bash
BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite
```

注意：当前后台已通过应用层 Basic Auth 保护。生产环境必须设置 `ADMIN_BASIC_AUTH_USER` 和 `ADMIN_BASIC_AUTH_PASSWORD`，并建议叠加服务器层访问限制。

## 9. Next.js 16 开发注意事项

项目根目录 `CLAUDE.md` 明确提示：Next.js 16 存在破坏性变化，写代码前需要阅读本地 `node_modules/next/dist/docs/` 中相关文档。

当前项目已经采用 Next.js 16 的动态路由写法：

```ts
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

注意事项：

- 动态路由中的 `params` 按 Promise 处理。
- `metadata` / `generateMetadata` 只能用于 Server Component。
- 需要状态、事件、浏览器 API 的组件必须添加 `"use client"`。
- 不要基于旧版 Next.js 经验直接改 App Router 关键 API。

## 10. md2wechat 集成建议

当前项目自带的 `src/lib/wechat-export.ts` 是轻量实现，只支持有限 Markdown 语法：

- 一级标题。
- 二级标题。
- 无序列表。
- 普通段落。

这对早期复制排版足够，但不适合长期公众号生产。后续如要增强公众号能力，建议：

1. 使用 `md2wechat inspect` 检查文章元数据和发布风险。
2. 使用 `md2wechat preview` 生成本地预览。
3. 使用 `md2wechat convert` 生成正式 HTML。
4. 如需草稿上传，再使用 `--draft --cover`，且必须先确认微信配置。

正式排版前建议优先发现能力：

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat themes list --json
md2wechat layout list --json
```

## 11. 服务器配置建议

后续部署服务器时，建议按以下原则配置：

1. 安装 Node.js、npm 和 `@geekjourneyx/md2wechat`，确保服务器上 `md2wechat` 在 PATH 中可执行。
2. 使用 `npm install` 安装依赖，使用 `npm run build` 构建。
3. 将不同项目拆到独立目录，代码、数据、日志和端口全部隔离，避免后续接入 openclaw 时互相覆盖。
4. 使用 PM2 或 systemd 常驻运行 Next.js。
5. 使用 Nginx 反向代理到不同本机端口。
6. `/admin` 和 `/api/admin/*` 已有应用层 Basic Auth，公网部署时必须设置后台账号密码，建议再叠加 Nginx Basic Auth、IP 白名单或 VPN。

### 11.1 双项目路径与端口规划

为了确保 99blog 和后续 openclaw 分开运行，服务器统一采用以下目录约定：

```text
/var/www/apps/99blog/current        # 99blog 项目代码
/var/www/apps/openclaw/current      # openclaw 项目代码，后续接入时使用
/var/www/data/99blog/               # 99blog SQLite、上传资产等持久化数据
/var/www/data/openclaw/             # openclaw 独立持久化数据
/var/log/pm2/                       # PM2 日志目录
```

端口规划：

| 项目 | PM2 进程名 | 监听地址 | 端口 | 数据路径 |
|---|---|---|---|---|
| 99blog | `99blog` | `127.0.0.1` | `3000` | `/var/www/data/99blog/99blog.sqlite` |
| openclaw | `openclaw` | `127.0.0.1` | `3001` | `/var/www/data/openclaw/` |

说明：

- 99blog 固定使用 `3000`，openclaw 预留 `3001`，避免两个 Next.js 服务抢同一端口。
- 99blog 生产环境变量固定为 `BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite`。
- openclaw 后续接入时不要复用 99blog 的代码目录、数据目录或 PM2 进程名。
- Nginx 后续可按域名分流，例如 99blog 指向 `127.0.0.1:3000`，openclaw 指向 `127.0.0.1:3001`。

### 11.2 99blog PM2 启动方式

项目已提供 `ecosystem.config.cjs`，生产环境建议在服务器项目目录执行：

```bash
cd /var/www/apps/99blog/current
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

也可以直接执行：

```bash
BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite ADMIN_BASIC_AUTH_USER=admin ADMIN_BASIC_AUTH_PASSWORD=请替换为强密码 npm run start:99blog
```

注意：`ecosystem.config.cjs` 中的 `ADMIN_BASIC_AUTH_PASSWORD=CHANGE_ME_BEFORE_DEPLOY` 只是占位，上线前必须替换。

### 11.3 openclaw 预留原则

openclaw 接入时建议遵守：

1. 克隆到 `/var/www/apps/openclaw/current`。
2. 使用独立端口 `3001`。
3. 使用独立 PM2 进程名 `openclaw`。
4. 数据、上传文件和缓存放到 `/var/www/data/openclaw/`。
5. 不要写入 `/var/www/data/99blog/`，不要复用 `BLOG_DB_PATH`。
6. 如果 openclaw 也需要环境变量，单独使用 `.env.production` 或独立 PM2 ecosystem 文件维护。

## 12. 当前判断

项目已经完成了“可浏览的前端系统”的主体建设，但仍处在“内容与数据待真实化”的阶段。

最有价值的下一步不是继续堆新页面，而是：

1. 补真实内容。
2. 清理占位链接。
3. 增强经历页信息密度。
4. 明确公众号导出链路。
5. 完成部署域名与 SEO 信息。

## 13. 2026-05-16 工作交接记录

### 13.1 今日已完成

- 完成后台管理系统 README：`ADMIN_README.md`，包含后台定位、访问方式、模块说明、数据存储、图片持久化、md2wechat 依赖、部署前检查和安全提醒。
- 完成桌面快速启动脚本：`C:/Users/赵春昊/Desktop/打开99blog后台.cmd`。
  - 脚本会进入 `D:/99blog`。
  - 启动 `npm run dev`。
  - 等待 6 秒后打开 `http://localhost:3000/admin`。
- 完成 Git 仓库初始化与远程配置。
  - 本地仓库：`D:/99blog`。
  - 当前分支：`main`。
  - 远程仓库：`https://github.com/chiquitataan-glitch/blog-manager.git`。
  - Git 用户邮箱：`ChiquitaTaan@gmail.com`。
- 完成初始提交并推送到 GitHub。
  - 远程仓库原本已有一个初始 README 提交。
  - 推送时未强推，采用 `fetch + rebase` 保留远端历史。
  - 解决了 `README.md` 的 add/add 冲突，保留完整 `99blog` 项目 README。
  - 当前远程 `main` 已包含完整项目代码。

### 13.2 当前部署状态

- 服务器 IP：`62.234.55.252`。
- 域名：暂未完成审核，因此 `src/data/site.ts` 中 `origin: "https://example.com"` 暂不替换。
- 服务器暂未配置 Nginx。
- 计划先使用服务器 IP + 3000 端口完成 99blog 临时验证，域名审核完成后再配置 Nginx 反向代理和 HTTPS。
- 服务器后续会接入 openclaw，因此采用双项目隔离目录：99blog 放在 `/var/www/apps/99blog/current`，openclaw 预留 `/var/www/apps/openclaw/current`。
- 99blog 固定监听 `127.0.0.1:3000`，openclaw 预留监听 `127.0.0.1:3001`。
- 推荐 99blog 持久化 SQLite 路径：`/var/www/data/99blog/99blog.sqlite`。
- 推荐 99blog 生产环境变量：`BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite`。
- 99blog 后台访问保护变量：`ADMIN_BASIC_AUTH_USER`、`ADMIN_BASIC_AUTH_PASSWORD`，上线前必须替换默认占位密码。
- openclaw 后续使用独立数据目录 `/var/www/data/openclaw/`，不要复用 99blog 的数据目录或环境变量。
- 推荐用 PM2 或 systemd 常驻运行 Next.js。
- 后台 `/admin` 和 `/api/admin/*` 已通过应用层 Basic Auth 保护，公网部署时建议继续叠加 Nginx Basic Auth、IP 白名单或 VPN。

### 13.3 当前阻塞点

执行服务器环境检查时，SSH 首次连接失败：

```text
Host key verification failed.
```

原因：本机尚未确认服务器 `62.234.55.252` 的 SSH host key，非交互命令无法自动输入 `yes`。

明天继续时，先让用户在 Claude Code 中手动执行一次：

```bash
! ssh root@62.234.55.252
```

看到确认提示后输入：

```text
yes
```

如果要求密码，输入 root 密码。成功登录后执行：

```bash
exit
```

然后继续由助手执行服务器环境检查。

### 13.4 明天建议继续步骤

1. 确认 SSH host key 后重新检查服务器环境：
   - `node` 是否安装。
   - `npm` 是否安装。
   - `git` 是否安装。
   - `pm2` 是否安装。
   - 是否已有 `/var/www/` 相关目录。
2. 如服务器缺少运行环境，先安装 Node.js、npm、git、PM2 和 `@geekjourneyx/md2wechat`。
3. 在服务器克隆 GitHub 仓库：
   - `https://github.com/chiquitataan-glitch/blog-manager.git`
4. 在服务器执行：
   - `npm install`
   - `npm run build`
5. 设置持久化数据目录和环境变量：
   - 99blog 代码目录：`/var/www/apps/99blog/current`
   - 99blog 数据目录：`/var/www/data/99blog/`
   - `BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite`
   - `ADMIN_BASIC_AUTH_USER=admin`
   - `ADMIN_BASIC_AUTH_PASSWORD=请替换为强密码`
   - openclaw 预留代码目录：`/var/www/apps/openclaw/current`
   - openclaw 预留数据目录：`/var/www/data/openclaw/`
6. 使用 PM2 启动：
   - 99blog 使用进程名 `99blog`，监听 `127.0.0.1:3000`。
   - openclaw 后续使用进程名 `openclaw`，监听 `127.0.0.1:3001`。
   - 99blog 可直接执行：`pm2 start ecosystem.config.cjs`。
7. 临时验证访问：
   - `http://62.234.55.252:3000`
   - `http://62.234.55.252:3000/admin`（需要 Basic Auth）
8. 域名审核通过后再做：
   - 更新 `src/data/site.ts` 的 `origin`。
   - 配置 Nginx 反向代理。
   - 配置 HTTPS。
   - 给 `/admin` 增加服务器层二次保护。

### 13.5 明天启动时先检查

建议优先运行：

```bash
git -C "D:/99blog" status --short --branch
git -C "D:/99blog" log --oneline --decorate -5
```

确认本地没有未提交变更后，再继续服务器部署。

朋友们，这个项目的骨架已经搭起来了，接下来拼的就是内容质量和长期维护能力。
