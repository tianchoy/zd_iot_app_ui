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
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_progress + _easycom_rice_button + _easycom_rice_tabs + common_vendor.unref(Payment) + _easycom_rice_popup + _easycom_rice_icon + _easycom_customService + common_vendor.unref(tousu))();
}
const Payment = () => "../../components/payment.js";
const tousu = () => "../../components/tousu.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  inheritAttrs: false
}, { __name: "recharge", setup(__props) {
  const showTips = common_vendor.ref(true);
  const showCustomService = common_vendor.ref(false);
  const closeTips = () => {
    showTips.value = false;
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
  const defaultPkgId = common_vendor.ref("");
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
    const sortByPkgSort = (a, b) => {
      var _a, _b;
      const sortA = (_a = a.pkgSort) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
      const sortB = (_b = b.pkgSort) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER;
      return sortA - sortB;
    };
    packageList.value = packagesList.sort(sortByPkgSort);
    refillList.value = refillsList.sort(sortByPkgSort);
    setDefaultSelection();
  };
  const setDefaultSelection = () => {
    const packagesList = packageList.value;
    const refillsList = refillList.value;
    const defaultId = defaultPkgId.value;
    if (defaultId) {
      const pkgIndex = packagesList.findIndex((item) => {
        return item.pkgId === defaultId;
      });
      if (pkgIndex !== -1) {
        selectedPackageIndex.value = pkgIndex;
        active.value = 0;
        return null;
      }
      const refillIndex = refillsList.findIndex((item) => {
        return item.pkgId === defaultId;
      });
      if (refillIndex !== -1) {
        selectedRefillIndex.value = refillIndex;
        active.value = 1;
        return null;
      }
    }
    if (packagesList.length > 0) {
      selectedPackageIndex.value = 0;
      active.value = 0;
    } else if (refillsList.length > 0) {
      selectedRefillIndex.value = 0;
      active.value = 1;
    } else {
      selectedPackageIndex.value = 0;
      selectedRefillIndex.value = 0;
    }
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
  const orderNo = common_vendor.ref("");
  const payChannelId = common_vendor.ref("");
  const toPay = (data = null) => {
    if (!data)
      return null;
    const res = data;
    orderNo.value = res.orderNo;
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
          common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:412", "微信支付成功", res2);
          common_vendor.index.hideLoading();
          common_vendor.index.redirectTo({
            url: "/pages/paySuccess/paySuccess?orderId=" + orderNo.value + "&payChannelId=" + payChannelId.value
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
              url: "/pages/orderDetail/orderDetail?orderNo=" + orderNo.value
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
            common_vendor.index.hideLoading();
            common_vendor.index.redirectTo({
              url: "/pages/paySuccess/paySuccess?orderId=" + orderNo.value + "&payChannelId=" + payChannelId.value
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
                url: "/pages/orderDetail/orderDetail?orderNo=" + orderNo.value
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
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:486", "支付成功:", res2);
          },
          fail(res2 = null) {
            common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:489", "支付失败:", res2);
            common_vendor.index.hideLoading();
            isInPaymentProcess.value = false;
          }
        }));
      }
    }
  };
  const formContainer = common_vendor.ref(null);
  const handleAlipayForm = (formHtml) => {
    if (!formContainer.value)
      return null;
    formContainer.value.innerHTML = formHtml;
    const form = formContainer.value.querySelector("form");
    if (form) {
      form.submit();
    } else {
      common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:506", "未找到支付表单");
    }
  };
  const handleConfirmPayment = (e = null) => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:512", "确认支付:", e);
      common_vendor.index.showLoading(new common_vendor.UTSJSONObject({
        title: "支付中..."
      }));
      showPopup.value = false;
      const currentItem = active.value === 0 ? packageList.value[selectedPackageIndex.value] : refillList.value[selectedRefillIndex.value];
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:524", "currentItem:", currentItem, currentItem.pkgId);
      let params = new common_vendor.UTSJSONObject({});
      if (common_config.isWechat()) {
        params = new common_vendor.UTSJSONObject({
          pkgId: currentItem.pkgId,
          rechargeNo: cardNumber.value
        });
      }
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:542", "params:", params);
      try {
        const res = yield api_http.addOrder(params);
        if (res.code == 200) {
          common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:548", "添加订单成功:", res);
          if (common_config.isWechat()) {
            toPay(res.data);
          }
          if (common_config.isH5())
            ;
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: res.msg || "支付失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error.msg,
          icon: "none"
        });
      }
    });
  };
  const onPopupClose = () => {
    common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:579", "弹窗关闭");
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
        if (res.code == 200) {
          cardDetail.value = res.data;
          if (((_a = res.data) === null || _a === void 0 ? null : _a.pkgXcxVos) && res.data.pkgXcxVos.length > 0) {
            classifyPackages(res.data.pkgXcxVos);
          }
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:612", "获取卡片详情失败:", error);
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
  const handleConnectService = () => {
    var _a, _b;
    if ((_a = cardDetail.value) === null || _a === void 0 ? null : _a.objectMap.serviceJumpUrl) {
      window.open((_b = cardDetail.value) === null || _b === void 0 ? null : _b.objectMap.serviceJumpUrl, "_blank");
    } else {
      setTimeout(() => {
        showCustomService.value = true;
      }, 100);
    }
  };
  const checkToken = () => {
    const token = common_config.getToken();
    return !!token;
  };
  const platform = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      if (common_config.isWechat()) {
        if (!checkToken()) {
          yield getTenantInfos();
          yield getCode();
        } else {
          getCardDetail(cardNumber.value, country.value);
        }
      } else {
        getCardDetail(cardNumber.value, country.value);
      }
    });
  };
  const cardNumber = common_vendor.ref("");
  const country = common_vendor.ref("");
  common_vendor.onLoad((options) => {
    common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:666", "options:", options);
    const opt = options;
    const cardNumberValue = opt.rechargeNo;
    const countryValue = opt.country;
    opt.from;
    const pkgId = opt.pkgId;
    if (pkgId) {
      defaultPkgId.value = pkgId;
    }
    handleBack();
    if (cardNumberValue) {
      cardNumber.value = cardNumberValue;
      country.value = countryValue !== null && countryValue !== void 0 ? countryValue : "";
      platform();
    } else {
      common_vendor.index.__f__("error", "at pages/recharge/recharge.uvue:684", "未获取到卡片号码");
      common_vendor.index.showToast({
        title: "卡片号码不存在",
        icon: "none"
      });
    }
  });
  const wxGetPhoneLogin = common_vendor.ref("");
  const code = common_vendor.ref("");
  const userId = common_vendor.ref("");
  const userLoginByOpenid = (codes) => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:697", "recharge,,userLoginByOpenid:", codes);
      const res = yield api_http.login(new common_vendor.UTSJSONObject({
        xcxCode: codes,
        isLogin: "1"
      }));
      common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:702", "recharge,,userLoginByOpenid登录:", res);
      if (res.code == 200) {
        userId.value = "" + res.data.id;
        common_config.setStorageSync("userId", userId.value);
        common_vendor.index.navigateTo({
          url: "/pages/login/login?wxGetPhoneLogin=" + wxGetPhoneLogin.value + "&userId=" + userId.value + "&from=recharge&rechargeNo=" + cardNumber.value
        });
      }
    });
  };
  const getCode = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      common_vendor.index.login(new common_vendor.UTSJSONObject({
        success: (res) => {
          code.value = res.code;
          if (wxGetPhoneLogin.value == "1") {
            const params = new common_vendor.UTSJSONObject({
              isLogin: "1",
              xcxCode: code.value
            });
            api_http.login(params).then((res2) => {
              if (res2.code == 200) {
                common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:722", "登录成功:", res2.data.access_token);
                common_config.setToken(res2.data.access_token, res2.data.refreshToken);
                common_vendor.index.reLaunch({
                  url: "/pages/recharge/recharge?rechargeNo=" + cardNumber.value
                });
              }
            });
          } else {
            userLoginByOpenid(res.code);
          }
        }
      }));
    });
  };
  const getTenantInfos = () => {
    return common_vendor.__awaiter(this, void 0, void 0, function* () {
      const res = yield api_http.getTenantInfo(common_config.getTenantId(), false);
      if (res.code == 200) {
        const tenantInfo = res.data;
        wxGetPhoneLogin.value = "" + tenantInfo.wxGetPhoneLogin;
        common_config.setStorageSync("wxGetPhoneLogin", tenantInfo.wxGetPhoneLogin);
      }
    });
  };
  common_vendor.onShow(() => {
    let options = common_vendor.index.getEnterOptionsSync();
    common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:748", "options.scene:", options.scene);
    if (!isInPaymentProcess.value) {
      return null;
    }
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
                url: "/pages/paySuccess/paySuccess?orderId=" + orderNo.value + "&payChannelId=" + payChannelId.value
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
              url: "/pages/orderDetail/orderDetail?orderNo=" + orderNo.value
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
  const callPhone = (phone) => {
    common_vendor.index.makePhoneCall({
      phoneNumber: phone,
      success: () => {
        common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:821", "拨号界面弹出成功");
      },
      fail: (err) => {
        common_vendor.index.__f__("log", "at pages/recharge/recharge.uvue:824", "拨号失败:", err);
        common_vendor.index.showToast({
          title: "拨号失败，请重试",
          icon: "none"
        });
      }
    });
  };
  return (_ctx, _cache) => {
    "raw js";
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
    const __returned__ = common_vendor.e({
      a: common_vendor.o(goBack, "f3"),
      b: `${_ctx.u_s_b_h}px`,
      c: common_vendor.p({
        title: "充值首页",
        ["show-back"]: showBack.value,
        backgroundColor: "#f4f7fb",
        textColor: "#333",
        showCapsule: false,
        class: "data-v-722cdacb",
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }),
      d: common_vendor.p({
        text: ((_a = cardDetail.value) == null ? void 0 : _a.statusStr) || "未知",
        round: true,
        ["plain-fill"]: true,
        size: "small",
        type: getOrderStatusType((_b = cardDetail.value) == null ? void 0 : _b.statusStr),
        class: "data-v-722cdacb"
      }),
      e: (_c = cardDetail.value) == null ? void 0 : _c.rechargeNo
    }, ((_d = cardDetail.value) == null ? void 0 : _d.rechargeNo) ? {
      f: common_vendor.t(((_e = cardDetail.value) == null ? void 0 : _e.rechargeNo) || "未知")
    } : {}, {
      g: (_f = cardDetail.value) == null ? void 0 : _f.pkgName
    }, ((_g = cardDetail.value) == null ? void 0 : _g.pkgName) ? {
      h: common_vendor.t(((_h = cardDetail.value) == null ? void 0 : _h.pkgName) || "未知")
    } : {}, {
      i: (_i = cardDetail.value) == null ? void 0 : _i.effectiveTime
    }, ((_j = cardDetail.value) == null ? void 0 : _j.effectiveTime) ? {
      j: common_vendor.t((_k = cardDetail.value) == null ? void 0 : _k.effectiveTime)
    } : {}, {
      k: !((_l = cardDetail.value) == null ? void 0 : _l.expirationTime)
    }, !((_m = cardDetail.value) == null ? void 0 : _m.expirationTime) ? {
      l: common_vendor.t((_n = cardDetail.value) == null ? void 0 : _n.effectiveTime)
    } : {}, {
      m: (_o = cardDetail.value) == null ? void 0 : _o.pkgFlow
    }, ((_p = cardDetail.value) == null ? void 0 : _p.pkgFlow) ? {
      n: common_vendor.t(((_q = cardDetail.value) == null ? void 0 : _q.usedFlow) || 0),
      o: common_vendor.t(((_r = cardDetail.value) == null ? void 0 : _r.unUsedFlow) || 0),
      p: common_vendor.t(((_s = cardDetail.value) == null ? void 0 : _s.pkgFlow) || 0),
      q: common_vendor.p({
        percentage: percentage.value,
        ["show-text"]: true,
        class: "data-v-722cdacb"
      })
    } : {}, {
      r: common_vendor.o(toMyPackage, "c1"),
      s: common_vendor.p({
        class: "btn mr-24 data-v-722cdacb"
      }),
      t: common_vendor.o(toOrderRecord, "b5"),
      v: common_vendor.p({
        class: "btn data-v-722cdacb"
      }),
      w: common_vendor.o(changeTab, "53"),
      x: common_vendor.o(($event) => {
        return active.value = $event;
      }, "07"),
      y: common_vendor.p({
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
      z: active.value === 0
    }, active.value === 0 ? common_vendor.e({
      A: common_vendor.f(packageList.value, (item, index, i0) => {
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
      B: packageList.value.length == 0
    }, packageList.value.length == 0 ? {} : {}) : common_vendor.e({
      C: common_vendor.f(refillList.value, (item, index, i0) => {
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
      D: refillList.value.length == 0
    }, refillList.value.length == 0 ? {} : {}), {
      E: `${_ctx.u_s_b_h}px`,
      F: common_vendor.o(handleCancelPayment, "a5"),
      G: common_vendor.o(handleConfirmPayment, "30"),
      H: common_vendor.p({
        amount: currentPrice.value,
        cardNumber: (_t = cardDetail.value) == null ? void 0 : _t.rechargeNo,
        productName: (_u = currentPackage.value) == null ? void 0 : _u.pkgName,
        traffic: (_v = currentPackage.value) == null ? void 0 : _v.pkgFlow,
        validityPeriod: (_w = currentPackage.value) == null ? void 0 : _w.validityPeriod,
        pkgType: (_x = currentPackage.value) == null ? void 0 : _x.pkgType,
        payMethod: (_y = cardDetail.value) == null ? void 0 : _y.objectMap.payInfo,
        class: "data-v-722cdacb"
      }),
      I: common_vendor.o(onPopupClose, "7c"),
      J: `${_ctx.u_s_b_h}px`,
      K: common_vendor.o(($event) => {
        return showPopup.value = $event;
      }, "7d"),
      L: common_vendor.p({
        position: "bottom",
        show: showPopup.value,
        class: "data-v-722cdacb",
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }),
      M: packageList.value.length > 0 || refillList.value.length > 0
    }, packageList.value.length > 0 || refillList.value.length > 0 ? common_vendor.e({
      N: showTips.value && ((_A = (_z = cardDetail.value) == null ? void 0 : _z.objectMap) == null ? void 0 : _A.rechargeTip)
    }, showTips.value && ((_C = (_B = cardDetail.value) == null ? void 0 : _B.objectMap) == null ? void 0 : _C.rechargeTip) ? {
      O: common_vendor.t((_D = cardDetail.value) == null ? void 0 : _D.objectMap.rechargeTip),
      P: common_vendor.p({
        name: "clear",
        color: "#cbd5e1",
        size: "35rpx",
        class: "data-v-722cdacb"
      }),
      Q: common_vendor.o(closeTips, "1f")
    } : {}, {
      R: common_vendor.t(currentPrice.value),
      S: common_vendor.o(choosePayment, "33"),
      T: common_vendor.p({
        type: "primary",
        width: "300rpx",
        height: "110rpx",
        class: "btn data-v-722cdacb"
      }),
      U: `${_ctx.u_s_b_h}px`
    }) : {}, {
      V: common_vendor.sei("r0-722cdacb", "view", formContainer, {
        "k": "formContainer"
      }),
      W: `${_ctx.u_s_b_h}px`,
      X: common_vendor.o(handleConnectService, "c5"),
      Y: `${_ctx.u_s_b_h}px`,
      Z: common_vendor.p({
        class: "data-v-722cdacb",
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }),
      aa: common_vendor.o(_ctx.handleConnectTousu, "6a"),
      ab: `${_ctx.u_s_b_h}px`,
      ac: common_vendor.p({
        class: "data-v-722cdacb",
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      }),
      ad: (_F = (_E = cardDetail.value) == null ? void 0 : _E.objectMap) == null ? void 0 : _F.serviceQrcode
    }, ((_H = (_G = cardDetail.value) == null ? void 0 : _G.objectMap) == null ? void 0 : _H.serviceQrcode) ? {
      ae: (_J = (_I = cardDetail.value) == null ? void 0 : _I.objectMap) == null ? void 0 : _J.serviceQrcode
    } : {}, {
      af: phoneList.value
    }, phoneList.value ? {
      ag: common_vendor.f(phoneList.value, (phone, index, i0) => {
        return {
          a: common_vendor.t(phone),
          b: common_vendor.o(($event) => {
            return callPhone(phone);
          }, index),
          c: "722cdacb-13-" + i0 + ",722cdacb-12",
          d: index
        };
      }),
      ah: common_vendor.p({
        type: "primary",
        icon: "phone-call",
        text: "拨打电话",
        shape: "round",
        size: "small",
        class: "data-v-722cdacb"
      })
    } : {}, {
      ai: `${_ctx.u_s_b_h}px`,
      aj: common_vendor.o(($event) => {
        return showCustomService.value = $event;
      }, "f2"),
      ak: common_vendor.p({
        position: "bottom",
        show: showCustomService.value,
        class: "data-v-722cdacb",
        style: common_vendor.normalizeStyle({
          "--status-bar-height": `${_ctx.u_s_b_h}px`
        })
      })
    });
    return __returned__;
  };
} }));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-722cdacb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recharge/recharge.js.map
