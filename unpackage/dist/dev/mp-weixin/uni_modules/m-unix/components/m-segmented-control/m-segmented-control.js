"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mSegmentedControl",
  emits: ["click", "change", "update:current"],
  props: {
    values: {
      type: Array,
      default() {
        return [];
      }
    },
    // 数字数组，与 values 一一对应
    nums: {
      type: Array,
      default() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0
    },
    textActiveColor: {
      type: String,
      default: "#334155"
    },
    activeColor: {
      type: String,
      default: "#e5edf6"
    },
    height: {
      type: String,
      default: "56rpx"
    },
    size: {
      type: String,
      default: "28rpx"
    },
    radius: {
      type: String,
      default: "24rpx"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inactiveColor: {
      type: String,
      default: "#666666"
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5"
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    // 数字样式配置
    numberColor: {
      type: String,
      default: "#999999"
    },
    numberActiveColor: {
      type: String,
      default: "#334155"
    },
    numberBgColor: {
      type: String,
      default: "#e8e8e8"
    },
    numberActiveBgColor: {
      type: String,
      default: "#d4e2f0"
    },
    numberSize: {
      type: String,
      default: "22rpx"
    }
  },
  computed: {
    valueList() {
      const raw = this.values;
      const out = [];
      for (let i = 0; i < raw.length; i++) {
        const v = raw[i];
        if (typeof v === "string") {
          out.push(v);
        } else {
          out.push("" + v);
        }
      }
      return out;
    },
    innerCurrent() {
      const c = this.current;
      const len = this.valueList.length;
      if (len === 0) {
        return 0;
      }
      if (c < 0) {
        return 0;
      }
      if (c >= len) {
        return len - 1;
      }
      return c;
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({
        height: this.height,
        borderRadius: this.radius,
        backgroundColor: this.backgroundColor
      });
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    thumbStyle() {
      const n = this.valueList.length;
      if (n <= 0) {
        return new common_vendor.UTSJSONObject({ display: "none" });
      }
      const pct = 100 / n;
      const i = this.innerCurrent;
      return new common_vendor.UTSJSONObject({
        width: pct + "%",
        left: i * pct + "%",
        transition: "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)",
        borderColor: this.activeColor,
        borderRadius: this.radius
      });
    }
  },
  methods: {
    itemNumber(idx) {
      const numsArr = this.nums;
      if (!numsArr || numsArr.length === 0)
        return null;
      if (idx >= numsArr.length)
        return null;
      const v = numsArr[idx];
      if (v === null || v === void 0)
        return null;
      const num = Number(v);
      if (isNaN(num))
        return null;
      return String(num);
    },
    textStyle(idx) {
      const active = idx === this.innerCurrent;
      return new common_vendor.UTSJSONObject({
        "font-size": this.size,
        color: active ? this.textActiveColor : this.inactiveColor,
        transition: "color 0.28s ease"
      });
    },
    numberStyle(idx) {
      const active = idx === this.innerCurrent;
      return new common_vendor.UTSJSONObject({
        "font-size": this.numberSize,
        color: active ? this.numberActiveColor : this.numberColor,
        backgroundColor: active ? this.numberActiveBgColor : this.numberBgColor,
        transition: "all 0.28s ease"
      });
    },
    onItemTap(idx) {
      if (this.disabled) {
        return null;
      }
      this.$emit("update:current", idx);
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx }));
      this.$emit("change", new common_vendor.UTSJSONObject({ index: idx }));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: $options.valueList.length > 0
  }, $options.valueList.length > 0 ? {
    b: common_vendor.s($options.thumbStyle)
  } : {}, {
    c: common_vendor.f($options.valueList, (item, idx, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item),
        b: common_vendor.s($options.textStyle(idx)),
        c: $options.itemNumber(idx) !== null
      }, $options.itemNumber(idx) !== null ? {
        d: common_vendor.t($options.itemNumber(idx)),
        e: idx === $options.innerCurrent ? 1 : "",
        f: common_vendor.s($options.numberStyle(idx))
      } : {}, {
        g: idx,
        h: common_vendor.o(($event) => $options.onItemTap(idx), idx)
      });
    }),
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    e: $props.disabled ? 1 : "",
    f: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    g: common_vendor.s($options.rootStyle),
    h: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-74c1432a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-segmented-control/m-segmented-control.js.map
