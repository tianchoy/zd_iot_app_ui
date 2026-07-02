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
open class GenUniModulesRiceUiComponentsRiceBadgeRiceBadge : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var value: Any? by `$props`
    open var max: Number? by `$props`
    open var isDot: Boolean by `$props`
    open var hidden: Boolean by `$props`
    open var type: String by `$props`
    open var showZero: Boolean by `$props`
    open var bgColor: String? by `$props`
    open var color: String? by `$props`
    open var fontSize: Any? by `$props`
    open var position: String by `$props`
    open var offset: UTSArray<Any> by `$props`
    open var absolute: Boolean? by `$props`
    open var textClass: Any? by `$props`
    open var badgeStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceBadgeRiceBadge) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceBadgeRiceBadge
            val _cache = __ins.renderCache
            val ns = useNamespace("badge")
            val slots = useSlots()
            val props = __props
            val single = computed(fun(): Boolean {
                return slots["default"] == null
            }
            )
            val isAbsolute = computed(fun(): Boolean {
                return !single.value || props.absolute == true
            }
            )
            val isNumZero = computed(fun(): Boolean {
                return props.value == 0
            }
            )
            val showBadge = computed(fun(): Boolean {
                return !props.hidden && (props.isDot || props.showZero || !isNumZero.value)
            }
            )
            val formatValue = computed(fun(): Any? {
                if (props.isDot) {
                    return ""
                }
                if (UTSAndroid.`typeof`(props.value) == "number" && UTSAndroid.`typeof`(props.max) == "number") {
                    return if (props.max!! < (props.value as Number)) {
                        "" + props.max!! + "+"
                    } else {
                        props.value as Number
                    }
                }
                return props.value
            }
            )
            val contentClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.e("content"),
                    ns.m(props.type),
                    ns.`is`("fixed", isAbsolute.value),
                    ns.`is`("dot", props.isDot),
                    ns.m(if (isAbsolute.value) {
                        props.position
                    } else {
                        ""
                    }
                    ),
                    ns.theme()
                )
            }
            )
            val getOffsetUumString = fun(kVal: String): String {
                return if (kVal.startsWith("-")) {
                    addUnit(kVal.replace("-", ""))
                } else {
                    "-" + addUnit(kVal)
                }
            }
            val contentStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.bgColor != null) {
                    css.set("background-color", props.bgColor!!)
                }
                if (props.offset.length > 0) {
                    val x = props.offset[0]
                    val y = if (props.offset.length >= 2) {
                        props.offset[1]
                    } else {
                        0
                    }
                    if (!isAbsolute.value) {
                        css.set("margin-left", addUnit(x))
                        css.set("margin-top", addUnit(y))
                    } else {
                        val p = props.position.split("-")
                        val offsetY = p[0]
                        val offsetX = p[1]
                        if (UTSAndroid.`typeof`(x) == "number") {
                            css.set(offsetX, addUnit(if (offsetX == "left") {
                                x as Number
                            } else {
                                -(x as Number)
                            }))
                        } else {
                            css.set(offsetX, if (offsetX == "left") {
                                addUnit(x as String)
                            } else {
                                getOffsetUumString(x as String)
                            }
                            )
                        }
                        if (UTSAndroid.`typeof`(y) == "number") {
                            css.set(offsetY, addUnit(if (offsetY == "top") {
                                y as Number
                            } else {
                                -(y as Number)
                            }))
                        } else {
                            css.set(offsetY, if (offsetY == "top") {
                                addUnit(y as String)
                            } else {
                                getOffsetUumString(y as String)
                            }
                            )
                        }
                    }
                }
                return css
            }
            )
            val textStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.color != null) {
                    css.set("color", props.color!!)
                }
                if (props.fontSize != null) {
                    css.set("font-size", addUnit(props.fontSize!!))
                }
                return css
            }
            )
            return fun(): Any? {
                return if (isTrue(!unref(single))) {
                    _cE("view", _uM("key" to 0, "class" to "rice-badge"), _uA(
                        renderSlot(_ctx.`$slots`, "default"),
                        if (isTrue(unref(showBadge))) {
                            _cE("view", _uM("key" to 0, "class" to _nC(unref(contentClass)), "style" to _nS(_uA(
                                unref(contentStyle),
                                _ctx.badgeStyle
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "content", _uO(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (isTrue(unref(hasStrValue)(unref(formatValue)))) {
                                            _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                                "rice-badge__content__text",
                                                _ctx.textClass
                                            )), "style" to _nS(unref(textStyle))), _tD(unref(formatValue)), 7)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                })
                            ), 6)
                        } else {
                            _cC("v-if", true)
                        }
                    ))
                } else {
                    _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                        unref(ns).b(""),
                        unref(contentClass)
                    )), "style" to _nS(_uA(
                        unref(contentStyle),
                        _ctx.badgeStyle
                    ))), _uA(
                        renderSlot(_ctx.`$slots`, "content", _uO(), fun(): UTSArray<Any> {
                            return _uA(
                                if (isTrue(unref(hasStrValue)(unref(formatValue)))) {
                                    _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                        "rice-badge__content__text",
                                        _ctx.textClass
                                    )), "style" to _nS(unref(textStyle))), _tD(unref(formatValue)), 7)
                                } else {
                                    _cC("v-if", true)
                                }
                            )
                        }
                        )
                    ), 6)
                }
            }
        }
        var name = "rice-badge"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-badge" to _pS(_uM("position" to "relative", "overflow" to "visible")), "rice-badge__content" to _pS(_uM("paddingTop" to 0, "paddingRight" to 4, "paddingBottom" to 0, "paddingLeft" to 4, "minWidth" to 16, "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ffffff", "borderRightColor" to "#ffffff", "borderBottomColor" to "#ffffff", "borderLeftColor" to "#ffffff", "backgroundColor" to "var(--rice-error-color)")), "rice-badge__content__text" to _pS(_uM("fontSize" to 12, "color" to "#ffffff", "whiteSpace" to "nowrap")), "rice-badge--fixed" to _pS(_uM("position" to "absolute", "zIndex" to 99)), "rice-badge--dot" to _pS(_uM("height" to 12, "width" to 12, "borderTopLeftRadius" to 12, "borderTopRightRadius" to 12, "borderBottomRightRadius" to 12, "borderBottomLeftRadius" to 12, "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "minWidth" to 0)), "rice-badge--top-left" to _pS(_uM("top" to 0, "left" to 0, "transform" to "translate(-50%, -50%)")), "rice-badge--top-right" to _pS(_uM("top" to 0, "right" to 0, "transform" to "translate(50%, -50%)")), "rice-badge--bottom-left" to _pS(_uM("bottom" to 0, "left" to 0, "transform" to "translate(-50%, 50%)")), "rice-badge--bottom-right" to _pS(_uM("bottom" to 0, "right" to 0, "transform" to "translate(50%, 50%)")), "rice-badge--primary" to _pS(_uM("backgroundColor" to "var(--rice-primary-color)")), "rice-badge--success" to _pS(_uM("backgroundColor" to "var(--rice-success-color)")), "rice-badge--warning" to _pS(_uM("backgroundColor" to "var(--rice-warning-color)")), "rice-badge--error" to _pS(_uM("backgroundColor" to "var(--rice-error-color)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("value" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "max" to _uM("type" to "Number", "required" to false), "isDot" to _uM("type" to "Boolean", "required" to false, "default" to false), "hidden" to _uM("type" to "Boolean", "required" to false, "default" to false), "type" to _uM("type" to "String", "required" to false, "default" to "error"), "showZero" to _uM("type" to "Boolean", "required" to false, "default" to true), "bgColor" to _uM("type" to "String", "required" to false), "color" to _uM("type" to "String", "required" to false), "fontSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "position" to _uM("type" to "String", "required" to false, "default" to "top-right"), "offset" to _uM("type" to "Array", "required" to false, "default" to fun(): UTSArray<Any> {
            return _uA()
        }
        ), "absolute" to _uM("type" to "Boolean", "required" to false), "textClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "badgeStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "isDot",
            "hidden",
            "type",
            "showZero",
            "position",
            "offset",
            "absolute",
            "textClass",
            "badgeStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
