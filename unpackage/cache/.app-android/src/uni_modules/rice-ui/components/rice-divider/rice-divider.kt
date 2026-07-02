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
open class GenUniModulesRiceUiComponentsRiceDividerRiceDivider : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var dashed: Boolean by `$props`
    open var hairline: Boolean by `$props`
    open var width: Any? by `$props`
    open var lineColor: String? by `$props`
    open var text: Any? by `$props`
    open var textPosition: String by `$props`
    open var textColor: String? by `$props`
    open var textSize: Any? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceDividerRiceDivider) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceDividerRiceDivider
            val _cache = __ins.renderCache
            val ns = useNamespace("divider")
            val slots = useSlots()
            val props = __props
            val hasText = computed(fun(): Boolean {
                return slots["default"] != null || hasStrValue(props.text)
            }
            )
            val dividerStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.lineColor != null && !hasText.value) {
                    css.set("border-color", props.lineColor!!)
                }
                return css
            }
            )
            val dividerLineStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.lineColor != null) {
                    css.set("border-color", props.lineColor!!)
                }
                return css
            }
            )
            val dividerClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.`is`("single", !hasText.value),
                    ns.`is`("hairline", props.hairline && !hasText.value),
                    ns.`is`("dashed", props.dashed && !hasText.value)
                )
            }
            )
            val getLineClass = fun(position: String): UTSArray<String> {
                return _uA(
                    ns.e(position),
                    ns.`is`("hairline", props.hairline),
                    ns.`is`("sides", props.textPosition == position),
                    ns.`is`("dashed", props.dashed)
                )
            }
            val textStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.textSize != null) {
                    css.set("font-size", addUnit(props.textSize!!))
                }
                if (props.textColor != null) {
                    css.set("color", props.textColor!!)
                }
                return css
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(unref(dividerClass)), "style" to _nS(_uA(
                    unref(dividerStyle),
                    _ctx.customStyle
                ))), _uA(
                    if (isTrue(unref(hasText))) {
                        _cE(Fragment, _uM("key" to 0), _uA(
                            _cE("view", _uM("class" to _nC(getLineClass("left")), "style" to _nS(unref(dividerLineStyle))), null, 6),
                            renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("text", _uM("class" to "rice-divider__text", "style" to _nS(unref(textStyle))), _tD(_ctx.text), 5)
                                )
                            }),
                            _cE("view", _uM("class" to _nC(getLineClass("right")), "style" to _nS(unref(dividerLineStyle))), null, 6)
                        ), 64)
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        }
        var name = "rice-divider"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-divider" to _pS(_uM("flexDirection" to "row", "alignItems" to "center", "marginTop" to 16, "marginRight" to "auto", "marginBottom" to 16, "marginLeft" to "auto", "width" to "100%")), "rice-divider--single" to _pS(_uM("borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "var(--rice-divider-line-color)", "transform" to "scale(1, 1)")), "rice-divider__text" to _pS(_uM("fontSize" to 14, "color" to "var(--rice-text-color-2)")), "rice-divider__left" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "boxSizing" to "border-box", "borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "var(--rice-divider-line-color)", "marginRight" to 12)), "rice-divider__right" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "boxSizing" to "border-box", "borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "var(--rice-divider-line-color)", "marginLeft" to 12)), "rice-divider--sides" to _pS(_uM("width" to 30, "flexGrow" to 0, "flexShrink" to 1, "flexBasis" to "auto")), "rice-divider--dashed" to _pS(_uM("borderTopStyle" to "dashed")), "rice-divider--hairline" to _pS(_uM("transform" to "scale(1, 0.5)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("dashed" to _uM("type" to "Boolean", "required" to false, "default" to false), "hairline" to _uM("type" to "Boolean", "required" to false, "default" to true), "width" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "lineColor" to _uM("type" to "String", "required" to false), "text" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "textPosition" to _uM("type" to "String", "required" to false, "default" to "center"), "textColor" to _uM("type" to "String", "required" to false), "textSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "dashed",
            "hairline",
            "textPosition",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
