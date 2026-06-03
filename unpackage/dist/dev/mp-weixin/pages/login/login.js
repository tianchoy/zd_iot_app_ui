"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  _easycom_topNavBar_1();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
if (!Math) {
  _easycom_topNavBar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const wxGetPhoneLogin = common_vendor.ref("");
    const handleGetPhoneNumber = (res) => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:24", "获取手机号:", res);
    };
    const userLoginByOpenid = (codes) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.login(new common_vendor.UTSJSONObject({
          xcxCode: codes,
          isLogin: "1"
        }));
        common_vendor.index.__f__("log", "at pages/login/login.uvue:33", "登录:", res);
      });
    };
    const code = common_vendor.ref("");
    const getCode = () => {
      common_vendor.index.login(new common_vendor.UTSJSONObject({
        success: (res) => {
          code.value = res.code;
          userLoginByOpenid(res.code);
        }
      }));
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/login/login.uvue:47", options);
      if (options["wxGetPhoneLogin"] != null) {
        wxGetPhoneLogin.value = options["wxGetPhoneLogin"];
      }
      getCode();
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
        d: `${_ctx.u_s_b_h}px`,
        e: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27a30816"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
