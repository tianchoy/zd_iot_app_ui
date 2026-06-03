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
open class GenUniModulesMUnixComponentsMDivMDiv : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "m-div",
            _ctx.getDividerClass
        )), "style" to _nS(_ctx.rootStyle)), _uA(
            if (_ctx.contentPosition !== "center") {
                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                    "m-div__content",
                    _uA(
                        "m-div__content--" + _ctx.contentPosition,
                        if (_ctx.textClass != "") {
                            _ctx.textClass
                        } else {
                            ""
                        }
                    )
                )), "style" to _nS(_uM("color" to _ctx.textColor, "font-size" to _ctx.resolvedFontSize))), _uA(
                    renderSlot(_ctx.`$slots`, "default"),
                    if (isTrue(_ctx.text)) {
                        _cE("text", _uM("key" to 0), _tD(_ctx.text), 1)
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            } else {
                _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                    "m-div__content m-div__content--center",
                    _uA(
                        if (_ctx.textClass != "") {
                            _ctx.textClass
                        } else {
                            ""
                        }
                    )
                )), "style" to _nS(_uM("color" to _ctx.textColor, "font-size" to _ctx.resolvedFontSize))), _uA(
                    renderSlot(_ctx.`$slots`, "default"),
                    if (isTrue(_ctx.text)) {
                        _cE("text", _uM("key" to 0), _tD(_ctx.text), 1)
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        ), 6)
    }
    open var backgroundColor: String by `$props`
    open var textColor: String by `$props`
    open var fontSize: Any by `$props`
    open var height: String by `$props`
    open var contentPosition: String by `$props`
    open var text: String by `$props`
    open var textClass: String by `$props`
    open var hasTextContent: Boolean by `$data`
    open var rootStyle: UTSJSONObject by `$data`
    open var getDividerClass: String by `$data`
    open var resolvedFontSize: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("hasTextContent" to computed<Boolean>(fun(): Boolean {
            val t = this.text
            if (t != null && ("" + t).length > 0) {
                return true
            }
            val slot = this.`$slots`["default"]
            return slot != null
        }
        ), "rootStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            if (this.hasTextContent) {
                val lineColor = if (this.backgroundColor != null && ("" + this.backgroundColor).length > 0) {
                    this.backgroundColor
                } else {
                    "#e4e7ed"
                }
                val style: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-div/m-div.uvue", 72, 11))
                style["borderTopWidth"] = "1rpx"
                style["borderTopStyle"] = "solid"
                style["borderTopColor"] = lineColor
                style["minHeight"] = "72rpx"
                style["height"] = "auto"
                style["backgroundColor"] = "transparent"
                style["boxSizing"] = "border-box"
                return style
            }
            val style: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-div/m-div.uvue", 82, 10))
            if (this.backgroundColor != null && ("" + this.backgroundColor).length > 0) {
                style["backgroundColor"] = this.backgroundColor
            }
            style["height"] = this.height
            return style
        }
        ), "getDividerClass" to computed<String>(fun(): String {
            val classes = _uA(
                "m-div"
            ) as UTSArray<String>
            if (this.hasTextContent) {
                classes.push("m-div--has-text")
            }
            return classes.join(" ")
        }
        ), "resolvedFontSize" to computed<String>(fun(): String {
            return toCssLength(this.fontSize as Any)
        }
        ))
    }
    companion object {
        var name = "mDiv"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-div" to _uM("" to _uM("position" to "relative", "boxSizing" to "border-box", "backgroundColor" to "#e4e7ed"), ".m-div--has-text" to _uM("backgroundColor" to "rgba(0,0,0,0)")), "m-div__content" to _uM(".m-div " to _uM("position" to "absolute", "backgroundColor" to "#ffffff", "paddingTop" to 0, "paddingRight" to "16rpx", "paddingBottom" to 0, "paddingLeft" to "16rpx", "top" to "50%", "color" to "#909399"), ".m-div .m-div__content--left" to _uM("left" to "20rpx", "transform" to "translateY(-50%)"), ".m-div .m-div__content--center" to _uM("left" to "50%", "transform" to "translate(-50%, -50%)"), ".m-div .m-div__content--right" to _uM("right" to "20rpx", "transform" to "translateY(-50%)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("backgroundColor" to _uM("type" to "String", "default" to ""), "textColor" to _uM("type" to "String", "default" to "#909399"), "fontSize" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 28), "height" to _uM("type" to "String", "default" to "1rpx"), "contentPosition" to _uM("type" to "String", "default" to "center"), "text" to _uM("type" to "String", "default" to ""), "textClass" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "backgroundColor",
            "textColor",
            "fontSize",
            "height",
            "contentPosition",
            "text",
            "textClass"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
