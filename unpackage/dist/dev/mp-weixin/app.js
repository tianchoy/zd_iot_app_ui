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
  "./pages/pkgDetail/pkgDetail.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    let updateManager = null;
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.uvue:24", "App Launch");
      if (common_vendor.index.canIUse("getUpdateManager")) {
        updateManager = common_vendor.index.getUpdateManager();
        if (updateManager) {
          updateManager.onCheckForUpdate((res = null) => {
            common_vendor.index.__f__("log", "at App.uvue:34", "检查更新结果:", res);
            if (res.hasUpdate) {
              common_vendor.index.__f__("log", "at App.uvue:37", "发现新版本，正在后台下载...");
              common_vendor.index.showLoading(new common_vendor.UTSJSONObject({
                title: "下载新版本中"
              }));
            }
          });
          updateManager.onUpdateReady(() => {
            common_vendor.index.__f__("log", "at App.uvue:46", "新版本下载完成");
            common_vendor.index.hideLoading();
            common_vendor.index.showModal(new common_vendor.UTSJSONObject({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              confirmText: "立即重启",
              cancelText: "稍后再说",
              success: (res = null) => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            }));
          });
          updateManager.onUpdateFailed(() => {
            common_vendor.index.__f__("error", "at App.uvue:66", "新版本下载失败");
            common_vendor.index.hideLoading();
            common_vendor.index.showModal(new common_vendor.UTSJSONObject({
              title: "更新失败",
              content: "新版本下载失败，请检查网络设置或稍后再试",
              showCancel: false,
              confirmText: "知道了"
            }));
          });
        }
      } else {
        common_vendor.index.showModal(new common_vendor.UTSJSONObject({
          title: "提示",
          content: "当前微信版本过低，无法使用自动更新功能，请升级到最新微信版本后重试。",
          showCancel: false
        }));
      }
    });
    common_vendor.onAppShow(() => {
      common_vendor.index.__f__("log", "at App.uvue:90", "App Show");
    });
    common_vendor.onAppHide(() => {
      common_vendor.index.__f__("log", "at App.uvue:94", "App Hide");
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
