"use strict";
const common_vendor = require("../common/vendor.js");
const common_config = require("../common/config.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("../uni_modules/m-unix/components/m-tools/ProjectConfig.js");
const mUnixConfig = new common_vendor.UTSJSONObject({
  env: common_config.config.env,
  baseUrl: common_config.config.baseUrl,
  storage: new common_vendor.UTSJSONObject({
    token: common_config.config.storage.token,
    userInfo: "userInfo"
  }),
  loginRequiredPaths: common_config.config.loginRequiredPaths,
  loginPagePath: common_config.config.loginPagePath,
  api: new common_vendor.UTSJSONObject({}),
  configInfo: new common_vendor.UTSJSONObject({
    name: common_config.config.configInfo.name,
    logo: common_config.config.configInfo.logo,
    desc: common_config.config.configInfo.desc,
    versionCode: common_config.config.configInfo.versionCode,
    versionName: common_config.config.configInfo.versionName
  }),
  mUi: null
});
uni_modules_mUnix_components_mTools_ProjectConfig.injectMUnixHostProjectConfig(mUnixConfig);
const injectedConfig = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig();
common_vendor.index.__f__("log", "at utils/inject-m-unix.uts:30", "配置注入成功:", injectedConfig.baseUrl);
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/inject-m-unix.js.map
