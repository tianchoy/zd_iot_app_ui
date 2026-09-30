
## [审查] - 文档生成: 完成项目全量代码审查与优化建议文档

- **文件**: PROJECT_AUDIT.md
- **决策**: 先处理 P0/P1 编译、登录、支付、鉴权和跨端配置问题，再推进重构与工程化。
- **验证**: 已审阅入口、配置、页面、组件、接口和工具；文档 382 行；文档诊断 0。

## [修复] - Bug 修复: 统一微信手机号登录开关（wxGetPhoneLogin）判定与兜底

- **文件**: common/config.uts, pages/card/card.uvue, pages/mine/mine.uvue, pages/recharge/recharge.uvue, pages/orderDetail/orderDetail.uvue, pages/login/login.uvue
- **决策**: 约定 1=免手机号(静默)、0=需要手机号；新增 setWxGetPhoneLogin/isPhoneLoginRequired 单一口径，非 0 一律按免手机号兜底，避免配置异常时误跳授权页；登录页固定提交 isLogin=0。
- **验证**: read_lints 0 诊断；全仓已无 wxGetPhoneLogin.value 页内 ref 判断。

## [修复] - Bug 修复: 支付链路确定缺陷（scene 类型/err 未定义/状态残留/兜底）

- **文件**: pages/recharge/recharge.uvue, pages/orderDetail/orderDetail.uvue, components/payment.uvue, PROJECT_AUDIT.md
- **决策**: scene 统一 Number() 比较；新增 handlePayFailed 统一收尾 loading 与 isInPaymentProcess；toPay 补未知类型兜底并统一 uni.navigateToMiniProgram；下单前校验卡片/套餐/支付方式；payment 用 effectiveMethodId 兜底选中项。
- **验证**: read_lints 0 诊断；已无 err.msg / scene == 1038 / wx.navigateToMiniProgram / default-pay.png 残留；未做真机端到端验证。

## [修复] - Bug 修复: 支付结果页、请求层统一、反馈空参与防重复提交

- **文件**: api/Request.uts, api/Upload.uts, api/ProjectConfig.uts, pages/paySuccess/paySuccess.uvue, pages/payFailed/payFailed.uvue, pages/recharge/recharge.uvue, pages/orderDetail/orderDetail.uvue, pages/questionFeedback/list.uvue, pages/questionFeedback/detail.uvue, PROJECT_AUDIT.md
- **决策**: Request 校验 HTTP 状态与响应结构、缺业务码不再默认成功、header 合并生效、Token 仅发往受信任域名；Upload 不污染调用方 header；401/403 全平台清理登录态；paySuccess 以订单查询结果驱动状态；payFailed 去假数据并按参数渲染；下单/支付加请求锁。
- **未改（需后端确认）**: Upload 的 Authorization 是否加 Bearer 前缀；H5 订单/支付/反馈接口 withToken:false 的游客模式设计。
- **验证**: read_lints 0 诊断；未做真机端到端验证。

## [暂停] - 用户要求暂停后续修改

- **已交付**: 4 批修复（导航 / 登录开关 / 支付链路 / 支付结果页与请求层），共 14 个文件。
- **验证状态**: IDE 诊断全 0；尚未做微信开发者工具与真机端到端验证。
- **挂起项（需决策，未动）**:
  1. 待修回归: orderRecord 微信端「我的反馈」入口丢失（因第七批导航改为原生导航）。
  2. payFailed 接入方式待定（A: paySuccess 按订单状态分流——推荐；C: 支付结果未知场景；B: requestPayment 失败跳页，不推荐）。
  3. myOrder / orderRecord / cardDetail 三份订单逻辑：状态字典、rows/data 两套解析、H5 去支付死按钮、onShow 重置上下文、订单号空值。1/3/5 为纯收益，2/4/6 需产品口径。
  4. 后端契约 2 项（Upload Authorization 格式、H5 withToken 游客模式）——已确认先不动。
  5. P2/P3 余项: 列表 key、金额 v-if 空值归一化、loading 引用计数。

## [修复] - Bug 修复: 修复 onShow 结构改写残留的多余闭合花括号（编译报错）

- **文件**: pages/recharge/recharge.uvue, pages/orderDetail/orderDetail.uvue
- **根因**: 把 `if (scene==1038 && ...) {` 改为提前 return 时，只替换了开括号段，原 if 块的闭合 `}` 未删除，导致 "Unexpected token, expected \",\" (904:1)"。
- **教训**: read_lints 在 .uvue 上不会暴露 vue/compiler-sfc 的解析错误（本次误判为 0 诊断）；改动条件结构后必须用真实编译或脚本自检兜底，不能只信 IDE 诊断。
- **验证**: 自检脚本扫描全部 17 个改动文件，脚本区花括号 depth=0 / min=0，全部 OK；已删除临时脚本。
