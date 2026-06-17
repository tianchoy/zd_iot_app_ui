"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const common_config = require("../../common/config.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + common_vendor.unref(Payment) + _easycom_rice_popup)();
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
    const getOrderStatusText = () => {
      const status = orderDetail.value.status;
      switch (status) {
        case "0":
          return "待支付";
        case "1":
          return "已完成";
        case "2":
          return "已退款";
        case "3":
          return "已取消";
        default:
          return "未知状态";
      }
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "已完成":
          return "status-completed";
        case "待支付":
          return "status-pending";
        case "已退款":
          return "status-refunded";
        case "已取消":
          return "status-cancelled";
        default:
          return "";
      }
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
      orderId.value = res.id;
      const res = data;
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
          common_vendor.wx$1.requestPayment(new common_vendor.UTSJSONObject({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            paySign: res.paySign,
            signType: res.signType,
            success: function(res2 = null) {
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
            fail: function(err = null) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "支付失败，请您重新支付",
                icon: "none",
                duration: 3e3
              });
              return null;
            }
          }));
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
              common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:350", "支付成功:", res2);
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
        common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:370", e);
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
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:386", "支付失败:", error);
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
            common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:413", "订单详情:", orderDetail.value);
          } else {
            common_vendor.index.showToast({
              title: res.msg || "查询订单详情失败",
              icon: "none"
            });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/orderDetail/orderDetail.uvue:421", "查询订单详情失败:", error);
          common_vendor.index.showToast({
            title: "网络错误，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad((options) => {
      const orderNo = options === null || options === void 0 ? null : options.orderNo;
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:431", orderNo);
      if (orderNo != null) {
        orderId.value = orderNo;
        getOrderDetail();
      }
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:439", "onShow");
      common_vendor.index.__f__("log", "at pages/orderDetail/orderDetail.uvue:440", "config.api.auth.appID:", common_config.config.api.auth.appID);
      let options = common_vendor.wx$1.getEnterOptionsSync();
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
        a: common_vendor.o(handleBack, "d9"),
        b: common_vendor.p({
          title: "订单详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-6ec85291"
        }),
        c: common_vendor.t(common_vendor.unref(orderDetail).pkgName || "-"),
        d: common_vendor.t(getOrderStatusText()),
        e: common_vendor.n(getStatusClass(getOrderStatusText())),
        f: common_vendor.t(common_vendor.unref(orderDetail).rechargeNo || "-"),
        g: common_vendor.t(common_vendor.unref(orderDetail).orderNo || "-"),
        h: common_vendor.t(common_vendor.unref(orderDetail).iccid || "-"),
        i: common_vendor.t(common_vendor.unref(orderDetail).payAmount || common_vendor.unref(orderDetail).orderAmount || 0),
        j: common_vendor.t(getOrderStatusText()),
        k: common_vendor.t(getPaymentMethod()),
        l: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).orderCreateTime)),
        m: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).payTime) || "--"),
        n: common_vendor.unref(orderDetail).payFailReason
      }, common_vendor.unref(orderDetail).payFailReason ? {
        o: common_vendor.t(common_vendor.unref(orderDetail).payFailReason)
      } : {}, {
        p: common_vendor.unref(orderDetail).cancelTime
      }, common_vendor.unref(orderDetail).cancelTime ? {
        q: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).cancelTime))
      } : {}, {
        r: common_vendor.t(getPkgCategoryText()),
        s: common_vendor.t(getPkgFlowText()),
        t: common_vendor.t(common_vendor.unref(orderDetail).validityPeriod || "-"),
        v: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).startDate) || "--"),
        w: common_vendor.t(formatDateTime(common_vendor.unref(orderDetail).endDate) || "--"),
        x: common_vendor.unref(orderDetail).usageInstructions || getNoticeText()
      }, common_vendor.unref(orderDetail).usageInstructions || getNoticeText() ? {
        y: common_vendor.t(common_vendor.unref(orderDetail).usageInstructions || getNoticeText())
      } : {}, {
        z: common_vendor.unref(orderDetail).status === "0"
      }, common_vendor.unref(orderDetail).status === "0" ? {
        A: common_vendor.t(common_vendor.unref(orderDetail).payAmount || common_vendor.unref(orderDetail).orderAmount || 0),
        B: common_vendor.o(choosePayment, "fc")
      } : {}, {
        C: `${_ctx.u_s_b_h}px`,
        D: `${_ctx.u_s_a_i_b}px`,
        E: common_vendor.o(handleCancelPayment, "52"),
        F: common_vendor.o(handleConfirmPayment, "a9"),
        G: common_vendor.p({
          amount: common_vendor.unref(currentPrice),
          class: "data-v-6ec85291"
        }),
        H: common_vendor.o(onPopupClose, "18"),
        I: common_vendor.o(($event) => {
          return common_vendor.isRef(showPopup) ? showPopup.value = $event : null;
        }, "00"),
        J: common_vendor.p({
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
