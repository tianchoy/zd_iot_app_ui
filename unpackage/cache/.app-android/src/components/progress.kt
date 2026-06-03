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
open class GenComponentsProgress : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var value: Number by `$props`
    open var max: Number by `$props`
    open var height: Number by `$props`
    open var color: String by `$props`
    open var trackColor: String by `$props`
    open var showPercent: Boolean by `$props`
    open var label: String by `$props`
    open var animated: Boolean by `$props`
    open var borderRadius: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsProgress) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsProgress
            val _cache = __ins.renderCache
            val props = __props
            val percent = computed(fun(): Number {
                var p = (props.value / props.max) * 100
                p = Math.min(Math.max(p, 0), 100)
                return Math.floor(p)
            }
            )
            val trackStyle = computed(fun(): UTSJSONObject {
                return (_uO("height" to (props.height + "px"), "backgroundColor" to props.trackColor, "borderRadius" to (props.borderRadius + "px"), "overflow" to "hidden"))
            }
            )
            val fillStyle = computed(fun(): UTSJSONObject {
                return (_uO("width" to (percent.value + "%"), "height" to "100%", "backgroundColor" to props.color, "borderRadius" to (props.borderRadius + "px"), "transition" to if (props.animated) {
                    "width 0.3s ease-out"
                } else {
                    "none"
                }
                ))
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to "linear-progress"), _uA(
                    _cE("view", _uM("class" to "progress-track", "style" to _nS(trackStyle.value)), _uA(
                        _cE("view", _uM("class" to "progress-fill", "style" to _nS(fillStyle.value)), null, 4)
                    ), 4),
                    if (isTrue(_ctx.showPercent)) {
                        _cE("view", _uM("key" to 0, "class" to "progress-header"), _uA(
                            _cE("text", _uM("class" to "progress-percent"), _tD(percent.value) + "%", 1)
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("linear-progress" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "progress-header" to _pS(_uM("display" to "flex", "justifyContent" to "space-between", "marginLeft" to 10)), "progress-label" to _pS(_uM("fontSize" to 14, "color" to "#3a3a3c")), "progress-percent" to _pS(_uM("fontSize" to 14, "color" to "#007aff", "fontWeight" to 500)), "progress-track" to _pS(_uM("position" to "relative", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "progress-fill" to _pS(_uM("transitionProperty" to "width", "transitionDuration" to "0.3s", "transitionTimingFunction" to "ease-out")), "@TRANSITION" to _uM("progress-fill" to _uM("property" to "width", "duration" to "0.3s", "timingFunction" to "ease-out")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("value" to _uM("type" to "Number", "required" to false, "default" to 0), "max" to _uM("type" to "Number", "required" to false, "default" to 100), "height" to _uM("type" to "Number", "required" to false, "default" to 8), "color" to _uM("type" to "String", "required" to false, "default" to "#007aff"), "trackColor" to _uM("type" to "String", "required" to false, "default" to "#e5e5ea"), "showPercent" to _uM("type" to "Boolean", "required" to false, "default" to true), "label" to _uM("type" to "String", "required" to false, "default" to "进度"), "animated" to _uM("type" to "Boolean", "required" to false, "default" to true), "borderRadius" to _uM("type" to "Number", "required" to false, "default" to 4)))
        var propsNeedCastKeys = _uA(
            "value",
            "max",
            "height",
            "color",
            "trackColor",
            "showPercent",
            "label",
            "animated",
            "borderRadius"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
