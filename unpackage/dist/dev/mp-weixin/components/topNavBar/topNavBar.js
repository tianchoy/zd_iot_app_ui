"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  _easycom_rice_icon_1();
}
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
if (!Math) {
  _easycom_rice_icon();
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
    Icon: { type: String, default: "add-circle" },
    rightText: { type: String, default: "" },
    rightActionBackgroundColor: { type: String, default: "transparent" },
    rightTextFontSize: { type: String, default: "22rpx" },
    isShowStyle: { type: Boolean, default: true },
    iconColor: { type: String, default: "#606266" }
  },
  emits: ["back", "capsuleClick"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const statusBarHeight = common_vendor.ref(20);
    const navBarHeight = common_vendor.ref(44);
    const totalNavHeight = common_vendor.computed(() => {
      return statusBarHeight.value + navBarHeight.value;
    });
    const statusBarStyle = common_vendor.computed(() => {
      return new common_vendor.UTSJSONObject({
        height: statusBarHeight.value + "px",
        backgroundColor: props.backgroundColor,
        position: "fixed",
        width: "100%",
        left: 0,
        top: 0,
        zIndex: 100
      });
    });
    const navBarStyle = common_vendor.computed(() => {
      return new common_vendor.UTSJSONObject({
        height: navBarHeight.value + "px",
        backgroundColor: props.backgroundColor,
        position: "fixed",
        width: "100%",
        left: 0,
        top: statusBarHeight.value + "px",
        zIndex: 100
      });
    });
    const getNavBarInfo = () => {
      try {
        const systemInfo = common_vendor.index.getSystemInfoSync();
        statusBarHeight.value = systemInfo.statusBarHeight || 20;
        const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
        if (menuButtonInfo) {
          const navHeight = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
          navBarHeight.value = navHeight > 0 ? navHeight : 44;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at components/topNavBar/topNavBar.uvue:109", "获取导航栏信息失败", e);
      }
    };
    const handleBack = () => {
      if (props.showBack) {
        emit("back");
      }
    };
    common_vendor.onMounted(() => {
      getNavBarInfo();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: __props.isShowStyle
      }, __props.isShowStyle ? {
        b: common_vendor.s(statusBarStyle.value),
        c: common_vendor.s({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      } : {}, {
        d: __props.isShowStyle
      }, __props.isShowStyle ? common_vendor.e({
        e: __props.showBack
      }, __props.showBack ? {
        f: common_vendor.o(handleBack, "1b"),
        g: common_vendor.p({
          name: "arrow-left",
          size: "35rpx",
          color: "#333",
          class: "icon data-v-83d0d8fa"
        })
      } : {}, {
        h: __props.showBack ? "visible" : "hidden",
        i: common_vendor.t(__props.title),
        j: __props.textColor,
        k: common_vendor.unref(navBarHeight) + "px",
        l: __props.showCapsule
      }, __props.showCapsule ? common_vendor.e({
        m: __props.isIcon
      }, __props.isIcon ? {
        n: common_vendor.p({
          name: __props.Icon,
          size: "26",
          color: __props.iconColor,
          class: "data-v-83d0d8fa"
        })
      } : {
        o: common_vendor.t(__props.rightText),
        p: __props.rightTextFontSize
      }, {
        q: !__props.isIcon && __props.rightActionBackgroundColor !== "transparent" ? 1 : "",
        r: common_vendor.s(!__props.isIcon ? {
          backgroundColor: __props.rightActionBackgroundColor
        } : {}),
        s: common_vendor.o(($event) => {
          return emit("capsuleClick", "menu");
        }, "c1")
      }) : {}, {
        t: common_vendor.s(navBarStyle.value),
        v: common_vendor.s({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }) : common_vendor.e({
        w: common_vendor.unref(statusBarHeight) + "px",
        x: __props.backgroundColor,
        y: __props.showBack
      }, __props.showBack ? {
        z: common_vendor.o(handleBack, "39"),
        A: common_vendor.p({
          name: "arrow-left",
          size: "40rpx",
          class: "icon data-v-83d0d8fa"
        })
      } : {}, {
        B: __props.showBack ? "visible" : "hidden",
        C: common_vendor.t(__props.title),
        D: __props.textColor,
        E: common_vendor.unref(navBarHeight) + "px",
        F: __props.showCapsule
      }, __props.showCapsule ? common_vendor.e({
        G: __props.isIcon
      }, __props.isIcon ? {
        H: common_vendor.p({
          name: __props.Icon,
          size: "26",
          color: __props.iconColor,
          class: "data-v-83d0d8fa"
        })
      } : {
        I: common_vendor.t(__props.rightText),
        J: __props.rightTextFontSize
      }, {
        K: !__props.isIcon && __props.rightActionBackgroundColor !== "transparent" ? 1 : "",
        L: common_vendor.s(!__props.isIcon ? {
          backgroundColor: __props.rightActionBackgroundColor
        } : {}),
        M: common_vendor.o(($event) => {
          return emit("capsuleClick", "menu");
        }, "b3")
      }) : {}, {
        N: common_vendor.unref(navBarHeight) + "px",
        O: __props.backgroundColor,
        P: `${_ctx.u_s_b_h}px`
      }), {
        Q: __props.isShowStyle
      }, __props.isShowStyle ? {
        R: common_vendor.s({
          height: totalNavHeight.value + "px"
        }),
        S: common_vendor.s({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      } : {});
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83d0d8fa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/topNavBar/topNavBar.js.map
