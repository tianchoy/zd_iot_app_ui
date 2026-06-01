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
open class GenUniModulesMUnixComponentsMBottomPopupMBottomPopup : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("onTouchmove" to withModifiers(_ctx.preventScroll, _uA(
            "stop",
            "prevent"
        ))), _uA(
            _cE("view", _uM("class" to _nC(_uA(
                "m-popup-class m-bottom-popup",
                _uM("m-popup-show" to _ctx.show, "m-popup-radius" to _ctx.radius, "m-bp__safearea" to _ctx.isSafeArea)
            )), "style" to _nS(_uM("background" to _ctx.backgroundColor, "height" to _ctx.popupHeightCss, "zIndex" to _ctx.zIndex, "transform" to ("translate3d(0, " + (if (_ctx.show) {
                _ctx.translateY
            } else {
                "100%"
            }
            ) + ", 0)")))), _uA(
                renderSlot(_ctx.`$slots`, "default")
            ), 6),
            if (isTrue(_ctx.mask)) {
                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                    "m-popup-mask",
                    _uA(
                        if (_ctx.show) {
                            "m-mask-show"
                        } else {
                            ""
                        }
                    )
                )), "style" to _nS(_uM("zIndex" to _ctx.maskZIndex)), "onClick" to _ctx.handleClose), null, 14, _uA(
                    "onClick"
                ))
            } else {
                _cC("v-if", true)
            }
        ), 40, _uA(
            "onTouchmove"
        ))
    }
    open var mask: Boolean by `$props`
    open var show: Boolean by `$props`
    open var backgroundColor: String by `$props`
    open var height: Any by `$props`
    open var radius: Boolean by `$props`
    open var zIndex: Any by `$props`
    open var maskZIndex: Any by `$props`
    open var translateY: String by `$props`
    open var isSafeArea: Boolean by `$props`
    open var popupHeightCss: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("popupHeightCss" to computed<String>(fun(): String {
            val h = this.height as Any
            if (h === 0 || h === "0") {
                return "auto"
            }
            if (UTSAndroid.`typeof`(h) === "string" && (h as String).trim() === "") {
                return "auto"
            }
            if (parseCssNumber(h) === 0) {
                return "auto"
            }
            return toCssLength(h)
        }
        ))
    }
    open var preventScroll = ::gen_preventScroll_fn
    open fun gen_preventScroll_fn() {}
    open var handleClose = ::gen_handleClose_fn
    open fun gen_handleClose_fn() {
        if (!this.show) {
            return
        }
        this.`$emit`("close", _uO())
    }
    companion object {
        var name = "mBottomPopup"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-popup-class" to _pS(_uM("boxSizing" to "border-box")), "m-bottom-popup" to _pS(_uM("width" to "100%", "position" to "fixed", "left" to 0, "right" to 0, "bottom" to 0, "opacity" to 0, "transform" to "translate3d(0, 100%, 0)", "transformOrigin" to "center", "transitionProperty" to "all", "transitionDuration" to "0.3s", "transitionTimingFunction" to "ease-in-out", "minHeight" to "20rpx")), "m-bp__safearea" to _pS(_uM("paddingBottom" to 0)), "m-popup-radius" to _pS(_uM("borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "overflow" to "hidden")), "m-popup-show" to _pS(_uM("opacity" to 1)), "m-popup-mask" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "right" to 0, "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.6)", "transitionProperty" to "all", "transitionDuration" to "0.3s", "transitionTimingFunction" to "ease-in-out", "opacity" to 0, "visibility" to "hidden")), "m-mask-show" to _pS(_uM("opacity" to 1, "visibility" to "visible")), "@TRANSITION" to _uM("m-bottom-popup" to _uM("property" to "all", "duration" to "0.3s", "timingFunction" to "ease-in-out"), "m-popup-mask" to _uM("property" to "all", "duration" to "0.3s", "timingFunction" to "ease-in-out")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("close" to null)
        var props = _nP(_uM("mask" to _uM("type" to "Boolean", "default" to true), "show" to _uM("type" to "Boolean", "default" to false), "backgroundColor" to _uM("type" to "String", "default" to "#fff"), "height" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 0), "radius" to _uM("type" to "Boolean", "default" to true), "zIndex" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 999), "maskZIndex" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 998), "translateY" to _uM("type" to "String", "default" to "0"), "isSafeArea" to _uM("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = _uA(
            "mask",
            "show",
            "backgroundColor",
            "height",
            "radius",
            "zIndex",
            "maskZIndex",
            "translateY",
            "isSafeArea"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
