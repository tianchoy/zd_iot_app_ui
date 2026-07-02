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
  (_easycom_topNavBar_1 + _easycom_rice_input_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_divider_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_input = () => "../../uni_modules/rice-ui/components/rice-input/rice-input.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_input + _easycom_rice_button + _easycom_rice_tabs + _easycom_rice_divider)();
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
    const card_number = common_vendor.ref("gn1000000000002");
    const queryKeyword = common_vendor.ref("");
    const current = common_vendor.ref(0);
    common_vendor.ref(0);
    const cardList = common_vendor.ref([]);
    const cardCounts = common_vendor.ref([0, 0, 0]);
    const tabs = common_vendor.computed(() => {
      return [
        new TabItem({ name: `全部 ${cardCounts.value[0]}` }),
        new TabItem({ name: `在用 ${cardCounts.value[1]}` }),
        new TabItem({ name: `异常 ${cardCounts.value[2]}` })
      ];
    });
    const handleDetail = (card) => {
      common_vendor.index.navigateTo({
        url: "/pages/cardDetail/cardDetail?cardNumber=" + card.rechargeNo
      });
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "在用":
          return "status-completed";
        case "停机":
          return "status-pending";
        default:
          return "";
      }
    };
    const getFlowText = (card) => {
      var _a, _b;
      const used = (_a = card.usedFlow) !== null && _a !== void 0 ? _a : 0;
      const total = (_b = card.pkgFlow) !== null && _b !== void 0 ? _b : 0;
      return `${used} / ${total}`;
    };
    const getCycleText = (card) => {
      var _a, _b;
      const used = (_a = card.usedPeriod) !== null && _a !== void 0 ? _a : "-";
      const total = (_b = card.totalPeriod) !== null && _b !== void 0 ? _b : "-";
      return `${used} / ${total}`;
    };
    const checkToken = () => {
      const token = common_config.getToken();
      return !!token;
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
            isSort: true
          }));
          if (res.code == 200) {
            return Array.isArray(res.data) ? res.data : [];
          }
          return [];
        } catch (error) {
          common_vendor.index.showToast({
            title: "查询失败，请稍后重试",
            icon: "none"
          });
          return [];
        }
      });
    };
    const handleRecharge = (rechargeNo) => {
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge?cardNumber=" + rechargeNo
      });
    };
    const code = common_vendor.ref("");
    const getCode = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
          common_vendor.index.login(new common_vendor.UTSJSONObject({
            provider: "weixin",
            success: (res) => {
              code.value = res.code;
              api_http.login(new common_vendor.UTSJSONObject({
                isLogin: "1",
                xcxCode: code.value
              })).then((loginRes) => {
                if (loginRes.code == 200) {
                  common_config.setToken(loginRes.data.access_token, loginRes.data.refreshToken);
                  resolve(true);
                } else {
                  resolve(false);
                }
              }).catch(() => {
                resolve(false);
              });
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/card/card.uvue:227", "登录失败:", err);
              resolve(false);
            }
          }));
        });
      });
    };
    const wxGetPhoneLogin = common_vendor.ref("");
    const getTenantInfos = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.getTenantInfo(common_config.getTenantId(), false);
        if (res.code == 200) {
          const tenantInfo = res.data;
          wxGetPhoneLogin.value = "" + tenantInfo.wxGetPhoneLogin;
        }
      });
    };
    const loadCardData = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const _a = common_vendor.__read(yield Promise.all([
          getCardList("0"),
          getCardList("1"),
          getCardList("2")
        ]), 3), allList = _a[0], inUseList = _a[1], abnormalList = _a[2];
        cardCounts.value = [allList.length, inUseList.length, abnormalList.length];
        cardList.value = allList;
      });
    };
    const platform = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (common_config.isWechat()) {
          if (!checkToken()) {
            yield getTenantInfos();
            if (wxGetPhoneLogin.value != "1") {
              cardList.value = [];
              cardCounts.value = [0, 0, 0];
              return Promise.resolve(null);
            }
            const loginSuccess = yield getCode();
            if (!loginSuccess) {
              common_vendor.index.__f__("log", "at pages/card/card.uvue:274", "登录失败，跳过数据加载");
              common_vendor.index.showToast({
                title: "登录失败，请重试",
                icon: "none"
              });
              return Promise.resolve(null);
            }
          }
        }
        yield loadCardData();
      });
    };
    const handleClick = (e) => {
      if (common_config.isWechat()) {
        if (!checkToken())
          return null;
      }
      if (e.index != null) {
        current.value = e.index;
        getCardList(current.value.toString()).then((list) => {
          cardList.value = list;
        });
      }
    };
    common_vendor.onLoad(() => {
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onShow(() => {
      platform();
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
        b: common_vendor.o(handleInput, "6c"),
        c: common_vendor.o(($event) => {
          return card_number.value = $event;
        }, "ed"),
        d: common_vendor.p({
          placeholder: "请输入 ICCID / MSISDN",
          modelValue: card_number.value,
          class: "search-input data-v-a89086b7"
        }),
        e: common_vendor.o(scanCode, "67"),
        f: common_vendor.p({
          height: "100%",
          icon: "scan",
          class: "scan-btn data-v-a89086b7"
        }),
        g: common_vendor.o(handleQuery, "87"),
        h: common_vendor.p({
          type: "primary",
          color: "#1989fa",
          textColor: "#ffffff",
          height: "100%",
          class: "data-v-a89086b7"
        }),
        i: common_vendor.o(handleClick, "e9"),
        j: common_vendor.o(($event) => {
          return current.value = $event;
        }, "82"),
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
        l: common_vendor.f(cardList.value, (card, index, i0) => {
          return common_vendor.e({
            a: card.rechargeNo
          }, card.rechargeNo ? {
            b: common_vendor.t(card.rechargeNo || "-")
          } : {}, {
            c: card.pkgName
          }, card.pkgName ? {
            d: common_vendor.t(card.pkgName || "-")
          } : {}, {
            e: card.statusStr
          }, card.statusStr ? {
            f: common_vendor.t(card.statusStr || "未知"),
            g: common_vendor.n(getStatusClass(card.statusStr))
          } : {}, {
            h: card.usedFlow || card.pkgFlow
          }, card.usedFlow || card.pkgFlow ? {
            i: common_vendor.t(getFlowText(card))
          } : {}, {
            j: "a89086b7-5-" + i0,
            k: common_vendor.t(card.effectiveTime || "-"),
            l: common_vendor.t(card.expirationTime || "-"),
            m: common_vendor.t(getCycleText(card)),
            n: common_vendor.o(($event) => {
              return handleRecharge(card.rechargeNo);
            }, index),
            o: "a89086b7-6-" + i0,
            p: index,
            q: common_vendor.o(($event) => {
              return handleDetail(card);
            }, index)
          });
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
          size: "mini",
          customStyle: {
            fontSize: "24rpx"
          },
          class: "data-v-a89086b7"
        }),
        o: cardList.value.length === 0
      }, cardList.value.length === 0 ? {} : {}, {
        p: `${_ctx.u_s_b_h}px`,
        q: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a89086b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/card/card.js.map
