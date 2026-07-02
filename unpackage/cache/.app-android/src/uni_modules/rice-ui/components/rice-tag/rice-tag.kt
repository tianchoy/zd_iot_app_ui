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
open class GenUniModulesRiceUiComponentsRiceTagRiceTag : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var type: String? by `$props`
    open var size: String? by `$props`
    open var color: String? by `$props`
    open var text: Any? by `$props`
    open var icon: String? by `$props`
    open var textColor: String? by `$props`
    open var textSize: Any? by `$props`
    open var show: Boolean by `$props`
    open var plain: Boolean by `$props`
    open var plainFill: Boolean by `$props`
    open var round: Boolean by `$props`
    open var mark: Boolean by `$props`
    open var closeable: Boolean by `$props`
    open var customStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceTagRiceTag) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceTagRiceTag
            val _cache = __ins.renderCache
            val ns = useNamespace("tag")
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val isPlain = computed(fun(): Boolean {
                return props.plain || props.plainFill
            }
            )
            val realShow = ref(props.show)
            val handleClick = fun(){
                emit("click")
            }
            val handleClose = fun(e: UniPointerEvent){
                e.stopPropagation()
                emit("close")
            }
            val onTransitionend = fun(){
                realShow.value = props.show
            }
            watch(fun(): Boolean {
                return props.show
            }
            , fun(){
                if (props.show) {
                    realShow.value = true
                }
            }
            )
            val getTextColor = fun(): String {
                if (props.textColor != null) {
                    return props.textColor!!
                }
                if (props.color != null) {
                    return if ((isPlain.value && !isGradientColor(props.color!!))) {
                        props.color!!
                    } else {
                        "#f5f5f5"
                    }
                }
                return ""
            }
            val iconSize = computed(fun(): Number {
                if (props.size == "large") {
                    return 18
                }
                if (props.size == "small") {
                    return 14
                }
                return 16
            }
            )
            val iconColor = computed<String>(fun(): String {
                val textColor = getTextColor()
                if (textColor != "") {
                    return textColor
                }
                val baseColor = "var(--rice-text-color)"
                val themeColor = "var(--rice-" + props.type + "-color)"
                if (isPlain.value) {
                    return if (isThemeColor(props.type)) {
                        themeColor
                    } else {
                        baseColor
                    }
                }
                return if (isThemeColor(props.type)) {
                    "#f5f5f5"
                } else {
                    baseColor
                }
            }
            )
            fun darken(color: Coloruts, amount: Number = 20): String {
                return color.mix("#141414", amount).toHexString()
            }
            val tagStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                if (props.color != null) {
                    val color = props.color!!
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
                css.set("opacity", if (props.show) {
                    1
                } else {
                    0
                }
                )
                return css
            }
            )
            val tagClass = computed<UTSArray<String>>(fun(): UTSArray<String> {
                val basic = _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.`is`("round", props.round),
                    ns.`is`("mark", props.mark),
                    ns.m(props.size)
                )
                if (isThemeColor(props.type)) {
                    val theme = ns.m(if (props.plainFill) {
                        "" + props.type + "--plain-fill"
                    } else {
                        props.type!!
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
                return css
            }
            )
            val textClass = computed(fun(): UTSArray<String> {
                val basic = _uA(
                    ns.e("text")
                )
                if (isThemeColor(props.type)) {
                    val theme = ns.m(if (isPlain.value) {
                        "" + props.type + "--plain__text"
                    } else {
                        "" + props.type!! + "__text"
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
            return fun(): Any? {
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return if (isTrue(unref(realShow))) {
                    _cE("view", _uM("key" to 0, "class" to _nC(unref(tagClass)), "style" to _nS(_uA(
                        unref(tagStyle),
                        _ctx.customStyle
                    )), "onClick" to handleClick, "onTransitionend" to onTransitionend), _uA(
                        renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                            return _uA(
                                if (isTrue(unref(hasStrValue)(_ctx.icon))) {
                                    _cV(_component_rice_icon, _uM("key" to 0, "name" to _ctx.icon, "color" to unref(iconColor), "size" to ("" + unref(iconSize) + "px"), "custom-style" to _uO("marginRight" to "2px")), null, 8, _uA(
                                        "name",
                                        "color",
                                        "size"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                },
                                _cE("text", _uM("class" to _nC(unref(textClass)), "style" to _nS(unref(textStyle))), _tD(_ctx.text), 7)
                            )
                        }),
                        if (isTrue(_ctx.closeable)) {
                            _cE("view", _uM("key" to 0, "onClick" to withModifiers(handleClose, _uA(
                                "stop"
                            ))), _uA(
                                _cV(_component_rice_icon, _uM("name" to "cross", "color" to unref(iconColor), "size" to ("" + (unref(iconSize) - 2) + "px"), "custom-style" to _uO("marginLeft" to "4px")), null, 8, _uA(
                                    "color",
                                    "size"
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                    ), 38)
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "rice-tag"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-tag" to _pS(_uM("flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to 0, "paddingRight" to 10, "paddingBottom" to 0, "paddingLeft" to 10, "height" to 26, "boxSizing" to "border-box", "transitionProperty" to "opacity", "transitionDuration" to "0.3s", "opacity" to 1, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-tag-default-border)", "borderRightColor" to "var(--rice-tag-default-border)", "borderBottomColor" to "var(--rice-tag-default-border)", "borderLeftColor" to "var(--rice-tag-default-border)")), "rice-tag__text" to _pS(_uM("color" to "var(--rice-text-color)", "fontSize" to 14)), "rice-tag--round" to _pS(_uM("borderTopLeftRadius" to 4, "borderTopRightRadius" to 4, "borderBottomRightRadius" to 4, "borderBottomLeftRadius" to 4)), "rice-tag--mark" to _pS(_uM("borderTopLeftRadius" to 0, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 0)), "rice-tag--primary" to _pS(_uM("backgroundColor" to "var(--rice-primary-color)", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-primary-color)", "borderRightColor" to "var(--rice-primary-color)", "borderBottomColor" to "var(--rice-primary-color)", "borderLeftColor" to "var(--rice-primary-color)")), "rice-tag--primary__text" to _pS(_uM("color" to "var(--rice-text-color-white)")), "rice-tag--primary--plain__text" to _pS(_uM("color" to "var(--rice-primary-color)")), "rice-tag--success" to _pS(_uM("backgroundColor" to "var(--rice-success-color)", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-success-color)", "borderRightColor" to "var(--rice-success-color)", "borderBottomColor" to "var(--rice-success-color)", "borderLeftColor" to "var(--rice-success-color)")), "rice-tag--success__text" to _pS(_uM("color" to "var(--rice-text-color-white)")), "rice-tag--success--plain__text" to _pS(_uM("color" to "var(--rice-success-color)")), "rice-tag--warning" to _pS(_uM("backgroundColor" to "var(--rice-warning-color)", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-warning-color)", "borderRightColor" to "var(--rice-warning-color)", "borderBottomColor" to "var(--rice-warning-color)", "borderLeftColor" to "var(--rice-warning-color)")), "rice-tag--warning__text" to _pS(_uM("color" to "var(--rice-text-color-white)")), "rice-tag--warning--plain__text" to _pS(_uM("color" to "var(--rice-warning-color)")), "rice-tag--error" to _pS(_uM("backgroundColor" to "var(--rice-error-color)", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-error-color)", "borderRightColor" to "var(--rice-error-color)", "borderBottomColor" to "var(--rice-error-color)", "borderLeftColor" to "var(--rice-error-color)")), "rice-tag--error__text" to _pS(_uM("color" to "var(--rice-text-color-white)")), "rice-tag--error--plain__text" to _pS(_uM("color" to "var(--rice-error-color)")), "rice-tag--primary--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-primary-color-1)", "borderTopColor" to "var(--rice-primary-color)", "borderRightColor" to "var(--rice-primary-color)", "borderBottomColor" to "var(--rice-primary-color)", "borderLeftColor" to "var(--rice-primary-color)")), "rice-tag--success--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-success-color-1)", "borderTopColor" to "var(--rice-success-color)", "borderRightColor" to "var(--rice-success-color)", "borderBottomColor" to "var(--rice-success-color)", "borderLeftColor" to "var(--rice-success-color)")), "rice-tag--warning--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-warning-color-1)", "borderTopColor" to "var(--rice-warning-color)", "borderRightColor" to "var(--rice-warning-color)", "borderBottomColor" to "var(--rice-warning-color)", "borderLeftColor" to "var(--rice-warning-color)")), "rice-tag--error--plain-fill" to _pS(_uM("backgroundColor" to "var(--rice-error-color-1)", "borderTopColor" to "var(--rice-error-color)", "borderRightColor" to "var(--rice-error-color)", "borderBottomColor" to "var(--rice-error-color)", "borderLeftColor" to "var(--rice-error-color)")), "rice-tag--large" to _pS(_uM("height" to 30, "paddingTop" to 0, "paddingRight" to 14, "paddingBottom" to 0, "paddingLeft" to 14)), "rice-tag--large__text" to _pS(_uM("fontSize" to 15)), "rice-tag--small" to _pS(_uM("height" to 22, "paddingTop" to 0, "paddingRight" to 6, "paddingBottom" to 0, "paddingLeft" to 6)), "rice-tag--small__text" to _pS(_uM("fontSize" to 12)), "rice-tag--plain" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)")), "@TRANSITION" to _uM("rice-tag" to _uM("property" to "opacity", "duration" to "0.3s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "close" to null)
        var props = _nP(_uM("type" to _uM("type" to "String", "required" to false), "size" to _uM("type" to "String", "required" to false), "color" to _uM("type" to "String", "required" to false), "text" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "icon" to _uM("type" to "String", "required" to false), "textColor" to _uM("type" to "String", "required" to false), "textSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "show" to _uM("type" to "Boolean", "required" to false, "default" to true), "plain" to _uM("type" to "Boolean", "required" to false, "default" to false), "plainFill" to _uM("type" to "Boolean", "required" to false, "default" to false), "round" to _uM("type" to "Boolean", "required" to false, "default" to true), "mark" to _uM("type" to "Boolean", "required" to false, "default" to false), "closeable" to _uM("type" to "Boolean", "required" to false, "default" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "show",
            "plain",
            "plainFill",
            "round",
            "mark",
            "closeable",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
