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
    function d(key) {
      const val = pkgInfo.value[key];
      return val;
    }
    const flowPercentage = common_vendor.computed(() => {
      if (!pkgInfo.value)
        return 0;
      const info = pkgInfo.value;
      const usedFlowStr = info["usedFlow"];
      const pkgFlowStr = info["pkgFlow"];
      const usedFlow = usedFlowStr != null && usedFlowStr != "" ? Number.parseInt(usedFlowStr) : 0;
      const pkgFlow = pkgFlowStr != null && pkgFlowStr != "" ? Number.parseInt(pkgFlowStr) : 0;
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
      common_vendor.index.__f__("log", "at pages/pkgDetail/pkgDetail.uvue:145", "pkgDetail onLoad", options);
      const pid = options["pkgId"];
      pkgId.value = pid != null ? pid : "";
      initPkgInfo();
    });
    return (_ctx, _cache) => {
      "raw js";
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
        f: d("pkgName")
      }, d("pkgName") ? {
        g: common_vendor.t(d("pkgName"))
      } : {}, {
        h: d("status")
      }, d("status") ? {
        i: common_vendor.p({
          text: d("status"),
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-36efee10"
        })
      } : {}, {
        j: d("rechargeNo")
      }, d("rechargeNo") ? {
        k: common_vendor.t(d("rechargeNo"))
      } : {}, {
        l: d("usedFlow") != null && d("unUsedFlow") != null
      }, d("usedFlow") != null && d("unUsedFlow") != null ? {
        m: common_vendor.t(d("usedFlow")),
        n: common_vendor.t(d("unUsedFlow")),
        o: common_vendor.p({
          percentage: flowPercentage.value,
          ["show-text"]: true,
          class: "data-v-36efee10"
        })
      } : {}, {
        p: d("pkgFlow")
      }, d("pkgFlow") ? {
        q: common_vendor.t(d("pkgFlow"))
      } : {}, {
        r: d("startDate")
      }, d("startDate") ? {
        s: common_vendor.t(d("startDate"))
      } : {}, {
        t: d("validityPeriod")
      }, d("validityPeriod") ? {
        v: common_vendor.t(d("validityPeriod")),
        w: common_vendor.t(d("pkgType") == "1" ? "天" : "个月")
      } : {}, {
        x: d("endDate")
      }, d("endDate") ? {
        y: common_vendor.t(d("endDate"))
      } : {}, {
        z: d("orderNo")
      }, d("orderNo") ? {
        A: common_vendor.t(d("orderNo"))
      } : {}, {
        B: d("orderStatus")
      }, d("orderStatus") ? {
        C: common_vendor.t(d("orderStatus"))
      } : {}, {
        D: d("payAmount")
      }, d("payAmount") ? {
        E: common_vendor.t(d("payAmount"))
      } : {}, {
        F: d("orderCreateTime")
      }, d("orderCreateTime") ? {
        G: common_vendor.t(d("orderCreateTime"))
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
