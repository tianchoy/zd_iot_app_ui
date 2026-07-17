"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
if (!Array) {
  const _easycom_rice_float_fab_1 = common_vendor.resolveComponent("rice-float-fab");
  _easycom_rice_float_fab_1();
}
const _easycom_rice_float_fab = () => "../uni_modules/rice-ui/components/rice-float-fab/rice-float-fab.js";
if (!Math) {
  _easycom_rice_float_fab();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tousu",
  emits: ["connect_tousu"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const emit = __emit;
    const handleClick = (e = null) => {
      emit("connect_tousu");
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.gei(_ctx, ""),
        c: common_vendor.o(handleClick, "f2"),
        d: `${_ctx.u_s_b_h}px`,
        e: common_vendor.p({
          ["default-position"]: "bottom-right",
          customStyle: {
            backgroundColor: "#fff",
            padding: "0",
            width: "60rpx",
            height: "60rpx"
          },
          ["icon-size"]: "80rpx",
          ["gap-bottom"]: "700rpx",
          ["gap-right"]: "20rpx",
          id: common_vendor.gei(_ctx, ""),
          class: "data-v-97c7e0f7",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-97c7e0f7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/tousu.js.map
