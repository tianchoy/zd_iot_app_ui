"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_div_1 = common_vendor.resolveComponent("m-div");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_tabs_1 = common_vendor.resolveComponent("m-tabs");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_segmented_control_1 = common_vendor.resolveComponent("m-segmented-control");
  (_easycom_topNavBar_1 + _easycom_m_tag_1 + _easycom_m_div_1 + _easycom_m_button_1 + _easycom_m_tabs_1 + _easycom_m_icon_1 + _easycom_m_segmented_control_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_div = () => "../../uni_modules/m-unix/components/m-div/m-div.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_tabs = () => "../../uni_modules/m-unix/components/m-tabs/m-tabs.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_segmented_control = () => "../../uni_modules/m-unix/components/m-segmented-control/m-segmented-control.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_tag + _easycom_m_div + _easycom_m_button + _easycom_m_tabs + _easycom_m_icon + _easycom_m_segmented_control)();
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
          item: { type: CardDetailTabItem, optional: false }
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
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cardDetail",
  setup(__props) {
    const card_number = common_vendor.ref("");
    const active = common_vendor.ref(0);
    const activeName = common_vendor.ref("基本信息");
    const pkgMore = common_vendor.ref(false);
    const tabs = common_vendor.ref([
      new common_vendor.UTSJSONObject({ name: "基本信息" }),
      new common_vendor.UTSJSONObject({ name: "卡片套餐" }),
      new common_vendor.UTSJSONObject({ name: "卡片订单" })
    ]);
    const pkgTabs = common_vendor.ref(["全部", "在用套餐", "待生效", "已失效"]);
    const current = common_vendor.ref(0);
    const handleClick = (e) => {
      var _a;
      current.value = (_a = e.getNumber("index")) !== null && _a !== void 0 ? _a : 0;
    };
    const changeTab = (e) => {
      active.value = e.index;
      activeName.value = e.item.name;
    };
    const showMore = () => {
      common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:296", pkgMore.value);
      pkgMore.value = !pkgMore.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    common_vendor.onLoad((options) => {
      var _a;
      const cardNumber = (_a = options.getString("card_number")) !== null && _a !== void 0 ? _a : "";
      common_vendor.index.__f__("log", "at pages/cardDetail/cardDetail.uvue:308", cardNumber);
      card_number.value = cardNumber;
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "f5"),
        b: common_vendor.p({
          title: "卡片详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-2bc48812"
        }),
        c: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        }),
        d: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider",
          class: "data-v-2bc48812"
        }),
        e: common_vendor.o(($event) => {
          return _ctx.cardDetail("1064916585160");
        }, "3a"),
        f: common_vendor.p({
          type: "black",
          plain: true,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          class: "data-v-2bc48812"
        }),
        g: common_vendor.p({
          type: "black",
          plain: true,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          disabledGray: true,
          disabled: true,
          class: "data-v-2bc48812"
        }),
        h: common_vendor.p({
          type: "primary",
          plain: false,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          shadow: true,
          class: "data-v-2bc48812"
        }),
        i: common_vendor.o(changeTab, "7d"),
        j: common_vendor.p({
          tabs: common_vendor.unref(tabs),
          width: "auto",
          padding: 0,
          isSlider: false,
          currentTab: common_vendor.unref(active),
          unlined: true,
          bold: true,
          itemStyle: {
            backgroundColor: "#fff",
            borderRadius: "24rpx",
            padding: "0 40rpx",
            border: "1rpx solid #e7edf5"
          },
          selectedBgColor: "#eff6ff",
          selectedBorderColor: "#bfdbfe",
          class: "data-v-2bc48812"
        }),
        k: common_vendor.t(common_vendor.unref(activeName)),
        l: common_vendor.unref(activeName) == "基本信息"
      }, common_vendor.unref(activeName) == "基本信息" ? common_vendor.e({
        m: common_vendor.t(common_vendor.unref(card_number)),
        n: common_vendor.t(common_vendor.unref(card_number)),
        o: common_vendor.t(common_vendor.unref(card_number)),
        p: common_vendor.t(common_vendor.unref(card_number)),
        q: !common_vendor.unref(pkgMore)
      }, !common_vendor.unref(pkgMore) ? {
        r: common_vendor.p({
          name: "arrow-down-filling",
          size: "20rpx",
          class: "data-v-2bc48812"
        })
      } : {
        s: common_vendor.p({
          name: "arrow-up-filling",
          size: "20rpx",
          class: "data-v-2bc48812"
        })
      }, {
        t: common_vendor.o(showMore, "78"),
        v: common_vendor.unref(pkgMore)
      }, common_vendor.unref(pkgMore) ? {
        w: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}) : {}, {
        x: common_vendor.unref(activeName) == "卡片套餐"
      }, common_vendor.unref(activeName) == "卡片套餐" ? common_vendor.e({
        y: common_vendor.o(handleClick, "5c"),
        z: common_vendor.p({
          values: common_vendor.unref(pkgTabs),
          current: common_vendor.unref(current),
          textActiveColor: "#2563eb",
          customStyle: {
            height: "unset",
            padding: "5rpx 10rpx",
            border: "1rpx solid #e5edf6"
          },
          class: "data-v-2bc48812"
        }),
        A: common_vendor.unref(current) == 0
      }, common_vendor.unref(current) == 0 ? {
        B: common_vendor.p({
          text: "全部",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}, {
        C: common_vendor.unref(current) == 1
      }, common_vendor.unref(current) == 1 ? {
        D: common_vendor.p({
          text: "在用",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}, {
        E: common_vendor.unref(current) == 2
      }, common_vendor.unref(current) == 2 ? {
        F: common_vendor.p({
          text: "待生效",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}, {
        G: common_vendor.unref(current) == 3
      }, common_vendor.unref(current) == 3 ? {
        H: common_vendor.p({
          text: "已失效",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}) : {}, {
        I: common_vendor.unref(activeName) == "卡片订单"
      }, common_vendor.unref(activeName) == "卡片订单" ? {
        J: common_vendor.p({
          text: "已失效",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        }),
        K: common_vendor.t(common_vendor.unref(card_number))
      } : {}, {
        L: `${_ctx.u_s_b_h}px`,
        M: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc48812"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardDetail/cardDetail.js.map
