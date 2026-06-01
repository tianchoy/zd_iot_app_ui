"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  (_easycom_topNavBar_1 + _easycom_m_icon_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const title = common_vendor.ref("用户");
    const cardType = (type) => {
      common_vendor.index.__f__("log", "at pages/mine/mine.uvue:44", type);
      common_vendor.index.reLaunch({
        url: "/pages/card/card?type=" + type
      });
    };
    const toOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myOrder/myOrder"
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "我的",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-284ae985"
        }),
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.o(($event) => {
          return cardType(0);
        }, "37"),
        d: common_vendor.o(($event) => {
          return cardType(1);
        }, "31"),
        e: common_vendor.o(($event) => {
          return cardType(2);
        }, "6c"),
        f: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        g: common_vendor.o(toOrder, "87"),
        h: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        i: common_vendor.p({
          name: "arrow-right-bold",
          size: "20rpx",
          class: "data-v-284ae985"
        }),
        j: `${_ctx.u_s_b_h}px`,
        k: `${_ctx.u_s_a_i_b}px`
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
