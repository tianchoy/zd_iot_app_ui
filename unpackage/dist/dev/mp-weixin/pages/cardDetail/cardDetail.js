"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_tabs_1 = common_vendor.resolveComponent("m-tabs");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_segmented_control_1 = common_vendor.resolveComponent("m-segmented-control");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  (_easycom_topNavBar_1 + _easycom_m_tabs_1 + _easycom_m_icon_1 + _easycom_m_tag_1 + _easycom_m_segmented_control_1 + _easycom_m_button_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_tabs = () => "../../uni_modules/m-unix/components/m-tabs/m-tabs.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_segmented_control = () => "../../uni_modules/m-unix/components/m-segmented-control/m-segmented-control.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_tabs + _easycom_m_icon + _easycom_m_tag + _easycom_m_segmented_control + _easycom_m_button)();
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
class PackageItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          status: { type: "Unknown", optional: false },
          statusText: { type: String, optional: false },
          tagType: { type: String, optional: false },
          startTime: { type: String, optional: false },
          totalFlow: { type: String, optional: false },
          usedFlow: { type: String, optional: false },
          leftFlow: { type: String, optional: false }
        };
      },
      name: "PackageItem"
    };
  }
  constructor(options, metadata = PackageItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.status = this.__props__.status;
    this.statusText = this.__props__.statusText;
    this.tagType = this.__props__.tagType;
    this.startTime = this.__props__.startTime;
    this.totalFlow = this.__props__.totalFlow;
    this.usedFlow = this.__props__.usedFlow;
    this.leftFlow = this.__props__.leftFlow;
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
    const orderDates = common_vendor.ref(["2026-03-25", "2026-02-25", "2026-01-25"]);
    const packageList = common_vendor.ref([
      new PackageItem({ name: "车联网月包20G", status: "active", statusText: "在用", tagType: "success", startTime: "2026-04-01", totalFlow: "20GB", usedFlow: "11.34GB", leftFlow: "8.66GB" }),
      new PackageItem({ name: "车联网月包20G", status: "pending", statusText: "待生效", tagType: "warning", startTime: "2026-05-01", totalFlow: "20GB", usedFlow: "0GB", leftFlow: "20GB" }),
      new PackageItem({ name: "车联网月包20G", status: "pending", statusText: "待生效", tagType: "warning", startTime: "2026-06-01", totalFlow: "20GB", usedFlow: "0GB", leftFlow: "20GB" }),
      new PackageItem({ name: "车联网月包20G", status: "expired", statusText: "已失效", tagType: "danger", startTime: "2025-03-01", totalFlow: "20GB", usedFlow: "20GB", leftFlow: "0GB" }),
      new PackageItem({ name: "车联网月包20G", status: "expired", statusText: "已失效", tagType: "danger", startTime: "2025-02-01", totalFlow: "20GB", usedFlow: "20GB", leftFlow: "0GB" })
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
      var _a;
      current.value = (_a = e.getNumber("index")) !== null && _a !== void 0 ? _a : 0;
    };
    const changeTab = (e) => {
      active.value = e.index;
      activeName.value = e.item.name;
    };
    const showMore = () => {
      pkgMore.value = !pkgMore.value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    common_vendor.onLoad((options) => {
      var _a;
      const cardNumber = (_a = options.cardNumber) !== null && _a !== void 0 ? _a : "";
      card_number.value = cardNumber;
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "19"),
        b: common_vendor.p({
          title: "卡片详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-2bc48812"
        }),
        c: common_vendor.o(changeTab, "b7"),
        d: common_vendor.p({
          tabs: common_vendor.unref(tabs),
          itemWidth: "auto",
          padding: 0,
          currentTab: common_vendor.unref(active),
          unlined: true,
          bold: true,
          activeBgColor: "#eff6ff",
          activeBorderColor: "#bfdbfe",
          class: "data-v-2bc48812"
        }),
        e: common_vendor.t(common_vendor.unref(activeName)),
        f: common_vendor.unref(activeName) == "基本信息"
      }, common_vendor.unref(activeName) == "基本信息" ? common_vendor.e({
        g: common_vendor.t(common_vendor.unref(card_number)),
        h: !common_vendor.unref(pkgMore)
      }, !common_vendor.unref(pkgMore) ? {
        i: common_vendor.p({
          name: "arrow-down-filling",
          size: "20rpx",
          class: "data-v-2bc48812"
        })
      } : {
        j: common_vendor.p({
          name: "arrow-up-filling",
          size: "20rpx",
          class: "data-v-2bc48812"
        })
      }, {
        k: common_vendor.o(showMore, "e9"),
        l: common_vendor.unref(pkgMore)
      }, common_vendor.unref(pkgMore) ? {
        m: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-2bc48812"
        })
      } : {}) : {}, {
        n: common_vendor.unref(activeName) == "卡片套餐"
      }, common_vendor.unref(activeName) == "卡片套餐" ? {
        o: common_vendor.o(handleClick, "da"),
        p: common_vendor.p({
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
        q: common_vendor.f(common_vendor.unref(filteredPackageList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "2bc48812-6-" + i0,
            c: common_vendor.p({
              text: item.statusText,
              round: true,
              plain: true,
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
        r: common_vendor.unref(activeName) == "卡片订单"
      }, common_vendor.unref(activeName) == "卡片订单" ? {
        s: common_vendor.f(common_vendor.unref(orderDates), (date, k0, i0) => {
          return {
            a: "2bc48812-7-" + i0,
            b: common_vendor.t(date),
            c: date
          };
        }),
        t: common_vendor.p({
          text: "已完成",
          round: true,
          plain: true,
          size: "small",
          type: "success",
          class: "data-v-2bc48812"
        }),
        v: common_vendor.t(common_vendor.unref(card_number))
      } : {}, {
        w: common_vendor.p({
          type: "black",
          plain: true,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          class: "data-v-2bc48812"
        }),
        x: common_vendor.p({
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
        y: common_vendor.p({
          type: "primary",
          plain: false,
          margin: "0 20rpx",
          height: "70rpx",
          shape: "circle",
          bold: true,
          shadow: true,
          class: "data-v-2bc48812"
        }),
        z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        A: `${_ctx.u_s_b_h}px`,
        B: `${_ctx.u_s_a_i_b}px`,
        C: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bc48812"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardDetail/cardDetail.js.map
