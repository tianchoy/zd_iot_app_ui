"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_wx_login_1 = common_vendor.resolveComponent("m-wx-login");
  (_easycom_topNavBar_1 + _easycom_m_wx_login_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_wx_login = () => "../../uni_modules/m-unix/components/m-wx-login/m-wx-login.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_wx_login)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const handleSuccess = (res) => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:19", "登录成功:", res);
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:23", options);
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
        c: common_vendor.o(handleSuccess, "f1"),
        d: common_vendor.p({
          type: "code",
          text: "微信一键登录",
          class: "data-v-27a30816"
        }),
        e: `${_ctx.u_s_b_h}px`,
        f: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27a30816"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
