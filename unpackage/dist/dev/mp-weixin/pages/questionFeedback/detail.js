"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const api_url = require("../../api/url.js");
const api_Request = require("../../api/Request.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  const _easycom_rice_popup_1 = common_vendor.resolveComponent("rice-popup");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1 + _easycom_rice_button_1 + _easycom_rice_popup_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
const _easycom_rice_popup = () => "../../uni_modules/rice-ui/components/rice-popup/rice-popup.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag + _easycom_rice_button + _easycom_rice_popup)();
}
class FeedbackDetail extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          status: { type: String, optional: false },
          createTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          feedbackContentList: { type: common_vendor.UTS.UTSType.withGenerics(Array, [FeedbackMessageItem]), optional: false },
          rechargeNo: { type: String, optional: false },
          cardNo: { type: String, optional: true },
          iccid: { type: String, optional: true },
          orderNo: { type: String, optional: true },
          packageName: { type: String, optional: true }
        };
      },
      name: "FeedbackDetail"
    };
  }
  constructor(options, metadata = FeedbackDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.status = this.__props__.status;
    this.createTime = this.__props__.createTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.feedbackContentList = this.__props__.feedbackContentList;
    this.rechargeNo = this.__props__.rechargeNo;
    this.cardNo = this.__props__.cardNo;
    this.iccid = this.__props__.iccid;
    this.orderNo = this.__props__.orderNo;
    this.packageName = this.__props__.packageName;
    delete this.__props__;
  }
}
class FeedbackMessageItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sendType: { type: String, optional: false },
          time: { type: String, optional: false },
          replyContent: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false }
        };
      },
      name: "FeedbackMessageItem"
    };
  }
  constructor(options, metadata = FeedbackMessageItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sendType = this.__props__.sendType;
    this.time = this.__props__.time;
    this.replyContent = this.__props__.replyContent;
    this.imgOssUrl = this.__props__.imgOssUrl;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const feedbackId = common_vendor.ref("");
    const feedbackData = common_vendor.ref(new FeedbackDetail({
      id: 0,
      feedbackNo: "",
      feedbackType: "",
      status: "",
      createTime: "",
      userPhone: "",
      imgOssUrl: "",
      feedbackContentList: [],
      rechargeNo: "",
      cardNo: "",
      iccid: "",
      orderNo: "",
      packageName: ""
    }));
    const showReplyPopup = common_vendor.ref(false);
    const replyContent = common_vendor.ref("");
    const replyImages = common_vendor.ref([]);
    const replyLoading = common_vendor.ref(false);
    const getStatusType = (status) => {
      var _a;
      const typeMap = /* @__PURE__ */ new Map();
      typeMap.set("0", "warning");
      typeMap.set("1", "primary");
      typeMap.set("2", "success");
      typeMap.set("3", "default");
      return (_a = common_vendor.UTS.mapGet(typeMap, status)) !== null && _a !== void 0 ? _a : "default";
    };
    const getStatusText = (status) => {
      var _a;
      const textMap = /* @__PURE__ */ new Map();
      textMap.set("0", "待处理");
      textMap.set("1", "处理中");
      textMap.set("2", "已回复");
      textMap.set("3", "已关闭");
      return (_a = common_vendor.UTS.mapGet(textMap, status)) !== null && _a !== void 0 ? _a : status;
    };
    const loadDetail = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
          const res = yield api_http.getFeedbackDetail(feedbackId.value, false);
          if (res.code == 200) {
            const data = res.data;
            if (data != null) {
              feedbackData.value = data;
            }
          } else {
            common_vendor.index.showToast({ title: (_a = res.msg) !== null && _a !== void 0 ? _a : "查询失败", icon: "none" });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/questionFeedback/detail.uvue:184", "查询详情异常:", error);
        }
      });
    };
    const getImageUrls = (urls) => {
      return urls.split(",").map((url) => {
        return url.trim();
      }).filter((url) => {
        return url.length > 0;
      });
    };
    const previewImage = (current, urls) => {
      common_vendor.index.previewImage({
        current,
        urls: getImageUrls(urls)
      });
    };
    const handleShowReply = () => {
      replyContent.value = "";
      replyImages.value = [];
      showReplyPopup.value = true;
    };
    const chooseReplyImage = () => {
      const maxCount = 5 - replyImages.value.length;
      common_vendor.index.chooseImage(new common_vendor.UTSJSONObject({
        count: maxCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths != null) {
            for (let i = 0; i < tempFilePaths.length; i++) {
              replyImages.value.push(tempFilePaths[i]);
            }
          }
        }
      }));
    };
    const previewReplyImage = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: replyImages.value
      });
    };
    const removeReplyImage = (index) => {
      replyImages.value.splice(index, 1);
    };
    const handleReply = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const content = replyContent.value.trim();
        if (!content) {
          common_vendor.index.showToast({ title: "请输入反馈内容", icon: "none" });
          return Promise.resolve(null);
        }
        replyLoading.value = true;
        try {
          const uploadedIds = [];
          for (let i = 0; i < replyImages.value.length; i++) {
            const uploadResult = yield api_Request.http.upload(new common_vendor.UTSJSONObject({
              url: api_url.ApiUrl.feedbackUploadImage,
              filePath: replyImages.value[i],
              name: "image",
              withToken: false,
              showLoading: false
            }));
            const ossId = uploadResult.code == 200 && uploadResult.data != null ? String(uploadResult.data).trim() : "";
            if (!ossId) {
              common_vendor.index.showToast({ title: (_a = uploadResult.msg) !== null && _a !== void 0 ? _a : "图片上传失败", icon: "none" });
              return Promise.resolve(null);
            }
            uploadedIds.push(ossId);
          }
          const formData = new common_vendor.UTSJSONObject();
          formData["id"] = feedbackId.value;
          formData["feedbackContent"] = content;
          if (uploadedIds.length > 0) {
            formData["imgOssIds"] = uploadedIds.join(",");
          }
          const res = yield api_http.replyFeedback(formData, false);
          if (res.code == 200) {
            common_vendor.index.showToast({ title: "提交成功", icon: "success" });
            showReplyPopup.value = false;
            loadDetail();
          } else {
            common_vendor.index.showToast({ title: (_b = res.msg) !== null && _b !== void 0 ? _b : "提交失败", icon: "none" });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/questionFeedback/detail.uvue:283", "提交回复异常:", error);
          common_vendor.index.showToast({ title: "网络异常，请重试", icon: "none" });
        } finally {
          replyLoading.value = false;
        }
      });
    };
    const handleClose = () => {
      common_vendor.index.showModal(new common_vendor.UTSJSONObject({
        title: "提示",
        content: "确定要关闭此反馈吗？关闭后将无法继续回复。",
        success: (res) => {
          if (res.confirm) {
            doClose();
          }
        }
      }));
    };
    const doClose = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
          const res = yield api_http.closeFeedback(feedbackId.value, false);
          if (res.code == 200) {
            common_vendor.index.showToast({ title: "已关闭", icon: "success" });
            loadDetail();
          } else {
            common_vendor.index.showToast({ title: (_a = res.msg) !== null && _a !== void 0 ? _a : "操作失败", icon: "none" });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/questionFeedback/detail.uvue:313", "关闭反馈异常:", error);
          common_vendor.index.showToast({ title: "网络异常，请重试", icon: "none" });
        }
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    common_vendor.onLoad((options) => {
      var _a;
      feedbackId.value = (_a = options.feedbackId) !== null && _a !== void 0 ? _a : "";
      loadDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "a5"),
        b: `${_ctx.u_s_b_h}px`,
        c: common_vendor.p({
          title: "反馈详情",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-119f565c",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        d: common_vendor.t(feedbackData.value.feedbackNo),
        e: common_vendor.p({
          type: getStatusType(feedbackData.value.status),
          text: getStatusText(feedbackData.value.status),
          size: "small",
          ["plain-fill"]: true,
          class: "data-v-119f565c"
        }),
        f: feedbackData.value.rechargeNo
      }, feedbackData.value.rechargeNo ? {
        g: common_vendor.t(feedbackData.value.rechargeNo)
      } : {}, {
        h: feedbackData.value.cardNo
      }, feedbackData.value.cardNo ? {
        i: common_vendor.t(feedbackData.value.cardNo)
      } : {}, {
        j: feedbackData.value.iccid
      }, feedbackData.value.iccid ? {
        k: common_vendor.t(feedbackData.value.iccid)
      } : {}, {
        l: common_vendor.t(feedbackData.value.orderNo || "-"),
        m: common_vendor.t(feedbackData.value.packageName || "-"),
        n: common_vendor.t(feedbackData.value.createTime || "-"),
        o: feedbackData.value.userPhone
      }, feedbackData.value.userPhone ? {
        p: common_vendor.t(feedbackData.value.userPhone)
      } : {}, {
        q: common_vendor.f(feedbackData.value.feedbackContentList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.sendType === "0" ? "我的反馈" : "平台回复"),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.replyContent),
            d: getImageUrls(item.imgOssUrl).length > 0
          }, getImageUrls(item.imgOssUrl).length > 0 ? {
            e: common_vendor.f(getImageUrls(item.imgOssUrl), (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img,
                c: common_vendor.o(($event) => {
                  return previewImage(img, item.imgOssUrl);
                }, imgIndex)
              };
            })
          } : {}, {
            f: index
          });
        }),
        r: feedbackData.value.status !== "3"
      }, feedbackData.value.status !== "3" ? {
        s: common_vendor.o(handleShowReply, "4d"),
        t: common_vendor.p({
          type: "primary",
          text: "继续反馈",
          customStyle: {
            borderRadius: "40rpx",
            flex: 1
          },
          class: "data-v-119f565c"
        }),
        v: common_vendor.o(handleClose, "ef"),
        w: common_vendor.p({
          type: "default",
          text: "已解决",
          customStyle: {
            borderRadius: "40rpx",
            flex: 1
          },
          class: "data-v-119f565c"
        })
      } : {}, {
        x: common_vendor.o(($event) => {
          return showReplyPopup.value = false;
        }, "18"),
        y: replyContent.value,
        z: common_vendor.o(($event) => {
          return replyContent.value = $event.detail.value;
        }, "45"),
        A: common_vendor.f(replyImages.value, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => {
              return previewReplyImage(index);
            }, index),
            c: common_vendor.o(($event) => {
              return removeReplyImage(index);
            }, index),
            d: index
          };
        }),
        B: replyImages.value.length < 5
      }, replyImages.value.length < 5 ? {
        C: common_vendor.o(chooseReplyImage, "17")
      } : {}, {
        D: common_vendor.o(handleReply, "0d"),
        E: common_vendor.p({
          type: "primary",
          text: "提交",
          loading: replyLoading.value,
          class: "data-v-119f565c"
        }),
        F: common_vendor.o(($event) => {
          return showReplyPopup.value = $event;
        }, "ff"),
        G: common_vendor.p({
          position: "bottom",
          round: true,
          customStyle: {
            height: "60%"
          },
          show: showReplyPopup.value,
          class: "data-v-119f565c"
        }),
        H: `${_ctx.u_s_b_h}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-119f565c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/questionFeedback/detail.js.map
