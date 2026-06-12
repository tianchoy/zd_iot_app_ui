"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_progress_1 = common_vendor.resolveComponent("rice-progress");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_progress_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_progress + _easycom_rice_button + _easycom_rice_tabs + common_vendor.unref(Payment) + _easycom_rice_popup)();
}
const Payment = () => "../../components/payment.js";
class TabItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false }
        };
      },
      name: "TabItem"
    };
  }
  constructor(options, metadata = TabItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
class PkgItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          pkgId: { type: String, optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          validityPeriod: { type: String, optional: true },
          pkgFlow: { type: String, optional: true },
          crossedOutPrice: { type: String, optional: false },
          sellingPrice: { type: String, optional: false }
        };
      },
      name: "PkgItem"
    };
  }
  constructor(options, metadata = PkgItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.pkgId = this.__props__.pkgId;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.validityPeriod = this.__props__.validityPeriod;
    this.pkgFlow = this.__props__.pkgFlow;
    this.crossedOutPrice = this.__props__.crossedOutPrice;
    this.sellingPrice = this.__props__.sellingPrice;
    delete this.__props__;
  }
}
class ChangeTabEvent extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          index: { type: Number, optional: false }
        };
      },
      name: "ChangeTabEvent"
    };
  }
  constructor(options, metadata = ChangeTabEvent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class OnLoadOptions extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          cardNumber: { type: String, optional: true }
        };
      },
      name: "OnLoadOptions"
    };
  }
  constructor(options, metadata = OnLoadOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.cardNumber = this.__props__.cardNumber;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recharge",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const percentage = common_vendor.computed(() => {
      var _a, _b;
      const usedFlow = (_a = cardDetail.value) === null || _a === void 0 ? null : _a.usedPeriod;
      const totalFlow = (_b = cardDetail.value) === null || _b === void 0 ? null : _b.pkgFlow;
      if (!usedFlow || !totalFlow) {
        return 0;
      }
      const used = parseFloat(usedFlow);
      const total = parseFloat(totalFlow);
      if (total === 0) {
        return 0;
      }
      let percent = used / total * 100;
      percent = Math.min(100, Math.max(0, percent));
      return Math.round(percent);
    });
    const active = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      new TabItem({
        name: "套餐包"
      }),
      new TabItem({
        name: "加油包"
      })
    ]);
    const packageList = common_vendor.ref([]);
    const refillList = common_vendor.ref([]);
    const selectedPackageIndex = common_vendor.ref(0);
    const selectedRefillIndex = common_vendor.ref(0);
    const currentPrice = common_vendor.computed(() => {
      if (active.value === 0) {
        const item = packageList.value[selectedPackageIndex.value];
        return item ? item.sellingPrice : "0.00";
      } else {
        const item = refillList.value[selectedRefillIndex.value];
        return item ? item.sellingPrice : "0.00";
      }
    });
    const cardSellingPrice = common_vendor.ref("0.00");
    const formatFlow = (flow = null) => {
      if (!flow)
        return "未知";
      const flowBytes = parseFloat(flow);
      if (isNaN(flowBytes))
        return "未知";
      const flowGB = flowBytes / (1024 * 1024);
      if (flowGB >= 1024) {
        return `${(flowGB / 1024).toFixed(2)}TB`;
      } else if (flowGB >= 1) {
        return `${flowGB.toFixed(2)}GB`;
      } else {
        const flowMB = flowBytes / 1024;
        return `${flowMB.toFixed(2)}MB`;
      }
    };
    const classifyPackages = (packages) => {
      const packagesList = [];
      const refillsList = [];
      packages.forEach((item, index) => {
        if (item.pkgCategory === "3") {
          packagesList.push(item);
        } else if (item.pkgCategory === "4") {
          refillsList.push(item);
        }
      });
      packageList.value = packagesList;
      refillList.value = refillsList;
      selectedPackageIndex.value = 0;
      selectedRefillIndex.value = 0;
      if (packagesList.length > 0) {
        cardSellingPrice.value = packagesList[0].sellingPrice;
      } else if (refillsList.length > 0) {
        cardSellingPrice.value = refillsList[0].sellingPrice;
      }
    };
    const changeTab = (e) => {
      active.value = e.index;
    };
    const selectPackage = (index) => {
      selectedPackageIndex.value = index;
    };
    const selectRefill = (index) => {
      selectedRefillIndex.value = index;
    };
    const choosePayment = () => {
      if (active.value === 0 && packageList.value.length === 0) {
        common_vendor.index.showToast({
          title: "暂无套餐包可选",
          icon: "none"
        });
        return null;
      }
      if (active.value === 1 && refillList.value.length === 0) {
        common_vendor.index.showToast({
          title: "暂无加油包可选",
          icon: "none"
        });
        return null;
      }
      showPopup.value = true;
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const handleConfirmPayment = (e = null) => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:317", e);
      const currentItem = active.value === 0 ? packageList.value[selectedPackageIndex.value] : refillList.value[selectedRefillIndex.value];
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:323", "支付套餐信息:", currentItem);
      showPopup.value = false;
    };
    const onPopupClose = () => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:329", "弹窗关闭");
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const toMyPackage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myPkg/myPkg"
      });
    };
    const toOrderRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderRecord/orderRecord"
      });
    };
    const cardDetail = common_vendor.ref(null);
    const getCardDetail = (cardNumber2) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
          const res = yield api_http.queryCardDetail(cardNumber2, "0");
          common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:358", "卡片详情返回:", res);
          if (res.code == 200) {
            cardDetail.value = res.data;
            if (((_a = res.data) === null || _a === void 0 ? null : _a.pkgXcxVos) && res.data.pkgXcxVos.length > 0) {
              classifyPackages(res.data.pkgXcxVos);
            }
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:367", "获取卡片详情失败:", error);
          common_vendor.index.showToast({
            title: "获取卡片信息失败",
            icon: "none"
          });
        }
      });
    };
    const cardNumber = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      if (options && options.cardNumber) {
        cardNumber.value = options.cardNumber;
        getCardDetail(cardNumber.value);
      } else {
        common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:383", "未获取到卡片号码");
        common_vendor.index.showToast({
          title: "卡片号码不存在",
          icon: "none"
        });
      }
    });
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:394", "页面加载完成");
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b, _c;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "f5"),
        b: common_vendor.p({
          title: "充值首页",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-722cdacb"
        }),
        c: common_vendor.p({
          text: ((_a = cardDetail.value) == null ? void 0 : _a.statusStr) || "未知",
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-722cdacb"
        }),
        d: common_vendor.t(((_b = cardDetail.value) == null ? void 0 : _b.rechargeNo) || "未知"),
        e: common_vendor.t(((_c = cardDetail.value) == null ? void 0 : _c.pkgName) || "未知"),
        f: common_vendor.t(cardSellingPrice.value || "未知"),
        g: common_vendor.p({
          percentage: percentage.value,
          ["show-text"]: true,
          class: "data-v-722cdacb"
        }),
        h: common_vendor.o(toMyPackage, "73"),
        i: common_vendor.p({
          class: "btn mr-24 data-v-722cdacb"
        }),
        j: common_vendor.o(toOrderRecord, "69"),
        k: common_vendor.p({
          class: "btn data-v-722cdacb"
        }),
        l: common_vendor.o(changeTab, "67"),
        m: common_vendor.o(($event) => {
          return active.value = $event;
        }, "cd"),
        n: common_vendor.p({
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
          modelValue: active.value,
          class: "data-v-722cdacb"
        }),
        o: active.value === 0
      }, active.value === 0 ? common_vendor.e({
        p: common_vendor.f(packageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: common_vendor.t(formatFlow(item.pkgFlow)),
            e: common_vendor.t(item.validityPeriod || "无固定期限"),
            f: common_vendor.t(item.sellingPrice),
            g: item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice
          }, item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice ? {
            h: common_vendor.t(item.crossedOutPrice)
          } : {}, {
            i: item.pkgId || index,
            j: selectedPackageIndex.value === index ? 1 : "",
            k: common_vendor.o(($event) => {
              return selectPackage(index);
            }, item.pkgId || index)
          });
        }),
        q: packageList.value.length === 0
      }, packageList.value.length === 0 ? {} : {}) : common_vendor.e({
        r: common_vendor.f(refillList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: common_vendor.t(formatFlow(item.pkgFlow)),
            e: common_vendor.t(item.validityPeriod || "无固定期限"),
            f: common_vendor.t(item.sellingPrice),
            g: item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice
          }, item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice ? {
            h: common_vendor.t(item.crossedOutPrice)
          } : {}, {
            i: item.pkgId || index,
            j: selectedRefillIndex.value === index ? 1 : "",
            k: common_vendor.o(($event) => {
              return selectRefill(index);
            }, item.pkgId || index)
          });
        }),
        s: refillList.value.length === 0
      }, refillList.value.length === 0 ? {} : {}), {
        t: `${_ctx.u_s_b_h}px`,
        v: `${_ctx.u_s_a_i_b}px`,
        w: common_vendor.o(handleCancelPayment, "98"),
        x: common_vendor.o(handleConfirmPayment, "fe"),
        y: common_vendor.p({
          amount: currentPrice.value,
          class: "data-v-722cdacb"
        }),
        z: common_vendor.o(onPopupClose, "a0"),
        A: common_vendor.o(($event) => {
          return showPopup.value = $event;
        }, "d6"),
        B: common_vendor.p({
          position: "bottom",
          show: showPopup.value,
          class: "data-v-722cdacb"
        }),
        C: common_vendor.t(currentPrice.value),
        D: common_vendor.o(choosePayment, "6e"),
        E: common_vendor.p({
          type: "primary",
          class: "btn data-v-722cdacb"
        }),
        F: `${_ctx.u_s_b_h}px`,
        G: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
