"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../common/config.js");
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
    const payChannelId = common_vendor.ref("");
    const orderDetail = common_vendor.ref(new common_vendor.UTSJSONObject({}));
    const handleViewOrder = () => {
      common_vendor.index.redirectTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${orderId.value}&from=paySuccess`
      });
    };
    const handleBackCard = () => {
      common_vendor.index.reLaunch({
        url: `/pages/cardDetail/cardDetail?cardNumber=${orderDetail.value.rechargeNo}`
      });
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryOrderSuccess(orderId.value, payChannelId.value);
        if (res.code == 200) {
          common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:98", "订单详情:", res);
          orderDetail.value = res.data;
        }
      });
    };
    common_vendor.onLoad((options) => {
      var _a, _b;
      common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:104", "orderId:", options);
      orderId.value = (_a = options.orderId) !== null && _a !== void 0 ? _a : "";
      payChannelId.value = (_b = options.payChannelId) !== null && _b !== void 0 ? _b : "";
      getOrderDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "支付结果",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-4b5f1e90"
        }),
        b: common_vendor.unref(orderDetail).rechargeNo
      }, common_vendor.unref(orderDetail).rechargeNo ? {
        c: common_vendor.t(common_vendor.unref(orderDetail).rechargeNo)
      } : {}, {
        d: common_vendor.unref(orderDetail).iccid
      }, common_vendor.unref(orderDetail).iccid ? {
        e: common_vendor.t(common_vendor.unref(orderDetail).iccid)
      } : {}, {
        f: common_vendor.unref(orderDetail).orderNo
      }, common_vendor.unref(orderDetail).orderNo ? {
        g: common_vendor.t(common_vendor.unref(orderDetail).orderNo)
      } : {}, {
        h: common_vendor.unref(orderDetail).pkgName
      }, common_vendor.unref(orderDetail).pkgName ? {
        i: common_vendor.t(common_vendor.unref(orderDetail).pkgName)
      } : {}, {
        j: common_vendor.unref(orderDetail).pkgType
      }, common_vendor.unref(orderDetail).pkgType ? {
        k: common_vendor.t(common_vendor.unref(orderDetail).pkgType)
      } : {}, {
        l: common_vendor.unref(orderDetail).payAmount
      }, common_vendor.unref(orderDetail).payAmount ? {
        m: common_vendor.t(common_vendor.unref(orderDetail).payAmount)
      } : {}, {
        n: common_vendor.unref(orderDetail).payTime
      }, common_vendor.unref(orderDetail).payTime ? {
        o: common_vendor.t(common_vendor.unref(orderDetail).payTime)
      } : {}, {
        p: common_vendor.o(handleViewOrder, "7a"),
        q: common_vendor.o(handleBackCard, "a7"),
        r: `${_ctx.u_s_b_h}px`,
        s: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b5f1e90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/paySuccess/paySuccess.js.map
