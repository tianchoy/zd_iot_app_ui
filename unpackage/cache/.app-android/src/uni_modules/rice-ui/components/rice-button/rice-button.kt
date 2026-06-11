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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
open class GenUniModulesRiceUiComponentsRiceButtonRiceButton : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var type: String? by `$props`
    open var size: String? by `$props`
    open var text: Any? by `$props`
    open var color: String? by `$props`
    open var darkColor: String? by `$props`
    open var textColor: String? by `$props`
    open var textSize: Any? by `$props`
    open var icon: Any? by `$props`
    open var iconSize: Any? by `$props`
    open var iconColor: String? by `$props`
    open var iconFontFamily: String? by `$props`
    open var plainFill: Boolean by `$props`
    open var plain: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var loading: Boolean by `$props`
    open var loadingSize: Any? by `$props`
    open var loadingText: Any? by `$props`
    open var loadingMode: String? by `$props`
    open var shape: String? by `$props`
    open var width: Any? by `$props`
    open var height: Any? by `$props`
    open var openType: String? by `$props`
    open var formType: String? by `$props`
    open var lang: String? by `$props`
    open var sessionFrom: String? by `$props`
    open var sendMessageTitle: String? by `$props`
    open var sendMessageImg: String? by `$props`
    open var sendMessagePath: String? by `$props`
    open var showMessageCard: String? by `$props`
    open var appParameter: String? by `$props`
    open var to: String? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceButtonRiceButton) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceButtonRiceButton
            val _cache = __ins.renderCache
            val ns = useNamespace("button")
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val btnText = computed(fun(): Any? {
                return if (props.loading && hasStrValue(props.loadingText)) {
                    props.loadingText
                } else {
                    props.text
                }
            }
            )
            val isPlain = computed(fun(): Boolean {
                return props.plain || props.plainFill
            }
            )
            val buttonColor = computed<String?>(fun(): String? {
                return if (isDark.value) {
                    (props.darkColor ?: props.color)
                } else {
                    props.color
                }
            }
            )
            val emitClick = fun(e: UniPointerEvent){
                e.stopPropagation()
                if (props.disabled || props.loading) {
                    return
                }
                if (hasStrValue(props.to)) {
                    uni_navigateTo(NavigateToOptions(url = props.to!!, fail = fun(err){
                        debugWarn("Button", err.errMsg)
                    }
                    ))
                }
                emit("click")
            }
            val _iconSize = computed<Any>(fun(): Any {
                if (hasStrValue(props.iconSize)) {
                    return props.iconSize!!
                }
                return iconSizeTypes[props.size ?: "default"] ?: "16px"
            }
            )
            val _loadingSize = computed<Any>(fun(): Any {
                if (hasStrValue(props.loadingSize)) {
                    return props.loadingSize!!
                }
                return loadingSizeTypes[props.size ?: "default"] ?: "18px"
            }
            )
            val buttonType = computed<String>(fun(): String {
                if (hasStrValue(buttonColor.value)) {
                    return ""
                }
                if (props.type == "info") {
                    return "info"
                }
                return if (isThemeColor(props.type)) {
                    props.type!!
                } else {
                    "default"
                }
            }
            )
            val getTextColor = fun(): String {
                if (hasStrValue(props.textColor)) {
                    return props.textColor!!
                }
                if (hasStrValue(buttonColor.value)) {
                    return if ((isPlain.value && !isGradientColor(buttonColor.value!!))) {
                        buttonColor.value!!
                    } else {
                        ""
                    }
                }
                return ""
            }
            val themeColor = ref("")
            val _iconColor = computed<String>(fun(): String {
                if (hasStrValue(props.iconColor)) {
                    return props.iconColor!!
                }
                val textColor = getTextColor()
                if (textColor != "") {
                    return textColor
                }
                val baseColor = "var(--rice-text-color)"
                if (isPlain.value || buttonType.value == "info" || buttonType.value == "default") {
                    return if (themeColor.value == "") {
                        baseColor
                    } else {
                        themeColor.value
                    }
                }
                return "#f5f5f5"
            }
            )
            fun darken(color: Coloruts, amount: Number = 20): String {
                return color.mix("#141414", amount).toHexString()
            }
            val btnStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                if (hasStrValue(buttonColor.value)) {
                    val color = buttonColor.value!!
                    if (isGradientColor(color)) {
                        css.set("background", color)
                        css.set("border-style", "none")
                    } else {
                        val colorUts = Coloruts(color)
                        css.set("border-color", color)
                        if (!isPlain.value) {
                            css.set("background", color)
                        } else if (props.plainFill) {
                            css.set("background", if (isDark.value) {
                                darken(colorUts, 90)
                            } else {
                                colorUts.tint(90).toHexString()
                            }
                            )
                        }
                    }
                }
                if (props.height != null) {
                    css.set("height", addUnit(props.height!!))
                }
                if (props.width != null) {
                    css.set("width", addUnit(props.width!!))
                }
                return css
            }
            )
            val buttonClass = computed<UTSArray<String>>(fun(): UTSArray<String> {
                val basic = _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.m(props.size),
                    ns.m(props.shape),
                    ns.`is`("disabled", props.disabled)
                )
                if (buttonType.value != "") {
                    val theme = ns.m(if (props.plainFill) {
                        "" + buttonType.value + "--plain-fill"
                    } else {
                        buttonType.value
                    }
                    )
                    basic.push(theme)
                }
                basic.push(ns.`is`("plain", props.plain))
                return basic
            }
            )
            val textStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                val textColor = getTextColor()
                if (textColor != "") {
                    css.set("color", textColor)
                }
                if (props.textSize != null) {
                    css.set("font-size", addUnit(props.textSize!!))
                }
                if (hasStrValue(props.icon) || props.loading) {
                    css.set("margin-left", "4px")
                }
                return css
            }
            )
            val textClass = computed(fun(): UTSArray<String> {
                val basic = _uA(
                    ns.e("text")
                )
                if (buttonType.value != "") {
                    val theme = ns.m(if (isPlain.value) {
                        "" + buttonType.value + "--plain__text"
                    } else {
                        "" + buttonType.value + "__text"
                    }
                    )
                    basic.push(theme)
                }
                if (props.size != null) {
                    basic.push(ns.m("" + props.size!! + "__text"))
                }
                return basic
            }
            )
            val hoverClass = computed(fun(): String {
                if (props.disabled || props.loading) {
                    return "none"
                }
                if (isPlain.value || buttonType.value == "") {
                    return "rice-button--hover"
                }
                return "rice-button--" + buttonType.value + "--hover"
            }
            )
            val buttonRef = shallowRef<UniElement?>(null)
            val getCssVar = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(nextTick())
                        if (buttonType.value == "default" || buttonType.value == "info") {
                            themeColor.value = buttonRef.value?.style?.getPropertyValue("--rice-text-color") ?: ""
                        } else if (isThemeColor(buttonType.value)) {
                            themeColor.value = buttonRef.value?.style?.getPropertyValue("--rice-" + buttonType.value + "-color") ?: ""
                        } else {
                            themeColor.value = buttonRef.value?.style?.getPropertyValue("--rice-text-color-white") ?: ""
                        }
                })
            }
            watch(_uA(
                buttonType,
                fun(): Boolean {
                    return isDark.value
                }
            ), fun(){
                getCssVar()
            }
            )
            onMounted(fun(){
                getCssVar()
            }
            )
            return fun(): Any? {
                val _component_rice_loading = resolveEasyComponent("rice-loading", GenUniModulesRiceUiComponentsRiceLoadingRiceLoadingClass)
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE("view", _uM("class" to _nC(unref(buttonClass)), "style" to _nS(_uA(
                    unref(btnStyle),
                    _ctx.customStyle
                )), "hover-stay-time" to 100, "hover-class" to unref(hoverClass), "ref_key" to "buttonRef", "ref" to buttonRef, "onClick" to withModifiers(emitClick, _uA(
                    "stop"
                ))), _uA(
                    if (isTrue(_ctx.loading)) {
                        _cV(_component_rice_loading, _uM("key" to 0, "color" to unref(_iconColor), "size" to unref(_loadingSize), "mode" to _ctx.loadingMode), null, 8, _uA(
                            "color",
                            "size",
                            "mode"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.icon)) {
                        _cV(_component_rice_icon, _uM("key" to 1, "name" to _ctx.icon, "color" to unref(_iconColor), "size" to unref(_iconSize), "font-family" to _ctx.iconFontFamily), null, 8, _uA(
                            "name",
                            "color",
                            "size",
                            "font-family"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                        return _uA(
                            if (isTrue(unref(hasStrValue)(_ctx.text))) {
                                _cE("text", _uM("key" to 0, "class" to _nC(unref(textClass)), "style" to _nS(unref(textStyle))), _tD(unref(btnText)), 7)
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    )
                ), 14, _uA(
                    "hover-class"
                ))
            }
        }
        var name = "rice-button"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-button" to _pS(_uM("position" to "relative", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 4, "borderTopRightRadius" to 4, "borderBottomRightRadius" to 4, "borderBottomLeftRadius" to 4, "height" to 42, "paddingTop" to 0, "paddingRight" to 15, "paddingBottom" to 0, "paddingLeft" to 15, "boxSizing" to "border-box", "opacity" to 1, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-button-default-border)", "borderRightColor" to "var(--rice-button-default-border)", "borderBottomColor" to "var(--rice-button-default-border)", "borderLeftColor" to "var(--rice-button-default-border)")), "rice-button__text" to _pS(_uM("color" to "var(--rice-text-color-white)", "fontSize" to 14)), "rice-button--square" to _pS(_uM("borderTopLeftRadius" to 0, "borderTopRightRadius" to 0, "borderBottomRightRadius" to 0, "borderBottomLeftRadius" to 0)), "rice-button--round" to _pS(_uM("borderTopLeftRadius" to 990, "borderTopRightRadius" to 990, "borderBottomRightRadius" to 990, "borderBottomLeftRadius" to 990)), "rice-button--hover" to _pS(_uM("opacity" to 0.6)), "rice-button--default-hover" to _pS(_uM("backgroundColor" to "var(--rice-button-default-hover-background)")), "rice-button--disabled" to _pS(_uM("opacity" to 0.6)), "rice-button--large" to _pS(_uM("height" to 50, "paddingTop" to 0, "paddingRight" to 20, "paddingBottom" to 0, "paddingLeft" to 20)), "rice-button--large__text" to _pS(_uM("fontSize" to 14)), "rice-button--small" to _pS(_uM("height" to 32, "paddingTop" to 0, "paddingRight" to 10, "paddingBottom" to 0, "paddingLeft" to 10)), "rice-button--small__text" to _pS(_uM("fontSize" to 12)), "rice-button--mini" to _pS(_uM("height" to 26, "paddingTop" to 0, "paddingRight" to 4, "paddingBottom" to 0, "paddingLeft" to 4)), "rice-button--mini__text" to _pS(_uM("fontSize" to 10)), "rice-button--primary" to _pS(_uM("backgroundColor" to "var(--rice-primary-color)", "borderTopColor" to "var(--rice-primary-color)", "borderRightColor" to "var(--rice-primary-color)", "borderBottomColor" to "var(--rice-primary-color)", "borderLeftColor" to "var(--rice-primary-color)")), "rice-button--primary--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-primary-color-1)", "borderTopColor" to "var(--rice-primary-color)", "borderRightColor" to "var(--rice-primary-color)", "borderBottomColor" to "var(--rice-primary-color)", "borderLeftColor" to "var(--rice-primary-color)")), "rice-button--primary--plain__text" to _pS(_uM("color" to "var(--rice-primary-color)")), "rice-button--primary--hover" to _pS(_uM("backgroundColor" to "var(--rice-primary-color-7)", "borderTopColor" to "var(--rice-primary-color-7)", "borderRightColor" to "var(--rice-primary-color-7)", "borderBottomColor" to "var(--rice-primary-color-7)", "borderLeftColor" to "var(--rice-primary-color-7)")), "rice-button--success" to _pS(_uM("backgroundColor" to "var(--rice-success-color)", "borderTopColor" to "var(--rice-success-color)", "borderRightColor" to "var(--rice-success-color)", "borderBottomColor" to "var(--rice-success-color)", "borderLeftColor" to "var(--rice-success-color)")), "rice-button--success--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-success-color-1)", "borderTopColor" to "var(--rice-success-color)", "borderRightColor" to "var(--rice-success-color)", "borderBottomColor" to "var(--rice-success-color)", "borderLeftColor" to "var(--rice-success-color)")), "rice-button--success--plain__text" to _pS(_uM("color" to "var(--rice-success-color)")), "rice-button--success--hover" to _pS(_uM("backgroundColor" to "var(--rice-success-color-7)", "borderTopColor" to "var(--rice-success-color-7)", "borderRightColor" to "var(--rice-success-color-7)", "borderBottomColor" to "var(--rice-success-color-7)", "borderLeftColor" to "var(--rice-success-color-7)")), "rice-button--warning" to _pS(_uM("backgroundColor" to "var(--rice-warning-color)", "borderTopColor" to "var(--rice-warning-color)", "borderRightColor" to "var(--rice-warning-color)", "borderBottomColor" to "var(--rice-warning-color)", "borderLeftColor" to "var(--rice-warning-color)")), "rice-button--warning--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-warning-color-1)", "borderTopColor" to "var(--rice-warning-color)", "borderRightColor" to "var(--rice-warning-color)", "borderBottomColor" to "var(--rice-warning-color)", "borderLeftColor" to "var(--rice-warning-color)")), "rice-button--warning--plain__text" to _pS(_uM("color" to "var(--rice-warning-color)")), "rice-button--warning--hover" to _pS(_uM("backgroundColor" to "var(--rice-warning-color-7)", "borderTopColor" to "var(--rice-warning-color-7)", "borderRightColor" to "var(--rice-warning-color-7)", "borderBottomColor" to "var(--rice-warning-color-7)", "borderLeftColor" to "var(--rice-warning-color-7)")), "rice-button--error" to _pS(_uM("backgroundColor" to "var(--rice-error-color)", "borderTopColor" to "var(--rice-error-color)", "borderRightColor" to "var(--rice-error-color)", "borderBottomColor" to "var(--rice-error-color)", "borderLeftColor" to "var(--rice-error-color)")), "rice-button--error--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-error-color-1)", "borderTopColor" to "var(--rice-error-color)", "borderRightColor" to "var(--rice-error-color)", "borderBottomColor" to "var(--rice-error-color)", "borderLeftColor" to "var(--rice-error-color)")), "rice-button--error--plain__text" to _pS(_uM("color" to "var(--rice-error-color)")), "rice-button--error--hover" to _pS(_uM("backgroundColor" to "var(--rice-error-color-7)", "borderTopColor" to "var(--rice-error-color-7)", "borderRightColor" to "var(--rice-error-color-7)", "borderBottomColor" to "var(--rice-error-color-7)", "borderLeftColor" to "var(--rice-error-color-7)")), "rice-button--default" to _pS(_uM("backgroundColor" to "var(--rice-button-default-background)", "borderTopColor" to "var(--rice-button-default-border)", "borderRightColor" to "var(--rice-button-default-border)", "borderBottomColor" to "var(--rice-button-default-border)", "borderLeftColor" to "var(--rice-button-default-border)")), "rice-button--default--plain-fill" to _pS(_uM("backgroundColor" to "rgba(0,0,0,0)")), "rice-button--default--plain__text" to _pS(_uM("color" to "var(--rice-text-color)")), "rice-button--default--hover" to _pS(_uM("backgroundColor" to "var(--rice-button-default-hover-background)", "borderTopColor" to "var(--rice-button-default-hover-background)", "borderRightColor" to "var(--rice-button-default-hover-background)", "borderBottomColor" to "var(--rice-button-default-hover-background)", "borderLeftColor" to "var(--rice-button-default-hover-background)")), "rice-button--default__text" to _pS(_uM("color" to "var(--rice-text-color)")), "rice-button--info" to _pS(_uM("backgroundColor" to "var(--rice-button-info-background)", "borderTopColor" to "var(--rice-button-info-background)", "borderRightColor" to "var(--rice-button-info-background)", "borderBottomColor" to "var(--rice-button-info-background)", "borderLeftColor" to "var(--rice-button-info-background)")), "rice-button--info--plain-fill" to _pS(_uM("backgroundColor" to "rgba(0,0,0,0)")), "rice-button--info--plain__text" to _pS(_uM("color" to "var(--rice-text-color)")), "rice-button--info--hover" to _pS(_uM("backgroundColor" to "var(--rice-button-info-hover-background)", "borderTopColor" to "var(--rice-button-info-hover-background)", "borderRightColor" to "var(--rice-button-info-hover-background)", "borderBottomColor" to "var(--rice-button-info-hover-background)", "borderLeftColor" to "var(--rice-button-info-hover-background)")), "rice-button--info__text" to _pS(_uM("color" to "var(--rice-text-color)")), "rice-button--plain" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "getphonenumber" to null, "getrealtimephonenumber" to null, "getuserinfo" to null, "chooseavatar" to null, "launchapp" to null, "agreeprivacyauthorization" to null, "opensetting" to null, "error" to null, "contact" to null)
        var props = _nP(_uM("type" to _uM("type" to "String", "required" to false), "size" to _uM("type" to "String", "required" to false), "text" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "color" to _uM("type" to "String", "required" to false), "darkColor" to _uM("type" to "String", "required" to false), "textColor" to _uM("type" to "String", "required" to false), "textSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "icon" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "iconSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "iconColor" to _uM("type" to "String", "required" to false), "iconFontFamily" to _uM("type" to "String", "required" to false), "plainFill" to _uM("type" to "Boolean", "required" to false, "default" to false), "plain" to _uM("type" to "Boolean", "required" to false, "default" to false), "disabled" to _uM("type" to "Boolean", "required" to false, "default" to false), "loading" to _uM("type" to "Boolean", "required" to false, "default" to false), "loadingSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "loadingText" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "loadingMode" to _uM("type" to "String", "required" to false), "shape" to _uM("type" to "String", "required" to false), "width" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "height" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "openType" to _uM("type" to "String", "required" to false), "formType" to _uM("type" to "String", "required" to false), "lang" to _uM("type" to "String", "required" to false), "sessionFrom" to _uM("type" to "String", "required" to false), "sendMessageTitle" to _uM("type" to "String", "required" to false), "sendMessageImg" to _uM("type" to "String", "required" to false), "sendMessagePath" to _uM("type" to "String", "required" to false), "showMessageCard" to _uM("type" to "String", "required" to false), "appParameter" to _uM("type" to "String", "required" to false), "to" to _uM("type" to "String", "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "plainFill",
            "plain",
            "disabled",
            "loading",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
