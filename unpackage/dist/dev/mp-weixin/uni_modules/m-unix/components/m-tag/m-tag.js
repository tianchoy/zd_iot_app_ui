"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mTag",
  emits: ["click", "close"],
  props: {
    // 类型 primary/ success/ warning/ danger/ info/ default
    type: {
      type: String,
      default: "default"
    },
    // 尺寸 large / medium / small / mini
    size: {
      type: String,
      default: "medium"
    },
    // 文字
    text: {
      type: String,
      default: ""
    },
    // 镂空样式
    plain: {
      type: Boolean,
      default: false
    },
    // 是否圆角
    round: {
      type: Boolean,
      default: false
    },
    // 是否标记样式
    mark: {
      type: Boolean,
      default: false
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义颜色
    color: {
      type: String,
      default: ""
    },
    // 自定义背景色
    bgColor: {
      type: String,
      default: ""
    },
    // 自定义样式（勿与合并结果同名 computed，否则冲突）
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    }
  },
  computed: {
    mergedCustomStyle() {
      const style = new common_vendor.UTSJSONObject({});
      if (this.color !== "") {
        style.color = this.color;
      }
      if (this.bgColor !== "") {
        style.backgroundColor = this.bgColor;
      }
      Object.assign(style, this.customStyle);
      return style;
    },
    closeIconSize() {
      if (this.size === "mini") {
        return "24rpx";
      }
      if (this.size === "small") {
        return "28rpx";
      }
      if (this.size === "large") {
        return "36rpx";
      }
      return "32rpx";
    },
    // 关闭图标与标签字色一致（避免父 view 的 color 未作用到 m-icon 内 text）
    closeIconColor() {
      if (this.color !== "") {
        return this.color;
      }
      if (this.plain) {
        if (this.type === "primary") {
          return "#409eff";
        }
        if (this.type === "success") {
          return "#67c23a";
        }
        if (this.type === "warning") {
          return "#e6a23c";
        }
        if (this.type === "danger") {
          return "#f56c6c";
        }
        if (this.type === "info") {
          return "#909399";
        }
        return "#606266";
      }
      if (this.type === "default") {
        return "#606266";
      }
      return "#ffffff";
    }
  },
  methods: {
    handleClick(e = null) {
      if (!this.disabled) {
        this.$emit("click", e);
      }
    },
    handleClose(e = null) {
      if (!this.disabled) {
        this.$emit("close", e);
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon = () => "../m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $props.text
  }, $props.text ? {
    b: common_vendor.t($props.text)
  } : {}, {
    c: $props.closable
  }, $props.closable ? {
    d: common_vendor.o($options.handleClose, "a8"),
    e: common_vendor.p({
      name: "close",
      size: $options.closeIconSize,
      color: $options.closeIconColor,
      class: "m-tag__close data-v-30d99be6"
    })
  } : {}, {
    f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    g: common_vendor.n(`m-tag--${$props.type}`),
    h: common_vendor.n(`m-tag--${$props.size}`),
    i: common_vendor.n({
      "m-tag--plain": $props.plain
    }),
    j: common_vendor.n({
      "m-tag--round": $props.round
    }),
    k: common_vendor.n({
      "m-tag--mark": $props.mark
    }),
    l: common_vendor.n({
      "m-tag--disabled": $props.disabled
    }),
    m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    n: common_vendor.s($options.mergedCustomStyle),
    o: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    }),
    p: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args), "fa")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30d99be6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tag/m-tag.js.map
