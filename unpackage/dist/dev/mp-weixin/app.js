"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./utils/inject-m-unix.js");
const i18n_index = require("./i18n/index.js");
require("./common/config.js");
if (!Math) {
  "./pages/card/card.js";
  "./pages/recharge/recharge.js";
  "./pages/mine/mine.js";
  "./pages/cardDetail/cardDetail.js";
  "./pages/paySuccess/paySuccess.js";
  "./pages/payFailed/payFailed.js";
  "./pages/myOrder/myOrder.js";
  "./pages/orderDetail/orderDetail.js";
  "./pages/scanCode/scanCode.js";
  "./pages/h5Search/h5Search.js";
  "./pages/orderRecord/orderRecord.js";
  "./pages/myPkg/myPkg.js";
  "./pages/login/login.js";
  "./uni_modules/rice-ui/pages/action-sheet/action-sheet.js";
  "./uni_modules/rice-ui/pages/dialog/dialog.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.uvue:22", "App Launch");
    });
    common_vendor.onAppShow(() => {
      common_vendor.index.__f__("log", "at App.uvue:26", "App Show");
    });
    common_vendor.onAppHide(() => {
      common_vendor.index.__f__("log", "at App.uvue:30", "App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(i18n_index.i18n);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
