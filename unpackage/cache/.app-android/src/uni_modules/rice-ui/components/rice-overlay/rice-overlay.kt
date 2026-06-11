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
open class GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var zIndex: Number by `$props`
    open var closeOnClickOverlay: Boolean by `$props`
    open var duration: Number by `$props`
    open var bgColor: String? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var show: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val ns = useNamespace("overlay")
            val touch = useTouch()
            val props = __props
            val show = useModel<Boolean>(__ins.props, "show")
            val realShow = ref(false)
            val transitionClass = ref("")
            val overlayClick = fun(e: UniPointerEvent){
                e.stopPropagation()
                if (!touch.isTap.value) {
                    return
                }
                if (isTruthy(props.closeOnClickOverlay)) {
                    show.value = false
                }
                emit("click", e)
            }
            val onTouchstart = fun(e: UniTouchEvent){
                touch.start(e)
            }
            val onTouchmove = fun(e: UniTouchEvent){
                touch.move(e)
            }
            var timer1: Number? = null
            var timer2: Number? = null
            val open = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        realShow.value = true
                        await(nextTick())
                        if (timer1 != null) {
                            clearTimeout(timer1!!)
                        }
                        timer1 = setTimeout(fun(){
                            transitionClass.value = "rice-overlay--show"
                            emit("opened")
                        }
                        , 30)
                })
            }
            val close = fun(){
                transitionClass.value = ""
                if (timer2 != null) {
                    clearTimeout(timer2!!)
                }
                timer2 = setTimeout(fun(){
                    realShow.value = false
                    emit("closed")
                }
                , props.duration)
            }
            watch(show, fun(newVal: Boolean){
                if (newVal && !realShow.value) {
                    open()
                }
                if (!newVal && realShow.value) {
                    close()
                }
            }
            , WatchOptions(immediate = true))
            val rootClass = computed(fun(): UTSArray<String> {
                return _uA<String>("rice-overlay", ns.theme(), transitionClass.value)
            }
            )
            val overlayStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                css.set("z-index", props.zIndex)
                css.set("transition-duration", props.duration + "ms")
                if (hasStrValue(props.bgColor)) {
                    css.set("background-color", props.bgColor!!)
                }
                return css
            }
            )
            onUnmounted(fun(){
                if (timer1 != null) {
                    clearTimeout(timer1!!)
                }
                if (timer2 != null) {
                    clearTimeout(timer2!!)
                }
            }
            )
            return fun(): Any? {
                return if (isTrue(unref(realShow))) {
                    _cE("view", _uM("key" to 0, "class" to _nC(unref(rootClass)), "style" to _nS(_uA(
                        unref(overlayStyle),
                        _ctx.customStyle
                    )), "ref" to "overlayRef", "onTouchstart" to onTouchstart, "onClick" to overlayClick, "onTouchmove" to onTouchmove), _uA(
                        renderSlot(_ctx.`$slots`, "default")
                    ), 38)
                } else {
                    _cC("v-if", true)
                }
            }
        }
        var name = "rice-overlay"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-overlay" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "height" to "100%", "width" to "100%", "backgroundColor" to "var(--rice-overlay-background)", "transitionProperty" to "opacity", "opacity" to 0)), "rice-overlay--show" to _pS(_uM("opacity" to 1)), "@TRANSITION" to _uM("rice-overlay" to _uM("property" to "opacity")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "opened" to null, "closed" to null, "update:show" to null)
        var props = _nP(_uM("zIndex" to _uM("type" to "Number", "required" to false, "default" to 998), "closeOnClickOverlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "duration" to _uM("type" to "Number", "required" to false, "default" to 300), "bgColor" to _uM("type" to "String", "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "show" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "zIndex",
            "closeOnClickOverlay",
            "duration",
            "customStyle",
            "show"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
