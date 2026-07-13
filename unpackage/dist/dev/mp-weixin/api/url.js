"use strict";
const common_vendor = require("../common/vendor.js");
const ApiUrl = new common_vendor.UTSJSONObject({
  getTenantPageConfigXcx: "/system/tenantPageConfig/getTenantPageConfigXcx",
  getTenantPageConfigH: "/system/tenantPageConfig/getTenantPageConfigH",
  login: "/auth/login",
  //H5接口
  queryCardListSum: "/app/card/listSum",
  card_detail: "/app/card/info/",
  countries: "/app/card/getH5CountryList",
  addOrder: "/order/pkgOrder",
  queryOrder: "/order/pkgOrder/",
  goPay: "/pay/order/goPayment",
  queryBySuccessId: "/order/pkgOrder/success/",
  queryPkgInfoDetail: "/card/pkgInfo/gn/info/",
  queryOrderListGn: "/order/pkgOrder/gn/list",
  queryOrderPackInfo: "/order/pkgOrder/getOrderPackGnInfo/",
  queryPkgInfoList: "/card/pkgInfo/list",
  addOrderGnH5: "/order/pkgOrder/gnH5/add",
  goPayGnH5: "/pay/orderGn/gn/goPayment/",
  queryVerifyH5: "/app/card/verifyH5/",
  //微信小程序接口
  queryXcxCardList: "/card/pkgInfo/xcxList",
  queryCardList: "/app/card/list",
  queryCardDetailXcx: "/app/card/infoXcx/",
  userBindCard: "/system/appUserCard/add",
  userUnBindCard: "/system/appUserCard/",
  queryOrderListXcx: "/order/pkgOrder/xcxList",
  addOrderXcx: "/order/pkgOrder/xcx/add",
  queryOrderDetailXcx: "/order/pkgOrder/getOrderPackInfo/xcx/",
  queryOrderSuccess: "/order/pkgOrder/xcxSuccess/",
  goPayXcx: "/pay/orderGn/xcx/goPayment/",
  queryPkgInfoXcx: "/card/pkgInfo/xcxInfo/",
  queryVerifyXcx: "/app/card/verifyXcx/"
});
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/url.js.map
