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
function queryCardList(params, withToken = true) {
  const data = new common_vendor.UTSJSONObject({
    rechargeNo: params.rechargeNo,
    status: params.status,
    isSort: params.isSort
  });
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
    url: api_url.ApiUrl.queryCardList,
    method: "GET",
    data,
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
function queryCardDetail(id, countryCode = null, isFind = null, withToken = true) {
  const url = api_url.ApiUrl.queryCardDetailXcx + id + "/" + isFind;
  const token = true;
  common_vendor.index.__f__("log", "at api/http.uts:114", "查询卡详情Xcx", "id:", id, "countryCode:", countryCode, "isFind:", isFind);
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
    withToken: token
  }));
}
function userBindCard(data, withToken = true) {
  const body = new common_vendor.UTSJSONObject({
    rechargeNo: data.rechargeNo
  });
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
    url: api_url.ApiUrl.userBindCard,
    method: "POST",
    data: body,
    withToken
  }));
}
function queryPkgInfoList(data, withToken = true) {
  const url = api_url.ApiUrl.queryXcxCardList;
  const token = true;
  const body = new common_vendor.UTSJSONObject({
    rechargeNo: data.rechargeNo,
    status: data.status
  });
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
    url,
    method: "GET",
    data: body,
    withToken: token
  }));
}
function queryOrderListXcx(data, withToken = true) {
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
    url: api_url.ApiUrl.queryOrderListXcx,
    method: "GET",
    data,
    withToken
  }));
}
exports.getCountryList = getCountryList;
exports.getTenantInfo = getTenantInfo;
exports.login = login;
exports.queryCardDetail = queryCardDetail;
exports.queryCardList = queryCardList;
exports.queryCardListSum = queryCardListSum;
exports.queryOrderListXcx = queryOrderListXcx;
exports.queryPkgInfoList = queryPkgInfoList;
exports.userBindCard = userBindCard;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
