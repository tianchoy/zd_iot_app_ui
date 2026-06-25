"use strict";
const common_vendor = require("./vendor.js");
class AuthApiPaths extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          tenantId: { type: String, optional: false },
          clientId: { type: String, optional: false },
          grantType: { type: String, optional: false },
          appID: { type: String, optional: false }
        };
      },
      name: "AuthApiPaths"
    };
  }
  constructor(options, metadata = AuthApiPaths.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.tenantId = this.__props__.tenantId;
    this.clientId = this.__props__.clientId;
    this.grantType = this.__props__.grantType;
    this.appID = this.__props__.appID;
    delete this.__props__;
  }
}
class ApiPaths extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          auth: { type: AuthApiPaths, optional: false }
        };
      },
      name: "ApiPaths"
    };
  }
  constructor(options, metadata = ApiPaths.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.auth = this.__props__.auth;
    delete this.__props__;
  }
}
class ConfigInfo extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          versionCode: { type: Number, optional: false },
          versionName: { type: String, optional: false },
          appId: { type: String, optional: true },
          logo: { type: String, optional: true },
          desc: { type: String, optional: true }
        };
      },
      name: "ConfigInfo"
    };
  }
  constructor(options, metadata = ConfigInfo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.versionCode = this.__props__.versionCode;
    this.versionName = this.__props__.versionName;
    this.appId = this.__props__.appId;
    this.logo = this.__props__.logo;
    this.desc = this.__props__.desc;
    delete this.__props__;
  }
}
class StorageKeys extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          token: { type: String, optional: false },
          refreshToken: { type: String, optional: false }
        };
      },
      name: "StorageKeys"
    };
  }
  constructor(options, metadata = StorageKeys.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.token = this.__props__.token;
    this.refreshToken = this.__props__.refreshToken;
    delete this.__props__;
  }
}
class ProjectConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          baseUrl: { type: String, optional: false },
          timeout: { type: Number, optional: false },
          env: { type: String, optional: false },
          api: { type: ApiPaths, optional: false },
          storage: { type: StorageKeys, optional: false },
          configInfo: { type: ConfigInfo, optional: false },
          loginPagePath: { type: String, optional: true },
          loginRequiredPaths: { type: common_vendor.UTS.UTSType.withGenerics(Array, [String]), optional: true }
        };
      },
      name: "ProjectConfig"
    };
  }
  constructor(options, metadata = ProjectConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.baseUrl = this.__props__.baseUrl;
    this.timeout = this.__props__.timeout;
    this.env = this.__props__.env;
    this.api = this.__props__.api;
    this.storage = this.__props__.storage;
    this.configInfo = this.__props__.configInfo;
    this.loginPagePath = this.__props__.loginPagePath;
    this.loginRequiredPaths = this.__props__.loginRequiredPaths;
    delete this.__props__;
  }
}
const ENV = "prod";
const API_CONFIG = new common_vendor.UTSJSONObject({
  dev: new common_vendor.UTSJSONObject({
    baseUrl: "http://192.168.1.45:8081",
    timeout: 3e4
  }),
  prod: new common_vendor.UTSJSONObject({
    baseUrl: "https://cmpapp.zdiot.cn/prod-api",
    timeout: 3e4
  })
});
const currentConfig = API_CONFIG[ENV];
const config = new ProjectConfig(
  {
    baseUrl: currentConfig["baseUrl"],
    timeout: currentConfig["timeout"],
    env: ENV,
    api: new ApiPaths({
      auth: new AuthApiPaths({
        tenantId: "000000",
        clientId: "12353d4772a25656d6d2a67d53353cc3",
        grantType: "xcx",
        appID: "wxef277996acc166c3"
      })
    }),
    storage: new StorageKeys({
      token: "access_token",
      refreshToken: "refresh_token"
    }),
    configInfo: new ConfigInfo({
      logo: null,
      desc: null,
      name: "中导云卡",
      versionCode: 1,
      versionName: "1.0.0",
      appId: "your-app-id"
    }),
    loginPagePath: "",
    loginRequiredPaths: []
  }
  //获取租户ID
);
function getTenantId() {
  return config.api.auth.tenantId;
}
function getToken() {
  const token = common_vendor.index.getStorageSync(config.storage.token);
  if (token == null) {
    return "";
  }
  return token;
}
function setToken(token, refreshToken = "") {
  common_vendor.index.setStorageSync(config.storage.token, token);
  if (refreshToken.length > 0) {
    common_vendor.index.setStorageSync(config.storage.refreshToken, refreshToken);
  }
}
function clearToken() {
  common_vendor.index.removeStorageSync(config.storage.token);
  common_vendor.index.removeStorageSync(config.storage.refreshToken);
}
function setStorageSync(key, value = null) {
  common_vendor.index.setStorageSync(key, value);
}
exports.clearToken = clearToken;
exports.config = config;
exports.getTenantId = getTenantId;
exports.getToken = getToken;
exports.setStorageSync = setStorageSync;
exports.setToken = setToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/config.js.map
