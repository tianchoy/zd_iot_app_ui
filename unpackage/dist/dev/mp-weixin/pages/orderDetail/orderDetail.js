"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_bottom_popup_1 = common_vendor.resolveComponent("m-bottom-popup");
  (_easycom_topNavBar_1 + _easycom_m_bottom_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_bottom_popup = () => "../../uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.js";
if (!Math) {
  (_easycom_topNavBar + common_vendor.unref(Payment) + _easycom_m_bottom_popup)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const currentPrice = common_vendor.ref(50);
    const getStatusClass = (status) => {
      switch (status) {
        case "已完成":
          return "status-completed";
        case "待支付":
          return "status-pending";
        case "已退款":
          return "status-refunded";
        case "已取消":
          return "status-cancelled";
        default:
          return "";
      }
    };
    const choosePayment = () => {
      showPopup.value = true;
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const handleConfirmPayment = (e = null) => {
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:142", e);
      showPopup.value = false;
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-6ec85291"
        }),
        b: common_vendor.n(getStatusClass("待支付")),
        c: common_vendor.o(choosePayment, "ee"),
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`,
        f: common_vendor.o(handleCancelPayment, "e3"),
        g: common_vendor.o(handleConfirmPayment, "14"),
        h: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          class: "data-v-6ec85291"
        }),
        i: common_vendor.o(($event) => {
          return showPopup.value = false;
        }, "b0"),
        j: common_vendor.p({
          show: common_vendor.unref(showPopup),
          height: "50%",
          radius: true,
          class: "data-v-6ec85291"
        })
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ec85291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderDetail/orderDetail.js.map
