"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_Storage = require("./Storage.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("./ProjectConfig.js");
function isLoggedIn() {
  return uni_modules_mUnix_components_mTools_Storage.storage.getToken() != "";
}
function checkLogin(toPath = null) {
  if (isLoggedIn())
    return true;
  const lp = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().loginPagePath;
  const loginPath = lp.length > 0 ? lp : "/pages_Me/login/login";
  const url = toPath != null && toPath != "" ? loginPath + "?redirect=" + encodeURIComponent(toPath) : loginPath;
  common_vendor.index.navigateTo({ url });
  return false;
}
function needLogin(path) {
  const p = path.replace(/^\//, "").replace(/\.uvue$/, "");
  return uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().loginRequiredPaths.some((r) => {
    return p.includes(r);
  });
}
exports.checkLogin = checkLogin;
exports.isLoggedIn = isLoggedIn;
exports.needLogin = needLogin;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/Auth.js.map
