"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../common/config.js");
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
    const title = common_vendor.ref("Hello");
    common_vendor.ref(false);
    const card_number = common_vendor.ref("");
    const goRecharge = () => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:88", "去充值");
      common_vendor.index.navigateTo({
        url: "/pages/payFailed/payFailed"
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
      common_vendor.index.__f__("log", "at pages/index/index.uvue:108", "查询卡号:", card_number.value);
    };
    const onScanResult = (data = null) => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:114", "收到扫码结果:", data);
      if (data && data.result) {
        card_number.value = data.result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("scanResult", onScanResult);
      api_http.login().then((res = null) => {
        common_vendor.index.__f__("log", "at pages/index/index.uvue:132", "获取到的用户信息:", res);
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "首页",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-00a60067"
        }),
        b: common_vendor.t(title.value),
        c: card_number.value,
        d: common_vendor.o(($event) => {
          return card_number.value = $event.detail.value;
        }, "e6"),
        e: common_vendor.p({
          name: "scanning",
          size: "40rpx",
          class: "data-v-00a60067"
        }),
        f: common_vendor.o(scanCode, "53"),
        g: common_vendor.p({
          type: "white",
          plain: true,
          width: "90rpx",
          class: "scan-btn data-v-00a60067"
        }),
        h: common_vendor.o(handleQuery, "d3"),
        i: common_vendor.p({
          type: "primary",
          width: "120rpx",
          class: "data-v-00a60067"
        }),
        j: common_vendor.p({
          text: "标签",
          round: true,
          plain: true,
          size: "small",
          type: "primary",
          class: "data-v-00a60067"
        }),
        k: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider",
          class: "data-v-00a60067"
        }),
        l: common_vendor.o(goRecharge, "03"),
        m: common_vendor.p({
          type: "primary",
          width: "200rpx",
          btnSize: "mini",
          size: "25rpx",
          shape: "circle",
          class: "data-v-00a60067"
        }),
        n: common_vendor.p({
          class: "data-v-00a60067"
        }),
        o: `${_ctx.u_s_b_h}px`,
        p: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
