"use strict";
const common_vendor = require("../../common/vendor.js");
const api_http = require("../../api/http.js");
const api_url = require("../../api/url.js");
const api_Request = require("../../api/Request.js");
if (!Array) {
  const _easycom_topNavBar_1 = common_vendor.resolveComponent("topNavBar");
  const _easycom_rice_button_1 = common_vendor.resolveComponent("rice-button");
  (_easycom_topNavBar_1 + _easycom_rice_button_1)();
}
const _easycom_topNavBar = () => "../../components/topNavBar/topNavBar.js";
const _easycom_rice_button = () => "../../uni_modules/rice-ui/components/rice-button/rice-button.js";
if (!Math) {
  (_easycom_topNavBar + _easycom_rice_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "submit",
  setup(__props) {
    const rechargeNo = common_vendor.ref("");
    const orderNo = common_vendor.ref("");
    const pkgName = common_vendor.ref("");
    const feedbackContent = common_vendor.ref("");
    const userPhone = common_vendor.ref("");
    const images = common_vendor.ref([]);
    const submitLoading = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      var _a, _b, _c;
      rechargeNo.value = (_a = options.rechargeNo) !== null && _a !== void 0 ? _a : "";
      orderNo.value = (_b = options.orderNo) !== null && _b !== void 0 ? _b : "";
      pkgName.value = (_c = options.pkgName) !== null && _c !== void 0 ? _c : "";
    });
    const chooseImage = () => {
      const maxCount = 3 - images.value.length;
      common_vendor.index.chooseImage(new common_vendor.UTSJSONObject({
        count: maxCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths != null) {
            for (let i = 0; i < tempFilePaths.length; i++) {
              images.value.push(tempFilePaths[i]);
            }
          }
        }
      }));
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: images.value
      });
    };
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const handleSubmit = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const content = feedbackContent.value.trim();
        const phone = userPhone.value.trim();
        if (!content) {
          common_vendor.index.showToast({ title: "请输入问题描述", icon: "none" });
          return Promise.resolve(null);
        }
        if (!/^1[3-9]\d{9}$/.test(phone)) {
          common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
          return Promise.resolve(null);
        }
        submitLoading.value = true;
        try {
          const uploadedIds = [];
          for (let i = 0; i < images.value.length; i++) {
            const uploadResult = yield api_Request.http.upload(new common_vendor.UTSJSONObject({
              url: api_url.ApiUrl.feedbackUploadImage,
              filePath: images.value[i],
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
          formData["rechargeNo"] = rechargeNo.value;
          formData["feedbackContent"] = content;
          formData["userPhone"] = phone;
          formData["feedbackType"] = "3";
          if (orderNo.value) {
            formData["orderNo"] = orderNo.value;
          }
          if (pkgName.value) {
            formData["packageName"] = pkgName.value;
          }
          if (uploadedIds.length > 0) {
            formData["imgOssIds"] = uploadedIds.join(",");
          }
          const res = yield api_http.submitFeedback(formData, false);
          if (res.code == 200) {
            common_vendor.index.showToast({ title: "提交成功", icon: "success" });
            common_vendor.index.redirectTo({
              url: `/pages/questionFeedback/list?rechargeNo=${rechargeNo.value}`
            });
          } else {
            common_vendor.index.showToast({ title: (_b = res.msg) !== null && _b !== void 0 ? _b : "提交失败", icon: "none" });
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/questionFeedback/submit.uvue:160", "提交反馈异常:", error);
          common_vendor.index.showToast({ title: "网络异常，请重试", icon: "none" });
        } finally {
          submitLoading.value = false;
        }
      });
    };
    const toMyFeedback = () => {
      common_vendor.index.navigateTo({
        url: `/pages/questionFeedback/list?rechargeNo=${rechargeNo.value}`
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta: 1 }));
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack, "a5"),
        b: common_vendor.o(toMyFeedback, "97"),
        c: `${_ctx.u_s_b_h}px`,
        d: common_vendor.p({
          title: "问题反馈",
          ["show-back"]: true,
          backgroundColor: "#f4f7fb",
          textColor: "#333",
          showCapsule: true,
          isIcon: false,
          rightText: "我的反馈",
          rightActionBackgroundColor: "#f0fdf4",
          class: "data-v-3bd4e23f",
          style: common_vendor.normalizeStyle({
            "--status-bar-height": `${_ctx.u_s_b_h}px`
          })
        }),
        e: common_vendor.t(rechargeNo.value),
        f: orderNo.value
      }, orderNo.value ? {
        g: common_vendor.t(orderNo.value)
      } : {}, {
        h: pkgName.value
      }, pkgName.value ? {
        i: common_vendor.t(pkgName.value)
      } : {}, {
        j: feedbackContent.value,
        k: common_vendor.o(($event) => {
          return feedbackContent.value = $event.detail.value;
        }, "00"),
        l: common_vendor.f(images.value, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => {
              return previewImage(index);
            }, index),
            c: common_vendor.o(($event) => {
              return removeImage(index);
            }, index),
            d: index
          };
        }),
        m: images.value.length < 3
      }, images.value.length < 3 ? {
        n: common_vendor.o(chooseImage, "10")
      } : {}, {
        o: userPhone.value,
        p: common_vendor.o(($event) => {
          return userPhone.value = $event.detail.value;
        }, "bd"),
        q: common_vendor.o(handleSubmit, "b4"),
        r: common_vendor.p({
          type: "primary",
          text: "提交",
          loading: submitLoading.value,
          customStyle: {
            borderRadius: "40rpx"
          },
          class: "data-v-3bd4e23f"
        }),
        s: `${_ctx.u_s_b_h}px`
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3bd4e23f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/questionFeedback/submit.js.map
