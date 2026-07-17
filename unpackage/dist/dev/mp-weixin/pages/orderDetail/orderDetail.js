"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_divider_1 = common_vendor.resolveComponent("rice-divider");
  const _easycom_rice_count_down_1 = common_vendor.resolveComponent("rice-count-down");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_divider_1 + _easycom_rice_count_down_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_divider = () => "../../uni_modules/rice-ui/components/rice-divider/rice-divider.js";
const _easycom_rice_count_down = () => "../../uni_modules/rice-ui/components/rice-count-down/rice-count-down.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_divider + _easycom_rice_count_down + common_vendor.unref(Payment) + _easycom_rice_popup)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const currentPrice = common_vendor.ref(0);
    const orderId = common_vendor.ref("");
    const payChannelId = common_vendor.ref("");
    const isFromPaySuccess = common_vendor.ref(false);
    const isInPaymentProcess = common_vendor.ref(false);
    const orderDetail = common_vendor.ref(new common_vendor.UTSJSONObject({
      orderNo: "",
      rechargeNo: "",
      pkgName: "",
      pkgCategory: "",
      pkgType: "",
      pkgFlow: 0,
      validityPeriod: "",
      startDate: "",
      endDate: "",
      status: "",
      pkgRefundStatus: "",
      orderAmount: 0,
      payAmount: 0,
      orderCreateTime: "",
      payTime: "",
      refunds: [],
      cancelTime: "",
      payFailTime: "",
      payFailReason: "",
      usageInstructions: "",
      currentSeconds: 0
    }));
    function d(key) {
      const val = orderDetail.value[key];
      return val;
    }
    function ds(key) {
      const val = orderDetail.value[key];
      return val != null ? val : "";
    }
    function getDisplayAmount() {
      const detail = orderDetail.value;
      const pay = detail["payAmount"];
      const order = detail["orderAmount"];
      return pay != null ? pay : order != null ? order : 0;
    }
    function getRefunds() {
      const detail = orderDetail.value;
      const list = detail["refunds"];
      return list != null ? list : [];
    }
    function getRefundValue(item = null, key) {
      const val = item[key];
      return val != null ? val : "";
    }
    function getCurrentSeconds() {
      const detail = orderDetail.value;
      const sec = detail["currentSeconds"];
      return sec != null ? sec : 0;
    }
    const getOrderStatusText = (status) => {
      var _a, _b;
      const statusMap = /* @__PURE__ */ new Map();
      statusMap.set("0", "待支付");
      statusMap.set("1", "已完成");
      statusMap.set("2", "已取消");
      statusMap.set("3", "支付失败");
      statusMap.set("4", "部分退款");
      statusMap.set("5", "全部退款");
      return (_b = (_a = common_vendor.UTS.mapGet(statusMap, status)) !== null && _a !== void 0 ? _a : status) !== null && _b !== void 0 ? _b : "未知";
    };
    const getOrderStatusType = (status) => {
      var _a;
      const typeMap = /* @__PURE__ */ new Map();
      typeMap.set("0", "success");
      typeMap.set("1", "primary");
      typeMap.set("2", "warning");
      typeMap.set("3", "error");
      typeMap.set("4", "error");
      typeMap.set("5", "error");
      return (_a = common_vendor.UTS.mapGet(typeMap, status)) !== null && _a !== void 0 ? _a : "primary";
    };
    const getPkgCategoryText = () => {
      const detail = orderDetail.value;
      const category = detail["pkgCategory"];
      switch (category) {
        case "1":
          return "测试套餐";
        case "2":
          return "管理套餐";
        case "3":
          return "正式套餐";
        case "4":
          return "叠加包";
        default:
          return category || "-";
      }
    };
    const choosePayment = () => {
      const detail = orderDetail.value;
      const payAmount = detail["payAmount"];
      const orderAmount = detail["orderAmount"];
      currentPrice.value = payAmount != null ? payAmount : orderAmount != null ? orderAmount : 0;
      showPopup.value = true;
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!orderId.value) {
          common_vendor.index.showToast({
            title: "订单号不能为空",
            icon: "none"
          });
          return Promise.resolve(null);
        }
        try {
          const res = yield api_http.queryOrderDetail(orderId.value);
          if (res.code == 200) {
            orderDetail.value = res.data;
          } else {
            common_vendor.index.showToast({
              title: res.msg || "查询订单详情失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:278", "查询订单详情失败:", error);
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    const handleCountDownFinish = () => {
      common_vendor.index.showToast({
        title: "支付已过期，请重新下单",
        icon: "none",
        duration: 1e3
      });
      getOrderDetail();
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const orderNos = common_vendor.ref("");
    const toPay = (data) => {
      if (!data)
        return null;
      orderNos.value = data["orderNo"];
      payChannelId.value = data["payChannelId"];
      isInPaymentProcess.value = true;
      const payWxType = data["payWxType"];
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:311", "支付成功页面orderNos.value:", orderNos.value, "payChannelId.value:", payChannelId.value);
      if (payWxType == "wechat_pay") {
        common_vendor.index.requestPayment({
          provider: "wxpay",
          timeStamp: data["timeStamp"],
          nonceStr: data["nonceStr"],
          package: data["package"],
          paySign: data["paySign"],
          signType: data["signType"],
          success: (res) => {
            common_vendor.index.hideLoading();
            common_vendor.index.redirectTo({
              url: "/pages/paySuccess/paySuccess?orderId=" + orderNos.value + "&payChannelId=" + payChannelId.value
            });
          },
          fail: (res) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 1e3
            });
            isInPaymentProcess.value = false;
          }
        });
      } else if (payWxType == "allin_pay") {
        const payWxClass = data["payWxClass"];
        if (payWxClass == "0") {
          common_vendor.index.requestPayment({
            timeStamp: data["timeStamp"],
            nonceStr: data["nonceStr"],
            package: data["package"],
            paySign: data["paySign"],
            signType: data["signType"],
            success: function(res) {
              common_vendor.index.hideLoading();
              common_vendor.index.redirectTo({
                url: "/pages/paySuccess/paySuccess?orderId=" + orderNos.value + "&payChannelId=" + payChannelId.value
              });
            },
            fail: function(err2) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "支付失败，请您重新支付",
                icon: "none",
                duration: 1e3
              });
              isInPaymentProcess.value = false;
            }
          });
        } else {
          let param = new common_vendor.UTSJSONObject({
            cusid: data["cusid"],
            appid: data["appid"],
            orgid: data["orgid"],
            version: data["version"],
            trxamt: data["trxamt"],
            reqsn: data["reqsn"],
            notify_url: data["notify_url"],
            body: data["body"],
            remark: data["remark"],
            randomstr: data["randomstr"],
            paytype: data["paytype"],
            signtype: data["signtype"],
            sign: data["sign"]
          });
          common_vendor.index.navigateToMiniProgram(new common_vendor.UTSJSONObject({
            appId: common_config.config.api.auth.appID,
            extraData: param,
            success(res = null) {
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:385", "打开支付小程序成功:", res);
            },
            fail(res = null) {
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:388", "打开支付小程序失败:", res);
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
        common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:405", "未找到支付表单");
      }
    };
    const handleConfirmPayment = (e) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:411", "11111", e);
        showPopup.value = false;
        try {
          const res = yield api_http.goPayXcx(orderId.value, e);
          if (res.code == 200) {
            common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:416", "支付成功:", res.data);
            if (common_config.isWechat()) {
              toPay(res.data);
            }
            if (common_config.isH5())
              ;
          } else {
            common_vendor.index.showToast({
              title: res.msg || "支付失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:436", "支付失败:", error);
          common_vendor.index.showToast({
            title: err.msg,
            icon: "none"
          });
        }
      });
    };
    const onPopupClose = () => {
      showPopup.value = false;
    };
    const handleBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
      } else {
        if (common_config.isWechat()) {
          common_vendor.index.reLaunch({
            url: "/pages/card/card"
          });
        }
      }
    };
    const wxGetPhoneLogin = common_vendor.ref("");
    const code = common_vendor.ref("");
    const userId = common_vendor.ref("");
    const userLoginByOpenid = (codes) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        const res = yield api_http.login(new common_vendor.UTSJSONObject({
          xcxCode: codes,
          isLogin: "1"
        }));
        common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:478", "userLoginByOpenid登录成功:", res);
        if (res.code == 200) {
          userId.value = "" + res.data.id;
          common_config.setStorageSync("userId", userId.value);
          common_vendor.index.navigateTo({
            url: "/pages/login/login?wxGetPhoneLogin=" + wxGetPhoneLogin.value + "&userId=" + userId.value + "&from=orderDetail"
          });
        }
      });
    };
    const getCode = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        common_vendor.index.login(new common_vendor.UTSJSONObject({
          success: (res) => {
            code.value = res.code;
            common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:492", "wxGetPhoneLogin:", wxGetPhoneLogin.value);
            if (wxGetPhoneLogin.value == "1") {
              const params = new common_vendor.UTSJSONObject({
                isLogin: "1",
                xcxCode: code.value
              });
              api_http.login(params).then((res2) => {
                if (res2.code == 200) {
                  common_config.setToken(res2.data.access_token, res2.data.refreshToken);
                  common_vendor.index.reLaunch({
                    url: "/pages/orderDetail/orderDetail?orderNo=" + orderId.value
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
    const checkToken = () => {
      const token = common_config.getToken();
      return !!token;
    };
    const platform = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (common_config.isWechat()) {
          if (!checkToken()) {
            yield getTenantInfos();
            const loginSuccess = yield getCode();
            if (!loginSuccess) {
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:535", "登录失败，跳过数据加载");
              common_vendor.index.showToast({
                title: "登录失败，请重试",
                icon: "none"
              });
              return Promise.resolve(null);
            }
          } else {
            getOrderDetail();
          }
        } else {
          getOrderDetail();
        }
      });
    };
    common_vendor.onLoad((options) => {
      const orderNo = options === null || options === void 0 ? null : options.orderNo;
      if (orderNo != null) {
        orderId.value = orderNo;
        common_config.setStorageSync("orderId", orderNo);
        if ((options === null || options === void 0 ? null : options.from) === "paySuccess") {
          isFromPaySuccess.value = true;
        }
        platform();
      }
    });
    common_vendor.onShow(() => {
      if (isFromPaySuccess.value) {
        isFromPaySuccess.value = false;
        return null;
      }
      if (!isInPaymentProcess.value) {
        return null;
      }
      let options = common_vendor.index.getEnterOptionsSync();
      if (options.scene == 1011 || options.scene == 1012 || options.scene == 1013 || options.scene == 1037 || options.scene == 1038 || options.scene == 1065) {
        platform();
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
                  url: "/pages/paySuccess/paySuccess?orderId=" + orderNos.value + "&payChannelId=" + payChannelId.value
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
            isInPaymentProcess.value = false;
            return null;
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 1e3
            });
            return null;
          }
        }
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(handleBack, "c1"),
        b: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-6ec85291"
        }),
        c: d("pkgName")
      }, d("pkgName") ? {
        d: common_vendor.t(d("pkgName")),
        e: common_vendor.p({
          type: getOrderStatusType(ds("status")),
          text: getOrderStatusText(ds("status")),
          round: true,
          ["plain-fill"]: true,
          size: "small",
          class: "data-v-6ec85291"
        })
      } : {}, {
        f: d("rechargeNo")
      }, d("rechargeNo") ? {
        g: common_vendor.t(d("rechargeNo"))
      } : {}, {
        h: d("orderNo")
      }, d("orderNo") ? {
        i: common_vendor.t(d("orderNo"))
      } : {}, {
        j: d("iccid")
      }, d("iccid") ? {
        k: common_vendor.t(d("iccid"))
      } : {}, {
        l: d("orderAmount")
      }, d("orderAmount") ? {
        m: common_vendor.t(getDisplayAmount())
      } : {}, {
        n: d("orderStatus")
      }, d("orderStatus") ? {
        o: common_vendor.t(getOrderStatusText(ds("status")))
      } : {}, {
        p: d("orderCreateTime")
      }, d("orderCreateTime") ? {
        q: common_vendor.t(d("orderCreateTime"))
      } : {}, {
        r: d("payTime")
      }, d("payTime") ? {
        s: common_vendor.t(d("payTime"))
      } : {}, {
        t: d("payFailReason")
      }, d("payFailReason") ? {
        v: common_vendor.t(d("payFailReason"))
      } : {}, {
        w: d("cancelTime")
      }, d("cancelTime") ? {
        x: common_vendor.t(d("cancelTime"))
      } : {}, {
        y: common_vendor.p({
          class: "data-v-6ec85291"
        }),
        z: d("pkgCategory")
      }, d("pkgCategory") ? {
        A: common_vendor.t(getPkgCategoryText())
      } : {}, {
        B: d("pkgFlow")
      }, d("pkgFlow") ? {
        C: common_vendor.t(d("pkgFlow"))
      } : {}, {
        D: d("validityPeriod")
      }, d("validityPeriod") ? {
        E: common_vendor.t(d("validityPeriod")),
        F: common_vendor.t(d("pkgType") == "1" ? "天" : "个月")
      } : {}, {
        G: d("startDate")
      }, d("startDate") ? {
        H: common_vendor.t(d("startDate"))
      } : {}, {
        I: d("endDate")
      }, d("endDate") ? {
        J: common_vendor.t(d("endDate"))
      } : {}, {
        K: getRefunds().length > 0
      }, getRefunds().length > 0 ? {
        L: common_vendor.p({
          dashed: true,
          customStyle: {
            margin: "0"
          },
          class: "data-v-6ec85291"
        })
      } : {}, {
        M: getRefunds().length > 0
      }, getRefunds().length > 0 ? {
        N: common_vendor.f(getRefunds(), (item, index, i0) => {
          return {
            a: common_vendor.t(getRefundValue(item, "refundTime")),
            b: common_vendor.t(getRefundValue(item, "refundAmount")),
            c: index
          };
        })
      } : {}, {
        O: d("status") === "0"
      }, d("status") === "0" ? {
        P: common_vendor.t(getDisplayAmount()),
        Q: common_vendor.o(handleCountDownFinish, "fb"),
        R: common_vendor.p({
          time: getCurrentSeconds() * 1e3,
          ["font-size"]: "28rpx",
          color: "#f56c6c",
          class: "data-v-6ec85291"
        }),
        S: common_vendor.o(choosePayment, "e2")
      } : {}, {
        T: `${_ctx.u_s_b_h}px`,
        U: common_vendor.sei("r0-6ec85291", "view", formContainer, {
          "k": "formContainer"
        }),
        V: `${_ctx.u_s_b_h}px`,
        W: common_vendor.o(handleCancelPayment, "e5"),
        X: common_vendor.o(handleConfirmPayment, "fc"),
        Y: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          cardNumber: ds("rechargeNo"),
          productName: ds("pkgName"),
          traffic: ds("pkgFlow"),
          validityPeriod: ds("validityPeriod"),
          pkgType: ds("pkgType"),
          payMethod: d("payInfo"),
          class: "data-v-6ec85291"
        }),
        Z: common_vendor.o(onPopupClose, "8c"),
        aa: `${_ctx.u_s_b_h}px`,
        ab: common_vendor.o(($event) => {
          return common_vendor.isRef(showPopup) ? showPopup.value = $event : null;
        }, "2a"),
        ac: common_vendor.p({
          position: "bottom",
          show: common_vendor.unref(showPopup),
          class: "data-v-6ec85291",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ec85291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderDetail/orderDetail.js.map
