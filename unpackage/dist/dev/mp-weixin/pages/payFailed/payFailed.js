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
  __name: "payFailed",
  setup(__props) {
    const handleRetryPay = () => {
      common_vendor.index.__f__("log", "at pages/payFailed/payFailed.uvue:80", "重新支付");
    };
    const handleBackCard = () => {
      common_vendor.index.__f__("log", "at pages/payFailed/payFailed.uvue:94", "返回卡片详情");
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "支付结果",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-95bda543"
        }),
        b: common_vendor.o(handleRetryPay, "d2"),
        c: common_vendor.o(handleBackCard, "ce"),
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-95bda543"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/payFailed/payFailed.js.map
