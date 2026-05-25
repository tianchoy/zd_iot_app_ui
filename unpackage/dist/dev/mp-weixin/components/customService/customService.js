"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_m_fab_1 = common_vendor.resolveComponent("m-fab");
  _easycom_m_fab_1();
}
const _easycom_m_fab = () => "../../uni_modules/m-unix/components/m-fab/m-fab.js";
if (!Math) {
  _easycom_m_fab();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "customService",
  setup(__props) {
    const connect_service = () => {
      common_vendor.index.__f__("log", "at components/customService/customService.uvue:7", "联系客服");
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.gei(_ctx, ""),
        b: common_vendor.o(connect_service, "2d"),
        c: common_vendor.p({
          type: "primary",
          size: "40rpx",
          icon: "customer-service",
          draggable: true,
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
