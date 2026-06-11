"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  (_easycom_topNavBar_1 + _easycom_rice_tabs_1 + _easycom_rice_tag_1 + _easycom_rice_button_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tabs + _easycom_rice_tag + _easycom_rice_button)();
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
      currentPeriodEndTime: null,
      currentPeriodStartTime: null,
      effectiveTime: null,
      expirationTime: null,
      pkgFlow: null,
      pkgName: null,
      rechargeNo: null,
      status: null,
      totalPeriod: null,
      unUsedFlow: null,
      usedFlow: null,
      usedPeriod: null,
      isBind: null
    }));
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
    const orderDates = common_vendor.ref(["2026-03-25", "2026-02-25", "2026-01-25"]);
    const packageList = common_vendor.ref([
      new api_types.PackageItem({ name: "车联网月包20G", status: "active", statusText: "在用", tagType: "success", startTime: "2026-04-01", totalFlow: "20GB", usedFlow: "11.34GB", leftFlow: "8.66GB" }),
      new api_types.PackageItem({ name: "车联网月包20G", status: "pending", statusText: "待生效", tagType: "primary", startTime: "2026-05-01", totalFlow: "20GB", usedFlow: "0GB", leftFlow: "20GB" }),
      new api_types.PackageItem({ name: "车联网月包20G", status: "pending", statusText: "待生效", tagType: "primary", startTime: "2026-06-01", totalFlow: "20GB", usedFlow: "0GB", leftFlow: "20GB" }),
      new api_types.PackageItem({ name: "车联网月包20G", status: "expired", statusText: "已失效", tagType: "error", startTime: "2025-03-01", totalFlow: "20GB", usedFlow: "20GB", leftFlow: "0GB" }),
      new api_types.PackageItem({ name: "车联网月包20G", status: "expired", statusText: "已失效", tagType: "error", startTime: "2025-02-01", totalFlow: "20GB", usedFlow: "20GB", leftFlow: "0GB" })
    ]);
    const current = common_vendor.ref(0);
    const filteredPackageList = common_vendor.computed(() => {
      if (current.value == 1)
        return packageList.value.filter((item) => {
          return item.status == "active";
        });
      if (current.value == 2)
        return packageList.value.filter((item) => {
          return item.status == "pending";
        });
      if (current.value == 3)
        return packageList.value.filter((item) => {
          return item.status == "expired";
        });
      return packageList.value;
    });
    const handleClick = (e) => {
      common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:153", typeof e.index);
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
        }
        // getOrderList 
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
        common_vendor.index.__f__("error", "at pages/cardDetail/cardDetail.uvue:191", "获取导航栏信息失败", e);
      }
    };
    const handleRecharge = () => {
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge?cardNumber=" + card_number.value
      });
    };
    const getCardDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryCardDetail(card_number.value);
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:209", res);
        if (res.code == 200) {
          cardDetail.value = res.data;
        }
      });
    };
    const isBinded = common_vendor.ref(false);
    const handleBindCard = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const res = yield api_http.userBindCard(new api_types.BindCard({
          rechargeNo: (_a = cardDetail.value) === null || _a === void 0 ? null : _a.rechargeNo
        }));
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:221", res);
        if (res.code == 200) {
          common_vendor.index.showToast({
            title: "绑定成功",
            icon: "success"
          });
          isBinded.value = true;
        } else {
          common_vendor.index.showToast({
            title: (_b = res.msg) !== null && _b !== void 0 ? _b : "绑定失败",
            icon: "none"
          });
        }
      });
    };
    const getPkgInfoList = (state) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.queryPkgInfoList(new api_types.PkgInfoListParams({
          rechargeNo: card_number.value,
          status: state
        }));
        common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:242", res);
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
        r: common_vendor.unref(cardDetail).usedPeriod && common_vendor.unref(cardDetail).totalPeriod
      }, common_vendor.unref(cardDetail).usedPeriod && common_vendor.unref(cardDetail).totalPeriod ? {
        s: common_vendor.t(common_vendor.unref(cardDetail).usedPeriod),
        t: common_vendor.t(common_vendor.unref(cardDetail).totalPeriod)
      } : {}, {
        v: common_vendor.unref(cardDetail).expirationTime
      }, common_vendor.unref(cardDetail).expirationTime ? {
        w: common_vendor.t(common_vendor.unref(cardDetail).expirationTime)
      } : {}, {
        x: common_vendor.t(common_vendor.unref(cardDetail).usedFlow != null && common_vendor.unref(cardDetail).usedFlow !== "" ? common_vendor.unref(cardDetail).usedFlow : "0"),
        y: common_vendor.t(common_vendor.unref(cardDetail).unUsedFlow != null && common_vendor.unref(cardDetail).unUsedFlow !== "" ? common_vendor.unref(cardDetail).unUsedFlow : "0"),
        z: common_vendor.t(common_vendor.unref(cardDetail).pkgFlow != null && common_vendor.unref(cardDetail).pkgFlow !== "" ? common_vendor.unref(cardDetail).pkgFlow : "0")
      }) : {}, {
        A: common_vendor.unref(activeName) == "卡片套餐"
      }, common_vendor.unref(activeName) == "卡片套餐" ? {
        B: common_vendor.o(handleClick, "45"),
        C: common_vendor.o(($event) => {
          return common_vendor.isRef(current) ? current.value = $event : null;
        }, "f3"),
        D: common_vendor.p({
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
        E: common_vendor.f(common_vendor.unref(filteredPackageList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "2bc48812-3-" + i0,
            c: common_vendor.p({
              text: item.statusText,
              round: true,
              ["plain-fill"]: true,
              size: "small",
              type: item.tagType,
              class: "data-v-2bc48812"
            }),
            d: common_vendor.t(item.startTime),
            e: common_vendor.t(item.totalFlow),
            f: common_vendor.t(item.usedFlow),
            g: common_vendor.t(item.leftFlow),
            h: index
          };
        })
      } : {}, {
        F: common_vendor.unref(activeName) == "卡片订单"
      }, common_vendor.unref(activeName) == "卡片订单" ? {
        G: common_vendor.f(common_vendor.unref(orderDates), (date, k0, i0) => {
          return {
            a: "2bc48812-4-" + i0,
            b: common_vendor.t(date),
            c: date
          };
        }),
        H: common_vendor.p({
          text: "已完成",
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-2bc48812"
        }),
        I: common_vendor.t(common_vendor.unref(card_number))
      } : {}, {
        J: common_vendor.o(_ctx.handleUnbind, "1a"),
        K: common_vendor.p({
          type: "error",
          plain: true,
          text: "解绑卡片",
          customStyle: {
            backgroundColor: "#ffffff"
          },
          class: "ml-24 mr-24 mt-24 mb-24 data-v-2bc48812"
        }),
        L: common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded)
      }, common_vendor.unref(cardDetail).isBind || common_vendor.unref(isBinded) ? {
        M: common_vendor.p({
          bold: true,
          disabled: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      } : {
        N: common_vendor.o(handleBindCard, "ff"),
        O: common_vendor.p({
          bold: true,
          customStyle: {
            border: "none"
          },
          class: "btn data-v-2bc48812"
        })
      }, {
        P: common_vendor.o(handleRecharge, "dc"),
        Q: common_vendor.p({
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
        R: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        S: `${_ctx.u_s_b_h}px`,
        T: `${_ctx.u_s_a_i_b}px`,
        U: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc48812"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardDetail/cardDetail.js.map
