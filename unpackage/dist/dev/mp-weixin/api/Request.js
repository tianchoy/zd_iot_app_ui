"use strict";
const common_vendor = require("../common/vendor.js");
const api_ProjectConfig = require("./ProjectConfig.js");
const api_Storage = require("./Storage.js");
const api_Upload = require("./Upload.js");
const common_config = require("../common/config.js");
var _a;
class ApiResponse extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: "Unknown", optional: false },
          rows: { type: common_vendor.UTS.UTSType.withGenerics(Array, ["Any"]), optional: true },
          total: { type: Number, optional: true }
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
    this.rows = this.__props__.rows;
    this.total = this.__props__.total;
    delete this.__props__;
  }
}
const systemInfo = common_vendor.index.getSystemInfoSync();
const DEFAULT_LANGUAGE = ((_a = systemInfo.language) !== null && _a !== void 0 ? _a : "zh_CN").replace("-", "_");
common_config.setStorageSync("uVueI18nLocale", systemInfo.language.replace("_", "-"));
class RequestOptions extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: false },
          method: { type: "Unknown", optional: true },
          data: { type: "Unknown", optional: true },
          header: { type: "Unknown", optional: true },
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
          data: { type: "Unknown", optional: true },
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
const DEFAULT_LOGIN_PAGE = "/pages/card/card";
function buildUrl(url, baseUrl) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return baseUrl + (url.startsWith("/") ? "" : "/") + url;
}
function buildQueryString(data) {
  if (!data)
    return "";
  const parts = [];
  for (const key in data) {
    const value = data[key];
    if (value != null && value !== "") {
      let strValue = "";
      if (typeof value === "string") {
        strValue = value;
      } else if (typeof value === "number") {
        strValue = value.toString();
      } else if (typeof value === "boolean") {
        strValue = value.toString();
      } else {
        strValue = common_vendor.UTS.JSON.stringify(value);
      }
      parts.push(key + "=" + encodeURIComponent(strValue));
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
let isRedirectingToLogin = false;
function navigateToLogin(loginPage) {
  if (isRedirectingToLogin) {
    return null;
  }
  isRedirectingToLogin = true;
  common_config.clearToken();
  api_Storage.storage.clearAuth();
  common_vendor.index.showToast({ title: "登录已过期，请重新登录", icon: "none" });
  setTimeout(() => {
    common_vendor.index.reLaunch({ url: loginPage });
    isRedirectingToLogin = false;
  }, 1200);
}
function createRequestOptions(url, method, data = null, options = null) {
  const out = new RequestOptions({
    header: null,
    baseUrl: null,
    timeout: null,
    withToken: null,
    showError: null,
    showLoading: null,
    loadingText: null,
    redirectOnUnauthorized: null,
    loginPage: null,
    successCodes: null,
    unauthorizedCodes: null,
    onErrorCode: null,
    url,
    method,
    data
  });
  if (options == null) {
    return out;
  }
  if (options.header != null) {
    out.header = options.header;
  }
  if (options.baseUrl != null) {
    out.baseUrl = options.baseUrl;
  }
  if (options.timeout != null) {
    out.timeout = options.timeout;
  }
  if (options.withToken != null) {
    out.withToken = options.withToken;
  }
  if (options.showError != null) {
    out.showError = options.showError;
  }
  if (options.showLoading != null) {
    out.showLoading = options.showLoading;
  }
  if (options.loadingText != null) {
    out.loadingText = options.loadingText;
  }
  if (options.redirectOnUnauthorized != null) {
    out.redirectOnUnauthorized = options.redirectOnUnauthorized;
  }
  if (options.loginPage != null) {
    out.loginPage = options.loginPage;
  }
  if (options.successCodes != null) {
    out.successCodes = options.successCodes;
  }
  if (options.unauthorizedCodes != null) {
    out.unauthorizedCodes = options.unauthorizedCodes;
  }
  if (options.onErrorCode != null) {
    out.onErrorCode = options.onErrorCode;
  }
  return out;
}
function copyRequestOptions(options) {
  var _a2;
  return createRequestOptions(options.url, (_a2 = options.method) !== null && _a2 !== void 0 ? _a2 : "GET", options.data, options);
}
function request(options) {
  const url = options.url, _a2 = options.method, method = _a2 == void 0 ? "GET" : _a2, data = options.data;
  options.header;
  const baseUrl = options.baseUrl, _b = options.timeout, timeout = _b == void 0 ? DEFAULT_TIMEOUT : _b, _c = options.withToken, withToken = _c == void 0 ? false : _c, _d = options.showError, showError = _d == void 0 ? true : _d, _e = options.showLoading, showLoading = _e == void 0 ? false : _e, loadingText = options.loadingText, _f = options.redirectOnUnauthorized, redirectOnUnauthorized = _f == void 0 ? true : _f, loginPage = options.loginPage, successCodes = options.successCodes, unauthorizedCodes = options.unauthorizedCodes, onErrorCode = options.onErrorCode;
  if (showLoading) {
    showLoadingModal(loadingText !== null && loadingText !== void 0 ? loadingText : "加载中...");
  }
  const base = baseUrl !== null && baseUrl !== void 0 ? baseUrl : api_ProjectConfig.getHostProjectConfig().baseUrl;
  let fullUrl = buildUrl(url, base);
  let requestData = data;
  if (method === "GET" && data != null) {
    fullUrl += buildQueryString(data);
    requestData = new common_vendor.UTSJSONObject({});
  }
  const reqHeader = new common_vendor.UTSJSONObject(
    {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Content-Language": DEFAULT_LANGUAGE,
      "clientId": common_config.config.api.auth.clientId
    }
    // 如果 withToken 为 true，检查 token 是否存在
  );
  if (withToken) {
    const token = common_config.getToken();
    if (token != "") {
      reqHeader["authorization"] = "Bearer " + token;
    }
  }
  const finalSuccessCodes = successCodes !== null && successCodes !== void 0 ? successCodes : DEFAULT_SUCCESS_CODES;
  const finalUnauthorizedCodes = unauthorizedCodes !== null && unauthorizedCodes !== void 0 ? unauthorizedCodes : DEFAULT_UNAUTHORIZED_CODES;
  const hpLogin = api_ProjectConfig.getHostProjectConfig().loginPagePath;
  const finalLoginPage = loginPage !== null && loginPage !== void 0 ? loginPage : hpLogin.length > 0 ? hpLogin : DEFAULT_LOGIN_PAGE;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: fullUrl,
      method,
      data: requestData,
      header: reqHeader,
      timeout,
      success: (res) => {
        var _a3;
        if (showLoading) {
          hideLoadingModal();
        }
        const raw = res.data;
        const rawCode = raw["code"];
        let code = 0;
        if (typeof rawCode === "number") {
          code = rawCode;
        } else if (rawCode != null) {
          const parsedCode = parseInt("" + rawCode);
          code = isNaN(parsedCode) ? 0 : parsedCode;
        }
        const rawMsg = (_a3 = raw["msg"]) !== null && _a3 !== void 0 ? _a3 : raw["message"];
        const result = new ApiResponse({
          code,
          msg: rawMsg == null ? "" : "" + rawMsg,
          data: raw["data"],
          rows: raw["rows"],
          total: raw["total"]
        });
        const msg = result.msg;
        let isSuccessCode = false;
        for (let i = 0; i < finalSuccessCodes.length; i++) {
          if ("" + finalSuccessCodes[i] == "" + code) {
            isSuccessCode = true;
            break;
          }
        }
        if (isSuccessCode) {
          resolve(result);
          return null;
        }
        if (common_config.isWechat()) {
          let isUnauthorizedCode = false;
          for (let i = 0; i < finalUnauthorizedCodes.length; i++) {
            if ("" + finalUnauthorizedCodes[i] == "" + code) {
              isUnauthorizedCode = true;
              break;
            }
          }
          if (isUnauthorizedCode && redirectOnUnauthorized) {
            if (showError) {
              showErrorToast(msg || "登录已过期，请重新登录");
            }
            navigateToLogin(finalLoginPage);
            reject(result);
            return null;
          }
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
          rows: null,
          total: null,
          code: -1,
          msg: "网络异常",
          data: null
        }));
      }
    });
  });
}
function get(url, data = null, options = null) {
  return request(createRequestOptions(url, "GET", data, options));
}
function post(url, data = null, options = null) {
  return request(createRequestOptions(url, "POST", data, options));
}
function put(url, data = null, options = null) {
  return request(createRequestOptions(url, "PUT", data, options));
}
function del(url, data = null, options = null) {
  return request(createRequestOptions(url, "DELETE", data, options));
}
function publicRequest(options) {
  const requestOptions = copyRequestOptions(options);
  requestOptions.withToken = false;
  requestOptions.redirectOnUnauthorized = false;
  return request(requestOptions);
}
function silentRequest(options) {
  const requestOptions = copyRequestOptions(options);
  requestOptions.showError = false;
  requestOptions.redirectOnUnauthorized = false;
  return request(requestOptions);
}
function loadingRequest(options, loadingText = null) {
  const requestOptions = copyRequestOptions(options);
  requestOptions.showLoading = true;
  requestOptions.loadingText = loadingText || "加载中...";
  return request(requestOptions);
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
    upload(options) {
      return api_Upload.uploadFileRequest(options);
    }
  }
  // ========== 默认导出 ==========
);
new common_vendor.UTSJSONObject({
  request,
  public: publicRequest,
  silent: silentRequest,
  loading: loadingRequest,
  http
});
exports.RequestOptions = RequestOptions;
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/Request.js.map
