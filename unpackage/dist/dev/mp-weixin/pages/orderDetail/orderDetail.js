"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + common_vendor.unref(Payment) + _easycom_rice_popup)();
}
const Payment = () => "../../components/payment.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const currentPrice = common_vendor.ref(0);
    const orderId = common_vendor.ref("");
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
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:164", "getOrderStatusText", status);
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
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:178", "getOrderStatusType", status);
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
          return "套餐包";
        case "2":
          return "加油包";
        default:
          return orderDetail.value.pkgCategory || "-";
      }
    };
    const getPkgFlowText = () => {
      const flow = orderDetail.value.pkgFlow;
      if (!flow && flow !== 0)
        return "-";
      orderDetail.value.pkgType;
      if (flow >= 1024) {
        return `${(flow / 1024).toFixed(2)}GB`;
      }
      return `${flow}MB`;
    };
    const getPaymentMethod = () => {
      return "微信小程序支付";
    };
    const getNoticeText = () => {
      const status = orderDetail.value.status;
      switch (status) {
        case "0":
          return "订单尚未支付，支付完成后套餐才会生效。";
        case "1":
          return "套餐已生效，可在有效期内使用。";
        case "2":
          return "订单已退款，金额将原路返回。";
        case "3":
          return "订单已取消。";
        default:
          return "";
      }
    };
    const formatDateTime = (dateTime) => {
      if (!dateTime)
        return "";
      if (dateTime.includes("T")) {
        return dateTime.replace("T", " ").substring(0, 19);
      }
      return dateTime;
    };
    const choosePayment = () => {
      currentPrice.value = orderDetail.value.payAmount || orderDetail.value.orderAmount || 0;
      showPopup.value = true;
    };
    const handleCancelPayment = () => {
      showPopup.value = false;
    };
    const toPay = (data = null) => {
      if (!data)
        return null;
      const res = data;
      orderId.value = res.id;
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
            common_vendor.index.showToast({
              title: "支付成功",
              icon: "success",
              duration: 3e3
            });
            common_vendor.index.navigateTo({
              url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value
            });
          },
          fail: (res2) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 3e3
            });
            return null;
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
              common_vendor.index.showToast({
                title: "支付成功",
                icon: "success",
                duration: 3e3,
                success() {
                  common_vendor.index.navigateTo({
                    url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value
                  });
                }
              });
            },
            fail: function(err) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "支付失败，请您重新支付",
                icon: "none",
                duration: 3e3
              });
              return null;
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
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:355", "支付成功:", res2);
              common_vendor.index.navigateTo({
                url: "/pages/paySuccess/paySuccess?orderId=" + orderId.value
              });
            },
            fail(res2 = null) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "支付取消，请您重新支付",
                icon: "none",
                duration: 3e3
              });
            }
          }));
        }
      }
    };
    const handleConfirmPayment = (e = null) => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:375", e);
        showPopup.value = false;
        try {
          const res = yield api_http.addOrderXcx(new common_vendor.UTSJSONObject({
            pkgId: orderDetail.value.pkgId,
            rechargeNo: orderDetail.value.rechargeNo
          }));
          if (res.code == 200) {
            toPay(res.data);
          } else {
            common_vendor.index.showToast({
              title: res.msg || "支付失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:391", "支付失败:", error);
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
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
        delta: 1
      }));
    };
    const getOrderDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!orderId.value)
          return Promise.resolve(null);
        try {
          const res = yield api_http.queryOrderDetailXcx(orderId.value);
          if (res.code == 200) {
            orderDetail.value = res.data;
            common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:418", "订单详情:", orderDetail.value);
          } else {
            common_vendor.index.showToast({
              title: res.msg || "查询订单详情失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:426", "查询订单详情失败:", error);
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad((options) => {
      const orderNo = options === null || options === void 0 ? null : options.orderNo;
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:436", orderNo);
      if (orderNo != null) {
        orderId.value = orderNo;
        getOrderDetail();
      }
    });
    common_vendor.onShow(() => {
      let options = common_vendor.index.getEnterOptionsSync();
      if (options.scene == "1038" && options.referrerInfo.appId == common_config.config.api.auth.appID) {
        let extraData = options.referrerInfo.extraData;
        if (!extraData) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "支付取消，请您重新支付",
            icon: "none",
            duration: 3e3
          });
          return null;
        } else {
          if (extraData.code == "success") {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付成功",
              icon: "success",
              duration: 3e3,
              success() {
                common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({
                  delta: 1
                }));
              }
            });
          } else if (extraData.code == "cancel") {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付取消，请您重新支付",
              icon: "none",
              duration: 3e3
            });
            return null;
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "支付失败，请您重新支付",
              icon: "none",
              duration: 3e3
            });
            return null;
          }
        }
      }
    });
    return (_ctx, _cache) => {
      "raw js";
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
        s: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).orderCreateTime))
      } : {}, {
        t: common_vendor.unref(orderDetail).payTime
      }, common_vendor.unref(orderDetail).payTime ? {
        v: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).payTime))
      } : {}, {
        w: common_vendor.unref(orderDetail).payFailReason
      }, common_vendor.unref(orderDetail).payFailReason ? {
        x: common_vendor.t(common_vendor.unref(orderDetail).payFailReason)
      } : {}, {
        y: common_vendor.unref(orderDetail).cancelTime
      }, common_vendor.unref(orderDetail).cancelTime ? {
        z: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).cancelTime))
      } : {}, {
        A: common_vendor.unref(orderDetail).pkgCategory
      }, common_vendor.unref(orderDetail).pkgCategory ? {
        B: common_vendor.t(getPkgCategoryText())
      } : {}, {
        C: common_vendor.unref(orderDetail).pkgFlow
      }, common_vendor.unref(orderDetail).pkgFlow ? {
        D: common_vendor.t(getPkgFlowText())
      } : {}, {
        E: common_vendor.unref(orderDetail).validityPeriod
      }, common_vendor.unref(orderDetail).validityPeriod ? {
        F: common_vendor.t(common_vendor.unref(orderDetail).validityPeriod)
      } : {}, {
        G: common_vendor.unref(orderDetail).startDate
      }, common_vendor.unref(orderDetail).startDate ? {
        H: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).startDate))
      } : {}, {
        I: common_vendor.unref(orderDetail).endDate
      }, common_vendor.unref(orderDetail).endDate ? {
        J: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).endDate))
      } : {}, {
        K: common_vendor.unref(orderDetail).usageInstructions || getNoticeText()
      }, common_vendor.unref(orderDetail).usageInstructions || getNoticeText() ? {
        L: common_vendor.t(common_vendor.unref(orderDetail).usageInstructions || getNoticeText())
      } : {}, {
        M: common_vendor.unref(orderDetail).status === "0"
      }, common_vendor.unref(orderDetail).status === "0" ? {
        N: common_vendor.t(common_vendor.unref(orderDetail).payAmount || common_vendor.unref(orderDetail).orderAmount || 0),
        O: common_vendor.o(choosePayment, "72")
      } : {}, {
        P: `${_ctx.u_s_b_h}px`,
        Q: `${_ctx.u_s_a_i_b}px`,
        R: common_vendor.o(handleCancelPayment, "ce"),
        S: common_vendor.o(handleConfirmPayment, "70"),
        T: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          cardNumber: common_vendor.unref(orderDetail).rechargeNo,
          [","]: true,
          productName: common_vendor.unref(orderDetail).pkgName,
          traffic: common_vendor.unref(orderDetail).pkgFlow,
          validityPeriod: common_vendor.unref(orderDetail).validityPeriod,
          class: "data-v-6ec85291"
        }),
        U: common_vendor.o(onPopupClose, "d7"),
        V: common_vendor.o(($event) => {
          return common_vendor.isRef(showPopup) ? showPopup.value = $event : null;
        }, "e0"),
        W: common_vendor.p({
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
