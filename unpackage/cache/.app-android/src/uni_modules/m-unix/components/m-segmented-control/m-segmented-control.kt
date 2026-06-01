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
open class GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "m-segmented-control",
            _uM("m-segmented-control--disabled" to _ctx.disabled)
        )), "style" to _nS(_ctx.rootStyle)), _uA(
            _cE("view", _uM("class" to "m-segmented-control__inner"), _uA(
                if (_ctx.valueList.length > 0) {
                    _cE("view", _uM("key" to 0, "class" to "m-segmented-control__thumb", "style" to _nS(_ctx.thumbStyle)), null, 4)
                } else {
                    _cC("v-if", true)
                }
                ,
                _cE(Fragment, null, RenderHelpers.renderList(_ctx.valueList, fun(item, idx, __index, _cached): Any {
                    return _cE("view", _uM("key" to idx, "class" to "m-segmented-control__item", "onClick" to fun(){
                        _ctx.onItemTap(idx)
                    }
                    ), _uA(
                        _cE("text", _uM("class" to "m-segmented-control__text", "style" to _nS(_ctx.textStyle(idx))), _tD(item), 5)
                    ), 8, _uA(
                        "onClick"
                    ))
                }
                ), 128)
            ))
        ), 6)
    }
    open var values: UTSArray<Any?>? by `$props`
    open var current: Number by `$props`
    open var textActiveColor: String by `$props`
    open var activeColor: String by `$props`
    open var height: String by `$props`
    open var size: String by `$props`
    open var radius: String by `$props`
    open var disabled: Boolean by `$props`
    open var inactiveColor: String by `$props`
    open var backgroundColor: String by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var valueList: UTSArray<String> by `$data`
    open var innerCurrent: Number by `$data`
    open var rootStyle: UTSJSONObject by `$data`
    open var thumbStyle: UTSJSONObject by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("valueList" to computed<UTSArray<String>>(fun(): UTSArray<String> {
            val raw = this.values as UTSArray<Any>
            val out = _uA<String>()
            run {
                var i: Number = 0
                while(i < raw.length){
                    val v = raw[i]
                    if (UTSAndroid.`typeof`(v) === "string") {
                        out.push(v as String)
                    } else {
                        out.push("" + v)
                    }
                    i++
                }
            }
            return out
        }
        ), "innerCurrent" to computed<Number>(fun(): Number {
            val c = this.current as Number
            val len = this.valueList.length
            if (len === 0) {
                return 0
            }
            if (c < 0) {
                return 0
            }
            if (c >= len) {
                return len - 1
            }
            return c
        }
        ), "rootStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-segmented-control/m-segmented-control.uvue", 108, 10), "height" to this.height, "borderRadius" to this.radius, "backgroundColor" to this.backgroundColor)
            if (this.customStyle != null) {
                Object.assign(st, this.customStyle)
            }
            return st
        }
        ), "thumbStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val n = this.valueList.length
            if (n <= 0) {
                return _uO("display" to "none")
            }
            val pct = (100.0 as Number) / n
            val i = this.innerCurrent
            return _uO("width" to (pct + "%"), "left" to (i * pct + "%"), "transition" to "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)", "borderColor" to this.activeColor as String, "borderRadius" to this.radius as String)
        }
        ))
    }
    open var textStyle = ::gen_textStyle_fn
    open fun gen_textStyle_fn(idx: Number): UTSJSONObject {
        val active = idx === this.innerCurrent
        return _uO("font-size" to this.size, "color" to if (active) {
            this.textActiveColor
        } else {
            this.inactiveColor
        }
        , "transition" to "color 0.28s ease")
    }
    open var onItemTap = ::gen_onItemTap_fn
    open fun gen_onItemTap_fn(idx: Number) {
        if (this.disabled) {
            return
        }
        this.`$emit`("update:current", idx)
        this.`$emit`("click", _uO("index" to idx))
        this.`$emit`("change", _uO("index" to idx))
    }
    companion object {
        var name = "mSegmentedControl"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-segmented-control" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "stretch", "boxSizing" to "border-box", "overflow" to "hidden")), "m-segmented-control--disabled" to _pS(_uM("opacity" to 0.5)), "m-segmented-control__inner" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "display" to "flex", "flexDirection" to "row", "alignItems" to "stretch", "position" to "relative", "boxSizing" to "border-box", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "width" to "100%", "minHeight" to 0)), "m-segmented-control__thumb" to _pS(_uM("position" to "absolute", "top" to "4rpx", "bottom" to "4rpx", "left" to 0, "zIndex" to 0, "boxSizing" to "border-box", "backgroundColor" to "#ffffff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "pointerEvents" to "none")), "m-segmented-control__item" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "boxSizing" to "border-box", "position" to "relative", "zIndex" to 1, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)", "backgroundColor" to "rgba(0,0,0,0)")), "m-segmented-control__text" to _pS(_uM("lineHeight" to 1.2, "position" to "relative", "zIndex" to 2, "color" to "#334155")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "change" to null, "update:current" to null)
        var props = _nP(_uM("values" to _uM("type" to "Array", "default" to fun(): UTSArray<Any> {
            return _uA()
        }
        ), "current" to _uM("type" to "Number", "default" to 0), "textActiveColor" to _uM("type" to "String", "default" to "#334155"), "activeColor" to _uM("type" to "String", "default" to "#e5edf6\t"), "height" to _uM("type" to "String", "default" to "56rpx"), "size" to _uM("type" to "String", "default" to "28rpx"), "radius" to _uM("type" to "String", "default" to "24rpx"), "disabled" to _uM("type" to "Boolean", "default" to false), "inactiveColor" to _uM("type" to "String", "default" to "#666666"), "backgroundColor" to _uM("type" to "String", "default" to "#f5f5f5"), "customStyle" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "current",
            "textActiveColor",
            "activeColor",
            "height",
            "size",
            "radius",
            "disabled",
            "inactiveColor",
            "backgroundColor",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
