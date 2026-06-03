@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "SENSELESS_COMPARISON", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1E9055A
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlin.properties.Delegates
import io.dcloud.uniapp.extapi.login as uni_login
open class GenPagesLoginLogin : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesLoginLogin) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesLoginLogin
            val _cache = __ins.renderCache
            val wxGetPhoneLogin = ref("")
            val handleGetPhoneNumber = fun(res: UTSJSONObject){
                console.log("获取手机号:", res, " at pages/login/login.uvue:24")
            }
            val userLoginByOpenid = fun(codes: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(login(_uO("xcxCode" to codes, "isLogin" to "1")))
                        console.log("登录:", res, " at pages/login/login.uvue:33")
                })
            }
            val code = ref<String>("")
            val getCode = fun(){
                uni_login(LoginOptions(success = fun(res){
                    code.value = res.code
                    userLoginByOpenid(res.code)
                }
                ))
            }
            onLoad(fun(options){
                console.log(options, " at pages/login/login.uvue:47")
                if (options["wxGetPhoneLogin"] != null) {
                    wxGetPhoneLogin.value = options["wxGetPhoneLogin"] as String
                }
                getCode()
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "中导云卡登录", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("image", _uM("src" to "/static/defaultAvator.png", "class" to "logo")),
                        _cE("view", _uM("class" to "login-btn"), _uA(
                            _cE("button", _uM("open-type" to "getPhoneNumber", "type" to "primary", "plain" to "true", "onGetphonenumber" to handleGetPhoneNumber), " 个人用户登录 ", 32)
                        )),
                        _cE("view", _uM("class" to "no-login"), _uA(
                            _cE("view", _uM("class" to "no-login-text"), "暂不登录")
                        ))
                    ))
                ), 64)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "backgroundColor" to "#f4f7fb", "paddingBottom" to "40rpx")), "logo" to _uM(".container " to _uM("width" to "200rpx", "height" to "200rpx", "marginTop" to "200rpx", "marginRight" to 0, "marginBottom" to "80rpx", "marginLeft" to 0, "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%")), "login-btn" to _uM(".container " to _uM("width" to "80%", "marginTop" to 0, "marginRight" to "40rpx", "marginBottom" to 0, "marginLeft" to "40rpx")), "no-login" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginTop" to "100rpx", "width" to "80%")), "no-login-text" to _uM(".container .no-login " to _uM("width" to "100%", "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#e8eef7", "paddingTop" to "40rpx", "fontSize" to "24rpx", "color" to "#64748b", "lineHeight" to 1.45, "textAlign" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
