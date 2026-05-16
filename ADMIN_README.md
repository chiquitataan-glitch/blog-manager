# 99blog 后台管理系统 README

更新时间：2026-05-16 03:13:03

## 1. 后台定位

99blog 后台是个人内容管理系统，用于统一维护个人资料、链接、项目、经历、文章文案、图片素材和公众号 HTML。

当前后台已通过应用层 Basic Auth 保护 `/admin` 和 `/api/admin/*`。本地开发环境未配置账号密码时允许访问；生产环境必须设置后台访问账号和密码。

## 2. 访问方式

本地开发环境：

```text
http://localhost:3000/admin
```

启动命令：

```bash
npm run dev
```

生产环境启动后访问：

```text
https://你的域名/admin
```

生产环境需要配置：

```bash
ADMIN_BASIC_AUTH_USER=admin
ADMIN_BASIC_AUTH_PASSWORD=请替换为强密码
```

如果部署到公网服务器，应用层 Basic Auth 是第一层保护，仍建议继续通过 Nginx、服务器防火墙、IP 白名单或 VPN 限制 `/admin` 访问。

## 3. 后台模块

### 3.1 概览

打开后台后的默认页面，用于查看当前内容数量：

- 链接数量
- 项目数量
- 经历数量
- 文案数量
- 图片数量

也提供常用入口：

- 编辑资料
- 维护项目
- 维护经历
- 写公众号文案

### 3.2 个人资料

用于维护：

- 姓名
- 别名
- 一句话介绍
- 头像路径
- 个人介绍

默认头像访问路径：

```text
/profile/avatar.webp
```

本地头像文件建议放在：

```text
public/profile/avatar.webp
```

### 3.3 链接

用于维护联系方式和外部入口，例如：

- GitHub
- 个人站
- 作品项目
- 微信展示信息

如果链接暂未补齐，可以先留空。前台会展示为“待补充”，不会跳转。

### 3.4 项目

项目模块采用“列表 + 详情编辑”。

可维护字段：

- slug
- 项目名
- 状态
- 阶段
- 时间
- 是否首页重点
- 项目简介
- 解决的问题
- 项目价值
- 项目成果
- 目标用户
- 封面路径
- 技术栈
- 项目链接

技术栈一行一个，例如：

```text
Next.js
SQLite
md2wechat
```

项目链接为空或为 `#` 时，前台会显示为“待补充”，不会跳转。

保存后，前台 `/projects` 会优先读取 SQLite 后台数据。

### 3.5 经历

经历模块采用“列表 + 详情编辑”。

可维护字段：

- 类型
- 标题
- 组织 / 项目
- 时间段
- 经历摘要
- 亮点

亮点一行一个，例如：

```text
负责产品原型设计
完成 MVP 开发
沉淀项目复盘文章
```

保存后，前台 `/experience` 会优先读取 SQLite 后台数据。

### 3.6 文案

用于保存文章或公众号文案。

可维护字段：

- 标题
- 摘要
- 分类
- 封面路径
- Markdown 正文

操作：

- `保存文案`：写入 SQLite。
- `生成公众号 HTML`：调用 `md2wechat` 生成 HTML，并自动跳转到公众号预览模块。

### 3.7 图片

用于上传图片素材。

上传目录：

```text
public/uploads/YYYY/MM/
```

上传后会返回 public 路径，可用于：

- 头像
- 项目封面
- 文章封面
- 正文插图

### 3.8 公众号

用于预览和复制公众号 HTML。

推荐流程：

1. 在“文案”模块写 Markdown。
2. 点击“生成公众号 HTML”。
3. 到“公众号”模块预览。
4. 点击“复制 HTML”。
5. 粘贴到公众号编辑器。

当前只生成 HTML，不自动上传公众号草稿。

## 4. 数据存储

默认 SQLite 数据库：

```text
data/99blog.sqlite
```

可通过环境变量覆盖：

```bash
BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite
```

建议服务器部署时将数据库放在独立持久化目录，并纳入备份。后续服务器会接入 openclaw，99blog 建议固定使用 `/var/www/data/99blog/`，openclaw 预留 `/var/www/data/openclaw/`，不要混用。

## 5. 图片与文件持久化

上传图片默认保存在：

```text
public/uploads/
```

服务器部署时需要重点备份：

- SQLite 数据库文件
- `public/uploads/`
- `public/profile/avatar.webp`

## 6. md2wechat 依赖

后台公众号 HTML 生成依赖 `md2wechat` CLI。

服务器需要安装：

```bash
npm install -g @geekjourneyx/md2wechat
```

建议部署前验证：

```bash
md2wechat version --json
md2wechat capabilities --json
```

## 7. 部署前检查清单

当前代码已经通过：

```bash
npm run lint
npm run build
```

部署前仍需确认：

- [ ] 将 `src/data/site.ts` 中的 `origin` 从 `https://example.com` 改成真实域名。
- [ ] 设置 `ADMIN_BASIC_AUTH_USER` 和 `ADMIN_BASIC_AUTH_PASSWORD`，并确认没有使用默认占位密码。
- [ ] 确认 `/admin` 和 `/api/admin/*` 已通过 Basic Auth 保护，服务器层建议再加 IP 白名单、VPN 或 Nginx Basic Auth。
- [ ] 服务器已安装 Node.js、npm。
- [ ] 服务器已安装 `@geekjourneyx/md2wechat`。
- [ ] 设置 `BLOG_DB_PATH` 指向 `/var/www/data/99blog/99blog.sqlite`。
- [ ] 备份 `public/uploads/` 和 `/var/www/data/99blog/`。
- [ ] 99blog 使用端口 `3000`，后续 openclaw 预留端口 `3001`，两个项目不要共用目录、数据或 PM2 进程名。

## 8. 推荐服务器运行方式

构建：

```bash
npm install
npm run build
```

启动：

```bash
pm2 start ecosystem.config.cjs
```

如果不使用 PM2，也可以直接运行：

```bash
BLOG_DB_PATH=/var/www/data/99blog/99blog.sqlite npm run start:99blog
```

生产环境建议使用 PM2 或 systemd 常驻运行。

## 9. 安全提醒

当前后台已通过 `proxy.ts` 对 `/admin` 和 `/api/admin/*` 增加应用层 Basic Auth。生产环境必须设置：

```bash
ADMIN_BASIC_AUTH_USER=admin
ADMIN_BASIC_AUTH_PASSWORD=请替换为强密码
```

不要使用 `CHANGE_ME_BEFORE_DEPLOY` 或示例密码上线。

如果部署到公网服务器，仍不建议只依赖单层保护。建议至少再选择一种服务器层保护方式：

- 只允许本机 / 内网访问。
- 使用 VPN 访问后台。
- Nginx 对 `/admin` 增加 Basic Auth。
- Nginx 对 `/admin` 设置 IP 白名单。
- 后续再实现后台登录系统。
