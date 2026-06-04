"use strict";
const common_vendor = require("../../common/vendor.js");
const common_config = require("../../common/config.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_div_1 = common_vendor.resolveComponent("m-div");
  const _easycom_customService_1 = common_vendor.resolveComponent("customService");
  (_easycom_topNavBar_1 + _easycom_m_icon_1 + _easycom_m_button_1 + _easycom_m_tag_1 + _easycom_m_div_1 + _easycom_customService_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_div = () => "../../uni_modules/m-unix/components/m-div/m-div.js";
const _easycom_customService = () => "../../components/customService/customService.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon + _easycom_m_button + _easycom_m_tag + _easycom_m_div + _easycom_customService)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("");
    common_vendor.ref(false);
    const card_number = common_vendor.ref("");
    const wxGetPhoneLogin = common_vendor.ref("");
    const goRecharge = () => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:131", "去充值");
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge"
      });
    };
    const scanCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleQuery = () => {
      if (!card_number.value) {
        common_vendor.index.showToast({
          title: "请输入卡号",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/index/index.uvue:151", "查询卡号:", card_number.value);
    };
    const onScanResult = (data) => {
      var _a;
      const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
      if (result.length > 0) {
        card_number.value = result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    const cardType = (type) => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:170", type);
      common_vendor.index.reLaunch({
        url: "/pages/card/card?type=" + type
      });
    };
    const handleClick = () => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:178", "联系客服1111");
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
          common_config.setStorageSync("tenant_infos", tenantInfo);
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
    common_vendor.onLoad(() => {
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "首页",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-00a60067"
        }),
        b: title.value
      }, title.value ? {
        c: common_vendor.t(title.value)
      } : {
        d: common_vendor.o(handleLogin, "b0")
      }, {
        e: common_vendor.o(($event) => {
          return cardType(0);
        }, "33"),
        f: common_vendor.o(($event) => {
          return cardType(1);
        }, "9d"),
        g: common_vendor.o(($event) => {
          return cardType(2);
        }, "73"),
        h: card_number.value,
        i: common_vendor.o(($event) => {
          return card_number.value = $event.detail.value;
        }, "92"),
        j: common_vendor.p({
          name: "scanning",
          size: "40rpx",
          class: "data-v-00a60067"
        }),
        k: common_vendor.o(scanCode, "05"),
        l: common_vendor.p({
          type: "white",
          plain: true,
          width: "90rpx",
          class: "scan-btn data-v-00a60067"
        }),
        m: common_vendor.o(handleQuery, "95"),
        n: common_vendor.p({
          type: "primary",
          width: "120rpx",
          class: "data-v-00a60067"
        }),
        o: common_vendor.o(($event) => {
          return cardType(0);
        }, "e7"),
        p: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-00a60067"
        }),
        q: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider",
          class: "data-v-00a60067"
        }),
        r: common_vendor.o(goRecharge, "05"),
        s: common_vendor.p({
          type: "primary",
          width: "200rpx",
          btnSize: "mini",
          size: "25rpx",
          shape: "circle",
          class: "data-v-00a60067"
        }),
        t: common_vendor.o(handleClick, "e0"),
        v: common_vendor.p({
          class: "data-v-00a60067"
        }),
        w: `${_ctx.u_s_b_h}px`,
        x: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
