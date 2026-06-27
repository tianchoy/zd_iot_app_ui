"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
require("../../api/types.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_progress_1 = common_vendor.resolveComponent("rice-progress");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_tabs_1 = common_vendor.resolveComponent("rice-tabs");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_progress_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_progress + _easycom_rice_button + _easycom_rice_tabs + common_vendor.unref(Payment) + _easycom_rice_popup)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recharge",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const isInPaymentProcess = common_vendor.ref(false);
    const percentage = common_vendor.computed(() => {
      var _a, _b;
      const usedFlow = (_a = cardDetail.value) === null || _a === void 0 ? null : _a.usedPeriod;
      const totalFlow = (_b = cardDetail.value) === null || _b === void 0 ? null : _b.pkgFlow;
      if (!usedFlow || !totalFlow) {
        return 0;
      }
      const used = parseFloat(usedFlow);
      const total = parseFloat(totalFlow);
      if (total === 0) {
        return 0;
      }
      let percent = used / total * 100;
      percent = Math.min(100, Math.max(0, percent));
      return Math.round(percent);
    });
    const active = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      {
        name: "套餐包"
      },
      {
        name: "加油包"
      }
    ]);
    const packageList = common_vendor.ref([]);
    const refillList = common_vendor.ref([]);
    const selectedPackageIndex = common_vendor.ref(0);
    const selectedRefillIndex = common_vendor.ref(0);
    const selectedPackage = common_vendor.ref(null);
    const currentPackage = common_vendor.computed(() => {
      var _a, _b;
      if (active.value === 0) {
        return (_a = packageList.value[selectedPackageIndex.value]) !== null && _a !== void 0 ? _a : null;
      }
      return (_b = refillList.value[selectedRefillIndex.value]) !== null && _b !== void 0 ? _b : null;
    });
    const currentPrice = common_vendor.computed(() => {
      if (active.value === 0) {
        const item = packageList.value[selectedPackageIndex.value];
        return item ? item.sellingPrice : "0.00";
      } else {
        const item = refillList.value[selectedRefillIndex.value];
        return item ? item.sellingPrice : "0.00";
      }
    });
    const classifyPackages = (packages) => {
      const packagesList = [];
      const refillsList = [];
      packages.forEach((item, index) => {
        if (item.pkgCategory == "3") {
          packagesList.push(item);
        } else if (item.pkgCategory == "4") {
          refillsList.push(item);
        }
      });
      packageList.value = packagesList;
      refillList.value = refillsList;
      selectedPackageIndex.value = 0;
      selectedRefillIndex.value = 0;
    };
    const getOrderStatusType = (status) => {
      const typeMap = {
        "在用": "success",
        "停机": "error"
      };
      return typeMap[status] || "warning";
    };
    const changeTab = (e) => {
      active.value = e.index;
    };
    const selectPackage = (index, item) => {
      selectedPackageIndex.value = index;
      selectedPackage.value = item;
    };
    const selectRefill = (index) => {
      selectedRefillIndex.value = index;
    };
    const choosePayment = () => {
      if (active.value === 0 && packageList.value.length === 0) {
        common_vendor.index.showToast({
          title: "暂无套餐包可选",
          icon: "none"
        });
        return null;
      }
      if (active.value === 1 && refillList.value.length === 0) {
        common_vendor.index.showToast({
          title: "暂无加油包可选",
          icon: "none"
        });
        return null;
      }
      showPopup.value = true;
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const orderId = common_vendor.ref("");
    const payChannelId = common_vendor.ref("");
    const toPay = (data = null) => {
      if (!data)
        return null;
      const res = data;
      orderId.value = res.orderId;
      payChannelId.value = res.payChannelId;
      isInPaymentProcess.value = true;
      if (res.payWxType == "wechat_pay") {
        common_vendor.index.requestPayment({
          provider: "wxpay",
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          paySign: res.paySign,
          signType: res.signType,
          success: (res2) => {
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:298", "微信支付成功", res2);
            common_vendor.index.hideLoading();
            common_vendor.index.redirectTo({
              url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value
            });
          },
          fail: (res2) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "微信支付失败，请您重新支付",
              icon: "none",
              duration: 1e3
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/orderDetail/orderDetail?orderNo=" + orderId.value
              });
            }, 1e3);
            isInPaymentProcess.value = false;
          }
        });
      } else if (res.payWxType == "allin_pay") {
        if (res.payWxClass == "0") {
          common_vendor.index.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            paySign: res.paySign,
            signType: res.signType,
            success: function(res2) {
              common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:330", "通联支付成功", res2);
              common_vendor.index.hideLoading();
              common_vendor.index.redirectTo({
                url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value
              });
            },
            fail: function(err) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "通联支付失败，请您重新支付",
                icon: "none",
                duration: 1e3
              });
              setTimeout(() => {
                common_vendor.index.reLaunch({
                  url: "/pages/orderDetail/orderDetail?orderNo=" + orderId.value
                });
              }, 1e3);
              isInPaymentProcess.value = false;
            }
          });
        } else {
          let param = new common_vendor.UTSJSONObject({
            cusid: res.cusid,
            appid: res.appid,
            orgid: res.orgid,
            version: res.version,
            trxamt: res.trxamt,
            reqsn: res.reqsn,
            notify_url: res.notify_url,
            body: res.body,
            remark: res.remark,
            randomstr: res.randomstr,
            paytype: res.paytype,
            signtype: res.signtype,
            sign: res.sign
          });
          common_vendor.wx$1.navigateToMiniProgram(new common_vendor.UTSJSONObject({
            appId: common_config.config.api.auth.appID,
            extraData: param,
            success(res2 = null) {
              common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:373", "支付成功:", res2);
            },
            fail(res2 = null) {
              common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:376", "支付失败:", res2);
              common_vendor.index.hideLoading();
              isInPaymentProcess.value = false;
            }
          }));
        }
      }
    };
    const handleConfirmPayment = (e = null) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        common_vendor.index.showLoading(new common_vendor.UTSJSONObject({
          title: "支付中..."
        }));
        showPopup.value = false;
        const currentItem = active.value === 0 ? packageList.value[selectedPackageIndex.value] : refillList.value[selectedRefillIndex.value];
        try {
          const res = yield api_http.addOrder(new common_vendor.UTSJSONObject({
            pkgId: currentItem.pkgId,
            rechargeNo: cardNumber.value
          }));
          if (res.code == 200) {
            toPay(res.data);
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: res.msg || "支付失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:414", "添加订单失败:", error);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "添加订单失败",
            icon: "none"
          });
        }
      });
    };
    const onPopupClose = () => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:424", "弹窗关闭");
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const toMyPackage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myPkg/myPkg?card_number=" + cardNumber.value
      });
    };
    const toOrderRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderRecord/orderRecord?rechargeNo=" + cardNumber.value
      });
    };
    const cardDetail = common_vendor.ref(null);
    const getCardDetail = (cardNumber2, country2) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
          const res = yield api_http.queryCardDetail(cardNumber2, country2, "0");
          if (res.code == 200) {
            cardDetail.value = res.data;
            if (((_a = res.data) === null || _a === void 0 ? null : _a.pkgXcxVos) && res.data.pkgXcxVos.length > 0) {
              classifyPackages(res.data.pkgXcxVos);
            }
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:460", "获取卡片详情失败:", error);
          common_vendor.index.showToast({
            title: "获取卡片信息失败",
            icon: "none"
          });
        }
      });
    };
    const cardNumber = common_vendor.ref("");
    const country = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:471", "options:", options);
      const opt = options;
      const cardNumberValue = opt.cardNumber;
      const countryValue = opt.country;
      if (cardNumberValue) {
        cardNumber.value = cardNumberValue;
        country.value = countryValue !== null && countryValue !== void 0 ? countryValue : "";
        getCardDetail(cardNumber.value, country.value);
      } else {
        common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:481", "未获取到卡片号码");
        common_vendor.index.showToast({
          title: "卡片号码不存在",
          icon: "none"
        });
      }
    });
    common_vendor.onShow(() => {
      if (!isInPaymentProcess.value) {
        return null;
      }
      let options = common_vendor.index.getEnterOptionsSync();
      if (options.scene == "1038" && options.referrerInfo.appId == common_config.config.api.auth.appID) {
        let extraData = options.referrerInfo.extraData;
        if (!extraData) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "支付取消，请您重新支付",
            icon: "none",
            duration: 1e3
          });
          isInPaymentProcess.value = false;
          return null;
        } else {
          if (extraData.code == "success") {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付成功",
              icon: "success",
              duration: 1e3,
              success() {
                isInPaymentProcess.value = false;
                common_vendor.index.redirectTo({
                  url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value
                });
              }
            });
          } else if (extraData.code == "cancel") {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付取消，请您重新支付",
              icon: "none",
              duration: 1e3
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/orderDetail/orderDetail?orderNo=" + orderId.value
              });
            }, 1e3);
            isInPaymentProcess.value = false;
            return null;
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 1e3
            });
            isInPaymentProcess.value = false;
            return null;
          }
        }
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "f5"),
        b: common_vendor.p({
          title: "充值首页",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-722cdacb"
        }),
        c: common_vendor.p({
          text: ((_a = cardDetail.value) == null ? void 0 : _a.statusStr) || "未知",
          round: true,
          ["plain-fill"]: true,
          size: "small",
          type: getOrderStatusType((_b = cardDetail.value) == null ? void 0 : _b.statusStr),
          class: "data-v-722cdacb"
        }),
        d: common_vendor.t(((_c = cardDetail.value) == null ? void 0 : _c.rechargeNo) || "未知"),
        e: (_d = cardDetail.value) == null ? void 0 : _d.pkgName
      }, ((_e = cardDetail.value) == null ? void 0 : _e.pkgName) ? {
        f: common_vendor.t(((_f = cardDetail.value) == null ? void 0 : _f.pkgName) || "未知")
      } : {}, {
        g: common_vendor.t(((_g = cardDetail.value) == null ? void 0 : _g.usedFlow) || 0),
        h: common_vendor.t(((_h = cardDetail.value) == null ? void 0 : _h.unUsedFlow) || 0),
        i: common_vendor.t(((_i = cardDetail.value) == null ? void 0 : _i.pkgFlow) || 0),
        j: common_vendor.p({
          percentage: percentage.value,
          ["show-text"]: true,
          class: "data-v-722cdacb"
        }),
        k: common_vendor.o(toMyPackage, "f5"),
        l: common_vendor.p({
          class: "btn mr-24 data-v-722cdacb"
        }),
        m: common_vendor.o(toOrderRecord, "bf"),
        n: common_vendor.p({
          class: "btn data-v-722cdacb"
        }),
        o: common_vendor.o(changeTab, "ca"),
        p: common_vendor.o(($event) => {
          return active.value = $event;
        }, "a4"),
        q: common_vendor.p({
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
          modelValue: active.value,
          class: "data-v-722cdacb"
        }),
        r: active.value === 0
      }, active.value === 0 ? common_vendor.e({
        s: common_vendor.f(packageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: item.pkgFlow
          }, item.pkgFlow ? {
            e: common_vendor.t(item.pkgFlow)
          } : {}, {
            f: item.validityPeriod
          }, item.validityPeriod ? {
            g: common_vendor.t(item.validityPeriod),
            h: common_vendor.t((item == null ? void 0 : item.pkgType) == "1" ? "天" : "个月")
          } : {}, {
            i: common_vendor.t(item.sellingPrice),
            j: item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice
          }, item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice ? {
            k: common_vendor.t(item.crossedOutPrice)
          } : {}, {
            l: item.pkgId || index,
            m: selectedPackageIndex.value === index ? 1 : "",
            n: common_vendor.o(($event) => {
              return selectPackage(index, item);
            }, item.pkgId || index)
          });
        }),
        t: packageList.value.length == 0
      }, packageList.value.length == 0 ? {} : {}) : common_vendor.e({
        v: common_vendor.f(refillList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.pkgName),
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: item.pkgFlow
          }, item.pkgFlow ? {
            e: common_vendor.t(item.pkgFlow)
          } : {}, {
            f: item.validityPeriod
          }, item.validityPeriod ? {
            g: common_vendor.t(item.validityPeriod),
            h: common_vendor.t((item == null ? void 0 : item.pkgType) == "1" ? "天" : "个月")
          } : {}, {
            i: common_vendor.t(item.sellingPrice),
            j: item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice
          }, item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice ? {
            k: common_vendor.t(item.crossedOutPrice)
          } : {}, {
            l: item.pkgId || index,
            m: selectedRefillIndex.value == index ? 1 : "",
            n: common_vendor.o(($event) => {
              return selectRefill(index);
            }, item.pkgId || index)
          });
        }),
        w: refillList.value.length == 0
      }, refillList.value.length == 0 ? {} : {}), {
        x: `${_ctx.u_s_b_h}px`,
        y: `${_ctx.u_s_a_i_b}px`,
        z: common_vendor.o(handleCancelPayment, "36"),
        A: common_vendor.o(handleConfirmPayment, "6a"),
        B: common_vendor.p({
          amount: currentPrice.value,
          cardNumber: (_j = cardDetail.value) == null ? void 0 : _j.rechargeNo,
          productName: (_k = currentPackage.value) == null ? void 0 : _k.pkgName,
          traffic: (_l = currentPackage.value) == null ? void 0 : _l.pkgFlow,
          validityPeriod: (_m = currentPackage.value) == null ? void 0 : _m.validityPeriod,
          pkgType: (_n = currentPackage.value) == null ? void 0 : _n.pkgType,
          class: "data-v-722cdacb"
        }),
        C: common_vendor.o(onPopupClose, "6d"),
        D: common_vendor.o(($event) => {
          return showPopup.value = $event;
        }, "d9"),
        E: common_vendor.p({
          position: "bottom",
          show: showPopup.value,
          class: "data-v-722cdacb"
        }),
        F: common_vendor.t(currentPrice.value),
        G: common_vendor.o(choosePayment, "70"),
        H: common_vendor.p({
          type: "primary",
          width: "300rpx",
          height: "110rpx",
          class: "btn data-v-722cdacb"
        }),
        I: `${_ctx.u_s_b_h}px`,
        J: `${_ctx.u_s_a_i_b}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
