"use strict";
const common_vendor = require("../common/vendor.js");
const api_ProjectConfig = require("./ProjectConfig.js");
const api_AuthNotifier = require("./AuthNotifier.js");
function tokenKey() {
  return api_ProjectConfig.getHostProjectConfig().storage.token;
}
function userInfoKey() {
  return api_ProjectConfig.getHostProjectConfig().storage.userInfo;
}
class StorageApi extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          get: { type: "Unknown", optional: false },
          set: { type: "Unknown", optional: false },
          remove: { type: "Unknown", optional: false },
          clear: { type: "Unknown", optional: false },
          getToken: { type: "Unknown", optional: false },
          setToken: { type: "Unknown", optional: false },
          getUserInfo: { type: "Unknown", optional: false },
          setUserInfo: { type: "Unknown", optional: false },
          clearAuth: { type: "Unknown", optional: false }
        };
      },
      name: "StorageApi"
    };
  }
  constructor(options, metadata = StorageApi.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.get = this.__props__.get;
    this.set = this.__props__.set;
    this.remove = this.__props__.remove;
    this.clear = this.__props__.clear;
    this.getToken = this.__props__.getToken;
    this.setToken = this.__props__.setToken;
    this.getUserInfo = this.__props__.getUserInfo;
    this.setUserInfo = this.__props__.setUserInfo;
    this.clearAuth = this.__props__.clearAuth;
    delete this.__props__;
  }
}
function storageGet(key) {
  try {
    const val = common_vendor.index.getStorageSync(key);
    return val;
  } catch (e) {
    return null;
  }
}
function storageSet(key, value = null) {
  try {
    common_vendor.index.setStorageSync(key, value);
  } catch (e) {
    common_vendor.index.__f__("error", "at api/Storage.uts:41", "storage set error", e);
  }
}
function storageRemove(key) {
  try {
    common_vendor.index.removeStorageSync(key);
  } catch (e) {
    common_vendor.index.__f__("error", "at api/Storage.uts:49", "storage remove error", e);
  }
}
function storageClear() {
  try {
    common_vendor.index.clearStorageSync();
  } catch (e) {
    common_vendor.index.__f__("error", "at api/Storage.uts:57", "storage clear error", e);
  }
}
const storage = new StorageApi({
  get(key) {
    return storageGet(key);
  },
  set(key, value = null) {
    storageSet(key, value);
  },
  remove(key) {
    storageRemove(key);
  },
  clear() {
    storageClear();
  },
  // 快捷方法
  getToken() {
    const token = storageGet(tokenKey());
    return token != null ? token : "";
  },
  setToken(token) {
    storageSet(tokenKey(), token);
    api_AuthNotifier.notifyAuthChange();
  },
  getUserInfo() {
    return storageGet(userInfoKey());
  },
  setUserInfo(info = null) {
    storageSet(userInfoKey(), info);
    api_AuthNotifier.notifyAuthChange();
  },
  clearAuth() {
    storageRemove(tokenKey());
    storageRemove(userInfoKey());
    api_AuthNotifier.notifyAuthChange();
  }
});
exports.storage = storage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/Storage.js.map
