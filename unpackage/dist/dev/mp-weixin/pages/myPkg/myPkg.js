"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  (_easycom_topNavBar_1 + _easycom_rice_tabs_1 + _easycom_rice_tag_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tabs + _easycom_rice_tag)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPkg",
  setup(__props) {
    const card_number = common_vendor.ref("");
    const pkgTabs = common_vendor.ref([{ name: "全部", value: "" }, { name: "在用套餐", value: "1" }, { name: "待生效", value: "0" }, { name: "已失效", value: "2" }]);
    const current = common_vendor.ref(0);
    const pkgInfoList = common_vendor.ref([]);
    const handleClick = (e) => {
      common_vendor.index.__f__("log", "at pages/myPkg/myPkg.uvue:104", e.value);
      if (e.index != null) {
        current.value = e.index;
        getPkgInfoList(e.value.toString());
      }
    };
    const getPkgInfoList = (state) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryPkgInfoList(new api_types.PkgInfoListParams({
            rechargeNo: card_number.value,
            status: state
          }));
          if (res.code == 200) {
            if (res.rows && Array.isArray(res.rows)) {
              pkgInfoList.value = res.rows;
            } else if (res.data && Array.isArray(res.data)) {
              pkgInfoList.value = res.data;
            } else {
              pkgInfoList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/myPkg/myPkg.uvue:127", "查询套餐列表失败:", res.msg);
            pkgInfoList.value = [];
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/myPkg/myPkg.uvue:131", "查询套餐列表异常:", error);
          pkgInfoList.value = [];
        }
      });
    };
    const handlePkgDetail = (item = null) => {
      common_vendor.index.__f__("log", "at pages/myPkg/myPkg.uvue:138", item);
      common_vendor.index.navigateTo({
        url: "/pages/pkgDetail/pkgDetail?item=" + common_vendor.UTS.JSON.stringify(item)
      });
    };
    const getPackageStatusText = (status) => {
      const statusMap = {
        "0": "未生效",
        "1": "生效中",
        "2": "已失效"
      };
      return statusMap[status] || status || "未知";
    };
    const getPackageStatusType = (status) => {
      const typeMap = {
        "0": "success",
        "1": "primary",
        "2": "error"
      };
      return typeMap[status] || "primary";
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    common_vendor.onLoad((options) => {
      var _a;
      const cardNumber = (_a = options.card_number) !== null && _a !== void 0 ? _a : "";
      card_number.value = cardNumber;
      getPkgInfoList();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "f5"),
        b: common_vendor.p({
          title: "我的套餐",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-8137f92d"
        }),
        c: common_vendor.t(card_number.value),
        d: common_vendor.o(handleClick, "69"),
        e: common_vendor.o(($event) => {
          return current.value = $event;
        }, "88"),
        f: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: pkgTabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: current.value,
          class: "data-v-8137f92d"
        }),
        g: pkgInfoList.value.length == 0
      }, pkgInfoList.value.length == 0 ? {} : {}, {
        h: common_vendor.f(pkgInfoList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: item.status
          }, item.status ? {
            c: "8137f92d-2-" + i0,
            d: common_vendor.p({
              text: getPackageStatusText(item.status),
              round: true,
              ["plain-fill"]: true,
              size: "small",
              type: getPackageStatusType(item.status),
              class: "data-v-8137f92d"
            })
          } : {}, {
            e: common_vendor.t(item.effectiveTime),
            f: common_vendor.t(item.expirationTime),
            g: common_vendor.t(item.unUsedFlow),
            h: common_vendor.t(item.usedFlow),
            i: common_vendor.t(item.pkgFlow),
            j: index,
            k: common_vendor.o(($event) => {
              return handlePkgDetail(item);
            }, index)
          });
        }),
        i: `${_ctx.u_s_b_h}px`,
        j: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8137f92d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myPkg/myPkg.js.map
