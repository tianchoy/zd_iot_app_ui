"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
const utils_doc = require("../../utils/doc.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_checkbox_1 = common_vendor.resolveComponent("rice-checkbox");
  const _easycom_rice_divider_1 = common_vendor.resolveComponent("rice-divider");
  const _easycom_rice_dialog_1 = common_vendor.resolveComponent("rice-dialog");
  (_easycom_topNavBar_1 + _easycom_rice_checkbox_1 + _easycom_rice_divider_1 + _easycom_rice_dialog_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_checkbox = () => "../../uni_modules/rice-ui/components/rice-checkbox/rice-checkbox.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
const _easycom_rice_dialog = () => "../../uni_modules/rice-ui/components/rice-dialog/rice-dialog.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_checkbox + _easycom_rice_divider + _easycom_rice_dialog)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const wxGetPhoneLogin = common_vendor.ref("");
    const userId = common_vendor.ref("");
    const docState = common_vendor.ref(false);
    const showTitle = common_vendor.ref(false);
    const message = common_vendor.ref("");
    const from = common_vendor.ref("");
    const rechargeNo = common_vendor.ref("");
    const orderId = common_vendor.ref("");
    const isDocState = () => {
      docState.value = !docState.value;
    };
    const getLogin = (code) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.login(new common_vendor.UTSJSONObject({
          xcxCode: code,
          userId: userId.value,
          isLogin: wxGetPhoneLogin.value
        }));
        if (res.code == 200) {
          orderId.value = common_config.getStorageSync("orderId") || "";
          common_config.setToken(res.data.access_token, res.data.refreshToken);
          common_config.setStorageSync("usePhoneNumber", true);
          if (from.value == "recharge") {
            common_vendor.index.reLaunch({
              url: "/pages/recharge/recharge?rechargeNo=" + rechargeNo.value
            });
          } else if (from.value == "orderDetail") {
            common_vendor.index.reLaunch({
              url: "/pages/orderDetail/orderDetail?orderNo=" + orderId.value
            });
          } else {
            common_vendor.index.reLaunch({
              url: "/pages/card/card"
            });
          }
        }
      });
    };
    const handleGetPhoneNumber = (res) => {
      if (!docState.value) {
        common_vendor.index.showToast({
          title: "请先阅读并同意用户协议",
          icon: "error"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/login/login.uvue:82", "handleGetPhoneNumber:", res);
      const detail = res["detail"];
      getLogin(detail["code"]);
    };
    const noNowLogin = () => {
      common_vendor.index.reLaunch({
        url: "/pages/card/card"
      });
    };
    const gotoAgreement = () => {
      showTitle.value = true;
      message.value = utils_doc.userAgreement;
    };
    const gotoPrivacy = () => {
      showTitle.value = true;
      message.value = utils_doc.privacyPolicy;
    };
    const agree = () => {
      showTitle.value = false;
    };
    common_vendor.onLoad((options) => {
      wxGetPhoneLogin.value = common_config.getStorageSync("wxGetPhoneLogin") || options["wxGetPhoneLogin"];
      userId.value = common_config.getStorageSync("userId") || options["userId"];
      from.value = options["from"];
      rechargeNo.value = options["rechargeNo"];
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "中导云卡登录",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-27a30816"
        }),
        b: common_assets._imports_0,
        c: common_vendor.o(handleGetPhoneNumber, "6d"),
        d: common_vendor.o(isDocState, "a6"),
        e: common_vendor.p({
          checked: common_vendor.unref(docState),
          class: "data-v-27a30816"
        }),
        f: common_vendor.o(gotoAgreement, "01"),
        g: common_vendor.o(gotoPrivacy, "e7"),
        h: common_vendor.p({
          dashed: true,
          class: "data-v-27a30816"
        }),
        i: common_vendor.o(noNowLogin, "2e"),
        j: common_vendor.o(agree, "64"),
        k: common_vendor.o(($event) => {
          return common_vendor.isRef(showTitle) ? showTitle.value = $event : null;
        }, "62"),
        l: common_vendor.p({
          width: "80%",
          message: common_vendor.unref(message),
          ["show-cancel-button"]: false,
          show: common_vendor.unref(showTitle),
          class: "data-v-27a30816"
        }),
        m: `${_ctx.u_s_b_h}px`,
        n: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27a30816"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
