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
    function d(key) {
      const val = orderDetail.value[key];
      return val;
    }
    function ds(key) {
      const val = orderDetail.value[key];
      return val != null ? val : "";
    }
    const handleViewOrder = () => {
      common_vendor.index.redirectTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${orderId.value}&from=paySuccess`
      });
    };
    const handleBackCard = () => {
      const detail = orderDetail.value;
      common_vendor.index.reLaunch({
        url: `/pages/cardDetail/cardDetail?cardNumber=${detail["rechargeNo"]}`
      });
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryOrderSuccess(orderId.value, payChannelId.value);
        if (res.code == 200) {
          common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:109", "订单详情:", res);
          orderDetail.value = res.data;
        }
      });
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/paySuccess/paySuccess.uvue:115", "orderId:", options);
      const oid = options["orderId"];
      orderId.value = oid != null ? oid : "";
      const pid = options["payChannelId"];
      payChannelId.value = pid != null ? pid : "";
      getOrderDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: `${_ctx.u_s_b_h}px`,
        b: common_vendor.p({
          title: "支付结果",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-4b5f1e90",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        c: d("rechargeNo")
      }, d("rechargeNo") ? {
        d: common_vendor.t(d("rechargeNo"))
      } : {}, {
        e: d("iccid")
      }, d("iccid") ? {
        f: common_vendor.t(d("iccid"))
      } : {}, {
        g: d("orderNo")
      }, d("orderNo") ? {
        h: common_vendor.t(d("orderNo"))
      } : {}, {
        i: d("pkgName")
      }, d("pkgName") ? {
        j: common_vendor.t(d("pkgName"))
      } : {}, {
        k: d("pkgType")
      }, d("pkgType") ? {
        l: common_vendor.t(d("pkgType"))
      } : {}, {
        m: ds("payType") != ""
      }, ds("payType") != "" ? {
        n: common_vendor.t(d("payType"))
      } : {}, {
        o: d("payAmount")
      }, d("payAmount") ? {
        p: common_vendor.t(d("payAmount"))
      } : {}, {
        q: d("payTime")
      }, d("payTime") ? {
        r: common_vendor.t(d("payTime"))
      } : {}, {
        s: common_vendor.o(handleViewOrder, "6d"),
        t: common_vendor.o(handleBackCard, "fc"),
        v: `${_ctx.u_s_b_h}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b5f1e90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/paySuccess/paySuccess.js.map
