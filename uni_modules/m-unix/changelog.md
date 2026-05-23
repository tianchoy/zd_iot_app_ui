## 1.2.10（2026-03-31）
#### 文档

- **`readme.md`**：预览区 **H5 / 微信小程序** 演示码改为 **COS 等 HTTPS 直链**，并说明 **公有读**、**防盗链** 与裂图排查；**「图标字体（m-icon / iconfont）」** 接入说明（**`static/iconfont`**、**`loadFontFace`**、**`mp.scss`**、**`name` / `size` / `color`**）。文首 **「## 文档」** 随版本保持索引更新。

#### 修复

- **`m-login.uvue`**：**`getPhone`** 内补充 **`getHostProjectConfig()`**，修复 **`cfg` 未定义**（微信取号成功回调闭包作用域）。

> 更早版本见下文 **§3 已发布版本**（含 **1.2.9** · mms-api-unix 示例对接等）。

<p align="center">
  <img src="https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63fc0f176d6c9a798a194.png" alt="mUnix" width="72" height="72" />
</p>
<p align="center"><strong>mUnix</strong> · uni-app x 组件库</p>

---

# mUnix 更新日志

本文档位于 **`uni_modules/m-unix`** 根目录（与 `package.json`、`readme.md`、`logo.png` 同级），为组件库**权威变更记录**。**当前版本**以 `package.json` 的 **`version`** 为准。

## [Unreleased]

> 发版前：将本节并入 **§3** 新版本章节，并同步提升 `package.json` 的 **`version`**。

---
## 1. 组件库信息

| 项目 | 说明 |
|------|------|
| **名称** | m-unix（`m-` 前缀 UI 与工具） |
| **定位** | 面向 **uni-app-x**；**UTS** + **uvue** |
| **包标识** | 目录 `uni_modules/m-unix`；`package.json` 的 `id` / `name`：`mUnix` |
| **出品** | **陕西品创网络** |

### 1.1 链接

| 类型 | 地址 |
|------|------|
| **组件说明（站点）** | <https://mmsadmin.cn/m-unix/README.html> |
| **开源仓库** | <https://gitee.com/mmsAdmin/mms-unix> |
| **DCloud 插件市场** | <https://ext.dcloud.net.cn/plugin?id=m-unix> |

### 1.2 联系方式（陕西品创网络）

| 类型 | 内容 |
|------|------|
| **邮箱** | sxpcwlkj@163.com |
| **微信** | qq942879858 |
| **反馈** | 插件市场评论、Gitee Issue、邮件 / 微信 |

---

## 2. 版本记录书写约定

- **版本号**：SemVer，与 `package.json` 的 `version` 同步。
- **日期**：`YYYY-MM-DD`，与发版日一致。
- **分类（按需）**：新增 / 变更 / 修复 / 说明。

---

## 3. 已发布版本

### 1.2.10（2026-04-01）

#### 文档

- **`readme.md`**：预览区 **H5 / 微信小程序** 演示码使用 **HTTPS 直链**（腾讯云 COS 等）；补充 **COS 公有读 / 防盗链** 说明；完善 **「图标字体（m-icon）」** 与文首文档索引。

#### 修复

- **`components/m-login/m-login.uvue`**：**`getPhone`** 内 **`const cfg = getHostProjectConfig()`**，消除 **`cfg` 未定义** 编译告警。

### 1.2.9（2026-04-01）

#### 说明（示例工程 · 对接 mms-api-unix）

- 仓库内 **`docs/mms-api-unix-接口适配.md`**：与主仓 **`mms-api-unix`** 的路径、模块前缀约定说明。
- **`common/config.ts`**：默认 **`baseUrl`** 指向演示 **`https://demo.mmsadmin.cn/prod-api`**（无尾斜杠）；**`api.login`** → **`/api/member/v1/token-login`**、**`code-open-id-login`**、**`code-phone-register-or-login`**；**`api.update.checkUpdate`** → **`/api/app/v1/upgrade-check`**；**`api.upload.image`** → **`/api/base/v1/uploads`**（multipart 字段 **`file`**，与 **`m-upload`** / **`Upload.uts`** 默认一致）。
- **`common/api/mallApi.uts`**：广告、省市区、短信、会员登录/地址/资料、文章列表/详情等改为 **`/api/{模块}/v1/...`**；**`checkUpdate`** 携带 Query **`type`**（**`APP-IOS`** 为 **1**，否则为 **2**），并保留 **`currentVersionCode`** 便于网关兼容；**`tokenLogin` / `weixinLogin`** 使用 **`config.api.login.*`**。**藏品 / 订单 / 合同**等后端未在 **mms-api-unix** 落地的接口保留旧路径并注释，需自建网关或微服务。
- **`common/api/auth.uts`**：示例请求改为 **`/api/member/v1/*`**、**`/api/base/v1/sms-code`**。
- **`config.uts`**（包内）：**`apiDevelopmentBase` / `apiProductionBase`** 默认值与上述演示根一致（未注入宿主时 **`getMUiConfig`** 兜底）。

#### 文档

- **`readme.md`**：**`common/config`** 说明处补充 **mms-api-unix** 适配文档索引；**预览**区 **H5 / 小程序** 演示码使用 **`uni_modules/m-unix/static/`** 资源与统一尺寸展示。
- **工具页**：**`pages/tools/tools`** 在 **`<script setup>`** 中轻提示改为 **`Ut.msg`**，避免 **`this.$m`** 不可用报错。

### 1.2.8（2026-03-31）

#### Breaking（接入注意）

- **`app.use(mUnix)`** 仅将工具挂到 **`Vue.config.globalProperties.$m`**，**不再**设置 **`uni.$m`**。**`mount$m()`** 已废弃（空实现）。旧代码里 **`uni.$m`** 请改为 **按需 `import`**，或在合适上下文用 **`getCurrentInstance()`** 访问 **`globalProperties.$m`**（**`<script setup>`** 中勿用 **`this.$m`**）。

#### 文档

- **`readme.md`**：与上述 **`$m`** 行为一致。

### 1.2.7（2026-03-30）

- **`pages_demo/ext/app-update/app-update.uvue`**：**`m-update`** 使用 **`check-update-fn`** 对接宿主 **`checkUpdate`**。

### 1.2.6（2026-03-30）

#### 配置与工具（可选 `@/common/config`）

- **`ProjectConfig.uts`**：**`injectMUnixHostProjectConfig` / `getHostProjectConfig` / `clearMUnixHostProjectConfig`**；未注入时用库内默认。**`Request` / `Storage` / `Auth` / `Upload` / `config`（mUi）/ `Ut` / `m-login` / `m-upload`** 均读 **`getHostProjectConfig()`**，包内**不再** **`import '@/common/config'`**。
- **`m-update`**：去掉对 **`@/common/api/mallApi`**；**`check-update-fn`** 由宿主传入；未传则 **`check()`** 不请求。
- **`Ut.uts`**：**`projectConfigInfo`** → **`getProjectConfigInfo()`**。
- **`index.js`**：再导出 **`injectMUnixHostProjectConfig`** 等。
- **`readme.md`**：**业务配置（可选）**、字段表、**`m-update`** 对接说明、**包内源码约定**。

#### 示例工程

- **`inject-m-unix-host.uts`** + **`main.uts`** 顶部优先 **`import`**，早于 **`mUnix`**。

### 1.2.5（2026-03-30）

- **`pages/templates/forum-feed`**：示例图改为 **`picsum.photos`**（需联网）；**`m-unix-doc/forum-feed.md`** 同步。
- 移除 **`pages_demo/feed-post`** 独立入口；**`m-feed-post`** 由模版页展示。

### 1.2.4（2026-03-30）

- **新增 `m-feed-post`**（信息流帖子、多 v-model 与事件）；演示曾单独分包后于 **1.2.5** 收口至模版。
- **`m-wx-login` / `m-login` / `readme` / `package.json`**：微信端文案与 **`keywords`** 等调整。
- **文档**：**`m-unix-doc/m-feed-post.md`** 等。

### 1.2.3（2026-03-27）

- **仅发版号递增**：相对 **1.2.2** 无新增代码；文档与元数据同 **1.2.2**。

### 1.2.2（2026-03-27）

- **文档与元数据**：**`readme`** 全量组件表、HTTPS Logo、**`repository`**、市场结构、**`changelog`** 顺序与 **§1** 对齐；**无**组件 / API 行为变更。

### 1.2.0（2026-03-27）

- **新增**：**`m-swiper`、`m-pagination`、`m-segmented-control`、`m-notice-vertical`**；本包 **`changelog.md`** 与市场同步维护。
- **变更**：**`m-notice-bar`、`m-rolling-news`** 能力增强。
- **修复**：**`m-tools`** 类型导入路径等。

### 1.1.1（2026-03-24）

- 默认主题色与 **`libs/css/m.scss`** 同步为 **`#ff0844`**（仍可由 **`mUi` / `setMUiConfig`** 覆盖）。

### 1.1.0（2026-03-23）

- **样式**：`common.scss` / `m.scss` 整理，ucss 兼容；横向 flex 显式 **`flex-direction: row`**。
- **`m-icon`**：字库与 Unicode 映射重构；别名（如 **`person` → `user`**）。
- **新增**：**`m-cell-group`、`m-grid-item`**。
- **修复**：**`index.js`** 路径、**`Request.uts`**、**`m-grid` / `m-cell`** 等。

### 1.0.0（2026-03-23）

- 首批 **`m-*`** 与 **`m-tools`**；**uvue + UTS**，多端。

---

## 4. 维护检查清单（发版前）

1. 将 **`[Unreleased]`** 并入新版本，填写日期。
2. 更新 **`package.json`** 的 **`version`**，与本文 **§3** 新标题一致。
3. 插件市场提交时可摘要 **§1** 与 **§3 最新一节**。
