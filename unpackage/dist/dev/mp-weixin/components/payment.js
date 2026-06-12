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
    amount: {}
  },
  emits: ["cancel", "confirm"],
  setup(__props, _a) {
    var _b, _c, _d, _e;
    var __emit = _a.emit;
    const props = __props;
    const cardNumber = (_b = props.cardNumber) !== null && _b !== void 0 ? _b : "1064916585160";
    const productName = (_c = props.productName) !== null && _c !== void 0 ? _c : "车联网月包20G";
    const traffic = (_d = props.traffic) !== null && _d !== void 0 ? _d : "20GB";
    const validityPeriod = (_e = props.validityPeriod) !== null && _e !== void 0 ? _e : "30天";
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
      const __returned__ = {
        a: common_vendor.t(common_vendor.unref(cardNumber)),
        b: common_vendor.t(common_vendor.unref(productName)),
        c: common_vendor.t(common_vendor.unref(traffic)),
        d: common_vendor.t(common_vendor.unref(validityPeriod)),
        e: common_vendor.t(common_vendor.unref(formattedAmount)),
        f: common_vendor.o(handleCancel, "bd"),
        g: common_vendor.p({
          class: "btn cancel-btn mr-24 data-v-0c94e3a5"
        }),
        h: common_vendor.o(handleConfirm, "61"),
        i: common_vendor.p({
          textColor: "#fff",
          class: "btn confirm-btn ml-24 data-v-0c94e3a5"
        }),
        j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        k: `${_ctx.u_s_b_h}px`,
        l: `${_ctx.u_s_a_i_b}px`,
        m: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c94e3a5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/payment.js.map
