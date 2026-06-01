"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-80210247"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-sticky-bottom/m-sticky-bottom.js.map
