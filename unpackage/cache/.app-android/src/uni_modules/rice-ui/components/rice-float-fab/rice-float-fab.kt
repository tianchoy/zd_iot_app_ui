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
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
open class GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var axis: String by `$props`
    open var adsorption: String? by `$props`
    open var gap: Any by `$props`
    open var gapTop: Any? by `$props`
    open var gapBottom: Any? by `$props`
    open var gapLeft: Any? by `$props`
    open var gapRight: Any? by `$props`
    open var overGap: Boolean by `$props`
    open var defaultPosition: String by `$props`
    open var duration: Number by `$props`
    open var icon: String? by `$props`
    open var iconColor: String by `$props`
    open var iconSize: Any by `$props`
    open var height: Any by `$props`
    open var width: Any by `$props`
    open var radius: Any? by `$props`
    open var bgColor: String? by `$props`
    open var disabled: Boolean by `$props`
    open var zIndex: Number? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var offset: Any? by `$props`
    open var resize: () -> UTSPromise<Unit>
        get() {
            return unref(this.`$exposed`["resize"]) as () -> UTSPromise<Unit>
        }
        set(value) {
            setRefValue(this.`$exposed`, "resize", value)
        }
    open var setDefaultPosition: (position: String) -> Unit
        get() {
            return unref(this.`$exposed`["setDefaultPosition"]) as (position: String) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setDefaultPosition", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab
            val _cache = __ins.renderCache
            val ns = useNamespace("float-fab")
            val touch = useTouch()
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val offset = useModel<FloatFabOffset>(__ins.props, "offset")
            val windowSize = reactive<FloatFabWindowSize>(FloatFabWindowSize(width = 0, height = 0))
            val state = reactive<FloatFabState>(FloatFabState(x = 0, y = 0, width = 0, height = 0))
            val lastOffset = FloatFabOffset(x = 0, y = 0)
            var initialized = false
            var timer: Number? = null
            var initTimer: Number? = null
            val fabRef = shallowRef<UniElement?>(null)
            val boundaryBottom = computed(fun(): Number {
                return getPxNum(props.gapBottom ?: props.gap)
            }
            )
            val boundaryRight = computed(fun(): Number {
                return getPxNum(props.gapRight ?: props.gap)
            }
            )
            val boundary = computed(fun(): FloatFabBoundary {
                return FloatFabBoundary(top = getPxNum(props.gapTop ?: props.gap), bottom = windowSize.height - state.height - boundaryBottom.value, left = getPxNum(props.gapLeft ?: props.gap), right = windowSize.width - state.width - boundaryRight.value)
            }
            )
            val setTransform = fun(x: Number, y: Number){
                fabRef.value?.style?.setProperty("transform", "translate(" + x + "px," + y + "px)")
                fabRef.value?.style?.setProperty("opacity", "1")
            }
            val updateOffset = fun(){
                offset.value = FloatFabOffset(x = state.x, y = state.y)
            }
            val setPosition = fun(){
                val duration = if ((touch.dragging.value || !initialized)) {
                    0
                } else {
                    props.duration
                }
                fabRef.value?.style?.setProperty("transition-duration", "" + duration + "ms")
                setTransform(state.x, state.y)
            }
            val getFabSize = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val rect = await(fabRef.value!!.getBoundingClientRectAsync()!!)
                        state.height = rect.height
                        state.width = rect.width
                })
            }
            fun setDefPosition(position: String?, isInit: Boolean = false) {
                if (position == "top-left") {
                    state.x = boundary.value.left
                    state.y = boundary.value.top
                } else if (position == "top-right") {
                    state.x = boundary.value.right
                    state.y = boundary.value.top
                } else if (position == "bottom-left") {
                    state.x = boundary.value.left
                    state.y = boundary.value.bottom
                } else {
                    state.x = boundary.value.right
                    state.y = boundary.value.bottom
                }
                setPosition()
                if (!isInit) {
                    updateOffset()
                }
            }
            val updateState = fun(reassignedX: Number, reassignedY: Number){
                var x = reassignedX
                var y = reassignedY
                if (props.adsorption == "x") {
                    x = closeto(_uA(
                        boundary.value.left,
                        boundary.value.right
                    ), x)
                } else if (props.adsorption == "y") {
                    y = closeto(_uA(
                        boundary.value.top,
                        boundary.value.bottom
                    ), y)
                }
                x = clamp(x, boundary.value.left, boundary.value.right)
                y = clamp(y, boundary.value.top, boundary.value.bottom)
                state.x = x
                state.y = y
                setPosition()
            }
            fun updatePosition(isInit: Boolean = false) {
                var x = offset.value!!.x
                var y = offset.value!!.y
                if (isInit && (x < 0 || y < 0)) {
                    val position = props.defaultPosition
                    if (position == "top-left") {
                        setTransform(-state.width, boundary.value.top)
                    } else if (position == "top-right") {
                        setTransform(windowSize.width + state.width, boundary.value.top)
                    } else if (position == "bottom-left") {
                        setTransform(-state.width, boundary.value.bottom)
                    } else {
                        setTransform(windowSize.width + state.width, boundary.value.bottom)
                    }
                    initTimer = setTimeout(fun(){
                        initialized = true
                        setDefPosition(position, isInit)
                    }, 20)
                } else {
                    updateState(x, y)
                    updateOffset()
                }
                initialized = true
            }
            fun init(isInit: Boolean = false): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(nextTick())
                        val windowInfo = uni_getWindowInfo()
                        windowSize.height = windowInfo.windowHeight
                        windowSize.width = windowInfo.windowWidth
                        await(getFabSize())
                        updatePosition(isInit)
                })
            }
            watch(offset, fun(){
                val isSame = offset.value!!.x == state.x && offset.value!!.y == state.y
                if (isSame || touch.dragging.value) {
                    return
                }
                updatePosition()
            }
            , WatchOptions(deep = true))
            watch(fun(): UTSArray<Any?> {
                return _uA(
                    props.gap,
                    props.gapTop,
                    props.gapBottom,
                    props.gapLeft,
                    props.gapRight,
                    props.overGap
                )
            }
            , fun(){
                if (touch.dragging.value) {
                    return
                }
                updateState(state.x, state.y)
            }
            , WatchOptions(deep = true))
            watch(fun(): UTSArray<Any> {
                return _uA(
                    props.height,
                    props.width
                )
            }
            , fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (touch.dragging.value) {
                            return@w1
                        }
                        await(nextTick())
                        await(getFabSize())
                        updateState(state.x, state.y)
                })
            }
            , WatchOptions(deep = true))
            val onTouchstart = fun(e: UniTouchEvent){
                touch.start(e)
                if (isTruthy(props.disabled)) {
                    return
                }
                fabRef.value!!.style.setProperty("transition-duration", "0ms")
                lastOffset.x = state.x
                lastOffset.y = state.y
                getFabSize()
            }
            val onTouchmove = fun(e: UniTouchEvent){
                touch.move(e)
                if (isTruthy(props.disabled) || touch.isTap.value) {
                    return
                }
                var nextX = lastOffset.x + touch.deltaX.value
                var nextY = lastOffset.y + touch.deltaY.value
                val axis = props.axis
                if (axis == "x" || axis == "xy") {
                    if (isTruthy(props.overGap)) {
                        nextX = clamp(nextX, 0, boundary.value.right + boundaryRight.value)
                    } else {
                        nextX = clamp(nextX, boundary.value.left, boundary.value.right)
                    }
                    state.x = nextX
                }
                if (axis == "y" || axis == "xy") {
                    if (isTruthy(props.overGap)) {
                        nextY = clamp(nextY, 0, boundary.value.bottom + boundaryBottom.value)
                    } else {
                        nextY = clamp(nextY, boundary.value.top, boundary.value.bottom)
                    }
                    state.y = nextY
                }
                updateOffset()
                setPosition()
                e.preventDefault()
            }
            val onTouchend = fun(){
                touch.end()
                if (touch.isTap.value) {
                    emit("click")
                } else {
                    if (isTruthy(props.disabled)) {
                        return
                    }
                    updateState(state.x, state.y)
                    updateOffset()
                    if (lastOffset.x != state.x || lastOffset.y != state.y) {
                        emit("offsetChange", FloatFabOffset(x = state.x, y = state.y))
                    }
                }
            }
            val floatFabStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                css.set("height", addUnit(props.height))
                css.set("width", addUnit(props.width))
                css.set("border-radius", if (props.radius == null) {
                    "999px"
                } else {
                    addUnit(props.radius!!)
                }
                )
                if (props.zIndex != null) {
                    css.set("z-index", props.zIndex!!)
                }
                if (props.bgColor != null) {
                    css.set("background", props.bgColor!!)
                }
                return css
            }
            )
            val fabClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme()
                )
            }
            )
            val resize = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        init(true)
                })
            }
            onMounted(fun(){
                timer = setTimeout(fun(){
                    init(true)
                }
                , 200)
            }
            )
            onUnmounted(fun(){
                if (timer != null) {
                    clearTimeout(timer!!)
                }
                if (initTimer != null) {
                    clearTimeout(initTimer!!)
                }
            }
            )
            val setDefaultPosition = fun(position: String){
                setDefPosition(position, false)
            }
            __expose(_uM("resize" to resize, "setDefaultPosition" to setDefaultPosition))
            return fun(): Any? {
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE("view", _uM("class" to _nC(unref(fabClass)), "style" to _nS(_uA(
                    unref(floatFabStyle),
                    _ctx.customStyle
                )), "ref_key" to "fabRef", "ref" to fabRef, "onTouchstart" to onTouchstart, "onTouchmove" to onTouchmove, "onTouchend" to onTouchend, "onTouchcancel" to onTouchend), _uA(
                    renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                        return _uA(
                            if (isTrue(unref(hasStrValue)(_ctx.icon))) {
                                _cV(_component_rice_icon, _uM("key" to 0, "name" to _ctx.icon, "color" to _ctx.iconColor, "size" to _ctx.iconSize), null, 8, _uA(
                                    "name",
                                    "color",
                                    "size"
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    )
                ), 38)
            }
        }
        var name = "rice-float-fab"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-float-fab" to _pS(_uM("position" to "fixed", "left" to 0, "top" to 0, "zIndex" to 998, "alignItems" to "center", "justifyContent" to "center", "transitionProperty" to "all", "transform" to "translate(0, 0)", "backgroundImage" to "none", "backgroundColor" to "var(--rice-primary-color)", "pointerEvents" to "auto", "opacity" to 0)), "@TRANSITION" to _uM("rice-float-fab" to _uM("property" to "all")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "offsetChange" to null, "update:offset" to null)
        var props = _nP(_uM("axis" to _uM("type" to "String", "required" to false, "default" to "xy"), "adsorption" to _uM("type" to "String", "required" to false), "gap" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false, "default" to "24px"), "gapTop" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false), "gapBottom" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false), "gapLeft" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false), "gapRight" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false), "overGap" to _uM("type" to "Boolean", "required" to false, "default" to true), "defaultPosition" to _uM("type" to "String", "required" to false, "default" to "bottom-right"), "duration" to _uM("type" to "Number", "required" to false, "default" to 300), "icon" to _uM("type" to "String", "required" to false), "iconColor" to _uM("type" to "String", "required" to false, "default" to "#fff"), "iconSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "30px"), "height" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "52px"), "width" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "52px"), "radius" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "disabled" to _uM("type" to "Boolean", "required" to false, "default" to false), "zIndex" to _uM("type" to "Number", "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "offset" to _uM("default" to fun(): FloatFabOffset {
            return (FloatFabOffset(x = -1, y = -1))
        }
        )))
        var propsNeedCastKeys = _uA(
            "axis",
            "gap",
            "overGap",
            "defaultPosition",
            "duration",
            "iconColor",
            "iconSize",
            "height",
            "width",
            "disabled",
            "customStyle",
            "offset"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
