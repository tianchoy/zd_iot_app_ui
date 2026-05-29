"use strict";
const common_vendor = require("./vendor.js");
const ENV = "prod";
const API_CONFIG = new common_vendor.UTSJSONObject({
  local: new common_vendor.UTSJSONObject({
    baseUrl: "http://localhost:3000/api",
    timeout: 3e4
  }),
  dev: new common_vendor.UTSJSONObject({
    baseUrl: "https://dev-api.yourdomain.com/api",
    timeout: 3e4
  }),
  prod: new common_vendor.UTSJSONObject({
    baseUrl: "https://api.yourdomain.com/api",
    timeout: 3e4
  })
});
const currentConfig = API_CONFIG[ENV];
const config = {
  baseUrl: currentConfig.baseUrl,
  timeout: currentConfig.timeout,
  env: ENV,
  api: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      refreshToken: "/auth/refresh"
    },
    user: {
      profile: "/user/profile",
      update: "/user/update",
      list: "/user/list"
    },
    article: {
      list: "/article/list",
      detail: "/article/detail",
      create: "/article/create",
      update: "/article/update",
      delete: "/article/delete"
    },
    upload: {
      image: "/upload/image",
      file: "/upload/file"
    }
  },
  storage: {
    token: "access_token",
    refreshToken: "refresh_token",
    userInfo: "user_info"
  },
  configInfo: {
    name: "我的应用",
    versionCode: 1,
    versionName: "1.0.0",
    appId: "your-app-id"
  },
  loginPagePath: "/pages/login/login",
  loginRequiredPaths: ["/pages/user", "/pages/order"]
};
function getToken() {
  return common_vendor.index.getStorageSync(config.storage.token) || "";
}
function clearToken() {
  common_vendor.index.removeStorageSync(config.storage.token);
  common_vendor.index.removeStorageSync(config.storage.refreshToken);
  common_vendor.index.removeStorageSync(config.storage.userInfo);
}
exports.clearToken = clearToken;
exports.config = config;
exports.getToken = getToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/config.js.map
