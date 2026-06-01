"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_Ut = require("../m-tools/Ut.js");
const _sfc_main = common_vendor.defineComponent({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c9c0d1ef"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-div/m-div.js.map
