"use strict";
const common_vendor = require("../common/vendor.js");
const ApiUrl = new common_vendor.UTSJSONObject({
  getTenantPageConfigXcx: "/system/tenantPageConfig/getTenantPageConfigXcx",
  getTenantPageConfigH: "/system/tenantPageConfig/getTenantPageConfigH",
  login: "/auth/login",
  queryCardListSum: "/app/card/listSum",
  card_detail: "/app/card/info/",
  countries: "/app/card/getH5CountryList",
  addOrder: "/order/pkgOrder",
  queryOrder: "/order/pkgOrder/",
  goPay: "/pay/order/goPayment",
  queryBySuccessId: "/order/pkgOrder/success/",
  queryPkgInfoDetail: "/card/pkgInfo/info/",
  queryOrderList: "/order/pkgOrder/list",
  queryOrderPackInfo: "/order/pkgOrder/getOrderPackInfo/",
  //H5接口
  queryPkgInfoList: "/card/pkgInfo/list",
  //微信小程序接口
  queryXcxCardList: "/card/pkgInfo/xcxList",
  queryCardList: "/app/card/list",
  queryCardDetailXcx: "/app/card/infoXcx/",
  userBindCard: "/system/appUserCard/bind",
  queryOrderListXcx: "/order/pkgOrder/xcxList",
  addOrderXcx: "/order/pkgOrder/xcx/add",
  queryOrderDetailXcx: "/order/pkgOrder/getOrderPackInfo/xcx/"
  // 查询订单详情Xcx
});
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/url.js.map
