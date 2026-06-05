"use strict";
const common_vendor = require("../../../../common/vendor.js");
const __default__ = common_vendor.defineComponent({
  name: "mTabs",
  emits: ["change"],
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    field: {
      type: String,
      default: "name"
    },
    badgeField: {
      type: String,
      default: "num"
    },
    height: {
      type: Number,
      default: 80
    },
    padding: {
      type: Number,
      default: 20
    },
    gap: {
      type: Number,
      default: 16
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    unlined: {
      type: Boolean,
      default: false
    },
    currentTab: {
      type: Number,
      default: 0
    },
    // 移除 isSlider 相关，不再使用下滑块
    itemWidth: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#666666"
    },
    selectedColor: {
      type: String,
      default: "#5677fc"
    },
    size: {
      type: Number,
      default: 28
    },
    bold: {
      type: Boolean,
      default: true
    },
    // 移除 scale 相关
    badgeColor: {
      type: String,
      default: "#ffffff"
    },
    badgeBgColor: {
      type: String,
      default: "#F74D54"
    },
    zIndex: {
      type: [Number, String],
      default: 996
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    // 新增：选中状态背景色
    activeBgColor: {
      type: String,
      default: "#eff6ff"
    },
    // 新增：选中状态边框色
    activeBorderColor: {
      type: String,
      default: "#bfdbfe"
    },
    // 新增：未选中边框色
    inactiveBorderColor: {
      type: String,
      default: "#E5E5E5"
    },
    // 新增：未选中背景色
    inactiveBgColor: {
      type: String,
      default: "#F5F5F5"
    },
    // 新增：圆角大小
    borderRadius: {
      type: String,
      default: "32rpx"
    },
    // 新增：内边距（控制每个item内部间距）
    itemInnerPadding: {
      type: String,
      default: "16rpx 24rpx"
    }
  },
  computed: {
    tabCount() {
      return this.tabs.length;
    },
    itemWidthComputed() {
      const iw = this.itemWidth;
      if (iw != null && iw.length > 0) {
        return iw;
      }
      const n = this.tabCount;
      if (n <= 0) {
        return "25%";
      }
      const gapTotal = this.gap * (n - 1);
      return `calc((100% - ${gapTotal}rpx) / ${n})`;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({});
      const z = this.zIndex;
      st["zIndex"] = typeof z === "number" ? z : parseInt("" + z);
      if (this.isFixed) {
        st["position"] = "fixed";
        st["left"] = "0";
        st["right"] = "0";
        st["top"] = this.top + "px";
      }
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    }
  },
  methods: {
    tabLabel(tab) {
      const k = this.field;
      const v = tab[k];
      return v == null ? "" : "" + v;
    },
    badgeText(tab) {
      const k = this.badgeField;
      const v = tab[k];
      if (v == null) {
        return "";
      }
      const s = "" + v;
      if (s === "0" || s === "") {
        return "";
      }
      return s;
    },
    tabDot(tab) {
      return tab["isDot"] === true;
    },
    tabDisabled(tab) {
      return tab["disabled"] === true;
    },
    textStyle(idx, tab) {
      const st = new common_vendor.UTSJSONObject({});
      const sel = this.currentTab === idx;
      const dis = this.tabDisabled(tab);
      st["color"] = dis ? "#cccccc" : sel ? this.selectedColor : this.color;
      st["font-size"] = this.size + "rpx";
      if (this.bold && sel) {
        st["font-weight"] = "bold";
      }
      return st;
    },
    onTabTap(idx, tab) {
      if (this.tabDisabled(tab)) {
        return null;
      }
      this.$emit("change", new common_vendor.UTSJSONObject({ index: idx, item: tab }));
    }
  }
});
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx = null) => {
    return new common_vendor.UTSJSONObject({
      "269605bc": _ctx.inactiveBgColor,
      "566d4b9b": _ctx.inactiveBorderColor,
      "370975e7": _ctx.activeBgColor,
      "06c44c40": _ctx.activeBorderColor
    });
  });
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.f($props.tabs, (tab, idx, i0) => {
      return common_vendor.e({
        a: common_vendor.t($options.tabLabel(tab)),
        b: common_vendor.s($options.textStyle(idx, tab)),
        c: $options.badgeText(tab) !== ""
      }, $options.badgeText(tab) !== "" ? {
        d: common_vendor.t($options.badgeText(tab)),
        e: $props.badgeColor,
        f: $props.badgeBgColor
      } : $options.tabDot(tab) ? {
        h: $props.badgeBgColor
      } : {}, {
        g: $options.tabDot(tab),
        i: idx,
        j: $props.currentTab === idx ? 1 : "",
        k: $options.tabDisabled(tab) ? 1 : "",
        l: common_vendor.o(($event) => $options.onTabTap(idx, tab), idx)
      });
    }),
    b: $options.itemWidthComputed,
    c: $props.height + "rpx",
    d: $props.padding + "rpx",
    e: $props.padding + "rpx",
    f: $props.backgroundColor,
    g: $props.gap + "rpx",
    h: !$props.unlined
  }, !$props.unlined ? {} : {}, {
    i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    j: $props.isFixed ? 1 : "",
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    l: common_vendor.s($options.rootStyle),
    m: common_vendor.s(_ctx.__cssVars()),
    n: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(__default__, [["render", _sfc_render], ["__scopeId", "data-v-33d4227b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tabs/m-tabs.js.map
