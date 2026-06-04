"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../m-tools/utype/type.js");
const uni_modules_mUnix_components_mTools_Ut = require("../m-tools/Ut.js");
const _sfc_main = common_vendor.defineComponent({
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
      const bs = this.btnSize;
      if (bs.length > 0) {
        if (bs === "medium") {
          width = "368rpx";
        } else if (bs === "small") {
          width = "240rpx";
        } else if (bs === "mini") {
          width = "116rpx";
        } else if (bs === "tiny") {
          width = "112rpx";
        }
      }
      return width;
    },
    getHeight() {
      let height = this.height;
      if (height.length === 0) {
        height = "96rpx";
      }
      const bs = this.btnSize;
      if (bs.length > 0) {
        if (bs === "medium") {
          height = "80rpx";
        } else if (bs === "small") {
          height = "80rpx";
        } else if (bs === "mini") {
          height = "64rpx";
        } else if (bs === "tiny") {
          height = "48rpx";
        }
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
      let text = hex;
      if (text.length === 4) {
        const r_1 = text.substring(1, 2);
        const g_1 = text.substring(2, 3);
        const b_1 = text.substring(3, 4);
        text = "#" + r_1 + r_1 + g_1 + g_1 + b_1 + b_1;
      }
      if (text.length !== 7)
        return "";
      const r = parseInt(text.substring(1, 3), 16);
      const g = parseInt(text.substring(3, 5), 16);
      const b = parseInt(text.substring(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    },
    getBaseColor(type) {
      switch (type) {
        case "white":
          return "#dbe5f0";
        case "danger":
          return "#EB0909";
        case "warning":
          return "#ff7900";
        case "green":
          return "#07c160";
        case "blue":
          return "#007aff";
        case "gray":
          return "#bfbfbf";
        case "black":
          return "#334155";
        case "brown":
          return "#ac9157";
        case "gray-primary":
        case "gray-danger":
        case "gray-warning":
        case "gray-green":
          return "#f2f2f2";
        default:
          return "#5677fc";
      }
    },
    getColorByType(type, isText = false, plain = false) {
      if (isText === true) {
        if (type.indexOf("gray-") === 0) {
          return this.getBaseColor(type.replace("gray-", ""));
        }
        if (type === "white") {
          return "#334155";
        }
        return plain === true ? this.getBaseColor(type) : "#fff";
      }
      return this.getBaseColor(type);
    },
    getShadow(type, plain) {
      if (plain)
        return "none";
      const rgb = this.hexToRGB(this.getColorByType(type));
      if (rgb.length === 0)
        return "none";
      return `0 10rpx 14rpx 0 rgba(${rgb}, 0.2)`;
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
        index: parseInt("" + this.index)
      }));
    },
    bindgetuserinfo(e) {
      this.$emit("getuserinfo", e["detail"]);
    },
    bindcontact(e) {
      this.$emit("contact", e["detail"]);
    },
    bindgetphonenumber(e) {
      this.$emit("getphonenumber", e["detail"]);
    },
    binderror(e) {
      this.$emit("error", e["detail"]);
    },
    bindchooseavatar(e) {
      this.$emit("chooseavatar", e["detail"]);
    },
    bindlaunchapp(e) {
      this.$emit("launchapp", e["detail"]);
    },
    getDisabledClass(disabled, type, plain) {
      let className = "";
      if (disabled && type != "white" && type.indexOf("-") == -1) {
        let classVal = this.disabledGray ? "m-gray-disabled" : "m-dark-disabled";
        className = plain ? "m-dark-disabled-outline" : classVal;
      }
      return className;
    },
    getShapeClass(shape, plain) {
      let className = "";
      if (shape == "circle") {
        className = plain ? "m-outline-fillet" : "m-fillet";
      } else if (shape == "rightAngle") {
        className = plain ? "m-outline-rightAngle" : "m-rightAngle";
      }
      return className;
    },
    getHoverClass(disabled, type, plain) {
      let className = "";
      if (!disabled) {
        className = plain ? "m-outline-hover" : "m-" + (type || "primary") + "-hover";
      }
      return className;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
    k: $options.getBgColor($props.type, $props.plain),
    l: $options.getColor($props.type, $props.plain),
    m: $props.shadow ? $options.getShadow($props.type, $props.plain) : "none",
    n: $props.loading,
    o: $props.formType,
    p: $props.openType,
    q: $props.appParameter,
    r: common_vendor.o((...args) => $options.bindgetuserinfo && $options.bindgetuserinfo(...args), "3c"),
    s: common_vendor.o((...args) => $options.bindgetphonenumber && $options.bindgetphonenumber(...args), "a8"),
    t: common_vendor.o((...args) => $options.bindcontact && $options.bindcontact(...args), "44"),
    v: common_vendor.o((...args) => $options.binderror && $options.binderror(...args), "b6"),
    w: common_vendor.o((...args) => $options.bindchooseavatar && $options.bindchooseavatar(...args), "99"),
    x: common_vendor.o((...args) => $options.bindlaunchapp && $options.bindlaunchapp(...args), "e1"),
    y: $props.disabled,
    z: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "fb"),
    A: !$props.link && $props.plain
  }, !$props.link && $props.plain ? {
    B: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    C: common_vendor.n($options.getDisabledClass($props.disabled, $props.type, $props.plain)),
    D: $options.getBgColor($props.type, $props.plain)
  } : {}, {
    E: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    F: common_vendor.n(($props.width === "100%" || !$props.width || $props.width === true) && (!$props.btnSize || $props.btnSize === true) ? "m-btn__flex-1" : ""),
    G: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    H: common_vendor.n(!$props.disabled ? "m-button__hover" : ""),
    I: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    J: common_vendor.s({
      width: $options.getWidth,
      height: $options.getHeight,
      margin: $props.margin
    }),
    K: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bb5b2fb2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-button/m-button.js.map
