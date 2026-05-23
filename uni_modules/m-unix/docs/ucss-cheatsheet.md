# uni-app x（uvue / ucss）样式兼容速查

> 面向 **App 端原生渲染** 与 **ucss 子集**；具体以 [uni-app x 官方文档](https://doc.dcloud.net.cn/uni-app-x/) 为准，各端可能有差异。  
> 本库全局样式入口：`index.scss` → `libs/css/common.scss`（含 **mixin**）、`m.scss`、`animate.scss` 等。

---

## 一句话

**Flex 为主 + 尽量只用 class + 尺寸用 px/rpx + 动效用 transition；勿用 gap、Grid、常规块级、复杂选择器与大量 CSS3。**

---

## 一、布局与显示（常见不支持）

| 类别 | 不支持 / 慎用 | 说明 |
|------|----------------|------|
| Flex | `gap`、`row-gap`、`column-gap` | 用子元素 margin，或本库 `libs/css/mixins.scss` 中 `m-flex-gap-row` / `column` / `wrap` |
| Flex | `place-content`、`place-items`、`place-self` | 用 `justify-content`、`align-items`、`align-self` 单独写 |
| display | `block`、`inline`、`inline-block`、`table`、`grid`、`contents` | **仅 flex、none** 等为主；页面根节点多为 view。 |
| 传统 | 标准文档流、float、clear、columns、**Grid 全部** | 用 flex 嵌套实现 |

---

## 二、选择器（严格）

| 支持 | 不支持 |
|------|--------|
| **class**（`.foo`） | 标签、`#id`、属性、`*` |
| 部分组合（如 `> *`、`:last-child`）因端而异，**以真机为准** | 多数伪类/伪元素（`:hover` 等）、`::before`/`::after` 等 |

**建议**：组件内样式以 **单 class + BEM 式子类** 为主，避免依赖复杂选择器。

---

## 三、尺寸与单位

| 可用 | 慎用 / 不支持 |
|------|----------------|
| **px**、**rpx** | `em`、`rem`、**%**（宽高与部分边距） |
| `width`/`height` 数字 + rpx | `aspect-ratio`、`object-fit`/`object-position`（视端而定） |

---

## 四、盒模型与背景 / 视觉

| 常见限制 |
|----------|
| `background-*` 细分、`background-position`、`-size` 等**可能不全** |
| `outline`、`filter`、`backdrop-filter` 等 |
| `filter`、`box-shadow` 等以官方列表为准 |

---

## 五、文本

| 常见限制 |
|----------|
| `text-transform`、`text-indent`、`line-clamp`（多行省略）**可能不可用** |
| `word-break`、`white-space` **部分端** |

**单行省略**：可用 `overflow: hidden` + `text-overflow: ellipsis` + `white-space: nowrap`（本库 `common.scss` 有 `.ellipsis`）。  
**多行省略**：若端不支持，用 `line-height` 固定行数 + `overflow: hidden` 或业务侧截断文案。

---

## 六、动画

| 支持 | 不支持 |
|------|--------|
| **transition** | **@keyframes**、**animation**（本库动画类见 `libs/css/animate.scss`，用 transition + class 切换） |

---

## 七、其他

| 项目 | 说明 |
|------|------|
| CSS 变量 `--x` / `var()` | **不支持** |
| `@media` | **不支持**（响应式用 rpx、脚本或条件编译） |
| 样式继承 | **弱**；子节点需显式写 class |
| `!important` | 部分平台无效 |
| `z-index` | 与 Web 表现可能不一致 |

---

## 八、替代写法速查

### 1. gap（横向）

```scss
/* ❌ */
.row { display: flex; gap: 20rpx; }

/* ✅ 单行 */
.row { display: flex; flex-direction: row; }
.row > * + * { margin-left: 20rpx; }
/* 或本库：@include m-flex-gap-row(20rpx); 见 mixins.scss */
```

### 2. gap（纵向）

```scss
.col { display: flex; flex-direction: column; }
.col > * + * { margin-top: 20rpx; }
/* 或 @include m-flex-gap-column(20rpx); */
```

### 3. flex-wrap 多行（等价 gap）

父级 `margin: -8rpx -8rpx 0 0`，子级 `margin: 8rpx 8rpx 0 0`（`gap` 为 16rpx 时）；或 `@include m-flex-gap-wrap(8rpx);`

### 4. 水平垂直居中

```scss
.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
```

### 5. 单行省略

```scss
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

本库 `common.scss` 已提供 `.ellipsis` 工具类。

---

## 九、与本库的关系

- **m-unix 组件** 样式写在 `scoped` 与 `libs/css` 下，已按 ucss 子集裁剪；新增组件请对照本表。  
- 占位间距请用 **`<m-gap>`** 组件或 margin，**不要**用 CSS `gap`。  
- 若官方后续更新支持列表，以 **DCloud 文档** 为准，并同步修订本文件。

---

*整理日期：2026-03-27（App 端原生渲染视角）；欢迎随官方更新修订。*
