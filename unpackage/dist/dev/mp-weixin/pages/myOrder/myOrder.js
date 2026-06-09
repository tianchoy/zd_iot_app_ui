"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  (_easycom_topNavBar_1 + _easycom_rice_icon_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_icon + _easycom_rice_button + _easycom_rice_tabs)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrder",
  setup(__props) {
    const tabs = common_vendor.ref([{ name: "全部" }, { name: "待支付" }, { name: "已完成" }, { name: "已退款" }, { name: "已取消" }]);
    const current = common_vendor.ref(0);
    const card_number = common_vendor.ref("");
    const orders = common_vendor.ref([
      new common_vendor.UTSJSONObject({
        packageName: "车联网月包20G",
        status: "已完成",
        orderNo: "O202604280001",
        cardNo: "1064916585160",
        iccid: "89860421123456789012",
        time: "2026-04-28 10:12:30",
        amount: 90
      }),
      new common_vendor.UTSJSONObject({
        packageName: "车联网月包10G",
        status: "待支付",
        orderNo: "O202604280002",
        cardNo: "1064916585160",
        iccid: "89860421123456789012",
        time: "2026-04-28 11:20:12",
        amount: 50
      }),
      new common_vendor.UTSJSONObject({
        packageName: "测试套餐1G",
        status: "已退款",
        orderNo: "O202603010001",
        cardNo: "1064916585160",
        iccid: "89860421123456789012",
        time: "2026-03-01 08:10:00",
        amount: 10
      }),
      new common_vendor.UTSJSONObject({
        packageName: "500MB加油包",
        status: "已完成",
        orderNo: "PO202605120001",
        cardNo: "14700002233",
        iccid: "8986032044208356010",
        time: "2026-05-12 11:02:00",
        amount: 19
      }),
      new common_vendor.UTSJSONObject({
        packageName: "1GB加油包",
        status: "已取消",
        orderNo: "PO202605120002",
        cardNo: "14700002233",
        iccid: "8986032044208356010",
        time: "2026-05-12 12:18:00",
        amount: 29
      })
    ]);
    const getOrderText = (order = null, key) => {
      const value = order[key];
      return value == null ? "" : "" + value;
    };
    const filteredOrders = common_vendor.computed(() => {
      let result = orders.value;
      const currentStatus = tabs.value[current.value].name;
      if (currentStatus !== "全部") {
        result = result.filter((order = null) => {
          return getOrderText(order, "status") === currentStatus;
        });
      }
      if (card_number.value.trim().length > 0) {
        const keyword = card_number.value.trim();
        result = result.filter((order = null) => {
          return getOrderText(order, "iccid").includes(keyword) || getOrderText(order, "cardNo").includes(keyword);
        });
      }
      return result;
    });
    const handleTabClick = (e) => {
      const index = e.index;
      current.value = index;
    };
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at pages/myOrder/myOrder.uvue:184", "搜索关键词:", card_number.value);
    };
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
    const handleBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const handlePay = (order = null) => {
      const orderNo = getOrderText(order, "orderNo");
      common_vendor.index.__f__("log", "at pages/myOrder/myOrder.uvue:213", "去支付:", orderNo);
      common_vendor.index.showToast({
        title: `支付订单 ${orderNo}`,
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(handleBack, "6a"),
        b: common_vendor.p({
          title: "我的订单",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-87fe8731"
        }),
        c: card_number.value,
        d: common_vendor.o(($event) => {
          return card_number.value = $event.detail.value;
        }, "4d"),
        e: common_vendor.p({
          name: "scan",
          size: "40rpx",
          class: "data-v-87fe8731"
        }),
        f: common_vendor.o(_ctx.scanCode, "ca"),
        g: common_vendor.p({
          height: "100%",
          class: "scan-btn data-v-87fe8731"
        }),
        h: common_vendor.o(handleSearch, "e8"),
        i: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          height: "100%",
          class: "data-v-87fe8731"
        }),
        j: common_vendor.o(handleTabClick, "29"),
        k: common_vendor.o(($event) => {
          return current.value = $event;
        }, "41"),
        l: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: tabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: current.value,
          class: "data-v-87fe8731"
        }),
        m: filteredOrders.value.length === 0
      }, filteredOrders.value.length === 0 ? {} : {
        n: common_vendor.f(filteredOrders.value, (order, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getOrderText(order, "packageName")),
            b: common_vendor.t(getOrderText(order, "status")),
            c: common_vendor.n(getStatusClass(getOrderText(order, "status"))),
            d: common_vendor.t(getOrderText(order, "orderNo")),
            e: common_vendor.t(getOrderText(order, "cardNo")),
            f: common_vendor.t(getOrderText(order, "iccid")),
            g: common_vendor.t(getOrderText(order, "time")),
            h: common_vendor.t(getOrderText(order, "amount")),
            i: getOrderText(order, "status") === "待支付"
          }, getOrderText(order, "status") === "待支付" ? {
            j: common_vendor.o(($event) => {
              return handlePay(order);
            }, index)
          } : {}, {
            k: index
          });
        })
      }, {
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        p: `${_ctx.u_s_b_h}px`,
        q: `${_ctx.u_s_a_i_b}px`,
        r: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87fe8731"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myOrder/myOrder.js.map
