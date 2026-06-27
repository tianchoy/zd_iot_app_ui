"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  (_easycom_topNavBar_1 + _easycom_rice_tabs_1 + _easycom_rice_tag_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tabs + _easycom_rice_tag)();
}
class OrderStatusTab extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: "Unknown", optional: false },
          value: { type: String, optional: false }
        };
      },
      name: "OrderStatusTab"
    };
  }
  constructor(options, metadata = OrderStatusTab.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.value = this.__props__.value;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderRecord",
  setup(__props) {
    const rechargeNo = common_vendor.ref("");
    const tabs = common_vendor.ref([
      new OrderStatusTab({ name: "全部", value: "" }),
      new OrderStatusTab({ name: "待支付", value: "0" }),
      new OrderStatusTab({ name: "已完成", value: "1" }),
      new OrderStatusTab({ name: "已退款", value: "5" }),
      new OrderStatusTab({ name: "已取消", value: "2" })
    ]);
    const current = common_vendor.ref(0);
    common_vendor.ref("");
    const orderList = common_vendor.ref([]);
    const getStatusText = (status) => {
      switch (status) {
        case "0":
          return "待支付";
        case "1":
          return "已完成";
        case "2":
          return "已取消";
        case "3":
          return "支付失败";
        case "4":
          return "部分退款";
        case "5":
          return "全部退款";
        default:
          return "未知状态";
      }
    };
    const handleTabClick = (e) => {
      common_vendor.index.__f__("log", "at pages/orderRecord/orderRecord.uvue:115", e);
      const index = e.index;
      current.value = index;
      getOrderList(e.value);
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "0":
          return "success";
        case "1":
          return "primary";
        case "2":
          return "warning";
        case "3":
          return "error";
        case "4":
          return "error";
        case "5":
          return "error";
        default:
          return "";
      }
    };
    const handleOrderClick = (order) => {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${order.id}`
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const handlePay = (order) => {
      common_vendor.index.__f__("log", "at pages/orderRecord/orderRecord.uvue:157", "去支付:", order);
      if (common_config.isWechat()) {
        common_vendor.index.showToast({
          title: `支付订单 ${order.id}`,
          icon: "none"
        });
        common_vendor.index.navigateTo({
          url: `/pages/orderDetail/orderDetail?orderNo=${order.id}`
        });
      }
    };
    const getOrderList = (status) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const params = new common_vendor.UTSJSONObject({
            rechargeNo: rechargeNo.value
          });
          if (status !== "") {
            params.status = status;
          }
          const resp = yield api_http.queryOrderList(params);
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
          common_vendor.index.__f__("error", "at pages/orderRecord/orderRecord.uvue:200", "获取订单列表失败:", error);
          orderList.value = [];
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad((options) => {
      rechargeNo.value = options.rechargeNo;
      getOrderList("");
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
          class: "data-v-a151b594"
        }),
        c: common_vendor.o(handleTabClick, "f1"),
        d: common_vendor.o(($event) => {
          return current.value = $event;
        }, "fd"),
        e: common_vendor.p({
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
          class: "data-v-a151b594"
        }),
        f: orderList.value.length === 0
      }, orderList.value.length === 0 ? {} : {
        g: common_vendor.f(orderList.value, (order, index, i0) => {
          return common_vendor.e({
            a: order.pkgName
          }, order.pkgName ? {
            b: common_vendor.t(order.pkgName || "套餐名称")
          } : {}, {
            c: order.status
          }, order.status ? {
            d: "a151b594-2-" + i0,
            e: common_vendor.p({
              text: getStatusText(order.status),
              round: true,
              ["plain-fill"]: true,
              size: "small",
              type: getStatusClass(order.status),
              class: "data-v-a151b594"
            })
          } : {}, {
            f: order.orderNo
          }, order.orderNo ? {
            g: common_vendor.t(order.orderNo || "-")
          } : {}, {
            h: order.cardNo
          }, order.cardNo ? {
            i: common_vendor.t(order.cardNo || "-")
          } : {}, {
            j: order.iccid
          }, order.iccid ? {
            k: common_vendor.t(order.iccid || "-")
          } : {}, {
            l: order.createTime
          }, order.createTime ? {
            m: common_vendor.t(order.createTime || "-")
          } : {}, {
            n: common_vendor.t(order.payCurrencyAmount || "0.00"),
            o: order.status === "0"
          }, order.status === "0" ? {
            p: common_vendor.o(($event) => {
              return handlePay(order);
            }, index)
          } : {}, {
            q: index,
            r: common_vendor.o(($event) => {
              return handleOrderClick(order);
            }, index)
          });
        })
      }, {
        h: `${_ctx.u_s_b_h}px`,
        i: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a151b594"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderRecord/orderRecord.js.map
