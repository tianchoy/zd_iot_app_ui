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
open class GenUniModulesMUnixComponentsMButtonMButton : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_m_loading = resolveEasyComponent("m-loading", GenUniModulesMUnixComponentsMLoadingMLoadingClass)
        return _cE("view", _uM("class" to _nC(_uA(
            "m-button__wrap",
            _uA(
                if ((_ctx.width === "100%" || !(_ctx.width != "") || _ctx.width === true) && (!(_ctx.btnSize != "") || _ctx.btnSize === true)) {
                    "m-btn__flex-1"
                } else {
                    ""
                }
                ,
                _ctx.getShapeClass(_ctx.shape, _ctx.plain),
                if (!_ctx.disabled) {
                    "m-button__hover"
                } else {
                    ""
                }
            )
        )), "style" to _nS(_uM("width" to _ctx.getWidth, "height" to _ctx.getHeight, "margin" to _ctx.margin))), _uA(
            _cE("button", _uM("class" to _nC(_uA(
                "m-btn",
                _uA(
                    if (_ctx.plain) {
                        "m-" + _ctx.type + "-outline"
                    } else {
                        "m-btn-" + (if (_ctx.type != "") {
                            _ctx.type
                        } else {
                            "primary"
                        }
                        )
                    }
                    ,
                    _ctx.getDisabledClass(_ctx.disabled, _ctx.type, _ctx.plain),
                    _ctx.getShapeClass(_ctx.shape, _ctx.plain),
                    if (_ctx.bold) {
                        "m-text-bold"
                    } else {
                        ""
                    }
                    ,
                    if (_ctx.link) {
                        "m-btn__link"
                    } else {
                        ""
                    }
                    ,
                    if (_ctx.loading) {
                        "m-btn--loading"
                    } else {
                        ""
                    }
                )
            )), "style" to _nS(_uM("width" to _ctx.getWidth, "height" to _ctx.getHeight, "lineHeight" to _ctx.getHeight, "font-size" to _ctx.fontSizeCss, "background" to _ctx.getBgColor(_ctx.type, _ctx.plain), "color" to _ctx.getColor(_ctx.type, _ctx.plain), "boxShadow" to if (_ctx.shadow) {
                _ctx.getShadow(_ctx.type, _ctx.plain)
            } else {
                "none"
            }
            )), "form-type" to _ctx.formType, "disabled" to _ctx.disabled, "onClick" to _ctx.handleClick), _uA(
                _cE("view", _uM("class" to "m-btn__inner", "style" to _nS(_uM("font-size" to _ctx.fontSizeCss))), _uA(
                    if (isTrue(_ctx.loading)) {
                        _cV(_component_m_loading, _uM("key" to 0, "text" to "", "size" to "14rpx", "color" to _ctx.loadingSpinnerColor), null, 8, _uA(
                            "color"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    renderSlot(_ctx.`$slots`, "default")
                ), 4)
            ), 14, _uA(
                "form-type",
                "disabled",
                "onClick"
            )),
            if (isTrue(!_ctx.link && _ctx.plain)) {
                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                    "m-button__border",
                    _uA(
                        _ctx.getShapeClass(_ctx.shape, _ctx.plain),
                        _ctx.getDisabledClass(_ctx.disabled, _ctx.type, _ctx.plain)
                    )
                )), "style" to _nS(_uM("borderColor" to _ctx.getBgColor(_ctx.type)))), null, 6)
            } else {
                _cC("v-if", true)
            }
        ), 6)
    }
    open var type: Any? by `$props`
    open var shadow: Boolean by `$props`
    open var width: Any? by `$props`
    open var height: Any? by `$props`
    open var btnSize: Any? by `$props`
    open var size: Any? by `$props`
    open var bold: Boolean by `$props`
    open var margin: Any? by `$props`
    open var shape: Any? by `$props`
    open var plain: Boolean by `$props`
    open var link: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var disabledGray: Boolean by `$props`
    open var loading: Boolean by `$props`
    open var formType: Any? by `$props`
    open var openType: Any? by `$props`
    open var appParameter: Any? by `$props`
    open var index: Any? by `$props`
    open var preventClick: Boolean by `$props`
    open var time: Number by `$data`
    open var getWidth: String by `$data`
    open var getHeight: String by `$data`
    open var getSize: Number by `$data`
    open var fontSizeCss: String by `$data`
    open var loadingSpinnerColor: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("time" to 0, "getWidth" to computed<String>(fun(): String {
            var width = this.width
            val bs = this.btnSize as String
            if (bs.length > 0) {
                if (bs === "medium") {
                    width = "368rpx"
                } else if (bs === "small") {
                    width = "240rpx"
                } else if (bs === "mini") {
                    width = "116rpx"
                } else if (bs === "tiny") {
                    width = "112rpx"
                }
            }
            return width
        }
        ), "getHeight" to computed<String>(fun(): String {
            var height = this.height
            if (height.length === 0) {
                height = "96rpx"
            }
            val bs = this.btnSize as String
            if (bs.length > 0) {
                if (bs === "medium") {
                    height = "80rpx"
                } else if (bs === "small") {
                    height = "80rpx"
                } else if (bs === "mini") {
                    height = "64rpx"
                } else if (bs === "tiny") {
                    height = "48rpx"
                }
            }
            return height
        }
        ), "getSize" to computed<Number>(fun(): Number {
            val sz = this.size
            if (UTSAndroid.`typeof`(sz) === "number") {
                if (sz as Number !== 0) {
                    return sz as Number
                }
            } else {
                val s = ("" + (sz as String)).trim()
                if (s.length > 0) {
                    val n = parseInt(s, 10)
                    if (!isNaN(n) && n !== 0) {
                        return n
                    }
                }
            }
            val bs = ("" + this.btnSize).trim().toLowerCase()
            if (bs === "large") {
                return 34
            }
            if (bs === "medium") {
                return 30
            }
            if (bs === "small") {
                return 26
            }
            if (bs === "mini") {
                return 18
            }
            if (bs === "tiny") {
                return 12
            }
            return 28
        }
        ), "fontSizeCss" to computed<String>(fun(): String {
            return toCssLength(this.getSize as Any)
        }
        ), "loadingSpinnerColor" to computed<String>(fun(): String {
            return this.getColor(this.type as String, this.plain as Boolean)
        }
        ))
    }
    open var hexToRGB = ::gen_hexToRGB_fn
    open fun gen_hexToRGB_fn(reassignedHex: String) {
        var hex = reassignedHex
        if (hex.length === 4) {
            var text = hex.substring(1, 4)
            hex = "#" + text + text
        }
        var result = UTSRegExp("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})\$", "i").exec(hex)
        return if (isTruthy(result)) {
            _uO("r" to parseInt(result[1], 16), "g" to parseInt(result[2], 16), "b" to parseInt(result[3], 16))
        } else {
            _uO()
        }
    }
    open var getColorByType = ::gen_getColorByType_fn
    open fun gen_getColorByType_fn(type: String, isText: Boolean?, plain: Boolean?): Any {
        var color: Any = ""
        val colors: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("colors", "uni_modules/m-unix/components/m-button/m-button.uvue", 252, 10), "primary" to "#5677fc", "white" to "#dbe5f0", "danger" to "#EB0909", "warning" to "#ff7900", "green" to "#07c160", "blue" to "#007aff", "gray" to "#bfbfbf", "black" to "#334155", "brown" to "#ac9157", "gray-primary" to "#f2f2f2", "gray-danger" to "#f2f2f2", "gray-warning" to "#f2f2f2", "gray-green" to "#f2f2f2")
        if (isTruthy(isText)) {
            if (type != "" && type.indexOf("gray-").inv() != 0) {
                val tp = type.replace("gray-", "")
                if (resolveInOperator(colors, tp)) {
                    color = colors[tp]
                }
            } else if (type === "white") {
                color = "#334155"
            } else {
                if (isTruthy(plain)) {
                    color = colors[type]
                } else {
                    color = "#fff"
                }
            }
        } else {
            color = if (isTruthy(colors[type])) {
                colors[type]
            } else {
                colors["primary"]
            }
        }
        return color
    }
    open var getShadow = ::gen_getShadow_fn
    open fun gen_getShadow_fn(type: String, plain: Boolean): String {
        val color = this.getColorByType(type)
        if (plain || !isTruthy(color)) {
            return "none"
        }
        val rgb = this.hexToRGB(color)
        return "0 10rpx 14rpx 0 rgba(" + rgb["r"] + ", " + rgb["g"] + ", " + rgb["b"] + ", 0.2)"
    }
    open var getBgColor = ::gen_getBgColor_fn
    open fun gen_getBgColor_fn(type: String, plain: Boolean): Any {
        return if (plain) {
            "transparent"
        } else {
            this.getColorByType(type)
        }
    }
    open var getColor = ::gen_getColor_fn
    open fun gen_getColor_fn(type: String, plain: Boolean): Any {
        return this.getColorByType(type, true, plain)
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn() {
        if (this.disabled) {
            return
        }
        if (this.loading) {
            return
        }
        if (this.preventClick) {
            if (Date().getTime() - this.time <= 200) {
                return
            }
            this.time = Date().getTime()
            setTimeout(fun(){
                this.time = 0
            }
            , 200)
        }
        this.`$emit`("click", _uO("index" to Number(this.index)))
    }
    open fun bindgetuserinfo({ detail =_uO()  } = _uO()) {
        this.`$emit`("getuserinfo", detail)
    }
    open fun bindcontact({ detail =_uO()  } = _uO()) {
        this.`$emit`("contact", detail)
    }
    open fun bindgetphonenumber({ detail =_uO()  } = _uO()) {
        this.`$emit`("getphonenumber", detail)
    }
    open fun binderror({ detail =_uO()  } = _uO()) {
        this.`$emit`("error", detail)
    }
    open fun bindchooseavatar({ detail =_uO()  } = _uO()) {
        this.`$emit`("chooseavatar", detail)
    }
    open fun bindlaunchapp({ detail =_uO()  } = _uO()) {
        this.`$emit`("launchapp", detail)
    }
    open var getDisabledClass = ::gen_getDisabledClass_fn
    open fun gen_getDisabledClass_fn(disabled: Boolean, type: String, plain: Boolean): String {
        var className = ""
        if (disabled && type != "white" && type.indexOf("-") == -1) {
            var classVal = if (this.disabledGray) {
                "m-gray-disabled"
            } else {
                "m-dark-disabled"
            }
            className = if (plain) {
                "m-dark-disabled-outline"
            } else {
                classVal
            }
        }
        return className
    }
    open var getShapeClass = ::gen_getShapeClass_fn
    open fun gen_getShapeClass_fn(shape: String, plain: Boolean): String {
        var className = ""
        if (shape == "circle") {
            className = if (plain) {
                "m-outline-fillet"
            } else {
                "m-fillet"
            }
        } else if (shape == "rightAngle") {
            className = if (plain) {
                "m-outline-rightAngle"
            } else {
                "m-rightAngle"
            }
        }
        return className
    }
    open var getHoverClass = ::gen_getHoverClass_fn
    open fun gen_getHoverClass_fn(disabled: Boolean, type: String, plain: Boolean): String {
        var className = ""
        if (!disabled) {
            className = if (plain) {
                "m-outline-hover"
            } else {
                "m-" + (if (type != "") {
                    type
                } else {
                    "primary"
                }
                ) + "-hover"
            }
        }
        return className
    }
    companion object {
        var name = "mButton"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-button__wrap" to _pS(_uM("position" to "relative", "overflow" to "visible", "boxSizing" to "border-box")), "m-btn" to _pS(_uM("width" to "100%", "position" to "relative", "!borderTopWidth" to 0, "!borderRightWidth" to 0, "!borderBottomWidth" to 0, "!borderLeftWidth" to 0, "!borderTopStyle" to "none", "!borderRightStyle" to "none", "!borderBottomStyle" to "none", "!borderLeftStyle" to "none", "!borderTopColor" to "#000000", "!borderRightColor" to "#000000", "!borderBottomColor" to "#000000", "!borderLeftColor" to "#000000", "boxSizing" to "border-box", "borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx", "paddingLeft" to 0, "paddingRight" to 0, "overflow" to "visible", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopWidth::after" to 0, "borderRightWidth::after" to 0, "borderBottomWidth::after" to 0, "borderLeftWidth::after" to 0, "borderTopStyle::after" to "none", "borderRightStyle::after" to "none", "borderBottomStyle::after" to "none", "borderLeftStyle::after" to "none", "borderTopColor::after" to "#000000", "borderRightColor::after" to "#000000", "borderBottomColor::after" to "#000000", "borderLeftColor::after" to "#000000")), "m-btn__inner" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "width" to "100%")), "m-btn--loading" to _pS(_uM("pointerEvents" to "none")), "m-btn__flex-1" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "m-button__border" to _pS(_uM("position" to "absolute", "left" to 0, "top" to 0, "right" to 0, "bottom" to 0, "width" to "100%", "height" to "100%", "boxSizing" to "border-box", "borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)", "pointerEvents" to "none")), "m-text-bold" to _pS(_uM("fontWeight" to "bold")), "m-dark-disabled" to _pS(_uM("!opacity" to 0.6, "!color" to "#fafbfc")), "m-dark-disabled-outline" to _pS(_uM("!opacity" to 0.5)), "m-gray-disabled" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#f3f3f3", "!color" to "#919191", "boxShadow" to "none")), "m-fillet" to _pS(_uM("!borderTopLeftRadius" to "220rpx", "!borderTopRightRadius" to "220rpx", "!borderBottomRightRadius" to "220rpx", "!borderBottomLeftRadius" to "220rpx", "!borderTopLeftRadius::after" to "220rpx", "!borderTopRightRadius::after" to "220rpx", "!borderBottomRightRadius::after" to "220rpx", "!borderBottomLeftRadius::after" to "220rpx")), "m-outline-fillet" to _pS(_uM("!borderTopLeftRadius" to "220rpx", "!borderTopRightRadius" to "220rpx", "!borderBottomRightRadius" to "220rpx", "!borderBottomLeftRadius" to "220rpx", "!borderTopLeftRadius::after" to "220rpx", "!borderTopRightRadius::after" to "220rpx", "!borderBottomRightRadius::after" to "220rpx", "!borderBottomLeftRadius::after" to "220rpx")), "m-rightAngle" to _pS(_uM("!borderTopLeftRadius" to 0, "!borderTopRightRadius" to 0, "!borderBottomRightRadius" to 0, "!borderBottomLeftRadius" to 0, "!borderTopLeftRadius::after" to 0, "!borderTopRightRadius::after" to 0, "!borderBottomRightRadius::after" to 0, "!borderBottomLeftRadius::after" to 0)), "m-outline-rightAngle" to _pS(_uM("!borderTopLeftRadius" to 0, "!borderTopRightRadius" to 0, "!borderBottomRightRadius" to 0, "!borderBottomLeftRadius" to 0, "!borderTopLeftRadius::after" to 0, "!borderTopRightRadius::after" to 0, "!borderBottomRightRadius::after" to 0, "!borderBottomLeftRadius::after" to 0)), "m-btn__link" to _pS(_uM("!borderTopWidth::after" to 0, "!borderRightWidth::after" to 0, "!borderBottomWidth::after" to 0, "!borderLeftWidth::after" to 0, "!borderTopStyle::after" to "none", "!borderRightStyle::after" to "none", "!borderBottomStyle::after" to "none", "!borderLeftStyle::after" to "none", "!borderTopColor::after" to "#000000", "!borderRightColor::after" to "#000000", "!borderBottomColor::after" to "#000000", "!borderLeftColor::after" to "#000000")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "getuserinfo" to null, "contact" to null, "getphonenumber" to null, "error" to null, "chooseavatar" to null, "launchapp" to null)
        var props = _nP(_uM("type" to _uM("default" to "primary"), "shadow" to _uM("type" to "Boolean", "default" to false), "width" to _uM("default" to "100%"), "height" to _uM("default" to ""), "btnSize" to _uM("default" to ""), "size" to _uM("default" to 0), "bold" to _uM("type" to "Boolean", "default" to false), "margin" to _uM("default" to "0"), "shape" to _uM("default" to "square"), "plain" to _uM("type" to "Boolean", "default" to false), "link" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "disabledGray" to _uM("type" to "Boolean", "default" to false), "loading" to _uM("type" to "Boolean", "default" to false), "formType" to _uM("default" to ""), "openType" to _uM("default" to ""), "appParameter" to _uM("default" to ""), "index" to _uM("default" to 0), "preventClick" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "type",
            "shadow",
            "width",
            "height",
            "btnSize",
            "size",
            "bold",
            "margin",
            "shape",
            "plain",
            "link",
            "disabled",
            "disabledGray",
            "loading",
            "formType",
            "openType",
            "appParameter",
            "index",
            "preventClick"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
