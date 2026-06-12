"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_input_1 = common_vendor.resolveComponent("rice-input");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_divider_1 = common_vendor.resolveComponent("rice-divider");
  const _easycom_customService_1 = common_vendor.resolveComponent("customService");
  (_easycom_topNavBar_1 + _easycom_rice_input_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_divider_1 + _easycom_customService_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_input = () => "../../uni_modules/rice-ui/components/rice-input/rice-input.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
const _easycom_customService = () => "../../components/customService/customService.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_input + _easycom_rice_button + _easycom_rice_tabs + _easycom_rice_divider + _easycom_customService)();
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
    common_vendor.ref(false);
    const allCardList = common_vendor.ref([]);
    const tabNumbers = common_vendor.computed(() => {
      const list = Array.isArray(allCardList.value) ? allCardList.value : [];
      const total = list.length;
      const inUse = list.filter((card) => {
        return card.status === "在用";
      }).length;
      const abnormal = list.filter((card) => {
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
      common_vendor.index.__f__("log", "at pages/card/card.uvue:123", card);
      common_vendor.index.navigateTo({
        url: "/pages/cardDetail/cardDetail?cardNumber=" + card.cardNumber
      });
    };
    const filteredCardList = common_vendor.computed(() => {
      const list = Array.isArray(allCardList.value) ? allCardList.value : [];
      const currentStatus = tabStatuses[current.value];
      let filteredList = [...list];
      if (currentStatus !== "全部") {
        filteredList = filteredList.filter((card) => {
          const status = "" + card.status;
          if (currentStatus === "异常") {
            return status !== "在用";
          }
          return status === currentStatus;
        });
      }
      if (queryKeyword.value !== "") {
        filteredList = filteredList.filter((card) => {
          const cardNumber = "" + card.cardNumber;
          return cardNumber.indexOf(queryKeyword.value) !== -1;
        });
      }
      return filteredList;
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
        common_vendor.index.__f__("log", "at pages/card/card.uvue:210", result);
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
    const getCardList = (state) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryCardList(new api_types.QueryCardListParams({
            rechargeNo: null,
            status: state,
            isSort: "1"
          }));
          common_vendor.index.__f__("log", "at pages/card/card.uvue:250", "查询卡列表返回:", res);
          if (res.code == 200) {
            if (res.data && Array.isArray(res.data)) {
              allCardList.value = res.data;
            } else if (res.data === null || res.data === void 0) {
              allCardList.value = [];
            } else {
              allCardList.value = [];
            }
          } else {
            allCardList.value = [];
            common_vendor.index.showToast({
              title: res.msg || "查询失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/card/card.uvue:267", "查询卡列表异常:", error);
          allCardList.value = [];
          common_vendor.index.showToast({
            title: "查询失败，请稍后重试",
            icon: "none"
          });
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
          yield getCardList("0");
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
        e: common_vendor.o(scanCode, "ea"),
        f: common_vendor.p({
          height: "100%",
          icon: "scan",
          class: "scan-btn data-v-a89086b7"
        }),
        g: common_vendor.o(handleQuery, "f9"),
        h: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          height: "100%",
          class: "data-v-a89086b7"
        }),
        i: common_vendor.o(handleClick, "ec"),
        j: common_vendor.o(($event) => {
          return current.value = $event;
        }, "c3"),
        k: common_vendor.p({
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
        l: common_vendor.f(filteredCardList.value, (card, index, i0) => {
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
        m: common_vendor.p({
          dashed: true,
          customStyle: {
            margin: "0"
          },
          class: "data-v-a89086b7"
        }),
        n: common_vendor.p({
          type: "primary",
          size: "small",
          class: "data-v-a89086b7"
        }),
        o: scrollViewHeight.value + "px",
        p: filteredCardList.value.length === 0
      }, filteredCardList.value.length === 0 ? {} : {}, {
        q: common_vendor.p({
          class: "data-v-a89086b7"
        }),
        r: `${_ctx.u_s_b_h}px`,
        s: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a89086b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/card/card.js.map
