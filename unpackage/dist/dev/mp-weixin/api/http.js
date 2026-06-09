"use strict";
const common_vendor = require("../common/vendor.js");
const api_url = require("./url.js");
const api_Request = require("./Request.js");
const common_config = require("../common/config.js");
require("./types.js");
function getCountryList(withToken = false) {
  return api_Request.request(new api_Request.RequestOptions({
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
}
function login(data, withToken = true) {
  return api_Request.request(new api_Request.RequestOptions({
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
    url: api_url.ApiUrl.login,
    method: "POST",
    data: new common_vendor.UTSJSONObject(Object.assign(Object.assign({}, data), { tenantId: common_config.config.api.auth.tenantId, clientId: common_config.config.api.auth.clientId, grantType: common_config.config.api.auth.grantType })),
    withToken
  }));
}
function getTenantInfo(tenantId, withToken = true) {
  const url = api_url.ApiUrl.getTenantPageConfigXcx + "/" + common_config.config.api.auth.tenantId;
  return api_Request.request(new api_Request.RequestOptions({
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
    url,
    method: "GET",
    withToken
  }));
}
function queryCardListSum(withToken = true) {
  return api_Request.request(new api_Request.RequestOptions({
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
    url: api_url.ApiUrl.queryCardListSum,
    method: "GET",
    withToken
  }));
}
exports.getCountryList = getCountryList;
exports.getTenantInfo = getTenantInfo;
exports.login = login;
exports.queryCardListSum = queryCardListSum;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
