"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_progress_1 = common_vendor.resolveComponent("rice-progress");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_progress_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_progress)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pkgDetail",
  setup(__props) {
    const pkgId = common_vendor.ref("");
    const pkgInfo = common_vendor.ref(new common_vendor.UTSJSONObject({}));
    const initPkgInfo = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!pkgId.value)
          return Promise.resolve(null);
        try {
          const res = yield api_http.queryPkgInfoXcx(pkgId.value);
          if (res.code == 200) {
            pkgInfo.value = res.data;
          } else {
            common_vendor.index.showToast({
              title: res.msg || "查询套餐信息详情失败",
              icon: "none"
            });
          }
        } catch (error) {
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
      common_vendor.index.__f__("log", "at pages/pkgDetail/pkgDetail.uvue:122", "pkgDetail onLoad", options);
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
        c: common_vendor.unref(pkgInfo).pkgName
      }, common_vendor.unref(pkgInfo).pkgName ? {
        d: common_vendor.t(common_vendor.unref(pkgInfo).pkgName)
      } : {}, {
        e: common_vendor.unref(pkgInfo).status
      }, common_vendor.unref(pkgInfo).status ? {
        f: common_vendor.p({
          text: common_vendor.unref(pkgInfo).status,
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: "success",
          class: "data-v-36efee10"
        })
      } : {}, {
        g: common_vendor.unref(pkgInfo).rechargeNo
      }, common_vendor.unref(pkgInfo).rechargeNo ? {
        h: common_vendor.t(common_vendor.unref(pkgInfo).rechargeNo)
      } : {}, {
        i: common_vendor.unref(pkgInfo).usedFlow && common_vendor.unref(pkgInfo).unUsedFlow
      }, common_vendor.unref(pkgInfo).usedFlow && common_vendor.unref(pkgInfo).unUsedFlow ? {
        j: common_vendor.t(common_vendor.unref(pkgInfo).usedFlow),
        k: common_vendor.t(common_vendor.unref(pkgInfo).unUsedFlow),
        l: common_vendor.p({
          percentage: common_vendor.unref(pkgInfo).usedFlow / common_vendor.unref(pkgInfo).pkgFlow * 100,
          ["show-text"]: true,
          class: "data-v-36efee10"
        })
      } : {}, {
        m: common_vendor.unref(pkgInfo).pkgFlow
      }, common_vendor.unref(pkgInfo).pkgFlow ? {
        n: common_vendor.t(common_vendor.unref(pkgInfo).pkgFlow)
      } : {}, {
        o: common_vendor.unref(pkgInfo).startDate
      }, common_vendor.unref(pkgInfo).startDate ? {
        p: common_vendor.t(common_vendor.unref(pkgInfo).startDate)
      } : {}, {
        q: common_vendor.unref(pkgInfo).validityPeriod
      }, common_vendor.unref(pkgInfo).validityPeriod ? {
        r: common_vendor.t(common_vendor.unref(pkgInfo).validityPeriod),
        s: common_vendor.t(((_a = common_vendor.unref(pkgInfo)) == null ? void 0 : _a.pkgType) == "1" ? "天" : "个月")
      } : {}, {
        t: common_vendor.unref(pkgInfo).endDate
      }, common_vendor.unref(pkgInfo).endDate ? {
        v: common_vendor.t(common_vendor.unref(pkgInfo).endDate)
      } : {}, {
        w: common_vendor.unref(pkgInfo).orderNo
      }, common_vendor.unref(pkgInfo).orderNo ? {
        x: common_vendor.t(common_vendor.unref(pkgInfo).orderNo)
      } : {}, {
        y: common_vendor.unref(pkgInfo).orderStatus
      }, common_vendor.unref(pkgInfo).orderStatus ? {
        z: common_vendor.t(common_vendor.unref(pkgInfo).orderStatus)
      } : {}, {
        A: common_vendor.unref(pkgInfo).payAmount
      }, common_vendor.unref(pkgInfo).payAmount ? {
        B: common_vendor.t(common_vendor.unref(pkgInfo).payAmount)
      } : {}, {
        C: common_vendor.unref(pkgInfo).orderCreateTime
      }, common_vendor.unref(pkgInfo).orderCreateTime ? {
        D: common_vendor.t(common_vendor.unref(pkgInfo).orderCreateTime)
      } : {}, {
        E: common_vendor.t(common_vendor.unref(pkgInfo).usageInstructions),
        F: `${_ctx.u_s_b_h}px`,
        G: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36efee10"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pkgDetail/pkgDetail.js.map
