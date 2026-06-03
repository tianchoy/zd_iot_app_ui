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
open class GenUniModulesMUnixComponentsMWxLoginMWxLogin : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
        return _cE("view", _uM("class" to "m-wx-login", "onClick" to _ctx.handleLogin), _uA(
            _cE("view", _uM("class" to "m-wx-login__icon"), _uA(
                _cV(_component_m_icon, _uM("name" to _ctx.icon, "size" to 36, "color" to "#ffffff"), null, 8, _uA(
                    "name"
                ))
            )),
            _cE("view", _uM("class" to "m-wx-login__text"), _tD(_ctx.text), 1)
        ), 8, _uA(
            "onClick"
        ))
    }
    open var icon: String by `$props`
    open var text: String by `$props`
    open var type: String by `$props`
    open var handleLogin = ::gen_handleLogin_fn
    open fun gen_handleLogin_fn() {
        this.`$emit`("login")
        if (this.type === "code") {} else if (this.type === "userInfo") {}
    }
    companion object {
        var name = "mWxLogin"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-wx-login" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "width" to "100%", "height" to "90rpx", "backgroundColor" to "#07c160", "borderTopLeftRadius" to "45rpx", "borderTopRightRadius" to "45rpx", "borderBottomRightRadius" to "45rpx", "borderBottomLeftRadius" to "45rpx", "boxSizing" to "border-box")), "m-wx-login__icon" to _uM(".m-wx-login " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "marginRight" to "10rpx", "lineHeight" to 1)), "m-wx-login__text" to _uM(".m-wx-login " to _uM("fontSize" to "32rpx", "color" to "#ffffff", "fontWeight" to 500, "lineHeight" to 1)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("success" to null, "fail" to null, "login" to null)
        var props = _nP(_uM("icon" to _uM("type" to "String", "default" to "user"), "text" to _uM("type" to "String", "default" to "微信一键登录"), "type" to _uM("type" to "String", "default" to "code")))
        var propsNeedCastKeys = _uA(
            "icon",
            "text",
            "type"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
