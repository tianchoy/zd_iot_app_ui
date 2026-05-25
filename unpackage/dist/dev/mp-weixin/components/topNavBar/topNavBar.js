"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _component_uv_icon = common_vendor.resolveComponent("uv-icon");
  (_easycom_m_icon_1 + _component_uv_icon)();
}
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "topNavBar",
  props: {
    title: String,
    showBack: { type: Boolean, default: true },
    backText: { type: String, default: "" },
    showCapsule: { type: Boolean, default: true },
    backgroundColor: { type: String, default: "#f4f7fb" },
    textColor: { type: String, default: "#000000" },
    isIcon: { type: Boolean, default: true },
    Icon: { type: String, default: "plus-circle" },
    rightText: { type: String, default: "" },
    isShowStyle: { type: Boolean, default: true },
    iconColor: { type: String, default: "#606266" }
  },
  emits: ["back", "capsuleClick"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const emit = __emit;
    const statusBarHeight = common_vendor.ref(45);
    const navBarHeight = common_vendor.ref(44);
    common_vendor.ref(new common_vendor.UTSJSONObject({
      top: 4,
      right: 10,
      width: 87,
      height: 32
    }));
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.s(__props.isShowStyle ? {
          height: common_vendor.unref(statusBarHeight) + "px",
          "background-color": __props.backgroundColor,
          position: "fixed",
          width: "100%",
          letf: 0,
          top: 0,
          "z-index": "100"
        } : {
          height: common_vendor.unref(statusBarHeight) + "px",
          "background-color": __props.backgroundColor
        }),
        b: common_vendor.s({
          "--status-bar-height": `${_ctx.u_s_b_h}px`,
          "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
        }),
        c: __props.showBack
      }, __props.showBack ? {
        d: common_vendor.o(($event) => {
          return emit("back");
        }, "94"),
        e: common_vendor.p({
          name: "arrow-left-bold",
          size: "40rpx",
          class: "icon data-v-83d0d8fa"
        })
      } : {}, {
        f: common_vendor.t(__props.title),
        g: __props.textColor,
        h: common_vendor.unref(navBarHeight) + "px",
        i: __props.showCapsule
      }, __props.showCapsule ? common_vendor.e({
        j: __props.isIcon
      }, __props.isIcon ? {
        k: common_vendor.p({
          name: __props.Icon,
          size: "26",
          color: __props.iconColor,
          class: "data-v-83d0d8fa"
        })
      } : {
        l: common_vendor.t(__props.rightText)
      }, {
        m: common_vendor.o(($event) => {
          return emit("capsuleClick", "menu");
        }, "4f")
      }) : {}, {
        n: "200rpx",
        o: common_vendor.s(__props.isShowStyle ? {
          height: common_vendor.unref(navBarHeight) + "px",
          background: __props.backgroundColor,
          position: "fixed",
          width: "100%",
          letf: "0",
          top: common_vendor.unref(statusBarHeight) + "px",
          "z-index": "100"
        } : {
          height: common_vendor.unref(navBarHeight) + "px",
          background: __props.backgroundColor
        }),
        p: common_vendor.s({
          "--status-bar-height": `${_ctx.u_s_b_h}px`,
          "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
        })
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83d0d8fa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/topNavBar/topNavBar.js.map
