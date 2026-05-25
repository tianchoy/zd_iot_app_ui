"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_div_1 = common_vendor.resolveComponent("m-div");
  (_easycom_topNavBar_1 + _easycom_m_icon_1 + _easycom_m_button_1 + _easycom_m_tag_1 + _easycom_m_div_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_div = () => "../../uni_modules/m-unix/components/m-div/m-div.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon + _easycom_m_button + _easycom_m_tag + _easycom_m_div + common_vendor.unref(customService))();
}
const customService = () => "../../components/customService/customService.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello");
    common_vendor.ref(false);
    const card_number = common_vendor.ref("");
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "首页",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false
        }),
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.unref(card_number),
        d: common_vendor.o(($event) => {
          return common_vendor.isRef(card_number) ? card_number.value = $event.detail.value : null;
        }, "65"),
        e: common_vendor.p({
          name: "scanning",
          size: "40rpx"
        }),
        f: common_vendor.p({
          type: "white",
          plain: true,
          width: "90rpx",
          class: "scan-btn"
        }),
        g: common_vendor.p({
          type: "primary",
          width: "120rpx"
        }),
        h: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary"
        }),
        i: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider"
        }),
        j: common_vendor.p({
          type: "primary",
          width: "200rpx",
          btnSize: "mini",
          size: "25rpx",
          shape: "circle"
        }),
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        l: `${_ctx.u_s_b_h}px`,
        m: `${_ctx.u_s_a_i_b}px`,
        n: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
