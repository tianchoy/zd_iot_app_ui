"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_input_1 = common_vendor.resolveComponent("rice-input");
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_divider_1 = common_vendor.resolveComponent("rice-divider");
  const _easycom_customService_1 = common_vendor.resolveComponent("customService");
  (_easycom_topNavBar_1 + _easycom_rice_input_1 + _easycom_rice_icon_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_divider_1 + _easycom_customService_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_input = () => "../../uni_modules/rice-ui/components/rice-input/rice-input.js";
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
const _easycom_customService = () => "../../components/customService/customService.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_input + _easycom_rice_icon + _easycom_rice_button + _easycom_rice_tabs + _easycom_rice_divider + _easycom_customService)();
}
class TabItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false }
        };
      },
      name: "TabItem"
    };
  }
  constructor(options, metadata = TabItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "card",
  setup(__props) {
    const card_number = common_vendor.ref("gn20260603164757");
    const queryKeyword = common_vendor.ref("");
    const tabStatuses = ["全部", "在用", "异常"];
    const current = common_vendor.ref(0);
    const scrollViewHeight = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
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
    const tabs = common_vendor.computed(() => {
      const numbers = tabNumbers.value;
      return [
        new TabItem({ name: `全部 ${numbers[0]}` }),
        new TabItem({ name: `在用 ${numbers[1]}` }),
        new TabItem({ name: `异常 ${numbers[2]}` })
      ];
    });
    const handleDetail = (card) => {
      common_vendor.index.__f__("log", "at pages/card/card.uvue:160", card);
      common_vendor.index.navigateTo({
        url: "/pages/cardDetail/cardDetail?cardNumber=" + card.cardNumber
      });
    };
    const filteredCardList = common_vendor.computed(() => {
      const currentStatus = tabStatuses[current.value];
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
          const cardNumber = "" + card.cardNumber;
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
      common_vendor.index.navigateTo({
        url: "/pages/cardDetail/cardDetail?cardNumber=" + keyword
      });
    };
    const onScanResult = (data) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
        common_vendor.index.__f__("log", "at pages/card/card.uvue:244", result);
        if (result.length > 0) {
          card_number.value = result;
          common_vendor.index.showToast({
            title: "扫码成功",
            icon: "success"
          });
          yield handleQuery();
        }
      });
    };
    const getCardList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        loading.value = true;
        try {
          const res = yield api_http.queryCardList(new api_types.QueryCardListParams({
            rechargeNo: null,
            isSort: null,
            status: "0"
          }));
          if (res.code === 200) {
            common_vendor.index.__f__("log", "at pages/card/card.uvue:288", "查询卡列表成功:", res.data);
            allCardList.value = res.data.list;
          } else {
            common_vendor.index.__f__("log", "at pages/card/card.uvue:291", "查询卡列表失败:", res.msg);
            allCardList.value = [];
            common_vendor.index.showToast({
              title: res.msg || "查询失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/card/card.uvue:299", "查询卡列表异常:", error);
          allCardList.value = [];
          common_vendor.index.showToast({
            title: "网络异常，请稍后重试",
            icon: "none"
          });
        } finally {
          loading.value = false;
        }
      });
    };
    const checkToken = () => {
      const token = common_config.getToken();
      return !!token;
    };
    const platform = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (checkToken()) {
          yield getCardList();
        }
      });
    };
    common_vendor.onLoad((options) => {
      platform();
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
        b: common_vendor.o(handleInput, "f9"),
        c: common_vendor.o(($event) => {
          return card_number.value = $event;
        }, "2c"),
        d: common_vendor.p({
          placeholder: "请输入 ICCID / MSISDN",
          modelValue: card_number.value,
          class: "search-input data-v-a89086b7"
        }),
        e: common_vendor.p({
          name: "scan",
          size: "40rpx",
          class: "data-v-a89086b7"
        }),
        f: common_vendor.o(scanCode, "7a"),
        g: common_vendor.p({
          height: "100%",
          class: "scan-btn data-v-a89086b7"
        }),
        h: common_vendor.o(handleQuery, "77"),
        i: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          height: "100%",
          class: "data-v-a89086b7"
        }),
        j: common_vendor.o(handleClick, "ba"),
        k: common_vendor.o(($event) => {
          return current.value = $event;
        }, "9f"),
        l: common_vendor.p({
          ["line-color"]: "#ffffff",
          list: tabs.value,
          ["line-width"]: 0,
          ["title-active-color"]: "#2563eb",
          ["title-inactive-color"]: "#334155",
          customStyle: {
            height: "85rpx",
            padding: "10rpx",
            border: "1rpx solid #e5edf6"
          },
          modelValue: current.value,
          class: "data-v-a89086b7"
        }),
        m: common_vendor.f(filteredCardList.value, (card, index, i0) => {
          return {
            a: common_vendor.t(getCardText(card, "cardNumber")),
            b: common_vendor.t(getCardText(card, "iccid")),
            c: common_vendor.t(getCardText(card, "status")),
            d: common_vendor.n(getStatusClass(getCardText(card, "status"))),
            e: common_vendor.t(getCardText(card, "currentPackage")),
            f: "a89086b7-6-" + i0,
            g: common_vendor.t(getCardText(card, "expireDate")),
            h: common_vendor.t(getCardText(card, "usedTraffic")),
            i: common_vendor.t(getCardText(card, "totalTraffic")),
            j: common_vendor.t(getCardText(card, "currentCycle")),
            k: "a89086b7-7-" + i0,
            l: index,
            m: common_vendor.o(($event) => {
              return handleDetail(card);
            }, index)
          };
        }),
        n: common_vendor.p({
          dashed: true,
          customStyle: {
            margin: "0"
          },
          class: "data-v-a89086b7"
        }),
        o: common_vendor.p({
          type: "primary",
          size: "small",
          class: "data-v-a89086b7"
        }),
        p: scrollViewHeight.value + "px",
        q: filteredCardList.value.length === 0
      }, filteredCardList.value.length === 0 ? {} : {}, {
        r: common_vendor.p({
          class: "data-v-a89086b7"
        }),
        s: `${_ctx.u_s_b_h}px`,
        t: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a89086b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/card/card.js.map
