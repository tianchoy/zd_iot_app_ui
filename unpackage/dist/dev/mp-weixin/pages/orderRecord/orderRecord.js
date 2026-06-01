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
  __name: "orderRecord",
  setup(__props) {
    const orderList = common_vendor.ref([
      new common_vendor.UTSJSONObject({
        packageName: "车联网月包20G",
        amount: 90,
        orderNo: "0202604280001",
        status: "已完成",
        time: "2026-04-28 10:12:30"
      }),
      new common_vendor.UTSJSONObject({
        packageName: "车联网月包10G",
        amount: 50,
        orderNo: "0202604280002",
        status: "待支付",
        time: "2026-04-28 11:20:12"
      }),
      new common_vendor.UTSJSONObject({
        packageName: "测试套餐1G",
        amount: 10,
        orderNo: "0202603010001",
        status: "已退款",
        time: "2026-03-01 08:10:00"
      })
    ]);
    const getOrderText = (order = null, key) => {
      const value = order[key];
      return value == null ? "" : "" + value;
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "已完成":
          return "status-completed";
        case "待支付":
          return "status-pending";
        case "已退款":
          return "status-refunded";
        default:
          return "";
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(goBack, "f5"),
        b: common_vendor.p({
          title: "订单记录",
          ["show-back"]: true,
          textColor: "#333",
          showCapsule: false,
          class: "data-v-a151b594"
        }),
        c: common_vendor.f(orderList.value, (order, index, i0) => {
          return {
            a: common_vendor.t(getOrderText(order, "packageName")),
            b: common_vendor.t(getOrderText(order, "amount")),
            c: common_vendor.t(getOrderText(order, "orderNo")),
            d: common_vendor.t(getOrderText(order, "status")),
            e: common_vendor.n(getStatusClass(getOrderText(order, "status"))),
            f: common_vendor.t(getOrderText(order, "time")),
            g: index
          };
        }),
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a151b594"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderRecord/orderRecord.js.map
