"use strict";
const common_vendor = require("../common/vendor.js");
class Props extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          value: { type: Number, optional: true },
          max: { type: Number, optional: true },
          height: { type: Number, optional: true },
          color: { type: String, optional: true },
          trackColor: { type: String, optional: true },
          showPercent: { type: Boolean, optional: true },
          label: { type: String, optional: true },
          animated: { type: Boolean, optional: true },
          borderRadius: { type: Number, optional: true }
        };
      },
      name: "Props"
    };
  }
  constructor(options, metadata = Props.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.value = this.__props__.value;
    this.max = this.__props__.max;
    this.height = this.__props__.height;
    this.color = this.__props__.color;
    this.trackColor = this.__props__.trackColor;
    this.showPercent = this.__props__.showPercent;
    this.label = this.__props__.label;
    this.animated = this.__props__.animated;
    this.borderRadius = this.__props__.borderRadius;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "progress",
  props: {
    value: { default: 0 },
    max: { default: 100 },
    height: { default: 8 },
    color: { default: "#007aff" },
    trackColor: { default: "#e5e5ea" },
    showPercent: { type: Boolean, default: true },
    label: { default: "进度" },
    animated: { type: Boolean, default: true },
    borderRadius: { default: 4 }
  },
  setup(__props) {
    const props = __props;
    const percent = common_vendor.computed(() => {
      let p = props.value / props.max * 100;
      p = Math.min(Math.max(p, 0), 100);
      return Math.floor(p);
    });
    const trackStyle = common_vendor.computed(() => {
      return new common_vendor.UTSJSONObject({
        height: props.height + "px",
        backgroundColor: props.trackColor,
        borderRadius: props.borderRadius + "px",
        overflow: "hidden"
      });
    });
    const fillStyle = common_vendor.computed(() => {
      return new common_vendor.UTSJSONObject({
        width: percent.value + "%",
        height: "100%",
        backgroundColor: props.color,
        borderRadius: props.borderRadius + "px",
        transition: props.animated ? `width 0.3s ease-out` : "none"
      });
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.s(fillStyle.value),
        b: common_vendor.s(trackStyle.value),
        c: _ctx.showPercent
      }, _ctx.showPercent ? {
        d: common_vendor.t(percent.value)
      } : {}, {
        e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        f: `${_ctx.u_s_b_h}px`,
        g: `${_ctx.u_s_a_i_b}px`,
        h: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce629c39"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/progress.js.map
