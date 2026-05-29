"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_bottom_popup_1 = common_vendor.resolveComponent("m-bottom-popup");
  (_easycom_topNavBar_1 + _easycom_m_icon_1 + _easycom_m_bottom_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_bottom_popup = () => "../../uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon + common_vendor.unref(SearchSelect) + _easycom_m_bottom_popup)();
}
const SearchSelect = () => "../../components/selectCountry.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "h5Search",
  setup(__props) {
    const cardNumber = common_vendor.ref("1064916585160");
    const showCountryPopup = common_vendor.ref(false);
    const selectedCountry = common_vendor.ref("");
    const searchSelectRef = common_vendor.ref(null);
    const countryOptions = common_vendor.ref([
      new common_vendor.UTSJSONObject({ value: "1", label: "中国" }),
      new common_vendor.UTSJSONObject({ value: "2", label: "美国" }),
      new common_vendor.UTSJSONObject({ value: "3", label: "日本" }),
      new common_vendor.UTSJSONObject({ value: "4", label: "韩国" }),
      new common_vendor.UTSJSONObject({ value: "5", label: "英国" }),
      new common_vendor.UTSJSONObject({ value: "6", label: "德国" }),
      new common_vendor.UTSJSONObject({ value: "7", label: "法国" }),
      new common_vendor.UTSJSONObject({ value: "8", label: "澳大利亚" }),
      new common_vendor.UTSJSONObject({ value: "9", label: "加拿大" }),
      new common_vendor.UTSJSONObject({ value: "10", label: "新加坡" }),
      new common_vendor.UTSJSONObject({ value: "11", label: "马来西亚" }),
      new common_vendor.UTSJSONObject({ value: "12", label: "泰国" })
    ]);
    const selectedCountryLabel = common_vendor.computed(() => {
      if (!selectedCountry.value)
        return "";
      const item = common_vendor.UTS.arrayFind(countryOptions.value, (opt) => {
        return opt.value === selectedCountry.value;
      });
      return item ? item.label : "";
    });
    const openSelectCountry = () => {
      showCountryPopup.value = true;
    };
    const onCountryChange = (value = null, item = null) => {
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:125", "选中国家/地区:", value, item);
      showCountryPopup.value = false;
      common_vendor.index.showToast({
        title: `已选择：${item.label}`,
        icon: "success"
      });
    };
    const onPopupClose = () => {
      showCountryPopup.value = false;
      if (searchSelectRef.value) {
        searchSelectRef.value.resetSearch();
      }
    };
    const handleScan = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleQuery = () => {
      if (!cardNumber.value) {
        common_vendor.index.showToast({
          title: "请输入卡号",
          icon: "none"
        });
        return null;
      }
      if (!selectedCountry.value) {
        common_vendor.index.showToast({
          title: "请选择国家/地区",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:164", "查询卡号:", cardNumber.value);
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:165", "国家/地区:", selectedCountryLabel.value);
      common_vendor.index.showToast({
        title: "查询中...",
        icon: "loading"
      });
    };
    const onScanResult = (data = null) => {
      if (data && data.result) {
        cardNumber.value = data.result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.p({
          title: "查询卡号",
          ["show-back"]: false,
          textColor: "#333",
          showCapsule: false,
          class: "data-v-9fa4edd6"
        }),
        b: cardNumber.value,
        c: common_vendor.o(($event) => {
          return cardNumber.value = $event.detail.value;
        }, "0d"),
        d: common_vendor.p({
          name: "scanning",
          size: "40rpx",
          color: "#666",
          class: "data-v-9fa4edd6"
        }),
        e: common_vendor.o(handleScan, "e9"),
        f: common_vendor.t(selectedCountryLabel.value || "请选择国家/地区"),
        g: !selectedCountry.value ? 1 : "",
        h: common_vendor.o(openSelectCountry, "6d"),
        i: common_vendor.o(handleQuery, "e2"),
        j: `${_ctx.u_s_b_h}px`,
        k: `${_ctx.u_s_a_i_b}px`,
        l: common_vendor.p({
          name: "close-bold",
          size: "40rpx",
          class: "data-v-9fa4edd6"
        }),
        m: common_vendor.o(onPopupClose, "fd"),
        n: common_vendor.sr(searchSelectRef, "9fa4edd6-4,9fa4edd6-2", {
          "k": "searchSelectRef"
        }),
        o: common_vendor.o(onCountryChange, "14"),
        p: common_vendor.o(($event) => {
          return selectedCountry.value = $event;
        }, "c1"),
        q: common_vendor.p({
          options: countryOptions.value,
          ["search-placeholder"]: "搜索国家/地区名称",
          modelValue: selectedCountry.value,
          class: "r data-v-9fa4edd6"
        }),
        r: common_vendor.o(onPopupClose, "08"),
        s: common_vendor.p({
          show: showCountryPopup.value,
          height: "50%",
          radius: true,
          class: "data-v-9fa4edd6"
        })
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fa4edd6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/h5Search/h5Search.js.map
