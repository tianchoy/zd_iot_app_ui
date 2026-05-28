"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  (_easycom_topNavBar_1 + _easycom_m_icon_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const title = common_vendor.ref("用户");
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "我的",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-284ae985"
        }),
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        d: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        e: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        f: `${_ctx.u_s_b_h}px`,
        g: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
