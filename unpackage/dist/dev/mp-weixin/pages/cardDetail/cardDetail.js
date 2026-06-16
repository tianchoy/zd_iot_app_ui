"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_divider_1 = common_vendor.resolveComponent("rice-divider");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  (_easycom_topNavBar_1 + _easycom_rice_tabs_1 + _easycom_rice_tag_1 + _easycom_rice_divider_1 + _easycom_rice_button_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tabs + _easycom_rice_tag + _easycom_rice_divider + _easycom_rice_button)();
}
class CardDetailTabItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false }
        };
      },
      name: "CardDetailTabItem"
    };
  }
  constructor(options, metadata = CardDetailTabItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
class CardDetailTabEvent extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          index: { type: Number, optional: false },
          item: { type: CardDetailTabItem, optional: false },
          name: { type: String, optional: false }
        };
      },
      name: "CardDetailTabEvent"
    };
  }
  constructor(options, metadata = CardDetailTabEvent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.index = this.__props__.index;
    this.item = this.__props__.item;
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cardDetail",
  setup(__props) {
    const card_number = common_vendor.ref("");
    const active = common_vendor.ref(0);
    const activeName = common_vendor.ref("基本信息");
    const statusBarHeight = common_vendor.ref(20);
    const navBarHeight = common_vendor.ref(44);
    const cardDetail = common_vendor.ref(new api_types.CardDetail({
      code: null,
      msg: null,
      data: null
    }));
    const orderList = common_vendor.ref([]);
    const pkgInfoList = common_vendor.ref([]);
    const fixedTabsStyle = common_vendor.computed(() => {
      const css = /* @__PURE__ */ new Map();
      css.set("top", statusBarHeight.value + navBarHeight.value + "px");
      return css;
    });
    const tabs = common_vendor.ref([
      new common_vendor.UTSJSONObject({ name: "基本信息" }),
      new common_vendor.UTSJSONObject({ name: "卡片套餐" }),
      new common_vendor.UTSJSONObject({ name: "卡片订单" })
    ]);
    const pkgTabs = common_vendor.ref([new common_vendor.UTSJSONObject({ name: "全部" }), new common_vendor.UTSJSONObject({ name: "在用套餐" }), new common_vendor.UTSJSONObject({ name: "待生效" }), new common_vendor.UTSJSONObject({ name: "已失效" })]);
    const current = common_vendor.ref(0);
    const filteredPackageList = common_vendor.computed(() => {
      if (current.value == 0)
        return pkgInfoList.value;
      if (current.value == 1)
        return pkgInfoList.value.filter((item) => {
          return item.status === "active";
        });
      if (current.value == 2)
        return pkgInfoList.value.filter((item) => {
          return item.status === "pending";
        });
      if (current.value == 3)
        return pkgInfoList.value.filter((item) => {
          return item.status === "expired";
        });
      return pkgInfoList.value;
    });
    const getPackageStatusText = (status) => {
      const statusMap = {
        "active": "在用",
        "pending": "待生效",
        "expired": "已失效",
        "using": "在用",
        "waiting": "待生效",
        "invalid": "已失效"
      };
      return statusMap[status] || status || "未知";
    };
    const getPackageStatusType = (status) => {
      const typeMap = {
        "active": "success",
        "using": "success",
        "pending": "primary",
        "waiting": "primary",
        "expired": "error",
        "invalid": "error"
      };
      return typeMap[status] || "primary";
    };
    const getOrderStatusText = (status) => {
      const statusMap = {
        "0": "已支付",
        "1": "待支付",
        "2": "已退款",
        "3": "已取消"
      };
      return statusMap[status] || status || "未知";
    };
    const getOrderStatusType = (status) => {
      const typeMap = {
        "0": "success",
        "1": "warning",
        "2": "error",
        "3": "error"
      };
      return typeMap[status] || "primary";
    };
    const handleClick = (e) => {
      if (e.index != null) {
        current.value = e.index;
        getPkgInfoList(e.index.toString());
      }
    };
    const changeTab = (e) => {
      var _a;
      active.value = e.index;
      activeName.value = e.name;
      const tabActions = {
        0: () => {
          return getCardDetail();
        },
        1: () => {
          return getPkgInfoList("0");
        },
        2: () => {
          return getOrderList();
        }
      };
      (_a = tabActions[e.index]) === null || _a === void 0 ? null : _a.call(tabActions);
      current.value = 0;
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const getNavBarInfo = () => {
      try {
        const systemInfo = common_vendor.index.getSystemInfoSync();
        statusBarHeight.value = systemInfo.statusBarHeight || 20;
        const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
        if (menuButtonInfo) {
          const navHeight = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
          navBarHeight.value = navHeight > 0 ? navHeight : 44;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:259", "获取导航栏信息失败", e);
      }
    };
    const handleRecharge = () => {
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge?cardNumber=" + card_number.value
      });
    };
    const getCardDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryCardDetail(card_number.value, "", "1");
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:277", res);
        if (res.code == 200) {
          cardDetail.value = res.data;
        }
      });
    };
    const getOrderList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const resp = yield api_http.queryOrderListXcx(new common_vendor.UTSJSONObject({
            rechargeNo: card_number.value
          }));
          if (resp.code == 200) {
            if (resp.rows && Array.isArray(resp.rows)) {
              orderList.value = resp.rows;
            } else if (resp.data && Array.isArray(resp.data)) {
              orderList.value = resp.data;
            } else {
              orderList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:298", "查询订单列表失败:", resp.msg);
            orderList.value = [];
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:302", "查询订单列表异常:", error);
          orderList.value = [];
        }
      });
    };
    const getPkgInfoList = (state) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryPkgInfoList(new api_types.PkgInfoListParams({
            rechargeNo: card_number.value,
            status: state
          }));
          common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:314", "套餐列表返回:", res);
          if (res.code == 200) {
            if (res.rows && Array.isArray(res.rows)) {
              pkgInfoList.value = res.rows;
              common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:318", "套餐列表数量:", pkgInfoList.value.length);
            } else if (res.data && Array.isArray(res.data)) {
              pkgInfoList.value = res.data;
            } else {
              pkgInfoList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:325", "查询套餐列表失败:", res.msg);
            pkgInfoList.value = [];
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:329", "查询套餐列表异常:", error);
          pkgInfoList.value = [];
        }
      });
    };
    const isBinded = common_vendor.ref(false);
    const handleBindCard = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const res = yield api_http.userBindCard(new api_types.BindCard({
          rechargeNo: card_number.value
        }));
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:340", res);
        if (res.code == 200) {
          common_vendor.index.showToast({
            title: "绑定成功",
            icon: "success"
          });
          isBinded.value = true;
        } else {
          common_vendor.index.showToast({
            title: (_a = res.msg) !== null && _a !== void 0 ? _a : "绑定失败",
            icon: "none"
          });
        }
      });
    };
    const handleUnbind = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:357", "解绑卡片");
        const res = yield api_http.userUnBindCard(card_number.value);
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:359", res);
        if (res.code == 200) {
          common_vendor.index.showToast({
            title: "解绑成功",
            icon: "success"
          });
          isBinded.value = false;
          common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
            delta: 1
          }));
        } else {
          common_vendor.index.showToast({
            title: (_a = res.msg) !== null && _a !== void 0 ? _a : "解绑失败",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      getNavBarInfo();
    });
    common_vendor.onLoad((options) => {
      var _a;
      const cardNumber = (_a = options.cardNumber) !== null && _a !== void 0 ? _a : "";
      card_number.value = cardNumber;
      getCardDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "1c"),
        b: common_vendor.p({
          title: common_vendor.unref(card_number),
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-2bc48812"
        }),
        c: common_vendor.unref(cardDetail)
      }, common_vendor.unref(cardDetail) ? common_vendor.e({
        d: common_vendor.o(changeTab, "e8"),
        e: common_vendor.o(($event) => {
          return common_vendor.isRef(active) ? active.value = $event : null;
        }, "02"),
        f: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: common_vendor.unref(tabs),
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: common_vendor.unref(active),
          class: "data-v-2bc48812"
        }),
        g: common_vendor.s(common_vendor.unref(fixedTabsStyle)),
        h: common_vendor.t(common_vendor.unref(activeName)),
        i: common_vendor.unref(activeName) == "基本信息"
      }, common_vendor.unref(activeName) == "基本信息" ? common_vendor.e({
        j: common_vendor.unref(cardDetail).rechargeNo
      }, common_vendor.unref(cardDetail).rechargeNo ? {
        k: common_vendor.t(common_vendor.unref(cardDetail).rechargeNo)
      } : {}, {
        l: common_vendor.unref(cardDetail).pkgName
      }, common_vendor.unref(cardDetail).pkgName ? {
        m: common_vendor.t(common_vendor.unref(cardDetail).pkgName)
      } : {}, {
        n: common_vendor.unref(cardDetail).effectiveTime
      }, common_vendor.unref(cardDetail).effectiveTime ? {
        o: common_vendor.t(common_vendor.unref(cardDetail).effectiveTime)
      } : {}, {
        p: common_vendor.unref(cardDetail).expirationTime
      }, common_vendor.unref(cardDetail).expirationTime ? {
        q: common_vendor.t(common_vendor.unref(cardDetail).expirationTime)
      } : {}, {
        r: common_vendor.unref(cardDetail).statusStr
      }, common_vendor.unref(cardDetail).statusStr ? {
        s: common_vendor.p({
          type: "success",
          ["plain-fill"]: true,
          text: common_vendor.unref(cardDetail).statusStr,
          class: "data-v-2bc48812"
        })
      } : {}, {
        t: common_vendor.unref(cardDetail).usedPeriod && common_vendor.unref(cardDetail).totalPeriod
      }, common_vendor.unref(cardDetail).usedPeriod && common_vendor.unref(cardDetail).totalPeriod ? {
        v: common_vendor.t(common_vendor.unref(cardDetail).usedPeriod),
        w: common_vendor.t(common_vendor.unref(cardDetail).totalPeriod)
      } : {}, {
        x: common_vendor.unref(cardDetail).expirationTime
      }, common_vendor.unref(cardDetail).expirationTime ? {
        y: common_vendor.t(common_vendor.unref(cardDetail).expirationTime)
      } : {}, {
        z: common_vendor.unref(cardDetail).pkgFlow
      }, common_vendor.unref(cardDetail).pkgFlow ? {
        A: common_vendor.p({
          dashed: true,
          class: "data-v-2bc48812"
        })
      } : {}, {
        B: common_vendor.unref(cardDetail).pkgFlow
      }, common_vendor.unref(cardDetail).pkgFlow ? {} : {}, {
        C: common_vendor.unref(cardDetail).pkgFlow
      }, common_vendor.unref(cardDetail).pkgFlow ? {
        D: common_vendor.t(common_vendor.unref(cardDetail).usedFlow != null && common_vendor.unref(cardDetail).usedFlow !== "" ? common_vendor.unref(cardDetail).usedFlow : "0"),
        E: common_vendor.t(common_vendor.unref(cardDetail).unUsedFlow != null && common_vendor.unref(cardDetail).unUsedFlow !== "" ? common_vendor.unref(cardDetail).unUsedFlow : "0"),
        F: common_vendor.t(common_vendor.unref(cardDetail).pkgFlow != null && common_vendor.unref(cardDetail).pkgFlow !== "" ? common_vendor.unref(cardDetail).pkgFlow : "0")
      } : {}) : {}, {
        G: common_vendor.unref(activeName) == "卡片套餐"
      }, common_vendor.unref(activeName) == "卡片套餐" ? common_vendor.e({
        H: common_vendor.o(handleClick, "72"),
        I: common_vendor.o(($event) => {
          return common_vendor.isRef(current) ? current.value = $event : null;
        }, "e7"),
        J: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: common_vendor.unref(pkgTabs),
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          customStyle: {
            height: "85rpx",
            padding: "5rpx 10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: common_vendor.unref(current),
          class: "data-v-2bc48812"
        }),
        K: common_vendor.unref(filteredPackageList).length === 0
      }, common_vendor.unref(filteredPackageList).length === 0 ? {} : {}, {
        L: common_vendor.f(common_vendor.unref(filteredPackageList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: "2bc48812-5-" + i0,
            c: common_vendor.p({
              text: getPackageStatusText(item.status),
              round: true,
              ["plain-fill"]: true,
              size: "small",
              type: getPackageStatusType(item.status),
              class: "data-v-2bc48812"
            }),
            d: common_vendor.t(item.effectiveTime),
            e: item.expirationTime
          }, item.expirationTime ? {
            f: common_vendor.t(item.expirationTime)
          } : {}, {
            g: common_vendor.t(item.pkgFlow),
            h: common_vendor.t(item.usedFlow),
            i: common_vendor.t(item.unUsedFlow),
            j: index
          });
        })
      }) : {}, {
        M: common_vendor.unref(activeName) == "卡片订单"
      }, common_vendor.unref(activeName) == "卡片订单" ? common_vendor.e({
        N: common_vendor.unref(orderList).length === 0
      }, common_vendor.unref(orderList).length === 0 ? {} : {}, {
        O: common_vendor.f(common_vendor.unref(orderList), (order, index, i0) => {
          return {
            a: common_vendor.t(order.pkgName || "未知套餐"),
            b: "2bc48812-6-" + i0,
            c: common_vendor.p({
              type: getOrderStatusType(order.status),
              text: getOrderStatusText(order.status),
              round: true,
              ["plain-fill"]: true,
              size: "small",
              class: "data-v-2bc48812"
            }),
            d: common_vendor.t(order.orderNo || "未知"),
            e: common_vendor.t(order.createTime),
            f: common_vendor.t(order.payCurrencyAmount),
            g: order.id || index
          };
        })
      }) : {}, {
        P: common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded)
      }, common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded) ? {
        Q: common_vendor.o(handleUnbind, "ce"),
        R: common_vendor.p({
          type: "error",
          ["plain-fill"]: true,
          text: "解绑卡片",
          customStyle: {
            backgroundColor: "#ffffff"
          },
          class: "ml-24 mr-24 mt-24 mb-24 data-v-2bc48812"
        })
      } : {}, {
        S: common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded)
      }, common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded) ? {
        T: common_vendor.p({
          bold: true,
          disabled: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      } : {
        U: common_vendor.o(handleBindCard, "f8"),
        V: common_vendor.p({
          bold: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      }, {
        W: common_vendor.o(handleRecharge, "b8"),
        X: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          bold: true,
          shadow: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      }) : {}, {
        Y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        Z: `${_ctx.u_s_b_h}px`,
        aa: `${_ctx.u_s_a_i_b}px`,
        ab: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc48812"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardDetail/cardDetail.js.map
