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
open class GenUniModulesMUnixComponentsMIconMIcon : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("text", _uM("class" to "m-icon iconfont", "style" to _nS(_ctx.iconStyle), "onClick" to _ctx.handleClick), _tD(_ctx.iconChar), 13, _uA(
            "onClick"
        ))
    }
    open var name: String by `$props`
    open var size: Any by `$props`
    open var color: String by `$props`
    open var bold: Boolean by `$props`
    open var iconChar: String by `$data`
    open var iconStyle: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("iconChar" to computed<String>(fun(): String {
            return getIconChar(this.name)
        }
        ), "iconStyle" to computed<String>(fun(): String {
            var style = "font-family:\"iconfont\";"
            style += "font-size:" + this.resolveFontSize() + ";"
            if (this.color != "") {
                style += "color:" + this.color + ";"
            }
            if (this.bold) {
                style += "font-weight:bold;"
            }
            return style
        }
        ))
    }
    open var resolveFontSize = ::gen_resolveFontSize_fn
    open fun gen_resolveFontSize_fn(): String {
        val sz = this.size
        if (UTSAndroid.`typeof`(sz) === "number") {
            return (sz as Number) + "rpx"
        }
        val s = sz as String
        if (s.length === 0) {
            return "40rpx"
        }
        val len = s.length
        if (len >= 3 && s.substring(len - 3) === "rpx") {
            return s
        }
        if (len >= 2 && s.substring(len - 2) === "px") {
            return s
        }
        if (len >= 1 && s.substring(len - 1) === "%") {
            return s
        }
        if (len >= 2 && s.substring(len - 2) === "em") {
            return s
        }
        val n = parseFloat(s)
        if (!isNaN(n)) {
            return n + "rpx"
        }
        return "40rpx"
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn(e: Any) {
        this.`$emit`("click", e)
    }
    companion object {
        var name = "mIcon"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-icon" to _pS(_uM("display" to "flex", "lineHeight" to 1)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null)
        var props = _nP(_uM("name" to _uM("type" to "String", "default" to ""), "size" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 40), "color" to _uM("type" to "String", "default" to ""), "bold" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "name",
            "size",
            "color",
            "bold"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
