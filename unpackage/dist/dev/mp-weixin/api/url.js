"use strict";
const common_vendor = require("../common/vendor.js");
const ApiUrl = new common_vendor.UTSJSONObject({
  getTenantPageConfigXcx: "/system/tenantPageConfig/getTenantPageConfigXcx",
  getTenantPageConfigH: "/system/tenantPageConfig/getTenantPageConfigH",
  login: "/auth/login",
  queryXcxCardList: "/card/pkgInfo/xcxList",
  queryCardListSum: "/app/card/listSum",
  card_detail: "/app/card/info/",
  countries: "/app/card/getH5CountryList",
  addOrder: "/order/pkgOrder",
  queryOrder: "/order/pkgOrder/",
  goPay: "/pay/order/goPayment",
  queryBySuccessId: "/order/pkgOrder/success/",
  queryPkgInfoList: "/card/pkgInfo/list",
  queryPkgInfoDetail: "/card/pkgInfo/info/",
  queryOrderList: "/order/pkgOrder/list",
  queryOrderPackInfo: "/order/pkgOrder/getOrderPackInfo/",
  queryCardList: "/app/card/list",
  queryCardDetailXcx: "/app/card/infoXcx/",
  userBindCard: "/system/appUserCard/bind",
  queryOrderListXcx: "/order/pkgOrder/xcxList"
  // 查询订单列表Xcx
});
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/url.js.map
