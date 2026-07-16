"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
const common_config = require("../../common/config.js");
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
    const cardNumber = common_vendor.ref("");
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
      common_vendor.index.__f__("log", "at pages/h5Search/h5Search.uvue:118", "选中国家/地区:", resCountry.value);
    };
    const onPopupClose = () => {
      showCountryPopup.value = false;
    };
    const CardVerify = (id) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryVerify(id);
          if (res.code == 200) {
            if (res.data) {
              return true;
            } else {
              common_vendor.index.showToast({
                title: "充值号无效",
                icon: "none"
              });
              return false;
            }
          } else {
            common_vendor.index.showToast({
              title: res.msg || "验证失败",
              icon: "none"
            });
            return false;
          }
        } catch (error) {
          common_vendor.index.showToast({
            title: error.msg || "充值号无效",
            icon: "none"
          });
          return false;
        }
      });
    };
    const handleScan = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleQuery = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!cardNumber.value) {
          common_vendor.index.showToast({
            title: "请输入充值号",
            icon: "none"
          });
          return Promise.resolve(null);
        }
        common_vendor.index.showToast({
          title: "查询中...",
          icon: "loading"
        });
        const isValid = yield CardVerify(cardNumber.value);
        if (common_config.isCN() && isValid) {
          common_vendor.index.navigateTo({
            url: `/pages/recharge/recharge?rechargeNo=${cardNumber.value}&from=h5Search`
          });
        }
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
    common_vendor.onMounted(() => {
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: `${_ctx.u_s_b_h}px`,
        b: common_vendor.p({
          title: "查询卡号",
          ["show-back"]: false,
          textColor: "#333",
          showCapsule: false,
          class: "data-v-9fa4edd6",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        c: cardNumber.value,
        d: common_vendor.o(($event) => {
          return cardNumber.value = $event.detail.value;
        }, "8a"),
        e: common_vendor.p({
          name: "scan",
          size: "40rpx",
          color: "#666",
          class: "data-v-9fa4edd6"
        }),
        f: common_vendor.o(handleScan, "c1"),
        g: common_vendor.unref(common_config.isINT)()
      }, common_vendor.unref(common_config.isINT)() ? {
        h: common_vendor.t(selectedCountryLabel.value || "请选择国家/地区"),
        i: !selectedCountry.value ? 1 : "",
        j: common_vendor.o(openSelectCountry, "df")
      } : {}, {
        k: common_vendor.o(handleQuery, "3f"),
        l: `${_ctx.u_s_b_h}px`,
        m: common_vendor.sr(searchSelectRef, "9fa4edd6-3,9fa4edd6-2", {
          "k": "searchSelectRef"
        }),
        n: common_vendor.o(onCountryChange, "4c"),
        o: common_vendor.o(($event) => {
          return selectedCountry.value = $event;
        }, "4d"),
        p: common_vendor.p({
          options: countryOptions.value,
          maxHeight: "800rpx",
          minHeight: "800rpx",
          ["search-placeholder"]: "搜索国家/地区名称",
          modelValue: selectedCountry.value,
          class: "r data-v-9fa4edd6"
        }),
        q: common_vendor.o(onPopupClose, "f4"),
        r: `${_ctx.u_s_b_h}px`,
        s: common_vendor.o(($event) => {
          return showCountryPopup.value = $event;
        }, "44"),
        t: common_vendor.p({
          position: "bottom",
          show: showCountryPopup.value,
          class: "data-v-9fa4edd6",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fa4edd6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/h5Search/h5Search.js.map
