"use strict";
const common_vendor = require("../common/vendor.js");
const api_url = require("./url.js");
const uni_modules_mUnix_components_mTools_Request = require("../uni_modules/m-unix/components/m-tools/Request.js");
class LoginData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          token: { type: String, optional: false },
          refreshToken: { type: String, optional: false },
          userId: { type: Number, optional: false },
          nickname: { type: String, optional: false }
        };
      },
      name: "LoginData"
    };
  }
  constructor(options, metadata = LoginData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.token = this.__props__.token;
    this.refreshToken = this.__props__.refreshToken;
    this.userId = this.__props__.userId;
    this.nickname = this.__props__.nickname;
    delete this.__props__;
  }
}
class CountryData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          fullName: { type: String, optional: false },
          letterCode: { type: String, optional: false }
        };
      },
      name: "CountryData"
    };
  }
  constructor(options, metadata = CountryData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.fullName = this.__props__.fullName;
    this.letterCode = this.__props__.letterCode;
    delete this.__props__;
  }
}
const getCountryList = (withToken = false) => {
  return uni_modules_mUnix_components_mTools_Request.request(new uni_modules_mUnix_components_mTools_Request.RequestOptions({
    data: null,
    header: null,
    baseUrl: null,
    timeout: null,
    showError: null,
    showLoading: null,
    loadingText: null,
    redirectOnUnauthorized: null,
    loginPage: null,
    successCodes: null,
    unauthorizedCodes: null,
    onErrorCode: null,
    url: api_url.ApiUrl.countries,
    method: "GET",
    withToken
  }));
};
const card_detail = (id, countryCode, withToken = true) => {
  return uni_modules_mUnix_components_mTools_Request.request(new uni_modules_mUnix_components_mTools_Request.RequestOptions({
    data: null,
    header: null,
    baseUrl: null,
    timeout: null,
    showError: null,
    showLoading: null,
    loadingText: null,
    redirectOnUnauthorized: null,
    loginPage: null,
    successCodes: null,
    unauthorizedCodes: null,
    onErrorCode: null,
    url: api_url.ApiUrl.card_detail + id + "/" + countryCode,
    method: "GET",
    withToken
  }));
};
exports.card_detail = card_detail;
exports.getCountryList = getCountryList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
