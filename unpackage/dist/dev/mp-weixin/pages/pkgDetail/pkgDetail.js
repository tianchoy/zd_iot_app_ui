"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_progress_1 = common_vendor.resolveComponent("rice-progress");
  (_easycom_topNavBar_1 + _easycom_rice_progress_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_progress)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pkgDetail",
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(handleBack, "56"),
        b: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-36efee10"
        }),
        c: common_vendor.p({
          percentage: 60,
          ["show-text"]: true,
          class: "data-v-36efee10"
        }),
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36efee10"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pkgDetail/pkgDetail.js.map
