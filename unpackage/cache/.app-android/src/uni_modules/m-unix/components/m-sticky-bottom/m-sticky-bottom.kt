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
open class GenUniModulesMUnixComponentsMStickyBottomMStickyBottom : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to "m-sticky-bottom", "style" to _nS(_uM("zIndex" to _ctx.zIndex))), _uA(
            _cE("view", _uM("class" to _nC(_uA(
                "m-sticky-bottom__content",
                _uM("m-sticky-bottom__content--safearea" to _ctx.safeAreaInsetBottom)
            )), "style" to _nS(_uM("backgroundColor" to _ctx.bgColor))), _uA(
                renderSlot(_ctx.`$slots`, "default")
            ), 6)
        ), 4)
    }
    open var zIndex: Any by `$props`
    open var safeAreaInsetBottom: Boolean by `$props`
    open var bgColor: String by `$props`
    companion object {
        var name = "mStickyBottom"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-sticky-bottom" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "boxSizing" to "border-box", "backgroundColor" to "rgba(0,0,0,0)")), "m-sticky-bottom__content" to _uM(".m-sticky-bottom " to _uM("boxSizing" to "border-box", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx"), ".m-sticky-bottom .m-sticky-bottom__content--safearea" to _uM("paddingBottom" to "40rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("zIndex" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 998), "safeAreaInsetBottom" to _uM("type" to "Boolean", "default" to true), "bgColor" to _uM("type" to "String", "default" to "#ffffff")))
        var propsNeedCastKeys = _uA(
            "zIndex",
            "safeAreaInsetBottom",
            "bgColor"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
