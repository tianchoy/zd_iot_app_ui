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
open class GenUniModulesMUnixComponentsMTagMTag : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
        return _cE("view", _uM("class" to _nC(_uA(
            "m-tag",
            _uA(
                "m-tag--" + _ctx.type,
                "m-tag--" + _ctx.size,
                _uM("m-tag--plain" to _ctx.plain),
                _uM("m-tag--round" to _ctx.round),
                _uM("m-tag--mark" to _ctx.mark),
                _uM("m-tag--disabled" to _ctx.disabled)
            )
        )), "style" to _nS(_ctx.mergedCustomStyle), "onClick" to _ctx.handleClick), _uA(
            renderSlot(_ctx.`$slots`, "default"),
            if (isTrue(_ctx.text)) {
                _cE("text", _uM("key" to 0, "class" to "m-tag__text"), _tD(_ctx.text), 1)
            } else {
                _cC("v-if", true)
            }
            ,
            if (isTrue(_ctx.closable)) {
                _cV(_component_m_icon, _uM("key" to 1, "class" to "m-tag__close", "name" to "close", "size" to _ctx.closeIconSize, "color" to _ctx.closeIconColor, "onClick" to withModifiers(_ctx.handleClose, _uA(
                    "stop"
                ))), null, 8, _uA(
                    "size",
                    "color",
                    "onClick"
                ))
            } else {
                _cC("v-if", true)
            }
        ), 14, _uA(
            "onClick"
        ))
    }
    open var type: String by `$props`
    open var size: String by `$props`
    open var text: String by `$props`
    open var plain: Boolean by `$props`
    open var round: Boolean by `$props`
    open var mark: Boolean by `$props`
    open var closable: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var color: String by `$props`
    open var bgColor: String by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var mergedCustomStyle: UTSJSONObject by `$data`
    open var closeIconSize: String by `$data`
    open var closeIconColor: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("mergedCustomStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val style: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-tag/m-tag.uvue", 93, 10))
            if (this.color !== "") {
                style["color"] = this.color
            }
            if (this.bgColor !== "") {
                style["backgroundColor"] = this.bgColor
            }
            Object.assign(style, this.customStyle)
            return style
        }
        ), "closeIconSize" to computed<String>(fun(): String {
            if (this.size === "mini") {
                return "24rpx"
            }
            if (this.size === "small") {
                return "28rpx"
            }
            if (this.size === "large") {
                return "36rpx"
            }
            return "32rpx"
        }
        ), "closeIconColor" to computed<String>(fun(): String {
            if (this.color !== "") {
                return this.color
            }
            if (this.plain) {
                if (this.type === "primary") {
                    return "#409eff"
                }
                if (this.type === "success") {
                    return "#67c23a"
                }
                if (this.type === "warning") {
                    return "#e6a23c"
                }
                if (this.type === "danger") {
                    return "#f56c6c"
                }
                if (this.type === "info") {
                    return "#909399"
                }
                return "#606266"
            }
            if (this.type === "default") {
                return "#606266"
            }
            return "#ffffff"
        }
        ))
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn(e: Any) {
        if (!this.disabled) {
            this.`$emit`("click", e)
        }
    }
    open var handleClose = ::gen_handleClose_fn
    open fun gen_handleClose_fn(e: Any) {
        if (!this.disabled) {
            this.`$emit`("close", e)
        }
    }
    companion object {
        var name = "mTag"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-tag" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "boxSizing" to "border-box", "paddingTop" to "8rpx", "paddingRight" to "16rpx", "paddingBottom" to "8rpx", "paddingLeft" to "16rpx", "lineHeight" to 1, "borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx"), ".m-tag--large" to _uM("fontSize" to "32rpx", "paddingTop" to "16rpx", "paddingRight" to "24rpx", "paddingBottom" to "16rpx", "paddingLeft" to "24rpx"), ".m-tag--medium" to _uM("fontSize" to "28rpx", "paddingTop" to "12rpx", "paddingRight" to "20rpx", "paddingBottom" to "12rpx", "paddingLeft" to "20rpx"), ".m-tag--small" to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "14rpx", "paddingBottom" to "6rpx", "paddingLeft" to "14rpx"), ".m-tag--mini" to _uM("fontSize" to "20rpx", "paddingTop" to "4rpx", "paddingRight" to "10rpx", "paddingBottom" to "4rpx", "paddingLeft" to "10rpx"), ".m-tag--primary" to _uM("backgroundColor" to "#409eff", "color" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#409eff", "borderRightColor" to "#409eff", "borderBottomColor" to "#409eff", "borderLeftColor" to "#409eff"), ".m-tag--success" to _uM("backgroundColor" to "#67c23a", "color" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#67c23a", "borderRightColor" to "#67c23a", "borderBottomColor" to "#67c23a", "borderLeftColor" to "#67c23a"), ".m-tag--warning" to _uM("backgroundColor" to "#e6a23c", "color" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e6a23c", "borderRightColor" to "#e6a23c", "borderBottomColor" to "#e6a23c", "borderLeftColor" to "#e6a23c"), ".m-tag--danger" to _uM("backgroundColor" to "#f56c6c", "color" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#f56c6c", "borderRightColor" to "#f56c6c", "borderBottomColor" to "#f56c6c", "borderLeftColor" to "#f56c6c"), ".m-tag--info" to _uM("backgroundColor" to "#909399", "color" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#909399", "borderRightColor" to "#909399", "borderBottomColor" to "#909399", "borderLeftColor" to "#909399"), ".m-tag--default" to _uM("backgroundColor" to "#f5f7fa", "color" to "#606266", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dcdfe6", "borderRightColor" to "#dcdfe6", "borderBottomColor" to "#dcdfe6", "borderLeftColor" to "#dcdfe6"), ".m-tag--plain" to _uM("!backgroundColor" to "rgba(0,0,0,0)"), ".m-tag--plain.m-tag--primary" to _uM("color" to "#409eff", "borderTopColor" to "#409eff", "borderRightColor" to "#409eff", "borderBottomColor" to "#409eff", "borderLeftColor" to "#409eff"), ".m-tag--plain.m-tag--success" to _uM("color" to "#67c23a", "borderTopColor" to "#67c23a", "borderRightColor" to "#67c23a", "borderBottomColor" to "#67c23a", "borderLeftColor" to "#67c23a"), ".m-tag--plain.m-tag--warning" to _uM("color" to "#e6a23c", "borderTopColor" to "#e6a23c", "borderRightColor" to "#e6a23c", "borderBottomColor" to "#e6a23c", "borderLeftColor" to "#e6a23c"), ".m-tag--plain.m-tag--danger" to _uM("color" to "#f56c6c", "borderTopColor" to "#f56c6c", "borderRightColor" to "#f56c6c", "borderBottomColor" to "#f56c6c", "borderLeftColor" to "#f56c6c"), ".m-tag--plain.m-tag--info" to _uM("color" to "#909399", "borderTopColor" to "#909399", "borderRightColor" to "#909399", "borderBottomColor" to "#909399", "borderLeftColor" to "#909399"), ".m-tag--plain.m-tag--default" to _uM("color" to "#606266", "borderTopColor" to "#dcdfe6", "borderRightColor" to "#dcdfe6", "borderBottomColor" to "#dcdfe6", "borderLeftColor" to "#dcdfe6"), ".m-tag--round" to _uM("borderTopLeftRadius" to "100rpx", "borderTopRightRadius" to "100rpx", "borderBottomRightRadius" to "100rpx", "borderBottomLeftRadius" to "100rpx"), ".m-tag--mark" to _uM("borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000"), ".m-tag--disabled" to _uM("opacity" to 0.5)), "m-tag__text" to _uM(".m-tag " to _uM("lineHeight" to 1, "fontSize" to "24rpx", "color" to "#606266")), "m-tag__close" to _uM(".m-tag " to _uM("marginLeft" to "8rpx", "flexShrink" to 0, "opacity" to 0.85)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "close" to null)
        var props = _nP(_uM("type" to _uM("type" to "String", "default" to "default"), "size" to _uM("type" to "String", "default" to "medium"), "text" to _uM("type" to "String", "default" to ""), "plain" to _uM("type" to "Boolean", "default" to false), "round" to _uM("type" to "Boolean", "default" to false), "mark" to _uM("type" to "Boolean", "default" to false), "closable" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "color" to _uM("type" to "String", "default" to ""), "bgColor" to _uM("type" to "String", "default" to ""), "customStyle" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "type",
            "size",
            "text",
            "plain",
            "round",
            "mark",
            "closable",
            "disabled",
            "color",
            "bgColor",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
