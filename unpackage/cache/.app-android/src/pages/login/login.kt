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
open class GenPagesLoginLogin : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesLoginLogin) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesLoginLogin
            val _cache = __ins.renderCache
            val handleSuccess = fun(res: UTSJSONObject){
                console.log("登录成功:", res, " at pages/login/login.uvue:19")
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_wx_login = resolveEasyComponent("m-wx-login", GenUniModulesMUnixComponentsMWxLoginMWxLoginClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "中导云卡登录", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("image", _uM("src" to "/static/defaultAvator.png", "class" to "logo")),
                        _cE("view", _uM("class" to "login-btn"), _uA(
                            _cV(_component_m_wx_login, _uM("type" to "code", "text" to "微信一键登录", "onSuccess" to handleSuccess))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "backgroundColor" to "#f4f7fb", "paddingBottom" to "40rpx")), "logo" to _uM(".container " to _uM("width" to "200rpx", "height" to "200rpx", "marginTop" to "300rpx", "marginRight" to 0, "marginBottom" to "40rpx", "marginLeft" to 0, "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%")), "login-btn" to _uM(".container " to _uM("width" to "80%", "marginTop" to 0, "marginRight" to "40rpx", "marginBottom" to 0, "marginLeft" to "40rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
