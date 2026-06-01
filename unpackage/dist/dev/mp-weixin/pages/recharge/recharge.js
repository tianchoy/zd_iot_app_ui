"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_tabs_1 = common_vendor.resolveComponent("m-tabs");
  const _easycom_m_bottom_popup_1 = common_vendor.resolveComponent("m-bottom-popup");
  const _easycom_m_sticky_bottom_1 = common_vendor.resolveComponent("m-sticky-bottom");
  (_easycom_topNavBar_1 + _easycom_m_tag_1 + _easycom_m_button_1 + _easycom_m_tabs_1 + _easycom_m_bottom_popup_1 + _easycom_m_sticky_bottom_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_tabs = () => "../../uni_modules/m-unix/components/m-tabs/m-tabs.js";
const _easycom_m_bottom_popup = () => "../../uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.js";
const _easycom_m_sticky_bottom = () => "../../uni_modules/m-unix/components/m-sticky-bottom/m-sticky-bottom.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_tag + common_vendor.unref(LinearProgress) + _easycom_m_button + _easycom_m_tabs + common_vendor.unref(Payment) + _easycom_m_bottom_popup + _easycom_m_sticky_bottom)();
}
const LinearProgress = () => "../../components/progress.js";
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
    const progress1 = common_vendor.ref(80);
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
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:267", e);
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
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-722cdacb"
        }),
        d: common_vendor.p({
          value: progress1.value,
          class: "data-v-722cdacb"
        }),
        e: common_vendor.o(toMyPackage, "50"),
        f: common_vendor.p({
          type: "white",
          plain: true,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          class: "data-v-722cdacb"
        }),
        g: common_vendor.o(toOrderRecord, "a5"),
        h: common_vendor.p({
          type: "white",
          plain: true,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          class: "data-v-722cdacb"
        }),
        i: common_vendor.o(changeTab, "be"),
        j: common_vendor.p({
          tabs: tabs.value,
          width: "100rpx",
          padding: 0,
          isSlider: true,
          currentTab: active.value,
          unlined: false,
          bold: true,
          class: "data-v-722cdacb"
        }),
        k: active.value === 0
      }, active.value === 0 ? {
        l: common_vendor.f(packageList.value, (item, index, i0) => {
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
        m: common_vendor.f(refillList.value, (item, index, i0) => {
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
        n: `${_ctx.u_s_b_h}px`,
        o: `${_ctx.u_s_a_i_b}px`,
        p: common_vendor.o(handleCancelPayment, "68"),
        q: common_vendor.o(handleConfirmPayment, "06"),
        r: common_vendor.p({
          amount: currentPrice.value,
          class: "data-v-722cdacb"
        }),
        s: common_vendor.o(($event) => {
          return showPopup.value = false;
        }, "d0"),
        t: common_vendor.p({
          show: showPopup.value,
          height: "50%",
          radius: true,
          class: "data-v-722cdacb"
        }),
        v: common_vendor.t(currentPrice.value),
        w: common_vendor.o(choosePayment, "ed"),
        x: common_vendor.p({
          type: "primary",
          plain: false,
          margin: "0 20rpx",
          width: "200rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          shadow: false,
          class: "data-v-722cdacb"
        }),
        y: common_vendor.p({
          class: "data-v-722cdacb"
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
