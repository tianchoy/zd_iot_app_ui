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
open class GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var time: Number by `$props`
    open var format: String by `$props`
    open var autoStart: Boolean by `$props`
    open var millisecond: Boolean by `$props`
    open var fontSize: Any? by `$props`
    open var color: String? by `$props`
    open var textClass: Any? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var start: () -> Unit
        get() {
            return unref(this.`$exposed`["start"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "start", value)
        }
    open var pause: () -> Unit
        get() {
            return unref(this.`$exposed`["pause"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "pause", value)
        }
    open var reset: () -> Unit
        get() {
            return unref(this.`$exposed`["reset"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "reset", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val ns = useNamespace("count-down")
            val props = __props
            val _useCountDown = useCountDown(UseCountDownOptions(time = props.time, millisecond = props.millisecond, onChange = fun(current: CurrentTime){
                return emit("change", current)
            }
            , onFinish = fun(){
                return emit("finish")
            }
            ))
            val current = _useCountDown.current
            val start = _useCountDown.start
            val pause = _useCountDown.pause
            val reset = _useCountDown.reset
            val timeValue = computed(fun(): String {
                return formatTime(props.format, current.value)
            }
            )
            val resetTime = fun(){
                reset(props.time)
                if (props.autoStart) {
                    start()
                }
            }
            watch(fun(): Number {
                return props.time
            }
            , fun(){
                resetTime()
            }
            , WatchOptions(immediate = true))
            val textStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.fontSize != null) {
                    css.set("font-size", addUnit(props.fontSize!!))
                }
                if (props.color != null) {
                    css.set("color", props.color!!)
                }
                return css
            }
            )
            __expose(_uM("start" to fun(){
                return start()
            }
            , "pause" to fun(){
                return pause()
            }
            , "reset" to resetTime))
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "rice-count-down",
                    unref(ns).theme()
                )), "style" to _nS(_ctx.customStyle)), _uA(
                    renderSlot(_ctx.`$slots`, "default", GenUniModulesRiceUiComponentsRiceCountDownRiceCountDownSlotDataDefault(current = unref(current)), fun(): UTSArray<Any> {
                        return _uA(
                            _cE("text", _uM("class" to _nC(_uA(
                                "rice-count-down__text",
                                _ctx.textClass
                            )), "style" to _nS(unref(textStyle))), _tD(unref(timeValue)), 7)
                        )
                    }
                    )
                ), 6)
            }
        }
        var name = "rice-count-down"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-count-down__text" to _pS(_uM("fontSize" to 15, "color" to "var(--rice-text-color)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "finish" to null)
        var props = _nP(_uM("time" to _uM("type" to "Number", "required" to false, "default" to 0), "format" to _uM("type" to "String", "required" to false, "default" to "HH:mm:ss"), "autoStart" to _uM("type" to "Boolean", "required" to false, "default" to true), "millisecond" to _uM("type" to "Boolean", "required" to false, "default" to false), "fontSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "color" to _uM("type" to "String", "required" to false), "textClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        )))
        var propsNeedCastKeys = _uA(
            "time",
            "format",
            "autoStart",
            "millisecond",
            "textClass",
            "customStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
