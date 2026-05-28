"use strict";
const common_vendor = require("../common/vendor.js");
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
      { id: "wechat_h5", label: "微信H5支付", desc: "推荐使用微信完成支付" },
      { id: "alipay", label: "支付宝支付", desc: "通过支付宝完成支付" },
      { id: "bank_card", label: "银行卡支付", desc: "支持常见银行卡支付" }
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
        f: common_vendor.o(handleCancel, "f4"),
        g: common_vendor.o(handleConfirm, "87"),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        i: `${_ctx.u_s_b_h}px`,
        j: `${_ctx.u_s_a_i_b}px`,
        k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      };
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c94e3a5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/payment.js.map
