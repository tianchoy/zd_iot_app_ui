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
  const _easycom_rice_icon_1 = common_vendor.resolveComponent("rice-icon");
  const _easycom_customService_1 = common_vendor.resolveComponent("customService");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_progress_1 + _easycom_rice_button_1 + _easycom_rice_tabs_1 + _easycom_rice_popup_1 + _easycom_rice_icon_1 + _easycom_customService_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_progress = () => "../../uni_modules/rice-ui/components/rice-progress/rice-progress.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_tabs = () => "../../uni_modules/rice-ui/components/rice-tabs/rice-tabs.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
const _easycom_rice_icon = () => "../../uni_modules/rice-ui/components/rice-icon/rice-icon.js";
const _easycom_customService = () => "../../components/customService/customService.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_progress + _easycom_rice_button + _easycom_rice_tabs + common_vendor.unref(Payment) + _easycom_rice_popup + _easycom_rice_icon + _easycom_customService)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  inheritAttrs: false
}, { __name: "recharge", setup(__props) {
  const showTips = common_vendor.ref(true);
  const showCustomService = common_vendor.ref(false);
  const closeTips = () => {
    showTips.value = false;
  };
  const handleConnectService = () => {
    setTimeout(() => {
      showCustomService.value = true;
    }, 100);
  };
  const showPopup = common_vendor.ref(false);
  const isInPaymentProcess = common_vendor.ref(false);
  const showBack = common_vendor.ref(true);
  const cardDetail = common_vendor.ref(null);
  const percentage = common_vendor.computed(() => {
    const detail = cardDetail.value;
    if (detail == null)
      return 0;
    const usedFlow = detail.usedPeriod;
    const totalFlow = detail.pkgFlow;
    if (usedFlow == null || totalFlow == null) {
      return 0;
    }
    const used = Number.parseFloat(usedFlow);
    const total = Number.parseFloat(totalFlow);
    if (total === 0) {
      return 0;
    }
    let percent = used / total * 100;
    percent = Math.min(100, Math.max(0, percent));
    return Math.round(percent);
  });
  const active = common_vendor.ref(0);
  const tabs = common_vendor.ref([
    new common_vendor.UTSJSONObject({
      name: "套餐包"
    }),
    new common_vendor.UTSJSONObject({
      name: "加油包"
    })
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
    var _a;
    const typeMap = /* @__PURE__ */ new Map();
    typeMap.set("在用", "success");
    typeMap.set("停机", "error");
    return (_a = common_vendor.UTS.mapGet(typeMap, status)) !== null && _a !== void 0 ? _a : "warning";
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
          common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:364", "微信支付成功", res2);
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
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:396", "通联支付成功", res2);
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
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:439", "支付成功:", res2);
          },
          fail(res2 = null) {
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:442", "支付失败:", res2);
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
        common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:480", "添加订单失败:", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "添加订单失败",
          icon: "none"
        });
      }
    });
  };
  const onPopupClose = () => {
    common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:490", "弹窗关闭");
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
  const getCardDetail = (cardNumber2, country2) => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const res = yield api_http.queryCardDetail(cardNumber2, country2, "0");
        common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:516", "获取卡片详情1111:", res);
        if (res.code == 200) {
          cardDetail.value = res.data;
          if (((_a = res.data) === null || _a === void 0 ? null : _a.pkgXcxVos) && res.data.pkgXcxVos.length > 0) {
            classifyPackages(res.data.pkgXcxVos);
          }
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:524", "获取卡片详情失败:", error);
        common_vendor.index.showToast({
          title: "获取卡片信息失败",
          icon: "none"
        });
      }
    });
  };
  const handleBack = () => {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      showBack.value = true;
    } else {
      showBack.value = false;
    }
  };
  const phoneList = common_vendor.computed(() => {
    var _a, _b;
    const phoneStr = ((_b = (_a = cardDetail.value) === null || _a === void 0 ? null : _a.objectMap) === null || _b === void 0 ? null : _b.servicePhone) || "";
    return phoneStr ? phoneStr.split(",").map((item = null) => {
      return item.trim();
    }) : [];
  });
  const cardNumber = common_vendor.ref("");
  const country = common_vendor.ref("");
  common_vendor.onLoad((options) => {
    common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:550", "options:", options);
    const opt = options;
    const cardNumberValue = opt.cardNumber;
    const countryValue = opt.country;
    opt.from;
    handleBack();
    if (cardNumberValue) {
      cardNumber.value = cardNumberValue;
      country.value = countryValue !== null && countryValue !== void 0 ? countryValue : "";
      getCardDetail(cardNumber.value, country.value);
    } else {
      common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:562", "未获取到卡片号码");
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E;
    const __returned__ = common_vendor.e({
      a: common_vendor.o(goBack, "29"),
      b: common_vendor.p({
        title: "充值首页",
        ["show-back"]: showBack.value,
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
      d: (_c = cardDetail.value) == null ? void 0 : _c.rechargeNo
    }, ((_d = cardDetail.value) == null ? void 0 : _d.rechargeNo) ? {
      e: common_vendor.t(((_e = cardDetail.value) == null ? void 0 : _e.rechargeNo) || "未知")
    } : {}, {
      f: (_f = cardDetail.value) == null ? void 0 : _f.pkgName
    }, ((_g = cardDetail.value) == null ? void 0 : _g.pkgName) ? {
      g: common_vendor.t(((_h = cardDetail.value) == null ? void 0 : _h.pkgName) || "未知")
    } : {}, {
      h: common_vendor.t((_i = cardDetail.value) == null ? void 0 : _i.effectiveTime),
      i: common_vendor.t((_j = cardDetail.value) == null ? void 0 : _j.expirationTime),
      j: (_k = cardDetail.value) == null ? void 0 : _k.pkgFlow
    }, ((_l = cardDetail.value) == null ? void 0 : _l.pkgFlow) ? {
      k: common_vendor.t(((_m = cardDetail.value) == null ? void 0 : _m.usedFlow) || 0),
      l: common_vendor.t(((_n = cardDetail.value) == null ? void 0 : _n.unUsedFlow) || 0),
      m: common_vendor.t(((_o = cardDetail.value) == null ? void 0 : _o.pkgFlow) || 0),
      n: common_vendor.p({
        percentage: percentage.value,
        ["show-text"]: true,
        class: "data-v-722cdacb"
      })
    } : {}, {
      o: common_vendor.o(toMyPackage, "f5"),
      p: common_vendor.p({
        class: "btn mr-24 data-v-722cdacb"
      }),
      q: common_vendor.o(toOrderRecord, "01"),
      r: common_vendor.p({
        class: "btn data-v-722cdacb"
      }),
      s: common_vendor.o(changeTab, "8d"),
      t: common_vendor.o(($event) => {
        return active.value = $event;
      }, "58"),
      v: common_vendor.p({
        ["line-color"]: "#ffffff",
        list: tabs.value,
        ["line-width"]: 0,
        ["title-active-color"]: "#2563eb",
        ["title-inactive-color"]: "#64748b",
        customStyle: {
          height: "85rpx",
          padding: "10rpx",
          border: "1rpx solid #e5edf6"
        },
        modelValue: active.value,
        class: "data-v-722cdacb"
      }),
      w: active.value === 0
    }, active.value === 0 ? common_vendor.e({
      x: common_vendor.f(packageList.value, (item, index, i0) => {
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
      y: packageList.value.length == 0
    }, packageList.value.length == 0 ? {} : {}) : common_vendor.e({
      z: common_vendor.f(refillList.value, (item, index, i0) => {
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
      A: refillList.value.length == 0
    }, refillList.value.length == 0 ? {} : {}), {
      B: `${_ctx.u_s_b_h}px`,
      C: `${_ctx.u_s_a_i_b}px`,
      D: common_vendor.o(handleCancelPayment, "20"),
      E: common_vendor.o(handleConfirmPayment, "8c"),
      F: common_vendor.p({
        amount: currentPrice.value,
        cardNumber: (_p = cardDetail.value) == null ? void 0 : _p.rechargeNo,
        productName: (_q = currentPackage.value) == null ? void 0 : _q.pkgName,
        traffic: (_r = currentPackage.value) == null ? void 0 : _r.pkgFlow,
        validityPeriod: (_s = currentPackage.value) == null ? void 0 : _s.validityPeriod,
        pkgType: (_t = currentPackage.value) == null ? void 0 : _t.pkgType,
        class: "data-v-722cdacb"
      }),
      G: common_vendor.o(onPopupClose, "8e"),
      H: common_vendor.o(($event) => {
        return showPopup.value = $event;
      }, "6e"),
      I: common_vendor.p({
        position: "bottom",
        show: showPopup.value,
        class: "data-v-722cdacb"
      }),
      J: packageList.value.length > 0 || refillList.value.length > 0
    }, packageList.value.length > 0 || refillList.value.length > 0 ? common_vendor.e({
      K: showTips.value && ((_v = (_u = cardDetail.value) == null ? void 0 : _u.objectMap) == null ? void 0 : _v.rechargeTip)
    }, showTips.value && ((_x = (_w = cardDetail.value) == null ? void 0 : _w.objectMap) == null ? void 0 : _x.rechargeTip) ? {
      L: common_vendor.t((_y = cardDetail.value) == null ? void 0 : _y.objectMap.rechargeTip),
      M: common_vendor.p({
        name: "clear",
        color: "#cbd5e1",
        size: "35rpx",
        class: "data-v-722cdacb"
      }),
      N: common_vendor.o(closeTips, "2e")
    } : {}, {
      O: common_vendor.t(currentPrice.value),
      P: common_vendor.o(choosePayment, "d3"),
      Q: common_vendor.p({
        type: "primary",
        width: "300rpx",
        height: "110rpx",
        class: "btn data-v-722cdacb"
      }),
      R: `${_ctx.u_s_b_h}px`,
      S: `${_ctx.u_s_a_i_b}px`
    }) : {}, {
      T: common_vendor.o(handleConnectService, "c2"),
      U: common_vendor.p({
        class: "data-v-722cdacb"
      }),
      V: (_A = (_z = cardDetail.value) == null ? void 0 : _z.objectMap) == null ? void 0 : _A.serviceQrcode
    }, ((_C = (_B = cardDetail.value) == null ? void 0 : _B.objectMap) == null ? void 0 : _C.serviceQrcode) ? {
      W: (_E = (_D = cardDetail.value) == null ? void 0 : _D.objectMap) == null ? void 0 : _E.serviceQrcode
    } : {}, {
      X: phoneList.value
    }, phoneList.value ? {
      Y: common_vendor.f(phoneList.value, (phone, index, i0) => {
        return {
          a: common_vendor.t(phone),
          b: common_vendor.o(($event) => {
            return _ctx.callPhone(phone);
          }, index),
          c: "722cdacb-12-" + i0 + ",722cdacb-11",
          d: index
        };
      }),
      Z: common_vendor.p({
        type: "primary",
        icon: "phone-call",
        text: "拨打电话",
        shape: "round",
        size: "small",
        class: "data-v-722cdacb"
      })
    } : {}, {
      aa: common_vendor.o(($event) => {
        return showCustomService.value = $event;
      }, "40"),
      ab: common_vendor.p({
        position: "bottom",
        show: showCustomService.value,
        class: "data-v-722cdacb"
      })
    });
    return __returned__;
  };
} }));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
