"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  _easycom_topNavBar_1();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
if (!Math) {
  _easycom_topNavBar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "scanCode",
  setup(__props) {
    const goBackWithResult = (result) => {
      common_vendor.index.$emit("scanResult", new common_vendor.UTSJSONObject({ result }));
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    const handleBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    const startScanWx = () => {
      common_vendor.index.scanCode(new common_vendor.UTSJSONObject({
        onlyFromCamera: true,
        scanType: ["qrCode", "barCode"],
        success: (res) => {
          goBackWithResult(res.result);
        },
        fail: (err) => {
          setTimeout(() => {
            common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
          }, 300);
        }
      }));
    };
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        startScanWx();
      });
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(handleBack, "af"),
        b: common_vendor.p({
          title: "扫一扫",
          ["show-back"]: true,
          backgroundColor: "#000000",
          textColor: "#ffffff",
          showCapsule: false,
          class: "data-v-5d02dbc4"
        }),
        c: `${_ctx.u_s_b_h}px`,
        d: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5d02dbc4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scanCode/scanCode.js.map
