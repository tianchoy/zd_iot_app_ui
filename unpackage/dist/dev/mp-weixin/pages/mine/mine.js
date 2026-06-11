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
    const cardType = (type) => {
      if (!isLogin())
        return null;
      common_vendor.index.reLaunch({
        url: "/pages/card/card?type=" + type
      });
    };
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
          isLogin: "1"
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
      common_vendor.index.login(new common_vendor.UTSJSONObject({
        success: (res) => {
          code.value = res.code;
          userLoginByOpenid(res.code);
        }
      }));
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
            common_vendor.index.__f__("log", "at pages/mine/mine.uvue:131", "查询卡列表统计成功:", res.data);
          } else {
            common_vendor.index.__f__("log", "at pages/mine/mine.uvue:133", "查询卡列表统计失败:", res.msg);
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/mine/mine.uvue:136", "查询卡列表统计异常:", error);
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
      if (checkToken()) {
        getCardListSum();
      }
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
        c: common_vendor.o(($event) => {
          return cardType(0);
        }, "f3"),
        d: common_vendor.t(common_vendor.unref(cardListSum).inUse != null ? common_vendor.unref(cardListSum).inUse : 0),
        e: common_vendor.o(($event) => {
          return cardType(1);
        }, "dc"),
        f: common_vendor.t(common_vendor.unref(cardListSum).inNotUse != null ? common_vendor.unref(cardListSum).inNotUse : 0),
        g: common_vendor.o(($event) => {
          return cardType(2);
        }, "0b"),
        h: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        i: common_vendor.o(toOrder, "d1"),
        j: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        k: common_vendor.p({
          name: "arrow-right",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        l: !isLogin()
      }, !isLogin() ? {
        m: common_vendor.o(handleLogin, "51"),
        n: common_vendor.p({
          type: "primary",
          width: "100%",
          shape: "round",
          class: "data-v-284ae985"
        })
      } : {
        o: common_vendor.o(handleLogout, "36"),
        p: common_vendor.p({
          type: "error",
          width: "100%",
          shape: "round",
          class: "data-v-284ae985"
        })
      }, {
        q: `${_ctx.u_s_b_h}px`,
        r: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
