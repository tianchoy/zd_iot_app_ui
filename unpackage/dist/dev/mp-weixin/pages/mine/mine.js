"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const api_types = require("../../api/types.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  (_easycom_topNavBar_1 + _easycom_rice_icon_1 + _easycom_rice_button_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_icon + _easycom_rice_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    common_vendor.ref("用户");
    const wxGetPhoneLogin = common_vendor.ref("");
    const toOrder = () => {
      if (!isLogin())
        return null;
      common_vendor.index.navigateTo({
        url: "/pages/myOrder/myOrder"
      });
    };
    const userId = common_vendor.ref("");
    const userLoginByOpenid = (codes) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.login(new common_vendor.UTSJSONObject({
          xcxCode: codes,
          isLogin: "0"
        }));
        if (res.code == 200) {
          userId.value = "" + res.data.id;
          common_vendor.index.navigateTo({
            url: "/pages/login/login?wxGetPhoneLogin=" + wxGetPhoneLogin.value + "&userId=" + userId.value
          });
        }
      });
    };
    const code = common_vendor.ref("");
    const getCode = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        common_vendor.index.login(new common_vendor.UTSJSONObject({
          success: (res) => {
            return common_vendor.__awaiter(this, void 0, void 0, function* () {
              code.value = res.code;
              if (wxGetPhoneLogin.value == "1") {
                const params = new common_vendor.UTSJSONObject({
                  isLogin: "1",
                  xcxCode: code.value
                });
                const res_1 = yield api_http.login(params);
                if (res_1.code == 200) {
                  common_vendor.index.__f__("log", "at pages/mine/mine.uvue:88", "登录成功:", res_1.data.access_token);
                  common_config.setToken(res_1.data.access_token, res_1.data.refreshToken);
                  common_vendor.index.reLaunch({
                    url: "/pages/card/card"
                  });
                }
              } else {
                userLoginByOpenid(res.code);
              }
            });
          }
        }));
      });
    };
    const getTenantInfos = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.getTenantInfo(common_config.getTenantId(), false);
        if (res.code == 200) {
          const tenantInfo = res.data;
          wxGetPhoneLogin.value = "" + tenantInfo.wxGetPhoneLogin;
        }
      });
    };
    const handleLogin = () => {
      const token = common_config.getToken();
      if (!token) {
        getTenantInfos().then(() => {
          getCode();
        });
      }
    };
    const handleLogout = () => {
      common_config.clearToken();
      common_vendor.index.showToast({
        title: "退出登录成功",
        icon: "none"
      });
      common_vendor.index.reLaunch({
        url: "/pages/card/card"
      });
    };
    const cardListSum = common_vendor.ref(new api_types.CardListSumData({ all: 0, inUse: 0, inNotUse: 0 }));
    const getCardListSum = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryCardListSum();
          if (res.code === 200) {
            cardListSum.value = res.data;
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/mine/mine.uvue:140", "查询卡列表统计异常:", error);
        }
      });
    };
    const checkToken = () => {
      const token = common_config.getToken();
      return !!token;
    };
    const isLogin = () => {
      if (!checkToken()) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    common_vendor.onLoad(() => {
      if (common_config.isWechat()) {
        if (!checkToken())
          return null;
      }
      getCardListSum();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "我的",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-284ae985"
        }),
        b: common_vendor.t(common_vendor.unref(cardListSum).all != null ? common_vendor.unref(cardListSum).all : 0),
        c: common_vendor.t(common_vendor.unref(cardListSum).inUse != null ? common_vendor.unref(cardListSum).inUse : 0),
        d: common_vendor.t(common_vendor.unref(cardListSum).inNotUse != null ? common_vendor.unref(cardListSum).inNotUse : 0),
        e: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        f: common_vendor.o(toOrder, "3f"),
        g: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        h: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        i: common_vendor.unref(common_config.isWechat)()
      }, common_vendor.unref(common_config.isWechat)() ? common_vendor.e({
        j: !isLogin()
      }, !isLogin() ? {
        k: common_vendor.o(handleLogin, "53"),
        l: common_vendor.p({
          type: "primary",
          width: "100%",
          shape: "round",
          class: "data-v-284ae985"
        })
      } : common_vendor.unref(common_config.getStorageSync)("usePhoneNumber") ? {
        n: common_vendor.o(handleLogout, "18"),
        o: common_vendor.p({
          type: "error",
          width: "100%",
          shape: "round",
          class: "data-v-284ae985"
        })
      } : {}, {
        m: common_vendor.unref(common_config.getStorageSync)("usePhoneNumber")
      }) : {}, {
        p: `${_ctx.u_s_b_h}px`,
        q: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
