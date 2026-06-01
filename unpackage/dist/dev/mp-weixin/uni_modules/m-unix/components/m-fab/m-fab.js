"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mFab",
  emits: ["click", "dragend"],
  props: {
    left: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: [Number, String],
      default: 80
    },
    bottom: {
      type: [Number, String],
      default: 100
    },
    top: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: 997
    },
    width: {
      type: [Number, String],
      default: 80
    },
    height: {
      type: [Number, String],
      default: 80
    },
    radius: {
      type: String,
      default: "50%"
    },
    custom: {
      type: Boolean,
      default: false
    },
    /** m-icon 名称；非空且非 custom 时显示图标，否则显示「+」 */
    icon: {
      type: String,
      default: ""
    },
    /** 主按钮图标字号（rpx，与 m-icon size 一致） */
    iconSize: {
      type: [Number, String],
      default: 52
    },
    /** 为 true 时可按住主按钮拖动，松手后可选吸边 */
    draggable: {
      type: Boolean,
      default: false
    },
    /** 拖动结束后是否吸附到左右近侧（需 draggable） */
    snapEdge: {
      type: Boolean,
      default: true
    },
    /** 吸边与拖动边界留白（rpx） */
    snapPadding: {
      type: [Number, String],
      default: 16
    },
    bgColor: {
      type: String,
      default: "#5677fc"
    },
    color: {
      type: String,
      default: "#ffffff"
    },
    btnList: {
      type: Array,
      default() {
        return [];
      }
    },
    textField: {
      type: String,
      default: "text"
    },
    imgField: {
      type: String,
      default: "imgUrl"
    },
    size: {
      type: [Number, String],
      default: 28
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false,
      winW: 0,
      winH: 0,
      dragLeftPx: 0,
      dragTopPx: 0,
      dragReady: false,
      wrapWpx: 0,
      wrapHpx: 0,
      dragStartTouchX: 0,
      dragStartTouchY: 0,
      dragStartLeftPx: 0,
      dragStartTopPx: 0,
      dragMoved: false,
      dragSuppressedTap: false
    };
  },
  computed: {
    iconName() {
      const s = this.icon;
      if (s == null) {
        return "";
      }
      const t = s.trim();
      return t;
    },
    baseZ() {
      const zi = this.zIndex;
      const n = typeof zi === "number" ? zi : parseInt("" + zi);
      return isNaN(n) ? 997 : n;
    },
    maskZIndex() {
      return this.baseZ - 1;
    },
    wrapStyle() {
      if (this.draggable) {
        const st_1 = new common_vendor.UTSJSONObject({});
        st_1["zIndex"] = this.baseZ;
        st_1["position"] = "fixed";
        st_1["left"] = this.dragLeftPx + "px";
        st_1["top"] = this.dragTopPx + "px";
        st_1["right"] = "auto";
        st_1["bottom"] = "auto";
        st_1["display"] = "flex";
        st_1["flexDirection"] = "column";
        st_1["alignItems"] = "flex-end";
        return st_1;
      }
      const st = new common_vendor.UTSJSONObject({});
      st["zIndex"] = this.baseZ;
      st["position"] = "fixed";
      const t = this.top;
      const tp = typeof t === "number" ? t : parseInt("" + t);
      if (!isNaN(tp) && tp > 0) {
        st["top"] = t + "rpx";
        st["bottom"] = "auto";
      } else {
        st["bottom"] = this.bottom + "rpx";
      }
      const l = this.left;
      const ln = typeof l === "number" ? l : parseInt("" + l);
      if (!isNaN(ln) && ln > 0) {
        st["left"] = l + "rpx";
        st["right"] = "auto";
      } else {
        st["right"] = this.right + "rpx";
        st["left"] = "auto";
      }
      st["display"] = "flex";
      st["flexDirection"] = "column";
      st["alignItems"] = "flex-end";
      return st;
    },
    mainStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["width"] = this.width + "rpx";
      st["height"] = this.height + "rpx";
      st["borderRadius"] = this.radius;
      st["backgroundColor"] = this.bgColor;
      return st;
    },
    /** 内置图标/「+」时子节点不抢触摸；custom 插槽不关闭子节点事件 */
    mainDragClass() {
      const out = [];
      out.push("m-fab__main");
      const d = this.draggable;
      if (d) {
        out.push("m-fab__main--drag");
        if (!this.custom) {
          out.push("m-fab__main--drag-pass");
        }
      }
      return out;
    }
  },
  watch: {
    expanded() {
      this.$nextTick(() => {
        this.measureWrapSize();
      });
    }
  },
  mounted() {
    this.initDragMetrics();
    this.$nextTick(() => {
      this.measureWrapSize();
    });
  },
  methods: {
    snapPaddingRpx() {
      const sp = this.snapPadding;
      const n = typeof sp === "number" ? sp : parseInt("" + sp);
      return isNaN(n) ? 16 : n;
    },
    mainWidthPx() {
      const w = this.width;
      const n = typeof w === "number" ? w : parseInt("" + w);
      return common_vendor.index.rpx2px(isNaN(n) ? 108 : n);
    },
    mainHeightPx() {
      const h = this.height;
      const n = typeof h === "number" ? h : parseInt("" + h);
      return common_vendor.index.rpx2px(isNaN(n) ? 108 : n);
    },
    wrapWOrDefault() {
      if (this.wrapWpx > 0) {
        return this.wrapWpx;
      }
      return this.mainWidthPx();
    },
    wrapHOrDefault() {
      if (this.wrapHpx > 0) {
        return this.wrapHpx;
      }
      return this.mainHeightPx();
    },
    initDragMetrics() {
      if (!this.draggable) {
        return null;
      }
      const sys = common_vendor.index.getSystemInfoSync();
      this.winW = sys.windowWidth;
      this.winH = sys.windowHeight;
      const fabW = this.mainWidthPx();
      const fabH = this.mainHeightPx();
      const t = this.top;
      const tp = typeof t === "number" ? t : parseInt("" + t);
      const l = this.left;
      const ln = typeof l === "number" ? l : parseInt("" + l);
      const r = this.right;
      const rn = typeof r === "number" ? r : parseInt("" + r);
      const b = this.bottom;
      const bn = typeof b === "number" ? b : parseInt("" + b);
      if (!isNaN(tp) && tp > 0) {
        const lr = !isNaN(ln) && ln > 0 ? common_vendor.index.rpx2px(ln) : common_vendor.index.rpx2px(80);
        this.dragLeftPx = lr;
        this.dragTopPx = common_vendor.index.rpx2px(tp);
      } else {
        this.dragTopPx = this.winH - fabH - common_vendor.index.rpx2px(isNaN(bn) ? 100 : bn);
        if (!isNaN(ln) && ln > 0) {
          this.dragLeftPx = common_vendor.index.rpx2px(ln);
        } else {
          this.dragLeftPx = this.winW - fabW - common_vendor.index.rpx2px(isNaN(rn) ? 80 : rn);
        }
      }
      this.dragReady = true;
    },
    measureWrapSize() {
      const self = this;
      try {
        const q = common_vendor.index.createSelectorQuery().in(self);
        q.select(".m-fab__wrap").boundingClientRect((rect = null) => {
          if (rect == null) {
            return null;
          }
          const w = rect.width;
          const h = rect.height;
          if (w > 0 && h > 0) {
            self.wrapWpx = w;
            self.wrapHpx = h;
          }
        }).exec();
      } catch (_e) {
      }
    },
    applySnap() {
      const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
      const w = this.wrapWOrDefault();
      const cx = this.dragLeftPx + w / 2;
      if (cx < this.winW / 2) {
        this.dragLeftPx = pad;
      } else {
        this.dragLeftPx = this.winW - w - pad;
      }
      const h = this.wrapHOrDefault();
      this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad));
    },
    /** 与 m-swipe-action 一致：优先 clientX/Y，兼容 pageX/Y（各端触摸对象字段不一致） */
    touchClientXY(e = null) {
      const touches = e["touches"];
      if (touches == null || touches.length == 0) {
        return null;
      }
      const t0 = touches[0];
      let x = t0["clientX"];
      let y = t0["clientY"];
      if (x == null) {
        x = t0["pageX"];
      }
      if (y == null) {
        y = t0["pageY"];
      }
      if (x == null || y == null) {
        return null;
      }
      return [x, y];
    },
    onDragStart(e = null) {
      if (!this.draggable) {
        return null;
      }
      if (this.winW <= 0 || this.winH <= 0) {
        this.initDragMetrics();
      }
      const xy = this.touchClientXY(e);
      if (xy == null) {
        return null;
      }
      this.dragStartTouchX = xy[0];
      this.dragStartTouchY = xy[1];
      this.dragStartLeftPx = this.dragLeftPx;
      this.dragStartTopPx = this.dragTopPx;
      this.dragMoved = false;
    },
    onDragMove(e = null) {
      if (!this.draggable) {
        return null;
      }
      const xy = this.touchClientXY(e);
      if (xy == null) {
        return null;
      }
      const dx = xy[0] - this.dragStartTouchX;
      const dy = xy[1] - this.dragStartTouchY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        this.dragMoved = true;
      }
      const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
      const w = this.wrapWOrDefault();
      const h = this.wrapHOrDefault();
      let nx = this.dragStartLeftPx + dx;
      let ny = this.dragStartTopPx + dy;
      nx = Math.max(pad, Math.min(nx, this.winW - w - pad));
      ny = Math.max(pad, Math.min(ny, this.winH - h - pad));
      this.dragLeftPx = nx;
      this.dragTopPx = ny;
    },
    onDragEnd() {
      if (!this.draggable) {
        return null;
      }
      const didMove = this.dragMoved;
      if (didMove && this.snapEdge) {
        this.applySnap();
      }
      if (didMove) {
        this.dragSuppressedTap = true;
        this.$emit("dragend", new common_vendor.UTSJSONObject({
          leftPx: this.dragLeftPx,
          topPx: this.dragTopPx
        }));
        const self_1 = this;
        setTimeout(() => {
          self_1.dragSuppressedTap = false;
        }, 120);
      }
      this.dragMoved = false;
    },
    subText(btn) {
      const k = this.textField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    subImg(btn) {
      const k = this.imgField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    subColor(btn) {
      const c = btn["color"];
      return c == null ? "#ffffff" : "" + c;
    },
    subFontSize(btn) {
      const fs = btn["fontSize"];
      if (fs != null) {
        const n = typeof fs === "number" ? fs : parseInt("" + fs);
        if (!isNaN(n)) {
          return n;
        }
      }
      const d = this.size;
      return typeof d === "number" ? d : parseInt("" + d);
    },
    subStyle(btn) {
      const st = new common_vendor.UTSJSONObject({});
      const bg = btn["bgColor"];
      st["backgroundColor"] = bg == null ? "#16c2c2" : "" + bg;
      return st;
    },
    collapse() {
      this.expanded = false;
    },
    onMainTap() {
      if (this.dragSuppressedTap) {
        return null;
      }
      const list = this.btnList;
      if (list.length > 0) {
        this.expanded = !this.expanded;
        this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
        return null;
      }
      this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
    },
    onSubTap(idx) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx + 1 }));
      this.expanded = false;
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
    a: $data.expanded && $props.maskClosable
  }, $data.expanded && $props.maskClosable ? {
    b: $options.maskZIndex,
    c: common_vendor.o((...args) => $options.collapse && $options.collapse(...args), "5b")
  } : {}, {
    d: $props.btnList.length > 0
  }, $props.btnList.length > 0 ? {
    e: common_vendor.f($props.btnList, (btn, idx, i0) => {
      return common_vendor.e({
        a: $options.subImg(btn) !== ""
      }, $options.subImg(btn) !== "" ? {
        b: $options.subImg(btn)
      } : {}, {
        c: common_vendor.t($options.subText(btn)),
        d: $options.subColor(btn),
        e: $options.subFontSize(btn) + "rpx",
        f: idx,
        g: common_vendor.s($options.subStyle(btn)),
        h: common_vendor.o(($event) => $options.onSubTap(idx), idx)
      });
    }),
    f: $data.expanded
  } : {}, {
    g: $props.custom
  }, $props.custom ? {} : $options.iconName !== "" ? {
    i: common_vendor.p({
      name: $options.iconName,
      size: $props.iconSize,
      color: $props.color
    })
  } : {
    j: $props.color
  }, {
    h: $options.iconName !== "",
    k: common_vendor.n($options.mainDragClass),
    l: common_vendor.s($options.mainStyle),
    m: common_vendor.o((...args) => $options.onMainTap && $options.onMainTap(...args), "62"),
    n: common_vendor.o((...args) => $options.onDragStart && $options.onDragStart(...args), "40"),
    o: common_vendor.o((...args) => $options.onDragMove && $options.onDragMove(...args), "5b"),
    p: common_vendor.o((...args) => $options.onDragEnd && $options.onDragEnd(...args), "fb"),
    q: common_vendor.o((...args) => $options.onDragEnd && $options.onDragEnd(...args), "65"),
    r: common_vendor.s($options.wrapStyle),
    s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    t: `${_ctx.u_s_b_h}px`,
    v: `${_ctx.u_s_a_i_b}px`,
    w: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-fab/m-fab.js.map
