"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_loading_1 = common_vendor.resolveComponent("rice-loading");
  const _easycom_rice_overlay_1 = common_vendor.resolveComponent("rice-overlay");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_progress_1 = common_vendor.resolveComponent("rice-progress");
  (_easycom_topNavBar_1 + _easycom_rice_loading_1 + _easycom_rice_overlay_1 + _easycom_rice_tag_1 + _easycom_rice_progress_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_loading = () => "../../uni_modules/rice-ui/components/rice-loading/rice-loading.js";
const _easycom_rice_overlay = () => "../../uni_modules/rice-ui/components/rice-overlay/rice-overlay.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_loading + _easycom_rice_overlay + _easycom_rice_tag + _easycom_rice_progress)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pkgDetail",
  setup(__props) {
    const showLoading = common_vendor.ref(false);
    const pkgId = common_vendor.ref("");
    const pkgInfo = common_vendor.ref(new common_vendor.UTSJSONObject({}));
    const flowPercentage = common_vendor.computed(() => {
      if (!pkgInfo.value)
        return 0;
      const usedFlow = Number(pkgInfo.value.usedFlow) || 0;
      const pkgFlow = Number(pkgInfo.value.pkgFlow) || 0;
      if (pkgFlow <= 0)
        return 0;
      return Math.min(usedFlow / pkgFlow * 100, 100);
    });
    const initPkgInfo = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!pkgId.value)
          return Promise.resolve(null);
        showLoading.value = true;
        try {
          const res = yield api_http.queryPkgInfoXcx(pkgId.value);
          if (res.code == 200) {
            pkgInfo.value = res.data;
            showLoading.value = false;
          } else {
            showLoading.value = false;
            common_vendor.index.showToast({
              title: res.msg || "查询套餐信息详情失败",
              icon: "none"
            });
          }
        } catch (error) {
          showLoading.value = false;
          common_vendor.index.showToast({
            title: "查询套餐信息详情失败",
            icon: "none"
          });
        }
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad((options) => {
      var _a;
      common_vendor.index.__f__("log", "at pages/pkgDetail/pkgDetail.uvue:136", "pkgDetail onLoad", options);
      pkgId.value = (_a = options.pkgId) !== null && _a !== void 0 ? _a : "";
      initPkgInfo();
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(handleBack, "56"),
        b: common_vendor.p({
          title: "套餐详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-36efee10"
        }),
        c: common_vendor.p({
          customStyle: {
            height: "100rpx",
            width: "100rpx",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          },
          class: "data-v-36efee10"
        }),
        d: common_vendor.o(($event) => {
          return showLoading.value = $event;
        }, "1a"),
        e: common_vendor.p({
          mode: "snow",
          ["bg-color"]: "rgba(255, 255, 255, 0.4)",
          show: showLoading.value,
          class: "data-v-36efee10"
        }),
        f: pkgInfo.value.pkgName
      }, pkgInfo.value.pkgName ? {
        g: common_vendor.t(pkgInfo.value.pkgName)
      } : {}, {
        h: pkgInfo.value.status
      }, pkgInfo.value.status ? {
        i: common_vendor.p({
          text: pkgInfo.value.status,
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-36efee10"
        })
      } : {}, {
        j: pkgInfo.value.rechargeNo
      }, pkgInfo.value.rechargeNo ? {
        k: common_vendor.t(pkgInfo.value.rechargeNo)
      } : {}, {
        l: pkgInfo.value.usedFlow && pkgInfo.value.unUsedFlow
      }, pkgInfo.value.usedFlow && pkgInfo.value.unUsedFlow ? {
        m: common_vendor.t(pkgInfo.value.usedFlow),
        n: common_vendor.t(pkgInfo.value.unUsedFlow),
        o: common_vendor.p({
          percentage: flowPercentage.value,
          ["show-text"]: true,
          class: "data-v-36efee10"
        })
      } : {}, {
        p: pkgInfo.value.pkgFlow
      }, pkgInfo.value.pkgFlow ? {
        q: common_vendor.t(pkgInfo.value.pkgFlow)
      } : {}, {
        r: pkgInfo.value.startDate
      }, pkgInfo.value.startDate ? {
        s: common_vendor.t(pkgInfo.value.startDate)
      } : {}, {
        t: pkgInfo.value.validityPeriod
      }, pkgInfo.value.validityPeriod ? {
        v: common_vendor.t(pkgInfo.value.validityPeriod),
        w: common_vendor.t(((_a = pkgInfo.value) == null ? void 0 : _a.pkgType) == "1" ? "天" : "个月")
      } : {}, {
        x: pkgInfo.value.endDate
      }, pkgInfo.value.endDate ? {
        y: common_vendor.t(pkgInfo.value.endDate)
      } : {}, {
        z: pkgInfo.value.orderNo
      }, pkgInfo.value.orderNo ? {
        A: common_vendor.t(pkgInfo.value.orderNo)
      } : {}, {
        B: pkgInfo.value.orderStatus
      }, pkgInfo.value.orderStatus ? {
        C: common_vendor.t(pkgInfo.value.orderStatus)
      } : {}, {
        D: pkgInfo.value.payAmount
      }, pkgInfo.value.payAmount ? {
        E: common_vendor.t(pkgInfo.value.payAmount)
      } : {}, {
        F: pkgInfo.value.orderCreateTime
      }, pkgInfo.value.orderCreateTime ? {
        G: common_vendor.t(pkgInfo.value.orderCreateTime)
      } : {}, {
        H: `${_ctx.u_s_b_h}px`,
        I: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36efee10"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pkgDetail/pkgDetail.js.map
