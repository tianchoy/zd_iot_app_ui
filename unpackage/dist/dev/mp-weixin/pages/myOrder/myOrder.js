"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  (_easycom_topNavBar_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_button + _easycom_rice_tabs)();
}
class OrderStatusTab extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: "Unknown", optional: false }
        };
      },
      name: "OrderStatusTab"
    };
  }
  constructor(options, metadata = OrderStatusTab.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrder",
  setup(__props) {
    const tabs = common_vendor.ref([
      new OrderStatusTab({ name: "全部" }),
      new OrderStatusTab({ name: "待支付" }),
      new OrderStatusTab({ name: "已完成" }),
      new OrderStatusTab({ name: "已退款" }),
      new OrderStatusTab({ name: "已取消" })
    ]);
    const current = common_vendor.ref(0);
    const card_number = common_vendor.ref("");
    const orderList = common_vendor.ref([]);
    const getStatusText = (status) => {
      switch (status) {
        case "0":
          return "待支付";
        case "1":
          return "已完成";
        case "2":
          return "已退款";
        case "3":
          return "已取消";
        default:
          return "未知状态";
      }
    };
    const filteredOrders = common_vendor.computed(() => {
      let result = orderList.value;
      const currentStatus = tabs.value[current.value].name;
      if (currentStatus !== "全部") {
        result = result.filter((order) => {
          return getStatusText(order.status) === currentStatus;
        });
      }
      if (card_number.value.trim().length > 0) {
        const keyword = card_number.value.trim();
        result = result.filter((order) => {
          return order.iccid && order.iccid.includes(keyword) || order.cardNo && order.cardNo.includes(keyword);
        });
      }
      return result;
    });
    const handleTabClick = (e) => {
      const index = e.index;
      current.value = index;
      const statusCode = getStatusCodeByTabIndex(index);
      getOrderList(statusCode);
    };
    const getStatusCodeByTabIndex = (index) => {
      switch (index) {
        case 0:
          return "";
        case 1:
          return "0";
        case 2:
          return "1";
        case 3:
          return "2";
        case 4:
          return "3";
        default:
          return "";
      }
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
    const handleOrderClick = (order) => {
      common_vendor.index.__f__("log", "at pages/myOrder/myOrder.uvue:182", order);
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${order.id}`
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const scanCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleQuery = () => {
      const keyword = card_number.value.trim();
      if (!keyword) {
        common_vendor.index.showToast({
          title: "请输入卡号",
          icon: "none"
        });
        return null;
      }
    };
    const onScanResult = (data) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
        common_vendor.index.__f__("log", "at pages/myOrder/myOrder.uvue:215", result);
        if (result.length > 0) {
          card_number.value = result;
          common_vendor.index.showToast({
            title: "扫码成功",
            icon: "success"
          });
          yield handleQuery();
        }
      });
    };
    const handlePay = (order) => {
      common_vendor.index.__f__("log", "at pages/myOrder/myOrder.uvue:229", "去支付:", order);
      common_vendor.index.showToast({
        title: `支付订单 ${order.id}`,
        icon: "none"
      });
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${order.id}`
      });
    };
    const getOrderList = (status) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const params = new common_vendor.UTSJSONObject({});
          if (status !== "") {
            params.status = status;
          }
          const resp = yield api_http.queryOrderListXcx(params);
          if (resp.code == 200) {
            if (resp.rows && Array.isArray(resp.rows)) {
              orderList.value = resp.rows;
            } else if (resp.data && Array.isArray(resp.data)) {
              orderList.value = resp.data;
            } else {
              orderList.value = [];
            }
          } else {
            orderList.value = [];
            common_vendor.index.showToast({
              title: resp.msg || "获取订单列表失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/myOrder/myOrder.uvue:280", "获取订单列表失败:", error);
          orderList.value = [];
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad(() => {
      getOrderList("");
    });
    common_vendor.onMounted(() => {
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(handleBack, "56"),
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
        }, "fc"),
        e: common_vendor.o(scanCode, "f4"),
        f: common_vendor.p({
          height: "100%",
          icon: "scan",
          class: "scan-btn data-v-87fe8731"
        }),
        g: common_vendor.o(handleQuery, "a9"),
        h: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          height: "100%",
          class: "data-v-87fe8731"
        }),
        i: common_vendor.o(handleTabClick, "c9"),
        j: common_vendor.o(($event) => {
          return current.value = $event;
        }, "6a"),
        k: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: tabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: current.value,
          class: "data-v-87fe8731"
        }),
        l: filteredOrders.value.length === 0
      }, filteredOrders.value.length === 0 ? {} : {
        m: common_vendor.f(filteredOrders.value, (order, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(order.pkgName || "套餐名称"),
            b: common_vendor.t(getStatusText(order.status)),
            c: common_vendor.n(getStatusClass(getStatusText(order.status))),
            d: common_vendor.t(order.orderNo || "-"),
            e: common_vendor.t(order.cardNo || "-"),
            f: common_vendor.t(order.iccid || "-"),
            g: common_vendor.t(order.createTime || "-"),
            h: common_vendor.t(order.payCurrencyAmount || "0.00"),
            i: order.status === "0"
          }, order.status === "0" ? {
            j: common_vendor.o(($event) => {
              return handlePay(order);
            }, index)
          } : {}, {
            k: index,
            l: common_vendor.o(($event) => {
              return handleOrderClick(order);
            }, index)
          });
        })
      }, {
        n: `${_ctx.u_s_b_h}px`,
        o: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87fe8731"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myOrder/myOrder.js.map
