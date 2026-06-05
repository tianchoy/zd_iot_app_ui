"use strict";
const common_vendor = require("../../common/vendor.js");
const api_types = require("../../api/types.js");
const common_config = require("../../common/config.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_m_icon_1 = common_vendor.resolveComponent("m-icon");
  const _easycom_m_button_1 = common_vendor.resolveComponent("m-button");
  const _easycom_m_tag_1 = common_vendor.resolveComponent("m-tag");
  const _easycom_m_div_1 = common_vendor.resolveComponent("m-div");
  const _easycom_customService_1 = common_vendor.resolveComponent("customService");
  (_easycom_topNavBar_1 + _easycom_m_icon_1 + _easycom_m_button_1 + _easycom_m_tag_1 + _easycom_m_div_1 + _easycom_customService_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_m_icon = () => "../../uni_modules/m-unix/components/m-icon/m-icon.js";
const _easycom_m_button = () => "../../uni_modules/m-unix/components/m-button/m-button.js";
const _easycom_m_tag = () => "../../uni_modules/m-unix/components/m-tag/m-tag.js";
const _easycom_m_div = () => "../../uni_modules/m-unix/components/m-div/m-div.js";
const _easycom_customService = () => "../../components/customService/customService.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_m_icon + _easycom_m_button + _easycom_m_tag + _easycom_m_div + _easycom_customService)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const card_number = common_vendor.ref("");
    const cardList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const goRecharge = (item = null) => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:135", "去充值", item);
      common_vendor.index.navigateTo({
        url: "/pages/recharge/recharge"
      });
    };
    const scanCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scanCode/scanCode"
      });
    };
    const handleQuery = () => {
      if (!card_number.value) {
        common_vendor.index.showToast({
          title: "请输入卡号",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/index/index.uvue:155", "查询卡号:", card_number.value);
    };
    const onScanResult = (data) => {
      var _a;
      const result = (_a = data.getString("result")) !== null && _a !== void 0 ? _a : "";
      if (result.length > 0) {
        card_number.value = result;
        common_vendor.index.showToast({
          title: "扫码成功",
          icon: "success"
        });
      }
    };
    const cardType = (type) => {
      if (!isLogin())
        return null;
      common_vendor.index.reLaunch({
        url: "/pages/card/card?type=" + type
      });
    };
    const handleClick = () => {
      common_vendor.index.__f__("log", "at pages/index/index.uvue:182", "联系客服1111");
    };
    const getCardList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        loading.value = true;
        try {
          const res = yield api_http.queryCardList(new api_types.QueryCardListParams({
            rechargeNo: "",
            status: "",
            isSort: true
          }));
          if (res.code === 200) {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:195", "查询卡列表成功:", res.data);
            if (Array.isArray(res.data)) {
              cardList.value = res.data;
            } else if (res.data && Array.isArray(res.data.list)) {
              cardList.value = res.data.list;
            } else {
              cardList.value = [];
            }
          } else {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:205", "查询卡列表失败:", res.msg);
            cardList.value = [];
            common_vendor.index.showToast({
              title: res.msg || "查询失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:213", "查询卡列表异常:", error);
          cardList.value = [];
          common_vendor.index.showToast({
            title: "网络异常，请稍后重试",
            icon: "none"
          });
        } finally {
          loading.value = false;
        }
      });
    };
    const cardListSum = common_vendor.ref(new api_types.CardListSumData({
      all: null,
      inUse: null,
      inNotUse: null
    }));
    const getCardListSum = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const res = yield api_http.queryCardListSum();
          if (res.code === 200) {
            cardListSum.value = res.data;
            common_vendor.index.__f__("log", "at pages/index/index.uvue:231", "查询卡列表统计成功:", res.data);
          } else {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:233", "查询卡列表统计失败:", res.msg);
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:236", "查询卡列表统计异常:", error);
        }
      });
    };
    const checkToken = () => {
      const token = common_config.getToken();
      return !!token;
    };
    const isLogin = () => {
      if (!checkToken()) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return false;
      }
      return true;
    };
    common_vendor.onLoad(() => {
      if (checkToken()) {
        getCardList();
        getCardListSum();
      }
      common_vendor.index.$on("scanResult", onScanResult);
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("scanResult", onScanResult);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.p({
          title: "首页",
          ["show-back"]: false,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-00a60067"
        }),
        b: common_vendor.t(cardListSum.value.all || 0),
        c: common_vendor.o(($event) => {
          return cardType(0);
        }, "cb"),
        d: common_vendor.t(cardListSum.value.inUse || 0),
        e: common_vendor.o(($event) => {
          return cardType(1);
        }, "9a"),
        f: common_vendor.t(cardListSum.value.inNotUse || 0),
        g: common_vendor.o(($event) => {
          return cardType(2);
        }, "82"),
        h: card_number.value,
        i: common_vendor.o(($event) => {
          return card_number.value = $event.detail.value;
        }, "31"),
        j: common_vendor.p({
          name: "scanning",
          size: "40rpx",
          class: "data-v-00a60067"
        }),
        k: common_vendor.o(scanCode, "04"),
        l: common_vendor.p({
          type: "white",
          plain: true,
          width: "90rpx",
          class: "scan-btn data-v-00a60067"
        }),
        m: common_vendor.o(handleQuery, "19"),
        n: common_vendor.p({
          type: "primary",
          width: "120rpx",
          class: "data-v-00a60067"
        }),
        o: common_vendor.o(($event) => {
          return cardType(0);
        }, "a1"),
        p: common_vendor.f(cardList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.msisdn || item.iccid || "--"),
            b: common_vendor.t(item.iccid || "--"),
            c: "00a60067-4-" + i0,
            d: common_vendor.p({
              text: item.tag || "标签",
              round: true,
              plain: true,
              size: "small",
              type: "primary",
              class: "data-v-00a60067"
            }),
            e: common_vendor.t(item.packageName || "--"),
            f: "00a60067-5-" + i0,
            g: common_vendor.t(item.expireDate || "--"),
            h: common_vendor.t(item.usedFlow || "0"),
            i: common_vendor.t(item.totalFlow || "0"),
            j: common_vendor.t(item.cycleInfo || "--"),
            k: common_vendor.o(($event) => {
              return goRecharge(item);
            }, item.id || index),
            l: "00a60067-6-" + i0,
            m: item.id || index
          };
        }),
        q: common_vendor.p({
          backgroundColor: "#f1f5f9",
          textClass: "divider",
          class: "data-v-00a60067"
        }),
        r: common_vendor.p({
          type: "primary",
          width: "200rpx",
          btnSize: "mini",
          size: "25rpx",
          shape: "circle",
          class: "data-v-00a60067"
        }),
        s: cardList.value.length === 0 && !loading.value
      }, cardList.value.length === 0 && !loading.value ? {} : {}, {
        t: common_vendor.o(handleClick, "43"),
        v: common_vendor.p({
          class: "data-v-00a60067"
        }),
        w: `${_ctx.u_s_b_h}px`,
        x: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
