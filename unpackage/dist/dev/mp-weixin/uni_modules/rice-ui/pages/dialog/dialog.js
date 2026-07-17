"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../components/rice-dialog/type.js");
const uni_modules_riceUi_components_riceDialog_api = require("../../components/rice-dialog/api.js");
if (!Array) {
  const _easycom_rice_dialog_1 = common_vendor.resolveComponent("rice-dialog");
  _easycom_rice_dialog_1();
}
const _easycom_rice_dialog = () => "../../components/rice-dialog/rice-dialog.js";
if (!Math) {
  _easycom_rice_dialog();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "rice-dialog-page"
}, { __name: "dialog", setup(__props, _a) {
  var __expose = _a.expose;
  const show = common_vendor.ref(false);
  const params = common_vendor.ref(new common_vendor.UTSJSONObject({}));
  let busEventName = null;
  let optionsEventName = null;
  let readyEventName = null;
  const dialogPageIns = common_vendor.ref(null);
  const handleBusEvent = (event) => {
    if (busEventName != null) {
      common_vendor.index.$emit(busEventName, event);
    }
  };
  const onConfirm = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
      errMsg: null,
      pageIns: null,
      type: "confirm"
    }));
  };
  const onCancel = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
      errMsg: null,
      pageIns: null,
      type: "cancel"
    }));
  };
  const onOpen = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
      errMsg: null,
      pageIns: null,
      type: "open"
    }));
  };
  const onClose = () => {
    show.value = false;
  };
  const onOpened = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
      errMsg: null,
      pageIns: null,
      type: "opened"
    }));
  };
  const onClosed = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
      errMsg: null,
      pageIns: null,
      type: "closed"
    }));
    common_vendor.index.closeDialogPage(new common_vendor.UTSJSONObject({
      dialogPage: dialogPageIns.value
    }));
  };
  const clickOverlay = () => {
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
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
      handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
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
    handleBusEvent(new uni_modules_riceUi_components_riceDialog_api.DialogBusEvent({
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
      b: common_vendor.o(onConfirm, "30"),
      c: common_vendor.o(onCancel, "42"),
      d: common_vendor.o(onOpen, "8c"),
      e: common_vendor.o(onClose, "9f"),
      f: common_vendor.o(onOpened, "88"),
      g: common_vendor.o(onClosed, "cb"),
      h: common_vendor.o(clickOverlay, "27"),
      i: `${_ctx.u_s_b_h}px`,
      j: common_vendor.o(($event) => {
        return common_vendor.isRef(show) ? show.value = $event : null;
      }, "ed"),
      k: common_vendor.p({
        title: common_vendor.unref(params).title,
        width: common_vendor.unref(params).width,
        duration: common_vendor.unref(params).duration,
        message: common_vendor.unref(params).message,
        ["message-align"]: common_vendor.unref(params).messageAlign,
        ["button-theme"]: common_vendor.unref(params).buttonTheme,
        ["button-layout"]: common_vendor.unref(params).buttonLayout,
        ["show-confirm-button"]: common_vendor.unref(params).showConfirmButton,
        ["confirm-button-text"]: common_vendor.unref(params).confirmButtonText,
        ["confirm-button-color"]: common_vendor.unref(params).confirmButtonColor,
        ["confirm-button-disabled"]: common_vendor.unref(params).confirmButtonDisabled,
        ["show-cancel-button"]: common_vendor.unref(params).showCancelButton,
        ["cancel-button-text"]: common_vendor.unref(params).cancelButtonText,
        ["cancel-button-color"]: common_vendor.unref(params).cancelButtonColor,
        ["cancel-button-disabled"]: common_vendor.unref(params).cancelButtonDisabled,
        overlay: common_vendor.unref(params).overlay,
        ["overlay-bg-color"]: common_vendor.unref(params).overlayBgColor,
        ["close-on-click-overlay"]: common_vendor.unref(params).closeOnClickOverlay,
        ["bg-color"]: common_vendor.unref(params).bgColor,
        ["z-index"]: common_vendor.unref(params).zIndex,
        marginTop: common_vendor.unref(params).marginTop,
        ["before-close"]: common_vendor.unref(params).beforeClose,
        ["use-dialog-page"]: false,
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
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-ui/pages/dialog/dialog.js.map
