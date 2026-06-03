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
open class GenUniModulesMUnixComponentsMLoadingMLoading : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "m-loading",
            _uM("m-loading--full" to _ctx.full)
        ))), _uA(
            _cE("view", _uM("class" to _nC(_uA(
                "m-loading__spinner",
                _ctx.animClass
            )), "style" to _nS(_ctx.spinnerSizeStyle)), _uA(
                _cE(Fragment, null, RenderHelpers.renderList(_ctx.dotKeys, fun(dot, __key, __index, _cached): Any {
                    return _cE("text", _uM("key" to dot, "class" to "m-loading__dot", "style" to _nS(_ctx.dotItemStyle(dot))), null, 4)
                }
                ), 128)
            ), 6),
            if (isTrue(_ctx.text)) {
                _cE("text", _uM("key" to 0, "class" to "m-loading__text", "style" to _nS(_ctx.textStyle)), _tD(_ctx.text), 5)
            } else {
                _cC("v-if", true)
            }
        ), 2)
    }
    open var text: String by `$props`
    open var color: String by `$props`
    open var full: Boolean by `$props`
    open var anim: Boolean by `$props`
    open var size: String by `$props`
    open var dotKeys: UTSArray<Number> by `$data`
    open var animClass: String by `$data`
    open var hasCustomDotSize: Boolean by `$data`
    open var spinnerSizeStyle: UTSJSONObject by `$data`
    open var dotSizeStyle: UTSJSONObject by `$data`
    open var textStyle: UTSJSONObject by `$data`
    open var dotGapStyle: UTSJSONObject by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("dotKeys" to _uA<Number>(1, 2, 3), "animClass" to computed<String>(fun(): String {
            return if (this.anim) {
                "m-loading__spinner--anim"
            } else {
                ""
            }
        }
        ), "hasCustomDotSize" to computed<Boolean>(fun(): Boolean {
            val raw = (this.size as String).trim()
            if (raw.length === 0) {
                return false
            }
            val n = parseCssNumber(toCssLength(this.size as String))
            return n > 0
        }
        ), "spinnerSizeStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            if (!this.hasCustomDotSize) {
                return _uO()
            }
            val normalized = toCssLength(this.size as String)
            val n = parseCssNumber(normalized)
            val nl = normalized.length
            var unit = "rpx"
            if (nl >= 3 && normalized.substring(nl - 3) === "rpx") {
                unit = "rpx"
            } else if (nl >= 2 && normalized.substring(nl - 2) === "px") {
                unit = "px"
            }
            val h = Math.round(n * 2.5)
            return _uO("height" to (h + unit))
        }
        ), "dotSizeStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val style: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-loading/m-loading.uvue", 78, 10), "backgroundColor" to this.color)
            if (!this.hasCustomDotSize) {
                return style
            }
            val w = toCssLength(this.size as String)
            style["width"] = w
            style["height"] = w
            return style
        }
        ), "textStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            return _uO("color" to this.color)
        }
        ), "dotGapStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            if (!this.hasCustomDotSize) {
                return _uO("marginLeft" to "16rpx")
            }
            val normalized = toCssLength(this.size as String)
            val n = parseCssNumber(normalized)
            val nl = normalized.length
            var unit = "rpx"
            if (nl >= 3 && normalized.substring(nl - 3) === "rpx") {
                unit = "rpx"
            } else if (nl >= 2 && normalized.substring(nl - 2) === "px") {
                unit = "px"
            }
            val g = Math.round(n * 0.5)
            return _uO("marginLeft" to (g + unit))
        }
        ))
    }
    open var dotItemStyle = ::gen_dotItemStyle_fn
    open fun gen_dotItemStyle_fn(dot: Number): UTSJSONObject {
        val base = this.dotSizeStyle as UTSJSONObject
        if (dot <= 1) {
            return base
        }
        val gapObj = this.dotGapStyle as UTSJSONObject
        val ml = gapObj["marginLeft"]
        val merged: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("merged", "uni_modules/m-unix/components/m-loading/m-loading.uvue", 123, 10), "width" to base["width"], "height" to base["height"], "backgroundColor" to base["backgroundColor"], "marginLeft" to ml)
        return merged
    }
    companion object {
        var name = "mLoading"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-loading" to _uM("" to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center"), ".m-loading--full" to _uM("position" to "fixed", "top" to 0, "left" to 0, "right" to 0, "bottom" to 0, "zIndex" to 999, "backgroundColor" to "rgba(255,255,255,0.8)")), "m-loading__spinner" to _uM(".m-loading " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "height" to "40rpx")), "m-loading__dot" to _uM(".m-loading .m-loading__spinner " to _uM("width" to "16rpx", "height" to "16rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%")), "m-loading__text" to _uM(".m-loading " to _uM("marginTop" to "16rpx", "fontSize" to "28rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("text" to _uM("type" to "String", "default" to "加载中..."), "color" to _uM("type" to "String", "default" to "#c0c4cc"), "full" to _uM("type" to "Boolean", "default" to false), "anim" to _uM("type" to "Boolean", "default" to true), "size" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "text",
            "color",
            "full",
            "anim",
            "size"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
