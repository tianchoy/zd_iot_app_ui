# 项目代码审查与优化建议

- **审查日期**：2026-09-24
- **项目路径**：`/Users/xyhc/Documents/zd_iot_app_ui`
- **审查目标**：理解现有功能、页面流转、接口与跨端策略，列出需要修复、优化和进一步确认的事项。
- **审查方式**：只读审阅项目自有入口、配置、页面、组件、接口、工具和调用关系；未修改业务代码。
- **审查范围**：`App.uvue`、`main.uts`、`pages.json`、`manifest.json`、`platformConfig.json`、`package.json`、`common/`、`api/`、`utils/`、`pages/`、`components/`、`i18n/`、`locales/`。
- **未深入审阅**：`uni_modules/` 下第三方 `rice-ui`、`lime-i18n` 源码；仅检查项目对它们的使用方式和部分接口引用。

## 1. 执行摘要

这是一个基于 **uni-app x + Vue 3 + UTS/uvue** 的跨端卡片/物联网业务应用，当前主要面向微信小程序和 H5，包含卡片查询、卡片详情、充值、套餐、订单、支付、反馈、扫码和登录等功能。

当前最需要优先处理的不是视觉细节，而是以下四类工程风险：

1. **支付链路不完整**：充值页和订单详情页各自实现支付逻辑，状态清理、场景判断、异常处理和 H5 回跳行为不一致。
2. **跨端配置不一致**：页面条件编译、全局自定义导航、微信原生导航、H5/App 入口和 `platformConfig.json` 的目标平台声明存在偏差。
3. **鉴权与数据安全边界不清晰**：部分订单/反馈/H5 接口显式关闭 Token，普通请求和上传请求的 Token 来源、Header 格式也不统一。
4. **类型和错误处理不足**：多处使用 `any`、空值未保护、请求响应缺少严格校验，已经发现多个可能直接导致运行错误或编译错误的位置。

建议先进行 **P0/P1 稳定性与安全修复**，再处理支付抽象、跨端治理和工程化建设，不建议立即进行大范围 UI 重构。

## 2. 项目功能与业务流程

### 2.1 主要功能

| 模块 | 主要页面 | 当前职责 |
|---|---|---|
| 卡片首页 | `pages/card/card.uvue` | 展示卡片列表、进入卡片详情、扫码/查询入口 |
| 卡片详情 | `pages/cardDetail/cardDetail.uvue` | 展示卡片状态、流量、订单、绑定/解绑操作 |
| 充值 | `pages/recharge/recharge.uvue` | 查询卡详情、选择套餐、创建订单、发起支付 |
| 套餐 | `pages/myPkg/myPkg.uvue`、`pages/pkgDetail/pkgDetail.uvue` | 查看当前卡套餐和套餐详情 |
| 订单 | `pages/myOrder/myOrder.uvue`、`pages/orderRecord/orderRecord.uvue`、`pages/orderDetail/orderDetail.uvue` | 查询订单、查看详情、重新支付 |
| 支付结果 | `pages/paySuccess/paySuccess.uvue`、`pages/payFailed/payFailed.uvue` | 展示支付结果和订单信息 |
| 反馈 | `pages/questionFeedback/list.uvue`、`detail.uvue`、`submit.uvue` | 查看、提交、回复、关闭问题反馈，支持图片上传 |
| 登录 | `pages/login/login.uvue` | 微信登录、手机号授权、Token 保存/跳转 |
| 扫码 | `pages/scanCode/scanCode.uvue` | H5/小程序/App 扫码并解析卡号或业务参数 |

### 2.2 主要业务链路

```text
卡片首页
  -> 卡片详情
  -> 充值页
  -> 选择套餐
  -> 创建订单
  -> 微信/通联/H5 支付
  -> 支付结果确认
  -> 成功页或订单详情
```

```text
订单列表
  -> 订单详情
  -> 重新支付
  -> 支付回调或订单状态查询
```

```text
订单/卡片
  -> 反馈列表
  -> 反馈详情
  -> 提交/回复反馈
  -> 上传图片
```

### 2.3 当前已确认的导航修复

此前已针对微信端从 `pages/recharge/recharge` 跳转到 `pages/myPkg/myPkg`、`pages/orderRecord/orderRecord` 后标题被压缩的问题，统一了微信端原生导航配置，并在两个页面排除自定义 `topNavBar`。后续新增页面时需要继续遵循“一种页面只使用一套导航”的原则。

## 3. 技术架构与入口审查

### 3.1 入口和配置

| 文件 | 结论 |
|---|---|
| `main.uts` | 使用 `createSSRApp(App)` 创建 Vue 应用，并注册 i18n；H5 额外引入 rice-ui 样式。 |
| `App.uvue` | 处理应用生命周期、微信小程序更新、Android/Harmony 返回键。部分导入疑似未使用。 |
| `pages.json` | 使用条件编译区分微信、H5 和其他平台；页面入口与 TabBar 存在平台覆盖缺口。 |
| `manifest.json` | 包含微信、Web、Android/iOS 发布配置，但 App 图标、启动图等配置不完整。 |
| `platformConfig.json` | 目前只声明 `MP_WEIXIN`、`Web`，与代码中 Android/Harmony/iOS 处理不完全一致。 |
| `package.json` | 只有 uni-app 自定义 H5 版本脚本，没有完整的安装、构建、测试说明。 |
| `README.md` | 目前主要是条件编译示例，缺少实际开发、构建、发布和环境配置文档。 |

### 3.2 平台范围问题

**优先级：P1，需先确认产品实际交付平台。**

1. `platformConfig.json` 只声明微信小程序和 Web，但代码包含 `APP-ANDROID`、`APP-HARMONY`、iOS manifest 配置。
2. `pages/card/card` 仅在微信和 H5 条件块中注册，但全局 TabBar 始终引用 `pages/card/card`。如果构建 Android/iOS/Harmony 或其他小程序，可能出现首页不存在或 TabBar 无效。
3. `pages.json` 使用 `#ifdef H5`，而 `platformConfig.json` 使用 `Web`，需要确认当前 uni-app x 工具链的条件编译名称是否稳定一致。
4. 各平台首个页面不一致：微信首个页面为卡片页，H5 可能为充值页，其他平台可能为我的页。应明确是否要求所有平台统一入口。

**建议：**先形成平台矩阵：目标平台、首屏、登录方式、支付方式、扫码方式、导航模式、接口环境、发布配置；平台矩阵确认前不继续扩大跨端功能。

### 3.3 环境配置问题

**优先级：P1。**

证据位置：`common/config.uts:41-52`。

当前 `ENV` 固定为 `prod`，同时保留局域网 HTTP 开发地址和 HTTPS 生产地址，没有看到可靠的构建环境切换机制。认证参数、租户 ID、客户端 ID、微信 AppID 也集中硬编码在配置文件中。

风险：

- 本地开发容易误请求生产环境。
- 构建参数配置错误时可能向 HTTP 地址发送敏感数据。
- Token、租户、客户端和 API 地址没有形成一个不可分裂的环境配置对象。

建议：

- 使用构建脚本或明确的平台配置选择 `dev/test/prod`。
- 生产构建禁止 HTTP URL。
- 对 `baseUrl` 做 HTTPS 和域名白名单校验。
- 将平台 AppID、租户、clientId、grantType 作为按环境/平台管理的配置，不要在业务页面散落。
- 环境切换时隔离或清理旧 Token。

## 4. P0/P1 问题清单

### P0：阻断或直接错误

#### P0-1 `orderDetail` 支付异常处理引用未定义变量

- **文件**：`pages/orderDetail/orderDetail.uvue:437-443`
- **现象**：`catch (error)` 中使用 `err.msg`。
- **影响**：支付请求失败时，异常处理再次抛错；可能编译失败或无法显示失败提示。
- **建议**：统一使用 `error`，并提供安全兜底文案；支付错误处理应抽到公共逻辑。

#### P0-2 `orderDetail.getCode()` 没有返回异步结果

- **文件**：`pages/orderDetail/orderDetail.uvue`
- **现象**：调用方 `await getCode()`，但 `getCode` 内部只调用 `uni.login` 回调，没有返回 `Promise<boolean>`。
- **影响**：调用方拿到 `undefined`，错误进入“登录失败”分支，后续订单加载被中断。
- **处理**：`getCode` 已改为真正返回 `Promise<boolean>`；登录分支统一收敛到 `isPhoneLoginRequired()`。

#### 已撤销的误判：`topNavBar` / `payment` 缺少 `ref`、`computed` 导入

- **原判断**：两个文件使用 `ref`、`computed` 但未从 `vue` 导入，怀疑会编译失败。
- **更正结论**：这两个组件在线上功能中是正常工作路径（`topNavBar` 用于所有页面、`payment` 用于支付弹窗），说明当前 uvue 编译链会提供这层能力，**不是阻断问题**。
- **保留建议（P3，仅规范统一）**：项目内多数页面显式 `import { ref, computed } from 'vue'`，建议统一风格；不要在未验证的情况下批量“修复”，避免对现有可用代码做无收益改动。

### P1：业务不可用、安全或支付高风险

#### P1-1 登录成功后没有保存 Token

- **文件**：`pages/mine/mine.uvue:105-118`
- **现象**：`setToken(...)` 被注释，登录成功后直接 `reLaunch`。
- **影响**：登录成功但后续页面仍被视为未登录。
- **建议**：统一调用登录成功处理函数，原子保存 access token、refresh token 和用户信息，并验证存储结果。

#### P1-2 H5 卡片首页没有加载卡片数据

- **文件**：`pages/card/card.uvue:295-319`
- **现象**：`platform()` 只处理微信分支，没有 H5/其他平台分支。
- **影响**：H5 卡片首页可能始终显示空数据。
- **建议**：明确 H5 是登录模式还是游客模式，补齐数据加载或调整 H5 默认入口。

#### P1-3 支付场景值存在数字/字符串混用

- **文件**：`pages/recharge/recharge.uvue:750-776`、`pages/orderDetail/orderDetail.uvue:579-601`
- **现象**：同一类 `scene` 有数字比较和字符串比较。
- **影响**：从收银台小程序返回时，成功、取消、失败分支可能不执行。
- **建议**：统一 `const scene = Number(options.scene)`，并完整校验 `referrerInfo`、`extraData`。

#### P1-4 支付状态不能在所有终态收敛

- **文件**：`pages/orderDetail/orderDetail.uvue:383-394、616-634`
- **现象**：未知支付状态分支没有统一清理 `isInPaymentProcess`。
- **影响**：页面可能一直处于支付中，后续 `onShow` 重复处理旧回调。
- **建议**：success/cancel/fail/unknown/缺少回调数据统一执行状态清理；超时改为查询订单状态，不直接重复支付。

#### P1-5 支付失败页是静态占位页

- **文件**：`pages/payFailed/payFailed.uvue:14-60、72-99`
- **现象**：页面展示固定订单、卡号、套餐数据，重试和返回按钮只打印日志。
- **影响**：用户看到虚假信息，无法重试或返回真实业务页面。
- **建议**：传递真实订单参数；重试进入统一订单支付流程；失败页查询真实订单状态；删除测试数据。

#### P1-6 订单详情和充值页复制了两套支付实现

- **文件**：`pages/recharge/recharge.uvue:397-500`、`pages/orderDetail/orderDetail.uvue:305-397`
- **现象**：两处分别实现微信支付、通联支付、H5 支付和回调处理。
- **影响**：平台 API、异常处理、状态清理和成功页跳转已经出现差异，修复容易遗漏。
- **建议**：建立统一支付服务/业务 composable，统一参数校验、平台适配、回调状态、订单状态查询和错误处理。

#### P1-7 H5 支付缺少完整回跳与订单确认机制

- **文件**：`pages/recharge/recharge.uvue:553-563`、`pages/orderDetail/orderDetail.uvue:419-429`
- **现象**：使用 `window.location.href` 或表单跳转，但没有统一的返回恢复和订单状态确认。
- **影响**：支付完成后可能无法确认结果，支付成功和页面状态不一致。
- **建议**：以订单号为核心保存支付上下文，回到页面后查询订单状态，再进入成功/失败/待确认状态。

#### P1-8 反馈接口和上传接口的 Token 策略需要确认

- **文件**：`api/http.uts:351-400`、`pages/questionFeedback/submit.uvue:119-126`、`pages/questionFeedback/detail.uvue:248-255`
- **现象**：反馈列表、详情、提交、回复、关闭及图片上传存在 `withToken: false`。
- **影响**：如果后端没有额外的归属校验，可能产生反馈越权读取、回复、关闭或上传滥用。
- **建议**：默认携带 Token；后端校验用户与反馈/订单归属；游客模式必须使用短期最小权限凭证，而不是完全匿名。

#### P1-9 任意绝对 URL 可能携带 Token

- **文件**：`api/Request.uts:82-86、255-263`；`api/Upload.uts:37-43、121-126`
- **现象**：绝对 URL 不做可信域名校验，`withToken: true` 时直接添加 Authorization。
- **影响**：配置或外部数据被污染时，Token 可能发送到第三方域名。
- **建议**：建立 HTTPS/域名白名单；外部 URL 默认不带 Token；上传目标同样校验。

#### P1-10 请求响应缺少严格 HTTP 状态与业务结构校验

- **文件**：`api/Request.uts:272-313`、`api/Upload.uts:141-166`
- **现象**：未先检查 HTTP 状态；缺少 `code` 时可能默认为成功；上传解析规则又不一致。
- **影响**：网关 HTML、空响应、HTTP 500 或异常响应可能被误判为成功。
- **建议**：先校验 2xx，再校验响应对象和明确业务码；普通请求和上传统一错误模型。

#### P1-11 下单与支付缺少幂等控制

- **文件**：`api/http.uts:220-243、279-300`；`api/Request.uts:29-61`
- **现象**：没有幂等键、请求去重、进行中锁和超时状态查询策略。
- **影响**：快速点击、网络超时、页面重复进入时可能重复下单或支付。
- **建议**：服务端以 `clientRequestId`/订单号实现幂等；客户端阻止并发；超时先查询订单，不自动重试支付。

## 5. P2/P3 问题清单

### 5.1 数据与空值安全

1. `pages/cardDetail/cardDetail.uvue:91-96`：`order.orderNo.toString()` 未保护，空订单号点击会崩溃。
2. `pages/recharge/recharge.uvue:513-543`：提交支付时 `currentItem`、`cardDetail.value` 可能为空，应在创建订单前校验。
3. `pages/questionFeedback/detail.uvue:44-52、188-190`：`imgOssUrl` 为 null 时直接 `.split(',')`。
4. `pages/questionFeedback/list.uvue:107-110`、`detail.uvue:322-325`：必要路由参数为空仍继续请求。
5. `pages/paySuccess/paySuccess.uvue:106-121`：接口查询失败或参数缺失时仍固定显示“支付成功”。
6. 多个页面用 `v-if="金额"` 判断金额，0 元订单会被隐藏；建议改为 `!= null`。
7. `pages/myPkg/myPkg.uvue:47-60`：流量单位硬编码为 GB，与其他页面的 `DataFormat` 口径不一致。

### 5.2 请求、认证与配置

1. `api/Request.uts:247-253`：`RequestOptions.header` 被解构但没有合并到实际请求头。
2. `api/Request.uts:257-261` 与 `api/Upload.uts:121-126`：普通请求使用 `Bearer `，上传请求直接发送 Token，格式不一致。
3. `api/Request.uts:316-336`：401/403 自动处理只在微信端生效，H5/App 可能保留失效登录态。
4. `api/http.uts:38-49`：登录接口默认携带旧 Token，且登录响应没有统一保存逻辑。
5. `api/http.uts:52-67`：函数接收的 `tenantId` 没有真正参与请求，实际使用全局配置。
6. `api/http.uts` 多处直接拼接 URL 路径参数，应做格式校验和编码。
7. `api/Storage.uts`、`common/config.uts`：Token 和用户信息同步明文存储，缺少过期、刷新和存储失败处理。
8. `utils/inject-m-unix.uts:5-22`：只注入部分配置，可能造成 `common/config` 与 `ProjectConfig` 的配置分裂。
9. `manifest.json:13-16`：`urlCheck: false` 适合开发，生产发布前应确认是否恢复严格域名校验。
10. `manifest.json:44-63`：Android/iOS 图标和启动图等发布配置基本为空。

### 5.3 生命周期、性能与维护性

1. `pages/myOrder/myOrder.uvue:347-353`：`onShow` 无条件清空搜索和 Tab 状态，并重复加载列表。
2. `pages/scanCode/scanCode.uvue:66-91、96-120、274-285`：延迟扫码定时器没有在销毁时清理。
3. `api/Request.uts`、`api/Upload.uts`：各请求直接控制全局 loading，并发请求可能互相隐藏 loading。
4. 页面请求没有统一取消、in-flight 去重和超时后的业务状态确认。
5. `myOrder`、`orderRecord` 的订单逻辑重复且行为不一致；建议统一进入 `orderDetail`。
6. 充值页和订单详情页支付逻辑重复，应抽象为统一支付模块。
7. 多处使用 `v-if="false"` 隐藏投诉、绑定、常见问题等功能，应改成配置开关或删除死代码。
8. 卡片和订单列表多处使用 `index` 作为 key，应使用 `rechargeNo`、`orderNo` 等稳定主键。
9. `components/progress.uvue` 在 `max=0` 时可能生成 `NaN%`，且 `label` 属性未渲染；当前页面实际使用第三方 `rice-progress`，需明确两套组件职责。
10. `components/selectCountry.uvue`：搜索关键字未 trim；关闭弹窗后父页面未调用 `resetSearch`；国家值存在字符串/数字比较不一致。
11. `components/customService/customService.uvue` 与 `recharge`：只有 `serviceJumpUrl` 存在时才显示客服按钮，二维码/电话备用分支不可达；`window.open` 应加 H5 条件编译。
12. `components/topNavBar/topNavBar.uvue`：APP 状态栏高度仍使用默认值，Android 内联 `position: fixed` 与平台 CSS 可能冲突。
13. `components/payment.uvue`：异步支付方式加载后默认选中项不一定同步；未知支付类型引用的 `/static/default-pay.png` 当前不存在；按钮同时使用 `gap` 与 margin，间距可能重复。
14. `uni.scss` 已定义颜色和尺寸变量，但公共组件大量硬编码颜色，建议建立统一主题变量。

## 6. 推荐修复路线

### Wave 1：阻断问题和支付安全（优先）

目标：让核心页面能够稳定编译、登录、下单和支付失败可控。

1. 修复 `err`、Composition API 缺少导入等直接错误。
2. 修复 `orderDetail.getCode()` 的 Promise 返回值。
3. 恢复登录成功后的 Token 保存，统一登录响应归一化。
4. 在支付确认、订单详情、支付结果页增加参数和空值保护。
5. 统一 `scene` 类型转换和所有支付终态清理。
6. 移除支付失败页静态测试数据，接入真实订单参数。
7. 增加下单/支付按钮防重复提交；与后端确认幂等键和订单状态查询。

**验收：**

- 微信登录后重新进入卡片、订单页面仍保持登录。
- 套餐/支付方式尚未加载完成时不能创建空订单。
- 支付成功、取消、失败、未知状态都能回到明确页面状态。
- 网络超时不会自动重复扣款，重新操作前先查询订单状态。

### Wave 2：鉴权、接口响应和跨端策略

1. 统一 Request/Upload 的 Token 来源、Header 格式和错误模型。
2. 禁止任意绝对 URL 携带 Token，加入 HTTPS/域名白名单。
3. 检查 HTTP 状态码、响应结构和业务码，禁止缺少 `code` 默认成功。
4. 确认订单、支付、反馈接口的游客模式与用户归属校验。
5. 明确微信、H5、Android、iOS、Harmony 的真实交付矩阵。
6. 修复 `pages/card/card`、TabBar、首屏和页面条件编译的一致性。
7. 微信端统一原生导航或自定义导航，禁止两套导航叠加。

**验收：**

- 任意接口不会把 Token 发往非白名单域名。
- 未授权、过期 Token 在各平台都能统一清理并进入登录流程。
- 各目标平台的 TabBar 页面均存在，首屏符合产品约定。
- 页面导航栏在外部小程序进入、返回和连续跳转后高度一致。

### Wave 3：数据质量、性能和组件治理

1. 将订单、支付、卡片、反馈响应从 `any` 收敛为明确类型。
2. 统一金额、流量、状态和日期格式化工具。
3. 增加请求取消、in-flight 去重、页面销毁保护和 loading 引用计数。
4. 合并订单页面和支付流程重复逻辑。
5. 修复扫码定时器、反馈图片、空参数、列表 key 等问题。
6. 统一公共颜色、间距、圆角和安全区变量。
7. 明确自有公共组件与 `rice-ui` 组件的职责，删除不再使用的组件或补齐测试。

### Wave 4：发布和工程化

1. 补充 `README.md`：安装、开发、环境切换、微信构建、H5 构建、App 发布、真机调试。
2. 补齐 Android/iOS 图标、启动图、版本号和发布配置。
3. 统一 `manifest.json` 与 `common/config.uts` 的版本号，清理 `your-app-id` 占位值。
4. 生产构建开启 URL 校验并验证合法域名配置。
5. 增加最小自动化验证：类型/编译、路由检查、接口响应检查、核心业务回归。

## 7. 建议的回归测试矩阵

| 场景 | 微信小程序 | H5 | App/其他平台 | 关键断言 |
|---|---:|---:|---:|---|
| 登录成功并持久化 Token | 必测 | 按产品定义 | 按产品定义 | 重启/返回后仍是登录态 |
| 卡片列表加载 | 必测 | 必测 | 若支持则必测 | 空、成功、网络失败三态正确 |
| 卡片详情空字段 | 必测 | 必测 | 若支持则必测 | 不因订单号/图片/流量为空崩溃 |
| 创建订单重复点击 | 必测 | 必测 | 必测 | 只产生一个有效订单 |
| 支付成功 | 必测 | 必测 | 按产品定义 | 订单状态和页面状态一致 |
| 支付取消/失败/超时 | 必测 | 必测 | 必测 | Loading、支付锁、页面状态全部清理 |
| 外部收银台回跳 | 必测 | 必测 | 按产品定义 | `scene`、回调参数和订单查询正确 |
| 反馈列表/详情鉴权 | 必测 | 必测 | 若支持则必测 | 只能访问当前用户允许的数据 |
| 图片上传失败 | 必测 | 必测 | 若支持则必测 | HTTP 错误不会被当成上传成功 |
| 从外部小程序进入充值页再跳转 | 必测 | 不适用 | 不适用 | 导航标题完整、无双导航、返回链路正常 |
| 小屏/刘海屏/横屏 | 必测 | 必测 | 必测 | 状态栏、悬浮按钮、弹窗不遮挡 |

## 8. 建议建立的工程规则

1. **页面导航规则**：微信端页面必须明确 `navigationStyle`，一个页面只允许原生导航或自定义导航之一。
2. **支付规则**：所有支付入口走同一支付服务；支付 POST 不自动重试；超时先查订单。
3. **鉴权规则**：Token 只能由统一认证模块读取和写入；所有外部 URL 默认不携带 Token。
4. **响应规则**：HTTP 状态、业务码、响应结构三层校验；禁止“缺少 code 默认成功”。
5. **空值规则**：后端可选字段进入页面状态前先归一化；模板不直接调用可能为空的 `.toString()`、`.split()`。
6. **列表规则**：使用稳定业务 ID 作为 key，不使用 index 作为长期列表 key。
7. **平台规则**：浏览器 `window`/DOM、微信 `wx` API、App API 必须使用条件编译或统一平台适配层隔离。
8. **配置规则**：环境、API、租户、客户端和 AppID 必须成组管理，禁止页面内硬编码。
9. **日志规则**：生产日志不得输出 Token、完整用户信息、支付凭证或敏感请求头。
10. **验证规则**：每次跨端修改至少验证目标平台的编译、页面启动和一条核心业务链路。

## 9. 本轮结论

### 当前可以保留

- 使用 uni-app x + Vue 3 + UTS/uvue 的总体技术方向。
- 业务页面按功能拆分的目录结构。
- `api/`、`utils/`、`components/` 的基本分层。
- 通过条件编译处理平台差异的方向，但需要统一和收敛。

### 当前不建议继续扩大

- 在未统一支付实现前新增更多支付渠道。
- 在未确认平台矩阵前继续增加 App/其他小程序专用页面。
- 在鉴权边界未明确前继续开放匿名订单/反馈接口。
- 在类型和响应校验未完善前继续使用 `any` 扩展支付数据。

### 首个建议执行批次

如果开始实际修改，建议只处理以下 5 个小目标，完成验证后再进入下一批：

1. 修复直接编译/运行错误：`err`、`ref`、`computed`、`getCode()`。
2. 修复登录 Token 保存。
3. 修复充值和订单详情的支付状态收敛与 `scene` 类型。
4. 修复支付失败页真实数据和按钮行为。
5. 对订单/支付/反馈接口确认 Token 与归属校验，并补上客户端最小防重复提交。

本文件是审查和改进建议，不代表所有问题都已在真实设备上复现；涉及后端鉴权、支付回调和发布配置的结论，必须结合后端契约、微信开发者工具、H5 浏览器和目标真机进行最终验证。

## 10. 修复进展

### 已完成

**导航（第一批）**

- 微信端 `pages/myPkg/myPkg`、`pages/orderRecord/orderRecord` 统一为原生导航，并在模板中排除自定义 `topNavBar`，修复标题被压缩问题。
- `pages/recharge/recharge` 模板修复 `cardDetail.value?.xxx` 的 ref 误用（首次渲染 `null.value` 报错）。

**登录（第二批）**

- 确认接口约定：`wxGetPhoneLogin` `'1'` = 免手机号（openid 静默登录），`'0'` = 需要授权手机号。
- 新增 `setWxGetPhoneLogin()` / `isPhoneLoginRequired()`，作为该开关唯一读写口径；非 `'0'` 一律按免手机号兜底，修复"配置异常导致偶发跳转手机号授权页"。
- `card`、`mine`、`recharge`、`orderDetail` 四个入口统一按该判定走分支，并给 `getTenantInfos` 加 `try/catch`（失败沿用缓存）。
- 修复 `mine` 页静默登录未保存 Token、`card` 页缺少"需要手机号"分支、已登录仍显示不出"退出登录"按钮等问题。
- `login` 页固定提交 `isLogin: '0'`，不再把开关原始值透传后端。

**支付（第三批）**

- `orderDetail` 支付异常分支的未定义变量 `err.msg` 已改为 `error` 并加兜底文案。
- 收银台返回回调 `scene` 统一按数字比较（原 `== '1038'` 与 number 恒不相等，导致成功/取消/失败分支永不执行），并补 `referrerInfo` 空值保护。
- 支付终态统一收尾：`orderDetail` 失败分支补齐 `isInPaymentProcess` 重置；两页新增 `handlePayFailed()`，`toPay` 增加未知 `payWxType` 兜底，杜绝 loading 卡死与标记残留。
- 跳转收银台统一为 `uni.navigateToMiniProgram`；下单前补齐卡片详情、套餐、支付方式、订单号校验。
- `payment` 组件新增 `effectiveMethodId`，支付方式异步加载后自动回落到有效选中项；未知支付类型不再引用不存在的 `/static/default-pay.png`。

**支付结果页与请求层（第四批）**

- `paySuccess`：状态改为由订单查询结果驱动（确认中 / 已确认 / 待确认），增加「重新查询支付结果」入口，查询失败不再直接显示成功；补齐订单号、卡号缺失保护。
- `payFailed`：移除全部写死的假订单数据，改为按路由参数渲染，仅展示实际传入的字段；「重新支付」跳转订单详情、「返回卡片详情」跳转卡片详情。
- `Request`：`RequestOptions.header` 真正生效（认证字段由请求层统一生成，禁止调用方覆盖）；新增 HTTP 状态码与响应结构校验；缺少业务码不再默认成功；新增受信任域名判断，绝对 URL 非受信域名不携带 Token。
- `Request`：未授权（401/403）处理扩展为全平台——所有平台统一清理失效登录态，仅微信端跳转登录页。
- `Upload`：不再污染调用方 header 对象；补齐 HTTP 状态码校验；业务码比较与 Request 统一（兼容字符串码）；同样限制 Token 只发往受信任域名。
- 新增共享工具 `getUrlOrigin` / `isTrustedApiUrl`（`api/ProjectConfig.uts`），供 Request 与 Upload 复用，避免循环依赖。
- `recharge` / `orderDetail`：下单与支付增加请求锁，防止快速重复触发产生重复订单/重复支付请求。
- 反馈列表/详情：缺少 `rechargeNo`、`feedbackId` 时不再发起请求；`imgOssUrl` 为空时不再抛异常。

### 待处理

1. **需要后端确认后才能改**：
   - `Upload` 的 `Authorization` 目前是裸 Token，`Request` 是 `Bearer <token>`，两者是否应统一；
   - H5 订单/支付/反馈接口的 `withToken: false` 是既有「游客模式」设计，是否要改为携带登录态。
2. 服务端幂等键（`clientRequestId`）与支付超时后的订单状态查询策略。
3. `payFailed` 当前**没有任何页面跳转过来**（全仓无引用），要么接入失败流程，要么确认删除。
4. H5 支付返回后的落地页需要确认（现由 `paySuccess` 按订单号查询兜底）。
5. 页面数据层空值归一化、列表 key、重复订单逻辑合并等 P2/P3 项。

### 验证口径

- 静态检查：改动文件 IDE 诊断均为 0。
- 尚未在微信开发者工具与真机上执行端到端验证，第三批支付改动必须按第 7 节回归矩阵实测「支付成功 / 取消 / 失败 / 跳收银台返回」四条路径。
