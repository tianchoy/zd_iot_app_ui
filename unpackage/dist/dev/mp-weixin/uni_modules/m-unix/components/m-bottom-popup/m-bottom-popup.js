"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_Ut = require("../m-tools/Ut.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mBottomPopup",
  emits: ["close"],
  props: {
    //是否需要mask
    mask: {
      type: Boolean,
      default: true
    },
    //控制显示
    show: {
      type: Boolean,
      default: false
    },
    //背景颜色
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    // 高度（数字默认 rpx，也可传带单位的字符串）
    height: {
      type: [Number, String],
      default: 0
    },
    //设置圆角
    radius: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    maskZIndex: {
      type: [Number, String],
      default: 998
    },
    //弹层显示时，垂直方向移动的距离
    translateY: {
      type: String,
      default: "0"
    },
    //是否需要判断底部安全区域（主要针对iphonex以上机型）
    isSafeArea: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    popupHeightCss() {
      const h = this.height;
      if (h === 0 || h === "0") {
        return "auto";
      }
      if (typeof h === "string" && h.trim() === "") {
        return "auto";
      }
      if (uni_modules_mUnix_components_mTools_Ut.parseCssNumber(h) === 0) {
        return "auto";
      }
      return uni_modules_mUnix_components_mTools_Ut.toCssLength(h);
    }
  },
  methods: {
    preventScroll() {
    },
    handleClose() {
      if (!this.show) {
        return null;
      }
      this.$emit("close", new common_vendor.UTSJSONObject({}));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.show ? 1 : "",
    b: $props.radius ? 1 : "",
    c: $props.isSafeArea ? 1 : "",
    d: $props.backgroundColor,
    e: $options.popupHeightCss,
    f: $props.zIndex,
    g: `translate3d(0, ${$props.show ? $props.translateY : "100%"}, 0)`,
    h: $props.mask
  }, $props.mask ? {
    i: common_vendor.n($props.show ? "m-mask-show" : ""),
    j: $props.maskZIndex,
    k: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args), "81")
  } : {}, {
    l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    m: common_vendor.o((...args) => $options.preventScroll && $options.preventScroll(...args), "1c"),
    n: `${_ctx.u_s_b_h}px`,
    o: `${_ctx.u_s_a_i_b}px`,
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b4ec55f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.js.map
