"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_popup_1 = common_vendor.resolveComponent("m-popup");
  (_easycom_m_icon_1 + _easycom_m_button_1 + _easycom_m_popup_1)();
}
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_popup = () => "../../uni_modules/m-unix/components/m-popup/m-popup.js";
if (!Math) {
  (_easycom_m_icon + _easycom_m_button + _easycom_m_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const show = common_vendor.ref(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.p({
          name: "print",
          size: "40rpx"
        }),
        c: common_vendor.o(($event) => {
          return show.value = true;
        }, "3a"),
        d: common_vendor.p({
          type: "primary"
        }),
        e: common_vendor.o(($event) => {
          return show.value = false;
        }, "d2"),
        f: common_vendor.p({
          show: common_vendor.unref(show),
          position: "bottom",
          round: true,
          closeable: true
        }),
        g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        h: `${_ctx.u_s_b_h}px`,
        i: `${_ctx.u_s_a_i_b}px`,
        j: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
