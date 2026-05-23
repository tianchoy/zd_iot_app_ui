"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_Storage = require("./Storage.js");
const uni_modules_mUnix_components_mTools_AuthNotifier = require("./AuthNotifier.js");
function useAuth() {
  const hasLogin = common_vendor.computed(() => {
    uni_modules_mUnix_components_mTools_AuthNotifier.authTrigger.value;
    const token = uni_modules_mUnix_components_mTools_Storage.storage.getToken();
    const info = uni_modules_mUnix_components_mTools_Storage.storage.getUserInfo();
    return token != "" || info != null;
  });
  const userInfo = common_vendor.computed(() => {
    var _a;
    uni_modules_mUnix_components_mTools_AuthNotifier.authTrigger.value;
    return (_a = uni_modules_mUnix_components_mTools_Storage.storage.getUserInfo()) !== null && _a !== void 0 ? _a : new common_vendor.UTSJSONObject({});
  });
  return new common_vendor.UTSJSONObject({ hasLogin, userInfo });
}
exports.useAuth = useAuth;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/useAuth.js.map
