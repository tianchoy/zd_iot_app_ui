"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_mUnix_index = require("./uni_modules/m-unix/index.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.uvue:19", "App Launch");
    });
    common_vendor.onAppShow(() => {
      common_vendor.index.__f__("log", "at App.uvue:23", "App Show");
    });
    common_vendor.onAppHide(() => {
      common_vendor.index.__f__("log", "at App.uvue:27", "App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_mUnix_index.mUnix);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
