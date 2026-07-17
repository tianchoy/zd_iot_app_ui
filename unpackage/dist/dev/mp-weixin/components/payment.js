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
          merchantConfigId: { type: String, optional: false },
          payType: { type: String, optional: false },
          desc: { type: String, optional: true }
        };
      },
      name: "PaymentMethod"
    };
  }
  constructor(options, metadata = PaymentMethod.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.merchantConfigId = this.__props__.merchantConfigId;
    this.payType = this.__props__.payType;
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
    pkgType: {},
    payMethod: {}
  },
  emits: ["cancel", "confirm"],
  setup(__props, _a) {
    var _b;
    var __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const formattedAmount = common_vendor.computed(() => {
      return `￥${props.amount}`;
    });
    const sortedPayMethods = common_vendor.computed(() => {
      const methods = props.payMethod || [];
      const priority = {
        "wechat_pay": 0,
        "ali_pay": 1
      };
      return [...methods].sort((a = null, b = null) => {
        var _a2, _b2;
        const priorityA = (_a2 = priority[a.payType]) !== null && _a2 !== void 0 ? _a2 : 99;
        const priorityB = (_b2 = priority[b.payType]) !== null && _b2 !== void 0 ? _b2 : 99;
        return priorityA - priorityB;
      });
    });
    common_vendor.ref((_b = sortedPayMethods.value[0]) === null || _b === void 0 ? null : _b.merchantConfigId);
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
        k: common_vendor.o(handleCancel, "41"),
        l: common_vendor.p({
          class: "btn cancel-btn mr-24 data-v-0c94e3a5"
        }),
        m: common_vendor.o(handleConfirm, "90"),
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
