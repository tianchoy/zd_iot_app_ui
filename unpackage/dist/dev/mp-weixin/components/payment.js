"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  _easycom_rice_button_1();
}
const _easycom_rice_button = () => "../uni_modules/rice-ui/components/rice-button/rice-button.js";
if (!Math) {
  _easycom_rice_button();
}
class PaymentMethod extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          label: { type: String, optional: false },
          desc: { type: String, optional: true }
        };
      },
      name: "PaymentMethod"
    };
  }
  constructor(options, metadata = PaymentMethod.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.label = this.__props__.label;
    this.desc = this.__props__.desc;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "payment",
  props: {
    cardNumber: {},
    productName: {},
    traffic: {},
    validityPeriod: {},
    amount: {},
    pkgType: {}
  },
  emits: ["cancel", "confirm"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const formattedAmount = common_vendor.computed(() => {
      return `￥${props.amount}`;
    });
    common_vendor.ref([
      new PaymentMethod({ id: "wechat_h5", label: "微信H5支付", desc: "推荐使用微信完成支付" }),
      new PaymentMethod({ id: "alipay", label: "支付宝支付", desc: "通过支付宝完成支付" }),
      new PaymentMethod({ id: "bank_card", label: "银行卡支付", desc: "支持常见银行卡支付" })
    ]);
    common_vendor.ref("wechat_h5");
    const handleCancel = () => {
      emit("cancel");
    };
    const handleConfirm = () => {
      emit("confirm", "wechat_miniprogram");
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: props.cardNumber
      }, props.cardNumber ? {
        b: common_vendor.t(props.cardNumber)
      } : {}, {
        c: props.productName
      }, props.productName ? {
        d: common_vendor.t(props.productName)
      } : {}, {
        e: props.traffic
      }, props.traffic ? {
        f: common_vendor.t(props.traffic)
      } : {}, {
        g: props.validityPeriod
      }, props.validityPeriod ? {
        h: common_vendor.t(props.validityPeriod),
        i: common_vendor.t((props == null ? void 0 : props.pkgType) == "1" ? "天" : "个月")
      } : {}, {
        j: common_vendor.t(common_vendor.unref(formattedAmount)),
        k: common_vendor.o(handleCancel, "10"),
        l: common_vendor.p({
          class: "btn cancel-btn mr-24 data-v-0c94e3a5"
        }),
        m: common_vendor.o(handleConfirm, "26"),
        n: common_vendor.p({
          textColor: "#fff",
          class: "btn confirm-btn ml-24 data-v-0c94e3a5"
        }),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        p: `${_ctx.u_s_b_h}px`,
        q: `${_ctx.u_s_a_i_b}px`,
        r: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c94e3a5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/payment.js.map
