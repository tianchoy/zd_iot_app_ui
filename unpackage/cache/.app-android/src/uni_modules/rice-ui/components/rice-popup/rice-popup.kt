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
import io.dcloud.uniapp.extapi.getElementById as uni_getElementById
open class GenUniModulesRiceUiComponentsRicePopupRicePopup : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var duration: Number by `$props`
    open var position: String by `$props`
    open var zIndex: Number by `$props`
    open var opacity: Boolean? by `$props`
    open var zoom: Boolean by `$props`
    open var overlay: Boolean by `$props`
    open var overlayBgColor: String? by `$props`
    open var closeable: Boolean by `$props`
    open var closeIcon: String by `$props`
    open var closeIconPosition: String by `$props`
    open var closeOnClickOverlay: Boolean by `$props`
    open var radius: Any? by `$props`
    open var bgColor: String? by `$props`
    open var safeAreaInsetTop: Boolean by `$props`
    open var safeAreaInsetBottom: Boolean by `$props`
    open var closeOnSlideDown: Boolean by `$props`
    open var slideDownThreshold: Number by `$props`
    open var showDragBar: Boolean? by `$props`
    open var dragWrapClass: Any? by `$props`
    open var dragBarClass: Any? by `$props`
    open var lockScroll: Boolean by `$props`
    open var scrollId: String? by `$props`
    open var beforeClose: Any? by `$props`
    open var marginTop: Any? by `$props`
    open var popupClass: Any? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var show: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRicePopupRicePopup) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRicePopupRicePopup
            val _cache = __ins.renderCache
            useSafeArea()
            val ns = useNamespace("popup")
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val show = useModel<Boolean>(__ins.props, "show")
            val popupRef = shallowRef<UniElement?>(null)
            val _opacity = computed<Boolean>(fun(): Boolean {
                if (props.opacity != null) {
                    return props.opacity!!
                }
                return props.position == "center"
            }
            )
            val _usePopup = usePopup(popupRef, UsePopupOptions(show = show, position = toRef(fun(): String {
                return props.position
            }
            ), duration = toRef(fun(): Number {
                return props.duration
            }
            ), opacity = toRef(fun(): Boolean {
                return _opacity.value
            }
            ), zoom = toRef(fun(): Boolean {
                return props.zoom
            }
            ), beforeClose = toRef(fun(): BeforeChangeInterceptor? {
                return props.beforeClose as BeforeChangeInterceptor?
            }
            )))
            val realShow = _usePopup.realShow
            val doClose = _usePopup.doClose
            val handleClose = fun(e: UniPointerEvent){
                e.stopPropagation()
                doClose()
            }
            val overlayClick = fun(){
                emit("clickOverlay")
                if (!isTruthy(props.closeOnClickOverlay)) {
                    return
                }
                doClose()
            }
            var isAnimation = false
            var halfScreenY: Number = 0
            var currentY: Number = 0
            var previousY: Number = 0
            var lastDragDirection: Number = 0
            var halfOffset: Number = 0
            var scrollEl: UniElement? = null
            var contentTouchStartY: Number = 0
            var isContentDragging = false
            val canDrag = computed(fun(): Boolean {
                return props.position == "bottom"
            }
            )
            val lockScrollAtTop = fun(){
                if (scrollEl == null) {
                    return
                }
                if (scrollEl!!.scrollTop > 0) {
                    scrollEl!!.scrollTop = 0
                }
            }
            val resetDragState = fun(startY: Number){
                halfScreenY = startY
                currentY = startY
                previousY = startY
                lastDragDirection = 0
                halfOffset = 0
                popupRef.value?.style?.setProperty("transition-duration", "0ms")
            }
            val onDragstart = fun(e: UniTouchEvent){
                val startY = e.touches[0].screenY
                resetDragState(startY)
                isContentDragging = false
            }
            val onDragmove = fun(e: UniTouchEvent){
                if (isAnimation || !canDrag.value) {
                    return
                }
                var p = e.touches[0]
                previousY = currentY
                currentY = p.screenY
                val moveDelta = currentY - previousY
                if (Math.abs(moveDelta) >= 2) {
                    lastDragDirection = if (moveDelta > 0) {
                        1
                    } else {
                        -1
                    }
                }
                if (halfScreenY == 0) {
                    halfScreenY = p.screenY
                }
                var offset = p.screenY - halfScreenY
                if (offset > 0) {
                    lockScrollAtTop()
                    popupRef.value?.style?.setProperty("transform", "translateY(" + offset + "px)")
                    halfOffset = offset
                }
            }
            val resumedPopup = fun(){
                popupRef.value?.style?.setProperty("transform", "translateY(0px)")
                halfScreenY = 0
                halfOffset = 0
                lastDragDirection = 0
                isContentDragging = false
                isAnimation = false
            }
            val onDragend = fun(){
                popupRef.value?.style?.setProperty("transition-duration", "" + props.duration + "ms")
                if (!canDrag.value) {
                    return
                }
                halfScreenY = 0
                if (isAnimation) {
                    return
                }
                val threshold = Math.max(0, props.slideDownThreshold)
                val isLastSwipeUp = lastDragDirection < 0
                var shouldClose = halfOffset >= threshold && !isLastSwipeUp
                if (shouldClose) {
                    isContentDragging = false
                    doClose()
                } else {
                    resumedPopup()
                }
            }
            val onContentstart = fun(e: UniTouchEvent){
                if (!isTruthy(props.closeOnSlideDown)) {
                    return
                }
                if (props.scrollId != null && props.scrollId != "") {
                    scrollEl = uni_getElementById(props.scrollId!!)
                } else {
                    scrollEl = null
                }
                contentTouchStartY = e.touches[0].screenY
                isContentDragging = false
                resetDragState(contentTouchStartY)
            }
            val onContentmove = fun(e: UniTouchEvent){
                if (!isTruthy(props.closeOnSlideDown)) {
                    return
                }
                if (!canDrag.value || isAnimation) {
                    return
                }
                val currentTouchY = e.touches[0].screenY
                val gestureOffset = currentTouchY - contentTouchStartY
                val isMovingDown = gestureOffset > 0
                if (isContentDragging) {
                    lockScrollAtTop()
                    onDragmove(e)
                    return
                }
                if (!isMovingDown) {
                    return
                }
                val top = scrollEl?.scrollTop ?: 0
                if (top >= 0.01) {
                    return
                }
                isContentDragging = true
                resetDragState(contentTouchStartY)
                lockScrollAtTop()
                onDragmove(e)
            }
            val onContentend = fun(){
                popupRef.value?.style?.setProperty("transition-duration", "" + props.duration + "ms")
                if (!isTruthy(props.closeOnSlideDown)) {
                    return
                }
                if (!isContentDragging) {
                    resumedPopup()
                    return
                }
                onDragend()
            }
            val rootClass = computed(fun(): UTSArray<String> {
                val isZoom = if (isTruthy(props.zoom)) {
                    props.position == "center"
                } else {
                    props.zoom
                }
                val basic = _uA<String>(ns.theme(), ns.`is`("opacity", _opacity.value), ns.m(props.position), ns.`is`("zoom", isZoom))
                return basic
            }
            )
            val popupStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                val position = props.position
                css.set("z-index", props.zIndex)
                if (props.bgColor != null) {
                    css.set("background-color", props.bgColor!!)
                }
                if (props.position == "center" && props.marginTop != null) {
                    css.set("margin-top", addUnit(props.marginTop!!))
                }
                if (props.position != "center" && isTruthy(props.safeAreaInsetBottom)) {
                    css.set("padding-bottom", safeAreaInsets.value.bottom + "px")
                }
                if (props.position != "center" && isTruthy(props.safeAreaInsetTop)) {
                    css.set("padding-top", safeAreaInsets.value.top + "px")
                }
                if (props.radius != null) {
                    val radius = addUnit(props.radius!!)
                    if (position == "top") {
                        css.set("border-bottom-left-radius", radius)
                        css.set("border-bottom-right-radius", radius)
                    } else if (position == "bottom") {
                        css.set("border-top-left-radius", radius)
                        css.set("border-top-right-radius", radius)
                    } else if (position == "left") {
                        css.set("border-top-right-radius", radius)
                        css.set("border-bottom-right-radius", radius)
                    } else if (position == "right") {
                        css.set("border-top-left-radius", radius)
                        css.set("border-bottom-left-radius", radius)
                    } else {
                        css.set("border-radius", radius)
                    }
                }
                return css
            }
            )
            val closeStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.position != "center" && isTruthy(props.safeAreaInsetBottom)) {
                    css.set("bottom", safeAreaInsets.value.bottom + "px")
                }
                if (props.position != "center" && isTruthy(props.safeAreaInsetTop)) {
                    css.set("top", safeAreaInsets.value.top + "px")
                }
                return css
            }
            )
            return fun(): Any? {
                val _component_rice_overlay = resolveEasyComponent("rice-overlay", GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayClass)
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(_ctx.overlay)) {
                        _cV(_component_rice_overlay, _uM("key" to 0, "show" to show.value, "z-index" to (_ctx.zIndex - 1), "close-on-click-overlay" to false, "bg-color" to _ctx.overlayBgColor, "onClick" to overlayClick), null, 8, _uA(
                            "show",
                            "z-index",
                            "bg-color"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(unref(realShow))) {
                        _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                            "rice-popup",
                            _uA(
                                _ctx.popupClass,
                                unref(rootClass)
                            )
                        )), "style" to _nS(_uA(
                            unref(popupStyle),
                            _ctx.customStyle
                        )), "ref_key" to "popupRef", "ref" to popupRef, "onTouchstart" to onContentstart, "onTouchmove" to withModifiers(onContentmove, _uA(
                            "stop"
                        )), "onTouchend" to onContentend, "onTouchcancel" to onContentend), _uA(
                            if (isTrue(_ctx.closeable)) {
                                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                    "rice-popup__close",
                                    "rice-popup__close--" + _ctx.closeIconPosition
                                )), "style" to _nS(unref(closeStyle)), "onClick" to withModifiers(handleClose, _uA(
                                    "stop"
                                ))), _uA(
                                    _cV(_component_rice_icon, _uM("name" to _ctx.closeIcon, "size" to "20px"), null, 8, _uA(
                                        "name"
                                    ))
                                ), 6)
                            } else {
                                _cC("v-if", true)
                            },
                            if (isTrue(_ctx.showDragBar == true && _ctx.position == "bottom")) {
                                _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                                    "rice-popup__drag",
                                    _ctx.dragWrapClass
                                )), "onTouchstart" to onDragstart, "onTouchmove" to withModifiers(onDragmove, _uA(
                                    "stop"
                                )), "onTouchend" to withModifiers(onDragend, _uA(
                                    "stop"
                                )), "onTouchcancel" to withModifiers(onDragend, _uA(
                                    "stop"
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "drag", _uO(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "rice-popup__drag__bar",
                                                _ctx.dragBarClass
                                            ))), null, 2)
                                        )
                                    })
                                ), 34)
                            } else {
                                _cC("v-if", true)
                            },
                            renderSlot(_ctx.`$slots`, "default")
                        ), 38)
                    } else {
                        _cC("v-if", true)
                    }
                ), 64)
            }
        }
        var name = "rice-popup"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-popup" to _pS(_uM("position" to "fixed", "backgroundColor" to "var(--rice-background-2)", "transform" to "translate(0, 0) scale(1)", "transitionProperty" to "transform,opacity")), "rice-popup__drag" to _pS(_uM("justifyContent" to "center", "alignItems" to "center", "minHeight" to 32)), "rice-popup__drag__bar" to _pS(_uM("height" to 3, "borderTopLeftRadius" to 6, "borderTopRightRadius" to 6, "borderBottomRightRadius" to 6, "borderBottomLeftRadius" to 6, "width" to 20, "backgroundColor" to "#c8c9cc")), "rice-popup--opacity" to _pS(_uM("opacity" to 0)), "rice-popup--center" to _pS(_uM("top" to "50%", "left" to "50%", "transform" to "translate(-50%, -50%)")), "rice-popup--zoom" to _pS(_uM("transform" to "translate(-50%, -50%) scale(0.6)")), "rice-popup--top" to _pS(_uM("top" to 0, "left" to 0, "width" to "100%", "transform" to "translate(0, -100%)")), "rice-popup--bottom" to _pS(_uM("bottom" to 0, "left" to 0, "width" to "100%", "transform" to "translate(0px, 100%)")), "rice-popup--left" to _pS(_uM("top" to 0, "bottom" to 0, "left" to 0, "transform" to "translate(-100%, 0)")), "rice-popup--right" to _pS(_uM("top" to 0, "bottom" to 0, "right" to 0, "transform" to "translate(100%, 0)")), "rice-popup__close" to _pS(_uM("position" to "absolute", "zIndex" to 9, "paddingTop" to 16, "paddingRight" to 16, "paddingBottom" to 0, "paddingLeft" to 0)), "rice-popup__close--top-left" to _pS(_uM("top" to 0, "left" to 0)), "rice-popup__close--top-right" to _pS(_uM("top" to 0, "right" to 0)), "rice-popup__close--bottom-left" to _pS(_uM("bottom" to 0, "left" to 0)), "rice-popup__close--bottom-right" to _pS(_uM("bottom" to 0, "right" to 0)), "@TRANSITION" to _uM("rice-popup" to _uM("property" to "transform,opacity")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("open" to null, "close" to null, "opened" to null, "closed" to null, "clickOverlay" to null, "update:show" to null)
        var props = _nP(_uM("duration" to _uM("type" to "Number", "required" to false, "default" to 300), "position" to _uM("type" to "String", "required" to false, "default" to "bottom"), "zIndex" to _uM("type" to "Number", "required" to false, "default" to 999), "opacity" to _uM("type" to "Boolean", "required" to false, "default" to null), "zoom" to _uM("type" to "Boolean", "required" to false, "default" to true), "overlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "overlayBgColor" to _uM("type" to "String", "required" to false), "closeable" to _uM("type" to "Boolean", "required" to false, "default" to true), "closeIcon" to _uM("type" to "String", "required" to false, "default" to "cross"), "closeIconPosition" to _uM("type" to "String", "required" to false, "default" to "top-right"), "closeOnClickOverlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "radius" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "safeAreaInsetTop" to _uM("type" to "Boolean", "required" to false, "default" to false), "safeAreaInsetBottom" to _uM("type" to "Boolean", "required" to false, "default" to true), "closeOnSlideDown" to _uM("type" to "Boolean", "required" to false, "default" to false), "slideDownThreshold" to _uM("type" to "Number", "required" to false, "default" to 40), "showDragBar" to _uM("type" to "Boolean", "required" to false), "dragWrapClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "dragBarClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "lockScroll" to _uM("type" to "Boolean", "required" to false, "default" to true), "scrollId" to _uM("type" to "String", "required" to false), "beforeClose" to _uM("required" to false), "marginTop" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "popupClass" to _uM("type" to null, "required" to false, "default" to "", "externalClasses" to true, "skipCheck" to true), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "show" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "duration",
            "position",
            "zIndex",
            "opacity",
            "zoom",
            "overlay",
            "closeable",
            "closeIcon",
            "closeIconPosition",
            "closeOnClickOverlay",
            "safeAreaInsetTop",
            "safeAreaInsetBottom",
            "closeOnSlideDown",
            "slideDownThreshold",
            "showDragBar",
            "dragWrapClass",
            "dragBarClass",
            "lockScroll",
            "popupClass",
            "customStyle",
            "show"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
