"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_tag_1 = common_vendor.resolveComponent("rice-tag");
  (_easycom_topNavBar_1 + _easycom_rice_tag_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_tag = () => "../../uni_modules/rice-ui/components/rice-tag/rice-tag.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_tag)();
}
class FeedbackItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          feedbackContent: { type: String, optional: false },
          status: { type: String, optional: false },
          createTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          msisdn: { type: String, optional: false },
          orderNo: { type: String, optional: false },
          packageName: { type: String, optional: false },
          replyContent: { type: String, optional: false }
        };
      },
      name: "FeedbackItem"
    };
  }
  constructor(options, metadata = FeedbackItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.feedbackContent = this.__props__.feedbackContent;
    this.status = this.__props__.status;
    this.createTime = this.__props__.createTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.msisdn = this.__props__.msisdn;
    this.orderNo = this.__props__.orderNo;
    this.packageName = this.__props__.packageName;
    this.replyContent = this.__props__.replyContent;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    const rechargeNo = common_vendor.ref("");
    const loading = common_vendor.ref(true);
    const feedbackList = common_vendor.ref([]);
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
    const loadFeedbackList = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a;
        loading.value = true;
        try {
          const res = yield api_http.getFeedbackList(rechargeNo.value, false);
          if (res.code == 200) {
            const rows = res.data;
            if (rows != null && Array.isArray(rows)) {
              feedbackList.value = rows;
            } else {
              feedbackList.value = [];
            }
          } else {
            common_vendor.index.showToast({ title: (_a = res.msg) !== null && _a !== void 0 ? _a : "查询失败", icon: "none" });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/questionFeedback/list.uvue:90", "查询反馈列表异常:", error);
        } finally {
          loading.value = false;
        }
      });
    };
    const handleDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/questionFeedback/detail?feedbackId=${id}`
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    common_vendor.onLoad((options) => {
      var _a;
      rechargeNo.value = (_a = options.rechargeNo) !== null && _a !== void 0 ? _a : "";
      loadFeedbackList();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "a5"),
        b: `${_ctx.u_s_b_h}px`,
        c: common_vendor.p({
          title: "我的反馈",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: false,
          class: "data-v-144c46a5",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        d: feedbackList.value.length > 0
      }, feedbackList.value.length > 0 ? {
        e: common_vendor.f(feedbackList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.feedbackNo),
            b: common_vendor.t(item.feedbackContent || "-"),
            c: item.replyContent
          }, item.replyContent ? {
            d: common_vendor.t(item.replyContent)
          } : {}, {
            e: common_vendor.t(item.msisdn || "-"),
            f: common_vendor.t(item.orderNo || "-"),
            g: common_vendor.t(item.createTime),
            h: "144c46a5-1-" + i0,
            i: common_vendor.p({
              type: getStatusType(item.status),
              text: getStatusText(item.status),
              size: "small",
              ["plain-fill"]: true,
              class: "data-v-144c46a5"
            }),
            j: index,
            k: common_vendor.o(($event) => {
              return handleDetail(item.id);
            }, index)
          });
        })
      } : !loading.value ? {} : {}, {
        f: !loading.value,
        g: `${_ctx.u_s_b_h}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-144c46a5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/questionFeedback/list.js.map
