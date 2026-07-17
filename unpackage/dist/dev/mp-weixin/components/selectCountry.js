"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "selectCountry",
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number, null],
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
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    // 最大高度
    maxHeight: {
      type: String,
      default: "50%"
    },
    // 最小高度
    minHeight: {
      type: String,
      default: "50%"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const props = __props;
    const emit = __emit;
    const searchKeyword = common_vendor.ref("");
    const safeToString = (value = null) => {
      if (value == null)
        return "";
      if (typeof value === "string")
        return value;
      if (typeof value === "number")
        return value.toString();
      return "";
    };
    const getItemLabel = (item) => {
      const label = item.getString(props.labelKey);
      if (label != null) {
        return label;
      }
      const num = item.getNumber(props.labelKey);
      if (num != null) {
        return num.toString();
      }
      return "";
    };
    const getItemValue = (item) => {
      if (item == null)
        return null;
      const value = item[props.valueKey];
      if (value == null)
        return null;
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
      return safeToString(value);
    };
    const getFilteredOptions = () => {
      const optionsList = props.options;
      if (!optionsList || optionsList.length === 0) {
        return [];
      }
      const keyword = searchKeyword.value;
      if (!keyword || keyword.trim().length === 0) {
        return optionsList;
      }
      const lowerKeyword = keyword.toLowerCase();
      const result = [];
      for (let i = 0; i < optionsList.length; i++) {
        const opt = optionsList[i];
        const label = getItemLabel(opt).toLowerCase();
        const itemValue = getItemValue(opt);
        let value = "";
        if (itemValue != null) {
          value = safeToString(itemValue).toLowerCase();
        }
        if (label.includes(lowerKeyword) || value.includes(lowerKeyword)) {
          result.push(opt);
        }
      }
      return result;
    };
    const filteredOptions = common_vendor.computed(() => {
      return getFilteredOptions();
    });
    const getItemKey = (item, index) => {
      const value = getItemValue(item);
      if (value != null) {
        return safeToString(value);
      }
      return `option-${index}`;
    };
    const isSelected = (item) => {
      const currentValue = props.modelValue;
      const itemValue = getItemValue(item);
      if (currentValue == null)
        return false;
      if (itemValue == null)
        return false;
      return safeToString(currentValue) === safeToString(itemValue);
    };
    const selectOption = (item) => {
      const newValue = getItemValue(item);
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
        e: common_vendor.o(clearSearch, "ba")
      } : {}, {
        f: filteredOptions.value.length === 0
      }, filteredOptions.value.length === 0 ? {
        g: common_vendor.t(__props.emptyText)
      } : {}, {
        h: common_vendor.f(filteredOptions.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getItemLabel(item)),
            b: isSelected(item)
          }, isSelected(item) ? {} : {}, {
            c: getItemKey(item, index),
            d: isSelected(item) ? 1 : "",
            e: common_vendor.o(($event) => {
              return selectOption(item);
            }, getItemKey(item, index))
          });
        }),
        i: __props.maxHeight,
        j: __props.minHeight,
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        l: `${_ctx.u_s_b_h}px`,
        m: `${_ctx.u_s_a_i_b}px`,
        n: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
      });
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0594d1ce"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/selectCountry.js.map
