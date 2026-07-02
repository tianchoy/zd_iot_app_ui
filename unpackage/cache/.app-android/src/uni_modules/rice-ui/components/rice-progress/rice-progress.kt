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
open class GenUniModulesRiceUiComponentsRiceProgressRiceProgress : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var percentage: Any by `$props`
    open var strokeWidth: Any? by `$props`
    open var showText: Boolean by `$props`
    open var textColor: String? by `$props`
    open var textSize: Any? by `$props`
    open var textPosition: String by `$props`
    open var format: ((percentage: Number) -> String)? by `$props`
    open var color: String? by `$props`
    open var inactiveColor: String? by `$props`
    open var radius: Any? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceProgressRiceProgress) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceProgressRiceProgress
            val _cache = __ins.renderCache
            val ns = useNamespace("progress")
            val slots = useSlots()
            val props = __props
            val percent = computed<Number>(fun(): Number {
                return toNum(props.percentage)
            }
            )
            val formatText = computed(fun(): String {
                if (UTSAndroid.`typeof`(props.format) == "function") {
                    return props.format!!(percent.value)
                }
                return "" + percent.value + "%"
            }
            )
            val wrapperStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.strokeWidth != null) {
                    css.set("height", addUnit(props.strokeWidth!!))
                }
                if (props.inactiveColor != null) {
                    css.set("background", props.inactiveColor!!)
                }
                css.set("border-radius", addUnit(props.radius ?: "100px"))
                return css
            }
            )
            val wrapperWidth = ref(0)
            val barStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                val num = clamp(percent.value, 0, 100) / 100
                css.set("width", "" + wrapperWidth.value * num + "px")
                if (props.color != null) {
                    css.set("background", props.color!!)
                }
                css.set("border-radius", addUnit(props.radius ?: "100px"))
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
            val wrapperRef = shallowRef<UniElement?>(null)
            val obServer = ref<UniResizeObserver?>(null)
            val resizeObserver = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        await(nextTick())
                        if (wrapperRef.value == null) {
                            return@w1
                        }
                        val rect = await(wrapperRef.value!!.getBoundingClientRectAsync()!!)
                        wrapperWidth.value = rect.width
                        obServer.value = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
                            val el = entries.find(fun(v): Boolean {
                                return v.target == wrapperRef.value
                            }
                            )
                            if (el != null) {
                                wrapperWidth.value = Math.ceil(el.contentRect.width)
                            }
                        }
                        )
                        obServer.value!!.observe(wrapperRef.value!!)
                })
            }
            onMounted(fun(){
                resizeObserver()
            }
            )
            onUnmounted(fun(){
                if (wrapperRef.value != null) {
                    obServer.value?.unobserve(wrapperRef.value!!)
                }
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "rice-progress",
                    unref(ns).theme()
                )), "style" to _nS(_ctx.customStyle)), _uA(
                    _cE("view", _uM("class" to _nC(_uA(
                        "rice-progress__wrapper",
                        _uM("rice-progress--inside" to (_ctx.textPosition == "inside"))
                    )), "style" to _nS(unref(wrapperStyle)), "ref_key" to "wrapperRef", "ref" to wrapperRef), _uA(
                        _cE("view", _uM("class" to "rice-progress__bar", "style" to _nS(unref(barStyle))), _uA(
                            if (_ctx.textPosition == "inside") {
                                renderSlot(_ctx.`$slots`, "default", _uM("key" to 0), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (isTrue(_ctx.showText)) {
                                            _cE("text", _uM("key" to 0, "class" to "rice-progress__text rice-progress__text--inside", "style" to _nS(unref(textStyle))), _tD(unref(formatText)), 5)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                })
                            } else {
                                _cC("v-if", true)
                            }
                        ), 4)
                    ), 6),
                    if (_ctx.textPosition == "right") {
                        renderSlot(_ctx.`$slots`, "default", _uM("key" to 0), fun(): UTSArray<Any> {
                            return _uA(
                                if (isTrue(_ctx.showText)) {
                                    _cE("text", _uM("key" to 0, "class" to "rice-progress__text", "style" to _nS(unref(textStyle))), _tD(unref(formatText)), 5)
                                } else {
                                    _cC("v-if", true)
                                }
                            )
                        })
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        }
        var name = "rice-progress"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-progress" to _pS(_uM("flexDirection" to "row", "alignItems" to "center")), "rice-progress__wrapper" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "height" to 6, "backgroundColor" to "var(--rice-progress-background)")), "rice-progress__bar" to _pS(_uM("flexDirection" to "row", "justifyContent" to "flex-end", "alignItems" to "center", "height" to "100%", "width" to 0, "backgroundColor" to "var(--rice-primary-color)", "transitionProperty" to "all", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease")), "rice-progress__text" to _pS(_uM("color" to "var(--rice-text-color-2)", "fontSize" to 14, "marginLeft" to 8)), "rice-progress__text--inside" to _pS(_uM("marginRight" to 8, "color" to "#f5f5f5", "minWidth" to 0)), "rice-progress--inside" to _pS(_uM("height" to 20)), "@TRANSITION" to _uM("rice-progress__bar" to _uM("property" to "all", "duration" to "0.2s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("percentage" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to true, "default" to 0), "strokeWidth" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "showText" to _uM("type" to "Boolean", "required" to false, "default" to true), "textColor" to _uM("type" to "String", "required" to false), "textSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "textPosition" to _uM("type" to "String", "required" to false, "default" to "right"), "format" to _uM("type" to "Function", "required" to false), "color" to _uM("type" to "String", "required" to false), "inactiveColor" to _uM("type" to "String", "required" to false), "radius" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "percentage",
            "showText",
            "textPosition",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
