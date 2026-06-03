
const __sfc__ = defineComponent({
	name: 'mWxLogin',
	emits: ['success', 'fail', 'login'],
	props: {
		/** 左侧图标，传 m-icon 的 name（默认 user，避免 wechat 码位在字库中为空） */
		icon: {
			type: String,
			default: 'user'
		},
		// 按钮文字
		text: {
			type: String,
			default: '微信一键登录'
		},
		// 按钮类型，code 获取code，userInfo 获取用户信息
		type: {
			type: String,
			default: 'code'
		}
	},
	methods: {
		handleLogin() {
			this.$emit('login')
			if (this.type === 'code') {
				// 微信小程序获取code

















			} else if (this.type === 'userInfo') {
				// 获取用户信息

















			}
		}
	}
});

export default __sfc__
function GenUniModulesMUnixComponentsMWxLoginMWxLoginRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)

  return _cE("view", _uM({
    class: "m-wx-login",
    onClick: _ctx.handleLogin
  }), [
    _cE("view", _uM({ class: "m-wx-login__icon" }), [
      _cV(_component_m_icon, _uM({
        name: _ctx.icon,
        size: 36,
        color: "#ffffff"
      }), null, 8 /* PROPS */, ["name"])
    ]),
    _cE("view", _uM({ class: "m-wx-login__text" }), _tD(_ctx.text), 1 /* TEXT */)
  ], 8 /* PROPS */, ["onClick"])
}
export type MWxLoginComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMWxLoginMWxLoginStyles = [_uM([["m-wx-login", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["width", "100%"], ["height", "90rpx"], ["backgroundColor", "#07c160"], ["borderTopLeftRadius", "45rpx"], ["borderTopRightRadius", "45rpx"], ["borderBottomRightRadius", "45rpx"], ["borderBottomLeftRadius", "45rpx"], ["boxSizing", "border-box"]]))], ["m-wx-login__icon", _uM([[".m-wx-login ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["marginRight", "10rpx"], ["lineHeight", 1]])]])], ["m-wx-login__text", _uM([[".m-wx-login ", _uM([["fontSize", "32rpx"], ["color", "#ffffff"], ["fontWeight", 500], ["lineHeight", 1]])]])]])]

import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
