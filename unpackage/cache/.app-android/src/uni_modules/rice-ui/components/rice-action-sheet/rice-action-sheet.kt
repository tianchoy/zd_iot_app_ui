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
open class GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var actions: UTSArray<ActionSheetAction>? by `$props`
    open var title: String? by `$props`
    open var showCancel: Boolean by `$props`
    open var cancelText: String by `$props`
    open var duration: Number by `$props`
    open var zIndex: Number by `$props`
    open var opacity: Boolean? by `$props`
    open var overlay: Boolean by `$props`
    open var overlayBgColor: String by `$props`
    open var closeOnClickAction: Boolean by `$props`
    open var closeOnClickOverlay: Boolean by `$props`
    open var radius: Any by `$props`
    open var safeAreaInsetBottom: Boolean by `$props`
    open var useDialogPage: Boolean by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var select: ((action: ActionSheetAction, index: Number) -> Unit)? by `$props`
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
        var setup: (__props: GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet
            val _cache = __ins.renderCache
            val ns = useNamespace("action-sheet")
            useSafeArea()
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val show = useModel<Boolean>(__ins.props, "show")
            val actionsList = computed<UTSArray<ActionSheetAction>>(fun(): UTSArray<ActionSheetAction> {
                return props.actions ?: _uA<ActionSheetAction>()
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
            val actionSheetRef = shallowRef<UniElement?>(null)
            val open = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (realShow.value) {
                            return@w1
                        }
                        realShow.value = true
                        await(nextTick())
                        handleOpenTimer()
                        openTimer = setTimeout(fun(){
                            actionSheetRef.value?.style?.setProperty("transition-duration", props.duration + "ms")
                            actionSheetRef.value?.style?.setProperty("opacity", "1")
                            actionSheetRef.value?.style?.setProperty("transform", "translate(0px, 0px)")
                            openedTimer = setTimeout(fun(){
                                emit("opened")
                            }
                            , props.duration)
                        }
                        , 30)
                })
            }
            val handleSelect = fun(action: ActionSheetAction, index: Number){
                if (action.disabled == true) {
                    return
                }
                if (props.closeOnClickAction == true) {
                    show.value = false
                }
                emit("select", action, index)
            }
            val cancel = fun(){
                show.value = false
                emit("cancel")
            }
            val hasDialogPage = ref(true)
            val isUseDialogPage = computed(fun(): Boolean {
                return props.useDialogPage == true && hasDialogPage.value
            }
            )
            val dialogPageIns = ref<UniPage?>(null)
            val handleShowDialog = fun(){
                showActionSheet(ActionSheetProps(actions = actionsList.value, title = props.title, showCancel = props.showCancel, cancelText = props.cancelText, duration = props.duration, zIndex = props.zIndex, opacity = props.opacity, overlay = props.overlay, overlayBgColor = props.overlayBgColor, closeOnClickAction = props.closeOnClickAction, closeOnClickOverlay = props.closeOnClickOverlay, radius = props.radius, safeAreaInsetBottom = props.safeAreaInsetBottom, customStyle = props.customStyle, select = fun(action: ActionSheetAction, index: Number){
                    emit("select", action, index)
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
                , clickOverlay = fun(){
                    emit("clickOverlay")
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
                    props.actions
                )
            }
            , fun(){
                if (show.value != null) {
                    dialogPageIns.value?.vm?.`$callMethod`("updateParams", ActionSheetProps(title = props.title, actions = props.actions))
                }
            }
            , WatchOptions(deep = true))
            val close = fun(){
                if (!realShow.value) {
                    return
                }
                val opacity = if (props.opacity == true) {
                    "0"
                } else {
                    "1"
                }
                actionSheetRef.value?.style?.setProperty("opacity", opacity)
                actionSheetRef.value?.style?.setProperty("transform", "translate(0px, 100%)")
                handleCloseTimer()
                closeTimer = setTimeout(fun(){
                    realShow.value = false
                    emit("closed")
                    dialogPageIns.value = null
                }
                , props.duration)
            }
            val overlayClick = fun(){
                if (props.closeOnClickOverlay == true) {
                    show.value = false
                }
                emit("clickOverlay")
            }
            val showOverlay = computed(fun(): Any {
                return if (isUseDialogPage.value) {
                    false
                } else {
                    props.overlay
                }
            }
            )
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
            val menuDisabledColor = useCssVar("--rice-action-sheet-menu-disabled-text-color", actionSheetRef)
            val menuTextColor = useCssVar("--rice-text-color", actionSheetRef)
            val getIconColor = fun(menu: ActionSheetAction): String {
                if (hasStrValue(menu.color)) {
                    return menu.color!!
                }
                return if (menu.disabled == true) {
                    menuDisabledColor.value
                } else {
                    menuTextColor.value
                }
            }
            val getMenuTextStyle = fun(menu: ActionSheetAction): Map<String, String> {
                val css = Map<String, String>()
                if (hasStrValue(menu.color)) {
                    css.set("color", menu.color!!)
                }
                return css
            }
            val getMenuTextClass = fun(menu: ActionSheetAction): UTSArray<String> {
                return _uA(
                    ns.e("menu__text"),
                    ns.`is`("__menu__text--disabled", menu.disabled == true)
                )
            }
            val getMenuSubnameClass = fun(menu: ActionSheetAction): UTSArray<String> {
                return _uA(
                    ns.e("menu__subname"),
                    ns.`is`("__menu__subname--disabled", menu.disabled == true)
                )
            }
            val actionSheetStyle = computed(fun(): Map<String, Any> {
                val css = Map<String, Any>()
                css.set("z-index", props.zIndex)
                css.set("border-top-left-radius", addUnit(props.radius))
                css.set("border-top-right-radius", addUnit(props.radius))
                if (isTruthy(props.safeAreaInsetBottom)) {
                    css.set("padding-bottom", safeAreaInsets.value.bottom + "px")
                }
                return css
            }
            )
            val actionSheetClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.`is`("opacity", props.opacity)
                )
            }
            )
            val getMenuClass = fun(menu: ActionSheetAction, index: Number): UTSArray<String> {
                return _uA(
                    ns.e("menu"),
                    ns.`is`("__menu--border", index < actionsList.value.length - 1)
                )
            }
            onUnmounted(fun(){
                handleOpenTimer()
                handleCloseTimer()
            }
            )
            return fun(): Any? {
                val _component_rice_overlay = resolveEasyComponent("rice-overlay", GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayClass)
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(unref(showOverlay))) {
                        _cV(_component_rice_overlay, _uM("key" to 0, "show" to show.value, "z-index" to (_ctx.zIndex - 1), "close-on-click-overlay" to false, "duration" to _ctx.duration, "bg-color" to _ctx.overlayBgColor, "onClick" to overlayClick), null, 8, _uA(
                            "show",
                            "z-index",
                            "duration",
                            "bg-color"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(unref(realShow))) {
                        _cE("view", _uM("key" to 1, "class" to _nC(unref(actionSheetClass)), "style" to _nS(_uA(
                            unref(actionSheetStyle),
                            _ctx.customStyle
                        )), "ref_key" to "actionSheetRef", "ref" to actionSheetRef), _uA(
                            if (isTrue(unref(hasStrValue)(props.title))) {
                                _cE("view", _uM("key" to 0, "class" to "rice-action-sheet__title"), _uA(
                                    _cE("text", _uM("class" to "rice-action-sheet__title__text"), _tD(props.title), 1)
                                ))
                            } else {
                                _cC("v-if", true)
                            },
                            _cE("scroll-view", _uM("class" to "rice-action-sheet__container", "direction" to "vertical"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(unref(actionsList), fun(item, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to ("" + item.name + index), "class" to _nC(getMenuClass(item, index)), "hover-stay-time" to 100, "hover-class" to if (item.disabled == true) {
                                        "none"
                                    } else {
                                        "rice-action-sheet--hover"
                                    }, "onClick" to fun(){
                                        handleSelect(item, index)
                                    }), _uA(
                                        if (isTrue(unref(hasStrValue)(item.icon))) {
                                            _cV(_component_rice_icon, _uM("key" to 0, "color" to getIconColor(item), "name" to item.icon, "size" to item.iconSize, "font-family" to item.iconFontFamily, "custom-style" to _uO("marginRight" to "6px")), null, 8, _uA(
                                                "color",
                                                "name",
                                                "size",
                                                "font-family"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        },
                                        _cE("text", _uM("class" to _nC(getMenuTextClass(item)), "style" to _nS(getMenuTextStyle(item))), _tD(item.name), 7),
                                        if (isTrue(unref(hasStrValue)(item.subname))) {
                                            _cE("text", _uM("key" to 1, "class" to _nC(getMenuSubnameClass(item))), _tD(item.subname), 3)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 10, _uA(
                                        "hover-class",
                                        "onClick"
                                    ))
                                }), 128)
                            )),
                            if (isTrue(_ctx.showCancel)) {
                                _cE("view", _uM("key" to 1, "class" to "rice-action-sheet__gap"))
                            } else {
                                _cC("v-if", true)
                            },
                            if (isTrue(_ctx.showCancel)) {
                                _cE("view", _uM("key" to 2, "class" to "rice-action-sheet__cancel", "hover-stay-time" to 100, "hover-class" to "rice-action-sheet--hover", "onClick" to cancel), _uA(
                                    _cE("text", _uM("class" to "rice-action-sheet__cancel__text"), _tD(_ctx.cancelText), 1)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                        ), 6)
                    } else {
                        _cC("v-if", true)
                    }
                ), 64)
            }
        }
        var name = "rice-action-sheet"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-action-sheet" to _pS(_uM("position" to "fixed", "left" to 0, "bottom" to 0, "width" to "100%", "zIndex" to 999, "transitionProperty" to "transform,opacity", "transform" to "translate(0px, 100%)", "backgroundColor" to "var(--rice-action-sheet-menu-background)")), "rice-action-sheet--opacity" to _pS(_uM("opacity" to 0)), "rice-action-sheet__title" to _pS(_uM("borderBottomWidth" to 0.5, "borderBottomStyle" to "solid", "borderBottomColor" to "var(--rice-border-color)", "width" to "100%", "paddingTop" to 16, "paddingRight" to 16, "paddingBottom" to 16, "paddingLeft" to 16, "backgroundColor" to "var(--rice-action-sheet-menu-background)", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "flexWrap" to "wrap")), "rice-action-sheet__title__text" to _pS(_uM("textOverflow" to "ellipsis", "overflow" to "hidden", "whiteSpace" to "nowrap", "width" to "100%", "textAlign" to "center", "fontSize" to 15, "color" to "var(--rice-text-color-2)")), "rice-action-sheet__container" to _pS(_uM("maxHeight" to 350)), "rice-action-sheet__menu" to _pS(_uM("width" to "100%", "paddingTop" to 16, "paddingRight" to 16, "paddingBottom" to 16, "paddingLeft" to 16, "backgroundColor" to "var(--rice-action-sheet-menu-background)", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "flexWrap" to "wrap")), "rice-action-sheet__menu__text" to _pS(_uM("textAlign" to "center", "color" to "var(--rice-text-color)")), "rice-action-sheet__menu__text--disabled" to _pS(_uM("color" to "var(--rice-action-sheet-menu-disabled-text-color)")), "rice-action-sheet__menu__subname" to _pS(_uM("width" to "100%", "color" to "var(--rice-text-color-2)", "fontSize" to 12, "marginTop" to 6, "textAlign" to "center")), "rice-action-sheet__menu__subname--disabled" to _pS(_uM("color" to "var(--rice-action-sheet-menu-disabled-text-color)")), "rice-action-sheet__menu--border" to _pS(_uM("borderBottomWidth" to 0.5, "borderBottomStyle" to "solid", "borderBottomColor" to "var(--rice-border-color)")), "rice-action-sheet__gap" to _pS(_uM("backgroundColor" to "var(--rice-action-sheet-background)", "height" to 6)), "rice-action-sheet__cancel" to _pS(_uM("width" to "100%", "paddingTop" to 16, "paddingRight" to 16, "paddingBottom" to 16, "paddingLeft" to 16, "backgroundColor" to "var(--rice-action-sheet-menu-background)", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "flexWrap" to "wrap")), "rice-action-sheet__cancel__text" to _pS(_uM("color" to "var(--rice-action-sheet-cancel-text-color)")), "rice-action-sheet--hover" to _pS(_uM("backgroundColor" to "var(--rice-action-sheet-hover-background)")), "@TRANSITION" to _uM("rice-action-sheet" to _uM("property" to "transform,opacity")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("select" to null, "cancel" to null, "open" to null, "close" to null, "opened" to null, "closed" to null, "clickOverlay" to null, "update:show" to null)
        var props = _nP(_uM("actions" to _uM("type" to "Array", "required" to false), "title" to _uM("type" to "String", "required" to false), "showCancel" to _uM("type" to "Boolean", "required" to false, "default" to true), "cancelText" to _uM("type" to "String", "required" to false, "default" to "取消"), "duration" to _uM("type" to "Number", "required" to false, "default" to 300), "zIndex" to _uM("type" to "Number", "required" to false, "default" to 999), "opacity" to _uM("type" to "Boolean", "required" to false), "overlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "overlayBgColor" to _uM("type" to "String", "required" to false, "default" to "rgba(0,0,0,.6)"), "closeOnClickAction" to _uM("type" to "Boolean", "required" to false, "default" to true), "closeOnClickOverlay" to _uM("type" to "Boolean", "required" to false, "default" to true), "radius" to _uM("type" to _uA(
            "Number",
            "String"
        ), "required" to false, "default" to "12px"), "safeAreaInsetBottom" to _uM("type" to "Boolean", "required" to false, "default" to true), "useDialogPage" to _uM("type" to "Boolean", "required" to false, "default" to true), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "select" to _uM("type" to "Function", "required" to false), "cancel" to _uM("type" to "Function", "required" to false), "clickOverlay" to _uM("type" to "Function", "required" to false), "open" to _uM("type" to "Function", "required" to false), "close" to _uM("type" to "Function", "required" to false), "opened" to _uM("type" to "Function", "required" to false), "closed" to _uM("type" to "Function", "required" to false), "ready" to _uM("type" to "Function", "required" to false), "fail" to _uM("type" to "Function", "required" to false), "show" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "showCancel",
            "cancelText",
            "duration",
            "zIndex",
            "opacity",
            "overlay",
            "overlayBgColor",
            "closeOnClickAction",
            "closeOnClickOverlay",
            "radius",
            "safeAreaInsetBottom",
            "useDialogPage",
            "customStyle",
            "show"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
