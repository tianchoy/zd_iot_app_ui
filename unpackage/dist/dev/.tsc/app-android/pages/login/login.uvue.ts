import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import {login} from '@/api/http.uts'
	import {setToken,setStorageSync} from '@/common/config.uts'
	
const __sfc__ = defineComponent({
  __name: 'login',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const wxGetPhoneLogin = ref<string>('')
	const userId = ref<string>('')

	//登录
	const getLogin = async (code: string) => {
		const res = await login({
			xcxCode: code,
			userId: userId.value,
			isLogin: wxGetPhoneLogin.value,
		})
		if(res.code == 200){
			console.log('登录成功:', res.data.access_token, " at pages/login/login.uvue:35")
			setToken(res.data.access_token, res.data.refreshToken)
			setStorageSync('usePhoneNumber', true)
			uni.reLaunch({
				url: '/pages/card/card'
			})
		}
	}

	//获取手机号
	const handleGetPhoneNumber =  (res: UTSJSONObject) => {
		const detail = res['detail'] as UTSJSONObject
		getLogin(detail['code'] as string)
	}

	//暂不登录
	const noNowLogin = () => {
		uni.reLaunch({
			url: '/pages/card/card'
		})
	}

	onLoad((options: OnLoadOptions) => {
		console.log('登录参数:', options, " at pages/login/login.uvue:58")
		if(options['wxGetPhoneLogin'] != null){
			wxGetPhoneLogin.value = options['wxGetPhoneLogin'] as string
			userId.value = options['userId'] as string
		}
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "中导云卡登录",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("image", _uM({
        src: "/static/defaultAvator.png",
        class: "logo"
      })),
      _cE("view", _uM({ class: "login-btn" }), [
        _cE("button", _uM({
          "open-type": "getPhoneNumber",
          type: "primary",
          plain: "true",
          onGetphonenumber: handleGetPhoneNumber
        }), " 个人用户登录 ", 32 /* NEED_HYDRATION */)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesLoginLoginStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["backgroundColor", "#f4f7fb"], ["paddingBottom", "40rpx"], ["height", "100%"]]))], ["logo", _uM([[".container ", _uM([["width", "200rpx"], ["height", "200rpx"], ["marginTop", "200rpx"], ["marginRight", 0], ["marginBottom", "80rpx"], ["marginLeft", 0], ["borderTopLeftRadius", "50%"], ["borderTopRightRadius", "50%"], ["borderBottomRightRadius", "50%"], ["borderBottomLeftRadius", "50%"]])]])], ["login-btn", _uM([[".container ", _uM([["width", "80%"], ["marginTop", 0], ["marginRight", "40rpx"], ["marginBottom", 0], ["marginLeft", "40rpx"]])]])], ["no-login", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["marginTop", "100rpx"], ["width", "80%"]])]])], ["no-login-text", _uM([[".container .no-login ", _uM([["width", "100%"], ["borderTopWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderTopColor", "#e8eef7"], ["paddingTop", "40rpx"], ["fontSize", "24rpx"], ["color", "#64748b"], ["lineHeight", 1.45], ["textAlign", "center"]])]])]])]
