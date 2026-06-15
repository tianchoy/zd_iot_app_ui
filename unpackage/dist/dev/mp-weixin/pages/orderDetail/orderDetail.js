"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + common_vendor.unref(Payment) + _easycom_rice_popup)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const currentPrice = common_vendor.ref(50);
    const orderId = common_vendor.ref("");
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
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:138", e);
      showPopup.value = false;
    };
    const handleBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryOrderDetailXcx(orderId.value);
          if (res.code == 200) {
            common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:156", res.data);
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:159", "查询订单详情失败:", error);
        }
      });
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:164", options);
      orderId.value = options.orderNo;
      getOrderDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(handleBack, "d9"),
        b: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-6ec85291"
        }),
        c: common_vendor.n(getStatusClass("待支付")),
        d: common_vendor.o(choosePayment, "20"),
        e: `${_ctx.u_s_b_h}px`,
        f: `${_ctx.u_s_a_i_b}px`,
        g: common_vendor.o(handleCancelPayment, "05"),
        h: common_vendor.o(handleConfirmPayment, "c5"),
        i: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          class: "data-v-6ec85291"
        }),
        j: common_vendor.o(_ctx.onPopupClose, "f6"),
        k: common_vendor.o(($event) => {
          return common_vendor.isRef(showPopup) ? showPopup.value = $event : null;
        }, "9c"),
        l: common_vendor.p({
          position: "bottom",
          show: common_vendor.unref(showPopup),
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
