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
    const getOrderStatusText = (status) => {
      const statusMap = {
        "0": "待支付",
        "1": "已完成",
        "2": "已取消",
        "3": "支付失败",
        "4": "部分退款",
        "5": "全部退款"
      };
      return statusMap[status] || status || "未知";
    };
    const getOrderStatusType = (status) => {
      const typeMap = {
        "0": "primary",
        "1": "success",
        "2": "error",
        "3": "danger",
        "4": "warning",
        "5": "warning"
      };
      return typeMap[status] || "primary";
    };
    const getPkgCategoryText = () => {
      const category = orderDetail.value.pkgCategory;
      switch (category) {
        case "1":
          return "日包";
        case "2":
          return "非自然月包";
        case "3":
          return "自然月包";
        default:
          return orderDetail.value.pkgCategory || "-";
      }
    };
    const getPaymentMethod = () => {
      return "微信小程序支付";
    };
    const choosePayment = () => {
      currentPrice.value = orderDetail.value.payAmount || orderDetail.value.orderAmount || 0;
      showPopup.value = true;
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
            common_vendor.index.hideLoading();
            common_vendor.index.redirectTo({
              url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value
            });
          },
          fail: (res2) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 1e3
            });
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
                url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value
              });
            },
            fail: function(err) {
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
          common_vendor.index.navigateToMiniProgram(new common_vendor.UTSJSONObject({
            appId: common_config.config.api.auth.appID,
            extraData: param,
            success(res2 = null) {
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:344", "打开支付小程序成功:", res2);
            },
            fail(res2 = null) {
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:347", "打开支付小程序失败:", res2);
              common_vendor.index.hideLoading();
              isInPaymentProcess.value = false;
            }
          }));
        }
      }
    };
    const handleConfirmPayment = (e = null) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        showPopup.value = false;
        try {
          const res = yield api_http.goPayXcx(orderId.value);
          if (res.code == 200) {
            toPay(res.data);
          } else {
            common_vendor.index.showToast({
              title: res.msg || "支付失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:371", "支付失败:", error);
          common_vendor.index.showToast({
            title: "支付失败，请稍后重试",
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
        common_vendor.index.reLaunch({
          url: "/pages/card/card"
        });
      }
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!orderId.value)
          return Promise.resolve(null);
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
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:410", "查询订单详情失败:", error);
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad((options) => {
      const orderNo = options === null || options === void 0 ? null : options.orderNo;
      if (orderNo != null) {
        orderId.value = orderNo;
        if ((options === null || options === void 0 ? null : options.from) === "paySuccess") {
          isFromPaySuccess.value = true;
        }
        getOrderDetail();
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
      var _a;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(handleBack, "d6"),
        b: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-6ec85291"
        }),
        c: common_vendor.unref(orderDetail).pkgName
      }, common_vendor.unref(orderDetail).pkgName ? {
        d: common_vendor.t(common_vendor.unref(orderDetail).pkgName),
        e: common_vendor.p({
          type: getOrderStatusType(common_vendor.unref(orderDetail).status),
          text: getOrderStatusText(common_vendor.unref(orderDetail).status),
          round: true,
          ["plain-fill"]: true,
          size: "small",
          class: "data-v-6ec85291"
        })
      } : {}, {
        f: common_vendor.unref(orderDetail).rechargeNo
      }, common_vendor.unref(orderDetail).rechargeNo ? {
        g: common_vendor.t(common_vendor.unref(orderDetail).rechargeNo)
      } : {}, {
        h: common_vendor.unref(orderDetail).orderNo
      }, common_vendor.unref(orderDetail).orderNo ? {
        i: common_vendor.t(common_vendor.unref(orderDetail).orderNo)
      } : {}, {
        j: common_vendor.unref(orderDetail).iccid
      }, common_vendor.unref(orderDetail).iccid ? {
        k: common_vendor.t(common_vendor.unref(orderDetail).iccid)
      } : {}, {
        l: common_vendor.unref(orderDetail).orderAmount
      }, common_vendor.unref(orderDetail).orderAmount ? {
        m: common_vendor.t(common_vendor.unref(orderDetail).payAmount || common_vendor.unref(orderDetail).orderAmount || 0)
      } : {}, {
        n: common_vendor.unref(orderDetail).orderStatus
      }, common_vendor.unref(orderDetail).orderStatus ? {
        o: common_vendor.t(getOrderStatusText(common_vendor.unref(orderDetail).status))
      } : {}, {
        p: common_vendor.unref(orderDetail).payMethod
      }, common_vendor.unref(orderDetail).payMethod ? {
        q: common_vendor.t(getPaymentMethod())
      } : {}, {
        r: common_vendor.unref(orderDetail).orderCreateTime
      }, common_vendor.unref(orderDetail).orderCreateTime ? {
        s: common_vendor.t(common_vendor.unref(orderDetail).orderCreateTime)
      } : {}, {
        t: common_vendor.unref(orderDetail).payTime
      }, common_vendor.unref(orderDetail).payTime ? {
        v: common_vendor.t(common_vendor.unref(orderDetail).payTime)
      } : {}, {
        w: common_vendor.unref(orderDetail).payFailReason
      }, common_vendor.unref(orderDetail).payFailReason ? {
        x: common_vendor.t(common_vendor.unref(orderDetail).payFailReason)
      } : {}, {
        y: common_vendor.unref(orderDetail).cancelTime
      }, common_vendor.unref(orderDetail).cancelTime ? {
        z: common_vendor.t(common_vendor.unref(orderDetail).cancelTime)
      } : {}, {
        A: common_vendor.p({
          class: "data-v-6ec85291"
        }),
        B: common_vendor.unref(orderDetail).pkgCategory
      }, common_vendor.unref(orderDetail).pkgCategory ? {
        C: common_vendor.t(getPkgCategoryText())
      } : {}, {
        D: common_vendor.unref(orderDetail).pkgFlow
      }, common_vendor.unref(orderDetail).pkgFlow ? {
        E: common_vendor.t(common_vendor.unref(orderDetail).pkgFlow)
      } : {}, {
        F: common_vendor.unref(orderDetail).validityPeriod
      }, common_vendor.unref(orderDetail).validityPeriod ? {
        G: common_vendor.t(common_vendor.unref(orderDetail).validityPeriod),
        H: common_vendor.t(((_a = common_vendor.unref(orderDetail)) == null ? void 0 : _a.pkgType) == "1" ? "天" : "个月")
      } : {}, {
        I: common_vendor.unref(orderDetail).startDate
      }, common_vendor.unref(orderDetail).startDate ? {
        J: common_vendor.t(common_vendor.unref(orderDetail).startDate)
      } : {}, {
        K: common_vendor.unref(orderDetail).endDate
      }, common_vendor.unref(orderDetail).endDate ? {
        L: common_vendor.t(common_vendor.unref(orderDetail).endDate)
      } : {}, {
        M: common_vendor.unref(orderDetail).refunds && common_vendor.unref(orderDetail).refunds.length > 0
      }, common_vendor.unref(orderDetail).refunds && common_vendor.unref(orderDetail).refunds.length > 0 ? {
        N: common_vendor.p({
          dashed: true,
          customStyle: {
            margin: "0"
          },
          class: "data-v-6ec85291"
        })
      } : {}, {
        O: common_vendor.unref(orderDetail).refunds && common_vendor.unref(orderDetail).refunds.length > 0
      }, common_vendor.unref(orderDetail).refunds && common_vendor.unref(orderDetail).refunds.length > 0 ? {
        P: common_vendor.f(common_vendor.unref(orderDetail).refunds, (item, index, i0) => {
          return {
            a: common_vendor.t(item.refundTime),
            b: common_vendor.t(item.refundAmount || 0),
            c: index
          };
        })
      } : {}, {
        Q: common_vendor.unref(orderDetail).status === "0"
      }, common_vendor.unref(orderDetail).status === "0" ? {
        R: common_vendor.t(common_vendor.unref(orderDetail).payAmount || common_vendor.unref(orderDetail).orderAmount || 0),
        S: common_vendor.o(handleCountDownFinish, "61"),
        T: common_vendor.p({
          time: common_vendor.unref(orderDetail).currentSeconds * 1e3 || 0,
          ["font-size"]: "28rpx",
          color: "#f56c6c",
          class: "data-v-6ec85291"
        }),
        U: common_vendor.o(choosePayment, "45")
      } : {}, {
        V: `${_ctx.u_s_b_h}px`,
        W: `${_ctx.u_s_a_i_b}px`,
        X: common_vendor.o(handleCancelPayment, "0a"),
        Y: common_vendor.o(handleConfirmPayment, "dd"),
        Z: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          cardNumber: common_vendor.unref(orderDetail).rechargeNo,
          [","]: true,
          productName: common_vendor.unref(orderDetail).pkgName,
          traffic: common_vendor.unref(orderDetail).pkgFlow,
          validityPeriod: common_vendor.unref(orderDetail).validityPeriod,
          pkgType: common_vendor.unref(orderDetail).pkgType,
          class: "data-v-6ec85291"
        }),
        aa: common_vendor.o(onPopupClose, "99"),
        ab: common_vendor.o(($event) => {
          return common_vendor.isRef(showPopup) ? showPopup.value = $event : null;
        }, "ea"),
        ac: common_vendor.p({
          position: "bottom",
          show: common_vendor.unref(showPopup),
          class: "data-v-6ec85291"
        })
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ec85291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderDetail/orderDetail.js.map
