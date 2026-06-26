"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_rice_float_fab_1 = common_vendor.resolveComponent("rice-float-fab");
  _easycom_rice_float_fab_1();
}
const _easycom_rice_float_fab = () => "../../uni_modules/rice-ui/components/rice-float-fab/rice-float-fab.js";
if (!Math) {
  _easycom_rice_float_fab();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "customService",
  emits: ["connect_service"],
  setup(__props, _a) {
    _a.emit;
    const handleClick = (e = null) => {
      common_vendor.index.showToast({
        title: "连接客服",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.gei(_ctx, ""),
        b: common_vendor.o(handleClick, "22"),
        c: common_vendor.p({
          ["default-position"]: "bottom-right",
          icon: "chat-fill",
          width: "80rpx",
          height: "80rpx",
          ["icon-size"]: "50rpx",
          ["gap-bottom"]: "200rpx",
          ["gap-right"]: "20rpx",
          id: common_vendor.gei(_ctx, "")
        }),
        d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/customService/customService.js.map
