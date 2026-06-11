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
open class GenUniModulesRiceUiComponentsRiceLoadingRiceLoading : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var mode: String by `$props`
    open var duration: Number by `$props`
    open var color: String? by `$props`
    open var inactiveColor: String? by `$props`
    open var size: Any by `$props`
    open var text: Any? by `$props`
    open var textColor: String? by `$props`
    open var textSize: Any? by `$props`
    open var textClass: Any? by `$props`
    open var vertical: Boolean by `$props`
    open var timingFunction: String by `$props`
    open var customStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceLoadingRiceLoading) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceLoadingRiceLoading
            val _cache = __ins.renderCache
            val slot = useSlots()
            val ns = useNamespace("loading")
            val props = __props
            val color = computed(fun(): String {
                return if (hasStrValue(props.color)) {
                    props.color!!
                } else {
                    "#1989fa"
                }
            }
            )
            val hasText = computed(fun(): Boolean {
                return (props.text != null && props.text != "") || slot["default"] != null
            }
            )
            val _model = computed(fun(): String {
                return props.mode
            }
            )
            val rootClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.`is`("vertical", props.vertical),
                    ns.`is`("slot", slot["icon"] != null)
                )
            }
            )
            val semicircleStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                val size = addUnit(props.size!!)
                css.set("height", size)
                css.set("width", size)
                if (props.mode == "circle") {
                    if (hasStrValue(props.inactiveColor)) {
                        css.set("border-color", props.inactiveColor!!)
                    } else if (color.value != "inherit") {
                        val rgb = Coloruts(color.value).toRgb()
                        css.set("border-color", "rgba(" + rgb["r"] + "," + rgb["g"] + "," + rgb["b"] + ",.2)")
                    }
                }
                css.set("border-top-color", color.value)
                return css
            }
            )
            val circularStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                val size = addUnit(props.size!!)
                css.set("height", size)
                css.set("width", size)
                return css
            }
            )
            val textStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.textColor != null) {
                    css.set("color", props.textColor!!)
                }
                if (props.textSize != null) {
                    css.set("font-size", addUnit(props.textSize!!))
                }
                return css
            }
            )
            val loadingTextClass = computed(fun(): String {
                return "rice-loading__text--" + (if (props.vertical) {
                    "vertical"
                } else {
                    "row"
                }
                )
            }
            )
            val rotateRef = shallowRef<UniElement?>(null)
            val circularRef = shallowRef<UniElement?>(null)
            val animationTimingFn = computed(fun(): String {
                return if ((props.mode == "snow" || slot["icon"] != null)) {
                    "linear"
                } else {
                    props.timingFunction
                }
            }
            )
            useLoading(UseLoadingOptions(rotateRef = rotateRef, circularRef = circularRef, timingFunction = animationTimingFn.value, mode = props.mode, color = color, size = props.size, duration = props.duration))
            return fun(): Any? {
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE("view", _uM("class" to _nC(unref(rootClass)), "style" to _nS(_ctx.customStyle)), _uA(
                    if (isTrue(_ctx.mode == "snow" || unref(slot)["icon"] != null)) {
                        _cE("view", _uM("key" to 0, "class" to "rice-loading--snow", "ref_key" to "rotateRef", "ref" to rotateRef), _uA(
                            renderSlot(_ctx.`$slots`, "icon", _uO(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_rice_icon, _uM("name" to "loading", "size" to _ctx.size, "color" to unref(color)), null, 8, _uA(
                                        "size",
                                        "color"
                                    ))
                                )
                            })
                        ), 512)
                    } else {
                        if (isTrue(_ctx.mode == "semicircle" || _ctx.mode == "circle")) {
                            _cE("view", _uM("key" to 1, "class" to _nC(unref(ns).m(_ctx.mode)), "style" to _nS(unref(semicircleStyle)), "ref_key" to "rotateRef", "ref" to rotateRef), null, 6)
                        } else {
                            _cE("view", _uM("key" to 2, "class" to "rice-loading--circular", "style" to _nS(unref(circularStyle)), "ref_key" to "circularRef", "ref" to circularRef), null, 4)
                        }
                    }
                    ,
                    if (isTrue(unref(hasText))) {
                        _cE("text", _uM("key" to 3, "class" to _nC(_uA(
                            "rice-loading__text",
                            _uA(
                                unref(loadingTextClass),
                                props.textClass
                            )
                        )), "style" to _nS(unref(textStyle))), _uA(
                            renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(_ctx.text)
                                )
                            })
                        ), 6)
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        }
        var name = "rice-loading"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-loading" to _pS(_uM("flexDirection" to "row", "alignItems" to "center")), "rice-loading__text" to _pS(_uM("fontSize" to 14, "color" to "var(--rice-text-color-2)")), "rice-loading__text--row" to _pS(_uM("marginLeft" to 8)), "rice-loading__text--vertical" to _pS(_uM("marginTop" to 8)), "rice-loading--vertical" to _pS(_uM("flexDirection" to "column", "justifyContent" to "center")), "rice-loading--semicircle" to _pS(_uM("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999, "borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)")), "rice-loading--circle" to _pS(_uM("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999, "borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(25,136,249,0.2)", "borderRightColor" to "rgba(25,136,249,0.2)", "borderBottomColor" to "rgba(25,136,249,0.2)", "borderLeftColor" to "rgba(25,136,249,0.2)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("mode" to _uM("type" to "String", "required" to false, "default" to "circular"), "duration" to _uM("type" to "Number", "required" to false, "default" to 1100), "color" to _uM("type" to "String", "required" to false), "inactiveColor" to _uM("type" to "String", "required" to false), "size" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "24px"), "text" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "textColor" to _uM("type" to "String", "required" to false), "textSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "textClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "vertical" to _uM("type" to "Boolean", "required" to false, "default" to false), "timingFunction" to _uM("type" to "String", "required" to false, "default" to "ease-in-out"), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "mode",
            "duration",
            "size",
            "textClass",
            "vertical",
            "timingFunction",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
