"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  _easycom_topNavBar_1();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
if (!Math) {
  _easycom_topNavBar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paySuccess",
  setup(__props) {
    const orderId = common_vendor.ref("");
    const handleViewOrder = () => {
      common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:74", "查看订单MP-WEIXIN");
    };
    const handleBackCard = () => {
      common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:88", "返回卡片详情MP-WEIXIN");
    };
    common_vendor.onLoad((options) => {
      var _a;
      common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:96", "orderId:", options.orderId);
      orderId.value = (_a = options.orderId) !== null && _a !== void 0 ? _a : "";
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "支付结果",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-4b5f1e90"
        }),
        b: common_vendor.o(handleViewOrder, "ef"),
        c: common_vendor.o(handleBackCard, "ff"),
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b5f1e90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/paySuccess/paySuccess.js.map
