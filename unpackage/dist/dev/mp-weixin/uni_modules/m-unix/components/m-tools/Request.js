"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("./ProjectConfig.js");
const uni_modules_mUnix_components_mTools_Storage = require("./Storage.js");
const uni_modules_mUnix_components_mTools_Upload = require("./Upload.js");
class AnyRecord extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {};
      },
      name: "AnyRecord"
    };
  }
  constructor(options, metadata = AnyRecord.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    delete this.__props__;
  }
}
class ApiResponse extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: "Unknown", optional: false }
        };
      },
      name: "ApiResponse"
    };
  }
  constructor(options, metadata = ApiResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class RequestOptions extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: false },
          method: { type: "Unknown", optional: true },
          data: { type: AnyRecord, optional: true },
          header: { type: AnyRecord, optional: true },
          baseUrl: { type: String, optional: true },
          timeout: { type: Number, optional: true },
          withToken: { type: Boolean, optional: true },
          showError: { type: Boolean, optional: true },
          showLoading: { type: Boolean, optional: true },
          loadingText: { type: String, optional: true },
          redirectOnUnauthorized: { type: Boolean, optional: true },
          loginPage: { type: String, optional: true },
          successCodes: { type: common_vendor.UTS.UTSType.withGenerics(Array, [Number]), optional: true },
          unauthorizedCodes: { type: common_vendor.UTS.UTSType.withGenerics(Array, [Number]), optional: true },
          onErrorCode: { type: "Unknown", optional: true }
        };
      },
      name: "RequestOptions"
    };
  }
  constructor(options, metadata = RequestOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.url = this.__props__.url;
    this.method = this.__props__.method;
    this.data = this.__props__.data;
    this.header = this.__props__.header;
    this.baseUrl = this.__props__.baseUrl;
    this.timeout = this.__props__.timeout;
    this.withToken = this.__props__.withToken;
    this.showError = this.__props__.showError;
    this.showLoading = this.__props__.showLoading;
    this.loadingText = this.__props__.loadingText;
    this.redirectOnUnauthorized = this.__props__.redirectOnUnauthorized;
    this.loginPage = this.__props__.loginPage;
    this.successCodes = this.__props__.successCodes;
    this.unauthorizedCodes = this.__props__.unauthorizedCodes;
    this.onErrorCode = this.__props__.onErrorCode;
    delete this.__props__;
  }
}
class QuickRequestParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: false },
          data: { type: AnyRecord, optional: true },
          options: { type: RequestOptions, optional: true }
        };
      },
      name: "QuickRequestParams"
    };
  }
  constructor(options, metadata = QuickRequestParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.url = this.__props__.url;
    this.data = this.__props__.data;
    this.options = this.__props__.options;
    delete this.__props__;
  }
}
const DEFAULT_TIMEOUT = 3e4;
const DEFAULT_SUCCESS_CODES = [0, 200];
const DEFAULT_UNAUTHORIZED_CODES = [401, 403];
const DEFAULT_LOGIN_PAGE = "/pages_Me/login/login";
function buildUrl(url, baseUrl) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return baseUrl + (url.startsWith("/") ? "" : "/") + url;
}
function buildQueryString(data) {
  const parts = [];
  for (const key in data) {
    const value = data[key];
    if (value != null && value !== "") {
      parts.push(key + "=" + encodeURIComponent(String(value)));
    }
  }
  return parts.length > 0 ? "?" + parts.join("&") : "";
}
function showLoadingModal(text) {
  common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: text, mask: true }));
}
function hideLoadingModal() {
  common_vendor.index.hideLoading();
}
function showErrorToast(msg) {
  common_vendor.index.showToast({ title: msg || "请求失败", icon: "none" });
}
function navigateToLogin(loginPage) {
  uni_modules_mUnix_components_mTools_Storage.storage.clearAuth();
  common_vendor.index.showToast({ title: "请先登录", icon: "none" });
  setTimeout(() => {
    common_vendor.index.navigateTo({ url: loginPage });
  }, 1200);
}
function request(options) {
  const url = options.url, _a = options.method, method = _a == void 0 ? "GET" : _a, data = options.data, header = options.header, baseUrl = options.baseUrl, _b = options.timeout, timeout = _b == void 0 ? DEFAULT_TIMEOUT : _b, _c = options.withToken, withToken = _c == void 0 ? true : _c, _d = options.showError, showError = _d == void 0 ? true : _d, _e = options.showLoading, showLoading = _e == void 0 ? false : _e, loadingText = options.loadingText, _f = options.redirectOnUnauthorized, redirectOnUnauthorized = _f == void 0 ? true : _f, loginPage = options.loginPage, successCodes = options.successCodes, unauthorizedCodes = options.unauthorizedCodes, onErrorCode = options.onErrorCode;
  if (showLoading) {
    showLoadingModal(loadingText !== null && loadingText !== void 0 ? loadingText : "加载中...");
  }
  const base = baseUrl !== null && baseUrl !== void 0 ? baseUrl : uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().baseUrl;
  let fullUrl = buildUrl(url, base);
  let requestData = data;
  if (method === "GET" && data != null) {
    fullUrl += buildQueryString(data);
    requestData = new common_vendor.UTSJSONObject({});
  }
  const reqHeader = new common_vendor.UTSJSONObject(Object.assign({ "Content-Type": "application/json" }, header));
  if (withToken) {
    const token = uni_modules_mUnix_components_mTools_Storage.storage.getToken();
    if (token != "") {
      reqHeader["Authorization"] = token;
    }
  }
  const finalSuccessCodes = successCodes !== null && successCodes !== void 0 ? successCodes : DEFAULT_SUCCESS_CODES;
  const finalUnauthorizedCodes = unauthorizedCodes !== null && unauthorizedCodes !== void 0 ? unauthorizedCodes : DEFAULT_UNAUTHORIZED_CODES;
  const hpLogin = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().loginPagePath;
  const finalLoginPage = loginPage !== null && loginPage !== void 0 ? loginPage : hpLogin.length > 0 ? hpLogin : DEFAULT_LOGIN_PAGE;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: fullUrl,
      method,
      data: requestData,
      header: reqHeader,
      timeout,
      success: (res) => {
        if (showLoading) {
          hideLoadingModal();
        }
        const result = res.data;
        const code = result.code, msg = result.msg;
        result.data;
        if (finalSuccessCodes.indexOf(code) >= 0) {
          resolve(result);
          return null;
        }
        if (finalUnauthorizedCodes.indexOf(code) >= 0) {
          if (redirectOnUnauthorized) {
            navigateToLogin(finalLoginPage);
          }
          reject(result);
          return null;
        }
        if (onErrorCode != null) {
          onErrorCode(result);
        }
        if (showError) {
          showErrorToast(msg);
        }
        reject(result);
      },
      fail: (err) => {
        if (showLoading) {
          hideLoadingModal();
        }
        if (showError) {
          showErrorToast("网络异常，请检查网络连接");
        }
        reject(new ApiResponse({
          code: -1,
          msg: "网络异常",
          data: null
        }));
      }
    });
  });
}
function get(url, data = null, options = null) {
  return request(new RequestOptions(Object.assign({ header: null, baseUrl: null, timeout: null, withToken: null, showError: null, showLoading: null, loadingText: null, redirectOnUnauthorized: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null, url, method: "GET", data }, options)));
}
function post(url, data = null, options = null) {
  return request(new RequestOptions(Object.assign({ header: null, baseUrl: null, timeout: null, withToken: null, showError: null, showLoading: null, loadingText: null, redirectOnUnauthorized: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null, url, method: "POST", data }, options)));
}
function put(url, data = null, options = null) {
  return request(new RequestOptions(Object.assign({ header: null, baseUrl: null, timeout: null, withToken: null, showError: null, showLoading: null, loadingText: null, redirectOnUnauthorized: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null, url, method: "PUT", data }, options)));
}
function del(url, data = null, options = null) {
  return request(new RequestOptions(Object.assign({ header: null, baseUrl: null, timeout: null, withToken: null, showError: null, showLoading: null, loadingText: null, redirectOnUnauthorized: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null, url, method: "DELETE", data }, options)));
}
function publicRequest(options) {
  return request(new RequestOptions(Object.assign(Object.assign({ url: null, method: null, data: null, header: null, baseUrl: null, timeout: null, showError: null, showLoading: null, loadingText: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null }, options), { withToken: false, redirectOnUnauthorized: false })));
}
function silentRequest(options) {
  return request(new RequestOptions(Object.assign(Object.assign({ url: null, method: null, data: null, header: null, baseUrl: null, timeout: null, withToken: null, showLoading: null, loadingText: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null }, options), { showError: false, redirectOnUnauthorized: false })));
}
function loadingRequest(options, loadingText = null) {
  return request(new RequestOptions(Object.assign(Object.assign({ url: null, method: null, data: null, header: null, baseUrl: null, timeout: null, withToken: null, showError: null, redirectOnUnauthorized: null, loginPage: null, successCodes: null, unauthorizedCodes: null, onErrorCode: null }, options), { showLoading: true, loadingText: loadingText || "加载中..." })));
}
const http = new common_vendor.UTSJSONObject(
  {
    /** GET 请求 */
    get(url, data = null, options = null) {
      return get(url, data, options);
    },
    /** POST 请求 */
    post(url, data = null, options = null) {
      return post(url, data, options);
    },
    /** PUT 请求 */
    put(url, data = null, options = null) {
      return put(url, data, options);
    },
    /** DELETE 请求 */
    delete(url, data = null, options = null) {
      return del(url, data, options);
    },
    /** 公开请求（不需要登录） */
    public(options) {
      return publicRequest(options);
    },
    /** 静默请求（不显示提示） */
    silent(options) {
      return silentRequest(options);
    },
    /** 带加载提示的请求 */
    loading(options, loadingText = null) {
      return loadingRequest(options, loadingText);
    },
    /** multipart 上传单个文件（实现见 Upload.uts） */
    upload(options = null) {
      return uni_modules_mUnix_components_mTools_Upload.uploadFileRequest(options);
    }
  }
  // ========== 默认导出 ==========
);
new common_vendor.UTSJSONObject({
  request,
  get,
  post,
  put,
  delete: del,
  public: publicRequest,
  silent: silentRequest,
  loading: loadingRequest,
  http
});
exports.http = http;
exports.request = request;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/Request.js.map
