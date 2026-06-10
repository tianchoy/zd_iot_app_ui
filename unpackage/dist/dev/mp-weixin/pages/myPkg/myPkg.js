"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  (_easycom_topNavBar_1 + _easycom_rice_tabs_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tabs)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPkg",
  setup(__props) {
    const pkgTabs = common_vendor.ref([{ name: "全部" }, { name: "在用套餐" }, { name: "待生效" }, { name: "已失效" }]);
    const current = common_vendor.ref(0);
    const packageList = common_vendor.ref([
      new common_vendor.UTSJSONObject({
        name: "车联网月包20G",
        status: "在用套餐",
        effectiveTime: "2026-04-01",
        totalTraffic: "20GB",
        remainingTraffic: "8.66GB",
        expireDate: "2026-04-30"
      }),
      new common_vendor.UTSJSONObject({
        name: "车联网月包10G",
        status: "待生效",
        effectiveTime: "待生效",
        totalTraffic: "10GB",
        remainingTraffic: "10GB",
        expireDate: "2026-05-30"
      }),
      new common_vendor.UTSJSONObject({
        name: "工业设备月包5G",
        status: "待生效",
        effectiveTime: "待生效",
        totalTraffic: "5GB",
        remainingTraffic: "5GB",
        expireDate: "2026-06-30"
      }),
      new common_vendor.UTSJSONObject({
        name: "测试套餐1G",
        status: "已失效",
        effectiveTime: "2026-03-01",
        totalTraffic: "1GB",
        remainingTraffic: "0",
        expireDate: "2026-03-31"
      })
    ]);
    const getPackageText = (item = null, key) => {
      const value = item[key];
      return value == null ? "" : "" + value;
    };
    const filteredPackages = common_vendor.computed(() => {
      const currentTab = pkgTabs.value[current.value];
      const currentStatus = currentTab == null ? "全部" : currentTab.name;
      if (currentStatus === "全部") {
        return packageList.value;
      }
      return packageList.value.filter((item = null) => {
        return getPackageText(item, "status") === currentStatus;
      });
    });
    const handleClick = (e) => {
      current.value = e.index;
    };
    const handlePkgDetail = (item = null) => {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetail/orderDetail?item=" + common_vendor.UTS.JSON.stringify(item)
      });
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "在用套餐":
          return "status-active";
        case "待生效":
          return "status-pending";
        case "已失效":
          return "status-expired";
        default:
          return "";
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
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
        c: common_vendor.o(handleClick, "62"),
        d: common_vendor.o(($event) => {
          return current.value = $event;
        }, "95"),
        e: common_vendor.p({
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
        f: filteredPackages.value.length === 0
      }, filteredPackages.value.length === 0 ? {} : {}, {
        g: common_vendor.f(filteredPackages.value, (item, index, i0) => {
          return {
            a: common_vendor.t(getPackageText(item, "name")),
            b: common_vendor.t(getPackageText(item, "status")),
            c: common_vendor.n(getStatusClass(getPackageText(item, "status"))),
            d: common_vendor.t(getPackageText(item, "effectiveTime")),
            e: common_vendor.t(getPackageText(item, "totalTraffic")),
            f: common_vendor.t(getPackageText(item, "remainingTraffic")),
            g: common_vendor.t(getPackageText(item, "expireDate")),
            h: index,
            i: common_vendor.o(($event) => {
              return handlePkgDetail(item);
            }, index)
          };
        }),
        h: `${_ctx.u_s_b_h}px`,
        i: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8137f92d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myPkg/myPkg.js.map
