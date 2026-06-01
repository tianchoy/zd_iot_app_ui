"use strict";
const common_vendor = require("../../../../common/vendor.js");
function getIconChar(name) {
  if (name === "print")
    return "";
  if (name === "mobile-phone")
    return "";
  if (name === "minus")
    return "";
  if (name === "navigation")
    return "";
  if (name === "pdf")
    return "";
  if (name === "prompt")
    return "";
  if (name === "move")
    return "";
  if (name === "refresh")
    return "";
  if (name === "run-up")
    return "";
  if (name === "picture" || name === "photo")
    return "";
  if (name === "run-in")
    return "";
  if (name === "pin")
    return "";
  if (name === "save")
    return "";
  if (name === "search")
    return "";
  if (name === "share")
    return "";
  if (name === "scanning")
    return "";
  if (name === "security")
    return "";
  if (name === "sign-out")
    return "";
  if (name === "select")
    return "";
  if (name === "stop")
    return "";
  if (name === "success")
    return "";
  if (name === "smile")
    return "";
  if (name === "switch")
    return "";
  if (name === "setting")
    return "";
  if (name === "survey")
    return "";
  if (name === "task")
    return "";
  if (name === "skip")
    return "";
  if (name === "text")
    return "";
  if (name === "time")
    return "";
  if (name === "telephone-out")
    return "";
  if (name === "toggle-left")
    return "";
  if (name === "toggle-right")
    return "";
  if (name === "telephone" || name === "phone")
    return "";
  if (name === "top")
    return "";
  if (name === "unlock")
    return "";
  if (name === "user" || name === "person")
    return "";
  if (name === "upload")
    return "";
  if (name === "work")
    return "";
  if (name === "training")
    return "";
  if (name === "warning")
    return "";
  if (name === "zoom-in")
    return "";
  if (name === "zoom-out")
    return "";
  if (name === "add-bold")
    return "";
  if (name === "arrow-left-bold")
    return "";
  if (name === "arrow-up-bold")
    return "";
  if (name === "close-bold")
    return "";
  if (name === "arrow-down-bold")
    return "";
  if (name === "minus-bold")
    return "";
  if (name === "arrow-right-bold")
    return "";
  if (name === "select-bold")
    return "";
  if (name === "arrow-up-filling")
    return "";
  if (name === "arrow-down-filling")
    return "";
  if (name === "arrow-left-filling")
    return "";
  if (name === "arrow-right-filling")
    return "";
  if (name === "caps-unlock-filling")
    return "";
  if (name === "comment-filling")
    return "";
  if (name === "check-item-filling")
    return "";
  if (name === "clock-filling")
    return "";
  if (name === "delete-filling")
    return "";
  if (name === "decline-filling")
    return "";
  if (name === "dynamic-filling")
    return "";
  if (name === "intermediate-filling")
    return "";
  if (name === "favorite-filling")
    return "";
  if (name === "layout-filling")
    return "";
  if (name === "help-filling")
    return "";
  if (name === "history-filling")
    return "";
  if (name === "filter-filling")
    return "";
  if (name === "file-common-filling")
    return "";
  if (name === "news-filling")
    return "";
  if (name === "edit-filling")
    return "";
  if (name === "fullscreen-expand-filling")
    return "";
  if (name === "smile-filling")
    return "";
  if (name === "rise-filling")
    return "";
  if (name === "picture-filling")
    return "";
  if (name === "notification-filling")
    return "";
  if (name === "user-filling")
    return "";
  if (name === "setting-filling")
    return "";
  if (name === "switch-filling")
    return "";
  if (name === "work-filling")
    return "";
  if (name === "task-filling")
    return "";
  if (name === "success-filling")
    return "";
  if (name === "warning-filling")
    return "";
  if (name === "folder-filling")
    return "";
  if (name === "map-filling")
    return "";
  if (name === "prompt-filling")
    return "";
  if (name === "meh-filling")
    return "";
  if (name === "cry-filling")
    return "";
  if (name === "top-filling")
    return "";
  if (name === "home-filling")
    return "";
  if (name === "sorting")
    return "";
  if (name === "column-3" || name === "category")
    return "";
  if (name === "column-4")
    return "";
  if (name === "column-vertical" || name === "listview")
    return "";
  if (name === "column-horizontal")
    return "";
  if (name === "add")
    return "";
  if (name === "add-circle")
    return "";
  if (name === "adjust")
    return "";
  if (name === "arrow-up-circle" || name === "arrow-up")
    return "";
  if (name === "arrow-right-circle")
    return "";
  if (name === "arrow-down")
    return "";
  if (name === "ashbin")
    return "";
  if (name === "arrow-right")
    return "";
  if (name === "browse")
    return "";
  if (name === "bottom")
    return "";
  if (name === "back" || name === "arrow-left")
    return "";
  if (name === "arrow-left-circle")
    return "";
  if (name === "arrow-double-right")
    return "";
  if (name === "camera")
    return "";
  if (name === "chart-bar")
    return "";
  if (name === "attachment")
    return "";
  if (name === "code")
    return "";
  if (name === "close")
    return "";
  if (name === "check" || name === "check-item")
    return "";
  if (name === "calendar")
    return "";
  if (name === "comment")
    return "";
  if (name === "complete")
    return "";
  if (name === "cry")
    return "";
  if (name === "customer-service")
    return "";
  if (name === "delete")
    return "";
  if (name === "download")
    return "";
  if (name === "edit")
    return "";
  if (name === "email")
    return "";
  if (name === "error")
    return "";
  if (name === "favorite" || name === "heart" || name === "tag" || name === "label")
    return "";
  if (name === "file")
    return "";
  if (name === "folder-close")
    return "";
  if (name === "folder")
    return "";
  if (name === "filter")
    return "";
  if (name === "good" || name === "star")
    return "";
  if (name === "hide")
    return "";
  if (name === "home")
    return "";
  if (name === "history")
    return "";
  if (name === "link")
    return "";
  if (name === "lock")
    return "";
  if (name === "map")
    return "";
  if (name === "meh")
    return "";
  if (name === "menu")
    return "";
  if (name === "loading")
    return "";
  if (name === "help")
    return "";
  if (name === "minus-circle")
    return "";
  if (name === "more")
    return "";
  if (name === "notification" || name === "message")
    return "";
  if (name === "wechat")
    return "";
  if (name === "play")
    return "";
  if (name === "film")
    return "";
  if (name === "fabulous" || name === "good-filling")
    return "";
  if (name === "like")
    return "";
  if (name === "like-fill")
    return "";
  if (name === "elipsis")
    return "";
  if (name === "location")
    return "";
  if (name === "wallet")
    return "";
  if (name === "shop" || name === "apps" || name === "modular")
    return "";
  if (name === "layers")
    return "";
  if (name === "cart" || name === "shopping-cart" || name === "trolley")
    return "";
  if (name === "imface")
    return "";
  if (name === "imkeyboard")
    return "";
  if (name === "immore")
    return "";
  if (name === "imvoice")
    return "";
  if (name === "video")
    return "";
  return "";
}
const _sfc_main = common_vendor.defineComponent({
  name: "mIcon",
  emits: ["click"],
  props: {
    // 图标名称
    name: {
      type: String,
      default: ""
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 40
    },
    // 图标颜色
    color: {
      type: String,
      default: ""
    },
    // 粗体
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconChar() {
      return getIconChar(this.name);
    },
    iconStyle() {
      let style = 'font-family:"iconfont";';
      style += "font-size:" + this.resolveFontSize() + ";";
      if (this.color) {
        style += "color:" + this.color + ";";
      }
      if (this.bold) {
        style += "font-weight:bold;";
      }
      return style;
    }
  },
  methods: {
    /** size 支持数字(按 rpx)、纯数字字符串、或已带 rpx/px/%/em 的字符串，避免 48rpx 被拼成 48rpxrpx */
    resolveFontSize() {
      const sz = this.size;
      if (typeof sz === "number") {
        return sz + "rpx";
      }
      const s = sz;
      if (s.length === 0) {
        return "40rpx";
      }
      const len = s.length;
      if (len >= 3 && s.substring(len - 3) === "rpx") {
        return s;
      }
      if (len >= 2 && s.substring(len - 2) === "px") {
        return s;
      }
      if (len >= 1 && s.substring(len - 1) === "%") {
        return s;
      }
      if (len >= 2 && s.substring(len - 2) === "em") {
        return s;
      }
      const n = parseFloat(s);
      if (!isNaN(n)) {
        return n + "rpx";
      }
      return "40rpx";
    },
    handleClick(e = null) {
      this.$emit("click", e);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.t($options.iconChar),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
    c: common_vendor.s($options.iconStyle),
    d: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    e: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "b2"),
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-icon/m-icon.js.map
