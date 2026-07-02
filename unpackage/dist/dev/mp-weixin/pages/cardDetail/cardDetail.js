"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
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
    const cardDetail = common_vendor.ref(null);
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
    const pkgTabs = common_vendor.ref([new common_vendor.UTSJSONObject({ name: "全部", value: "" }), new common_vendor.UTSJSONObject({ name: "在用套餐", value: "1" }), new common_vendor.UTSJSONObject({ name: "生效中", value: "0" }), new common_vendor.UTSJSONObject({ name: "已失效", value: "2" })]);
    const current = common_vendor.ref(0);
    const getCardDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryCardDetail(card_number.value, "", "1");
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:170", res);
        if (res.code == 200) {
          cardDetail.value = res.data;
        }
      });
    };
    const getOrderList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const resp = yield api_http.queryOrderList(new common_vendor.UTSJSONObject({
            rechargeNo: card_number.value
          }));
          if (resp.code == 200) {
            const rows = resp.rows;
            if (rows != null && Array.isArray(rows)) {
              orderList.value = rows;
            } else {
              orderList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:190", "查询订单列表失败:", resp.msg);
            orderList.value = [];
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:194", "查询订单列表异常:", error);
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
          if (res.code == 200) {
            const rows = res.rows;
            if (rows != null && Array.isArray(rows)) {
              pkgInfoList.value = rows;
            } else {
              pkgInfoList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:214", "查询套餐列表失败:", res.msg);
            pkgInfoList.value = [];
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:218", "查询套餐列表异常:", error);
          pkgInfoList.value = [];
        }
      });
    };
    const getPackageStatusText = (status) => {
      var _a, _b;
      const statusMap = /* @__PURE__ */ new Map();
      statusMap.set("0", "未生效");
      statusMap.set("1", "生效中");
      statusMap.set("2", "已失效");
      return (_b = (_a = common_vendor.UTS.mapGet(statusMap, status)) !== null && _a !== void 0 ? _a : status) !== null && _b !== void 0 ? _b : "未知";
    };
    const getPackageStatusType = (status) => {
      var _a;
      const typeMap = /* @__PURE__ */ new Map();
      typeMap.set("0", "success");
      typeMap.set("1", "primary");
      typeMap.set("2", "error");
      return (_a = common_vendor.UTS.mapGet(typeMap, status)) !== null && _a !== void 0 ? _a : "primary";
    };
    const getOrderStatusText = (status) => {
      var _a, _b;
      const statusMap = /* @__PURE__ */ new Map();
      statusMap.set("0", "待支付");
      statusMap.set("1", "已完成");
      statusMap.set("2", "已取消");
      statusMap.set("3", "支付失败");
      statusMap.set("4", "部分退款");
      statusMap.set("5", "全部退款");
      return (_b = (_a = common_vendor.UTS.mapGet(statusMap, status)) !== null && _a !== void 0 ? _a : status) !== null && _b !== void 0 ? _b : "未知";
    };
    const getOrderStatusType = (status) => {
      var _a;
      const typeMap = /* @__PURE__ */ new Map();
      typeMap.set("0", "primary");
      typeMap.set("1", "success");
      typeMap.set("2", "error");
      typeMap.set("3", "danger");
      typeMap.set("4", "warning");
      typeMap.set("5", "warning");
      return (_a = common_vendor.UTS.mapGet(typeMap, status)) !== null && _a !== void 0 ? _a : "primary";
    };
    const handleClick = (e) => {
      if (e.index != null) {
        current.value = e.index;
        if (e.index == 1) {
          getPkgInfoList(e.value.toString());
        }
      }
    };
    const changeTab = (e) => {
      active.value = e.index;
      activeName.value = e.name;
      if (e.index == 0) {
        getCardDetail();
      } else if (e.index == 1) {
        getPkgInfoList("");
      } else if (e.index == 2) {
        getOrderList();
      }
      current.value = 0;
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const handleOrderDetail = (pkgId) => {
      common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:300", pkgId);
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${pkgId}`
      });
    };
    const getNavBarInfo = () => {
      if (common_config.isWechat()) {
        try {
          const systemInfo = common_vendor.index.getSystemInfoSync();
          statusBarHeight.value = systemInfo.statusBarHeight || 20;
          const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
          if (menuButtonInfo) {
            const navHeight = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
            navBarHeight.value = navHeight > 0 ? navHeight : 44;
          }
        } catch (e) {
          common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:320", "获取导航栏信息失败", e);
        }
      }
    };
    const handleRecharge = () => {
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge?cardNumber=" + card_number.value
      });
    };
    const isBinded = common_vendor.ref(false);
    const handleBindCard = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const res = yield api_http.userBindCard(new api_types.BindCard({
          rechargeNo: card_number.value
        }));
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:342", res);
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
        common_vendor.index.showModal(new common_vendor.UTSJSONObject({
          title: "确认解绑",
          content: "确定解绑该卡片吗？",
          success: (res) => {
            if (res.confirm) {
              api_http.userUnBindCard(card_number.value).then((result) => {
                var _a;
                common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:365", result);
                if (result.code == 200) {
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
                    title: (_a = result.msg) !== null && _a !== void 0 ? _a : "解绑失败",
                    icon: "none"
                  });
                }
              }).catch((error = null) => {
                common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:382", "解绑请求失败:", error);
                common_vendor.index.showToast({
                  title: "网络异常，请重试",
                  icon: "none"
                });
              });
            }
          }
        }));
      });
    };
    const handlePkgDetail = (pkgId) => {
      common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:395", pkgId);
      common_vendor.index.navigateTo({
        url: `/pages/pkgDetail/pkgDetail?pkgId=${pkgId}`
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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "61"),
        b: common_vendor.p({
          title: card_number.value,
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-2bc48812"
        }),
        c: cardDetail.value
      }, cardDetail.value ? common_vendor.e({
        d: common_vendor.o(changeTab, "44"),
        e: common_vendor.o(($event) => {
          return active.value = $event;
        }, "b2"),
        f: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: tabs.value,
          ["line-width"]: 0,
          ["item-style"]: {
            overflow: "hidden"
          },
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          ["active-style"]: {
            backgroundColor: "#ffffff",
            border: "1rpx solid #e5edf6",
            borderRadius: "24rpx"
          },
          ["inactive-style"]: {
            backgroundColor: "#f3f7fb",
            border: "1rpx solid #e5edf6",
            borderRadius: "24rpx"
          },
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            backgroundColor: "#ffffff",
            border: "1rpx solid #ffffff"
          },
          modelValue: active.value,
          class: "data-v-2bc48812"
        }),
        g: common_vendor.s(fixedTabsStyle.value),
        h: common_vendor.t(activeName.value),
        i: activeName.value == "基本信息"
      }, activeName.value == "基本信息" ? common_vendor.e({
        j: (_a = cardDetail.value) == null ? void 0 : _a.rechargeNo
      }, ((_b = cardDetail.value) == null ? void 0 : _b.rechargeNo) ? {
        k: common_vendor.t((_c = cardDetail.value) == null ? void 0 : _c.rechargeNo)
      } : {}, {
        l: (_d = cardDetail.value) == null ? void 0 : _d.statusStr
      }, ((_e = cardDetail.value) == null ? void 0 : _e.statusStr) ? {
        m: common_vendor.p({
          type: "success",
          ["plain-fill"]: true,
          text: (_f = cardDetail.value) == null ? void 0 : _f.statusStr,
          size: "small",
          class: "data-v-2bc48812"
        })
      } : {}, {
        n: (_g = cardDetail.value) == null ? void 0 : _g.pkgName
      }, ((_h = cardDetail.value) == null ? void 0 : _h.pkgName) ? {
        o: common_vendor.t((_i = cardDetail.value) == null ? void 0 : _i.pkgName)
      } : {}, {
        p: (_j = cardDetail.value) == null ? void 0 : _j.effectiveTime
      }, ((_k = cardDetail.value) == null ? void 0 : _k.effectiveTime) ? {
        q: common_vendor.t((_l = cardDetail.value) == null ? void 0 : _l.effectiveTime)
      } : {}, {
        r: (_m = cardDetail.value) == null ? void 0 : _m.expirationTime
      }, ((_n = cardDetail.value) == null ? void 0 : _n.expirationTime) ? {
        s: common_vendor.t((_o = cardDetail.value) == null ? void 0 : _o.expirationTime)
      } : {}, {
        t: ((_p = cardDetail.value) == null ? void 0 : _p.usedPeriod) && ((_q = cardDetail.value) == null ? void 0 : _q.totalPeriod)
      }, ((_r = cardDetail.value) == null ? void 0 : _r.usedPeriod) && ((_s = cardDetail.value) == null ? void 0 : _s.totalPeriod) ? {
        v: common_vendor.t((_t = cardDetail.value) == null ? void 0 : _t.usedPeriod),
        w: common_vendor.t((_u = cardDetail.value) == null ? void 0 : _u.totalPeriod)
      } : {}, {
        x: (_v = cardDetail.value) == null ? void 0 : _v.pkgFlow
      }, ((_w = cardDetail.value) == null ? void 0 : _w.pkgFlow) ? {
        y: common_vendor.p({
          dashed: true,
          class: "data-v-2bc48812"
        })
      } : {}, {
        z: (_x = cardDetail.value) == null ? void 0 : _x.pkgFlow
      }, ((_y = cardDetail.value) == null ? void 0 : _y.pkgFlow) ? {} : {}, {
        A: (_z = cardDetail.value) == null ? void 0 : _z.pkgFlow
      }, ((_A = cardDetail.value) == null ? void 0 : _A.pkgFlow) ? {
        B: common_vendor.t(((_B = cardDetail.value) == null ? void 0 : _B.usedFlow) != null && ((_C = cardDetail.value) == null ? void 0 : _C.usedFlow) !== "" ? (_D = cardDetail.value) == null ? void 0 : _D.usedFlow : "0"),
        C: common_vendor.t(((_E = cardDetail.value) == null ? void 0 : _E.unUsedFlow) != null && ((_F = cardDetail.value) == null ? void 0 : _F.unUsedFlow) !== "" ? (_G = cardDetail.value) == null ? void 0 : _G.unUsedFlow : "0"),
        D: common_vendor.t(((_H = cardDetail.value) == null ? void 0 : _H.pkgFlow) != null && ((_I = cardDetail.value) == null ? void 0 : _I.pkgFlow) !== "" ? (_J = cardDetail.value) == null ? void 0 : _J.pkgFlow : "0")
      } : {}) : {}, {
        E: activeName.value == "卡片套餐"
      }, activeName.value == "卡片套餐" ? common_vendor.e({
        F: common_vendor.o(handleClick, "aa"),
        G: common_vendor.o(($event) => {
          return current.value = $event;
        }, "36"),
        H: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: pkgTabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          customStyle: {
            height: "85rpx",
            padding: "5rpx 10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: current.value,
          class: "data-v-2bc48812"
        }),
        I: pkgInfoList.value.length == 0
      }, pkgInfoList.value.length == 0 ? {} : {}, {
        J: common_vendor.f(pkgInfoList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.name
          }, item.name ? {
            b: common_vendor.t(item.name)
          } : {}, {
            c: item.status
          }, item.status ? {
            d: "2bc48812-5-" + i0,
            e: common_vendor.p({
              text: getPackageStatusText(item.status),
              round: true,
              ["plain-fill"]: true,
              size: "small",
              type: getPackageStatusType(item.status),
              class: "data-v-2bc48812"
            })
          } : {}, {
            f: item.startTime
          }, item.startTime ? {
            g: common_vendor.t(item.startTime)
          } : {}, {
            h: item.endTime
          }, item.endTime ? {
            i: common_vendor.t(item.endTime)
          } : {}, {
            j: item.totalFlow
          }, item.totalFlow ? {
            k: common_vendor.t(item.totalFlow)
          } : {}, {
            l: item.usedFlow
          }, item.usedFlow ? {
            m: common_vendor.t(item.usedFlow)
          } : {}, {
            n: item.leftFlow
          }, item.leftFlow ? {
            o: common_vendor.t(item.leftFlow)
          } : {}, {
            p: index,
            q: common_vendor.o(($event) => {
              return handlePkgDetail(item.id);
            }, index)
          });
        })
      }) : {}, {
        K: activeName.value == "卡片订单"
      }, activeName.value == "卡片订单" ? common_vendor.e({
        L: orderList.value.length == 0
      }, orderList.value.length == 0 ? {} : {}, {
        M: common_vendor.f(orderList.value, (order, index, i0) => {
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
            g: index,
            h: common_vendor.o(($event) => {
              return handleOrderDetail(order.id.toString());
            }, index)
          };
        })
      }) : {}, {
        N: ((_K = cardDetail.value) == null ? void 0 : _K.isBind) || isBinded.value
      }, ((_L = cardDetail.value) == null ? void 0 : _L.isBind) || isBinded.value ? {
        O: common_vendor.o(handleUnbind, "e5"),
        P: common_vendor.p({
          type: "error",
          ["plain-fill"]: true,
          text: "解绑卡片",
          customStyle: {
            backgroundColor: "#ffffff"
          },
          class: "ml-24 mr-24 mt-24 mb-24 data-v-2bc48812"
        })
      } : {}, {
        Q: ((_M = cardDetail.value) == null ? void 0 : _M.isBind) || isBinded.value
      }, ((_N = cardDetail.value) == null ? void 0 : _N.isBind) || isBinded.value ? {
        R: common_vendor.p({
          height: "100rpx",
          bold: true,
          disabled: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      } : {
        S: common_vendor.o(handleBindCard, "55"),
        T: common_vendor.p({
          height: "100rpx",
          bold: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      }, {
        U: common_vendor.o(handleRecharge, "90"),
        V: common_vendor.p({
          height: "100rpx",
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
        W: `${_ctx.u_s_b_h}px`,
        X: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc48812"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardDetail/cardDetail.js.map
