"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "selectCountry",
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number],
      default: null
    },
    // 选项列表
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 值字段名
    valueKey: {
      type: String,
      default: "value"
    },
    // 标签字段名
    labelKey: {
      type: String,
      default: "label"
    },
    // 搜索框占位符
    searchPlaceholder: {
      type: String,
      default: "请输入关键词搜索"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const searchKeyword = common_vendor.ref("");
    const filteredOptions = common_vendor.computed(() => {
      if (!searchKeyword.value.trim()) {
        return props.options;
      }
      const keyword = searchKeyword.value.toLowerCase();
      return props.options.filter((opt) => {
        const label = String(opt[props.labelKey]).toLowerCase();
        const value = String(opt[props.valueKey]).toLowerCase();
        return label.includes(keyword) || value.includes(keyword);
      });
    });
    const isSelected = (item) => {
      return props.modelValue === item[props.valueKey];
    };
    const selectOption = (item) => {
      const newValue = item[props.valueKey];
      emit("update:modelValue", newValue);
      emit("change", newValue, item);
    };
    const handleSearch = () => {
    };
    const clearSearch = () => {
      searchKeyword.value = "";
    };
    const resetSearch = () => {
      searchKeyword.value = "";
    };
    __expose({
      resetSearch
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: __props.searchPlaceholder,
        b: common_vendor.o([($event) => {
          return searchKeyword.value = $event.detail.value;
        }, handleSearch], "66"),
        c: searchKeyword.value,
        d: searchKeyword.value
      }, searchKeyword.value ? {
        e: common_vendor.o(clearSearch, "87")
      } : {}, {
        f: filteredOptions.value.length === 0
      }, filteredOptions.value.length === 0 ? {} : {}, {
        g: common_vendor.f(filteredOptions.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item[__props.labelKey]),
            b: isSelected(item)
          }, isSelected(item) ? {} : {}, {
            c: item[__props.valueKey],
            d: isSelected(item) ? 1 : "",
            e: common_vendor.o(($event) => {
              return selectOption(item);
            }, item[__props.valueKey])
          });
        }),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        i: `${_ctx.u_s_b_h}px`,
        j: `${_ctx.u_s_a_i_b}px`,
        k: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0594d1ce"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/selectCountry.js.map
