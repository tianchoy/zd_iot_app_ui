"use strict";
const common_vendor = require("../common/vendor.js");
const api_request = require("./request.js");
const common_config = require("../common/config.js");
function login(params = null) {
  return common_vendor.__awaiter(this, void 0, void 0, function* () {
    common_vendor.index.__f__("log", "at api/http.uts:20", "开始请求", params);
    try {
      const response = yield api_request.api.get(common_config.config.baseUrl + common_config.config.api.login);
      common_vendor.index.__f__("log", "at api/http.uts:25", "请求成功", response);
      return new common_vendor.UTSJSONObject({
        code: 200,
        data: response.data,
        message: "success"
      });
    } catch (error) {
      common_vendor.index.__f__("error", "at api/http.uts:33", "请求失败", error);
      throw error;
    }
  });
}
exports.login = login;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
