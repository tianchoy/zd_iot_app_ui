"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_mUnix_components_mTools_Request = require("../uni_modules/m-unix/components/m-tools/Request.js");
const common_config = require("../common/config.js");
class ApiResponse extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          data: { type: "Unknown", optional: false },
          message: { type: String, optional: false },
          timestamp: { type: Number, optional: true }
        };
      },
      name: "ApiResponse"
    };
  }
  constructor(options, metadata = ApiResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.data = this.__props__.data;
    this.message = this.__props__.message;
    this.timestamp = this.__props__.timestamp;
    delete this.__props__;
  }
}
class RequestConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          showLoading: { type: Boolean, optional: true },
          loadingText: { type: String, optional: true },
          showError: { type: Boolean, optional: true },
          needAuth: { type: Boolean, optional: true }
        };
      },
      name: "RequestConfig"
    };
  }
  constructor(options, metadata = RequestConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.showLoading = this.__props__.showLoading;
    this.loadingText = this.__props__.loadingText;
    this.showError = this.__props__.showError;
    this.needAuth = this.__props__.needAuth;
    delete this.__props__;
  }
}
const defaultConfig = new common_vendor.UTSJSONObject(
  {
    showLoading: true,
    loadingText: "加载中...",
    showError: true,
    needAuth: false
  }
  // 加载状态
);
let loadingCount = 0;
let loadingTimer = null;
function showLoading(text) {
  if (loadingCount === 0) {
    loadingTimer = setTimeout(() => {
      common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: text, mask: true }));
    }, 200);
  }
  loadingCount++;
}
function hideLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    loadingCount = 0;
    if (loadingTimer !== null) {
      clearTimeout(loadingTimer);
      loadingTimer = null;
    }
    common_vendor.index.hideLoading();
  }
}
function request(url, method, data = null, requestConfig = null) {
  return common_vendor.__awaiter(this, void 0, void 0, function* () {
    const reqConfig = new common_vendor.UTSJSONObject(Object.assign(Object.assign({}, defaultConfig), requestConfig));
    if (reqConfig.needAuth) {
      const token = common_config.getToken();
      if (!token) {
        return Promise.reject(new Error("未登录"));
      }
    }
    if (reqConfig.showLoading) {
      showLoading(reqConfig.loadingText || "加载中...");
    }
    try {
      const header = {
        "Content-Type": "application/json"
      };
      if (reqConfig.needAuth) {
        const token = common_config.getToken();
        if (token) {
          header["Authorization"] = `Bearer ${token}`;
        }
      }
      let response = null;
      if (method === "GET") {
        response = yield uni_modules_mUnix_components_mTools_Request.http.get(url, data);
      } else if (method === "POST") {
        response = yield uni_modules_mUnix_components_mTools_Request.http.post(url, data);
      } else if (method === "PUT") {
        response = yield uni_modules_mUnix_components_mTools_Request.http.put(url, data);
      } else {
        response = yield uni_modules_mUnix_components_mTools_Request.http.delete(url, data);
      }
      const result = response.data;
      if (result.code === 401) {
        common_config.clearToken();
        common_vendor.index.navigateTo({ url: "/pages/index/index" });
        if (reqConfig.showError) {
          common_vendor.index.showToast({
            title: "登录已过期，请重新登录",
            icon: "none"
          });
        }
        return Promise.reject(result);
      }
      if (result.code !== 200 && result.code !== 0) {
        if (reqConfig.showError) {
          common_vendor.index.showToast({
            title: result.message || "请求失败",
            icon: "none"
          });
        }
        return Promise.reject(result);
      }
      return result;
    } catch (error) {
      if (reqConfig.showError) {
        common_vendor.index.showToast({
          title: error.message || "网络错误",
          icon: "none"
        });
      }
      throw error;
    } finally {
      if (reqConfig.showLoading) {
        hideLoading();
      }
    }
  });
}
function get(url, params = null, config = null) {
  return request(url, "GET", params, config);
}
function post(url, data = null, config = null) {
  return request(url, "POST", data, config);
}
function put(url, data = null, config = null) {
  return request(url, "PUT", data, config);
}
function del(url, data = null, config = null) {
  return request(url, "DELETE", data, config);
}
new common_vendor.UTSJSONObject({
  get,
  post,
  put,
  delete: del
});
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/request.js.map
