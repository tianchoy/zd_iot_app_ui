"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_icon_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_icon + common_vendor.unref(SearchSelect) + _easycom_rice_popup)();
}
const SearchSelect = () => "../../components/selectCountry.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "h5Search",
  setup(__props) {
    const cardNumber = common_vendor.ref("1064916585160");
    const showCountryPopup = common_vendor.ref(false);
    const selectedCountry = common_vendor.ref("");
    const searchSelectRef = common_vendor.ref(null);
    const resCountry = common_vendor.ref("");
    const countryOptions = common_vendor.ref([]);
    const selectedCountryLabel = common_vendor.computed(() => {
      if (!selectedCountry.value)
        return "";
      for (let i = 0; i < countryOptions.value.length; i++) {
        const opt = countryOptions.value[i];
        if (opt["value"] === selectedCountry.value) {
          const label = opt["label"];
          return label == null ? "" : "" + label;
        }
      }
      return "";
    });
    const openSelectCountry = () => {
      showCountryPopup.value = true;
    };
    const onCountryChange = (value = null, item = null) => {
      showCountryPopup.value = false;
      resCountry.value = value;
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:115", "选中国家/地区:", resCountry.value);
    };
    const onPopupClose = () => {
      showCountryPopup.value = false;
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
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:146", "查询卡号:", cardNumber.value);
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:147", "国家/地区:", resCountry.value);
      common_vendor.index.showToast({
        title: "查询中...",
        icon: "loading"
      });
    };
    const onScanResult = (data) => {
      var _a;
      const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
      if (result.length > 0) {
        cardNumber.value = result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    const initCountryList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.getCountryList(false);
        common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:173", "查询国家列表:", res);
        if (res.code == 200) {
          countryOptions.value = res.data.map((item) => {
            return new common_vendor.UTSJSONObject({
              value: item.letterCode,
              label: item.fullName
            });
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      initCountryList();
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
          name: "scan",
          size: "40rpx",
          color: "#666",
          class: "data-v-9fa4edd6"
        }),
        e: common_vendor.o(handleScan, "e9"),
        f: common_vendor.t(selectedCountryLabel.value || "请选择国家/地区"),
        g: !selectedCountry.value ? 1 : "",
        h: common_vendor.o(openSelectCountry, "47"),
        i: common_vendor.o(handleQuery, "f5"),
        j: `${_ctx.u_s_b_h}px`,
        k: `${_ctx.u_s_a_i_b}px`,
        l: common_vendor.sr(searchSelectRef, "9fa4edd6-3,9fa4edd6-2", {
          "k": "searchSelectRef"
        }),
        m: common_vendor.o(onCountryChange, "1b"),
        n: common_vendor.o(($event) => {
          return selectedCountry.value = $event;
        }, "3d"),
        o: common_vendor.p({
          options: countryOptions.value,
          ["search-placeholder"]: "搜索国家/地区名称",
          modelValue: selectedCountry.value,
          class: "r data-v-9fa4edd6"
        }),
        p: common_vendor.o(onPopupClose, "4e"),
        q: common_vendor.o(($event) => {
          return showCountryPopup.value = $event;
        }, "05"),
        r: common_vendor.p({
          position: "bottom",
          show: showCountryPopup.value,
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
