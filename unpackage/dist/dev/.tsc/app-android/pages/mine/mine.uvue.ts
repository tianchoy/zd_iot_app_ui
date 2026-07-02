import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import _easycom_rice_button from '@/uni_modules/rice-ui/components/rice-button/rice-button.uvue'
import { ref, computed } from 'vue'
	import { login,getTenantInfo,queryCardListSum} from '@/api/http.uts'
	import type { CardListSumData } from '@/api/types.uts'
	import { getStorageSync,getTenantId,getToken ,clearToken,isWechat,config,setToken} from '@/common/config.uts'


	
const __sfc__ = defineComponent({
  __name: 'mine',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const title = ref('用户');
	const wxGetPhoneLogin = ref<string>('')
	const isWechatEnv = computed<boolean>(() => isWechat())
	

	const checkToken = (): boolean => {
		const token = getToken()
		return !!token
	}
	const isLoginState = computed<boolean>(() => !checkToken())

	// 检查是否登录
	const isLogin = (): boolean => {
		if (!checkToken()) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			})
			return false
		}
		return true
	}

	// 跳转订单记录
	const toOrder = () => {
		if (!isLogin()) return
		uni.navigateTo({
			url: '/pages/myOrder/myOrder'
		})
	}

	//登录
	const userId = ref<string>('')
	const userLoginByOpenid = async (codes: string) => {
		const res = await login({
			xcxCode: codes,
			isLogin: '0',
		})
		
		if(res.code == 200){
			userId.value = '' + res.data.id
			uni.navigateTo({
				url: '/pages/login/login?wxGetPhoneLogin=' + wxGetPhoneLogin.value + '&userId=' + userId.value
			})
		}
	}

	//获取 code
	const code = ref<string>('')
	const getCode = async () => {
		uni.login({
			success: (res) => {
				code.value = res.code
				if( wxGetPhoneLogin.value == '1'){
					const params = {__$originalPosition: new UTSSourceMapPosition("params", "pages/mine/mine.uvue", 103, 12),
						isLogin: "1",
						xcxCode: code.value,
					}
					login(params).then((res) => {
						if(res.code == 200){
							console.log('登录成功:', res.data.access_token, " at pages/mine/mine.uvue:109")
							setToken(res.data.access_token, res.data.refreshToken)
							uni.reLaunch({
								url: '/pages/card/card'
							})
						}
					})
				}else{
					userLoginByOpenid(res.code);
				}
			}
		})
	}

	// 获取租户页面配置
	const getTenantInfos = async () => {
		const res = await getTenantInfo(getTenantId(),false)
		if(res.code == 200){
			const tenantInfo = res.data
			wxGetPhoneLogin.value = '' + tenantInfo.wxGetPhoneLogin
		}
	}

	const handleLogin = () => {
		const token = getToken()
		if(!token){
			getTenantInfos().then(() => {
				getCode()
			})
		}
	}

	// 退出登录
	const handleLogout = () => {
		clearToken()
		uni.showToast({
			title: '退出登录成功',
			icon: 'none'
		})
		uni.reLaunch({
			url: '/pages/card/card'
		})
	}

	// 查询卡列表统计
	const cardListSum = ref<CardListSumData>({ all: 0, inUse: 0, inNotUse: 0 })
	const getCardListSum = async () => {
		try {
			const res = await queryCardListSum()
			if (res.code === 200) {
				cardListSum.value = res.data
			}
		} catch (error) {
			console.error('查询卡列表统计异常:', error, " at pages/mine/mine.uvue:162")
		}
	}

	onLoad(() => {
		if (isWechat()) {
			if (!checkToken()) return;
		}
		// 检查token状态
		getCardListSum()
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)
const _component_rice_button = resolveEasyComponent("rice-button",_easycom_rice_button)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "我的",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-info mb-24" }), [
        _cE("view", _uM({ class: "persion-card" }), [
          _cE("view", _uM({ class: "persion-card-item" }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "我的卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), _tD(cardListSum.value.all != null ? cardListSum.value.all : 0), 1 /* TEXT */)
          ]),
          _cE("view", _uM({ class: "persion-card-item" }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "在用卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), _tD(cardListSum.value.inUse != null ? cardListSum.value.inUse : 0), 1 /* TEXT */)
          ]),
          _cE("view", _uM({ class: "persion-card-item" }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "异常卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), _tD(cardListSum.value.inNotUse != null ? cardListSum.value.inNotUse : 0), 1 /* TEXT */)
          ])
        ])
      ]),
      _cE("view", _uM({ class: "card-box" }), [
        _cE("view", _uM({
          class: "item",
          onClick: toOrder
        }), [
          _cE("text", _uM({ class: "order-label" }), "我的订单"),
          _cV(_component_rice_icon, _uM({
            name: "arrow-right",
            size: "20rpx"
          }))
        ]),
        _cE("view", _uM({ class: "item" }), [
          _cE("text", _uM({ class: "order-label" }), "绑定卡片"),
          _cV(_component_rice_icon, _uM({
            name: "arrow-right",
            size: "20rpx"
          }))
        ]),
        _cE("view", _uM({ class: "item" }), [
          _cE("text", _uM({ class: "order-label" }), "常见问题"),
          _cV(_component_rice_icon, _uM({
            name: "arrow-right",
            size: "20rpx"
          }))
        ])
      ]),
      isTrue(isWechatEnv.value)
        ? _cE("view", _uM({
            key: 0,
            class: "btn-box"
          }), [
            isTrue(isLoginState.value)
              ? _cV(_component_rice_button, _uM({
                  key: 0,
                  type: "primary",
                  width: "100%",
                  shape: "round",
                  onClick: handleLogin
                }), _uM({
                  default: withSlotCtx((): any[] => ["登录"]),
                  _: 1 /* STABLE */
                }))
              : isTrue(unref(getStorageSync)('usePhoneNumber'))
                ? _cV(_component_rice_button, _uM({
                    key: 1,
                    type: "error",
                    width: "100%",
                    shape: "round",
                    onClick: handleLogout
                  }), _uM({
                    default: withSlotCtx((): any[] => ["退出登录"]),
                    _: 1 /* STABLE */
                  }))
                : _cC("v-if", true)
          ])
        : _cC("v-if", true)
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesMineMineStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f4f7fb"], ["height", "100%"]]))], ["card-info", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundImage", "linear-gradient(135deg, #2f6de8 0%, #4d88f5 65%, #67a4ff 100%)"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#ffffff"], ["boxShadow", "0 8rpx 18rpx rgba(37, 99, 235, 0.14)"]])]])], ["persion-name", _uM([[".container .card-info ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#ffffff"]])]])], ["persion-card", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "row"]])]])], ["persion-card-item", _uM([[".container .card-info .persion-card ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["marginTop", 0], ["marginRight", "10rpx"], ["marginBottom", 0], ["marginLeft", "10rpx"], ["minHeight", "120rpx"], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["borderBottomLeftRadius", "18rpx"], ["paddingTop", "20rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.12)"], ["boxShadow", "inset 0 1px 0 rgba(255, 255, 255, 0.18)"]])]])], ["persion-card-item-title", _uM([[".container .card-info .persion-card ", _uM([["fontSize", "22rpx"], ["lineHeight", 1.4], ["color", "#ffffff"]])]])], ["persion-card-item-content", _uM([[".container .card-info .persion-card ", _uM([["marginTop", "20rpx"], ["fontSize", "40rpx"], ["fontWeight", 800], ["lineHeight", 1]])]])], ["card-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"]])]])], ["item", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "#e7edf5"]])]])], ["order-label", _uM([[".container .card-box .item ", _uM([["fontWeight", "bold"]])]])], ["btn-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["marginTop", "30rpx"], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"]])]])]])]
