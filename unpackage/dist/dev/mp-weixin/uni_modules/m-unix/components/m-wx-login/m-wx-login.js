"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "mWxLogin",
  emits: ["success", "fail", "login"],
  props: {
    /** 左侧图标，传 m-icon 的 name（默认 user，避免 wechat 码位在字库中为空） */
    icon: {
      type: String,
      default: "user"
    },
    // 按钮文字
    text: {
      type: String,
      default: "微信一键登录"
    },
    // 按钮类型，code 获取code，userInfo 获取用户信息
    type: {
      type: String,
      default: "code"
    }
  },
  methods: {
    handleLogin() {
      this.$emit("login");
      if (this.type === "code") {
        common_vendor.index.login(new common_vendor.UTSJSONObject({
          provider: "weixin",
          success: (res) => {
            this.$emit("success", new common_vendor.UTSJSONObject({
              code: res.code
            }));
          },
          fail: (err) => {
            this.$emit("fail", err);
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        }));
      } else if (this.type === "userInfo") {
        common_vendor.index.getUserProfile(new common_vendor.UTSJSONObject({
          desc: "用于完善会员资料",
          success: (res = null) => {
            this.$emit("success", new common_vendor.UTSJSONObject({
              userInfo: res.userInfo
            }));
          },
          fail: (err = null) => {
            this.$emit("fail", err);
            common_vendor.index.showToast({
              title: "获取用户信息失败",
              icon: "none"
            });
          }
        }));
      }
    }
  }
});
if (!Array) {
  const _easycom_m_icon2 = common_vendor.resolveComponent("m-icon");
  _easycom_m_icon2();
}
const _easycom_m_icon = () => "../m-icon/m-icon.js";
if (!Math) {
  _easycom_m_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  "raw js";
  return {
    a: common_vendor.p({
      name: $props.icon,
      size: 36,
      color: "#ffffff",
      class: "data-v-3be90804"
    }),
    b: common_vendor.t($props.text),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    d: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args), "d9"),
    e: `${_ctx.u_s_b_h}px`,
    f: `${_ctx.u_s_a_i_b}px`,
    g: common_vendor.pvhc(_ctx.$scope.data.virtualHostClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3be90804"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-wx-login/m-wx-login.js.map
