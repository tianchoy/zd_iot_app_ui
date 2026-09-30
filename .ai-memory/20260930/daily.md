# 2026-09-30

## [合并] - 拉取远端 + 解决冲突（最终口径：冲突处远端赢，非冲突处保留本地）

- **远端提交**: 9d63024 "feat:修复支付与配置代理商配置及租户配置"（24c9c2d -> 9d63024，fast-forward）。
- **方式**: 备份 -> git stash -> git pull --ff-only -> git stash pop -> 解决 3 个冲突文件 -> git add -> git reset 还原未暂存状态。

### 关键判断：冲突要按"逻辑单元"算，不能只看 git 标记的行范围

同一个手机号登录开关，两边各改了一半：
- 远端 `mine` / `orderDetail`: 把 `wxGetPhoneLogin` 页内 ref 传进 `getCode`，并在静默登录成功后补 `setToken`；
- 本地: 改成读 storage 的 `isPhoneLoginRequired()`（带异常兜底）。
git 只标出了文本重叠处（getCode / 参数段），但 ref 的声明与赋值、`handleLogin`、`platform`、`userLoginByOpenid` 都是同一个逻辑单元。若只按标记行还原，会出现"远端 getCode 读 ref、本地 getTenantInfos 写 storage"的断裂，静默登录永远拿不到开关值。因此这些文件的登录单元整体采用远端版本。

### 各文件最终处理

1. `pages/mine/mine.uvue`: 整体还原为远端（登录逻辑、品牌/备案、样式），仅保留 2 处本地非冲突改动 —— 模板 `v-else`（已登录即显示退出登录）；因模板不再用 `getStorageSync`，同步从导入中移除该符号。
2. `pages/orderDetail/orderDetail.uvue`: 还原为远端（含其带契约注释的 `getCode` 与重构后的 `platform`），重新贴回本地 3 处非冲突改动 —— `toPay`（含 `handlePayFailed` 终态收尾/未知支付兜底/统一 `uni.navigateToMiniProgram`）、`handleConfirmPayment`（`err.msg` 未定义修复、类型对齐、校验、loading、`isPaying` 防重复）、`onShow`（`scene` 数字比较、`referrerInfo` 空值保护、失败分支重置标记）。
3. `pages/recharge/recharge.uvue`: 远端未改其登录块，故本地登录块整体保留；仅把**冲突的下单参数段**还原为远端实现（`appId` 上报 + 原参数结构）；本地其余改动（守卫、`toPay`、`onShow`、防重复提交）全部保留。

### 踩坑

- 还原远端后重贴 `onShow` 时，又出现"原 `if (...) {` 的闭合括号多余"（与 09-24 同一类错误）→ 已删除多余 `}`。`onShow` 内 `extraData` 分支缩进比理想多一级（仅观感）。
- IDE 诊断对 `.uvue` 结构错误不可靠，仍靠脚本自检 + 真实编译兜底。

### 验证

- 16 个相关文件：脚本区花括号平衡（depth=0/min=0）、无冲突标记残留；IDE 诊断 0。
- `wxGetPhoneLogin` 声明在 `mine` / `orderDetail` 均存在；`isPhoneLoginRequired` / `setWxGetPhoneLogin` 由 `card` / `recharge` 使用，定义在 `common/config.uts`。
- 最终本地相对远端：14 文件、+740 / -313（原为 +916 / -443）。

### 遗留（需单独一次改动处理，不混在合并里）

- 登录开关出现两种读法并存：`card` / `recharge` 用 storage + 兜底（`isPhoneLoginRequired`），`mine` / `orderDetail` 用页内 ref（`wxGetPhoneLogin.value == '1'`）。后者的"配置异常即判定为需要手机号"正是最初要修的偶发误跳问题，建议后续统一。
- 远端 `orderDetail.platform()` 在"需要手机号"场景会先弹一次「登录失败，请重试」再跳登录页（远程自身逻辑，未改动）。
- stash@{0} `wip-local-before-pull-20260930` 与 `/tmp/zd_backup`、`/tmp/zd_backup_postmerge` 仍保留为兜底。

## [导航] - 微信端全量改用原生标题栏，H5 保持自定义导航

- **需求**: 微信小程序端页面均使用 navigationBarTitleText，H5 端继续使用项目自定义 topNavBar。
- **pages.json**: 重构 pages 数组为「MP 块 + #ifndef MP-WEIXIN 块」，两端各注册一份（各 19 条，无重复，页面集合一致）。MP 侧 16 个页面设 navigationStyle=default 并给出标题。
- **模板**: 16 个页面的 topNavBar 全部用 #ifndef MP-WEIXIN 包住（recharge/myPkg/orderRecord 之前已改）。
- **配套**:
  1. 动态标题：cardDetail 用卡号、login 用后台品牌名，MP 端通过 uni.setNavigationBarTitle 同步；
  2. cardDetail 的固定 tab 原按 状态栏+导航栏 高度定位，MP 端改为 top:0（否则原生导航下会留空档）；
  3. 反馈入口：MP 原生导航放不下自定义右侧按钮，原 myOrder / orderRecord / submit 的「我的反馈」会消失，改在「我的」页新增页面内入口（复用现有 item 样式，仅 MP 显示）；
  4. 回滚此前给反馈列表页加的「缺 rechargeNo 即拦截」——该入口本就不带卡号，拦截会让入口直接失效。
- **有意保留自定义导航**: scanCode（全屏扫码，加原生栏会压住扫码框）、rice-ui 两个内部页面。
- **固有限制（不可规避）**: 原生标题栏无法隐藏返回按钮，原 show-back=false 的页面（login / paySuccess / payFailed / h5Search / card / mine）在 MP 有页面栈时会显示系统返回箭头。
- **验证**: 两端注册唯一/无重复/集合一致；16 页面守卫覆盖 0 遗漏；30 个文件结构平衡；IDE 诊断 0。未做真机验证。
