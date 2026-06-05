"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_segmented_control_1 = common_vendor.resolveComponent("m-segmented-control");
  const _easycom_m_div_1 = common_vendor.resolveComponent("m-div");
  (_easycom_topNavBar_1 + _easycom_m_icon_1 + _easycom_m_button_1 + _easycom_m_segmented_control_1 + _easycom_m_div_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_segmented_control = () => "../../uni_modules/m-unix/components/m-segmented-control/m-segmented-control.js";
const _easycom_m_div = () => "../../uni_modules/m-unix/components/m-div/m-div.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon + _easycom_m_button + _easycom_m_segmented_control + _easycom_m_div)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "card",
  setup(__props) {
    const card_number = common_vendor.ref("");
    const queryKeyword = common_vendor.ref("");
    const tabs = common_vendor.ref(["全部", "在用", "异常"]);
    const current = common_vendor.ref(0);
    common_vendor.ref(0);
    const allCardList = common_vendor.ref([
      new api_types.CardItem({
        id: 1,
        cardNumber: "1064916585160",
        iccid: "89860421123456789012",
        tag: "主卡",
        status: "在用",
        currentPackage: "车联网月包20G",
        expireDate: "2026-04-30",
        usedTraffic: "11.34GB",
        totalTraffic: "20GB",
        currentCycle: "第1期 / 共12期"
      }),
      new api_types.CardItem({
        id: 2,
        cardNumber: "1064916585161",
        iccid: "89860421123456789013",
        tag: "副卡",
        status: "在用",
        currentPackage: "车联网月包10G",
        expireDate: "2026-05-15",
        usedTraffic: "5.21GB",
        totalTraffic: "10GB",
        currentCycle: "第2期 / 共6期"
      }),
      new api_types.CardItem({
        id: 3,
        cardNumber: "1064916585162",
        iccid: "89860421123456789014",
        tag: "测试卡",
        status: "异常",
        currentPackage: "测试套餐1G",
        expireDate: "2026-03-31",
        usedTraffic: "1GB",
        totalTraffic: "1GB",
        currentCycle: "第1期 / 共1期"
      }),
      new api_types.CardItem({
        id: 4,
        cardNumber: "1064916585163",
        iccid: "89860421123456789015",
        tag: "备用卡",
        status: "在用",
        currentPackage: "工业设备月包5G",
        expireDate: "2026-06-30",
        usedTraffic: "2.15GB",
        totalTraffic: "5GB",
        currentCycle: "第1期 / 共3期"
      }),
      new api_types.CardItem({
        id: 5,
        cardNumber: "1064916585164",
        iccid: "89860421123456789016",
        tag: "体验卡",
        status: "停机",
        currentPackage: "体验套餐500M",
        expireDate: "2026-02-28",
        usedTraffic: "500MB",
        totalTraffic: "500MB",
        currentCycle: "第1期 / 共1期"
      })
    ]);
    const tabNumbers = common_vendor.computed(() => {
      const total = allCardList.value.length;
      const inUse = allCardList.value.filter((card) => {
        return card.status === "在用";
      }).length;
      const abnormal = allCardList.value.filter((card) => {
        return card.status !== "在用";
      }).length;
      return [total, inUse, abnormal];
    });
    const handleDetail = (card) => {
      common_vendor.index.__f__("log", "at pages/card/card.uvue:188", card);
      common_vendor.index.navigateTo({
        url: "/pages/cardDetail/cardDetail?cardNumber=" + card.cardNumber
      });
    };
    const filteredCardList = common_vendor.computed(() => {
      const currentStatus = tabs.value[current.value];
      let list = allCardList.value;
      if (currentStatus !== "全部") {
        list = list.filter((card) => {
          const status = "" + card.status;
          if (currentStatus === "异常") {
            return status !== "在用";
          }
          return status === currentStatus;
        });
      }
      if (queryKeyword.value !== "") {
        list = list.filter((card) => {
          const cardNumber = "" + card["cardNumber"];
          return cardNumber.indexOf(queryKeyword.value) !== -1;
        });
      }
      return list;
    });
    const getCardText = (card, key) => {
      const value = card[key];
      return value == null ? "" : "" + value;
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "在用":
          return "status-completed";
        case "异常":
          return "status-pending";
        case "停机":
          return "status-refunded";
        default:
          return "";
      }
    };
    const handleClick = (e) => {
      if (e.index != null) {
        current.value = e.index;
      }
    };
    const scanCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleInput = () => {
      if (card_number.value.trim() === "") {
        queryKeyword.value = "";
      }
    };
    const handleQuery = () => {
      const keyword = card_number.value.trim();
      if (!keyword) {
        common_vendor.index.showToast({
          title: "请输入卡号",
          icon: "none"
        });
        return null;
      }
      queryKeyword.value = keyword;
    };
    const onScanResult = (data) => {
      var _a;
      common_vendor.index.__f__("log", "at pages/card/card.uvue:268", data);
      const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
      common_vendor.index.__f__("log", "at pages/card/card.uvue:270", result);
      if (result.length > 0) {
        card_number.value = result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/card/card.uvue:307", options);
      const type = options["type"];
      if (type != null) {
        current.value = parseInt("" + type);
      }
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "卡片",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-a89086b7"
        }),
        b: common_vendor.o([($event) => {
          return card_number.value = $event.detail.value;
        }, handleInput], "85"),
        c: card_number.value,
        d: common_vendor.p({
          name: "scanning",
          size: "40rpx",
          class: "data-v-a89086b7"
        }),
        e: common_vendor.o(scanCode, "c5"),
        f: common_vendor.p({
          type: "white",
          plain: true,
          width: "90rpx",
          class: "scan-btn data-v-a89086b7"
        }),
        g: common_vendor.o(handleQuery, "d2"),
        h: common_vendor.p({
          type: "primary",
          width: "120rpx",
          class: "data-v-a89086b7"
        }),
        i: common_vendor.o(handleClick, "dd"),
        j: common_vendor.p({
          values: tabs.value,
          nums: tabNumbers.value,
          current: current.value,
          textActiveColor: "#2563eb",
          customStyle: {
            height: "auto",
            padding: "5rpx 10rpx",
            border: "1rpx solid #e5edf6"
          },
          class: "data-v-a89086b7"
        }),
        k: common_vendor.f(filteredCardList.value, (card, index, i0) => {
          return {
            a: common_vendor.t(getCardText(card, "cardNumber")),
            b: common_vendor.t(getCardText(card, "iccid")),
            c: common_vendor.t(getCardText(card, "status")),
            d: common_vendor.n(getStatusClass(getCardText(card, "status"))),
            e: common_vendor.t(getCardText(card, "currentPackage")),
            f: "a89086b7-5-" + i0,
            g: common_vendor.t(getCardText(card, "expireDate")),
            h: common_vendor.t(getCardText(card, "usedTraffic")),
            i: common_vendor.t(getCardText(card, "totalTraffic")),
            j: common_vendor.t(getCardText(card, "currentCycle")),
            k: "a89086b7-6-" + i0,
            l: index,
            m: common_vendor.o(($event) => {
              return handleDetail(card);
            }, index)
          };
        }),
        l: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider",
          class: "data-v-a89086b7"
        }),
        m: common_vendor.p({
          type: "primary",
          width: "200rpx",
          btnSize: "mini",
          size: "25rpx",
          shape: "circle",
          class: "data-v-a89086b7"
        }),
        n: filteredCardList.value.length === 0
      }, filteredCardList.value.length === 0 ? {} : {}, {
        o: `${_ctx.u_s_b_h}px`,
        p: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a89086b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/card/card.js.map
