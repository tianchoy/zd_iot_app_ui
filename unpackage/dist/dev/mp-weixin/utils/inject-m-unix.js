"use strict";
const common_vendor = require("../common/vendor.js");
const common_config = require("../common/config.js");
const api_ProjectConfig = require("../api/ProjectConfig.js");
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
api_ProjectConfig.injectMUnixHostProjectConfig(mUnixConfig);
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/inject-m-unix.js.map
