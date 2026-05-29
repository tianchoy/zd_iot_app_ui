"use strict";
const common_vendor = require("../common/vendor.js");
require("../uni_modules/m-unix/index.js");
const common_config = require("../common/config.js");
const uni_modules_mUnix_components_mTools_Request = require("../uni_modules/m-unix/components/m-tools/Request.js");
const defaultConfig = {
  showLoading: true,
  loadingText: "加载中...",
  showError: true,
  needAuth: true
};
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
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
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
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
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
const api = new common_vendor.UTSJSONObject({
  get(url, params = null, config = null) {
    return request(url, "GET", params, config);
  },
  post(url, data = null, config = null) {
    return request(url, "POST", data, config);
  },
  put(url, data = null, config = null) {
    return request(url, "PUT", data, config);
  },
  delete(url, data = null, config = null) {
    return request(url, "DELETE", data, config);
  }
});
exports.api = api;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/request.js.map
