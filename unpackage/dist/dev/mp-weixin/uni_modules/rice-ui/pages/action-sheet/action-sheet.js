"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../components/rice-action-sheet/type.js");
const uni_modules_riceUi_components_riceActionSheet_api = require("../../components/rice-action-sheet/api.js");
if (!Array) {
  const _easycom_rice_action_sheet_1 = common_vendor.resolveComponent("rice-action-sheet");
  _easycom_rice_action_sheet_1();
}
const _easycom_rice_action_sheet = () => "../../components/rice-action-sheet/rice-action-sheet.js";
if (!Math) {
  _easycom_rice_action_sheet();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "rice-action-sheet-page"
}, { __name: "action-sheet", setup(__props, _a) {
  var __expose = _a.expose;
  const show = common_vendor.ref(false);
  const params = common_vendor.ref(new common_vendor.UTSJSONObject({}));
  let busEventName = null;
  let optionsEventName = null;
  let readyEventName = null;
  const dialogPageIns = common_vendor.ref(null);
  const actionsList = common_vendor.computed(() => {
    var _a2;
    return (_a2 = params.value.actions) !== null && _a2 !== void 0 ? _a2 : [];
  });
  const handleBusEvent = (event) => {
    if (busEventName != null) {
      common_vendor.index.$emit(busEventName, event);
    }
  };
  const onSelect = (action, index) => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      errMsg: null,
      pageIns: null,
      type: "select",
      action,
      index
    }));
  };
  const onCancel = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      pageIns: null,
      type: "cancel"
    }));
  };
  const onOpen = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      pageIns: null,
      type: "open"
    }));
  };
  const onClose = () => {
    show.value = false;
  };
  const onOpened = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      pageIns: null,
      type: "opened"
    }));
  };
  const onClosed = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      pageIns: null,
      type: "closed"
    }));
    common_vendor.index.closeDialogPage(new common_vendor.UTSJSONObject({
      dialogPage: dialogPageIns.value
    }));
  };
  const clickOverlay = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      pageIns: null,
      type: "clickOverlay"
    }));
  };
  const updateParams = (data) => {
    for (let key in data) {
      if (data[key] != null) {
        params.value[key] = data[key];
      }
    }
  };
  common_vendor.watch(show, (newVal) => {
    if (!newVal) {
      handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
        action: null,
        index: null,
        errMsg: null,
        pageIns: null,
        type: "close"
      }));
    }
  });
  const close = () => {
    show.value = false;
  };
  common_vendor.onLoad((options) => {
    readyEventName = options["readyEventName"];
    optionsEventName = options["optionsEventName"];
    busEventName = options["busEventName"];
    if (readyEventName != null && optionsEventName != null) {
      common_vendor.index.$on(optionsEventName, (data) => {
        params.value = data;
      });
      common_vendor.index.$emit(readyEventName, new common_vendor.UTSJSONObject({}));
    }
  });
  common_vendor.onReady(() => {
    var _a2, _b;
    show.value = true;
    dialogPageIns.value = (_b = (_a2 = common_vendor.getCurrentInstance()) === null || _a2 === void 0 ? null : _a2.proxy) === null || _b === void 0 ? null : _b.$page;
    handleBusEvent(new uni_modules_riceUi_components_riceActionSheet_api.ActionSheetBusEvent({
      action: null,
      index: null,
      errMsg: null,
      type: "ready",
      pageIns: dialogPageIns.value
    }));
  });
  common_vendor.onBackPress(() => {
    close();
    return true;
  });
  common_vendor.onUnload(() => {
    if (busEventName != null)
      common_vendor.index.$off(busEventName, null);
    if (optionsEventName != null)
      common_vendor.index.$off(optionsEventName, null);
    if (readyEventName != null)
      common_vendor.index.$off(readyEventName, null);
  });
  __expose({
    updateParams,
    close
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.gei(_ctx, ""),
      b: common_vendor.o(onSelect, "e1"),
      c: common_vendor.o(onCancel, "64"),
      d: common_vendor.o(onOpen, "99"),
      e: common_vendor.o(onClose, "6a"),
      f: common_vendor.o(onOpened, "05"),
      g: common_vendor.o(onClosed, "95"),
      h: common_vendor.o(clickOverlay, "ac"),
      i: `${_ctx.u_s_b_h}px`,
      j: common_vendor.o(($event) => {
        return common_vendor.isRef(show) ? show.value = $event : null;
      }, "f0"),
      k: common_vendor.p({
        title: common_vendor.unref(params).title,
        actions: common_vendor.unref(actionsList),
        ["use-dialog-page"]: false,
        ["show-cancel"]: common_vendor.unref(params).showCancel,
        ["cancel-text"]: common_vendor.unref(params).cancelText,
        duration: common_vendor.unref(params).duration,
        ["z-index"]: common_vendor.unref(params).zIndex,
        opacity: common_vendor.unref(params).opacity,
        overlay: common_vendor.unref(params).overlay,
        ["overlay-bg-color"]: common_vendor.unref(params).overlayBgColor,
        ["close-on-click-action"]: common_vendor.unref(params).closeOnClickAction,
        ["close-on-click-overlay"]: common_vendor.unref(params).closeOnClickOverlay,
        radius: common_vendor.unref(params).radius,
        ["safe-area-inset-bottom"]: common_vendor.unref(params).safeAreaInsetBottom,
        ["custom-style"]: common_vendor.unref(params).customStyle,
        show: common_vendor.unref(show),
        id: common_vendor.gei(_ctx, ""),
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }),
      l: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
    };
    return __returned__;
  };
} }));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-ui/pages/action-sheet/action-sheet.js.map
