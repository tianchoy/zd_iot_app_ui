"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mUnix_components_mTools_AmountInwords = require("./components/m-tools/AmountInwords.js");
const uni_modules_mUnix_components_mTools_Ut = require("./components/m-tools/Ut.js");
require("./components/m-tools/utype/type.js");
const uni_modules_mUnix_config = require("./config.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("./components/m-tools/ProjectConfig.js");
const uni_modules_mUnix_components_mTools_Upload = require("./components/m-tools/Upload.js");
const uni_modules_mUnix_libs_utils = require("./libs/utils.js");
require("./components/m-tools/Request.js");
const _sfc_main$1i = common_vendor.defineComponent({
  name: "mActionSheet",
  emits: ["click", "cancel"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    textField: {
      type: String,
      default: "text"
    },
    textColor: {
      type: String,
      default: "#2B2B2B"
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    maskColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.6)"
    },
    tips: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#808080"
    },
    size: {
      type: Number,
      default: 26
    },
    radius: {
      type: Boolean,
      default: true
    },
    isCancel: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 998
    }
  },
  computed: {
    zIndexNum() {
      const z = this.zIndex;
      if (typeof z === "number") {
        return z;
      }
      const n = parseInt(z);
      return isNaN(n) ? 998 : n;
    },
    maskZIndex() {
      return this.zIndexNum - 1;
    }
  },
  methods: {
    itemText(item) {
      const key = this.textField;
      const v = item[key];
      if (v == null) {
        return "";
      }
      return "" + v;
    },
    itemTextColor(item, index) {
      const c = item["color"];
      if (c != null && ("" + c).length > 0) {
        return "" + c;
      }
      return this.textColor;
    },
    onMaskTap() {
      if (!this.maskClosable) {
        return null;
      }
      this.$emit("cancel");
    },
    onCancel() {
      this.$emit("cancel");
    },
    onItemTap(index) {
      const list = this.itemList;
      const item = list[index];
      this.$emit("click", new common_vendor.UTSJSONObject({ index, item }));
    }
  }
});
function _sfc_render$1j(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.maskColor,
    c: $options.maskZIndex,
    d: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "14"),
    e: $props.tips !== ""
  }, $props.tips !== "" ? {
    f: common_vendor.t($props.tips),
    g: $props.color,
    h: $props.size + "rpx"
  } : {}, {
    i: common_vendor.f($props.itemList, (item, index, i0) => {
      return {
        a: common_vendor.t($options.itemText(item)),
        b: $options.itemTextColor(item, index),
        c: index,
        d: common_vendor.o(($event) => $options.onItemTap(index), index)
      };
    }),
    j: $props.isCancel
  }, $props.isCancel ? {
    k: common_vendor.o((...args) => $options.onCancel && $options.onCancel(...args), "62")
  } : {}, {
    l: $options.zIndexNum,
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: `${_ctx.u_s_b_h}px`,
    o: `${_ctx.u_s_a_i_b}px`,
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  }) : {});
}
const mActionSheet = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1i, [["render", _sfc_render$1j]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mActionSheet
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1h = common_vendor.defineComponent({
  name: "mAlert",
  emits: ["click", "cancel", "update:show"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: "#333333"
    },
    btnColor: {
      type: String,
      default: "#EB0909"
    },
    btnText: {
      type: String,
      default: "确定"
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMaskTap() {
      if (!this.maskClosable) {
        return null;
      }
      this.$emit("cancel");
      this.$emit("update:show", false);
    },
    onBtnTap() {
      this.$emit("click", new common_vendor.UTSJSONObject({}));
      this.$emit("update:show", false);
    }
  }
});
function _sfc_render$1i(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "e2"),
    c: common_vendor.t($props.btnText),
    d: $props.btnColor,
    e: common_vendor.o((...args) => $options.onBtnTap && $options.onBtnTap(...args), "ef"),
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: `${_ctx.u_s_b_h}px`,
    h: `${_ctx.u_s_a_i_b}px`,
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  } : {});
}
const mAlert = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1h, [["render", _sfc_render$1i]]);
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mAlert
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1g = common_vendor.defineComponent({
  name: "mAmountInwords",
  emits: ["change"],
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: "#333333"
    },
    fontWeight: {
      type: [Number, String],
      default: 400
    },
    padding: {
      type: String,
      default: "0"
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    upperText() {
      return uni_modules_mUnix_components_mTools_AmountInwords.amountToChineseInWords(this.value);
    },
    textStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color,
        "font-weight": this.fontWeight,
        padding: this.padding
      });
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.emitChange();
      }
    }
  },
  methods: {
    emitChange() {
      this.$emit("change", new common_vendor.UTSJSONObject({ money: this.upperText, moeny: this.upperText }));
    }
  }
});
function _sfc_render$1h(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.t($options.upperText),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
    d: common_vendor.s($options.textStyle),
    e: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  } : {});
}
const mAmountInwords = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1g, [["render", _sfc_render$1h], ["__scopeId", "data-v-e5032bdf"]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mAmountInwords
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1f = common_vendor.defineComponent({
  name: "mBannerArc",
  props: {
    /**
     * 数字/rpx 为固定高度；传 `auto` 时为 height:auto + min-height（按弧高估算），无插槽。
     */
    height: {
      type: [Number, String],
      default: 400
    },
    /**
     * 单弧形态（仅内凹）：
     * - top-concave / topConcave：上沿凹
     * - bottom-concave / bottomConcave：下沿凹（默认）
     * 历史写法 top-convex / bottom-convex 仍解析为同边 bottom/top，按凹绘制。
     * 非空时优先于 arc-edge。
     */
    arcVariant: {
      type: String,
      default: ""
    },
    /**
     * 弧形在「上沿」或「下沿」（arc-variant 为空时生效）。
     */
    arcEdge: {
      type: String,
      default: "bottom"
    },
    /**
     * 双内弧：上下同时凹；可分别配 top/bottom 的 percent、高度、颜色。
     * 为 true 时忽略 arc-variant 单弧解析。
     */
    dualArc: {
      type: Boolean,
      default: false
    },
    percent: {
      type: [Number, String],
      default: 180
    },
    topPercent: {
      type: [Number, String],
      default: ""
    },
    bottomPercent: {
      type: [Number, String],
      default: ""
    },
    background: {
      type: String,
      default: "linear-gradient(180deg, #5473ff 0%, #6da8ff 100%)"
    },
    arcColor: {
      type: String,
      default: "#ffffff"
    },
    topArcColor: {
      type: String,
      default: ""
    },
    bottomArcColor: {
      type: String,
      default: ""
    },
    arcHeight: {
      type: [Number, String],
      default: 100
    },
    topArcHeight: {
      type: [Number, String],
      default: ""
    },
    bottomArcHeight: {
      type: [Number, String],
      default: ""
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    isDual() {
      return this.dualArc;
    },
    singleResolved() {
      return this.computeSingleResolved();
    },
    singleIsTop() {
      if (this.isDual) {
        return false;
      }
      const r = this.singleResolved;
      return r["edge"] === "top";
    },
    singleIsBottom() {
      if (this.isDual) {
        return false;
      }
      const r = this.singleResolved;
      return r["edge"] === "bottom";
    },
    heightIsAuto() {
      const h = this.height;
      if (typeof h === "string") {
        return h.trim().toLowerCase() === "auto";
      }
      return false;
    },
    intrinsicMinHeight() {
      if (this.isDual) {
        const t = this.topArcHeightNum / 2;
        const b = this.bottomArcHeightNum / 2;
        return Math.floor(t + b + 120);
      }
      if (this.singleIsTop) {
        return Math.floor(this.topArcHeightNum + 96);
      }
      return Math.floor(this.arcHeightPxNum + 96);
    },
    arcHeightPxNum() {
      return this.parseArcHeight(this.arcHeight);
    },
    topArcHeightNum() {
      const raw = this.topArcHeight;
      if (raw != null && raw !== "") {
        return this.parseArcHeight(this.topArcHeight);
      }
      return this.arcHeightPxNum;
    },
    bottomArcHeightNum() {
      const raw = this.bottomArcHeight;
      if (raw != null && raw !== "") {
        return this.parseArcHeight(this.bottomArcHeight);
      }
      return this.arcHeightPxNum;
    },
    pctNum() {
      return this.parsePercent(this.percent, 180);
    },
    topPctNum() {
      const tp = this.topPercent;
      if (tp != null && tp !== "") {
        return this.parsePercent(this.topPercent, this.pctNum);
      }
      return this.pctNum;
    },
    bottomPctNum() {
      const bp = this.bottomPercent;
      if (bp != null && bp !== "") {
        return this.parsePercent(this.bottomPercent, this.pctNum);
      }
      return this.pctNum;
    },
    rootClassObj() {
      const o = new common_vendor.UTSJSONObject({});
      if (this.isDual) {
        o["m-banner-arc--variant-dual"] = true;
      } else {
        if (this.singleIsTop) {
          o["m-banner-arc--variant-top-concave"] = true;
        } else if (this.singleIsBottom) {
          o["m-banner-arc--variant-bottom-concave"] = true;
        }
      }
      return o;
    },
    showTopEdge() {
      if (this.isDual) {
        return true;
      }
      return this.singleIsTop;
    },
    showBottomEdge() {
      if (this.isDual) {
        return true;
      }
      return this.singleIsBottom;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({});
      if (this.heightIsAuto) {
        st["height"] = "auto";
        st["minHeight"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.intrinsicMinHeight);
      } else {
        st["height"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height);
      }
      st["width"] = "100%";
      st["position"] = "relative";
      st["boxSizing"] = "border-box";
      st["background"] = this.background;
      st["overflow"] = "hidden";
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    arcStyleTopIn() {
      return this.buildArcStyleIn(true, this.topPctNum, this.topArcHeightNum, this.colorTopBite());
    },
    arcStyleBottomIn() {
      return this.buildArcStyleIn(false, this.bottomPctNum, this.bottomArcHeightNum, this.colorBottomBite());
    }
  },
  methods: {
    computeSingleResolved() {
      const legacy = new common_vendor.UTSJSONObject({});
      legacy["edge"] = this.arcEdge === "top" ? "top" : "bottom";
      const raw = this.arcVariant.trim();
      if (raw === "") {
        return legacy;
      }
      if (raw === "bottom-concave" || raw === "bottomConcave" || raw === "bottom-convex" || raw === "bottomConvex") {
        legacy["edge"] = "bottom";
        return legacy;
      }
      if (raw === "top-concave" || raw === "topConcave" || raw === "top-convex" || raw === "topConvex") {
        legacy["edge"] = "top";
        return legacy;
      }
      return legacy;
    },
    colorTopBite() {
      const c = this.topArcColor;
      if (c != null && c !== "") {
        return c;
      }
      return this.arcColor;
    },
    colorBottomBite() {
      const c = this.bottomArcColor;
      if (c != null && c !== "") {
        return c;
      }
      return this.arcColor;
    },
    parseArcHeight(h) {
      if (typeof h === "number") {
        return h > 0 ? h : 100;
      }
      const s = h.trim();
      if (s.length >= 3 && s.substring(s.length - 3) === "rpx") {
        const v = parseFloat(s.substring(0, s.length - 3));
        return !isNaN(v) && v > 0 ? v : 100;
      }
      const v2 = parseFloat(s);
      return !isNaN(v2) && v2 > 0 ? v2 : 100;
    },
    parsePercent(p, fallback) {
      let n = fallback;
      if (typeof p === "number") {
        n = p;
      } else {
        const x = parseFloat(p);
        if (!isNaN(x)) {
          n = x;
        }
      }
      if (n < 120) {
        n = 120;
      }
      return n;
    },
    halfOffset(ah) {
      const half = ah / 2;
      return "-" + half.toString() + "rpx";
    },
    toLen(ah) {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(ah);
    },
    buildArcStyleIn(isTop, pct, ah, color) {
      const off = this.halfOffset(ah);
      const st = new common_vendor.UTSJSONObject({
        position: "absolute",
        left: "50%",
        width: pct + "%",
        height: this.toLen(ah),
        backgroundColor: color,
        borderRadius: "50%",
        transform: "translate3d(-50%, 0, 0)",
        zIndex: "2",
        pointerEvents: "none"
      });
      if (isTop) {
        st["top"] = off;
        st["bottom"] = "auto";
      } else {
        st["bottom"] = off;
        st["top"] = "auto";
      }
      return st;
    }
  }
});
function _sfc_render$1g(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.showTopEdge
  }, $options.showTopEdge ? {
    b: common_vendor.s($options.arcStyleTopIn)
  } : {}, {
    c: $options.showBottomEdge
  }, $options.showBottomEdge ? {
    d: common_vendor.s($options.arcStyleBottomIn)
  } : {}, {
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    f: common_vendor.n($options.rootClassObj),
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    h: common_vendor.s($options.rootStyle),
    i: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const mBannerArc = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1f, [["render", _sfc_render$1g], ["__scopeId", "data-v-63d58bc8"]]);
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mBannerArc
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1e = common_vendor.defineComponent({
  name: "mBottomNavigation",
  emits: ["click"],
  props: {
    current: {
      type: Number,
      default: 0
    },
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    color: {
      type: String,
      default: "#666666"
    },
    selectedColor: {
      type: String,
      default: "#5677fc"
    },
    fontSize: {
      type: String,
      default: "28rpx"
    },
    bold: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: "#F8F8F8"
    },
    subMenuColor: {
      type: String,
      default: "#333333"
    },
    subMenufontSize: {
      type: String,
      default: "28rpx"
    },
    subMenuBgColor: {
      type: String,
      default: "#ffffff"
    },
    isFixed: {
      type: Boolean,
      default: true
    },
    unlined: {
      type: Boolean,
      default: false
    },
    safeBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      subOpen: false,
      subAnchor: -1,
      subList: []
    };
  },
  computed: {
    navItems() {
      const arr = this.itemList;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    subMenuFontSize() {
      return this.subMenufontSize;
    },
    barStyle() {
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.backgroundColor
      });
      if (this.safeBottom) {
        st["paddingBottom"] = "env(safe-area-inset-bottom)";
      }
      return st;
    },
    subBoxStyle() {
      const pct = 100 / Math.max(this.navItems.length, 1);
      const leftPct = this.subAnchor * pct + pct / 2;
      return new common_vendor.UTSJSONObject({
        backgroundColor: this.subMenuBgColor,
        left: leftPct + "%",
        transform: "translateX(-50%)"
      });
    }
  },
  methods: {
    itemText(it) {
      const t = it["text"];
      if (t != null) {
        return t;
      }
      return "";
    },
    itemType(it) {
      const ty = it["type"];
      if (ty != null) {
        return ty;
      }
      return 1;
    },
    itemTextColor(it) {
      const c = it["color"];
      if (c != null) {
        return c;
      }
      return this.color;
    },
    itemIcon(it, idx) {
      const cur = this.current;
      if (idx === cur) {
        const s = it["selectedIconPath"];
        if (s != null && s !== "") {
          return s;
        }
      }
      const p = it["iconPath"];
      if (p != null) {
        return p;
      }
      return "";
    },
    childList(it) {
      const ch = it["itemList"];
      if (ch == null) {
        return [];
      }
      const arr = ch;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    mainTextStyle(idx, it) {
      const cur = this.current;
      const sel = idx === cur;
      const c = sel ? this.selectedColor : this.itemTextColor(it);
      const st = new common_vendor.UTSJSONObject({
        color: c,
        "font-size": this.fontSize
      });
      if (sel && this.bold) {
        st["font-weight"] = "bold";
      }
      return st;
    },
    subText(sub) {
      const t = sub["text"];
      if (t != null) {
        return t;
      }
      return "";
    },
    onMainTap(idx, it) {
      const ty = this.itemType(it);
      if (ty === 3) {
        const subs = this.childList(it);
        if (subs.length > 0) {
          this.subAnchor = idx;
          this.subList = subs;
          this.subOpen = true;
        }
        this.$emit("click", new common_vendor.UTSJSONObject({
          menu: "main",
          type: ty,
          index: idx,
          parameter: it["parameter"]
        }));
        return null;
      }
      if (ty === 1) {
        this.closeSub();
      }
      this.$emit("click", new common_vendor.UTSJSONObject({
        menu: "main",
        type: ty,
        index: idx,
        parameter: it["parameter"]
      }));
    },
    onSubTap(sidx, sub) {
      this.$emit("click", new common_vendor.UTSJSONObject({
        menu: "sub",
        type: 3,
        index: this.subAnchor,
        subIndex: sidx,
        parameter: sub["parameter"]
      }));
      this.subOpen = false;
    },
    closeSub() {
      this.subOpen = false;
      this.subAnchor = -1;
      this.subList = [];
    }
  }
});
function _sfc_render$1f(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: !$props.unlined
  }, !$props.unlined ? {} : {}, {
    b: common_vendor.f($options.navItems, (it, idx, i0) => {
      return common_vendor.e({
        a: $options.itemIcon(it, idx) !== ""
      }, $options.itemIcon(it, idx) !== "" ? {
        b: $options.itemIcon(it, idx)
      } : {}, {
        c: common_vendor.t($options.itemText(it)),
        d: common_vendor.s($options.mainTextStyle(idx, it)),
        e: idx,
        f: common_vendor.o(($event) => $options.onMainTap(idx, it), idx)
      });
    }),
    c: $data.subOpen && $data.subAnchor >= 0
  }, $data.subOpen && $data.subAnchor >= 0 ? {
    d: common_vendor.o((...args) => $options.closeSub && $options.closeSub(...args), "16")
  } : {}, {
    e: $data.subOpen && $data.subList.length > 0
  }, $data.subOpen && $data.subList.length > 0 ? {
    f: common_vendor.f($data.subList, (sub, sidx, i0) => {
      return {
        a: common_vendor.t($options.subText(sub)),
        b: sidx,
        c: common_vendor.o(($event) => $options.onSubTap(sidx, sub), sidx)
      };
    }),
    g: $props.subMenuColor,
    h: $options.subMenuFontSize,
    i: common_vendor.s($options.subBoxStyle)
  } : {}, {
    j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    k: $props.isFixed ? 1 : "",
    l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    m: common_vendor.s($options.barStyle),
    n: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const mBottomNavigation = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1e, [["render", _sfc_render$1f], ["__scopeId", "data-v-3d2c15c3"]]);
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mBottomNavigation
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1d = common_vendor.defineComponent({
  name: "mBottomPopup",
  emits: ["close"],
  props: {
    //是否需要mask
    mask: {
      type: Boolean,
      default: true
    },
    //控制显示
    show: {
      type: Boolean,
      default: false
    },
    //背景颜色
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    // 高度（数字默认 rpx，也可传带单位的字符串）
    height: {
      type: [Number, String],
      default: 0
    },
    //设置圆角
    radius: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    maskZIndex: {
      type: [Number, String],
      default: 998
    },
    //弹层显示时，垂直方向移动的距离
    translateY: {
      type: String,
      default: "0"
    },
    //是否需要判断底部安全区域（主要针对iphonex以上机型）
    isSafeArea: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    popupHeightCss() {
      const h = this.height;
      if (h === 0 || h === "0") {
        return "auto";
      }
      if (typeof h === "string" && h.trim() === "") {
        return "auto";
      }
      if (uni_modules_mUnix_components_mTools_Ut.parseCssNumber(h) === 0) {
        return "auto";
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(h);
    }
  },
  methods: {
    preventScroll() {
    },
    handleClose() {
      if (!this.show) {
        return null;
      }
      this.$emit("close", new common_vendor.UTSJSONObject({}));
    }
  }
});
function _sfc_render$1e(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show ? 1 : "",
    b: $props.radius ? 1 : "",
    c: $props.isSafeArea ? 1 : "",
    d: $props.backgroundColor,
    e: $options.popupHeightCss,
    f: $props.zIndex,
    g: `translate3d(0, ${$props.show ? $props.translateY : "100%"}, 0)`,
    h: $props.mask
  }, $props.mask ? {
    i: common_vendor.n($props.show ? "m-mask-show" : ""),
    j: $props.maskZIndex,
    k: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args), "7d")
  } : {}, {
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    m: common_vendor.o((...args) => $options.preventScroll && $options.preventScroll(...args), "d8"),
    n: `${_ctx.u_s_b_h}px`,
    o: `${_ctx.u_s_a_i_b}px`,
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component$f = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1d, [["render", _sfc_render$1e], ["__scopeId", "data-v-0b4ec55f"]]);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1c = common_vendor.defineComponent({
  name: "mBubblePopup",
  emits: ["close", "update:show"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.4)"
    },
    width: {
      type: String,
      default: "300rpx"
    },
    radius: {
      type: String,
      default: "8rpx"
    },
    left: {
      type: String,
      default: "auto"
    },
    right: {
      type: String,
      default: "auto"
    },
    top: {
      type: String,
      default: "auto"
    },
    bottom: {
      type: String,
      default: "auto"
    },
    translateX: {
      type: String,
      default: "0"
    },
    translateY: {
      type: String,
      default: "0"
    },
    backgroundColor: {
      type: String,
      default: "#4c4c4c"
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    borderWidth: {
      type: String,
      default: "12rpx"
    },
    direction: {
      type: String,
      default: "top"
    },
    triangleLeft: {
      type: String,
      default: "auto"
    },
    triangleRight: {
      type: String,
      default: "auto"
    },
    triangleTop: {
      type: String,
      default: "auto"
    },
    triangleBottom: {
      type: String,
      default: "auto"
    },
    position: {
      type: String,
      default: "fixed"
    },
    zIndex: {
      type: [Number, String],
      default: 10080
    }
  },
  computed: {
    zIndexNum() {
      const z = this.zIndex;
      if (typeof z === "number") {
        return z;
      }
      return uni_modules_mUnix_components_mTools_Ut.parseCssNumber(z);
    },
    rootStyle() {
      const zi = this.zIndexNum;
      const st = new common_vendor.UTSJSONObject({
        position: this.position,
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        "z-index": zi.toString()
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    /** 蒙层仅用背景色；定位与层级在 scss，与 m-alert 一致，避免 fixed 蒙层盖住 absolute 气泡 */
    maskBgOnly() {
      return new common_vendor.UTSJSONObject({
        backgroundColor: this.maskBgColor
      });
    },
    boxStyle() {
      const pos = new common_vendor.UTSJSONObject({
        position: "absolute",
        width: this.width,
        borderRadius: this.radius,
        backgroundColor: this.backgroundColor,
        transform: `translate3d(${this.translateX}, ${this.translateY}, 0)`,
        overflow: "visible"
      });
      this.applyEdge(pos, "left", this.left);
      this.applyEdge(pos, "right", this.right);
      this.applyEdge(pos, "top", this.top);
      this.applyEdge(pos, "bottom", this.bottom);
      return pos;
    },
    innerStyle() {
      return new common_vendor.UTSJSONObject({
        color: this.color,
        position: "relative",
        zIndex: "2"
      });
    },
    triStyle() {
      const d = this.direction;
      const bw = this.borderWidth;
      const c = this.backgroundColor;
      const st = new common_vendor.UTSJSONObject({
        position: "absolute",
        width: "0",
        height: "0",
        left: this.triangleLeft,
        right: this.triangleRight,
        top: this.triangleTop,
        bottom: this.triangleBottom,
        zIndex: "1"
      });
      if (d === "bottom") {
        st["borderLeftWidth"] = bw;
        st["borderRightWidth"] = bw;
        st["borderTopWidth"] = bw;
        st["borderLeftStyle"] = "solid";
        st["borderRightStyle"] = "solid";
        st["borderTopStyle"] = "solid";
        st["borderLeftColor"] = "transparent";
        st["borderRightColor"] = "transparent";
        st["borderTopColor"] = c;
      } else if (d === "top") {
        st["borderLeftWidth"] = bw;
        st["borderRightWidth"] = bw;
        st["borderBottomWidth"] = bw;
        st["borderLeftStyle"] = "solid";
        st["borderRightStyle"] = "solid";
        st["borderBottomStyle"] = "solid";
        st["borderLeftColor"] = "transparent";
        st["borderRightColor"] = "transparent";
        st["borderBottomColor"] = c;
      } else if (d === "left") {
        st["borderTopWidth"] = bw;
        st["borderBottomWidth"] = bw;
        st["borderRightWidth"] = bw;
        st["borderTopStyle"] = "solid";
        st["borderBottomStyle"] = "solid";
        st["borderRightStyle"] = "solid";
        st["borderTopColor"] = "transparent";
        st["borderBottomColor"] = "transparent";
        st["borderRightColor"] = c;
      } else {
        st["borderTopWidth"] = bw;
        st["borderBottomWidth"] = bw;
        st["borderLeftWidth"] = bw;
        st["borderTopStyle"] = "solid";
        st["borderBottomStyle"] = "solid";
        st["borderLeftStyle"] = "solid";
        st["borderTopColor"] = "transparent";
        st["borderBottomColor"] = "transparent";
        st["borderLeftColor"] = c;
      }
      return st;
    }
  },
  methods: {
    applyEdge(st, key, val) {
      const v = val.trim();
      if (v.length === 0 || v === "auto") {
        return null;
      }
      st[key] = val;
    },
    onMaskTap() {
      this.$emit("close");
      this.$emit("update:show", false);
    }
  }
});
function _sfc_render$1d(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.mask
  }, $props.mask ? {
    c: common_vendor.s($options.maskBgOnly),
    d: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "44")
  } : {}, {
    e: common_vendor.s($options.triStyle),
    f: common_vendor.s($options.innerStyle),
    g: common_vendor.s($options.boxStyle),
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.s($options.rootStyle),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  }) : {});
}
const mBubblePopup = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1c, [["render", _sfc_render$1d], ["__scopeId", "data-v-1e111f9f"]]);
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mBubblePopup
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1b = common_vendor.defineComponent({
  name: "mButton",
  emits: ["click", "getuserinfo", "contact", "getphonenumber", "error", "chooseavatar", "launchapp"],
  behaviors: ["wx://form-field-button"],
  props: {
    //样式类型 primary, white, danger, warning, green,blue, gray，black,brown,gray-primary,gray-danger,gray-warning,gray-green
    type: {
      type: String,
      default: "primary"
    },
    //是否加阴影 移除
    shadow: {
      type: Boolean,
      default: false
    },
    // 宽度 rpx或 %
    width: {
      type: String,
      default: "100%"
    },
    //高度 rpx
    height: {
      type: String,
      default: ""
    },
    // medium / small / mini / tiny（超级迷你，较 mini 更小）
    btnSize: {
      type: String,
      default: ""
    },
    //字体大小 rpx
    size: {
      type: [Number, String],
      default: 0
    },
    bold: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: "0"
    },
    //形状 circle(圆角), square(默认方形)，rightAngle(平角)
    shape: {
      type: String,
      default: "square"
    },
    plain: {
      type: Boolean,
      default: false
    },
    //link样式，去掉边框，结合plain一起使用
    link: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //禁用后背景是否为灰色 （非空心button生效）
    disabledGray: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    index: {
      type: [Number, String],
      default: 0
    },
    //是否需要阻止重复点击【默认200ms】
    preventClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getWidth() {
      let width = this.width;
      if (this.btnSize) {
        width = new common_vendor.UTSJSONObject({
          "medium": "368rpx",
          "small": "240rpx",
          "mini": "116rpx",
          "tiny": "112rpx"
        })[this.btnSize] || this.width;
      }
      return width;
    },
    getHeight() {
      let height = this.height || "96rpx";
      if (this.btnSize) {
        height = new common_vendor.UTSJSONObject({
          "medium": "80rpx",
          "small": "80rpx",
          "mini": "64rpx",
          "tiny": "48rpx"
        })[this.btnSize] || "96rpx";
      }
      return height;
    },
    getSize() {
      const sz = this.size;
      if (typeof sz === "number") {
        if (sz !== 0) {
          return sz;
        }
      } else {
        const s = ("" + sz).trim();
        if (s.length > 0) {
          const n = parseInt(s, 10);
          if (!isNaN(n) && n !== 0) {
            return n;
          }
        }
      }
      const bs = ("" + this.btnSize).trim().toLowerCase();
      if (bs === "large") {
        return 34;
      }
      if (bs === "medium") {
        return 30;
      }
      if (bs === "small") {
        return 26;
      }
      if (bs === "mini") {
        return 18;
      }
      if (bs === "tiny") {
        return 12;
      }
      return 28;
    },
    fontSizeCss() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.getSize);
    },
    /** 非微信端 loading 小圆点与按钮字色一致 */
    loadingSpinnerColor() {
      return this.getColor(this.type, this.plain);
    }
  },
  data() {
    return {
      time: 0
    };
  },
  methods: {
    hexToRGB(hex) {
      if (hex.length === 4) {
        let text = hex.substring(1, 4);
        hex = "#" + text + text;
      }
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? new common_vendor.UTSJSONObject({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }) : new common_vendor.UTSJSONObject({});
    },
    getColorByType(type, isText = null, plain = null) {
      let color = "";
      const colors = new common_vendor.UTSJSONObject({
        "primary": "#5677fc",
        "white": "#dbe5f0",
        "danger": "#EB0909",
        "warning": "#ff7900",
        "green": "#07c160",
        "blue": "#007aff",
        "gray": "#bfbfbf",
        "black": "#334155",
        "brown": "#ac9157",
        "gray-primary": "#f2f2f2",
        "gray-danger": "#f2f2f2",
        "gray-warning": "#f2f2f2",
        "gray-green": "#f2f2f2"
      });
      if (isText) {
        if (type && ~type.indexOf("gray-")) {
          const tp = type.replace("gray-", "");
          if (tp in colors) {
            color = colors[tp];
          }
        } else if (type === "white") {
          color = "#334155";
        } else {
          if (plain) {
            color = colors[type];
          } else {
            color = "#fff";
          }
        }
      } else {
        color = colors[type] || colors.primary;
      }
      return color;
    },
    getShadow(type, plain) {
      const color = this.getColorByType(type);
      if (plain || !color)
        return "none";
      const rgb = this.hexToRGB(color);
      return `0 10rpx 14rpx 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
    },
    getBgColor(type, plain) {
      return plain ? "transparent" : this.getColorByType(type);
    },
    getColor(type, plain) {
      return this.getColorByType(type, true, plain);
    },
    handleClick() {
      if (this.disabled)
        return null;
      if (this.loading)
        return null;
      if (this.preventClick) {
        if ((/* @__PURE__ */ new Date()).getTime() - this.time <= 200)
          return null;
        this.time = (/* @__PURE__ */ new Date()).getTime();
        setTimeout(() => {
          this.time = 0;
        }, 200);
      }
      this.$emit("click", new common_vendor.UTSJSONObject({
        index: Number(this.index)
      }));
    },
    bindgetuserinfo(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("getuserinfo", detail);
    },
    bindcontact(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("contact", detail);
    },
    bindgetphonenumber(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("getphonenumber", detail);
    },
    binderror(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("error", detail);
    },
    bindchooseavatar(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("chooseavatar", detail);
    },
    bindlaunchapp(_a) {
      var _b = _a == void 0 ? new common_vendor.UTSJSONObject({}) : _a, _c = _b.detail, detail = _c == void 0 ? new common_vendor.UTSJSONObject({}) : _c;
      this.$emit("launchapp", detail);
    },
    getDisabledClass: function(disabled, type, plain) {
      let className = "";
      if (disabled && type != "white" && type.indexOf("-") == -1) {
        let classVal = this.disabledGray ? "m-gray-disabled" : "m-dark-disabled";
        className = plain ? "m-dark-disabled-outline" : classVal;
      }
      return className;
    },
    getShapeClass: function(shape, plain) {
      let className = "";
      if (shape == "circle") {
        className = plain ? "m-outline-fillet" : "m-fillet";
      } else if (shape == "rightAngle") {
        className = plain ? "m-outline-rightAngle" : "m-rightAngle";
      }
      return className;
    },
    getHoverClass: function(disabled, type, plain) {
      let className = "";
      if (!disabled) {
        className = plain ? "m-outline-hover" : "m-" + (type || "primary") + "-hover";
      }
      return className;
    }
  }
});
function _sfc_render$1c(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.n($props.plain ? "m-" + $props.type + "-outline" : "m-btn-" + ($props.type || "primary")),
    b: common_vendor.n($options.getDisabledClass($props.disabled, $props.type, $props.plain)),
    c: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    d: common_vendor.n($props.bold ? "m-text-bold" : ""),
    e: common_vendor.n($props.link ? "m-btn__link" : ""),
    f: $options.getWidth,
    g: $options.getHeight,
    h: $options.getHeight,
    i: $options.fontSizeCss,
    j: $options.getBgColor($props.type, $props.plain),
    k: $options.getColor($props.type, $props.plain),
    l: $props.shadow ? $options.getShadow($props.type, $props.plain) : "none",
    m: $props.loading,
    n: $props.formType,
    o: $props.openType,
    p: $props.appParameter,
    q: common_vendor.o((...args) => $options.bindgetuserinfo && $options.bindgetuserinfo(...args), "9b"),
    r: common_vendor.o((...args) => $options.bindgetphonenumber && $options.bindgetphonenumber(...args), "c8"),
    s: common_vendor.o((...args) => $options.bindcontact && $options.bindcontact(...args), "3f"),
    t: common_vendor.o((...args) => $options.binderror && $options.binderror(...args), "4e"),
    v: common_vendor.o((...args) => $options.bindchooseavatar && $options.bindchooseavatar(...args), "b0"),
    w: common_vendor.o((...args) => $options.bindlaunchapp && $options.bindlaunchapp(...args), "0f"),
    x: $props.disabled,
    y: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "8b"),
    z: !$props.link && $props.plain
  }, !$props.link && $props.plain ? {
    A: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    B: common_vendor.n($options.getDisabledClass($props.disabled, $props.type, $props.plain)),
    C: $options.getBgColor($props.type)
  } : {}, {
    D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    E: common_vendor.n(($props.width === "100%" || !$props.width || $props.width === true) && (!$props.btnSize || $props.btnSize === true) ? "m-btn__flex-1" : ""),
    F: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    G: common_vendor.n(!$props.disabled ? "m-button__hover" : ""),
    H: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    I: common_vendor.s({
      width: $options.getWidth,
      height: $options.getHeight,
      margin: $props.margin
    }),
    J: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component$e = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1b, [["render", _sfc_render$1c], ["__scopeId", "data-v-bb5b2fb2"]]);
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1a = common_vendor.defineComponent({
  name: "mCard",
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 副标题（可选）
    subtitle: {
      type: String,
      default: ""
    },
    // 左侧/顶部缩略图
    thumb: {
      type: String,
      default: ""
    },
    // 是否显示边框（与 bordered 二选一即可，兼容演示里的 bordered）
    border: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    // 是否显示阴影
    shadow: {
      type: Boolean,
      default: false
    },
    // 是否通栏（去掉左右外边距）
    full: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    showBorder() {
      return this.border !== false && this.bordered !== false;
    },
    boxStyle() {
      const style = new common_vendor.UTSJSONObject({});
      if (this.customStyle != null) {
        Object.assign(style, this.customStyle);
      }
      return style;
    },
    hasFooterSlot() {
      return this.$slots["footer"] != null;
    }
  }
});
function _sfc_render$1b(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.title !== "" || $props.thumb !== ""
  }, $props.title !== "" || $props.thumb !== "" ? common_vendor.e({
    b: $props.thumb !== ""
  }, $props.thumb !== "" ? {
    c: $props.thumb
  } : {}, {
    d: $props.title !== ""
  }, $props.title !== "" ? {
    e: common_vendor.t($props.title)
  } : {}, {
    f: $props.subtitle !== ""
  }, $props.subtitle !== "" ? {
    g: common_vendor.t($props.subtitle)
  } : {}, {
    h: $props.thumb !== "" ? 1 : ""
  }) : {}, {
    i: common_vendor.n({
      "m-card--full-padding": $props.full
    }),
    j: common_vendor.n({
      "m-card__content--tight-top": $props.title !== "" || $props.thumb !== ""
    }),
    k: $options.hasFooterSlot
  }, $options.hasFooterSlot ? {} : {}, {
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    m: common_vendor.n({
      "m-card--border": $options.showBorder
    }),
    n: common_vendor.n({
      "m-card--shadow": $props.shadow
    }),
    o: common_vendor.n({
      "m-card--full": $props.full
    }),
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    q: common_vendor.s($options.boxStyle),
    r: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const mCard = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1a, [["render", _sfc_render$1b], ["__scopeId", "data-v-3d449aa6"]]);
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCard
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$19 = common_vendor.defineComponent({
  name: "mCascadeSelection",
  emits: ["change", "complete"],
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    textField: {
      type: String,
      default: "text"
    },
    subTextField: {
      type: String,
      default: "subText"
    },
    valueField: {
      type: String,
      default: "value"
    },
    srcField: {
      type: String,
      default: "src"
    },
    childrenField: {
      type: String,
      default: "children"
    },
    headerLine: {
      type: Boolean,
      default: true
    },
    headerBgColor: {
      type: String,
      default: "#FFFFFF"
    },
    tabsHeight: {
      type: String,
      default: "88rpx"
    },
    text: {
      type: String,
      default: "请选择"
    },
    size: {
      type: Number,
      default: 28
    },
    color: {
      type: String,
      default: "#555555"
    },
    activeColor: {
      type: String,
      default: "#5677fc"
    },
    bold: {
      type: Boolean,
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    lineColor: {
      type: String,
      default: "#5677fc"
    },
    checkMarkSize: {
      type: Number,
      default: 15
    },
    checkMarkColor: {
      type: String,
      default: "#5677fc"
    },
    textColor: {
      type: String,
      default: "#333333"
    },
    textActiveColor: {
      type: String,
      default: "#333333"
    },
    textBold: {
      type: Boolean,
      default: true
    },
    textSize: {
      type: Number,
      default: 28
    },
    subTextColor: {
      type: String,
      default: "#999999"
    },
    subTextSize: {
      type: Number,
      default: 24
    },
    padding: {
      type: String,
      default: "20rpx 30rpx"
    },
    firstItemTop: {
      type: String,
      default: "20rpx"
    },
    height: {
      type: String,
      default: "300px"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    request: {
      type: Boolean,
      default: false
    },
    receiveData: {
      type: Array,
      default() {
        return [];
      }
    },
    reset: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      path: [],
      indices: []
    };
  },
  computed: {
    tabLabels() {
      const labels = [];
      const hint = this.text;
      for (let i = 0; i < this.path.length; i++) {
        labels.push(this.rowText(this.path[i]));
      }
      labels.push(hint);
      return labels;
    },
    activeTabIndex() {
      return this.path.length;
    },
    currentRows() {
      if (this.path.length === 0) {
        return this.rootList();
      }
      const last = this.path[this.path.length - 1];
      return this.rowChildren(last);
    },
    // 当前列为列表浏览态，不在此高亮上一列已选项（与多列 swiper 交互不同）
    highlightIndex() {
      return -1;
    }
  },
  watch: {
    reset() {
      this.path = [];
      this.indices = [];
    }
  },
  methods: {
    tf() {
      return this.textField;
    },
    rootList() {
      const arr = this.itemList;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    rowText(row) {
      const v = row[this.tf()];
      if (v != null) {
        return "" + v;
      }
      return "";
    },
    rowSub(row) {
      const k = this.subTextField;
      const v = row[k];
      if (v != null) {
        return "" + v;
      }
      return "";
    },
    rowVal(row) {
      const k = this.valueField;
      return row[k];
    },
    rowSrc(row) {
      const k = this.srcField;
      const v = row[k];
      if (v != null) {
        return v;
      }
      return "";
    },
    rowChildren(row) {
      const k = this.childrenField;
      const ch = row[k];
      if (ch == null) {
        return [];
      }
      const arr = ch;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    tabTextStyle(li) {
      const active = li === this.activeTabIndex;
      const st = new common_vendor.UTSJSONObject({
        "font-size": this.size + "rpx",
        color: active ? this.activeColor : this.color
      });
      if (active && this.bold) {
        st["font-weight"] = "bold";
      }
      return st;
    },
    rowTextStyle(ri) {
      const active = ri === this.highlightIndex;
      const st = new common_vendor.UTSJSONObject({
        "font-size": this.textSize + "rpx",
        color: active ? this.textActiveColor : this.textColor
      });
      if (active && this.textBold) {
        st["font-weight"] = "bold";
      }
      return st;
    },
    onTabTap(li) {
      if (li < this.path.length) {
        const nextPath = [];
        for (let i = 0; i < li; i++) {
          nextPath.push(this.path[i]);
        }
        this.path = nextPath;
        const nextIdx = [];
        for (let j = 0; j < li; j++) {
          nextIdx.push(this.indices[j]);
        }
        this.indices = nextIdx;
      }
    },
    onPick(row, ri) {
      const layer = this.path.length;
      const ch = this.rowChildren(row);
      this.$emit("change", new common_vendor.UTSJSONObject({
        layer,
        subIndex: ri,
        text: this.rowText(row),
        subText: this.rowSub(row),
        value: this.rowVal(row),
        src: this.rowSrc(row)
      }));
      if (this.request) {
        if (ch.length === 0) {
          this.pushPath(row, ri);
          this.emitComplete();
        }
        return null;
      }
      if (ch.length > 0) {
        this.pushPath(row, ri);
      } else {
        this.pushPath(row, ri);
        this.emitComplete();
      }
    },
    pushPath(row, ri) {
      const np = [];
      for (let i = 0; i < this.path.length; i++) {
        np.push(this.path[i]);
      }
      np.push(row);
      this.path = np;
      const ni = [];
      for (let j = 0; j < this.indices.length; j++) {
        ni.push(this.indices[j]);
      }
      ni.push(ri);
      this.indices = ni;
    },
    emitComplete() {
      let textJoin = "";
      for (let i = 0; i < this.path.length; i++) {
        textJoin += this.rowText(this.path[i]);
      }
      const last = this.path[this.path.length - 1];
      this.$emit("complete", new common_vendor.UTSJSONObject({
        text: textJoin,
        value: this.rowVal(last),
        subText: this.rowSub(last),
        src: this.rowSrc(last),
        result: this.path
      }));
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$i = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$i();
}
function _sfc_render$1a(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.headerLine
  }, $props.headerLine ? {
    b: common_vendor.f($options.tabLabels, (lab, li, i0) => {
      return common_vendor.e({
        a: common_vendor.t(lab),
        b: common_vendor.s($options.tabTextStyle(li)),
        c: $props.showLine && li === $options.activeTabIndex
      }, $props.showLine && li === $options.activeTabIndex ? {
        d: $props.lineColor
      } : {}, {
        e: li,
        f: common_vendor.o(($event) => $options.onTabTap(li), li)
      });
    }),
    c: $props.tabsHeight,
    d: $props.headerBgColor
  } : {}, {
    e: $props.firstItemTop,
    f: common_vendor.f($options.currentRows, (row, ri, i0) => {
      return common_vendor.e({
        a: $options.rowSrc(row) !== ""
      }, $options.rowSrc(row) !== "" ? {
        b: $options.rowSrc(row)
      } : {}, {
        c: common_vendor.t($options.rowText(row)),
        d: common_vendor.s($options.rowTextStyle(ri)),
        e: $options.rowSub(row) !== ""
      }, $options.rowSub(row) !== "" ? {
        f: common_vendor.t($options.rowSub(row)),
        g: $props.subTextColor,
        h: $props.subTextSize + "rpx"
      } : {}, {
        i: ri === $options.highlightIndex
      }, ri === $options.highlightIndex ? {
        j: "9e5bd440-0-" + i0,
        k: common_vendor.p({
          name: "check-item",
          size: $props.checkMarkSize + "rpx",
          color: $props.checkMarkColor,
          class: "m-cascade-selection__check data-v-9e5bd440"
        })
      } : {}, {
        l: ri,
        m: common_vendor.o(($event) => $options.onPick(row, ri), ri)
      });
    }),
    g: $props.padding,
    h: $props.height,
    i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    j: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    k: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mCascadeSelection = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$19, [["render", _sfc_render$1a], ["__scopeId", "data-v-9e5bd440"]]);
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCascadeSelection
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$18 = common_vendor.defineComponent({
  name: "mCellGroup",
  props: {
    // 分组标题
    title: {
      type: String,
      default: ""
    },
    // 分组底部说明
    footer: {
      type: String,
      default: ""
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      default: true
    }
  }
});
function _sfc_render$19(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.title
  }, $props.title ? {
    b: common_vendor.t($props.title)
  } : {}, {
    c: $props.footer
  }, $props.footer ? {
    d: common_vendor.t($props.footer)
  } : {}, {
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    f: `${_ctx.u_s_b_h}px`,
    g: `${_ctx.u_s_a_i_b}px`,
    h: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mCellGroup = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$18, [["render", _sfc_render$19], ["__scopeId", "data-v-78221562"]]);
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCellGroup
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$17 = common_vendor.defineComponent({
  name: "mCell",
  emits: ["click"],
  props: {
    // 左侧主标题
    title: {
      type: String,
      default: ""
    },
    // 无 title 时作主标题；与 title 同时存在时作标题下方说明（与 brief 并存时优先展示 brief）
    label: {
      type: String,
      default: ""
    },
    // 右侧内容
    value: {
      type: String,
      default: ""
    },
    // 标题下方的提示说明
    brief: {
      type: String,
      default: ""
    },
    // 是否禁止点击
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否展示下边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否垂直居中对齐
    center: {
      type: Boolean,
      default: false
    },
    // 是否链接类型（显示箭头）
    isLink: {
      type: Boolean,
      default: false
    },
    // 链接跳转类型
    linkType: {
      type: String,
      default: "navigateTo"
    },
    // 跳转地址
    url: {
      type: String,
      default: ""
    },
    // 左侧图标
    icon: {
      type: String,
      default: ""
    },
    // 自定义样式
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    cellWrapStyle() {
      const st = new common_vendor.UTSJSONObject({});
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    actualTitle() {
      if (this.title !== "") {
        return this.title;
      }
      return this.label;
    },
    actualLabel() {
      if (this.brief !== "") {
        return this.brief;
      }
      if (this.title !== "" && this.label !== "") {
        return this.label;
      }
      return "";
    }
  },
  methods: {
    handleClick(event = null) {
      if (!this.disabled) {
        this.$emit("click", event);
        if (this.url && this.isLink) {
          if (this.linkType === "navigateTo") {
            common_vendor.index.navigateTo({ url: this.url });
          } else if (this.linkType === "redirectTo") {
            common_vendor.index.redirectTo({ url: this.url });
          } else if (this.linkType === "switchTab") {
            common_vendor.index.switchTab({ url: this.url });
          }
        }
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$h = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$h();
}
function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      name: $props.icon,
      size: "40rpx",
      class: "data-v-6dc9c38c"
    })
  } : {}, {
    c: $options.actualTitle
  }, $options.actualTitle ? {
    d: common_vendor.t($options.actualTitle)
  } : {}, {
    e: $options.actualLabel
  }, $options.actualLabel ? {
    f: common_vendor.t($options.actualLabel)
  } : {}, {
    g: $props.disabled ? 1 : "",
    h: $props.brief
  }, $props.brief ? {
    i: common_vendor.t($props.brief)
  } : {}, {
    j: $props.value
  }, $props.value ? {
    k: common_vendor.t($props.value),
    l: $props.disabled ? 1 : ""
  } : {}, {
    m: $props.isLink
  }, $props.isLink ? {
    n: common_vendor.p({
      name: "arrow-right",
      size: "28rpx",
      color: "#c0c4cc",
      class: "data-v-6dc9c38c"
    })
  } : {}, {
    o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    p: $props.center ? 1 : "",
    q: $props.border ? 1 : "",
    r: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    s: common_vendor.s($options.cellWrapStyle),
    t: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    v: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "58")
  });
}
const mCell = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$17, [["render", _sfc_render$18], ["__scopeId", "data-v-6dc9c38c"]]);
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCell
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$16 = common_vendor.defineComponent({
  name: "mCheckboxGroup",
  emits: ["update:modelValue", "input", "change"],
  provide() {
    return {
      mCheckboxGroup: this
    };
  },
  props: {
    /** 已选中的 value 列表 */
    modelValue: {
      type: Array,
      default: () => {
        return [];
      }
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: "column"
    }
  },
  methods: {
    /** 切换某项是否在选中列表中 */
    toggleValue(val) {
      if (this.disabled) {
        return null;
      }
      const cur = this.modelValue;
      const next = [];
      let had = false;
      if (cur != null) {
        const len = cur.length;
        for (let i = 0; i < len; i++) {
          const item = cur[i];
          if (item === val) {
            had = true;
          } else {
            next.push(item);
          }
        }
      }
      if (!had) {
        next.push(val);
      }
      this.$emit("update:modelValue", next);
      this.$emit("input", next);
      this.$emit("change", next);
    },
    isSelected(value) {
      const cur = this.modelValue;
      if (cur == null) {
        return false;
      }
      const len = cur.length;
      for (let i = 0; i < len; i++) {
        if (cur[i] === value) {
          return true;
        }
      }
      return false;
    }
  }
});
function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: $props.direction === "row" ? 1 : "",
    c: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    d: `${_ctx.u_s_b_h}px`,
    e: `${_ctx.u_s_a_i_b}px`
  };
}
const mCheckboxGroup = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$16, [["render", _sfc_render$17]]);
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCheckboxGroup
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$15 = common_vendor.defineComponent({
  name: "mCheckbox",
  emits: ["click", "update:checked", "change"],
  inject: {
    mCheckboxGroup: new common_vendor.UTSJSONObject({
      from: "mCheckboxGroup",
      default: null,
      type: Object
    })
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** 独立使用时受控选中状态；放入 group 时由 group 的 modelValue 决定 */
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    checkMarkColor: {
      type: String,
      default: "#ffffff"
    },
    size: {
      type: [Number, String],
      default: 40
    },
    scale: {
      type: [Number, String],
      default: 1
    },
    checkOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /** 勿命名为 group，UTS 易将 this.group 推断为函数类型 */
    checkboxGroup() {
      return this.mCheckboxGroup;
    },
    isChecked() {
      const g = this.checkboxGroup;
      if (g != null) {
        return g.isSelected(this.value);
      }
      return this.checked === true;
    },
    mergedDisabled() {
      const g = this.checkboxGroup;
      if (g != null && g.disabled) {
        return true;
      }
      return this.disabled;
    },
    resolvedColor() {
      if (this.color !== "") {
        return this.color;
      }
      const g = this.checkboxGroup;
      if (g != null && g.color !== "") {
        return g.color;
      }
      return "#5677fc";
    },
    resolvedBorderColor() {
      if (this.borderColor !== "") {
        return this.borderColor;
      }
      const g = this.checkboxGroup;
      if (g != null && g.borderColor !== "") {
        return g.borderColor;
      }
      return "#cccccc";
    },
    sizeNum() {
      const s = this.size;
      if (typeof s === "number") {
        return s;
      }
      const p = parseInt(s.replace("rpx", "").trim());
      if (isNaN(p)) {
        return 40;
      }
      return p;
    },
    checkIconSize() {
      const sn = this.sizeNum;
      const n = Math.floor(sn * 0.5);
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(n);
    },
    scaleNum() {
      const s = this.scale;
      if (typeof s === "number") {
        return s > 0 ? s : 1;
      }
      const p = parseFloat(s.trim());
      if (isNaN(p) || p <= 0) {
        return 1;
      }
      return p;
    },
    iconWrapStyle() {
      const sc = this.scaleNum;
      if (sc !== 1) {
        return new common_vendor.UTSJSONObject({ transform: "scale(" + sc + ")" });
      }
      return new common_vendor.UTSJSONObject({});
    },
    boxStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const st = new common_vendor.UTSJSONObject({
        width: wh,
        height: wh,
        borderColor: this.resolvedBorderColor
      });
      const on = this.isChecked;
      if (on) {
        st["backgroundColor"] = this.resolvedColor;
        st["borderColor"] = this.resolvedColor;
      }
      return st;
    },
    boxEmptyStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({
        width: wh,
        height: wh,
        borderColor: this.resolvedBorderColor
      });
    },
    checkOnlyWrapStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({
        width: wh,
        height: wh
      });
    },
    /**
     * 横向 group 时子项间距：部分端上父级 flex 的「> .m-checkbox」选择器无法命中自定义组件根节点，故用内联 margin。
     */
    rootGroupSpacingStyle() {
      const g = this.checkboxGroup;
      if (g == null) {
        return new common_vendor.UTSJSONObject({});
      }
      const dir = g.direction;
      if (dir !== "row") {
        return new common_vendor.UTSJSONObject({});
      }
      const st = new common_vendor.UTSJSONObject({});
      st["marginTop"] = "0";
      st["marginRight"] = "40rpx";
      st["marginBottom"] = "20rpx";
      return st;
    }
  },
  methods: {
    onTap() {
      const vm = this;
      if (vm.mergedDisabled === true) {
        return null;
      }
      const g = vm.checkboxGroup;
      const val = vm.value;
      if (g != null) {
        g.toggleValue(val);
        vm.$emit("click", val);
        return null;
      }
      const next = !(vm.checked === true);
      vm.$emit("update:checked", next);
      vm.$emit("change", new common_vendor.UTSJSONObject({ checked: next, value: val }));
      vm.$emit("click", val);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$g = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$g();
}
function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.checkOnly
  }, $props.checkOnly ? common_vendor.e({
    b: $options.isChecked
  }, $options.isChecked ? {
    c: common_vendor.p({
      name: "select",
      size: $options.checkIconSize,
      color: $options.resolvedColor,
      class: "data-v-a8a3e30d"
    })
  } : {
    d: common_vendor.s($options.boxEmptyStyle)
  }, {
    e: common_vendor.s($options.checkOnlyWrapStyle)
  }) : common_vendor.e({
    f: $options.isChecked
  }, $options.isChecked ? {
    g: common_vendor.p({
      name: "select",
      size: $options.checkIconSize,
      color: $props.checkMarkColor,
      class: "data-v-a8a3e30d"
    })
  } : {}, {
    h: $options.isChecked ? 1 : "",
    i: common_vendor.s($options.boxStyle)
  }), {
    j: common_vendor.s($options.iconWrapStyle),
    k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    l: $options.mergedDisabled ? 1 : "",
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: common_vendor.s($options.rootGroupSpacingStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    p: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "b4")
  });
}
const Component$d = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$15, [["render", _sfc_render$16], ["__scopeId", "data-v-a8a3e30d"]]);
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$14 = common_vendor.defineComponent({
  name: "mClipboard",
  emits: ["copy"],
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleCopy() {
      if (!this.text) {
        return null;
      }
      const t = this.text;
      uni_modules_mUnix_components_mTools_Ut.copyToClipboard(t, (success) => {
        this.$emit("copy", new common_vendor.UTSJSONObject({
          text: this.text,
          success
        }));
      });
    }
  }
});
function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.o((...args) => $options.handleCopy && $options.handleCopy(...args), "9c"),
    c: `${_ctx.u_s_b_h}px`,
    d: `${_ctx.u_s_a_i_b}px`,
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mClipboard = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$14, [["render", _sfc_render$15], ["__scopeId", "data-v-8feb8df6"]]);
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mClipboard
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$13 = common_vendor.defineComponent({
  name: "mCodeInput",
  emits: ["update:modelValue", "input", "complete", "focus", "blur", "confirm"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    gap: {
      type: [Number, String],
      default: 80
    },
    marginTop: {
      type: [Number, String],
      default: 0
    },
    marginBottom: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Boolean,
      default: true
    },
    cursorColor: {
      type: String,
      default: "#5677fc"
    },
    cursorHeight: {
      type: [Number, String],
      default: 60
    },
    length: {
      type: Number,
      default: 4
    },
    width: {
      type: [Number, String],
      default: 108
    },
    height: {
      type: [Number, String],
      default: 108
    },
    background: {
      type: String,
      default: "transparent"
    },
    borderType: {
      type: [Number, String],
      default: 1
    },
    borderColor: {
      type: String,
      default: "#eaeef1"
    },
    activeColor: {
      type: String,
      default: "#5677fc"
    },
    borderWidth: {
      type: [Number, String],
      default: 2
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 48
    },
    color: {
      type: String,
      default: "#333333"
    },
    fontWeight: {
      type: [Number, String],
      default: 600
    },
    /**
     * 统一格子边长（rpx）。大于 0 时覆盖 width/height，并按比例设置字号、光标高度、密码圆点。
     * 与分别传 width、height、size 二选一即可。
     */
    boxSize: {
      type: Number,
      default: 0
    },
    /** 格子之间的水平间距（rpx） */
    cellGap: {
      type: [Number, String],
      default: 16
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  data() {
    return {
      innerValue: "",
      focused: false
    };
  },
  computed: {
    lengthNum() {
      const n = this.length;
      if (n < 1) {
        return 1;
      }
      if (n > 12) {
        return 12;
      }
      return n;
    },
    inputType() {
      const t = this.type;
      if (t === "number" || t === "digit") {
        return "number";
      }
      if (t === "password") {
        return "password";
      }
      return "text";
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        paddingLeft: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.gap),
        paddingRight: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.gap),
        marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginTop),
        marginBottom: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginBottom)
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    textStyle() {
      let fs = this.size;
      const bs = this.boxSize;
      if (bs > 0) {
        const n = Math.floor(bs * 0.445);
        fs = n < 20 ? 20 : n;
      }
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(fs),
        color: this.color,
        "font-weight": this.fontWeight
      });
    },
    pwdDotStyle() {
      let d = 18;
      const bs = this.boxSize;
      if (bs > 0) {
        const n = Math.floor(bs * 0.17);
        d = n < 10 ? 10 : n;
      }
      return new common_vendor.UTSJSONObject({
        backgroundColor: this.color,
        width: d + "rpx",
        height: d + "rpx",
        borderRadius: "50%"
      });
    },
    /** 光标条高度（与 boxSize 联动） */
    caretHeightCss() {
      const bs = this.boxSize;
      if (bs > 0) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(Math.floor(bs * 0.56));
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.cursorHeight);
    },
    borderW() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.borderWidth);
    },
    cellW() {
      const bs = this.boxSize;
      if (bs > 0) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(bs);
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.width);
    },
    cellH() {
      const bs = this.boxSize;
      if (bs > 0) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(bs);
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height);
    },
    radiusCss() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
    },
    borderMode() {
      const v = this.borderType;
      if (typeof v === "number") {
        return v;
      }
      const n = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(v);
      if (n === 2 || n === 3) {
        return n;
      }
      return 1;
    },
    caretIndex() {
      const len = this.innerValue.length;
      if (len >= this.lengthNum) {
        return this.lengthNum - 1;
      }
      return len;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.applyExternal();
      }
    },
    modelValue: {
      immediate: true,
      handler() {
        this.applyExternal();
      }
    },
    isFocus(n) {
      if (n === true && !this.disabled) {
        this.focused = true;
      }
    }
  },
  mounted() {
    if (this.isFocus) {
      this.focused = true;
    }
  },
  methods: {
    applyExternal() {
      const v = this.value;
      if (v != null && v !== "") {
        this.syncFromProp(v);
        return null;
      }
      const m = this.modelValue;
      this.syncFromProp(m == null ? "" : m);
    },
    syncFromProp(s) {
      const raw = s == null ? "" : s;
      let next = "" + raw;
      if (next.length > this.lengthNum) {
        next = next.substring(0, this.lengthNum);
      }
      if (this.type === "number" || this.type === "digit") {
        next = this.filterDigits(next);
      }
      this.innerValue = next;
    },
    filterDigits(s) {
      let out = "";
      for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (c >= "0" && c <= "9") {
          out += c;
        }
      }
      return out;
    },
    charAt(i) {
      const s = this.innerValue;
      if (i < 0 || i >= s.length) {
        return "";
      }
      return s.charAt(i);
    },
    cellStyle(i) {
      const st = new common_vendor.UTSJSONObject({
        width: this.cellW,
        height: this.cellH,
        backgroundColor: this.background,
        borderRadius: this.radiusCss
      });
      const last = i >= this.lengthNum - 1;
      if (last) {
        st["marginRight"] = "0";
      } else {
        st["marginRight"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.cellGap);
      }
      const active = i === this.caretIndex && this.focused && !this.disabled;
      const bc = active ? this.activeColor : this.borderColor;
      const bw = this.borderW;
      const m = this.borderMode;
      if (m === 3) {
        st["borderWidth"] = "0";
      } else if (m === 2) {
        st["borderBottomWidth"] = bw;
        st["borderBottomStyle"] = "solid";
        st["borderBottomColor"] = bc;
      } else {
        st["borderWidth"] = bw;
        st["borderStyle"] = "solid";
        st["borderColor"] = bc;
      }
      return st;
    },
    onTapWrap() {
      if (this.disabled) {
        return null;
      }
      this.focused = true;
    },
    onNativeInput(e) {
      const d = e["detail"];
      if (d == null) {
        return null;
      }
      const v = d["value"];
      let s = v == null ? "" : "" + v;
      if (this.type === "number" || this.type === "digit") {
        s = this.filterDigits(s);
      }
      if (s.length > this.lengthNum) {
        s = s.substring(0, this.lengthNum);
      }
      this.innerValue = s;
      this.$emit("update:modelValue", s);
      this.$emit("input", new common_vendor.UTSJSONObject({ value: s }));
      if (s.length === this.lengthNum) {
        this.$emit("complete", new common_vendor.UTSJSONObject({ value: s }));
      }
    },
    onNativeFocus() {
      this.focused = true;
      this.$emit("focus");
    },
    onNativeBlur() {
      this.focused = false;
      this.$emit("blur", new common_vendor.UTSJSONObject({ value: this.innerValue }));
    },
    onNativeConfirm() {
      this.$emit("confirm", new common_vendor.UTSJSONObject({ value: this.innerValue }));
    },
    clear() {
      this.innerValue = "";
      this.$emit("update:modelValue", "");
      this.$emit("input", new common_vendor.UTSJSONObject({ value: "" }));
    }
  }
});
function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: $data.innerValue,
    b: $options.inputType,
    c: $props.password,
    d: $props.disabled,
    e: $data.focused,
    f: $options.lengthNum,
    g: common_vendor.o((...args) => $options.onNativeInput && $options.onNativeInput(...args), "0d"),
    h: common_vendor.o((...args) => $options.onNativeFocus && $options.onNativeFocus(...args), "a3"),
    i: common_vendor.o((...args) => $options.onNativeBlur && $options.onNativeBlur(...args), "e0"),
    j: common_vendor.o((...args) => $options.onNativeConfirm && $options.onNativeConfirm(...args), "d1"),
    k: common_vendor.f($options.lengthNum, (idx, k0, i0) => {
      return common_vendor.e({
        a: $props.password && $options.charAt(idx - 1) !== ""
      }, $props.password && $options.charAt(idx - 1) !== "" ? {
        b: common_vendor.s($options.pwdDotStyle)
      } : {
        c: common_vendor.t($options.charAt(idx - 1)),
        d: common_vendor.s($options.textStyle)
      }, {
        e: $props.cursor && $data.focused && !$props.disabled && $options.caretIndex === idx - 1
      }, $props.cursor && $data.focused && !$props.disabled && $options.caretIndex === idx - 1 ? {
        f: $props.cursorColor,
        g: $options.caretHeightCss
      } : {}, {
        h: idx,
        i: common_vendor.s($options.cellStyle(idx - 1))
      });
    }),
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    m: common_vendor.s($options.rootStyle),
    n: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    o: common_vendor.o((...args) => $options.onTapWrap && $options.onTapWrap(...args), "dd"),
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mCodeInput = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$13, [["render", _sfc_render$14], ["__scopeId", "data-v-92815cf2"]]);
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCodeInput
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$12 = common_vendor.defineComponent({
  name: "mCol",
  inject: {
    mRowGutter: new common_vendor.UTSJSONObject({
      from: "mRowGutter",
      default: null,
      type: Object
    })
  },
  props: {
    // 栅格占据的列数，总共24栅格
    span: {
      type: [Number, String],
      default: 24
    },
    // 左侧间距
    offset: {
      type: [Number, String],
      default: 0
    },
    // 自定义元素宽度
    width: {
      type: [Number, String],
      default: ""
    },
    // 自定义padding
    padding: {
      type: [Number, String],
      default: ""
    }
  },
  methods: {
    /** 父级 m-row 的 gutter（rpx），与负边距配套为列内各一半 */
    getRowGutterRpx() {
      const raw = this.mRowGutter;
      if (raw == null) {
        return 0;
      }
      const v = common_vendor.unref(raw);
      const n = Number(v);
      if (n !== n || n <= 0) {
        return 0;
      }
      return n;
    },
    getStyle() {
      const style = new common_vendor.UTSJSONObject({});
      let span = Number(this.span);
      if (span > 24)
        span = 24;
      if (span < 1)
        span = 1;
      const percent = span / 24 * 100 + "%";
      const wRaw = this.width;
      let customW = "";
      if (typeof wRaw === "number") {
        customW = "" + wRaw;
      } else if (wRaw != null) {
        customW = wRaw.trim();
      }
      if (customW.length > 0) {
        style["flex"] = "0 0 " + customW;
      } else {
        style["flex"] = "0 0 " + percent;
      }
      style["minWidth"] = "0";
      style["maxWidth"] = "100%";
      const offsetNum = Number(this.offset);
      if (offsetNum > 0) {
        const offsetPercent = offsetNum / 24 * 100 + "%";
        style.marginLeft = offsetPercent;
      }
      const gutterRpx = this.getRowGutterRpx();
      const halfGutter = gutterRpx / 2;
      const padRaw = this.padding;
      if (padRaw !== "" && padRaw != null) {
        const p = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(padRaw);
        if (p > 0) {
          style.paddingLeft = halfGutter + p + "rpx";
          style.paddingRight = halfGutter + p + "rpx";
        } else if (halfGutter > 0) {
          style.paddingLeft = halfGutter + "rpx";
          style.paddingRight = halfGutter + "rpx";
        }
      } else if (halfGutter > 0) {
        style.paddingLeft = halfGutter + "rpx";
        style.paddingRight = halfGutter + "rpx";
      }
      return style;
    }
  }
});
function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.s($options.getStyle()),
    c: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mCol = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$12, [["render", _sfc_render$13], ["__scopeId", "data-v-525561d9"]]);
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCol
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$11 = common_vendor.defineComponent({
  name: "mCollapse",
  emits: ["click"],
  props: {
    bgColor: {
      type: String,
      default: "transparent"
    },
    hdBgColor: {
      type: String,
      default: "#ffffff"
    },
    bdBgColor: {
      type: String,
      default: "transparent"
    },
    height: {
      type: String,
      default: "auto"
    },
    index: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: -1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: true
    },
    arrowColor: {
      type: String,
      default: "#333333"
    }
  },
  computed: {
    open() {
      return this.current === this.index;
    }
  },
  methods: {
    onHeadTap() {
      if (this.disabled) {
        return null;
      }
      this.$emit("click", new common_vendor.UTSJSONObject({ index: this.index }));
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$f = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$f();
}
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.arrow
  }, $props.arrow ? {
    b: common_vendor.p({
      name: $options.open ? "arrow-up" : "arrow-down",
      size: "28rpx",
      color: $props.arrowColor,
      class: "m-collapse__arrow-icon"
    })
  } : {}, {
    c: $props.hdBgColor,
    d: common_vendor.o((...args) => $options.onHeadTap && $options.onHeadTap(...args), "0e"),
    e: $options.open
  }, $options.open ? {
    f: $props.bdBgColor,
    g: $props.height
  } : {}, {
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.s({
      backgroundColor: $props.bgColor
    }),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mCollapse = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$11, [["render", _sfc_render$12]]);
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCollapse
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$10 = common_vendor.defineComponent({
  name: "mContent",
  emits: ["click"],
  props: {
    //边距大小
    size: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["small", "default", "large"].includes(value);
      }
      // 可选校验
    },
    //自定义
    gap: {
      type: [Number, String],
      default: 0
    },
    //背景
    background: {
      type: String,
      default: "transparent"
    },
    //圆角
    radius: {
      type: [Number, String],
      default: 0
    },
    //上边距
    marginTop: {
      type: [Number, String],
      default: 20
    },
    //下边距
    marginBottom: {
      type: [Number, String],
      default: 20
    }
  },
  computed: {
    getPadding() {
      const padding = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(this.gap);
      if (padding > 0) {
        return `padding:0 ${padding}rpx;`;
      }
      return "";
    },
    getStyles() {
      const br = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      const mt = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginTop);
      const mb = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginBottom);
      let styles = `background:${this.background};border-radius:${br};margin-top:${mt};margin-bottom:${mb};`;
      styles += this.getPadding;
      return styles;
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
});
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.n($props.radius ? "m-wingblank__hidden" : ""),
    c: common_vendor.n($options.getPadding ? "" : `m-wingblank__${$props.size}`),
    d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    e: common_vendor.s($options.getStyles),
    f: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    g: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "72")
  };
}
const Component$c = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$10, [["render", _sfc_render$11], ["__scopeId", "data-v-39837eb6"]]);
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$$ = common_vendor.defineComponent({
  name: "mCountdownVerify",
  emits: ["send", "countdown", "end"],
  props: {
    /** 未发送、未倒计时时的文案 */
    text: {
      type: String,
      default: "获取验证码"
    },
    /** 已点击发送、等待服务端成功回调（successTick 递增）期间 */
    sendText: {
      type: String,
      default: "请稍候..."
    },
    /** 倒计时中文案接在「剩余秒数」之后，如 s后重新获取 → 显示 59s后重新获取 */
    countdownSuffix: {
      type: String,
      default: "s后重新获取"
    },
    seconds: {
      type: Number,
      default: 60
    },
    /**
     * 发送成功后由父级递增（如 ++），大于历史值且大于 0 时开始倒计时。
     * 与 resetTick 配合可多次重发。
     */
    successTick: {
      type: Number,
      default: 0
    },
    /**
     * 由父级递增以重置为可点击状态（清除倒计时与等待）。
     */
    resetTick: {
      type: Number,
      default: 0
    },
    /** 为 true 时挂载后立即进入倒计时（无需先点发送） */
    start: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "182rpx"
    },
    height: {
      type: String,
      default: "56rpx"
    },
    padding: {
      type: String,
      default: "0"
    },
    margin: {
      type: String,
      default: "0"
    },
    radius: {
      type: [Number, String],
      default: 6
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: "#5677fc"
    },
    background: {
      type: String,
      default: "transparent"
    },
    borderWidth: {
      type: String,
      default: "1rpx"
    },
    borderColor: {
      type: String,
      default: "#5677fc"
    },
    /** 倒计时过程中是否降低不透明度 */
    countdownOpacity: {
      type: Boolean,
      default: true
    },
    /** 是否使用点击态样式类（各端 hover-class 能力不同，仅作弱提示） */
    hover: {
      type: Boolean,
      default: true
    },
    /** 发出 send 后若 successTick 一直未递增，超时（ms）后结束等待，允许再次点击 */
    sendTimeoutMs: {
      type: Number,
      default: 3e4
    },
    params: {
      type: [Number, String],
      default: 0
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  data() {
    return {
      remaining: 0,
      timer: null,
      sendTimeoutTimer: null,
      waitingSuccess: false,
      ackSuccessTick: 0,
      ackResetTick: 0
    };
  },
  computed: {
    isCounting() {
      return this.remaining > 0;
    },
    mergedDisabled() {
      if (this.disabled === true) {
        return true;
      }
      if (this.isCounting) {
        return true;
      }
      if (this.waitingSuccess === true) {
        return true;
      }
      return false;
    },
    displayText() {
      if (this.isCounting) {
        return String(this.remaining) + this.countdownSuffix;
      }
      if (this.waitingSuccess) {
        return this.sendText;
      }
      return this.text;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        width: this.width,
        height: this.height,
        padding: this.padding,
        margin: this.margin,
        borderRadius: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius),
        backgroundColor: this.background,
        borderWidth: this.borderWidth,
        borderStyle: "solid",
        borderColor: this.borderColor,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      });
      if (this.disabled === true) {
        st["opacity"] = 0.45;
      } else if (this.countdownOpacity === true && this.isCounting) {
        st["opacity"] = 0.55;
      } else if (this.waitingSuccess === true) {
        st["opacity"] = 0.75;
      }
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    textStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color
      });
    }
  },
  watch: {
    successTick(n) {
      if (n > this.ackSuccessTick) {
        this.ackSuccessTick = n;
        if (n > 0) {
          this.clearSendTimeout();
          this.waitingSuccess = false;
          this.startCountdown();
        }
      }
    },
    resetTick(n) {
      if (n > this.ackResetTick) {
        this.ackResetTick = n;
        this.fullReset();
      }
    }
  },
  mounted() {
    this.ackSuccessTick = this.successTick;
    this.ackResetTick = this.resetTick;
    if (this.start === true) {
      this.startCountdown();
    }
  },
  beforeUnmount() {
    this.clearTimer();
    this.clearSendTimeout();
  },
  methods: {
    clearTimer() {
      if (this.timer != null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    clearSendTimeout() {
      if (this.sendTimeoutTimer != null) {
        clearTimeout(this.sendTimeoutTimer);
        this.sendTimeoutTimer = null;
      }
    },
    fullReset() {
      this.clearTimer();
      this.clearSendTimeout();
      this.remaining = 0;
      this.waitingSuccess = false;
    },
    startCountdown() {
      this.clearTimer();
      let sec = this.seconds;
      if (sec <= 0) {
        sec = 60;
      }
      this.remaining = sec;
      this.tickEmit();
      this.timer = setInterval(() => {
        this.remaining--;
        if (this.remaining <= 0) {
          this.clearTimer();
          this.remaining = 0;
          this.$emit("end", new common_vendor.UTSJSONObject({ params: this.params }));
        } else {
          this.tickEmit();
        }
      }, 1e3);
    },
    tickEmit() {
      this.$emit("countdown", new common_vendor.UTSJSONObject({ seconds: this.remaining, params: this.params }));
    },
    onTap() {
      if (this.mergedDisabled === true) {
        return null;
      }
      this.$emit("send", new common_vendor.UTSJSONObject({ params: this.params }));
      this.waitingSuccess = true;
      const ms = this.sendTimeoutMs;
      if (ms > 0) {
        this.clearSendTimeout();
        this.sendTimeoutTimer = setTimeout(() => {
          this.sendTimeoutTimer = null;
          if (this.waitingSuccess === true) {
            this.waitingSuccess = false;
          }
        }, ms);
      }
    }
  }
});
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.t($options.displayText),
    b: common_vendor.s($options.textStyle),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: $props.hover ? 1 : "",
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    f: common_vendor.s($options.rootStyle),
    g: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    h: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "65")
  };
}
const mCountdownVerify = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$$, [["render", _sfc_render$10], ["__scopeId", "data-v-a3d9db22"]]);
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCountdownVerify
}, Symbol.toStringTag, { value: "Module" }));
class CellPart extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          kind: { type: "Unknown", optional: false },
          text: { type: String, optional: false }
        };
      },
      name: "CellPart"
    };
  }
  constructor(options, metadata = CellPart.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.kind = this.__props__.kind;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
const _sfc_main$_ = common_vendor.defineComponent({
  name: "mCountdown",
  emits: ["change", "finish", "tap"],
  props: {
    time: {
      type: Number,
      default: 60
    },
    seconds: {
      type: Number,
      default: 0
    },
    /**
     * 占位符：YYYY MM DD HH mm ss（MM 为大写表示月，mm 为小写表示分）
     * 示例：HH:mm:ss、DD天HH时mm分ss秒、YYYY-MM-DD HH:mm:ss
     */
    format: {
      type: String,
      default: "HH:mm:ss"
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    // 空 / text / button / cells（分格小方格，与 button 互斥）
    type: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    endText: {
      type: String,
      default: ""
    },
    startText: {
      type: String,
      default: ""
    },
    restartOnTap: {
      type: Boolean,
      default: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    /**
     * 为 true 时按「年(365天)/月(30天)/日/时/分/秒」拆分剩余秒数，用于 YYYY-MM-DD HH:mm:ss 等长周期展示
     * 为 false 时 DD 表示总天数（不足一天进 HH:mm:ss）
     */
    calendar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      remaining: 0,
      timer: null,
      hasStarted: false
    };
  },
  computed: {
    duration() {
      const sec = this.seconds;
      if (sec > 0) {
        return sec;
      }
      return this.time;
    },
    isSmsStyle() {
      const suf = this.suffix;
      const end = this.endText;
      return suf.length > 0 || end.length > 0;
    },
    isButtonType() {
      return this.type === "button";
    },
    isCellsType() {
      return this.type === "cells";
    },
    showCellsLayout() {
      return this.isCellsType && !this.isSmsStyle;
    },
    isCounting() {
      return this.remaining > 0;
    },
    rootClass() {
      const list = [];
      if (this.isButtonType && !this.isCellsType) {
        list.push("m-countdown--button");
      }
      if (this.isCellsType) {
        list.push("m-countdown--cells");
      }
      if (this.isCounting) {
        list.push("m-countdown--counting");
      }
      if (this.canTapRestart) {
        list.push("m-countdown--clickable");
      }
      if (this.primary === true) {
        list.push("m-countdown--primary");
      }
      return list;
    },
    textClass() {
      const list = [];
      if (this.isButtonType && this.isCounting && !this.isCellsType) {
        list.push("m-countdown__text--muted");
      }
      if (this.canTapRestart) {
        list.push("m-countdown__text--action");
      }
      return list;
    },
    canTapRestart() {
      if (!this.isSmsStyle) {
        return false;
      }
      if (this.restartOnTap !== true) {
        return false;
      }
      if (this.remaining > 0) {
        return false;
      }
      return this.endText.length > 0;
    },
    clockDisplay() {
      const fmt = this.format;
      if (this.calendar === true) {
        const lb = this.longBreakdown(this.remaining);
        return this.applyFormatString(fmt, lb.y, lb.M, lb.d, lb.h, lb.m, lb.s, true);
      }
      const sh = this.parseFormatShort(this.remaining);
      return this.applyFormatString(fmt, 0, 0, sh.day, sh.hour, sh.minute, sh.second, false);
    },
    cellParts() {
      if (!this.showCellsLayout) {
        return [];
      }
      const fmt = this.format;
      let br;
      if (this.calendar === true) {
        const lb = this.longBreakdown(this.remaining);
        br = { y: lb.y, M: lb.M, d: lb.d, h: lb.h, mi: lb.m, s: lb.s };
      } else {
        const sh = this.parseFormatShort(this.remaining);
        br = { y: 0, M: 0, d: sh.day, h: sh.hour, mi: sh.minute, s: sh.second };
      }
      return this.scanFormatToCells(fmt, br);
    },
    displayStr() {
      if (this.autoStart !== true && !this.hasStarted) {
        const st = this.startText;
        if (st.length > 0) {
          return st;
        }
      }
      if (this.isSmsStyle) {
        if (this.remaining <= 0) {
          const end = this.endText;
          if (end.length > 0) {
            return end;
          }
          return this.clockDisplay;
        }
        const suf = this.suffix;
        if (suf.length > 0) {
          return String(this.remaining) + suf;
        }
        return this.clockDisplay;
      }
      return this.clockDisplay;
    }
  },
  created() {
    this.remaining = this.duration;
  },
  mounted() {
    if (this.autoStart) {
      this.hasStarted = true;
      this.start();
    }
  },
  beforeUnmount() {
    this.stop();
  },
  methods: {
    padZero(num) {
      return num < 10 ? "0" + num : String(num);
    },
    pad4(num) {
      if (num < 10) {
        return "000" + num;
      }
      if (num < 100) {
        return "00" + num;
      }
      if (num < 1e3) {
        return "0" + num;
      }
      return String(num);
    },
    padDD(d) {
      if (d >= 100) {
        return String(d);
      }
      return this.padZero(d);
    },
    /** 总秒数拆成：天(0~)、时(0~23)、分、秒（duration 模式） */
    parseFormatShort(seconds) {
      let sec = seconds;
      const day = Math.floor(sec / (60 * 60 * 24));
      sec = sec % (60 * 60 * 24);
      const hour = Math.floor(sec / (60 * 60));
      sec = sec % (60 * 60);
      const minute = Math.floor(sec / 60);
      sec = sec % 60;
      return new common_vendor.UTSJSONObject({
        day,
        hour,
        minute,
        second: sec
      });
    },
    /** 年=365天、月=30天、日、时、分、秒（calendar 模式，近似） */
    longBreakdown(seconds) {
      let s = seconds;
      const y = Math.floor(s / (365 * 24 * 3600));
      s = s % (365 * 24 * 3600);
      const M = Math.floor(s / (30 * 24 * 3600));
      s = s % (30 * 24 * 3600);
      const d = Math.floor(s / (24 * 3600));
      s = s % (24 * 3600);
      const h = Math.floor(s / 3600);
      s = s % 3600;
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return new common_vendor.UTSJSONObject({ y, M, d, h, m, s: sec });
    },
    applyFormatString(fmt, y, M, d, h, mi, s, isLong) {
      let r = fmt;
      if (isLong) {
        r = r.replace("YYYY", this.pad4(y));
        r = r.replace("MM", this.padZero(M));
        r = r.replace("DD", this.padZero(d));
      } else {
        r = r.replace("YYYY", this.pad4(0));
        r = r.replace("MM", this.padZero(0));
        r = r.replace("DD", this.padDD(d));
      }
      r = r.replace("HH", this.padZero(h));
      r = r.replace("mm", this.padZero(mi));
      r = r.replace("ss", this.padZero(s));
      return r;
    },
    scanFormatToCells(fmt, br) {
      const out = [];
      let i = 0;
      const len = fmt.length;
      while (i < len) {
        if (i + 4 <= len && fmt.substring(i, i + 4) === "YYYY") {
          out.push(new CellPart({ kind: "box", text: this.pad4(br.y) }));
          i += 4;
          continue;
        }
        if (i + 2 <= len) {
          const two = fmt.substring(i, i + 2);
          if (two === "MM") {
            out.push(new CellPart({ kind: "box", text: this.padZero(br.M) }));
            i += 2;
            continue;
          }
          if (two === "DD") {
            out.push(new CellPart({ kind: "box", text: this.padDD(br.d) }));
            i += 2;
            continue;
          }
          if (two === "HH") {
            out.push(new CellPart({ kind: "box", text: this.padZero(br.h) }));
            i += 2;
            continue;
          }
          if (two === "mm") {
            out.push(new CellPart({ kind: "box", text: this.padZero(br.mi) }));
            i += 2;
            continue;
          }
          if (two === "ss") {
            out.push(new CellPart({ kind: "box", text: this.padZero(br.s) }));
            i += 2;
            continue;
          }
        }
        const ch = fmt.charAt(i);
        out.push(new CellPart({ kind: "sep", text: ch }));
        i++;
      }
      return out;
    },
    getBreakdownForEmit(seconds) {
      if (this.calendar === true) {
        const lb = this.longBreakdown(seconds);
        return new common_vendor.UTSJSONObject({
          year: lb.y,
          month: lb.M,
          day: lb.d,
          hour: lb.h,
          minute: lb.m,
          second: lb.s
        });
      }
      const sh = this.parseFormatShort(seconds);
      return new common_vendor.UTSJSONObject({
        day: sh.day,
        hour: sh.hour,
        minute: sh.minute,
        second: sh.second
      });
    },
    tick() {
      this.remaining--;
      this.$emit("change", this.getBreakdownForEmit(this.remaining));
      if (this.remaining <= 0) {
        this.stop();
        this.$emit("finish");
      }
    },
    start() {
      this.stop();
      this.hasStarted = true;
      if (this.remaining <= 0) {
        this.$emit("finish");
        return null;
      }
      this.timer = setInterval(() => {
        this.tick();
      }, 1e3);
    },
    pause() {
      this.stop();
    },
    reset() {
      this.remaining = this.duration;
      this.start();
    },
    stop() {
      if (this.timer != null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    onTap() {
      this.$emit("tap");
      if (this.canTapRestart) {
        this.remaining = this.duration;
        this.start();
      }
    }
  }
});
function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.showCellsLayout
  }, $options.showCellsLayout ? {
    b: common_vendor.f($options.cellParts, (part, idx, i0) => {
      return common_vendor.e({
        a: part.kind === "box"
      }, part.kind === "box" ? {
        b: common_vendor.t(part.text)
      } : {
        c: common_vendor.t(part.text)
      }, {
        d: "cp-" + idx
      });
    })
  } : {
    c: common_vendor.t($options.displayStr),
    d: common_vendor.n($options.textClass)
  }, {
    e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    f: common_vendor.n($options.rootClass),
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    h: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "29"),
    i: `${_ctx.u_s_b_h}px`,
    j: `${_ctx.u_s_a_i_b}px`
  });
}
const mCountdown = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$_, [["render", _sfc_render$$], ["__scopeId", "data-v-1b59fef2"]]);
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mCountdown
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Z = common_vendor.defineComponent({
  name: "mDatetimePicker",
  emits: ["update:show", "update:modelValue", "confirm", "cancel", "close"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: "datetime"
    },
    minDate: {
      type: Number,
      default: 0
      // 默认十年前
    },
    maxDate: {
      type: Number,
      default: 0
      // 默认十年后
    },
    title: {
      type: String,
      default: "选择日期时间"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  data() {
    const now = (/* @__PURE__ */ new Date()).getTime();
    let min = this.minDate;
    if (min <= 0) {
      min = now - 10 * 365 * 24 * 60 * 60 * 1e3;
    }
    let max = this.maxDate;
    if (max <= 0) {
      max = now + 10 * 365 * 24 * 60 * 60 * 1e3;
    }
    let defaultValue = this.modelValue;
    if (defaultValue <= 0) {
      defaultValue = now;
    }
    return {
      min,
      max,
      currentValue: this.parseValue(defaultValue, this.mode)
    };
  },
  methods: {
    parseValue(value, mode) {
      const date = new Date(value);
      if (mode === "date") {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
      } else if (mode === "time") {
        return [date.getHours(), date.getMinutes()];
      } else {
        return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()];
      }
    },
    formatValue(values, mode) {
      if (mode === "date") {
        const _a = common_vendor.__read(values, 3), y = _a[0], m = _a[1], d = _a[2];
        return new Date(y, m, d).getTime();
      } else if (mode === "time") {
        const _b = common_vendor.__read(values, 2), h_1 = _b[0], mi = _b[1];
        const date = /* @__PURE__ */ new Date();
        date.setHours(h_1);
        date.setMinutes(mi);
        return date.getTime();
      } else {
        const _c = common_vendor.__read(values, 5), y = _c[0], m = _c[1], d = _c[2], h_2 = _c[3], mi = _c[4];
        return new Date(y, m, d, h_2, mi).getTime();
      }
    },
    handleChange(e = null) {
      this.currentValue = e.detail.value;
    },
    handleConfirm() {
      const value = this.formatValue(this.currentValue, this.mode);
      const date = new Date(value);
      let text = "";
      if (this.mode === "date") {
        text = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
      } else if (this.mode === "time") {
        text = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
      } else {
        text = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
      }
      this.$emit("update:modelValue", value);
      this.$emit("confirm", new common_vendor.UTSJSONObject({
        value,
        text
      }));
      this.emitClose();
    },
    emitCancel() {
      this.$emit("cancel");
      this.emitClose();
    },
    emitClose() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  }
});
if (!Array) {
  const _easycom_m_popup2 = common_vendor.resolveComponent("m-popup");
  _easycom_m_popup2();
}
const _easycom_m_popup = () => "./components/m-popup/m-popup.js";
if (!Math) {
  _easycom_m_popup();
}
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.t($props.cancelText),
    b: common_vendor.o((...args) => $options.emitCancel && $options.emitCancel(...args), "21"),
    c: common_vendor.t($props.title),
    d: common_vendor.t($props.confirmText),
    e: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args), "db"),
    f: $data.currentValue,
    g: $props.mode,
    h: common_vendor.o((...args) => $options.handleChange && $options.handleChange(...args), "88"),
    i: common_vendor.gei(_ctx, ""),
    j: common_vendor.o($options.emitClose, "12"),
    k: common_vendor.p({
      show: $props.show,
      position: "bottom",
      round: true,
      closeable: true,
      id: common_vendor.gei(_ctx, ""),
      class: "data-v-f41743df"
    }),
    l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mDatetimePicker = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$Z, [["render", _sfc_render$_], ["__scopeId", "data-v-f41743df"]]);
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mDatetimePicker
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Y = common_vendor.defineComponent({
  name: "mDialog",
  emits: ["click", "close", "confirm", "cancel", "update:show", "update:visible"],
  props: {
    title: {
      type: String,
      default: ""
    },
    // 正文纯文本（与 content 插槽二选一，插槽优先）
    content: {
      type: String,
      default: ""
    },
    // 为 true 且未传 buttons 时，使用「取消 / 确定」并触发 cancel、confirm
    showCancel: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    // 与 show 等价，便于与演示页命名统一
    visible: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default() {
        return [];
      }
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    radius: {
      type: String,
      default: "12px"
    },
    titleColor: {
      type: String,
      default: "#333"
    },
    contentColor: {
      type: String,
      default: "#999"
    }
  },
  computed: {
    isOpen() {
      return this.show || this.visible;
    },
    effectiveButtons() {
      const list = this.buttons;
      if (this.showCancel && list.length === 0) {
        return [{ text: "取消" }, { text: "确定", color: "#586c94" }];
      }
      return list;
    },
    useDefaultConfirmPair() {
      return this.showCancel && this.buttons.length === 0;
    }
  },
  methods: {
    buttonTap(index) {
      const item = this.effectiveButtons[index];
      this.$emit("click", new common_vendor.UTSJSONObject({
        index,
        item
      }));
      if (this.useDefaultConfirmPair) {
        if (index === 0) {
          this.$emit("cancel");
        } else if (index === 1) {
          this.$emit("confirm");
        }
      }
      this.$emit("update:show", false);
      this.$emit("update:visible", false);
    },
    close() {
      if (!this.maskClosable)
        return null;
      this.$emit("close", new common_vendor.UTSJSONObject({}));
      this.$emit("update:show", false);
      this.$emit("update:visible", false);
    },
    stopEvent() {
    }
  }
});
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.isOpen
  }, $options.isOpen ? common_vendor.e({
    b: $props.title !== ""
  }, $props.title !== "" ? {
    c: common_vendor.t($props.title),
    d: $props.titleColor
  } : {}, {
    e: common_vendor.t($props.content),
    f: $props.title === "" ? 1 : "",
    g: $props.contentColor,
    h: $options.effectiveButtons.length > 0
  }, $options.effectiveButtons.length > 0 ? {
    i: common_vendor.f($options.effectiveButtons, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index,
        c: item.color || "#333",
        d: common_vendor.o(($event) => $options.buttonTap(index), index)
      };
    })
  } : {}, {
    j: $props.backgroundColor,
    k: $props.radius,
    l: common_vendor.o((...args) => $options.stopEvent && $options.stopEvent(...args), "3b")
  }) : {}, {
    m: $props.mask && $options.isOpen
  }, $props.mask && $options.isOpen ? {
    n: common_vendor.o((...args) => $options.close && $options.close(...args), "57")
  } : {}, {
    o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    p: `${_ctx.u_s_b_h}px`,
    q: `${_ctx.u_s_a_i_b}px`,
    r: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component$b = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$Y, [["render", _sfc_render$Z], ["__scopeId", "data-v-16aa4b6b"]]);
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$X = common_vendor.defineComponent({
  name: "mDiv",
  props: {
    // 分割线颜色
    backgroundColor: {
      type: String,
      default: ""
    },
    // 文字颜色
    textColor: {
      type: String,
      default: "#909399"
    },
    // 文字大小
    fontSize: {
      type: [Number, String],
      default: 28
    },
    // 分割线高度
    height: {
      type: String,
      default: "1rpx"
    },
    // 文字位置 left/center/right
    contentPosition: {
      type: String,
      default: "center"
    },
    // 文字内容
    text: {
      type: String,
      default: ""
    },
    // 文字自定义类名
    textClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    /** 是否有文案或默认插槽（与样式「断线」模式一致） */
    hasTextContent() {
      const t = this.text;
      if (t != null && ("" + t).length > 0) {
        return true;
      }
      const slot = this.$slots["default"];
      return slot != null;
    },
    rootStyle() {
      if (this.hasTextContent) {
        const lineColor = this.backgroundColor != null && ("" + this.backgroundColor).length > 0 ? this.backgroundColor : "#e4e7ed";
        const style_1 = new common_vendor.UTSJSONObject({});
        style_1["borderTopWidth"] = "1rpx";
        style_1["borderTopStyle"] = "solid";
        style_1["borderTopColor"] = lineColor;
        style_1["minHeight"] = "72rpx";
        style_1["height"] = "auto";
        style_1["backgroundColor"] = "transparent";
        style_1["boxSizing"] = "border-box";
        return style_1;
      }
      const style = new common_vendor.UTSJSONObject({});
      if (this.backgroundColor != null && ("" + this.backgroundColor).length > 0) {
        style["backgroundColor"] = this.backgroundColor;
      }
      style["height"] = this.height;
      return style;
    },
    getDividerClass() {
      const classes = ["m-div"];
      if (this.hasTextContent) {
        classes.push("m-div--has-text");
      }
      return classes.join(" ");
    },
    resolvedFontSize() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.fontSize);
    }
  }
});
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.contentPosition !== "center"
  }, $props.contentPosition !== "center" ? common_vendor.e({
    b: $props.text
  }, $props.text ? {
    c: common_vendor.t($props.text)
  } : {}, {
    d: common_vendor.n(`m-div__content--${$props.contentPosition}`),
    e: common_vendor.n($props.textClass ? $props.textClass : ""),
    f: $props.textColor,
    g: $options.resolvedFontSize
  }) : common_vendor.e({
    h: $props.text
  }, $props.text ? {
    i: common_vendor.t($props.text)
  } : {}, {
    j: common_vendor.n($props.textClass ? $props.textClass : ""),
    k: $props.textColor,
    l: $options.resolvedFontSize
  }), {
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: common_vendor.n($options.getDividerClass),
    o: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    p: common_vendor.s($options.rootStyle),
    q: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component$a = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$X, [["render", _sfc_render$Y], ["__scopeId", "data-v-c9c0d1ef"]]);
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$W = common_vendor.defineComponent({
  name: "mDropdownList",
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    top: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    selectHeight: {
      type: Number,
      default: 0
    },
    isMask: {
      type: Boolean,
      default: false
    },
    maskBackground: {
      type: String,
      default: "transparent"
    },
    /** 面板顶边相对触发器底边的额外间距（px），避免列表压住下拉框；默认 1，可设为 0 与框底紧贴 */
    offsetBottomPx: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      panelTopPx: 0,
      panelLeftPx: -1,
      panelWidthPx: -1,
      layoutReady: false
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.layoutReady = false;
        this.$nextTick(() => {
          this.measureAndShow();
        });
      } else {
        this.layoutReady = false;
      }
    }
  },
  computed: {
    panelBottomGapPx() {
      const o = this.offsetBottomPx;
      return o >= 0 ? o : 1;
    },
    panelFixedStyle() {
      const h = this.height;
      const st = new common_vendor.UTSJSONObject({
        position: "fixed",
        top: this.panelTopPx + "px",
        "z-index": "1002"
      });
      const lw = this.panelLeftPx;
      const ww = this.panelWidthPx;
      if (lw >= 0 && ww > 0) {
        st["left"] = lw + "px";
        st["width"] = ww + "px";
        st["right"] = "auto";
      } else {
        st["left"] = "0";
        st["right"] = "0";
        st["width"] = "auto";
      }
      if (h > 0) {
        const px = common_vendor.index.rpx2px(h);
        if (px != null && px > 0) {
          st["height"] = px + "px";
        } else {
          st["height"] = h + "rpx";
        }
      }
      return st;
    }
  },
  methods: {
    measureAndShow() {
      const that = this;
      setTimeout(function() {
        if (that.show && !that.layoutReady) {
          that.applyFallbackLayout();
          that.layoutReady = true;
        }
      }, 320);
      const runQuery = function() {
        const q = common_vendor.index.createSelectorQuery().in(that);
        q.select(".m-dropdown-list__trigger").boundingClientRect(function(rect = null) {
          if (!that.show) {
            return null;
          }
          if (rect != null) {
            const t = rect.top;
            const hh = rect.height;
            const l = rect.left;
            const w = rect.width;
            const gap = that.panelBottomGapPx;
            that.panelTopPx = Math.ceil(t + hh) + gap;
            if (w > 0) {
              that.panelLeftPx = l;
              that.panelWidthPx = w;
            } else {
              that.panelLeftPx = -1;
              that.panelWidthPx = -1;
            }
            that.layoutReady = true;
          } else {
            setTimeout(function() {
              if (!that.show) {
                return null;
              }
              const q2 = common_vendor.index.createSelectorQuery().in(that);
              q2.select(".m-dropdown-list__trigger").boundingClientRect(function(rect2 = null) {
                if (!that.show) {
                  return null;
                }
                if (rect2 != null) {
                  const t2 = rect2.top;
                  const hh2 = rect2.height;
                  const l2 = rect2.left;
                  const w2 = rect2.width;
                  const gap2 = that.panelBottomGapPx;
                  that.panelTopPx = Math.ceil(t2 + hh2) + gap2;
                  if (w2 > 0) {
                    that.panelLeftPx = l2;
                    that.panelWidthPx = w2;
                  } else {
                    that.panelLeftPx = -1;
                    that.panelWidthPx = -1;
                  }
                } else {
                  that.applyFallbackLayout();
                }
                that.layoutReady = true;
              });
              q2.exec();
            }, 48);
          }
        });
        q.exec();
      };
      this.$nextTick(() => {
        this.$nextTick(() => {
          setTimeout(function() {
            runQuery();
          }, 32);
        });
      });
    },
    applyFallbackLayout() {
      const tProp = this.top;
      let px = common_vendor.index.rpx2px(tProp > 0 ? tProp : 88);
      if (px == null || px <= 0) {
        px = 88;
      }
      this.panelTopPx = px;
      this.panelLeftPx = -1;
      this.panelWidthPx = -1;
    },
    onMaskTap() {
      this.$emit("close");
    }
  }
});
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show ? 1 : "",
    b: $props.show
  }, $props.show ? common_vendor.e({
    c: $props.isMask
  }, $props.isMask ? {
    d: $props.maskBackground,
    e: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "95")
  } : {}) : {}, {
    f: $props.show && $data.layoutReady
  }, $props.show && $data.layoutReady ? {
    g: common_vendor.s($options.panelFixedStyle)
  } : {}, {
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mDropdownList = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$W, [["render", _sfc_render$X]]);
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mDropdownList
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$V = common_vendor.defineComponent({
  name: "mEmpty",
  props: {
    // 图片地址
    image: {
      type: String,
      default: ""
    },
    // 提示文字
    description: {
      type: String,
      default: "暂无数据"
    },
    // 与 description 相同含义，非空时优先于 description（便于简写）
    text: {
      type: String,
      default: ""
    },
    /** m-icon 的 name；不传 image 且未指定 icon 时使用 mUi.emptyDefaultIcon（默认 file-common-filling） */
    icon: {
      type: String,
      default: ""
    },
    // 图片距离顶部的距离
    paddingTop: {
      type: [Number, String],
      default: 200
    }
  },
  computed: {
    paddingTopCss() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.paddingTop);
    },
    displayText() {
      const t = this.text.trim();
      if (t.length > 0) {
        return t;
      }
      return this.description;
    },
    /** 未传 icon 时使用 config.uts 的 emptyDefaultIcon（图标字体，不依赖静态 PNG） */
    resolvedIconName() {
      const ic = this.icon.trim();
      if (ic.length > 0) {
        return ic;
      }
      return uni_modules_mUnix_config.getMUiConfig().emptyDefaultIcon;
    },
    showIconBlock() {
      return this.image.trim().length === 0;
    },
    hasBottomSlot() {
      return this.$slots["footer"] != null || this.$slots.default != null;
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$e = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$e();
}
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.image !== ""
  }, $props.image !== "" ? {
    b: $props.image
  } : {}, {
    c: $options.showIconBlock
  }, $options.showIconBlock ? {
    d: common_vendor.p({
      name: $options.resolvedIconName,
      size: "96rpx",
      color: "#c0c4cc",
      class: "data-v-e1e0b773"
    })
  } : {}, {
    e: common_vendor.t($options.displayText),
    f: $options.hasBottomSlot
  }, $options.hasBottomSlot ? {} : {}, {
    g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    h: common_vendor.s({
      paddingTop: $options.paddingTopCss
    }),
    i: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mEmpty = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$V, [["render", _sfc_render$W], ["__scopeId", "data-v-e1e0b773"]]);
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mEmpty
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$U = common_vendor.defineComponent({
  name: "mFab",
  emits: ["click", "dragend"],
  props: {
    left: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: [Number, String],
      default: 80
    },
    bottom: {
      type: [Number, String],
      default: 100
    },
    top: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: 997
    },
    width: {
      type: [Number, String],
      default: 80
    },
    height: {
      type: [Number, String],
      default: 80
    },
    radius: {
      type: String,
      default: "50%"
    },
    custom: {
      type: Boolean,
      default: false
    },
    /** m-icon 名称；非空且非 custom 时显示图标，否则显示「+」 */
    icon: {
      type: String,
      default: ""
    },
    /** 主按钮图标字号（rpx，与 m-icon size 一致） */
    iconSize: {
      type: [Number, String],
      default: 52
    },
    /** 为 true 时可按住主按钮拖动，松手后可选吸边 */
    draggable: {
      type: Boolean,
      default: false
    },
    /** 拖动结束后是否吸附到左右近侧（需 draggable） */
    snapEdge: {
      type: Boolean,
      default: true
    },
    /** 吸边与拖动边界留白（rpx） */
    snapPadding: {
      type: [Number, String],
      default: 16
    },
    bgColor: {
      type: String,
      default: "#5677fc"
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    btnList: {
      type: Array,
      default() {
        return [];
      }
    },
    textField: {
      type: String,
      default: "text"
    },
    imgField: {
      type: String,
      default: "imgUrl"
    },
    size: {
      type: [Number, String],
      default: 28
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false,
      winW: 0,
      winH: 0,
      dragLeftPx: 0,
      dragTopPx: 0,
      dragReady: false,
      wrapWpx: 0,
      wrapHpx: 0,
      dragStartTouchX: 0,
      dragStartTouchY: 0,
      dragStartLeftPx: 0,
      dragStartTopPx: 0,
      dragMoved: false,
      dragSuppressedTap: false
    };
  },
  computed: {
    iconName() {
      const s = this.icon;
      if (s == null) {
        return "";
      }
      const t = s.trim();
      return t;
    },
    baseZ() {
      const zi = this.zIndex;
      const n = typeof zi === "number" ? zi : parseInt("" + zi);
      return isNaN(n) ? 997 : n;
    },
    maskZIndex() {
      return this.baseZ - 1;
    },
    wrapStyle() {
      if (this.draggable) {
        const st_1 = new common_vendor.UTSJSONObject({});
        st_1["zIndex"] = this.baseZ;
        st_1["position"] = "fixed";
        st_1["left"] = this.dragLeftPx + "px";
        st_1["top"] = this.dragTopPx + "px";
        st_1["right"] = "auto";
        st_1["bottom"] = "auto";
        st_1["display"] = "flex";
        st_1["flexDirection"] = "column";
        st_1["alignItems"] = "flex-end";
        return st_1;
      }
      const st = new common_vendor.UTSJSONObject({});
      st["zIndex"] = this.baseZ;
      st["position"] = "fixed";
      const t = this.top;
      const tp = typeof t === "number" ? t : parseInt("" + t);
      if (!isNaN(tp) && tp > 0) {
        st["top"] = t + "rpx";
        st["bottom"] = "auto";
      } else {
        st["bottom"] = this.bottom + "rpx";
      }
      const l = this.left;
      const ln = typeof l === "number" ? l : parseInt("" + l);
      if (!isNaN(ln) && ln > 0) {
        st["left"] = l + "rpx";
        st["right"] = "auto";
      } else {
        st["right"] = this.right + "rpx";
        st["left"] = "auto";
      }
      st["display"] = "flex";
      st["flexDirection"] = "column";
      st["alignItems"] = "flex-end";
      return st;
    },
    mainStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["width"] = this.width + "rpx";
      st["height"] = this.height + "rpx";
      st["borderRadius"] = this.radius;
      st["backgroundColor"] = this.bgColor;
      return st;
    },
    /** 内置图标/「+」时子节点不抢触摸；custom 插槽不关闭子节点事件 */
    mainDragClass() {
      const out = [];
      out.push("m-fab__main");
      const d = this.draggable;
      if (d) {
        out.push("m-fab__main--drag");
        if (!this.custom) {
          out.push("m-fab__main--drag-pass");
        }
      }
      return out;
    }
  },
  watch: {
    expanded() {
      this.$nextTick(() => {
        this.measureWrapSize();
      });
    }
  },
  mounted() {
    this.initDragMetrics();
    this.$nextTick(() => {
      this.measureWrapSize();
    });
  },
  methods: {
    snapPaddingRpx() {
      const sp = this.snapPadding;
      const n = typeof sp === "number" ? sp : parseInt("" + sp);
      return isNaN(n) ? 16 : n;
    },
    mainWidthPx() {
      const w = this.width;
      const n = typeof w === "number" ? w : parseInt("" + w);
      return common_vendor.index.rpx2px(isNaN(n) ? 108 : n);
    },
    mainHeightPx() {
      const h = this.height;
      const n = typeof h === "number" ? h : parseInt("" + h);
      return common_vendor.index.rpx2px(isNaN(n) ? 108 : n);
    },
    wrapWOrDefault() {
      if (this.wrapWpx > 0) {
        return this.wrapWpx;
      }
      return this.mainWidthPx();
    },
    wrapHOrDefault() {
      if (this.wrapHpx > 0) {
        return this.wrapHpx;
      }
      return this.mainHeightPx();
    },
    initDragMetrics() {
      if (!this.draggable) {
        return null;
      }
      const sys = common_vendor.index.getSystemInfoSync();
      this.winW = sys.windowWidth;
      this.winH = sys.windowHeight;
      const fabW = this.mainWidthPx();
      const fabH = this.mainHeightPx();
      const t = this.top;
      const tp = typeof t === "number" ? t : parseInt("" + t);
      const l = this.left;
      const ln = typeof l === "number" ? l : parseInt("" + l);
      const r = this.right;
      const rn = typeof r === "number" ? r : parseInt("" + r);
      const b = this.bottom;
      const bn = typeof b === "number" ? b : parseInt("" + b);
      if (!isNaN(tp) && tp > 0) {
        const lr = !isNaN(ln) && ln > 0 ? common_vendor.index.rpx2px(ln) : common_vendor.index.rpx2px(80);
        this.dragLeftPx = lr;
        this.dragTopPx = common_vendor.index.rpx2px(tp);
      } else {
        this.dragTopPx = this.winH - fabH - common_vendor.index.rpx2px(isNaN(bn) ? 100 : bn);
        if (!isNaN(ln) && ln > 0) {
          this.dragLeftPx = common_vendor.index.rpx2px(ln);
        } else {
          this.dragLeftPx = this.winW - fabW - common_vendor.index.rpx2px(isNaN(rn) ? 80 : rn);
        }
      }
      this.dragReady = true;
    },
    measureWrapSize() {
      const self = this;
      try {
        const q = common_vendor.index.createSelectorQuery().in(self);
        q.select(".m-fab__wrap").boundingClientRect((rect = null) => {
          if (rect == null) {
            return null;
          }
          const w = rect.width;
          const h = rect.height;
          if (w > 0 && h > 0) {
            self.wrapWpx = w;
            self.wrapHpx = h;
          }
        }).exec();
      } catch (_e) {
      }
    },
    applySnap() {
      const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
      const w = this.wrapWOrDefault();
      const cx = this.dragLeftPx + w / 2;
      if (cx < this.winW / 2) {
        this.dragLeftPx = pad;
      } else {
        this.dragLeftPx = this.winW - w - pad;
      }
      const h = this.wrapHOrDefault();
      this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad));
    },
    /** 与 m-swipe-action 一致：优先 clientX/Y，兼容 pageX/Y（各端触摸对象字段不一致） */
    touchClientXY(e = null) {
      const touches = e["touches"];
      if (touches == null || touches.length == 0) {
        return null;
      }
      const t0 = touches[0];
      let x = t0["clientX"];
      let y = t0["clientY"];
      if (x == null) {
        x = t0["pageX"];
      }
      if (y == null) {
        y = t0["pageY"];
      }
      if (x == null || y == null) {
        return null;
      }
      return [x, y];
    },
    onDragStart(e = null) {
      if (!this.draggable) {
        return null;
      }
      if (this.winW <= 0 || this.winH <= 0) {
        this.initDragMetrics();
      }
      const xy = this.touchClientXY(e);
      if (xy == null) {
        return null;
      }
      this.dragStartTouchX = xy[0];
      this.dragStartTouchY = xy[1];
      this.dragStartLeftPx = this.dragLeftPx;
      this.dragStartTopPx = this.dragTopPx;
      this.dragMoved = false;
    },
    onDragMove(e = null) {
      if (!this.draggable) {
        return null;
      }
      const xy = this.touchClientXY(e);
      if (xy == null) {
        return null;
      }
      const dx = xy[0] - this.dragStartTouchX;
      const dy = xy[1] - this.dragStartTouchY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        this.dragMoved = true;
      }
      const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
      const w = this.wrapWOrDefault();
      const h = this.wrapHOrDefault();
      let nx = this.dragStartLeftPx + dx;
      let ny = this.dragStartTopPx + dy;
      nx = Math.max(pad, Math.min(nx, this.winW - w - pad));
      ny = Math.max(pad, Math.min(ny, this.winH - h - pad));
      this.dragLeftPx = nx;
      this.dragTopPx = ny;
    },
    onDragEnd() {
      if (!this.draggable) {
        return null;
      }
      const didMove = this.dragMoved;
      if (didMove && this.snapEdge) {
        this.applySnap();
      }
      if (didMove) {
        this.dragSuppressedTap = true;
        this.$emit("dragend", new common_vendor.UTSJSONObject({
          leftPx: this.dragLeftPx,
          topPx: this.dragTopPx
        }));
        const self_1 = this;
        setTimeout(() => {
          self_1.dragSuppressedTap = false;
        }, 120);
      }
      this.dragMoved = false;
    },
    subText(btn) {
      const k = this.textField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    subImg(btn) {
      const k = this.imgField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    subColor(btn) {
      const c = btn["color"];
      return c == null ? "#ffffff" : "" + c;
    },
    subFontSize(btn) {
      const fs = btn["fontSize"];
      if (fs != null) {
        const n = typeof fs === "number" ? fs : parseInt("" + fs);
        if (!isNaN(n)) {
          return n;
        }
      }
      const d = this.size;
      return typeof d === "number" ? d : parseInt("" + d);
    },
    subStyle(btn) {
      const st = new common_vendor.UTSJSONObject({});
      const bg = btn["bgColor"];
      st["backgroundColor"] = bg == null ? "#16c2c2" : "" + bg;
      return st;
    },
    collapse() {
      this.expanded = false;
    },
    onMainTap() {
      if (this.dragSuppressedTap) {
        return null;
      }
      const list = this.btnList;
      if (list.length > 0) {
        this.expanded = !this.expanded;
        this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
        return null;
      }
      this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
    },
    onSubTap(idx) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx + 1 }));
      this.expanded = false;
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$d = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$d();
}
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $data.expanded && $props.maskClosable
  }, $data.expanded && $props.maskClosable ? {
    b: $options.maskZIndex,
    c: common_vendor.o((...args) => $options.collapse && $options.collapse(...args), "b6")
  } : {}, {
    d: $props.btnList.length > 0
  }, $props.btnList.length > 0 ? {
    e: common_vendor.f($props.btnList, (btn, idx, i0) => {
      return common_vendor.e({
        a: $options.subImg(btn) !== ""
      }, $options.subImg(btn) !== "" ? {
        b: $options.subImg(btn)
      } : {}, {
        c: common_vendor.t($options.subText(btn)),
        d: $options.subColor(btn),
        e: $options.subFontSize(btn) + "rpx",
        f: idx,
        g: common_vendor.s($options.subStyle(btn)),
        h: common_vendor.o(($event) => $options.onSubTap(idx), idx)
      });
    }),
    f: $data.expanded
  } : {}, {
    g: $props.custom
  }, $props.custom ? {} : $options.iconName !== "" ? {
    i: common_vendor.p({
      name: $options.iconName,
      size: $props.iconSize,
      color: $props.color
    })
  } : {
    j: $props.color
  }, {
    h: $options.iconName !== "",
    k: common_vendor.n($options.mainDragClass),
    l: common_vendor.s($options.mainStyle),
    m: common_vendor.o((...args) => $options.onMainTap && $options.onMainTap(...args), "69"),
    n: common_vendor.o((...args) => $options.onDragStart && $options.onDragStart(...args), "68"),
    o: common_vendor.o((...args) => $options.onDragMove && $options.onDragMove(...args), "7b"),
    p: common_vendor.o((...args) => $options.onDragEnd && $options.onDragEnd(...args), "70"),
    q: common_vendor.o((...args) => $options.onDragEnd && $options.onDragEnd(...args), "a1"),
    r: common_vendor.s($options.wrapStyle),
    s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    t: `${_ctx.u_s_b_h}px`,
    v: `${_ctx.u_s_a_i_b}px`,
    w: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component$9 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$U, [["render", _sfc_render$V]]);
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$9
}, Symbol.toStringTag, { value: "Module" }));
class FeedCommentItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          author: { type: String, optional: false },
          replyTo: { type: String, optional: false },
          text: { type: String, optional: false }
        };
      },
      name: "FeedCommentItem"
    };
  }
  constructor(options, metadata = FeedCommentItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.author = this.__props__.author;
    this.replyTo = this.__props__.replyTo;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
const _sfc_main$T = common_vendor.defineComponent({
  name: "mFeedPost",
  emits: [
    "avatar-tap",
    "content-tap",
    "image-tap",
    "like",
    "comment",
    "collect",
    "comment-reply",
    "update:liked",
    "update:collected",
    "update:likeCount",
    "update:likerNames"
  ],
  props: {
    postKey: {
      type: String,
      default: "0"
    },
    avatar: {
      type: String,
      default: ""
    },
    nickname: {
      type: String,
      default: ""
    },
    timeLabel: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    imageUrls: {
      type: Array,
      default: () => {
        return [];
      }
    },
    videoSrc: {
      type: String,
      default: ""
    },
    maxPreviewImages: {
      type: Number,
      default: 9
    },
    liked: {
      type: Boolean,
      default: false
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    collected: {
      type: Boolean,
      default: false
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      default: "#ff0844"
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    likerNames: {
      type: Array,
      default: () => {
        return [];
      }
    },
    comments: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    showSocialExtra() {
      const ln = this.likerNames != null ? this.likerNames.length : 0;
      const cn = this.comments != null ? this.comments.length : 0;
      return ln > 0 || cn > 0;
    },
    likerLine() {
      if (this.likerNames == null || this.likerNames.length === 0) {
        return "";
      }
      return this.likerNames.join("、");
    },
    safeComments() {
      const out = [];
      if (this.comments == null) {
        return out;
      }
      for (let i = 0; i < this.comments.length; i++) {
        const x = this.comments[i];
        if (x != null) {
          out.push(x);
        }
      }
      return out;
    },
    showVideo() {
      return this.videoSrc != null && this.videoSrc !== "";
    },
    imageCount() {
      if (this.imageUrls == null) {
        return 0;
      }
      return this.imageUrls.length;
    },
    maxImages() {
      const cap = this.maxPreviewImages;
      if (cap <= 0) {
        return 0;
      }
      const n = this.imageCount;
      if (n <= cap) {
        return n;
      }
      return cap;
    },
    overflowCount() {
      const n = this.imageCount;
      const cap = this.maxPreviewImages;
      if (n <= cap) {
        return 0;
      }
      return n - cap;
    },
    displayImageIndexes() {
      const out = [];
      const m = this.maxImages;
      for (let i = 0; i < m; i++) {
        out.push(i);
      }
      return out;
    },
    lastDisplayIndex() {
      const m = this.maxImages;
      if (m <= 0) {
        return -1;
      }
      return m - 1;
    },
    gridClass() {
      const n = this.maxImages;
      if (n <= 0) {
        return "";
      }
      if (n === 1) {
        return "m-feed-post__media--one";
      }
      if (n === 2) {
        return "m-feed-post__media--two";
      }
      if (n === 4) {
        return "m-feed-post__media--four";
      }
      return "m-feed-post__media--grid";
    },
    rootMergedStyle() {
      const st = new common_vendor.UTSJSONObject({});
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    likedTextStyle() {
      if (this.liked) {
        return "color:" + this.activeColor;
      }
      return "";
    },
    collectedTextStyle() {
      if (this.collected) {
        return "color:" + this.activeColor;
      }
      return "";
    }
  },
  methods: {
    formatCount(n) {
      if (n == null || n < 0) {
        return "0";
      }
      if (n < 1e4) {
        return "" + n;
      }
      const w = n / 1e4;
      return w.toFixed(1) + "万";
    },
    onAvatarTap() {
      this.$emit("avatar-tap");
    },
    onContentTap() {
      this.$emit("content-tap");
    },
    onImageTap(idx) {
      this.$emit("image-tap", this.postKey, idx);
    },
    toggleSelfInLikerNames(names = null, add) {
      const base = [];
      if (names != null) {
        for (let i = 0; i < names.length; i++) {
          base.push(names[i]);
        }
      }
      if (add) {
        let has = false;
        for (let j = 0; j < base.length; j++) {
          if (base[j] === "我") {
            has = true;
            break;
          }
        }
        if (!has) {
          base.push("我");
        }
        return base;
      }
      const out = [];
      for (let k = 0; k < base.length; k++) {
        if (base[k] !== "我") {
          out.push(base[k]);
        }
      }
      return out;
    },
    onLikeTap() {
      const nextLiked = !this.liked;
      let nextCount = this.likeCount;
      if (nextLiked) {
        nextCount = nextCount + 1;
      } else {
        nextCount = nextCount - 1;
        if (nextCount < 0) {
          nextCount = 0;
        }
      }
      const nextNames = this.toggleSelfInLikerNames(this.likerNames, nextLiked);
      this.$emit("update:liked", nextLiked);
      this.$emit("update:likeCount", nextCount);
      this.$emit("update:likerNames", nextNames);
      this.$emit("like");
    },
    onCommentTap() {
      this.$emit("comment");
    },
    onCollectTap() {
      this.$emit("update:collected", !this.collected);
      this.$emit("collect");
    },
    onCommentRowTap(c) {
      if (c == null) {
        return null;
      }
      this.$emit("comment-reply", this.postKey, c.id, c.author);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$c = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$c();
}
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.avatar,
    b: common_vendor.t($props.nickname),
    c: common_vendor.t($props.timeLabel),
    d: common_vendor.o((...args) => $options.onAvatarTap && $options.onAvatarTap(...args), "ba"),
    e: $props.content !== ""
  }, $props.content !== "" ? {
    f: common_vendor.t($props.content),
    g: common_vendor.o((...args) => $options.onContentTap && $options.onContentTap(...args), "24")
  } : {}, {
    h: $options.showVideo
  }, $options.showVideo ? {
    i: $props.videoSrc
  } : $options.imageCount > 0 ? {
    k: common_vendor.f($options.displayImageIndexes, (idx, k0, i0) => {
      return common_vendor.e({
        a: $props.imageUrls[idx],
        b: idx === $options.lastDisplayIndex && $options.overflowCount > 0
      }, idx === $options.lastDisplayIndex && $options.overflowCount > 0 ? {
        c: common_vendor.t($options.overflowCount)
      } : {}, {
        d: "mfp-img-" + $props.postKey + "-" + idx,
        e: common_vendor.o(($event) => $options.onImageTap(idx), "mfp-img-" + $props.postKey + "-" + idx)
      });
    }),
    l: common_vendor.n($options.gridClass)
  } : {}, {
    j: $options.imageCount > 0,
    m: $props.showToolbar
  }, $props.showToolbar ? {
    n: common_vendor.p({
      name: "fabulous",
      size: "36rpx",
      color: $props.liked ? $props.activeColor : "#666666",
      class: "data-v-53cb1cd9"
    }),
    o: common_vendor.t($options.formatCount($props.likeCount)),
    p: common_vendor.s($options.likedTextStyle),
    q: common_vendor.o((...args) => $options.onLikeTap && $options.onLikeTap(...args), "ba"),
    r: common_vendor.p({
      name: "message",
      size: "36rpx",
      color: "#666666",
      class: "data-v-53cb1cd9"
    }),
    s: common_vendor.t($options.formatCount($props.commentCount)),
    t: common_vendor.o((...args) => $options.onCommentTap && $options.onCommentTap(...args), "9e"),
    v: common_vendor.p({
      name: "star",
      size: "36rpx",
      color: $props.collected ? $props.activeColor : "#666666",
      class: "data-v-53cb1cd9"
    }),
    w: common_vendor.s($options.collectedTextStyle),
    x: common_vendor.o((...args) => $options.onCollectTap && $options.onCollectTap(...args), "aa")
  } : {}, {
    y: $options.showSocialExtra
  }, $options.showSocialExtra ? common_vendor.e({
    z: $props.likerNames.length > 0
  }, $props.likerNames.length > 0 ? {
    A: common_vendor.p({
      name: "fabulous",
      size: "28rpx",
      color: $props.activeColor,
      class: "data-v-53cb1cd9"
    }),
    B: common_vendor.t($options.likerLine)
  } : {}, {
    C: common_vendor.f($options.safeComments, (c, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(c.author),
        b: c.replyTo !== ""
      }, c.replyTo !== "" ? {} : {}, {
        c: c.replyTo !== ""
      }, c.replyTo !== "" ? {
        d: common_vendor.t(c.replyTo)
      } : {}, {
        e: common_vendor.t(c.text),
        f: "cmt-" + $props.postKey + "-" + c.id,
        g: common_vendor.o(($event) => $options.onCommentRowTap(c), "cmt-" + $props.postKey + "-" + c.id)
      });
    })
  }) : {}, {
    D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    E: common_vendor.s($options.rootMergedStyle),
    F: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    G: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mFeedPost = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$T, [["render", _sfc_render$U], ["__scopeId", "data-v-53cb1cd9"]]);
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mFeedPost
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$S = common_vendor.defineComponent({
  name: "mForm",
  emits: [],
  props: {
    /** 表单顶部标题，空则不显示 */
    title: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    /** 圆角，rpx */
    radius: {
      type: [Number, String],
      default: 16
    },
    /** 外层与屏幕边缘留白，rpx */
    marginX: {
      type: [Number, String],
      default: 24
    },
    /** 内边距，如 0 或 10rpx 0 */
    padding: {
      type: String,
      default: "0"
    }
  },
  computed: {
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.backgroundColor,
        borderRadius: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius),
        marginLeft: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginX),
        marginRight: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginX),
        padding: this.padding,
        overflow: "hidden"
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    }
  }
});
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.title !== ""
  }, $props.title !== "" ? {
    b: common_vendor.t($props.title)
  } : {}, {
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: common_vendor.s($options.rootStyle),
    e: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mForm = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$S, [["render", _sfc_render$T], ["__scopeId", "data-v-57a4a462"]]);
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mForm
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$R = common_vendor.defineComponent({
  name: "mGap",
  props: {
    // 高度，单位rpx
    height: {
      type: [Number, String],
      default: 20
    },
    // 背景颜色
    background: {
      type: String,
      default: "transparent"
    }
  },
  computed: {
    gapStyle() {
      return new common_vendor.UTSJSONObject({
        height: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height),
        backgroundColor: this.background
      });
    }
  }
});
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.s($options.gapStyle),
    c: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mGap = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$R, [["render", _sfc_render$S], ["__scopeId", "data-v-ac395311"]]);
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mGap
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Q = common_vendor.defineComponent({
  name: "mGridItem",
  emits: ["click"],
  inject: {
    mGridBorder: new common_vendor.UTSJSONObject({
      from: "mGridBorder",
      default: null,
      type: Boolean
    })
  },
  props: {
    // 图标名称
    icon: {
      type: String,
      default: ""
    },
    // 文字
    text: {
      type: String,
      default: ""
    },
    // 图标大小
    iconSize: {
      type: String,
      default: "48rpx"
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: "#333333"
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 跳转链接
    url: {
      type: String,
      default: ""
    },
    // 跳转类型
    linkType: {
      type: String,
      default: "navigateTo"
    }
  },
  computed: {
    showItemBorder() {
      const fromGrid = this.mGridBorder;
      if (fromGrid !== null && fromGrid !== void 0) {
        return fromGrid;
      }
      return this.border;
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
      if (this.url) {
        if (this.linkType === "navigateTo") {
          common_vendor.index.navigateTo({ url: this.url });
        } else if (this.linkType === "redirectTo") {
          common_vendor.index.redirectTo({ url: this.url });
        } else if (this.linkType === "switchTab") {
          common_vendor.index.switchTab({ url: this.url });
        }
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$b = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$b();
}
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      name: $props.icon,
      size: $props.iconSize,
      color: $props.iconColor,
      class: "data-v-37451f6f"
    })
  } : {}, {
    c: common_vendor.t($props.text),
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    e: $options.showItemBorder ? 1 : "",
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    g: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "22"),
    h: `${_ctx.u_s_b_h}px`,
    i: `${_ctx.u_s_a_i_b}px`
  });
}
const mGridItem = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$Q, [["render", _sfc_render$R], ["__scopeId", "data-v-37451f6f"]]);
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mGridItem
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$P = common_vendor.defineComponent({
  name: "mGrid",
  emits: ["click"],
  provide() {
    return {
      mGridBorder: this.border
    };
  },
  props: {
    // 宫格列数
    col: {
      type: [Number, String],
      default: 4
    },
    // 宫格列数（别名）
    column: {
      type: [Number, String],
      default: 4
    },
    // 宫格数据
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否固定为正方形
    square: {
      type: Boolean,
      default: false
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    actualCol() {
      var _a;
      const c = (_a = this.column) !== null && _a !== void 0 ? _a : this.col;
      return typeof c === "string" ? parseInt(c) : c;
    },
    gridStyle() {
      return "--col-num: " + this.actualCol + ";";
    }
  },
  methods: {
    handleItemClick(item = null, index) {
      this.$emit("click", new common_vendor.UTSJSONObject({ item, index }));
    }
  }
});
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.text),
        c: "item-" + i0,
        d: common_vendor.r("item", {
          item,
          index
        }, i0),
        e: index,
        f: common_vendor.o(($event) => $options.handleItemClick(item, index), index)
      };
    }),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    c: $props.border ? 1 : "",
    d: $props.square ? 1 : "",
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    f: common_vendor.s($options.gridStyle),
    g: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  };
}
const mGrid = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$P, [["render", _sfc_render$Q], ["__scopeId", "data-v-ce7853b0"]]);
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mGrid
}, Symbol.toStringTag, { value: "Module" }));
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
const _sfc_main$O = common_vendor.defineComponent({
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
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
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
const Component$8 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$O, [["render", _sfc_render$P]]);
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$N = common_vendor.defineComponent({
  name: "mInput",
  emits: ["update:modelValue", "input", "focus", "blur", "confirm", "clear"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    /** 左侧标题，空则不占标题列 */
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    requiredColor: {
      type: String,
      default: "#EB0909"
    },
    labelSize: {
      type: [Number, String],
      default: 32
    },
    labelColor: {
      type: String,
      default: "#333333"
    },
    /** 标题最小宽度，单位 rpx */
    labelWidth: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    placeholderColor: {
      type: String,
      default: "#c0c4cc"
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** 最大长度；-1 表示不限制（内部用大值透传） */
    maxlength: {
      type: [Number, String],
      default: 140
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearSize: {
      type: [Number, String],
      default: 30
    },
    clearColor: {
      type: String,
      default: "#bfbfbf"
    },
    confirmType: {
      type: String,
      default: "done"
    },
    cursorSpacing: {
      type: Number,
      default: 0
    },
    /** 输入框字号，rpx */
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: "#333333"
    },
    textRight: {
      type: Boolean,
      default: false
    },
    /** 失去焦点时去除首尾空格 */
    trim: {
      type: Boolean,
      default: true
    },
    borderTop: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.08)"
    },
    /** 整行背景 */
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    /** 行内水平内边距，如 26rpx 30rpx */
    padding: {
      type: String,
      default: "26rpx 30rpx"
    },
    /** 圆角，rpx；0 表示方角 */
    radius: {
      type: [Number, String],
      default: 0
    },
    /** 是否描边包裹输入区域（细边框） */
    inputBorder: {
      type: Boolean,
      default: false
    },
    /** 底部校验文案 */
    error: {
      type: String,
      default: ""
    },
    /** 与上一条字段的间距，rpx */
    marginTop: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      innerValue: ""
    };
  },
  computed: {
    inputType() {
      return this.type;
    },
    maxlengthResolved() {
      const m = this.maxlength;
      if (typeof m === "number") {
        if (m < 0) {
          return 99999;
        }
        return m;
      }
      const s = m.trim();
      if (s === "-1") {
        return 99999;
      }
      const n = parseInt(s);
      if (isNaN(n)) {
        return 140;
      }
      if (n < 0) {
        return 99999;
      }
      return n;
    },
    placeholderStyleResolved() {
      if (this.placeholderStyle !== "") {
        return this.placeholderStyle;
      }
      return "font-size:" + uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size) + ";color:" + this.placeholderColor;
    },
    clearSizeStr() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.clearSize);
    },
    labelWrapStyle() {
      return new common_vendor.UTSJSONObject({ minWidth: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.labelWidth) });
    },
    labelTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.labelSize),
        color: this.labelColor
      });
    },
    fieldMergedStyle() {
      const st = new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color
      });
      if (this.inputBorder) {
        st["borderWidth"] = "1rpx";
        st["borderStyle"] = "solid";
        st["borderColor"] = this.borderColor;
        st["borderRadius"] = "8rpx";
        st["paddingLeft"] = "16rpx";
        st["paddingRight"] = "16rpx";
      }
      return st;
    },
    rowStyle() {
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.backgroundColor,
        padding: this.padding
      });
      const r = this.radius;
      let rn = 0;
      if (typeof r === "number") {
        rn = r;
      } else {
        const rs = r.replace("rpx", "").trim();
        const p = parseInt(rs);
        if (!isNaN(p)) {
          rn = p;
        }
      }
      if (rn > 0) {
        st["borderRadius"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(r);
      }
      if (this.borderTop) {
        st["borderTopWidth"] = "1rpx";
        st["borderTopStyle"] = "solid";
        st["borderTopColor"] = this.borderColor;
      }
      if (this.borderBottom) {
        st["borderBottomWidth"] = "1rpx";
        st["borderBottomStyle"] = "solid";
        st["borderBottomColor"] = this.borderColor;
      }
      return st;
    },
    rootMarginStyle() {
      const mt = this.marginTop;
      let n = 0;
      if (typeof mt === "number") {
        n = mt;
      } else {
        const p = parseInt(mt.replace("rpx", "").trim());
        if (!isNaN(p)) {
          n = p;
        }
      }
      if (n > 0) {
        return new common_vendor.UTSJSONObject({ marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(mt) });
      }
      return new common_vendor.UTSJSONObject({});
    }
  },
  watch: {
    modelValue(val) {
      this.innerValue = val;
    }
  },
  created() {
    this.innerValue = this.modelValue;
  },
  methods: {
    emitValue(next) {
      this.$emit("update:modelValue", next);
      this.$emit("input", next);
    },
    onInput(_e = null) {
      this.emitValue(this.innerValue);
    },
    onFocus(e = null) {
      this.$emit("focus", e);
    },
    onBlur(e = null) {
      let v = this.innerValue;
      if (this.trim) {
        v = v.trim();
        if (v !== this.innerValue) {
          this.innerValue = v;
          this.emitValue(v);
        }
      }
      this.$emit("blur", e);
    },
    onConfirm(_e = null) {
      this.$emit("confirm", this.innerValue);
    },
    onClear() {
      this.innerValue = "";
      this.emitValue("");
      this.$emit("clear", "");
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$a = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$a();
}
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.label !== "" || $props.required
  }, $props.label !== "" || $props.required ? common_vendor.e({
    b: $props.required
  }, $props.required ? {
    c: $props.requiredColor
  } : {}, {
    d: $props.label !== ""
  }, $props.label !== "" ? {
    e: common_vendor.t($props.label),
    f: common_vendor.s($options.labelTextStyle)
  } : {}, {
    g: common_vendor.s($options.labelWrapStyle)
  }) : {}, {
    h: $props.textRight ? 1 : "",
    i: $props.inputBorder ? 1 : "",
    j: common_vendor.s($options.fieldMergedStyle),
    k: $options.inputType,
    l: $props.password,
    m: $props.name,
    n: $props.disabled,
    o: $props.placeholder,
    p: $options.placeholderStyleResolved,
    q: $props.placeholderColor,
    r: $options.maxlengthResolved,
    s: $props.confirmType,
    t: $props.cursorSpacing,
    v: common_vendor.o([($event) => $data.innerValue = $event.detail.value, (...args) => $options.onInput && $options.onInput(...args)], "7c"),
    w: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args), "7a"),
    x: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args), "af"),
    y: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args), "f0"),
    z: $data.innerValue,
    A: $props.clearable && $data.innerValue !== "" && !$props.disabled
  }, $props.clearable && $data.innerValue !== "" && !$props.disabled ? {
    B: common_vendor.p({
      name: "close",
      color: $props.clearColor,
      size: $options.clearSizeStr,
      class: "data-v-4ad14ea9"
    }),
    C: common_vendor.o((...args) => $options.onClear && $options.onClear(...args), "d0")
  } : {}, {
    D: $props.disabled ? 1 : "",
    E: common_vendor.s($options.rowStyle),
    F: $props.error !== ""
  }, $props.error !== "" ? {
    G: common_vendor.t($props.error)
  } : {}, {
    H: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    I: common_vendor.s($options.rootMarginStyle),
    J: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    K: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mInput = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$N, [["render", _sfc_render$O], ["__scopeId", "data-v-4ad14ea9"]]);
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mInput
}, Symbol.toStringTag, { value: "Module" }));
class KeyCell extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          index: { type: Number, optional: false },
          label: { type: String, optional: false }
        };
      },
      name: "KeyCell"
    };
  }
  constructor(options, metadata = KeyCell.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.index = this.__props__.index;
    this.label = this.__props__.label;
    delete this.__props__;
  }
}
const _sfc_main$M = common_vendor.defineComponent({
  name: "mKeyboard",
  emits: ["close", "click"],
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    /** 为 true 时无入场动画，直接展示 */
    action: {
      type: Boolean,
      default: true
    },
    radius: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showPanel() {
      return this.show;
    },
    cells() {
      const list = [];
      for (let i = 0; i < 9; i++) {
        list.push(new KeyCell({ index: i, label: "" + (i + 1) }));
      }
      list.push(new KeyCell({ index: 9, label: "取消" }));
      list.push(new KeyCell({ index: 10, label: "0" }));
      list.push(new KeyCell({ index: 11, label: "删除" }));
      return list;
    }
  },
  methods: {
    onMaskTap() {
      this.$emit("close", new common_vendor.UTSJSONObject({}));
    },
    onKeyTap(index) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index }));
      if (index === 9) {
        this.$emit("close", new common_vendor.UTSJSONObject({}));
      }
    }
  }
});
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.showPanel
  }, $options.showPanel ? common_vendor.e({
    b: $props.mask
  }, $props.mask ? {
    c: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "fc")
  } : {}, {
    d: common_vendor.f($options.cells, (cell, idx, i0) => {
      return common_vendor.e({
        a: cell.label !== ""
      }, cell.label !== "" ? {
        b: common_vendor.t(cell.label)
      } : {}, {
        c: idx,
        d: common_vendor.o(($event) => $options.onKeyTap(cell.index), idx)
      });
    }),
    e: $props.radius ? 1 : "",
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: `${_ctx.u_s_b_h}px`,
    h: `${_ctx.u_s_a_i_b}px`,
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  }) : {});
}
const mKeyboard = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$M, [["render", _sfc_render$N]]);
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mKeyboard
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$L = common_vendor.defineComponent({
  name: "mLink",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    download: {
      type: String,
      default: ""
    },
    underline: {
      type: Boolean,
      default: false
    },
    copyTips: {
      type: String,
      default: "链接已复制"
    },
    color: {
      type: String,
      default: "#586c94"
    },
    size: {
      type: [Number, String],
      default: 28
    }
  },
  computed: {
    displayText() {
      const t = this.text;
      if (t != null && t !== "") {
        return t;
      }
      const h = this.href;
      return h;
    },
    textStyle() {
      return new common_vendor.UTSJSONObject({
        color: this.color,
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size)
      });
    }
  },
  methods: {
    onTap() {
      const url = this.href.trim();
      if (url.length === 0) {
        return null;
      }
      this.openUrl(url);
    },
    openUrl(url) {
      common_vendor.index.setClipboardData({
        data: url,
        success: () => {
          common_vendor.index.showToast({
            title: this.copyTips,
            icon: "none"
          });
        }
      });
    }
  }
});
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.t($options.displayText),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
    c: $props.underline ? 1 : "",
    d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    e: common_vendor.s($options.textStyle),
    f: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    g: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "10")
  };
}
const mLink = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$L, [["render", _sfc_render$M], ["__scopeId", "data-v-710ecb6a"]]);
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mLink
}, Symbol.toStringTag, { value: "Module" }));
const __default__ = common_vendor.defineComponent({
  name: "mLoading",
  props: {
    // 文字
    text: {
      type: String,
      default: "加载中..."
    },
    // 颜色
    color: {
      type: String,
      default: "#c0c4cc"
    },
    // 是否全屏
    full: {
      type: Boolean,
      default: false
    },
    // 是否动画
    anim: {
      type: Boolean,
      default: true
    },
    // 圆点尺寸，如 40rpx、24px；纯数字默认按 rpx。空则使用默认 16rpx 圆点
    size: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dotKeys: [1, 2, 3]
    };
  },
  computed: {
    animClass() {
      return this.anim ? "m-loading__spinner--anim" : "";
    },
    hasCustomDotSize() {
      const raw = this.size.trim();
      if (raw.length === 0) {
        return false;
      }
      const n = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size));
      return n > 0;
    },
    spinnerSizeStyle() {
      if (!this.hasCustomDotSize) {
        return new common_vendor.UTSJSONObject({});
      }
      const normalized = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const n = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(normalized);
      const nl = normalized.length;
      let unit = "rpx";
      if (nl >= 3 && normalized.substring(nl - 3) === "rpx") {
        unit = "rpx";
      } else if (nl >= 2 && normalized.substring(nl - 2) === "px") {
        unit = "px";
      }
      const h = Math.round(n * 2.5);
      return new common_vendor.UTSJSONObject({
        height: h + unit
      });
    },
    dotSizeStyle() {
      if (!this.hasCustomDotSize) {
        return new common_vendor.UTSJSONObject({});
      }
      const w = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({
        width: w,
        height: w
      });
    },
    dotGapStyle() {
      if (!this.hasCustomDotSize) {
        return new common_vendor.UTSJSONObject({});
      }
      const normalized = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const n = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(normalized);
      const nl = normalized.length;
      let unit = "rpx";
      if (nl >= 3 && normalized.substring(nl - 3) === "rpx") {
        unit = "rpx";
      } else if (nl >= 2 && normalized.substring(nl - 2) === "px") {
        unit = "px";
      }
      const g = Math.round(n * 0.5);
      return new common_vendor.UTSJSONObject({
        marginLeft: g + unit
      });
    }
  },
  methods: {
    dotItemStyle(dot) {
      const base = this.dotSizeStyle;
      if (dot <= 1) {
        return base;
      }
      const gapObj = this.dotGapStyle;
      const ml = gapObj["marginLeft"];
      const merged = new common_vendor.UTSJSONObject({
        width: base["width"],
        height: base["height"],
        marginLeft: ml
      });
      return merged;
    }
  }
});
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx = null) => {
    return new common_vendor.UTSJSONObject({
      "0e6d0252": _ctx.color
    });
  });
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.f($data.dotKeys, (dot, k0, i0) => {
      return {
        a: dot,
        b: common_vendor.s($options.dotItemStyle(dot))
      };
    }),
    b: common_vendor.n($options.animClass),
    c: common_vendor.s($options.spinnerSizeStyle),
    d: $props.text
  }, $props.text ? {
    e: common_vendor.t($props.text)
  } : {}, {
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: $props.full ? 1 : "",
    h: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    i: common_vendor.s(_ctx.__cssVars()),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component$7 = /* @__PURE__ */ common_vendor._export_sfc(__default__, [["render", _sfc_render$L], ["__scopeId", "data-v-288d639e"]]);
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = common_vendor.defineComponent({
  name: "mLoadmore",
  emits: ["retry"],
  props: {
    // 状态 loading/nomore/error
    status: {
      type: String,
      default: "nomore"
    },
    loadingText: {
      type: String,
      default: "加载中..."
    },
    nomoreText: {
      type: String,
      default: "已经到底了"
    },
    errorText: {
      type: String,
      default: "加载失败，点击重试"
    }
  },
  methods: {
    handleRetry() {
      if (this.status !== "error")
        return null;
      this.$emit("retry");
    }
  }
});
if (!Array) {
  const _easycom_m_loading2 = common_vendor.resolveComponent("m-loading");
  _easycom_m_loading2();
}
const _easycom_m_loading$1 = () => "./components/m-loading/m-loading.js";
if (!Math) {
  _easycom_m_loading$1();
}
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.status === "loading"
  }, $props.status === "loading" ? {
    b: common_vendor.p({
      anim: false,
      text: $props.loadingText,
      class: "data-v-38ad47fc"
    })
  } : $props.status === "error" ? {
    d: common_vendor.t($props.errorText),
    e: common_vendor.o((...args) => $options.handleRetry && $options.handleRetry(...args), "29")
  } : $props.status === "nomore" ? {
    g: common_vendor.t($props.nomoreText)
  } : {}, {
    c: $props.status === "error",
    f: $props.status === "nomore",
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.n("m-loadmore--" + $props.status),
    j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    k: `${_ctx.u_s_b_h}px`,
    l: `${_ctx.u_s_a_i_b}px`
  });
}
const mLoadmore = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$K, [["render", _sfc_render$K], ["__scopeId", "data-v-38ad47fc"]]);
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mLoadmore
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = common_vendor.defineComponent({
  name: "mLogin",
  emits: ["update:popupShow"],
  props: {
    popupShow: {
      type: Boolean,
      default: false
    },
    bo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      configInfo: new common_vendor.UTSJSONObject({ name: "", agreementId: "", privacyId: "" }),
      isAgree: false,
      weixinInfo: new common_vendor.UTSJSONObject({
        encryptedData: "",
        code: "",
        iv: "",
        mId: ""
      }),
      showAgreementDialog: false,
      agreementDialogButtons: [{
        text: "取消"
      }, {
        text: "同意并勾选",
        color: "#586c94"
      }]
    };
  },
  created() {
    const than = this;
    const cfg = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig();
    const ci = cfg.configInfo;
    const aid = ci.userAgreementArticleId;
    const pid = ci.privacyPolicyArticleId;
    than.configInfo = {
      name: ci.name,
      agreementId: aid != null && aid.length > 0 ? aid : "",
      privacyId: pid != null && pid.length > 0 ? pid : ""
    };
    than.$m.httpGet(cfg.api.login.tokenLogin, new common_vendor.UTSJSONObject({})).then((res) => {
      this.$m.login(res);
      than.hiddenPopup();
    }).catch((_e = null) => {
      this.$m.logout();
      common_vendor.index.login(new common_vendor.UTSJSONObject({
        provider: "weixin",
        success: function(loginRes) {
          than.$m.httpGet(cfg.api.login.codeGetOpenIdLogin, new common_vendor.UTSJSONObject({
            code: loginRes.code
          })).then((rese) => {
            than.$m.login(rese);
            than.hiddenPopup();
          }).catch(() => {
            than.$m.logout();
            setTimeout(() => {
            }, 3e3);
          });
        }
      }));
    });
  },
  methods: {
    showPopup() {
      this.$emit("update:popupShow", true);
    },
    hiddenPopup() {
      this.$emit("update:popupShow", false);
    },
    openAgreement() {
      const id = this.configInfo.agreementId;
      if (id.length < 1) {
        return null;
      }
      this.$m.href("/son_me/article-details/article-details?id=" + id);
    },
    openPrivacy() {
      const id = this.configInfo.privacyId;
      if (id.length < 1) {
        return null;
      }
      this.$m.href("/son_me/article-details/article-details?id=" + id);
    },
    onLoginTap() {
      if (!this.isAgree) {
        this.showAgreementDialog = true;
      }
    },
    onAgreeUpdate(next) {
      this.isAgree = next;
    },
    onAgreementDialogShowUpdate(next) {
      this.showAgreementDialog = next;
    },
    onAgreementDialogClick(e) {
      if (e.index === 1) {
        this.isAgree = true;
      }
    },
    onLoginAfterAgree() {
      this.$m.toast("非微信端请对接业务登录接口");
    },
    getPhone(e) {
      const than = this;
      if (!than.isAgree) {
        than.showAgreementDialog = true;
        return null;
      }
      const cfg = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig();
      common_vendor.index.login(new common_vendor.UTSJSONObject({
        provider: "weixin",
        success: function(loginRes) {
          than.weixinInfo.code = loginRes.code;
          than.weixinInfo.iv = e.iv;
          than.weixinInfo.encryptedData = e.encryptedData;
          let mid = common_vendor.index.getStorageSync("mId");
          than.weixinInfo.mId = mid == null || mid == "" ? 0 : mid;
          than.$m.httpGet(cfg.api.login.codeGetPhoneRegisterOrLogin, than.weixinInfo).then((data) => {
            than.$m.login(data);
            than.hiddenPopup();
            than.$m.toast("登录成功!");
          }).catch((error) => {
            than.$m.toast(error);
          });
        }
      }));
    }
  }
});
if (!Array) {
  const _easycom_m_checkbox2 = common_vendor.resolveComponent("m-checkbox");
  const _easycom_m_button2 = common_vendor.resolveComponent("m-button");
  const _easycom_m_content2 = common_vendor.resolveComponent("m-content");
  const _easycom_m_bottom_popup2 = common_vendor.resolveComponent("m-bottom-popup");
  const _easycom_m_dialog2 = common_vendor.resolveComponent("m-dialog");
  (_easycom_m_checkbox2 + _easycom_m_button2 + _easycom_m_content2 + _easycom_m_bottom_popup2 + _easycom_m_dialog2)();
}
const _easycom_m_checkbox = () => "./components/m-checkbox/m-checkbox.js";
const _easycom_m_button = () => "./components/m-button/m-button.js";
const _easycom_m_content = () => "./components/m-content/m-content.js";
const _easycom_m_bottom_popup = () => "./components/m-bottom-popup/m-bottom-popup.js";
const _easycom_m_dialog$1 = () => "./components/m-dialog/m-dialog.js";
if (!Math) {
  (_easycom_m_checkbox + _easycom_m_button + _easycom_m_content + _easycom_m_bottom_popup + _easycom_m_dialog$1)();
}
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.t($data.configInfo.name),
    b: common_vendor.o($options.onAgreeUpdate, "bf"),
    c: common_vendor.p({
      checked: $data.isAgree,
      size: 40,
      scale: 0.9,
      color: "#ff0844",
      ["border-color"]: "#cccccc",
      class: "data-v-41dfdbcf"
    }),
    d: $data.configInfo.agreementId.length > 0
  }, $data.configInfo.agreementId.length > 0 ? {
    e: common_vendor.o((...args) => $options.openAgreement && $options.openAgreement(...args), "5a")
  } : {}, {
    f: $data.configInfo.privacyId.length > 0
  }, $data.configInfo.privacyId.length > 0 ? {
    g: common_vendor.o((...args) => $options.openPrivacy && $options.openPrivacy(...args), "ab")
  } : {}, {
    h: $data.isAgree
  }, $data.isAgree ? {
    i: common_vendor.o($options.getPhone, "29"),
    j: common_vendor.p({
      type: "danger",
      shadow: true,
      bold: true,
      shape: "circle",
      ["open-type"]: "getPhoneNumber",
      class: "data-v-41dfdbcf"
    })
  } : {
    k: common_vendor.o($options.onLoginTap, "2a"),
    l: common_vendor.p({
      type: "danger",
      shadow: true,
      bold: true,
      shape: "circle",
      class: "data-v-41dfdbcf"
    })
  }, {
    m: common_vendor.p({
      gap: "32",
      ["margin-top"]: "24",
      class: "data-v-41dfdbcf"
    }),
    n: common_vendor.o($options.hiddenPopup, "de"),
    o: common_vendor.p({
      zIndex: 1002,
      maskZIndex: 1001,
      show: $props.popupShow,
      class: "data-v-41dfdbcf"
    }),
    p: common_vendor.o($options.onAgreementDialogClick, "f8"),
    q: common_vendor.o($options.onAgreementDialogShowUpdate, "57"),
    r: common_vendor.p({
      show: $data.showAgreementDialog,
      buttons: $data.agreementDialogButtons,
      title: "提示",
      class: "data-v-41dfdbcf"
    })
  });
}
const mLogin = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$J, [["render", _sfc_render$J], ["__scopeId", "data-v-41dfdbcf"]]);
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mLogin
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$I = common_vendor.defineComponent({
  name: "mNoticeBar",
  emits: ["click", "leftClick", "rightClick"],
  props: {
    text: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    /** 是否在左侧显示内置图标（仍可用 #icon 插槽完全自定义） */
    showIcon: {
      type: Boolean,
      default: false
    },
    /** 内置图标名称，对应 m-icon 的 name（默认 notification-filling） */
    icon: {
      type: String,
      default: "notification-filling"
    },
    /** 图标颜色；空则与正文字色 color/textColor 一致 */
    iconColor: {
      type: String,
      default: ""
    },
    /** 图标尺寸，空则与 size 一致 */
    iconSize: {
      type: [Number, String],
      default: ""
    },
    showRight: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    wrapable: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    /** 与 backgroundColor 二选一，优先于 backgroundColor */
    bgColor: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#fff8d5"
    },
    /** 与 color 二选一，优先于 color */
    textColor: {
      type: String,
      default: ""
    },
    /** 正文字体颜色 */
    color: {
      type: String,
      default: "#ff7900"
    },
    height: {
      type: [Number, String],
      default: 72
    },
    size: {
      type: [Number, String],
      default: 28
    },
    bold: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default() {
        return [];
      }
    },
    isLeft: {
      type: Boolean,
      default: false
    },
    isRight: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: "0px"
    },
    params: {
      type: [Number, String],
      default: 0
    },
    duration: {
      type: Number,
      default: 18
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    displayText() {
      const c = this.content;
      if (c != null && c.length > 0) {
        return c;
      }
      return this.text;
    },
    resolvedBg() {
      const b = this.bgColor;
      if (b != null && b.length > 0) {
        return b;
      }
      return this.backgroundColor;
    },
    resolvedColor() {
      const t = this.textColor;
      if (t != null && t.length > 0) {
        return t;
      }
      return this.color;
    },
    iconNameStr() {
      const n = this.icon;
      if (n != null && n.length > 0) {
        return n;
      }
      return "notification-filling";
    },
    resolvedIconColor() {
      const ic = this.iconColor;
      if (ic != null && ic.length > 0) {
        return ic;
      }
      return this.resolvedColor;
    },
    iconSizeCss() {
      const raw = this.iconSize;
      if (raw == null) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      }
      if (typeof raw === "string" && raw.length === 0) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      }
      if (typeof raw === "number" && raw <= 0) {
        return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(raw);
    },
    showLeftCol() {
      if (this.isLeft) {
        return true;
      }
      return this.showIcon;
    },
    showRightCol() {
      if (this.isRight) {
        return true;
      }
      return this.showRight;
    },
    paddingCss() {
      const arr = this.padding;
      if (arr == null || arr.length === 0) {
        return "";
      }
      const parts = [];
      for (let i = 0; i < arr.length; i++) {
        parts.push(uni_modules_mUnix_components_mTools_Ut.toCssLength(arr[i]));
      }
      if (parts.length === 1) {
        return parts[0];
      }
      if (parts.length === 2) {
        return parts[0] + " " + parts[1];
      }
      if (parts.length === 3) {
        return parts[0] + " " + parts[1] + " " + parts[2];
      }
      return parts[0] + " " + parts[1] + " " + parts[2] + " " + parts[3];
    },
    rootStyle() {
      const h = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height);
      const style = new common_vendor.UTSJSONObject({
        backgroundColor: this.resolvedBg,
        minHeight: h
      });
      if (this.isFixed) {
        style["position"] = "fixed";
        style["left"] = "0";
        style["right"] = "0";
        style["top"] = this.top;
        style["zIndex"] = "900";
      }
      const pad = this.paddingCss;
      if (pad.length > 0) {
        style["padding"] = pad;
      }
      if (this.customStyle != null) {
        Object.assign(style, this.customStyle);
      }
      return style;
    },
    contentTextStyle() {
      const fs = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const bold = this.bold;
      return new common_vendor.UTSJSONObject({
        color: this.resolvedColor,
        "font-size": fs,
        "font-weight": bold ? "bold" : "normal"
      });
    },
    marqueeTrackStyle() {
      const dur = this.duration;
      const fs = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const bold = this.bold;
      return new common_vendor.UTSJSONObject({
        animationDuration: dur + "s",
        color: this.resolvedColor,
        "font-size": fs,
        "font-weight": bold ? "bold" : "normal"
      });
    }
  },
  methods: {
    onBarTap() {
      this.$emit("click", new common_vendor.UTSJSONObject({ params: this.params }));
    },
    onLeftTap() {
      this.$emit("leftClick", new common_vendor.UTSJSONObject({ params: this.params }));
    },
    onRightTap() {
      this.$emit("rightClick", new common_vendor.UTSJSONObject({ params: this.params }));
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$9 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$9();
}
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.showLeftCol
  }, $options.showLeftCol ? common_vendor.e({
    b: $props.showIcon
  }, $props.showIcon ? {
    c: common_vendor.p({
      name: $options.iconNameStr,
      color: $options.resolvedIconColor,
      size: $options.iconSizeCss,
      class: "data-v-48c0dc7d"
    })
  } : {}, {
    d: common_vendor.o((...args) => $options.onLeftTap && $options.onLeftTap(...args), "8c")
  }) : {}, {
    e: $props.scrollable
  }, $props.scrollable ? {
    f: common_vendor.t($options.displayText),
    g: common_vendor.t($options.displayText),
    h: common_vendor.s($options.marqueeTrackStyle)
  } : {
    i: common_vendor.t($options.displayText),
    j: $props.single ? 1 : "",
    k: $props.wrapable && !$props.single ? 1 : "",
    l: common_vendor.s($options.contentTextStyle)
  }, {
    m: $options.showRightCol
  }, $options.showRightCol ? common_vendor.e({
    n: $props.showRight
  }, $props.showRight ? {
    o: common_vendor.p({
      name: "arrow-right",
      color: "#c0c4cc",
      size: "26rpx",
      class: "data-v-48c0dc7d"
    })
  } : {}, {
    p: common_vendor.o((...args) => $options.onRightTap && $options.onRightTap(...args), "5a")
  }) : {}, {
    q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    r: $props.isFixed ? 1 : "",
    s: $props.wrapable && !$props.single && !$props.scrollable ? 1 : "",
    t: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    v: common_vendor.s($options.rootStyle),
    w: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    x: common_vendor.o((...args) => $options.onBarTap && $options.onBarTap(...args), "ef")
  });
}
const mNoticeBar = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$I, [["render", _sfc_render$I], ["__scopeId", "data-v-48c0dc7d"]]);
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mNoticeBar
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$H = common_vendor.defineComponent({
  name: "mNoticeVertical",
  emits: [],
  props: {
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 400
    },
    background: {
      type: String,
      default: "transparent"
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    padding: {
      type: String,
      default: "0"
    },
    /**
     * 自动滚动速度：数值越大滚动越快（约等于每秒移动的 px 量，内部按帧换算步长）。
     */
    speed: {
      type: [Number, String],
      default: 20
    },
    /** forwards：scrollTop 递增；backwards：从底部向上滚（默认与历史版本一致） */
    activeMode: {
      type: String,
      default: "backwards"
    },
    /** 是否自动纵向滚动；关闭后仅支持手指滑动 */
    autoplay: {
      type: Boolean,
      default: true
    },
    /** 自动滚动定时间隔 ms */
    interval: {
      type: [Number, String],
      default: 40
    },
    /** 插槽内容异步变高时递增，触发重新测量 */
    recalc: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      /** 与 :scroll-top 绑定；用独立字段 + 微调避免同值不触发滚动 */
      scrollTopBind: 0,
      scrollViewportPx: 200,
      /** 滚动内容总高度，优先来自 @scroll 的 detail.scrollHeight */
      innerContentPx: 0,
      timer: null,
      touching: false,
      resumeTimer: null,
      kickToken: 0
    };
  },
  computed: {
    outerStyle() {
      const w = this.width;
      const wNum = typeof w === "number" ? w : parseFloat(w);
      const widthCss = wNum === 0 || typeof w === "string" && w.trim() === "0" ? "100%" : uni_modules_mUnix_components_mTools_Ut.toCssLength(w);
      const r = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      const hpx = this.resolveHeightToPx();
      return new common_vendor.UTSJSONObject({
        width: widthCss,
        height: hpx + "px",
        minHeight: hpx + "px",
        backgroundColor: this.background,
        borderRadius: r,
        boxSizing: "border-box"
      });
    },
    scrollBoxStyle() {
      const hpx = this.resolveHeightToPx();
      return new common_vendor.UTSJSONObject({
        height: hpx + "px",
        width: "100%"
      });
    },
    innerPadStyle() {
      return new common_vendor.UTSJSONObject({
        padding: this.padding
      });
    },
    speedNum() {
      const s = this.speed;
      if (typeof s === "number") {
        return s > 0 ? s : 20;
      }
      const n = parseFloat(s);
      return isNaN(n) || n <= 0 ? 20 : n;
    },
    intervalMs() {
      const t = this.interval;
      let n = 40;
      if (typeof t === "number") {
        n = t;
      } else {
        const p = parseInt(t);
        n = isNaN(p) ? 40 : p;
      }
      if (n < 16) {
        n = 16;
      }
      if (n > 200) {
        n = 200;
      }
      return n;
    },
    isBackwards() {
      return this.activeMode === "backwards";
    }
  },
  watch: {
    height() {
      this.scrollViewportPx = this.resolveHeightToPx();
      this.$nextTick(() => {
        this.remeasureAndSyncScroll();
      });
    },
    autoplay() {
      this.restartAutoScroll();
    },
    speed() {
      this.restartAutoScroll();
    },
    activeMode() {
      this.syncScrollBounds();
      this.restartAutoScroll();
    },
    interval() {
      this.restartAutoScroll();
    },
    recalc() {
      this.$nextTick(() => {
        this.scheduleMeasureAndStart();
      });
    }
  },
  mounted() {
    this.scrollViewportPx = this.resolveHeightToPx();
    this.$nextTick(() => {
      this.scheduleMeasureAndStart();
    });
  },
  beforeUnmount() {
    this.clearTimer();
    this.clearResumeTimer();
  },
  methods: {
    resolveHeightToPx() {
      const h = this.height;
      if (typeof h === "number") {
        const px = common_vendor.index.rpx2px(h);
        if (px != null && px > 0) {
          return px;
        }
        return h > 0 ? h : 200;
      }
      const s = h.trim();
      if (s.length === 0) {
        return 200;
      }
      const len = s.length;
      if (len >= 2 && s.substring(len - 2) === "px") {
        const n = parseFloat(s);
        return isNaN(n) || n <= 0 ? 200 : n;
      }
      if (len >= 3 && s.substring(len - 3) === "rpx") {
        const n = parseFloat(s.substring(0, len - 3));
        const px = common_vendor.index.rpx2px(isNaN(n) ? 400 : n);
        if (px != null && px > 0) {
          return px;
        }
        return 200;
      }
      const n2 = parseFloat(s);
      if (!isNaN(n2) && n2 > 0) {
        const px2 = common_vendor.index.rpx2px(n2);
        if (px2 != null && px2 > 0) {
          return px2;
        }
        return n2;
      }
      return 200;
    },
    scheduleMeasureAndStart() {
      const that = this;
      setTimeout(function() {
        that.remeasureAndSyncScroll();
      }, 50);
      setTimeout(function() {
        that.kickForScrollHeight();
      }, 120);
      setTimeout(function() {
        that.kickForScrollHeight();
      }, 320);
    },
    /** 轻微改变 scroll-top，触发 @scroll 从而拿到可靠的 detail.scrollHeight */
    kickForScrollHeight() {
      if (!this.autoplay) {
        return null;
      }
      const that = this;
      this.kickToken = this.kickToken + 1;
      const token = this.kickToken;
      const base = this.scrollTopBind;
      this.scrollTopBind = base + 1;
      this.$nextTick(() => {
        if (that.kickToken != token) {
          return null;
        }
        that.scrollTopBind = base;
      });
    },
    /** 从 scroll-view 事件中解析 scrollHeight / scrollTop（uni-app x detail 为对象） */
    onScrollViewScroll(e) {
      if (e == null) {
        return null;
      }
      let sh = null;
      let st = null;
      const detail = e["detail"];
      if (detail != null) {
        const a = detail["scrollHeight"];
        const b = detail["scrollTop"];
        if (a != null) {
          sh = a;
        }
        if (b != null) {
          st = b;
        }
      }
      if (sh == null) {
        const a2 = e["scrollHeight"];
        if (a2 != null) {
          sh = a2;
        }
      }
      if (st == null) {
        const b2 = e["scrollTop"];
        if (b2 != null) {
          st = b2;
        }
      }
      if (sh != null && sh > 0) {
        const merged = Math.max(this.innerContentPx, sh);
        if (merged != this.innerContentPx) {
          this.innerContentPx = merged;
          this.restartAutoScroll();
        }
      }
      if (this.touching && st != null) {
        this.scrollTopBind = st;
      }
    },
    remeasureAndSyncScroll() {
      const that = this;
      this.scrollViewportPx = this.resolveHeightToPx();
      const q = common_vendor.index.createSelectorQuery().in(this);
      q.select(".m-notice-vertical__inner").boundingClientRect(function(rect = null) {
        if (rect != null) {
          const ih = rect.height;
          const vp = that.resolveHeightToPx();
          if (ih > vp + 2) {
            that.innerContentPx = Math.max(that.innerContentPx, ih);
          }
        }
        that.syncScrollBounds();
        that.restartAutoScroll();
        that.kickForScrollHeight();
      });
      q.exec();
    },
    maxScroll() {
      const d = this.innerContentPx - this.scrollViewportPx;
      return d > 0 ? d : 0;
    },
    syncScrollBounds() {
      const maxS = this.maxScroll();
      if (this.isBackwards) {
        if (this.scrollTopBind > maxS) {
          this.scrollTopBind = maxS;
        }
        if (maxS > 0 && this.scrollTopBind < 0) {
          this.scrollTopBind = 0;
        }
      } else {
        if (this.scrollTopBind > maxS) {
          this.scrollTopBind = maxS;
        }
      }
    },
    stepPx() {
      const sp = this.speedNum;
      const ms = this.intervalMs;
      let step = Math.round(sp * ms / 1e3);
      if (step < 1) {
        step = 1;
      }
      if (step > 80) {
        step = 80;
      }
      return step;
    },
    setScrollTopProgrammatic(next) {
      let n = Math.floor(next);
      if (n < 0) {
        n = 0;
      }
      const cur = Math.floor(this.scrollTopBind);
      if (n === cur) {
        const that = this;
        this.scrollTopBind = n + 1;
        this.$nextTick(() => {
          that.scrollTopBind = n;
        });
      } else {
        this.scrollTopBind = n;
      }
    },
    tickScroll() {
      if (this.touching) {
        return null;
      }
      if (!this.autoplay) {
        return null;
      }
      const maxS = this.maxScroll();
      if (maxS <= 0) {
        return null;
      }
      const step = this.stepPx();
      let next = 0;
      if (this.isBackwards) {
        next = this.scrollTopBind - step;
        if (next <= 0) {
          next = maxS;
        }
      } else {
        next = this.scrollTopBind + step;
        if (next >= maxS) {
          next = 0;
        }
      }
      this.setScrollTopProgrammatic(next);
    },
    clearTimer() {
      if (this.timer != null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    clearResumeTimer() {
      if (this.resumeTimer != null) {
        clearTimeout(this.resumeTimer);
        this.resumeTimer = null;
      }
    },
    restartAutoScroll() {
      this.clearTimer();
      if (!this.autoplay) {
        return null;
      }
      const maxS = this.maxScroll();
      if (maxS <= 0) {
        return null;
      }
      if (this.isBackwards) {
        if (this.scrollTopBind <= 0 || this.scrollTopBind > maxS) {
          this.setScrollTopProgrammatic(maxS);
        }
      } else {
        if (this.scrollTopBind > maxS) {
          this.setScrollTopProgrammatic(0);
        }
      }
      const that = this;
      this.timer = setInterval(function() {
        that.tickScroll();
      }, this.intervalMs);
    },
    onTouchStart() {
      this.touching = true;
      this.clearTimer();
      this.clearResumeTimer();
    },
    onTouchEnd() {
      const that = this;
      this.touching = false;
      this.clearResumeTimer();
      if (!this.autoplay) {
        return null;
      }
      this.resumeTimer = setTimeout(function() {
        that.resumeTimer = null;
        that.remeasureAndSyncScroll();
      }, 600);
    }
  }
});
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.s($options.innerPadStyle),
    b: common_vendor.s($options.scrollBoxStyle),
    c: $data.scrollTopBind,
    d: common_vendor.o((...args) => $options.onScrollViewScroll && $options.onScrollViewScroll(...args), "64"),
    e: common_vendor.o((...args) => $options.onScrollViewScroll && $options.onScrollViewScroll(...args), "9f"),
    f: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args), "2d"),
    g: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args), "97"),
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.s($options.outerStyle),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mNoticeVertical = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-59464918"]]);
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mNoticeVertical
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = common_vendor.defineComponent({
  name: "mNumberBox",
  emits: ["change", "update:value"],
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 99
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconBgColor: {
      type: String,
      default: "transparent"
    },
    radius: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: Number,
      default: 26
    },
    iconColor: {
      type: String,
      default: "#666666"
    },
    height: {
      type: Number,
      default: 42
    },
    width: {
      type: Number,
      default: 80
    },
    size: {
      type: Number,
      default: 28
    },
    backgroundColor: {
      type: String,
      default: "#F5F5F5"
    },
    color: {
      type: String,
      default: "#333333"
    },
    index: {
      type: [Number, String],
      default: 0
    },
    custom: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    numValue() {
      const v = this.value;
      const n = typeof v === "number" ? v : parseFloat("" + v);
      if (isNaN(n)) {
        return this.min;
      }
      return n;
    },
    displayValue() {
      const n = this.numValue;
      if (Math.abs(n - Math.floor(n)) < 1e-9) {
        return "" + Math.floor(n);
      }
      return "" + n;
    },
    btnStyle() {
      const st = new common_vendor.UTSJSONObject({});
      const h = this.height;
      st["width"] = h + "rpx";
      st["height"] = h + "rpx";
      st["backgroundColor"] = this.iconBgColor;
      if (this.radius) {
        st["borderRadius"] = "50%";
      }
      return st;
    },
    inputWrapStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["width"] = this.width + "rpx";
      st["height"] = this.height + "rpx";
      st["backgroundColor"] = this.backgroundColor;
      return st;
    }
  },
  methods: {
    emitChange(next, type) {
      const minV = this.min;
      const maxV = this.max;
      let v = next;
      if (v < minV) {
        v = minV;
      }
      if (v > maxV) {
        v = maxV;
      }
      const idx = this.index;
      const cust = this.custom;
      const ni = typeof idx === "number" ? idx : parseInt("" + idx);
      const nc = typeof cust === "number" ? cust : parseInt("" + cust);
      this.$emit("update:value", v);
      this.$emit("change", new common_vendor.UTSJSONObject({
        value: v,
        type,
        index: isNaN(ni) ? 0 : ni,
        custom: isNaN(nc) ? 0 : nc
      }));
    },
    onPlus() {
      if (this.disabled) {
        return null;
      }
      const step = this.step;
      this.emitChange(this.numValue + step, "plus");
    },
    onReduce() {
      if (this.disabled) {
        return null;
      }
      const step = this.step;
      this.emitChange(this.numValue - step, "reduce");
    }
  }
});
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: $props.iconColor,
    b: $props.iconSize + "rpx",
    c: common_vendor.s($options.btnStyle),
    d: common_vendor.o((...args) => $options.onReduce && $options.onReduce(...args), "0e"),
    e: common_vendor.t($options.displayValue),
    f: $props.color,
    g: $props.size + "rpx",
    h: common_vendor.s($options.inputWrapStyle),
    i: $props.iconColor,
    j: $props.iconSize + "rpx",
    k: common_vendor.s($options.btnStyle),
    l: common_vendor.o((...args) => $options.onPlus && $options.onPlus(...args), "6d"),
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: $props.disabled ? 1 : "",
    o: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    p: `${_ctx.u_s_b_h}px`,
    q: `${_ctx.u_s_a_i_b}px`
  };
}
const mNumberBox = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$G, [["render", _sfc_render$G]]);
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mNumberBox
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = common_vendor.defineComponent({
  name: "mOverlay",
  emits: ["click"],
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 遮罩透明度
    opacity: {
      type: [Number, String],
      default: 0.5
    },
    // 层级
    zIndex: {
      type: [Number, String],
      default: 998
    },
    // 是否锁定背景滚动
    lockScroll: {
      type: Boolean,
      default: true
    },
    /** 淡入淡出时长（毫秒），与 m-popup duration 对齐 */
    durationMs: {
      type: Number,
      default: 300
    }
  },
  computed: {
    overlayStyle() {
      const sec = this.durationMs / 1e3;
      const dur = sec + "s";
      return new common_vendor.UTSJSONObject({
        "background-color": `rgba(0, 0, 0, ${this.opacity})`,
        "z-index": this.zIndex,
        "transition-duration": dur
      });
    }
  },
  methods: {
    handleClick(e = null) {
      this.$emit("click", e);
    }
  }
});
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: $props.show ? 1 : "",
    c: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    d: common_vendor.s($options.overlayStyle),
    e: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    f: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "20")
  };
}
const Component$6 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$F, [["render", _sfc_render$F], ["__scopeId", "data-v-71b2926a"]]);
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$E = common_vendor.defineComponent({
  name: "mPagination",
  emits: ["change", "update:current"],
  props: {
    prevText: {
      type: String,
      default: "上一页"
    },
    nextText: {
      type: String,
      default: "下一页"
    },
    width: {
      type: [Number, String],
      default: 156
    },
    height: {
      type: [Number, String],
      default: 68
    },
    borderColor: {
      type: String,
      default: "transparent"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 28
    },
    radius: {
      type: String,
      default: "8rpx"
    },
    custom: {
      type: Boolean,
      default: false
    },
    current: {
      type: [Number, String],
      default: 1
    },
    currentColor: {
      type: String,
      default: "#5677fc"
    },
    pageColor: {
      type: String,
      default: "#333333"
    },
    pageFontSize: {
      type: [Number, String],
      default: 36
    },
    isPage: {
      type: Boolean,
      default: true
    },
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 10
    }
  },
  computed: {
    totalNum() {
      const v = this.total;
      if (typeof v === "number") {
        return v < 0 ? 0 : v;
      }
      const n = parseInt(v);
      return isNaN(n) || n < 0 ? 0 : n;
    },
    pageSizeNum() {
      const v = this.pageSize;
      if (typeof v === "number") {
        return v <= 0 ? 10 : v;
      }
      const n = parseInt(v);
      return isNaN(n) || n <= 0 ? 10 : n;
    },
    totalPages() {
      const t = this.totalNum;
      const ps = this.pageSizeNum;
      if (t === 0) {
        return 1;
      }
      const p = Math.ceil(t / ps);
      return p < 1 ? 1 : p;
    },
    currentNum() {
      const v = this.current;
      let n = 1;
      if (typeof v === "number") {
        n = v;
      } else {
        const p = parseInt(v);
        n = isNaN(p) ? 1 : p;
      }
      if (n < 1) {
        n = 1;
      }
      const max = this.totalPages;
      if (n > max) {
        n = max;
      }
      return n;
    },
    displayCurrent() {
      return this.currentNum;
    },
    prevDisabled() {
      return this.currentNum <= 1;
    },
    nextDisabled() {
      return this.currentNum >= this.totalPages;
    },
    btnStyle() {
      const w = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.width);
      const h = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height);
      return new common_vendor.UTSJSONObject({
        width: w,
        height: h,
        borderColor: this.borderColor,
        backgroundColor: this.backgroundColor,
        borderWidth: this.borderColor === "transparent" ? "0" : "1px",
        borderStyle: "solid",
        borderRadius: this.radius
      });
    },
    btnTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color
      });
    },
    pageFontSizeCss() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.pageFontSize);
    }
  },
  methods: {
    onPrev() {
      if (this.prevDisabled) {
        return null;
      }
      const next = this.currentNum - 1;
      this.$emit("update:current", next);
      this.$emit("change", new common_vendor.UTSJSONObject({ type: "prev", current: next }));
    },
    onNext() {
      if (this.nextDisabled) {
        return null;
      }
      const next = this.currentNum + 1;
      this.$emit("update:current", next);
      this.$emit("change", new common_vendor.UTSJSONObject({ type: "next", current: next }));
    }
  }
});
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.custom
  }, $props.custom ? {} : {
    b: common_vendor.t($props.prevText),
    c: common_vendor.s($options.btnTextStyle)
  }, {
    d: $options.prevDisabled ? 1 : "",
    e: common_vendor.s($options.btnStyle),
    f: common_vendor.o((...args) => $options.onPrev && $options.onPrev(...args), "93"),
    g: $props.isPage
  }, $props.isPage ? {
    h: common_vendor.t($options.displayCurrent),
    i: $props.currentColor,
    j: $options.pageFontSizeCss,
    k: $props.pageColor,
    l: $options.pageFontSizeCss,
    m: common_vendor.t($options.totalPages),
    n: $props.pageColor,
    o: $options.pageFontSizeCss
  } : {}, {
    p: $props.custom
  }, $props.custom ? {} : {
    q: common_vendor.t($props.nextText),
    r: common_vendor.s($options.btnTextStyle)
  }, {
    s: $options.nextDisabled ? 1 : "",
    t: common_vendor.s($options.btnStyle),
    v: common_vendor.o((...args) => $options.onNext && $options.onNext(...args), "f9"),
    w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    x: `${_ctx.u_s_b_h}px`,
    y: `${_ctx.u_s_a_i_b}px`,
    z: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mPagination = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$E, [["render", _sfc_render$E], ["__scopeId", "data-v-124d5328"]]);
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mPagination
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$D = common_vendor.defineComponent({
  name: "mPicker",
  emits: [
    "confirm",
    "cancel",
    "change",
    "hide",
    "columnchange",
    "update:show"
  ],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showMask: {
      type: Boolean,
      default: true
    },
    /** 与 pickerData 二选一；旧名保留 */
    tree: {
      type: Array,
      default() {
        return [];
      }
    },
    /** 树形/级联数据；非空时优先于 tree */
    pickerData: {
      type: Array,
      default() {
        return [];
      }
    },
    /** 列数 1～3 */
    layer: {
      type: [Number, String],
      default: 3
    },
    textKey: {
      type: String,
      default: "text"
    },
    /** 与 textKey 同时存在时优先使用非空的 textField */
    textField: {
      type: String,
      default: ""
    },
    childrenKey: {
      type: String,
      default: "children"
    },
    childrenField: {
      type: String,
      default: ""
    },
    valueKey: {
      type: String,
      default: "value"
    },
    valueField: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelColor: {
      type: String,
      default: "#888888"
    },
    confirmColor: {
      type: String,
      default: "#5677fc"
    },
    title: {
      type: String,
      default: ""
    },
    titleSize: {
      type: [Number, String],
      default: 32
    },
    titleColor: {
      type: String,
      default: "#333333"
    },
    btnSize: {
      type: [Number, String],
      default: 30
    },
    zIndex: {
      type: Number,
      default: 10002
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    indicatorStyle: {
      type: String,
      default: "height: 50px;"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    itemColor: {
      type: String,
      default: "#333333"
    },
    itemSize: {
      type: [Number, String],
      default: 30
    },
    /** 随 hide / cancel 回传 */
    params: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      pickerValue: [0, 0, 0]
    };
  },
  computed: {
    resolvedData() {
      const pd = this.pickerData;
      if (pd != null && pd.length > 0) {
        return pd;
      }
      return this.tree;
    },
    resolvedTextKey() {
      const tf = this.textField;
      if (tf !== "") {
        return tf;
      }
      return this.textKey;
    },
    resolvedChildrenKey() {
      const cf = this.childrenField;
      if (cf !== "") {
        return cf;
      }
      return this.childrenKey;
    },
    resolvedValueKey() {
      const vf = this.valueField;
      if (vf !== "") {
        return vf;
      }
      return this.valueKey;
    },
    layerClamped() {
      const ly = this.layer;
      let n = 3;
      if (typeof ly === "number") {
        n = ly;
      } else {
        const p = parseInt(ly.trim());
        if (!isNaN(p)) {
          n = p;
        }
      }
      if (n < 1) {
        return 1;
      }
      if (n > 3) {
        return 3;
      }
      return n;
    },
    maskZ() {
      return this.zIndex - 1;
    },
    panelZ() {
      return this.zIndex;
    },
    panelWrapStyle() {
      return new common_vendor.UTSJSONObject({
        zIndex: this.panelZ,
        backgroundColor: this.backgroundColor
      });
    },
    cancelBtnStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": this.toRpx(this.btnSize),
        color: this.cancelColor
      });
    },
    confirmBtnStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": this.toRpx(this.btnSize),
        color: this.confirmColor
      });
    },
    titleTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": this.toRpx(this.titleSize),
        color: this.titleColor
      });
    },
    cellTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": this.toRpx(this.itemSize),
        color: this.itemColor
      });
    },
    col0() {
      return this.toLabels(this.rootNodes());
    },
    col1() {
      if (this.layerClamped < 2) {
        return [];
      }
      const v = this.pickerValue;
      const roots = this.rootNodes();
      if (roots.length === 0) {
        return [];
      }
      const i0 = this.clamp(v[0], 0, roots.length - 1);
      const ch = this.childrenOf(roots[i0]);
      return this.toLabels(ch);
    },
    col2() {
      if (this.layerClamped < 3) {
        return [];
      }
      const v = this.pickerValue;
      const roots = this.rootNodes();
      if (roots.length === 0) {
        return [];
      }
      const i0 = this.clamp(v[0], 0, roots.length - 1);
      const ch1 = this.childrenOf(roots[i0]);
      if (ch1.length === 0) {
        return [];
      }
      const i1 = this.clamp(v[1], 0, ch1.length - 1);
      const ch2 = this.childrenOf(ch1[i1]);
      return this.toLabels(ch2);
    }
  },
  watch: {
    show(n) {
      if (n) {
        this.resetPickerValue();
        this.syncPicker();
      }
    },
    resolvedData() {
      this.syncPicker();
    },
    layerClamped() {
      this.resetPickerValue();
      this.syncPicker();
    }
  },
  methods: {
    toRpx(n) {
      if (typeof n === "number") {
        return n + "rpx";
      }
      const s = n;
      if (s.indexOf("rpx") >= 0) {
        return s;
      }
      return s + "rpx";
    },
    resetPickerValue() {
      const L = this.layerClamped;
      const arr = [];
      for (let i = 0; i < L; i++) {
        arr.push(0);
      }
      this.pickerValue = arr;
    },
    rootNodes() {
      const arr = this.resolvedData;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    childrenOf(n) {
      const k = this.resolvedChildrenKey;
      const ch = n[k];
      if (ch == null) {
        return [];
      }
      const arr = ch;
      const out = [];
      for (let i = 0; i < arr.length; i++) {
        out.push(arr[i]);
      }
      return out;
    },
    labelOf(n) {
      const k = this.resolvedTextKey;
      const v = n[k];
      if (v != null) {
        return "" + v;
      }
      return "";
    },
    valueOf(n) {
      const k = this.resolvedValueKey;
      const v = n[k];
      if (v != null) {
        return "" + v;
      }
      return "";
    },
    toLabels(nodes) {
      const out = [];
      for (let i = 0; i < nodes.length; i++) {
        out.push(this.labelOf(nodes[i]));
      }
      if (out.length === 0) {
        out.push("-");
      }
      return out;
    },
    clamp(x, lo, hi) {
      if (x < lo) {
        return lo;
      }
      if (x > hi) {
        return hi;
      }
      return x;
    },
    syncPicker() {
      const L = this.layerClamped;
      const roots = this.rootNodes();
      if (roots.length === 0) {
        return null;
      }
      const v = this.pickerValue;
      let i0 = v.length > 0 ? v[0] : 0;
      i0 = this.clamp(i0, 0, roots.length - 1);
      if (L === 1) {
        this.pickerValue = [i0];
        return null;
      }
      const ch1 = this.childrenOf(roots[i0]);
      let i1 = v.length > 1 ? v[1] : 0;
      if (ch1.length === 0) {
        i1 = 0;
      } else {
        i1 = this.clamp(i1, 0, ch1.length - 1);
      }
      if (L === 2) {
        this.pickerValue = [i0, i1];
        return null;
      }
      let i2 = 0;
      if (ch1.length > 0) {
        const ch2 = this.childrenOf(ch1[i1]);
        if (ch2.length > 0) {
          const prev = v.length > 2 ? v[2] : 0;
          i2 = this.clamp(prev, 0, ch2.length - 1);
        }
      }
      this.pickerValue = [i0, i1, i2];
    },
    onPickerChange(e) {
      const d = e["detail"];
      if (d == null) {
        return null;
      }
      const val = d["value"];
      if (val == null) {
        return null;
      }
      const L = this.layerClamped;
      if (val.length < L) {
        return null;
      }
      const old = this.pickerValue;
      if (L === 1) {
        const i0 = val[0];
        this.pickerValue = [i0];
        if (old.length > 0 && old[0] !== i0) {
          this.$emit("columnchange", new common_vendor.UTSJSONObject({ column: 0, value: i0 }));
        }
      } else if (L === 2) {
        const i0 = val[0];
        const i1 = val[1];
        if (old.length > 0 && old[0] !== i0) {
          this.pickerValue = [i0, 0];
          this.$emit("columnchange", new common_vendor.UTSJSONObject({ column: 0, value: i0 }));
        } else {
          this.pickerValue = [i0, i1];
          if (old.length > 1 && old[1] !== i1) {
            this.$emit("columnchange", new common_vendor.UTSJSONObject({ column: 1, value: i1 }));
          }
        }
      } else {
        const i0 = val[0];
        const i1 = val[1];
        const i2 = val[2];
        if (old.length > 0 && old[0] !== i0) {
          this.pickerValue = [i0, 0, 0];
          this.$emit("columnchange", new common_vendor.UTSJSONObject({ column: 0, value: i0 }));
        } else if (old.length > 1 && old[1] !== i1) {
          this.pickerValue = [i0, i1, 0];
          this.$emit("columnchange", new common_vendor.UTSJSONObject({ column: 1, value: i1 }));
        } else {
          this.pickerValue = [i0, i1, i2];
        }
      }
      this.syncPicker();
    },
    buildResult() {
      const L = this.layerClamped;
      const roots = this.rootNodes();
      const labels = [];
      const values = [];
      const nodes = [];
      const indices = [];
      if (roots.length === 0) {
        const empty = new common_vendor.UTSJSONObject({
          labels,
          values,
          nodes,
          indices,
          value: indices,
          params: this.params
        });
        return empty;
      }
      const v = this.pickerValue;
      const i0 = this.clamp(v[0], 0, roots.length - 1);
      const n0 = roots[i0];
      labels.push(this.labelOf(n0));
      values.push(this.valueOf(n0));
      nodes.push(n0);
      indices.push(i0);
      if (L >= 2) {
        const ch1 = this.childrenOf(n0);
        if (ch1.length > 0) {
          const i1 = v.length > 1 ? this.clamp(v[1], 0, ch1.length - 1) : 0;
          const n1 = ch1[i1];
          labels.push(this.labelOf(n1));
          values.push(this.valueOf(n1));
          nodes.push(n1);
          indices.push(i1);
          if (L >= 3) {
            const ch2 = this.childrenOf(n1);
            if (ch2.length > 0) {
              const i2 = v.length > 2 ? this.clamp(v[2], 0, ch2.length - 1) : 0;
              const n2 = ch2[i2];
              labels.push(this.labelOf(n2));
              values.push(this.valueOf(n2));
              nodes.push(n2);
              indices.push(i2);
            } else {
              labels.push("");
              values.push("");
            }
          }
        } else {
          labels.push("");
          values.push("");
          if (L >= 3) {
            labels.push("");
            values.push("");
          }
        }
      }
      const payload = new common_vendor.UTSJSONObject({
        labels,
        values,
        nodes,
        indices,
        value: indices,
        params: this.params
      });
      return payload;
    },
    onConfirm() {
      const payload = this.buildResult();
      this.$emit("confirm", payload);
      this.$emit("change", payload);
      this.$emit("update:show", false);
    },
    onDismiss() {
      this.$emit("cancel");
      this.$emit("hide", new common_vendor.UTSJSONObject({ params: this.params }));
      this.$emit("update:show", false);
    },
    onMaskTap() {
      if (this.maskClosable !== true) {
        return null;
      }
      this.onDismiss();
    }
  }
});
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.showMask
  }, $props.showMask ? {
    c: $options.maskZ,
    d: common_vendor.o((...args) => $options.onMaskTap && $options.onMaskTap(...args), "43")
  } : {}, {
    e: common_vendor.t($props.cancelText),
    f: common_vendor.s($options.cancelBtnStyle),
    g: common_vendor.o((...args) => $options.onDismiss && $options.onDismiss(...args), "7f"),
    h: $props.title !== ""
  }, $props.title !== "" ? {
    i: common_vendor.t($props.title),
    j: common_vendor.s($options.titleTextStyle)
  } : {}, {
    k: common_vendor.t($props.confirmText),
    l: common_vendor.s($options.confirmBtnStyle),
    m: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args), "72"),
    n: $options.layerClamped >= 1
  }, $options.layerClamped >= 1 ? {
    o: common_vendor.f($options.col0, (t, i, i0) => {
      return {
        a: common_vendor.t(t),
        b: i
      };
    }),
    p: common_vendor.s($options.cellTextStyle)
  } : {}, {
    q: $options.layerClamped >= 2
  }, $options.layerClamped >= 2 ? {
    r: common_vendor.f($options.col1, (t, i, i0) => {
      return {
        a: common_vendor.t(t),
        b: i
      };
    }),
    s: common_vendor.s($options.cellTextStyle)
  } : {}, {
    t: $options.layerClamped >= 3
  }, $options.layerClamped >= 3 ? {
    v: common_vendor.f($options.col2, (t, i, i0) => {
      return {
        a: common_vendor.t(t),
        b: i
      };
    }),
    w: common_vendor.s($options.cellTextStyle)
  } : {}, {
    x: $props.indicatorStyle,
    y: $data.pickerValue,
    z: common_vendor.o((...args) => $options.onPickerChange && $options.onPickerChange(...args), "65"),
    A: common_vendor.s($options.panelWrapStyle),
    B: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    C: `${_ctx.u_s_b_h}px`,
    D: `${_ctx.u_s_a_i_b}px`,
    E: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  }) : {});
}
const mPicker = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$D, [["render", _sfc_render$D], ["__scopeId", "data-v-92ebfdb3"]]);
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mPicker
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$C = common_vendor.defineComponent({
  name: "mPictureCropper",
  emits: ["ready", "imageLoad", "cropper", "imageError", "viewChange"],
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    frameWidthRatio: {
      type: Number,
      default: 0.72
    },
    aspectRatio: {
      type: Number,
      default: 1
    },
    frameColor: {
      type: String,
      default: "#5677fc"
    },
    /** 双指缩放 + 单指拖动；false 为旧版静态示意 */
    interactive: {
      type: Boolean,
      default: true
    },
    scaleMin: {
      type: Number,
      default: 0.5
    },
    scaleMax: {
      type: Number,
      default: 4
    },
    /** 相对铺满舞台的扩展倍数，越大可拖动范围越大 */
    panRoom: {
      type: Number,
      default: 1.28
    }
  },
  data() {
    return {
      imgW: 0,
      imgH: 0,
      stageW: 0,
      stageH: 0,
      mvW: 100,
      mvH: 100,
      mvX: 0,
      mvY: 0,
      scaleValue: 1,
      lastScale: 1,
      layoutKey: 0
    };
  },
  computed: {
    resolvedUrl() {
      const u = this.imageUrl;
      return u == null ? "" : u.trim();
    },
    mvStyle() {
      return new common_vendor.UTSJSONObject({
        width: this.mvW + "px",
        height: this.mvH + "px"
      });
    },
    frameOuterStyle() {
      const r = this.frameWidthRatio;
      const wPct = Math.max(35, Math.min(92, Math.round((r > 0 ? r : 0.72) * 100)));
      return new common_vendor.UTSJSONObject({
        width: wPct + "%"
      });
    },
    frameInnerStyle() {
      const ar = this.aspectRatio;
      const safeAr = ar > 0 ? ar : 1;
      const pbNum = 100 / safeAr;
      const c = this.frameColor;
      return new common_vendor.UTSJSONObject({
        paddingBottom: pbNum + "%",
        borderColor: c,
        boxShadow: "0 0 0 4000px rgba(0,0,0,0.48)"
      });
    },
    tipText() {
      if (this.interactive) {
        return "单指拖动、双指缩放；裁剪框仅示意。像素级导出需 Canvas / 原生 / 服务端。部分端 movable 能力见文档。";
      }
      return "框内为示意裁剪区域；像素级裁剪请用各端原生裁剪或 Canvas / 服务端处理。";
    }
  },
  watch: {
    resolvedUrl() {
      this.resetLayoutState();
      this.$nextTick(() => {
        this.scheduleMeasureStage();
      });
    }
  },
  mounted() {
    this.$emit("ready", new common_vendor.UTSJSONObject({}));
    this.$nextTick(() => {
      this.scheduleMeasureStage();
    });
  },
  methods: {
    resetLayoutState() {
      this.imgW = 0;
      this.imgH = 0;
      this.stageW = 0;
      this.stageH = 0;
      this.mvW = 100;
      this.mvH = 100;
      this.mvX = 0;
      this.mvY = 0;
      this.scaleValue = 1;
      this.lastScale = 1;
      this.layoutKey++;
    },
    scheduleMeasureStage() {
      const self = this;
      setTimeout(() => {
        self.measureStage();
      }, 50);
    },
    measureStage() {
      const self = this;
      try {
        const q = common_vendor.index.createSelectorQuery().in(self);
        q.select(".m-picture-cropper__stage").boundingClientRect((rect = null) => {
          if (rect == null) {
            return null;
          }
          const w = rect.width;
          const h = rect.height;
          if (w > 0 && h > 0) {
            self.stageW = w;
            self.stageH = h;
            self.applyLayout();
          }
        }).exec();
      } catch (_e) {
      }
    },
    onImageLoad(e) {
      this.$emit("imageLoad", e);
      const d = e["detail"];
      if (d != null) {
        const w = d["width"];
        const h_1 = d["height"];
        if (w != null) {
          this.imgW = w;
        }
        if (h_1 != null) {
          this.imgH = h_1;
        }
      }
      this.$nextTick(() => {
        this.measureStage();
        this.applyLayout();
      });
    },
    onImageError(_e) {
      this.$emit("imageError", new common_vendor.UTSJSONObject({}));
    },
    applyLayout() {
      if (!this.interactive) {
        return null;
      }
      const sw = this.stageW;
      const sh = this.stageH;
      const iw = this.imgW;
      const ih = this.imgH;
      if (sw <= 0 || sh <= 0) {
        return null;
      }
      if (iw <= 0 || ih <= 0) {
        return null;
      }
      const room = this.panRoom;
      const safeRoom = room > 1 ? room : 1.28;
      const cover = Math.max(sw / iw, sh / ih);
      let mw = iw * cover * safeRoom;
      let mh = ih * cover * safeRoom;
      if (mw < sw * 1.05) {
        mw = sw * 1.05;
      }
      if (mh < sh * 1.05) {
        mh = sh * 1.05;
      }
      this.mvW = mw;
      this.mvH = mh;
      this.mvX = (sw - mw) / 2;
      this.mvY = (sh - mh) / 2;
      this.scaleValue = 1;
      this.lastScale = 1;
    },
    onMvChange(e) {
      const d = e["detail"];
      if (d != null) {
        const x = d["x"];
        const y = d["y"];
        if (x != null) {
          this.mvX = x;
        }
        if (y != null) {
          this.mvY = y;
        }
      }
      this.emitViewState();
    },
    onMvScale(e) {
      const d = e["detail"];
      if (d != null) {
        const s = d["scale"];
        if (s != null) {
          const ns = s;
          this.scaleValue = ns;
          this.lastScale = ns;
        }
      }
      this.emitViewState();
    },
    emitViewState() {
      this.$emit("viewChange", new common_vendor.UTSJSONObject({
        x: this.mvX,
        y: this.mvY,
        scale: this.lastScale,
        stageW: this.stageW,
        stageH: this.stageH,
        mvW: this.mvW,
        mvH: this.mvH
      }));
    },
    resetView() {
      this.applyLayout();
      this.layoutKey++;
      this.emitViewState();
    },
    emitCrop() {
      const u = this.resolvedUrl;
      this.$emit("cropper", new common_vendor.UTSJSONObject({
        url: u,
        base64: "",
        width: this.imgW,
        height: this.imgH,
        x: this.mvX,
        y: this.mvY,
        scale: this.lastScale,
        stageW: this.stageW,
        stageH: this.stageH
      }));
    }
  }
});
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.resolvedUrl !== "" && $props.interactive
  }, $options.resolvedUrl !== "" && $props.interactive ? {
    b: $options.resolvedUrl,
    c: common_vendor.o((...args) => $options.onImageLoad && $options.onImageLoad(...args), "6f"),
    d: common_vendor.o((...args) => $options.onImageError && $options.onImageError(...args), "d3"),
    e: "mv-" + $data.layoutKey,
    f: $data.mvX,
    g: $data.mvY,
    h: common_vendor.s($options.mvStyle),
    i: $props.scaleMin,
    j: $props.scaleMax,
    k: $data.scaleValue,
    l: common_vendor.o((...args) => $options.onMvChange && $options.onMvChange(...args), "71"),
    m: common_vendor.o((...args) => $options.onMvScale && $options.onMvScale(...args), "d8")
  } : $options.resolvedUrl !== "" && !$props.interactive ? {
    o: $options.resolvedUrl,
    p: common_vendor.o((...args) => $options.onImageLoad && $options.onImageLoad(...args), "60"),
    q: common_vendor.o((...args) => $options.onImageError && $options.onImageError(...args), "6a")
  } : {}, {
    n: $options.resolvedUrl !== "" && !$props.interactive,
    r: $options.resolvedUrl !== ""
  }, $options.resolvedUrl !== "" ? {
    s: common_vendor.s($options.frameInnerStyle),
    t: common_vendor.s($options.frameOuterStyle)
  } : {}, {
    v: common_vendor.t($options.tipText),
    w: $props.interactive && $options.resolvedUrl !== ""
  }, $props.interactive && $options.resolvedUrl !== "" ? {
    x: common_vendor.o((...args) => $options.resetView && $options.resetView(...args), "68")
  } : {}, {
    y: common_vendor.o((...args) => $options.emitCrop && $options.emitCrop(...args), "b6"),
    z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    A: `${_ctx.u_s_b_h}px`,
    B: `${_ctx.u_s_a_i_b}px`,
    C: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mPictureCropper = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$C, [["render", _sfc_render$C], ["__scopeId", "data-v-7f07e48c"]]);
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mPictureCropper
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = common_vendor.defineComponent({
  name: "mPopup",
  emits: ["close", "overlay-click", "update:show", "update:visible"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "bottom"
    },
    round: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: [Number, String],
      default: 0.5
    },
    closeable: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [Number, String],
      default: 80
    },
    /** 是否启用显示/隐藏过渡 */
    animation: {
      type: Boolean,
      default: true
    },
    /** 与 CSS 过渡时长一致（毫秒），关闭后延迟卸载面板 */
    duration: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      leaving: false,
      panelActive: false,
      closeTimer: null
    };
  },
  computed: {
    isOpen() {
      return this.show || this.visible;
    },
    contentMounted() {
      if (!this.animation) {
        return this.isOpen;
      }
      return this.isOpen || this.leaving;
    },
    overlayVisible() {
      return this.isOpen;
    },
    panelShowClass() {
      if (!this.animation) {
        return this.isOpen;
      }
      return this.panelActive;
    },
    contentStyle() {
      const sec = this.duration / 1e3;
      const durStr = sec + "s";
      const pos = this.position;
      const style = new common_vendor.UTSJSONObject(
        {
          zIndex: this.zIndex,
          transitionDuration: durStr
        }
        // 左右侧：高度由样式 top:0 + bottom:0 拉满视口，不再套默认 maxHeight（避免 80vh 裁成「不满屏」）
      );
      if (pos === "left" || pos === "right" || pos === "fullscreen") {
        style.maxHeight = "100%";
      } else {
        style.maxHeight = this.maxHeight + "vh";
      }
      return style;
    }
  },
  watch: {
    isOpen: {
      handler(val) {
        this.onIsOpenChange(val);
      }
    }
  },
  mounted() {
    if (this.isOpen) {
      this.openEnter();
    }
  },
  beforeUnmount() {
    this.cancelCloseTimer();
  },
  methods: {
    cancelCloseTimer() {
      if (this.closeTimer != null) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    openEnter() {
      if (!this.animation) {
        this.panelActive = true;
        this.leaving = false;
        return null;
      }
      this.leaving = false;
      this.panelActive = false;
      this.$nextTick(() => {
        this.panelActive = true;
      });
    },
    closeLeave() {
      if (!this.animation) {
        this.panelActive = false;
        this.leaving = false;
        return null;
      }
      this.panelActive = false;
      this.leaving = true;
      this.cancelCloseTimer();
      const ms = this.duration;
      this.closeTimer = setTimeout(() => {
        this.leaving = false;
        this.closeTimer = null;
      }, ms);
    },
    onIsOpenChange(val) {
      if (val) {
        this.cancelCloseTimer();
        this.openEnter();
      } else {
        this.closeLeave();
      }
    },
    emitDismiss() {
      this.$emit("update:show", false);
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    handleOverlayClick() {
      if (this.closeOnClickOverlay) {
        this.emitDismiss();
      }
      this.$emit("overlay-click");
    },
    handleCloseClick() {
      this.emitDismiss();
    }
  }
});
if (!Array) {
  const _easycom_m_overlay2 = common_vendor.resolveComponent("m-overlay");
  _easycom_m_overlay2();
}
const _easycom_m_overlay = () => "./components/m-overlay/m-overlay.js";
if (!Math) {
  _easycom_m_overlay();
}
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.o($options.handleOverlayClick, "5c"),
    b: common_vendor.p({
      show: $options.overlayVisible,
      opacity: $props.overlayOpacity,
      ["z-index"]: $props.zIndex - 1,
      ["duration-ms"]: $props.duration,
      class: "data-v-852cc016"
    }),
    c: $options.contentMounted
  }, $options.contentMounted ? common_vendor.e({
    d: $props.closeable
  }, $props.closeable ? {
    e: common_vendor.o((...args) => $options.handleCloseClick && $options.handleCloseClick(...args), "64")
  } : {}, {
    f: $props.closeable ? 1 : "",
    g: common_vendor.n(`m-popup--${$props.position}`),
    h: common_vendor.n({
      "m-popup--round": $props.round
    }),
    i: common_vendor.n({
      "m-popup__content--show": $options.panelShowClass
    }),
    j: common_vendor.s($options.contentStyle)
  }) : {}, {
    k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    l: `${_ctx.u_s_b_h}px`,
    m: `${_ctx.u_s_a_i_b}px`,
    n: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component$5 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-852cc016"]]);
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = common_vendor.defineComponent({
  name: "mPrice",
  props: {
    // 价格（与 value 二选一，value 优先）
    price: {
      type: [Number, String],
      default: "0.00"
    },
    value: {
      type: [Number, String],
      default: ""
    },
    symbol: {
      type: String,
      default: "¥"
    },
    // 为 false 时小数与整数同字号（整段一个 text）
    small: {
      type: Boolean,
      default: true
    },
    // 整体字号档位：small / normal / large
    size: {
      type: String,
      default: "normal"
    },
    color: {
      type: String,
      default: "#303133"
    },
    lineThrough: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    priceStr() {
      const v = this.value;
      if (v !== "" && v != null) {
        return "" + v;
      }
      return "" + this.price;
    },
    useDecimalSmall() {
      return this.small !== false;
    },
    hasDecimal() {
      return this.priceStr.indexOf(".") >= 0 && this.decPart.length > 0;
    },
    intPart() {
      const s = this.priceStr;
      const i = s.indexOf(".");
      return i >= 0 ? s.substring(0, i) : s;
    },
    decPart() {
      const s = this.priceStr;
      const i = s.indexOf(".");
      return i >= 0 ? s.substring(i + 1) : "";
    },
    displayWhole() {
      return this.priceStr;
    },
    priceSizeClass() {
      const s = this.size;
      if (s === "small") {
        return "m-price--sm";
      }
      if (s === "large") {
        return "m-price--lg";
      }
      return "m-price--md";
    },
    lineStyle() {
      const st = new common_vendor.UTSJSONObject({ color: this.color });
      if (this.lineThrough) {
        st.textDecoration = "line-through";
      }
      return st;
    }
  }
});
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.symbol !== ""
  }, $props.symbol !== "" ? {
    b: common_vendor.t($props.symbol),
    c: common_vendor.s($options.lineStyle)
  } : {}, {
    d: $options.useDecimalSmall && $options.hasDecimal
  }, $options.useDecimalSmall && $options.hasDecimal ? {
    e: common_vendor.t($options.intPart),
    f: common_vendor.s($options.lineStyle),
    g: common_vendor.t($options.decPart),
    h: common_vendor.s($options.lineStyle)
  } : {
    i: common_vendor.t($options.displayWhole),
    j: common_vendor.s($options.lineStyle)
  }, {
    k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    l: common_vendor.n($options.priceSizeClass),
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: `${_ctx.u_s_b_h}px`,
    o: `${_ctx.u_s_a_i_b}px`
  });
}
const mPrice = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-76c8688f"]]);
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mPrice
}, Symbol.toStringTag, { value: "Module" }));
function hexForQrApi(c) {
  const s = c.trim();
  if (s.length === 0) {
    return "";
  }
  if (s.startsWith("#")) {
    return s.substring(1);
  }
  return s;
}
const _sfc_main$z = common_vendor.defineComponent({
  name: "mQrcode",
  props: {
    value: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 200
    },
    color: {
      type: String,
      default: "#000000"
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    margin: {
      type: [Number, String],
      default: 0
    },
    errorLevel: {
      type: String,
      default: "M"
    },
    // 中心 Logo 图片地址（叠在二维码上方，各端通用）
    logo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      canvasId: "",
      /** 微信小程序：运行时是否存在 uni.makeQrCode（uni-app x 可能未实现） */
      mpHasMakeQrCode: true
    };
  },
  computed: {
    qrViewStyle() {
      const w = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({ width: w, height: w });
    },
    qrCanvasStyle() {
      const w = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({ width: w, height: w, backgroundColor: this.bgColor });
    },
    /** App/H5：qrCodeImageApiBase 有值时生成 PNG 地址；微信端有 makeQrCode 用 canvas，否则无 makeQrCode 时用同地址回退为 image */
    mpWxUseNetworkQr() {
      if (this.mpHasMakeQrCode) {
        return false;
      }
      const src = this.networkQrSrc;
      return src.length > 0;
    },
    networkQrSrc() {
      const baseRaw = uni_modules_mUnix_config.getMUiConfig().qrCodeImageApiBase;
      const base = baseRaw != null ? baseRaw.trim() : "";
      if (base.length === 0) {
        return "";
      }
      const v = this.value.trim();
      if (v.length === 0) {
        return "";
      }
      const rpxN = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size));
      const si = common_vendor.index.getSystemInfoSync();
      let winW = si.windowWidth;
      if (winW == null || winW <= 0) {
        winW = 375;
      }
      const pxSize = Math.max(64, Math.round(rpxN * winW / 750));
      let fg = hexForQrApi(this.color);
      if (fg.length === 0) {
        fg = "000000";
      }
      let bg = hexForQrApi(this.bgColor);
      if (bg.length === 0) {
        bg = "ffffff";
      }
      const sep = base.indexOf("?") >= 0 ? "&" : "?";
      return base + sep + "size=" + pxSize + "x" + pxSize + "&color=" + fg + "&bgcolor=" + bg + "&data=" + encodeURIComponent(v);
    }
  },
  created() {
    this.canvasId = "m-qrcode-" + Date.now() + "-" + Math.floor(Math.random() * 1e5);
    const uniAny = common_vendor.index;
    this.mpHasMakeQrCode = typeof uniAny.makeQrCode === "function";
  },
  watch: {
    value() {
      this.drawWx();
    },
    size() {
      this.drawWx();
    },
    color() {
      this.drawWx();
    },
    bgColor() {
      this.drawWx();
    },
    margin() {
      this.drawWx();
    },
    errorLevel() {
      this.drawWx();
    }
  },
  mounted() {
    this.drawWx();
  },
  methods: {
    onMpNetworkQrImageError(_err = null) {
      common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-qrcode/m-qrcode.uvue:183", "m-qrcode: 网络二维码图片加载失败。请在微信小程序后台「downloadFile 合法域名」中添加接口域名（默认使用 api.qrserver.com），或在开发者工具中勾选「不校验合法域名」");
    },
    drawWx() {
      if (this.mpWxUseNetworkQr) {
        return null;
      }
      if (!this.mpHasMakeQrCode) {
        const ctxNo = common_vendor.index.createCanvasContext(this.canvasId, this);
        const pr = common_vendor.index.getSystemInfoSync().pixelRatio;
        const rpxN = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size));
        const cw = rpxN * pr;
        const ch = rpxN * pr;
        ctxNo.setFillStyle(this.bgColor);
        ctxNo.fillRect(0, 0, cw, ch);
        ctxNo.draw();
        return null;
      }
      const text = this.value.trim();
      if (text.length === 0) {
        const ctx0 = common_vendor.index.createCanvasContext(this.canvasId, this);
        const pixelRatio0 = common_vendor.index.getSystemInfoSync().pixelRatio;
        const rpx0 = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size));
        const cw0 = rpx0 * pixelRatio0;
        const ch0 = rpx0 * pixelRatio0;
        ctx0.setFillStyle(this.bgColor);
        ctx0.fillRect(0, 0, cw0, ch0);
        ctx0.draw();
        return null;
      }
      const pixelRatio = common_vendor.index.getSystemInfoSync().pixelRatio;
      const rpxNum = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size));
      const canvasWidth = rpxNum * pixelRatio;
      const canvasHeight = rpxNum * pixelRatio;
      const ctx = common_vendor.index.createCanvasContext(this.canvasId, this);
      ctx.setFillStyle(this.bgColor);
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fill();
      common_vendor.index.makeQrCode(new common_vendor.UTSJSONObject({
        canvas: ctx,
        text,
        width: canvasWidth,
        height: canvasHeight,
        color: this.color,
        background: this.bgColor,
        errorCorrectLevel: this.errorLevel,
        success: () => {
          ctx.draw();
        },
        fail: (err = null) => {
          common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-qrcode/m-qrcode.uvue:238", "二维码生成失败", err);
        }
      }));
    }
  }
});
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.mpWxUseNetworkQr
  }, $options.mpWxUseNetworkQr ? {
    b: $options.networkQrSrc,
    c: common_vendor.s($options.qrCanvasStyle),
    d: common_vendor.o((...args) => $options.onMpNetworkQrImageError && $options.onMpNetworkQrImageError(...args), "f7")
  } : {
    e: $data.canvasId,
    f: common_vendor.s($options.qrCanvasStyle)
  }, {
    g: $props.logo.length > 0
  }, $props.logo.length > 0 ? {
    h: $props.logo
  } : {}, {
    i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    j: common_vendor.s($options.qrViewStyle),
    k: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mQrcode = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-d78a27d9"]]);
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mQrcode
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = common_vendor.defineComponent({
  name: "mRadioGroup",
  emits: ["update:modelValue", "input", "change"],
  provide() {
    return {
      mRadioGroup: this
    };
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    /** 表单字段名，便于业务提交时识别 */
    name: {
      type: String,
      default: ""
    },
    /** 整组禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 子项未单独指定 color 时的默认选中色 */
    color: {
      type: String,
      default: ""
    },
    /** 子项未单独指定 borderColor 时的默认边框色 */
    borderColor: {
      type: String,
      default: ""
    },
    /** column：纵向；row：横向排列（子节点建议直接为 m-radio） */
    direction: {
      type: String,
      default: "column"
    }
  },
  methods: {
    /** 由 m-radio 调用，切换选中值 */
    selectValue(next) {
      if (this.disabled) {
        return null;
      }
      const cur = this.modelValue;
      if (cur === next) {
        return null;
      }
      this.$emit("update:modelValue", next);
      this.$emit("input", next);
      this.$emit("change", next);
    },
    isSelected(value) {
      return this.modelValue === value;
    }
  }
});
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: $props.direction === "row" ? 1 : "",
    c: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    d: `${_ctx.u_s_b_h}px`,
    e: `${_ctx.u_s_a_i_b}px`
  };
}
const mRadioGroup = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRadioGroup
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = common_vendor.defineComponent({
  name: "mRadio",
  emits: ["click"],
  inject: {
    mRadioGroup: new common_vendor.UTSJSONObject({
      from: "mRadioGroup",
      default: null,
      type: Object
    })
  },
  props: {
    /** 选项值，与 group 的 modelValue 比较 */
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** 选中时填充色（及 checkOnly 时对号颜色） */
    color: {
      type: String,
      default: ""
    },
    /** 未选中边框颜色 */
    borderColor: {
      type: String,
      default: ""
    },
    /** 实心圆内对号颜色 */
    checkMarkColor: {
      type: String,
      default: "#ffffff"
    },
    /** 外圈尺寸，rpx */
    size: {
      type: [Number, String],
      default: 40
    },
    /** 整体缩放 */
    scale: {
      type: [Number, String],
      default: 1
    },
    /** true：选中时仅显示对号，无实心圆填充 */
    checkOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /** 勿命名为 group，UTS 易将 this.group 推断为函数类型 */
    radioGroup() {
      return this.mRadioGroup;
    },
    isChecked() {
      const g = this.radioGroup;
      if (g == null) {
        return false;
      }
      return g.isSelected(this.value);
    },
    mergedDisabled() {
      const g = this.radioGroup;
      if (g != null && g.disabled) {
        return true;
      }
      return this.disabled;
    },
    resolvedColor() {
      if (this.color !== "") {
        return this.color;
      }
      const g = this.radioGroup;
      if (g != null && g.color !== "") {
        return g.color;
      }
      return "#5677fc";
    },
    resolvedBorderColor() {
      if (this.borderColor !== "") {
        return this.borderColor;
      }
      const g = this.radioGroup;
      if (g != null && g.borderColor !== "") {
        return g.borderColor;
      }
      return "#cccccc";
    },
    sizeNum() {
      const s = this.size;
      if (typeof s === "number") {
        return s;
      }
      const p = parseInt(s.replace("rpx", "").trim());
      if (isNaN(p)) {
        return 40;
      }
      return p;
    },
    checkIconSize() {
      const sn = this.sizeNum;
      const n = Math.floor(sn * 0.5);
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(n);
    },
    scaleNum() {
      const s = this.scale;
      if (typeof s === "number") {
        return s > 0 ? s : 1;
      }
      const p = parseFloat(s.trim());
      if (isNaN(p) || p <= 0) {
        return 1;
      }
      return p;
    },
    iconWrapStyle() {
      const sc = this.scaleNum;
      if (sc !== 1) {
        return new common_vendor.UTSJSONObject({ transform: "scale(" + sc + ")" });
      }
      return new common_vendor.UTSJSONObject({});
    },
    dotStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const st = new common_vendor.UTSJSONObject({
        width: wh,
        height: wh,
        borderColor: this.resolvedBorderColor
      });
      const on = this.isChecked;
      if (on) {
        st["backgroundColor"] = this.resolvedColor;
        st["borderColor"] = this.resolvedColor;
      }
      return st;
    },
    ringEmptyStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({
        width: wh,
        height: wh,
        borderColor: this.resolvedBorderColor
      });
    },
    checkOnlyWrapStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      return new common_vendor.UTSJSONObject({
        width: wh,
        height: wh
      });
    },
    /** 横向 group 子项间距（见 m-checkbox 同名字段说明） */
    rootGroupSpacingStyle() {
      const g = this.radioGroup;
      if (g == null) {
        return new common_vendor.UTSJSONObject({});
      }
      const dir = g.direction;
      if (dir !== "row") {
        return new common_vendor.UTSJSONObject({});
      }
      const st = new common_vendor.UTSJSONObject({});
      st["marginTop"] = "0";
      st["marginRight"] = "40rpx";
      st["marginBottom"] = "20rpx";
      return st;
    }
  },
  methods: {
    onTap() {
      const vm = this;
      if (vm.mergedDisabled === true) {
        return null;
      }
      const g = vm.radioGroup;
      if (g == null) {
        return null;
      }
      const val = vm.value;
      g.selectValue(val);
      vm.$emit("click", val);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$8 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$8();
}
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.checkOnly
  }, $props.checkOnly ? common_vendor.e({
    b: $options.isChecked
  }, $options.isChecked ? {
    c: common_vendor.p({
      name: "select",
      size: $options.checkIconSize,
      color: $options.resolvedColor,
      class: "data-v-009b7c1d"
    })
  } : {
    d: common_vendor.s($options.ringEmptyStyle)
  }, {
    e: common_vendor.s($options.checkOnlyWrapStyle)
  }) : common_vendor.e({
    f: $options.isChecked
  }, $options.isChecked ? {
    g: common_vendor.p({
      name: "select",
      size: $options.checkIconSize,
      color: $props.checkMarkColor,
      class: "data-v-009b7c1d"
    })
  } : {}, {
    h: $options.isChecked ? 1 : "",
    i: common_vendor.s($options.dotStyle)
  }), {
    j: common_vendor.s($options.iconWrapStyle),
    k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    l: $options.mergedDisabled ? 1 : "",
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: common_vendor.s($options.rootGroupSpacingStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    p: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "8d")
  });
}
const mRadio = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-009b7c1d"]]);
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRadio
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = common_vendor.defineComponent({
  name: "mRate",
  emits: ["change", "update:current"],
  props: {
    quantity: {
      type: Number,
      default: 5
    },
    current: {
      type: Number,
      default: 0
    },
    score: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    normal: {
      type: String,
      default: "#b2b2b2"
    },
    active: {
      type: String,
      default: "#EB0909"
    },
    hollow: {
      type: Boolean,
      default: false
    },
    params: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    effectiveCurrent() {
      const c = this.current;
      const q = this.quantity;
      if (c < 0) {
        return 0;
      }
      if (c > q) {
        return q;
      }
      return c;
    }
  },
  methods: {
    starColor(i) {
      if (i <= this.effectiveCurrent) {
        return this.active;
      }
      return this.normal;
    },
    onStarTap(i) {
      if (this.disabled) {
        return null;
      }
      const p = this.params;
      const np = typeof p === "number" ? p : parseInt("" + p);
      this.$emit("update:current", i);
      this.$emit("change", new common_vendor.UTSJSONObject({ index: i, params: isNaN(np) ? 0 : np }));
    }
  }
});
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.f($props.quantity, (i, k0, i0) => {
      return {
        a: common_vendor.t($props.hollow && i > $options.effectiveCurrent ? "☆" : "★"),
        b: $options.starColor(i),
        c: i,
        d: common_vendor.o(($event) => $options.onStarTap(i), i)
      };
    }),
    b: $props.size + "px",
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: common_vendor.o(() => {
    }, "8a"),
    e: `${_ctx.u_s_b_h}px`,
    f: `${_ctx.u_s_a_i_b}px`,
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mRate = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRate
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = common_vendor.defineComponent({
  name: "mRichtext",
  props: {
    content: {
      type: String,
      default: ""
    },
    /** 容器宽度，默认 100%；数字默认 rpx */
    width: {
      type: [Number, String],
      default: "100%"
    },
    /**
     * 固定高度；设置后内容在区域内纵向滚动（适合长文、大表格等）。
     * 数字默认按 rpx，或传 400rpx / 200px 等。
     */
    height: {
      type: [Number, String],
      default: ""
    },
    /**
     * 最大高度（与 height 二选一优先 height）；超出部分在容器内滚动（依赖 overflow-y:auto，与 scroll-view 行为不同）。
     */
    maxHeight: {
      type: [Number, String],
      default: ""
    },
    /** 是否允许长按选择文本（以各端 rich-text 支持为准） */
    selectable: {
      type: Boolean,
      default: false
    },
    /** content 为空时显示的占位文案；不传则空白 */
    placeholder: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasContent() {
      const c = this.content;
      if (c == null) {
        return false;
      }
      return c.length > 0;
    },
    showPlaceholder() {
      if (this.hasContent) {
        return false;
      }
      const p = this.placeholder;
      return p != null && p.length > 0;
    },
    heightStr() {
      const h = this.height;
      if (h == null) {
        return "";
      }
      if (typeof h === "number") {
        return h > 0 ? uni_modules_mUnix_components_mTools_Ut.toCssLength(h) : "";
      }
      const s = h.trim();
      if (s.length === 0 || s === "0") {
        return "";
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(h);
    },
    maxHeightStr() {
      const h = this.maxHeight;
      if (h == null) {
        return "";
      }
      if (typeof h === "number") {
        return h > 0 ? uni_modules_mUnix_components_mTools_Ut.toCssLength(h) : "";
      }
      const s = h.trim();
      if (s.length === 0 || s === "0") {
        return "";
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(h);
    },
    useScrollBox() {
      return this.heightStr.length > 0;
    },
    useMaxHeightClip() {
      if (this.useScrollBox) {
        return false;
      }
      return this.maxHeightStr.length > 0;
    },
    rootOuterStyle() {
      const w = this.width;
      let ws = "100%";
      if (typeof w === "number") {
        ws = w > 0 ? uni_modules_mUnix_components_mTools_Ut.toCssLength(w) : "100%";
      } else if (w != null && w.length > 0) {
        ws = uni_modules_mUnix_components_mTools_Ut.toCssLength(w);
      }
      return new common_vendor.UTSJSONObject({
        width: ws
      });
    },
    scrollBoxStyle() {
      return new common_vendor.UTSJSONObject({
        height: this.heightStr,
        width: "100%"
      });
    },
    clipBoxStyle() {
      return new common_vendor.UTSJSONObject({
        maxHeight: this.maxHeightStr,
        width: "100%",
        overflowY: "scroll"
      });
    }
  }
});
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.hasContent && $options.useScrollBox
  }, $options.hasContent && $options.useScrollBox ? {
    b: $props.content,
    c: $props.selectable,
    d: common_vendor.s($options.scrollBoxStyle)
  } : $options.hasContent && $options.useMaxHeightClip ? {
    f: $props.content,
    g: $props.selectable,
    h: common_vendor.s($options.clipBoxStyle)
  } : $options.hasContent ? {
    j: $props.content,
    k: $props.selectable
  } : $options.showPlaceholder ? {
    m: common_vendor.t($props.placeholder)
  } : {}, {
    e: $options.hasContent && $options.useMaxHeightClip,
    i: $options.hasContent,
    l: $options.showPlaceholder,
    n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    o: common_vendor.s($options.rootOuterStyle),
    p: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    q: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mRichtext = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-24b82a03"]]);
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRichtext
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = common_vendor.defineComponent({
  name: "mRollingNews",
  emits: ["click", "change", "leftClick", "rightClick"],
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    prop: {
      type: String,
      default: "title"
    },
    vertical: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    circular: {
      type: Boolean,
      default: true
    },
    interval: {
      type: [Number, String],
      default: 3e3
    },
    duration: {
      type: [Number, String],
      default: 400
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    color: {
      type: String,
      default: "#333333"
    },
    bold: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 80
    },
    width: {
      type: [Number, String],
      default: 0
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    background: {
      type: String,
      default: ""
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    padding: {
      type: String,
      default: "0 30rpx"
    },
    lines: {
      type: Number,
      default: 1
    },
    showIconSlot: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    resolvedBg() {
      const b = this.background;
      if (b != null && b.length > 0) {
        return b;
      }
      return this.backgroundColor;
    },
    rawItems() {
      return this.list;
    },
    textList() {
      const raw = this.rawItems;
      const field = this.prop;
      const out = [];
      for (let i = 0; i < raw.length; i++) {
        const v = raw[i];
        if (typeof v === "string") {
          out.push(v);
        } else if (v != null) {
          const o = v;
          const val = o[field];
          if (val != null) {
            out.push("" + val);
          } else {
            out.push("" + v);
          }
        }
      }
      if (out.length === 0) {
        out.push("");
      }
      return out;
    },
    intervalNum() {
      const v = this.interval;
      if (typeof v === "number") {
        return v;
      }
      const n = parseInt(v);
      if (isNaN(n)) {
        return 3e3;
      }
      return n;
    },
    durationNum() {
      const v = this.duration;
      if (typeof v === "number") {
        return v;
      }
      const n = parseInt(v);
      if (isNaN(n)) {
        return 400;
      }
      return n;
    },
    textLineStyle() {
      const ln = this.lines;
      const fs = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.fontSize);
      const style = new common_vendor.UTSJSONObject({
        "font-size": fs,
        color: this.color,
        "font-weight": this.bold ? "bold" : "normal",
        overflow: "hidden"
      });
      if (ln > 1) {
        style["display"] = "-webkit-box";
        style["WebkitBoxOrient"] = "vertical";
        style["WebkitLineClamp"] = "" + ln;
      } else {
        style["whiteSpace"] = "nowrap";
        style["textOverflow"] = "ellipsis";
      }
      return style;
    },
    swiperBoxStyle() {
      const w = this.width;
      const style = new common_vendor.UTSJSONObject({
        height: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height)
      });
      if (typeof w === "number" && w > 0) {
        style["width"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(w);
      } else if (typeof w === "string" && w !== "0" && w.length > 0) {
        style["width"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(w);
      } else {
        style["flex"] = "1";
      }
      return style;
    },
    rootStyle() {
      const r = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.resolvedBg,
        borderRadius: r,
        padding: this.padding
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    }
  },
  methods: {
    lineKey(idx, line) {
      return "k" + idx + "_" + line;
    },
    itemAt(idx) {
      const raw = this.rawItems;
      if (idx >= 0 && idx < raw.length) {
        return raw[idx];
      }
      return null;
    },
    onLineTap(idx, line) {
      const item = this.itemAt(idx);
      const payload = new common_vendor.UTSJSONObject({
        index: idx,
        item: item != null ? item : line,
        text: line
      });
      this.$emit("click", payload);
    },
    onSwiperChange(e = null) {
      const detail = e != null ? e["detail"] : null;
      let idx = 0;
      if (detail != null) {
        const c = detail["current"];
        if (typeof c === "number") {
          idx = c;
        }
      }
      const item = this.itemAt(idx);
      this.$emit("change", new common_vendor.UTSJSONObject({ index: idx, item }));
    },
    onLeftTap() {
      this.$emit("leftClick", new common_vendor.UTSJSONObject({}));
    },
    onRightTap() {
      this.$emit("rightClick", new common_vendor.UTSJSONObject({}));
    }
  }
});
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.showIconSlot
  }, $props.showIconSlot ? {
    b: common_vendor.o((...args) => $options.onLeftTap && $options.onLeftTap(...args), "6e")
  } : {}, {
    c: common_vendor.f($options.textList, (line, idx, i0) => {
      return {
        a: common_vendor.t(line),
        b: common_vendor.o(($event) => $options.onLineTap(idx, line), $options.lineKey(idx, line)),
        c: $options.lineKey(idx, line)
      };
    }),
    d: common_vendor.s($options.textLineStyle),
    e: common_vendor.s($options.swiperBoxStyle),
    f: $props.vertical,
    g: $props.autoplay,
    h: $props.circular,
    i: $options.intervalNum,
    j: $options.durationNum,
    k: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args), "73"),
    l: common_vendor.o((...args) => $options.onRightTap && $options.onRightTap(...args), "e3"),
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: common_vendor.s($options.rootStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mRollingNews = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-c2c57f91"]]);
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRollingNews
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = common_vendor.defineComponent({
  name: "mRow",
  provide() {
    return {
      mRowGutter: common_vendor.computed(() => {
        const gn = Number(this.gutter);
        return gn > 0 ? gn : 0;
      })
    };
  },
  props: {
    // 栅格间隔，单位rpx
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    getStyle() {
      const style = new common_vendor.UTSJSONObject({});
      const gutter = Number(this.gutter);
      if (gutter > 0) {
        const margin = -(gutter / 2) + "rpx";
        style.marginLeft = margin;
        style.marginRight = margin;
      }
      return style;
    }
  }
});
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: $props.gutter > 0 ? 1 : "",
    c: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    d: common_vendor.s($options.getStyle),
    e: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  };
}
const mRow = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-2dc624a2"]]);
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mRow
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = common_vendor.defineComponent({
  name: "mScreenshot",
  props: {
    // 图片质量 0-1
    quality: {
      type: [Number],
      default: 0.8
    },
    // 延迟截图毫秒
    delay: {
      type: [Number],
      default: 200
    }
  },
  data() {
    return {
      componentId: ""
    };
  },
  created() {
    this.componentId = "screenshot-" + Math.random().toString(36).substr(2, 9);
  },
  methods: {
    capture() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const query = common_vendor.index.createSelectorQuery().in(this);
          query.select("#" + this.componentId).fields(new common_vendor.UTSJSONObject({
            node: true,
            size: true
          })).exec((res) => {
            const node = res[0].node;
            if (!node) {
              reject(new Error("获取节点失败"));
              return null;
            }
            const width = res[0].width;
            const height = res[0].height;
            const canvas = common_vendor.wx$1.createCanvas();
            canvas.width = width * common_vendor.index.getSystemInfoSync().pixelRatio;
            canvas.height = height * common_vendor.index.getSystemInfoSync().pixelRatio;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            node.draw(ctx, () => {
              canvas.toTempFilePath(new common_vendor.UTSJSONObject({
                width,
                height,
                quality: this.quality,
                success: (res2 = null) => {
                  resolve({
                    tempFilePath: res2.tempFilePath
                  });
                },
                fail: (err = null) => {
                  reject(err);
                }
              }));
            });
          });
        }, this.delay);
      });
    }
  }
});
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei("screenshot-" + $data.componentId, "view"),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    c: `${_ctx.u_s_b_h}px`,
    d: `${_ctx.u_s_a_i_b}px`,
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mScreenshot = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-ba02ef19"]]);
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mScreenshot
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = common_vendor.defineComponent({
  name: "mSearch",
  emits: ["update:modelValue", "input", "confirm", "search", "clear", "cancel", "focus", "blur"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请搜索"
    },
    placeholderColor: {
      type: String,
      default: "#c0c4cc"
    },
    /** square 使用 radius；round 为胶囊形（高圆角） */
    shape: {
      type: String,
      default: "square"
    },
    radius: {
      type: [Number, String],
      default: 8
    },
    height: {
      type: [Number, String],
      default: 64
    },
    iconSize: {
      type: [Number, String],
      default: 32
    },
    /** 整条搜索栏外层背景 */
    bgColor: {
      type: String,
      default: "#f5f5f5"
    },
    /** 与 bgColor 相同含义，兼容演示页 backgroundColor */
    backgroundColor: {
      type: String,
      default: ""
    },
    /** 输入框白底区域背景 */
    innerBgColor: {
      type: String,
      default: "#ffffff"
    },
    border: {
      type: Boolean,
      default: false
    },
    clearabled: {
      type: Boolean,
      default: true
    },
    cancelabled: {
      type: Boolean,
      default: false
    },
    /** 右侧「搜索」按钮（与 cancel 不同） */
    showAction: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: "搜索"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    iconSizeStr() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.iconSize);
    },
    outerBg() {
      if (this.backgroundColor !== "") {
        return this.backgroundColor;
      }
      return this.bgColor;
    },
    outerBarStyle() {
      return new common_vendor.UTSJSONObject({ backgroundColor: this.outerBg });
    },
    contentRadiusCss() {
      if (this.shape === "round") {
        return "999rpx";
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
    },
    innerBoxStyle() {
      return new common_vendor.UTSJSONObject({
        borderRadius: this.contentRadiusCss,
        height: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height),
        backgroundColor: this.innerBgColor
      });
    }
  },
  watch: {
    modelValue(val) {
      this.value = val;
    }
  },
  created() {
    this.value = this.modelValue;
  },
  methods: {
    syncModel() {
      this.$emit("update:modelValue", this.value);
      this.$emit("input", this.value);
    },
    handleInput(_e = null) {
      this.syncModel();
    },
    handleConfirm(_e = null) {
      this.$emit("confirm", this.value);
      this.$emit("search", this.value);
    },
    handleSearch() {
      if (!this.disabled) {
        this.$emit("search", this.value);
      }
    },
    handleClear() {
      this.value = "";
      this.syncModel();
      this.$emit("clear", "");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleFocus(e = null) {
      this.$emit("focus", e);
    },
    handleBlur(e = null) {
      this.$emit("blur", e);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$7 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$7();
}
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.p({
      name: "search",
      color: "#c0c4cc",
      size: $options.iconSizeStr,
      class: "data-v-3e948274"
    }),
    b: $props.disabled,
    c: $props.placeholder,
    d: $props.placeholderColor,
    e: common_vendor.o([($event) => $data.value = $event.detail.value, (...args) => $options.handleInput && $options.handleInput(...args)], "b1"),
    f: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args), "3a"),
    g: common_vendor.o((...args) => $options.handleFocus && $options.handleFocus(...args), "65"),
    h: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args), "dd"),
    i: $data.value,
    j: $props.clearabled && $data.value !== "" && !$props.disabled
  }, $props.clearabled && $data.value !== "" && !$props.disabled ? {
    k: common_vendor.p({
      name: "close",
      color: "#c0c4cc",
      size: $options.iconSizeStr,
      class: "data-v-3e948274"
    }),
    l: common_vendor.o((...args) => $options.handleClear && $options.handleClear(...args), "da")
  } : {}, {
    m: common_vendor.n({
      "m-search__content--border": $props.border
    }),
    n: common_vendor.n({
      "m-search__content--disabled": $props.disabled
    }),
    o: common_vendor.s($options.innerBoxStyle),
    p: $props.showAction
  }, $props.showAction ? {
    q: common_vendor.t($props.actionText),
    r: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args), "47")
  } : {}, {
    s: $props.cancelabled
  }, $props.cancelabled ? {
    t: common_vendor.o((...args) => $options.handleCancel && $options.handleCancel(...args), "c3")
  } : {}, {
    v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    w: common_vendor.s($options.outerBarStyle),
    x: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    y: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSearch = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-3e948274"]]);
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSearch
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = common_vendor.defineComponent({
  name: "mSection",
  emits: ["click"],
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: "#333333"
    },
    fontWeight: {
      type: [Number, String],
      default: 400
    },
    descr: {
      type: String,
      default: ""
    },
    descrSize: {
      type: [Number, String],
      default: 24
    },
    descrColor: {
      type: String,
      default: "#7a7a7a"
    },
    descrTop: {
      type: [Number, String],
      default: 16
    },
    isLine: {
      type: Boolean,
      default: false
    },
    lineWidth: {
      type: [Number, String],
      default: 8
    },
    lineColor: {
      type: String,
      default: "#5677fc"
    },
    lineRight: {
      type: [Number, String],
      default: 16
    },
    lineGap: {
      type: [Number, String],
      default: 4
    },
    background: {
      type: String,
      default: "transparent"
    },
    padding: {
      type: String,
      default: "20rpx 30rpx"
    },
    margin: {
      type: String,
      default: "0"
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.background,
        padding: this.padding,
        margin: this.margin
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    titleStyleComputed() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color,
        "font-weight": this.fontWeight
      });
    },
    descrStyleComputed() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.descrSize),
        color: this.descrColor,
        marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.descrTop)
      });
    },
    lineStyle() {
      return new common_vendor.UTSJSONObject({
        width: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.lineWidth),
        backgroundColor: this.lineColor,
        marginRight: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.lineRight),
        marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.lineGap),
        marginBottom: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.lineGap)
      });
    }
  },
  methods: {
    onRootTap() {
      this.$emit("click", new common_vendor.UTSJSONObject({ title: this.title }));
    }
  }
});
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.isLine
  }, $props.isLine ? {
    b: common_vendor.s($options.lineStyle)
  } : {}, {
    c: common_vendor.t($props.title),
    d: common_vendor.s($options.titleStyleComputed),
    e: $props.descr !== ""
  }, $props.descr !== "" ? {
    f: common_vendor.t($props.descr),
    g: common_vendor.s($options.descrStyleComputed)
  } : {}, {
    h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    i: common_vendor.s($options.rootStyle),
    j: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    k: common_vendor.o((...args) => $options.onRootTap && $options.onRootTap(...args), "86"),
    l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSection = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-506171c5"]]);
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSection
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = common_vendor.defineComponent({
  name: "mSegmentedControl",
  emits: ["click", "change", "update:current"],
  props: {
    values: {
      type: Array,
      default() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0
    },
    textActiveColor: {
      type: String,
      default: "#334155"
    },
    activeColor: {
      type: String,
      default: "#e5edf6	"
    },
    height: {
      type: String,
      default: "56rpx"
    },
    size: {
      type: String,
      default: "28rpx"
    },
    radius: {
      type: String,
      default: "24rpx"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inactiveColor: {
      type: String,
      default: "#666666"
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5"
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    valueList() {
      const raw = this.values;
      const out = [];
      for (let i = 0; i < raw.length; i++) {
        const v = raw[i];
        if (typeof v === "string") {
          out.push(v);
        } else {
          out.push("" + v);
        }
      }
      return out;
    },
    innerCurrent() {
      const c = this.current;
      const len = this.valueList.length;
      if (len === 0) {
        return 0;
      }
      if (c < 0) {
        return 0;
      }
      if (c >= len) {
        return len - 1;
      }
      return c;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        height: this.height,
        borderRadius: this.radius,
        backgroundColor: this.backgroundColor
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    thumbStyle() {
      const n = this.valueList.length;
      if (n <= 0) {
        return new common_vendor.UTSJSONObject({ display: "none" });
      }
      const pct = 100 / n;
      const i = this.innerCurrent;
      return new common_vendor.UTSJSONObject({
        width: pct + "%",
        left: i * pct + "%",
        transition: "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)",
        borderColor: this.activeColor,
        borderRadius: this.radius
      });
    }
  },
  methods: {
    textStyle(idx) {
      const active = idx === this.innerCurrent;
      return new common_vendor.UTSJSONObject({
        "font-size": this.size,
        color: active ? this.textActiveColor : this.inactiveColor,
        transition: "color 0.28s ease"
      });
    },
    onItemTap(idx) {
      if (this.disabled) {
        return null;
      }
      this.$emit("update:current", idx);
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx }));
      this.$emit("change", new common_vendor.UTSJSONObject({ index: idx }));
    }
  }
});
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.valueList.length > 0
  }, $options.valueList.length > 0 ? {
    b: common_vendor.s($options.thumbStyle)
  } : {}, {
    c: common_vendor.f($options.valueList, (item, idx, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.s($options.textStyle(idx)),
        c: idx,
        d: common_vendor.o(($event) => $options.onItemTap(idx), idx)
      };
    }),
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    e: $props.disabled ? 1 : "",
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    g: common_vendor.s($options.rootStyle),
    h: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component$4 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-74c1432a"]]);
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$o = common_vendor.defineComponent({
  name: "mSkeleton",
  props: {
    selector: {
      type: String,
      default: "m-skeleton"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    skeletonBgColor: {
      type: String,
      default: "#e9e9e9"
    },
    borderRadius: {
      type: String,
      default: "16rpx"
    },
    preloadData: {
      type: Array,
      default() {
        return [];
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    /** 为 false 时不渲染（由父级 v-if 控制亦可） */
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    visible() {
      return this.show;
    },
    elements() {
      const pd = this.preloadData;
      if (pd != null && pd.length > 0) {
        return pd;
      }
      return this.defaultBlocks();
    }
  },
  methods: {
    defaultBlocks() {
      const list = [];
      list.push(new common_vendor.UTSJSONObject({ left: 24, top: 24, width: 300, height: 28, skeletonType: "fillet" }));
      list.push(new common_vendor.UTSJSONObject({ left: 24, top: 72, width: 200, height: 24, skeletonType: "fillet" }));
      list.push(new common_vendor.UTSJSONObject({ left: 24, top: 120, width: 700, height: 200, skeletonType: "rect" }));
      return list;
    },
    blockStyle(el) {
      const st = new common_vendor.UTSJSONObject({});
      const t = el["skeletonType"];
      const typ = t == null ? "rect" : "" + t;
      st["position"] = "absolute";
      st["left"] = el["left"] + "rpx";
      st["top"] = el["top"] + "rpx";
      st["width"] = el["width"] + "rpx";
      st["height"] = el["height"] + "rpx";
      st["backgroundColor"] = this.skeletonBgColor;
      if (typ === "circular") {
        st["borderRadius"] = "50%";
      } else if (typ === "fillet") {
        st["borderRadius"] = this.borderRadius;
      } else {
        st["borderRadius"] = "0";
      }
      return st;
    }
  }
});
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.visible
  }, $options.visible ? {
    b: common_vendor.f($options.elements, (el, idx, i0) => {
      return {
        a: idx,
        b: common_vendor.s($options.blockStyle(el))
      };
    }),
    c: $props.active ? 1 : "",
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    e: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    f: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  } : {});
}
const mSkeleton = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSkeleton
}, Symbol.toStringTag, { value: "Module" }));
class RowCell extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          kind: { type: String, optional: false },
          segIdx: { type: Number, optional: true },
          idx: { type: Number, optional: true }
        };
      },
      name: "RowCell"
    };
  }
  constructor(options, metadata = RowCell.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.kind = this.__props__.kind;
    this.segIdx = this.__props__.segIdx;
    this.idx = this.__props__.idx;
    delete this.__props__;
  }
}
const _sfc_main$n = common_vendor.defineComponent({
  name: "mSteps",
  emits: ["click"],
  props: {
    type: {
      type: Number,
      default: 1
    },
    spacing: {
      type: String,
      default: "160rpx"
    },
    direction: {
      type: String,
      default: "row"
    },
    activeColor: {
      type: String,
      default: "#5677fc"
    },
    deactiveColor: {
      type: String,
      default: "#999999"
    },
    titleSize: {
      type: Number,
      default: 28
    },
    bold: {
      type: Boolean,
      default: false
    },
    descSize: {
      type: Number,
      default: 24
    },
    activeSteps: {
      type: Number,
      default: -1
    },
    lineStyleProp: {
      type: String,
      default: "solid"
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    titleField: {
      type: String,
      default: "title"
    },
    descrField: {
      type: String,
      default: "desc"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    }
  },
  computed: {
    typeNum() {
      return this.type;
    },
    itemCount() {
      return this.items.length;
    },
    descStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": this.descSize + "rpx",
        color: "#999999"
      });
    },
    rowCells() {
      const items = this.items;
      const out = [];
      const len = items.length;
      for (let i = 0; i < len; i++) {
        if (i > 0) {
          out.push(new RowCell({
            idx: null,
            kind: "seg",
            segIdx: i - 1
          }));
        }
        out.push(new RowCell({
          segIdx: null,
          kind: "col",
          idx: i
        }));
      }
      return out;
    }
  },
  methods: {
    itemTitle(item) {
      const k = this.titleField;
      const v = item[k];
      return v == null ? "" : "" + v;
    },
    itemDesc(item) {
      const k = this.descrField;
      const v = item[k];
      return v == null ? "" : "" + v;
    },
    segStyle(segIdx) {
      const active = this.activeSteps > segIdx;
      return new common_vendor.UTSJSONObject({
        flex: "1 1 0%",
        minWidth: "32rpx",
        height: "4rpx",
        backgroundColor: active ? this.activeColor : this.deactiveColor,
        alignSelf: "center"
      });
    },
    vLineStyle(segIdx) {
      const active = this.activeSteps > segIdx;
      return new common_vendor.UTSJSONObject({
        width: "4rpx",
        flex: "1",
        backgroundColor: active ? this.activeColor : this.deactiveColor
      });
    },
    dotStyle(idx) {
      const on = idx <= this.activeSteps;
      return new common_vendor.UTSJSONObject({
        backgroundColor: on ? this.activeColor : this.deactiveColor,
        width: "20rpx",
        height: "20rpx",
        borderRadius: "50%"
      });
    },
    numStyle(idx) {
      const on = idx <= this.activeSteps;
      return new common_vendor.UTSJSONObject({
        color: on ? "#ffffff" : this.deactiveColor,
        backgroundColor: on ? this.activeColor : "#f0f0f0",
        "font-size": "24rpx",
        width: "44rpx",
        height: "44rpx",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "44rpx"
      });
    },
    titleStyle(idx) {
      const st = new common_vendor.UTSJSONObject({});
      st["font-size"] = this.titleSize + "rpx";
      st["color"] = idx <= this.activeSteps ? this.activeColor : "#333333";
      if (this.bold) {
        st["font-weight"] = "bold";
      }
      return st;
    },
    onItemTap(idx) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx }));
    }
  }
});
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.direction === "row"
  }, $props.direction === "row" ? {
    b: common_vendor.f($options.rowCells, (cell, ri, i0) => {
      return common_vendor.e({
        a: cell.kind === "seg"
      }, cell.kind === "seg" ? {
        b: common_vendor.s($options.segStyle(cell.segIdx))
      } : common_vendor.e({
        c: $options.typeNum === 2
      }, $options.typeNum === 2 ? {
        d: common_vendor.t(cell.idx + 1),
        e: common_vendor.s($options.numStyle(cell.idx))
      } : {
        f: common_vendor.s($options.dotStyle(cell.idx))
      }, {
        g: common_vendor.t($options.itemTitle($props.items[cell.idx])),
        h: common_vendor.s($options.titleStyle(cell.idx)),
        i: $options.itemDesc($props.items[cell.idx]) !== ""
      }, $options.itemDesc($props.items[cell.idx]) !== "" ? {
        j: common_vendor.t($options.itemDesc($props.items[cell.idx])),
        k: common_vendor.s($options.descStyle)
      } : {}, {
        l: common_vendor.o(($event) => $options.onItemTap(cell.idx), "rs-" + ri)
      }), {
        m: "rs-" + ri
      });
    })
  } : {
    c: common_vendor.f($props.items, (item, idx, i0) => {
      return common_vendor.e({
        a: idx > 0
      }, idx > 0 ? {
        b: common_vendor.s($options.vLineStyle(idx - 1))
      } : {}, $options.typeNum === 2 ? {
        c: common_vendor.t(idx + 1),
        d: common_vendor.s($options.numStyle(idx))
      } : {
        e: common_vendor.s($options.dotStyle(idx))
      }, {
        f: idx < $options.itemCount - 1
      }, idx < $options.itemCount - 1 ? {
        g: common_vendor.s($options.vLineStyle(idx))
      } : {}, {
        h: common_vendor.t($options.itemTitle(item)),
        i: common_vendor.s($options.titleStyle(idx)),
        j: $options.itemDesc(item) !== ""
      }, $options.itemDesc(item) !== "" ? {
        k: common_vendor.t($options.itemDesc(item)),
        l: common_vendor.s($options.descStyle)
      } : {}, {
        m: idx,
        n: common_vendor.o(($event) => $options.onItemTap(idx), idx)
      });
    }),
    d: $options.typeNum === 2,
    e: $props.spacing
  }, {
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    h: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSteps = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSteps
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = common_vendor.defineComponent({
  name: "mStickyBottom",
  props: {
    // 层级
    zIndex: {
      type: [Number, String],
      default: 998
    },
    // 是否开启底部安全区域适配
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#ffffff"
    }
  }
});
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: $props.safeAreaInsetBottom ? 1 : "",
    b: $props.bgColor,
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: common_vendor.s({
      zIndex: $props.zIndex
    }),
    e: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const Component$3 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-80210247"]]);
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = common_vendor.defineComponent({
  name: "mSticky",
  emits: ["sticky", "change"],
  props: {
    /** 页面 onPageScroll(e) 的 e.scrollTop，或 scroll-view @scroll 的 detail.scrollTop */
    scrollTop: {
      type: Number,
      default: 0
    },
    /**
     * 吸顶后与可视区顶部的间距（px）。String 时按十进制解析整数。
     * H5 且 isNativeHeader 为 true 时会再叠加约 44px（原生导航内容区常见偏移）。
     */
    stickyTop: {
      type: [Number, String],
      default: 0
    },
    /** 占位最小高度，如 80rpx；空则 auto */
    stickyHeight: {
      type: String,
      default: ""
    },
    /** 是否展示 content 插槽（与头部同一块吸顶区域） */
    container: {
      type: Boolean,
      default: false
    },
    /** 吸顶态头部背景；transparent 时在非 fixed 不强制铺色 */
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    /** 列表索引，随 sticky / change 回传 */
    index: {
      type: [Number, String],
      default: 0
    },
    /** 异步内容增高等场景下递增，触发重新测量 */
    recalc: {
      type: Number,
      default: 0
    },
    /**
     * 是否按「带原生导航栏的页面」处理：true 时仅在 H5 对 stickyTop 叠加约 44px。
     * 组件放在 scroll-view 内滚动时建议 false，避免重复偏移。
     */
    isNativeHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 放在 scroll-view 内时，部分端 scrollTop 不变；父级可在每次 @scroll 时 scrollTick++。
     */
    scrollTick: {
      type: Number,
      default: 0
    },
    /**
     * scroll-view 节点的 id（不要带 #）。传入后吸顶用「本组件根节点 top − 视口 top」与 stickyTop 比较；
     * 不传则仍按占位块相对窗口 top 判定（适合页面级 onPageScroll）。
     */
    scrollViewportId: {
      type: String,
      default: ""
    },
    /** 可选：根节点 id，多实例吸顶时建议分别指定；留空则内部生成唯一 id */
    stickyAnchorId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFixed: false,
      headerHeightPx: 0,
      stickyTopPx: 0,
      lastTop: 0,
      internalAnchorId: ""
    };
  },
  computed: {
    resolvedAnchorId() {
      const p = this.stickyAnchorId.trim();
      if (p.length > 0) {
        return p;
      }
      const i = this.internalAnchorId;
      return i.length > 0 ? i : "m-sticky";
    },
    minHeightStyle() {
      const h = this.stickyHeight;
      if (h == null || h === "") {
        return "auto";
      }
      return h;
    },
    headerFixedStyle() {
      const bg = this.backgroundColor.trim();
      const style = new common_vendor.UTSJSONObject({});
      if (this.isFixed) {
        style["top"] = this.stickyTopPx + "px";
        const low = bg.toLowerCase();
        if (bg.length === 0 || low === "transparent") {
          style["backgroundColor"] = "#ffffff";
        } else {
          style["backgroundColor"] = bg;
        }
      }
      return style;
    }
  },
  watch: {
    scrollTop() {
      this.scheduleUpdate();
    },
    stickyTop() {
      this.resolveStickyTop();
      this.scheduleUpdate();
    },
    isNativeHeader() {
      this.resolveStickyTop();
      this.scheduleUpdate();
    },
    recalc() {
      this.measureHeader();
      this.scheduleUpdate();
    },
    scrollTick() {
      this.scheduleUpdate();
    },
    scrollViewportId() {
      this.scheduleUpdate();
    }
  },
  created() {
    this.internalAnchorId = "m-sticky-" + Date.now().toString() + "-" + Math.floor(Math.random() * 1e6).toString();
  },
  mounted() {
    this.resolveStickyTop();
    this.$nextTick(() => {
      this.measureHeader();
      this.scheduleUpdate();
    });
  },
  methods: {
    resolveStickyTop() {
      const v = this.stickyTop;
      let base = 0;
      if (typeof v === "number") {
        base = v;
      } else {
        const s = v;
        if (s != null && s.length > 0) {
          const n = parseInt(s);
          base = isNaN(n) ? 0 : n;
        }
      }
      let nativeExtra = 0;
      if (this.isNativeHeader)
        ;
      this.stickyTopPx = base + nativeExtra;
    },
    scheduleUpdate() {
      this.$nextTick(() => {
        this.updateSticky();
      });
    },
    measureHeader() {
      const that = this;
      const q = common_vendor.index.createSelectorQuery().in(this);
      q.select(".m-sticky__header").boundingClientRect(function(rect = null) {
        if (rect == null) {
          return null;
        }
        const h = rect.height;
        if (h > 0) {
          that.headerHeightPx = h;
        }
      });
      q.exec();
    },
    emitStickyIfNeeded(nextFixed) {
      if (nextFixed != this.isFixed) {
        this.isFixed = nextFixed;
        const idx = this.index;
        const n = typeof idx === "number" ? idx : parseInt(idx);
        this.$emit("sticky", new common_vendor.UTSJSONObject({
          isFixed: nextFixed,
          index: isNaN(n) ? 0 : n
        }));
      }
    },
    emitChange(topVal) {
      const idx2 = this.index;
      const n2 = typeof idx2 === "number" ? idx2 : parseInt(idx2);
      this.$emit("change", new common_vendor.UTSJSONObject({
        top: topVal,
        index: isNaN(n2) ? 0 : n2
      }));
      this.lastTop = topVal;
    },
    /** scroll-view 内：组件根相对滚动视口可见区域顶边的距离（px） */
    updateSticky() {
      const that = this;
      const vid = this.scrollViewportId.trim();
      if (vid.length > 0) {
        const qPage = common_vendor.index.createSelectorQuery();
        qPage.select("#" + vid).boundingClientRect(function(vrect = null) {
          if (vrect == null) {
            return null;
          }
          const qSelf = common_vendor.index.createSelectorQuery().in(that);
          qSelf.select(".m-sticky").boundingClientRect(function(srect = null) {
            if (srect == null) {
              return null;
            }
            const relTop = srect.top - vrect.top;
            const threshold = that.stickyTopPx;
            const nextFixed = relTop <= threshold;
            that.emitStickyIfNeeded(nextFixed);
            that.emitChange(relTop);
          });
          qSelf.exec();
        });
        qPage.exec();
        return null;
      }
      const q = common_vendor.index.createSelectorQuery().in(this);
      q.select(".m-sticky__ph").boundingClientRect(function(rect = null) {
        if (rect == null) {
          return null;
        }
        const top = rect.top;
        const threshold = that.stickyTopPx;
        const nextFixed = top <= threshold;
        that.emitStickyIfNeeded(nextFixed);
        that.emitChange(top);
      });
      q.exec();
    }
  }
});
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $data.isFixed ? 1 : "",
    b: common_vendor.s($options.headerFixedStyle),
    c: $data.isFixed ? $data.headerHeightPx + "px" : "auto",
    d: $options.minHeightStyle,
    e: $props.container
  }, $props.container ? {} : {}, {
    f: common_vendor.sei(common_vendor.gei(_ctx, $options.resolvedAnchorId), "view"),
    g: `${_ctx.u_s_b_h}px`,
    h: `${_ctx.u_s_a_i_b}px`,
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSticky = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSticky
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = common_vendor.defineComponent({
  name: "mSwipeAction",
  emits: ["click"],
  props: {
    actions: {
      type: Array,
      default() {
        return [];
      }
    },
    nameField: {
      type: String,
      default: "name"
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    closable: {
      type: Boolean,
      default: true
    },
    operateWidth: {
      type: Number,
      default: 80
    },
    params: {
      type: Object,
      default() {
        return new common_vendor.UTSJSONObject({});
      }
    },
    forbid: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {
      offsetX: 0,
      startX: 0,
      startOffset: 0,
      maxOpen: 0
    };
  },
  computed: {
    actionList() {
      return this.actions;
    },
    totalBtnWidth() {
      let w = 0;
      const list = this.actionList;
      for (let i = 0; i < list.length; i++) {
        const aw = list[i]["width"];
        const n = aw == null ? 70 : typeof aw === "number" ? aw : parseInt("" + aw);
        w += isNaN(n) ? 70 : n;
      }
      if (w <= 0) {
        w = this.operateWidth;
      }
      return w;
    },
    frontStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["transform"] = "translateX(" + this.offsetX + "px)";
      st["backgroundColor"] = this.backgroundColor;
      return st;
    }
  },
  watch: {
    open(v) {
      this.maxOpen = this.totalBtnWidth;
      this.offsetX = v ? -this.maxOpen : 0;
    },
    actions() {
      this.maxOpen = this.totalBtnWidth;
    }
  },
  mounted() {
    this.maxOpen = this.totalBtnWidth;
    if (this.open) {
      this.offsetX = -this.maxOpen;
    }
  },
  methods: {
    btnName(act) {
      const k = this.nameField;
      const v = act[k];
      return v == null ? "" : "" + v;
    },
    btnTextColor(act) {
      const c = act["color"];
      return c == null ? this.color : "" + c;
    },
    btnFontSize(act) {
      const fs = act["fontsize"];
      if (fs == null) {
        return 30;
      }
      return typeof fs === "number" ? fs : parseInt("" + fs);
    },
    btnStyle(act) {
      const w = act["width"];
      const wp = w == null ? 70 : typeof w === "number" ? w : parseInt("" + w);
      const bg = act["background"];
      return new common_vendor.UTSJSONObject({
        width: (isNaN(wp) ? 70 : wp) + "px",
        backgroundColor: bg == null ? "#cccccc" : "" + bg
      });
    },
    onBtnTap(idx, act) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx, item: act, params: this.params }));
      if (this.closable) {
        this.offsetX = 0;
      }
    },
    onTouchStart(e) {
      if (this.forbid) {
        return null;
      }
      const touches = e["touches"];
      if (touches == null || touches.length === 0) {
        return null;
      }
      const t0 = touches[0];
      const x = t0["clientX"];
      if (x == null) {
        return null;
      }
      this.startX = x;
      this.startOffset = this.offsetX;
      this.maxOpen = this.totalBtnWidth;
    },
    onTouchMove(e) {
      if (this.forbid) {
        return null;
      }
      const touches = e["touches"];
      if (touches == null || touches.length === 0) {
        return null;
      }
      const t0 = touches[0];
      const x = t0["clientX"];
      if (x == null) {
        return null;
      }
      const dx = x - this.startX;
      let next = this.startOffset + dx;
      const max = 0;
      const min = -this.maxOpen;
      if (next > max) {
        next = max;
      }
      if (next < min) {
        next = min;
      }
      this.offsetX = next;
    },
    onTouchEnd() {
      if (this.forbid) {
        return null;
      }
      const threshold = -this.maxOpen / 2;
      if (this.offsetX < threshold) {
        this.offsetX = -this.maxOpen;
      } else {
        this.offsetX = 0;
      }
    }
  }
});
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.actionList.length > 0
  }, $options.actionList.length > 0 ? {
    b: common_vendor.f($options.actionList, (act, idx, i0) => {
      return {
        a: common_vendor.t($options.btnName(act)),
        b: $options.btnTextColor(act),
        c: $options.btnFontSize(act) + "rpx",
        d: idx,
        e: common_vendor.s($options.btnStyle(act)),
        f: common_vendor.o(($event) => $options.onBtnTap(idx, act), idx)
      };
    }),
    c: $options.totalBtnWidth + "px"
  } : {
    d: $props.operateWidth + "px"
  }, {
    e: common_vendor.s($options.frontStyle),
    f: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args), "f1"),
    g: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args), "43"),
    h: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args), "07"),
    i: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args), "d4"),
    j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    k: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    l: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSwipeAction = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSwipeAction
}, Symbol.toStringTag, { value: "Module" }));
class SlideRow extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          src: { type: String, optional: false },
          title: { type: String, optional: false },
          raw: { type: "Any", optional: true }
        };
      },
      name: "SlideRow"
    };
  }
  constructor(options, metadata = SlideRow.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.src = this.__props__.src;
    this.title = this.__props__.title;
    this.raw = this.__props__.raw;
    delete this.__props__;
  }
}
const _sfc_main$j = common_vendor.defineComponent({
  name: "mSwiper",
  emits: ["change", "click", "update:current"],
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    imageKey: {
      type: String,
      default: "url"
    },
    titleKey: {
      type: String,
      default: "title"
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: false
    },
    indicatorMode: {
      type: String,
      default: "dot"
    },
    indicatorActiveColor: {
      type: String,
      default: "#ffffff"
    },
    indicatorInactiveColor: {
      type: String,
      default: "rgba(255,255,255,0.45)"
    },
    indicatorStyle: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    current: {
      type: [Number, String],
      default: 0
    },
    interval: {
      type: [Number, String],
      default: 3e3
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    circular: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    previousMargin: {
      type: [Number, String],
      default: 0
    },
    nextMargin: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 320
    },
    /** 容器背景；空字符串不写 background，由父级透出。可设 #fff、transparent 等 */
    bgColor: {
      type: String,
      default: ""
    },
    radius: {
      type: [Number, String],
      default: 16
    },
    imgMode: {
      type: String,
      default: "aspectFill"
    },
    loading: {
      type: Boolean,
      default: false
    },
    /** 单页内图片左右留白（数字默认 rpx），与露边搭配可避免贴边 */
    slidePadding: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      internalCurrent: 0
    };
  },
  computed: {
    heightCss() {
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(this.height);
    },
    hasPeekMargin() {
      return this.prevMarginPx !== "0px" || this.nextMarginPx !== "0px";
    },
    prevMarginPx() {
      return this.marginToPxString(this.previousMargin);
    },
    nextMarginPx() {
      return this.marginToPxString(this.nextMargin);
    },
    /** 衔接滑动：露边时各端要求列表项足够多（通常 ≥3），否则关闭 circular 避免空白或无法滑动 */
    effectiveCircular() {
      const n = this.normalizedList.length;
      if (n <= 1) {
        return false;
      }
      if (!this.circular) {
        return false;
      }
      if (this.hasPeekMargin && n < 3) {
        return false;
      }
      return true;
    },
    coreStyle() {
      return new common_vendor.UTSJSONObject({
        height: this.heightCss,
        width: "100%"
      });
    },
    slideRadiusStyle() {
      const r = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      return new common_vendor.UTSJSONObject({
        borderRadius: r,
        overflow: "hidden"
      });
    },
    slideInnerPadStyle() {
      const p = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.slidePadding);
      return new common_vendor.UTSJSONObject({
        paddingLeft: p,
        paddingRight: p,
        flex: "1",
        minHeight: "0",
        width: "100%",
        boxSizing: "border-box"
      });
    },
    slideImageClipStyle() {
      const pad = this.slidePadding;
      let n = 0;
      if (typeof pad === "number") {
        n = pad;
      } else {
        const t = pad.trim();
        if (t !== "" && t !== "0") {
          const f = parseFloat(t);
          n = isNaN(f) ? 0 : f;
        }
      }
      if (n <= 0) {
        return new common_vendor.UTSJSONObject({});
      }
      const r = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      return new common_vendor.UTSJSONObject({
        borderRadius: r,
        overflow: "hidden"
      });
    },
    intervalNum() {
      const v = this.interval;
      if (typeof v === "number") {
        return v;
      }
      const n = parseInt(v);
      return isNaN(n) ? 3e3 : n;
    },
    durationNum() {
      const v = this.duration;
      if (typeof v === "number") {
        return v;
      }
      const n = parseInt(v);
      return isNaN(n) ? 300 : n;
    },
    wrapStyle() {
      const r = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius);
      const style = new common_vendor.UTSJSONObject({
        position: "relative",
        overflow: "hidden",
        borderRadius: r
      });
      const bg = this.bgColor;
      if (bg != null && bg.trim().length > 0) {
        style["backgroundColor"] = bg.trim();
      }
      return style;
    },
    indicatorBoxStyle() {
      let s = "position:absolute;left:0;right:0;bottom:24rpx;display:flex;flex-direction:row;justify-content:center;align-items:center;pointer-events:none;";
      const extra = this.indicatorStyle;
      if (extra != null && extra.trim().length > 0) {
        const t = extra.trim();
        s += t;
        if (!t.endsWith(";")) {
          s += ";";
        }
      }
      return s;
    },
    normalizedList() {
      const raw = this.list;
      const ik = this.imageKey;
      const tk = this.titleKey;
      const out = [];
      for (let i = 0; i < raw.length; i++) {
        const it = raw[i];
        let src = "";
        let title = "";
        let rawRef = null;
        if (typeof it === "string") {
          src = it;
        } else if (it != null) {
          rawRef = it;
          const o = it;
          const a = o[ik];
          if (a != null && "" + a !== "") {
            src = "" + a;
          } else {
            const u = o["url"];
            const s = o["src"];
            const im = o["image"];
            if (u != null && "" + u !== "") {
              src = "" + u;
            } else if (s != null && "" + s !== "") {
              src = "" + s;
            } else if (im != null && "" + im !== "") {
              src = "" + im;
            }
          }
          const t = o[tk];
          if (t != null) {
            title = "" + t;
          }
        }
        out.push(new SlideRow({ src, title, raw: rawRef }));
      }
      return out;
    }
  },
  watch: {
    current: {
      handler(n) {
        let v = 0;
        if (typeof n === "number") {
          v = n;
        } else {
          const p = parseInt(n);
          v = isNaN(p) ? 0 : p;
        }
        const max = this.normalizedList.length - 1;
        if (max < 0) {
          v = 0;
        } else if (v > max) {
          v = max;
        }
        if (v < 0) {
          v = 0;
        }
        if (v !== this.internalCurrent) {
          this.internalCurrent = v;
        }
      },
      immediate: true
    },
    list() {
      this.clampCurrent();
    }
  },
  methods: {
    marginToPxString(v) {
      if (typeof v === "number") {
        if (v <= 0) {
          return "0px";
        }
        return this.rpxNumberToPx(v);
      }
      const t = v.trim();
      if (t === "" || t === "0") {
        return "0px";
      }
      if (t.endsWith("px")) {
        const n = parseFloat(t);
        if (isNaN(n) || n <= 0) {
          return "0px";
        }
        return Math.round(n) + "px";
      }
      let num = parseFloat(t);
      if (t.indexOf("rpx") >= 0) {
        num = parseFloat(t.replace("rpx", ""));
      }
      if (isNaN(num) || num <= 0) {
        return "0px";
      }
      return this.rpxNumberToPx(num);
    },
    rpxNumberToPx(n) {
      let px = 0;
      try {
        const u = common_vendor.index.rpx2px(n);
        if (u != null && typeof u === "number" && !isNaN(u) && u > 0) {
          px = u;
        }
      } catch (e) {
        px = 0;
      }
      if (px <= 0) {
        px = Math.round(n * 0.52);
      }
      if (px <= 0) {
        px = 1;
      }
      return Math.round(px) + "px";
    },
    clampCurrent() {
      const max = this.normalizedList.length - 1;
      if (this.internalCurrent > max) {
        this.internalCurrent = max < 0 ? 0 : max;
      }
    },
    slideKey(idx, row) {
      return "m-swiper-slide-" + idx;
    },
    lineSegStyle(i) {
      const active = i === this.internalCurrent;
      return new common_vendor.UTSJSONObject({
        backgroundColor: active ? this.indicatorActiveColor : this.indicatorInactiveColor
      });
    },
    dotStyle(i) {
      const active = i === this.internalCurrent;
      return new common_vendor.UTSJSONObject({
        backgroundColor: active ? this.indicatorActiveColor : this.indicatorInactiveColor
      });
    },
    onSwiperChange(e = null) {
      const detail = e != null ? e["detail"] : null;
      let idx = 0;
      if (detail != null) {
        const c = detail["current"];
        if (typeof c === "number") {
          idx = c;
        }
      }
      this.internalCurrent = idx;
      this.$emit("update:current", idx);
      const row = idx >= 0 && idx < this.normalizedList.length ? this.normalizedList[idx] : null;
      const item = row != null ? row.raw : null;
      const payload = new common_vendor.UTSJSONObject({
        index: idx,
        item: item != null ? item : row != null ? row.src : ""
      });
      this.$emit("change", payload);
    },
    onSlideTap(idx, row) {
      const item = row.raw != null ? row.raw : row.src;
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx, item }));
    }
  }
});
if (!Array) {
  const _easycom_m_loading2 = common_vendor.resolveComponent("m-loading");
  _easycom_m_loading2();
}
const _easycom_m_loading = () => "./components/m-loading/m-loading.js";
if (!Math) {
  _easycom_m_loading();
}
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.normalizedList.length === 0
  }, $options.normalizedList.length === 0 ? {
    b: $options.heightCss
  } : {
    c: common_vendor.f($options.normalizedList, (row, idx, i0) => {
      return common_vendor.e({
        a: row.src.length > 0
      }, row.src.length > 0 ? {
        b: row.src,
        c: $props.imgMode,
        d: common_vendor.s($options.slideImageClipStyle)
      } : {}, {
        e: $props.showTitle && row.title.length > 0
      }, $props.showTitle && row.title.length > 0 ? {
        f: common_vendor.t(row.title)
      } : {}, {
        g: common_vendor.o(($event) => $options.onSlideTap(idx, row), $options.slideKey(idx, row)),
        h: $options.slideKey(idx, row)
      });
    }),
    d: common_vendor.s($options.slideInnerPadStyle),
    e: common_vendor.s($options.slideRadiusStyle),
    f: common_vendor.s($options.coreStyle),
    g: $data.internalCurrent,
    h: $props.autoplay && !$props.loading && $options.normalizedList.length > 1,
    i: $options.intervalNum,
    j: $options.durationNum,
    k: $options.effectiveCircular,
    l: $props.vertical,
    m: $options.prevMarginPx,
    n: $options.nextMarginPx,
    o: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args), "ff")
  }, {
    p: $props.indicator && $options.normalizedList.length > 1
  }, $props.indicator && $options.normalizedList.length > 1 ? common_vendor.e({
    q: $props.indicatorMode === "line"
  }, $props.indicatorMode === "line" ? {
    r: common_vendor.f($options.normalizedList, (_, i, i0) => {
      return {
        a: "l" + i,
        b: i === $data.internalCurrent ? 1 : "",
        c: common_vendor.s($options.lineSegStyle(i))
      };
    })
  } : {
    s: common_vendor.f($options.normalizedList, (_, i, i0) => {
      return {
        a: "d" + i,
        b: i === $data.internalCurrent ? 1 : "",
        c: common_vendor.s($options.dotStyle(i))
      };
    })
  }, {
    t: common_vendor.s($options.indicatorBoxStyle)
  }) : {}, {
    v: $props.loading
  }, $props.loading ? {
    w: common_vendor.p({
      text: "加载中",
      size: "40rpx",
      color: "#ffffff",
      class: "data-v-a2c05706"
    })
  } : {}, {
    x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    y: common_vendor.s($options.wrapStyle),
    z: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    A: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mSwiper = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-a2c05706"]]);
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSwiper
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = common_vendor.defineComponent({
  name: "mSwitch",
  emits: ["update:modelValue", "change", "input"],
  props: {
    /** 是否打开 */
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** switch：系统滑块；checkbox：自绘方框勾选 */
    type: {
      type: String,
      default: "switch"
    },
    /** 打开状态主色（原生 switch 的 color / 方块填充色） */
    color: {
      type: String,
      default: ""
    },
    /** checkbox 类型未选中边框色 */
    borderColor: {
      type: String,
      default: "#cccccc"
    },
    /** checkbox 类型选中时对号颜色 */
    checkMarkColor: {
      type: String,
      default: "#ffffff"
    },
    /** checkbox 类型边长，rpx */
    size: {
      type: [Number, String],
      default: 44
    },
    /** 整体缩放 */
    scale: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    resolvedColor() {
      if (this.color !== "") {
        return this.color;
      }
      return "#5677fc";
    },
    scaleNum() {
      const s = this.scale;
      if (typeof s === "number") {
        return s > 0 ? s : 1;
      }
      const p = parseFloat(s.trim());
      if (isNaN(p) || p <= 0) {
        return 1;
      }
      return p;
    },
    rootScaleStyle() {
      const sc = this.scaleNum;
      if (sc !== 1) {
        return new common_vendor.UTSJSONObject({ transform: "scale(" + sc + ")" });
      }
      return new common_vendor.UTSJSONObject({});
    },
    checkboxBoxStyle() {
      const wh = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size);
      const st = new common_vendor.UTSJSONObject({
        width: wh,
        height: wh,
        borderColor: this.borderColor
      });
      if (this.modelValue === true) {
        st["backgroundColor"] = this.resolvedColor;
        st["borderColor"] = this.resolvedColor;
      }
      return st;
    },
    checkIconSize() {
      const s = this.size;
      let n = 40;
      if (typeof s === "number") {
        n = s;
      } else {
        const p = parseInt(s.replace("rpx", "").trim());
        if (!isNaN(p)) {
          n = p;
        }
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(Math.floor(n * 0.5));
    }
  },
  methods: {
    emitToggle(next) {
      this.$emit("update:modelValue", next);
      this.$emit("change", next);
      this.$emit("input", next);
    },
    onNativeChange(e = null) {
      if (this.disabled) {
        return null;
      }
      let v = false;
      if (e != null) {
        const d = e.detail;
        if (d != null) {
          const raw = d["value"];
          if (raw === true) {
            v = true;
          }
        }
      }
      this.emitToggle(v);
    },
    onCheckboxTap() {
      if (this.disabled) {
        return null;
      }
      const next = !(this.modelValue === true);
      this.emitToggle(next);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$6 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$6();
}
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.type === "switch"
  }, $props.type === "switch" ? {
    b: $props.modelValue,
    c: $props.disabled,
    d: $options.resolvedColor,
    e: common_vendor.o((...args) => $options.onNativeChange && $options.onNativeChange(...args), "76")
  } : common_vendor.e({
    f: $props.modelValue
  }, $props.modelValue ? {
    g: common_vendor.p({
      name: "select",
      size: $options.checkIconSize,
      color: $props.checkMarkColor,
      class: "data-v-524b2790"
    })
  } : {}, {
    h: $props.modelValue ? 1 : "",
    i: common_vendor.s($options.checkboxBoxStyle),
    j: common_vendor.o((...args) => $options.onCheckboxTap && $options.onCheckboxTap(...args), "d1")
  }), {
    k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    l: $props.disabled ? 1 : "",
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: common_vendor.s($options.rootScaleStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const mSwitch = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-524b2790"]]);
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mSwitch
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = common_vendor.defineComponent({
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
      default: 30
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
    isSlider: {
      type: Boolean,
      default: true
    },
    sliderWidth: {
      type: Number,
      default: 68
    },
    sliderHeight: {
      type: Number,
      default: 6
    },
    sliderBgColor: {
      type: String,
      default: "#5677fc"
    },
    sliderRadius: {
      type: String,
      default: "50rpx"
    },
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
      default: false
    },
    scale: {
      type: [Number, String],
      default: 1
    },
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
    itemStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    // ========== 新增选中项样式参数 ==========
    selectedBgColor: {
      type: String,
      default: ""
    },
    selectedBorderColor: {
      type: String,
      default: ""
    },
    selectedBorderWidth: {
      type: String,
      default: "0"
    },
    selectedBorderRadius: {
      type: String,
      default: "0"
    },
    // 未选中项背景色（可选）
    unselectedBgColor: {
      type: String,
      default: ""
    },
    // 是否显示选中项边框
    showSelectedBorder: {
      type: Boolean,
      default: false
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
      return 100 / n + "%";
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
    },
    sliderAnchorStyle() {
      const n = this.tabCount;
      if (n <= 0) {
        return new common_vendor.UTSJSONObject({});
      }
      let i = this.currentTab;
      if (i < 0) {
        i = 0;
      }
      if (i >= n) {
        i = n - 1;
      }
      const pct = (i + 0.5) / n * 100;
      return new common_vendor.UTSJSONObject({
        left: pct + "%",
        transition: "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)"
      });
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
    // 计算每个选项卡内层的样式（支持选中/未选中背景色、边框）
    itemInnerStyle(idx, tab) {
      const st = new common_vendor.UTSJSONObject({});
      const isSelected = this.currentTab === idx;
      const isDisabled = this.tabDisabled(tab);
      if (this.itemStyle != null) {
        Object.assign(st, this.itemStyle);
      }
      if (isDisabled) {
        st["opacity"] = "0.5";
      } else if (isSelected) {
        if (this.selectedBgColor && this.selectedBgColor !== "") {
          st["backgroundColor"] = this.selectedBgColor;
        }
        if (this.showSelectedBorder && this.selectedBorderColor) {
          st["borderColor"] = this.selectedBorderColor;
          st["borderWidth"] = this.selectedBorderWidth;
          st["borderStyle"] = "solid";
        }
        if (this.selectedBorderRadius && this.selectedBorderRadius !== "0") {
          st["borderRadius"] = this.selectedBorderRadius;
        }
      } else {
        if (this.unselectedBgColor && this.unselectedBgColor !== "") {
          st["backgroundColor"] = this.unselectedBgColor;
        }
      }
      return st;
    },
    textStyle(idx, tab) {
      const st = new common_vendor.UTSJSONObject({});
      const sel = this.currentTab === idx;
      const dis = this.tabDisabled(tab);
      if (dis) {
        st["color"] = "#cccccc";
      } else if (sel) {
        st["color"] = this.selectedColor;
      } else {
        st["color"] = this.color;
      }
      st["font-size"] = this.size + "rpx";
      if (this.bold && sel) {
        st["font-weight"] = "bold";
      }
      if (sel) {
        const sc = this.scale;
        const f = typeof sc === "number" ? sc : parseFloat("" + sc);
        if (!isNaN(f) && f !== 1) {
          st["transform"] = "scale(" + f + ")";
        }
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
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
        i: common_vendor.s($options.itemInnerStyle(idx, tab)),
        j: idx,
        k: common_vendor.o(($event) => $options.onTabTap(idx, tab), idx)
      });
    }),
    b: $options.itemWidthComputed,
    c: $props.isSlider && $options.tabCount > 0
  }, $props.isSlider && $options.tabCount > 0 ? {
    d: $props.sliderBgColor,
    e: $props.sliderHeight + "rpx",
    f: $props.sliderRadius,
    g: $props.sliderWidth + "rpx",
    h: common_vendor.s($options.sliderAnchorStyle)
  } : {}, {
    i: $props.height + "rpx",
    j: $props.padding + "rpx",
    k: $props.padding + "rpx",
    l: $props.backgroundColor,
    m: !$props.unlined
  }, !$props.unlined ? {} : {}, {
    n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    o: $props.isFixed ? 1 : "",
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    q: common_vendor.s($options.rootStyle),
    r: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component$2 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = common_vendor.defineComponent({
  name: "mTag",
  emits: ["click", "close"],
  props: {
    // 类型 primary/ success/ warning/ danger/ info/ default
    type: {
      type: String,
      default: "default"
    },
    // 尺寸 large / medium / small / mini
    size: {
      type: String,
      default: "medium"
    },
    // 文字
    text: {
      type: String,
      default: ""
    },
    // 镂空样式
    plain: {
      type: Boolean,
      default: false
    },
    // 是否圆角
    round: {
      type: Boolean,
      default: false
    },
    // 是否标记样式
    mark: {
      type: Boolean,
      default: false
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义颜色
    color: {
      type: String,
      default: ""
    },
    // 自定义背景色
    bgColor: {
      type: String,
      default: ""
    },
    // 自定义样式（勿与合并结果同名 computed，否则冲突）
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    mergedCustomStyle() {
      const style = new common_vendor.UTSJSONObject({});
      if (this.color !== "") {
        style.color = this.color;
      }
      if (this.bgColor !== "") {
        style.backgroundColor = this.bgColor;
      }
      Object.assign(style, this.customStyle);
      return style;
    },
    closeIconSize() {
      if (this.size === "mini") {
        return "24rpx";
      }
      if (this.size === "small") {
        return "28rpx";
      }
      if (this.size === "large") {
        return "36rpx";
      }
      return "32rpx";
    },
    // 关闭图标与标签字色一致（避免父 view 的 color 未作用到 m-icon 内 text）
    closeIconColor() {
      if (this.color !== "") {
        return this.color;
      }
      if (this.plain) {
        if (this.type === "primary") {
          return "#409eff";
        }
        if (this.type === "success") {
          return "#67c23a";
        }
        if (this.type === "warning") {
          return "#e6a23c";
        }
        if (this.type === "danger") {
          return "#f56c6c";
        }
        if (this.type === "info") {
          return "#909399";
        }
        return "#606266";
      }
      if (this.type === "default") {
        return "#606266";
      }
      return "#ffffff";
    }
  },
  methods: {
    handleClick(e = null) {
      if (!this.disabled) {
        this.$emit("click", e);
      }
    },
    handleClose(e = null) {
      if (!this.disabled) {
        this.$emit("close", e);
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$5 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$5();
}
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.text
  }, $props.text ? {
    b: common_vendor.t($props.text)
  } : {}, {
    c: $props.closable
  }, $props.closable ? {
    d: common_vendor.o($options.handleClose, "a8"),
    e: common_vendor.p({
      name: "close",
      size: $options.closeIconSize,
      color: $options.closeIconColor,
      class: "m-tag__close data-v-30d99be6"
    })
  } : {}, {
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: common_vendor.n(`m-tag--${$props.type}`),
    h: common_vendor.n(`m-tag--${$props.size}`),
    i: common_vendor.n({
      "m-tag--plain": $props.plain
    }),
    j: common_vendor.n({
      "m-tag--round": $props.round
    }),
    k: common_vendor.n({
      "m-tag--mark": $props.mark
    }),
    l: common_vendor.n({
      "m-tag--disabled": $props.disabled
    }),
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: common_vendor.s($options.mergedCustomStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    p: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "fa")
  });
}
const Component$1 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-30d99be6"]]);
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = common_vendor.defineComponent({
  name: "mText",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "black"
    },
    text: {
      type: [Number, String],
      default: ""
    },
    size: {
      type: [Number, String],
      default: 32
    },
    unit: {
      type: String,
      default: "rpx"
    },
    color: {
      type: String,
      default: ""
    },
    fontWeight: {
      type: [Number, String],
      default: 400
    },
    align: {
      type: String,
      default: "left"
    },
    decoration: {
      type: String,
      default: "none"
    },
    lineHeight: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: "0"
    },
    block: {
      type: Boolean,
      default: false
    },
    textType: {
      type: String,
      default: "text"
    },
    format: {
      type: Boolean,
      default: false
    },
    call: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    userSelect: {
      type: Boolean,
      default: false
    },
    decode: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    },
    unShrink: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    displayText() {
      const t = this.text;
      const s = t == null ? "" : "" + t;
      if (this.textType === "mobile" && this.format) {
        return this.formatMobile(s);
      }
      if (this.textType === "amount" && this.format) {
        return this.formatAmount(s);
      }
      return s;
    },
    typeColor() {
      const ty = this.type;
      if (ty === "primary") {
        return "#5677fc";
      }
      if (ty === "success") {
        return "#07c160";
      }
      if (ty === "danger") {
        return "#eb0909";
      }
      if (ty === "warning") {
        return "#ff7900";
      }
      if (ty === "gray") {
        return "#888888";
      }
      if (ty === "white") {
        return "#ffffff";
      }
      return "#333333";
    },
    fontSizeCss() {
      const u = this.unit;
      const n = this.size;
      if (typeof n === "number") {
        return n + u;
      }
      const str = n;
      if (str.indexOf("rpx") > 0 || str.indexOf("px") > 0) {
        return str;
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(n);
    },
    wrapStyle() {
      const st = new common_vendor.UTSJSONObject({
        padding: this.padding,
        flexDirection: "row",
        alignItems: "center"
      });
      if (this.block) {
        st["width"] = "100%";
      }
      if (this.unShrink) {
        st["flexShrink"] = "0";
      }
      return st;
    },
    mainStyle() {
      const c = this.color.trim();
      const col = c.length > 0 ? c : this.typeColor;
      const st = new common_vendor.UTSJSONObject({
        color: col,
        "font-size": this.fontSizeCss,
        "font-weight": this.fontWeight,
        "text-align": this.align
      });
      const dec = this.decoration;
      if (dec === "underline") {
        st["textDecorationLine"] = "underline";
      } else if (dec === "line-through") {
        st["textDecorationLine"] = "line-through";
      }
      if (this.lineHeight) {
        st["lineHeight"] = "1.35";
      }
      return st;
    }
  },
  methods: {
    formatMobile(s) {
      const d = this.filterDigits(s);
      if (d.length <= 3) {
        return d;
      }
      if (d.length <= 7) {
        return d.substring(0, 3) + " " + d.substring(3);
      }
      return d.substring(0, 3) + " " + d.substring(3, 7) + " " + d.substring(7, 11);
    },
    filterDigits(s) {
      let out = "";
      for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (c >= "0" && c <= "9") {
          out += c;
        }
      }
      return out;
    },
    formatAmount(s) {
      const parts = s.split(".");
      const intp = parts[0];
      let dec = "";
      if (parts.length > 1) {
        dec = parts[1];
      }
      let out = "";
      let cnt = 0;
      for (let i = intp.length - 1; i >= 0; i--) {
        out = intp.charAt(i) + out;
        cnt++;
        if (cnt === 3 && i > 0) {
          out = "," + out;
          cnt = 0;
        }
      }
      if (dec.length > 0) {
        out += "." + dec.substring(0, 2);
      }
      return out;
    },
    onTap() {
      if (this.disable) {
        return null;
      }
      if (this.call && this.textType === "mobile") {
        const d = this.filterDigits("" + this.text);
        if (d.length >= 7) {
          common_vendor.index.makePhoneCall({ phoneNumber: d });
        }
        return null;
      }
      this.$emit("click", new common_vendor.UTSJSONObject({ text: this.displayText }));
    }
  }
});
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.t($options.displayText),
    b: common_vendor.s($options.mainStyle),
    c: $props.selectable,
    d: $props.userSelect,
    e: $props.decode,
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: $props.block ? 1 : "",
    h: $props.highlight && !$props.disable ? 1 : "",
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    j: common_vendor.s($options.wrapStyle),
    k: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    l: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "45")
  };
}
const mText = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-a9930ff4"]]);
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mText
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = common_vendor.defineComponent({
  name: "mTextarea",
  emits: ["update:modelValue", "input", "focus", "blur", "confirm", "linechange"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    requiredColor: {
      type: String,
      default: "#EB0909"
    },
    /** flexStart 为 true 时，星号相对标题下移，便于与多行首行对齐 */
    requiredTop: {
      type: [Number, String],
      default: 32
    },
    labelSize: {
      type: [Number, String],
      default: 32
    },
    labelColor: {
      type: String,
      default: "#333333"
    },
    labelWidth: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    placeholderColor: {
      type: String,
      default: "#c0c4cc"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 500
    },
    /** 为 true 时高度随内容增高，此时不设置固定 height */
    autoHeight: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    cursorSpacing: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: "done"
    },
    /** 固定高度（autoHeight 为 false 时生效），如 200rpx */
    height: {
      type: String,
      default: "200rpx"
    },
    /** 最小高度 */
    minHeight: {
      type: String,
      default: "200rpx"
    },
    /** 标题与输入区顶端对齐，适合多行 */
    flexStart: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: "#333333"
    },
    textRight: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: true
    },
    borderTop: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.08)"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    padding: {
      type: String,
      default: "26rpx 30rpx"
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    textareaBorder: {
      type: Boolean,
      default: false
    },
    /** 边框模式下的圆角，rpx */
    textareaRadius: {
      type: [Number, String],
      default: 8
    },
    error: {
      type: String,
      default: ""
    },
    marginTop: {
      type: [Number, String],
      default: 0
    },
    isCounter: {
      type: Boolean,
      default: false
    },
    counterColor: {
      type: String,
      default: "#999999"
    },
    counterSize: {
      type: [Number, String],
      default: 28
    }
  },
  data() {
    return {
      innerValue: ""
    };
  },
  computed: {
    maxlengthResolved() {
      const m = this.maxlength;
      if (typeof m === "number") {
        if (m < 0) {
          return 99999;
        }
        return m;
      }
      const s = m.trim();
      if (s === "-1") {
        return 99999;
      }
      const n = parseInt(s);
      if (isNaN(n)) {
        return 500;
      }
      if (n < 0) {
        return 99999;
      }
      return n;
    },
    isUnlimitedMax() {
      const m = this.maxlength;
      if (typeof m === "number") {
        return m < 0;
      }
      return m.trim() === "-1";
    },
    placeholderStyleResolved() {
      if (this.placeholderStyle !== "") {
        return this.placeholderStyle;
      }
      return "font-size:" + uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size) + ";color:" + this.placeholderColor;
    },
    labelWrapStyle() {
      return new common_vendor.UTSJSONObject({ minWidth: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.labelWidth) });
    },
    requiredStarStyle() {
      const st = new common_vendor.UTSJSONObject({ color: this.requiredColor });
      if (this.flexStart && this.required) {
        st["marginTop"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.requiredTop);
      }
      return st;
    },
    labelTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.labelSize),
        color: this.labelColor
      });
    },
    fieldMergedStyle() {
      const st = new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size),
        color: this.color,
        width: "100%",
        minHeight: this.minHeight
      });
      if (!this.autoHeight) {
        st["height"] = this.height;
      }
      if (this.textareaBorder) {
        st["borderWidth"] = "1rpx";
        st["borderStyle"] = "solid";
        st["borderColor"] = this.borderColor;
        st["borderRadius"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.textareaRadius);
        st["paddingLeft"] = "16rpx";
        st["paddingRight"] = "16rpx";
        st["paddingTop"] = "16rpx";
        st["paddingBottom"] = "16rpx";
        st["boxSizing"] = "border-box";
      }
      return st;
    },
    rowStyle() {
      const st = new common_vendor.UTSJSONObject({
        backgroundColor: this.backgroundColor,
        padding: this.padding
      });
      const r = this.radius;
      let rn = 0;
      if (typeof r === "number") {
        rn = r;
      } else {
        const rs = r.replace("rpx", "").trim();
        const p = parseInt(rs);
        if (!isNaN(p)) {
          rn = p;
        }
      }
      if (rn > 0) {
        st["borderRadius"] = uni_modules_mUnix_components_mTools_Ut.toCssLength(r);
      }
      if (this.borderTop) {
        st["borderTopWidth"] = "1rpx";
        st["borderTopStyle"] = "solid";
        st["borderTopColor"] = this.borderColor;
      }
      if (this.borderBottom) {
        st["borderBottomWidth"] = "1rpx";
        st["borderBottomStyle"] = "solid";
        st["borderBottomColor"] = this.borderColor;
      }
      return st;
    },
    rootMarginStyle() {
      const mt = this.marginTop;
      let n = 0;
      if (typeof mt === "number") {
        n = mt;
      } else {
        const p = parseInt(mt.replace("rpx", "").trim());
        if (!isNaN(p)) {
          n = p;
        }
      }
      if (n > 0) {
        return new common_vendor.UTSJSONObject({ marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(mt) });
      }
      return new common_vendor.UTSJSONObject({});
    },
    counterTextStyle() {
      return new common_vendor.UTSJSONObject({
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.counterSize),
        color: this.counterColor
      });
    },
    counterDisplay() {
      const len = this.innerValue.length;
      if (this.isUnlimitedMax) {
        return len + "";
      }
      return len + " / " + this.maxlengthResolved;
    }
  },
  watch: {
    modelValue(val) {
      this.innerValue = val;
    }
  },
  created() {
    this.innerValue = this.modelValue;
  },
  methods: {
    emitValue(next) {
      this.$emit("update:modelValue", next);
      this.$emit("input", next);
    },
    onInput(_e = null) {
      this.emitValue(this.innerValue);
    },
    onFocus(e = null) {
      this.$emit("focus", e);
    },
    onBlur(e = null) {
      let v = this.innerValue;
      if (this.trim) {
        v = v.trim();
        if (v !== this.innerValue) {
          this.innerValue = v;
          this.emitValue(v);
        }
      }
      this.$emit("blur", e);
    },
    onConfirm(_e = null) {
      this.$emit("confirm", this.innerValue);
    },
    onLinechange(e = null) {
      this.$emit("linechange", e);
    }
  }
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.label !== "" || $props.required
  }, $props.label !== "" || $props.required ? common_vendor.e({
    b: $props.required
  }, $props.required ? {
    c: common_vendor.s($options.requiredStarStyle)
  } : {}, {
    d: $props.label !== ""
  }, $props.label !== "" ? {
    e: common_vendor.t($props.label),
    f: common_vendor.s($options.labelTextStyle)
  } : {}, {
    g: common_vendor.s($options.labelWrapStyle)
  }) : {}, {
    h: $props.textRight ? 1 : "",
    i: $props.textareaBorder ? 1 : "",
    j: common_vendor.s($options.fieldMergedStyle),
    k: $props.disabled,
    l: $props.placeholder,
    m: $options.placeholderStyleResolved,
    n: $options.maxlengthResolved,
    o: $props.autoHeight,
    p: $props.fixed,
    q: $props.focus,
    r: $props.cursorSpacing,
    s: $props.showConfirmBar,
    t: $props.adjustPosition,
    v: $props.holdKeyboard,
    w: $props.confirmType,
    x: common_vendor.o([($event) => $data.innerValue = $event.detail.value, (...args) => $options.onInput && $options.onInput(...args)], "7c"),
    y: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args), "1a"),
    z: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args), "43"),
    A: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args), "72"),
    B: common_vendor.o((...args) => $options.onLinechange && $options.onLinechange(...args), "7a"),
    C: $data.innerValue,
    D: $props.isCounter
  }, $props.isCounter ? {
    E: common_vendor.t($options.counterDisplay),
    F: common_vendor.s($options.counterTextStyle)
  } : {}, {
    G: $props.disabled ? 1 : "",
    H: $props.flexStart ? 1 : "",
    I: common_vendor.s($options.rowStyle),
    J: $props.error !== ""
  }, $props.error !== "" ? {
    K: common_vendor.t($props.error)
  } : {}, {
    L: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    M: common_vendor.s($options.rootMarginStyle),
    N: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    O: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mTextarea = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-1d6fdfea"]]);
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mTextarea
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = common_vendor.defineComponent({
  name: "mTimeAxisItem",
  props: {
    backgroundColor: {
      type: String,
      default: "transparent"
    }
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.s({
      backgroundColor: $props.backgroundColor
    }),
    c: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mTimeAxisItem = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mTimeAxisItem
}, Symbol.toStringTag, { value: "Module" }));
const TRACK_WIDTH_RPX = 48;
const _sfc_main$c = common_vendor.defineComponent({
  name: "mTimeAxis",
  props: {
    lineColor: {
      type: String,
      default: "#e5e5e5"
    },
    lineWidth: {
      type: Number,
      default: 2
    }
  },
  computed: {
    lineStyle() {
      const w = this.lineWidth;
      const lw = w > 0 ? w : 2;
      const center = TRACK_WIDTH_RPX / 2;
      const leftPx = center - lw / 2;
      return new common_vendor.UTSJSONObject({
        backgroundColor: this.lineColor,
        width: lw + "rpx",
        left: leftPx + "rpx"
      });
    }
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.s($options.lineStyle),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    c: `${_ctx.u_s_b_h}px`,
    d: `${_ctx.u_s_a_i_b}px`,
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mTimeAxis = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mTimeAxis
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = common_vendor.defineComponent({
  name: "mTips",
  props: {
    //top bottom center
    position: {
      type: String,
      default: "top"
    },
    backgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.7)"
    },
    color: {
      type: String,
      default: "#fff"
    },
    size: {
      type: [Number, String],
      default: 30
    }
  },
  computed: {
    tipBarStyle() {
      return new common_vendor.UTSJSONObject({
        backgroundColor: this.backgroundColor,
        color: this.color,
        "font-size": uni_modules_mUnix_components_mTools_Ut.toCssLength(this.size)
      });
    }
  },
  data() {
    return {
      timer: null,
      show: false,
      msg: "无法连接到服务器~"
    };
  },
  methods: {
    showTips: function(options) {
      const _a = options.duration, duration = _a == void 0 ? 2e3 : _a;
      clearTimeout(this.timer);
      this.show = true;
      this.msg = options.msg;
      this.timer = setTimeout(() => {
        this.show = false;
        clearTimeout(this.timer);
        this.timer = null;
      }, duration);
    }
  },
  expose: ["showTips"]
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.position == "top"
  }, $props.position == "top" ? {
    b: common_vendor.t($data.msg),
    c: common_vendor.s($options.tipBarStyle),
    d: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    e: common_vendor.n($data.show ? "m-top-show" : "")
  } : {
    f: common_vendor.t($data.msg),
    g: common_vendor.s($options.tipBarStyle),
    h: common_vendor.n($props.position == "center" ? "m-centertips" : "m-bottomtips"),
    i: common_vendor.n($data.show ? "m-toast-show" : ""),
    j: `${_ctx.u_s_b_h}px`,
    k: `${_ctx.u_s_a_i_b}px`
  });
}
const mTips = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-4f2af771"]]);
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mTips
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = common_vendor.defineComponent({
  name: "mToast",
  emits: ["update:show"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    /** 内置图标（与 icon 二选一，icon 优先） */
    type: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "center"
    },
    mask: {
      type: Boolean,
      default: false
    },
    animation: {
      type: Boolean,
      default: true
    },
    /** 进入/离开动画时长（毫秒） */
    transitionMs: {
      type: Number,
      default: 220
    }
  },
  data() {
    return {
      leaving: false,
      contentActive: false,
      closeTimer: null
    };
  },
  computed: {
    contentMounted() {
      if (!this.animation) {
        return this.show;
      }
      return this.show || this.leaving;
    },
    builtinIconName() {
      if (this.icon != null && this.icon !== "") {
        return "";
      }
      const t = this.type;
      if (t === "success") {
        return "success";
      }
      if (t === "error") {
        return "error";
      }
      if (t === "loading") {
        return "loading";
      }
      return "";
    },
    contentTransitionStyle() {
      const sec = this.transitionMs / 1e3;
      const d = sec + "s";
      return new common_vendor.UTSJSONObject({
        transitionDuration: d
      });
    },
    backdropTransitionStyle() {
      const sec = this.transitionMs / 1e3;
      return new common_vendor.UTSJSONObject({
        transitionDuration: sec + "s"
      });
    }
  },
  watch: {
    show: {
      handler(val) {
        this.onShowChange(val);
      }
    }
  },
  mounted() {
    if (this.show) {
      this.enterContent();
    }
  },
  beforeUnmount() {
    this.cancelTimer();
  },
  methods: {
    cancelTimer() {
      if (this.closeTimer != null) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    enterContent() {
      if (!this.animation) {
        this.contentActive = true;
        this.leaving = false;
        return null;
      }
      this.leaving = false;
      this.contentActive = false;
      this.$nextTick(() => {
        this.contentActive = true;
      });
    },
    leaveContent() {
      if (!this.animation) {
        this.contentActive = false;
        this.leaving = false;
        return null;
      }
      this.contentActive = false;
      this.leaving = true;
      this.cancelTimer();
      const ms = this.transitionMs;
      this.closeTimer = setTimeout(() => {
        this.leaving = false;
        this.closeTimer = null;
      }, ms);
    },
    onShowChange(val) {
      if (val) {
        this.cancelTimer();
        this.enterContent();
      } else {
        this.leaveContent();
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$4 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$4();
}
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.contentMounted
  }, $options.contentMounted ? common_vendor.e({
    b: $props.mask
  }, $props.mask ? {
    c: $data.contentActive ? 1 : "",
    d: common_vendor.s($options.backdropTransitionStyle)
  } : {}, {
    e: $options.builtinIconName !== ""
  }, $options.builtinIconName !== "" ? {
    f: common_vendor.p({
      name: $options.builtinIconName,
      size: "72rpx",
      color: "#ffffff",
      class: "m-toast__icon-el data-v-f6ee994d"
    })
  } : $props.icon !== "" ? {
    h: $props.icon
  } : {}, {
    g: $props.icon !== "",
    i: $props.text !== ""
  }, $props.text !== "" ? {
    j: common_vendor.t($props.text)
  } : {}, {
    k: $data.contentActive ? 1 : "",
    l: common_vendor.s($options.contentTransitionStyle),
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: common_vendor.n(`m-toast--pos-${$props.position}`),
    o: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    p: common_vendor.o(() => {
    }, "0c"),
    q: `${_ctx.u_s_b_h}px`,
    r: `${_ctx.u_s_a_i_b}px`
  }) : {});
}
const mToast = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-f6ee994d"]]);
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mToast
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = common_vendor.defineComponent({
  data() {
    return {};
  },
  methods: {}
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$3 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$3();
}
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.p({
      name: "arrowleft",
      class: "data-v-03547d3a"
    }),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    c: common_vendor.s({
      top: _ctx.$m.getTitleBarHeight() - 20 + "px"
    }),
    d: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    e: common_vendor.o(($event) => _ctx.$m.back(), "2d"),
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mTopBack = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-03547d3a"]]);
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mTopBack
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = common_vendor.defineComponent({
  name: "mTree",
  emits: ["item-click", "item-toggle"],
  props: {
    // 树形数据
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 默认展开的id数组
    defaultExpandKeys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      expandedMap: new common_vendor.UTSJSONObject({})
    };
  },
  created() {
    this.defaultExpandKeys.forEach((id) => {
      this.expandedMap[id] = true;
    });
  },
  methods: {
    toggleItem(item = null) {
      const id = item.id;
      if (item.children && item.children.length > 0) {
        this.expandedMap[id] = !this.expandedMap[id];
        this.$emit("item-toggle", new common_vendor.UTSJSONObject({ item, expanded: this.expandedMap[id] }));
      }
      this.$emit("item-click", new common_vendor.UTSJSONObject({ item }));
    },
    handleItemClick(data = null) {
      this.$emit("item-click", data);
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_tree2 = common_vendor.resolveComponent("m-tree");
  (_easycom_m_icon2 + _easycom_m_tree2)();
}
const _easycom_m_icon$2 = () => "./components/m-icon/m-icon.js";
const _easycom_m_tree = () => "./components/m-tree/m-tree.js";
if (!Math) {
  (_easycom_m_icon$2 + _easycom_m_tree)();
}
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.f($props.data, (item, k0, i0) => {
      return common_vendor.e({
        a: item.children && item.children.length > 0
      }, item.children && item.children.length > 0 ? {
        b: "0d9f5689-0-" + i0,
        c: common_vendor.p({
          name: $data.expandedMap[item.id] ? "arrow-down" : "arrow-right",
          color: "#909399",
          size: "28",
          class: "data-v-0d9f5689"
        })
      } : {}, {
        d: common_vendor.t(item.label),
        e: "item-" + i0,
        f: common_vendor.r("item", {
          item
        }, i0),
        g: common_vendor.o(($event) => $options.toggleItem(item), item.id),
        h: item.children && item.children.length > 0 && $data.expandedMap[item.id]
      }, item.children && item.children.length > 0 && $data.expandedMap[item.id] ? {
        i: common_vendor.o($options.handleItemClick, item.id),
        j: "0d9f5689-1-" + i0,
        k: common_vendor.p({
          data: item.children,
          ["expanded-map"]: $data.expandedMap,
          class: "data-v-0d9f5689"
        })
      } : {}, {
        l: item.id
      });
    }),
    b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    c: `${_ctx.u_s_b_h}px`,
    d: `${_ctx.u_s_a_i_b}px`,
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-0d9f5689"]]);
const __vite_glob_0_75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Component
}, Symbol.toStringTag, { value: "Module" }));
class UpdateInfo extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          hasUpdate: { type: Boolean, optional: false },
          title: { type: String, optional: false },
          desc: { type: String, optional: false },
          versionCode: { type: Number, optional: false },
          versionName: { type: String, optional: false },
          force: { type: Boolean, optional: false },
          apkUrl: { type: String, optional: true }
        };
      },
      name: "UpdateInfo"
    };
  }
  constructor(options, metadata = UpdateInfo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.hasUpdate = this.__props__.hasUpdate;
    this.title = this.__props__.title;
    this.desc = this.__props__.desc;
    this.versionCode = this.__props__.versionCode;
    this.versionName = this.__props__.versionName;
    this.force = this.__props__.force;
    this.apkUrl = this.__props__.apkUrl;
    delete this.__props__;
  }
}
const _sfc_main$7 = common_vendor.defineComponent({
  name: "mUpdate",
  emits: ["update", "noUpdate"],
  data() {
    return {
      showUpdateDialog: false,
      updateInfo: new UpdateInfo({
        hasUpdate: false,
        title: "发现新版本",
        desc: "",
        versionCode: 0,
        versionName: "",
        force: false,
        apkUrl: ""
      })
    };
  },
  props: {
    /** 是否自动检查 */
    autoCheck: {
      type: Boolean,
      default: true
    },
    /**
     * 宿主实现：根据当前 versionCode 请求服务端是否有新版本，返回结构与原先 `checkUpdate` 一致（code / data）。
     * 不配 `common/config` 或未接后端时可不传；此时 `check` 仅 `console.warn` 后返回。
     */
    checkUpdateFn: {
      type: Function,
      default: null
    }
  },
  mounted() {
    if (this.autoCheck) {
      this.check();
    }
  },
  methods: {
    /**
     * 主动检查更新
     */
    check() {
      const fn = this.checkUpdateFn;
      if (fn == null) {
        common_vendor.index.__f__("warn", "at uni_modules/m-unix/components/m-update/m-update.uvue:80", "[m-update] 未传入 checkUpdateFn，已跳过检查更新");
        return null;
      }
      const currentVersionCode = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().configInfo.versionCode || 0;
      fn(currentVersionCode).then((res = null) => {
        if (res.code == 0 && res.data != null) {
          const data = res.data;
          const hasUpdate = data["hasUpdate"] || false;
          if (hasUpdate) {
            this.updateInfo.hasUpdate = true;
            this.updateInfo.title = data["title"] || "发现新版本";
            this.updateInfo.desc = data["desc"] || "修复已知问题，优化使用体验";
            this.updateInfo.versionCode = data["versionCode"] || 0;
            this.updateInfo.versionName = data["versionName"] || "";
            this.updateInfo.force = data["force"] || false;
            this.updateInfo.apkUrl = data["apkUrl"] || "";
            this.showUpdateDialog = true;
          } else {
            this.$emit("noUpdate");
          }
        }
      }).catch((err = null) => {
        common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-update/m-update.uvue:102", "检查更新失败", err);
      });
    },
    /**
     * 处理更新按钮点击
     */
    handleButtonClick(e) {
      if (this.updateInfo.force) {
        this.doUpdate();
        return null;
      }
      if (e.index == 1) {
        this.doUpdate();
      } else {
        this.showUpdateDialog = false;
      }
    },
    /**
     * 执行更新操作
     * - App: 跳转下载页面
     * - 小程序: 使用小程序更新管理器
     */
    doUpdate() {
      uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().configInfo;
      if (common_vendor.index.canIUse("getUpdateManager")) {
        const updateManager = common_vendor.index.getUpdateManager();
        updateManager.applyUpdate();
      }
      this.showUpdateDialog = false;
      this.$emit("update", this.updateInfo);
    },
    /** 获取更新按钮配置 */
    updateButtons() {
      if (this.updateInfo.force) {
        return [new common_vendor.UTSJSONObject({
          text: "立即更新"
        })];
      } else {
        return [new common_vendor.UTSJSONObject({
          text: "稍后"
        }), new common_vendor.UTSJSONObject({
          text: "立即更新"
        })];
      }
    }
  }
});
if (!Array) {
  const _easycom_m_dialog2 = common_vendor.resolveComponent("m-dialog");
  _easycom_m_dialog2();
}
const _easycom_m_dialog = () => "./components/m-dialog/m-dialog.js";
if (!Math) {
  _easycom_m_dialog();
}
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $data.showUpdateDialog
  }, $data.showUpdateDialog ? {
    b: common_vendor.t($data.updateInfo.desc),
    c: common_vendor.t($data.updateInfo.versionName),
    d: common_vendor.gei(_ctx, ""),
    e: common_vendor.o($options.handleButtonClick, "e1"),
    f: common_vendor.p({
      show: true,
      title: $data.updateInfo.title,
      buttons: $options.updateButtons(),
      id: common_vendor.gei(_ctx, ""),
      class: "data-v-da1e7289"
    }),
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  } : {});
}
const mUpdate = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-da1e7289"]]);
const __vite_glob_0_76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mUpdate
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = common_vendor.defineComponent({
  name: "mUpload",
  emits: [
    "update:files",
    "update:fileList",
    "choose",
    "afterRead",
    "delete",
    "upload-start",
    "upload-success",
    "upload-fail"
  ],
  props: {
    files: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileList: {
      type: Array,
      default: null
    },
    maxCount: {
      type: Number,
      default: 9
    },
    count: {
      type: Number,
      default: 9
    },
    sizeType: {
      type: Array,
      default: () => {
        return ["original", "compressed"];
      }
    },
    sourceType: {
      type: Array,
      default: () => {
        return ["album", "camera"];
      }
    },
    /** 选图后是否自动上传（需 uploadUrl 或注入后 api.upload.image） */
    autoUpload: {
      type: Boolean,
      default: false
    },
    /** 上传接口路径（相对 baseUrl）或完整 URL；空则用 getHostProjectConfig().api.upload.image */
    uploadUrl: {
      type: String,
      default: ""
    },
    /** multipart 字段名，需与后端一致 */
    uploadName: {
      type: String,
      default: "file"
    },
    /** 额外表单字段 */
    uploadFormData: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    /** 覆盖上传使用的 base（默认 getHostProjectConfig().baseUrl） */
    uploadBaseUrl: {
      type: String,
      default: ""
    },
    uploadWithToken: {
      type: Boolean,
      default: true
    },
    /** 选图后、上传前是否 uni.compressImage（手动模式也会在 afterRead 里给压缩后的 path） */
    compress: {
      type: Boolean,
      default: false
    },
    compressQuality: {
      type: Number,
      default: 80
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否显示删除按钮 */
    deletable: {
      type: Boolean,
      default: true
    },
    /** 点击图片是否预览 */
    previewable: {
      type: Boolean,
      default: true
    },
    /** 存在上传中项时禁止继续选择 */
    blockChooseWhenUploading: {
      type: Boolean,
      default: true
    },
    /** 每行格子数（与父级同宽时一行排满再换行；默认 4） */
    columns: {
      type: Number,
      default: 4
    },
    /** 格子横向、纵向间距（rpx） */
    gap: {
      type: Number,
      default: 20
    }
  },
  computed: {
    /** 由 columns、gap 生成每项宽度与间距 CSS 变量（ucss 对 gap 不稳定，用 margin） */
    uploadGridStyle() {
      const cRaw = this.columns;
      const g = this.gap;
      let cols = cRaw;
      if (cols < 1) {
        cols = 1;
      }
      const st = new common_vendor.UTSJSONObject({});
      st["--mu-gap"] = g + "rpx";
      st["--mu-item-w"] = "calc((100% - " + (cols - 1) + " * " + g + "rpx) / " + cols + ")";
      return st;
    },
    /** 保留列表项上的业务字段（如 id），仅约定使用 url / status / path / serverData */
    resolvedFiles() {
      const fl = this.fileList;
      if (fl != null) {
        return fl;
      }
      return this.files;
    },
    resolvedUploadUrl() {
      const u = this.uploadUrl;
      if (u != null && u !== "") {
        return u;
      }
      return uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().api.upload.image;
    },
    hasUploading() {
      const list = this.resolvedFiles;
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        if (it["status"] === "uploading") {
          return true;
        }
      }
      return false;
    },
    addDisabled() {
      if (this.disabled) {
        return true;
      }
      if (this.blockChooseWhenUploading && this.hasUploading) {
        return true;
      }
      return false;
    }
  },
  methods: {
    emitFilesUpdate(next) {
      this.$emit("update:files", next);
      this.$emit("update:fileList", next);
    },
    collectPaths(tempFiles) {
      const out = [];
      for (let i = 0; i < tempFiles.length; i++) {
        const t = tempFiles[i];
        const p = t["path"];
        if (typeof p === "string") {
          const ps = p;
          if (ps !== "") {
            out.push(ps);
          }
        }
      }
      return out;
    },
    compressPaths(paths) {
      if (!this.compress) {
        return Promise.resolve(paths);
      }
      const q = this.compressQuality;
      const run = (i, acc) => {
        if (i >= paths.length) {
          return Promise.resolve(acc);
        }
        return uni_modules_mUnix_components_mTools_Upload.compressImagePath(paths[i], q).then((c) => {
          acc.push(c);
          return run(i + 1, acc);
        });
      };
      return run(0, []);
    },
    onImageTap(index) {
      if (!this.previewable) {
        return null;
      }
      this.previewImage(index);
    },
    chooseImage() {
      if (this.addDisabled) {
        return null;
      }
      const remaining = this.maxCount - this.resolvedFiles.length;
      const count = this.count > remaining ? remaining : this.count;
      const self = this;
      common_vendor.index.chooseImage(new common_vendor.UTSJSONObject({
        count,
        sizeType: this.sizeType,
        sourceType: this.sourceType,
        success: (res) => {
          let tempFiles = res.tempFiles;
          if (tempFiles == null || tempFiles.length === 0) {
            const paths = res.tempFilePaths;
            if (paths != null) {
              tempFiles = paths.map((p) => {
                return new common_vendor.UTSJSONObject({ path: p });
              });
            } else {
              tempFiles = [];
            }
          }
          self.handlePicked(tempFiles);
        }
      }));
    },
    handlePicked(tempFiles) {
      const paths = this.collectPaths(tempFiles);
      if (paths.length === 0) {
        return null;
      }
      const self = this;
      this.compressPaths(paths).then((compressed) => {
        const processed = [];
        for (let i = 0; i < compressed.length; i++) {
          processed.push(new common_vendor.UTSJSONObject({ path: compressed[i] }));
        }
        const payload = new common_vendor.UTSJSONObject({ tempFiles: processed });
        self.$emit("choose", payload);
        self.$emit("afterRead", payload);
        if (!self.autoUpload) {
          return null;
        }
        const u = self.resolvedUploadUrl;
        if (u === "") {
          common_vendor.index.showToast({ title: "请配置 uploadUrl 或注入 api.upload.image", icon: "none" });
          return null;
        }
        self.$emit("upload-start", new common_vendor.UTSJSONObject({ count: compressed.length }));
        let chain = Promise.resolve();
        for (let j = 0; j < compressed.length; j++) {
          const localPath = compressed[j];
          chain = chain.then(() => {
            return self.uploadOneLocalAwait(localPath);
          });
        }
        return chain;
      });
    },
    uploadOneLocalAwait(localPath) {
      const self = this;
      const list = [...this.resolvedFiles];
      const idx = list.length;
      list.push(new common_vendor.UTSJSONObject({
        url: localPath,
        status: "uploading",
        path: localPath
      }));
      this.emitFilesUpdate(list);
      const u = this.resolvedUploadUrl;
      const fd = this.uploadFormData;
      return uni_modules_mUnix_components_mTools_Upload.uploadFileRequest(new uni_modules_mUnix_components_mTools_Upload.UploadFileOptions({
        header: null,
        loadingText: null,
        successCodes: null,
        url: u,
        filePath: localPath,
        name: this.uploadName,
        formData: fd,
        baseUrl: this.uploadBaseUrl,
        withToken: this.uploadWithToken,
        showLoading: false,
        showError: true
      })).then((res) => {
        const out = uni_modules_mUnix_components_mTools_Upload.pickUploadUrl(res.data);
        const cur = [...self.resolvedFiles];
        if (idx >= cur.length) {
          return null;
        }
        if (out === "") {
          cur[idx] = new common_vendor.UTSJSONObject({
            url: localPath,
            status: "failed",
            path: localPath
          });
          self.emitFilesUpdate(cur);
          self.$emit("upload-fail", new common_vendor.UTSJSONObject({ index: idx, file: cur[idx], error: res }));
          return null;
        }
        cur[idx] = new common_vendor.UTSJSONObject({
          url: out,
          status: "done",
          path: localPath,
          serverData: res.data
        });
        self.emitFilesUpdate(cur);
        self.$emit("upload-success", new common_vendor.UTSJSONObject({ index: idx, file: cur[idx], response: res }));
      }).catch((e = null) => {
        const cur = [...self.resolvedFiles];
        if (idx < cur.length) {
          cur[idx] = new common_vendor.UTSJSONObject({
            url: localPath,
            status: "failed",
            path: localPath
          });
          self.emitFilesUpdate(cur);
          self.$emit("upload-fail", new common_vendor.UTSJSONObject({ index: idx, file: cur[idx], error: e }));
        }
      });
    },
    retryUpload(index) {
      const listNow = this.resolvedFiles;
      if (index < 0 || index >= listNow.length) {
        return null;
      }
      const item = listNow[index];
      if (item["status"] != "failed") {
        return null;
      }
      const path = item["path"];
      if (path == null || path === "") {
        return null;
      }
      const u = this.resolvedUploadUrl;
      if (u === "") {
        common_vendor.index.showToast({ title: "请配置 uploadUrl", icon: "none" });
        return null;
      }
      const list = [...listNow];
      list[index] = new common_vendor.UTSJSONObject({
        url: path,
        status: "uploading",
        path
      });
      this.emitFilesUpdate(list);
      const self = this;
      const fd = this.uploadFormData;
      uni_modules_mUnix_components_mTools_Upload.uploadFileRequest(new uni_modules_mUnix_components_mTools_Upload.UploadFileOptions({
        header: null,
        loadingText: null,
        successCodes: null,
        url: u,
        filePath: path,
        name: this.uploadName,
        formData: fd,
        baseUrl: this.uploadBaseUrl,
        withToken: this.uploadWithToken,
        showLoading: false,
        showError: true
      })).then((res) => {
        const out = uni_modules_mUnix_components_mTools_Upload.pickUploadUrl(res.data);
        const cur = [...self.resolvedFiles];
        if (index >= cur.length) {
          return null;
        }
        if (out === "") {
          cur[index] = new common_vendor.UTSJSONObject({
            url: path,
            status: "failed",
            path
          });
          self.emitFilesUpdate(cur);
          self.$emit("upload-fail", new common_vendor.UTSJSONObject({ index, file: cur[index], error: res }));
          return null;
        }
        cur[index] = new common_vendor.UTSJSONObject({
          url: out,
          status: "done",
          path,
          serverData: res.data
        });
        self.emitFilesUpdate(cur);
        self.$emit("upload-success", new common_vendor.UTSJSONObject({ index, file: cur[index], response: res }));
      }).catch((e = null) => {
        const cur = [...self.resolvedFiles];
        if (index < cur.length) {
          cur[index] = new common_vendor.UTSJSONObject({
            url: path,
            status: "failed",
            path
          });
          self.emitFilesUpdate(cur);
          self.$emit("upload-fail", new common_vendor.UTSJSONObject({ index, file: cur[index], error: e }));
        }
      });
    },
    deleteImage(index) {
      const files = [...this.resolvedFiles];
      const deleted = files.splice(index, 1);
      this.emitFilesUpdate(files);
      this.$emit("delete", new common_vendor.UTSJSONObject({
        index,
        file: deleted.length > 0 ? deleted[0] : null
      }));
    },
    previewImage(index) {
      const urls = [];
      const list = this.resolvedFiles;
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        const u = it["url"];
        if (typeof u === "string") {
          urls.push(u);
        }
      }
      if (urls.length === 0) {
        return null;
      }
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon$1 = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon$1();
}
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.f($options.resolvedFiles, (item, index, i0) => {
      return common_vendor.e({
        a: item.url,
        b: common_vendor.o(($event) => $options.onImageTap(index), index),
        c: $props.deletable && item.status != "uploading"
      }, $props.deletable && item.status != "uploading" ? {
        d: "a45b24cb-0-" + i0,
        e: common_vendor.p({
          name: "close",
          size: "28rpx",
          color: "#ffffff",
          class: "data-v-a45b24cb"
        }),
        f: common_vendor.o(($event) => $options.deleteImage(index), index)
      } : {}, {
        g: item.status == "uploading"
      }, item.status == "uploading" ? {} : {}, {
        h: item.status == "failed"
      }, item.status == "failed" ? {
        i: common_vendor.o(($event) => $options.retryUpload(index), index)
      } : {}, {
        j: index
      });
    }),
    b: $options.resolvedFiles.length < $props.maxCount
  }, $options.resolvedFiles.length < $props.maxCount ? {
    c: common_vendor.p({
      name: "upload",
      size: "56rpx",
      color: "#c0c4cc",
      class: "data-v-a45b24cb"
    }),
    d: $options.addDisabled ? 1 : "",
    e: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args), "9c")
  } : {}, {
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: common_vendor.s($options.uploadGridStyle),
    h: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    i: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mUpload = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-a45b24cb"]]);
const __vite_glob_0_77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mUpload
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = common_vendor.defineComponent({
  name: "mVcode",
  emits: ["change"],
  props: {
    vcodeStr: {
      type: String,
      default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    },
    length: {
      type: [Number, String],
      default: 4
    },
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 36
    },
    bgColor: {
      type: String,
      default: ""
    },
    fontColor: {
      type: String,
      default: ""
    },
    hasPoint: {
      type: Boolean,
      default: true
    },
    hasLine: {
      type: Boolean,
      default: true
    },
    /** text：随机字符；math：两位整数加减，画布显示算式，校验答案 */
    mode: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      canvasId: "",
      currentValue: "",
      /** 加减模式：算式展示串，如 3+5=? */
      mathExpression: "",
      mathAnswer: "",
      mathA: 0,
      mathB: 0,
      mathOp: "+",
      /** 标准 CanvasRenderingContext2D，由 createCanvasContextAsync 初始化 */
      ctx2d: null,
      canvasReady: false
    };
  },
  computed: {
    wPx() {
      return uni_modules_mUnix_components_mTools_Ut.parseCssNumber(this.width);
    },
    hPx() {
      return uni_modules_mUnix_components_mTools_Ut.parseCssNumber(this.height);
    },
    lenNum() {
      const l = this.length;
      if (typeof l === "number") {
        return l < 1 ? 4 : l;
      }
      const n = parseInt(l);
      if (isNaN(n) || n < 1) {
        return 4;
      }
      return n;
    },
    canvasCss() {
      return new common_vendor.UTSJSONObject({
        width: this.wPx + "px",
        height: this.hPx + "px"
      });
    }
  },
  created() {
    this.canvasId = "m-vcode-" + Date.now() + "-" + Math.floor(Math.random() * 1e5);
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas2d();
    });
  },
  methods: {
    randomChar() {
      const pool = this.vcodeStr;
      if (pool.length === 0) {
        return "A";
      }
      const i = Math.floor(Math.random() * pool.length);
      return pool.charAt(i);
    },
    randomColor() {
      const r = Math.floor(50 + Math.random() * 180);
      const g = Math.floor(50 + Math.random() * 180);
      const b = Math.floor(50 + Math.random() * 180);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    isMathMode() {
      return this.mode === "math";
    },
    /** 生成一道加减题，写入 mathExpression / mathAnswer / currentValue */
    generateMathQuiz() {
      let a = Math.floor(1 + Math.random() * 9);
      let b = Math.floor(1 + Math.random() * 9);
      const useAdd = Math.random() < 0.5;
      if (useAdd) {
        this.mathOp = "+";
        this.mathA = a;
        this.mathB = b;
        this.mathAnswer = "" + (a + b);
      } else {
        this.mathOp = "-";
        if (a < b) {
          const t = a;
          a = b;
          b = t;
        }
        this.mathA = a;
        this.mathB = b;
        this.mathAnswer = "" + (a - b);
      }
      this.mathExpression = this.mathA + this.mathOp + this.mathB + "=?";
      this.currentValue = this.mathAnswer;
    },
    /** 准备本次绘制的字符串（字符模式或算式） */
    prepareDrawText() {
      if (this.isMathMode()) {
        this.generateMathQuiz();
        return this.mathExpression;
      }
      let code = "";
      for (let i = 0; i < this.lenNum; i++) {
        code += this.randomChar();
      }
      this.currentValue = code;
      return code;
    },
    emitDrawChange() {
      const self = this;
      if (self.isMathMode()) {
        const expr = "" + self.mathA + self.mathOp + self.mathB;
        self.$emit("change", new common_vendor.UTSJSONObject({ value: self.mathAnswer, mode: "math", expression: expr }));
      } else {
        self.$emit("change", new common_vendor.UTSJSONObject({ value: self.currentValue, mode: "text" }));
      }
    },
    /**
     * 校验用户输入是否与当前验证码一致（字符模式忽略大小写；加减模式比较数字答案）
     */
    verify(input) {
      const t = (input != null ? "" + input : "").trim();
      if (t.length === 0) {
        return false;
      }
      if (this.isMathMode()) {
        return t === this.mathAnswer;
      }
      const cv = this.currentValue;
      if (cv.length === 0) {
        return false;
      }
      return t.toLowerCase() === cv.toLowerCase();
    },
    initCanvas2d() {
      const self = this;
      const w = self.wPx;
      const h = self.hPx;
      if (w <= 0 || h <= 0) {
        return null;
      }
      try {
        const uniAny = common_vendor.index;
        if (uniAny.createCanvasContextAsync != null) {
          uniAny.createCanvasContextAsync(new common_vendor.UTSJSONObject({
            id: self.canvasId,
            component: self,
            success: (context = null) => {
              const ctx = context.getContext("2d");
              if (ctx == null) {
                return null;
              }
              let dpr = 1;
              try {
                const di = common_vendor.index.getDeviceInfo();
                if (di != null && di.devicePixelRatio != null) {
                  dpr = di.devicePixelRatio;
                }
              } catch (e) {
                dpr = 1;
              }
              const canvas = ctx.canvas;
              if (canvas != null) {
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                ctx.scale(dpr, dpr);
              }
              self.ctx2d = ctx;
              self.canvasReady = true;
              self.redraw();
            },
            fail: (_err = null) => {
              self.tryLegacyCanvas();
            }
          }));
          return null;
        }
      } catch (_e) {
      }
      self.tryLegacyCanvas();
    },
    /** 旧版 API（部分端仍可用） */
    tryLegacyCanvas() {
      const self = this;
      const w = self.wPx;
      const h = self.hPx;
      if (w <= 0 || h <= 0) {
        return null;
      }
      try {
        const ctx = common_vendor.index.createCanvasContext(self.canvasId, self);
        if (ctx == null) {
          return null;
        }
        self.ctx2d = ctx;
        self.canvasReady = true;
        self.legacyDraw(ctx, w, h);
      } catch (_e) {
        self.canvasReady = false;
      }
    },
    legacyDraw(ctx = null, w, h) {
      const code = this.prepareDrawText();
      const charCount = code.length;
      const bg = this.bgColor.trim();
      if (bg.length > 0) {
        ctx.setFillStyle(bg);
      } else {
        ctx.setFillStyle(this.randomColor());
      }
      ctx.fillRect(0, 0, w, h);
      if (this.hasLine) {
        for (let n = 0; n < 3; n++) {
          ctx.beginPath();
          ctx.setStrokeStyle(this.randomColor());
          ctx.moveTo(Math.random() * w, Math.random() * h);
          ctx.lineTo(Math.random() * w, Math.random() * h);
          ctx.stroke();
        }
      }
      if (this.hasPoint) {
        for (let p = 0; p < 20; p++) {
          ctx.beginPath();
          ctx.setFillStyle(this.randomColor());
          const x = Math.random() * w;
          const y = Math.random() * h;
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      const fc = this.fontColor.trim();
      const fontPx = Math.max(12, Math.floor(h * (this.isMathMode() ? 0.5 : 0.72)));
      ctx.setFontSize(fontPx);
      const step = w / (charCount + 1);
      for (let j = 0; j < code.length; j++) {
        const ch = code.charAt(j);
        const useC = fc.length > 0 ? fc : this.randomColor();
        ctx.setFillStyle(useC);
        const x = step * (j + 0.45) + Math.random() * 3;
        const y = h * 0.72 + Math.random() * 2;
        ctx.fillText(ch, x, y);
      }
      const self = this;
      ctx.draw(false, () => {
        self.emitDrawChange();
      });
    },
    /** 对外：换一张（与旧版 draw 同名，供 ref 调用） */
    draw() {
      if (!this.canvasReady || this.ctx2d == null) {
        this.initCanvas2d();
        const self_1 = this;
        if (self_1.canvasReady && self_1.ctx2d != null) {
          return null;
        }
        setTimeout(() => {
          if (self_1.canvasReady && self_1.ctx2d != null) {
            self_1.redraw();
          }
        }, 150);
        return null;
      }
      const ctx = this.ctx2d;
      const legacy = ctx.setFillStyle != null && ctx.fillRect != null && ctx.draw != null;
      if (legacy && ctx.draw != null) {
        this.legacyDraw(ctx, this.wPx, this.hPx);
        return null;
      }
      this.redraw();
    },
    onTapDraw() {
      this.draw();
    },
    redraw() {
      const ctx = this.ctx2d;
      if (ctx == null) {
        return null;
      }
      if (ctx.setFillStyle != null && ctx.draw != null) {
        this.legacyDraw(ctx, this.wPx, this.hPx);
        return null;
      }
      this.drawStandard2d(ctx, this.wPx, this.hPx);
    },
    drawStandard2d(ctx = null, w, h) {
      const code = this.prepareDrawText();
      const charCount = code.length;
      const bg = this.bgColor.trim();
      if (bg.length > 0) {
        ctx.fillStyle = bg;
      } else {
        ctx.fillStyle = this.randomColor();
      }
      ctx.fillRect(0, 0, w, h);
      if (this.hasLine) {
        for (let n = 0; n < 3; n++) {
          ctx.strokeStyle = this.randomColor();
          ctx.beginPath();
          ctx.moveTo(Math.random() * w, Math.random() * h);
          ctx.lineTo(Math.random() * w, Math.random() * h);
          ctx.stroke();
        }
      }
      if (this.hasPoint) {
        for (let p = 0; p < 20; p++) {
          ctx.fillStyle = this.randomColor();
          ctx.beginPath();
          ctx.arc(Math.random() * w, Math.random() * h, 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      const fc = this.fontColor.trim();
      const fontPx = Math.max(12, Math.floor(h * (this.isMathMode() ? 0.5 : 0.72)));
      ctx.font = fontPx + "px sans-serif";
      const step = w / (charCount + 1);
      for (let j = 0; j < code.length; j++) {
        const ch = code.charAt(j);
        const useC = fc.length > 0 ? fc : this.randomColor();
        ctx.fillStyle = useC;
        const x = step * (j + 0.45) + Math.random() * 3;
        const y = h * 0.72 + Math.random() * 2;
        ctx.fillText(ch, x, y);
      }
      this.emitDrawChange();
    }
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei($data.canvasId, "canvas"),
    b: $data.canvasId,
    c: common_vendor.s($options.canvasCss),
    d: $options.wPx,
    e: $options.hPx,
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: common_vendor.o((...args) => $options.onTapDraw && $options.onTapDraw(...args), "f7"),
    h: `${_ctx.u_s_b_h}px`,
    i: `${_ctx.u_s_a_i_b}px`,
    j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mVcode = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-bd3b8730"]]);
const __vite_glob_0_78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mVcode
}, Symbol.toStringTag, { value: "Module" }));
class WaterfallCell extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          item: { type: "Any", optional: false },
          index: { type: Number, optional: false }
        };
      },
      name: "WaterfallCell"
    };
  }
  constructor(options, metadata = WaterfallCell.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.item = this.__props__.item;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
const _sfc_main$4 = common_vendor.defineComponent({
  name: "mWaterfall",
  emits: ["scrolltolower", "scrolltoupper"],
  props: {
    /** 列表数据 */
    listData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /** 列数，目前限制 1～2 */
    columnCount: {
      type: [Number, String],
      default: 2
    },
    /** 主轴方向间距（纵向间隔），支持数字默认 rpx 或带单位字符串 */
    rowGap: {
      type: [Number, String],
      default: "10rpx"
    },
    /** 交叉轴间距（列间距） */
    columnGap: {
      type: [Number, String],
      default: "10rpx"
    },
    /** 左侧内边距 */
    leftGap: {
      type: [Number, String],
      default: 0
    },
    /** 右侧内边距 */
    rightGap: {
      type: [Number, String],
      default: 0
    },
    /** 背景色 */
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    /** 外层圆角，如 12rpx */
    borderRadius: {
      type: String,
      default: "0"
    },
    /**
     * 非 App 下的分列策略：1 按顺序轮流分配到各列；2 按 flowHeight（数据项上的预估高度，数字，单位 rpx）尽量平衡列高
     * App 下由原生瀑布流自行排布
     */
    layoutType: {
      type: [Number, String],
      default: 1
    },
    /** 触发 scrolltolower 的距底阈值（px，与 scroll-view / waterflow 一致） */
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    showScrollbar: {
      type: Boolean,
      default: true
    },
    /** 兜底区域最小高度，便于预览（如 800rpx）；不设则由父级布局决定 */
    minHeight: {
      type: String,
      default: ""
    }
  },
  computed: {
    resolvedColumnCount() {
      let n = Number(this.columnCount);
      if (n !== n || n < 1) {
        n = 2;
      }
      if (n > 2) {
        n = 2;
      }
      return n;
    },
    mainGapPx() {
      return this.parseToPx(this.rowGap);
    },
    crossGapPx() {
      return this.parseToPx(this.columnGap);
    },
    nativePaddingPx() {
      const l = this.parseToPx(this.leftGap);
      const r = this.parseToPx(this.rightGap);
      return [0, r, 0, l];
    },
    nativeRootStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["flex"] = "1";
      st["minHeight"] = "0";
      const bg = this.backgroundColor;
      if (bg != null && ("" + bg).length > 0) {
        st["backgroundColor"] = bg;
      }
      const br = this.borderRadius;
      if (br != null && ("" + br).trim().length > 0 && ("" + br).trim() !== "0") {
        st["borderRadius"] = br;
      }
      return st;
    },
    fallbackScrollStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["flex"] = "1";
      const mh = this.minHeight;
      if (mh != null && ("" + mh).trim().length > 0) {
        st["minHeight"] = mh;
      }
      const bg = this.backgroundColor;
      if (bg != null && ("" + bg).length > 0) {
        st["backgroundColor"] = bg;
      }
      const br = this.borderRadius;
      if (br != null && ("" + br).trim().length > 0 && ("" + br).trim() !== "0") {
        st["borderRadius"] = br;
      }
      return st;
    },
    fallbackRowPaddingStyle() {
      const st = new common_vendor.UTSJSONObject({});
      const l = this.edgeGapCss(this.leftGap);
      const r = this.edgeGapCss(this.rightGap);
      if (l.length > 0) {
        st["paddingLeft"] = l;
      }
      if (r.length > 0) {
        st["paddingRight"] = r;
      }
      return st;
    },
    fallbackCellOuterStyle() {
      const st = new common_vendor.UTSJSONObject({});
      const g = this.mainGapPx;
      if (g > 0) {
        st["marginBottom"] = g + "px";
      }
      return st;
    },
    fallbackColumns() {
      return this.buildFallbackColumns();
    }
  },
  methods: {
    edgeGapCss(val) {
      if (typeof val === "number") {
        if (val === 0) {
          return "";
        }
        return val + "rpx";
      }
      const s = ("" + val).trim();
      if (s.length === 0 || s === "0") {
        return "";
      }
      return s;
    },
    fallbackColStyleAt(ci) {
      const st = new common_vendor.UTSJSONObject({});
      const n = this.resolvedColumnCount;
      const g = this.crossGapPx;
      if (ci < n - 1 && g > 0) {
        st["marginRight"] = g + "px";
      }
      st["flex"] = "1";
      st["minWidth"] = "0";
      return st;
    },
    parseToPx(val) {
      if (typeof val === "number") {
        const u_1 = common_vendor.index.rpx2px(val);
        return u_1 != null && u_1 > 0 ? u_1 : val;
      }
      const s = ("" + val).trim();
      if (s.length === 0 || s === "0") {
        return 0;
      }
      const len = s.length;
      if (len >= 3 && s.substring(len - 3) === "rpx") {
        const n_1 = parseFloat(s);
        if (n_1 !== n_1) {
          return 0;
        }
        const u_2 = common_vendor.index.rpx2px(n_1);
        return u_2 != null && u_2 >= 0 ? u_2 : 0;
      }
      if (len >= 2 && s.substring(len - 2) === "px") {
        const n_2 = parseFloat(s);
        return n_2 !== n_2 ? 0 : n_2;
      }
      const n = parseFloat(s);
      if (n !== n) {
        return 0;
      }
      const u = common_vendor.index.rpx2px(n);
      return u != null && u >= 0 ? u : 0;
    },
    itemKey(item = null, index) {
      if (item != null) {
        const id = item["id"];
        if (id != null && ("" + id).length > 0) {
          return "" + id;
        }
      }
      return "_wf_" + index;
    },
    readFlowHeightRpx(item = null) {
      if (item == null) {
        return 160;
      }
      const h = item["flowHeight"];
      if (typeof h === "number" && h === h && h > 0) {
        return h;
      }
      if (h != null) {
        const n = parseFloat("" + h);
        if (n === n && n > 0) {
          return n;
        }
      }
      return 160;
    },
    buildFallbackColumns() {
      const list = this.listData;
      const n = this.resolvedColumnCount;
      const cols = [];
      for (let i = 0; i < n; i++) {
        cols.push([]);
      }
      if (list == null || list.length === 0) {
        return cols;
      }
      const mode = Number(this.layoutType);
      if (mode === 2) {
        const gapPx = this.mainGapPx;
        const heights = [];
        for (let i = 0; i < n; i++) {
          heights.push(0);
        }
        for (let index = 0; index < list.length; index++) {
          const item = list[index];
          const hrpx = this.readFlowHeightRpx(item);
          const hpx = this.parseToPx(hrpx);
          let pick = 0;
          for (let c = 1; c < n; c++) {
            const hc = heights[c];
            const hp = heights[pick];
            if (hc < hp) {
              pick = c;
            } else if (hc === hp && cols[c].length < cols[pick].length) {
              pick = c;
            }
          }
          if (cols[pick].length > 0) {
            heights[pick] = heights[pick] + gapPx;
          }
          heights[pick] = heights[pick] + hpx;
          cols[pick].push(new WaterfallCell({
            key: this.itemKey(item, index),
            item,
            index
          }));
        }
        return cols;
      }
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const ci = index % n;
        cols[ci].push(new WaterfallCell({
          key: this.itemKey(item, index),
          item,
          index
        }));
      }
      return cols;
    },
    onScrollToLower(e = null) {
      this.$emit("scrolltolower", e);
    },
    onScrollToUpper(e = null) {
      this.$emit("scrolltoupper", e);
    }
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.f($options.fallbackColumns, (col, ci, i0) => {
      return {
        a: common_vendor.f(col, (cell, k1, i1) => {
          return {
            a: "d-" + i0 + "-" + i1,
            b: common_vendor.r("d", {
              item: cell.item,
              index: cell.index
            }, i0 + "-" + i1),
            c: cell.key
          };
        }),
        b: ci,
        c: common_vendor.s($options.fallbackColStyleAt(ci))
      };
    }),
    b: common_vendor.s($options.fallbackCellOuterStyle),
    c: common_vendor.s($options.fallbackRowPaddingStyle),
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "scroll-view"),
    e: common_vendor.s($options.fallbackScrollStyle),
    f: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    g: $props.lowerThreshold,
    h: $props.showScrollbar,
    i: common_vendor.o((...args) => $options.onScrollToLower && $options.onScrollToLower(...args), "0a"),
    j: common_vendor.o((...args) => $options.onScrollToUpper && $options.onScrollToUpper(...args), "83"),
    k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mWaterfall = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-fcea4935"]]);
const __vite_glob_0_79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mWaterfall
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = common_vendor.defineComponent({
  name: "mWatermark",
  props: {
    image: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    fontSize: {
      type: [Number, String],
      default: 20
    },
    /**
     * 水印文字颜色。uni-app x 部分端对 text 的 rgba 支持不稳定，默认用实色 #hex；
     * 需要更淡时配合 opacity，深色图/底可改用 #ffffff 等浅色。
     */
    color: {
      type: String,
      default: "#c8c8c8"
    },
    gap: {
      type: Array,
      default: () => {
        return [50, 50];
      }
    },
    rotate: {
      type: [Number, String],
      default: -30
    },
    /** 整体叠层透明度 0~1，与 color 中的 alpha 可叠加 */
    opacity: {
      type: Number,
      default: -1
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  data() {
    return {
      canvasId: "",
      width: 0,
      height: 0
    };
  },
  computed: {
    hasImage() {
      return this.image.trim().length > 0;
    },
    hasContent() {
      return this.content.trim().length > 0;
    },
    showTextOverlay() {
      return this.hasContent && !this.hasImage;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        position: "relative",
        width: "100%",
        overflow: "hidden"
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    canvasStyle() {
      return new common_vendor.UTSJSONObject({
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        zIndex: "4"
      });
    },
    overlayWrapStyle() {
      const o = this.opacity;
      if (o >= 0 && o <= 1) {
        return new common_vendor.UTSJSONObject({ opacity: o });
      }
      return new common_vendor.UTSJSONObject({});
    },
    cellMarginStyle() {
      const g = this.gap;
      const gx = g.length > 0 ? g[0] : 50;
      const gy = g.length > 1 ? g[1] : 50;
      return new common_vendor.UTSJSONObject({
        marginLeft: gx / 2 + "rpx",
        marginRight: gx / 2 + "rpx",
        marginTop: gy / 2 + "rpx",
        marginBottom: gy / 2 + "rpx"
      });
    },
    tileFontStyle() {
      const fs = uni_modules_mUnix_components_mTools_Ut.toCssLength(this.fontSize);
      return new common_vendor.UTSJSONObject({
        "font-size": fs,
        color: this.color
      });
    },
    tileRotateStyle() {
      const deg = String(this.rotate);
      return new common_vendor.UTSJSONObject({
        transform: "rotate(" + deg + "deg)"
      });
    },
    tileList() {
      const arr = [];
      for (let i = 0; i < 72; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  created() {
    this.canvasId = "m-watermark-" + Math.random().toString(36).substring(2, 11);
  },
  watch: {
    image() {
      this.scheduleDraw();
    },
    content() {
      this.scheduleDraw();
    },
    fontSize() {
      this.scheduleDraw();
    },
    color() {
      this.scheduleDraw();
    },
    gap() {
      this.scheduleDraw();
    },
    rotate() {
      this.scheduleDraw();
    }
  },
  mounted() {
    this.scheduleDraw();
  },
  methods: {
    scheduleDraw() {
      if (!this.hasImage) {
        return null;
      }
      this.$nextTick(() => {
        this.draw();
      });
    },
    draw() {
      if (!this.hasImage) {
        return null;
      }
      const that = this;
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".m-watermark").boundingClientRect(function(rect = null) {
        if (rect == null || rect.width <= 0 || rect.height <= 0) {
          return null;
        }
        that.width = rect.width;
        that.height = rect.height;
        const pixelRatio = common_vendor.index.getSystemInfoSync().pixelRatio;
        const canvas = common_vendor.index.createCanvasContext(that.canvasId, that);
        const img = that.image.trim();
        if (img.length > 0) {
          canvas.drawImage(img, 0, 0, that.width, that.height);
        }
        const text = that.content.trim();
        if (text.length > 0) {
          canvas.beginPath();
          const fontPx = uni_modules_mUnix_components_mTools_Ut.parseCssNumber(that.fontSize);
          canvas.setFontSize(fontPx * pixelRatio);
          canvas.setFillStyle(that.color);
          const rotateNum = Number(that.rotate) * Math.PI / 180;
          canvas.rotate(rotateNum);
          const gapX = (that.gap[0] != null ? that.gap[0] : 50) * pixelRatio;
          const gapY = (that.gap[1] != null ? that.gap[1] : 50) * pixelRatio;
          const step = fontPx * pixelRatio + gapY;
          let x = 0;
          let y = gapY;
          while (y < that.height * pixelRatio + step) {
            x = 0;
            while (x < that.width * pixelRatio + step) {
              canvas.fillText(text, x, y);
              x += text.length * fontPx * pixelRatio + gapX;
            }
            y += step;
          }
          canvas.stroke();
        }
        canvas.draw(false, () => {
        });
      });
      query.exec();
    },
    saveImage() {
      if (!this.hasImage) {
        common_vendor.index.showToast({
          title: "文字叠层模式不支持导出",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.canvasToTempFilePath({
        canvasId: this.canvasId,
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "success"
              });
            },
            fail: () => {
              common_vendor.index.showToast({
                title: "保存失败",
                icon: "none"
              });
            }
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "生成失败",
            icon: "none"
          });
        }
      }, this);
    }
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.showTextOverlay
  }, $options.showTextOverlay ? {
    b: common_vendor.f($options.tileList, (idx, k0, i0) => {
      return {
        a: idx
      };
    }),
    c: common_vendor.t($props.content),
    d: common_vendor.s($options.tileFontStyle),
    e: common_vendor.s($options.tileRotateStyle),
    f: common_vendor.s($options.cellMarginStyle),
    g: common_vendor.s($options.overlayWrapStyle)
  } : {}, {
    h: $options.hasImage
  }, $options.hasImage ? {
    i: $data.canvasId,
    j: common_vendor.s($options.canvasStyle),
    k: common_vendor.o((...args) => $options.saveImage && $options.saveImage(...args), "e8")
  } : {}, {
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    m: common_vendor.s($options.rootStyle),
    n: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    o: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const mWatermark = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-00557084"]]);
const __vite_glob_0_80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mWatermark
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = common_vendor.defineComponent({
  name: "mWhiteSpace",
  emits: ["click"],
  props: {
    size: {
      type: String,
      default: "default"
    },
    height: {
      type: [Number, String],
      default: 0
    },
    background: {
      type: String,
      default: "transparent"
    }
  },
  computed: {
    boxStyle() {
      let h = 0;
      const hv = this.height;
      if (typeof hv === "number" && hv > 0) {
        return new common_vendor.UTSJSONObject({
          height: hv + "rpx",
          backgroundColor: this.background
        });
      }
      if (typeof hv === "string" && hv !== "" && hv !== "0") {
        return new common_vendor.UTSJSONObject({
          height: uni_modules_mUnix_components_mTools_Ut.toCssLength(hv),
          backgroundColor: this.background
        });
      }
      const sz = this.size;
      if (sz === "small") {
        h = 10;
      } else if (sz === "large") {
        h = 30;
      } else {
        h = 20;
      }
      return new common_vendor.UTSJSONObject({
        height: h + "rpx",
        backgroundColor: this.background
      });
    }
  },
  methods: {
    onTap() {
      this.$emit("click");
    }
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.s($options.boxStyle),
    c: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    d: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "6c"),
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mWhiteSpace = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-a2567318"]]);
const __vite_glob_0_81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mWhiteSpace
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = common_vendor.defineComponent({
  name: "mWingBlank",
  emits: ["click"],
  props: {
    size: {
      type: String,
      default: "default"
    },
    gap: {
      type: [Number, String],
      default: 0
    },
    background: {
      type: String,
      default: "transparent"
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    /** 上内边距（留白），与 gap 独立 */
    paddingTop: {
      type: [Number, String],
      default: 0
    },
    /** 下内边距（留白） */
    paddingBottom: {
      type: [Number, String],
      default: 0
    },
    marginTop: {
      type: [Number, String],
      default: 0
    },
    marginBottom: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    verticalPaddingStyle() {
      return new common_vendor.UTSJSONObject({
        paddingTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.paddingTop),
        paddingBottom: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.paddingBottom)
      });
    },
    boxStyle() {
      let g = 0;
      const gv = this.gap;
      const vpad = this.verticalPaddingStyle;
      if (typeof gv === "number" && gv > 0) {
        g = gv;
      } else if (typeof gv === "string" && gv !== "" && gv !== "0") {
        const pad = uni_modules_mUnix_components_mTools_Ut.toCssLength(gv);
        const st = new common_vendor.UTSJSONObject({
          paddingLeft: pad,
          paddingRight: pad,
          backgroundColor: this.background,
          borderRadius: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius),
          marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginTop),
          marginBottom: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginBottom)
        });
        st["paddingTop"] = vpad["paddingTop"];
        st["paddingBottom"] = vpad["paddingBottom"];
        return st;
      } else {
        const sz = this.size;
        if (sz === "small") {
          g = 10;
        } else if (sz === "large") {
          g = 30;
        } else {
          g = 20;
        }
      }
      const st2 = new common_vendor.UTSJSONObject({
        paddingLeft: g + "rpx",
        paddingRight: g + "rpx",
        backgroundColor: this.background,
        borderRadius: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.radius),
        marginTop: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginTop),
        marginBottom: uni_modules_mUnix_components_mTools_Ut.toCssLength(this.marginBottom)
      });
      st2["paddingTop"] = vpad["paddingTop"];
      st2["paddingBottom"] = vpad["paddingBottom"];
      return st2;
    }
  },
  methods: {
    onTap() {
      this.$emit("click");
    }
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: common_vendor.s($options.boxStyle),
    c: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    d: common_vendor.o((...args) => $options.onTap && $options.onTap(...args), "29"),
    e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mWingBlank = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-b435f130"]]);
const __vite_glob_0_82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mWingBlank
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = common_vendor.defineComponent({
  name: "mWxLogin",
  emits: ["success", "fail", "login"],
  props: {
    /** 左侧图标，传 m-icon 的 name（默认 user，避免 wechat 码位在字库中为空） */
    icon: {
      type: String,
      default: "user"
    },
    // 按钮文字
    text: {
      type: String,
      default: "微信一键登录"
    },
    // 按钮类型，code 获取code，userInfo 获取用户信息
    type: {
      type: String,
      default: "code"
    }
  },
  methods: {
    handleLogin() {
      this.$emit("login");
      if (this.type === "code") {
        common_vendor.index.login(new common_vendor.UTSJSONObject({
          provider: "weixin",
          success: (res) => {
            this.$emit("success", new common_vendor.UTSJSONObject({
              code: res.code
            }));
          },
          fail: (err) => {
            this.$emit("fail", err);
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        }));
      } else if (this.type === "userInfo") {
        common_vendor.index.getUserProfile(new common_vendor.UTSJSONObject({
          desc: "用于完善会员资料",
          success: (res = null) => {
            this.$emit("success", new common_vendor.UTSJSONObject({
              userInfo: res.userInfo
            }));
          },
          fail: (err = null) => {
            this.$emit("fail", err);
            common_vendor.index.showToast({
              title: "获取用户信息失败",
              icon: "none"
            });
          }
        }));
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon = () => "./components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.p({
      name: $props.icon,
      size: 36,
      color: "#ffffff",
      class: "data-v-3be90804"
    }),
    b: common_vendor.t($props.text),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args), "d9"),
    e: `${_ctx.u_s_b_h}px`,
    f: `${_ctx.u_s_a_i_b}px`,
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const mWxLogin = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3be90804"]]);
const __vite_glob_0_83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mWxLogin
}, Symbol.toStringTag, { value: "Module" }));
const $m = {
  ...uni_modules_mUnix_libs_utils.utils,
  ...uni_modules_mUnix_components_mTools_Ut.tools
};
const importFn = /* @__PURE__ */ Object.assign({ "./components/m-action-sheet/m-action-sheet.uvue": __vite_glob_0_0, "./components/m-alert/m-alert.uvue": __vite_glob_0_1, "./components/m-amount-inwords/m-amount-inwords.uvue": __vite_glob_0_2, "./components/m-banner-arc/m-banner-arc.uvue": __vite_glob_0_3, "./components/m-bottom-navigation/m-bottom-navigation.uvue": __vite_glob_0_4, "./components/m-bottom-popup/m-bottom-popup.uvue": __vite_glob_0_5, "./components/m-bubble-popup/m-bubble-popup.uvue": __vite_glob_0_6, "./components/m-button/m-button.uvue": __vite_glob_0_7, "./components/m-card/m-card.uvue": __vite_glob_0_8, "./components/m-cascade-selection/m-cascade-selection.uvue": __vite_glob_0_9, "./components/m-cell-group/m-cell-group.uvue": __vite_glob_0_10, "./components/m-cell/m-cell.uvue": __vite_glob_0_11, "./components/m-checkbox-group/m-checkbox-group.uvue": __vite_glob_0_12, "./components/m-checkbox/m-checkbox.uvue": __vite_glob_0_13, "./components/m-clipboard/m-clipboard.uvue": __vite_glob_0_14, "./components/m-code-input/m-code-input.uvue": __vite_glob_0_15, "./components/m-col/m-col.uvue": __vite_glob_0_16, "./components/m-collapse/m-collapse.uvue": __vite_glob_0_17, "./components/m-content/m-content.uvue": __vite_glob_0_18, "./components/m-countdown-verify/m-countdown-verify.uvue": __vite_glob_0_19, "./components/m-countdown/m-countdown.uvue": __vite_glob_0_20, "./components/m-datetime-picker/m-datetime-picker.uvue": __vite_glob_0_21, "./components/m-dialog/m-dialog.uvue": __vite_glob_0_22, "./components/m-div/m-div.uvue": __vite_glob_0_23, "./components/m-dropdown-list/m-dropdown-list.uvue": __vite_glob_0_24, "./components/m-empty/m-empty.uvue": __vite_glob_0_25, "./components/m-fab/m-fab.uvue": __vite_glob_0_26, "./components/m-feed-post/m-feed-post.uvue": __vite_glob_0_27, "./components/m-form/m-form.uvue": __vite_glob_0_28, "./components/m-gap/m-gap.uvue": __vite_glob_0_29, "./components/m-grid-item/m-grid-item.uvue": __vite_glob_0_30, "./components/m-grid/m-grid.uvue": __vite_glob_0_31, "./components/m-icon/m-icon.uvue": __vite_glob_0_32, "./components/m-input/m-input.uvue": __vite_glob_0_33, "./components/m-keyboard/m-keyboard.uvue": __vite_glob_0_34, "./components/m-link/m-link.uvue": __vite_glob_0_35, "./components/m-loading/m-loading.uvue": __vite_glob_0_36, "./components/m-loadmore/m-loadmore.uvue": __vite_glob_0_37, "./components/m-login/m-login.uvue": __vite_glob_0_38, "./components/m-notice-bar/m-notice-bar.uvue": __vite_glob_0_39, "./components/m-notice-vertical/m-notice-vertical.uvue": __vite_glob_0_40, "./components/m-number-box/m-number-box.uvue": __vite_glob_0_41, "./components/m-overlay/m-overlay.uvue": __vite_glob_0_42, "./components/m-pagination/m-pagination.uvue": __vite_glob_0_43, "./components/m-picker/m-picker.uvue": __vite_glob_0_44, "./components/m-picture-cropper/m-picture-cropper.uvue": __vite_glob_0_45, "./components/m-popup/m-popup.uvue": __vite_glob_0_46, "./components/m-price/m-price.uvue": __vite_glob_0_47, "./components/m-qrcode/m-qrcode.uvue": __vite_glob_0_48, "./components/m-radio-group/m-radio-group.uvue": __vite_glob_0_49, "./components/m-radio/m-radio.uvue": __vite_glob_0_50, "./components/m-rate/m-rate.uvue": __vite_glob_0_51, "./components/m-richtext/m-richtext.uvue": __vite_glob_0_52, "./components/m-rolling-news/m-rolling-news.uvue": __vite_glob_0_53, "./components/m-row/m-row.uvue": __vite_glob_0_54, "./components/m-screenshot/m-screenshot.uvue": __vite_glob_0_55, "./components/m-search/m-search.uvue": __vite_glob_0_56, "./components/m-section/m-section.uvue": __vite_glob_0_57, "./components/m-segmented-control/m-segmented-control.uvue": __vite_glob_0_58, "./components/m-skeleton/m-skeleton.uvue": __vite_glob_0_59, "./components/m-steps/m-steps.uvue": __vite_glob_0_60, "./components/m-sticky-bottom/m-sticky-bottom.uvue": __vite_glob_0_61, "./components/m-sticky/m-sticky.uvue": __vite_glob_0_62, "./components/m-swipe-action/m-swipe-action.uvue": __vite_glob_0_63, "./components/m-swiper/m-swiper.uvue": __vite_glob_0_64, "./components/m-switch/m-switch.uvue": __vite_glob_0_65, "./components/m-tabs/m-tabs.uvue": __vite_glob_0_66, "./components/m-tag/m-tag.uvue": __vite_glob_0_67, "./components/m-text/m-text.uvue": __vite_glob_0_68, "./components/m-textarea/m-textarea.uvue": __vite_glob_0_69, "./components/m-time-axis-item/m-time-axis-item.uvue": __vite_glob_0_70, "./components/m-time-axis/m-time-axis.uvue": __vite_glob_0_71, "./components/m-tips/m-tips.uvue": __vite_glob_0_72, "./components/m-toast/m-toast.uvue": __vite_glob_0_73, "./components/m-top-back/m-top-back.uvue": __vite_glob_0_74, "./components/m-tree/m-tree.uvue": __vite_glob_0_75, "./components/m-update/m-update.uvue": __vite_glob_0_76, "./components/m-upload/m-upload.uvue": __vite_glob_0_77, "./components/m-vcode/m-vcode.uvue": __vite_glob_0_78, "./components/m-waterfall/m-waterfall.uvue": __vite_glob_0_79, "./components/m-watermark/m-watermark.uvue": __vite_glob_0_80, "./components/m-white-space/m-white-space.uvue": __vite_glob_0_81, "./components/m-wing-blank/m-wing-blank.uvue": __vite_glob_0_82, "./components/m-wx-login/m-wx-login.uvue": __vite_glob_0_83 });
let components = [];
for (const key in importFn) {
  let component = importFn[key].default;
  if (component.name) {
    component.install = function(Vue) {
      Vue.component(component.name, component);
    };
    components.push(component);
  }
}
const install = (Vue) => {
  components.forEach(function(component) {
    Vue.component(component.name, component);
  });
  Vue.config.globalProperties.$m = $m;
};
const mUnix = {
  install
};
exports.Component = Component$8;
exports.Component$1 = Component$5;
exports.Component$10 = Component$1;
exports.Component$11 = Component$a;
exports.Component$12 = Component$4;
exports.Component$13 = Component$2;
exports.Component$14 = Component$3;
exports.Component$15 = Component$9;
exports.Component$2 = Component$7;
exports.Component$3 = Component$d;
exports.Component$4 = Component$e;
exports.Component$5 = Component$c;
exports.Component$6 = Component$f;
exports.Component$7 = Component$b;
exports.Component$8 = Component$6;
exports.Component$9 = Component;
exports.mUnix = mUnix;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/uni_modules/m-unix/index.js.map
