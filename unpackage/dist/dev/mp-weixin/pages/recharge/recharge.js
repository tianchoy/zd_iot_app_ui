"use strict";
const common_vendor = require("../../common/vendor.js");
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
class PackageItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          tag: { type: String, optional: false },
          data: { type: String, optional: false },
          validity: { type: String, optional: false },
          price: { type: Number, optional: false },
          originalPrice: { type: Number, optional: false }
        };
      },
      name: "PackageItem"
    };
  }
  constructor(options, metadata = PackageItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.tag = this.__props__.tag;
    this.data = this.__props__.data;
    this.validity = this.__props__.validity;
    this.price = this.__props__.price;
    this.originalPrice = this.__props__.originalPrice;
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recharge",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const percentage = common_vendor.ref(60);
    const active = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      new TabItem({
        name: "套餐包"
      }),
      new TabItem({
        name: "加油包"
      })
    ]);
    const packageList = common_vendor.ref([
      new PackageItem({
        name: "车联网月包20G",
        tag: "推荐",
        data: "20GB",
        validity: "30天",
        price: 90,
        originalPrice: 100
      }),
      new PackageItem({
        name: "车联网月包10G",
        tag: "",
        data: "10GB",
        validity: "30天",
        price: 50,
        originalPrice: 0
      }),
      new PackageItem({
        name: "工业设备月包5G",
        tag: "",
        data: "5GB",
        validity: "30天",
        price: 30,
        originalPrice: 0
      })
    ]);
    const refillList = common_vendor.ref([
      new PackageItem({
        name: "加油包5G",
        tag: "推荐",
        data: "5GB",
        validity: "7天",
        price: 20,
        originalPrice: 30
      }),
      new PackageItem({
        name: "加油包10G",
        tag: "",
        data: "10GB",
        validity: "15天",
        price: 35,
        originalPrice: 45
      }),
      new PackageItem({
        name: "加油包20G",
        tag: "",
        data: "20GB",
        validity: "30天",
        price: 60,
        originalPrice: 80
      })
    ]);
    const selectedPackageIndex = common_vendor.ref(0);
    const selectedRefillIndex = common_vendor.ref(0);
    const currentPrice = common_vendor.computed(() => {
      if (active.value === 0) {
        const item = packageList.value[selectedPackageIndex.value];
        return item ? item.price : 0;
      } else {
        const item = refillList.value[selectedRefillIndex.value];
        return item ? item.price : 0;
      }
    });
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
      showPopup.value = true;
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const handleConfirmPayment = (e = null) => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:259", e);
      showPopup.value = false;
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
    return (_ctx, _cache) => {
      "raw js";
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
          text: "标签",
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-722cdacb"
        }),
        d: common_vendor.p({
          percentage: percentage.value,
          ["show-text"]: true,
          class: "data-v-722cdacb"
        }),
        e: common_vendor.o(toMyPackage, "4d"),
        f: common_vendor.p({
          class: "btn mr-24 data-v-722cdacb"
        }),
        g: common_vendor.o(toOrderRecord, "19"),
        h: common_vendor.p({
          class: "btn data-v-722cdacb"
        }),
        i: common_vendor.o(changeTab, "c8"),
        j: common_vendor.o(($event) => {
          return active.value = $event;
        }, "26"),
        k: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: tabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: active.value,
          class: "data-v-722cdacb"
        }),
        l: active.value === 0
      }, active.value === 0 ? {
        m: common_vendor.f(packageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: common_vendor.t(item.data),
            e: common_vendor.t(item.validity),
            f: common_vendor.t(item.price),
            g: item.originalPrice
          }, item.originalPrice ? {
            h: common_vendor.t(item.originalPrice)
          } : {}, {
            i: index,
            j: selectedPackageIndex.value === index ? 1 : "",
            k: common_vendor.o(($event) => {
              return selectPackage(index);
            }, index)
          });
        })
      } : {
        n: common_vendor.f(refillList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: common_vendor.t(item.data),
            e: common_vendor.t(item.validity),
            f: common_vendor.t(item.price),
            g: item.originalPrice
          }, item.originalPrice ? {
            h: common_vendor.t(item.originalPrice)
          } : {}, {
            i: index,
            j: selectedRefillIndex.value === index ? 1 : "",
            k: common_vendor.o(($event) => {
              return selectRefill(index);
            }, index)
          });
        })
      }, {
        o: `${_ctx.u_s_b_h}px`,
        p: `${_ctx.u_s_a_i_b}px`,
        q: common_vendor.o(handleCancelPayment, "cb"),
        r: common_vendor.o(handleConfirmPayment, "f6"),
        s: common_vendor.p({
          amount: currentPrice.value,
          class: "data-v-722cdacb"
        }),
        t: common_vendor.o(_ctx.onPopupClose, "0f"),
        v: common_vendor.o(($event) => {
          return showPopup.value = $event;
        }, "2f"),
        w: common_vendor.p({
          position: "bottom",
          show: showPopup.value,
          class: "data-v-722cdacb"
        }),
        x: common_vendor.t(currentPrice.value),
        y: common_vendor.o(choosePayment, "68"),
        z: common_vendor.p({
          type: "primary",
          class: "btn data-v-722cdacb"
        }),
        A: `${_ctx.u_s_b_h}px`,
        B: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
