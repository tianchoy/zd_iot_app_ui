"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello");
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        c: `${_ctx.u_s_b_h}px`,
        d: `${_ctx.u_s_a_i_b}px`,
        e: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
