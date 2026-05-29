"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_segmented_control_1 = common_vendor.resolveComponent("m-segmented-control");
  (_easycom_topNavBar_1 + _easycom_m_segmented_control_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_segmented_control = () => "../../uni_modules/m-unix/components/m-segmented-control/m-segmented-control.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_segmented_control)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPkg",
  setup(__props) {
    const pkgTabs = common_vendor.ref(["全部", "在用套餐", "待生效", "已失效"]);
    const current = common_vendor.ref(0);
    const packageList = common_vendor.ref([
      {
        name: "车联网月包20G",
        status: "在用套餐",
        effectiveTime: "2026-04-01",
        totalTraffic: "20GB",
        remainingTraffic: "8.66GB",
        expireDate: "2026-04-30"
      },
      {
        name: "车联网月包10G",
        status: "待生效",
        effectiveTime: "待生效",
        totalTraffic: "10GB",
        remainingTraffic: "10GB",
        expireDate: "2026-05-30"
      },
      {
        name: "工业设备月包5G",
        status: "待生效",
        effectiveTime: "待生效",
        totalTraffic: "5GB",
        remainingTraffic: "5GB",
        expireDate: "2026-06-30"
      },
      {
        name: "测试套餐1G",
        status: "已失效",
        effectiveTime: "2026-03-01",
        totalTraffic: "1GB",
        remainingTraffic: "0",
        expireDate: "2026-03-31"
      }
    ]);
    const filteredPackages = common_vendor.computed(() => {
      const currentStatus = pkgTabs.value[current.value];
      if (currentStatus === "全部") {
        return packageList.value;
      }
      return packageList.value.filter((item) => {
        return item.status === currentStatus;
      });
    });
    const handleClick = (e) => {
      current.value = e.index;
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
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "我的套餐",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-8137f92d"
        }),
        b: common_vendor.o(handleClick, "bc"),
        c: common_vendor.p({
          values: pkgTabs.value,
          current: current.value,
          textActiveColor: "#2563eb",
          customStyle: {
            height: "unset",
            padding: "5rpx 10rpx",
            border: "1rpx solid #e5edf6"
          },
          class: "data-v-8137f92d"
        }),
        d: filteredPackages.value.length === 0
      }, filteredPackages.value.length === 0 ? {} : {}, {
        e: common_vendor.f(filteredPackages.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.status),
            c: common_vendor.n(getStatusClass(item.status)),
            d: common_vendor.t(item.effectiveTime),
            e: common_vendor.t(item.totalTraffic),
            f: common_vendor.t(item.remainingTraffic),
            g: common_vendor.t(item.expireDate),
            h: index
          };
        }),
        f: `${_ctx.u_s_b_h}px`,
        g: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8137f92d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myPkg/myPkg.js.map
