"use strict";
const common_vendor = require("../../../../common/vendor.js");
class TouchPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
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
    icon: {
      type: String,
      default: ""
    },
    iconSize: {
      type: [Number, String],
      default: 52
    },
    draggable: {
      type: Boolean,
      default: true
      // 默认启用拖拽
    },
    snapEdge: {
      type: Boolean,
      default: true
    },
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
      // 拖拽相关
      touchStartX: 0,
      touchStartY: 0,
      touchStartLeft: 0,
      touchStartTop: 0,
      isDragging: false,
      hasMoved: false,
      moveDistance: 0,
      clickTimer: null
      // 点击延迟定时器
    };
  },
  computed: {
    safeBtnList() {
      const list = this.btnList;
      return list == null ? [] : list;
    },
    iconName() {
      const s = this.icon;
      if (s == null)
        return "";
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
      const st = new common_vendor.UTSJSONObject({});
      st["zIndex"] = this.baseZ;
      st["position"] = "fixed";
      st["left"] = this.dragLeftPx + "px";
      st["top"] = this.dragTopPx + "px";
      st["right"] = "auto";
      st["bottom"] = "auto";
      st["display"] = "flex";
      st["flexDirection"] = "column";
      st["alignItems"] = "flex-end";
      return st;
    },
    mainStyle() {
      const st = new common_vendor.UTSJSONObject({});
      st["width"] = "" + this.width + "rpx";
      st["height"] = "" + this.height + "rpx";
      st["borderRadius"] = this.radius;
      st["backgroundColor"] = this.bgColor;
      if (!this.isDragging) {
        st["transition"] = "left 0.2s ease, top 0.2s ease";
      }
      return st;
    },
    mainDragClass() {
      const out = [];
      out.push("m-fab__main");
      if (this.isDragging) {
        out.push("m-fab__main--dragging");
      }
      return out;
    }
  },
  mounted() {
    this.initPosition();
    this.$nextTick(() => {
      this.measureWrapSize();
    });
  },
  methods: {
    // 初始化位置
    initPosition() {
      if (!this.draggable) {
        const sys = common_vendor.index.getSystemInfoSync();
        this.winW = sys.windowWidth;
        this.winH = sys.windowHeight;
        const fabW = common_vendor.index.rpx2px(parseInt(this.width));
        const fabH = common_vendor.index.rpx2px(parseInt(this.height));
        const right = common_vendor.index.rpx2px(parseInt(this.right));
        const bottom = common_vendor.index.rpx2px(parseInt(this.bottom));
        this.dragLeftPx = this.winW - fabW - right;
        this.dragTopPx = this.winH - fabH - bottom;
      } else {
        const sys = common_vendor.index.getSystemInfoSync();
        this.winW = sys.windowWidth;
        this.winH = sys.windowHeight;
        const fabW = common_vendor.index.rpx2px(parseInt(this.width));
        const fabH = common_vendor.index.rpx2px(parseInt(this.height));
        const right = common_vendor.index.rpx2px(parseInt(this.right));
        const bottom = common_vendor.index.rpx2px(parseInt(this.bottom));
        this.dragLeftPx = this.winW - fabW - right;
        this.dragTopPx = this.winH - fabH - bottom;
      }
    },
    measureWrapSize() {
      const self = this;
      try {
        const q = common_vendor.index.createSelectorQuery().in(self);
        q.select(".m-fab__wrap").boundingClientRect((rect = null) => {
          if (rect == null)
            return null;
          const data = rect;
          const w = data["width"];
          const h = data["height"];
          if (w > 0 && h > 0) {
            self.wrapWpx = w;
            self.wrapHpx = h;
          }
        }).exec();
      } catch (_e) {
      }
    },
    // 吸边
    applySnap() {
      if (!this.snapEdge)
        return null;
      const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
      const w = this.wrapWpx > 0 ? this.wrapWpx : common_vendor.index.rpx2px(parseInt(this.width));
      const currentCenter = this.dragLeftPx + w / 2;
      if (currentCenter < this.winW / 2) {
        this.dragLeftPx = pad;
      } else {
        this.dragLeftPx = this.winW - w - pad;
      }
      const h = this.wrapHpx > 0 ? this.wrapHpx : common_vendor.index.rpx2px(parseInt(this.height));
      this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad));
    },
    snapPaddingRpx() {
      const sp = this.snapPadding;
      const n = typeof sp === "number" ? sp : parseInt("" + sp);
      return isNaN(n) ? 16 : n;
    },
    // 获取触摸点坐标
    getTouchPoint(e = null) {
      const event = e;
      const touches = event["touches"];
      if (touches == null || touches.length == 0)
        return null;
      const touch = touches[0];
      let x = touch["clientX"];
      let y = touch["clientY"];
      if (x == null)
        x = touch["pageX"];
      if (y == null)
        y = touch["pageY"];
      return new TouchPoint(x == null ? 0 : x, y == null ? 0 : y);
    },
    // 触摸开始
    onTouchStart(e = null) {
      if (!this.draggable) {
        this.onClick();
        return null;
      }
      const point = this.getTouchPoint(e);
      if (point == null)
        return null;
      this.touchStartX = point.x;
      this.touchStartY = point.y;
      this.touchStartLeft = this.dragLeftPx;
      this.touchStartTop = this.dragTopPx;
      this.hasMoved = false;
      this.moveDistance = 0;
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
      }
    },
    // 触摸移动
    onTouchMove(e = null) {
      var _a;
      if (!this.draggable)
        return null;
      const point = this.getTouchPoint(e);
      if (point == null)
        return null;
      const deltaX = point.x - this.touchStartX;
      const deltaY = point.y - this.touchStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 10) {
        if (!this.hasMoved) {
          this.hasMoved = true;
          this.isDragging = true;
        }
        this.moveDistance = distance;
        let newLeft = this.touchStartLeft + deltaX;
        let newTop = this.touchStartTop + deltaY;
        const pad = common_vendor.index.rpx2px(this.snapPaddingRpx());
        const w = this.wrapWpx > 0 ? this.wrapWpx : common_vendor.index.rpx2px(parseInt(this.width));
        const h_1 = this.wrapHpx > 0 ? this.wrapHpx : common_vendor.index.rpx2px(parseInt(this.height));
        newLeft = Math.max(pad, Math.min(newLeft, this.winW - w - pad));
        newTop = Math.max(pad, Math.min(newTop, this.winH - h_1 - pad));
        this.dragLeftPx = newLeft;
        this.dragTopPx = newTop;
        (_a = e.preventDefault) === null || _a === void 0 ? null : _a.call(e);
      }
    },
    // 触摸结束
    onTouchEnd(e = null) {
      if (!this.draggable)
        return null;
      if (this.hasMoved && this.moveDistance > 10) {
        this.isDragging = false;
        this.applySnap();
        this.$emit("dragend", new common_vendor.UTSJSONObject({
          leftPx: this.dragLeftPx,
          topPx: this.dragTopPx
        }));
      } else if (!this.hasMoved || this.moveDistance <= 10) {
        this.clickTimer = setTimeout(() => {
          this.onClick();
          this.clickTimer = null;
        }, 50);
      }
      setTimeout(() => {
        this.hasMoved = false;
        this.moveDistance = 0;
        this.isDragging = false;
      }, 100);
    },
    // 触摸取消
    onTouchCancel(e = null) {
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
      }
      this.hasMoved = false;
      this.moveDistance = 0;
      this.isDragging = false;
    },
    // 点击处理
    onClick() {
      const list = this.btnList;
      if (list.length > 0) {
        this.expanded = !this.expanded;
        this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
        return null;
      }
      this.$emit("click", new common_vendor.UTSJSONObject({ index: 0 }));
    },
    // 子菜单点击
    onSubTap(idx) {
      this.$emit("click", new common_vendor.UTSJSONObject({ index: idx + 1 }));
      this.expanded = false;
    },
    // 收起菜单
    collapse() {
      this.expanded = false;
    },
    // 子菜单文本
    subText(btn) {
      const k = this.textField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    // 子菜单图片
    subImg(btn) {
      const k = this.imgField;
      const v = btn[k];
      return v == null ? "" : "" + v;
    },
    // 子菜单颜色
    subColor(btn) {
      const c = btn["color"];
      return c == null ? "#ffffff" : "" + c;
    },
    // 子菜单字体大小
    subFontSize(btn) {
      const fs = btn["fontSize"];
      if (fs != null) {
        const n = typeof fs === "number" ? fs : parseInt("" + fs);
        if (!isNaN(n))
          return n;
      }
      const d = this.size;
      return typeof d === "number" ? d : parseInt("" + d);
    },
    // 子菜单样式
    subStyle(btn) {
      const st = new common_vendor.UTSJSONObject({});
      const bg = btn["bgColor"];
      st["backgroundColor"] = bg == null ? "#16c2c2" : "" + bg;
      return st;
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
    d: $options.safeBtnList.length > 0
  }, $options.safeBtnList.length > 0 ? {
    e: common_vendor.f($options.safeBtnList, (btn, idx, i0) => {
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
    m: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args), "35"),
    n: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args), "cb"),
    o: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args), "8f"),
    p: common_vendor.o((...args) => $options.onTouchCancel && $options.onTouchCancel(...args), "75"),
    q: common_vendor.s($options.wrapStyle),
    r: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    s: `${_ctx.u_s_b_h}px`,
    t: `${_ctx.u_s_a_i_b}px`,
    v: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-fab/m-fab.js.map
