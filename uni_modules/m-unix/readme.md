<p align="center">
  <img src="https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63fc0f176d6c9a798a194.png" alt="mUnix" width="96" height="96" />
</p>

### mmsUnix

### 面向 uni-app x 的基础 UI 与工具库

## 说明

**mmsUnix**（包目录 `uni_modules/m-unix`，插件 ID **`m-unix`**）是面向 **uni-app x** 的自研 UI 方案：脚本为 **UTS**，页面与组件为 **uvue**，提供 **`m-*` 组件**、**`m-tools` 工具**与 **`mUi` 主题配置**，可在 **App / 微信小程序 / H5** 等端按需接入。

版本号、变更记录与联系方式以包内 **`package.json`**、**[`changelog.md`](./changelog.md)** 为准，与 [DCloud 插件市场](https://ext.dcloud.net.cn/plugin?name=m-unix) 展示同步维护。

## 特点

- **专为 uni-app x**：组件与工具均以 `.uvue` + UTS 编写，类型约束清晰。
- **独立命名**：组件统一 **`m-` 前缀**，避免与生态其它库冲突。
- **按需使用**：支持 easycom 自动引入，也可单独 import 组件或 `libs`。
- **主题可配**：通过 **`mUi`** / **`setMUiConfig`** 与业务侧配置对齐主色与资源。
- **多端适配**：安全区与常见端差异已在组件侧考虑（具体以各组件说明为准）。

## 文档

- **在线文档（站点）**：<https://mmsadmin.cn/mms-unix/README.html>
- **更新日志（权威）**：本目录 **[`changelog.md`](./changelog.md)**（与 `package.json` 的 `version` 一致）
- **源码与 Issue**：<https://gitee.com/mmsAdmin/mms-unix>

## 链接

- [DCloud 插件市场 · m-unix](https://ext.dcloud.net.cn/plugin?name=m-unix)（亦支持 `?id=m-unix`）
- [组件说明站点首页](https://mmsadmin.cn/m-unix/README.html)
- [Gitee 开源仓库](https://gitee.com/mmsAdmin/mms-unix)
- [问题反馈（Gitee Issues）](https://gitee.com/mmsAdmin/mms-unix/issues)

## 预览

在线文档中含组件说明与示例要点；本仓库示例工程 **`pages_demo`** 下为各组件演示页，可在 HBuilderX 中运行目标端查看效果。

### 线上演示（H5 / 微信小程序）

**H5** 与 [unix.mmsadmin.cn](https://unix.mmsadmin.cn/#/) 线上工程对齐；**小程序** 官方太阳码与说明见 [在线文档 · 在线演示](https://mmsadmin.cn/mms-unix/README.html)。  
下列二维码使用**公网 HTTPS 直链**（示例为腾讯云 COS；与下方预览图所用 OSS 同理），在 GitHub / Gitee / 插件市场等查看 **README** 时一般均可显示；须保证 **对象公有读**，且 COS **防盗链** 未拦截对应站点。

<!-- H5：指向 unix 部署；小程序：指向文档页（太阳码以在线文档内图片为准，此处仅为直达文档的备用码） -->
<p align="center">
  <table>
    <tr>
      <td align="center" valign="top" style="padding: 0 24px;">
        <a href="https://unix.mmsadmin.cn/#/" title="打开 H5 演示">
          <img src="https://lhym-1301608033.cos.ap-chengdu.myqcloud.com/mms/upload/69cb8100127a65964cfe9c2d.png" width="200" height="200" alt="H5 演示二维码（unix.mmsadmin.cn）" style="display:block;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.08);object-fit:contain;background:#fff;" />
        </a>
        <p align="center"><strong>H5</strong><br />
        <sub><a href="https://unix.mmsadmin.cn/#/">unix.mmsadmin.cn</a></sub></p>
      </td>
      <td align="center" valign="top" style="padding: 0 24px;">
        <a href="https://mmsadmin.cn/mms-unix/README.html" title="打开在线文档 · 小程序演示码">
          <img src="https://lhym-1301608033.cos.ap-chengdu.myqcloud.com/mms/upload/69cb8114127a65964cfe9c2e.jpg" width="200" height="200" alt="微信小程序演示太阳码" style="display:block;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.08);object-fit:contain;background:#fff;" />
        </a>
        <p align="center"><strong>微信小程序</strong><br />
        <sub>太阳码见 <a href="https://mmsadmin.cn/mms-unix/README.html">在线文档</a>；亦可自托管 <code>static/*.jpg</code></sub></p>
      </td>
    </tr>
  </table>
</p>

若图片仍不显示，请检查 COS 权限与防盗链，或直接点击表格内 **链接** 打开 H5 / 在线文档；本地仓库也可将二维码放入 **`uni_modules/m-unix/static/`** 使用相对路径（仅在逐文件路径正确时有效）。

以下为运行效果示意（多端以实际为准）：

| 预览 1 | 预览 2 |
| :---: | :---: |
| ![mUnix 预览 1](https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63f8df176d6c9a798a190.jpg) | ![mUnix 预览 2](https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63f93f176d6c9a798a191.jpg) |
| ![mUnix 预览 3](https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63f99f176d6c9a798a192.jpg) | ![mUnix 预览 4](https://sxpcwlkj-test.oss-accelerate.aliyuncs.com/mmsMall/upload/69c63fa0f176d6c9a798a193.jpg) |

## 安装

#### **uni-app 插件市场链接** —— <https://ext.dcloud.net.cn/plugin?name=m-unix>

通过 HBuilderX **导入插件**或使用已有工程：将 **`uni_modules/m-unix`** 置于项目内，HBuilderX 会自动识别 **uni_modules** 规范插件（建议使用 **3.1.0** 及以上版本 HBuilderX）。

## 快速上手

1. 在 **`pages.json`** 中配置 **easycom**（规则见下「easycom」；与示例工程一致时可复制即用）。
2. 在 **`main.uts`** 中用 **`createSSRApp`** 创建应用并执行 **`app.use(mUnix)`**（会注册全局组件并通过 **`Vue.config.globalProperties.$m`** 挂载，组件内使用 **`this.$m`**，一般**不必**再调 **`mount$m()`**）。
3. 在 **`App.uvue`** 中 **`@import`** **`index.scss`**（主题与工具类样式，建议保留）。

详见下文「使用方法」。

## 使用方法

### easycom（`pages.json`）

在 **`pages.json`** 根级增加 **`easycom`**，使 **`m-组件名`** 无需手写 import 即可解析到包内路径：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^m-(.*)": "@/uni_modules/m-unix/components/m-$1/m-$1.uvue"
    }
  }
}
```

配置后模板中可直接使用：

```uvue
<m-button type="primary">确定</m-button>
```

### 全局安装（`main.uts`）

uni-app x 入口需使用 **`createSSRApp`**（来自 **`vue`**），并 **`export function createApp()`** 返回 **`{ app }`**，与框架约定一致：

```uts
import App from './App.uvue'
import { createSSRApp } from 'vue'
import mUnix from '@/uni_modules/m-unix'

export function createApp() {
  const app = createSSRApp(App)
  app.use(mUnix)
  return {
    app
  }
}
```

**说明**：

- **`app.use(mUnix)`** 会执行包内 **`install`**：批量注册 **`m-*`** 全局组件，并将工具挂到 **`Vue.config.globalProperties.$m`**（**`this.$m`** / 模板 **`$m`**）。**不**再写入 **`uni.$m`**。
- **`mUnix.mount$m()`** 已废弃（空实现，仅为兼容旧代码路径）；请始终使用 **`app.use(mUnix)`**。

### 可选：多语言（`initI18n`）

若使用示例工程中的 **`initI18n()`**，需在 **`main.uts`** 于创建应用**前**调用，且项目中存在 **`locale/index.uts`** 所依赖的 **`@/locale/*.json`** 等资源（路径以你工程为准）。不使用 **`t()`** / 内置文案时可省略本步。

### 全局样式（`App.uvue`）

在应用根组件样式中引入（与示例工程一致）：

```scss
@import '@/uni_modules/m-unix/index.scss';
```

### 图标字体（`m-icon` / iconfont）

**`m-icon`** 与部分组件（如 **`m-empty`** 默认空状态图标）使用 **`font-family: "iconfont"`** 的 **TTF 字库**。接入时除引入 **`index.scss`**（已包含 **`.iconfont`** 基础样式）外，还需保证工程内存在字体文件，并按端加载。

#### 1. 放置字体文件

将 **`iconfont.ttf`** 放到宿主工程 **`static/iconfont/iconfont.ttf`**（路径固定，与样式中的 **`url("/static/iconfont/iconfont.ttf")`** 一致）。字体文件须与包内 **`m-icon`** 中 **`getIconChar`** 的 Unicode 映射一致；若使用自建 iconfont，需同步维护映射或替换字库后更新 **`components/m-icon/m-icon.uvue`**。

#### 2. App / H5：启动时 `loadFontFace`

**小程序**下 **`uni.loadFontFace`** 对 **`/static`** 等地址限制较多，包内已通过 **`libs/css/mp.scss`** 的 **`@font-face`** 引用同一 TTF，**一般无需**在 **`App.uvue`** 再加载。  
**非小程序**端请在 **`App.uvue`** 的 **`onLaunch`**（或等价入口）中调用 **`uni.loadFontFace`**，并与 **`#ifndef MP`** 条件编译配合，例如：

```uts
onLaunch(() => {
  // #ifndef MP
  uni.loadFontFace({
    family: 'iconfont',
    source: 'url("/static/iconfont/iconfont.ttf")',
    success: () => {
      console.log('图标字体加载成功')
    },
    fail: (err) => {
      console.log('图标字体加载失败', err)
    }
  })
  // #endif
})
```

#### 3. 页面中使用

在已配置 **easycom** 的前提下，直接使用 **`m-icon`**，**`name`** 为字库中已映射的名称（部分名称含别名，如 **`person`** 与 **`user`** 等价）：

```uvue
<m-icon name="search" color="#333333" size="20"></m-icon>
```

可用名称清单可参考本仓库 **`pages_demo/icon`** 演示页，或查看 **`components/m-icon/m-icon.uvue`** 内 **`getIconChar`** 映射。

### 按需引入组件

仅使用个别组件时，可直接按路径引用（**easycom 与按需二选一即可**，勿重复注册）：

```uts
import MButton from '@/uni_modules/m-unix/components/m-button/m-button.uvue'
```

### 按需引入工具（`libs` / `m-tools`）

常用工具在 **`libs/utils.uts`**；网络请求在 **`components/m-tools/Request.uts`**（**无** **`libs/request.uts`** 路径）：

```uts
import { formatDate, debounce } from '@/uni_modules/m-unix/libs/utils.uts'
import { request, http } from '@/uni_modules/m-unix/components/m-tools/Request.uts'
```

### 业务配置：`@/common/config`（可选）

工具层（**`Request.uts`**、**`Upload.uts`**、**`Storage.uts`**、**`Auth.uts`**、**`config.uts` / `mUi`**）以及 **`m-login`**、**`m-upload`**、**`m-update`**（版本号）等，统一通过包内 **`components/m-tools/ProjectConfig.uts`** 的 **`getHostProjectConfig()`** 读取配置。

- **不配 `common/config`**：不注入即可；库内带有安全默认值（例如 **`baseUrl`**、各 API 路径可为空），工程可正常编译，仅实际发请求 / 自动上传时需自行传完整 URL 或运行时调用 **`injectMUnixHostProjectConfig`**。
- **要配 `common/config`**：在业务工程中建 **`common/config.ts`（或 `.uts`）**，导出与下文「字段约定」一致的对象 **`config`**，并在 **任意** **`import '@/uni_modules/m-unix'`**（或会间接加载上述工具）之前完成 **注入**。

#### 1. 入口注入（必须早于 `m-unix`）

在 **`main.uts` 最顶部**先执行注入，再 `import mUnix`。推荐单独放一个文件（与本仓库示例一致）：

**`inject-m-unix-host.uts`**（路径可自定，勿放进 `uni_modules` 内）

```uts
import { config } from '@/common/config'
import { injectMUnixHostProjectConfig } from '@/uni_modules/m-unix/components/m-tools/ProjectConfig.uts'

injectMUnixHostProjectConfig(config)
```

**`main.uts`**

```uts
import './inject-m-unix-host.uts'
import App from './App.uvue'
import { createSSRApp } from 'vue'
import mUnix from '@/uni_modules/m-unix'

export function createApp() {
  const app = createSSRApp(App)
  app.use(mUnix)
  return { app }
}
```

也可从插件主入口按需引用：**`injectMUnixHostProjectConfig`**、**`getHostProjectConfig`**、**`clearMUnixHostProjectConfig`** 已从 **`@/uni_modules/m-unix`**（`index.js`）再导出。

#### 2. `common/config` 导出对象字段约定

与 **`ProjectConfig.uts`** 中 **`MUnixHostProjectConfig`** / **`injectMUnixHostProjectConfig`** 可合并字段对齐即可；以下为常用业务侧结构说明（**未列字段可省略**，走库内默认）。

| 字段 | 说明 |
|------|------|
| **`env`** | `'local' \| 'dev' \| 'prod'`，可与各环境 base 一起用于你在 TS 里算出 **`baseUrl`** |
| **`localBaseUrl` / `devBaseUrl` / `prodBaseUrl`** | 各环境 API 根；是否使用由业务 **`config.ts` 自行算 **`baseUrl`** 决定 |
| **`baseUrl`** | **必填（若要用默认请求 / 上传拼接）**：`Request`、`Upload`、**`getMUiConfig`** 里开发环境兜底等均依赖此项 |
| **`storage.token` / `storage.userInfo`** | 本地存储 key，与 **`Storage.uts`**、登录态一致 |
| **`loginRequiredPaths`** | 路径片段数组，供 **`needLogin`** 判断哪些页需登录 |
| **`loginPagePath`** | 需前导 **`/`**，与 **`pages.json` 一致**；401 跳转、`checkLogin`、`m-login` 非微信端逻辑会用到 |
| **`api.login.*`** | **`tokenLogin`**、**`codeGetOpenIdLogin`**、**`codeGetPhoneRegisterOrLogin`**，供 **`m-login`** 等 |
| **`api.upload.image`** | **`m-upload`** 在 **`autoUpload`** 且未传 **`uploadUrl`** 时的相对路径 |
| **`api.update.checkUpdate`** | 业务 **`checkUpdate`** 请求路径仍放在宿主 **`config`** 中；**`m-update`** 通过 **`check-update-fn`** 传入 **`(currentVersionCode) => Promise<ApiEnvelope>`**（与原先 **`mallApi.checkUpdate`** 返回结构一致：**`code` / `data`**），不传则 **`check()`** 仅告警、不请求（包内**不**再引用 **`@/common/api/mallApi`**） |
| **`api.qrCodeImageApiBase`** | 二维码图接口根；与 **`getMUiConfig().qrCodeImageApiBase`** 合并链相关，可留空 |
| **`configInfo`** | **`name` / `logo` / `desc` / `versionCode` / `versionName`** 等；**`m-login`** 可选 **`userAgreementArticleId`**、**`privacyPolicyArticleId`**（与示例工程 **`ConfigInfo`** 一致即可） |
| **`mUi`** | 可选，与 **`uni_modules/m-unix/config.uts`** 中 **`MUiPartial`** 一致，用于主题与资源覆盖 |

业务侧完整 TypeScript 示例可参考开源示例工程中的 **`common/config.ts`**（**`export const config`**）。若对接主仓 **`mms-api-unix`**，**`api.*` 路径与 Query/Body** 约定见工程内 **`docs/mms-api-unix-接口适配.md`**。

#### 3. 运行时覆盖 / 调试

- **`injectMUnixHostProjectConfig(obj)`**：将传入对象与库内默认合并后作为当前生效配置；**再次调用会以新入参重新合并**（后一次覆盖前一次的注入结果，适合切换环境）。
- **`clearMUnixHostProjectConfig()`**：清空注入，恢复库内默认。
- **`getProjectConfigInfo()`**（**`Ut.uts`**）：读取当前 **`configInfo`**，区别于 **`$m.configInfo()`**（与 **`getMUiConfig()`** 对齐的展示用对象）。

#### 4. 包内源码约定（自检）

**`uni_modules/m-unix`** 下 **`.uts`、`.uvue`、`index.js`** 的脚本中**不包含** **`import '@/common/config'`**、**`import '@/common/api/...'`**（含 **`mallApi`**）。业务接口与全局 **`config`** 仅在**宿主工程**中实现，通过 **`injectMUnixHostProjectConfig`** 或组件 props（例如 **`m-update`** 的 **`check-update-fn`**）接入。

若使用 **`main.uts`** 中的 **`initI18n()`**，**`locale/index.uts`** 会 **`import '@/locale/zh-Hans.json'`** 等——需在宿主项目 **`locale/`** 下提供对应 JSON，与 **`common/config`** 无关。

## 组件列表

以下与 `uni_modules/m-unix/components` 下 **`m-*` 组件目录**一致（按功能归类，便于检索）。**props / 事件 / 平台差异** 以 [在线文档](https://mmsadmin.cn/m-unix/README.html) 与源码注释为准；**`changelog.md`** 记录版本级变更。

### 布局与结构

| 组件 | 说明 |
|------|------|
| m-row | 栅格行 |
| m-col | 栅格列 |
| m-card | 卡片容器 |
| m-feed-post | 信息流单条帖子 |
| m-cell | 单元格 |
| m-cell-group | 单元格分组 |
| m-gap | 占位间距 |
| m-wing-blank | 两翼留白 |
| m-white-space | 上下留白 |
| m-section | 区块标题 |
| m-content | 内容区容器 |
| m-sticky | 吸顶 |
| m-sticky-bottom | 底部粘性栏 |

### 导航与路由辅助

| 组件 | 说明 |
|------|------|
| m-bottom-popup | 底部弹窗 |
| m-bottom-navigation | 底部导航 |
| m-tabs | 标签页 |
| m-top-back | 顶部返回 |
| m-fab | 悬浮按钮 |

### 表单与输入

| 组件 | 说明 |
|------|------|
| m-button | 按钮 |
| m-input | 输入框 |
| m-textarea | 多行输入 |
| m-form | 表单 |
| m-search | 搜索框 |
| m-upload | 图片上传 |
| m-datetime-picker | 日期时间选择 |
| m-clipboard | 剪贴板复制 |
| m-switch | 开关 |
| m-radio / m-radio-group | 单选 / 单选组 |
| m-checkbox / m-checkbox-group | 多选 / 多选组 |
| m-picker | 选择器 |
| m-code-input | 验证码输入框 |
| m-number-box | 步进器 |
| m-keyboard | 键盘 |
| m-dropdown-list | 下拉列表 |
| m-cascade-selection | 级联选择 |

### 展示与信息

| 组件 | 说明 |
|------|------|
| m-div | 分割线 |
| m-empty | 空状态 |
| m-loading | 加载中 |
| m-loadmore | 加载更多 |
| m-skeleton | 骨架屏 |
| m-swiper | 轮播图 |
| m-notice-bar | 公告栏 |
| m-notice-vertical | 纵向通告（可滚动长文） |
| m-pagination | 分页器 |
| m-rolling-news | 滚动消息 |
| m-segmented-control | 分段器 |
| m-price | 价格展示 |
| m-tag | 标签 |
| m-tree | 树形结构 |
| m-qrcode | 二维码 |
| m-screenshot | 页面截图 |
| m-watermark | 水印 |
| m-text | 文本 |
| m-richtext | 富文本 |
| m-collapse | 折叠面板 |
| m-steps | 步骤条 |
| m-time-axis / m-time-axis-item | 时间轴 / 子项 |
| m-banner-arc | 横幅弧形容器 |
| m-tips | 提示条 |

### 反馈与弹层

| 组件 | 说明 |
|------|------|
| m-overlay | 遮罩层 |
| m-popup | 弹出层 |
| m-toast | 轻提示 |
| m-dialog | 对话框 |
| m-action-sheet | 操作菜单 |
| m-bubble-popup | 气泡菜单 |
| m-alert | 警告提示 |

### 业务与扩展

| 组件 | 说明 |
|------|------|
| m-countdown | 倒计时 |
| m-countdown-verify | 验证码倒计时 |
| m-grid / m-grid-item | 宫格 / 宫格子项 |
| m-icon | 图标 |
| m-login | 登录 |
| m-wx-login | 微信登录 |
| m-link | 链接 |
| m-rate | 评分 |
| m-vcode | 图形验证码 |
| m-amount-inwords | 金额大写 |
| m-picture-cropper | 图片裁剪 |
| m-swipe-action | 滑动操作 |
| m-update | 应用更新 |

### 工具库（非 `m-*` 标签，随包或按需 import）

| 模块 | 说明 |
|------|------|
| `libs/utils.uts` | 常用工具函数 |
| `components/m-tools/Request.uts` | 网络请求封装（默认 `getHostProjectConfig().baseUrl`，可选 `injectMUnixHostProjectConfig`） |
| `components/m-tools/*` | 存储、认证、上传等（见目录） |

## 版权信息

**mmsUnix（m-unix）** 遵循 **MIT** 开源协议：可自由用于商业或个人项目，保留许可证声明即可。

**出品**：陕西品创网络
