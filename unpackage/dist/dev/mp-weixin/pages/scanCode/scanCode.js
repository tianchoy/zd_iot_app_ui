"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "scanCode",
  setup(__props) {
    const goBackWithResult = (result) => {
      common_vendor.index.__f__("log", "at pages/scanCode/scanCode.uvue:38", "扫码结果:", result);
      common_vendor.index.$emit("scanResult", new common_vendor.UTSJSONObject({ result }));
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    common_vendor.onMounted(() => {
      setTimeout(() => {
        common_vendor.index.scanCode(new common_vendor.UTSJSONObject({
          onlyFromCamera: true,
          scanType: ["qrCode", "barCode"],
          success: (res) => {
            common_vendor.index.__f__("log", "at pages/scanCode/scanCode.uvue:73", "小程序扫码成功:", res.result);
            goBackWithResult(res.result);
          },
          fail: (err) => {
            common_vendor.index.__f__("log", "at pages/scanCode/scanCode.uvue:77", "小程序扫码失败或取消:", err);
            common_vendor.index.showToast({
              title: "扫码失败或已取消",
              icon: "none",
              duration: 1500,
              complete: () => {
                setTimeout(() => {
                  common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
                }, 500);
              }
            });
          }
        }));
      }, 100);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        b: `${_ctx.u_s_b_h}px`,
        c: `${_ctx.u_s_a_i_b}px`,
        d: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5d02dbc4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scanCode/scanCode.js.map
