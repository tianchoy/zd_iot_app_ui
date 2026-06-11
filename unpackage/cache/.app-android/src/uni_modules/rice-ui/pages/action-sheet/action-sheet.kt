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
import io.dcloud.uniapp.extapi.`$emit` as uni__emit
import io.dcloud.uniapp.extapi.`$off` as uni__off
import io.dcloud.uniapp.extapi.`$on` as uni__on
import io.dcloud.uniapp.extapi.closeDialogPage as uni_closeDialogPage
open class GenUniModulesRiceUiPagesActionSheetActionSheet : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    open var updateParams: (data: ActionSheetProps) -> Unit
        get() {
            return unref(this.`$exposed`["updateParams"]) as (data: ActionSheetProps) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "updateParams", value)
        }
    open var close: () -> Unit
        get() {
            return unref(this.`$exposed`["close"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "close", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiPagesActionSheetActionSheet, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiPagesActionSheetActionSheet
            val _cache = __ins.renderCache
            val show = ref(false)
            val params = ref<ActionSheetProps>(ActionSheetProps())
            var busEventName: String? = null
            var optionsEventName: String? = null
            var readyEventName: String? = null
            var closeTimer: Number? = null
            val dialogPageIns = ref<UniPage?>(null)
            val actionsList = computed(fun(): UTSArray<ActionSheetAction> {
                return params.value.actions ?: _uA<ActionSheetAction>()
            }
            )
            val handleBusEvent = fun(event: ActionSheetBusEvent){
                if (busEventName != null) {
                    uni__emit(busEventName!!, event)
                }
            }
            val onSelect = fun(action: ActionSheetAction, index: Number){
                handleBusEvent(ActionSheetBusEvent(type = "select", action = action, index = index))
            }
            val onCancel = fun(){
                handleBusEvent(ActionSheetBusEvent(type = "cancel"))
            }
            val onOpen = fun(){
                handleBusEvent(ActionSheetBusEvent(type = "open"))
            }
            val onClose = fun(){
                show.value = false
            }
            val onOpened = fun(){
                handleBusEvent(ActionSheetBusEvent(type = "opened"))
            }
            val onClosed = fun(){
                handleBusEvent(ActionSheetBusEvent(type = "closed"))
                uni_closeDialogPage(CloseDialogPageOptions(dialogPage = dialogPageIns.value))
            }
            val clickOverlay = fun(){
                handleBusEvent(ActionSheetBusEvent(type = "clickOverlay"))
            }
            val updateParams = fun(data: ActionSheetProps){
                for(key in resolveUTSKeyIterator(data)){
                    if (data[key] != null) {
                        params.value[key] = data[key]
                    }
                }
            }
            watch(show, fun(newVal: Boolean){
                if (!newVal) {
                    handleBusEvent(ActionSheetBusEvent(type = "close"))
                }
            }
            )
            val close = fun(){
                show.value = false
            }
            onLoad(fun(options){
                readyEventName = options["readyEventName"]
                optionsEventName = options["optionsEventName"]
                busEventName = options["busEventName"]
                if (readyEventName != null && optionsEventName != null) {
                    uni__on(optionsEventName!!, fun(data: ActionSheetProps){
                        params.value = data
                    }
                    )
                    uni__emit(readyEventName!!, _uO())
                }
            }
            )
            onReady(fun(){
                show.value = true
                dialogPageIns.value = getCurrentInstance()?.proxy?.`$page`
                handleBusEvent(ActionSheetBusEvent(type = "ready", pageIns = dialogPageIns.value!!))
            }
            )
            onBackPress(fun(_options): Boolean? {
                close()
                return true
            }
            )
            onUnload(fun(){
                if (busEventName != null) {
                    uni__off(busEventName!!, null)
                }
                if (optionsEventName != null) {
                    uni__off(optionsEventName!!, null)
                }
                if (readyEventName != null) {
                    uni__off(readyEventName!!, null)
                }
                if (closeTimer != null) {
                    clearTimeout(closeTimer!!)
                }
            }
            )
            __expose(_uM("updateParams" to updateParams, "close" to close))
            return fun(): Any? {
                val _component_rice_action_sheet = resolveEasyComponent("rice-action-sheet", GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheetClass)
                return _cV(_component_rice_action_sheet, _uM("show" to unref(show), "onUpdate:show" to fun(`$event`: Boolean){
                    trySetRefValue(show, `$event`)
                }
                , "title" to unref(params).title, "actions" to unref(actionsList), "use-dialog-page" to false, "show-cancel" to unref(params).showCancel, "cancel-text" to unref(params).cancelText, "duration" to unref(params).duration, "z-index" to unref(params).zIndex, "opacity" to unref(params).opacity, "overlay" to unref(params).overlay, "overlay-bg-color" to unref(params).overlayBgColor, "close-on-click-action" to unref(params).closeOnClickAction, "close-on-click-overlay" to unref(params).closeOnClickOverlay, "radius" to unref(params).radius, "safe-area-inset-bottom" to unref(params).safeAreaInsetBottom, "custom-style" to unref(params).customStyle, "onSelect" to onSelect, "onCancel" to onCancel, "onOpen" to onOpen, "onClose" to onClose, "onOpened" to onOpened, "onClosed" to onClosed, "onClickOverlay" to clickOverlay), null, 8, _uA(
                    "show",
                    "title",
                    "actions",
                    "show-cancel",
                    "cancel-text",
                    "duration",
                    "z-index",
                    "opacity",
                    "overlay",
                    "overlay-bg-color",
                    "close-on-click-action",
                    "close-on-click-overlay",
                    "radius",
                    "safe-area-inset-bottom",
                    "custom-style"
                ))
            }
        }
        var name = "rice-action-sheet-page"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
