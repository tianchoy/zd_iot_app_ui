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
open class GenUniModulesRiceUiComponentsRiceDialogRiceDialog : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var title: String? by `$props`
    open var width: Any? by `$props`
    open var message: String? by `$props`
    open var messageAlign: String by `$props`
    open var buttonTheme: String by `$props`
    open var buttonLayout: String by `$props`
    open var showConfirmButton: Boolean by `$props`
    open var confirmButtonText: String by `$props`
    open var confirmButtonColor: String? by `$props`
    open var confirmButtonDisabled: Boolean by `$props`
    open var showCancelButton: Boolean by `$props`
    open var cancelButtonText: String by `$props`
    open var cancelButtonColor: String? by `$props`
    open var cancelButtonDisabled: Boolean by `$props`
    open var duration: Number by `$props`
    open var overlay: Boolean by `$props`
    open var overlayBgColor: String by `$props`
    open var closeOnClickOverlay: Boolean by `$props`
    open var beforeClose: Any? by `$props`
    open var zIndex: Number by `$props`
    open var bgColor: String? by `$props`
    open var marginTop: Any? by `$props`
    open var useDialogPage: Boolean by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var confirm: (() -> Unit)? by `$props`
    open var cancel: (() -> Unit)? by `$props`
    open var clickOverlay: (() -> Unit)? by `$props`
    open var open: (() -> Unit)? by `$props`
    open var close: (() -> Unit)? by `$props`
    open var opened: (() -> Unit)? by `$props`
    open var closed: (() -> Unit)? by `$props`
    open var ready: ((pageIns: UniPage) -> Unit)? by `$props`
    open var fail: ((errMsg: String) -> Unit)? by `$props`
    open var show: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceDialogRiceDialog) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceDialogRiceDialog
            val _cache = __ins.renderCache
            val ns = useNamespace("dialog")
            val slots = useSlots()
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val show = useModel<Boolean>(__ins.props, "show")
            val props = __props
            val hasTitle = computed(fun(): Boolean {
                return slots["title"] != null || hasStrValue(props.title)
            }
            )
            var openTimer: Number? = null
            var openedTimer: Number? = null
            var closeTimer: Number? = null
            val handleOpenTimer = fun(){
                if (openTimer != null) {
                    clearTimeout(openTimer!!)
                }
                if (openedTimer != null) {
                    clearTimeout(openedTimer!!)
                }
            }
            val handleCloseTimer = fun(){
                if (closeTimer != null) {
                    clearTimeout(closeTimer!!)
                }
            }
            val realShow = ref(false)
            val dialogRef = shallowRef<UniElement?>(null)
            val open = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (realShow.value) {
                            return@w1
                        }
                        realShow.value = true
                        await(nextTick())
                        handleOpenTimer()
                        openTimer = setTimeout(fun(){
                            dialogRef.value?.style?.setProperty("transition-duration", props.duration + "ms")
                            dialogRef.value?.style?.setProperty("opacity", "1")
                            dialogRef.value?.style?.setProperty("transform", "translate(-50%, -50%) scale(1)")
                            openedTimer = setTimeout(fun(){
                                emit("opened")
                            }
                            , props.duration)
                        }
                        , 30)
                })
            }
            val hasDialogPage = ref(true)
            val isUseDialogPage = computed(fun(): Boolean {
                return props.useDialogPage == true && hasDialogPage.value && slots["title"] == null && slots["default"] == null && slots["footer"] == null
            }
            )
            val dialogPageIns = ref<UniPage?>(null)
            val handleShowDialog = fun(){
                showDialog(DialogProps(title = props.title, message = props.message, messageAlign = props.messageAlign, buttonTheme = props.buttonTheme, buttonLayout = props.buttonLayout, showConfirmButton = props.showConfirmButton, confirmButtonText = props.confirmButtonText, confirmButtonColor = props.confirmButtonColor, confirmButtonDisabled = props.confirmButtonDisabled, showCancelButton = props.showCancelButton, cancelButtonText = props.cancelButtonText, cancelButtonColor = props.cancelButtonColor, cancelButtonDisabled = props.cancelButtonDisabled, duration = props.duration, overlay = props.overlay, overlayBgColor = props.overlayBgColor, closeOnClickOverlay = props.closeOnClickOverlay, beforeClose = props.beforeClose as BeforeChangeInterceptor?, bgColor = props.bgColor, zIndex = props.zIndex, marginTop = props.marginTop, confirm = fun(){
                    emit("confirm")
                }
                , cancel = fun(){
                    emit("cancel")
                }
                , ready = fun(pageIns: UniPage?){
                    dialogPageIns.value = pageIns
                    hasDialogPage.value = true
                }
                , open = fun(){
                    emit("open")
                }
                , close = fun(){
                    if (show.value != null) {
                        show.value = false
                        emit("close")
                    }
                }
                , opened = fun(){
                    emit("opened")
                }
                , closed = fun(){
                    emit("closed")
                }
                , fail = fun(_errMsg){
                    hasDialogPage.value = false
                    emit("open")
                    open()
                }
                ))
            }
            watch(fun(): UTSArray<Any?> {
                return _uA(
                    props.title,
                    props.message
                )
            }
            , fun(){
                if (show.value != null) {
                    dialogPageIns.value?.vm?.`$callMethod`("updateParams", DialogProps(title = props.title, message = props.message))
                }
            }
            )
            val showOverlay = computed(fun(): Any {
                return if (isUseDialogPage.value) {
                    false
                } else {
                    props.overlay
                }
            }
            )
            val close = fun(){
                if (!realShow.value) {
                    return
                }
                dialogRef.value?.style?.setProperty("opacity", "0")
                dialogRef.value?.style?.setProperty("transform", "translate(-50%, -50%) scale(0.85)")
                handleCloseTimer()
                closeTimer = setTimeout(fun(){
                    realShow.value = false
                    emit("closed")
                    dialogPageIns.value = null
                }
                , props.duration)
            }
            val confirmLoading = ref(false)
            val confirm = fun(){
                if (isTruthy(props.confirmButtonDisabled) || confirmLoading.value) {
                    return
                }
                emit("confirm")
                if (UTSAndroid.`typeof`(props.beforeClose) != "function") {
                    show.value = false
                    return
                }
                confirmLoading.value = true
                callInterceptor(props.beforeClose as BeforeChangeInterceptor, InterceptorOption(done = fun() {
                    show.value = false
                }
                , complete = fun() {
                    confirmLoading.value = false
                }
                ))
            }
            val cancel = fun(){
                if (isTruthy(props.cancelButtonDisabled)) {
                    return
                }
                show.value = false
                emit("cancel")
            }
            val overlayClick = fun(){
                if (isTruthy(props.closeOnClickOverlay)) {
                    show.value = false
                }
                emit("clickOverlay")
            }
            watch(show, fun(newVal: Boolean){
                if (newVal && !realShow.value) {
                    if (isUseDialogPage.value) {
                        handleShowDialog()
                        return
                    }
                    open()
                    emit("open")
                }
                if (!newVal && realShow.value) {
                    close()
                    emit("close")
                }
            }
            , WatchOptions(immediate = true))
            val cancelButtonHover = computed(fun(): String {
                return if (isTruthy(props.cancelButtonDisabled)) {
                    "none"
                } else {
                    "rice-dialog__button--" + (if (isDark.value) {
                        "hover--dark"
                    } else {
                        "hover"
                    }
                    )
                }
            }
            )
            val confirmButtonHover = computed(fun(): String {
                return if ((isTruthy(props.confirmButtonDisabled) || confirmLoading.value)) {
                    "none"
                } else {
                    "rice-dialog__button--" + (if (isDark.value) {
                        "hover--dark"
                    } else {
                        "hover"
                    }
                    )
                }
            }
            )
            val dialogStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                css.set("z-index", props.zIndex)
                if (props.width != null) {
                    css.set("width", addUnit(props.width!!))
                }
                if (props.marginTop != null) {
                    css.set("margin-top", addUnit(props.marginTop!!))
                }
                if (hasStrValue(props.bgColor)) {
                    css.set("background-color", props.bgColor!!)
                }
                return css
            }
            )
            val cancelTextStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (hasStrValue(props.cancelButtonColor)) {
                    css.set("color", props.cancelButtonColor!!)
                }
                return css
            }
            )
            val confirmTextStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (hasStrValue(props.confirmButtonColor)) {
                    css.set("color", props.confirmButtonColor!!)
                }
                return css
            }
            )
            val dialogClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme()
                )
            }
            )
            val contentClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.e("content"),
                    ns.`is`("__content--has-title", hasTitle.value)
                )
            }
            )
            val messageTextClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.e("message__text"),
                    ns.e("message__" + props.messageAlign)
                )
            }
            )
            val footerClass = computed(fun(): UTSArray<String> {
                val hasSlot = slots["footer"] != null
                val isDefaultTheme = props.buttonTheme == "default"
                return _uA(
                    ns.e("footer"),
                    ns.`is`("__footer--border", isDefaultTheme && !hasSlot),
                    ns.`is`("__footer--vertical", props.buttonLayout == "col" && !isDefaultTheme && !hasSlot),
                    ns.`is`("__footer--btn", !isDefaultTheme && !hasSlot)
                )
            }
            )
            val getButtonClass = fun(type: String): UTSArray<String> {
                val base = _uA(
                    ns.e("button"),
                    ns.`is`("__button--disabled", if (type == "cancel") {
                        props.cancelButtonDisabled
                    } else {
                        props.confirmButtonDisabled
                    }
                    )
                )
                if (type == "cancel" && isTruthy(props.showConfirmButton)) {
                    base.push(ns.e("button--border"))
                }
                return base
            }
            val cancelButtonStyle = computed(fun(): Map<String, Any> {
                val isVertical = props.buttonLayout == "col"
                val css = Map<String, Any>()
                if (props.buttonLayout == "row") {
                    css.set("flex", 1)
                }
                css.set("marginRight", if (isTruthy(props.showConfirmButton) && !isVertical) {
                    "12px"
                } else {
                    "0px"
                }
                )
                css.set("marginTop", if (isTruthy(props.showConfirmButton) && isVertical) {
                    "12px"
                } else {
                    "0px"
                }
                )
                return css
            }
            )
            val confirmButtonStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                if (props.buttonLayout == "row") {
                    css.set("flex", 1)
                }
                return css
            }
            )
            onUnmounted(fun(){
                handleOpenTimer()
                handleCloseTimer()
            }
            )
            return fun(): Any? {
                val _component_rice_overlay = resolveEasyComponent("rice-overlay", GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                val _component_rice_loading = resolveEasyComponent("rice-loading", GenUniModulesRiceUiComponentsRiceLoadingRiceLoadingClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(unref(showOverlay))) {
                        _cV(_component_rice_overlay, _uM("key" to 0, "show" to show.value, "duration" to _ctx.duration, "close-on-click-overlay" to false, "bg-color" to _ctx.overlayBgColor, "z-index" to (_ctx.zIndex - 1), "onClick" to overlayClick), null, 8, _uA(
                            "show",
                            "duration",
                            "bg-color",
                            "z-index"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(unref(realShow))) {
                        _cE("view", _uM("key" to 1, "class" to _nC(unref(dialogClass)), "style" to _nS(_uA(
                            unref(dialogStyle),
                            _ctx.customStyle
                        )), "ref_key" to "dialogRef", "ref" to dialogRef), _uA(
                            if (isTrue(unref(hasTitle))) {
                                _cE("view", _uM("key" to 0, "class" to "rice-dialog__title"), _uA(
                                    renderSlot(_ctx.`$slots`, "title", _uO(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("text", _uM("class" to "rice-dialog__title__text"), _tD(_ctx.title), 1)
                                        )
                                    })
                                ))
                            } else {
                                _cC("v-if", true)
                            },
                            _cE("view", _uM("class" to _nC(unref(contentClass))), _uA(
                                renderSlot(_ctx.`$slots`, "default", _uO(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (isTrue(unref(hasStrValue)(_ctx.message))) {
                                            _cE("scroll-view", _uM("key" to 0, "class" to "rice-dialog__message", "show-scrollbar" to false), _uA(
                                                _cE("text", _uM("class" to _nC(unref(messageTextClass))), _tD(_ctx.message), 3)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                })
                            ), 2),
                            _cE("view", _uM("class" to _nC(unref(footerClass))), _uA(
                                renderSlot(_ctx.`$slots`, "footer", _uO(), fun(): UTSArray<Any> {
                                    return _uA(
                                        if (isTrue(_ctx.showCancelButton)) {
                                            _cE(Fragment, _uM("key" to 0), _uA(
                                                if (_ctx.buttonTheme != "default") {
                                                    _cV(_component_rice_button, _uM("key" to 0, "type" to "primary", "plain-fill" to "", "text" to _ctx.cancelButtonText, "shape" to if (_ctx.buttonTheme == "round") {
                                                        "round"
                                                    } else {
                                                        ""
                                                    }, "color" to _ctx.cancelButtonColor, "disabled" to _ctx.cancelButtonDisabled, "style" to _nS(unref(cancelButtonStyle)), "onClick" to cancel), null, 8, _uA(
                                                        "text",
                                                        "shape",
                                                        "color",
                                                        "disabled",
                                                        "style"
                                                    ))
                                                } else {
                                                    _cE("view", _uM("key" to 1, "class" to _nC(getButtonClass("cancel")), "hover-stay-time" to 100, "hover-class" to unref(cancelButtonHover), "onClick" to cancel), _uA(
                                                        _cE("text", _uM("class" to "rice-dialog__button__text", "style" to _nS(unref(cancelTextStyle))), _tD(_ctx.cancelButtonText), 5)
                                                    ), 10, _uA(
                                                        "hover-class"
                                                    ))
                                                }
                                            ), 64)
                                        } else {
                                            _cC("v-if", true)
                                        },
                                        if (isTrue(_ctx.showConfirmButton)) {
                                            _cE(Fragment, _uM("key" to 1), _uA(
                                                if (_ctx.buttonTheme != "default") {
                                                    _cV(_component_rice_button, _uM("key" to 0, "type" to "primary", "text" to _ctx.confirmButtonText, "color" to _ctx.confirmButtonColor, "shape" to if (_ctx.buttonTheme == "round") {
                                                        "round"
                                                    } else {
                                                        ""
                                                    }, "style" to _nS(unref(confirmButtonStyle)), "disabled" to _ctx.confirmButtonDisabled, "loading" to unref(confirmLoading), "onClick" to confirm), null, 8, _uA(
                                                        "text",
                                                        "color",
                                                        "shape",
                                                        "style",
                                                        "disabled",
                                                        "loading"
                                                    ))
                                                } else {
                                                    _cE("view", _uM("key" to 1, "class" to _nC(getButtonClass("confirm")), "hover-class" to unref(confirmButtonHover), "hover-stay-time" to 100, "onClick" to confirm), _uA(
                                                        if (isTrue(!unref(confirmLoading))) {
                                                            _cE("text", _uM("key" to 0, "class" to "rice-dialog__button__text rice-dialog__button__text__confirm", "style" to _nS(unref(confirmTextStyle))), _tD(_ctx.confirmButtonText), 5)
                                                        } else {
                                                            _cV(_component_rice_loading, _uM("key" to 1, "color" to _ctx.confirmButtonColor), null, 8, _uA(
                                                                "color"
                                                            ))
                                                        }
                                                    ), 10, _uA(
                                                        "hover-class"
                                                    ))
                                                }
                                            ), 64)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    )
                                })
                            ), 2)
                        ), 6)
                    } else {
                        _cC("v-if", true)
                    }
                ), 64)
            }
        }
        var name = "rice-dialog"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-dialog" to _pS(_uM("position" to "fixed", "top" to "50%", "left" to "50%", "width" to 320, "backgroundColor" to "var(--rice-dialog-background)", "borderTopLeftRadius" to 12, "borderTopRightRadius" to 12, "borderBottomRightRadius" to 12, "borderBottomLeftRadius" to 12, "opacity" to 0, "transform" to "translate(-50%, -50%) scale(0.8)", "transitionProperty" to "opacity,transform")), "rice-dialog__title" to _pS(_uM("alignItems" to "center", "paddingTop" to 24, "paddingRight" to 16, "paddingBottom" to 0, "paddingLeft" to 16)), "rice-dialog__title__text" to _pS(_uM("width" to "100%", "fontSize" to 17, "fontWeight" to "bold", "textAlign" to "center", "color" to "var(--rice-text-color)", "lines" to 2, "textOverflow" to "ellipsis")), "rice-dialog__content" to _pS(_uM("justifyContent" to "center", "alignItems" to "center", "paddingTop" to 24, "paddingRight" to 16, "paddingBottom" to 24, "paddingLeft" to 16)), "rice-dialog__content--has-title" to _pS(_uM("paddingTop" to 16)), "rice-dialog__message" to _pS(_uM("maxHeight" to 280, "width" to "100%")), "rice-dialog__message__text" to _pS(_uM("fontSize" to 16, "color" to "var(--rice-dialog-message-text-color)", "textAlign" to "center")), "rice-dialog__message__left" to _pS(_uM("textAlign" to "left")), "rice-dialog__message__right" to _pS(_uM("textAlign" to "right")), "rice-dialog__footer" to _pS(_uM("flexDirection" to "row", "width" to "100%")), "rice-dialog__footer--border" to _pS(_uM("borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "var(--rice-border-color)")), "rice-dialog__footer--vertical" to _pS(_uM("flexDirection" to "column-reverse", "flexWrap" to "nowrap")), "rice-dialog__footer--btn" to _pS(_uM("paddingTop" to 0, "paddingRight" to 16, "paddingBottom" to 24, "paddingLeft" to 16)), "rice-dialog__button" to _pS(_uM("height" to 48, "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "alignItems" to "center", "justifyContent" to "center")), "rice-dialog__button__text" to _pS(_uM("textAlign" to "center", "fontSize" to 16, "color" to "var(--rice-text-color)", "fontWeight" to "bold")), "rice-dialog__button__text__confirm" to _pS(_uM("color" to "var(--rice-primary-color)")), "rice-dialog__button--disabled" to _pS(_uM("opacity" to 0.5)), "rice-dialog__button--border" to _pS(_uM("borderRightWidth" to 1, "borderRightStyle" to "solid", "borderRightColor" to "var(--rice-border-color)")), "rice-dialog__button--hover" to _pS(_uM("backgroundColor" to "#f2f3f5")), "rice-dialog__button--hover--dark" to _pS(_uM("backgroundColor" to "#3a3a3c")), "@TRANSITION" to _uM("rice-dialog" to _uM("property" to "opacity,transform")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("confirm" to null, "cancel" to null, "open" to null, "close" to null, "closed" to null, "opened" to null, "clickOverlay" to null, "update:show" to null)
        var props = _nP(_uM("title" to _uM("type" to "String", "required" to false), "width" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "message" to _uM("type" to "String", "required" to false), "messageAlign" to _uM("type" to "String", "required" to false, "default" to "center"), "buttonTheme" to _uM("type" to "String", "required" to false, "default" to "default"), "buttonLayout" to _uM("type" to "String", "required" to false, "default" to "row"), "showConfirmButton" to _uM("type" to "Boolean", "required" to false, "default" to true), "confirmButtonText" to _uM("type" to "String", "required" to false, "default" to "确认"), "confirmButtonColor" to _uM("type" to "String", "required" to false), "confirmButtonDisabled" to _uM("type" to "Boolean", "required" to false, "default" to false), "showCancelButton" to _uM("type" to "Boolean", "required" to false, "default" to true), "cancelButtonText" to _uM("type" to "String", "required" to false, "default" to "取消"), "cancelButtonColor" to _uM("type" to "String", "required" to false), "cancelButtonDisabled" to _uM("type" to "Boolean", "required" to false, "default" to false), "duration" to _uM("type" to "Number", "required" to false, "default" to 250), "overlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "overlayBgColor" to _uM("type" to "String", "required" to false, "default" to "rgba(0,0,0,.6)"), "closeOnClickOverlay" to _uM("type" to "Boolean", "required" to false, "default" to false), "beforeClose" to _uM("required" to false), "zIndex" to _uM("type" to "Number", "required" to false, "default" to 999), "bgColor" to _uM("type" to "String", "required" to false), "marginTop" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "useDialogPage" to _uM("type" to "Boolean", "required" to false, "default" to true), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "confirm" to _uM("type" to "Function", "required" to false), "cancel" to _uM("type" to "Function", "required" to false), "clickOverlay" to _uM("type" to "Function", "required" to false), "open" to _uM("type" to "Function", "required" to false), "close" to _uM("type" to "Function", "required" to false), "opened" to _uM("type" to "Function", "required" to false), "closed" to _uM("type" to "Function", "required" to false), "ready" to _uM("type" to "Function", "required" to false), "fail" to _uM("type" to "Function", "required" to false), "show" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "messageAlign",
            "buttonTheme",
            "buttonLayout",
            "showConfirmButton",
            "confirmButtonText",
            "confirmButtonDisabled",
            "showCancelButton",
            "cancelButtonText",
            "cancelButtonDisabled",
            "duration",
            "overlay",
            "overlayBgColor",
            "closeOnClickOverlay",
            "zIndex",
            "useDialogPage",
            "customStyle",
            "show"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
