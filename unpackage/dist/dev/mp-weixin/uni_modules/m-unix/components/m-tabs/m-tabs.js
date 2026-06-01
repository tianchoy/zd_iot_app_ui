"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mTabs",
  emits: ["change"],
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    field: {
      type: String,
      default: "name"
    },
    badgeField: {
      type: String,
      default: "num"
    },
    height: {
      type: Number,
      default: 80
    },
    padding: {
      type: Number,
      default: 30
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    unlined: {
      type: Boolean,
      default: false
    },
    currentTab: {
      type: Number,
      default: 0
    },
    isSlider: {
      type: Boolean,
      default: true
    },
    sliderWidth: {
      type: Number,
      default: 68
    },
    sliderHeight: {
      type: Number,
      default: 6
    },
    sliderBgColor: {
      type: String,
      default: "#5677fc"
    },
    sliderRadius: {
      type: String,
      default: "50rpx"
    },
    itemWidth: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#666666"
    },
    selectedColor: {
      type: String,
      default: "#5677fc"
    },
    size: {
      type: Number,
      default: 28
    },
    bold: {
      type: Boolean,
      default: false
    },
    scale: {
      type: [Number, String],
      default: 1
    },
    badgeColor: {
      type: String,
      default: "#ffffff"
    },
    badgeBgColor: {
      type: String,
      default: "#F74D54"
    },
    zIndex: {
      type: [Number, String],
      default: 996
    },
    customStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    itemStyle: {
      type: Object,
      default: () => {
        return new common_vendor.UTSJSONObject({});
      }
    },
    // ========== 新增选中项样式参数 ==========
    selectedBgColor: {
      type: String,
      default: ""
    },
    selectedBorderColor: {
      type: String,
      default: ""
    },
    selectedBorderWidth: {
      type: String,
      default: "0"
    },
    selectedBorderRadius: {
      type: String,
      default: "0"
    },
    // 未选中项背景色（可选）
    unselectedBgColor: {
      type: String,
      default: ""
    },
    // 是否显示选中项边框
    showSelectedBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabCount() {
      return this.tabs.length;
    },
    itemWidthComputed() {
      const iw = this.itemWidth;
      if (iw != null && iw.length > 0) {
        return iw;
      }
      const n = this.tabCount;
      if (n <= 0) {
        return "25%";
      }
      return 100 / n + "%";
    },
    rootStyle() {
      const st = new common_vendor.UTSJSONObject({});
      const z = this.zIndex;
      st["zIndex"] = typeof z === "number" ? z : parseInt("" + z);
      if (this.isFixed) {
        st["position"] = "fixed";
        st["left"] = "0";
        st["right"] = "0";
        st["top"] = this.top + "px";
      }
      if (this.customStyle != null) {
        Object.assign(st, this.customStyle);
      }
      return st;
    },
    sliderAnchorStyle() {
      const n = this.tabCount;
      if (n <= 0) {
        return new common_vendor.UTSJSONObject({});
      }
      let i = this.currentTab;
      if (i < 0) {
        i = 0;
      }
      if (i >= n) {
        i = n - 1;
      }
      const pct = (i + 0.5) / n * 100;
      return new common_vendor.UTSJSONObject({
        left: pct + "%",
        transition: "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)"
      });
    }
  },
  methods: {
    tabLabel(tab) {
      const k = this.field;
      const v = tab[k];
      return v == null ? "" : "" + v;
    },
    badgeText(tab) {
      const k = this.badgeField;
      const v = tab[k];
      if (v == null) {
        return "";
      }
      const s = "" + v;
      if (s === "0" || s === "") {
        return "";
      }
      return s;
    },
    tabDot(tab) {
      return tab["isDot"] === true;
    },
    tabDisabled(tab) {
      return tab["disabled"] === true;
    },
    // 计算每个选项卡内层的样式（支持选中/未选中背景色、边框）
    itemInnerStyle(idx, tab) {
      const st = new common_vendor.UTSJSONObject({});
      const isSelected = this.currentTab === idx;
      const isDisabled = this.tabDisabled(tab);
      if (this.itemStyle != null) {
        Object.assign(st, this.itemStyle);
      }
      if (isDisabled) {
        st["opacity"] = "0.5";
      } else if (isSelected) {
        if (this.selectedBgColor && this.selectedBgColor !== "") {
          st["backgroundColor"] = this.selectedBgColor;
        }
        if (this.showSelectedBorder && this.selectedBorderColor) {
          st["borderColor"] = this.selectedBorderColor;
          st["borderWidth"] = this.selectedBorderWidth;
          st["borderStyle"] = "solid";
        }
        if (this.selectedBorderRadius && this.selectedBorderRadius !== "0") {
          st["borderRadius"] = this.selectedBorderRadius;
        }
      } else {
        if (this.unselectedBgColor && this.unselectedBgColor !== "") {
          st["backgroundColor"] = this.unselectedBgColor;
        }
      }
      return st;
    },
    textStyle(idx, tab) {
      const st = new common_vendor.UTSJSONObject({});
      const sel = this.currentTab === idx;
      const dis = this.tabDisabled(tab);
      if (dis) {
        st["color"] = "#cccccc";
      } else if (sel) {
        st["color"] = this.selectedColor;
      } else {
        st["color"] = this.color;
      }
      st["font-size"] = this.size + "rpx";
      if (this.bold && sel) {
        st["font-weight"] = "bold";
      }
      if (sel) {
        const sc = this.scale;
        const f = typeof sc === "number" ? sc : parseFloat("" + sc);
        if (!isNaN(f) && f !== 1) {
          st["transform"] = "scale(" + f + ")";
        }
      }
      return st;
    },
    onTabTap(idx, tab) {
      if (this.tabDisabled(tab)) {
        return null;
      }
      this.$emit("change", new common_vendor.UTSJSONObject({ index: idx, item: tab }));
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return common_vendor.e({
    a: common_vendor.f($props.tabs, (tab, idx, i0) => {
      return common_vendor.e({
        a: common_vendor.t($options.tabLabel(tab)),
        b: common_vendor.s($options.textStyle(idx, tab)),
        c: $options.badgeText(tab) !== ""
      }, $options.badgeText(tab) !== "" ? {
        d: common_vendor.t($options.badgeText(tab)),
        e: $props.badgeColor,
        f: $props.badgeBgColor
      } : $options.tabDot(tab) ? {
        h: $props.badgeBgColor
      } : {}, {
        g: $options.tabDot(tab),
        i: common_vendor.s($options.itemInnerStyle(idx, tab)),
        j: idx,
        k: common_vendor.o(($event) => $options.onTabTap(idx, tab), idx)
      });
    }),
    b: $options.itemWidthComputed,
    c: $props.isSlider && $options.tabCount > 0
  }, $props.isSlider && $options.tabCount > 0 ? {
    d: $props.sliderBgColor,
    e: $props.sliderHeight + "rpx",
    f: $props.sliderRadius,
    g: $props.sliderWidth + "rpx",
    h: common_vendor.s($options.sliderAnchorStyle)
  } : {}, {
    i: $props.height + "rpx",
    j: $props.padding + "rpx",
    k: $props.padding + "rpx",
    l: $props.backgroundColor,
    m: !$props.unlined
  }, !$props.unlined ? {} : {}, {
    n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    o: $props.isFixed ? 1 : "",
    p: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass),
    q: common_vendor.s($options.rootStyle),
    r: common_vendor.s({
      "--status-bar-height": `${_ctx.u_s_b_h}px`,
      "--uni-safe-area-inset-bottom": `${_ctx.u_s_a_i_b}px`
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tabs/m-tabs.js.map
