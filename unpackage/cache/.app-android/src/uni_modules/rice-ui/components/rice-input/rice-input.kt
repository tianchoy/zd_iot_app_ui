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
open class GenUniModulesRiceUiComponentsRiceInputRiceInput : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var type: String by `$props`
    open var disabled: Boolean? by `$props`
    open var readonly: Boolean? by `$props`
    open var placeholder: String? by `$props`
    open var placeholderStyle: String? by `$props`
    open var maxlength: Number by `$props`
    open var cursorSpacing: Number by `$props`
    open var cursorColor: String? by `$props`
    open var autoFocus: Boolean by `$props`
    open var focus: Boolean by `$props`
    open var confirmType: String by `$props`
    open var confirmHold: Boolean by `$props`
    open var cursor: Number by `$props`
    open var selectionStart: Number by `$props`
    open var selectionEnd: Number by `$props`
    open var adjustPosition: Boolean by `$props`
    open var inputmode: String? by `$props`
    open var holdKeyboard: Boolean by `$props`
    open var color: String? by `$props`
    open var fontSize: Any? by `$props`
    open var border: String by `$props`
    open var focusBorder: Boolean by `$props`
    open var bgColor: String? by `$props`
    open var shape: String by `$props`
    open var height: Any? by `$props`
    open var clearable: Boolean by `$props`
    open var clearTrigger: String by `$props`
    open var clearIcon: String by `$props`
    open var showPassword: Boolean by `$props`
    open var showPasswordTrigger: String by `$props`
    open var prefixIcon: String? by `$props`
    open var suffixIcon: String? by `$props`
    open var iconSize: Any by `$props`
    open var iconColor: String? by `$props`
    open var inputAlign: String? by `$props`
    open var iputStyle: UTSJSONObject by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var modelValue: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceInputRiceInput) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceInputRiceInput
            val _cache = __ins.renderCache
            val ns = useNamespace("input")
            val slots = useSlots()
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val modelValue = useModel<String>(__ins.props, "modelValue")
            val inputType = computed(fun(): Any {
                val type = props.type
                if (type == "password") {
                    return "text"
                }
                return type
            }
            )
            val formDisabled = inject<Ref<Boolean?>?>(formDisabledInjectKey, null)
            val formReadonly = inject<Ref<Boolean?>?>(formReadonlyInjectKey, null)
            val formItemBlur = inject<(() -> Unit)?>(formItemBlurInjectKey, null)
            val isFocus = ref(false)
            val showPasswordValue = ref(false)
            val isPassword = computed<Boolean>(fun(): Boolean {
                return props.type == "password" && !showPasswordValue.value
            }
            )
            val isDisabled = computed<Boolean>(fun(): Boolean {
                return (formDisabled?.value ?: false) || (props.disabled ?: false)
            }
            )
            val isReadonly = computed<Boolean>(fun(): Boolean {
                return (formReadonly?.value ?: false) || (props.readonly ?: false)
            }
            )
            val isShowClearable = computed<Boolean>(fun(): Boolean {
                if (isDisabled.value) {
                    return false
                }
                val shouldTrigger = if (props.clearTrigger == "focus") {
                    isFocus.value
                } else {
                    true
                }
                return (if (isTruthy(props.clearable)) {
                    modelValue.value != ""
                } else {
                    props.clearable
                }
                ) && shouldTrigger
            }
            )
            val isShowPassword = computed<Boolean>(fun(): Boolean {
                if (props.showPassword == false) {
                    return false
                }
                val isPasswordType = props.type == "password"
                val shouldTrigger = if (props.showPasswordTrigger == "focus") {
                    isFocus.value
                } else {
                    true
                }
                return isPasswordType && modelValue.value != "" && shouldTrigger
            }
            )
            val changeShowPassword = fun(){
                if (isDisabled.value || isReadonly.value) {
                    return
                }
                showPasswordValue.value = !showPasswordValue.value
            }
            val onClear = fun(){
                if (isDisabled.value || isReadonly.value) {
                    return
                }
                modelValue.value = ""
            }
            val onInput = fun(e: UniInputEvent){
                emit("input", e.detail.value)
            }
            val onFocus = fun(e: UniInputFocusEvent){
                isFocus.value = true
                emit("focus", e)
            }
            var timer: Number? = null
            val onBlur = fun(e: UniInputBlurEvent){
                timer = setTimeout(fun(){
                    isFocus.value = false
                    emit("blur", e)
                }
                , 100)
                formItemBlur?.invoke()
            }
            val onKeyboardheightchange = fun(e: UniInputKeyboardHeightChangeEvent){
                emit("keyboardheightchange", e)
            }
            val onChange = fun(e: UniInputChangeEvent){
                emit("change", e.detail.value)
            }
            val onConfirm = fun(e: UniInputConfirmEvent){
                emit("confirm", e.detail.value)
            }
            val onNicknamereview = fun(e: Any){
                emit("nicknamereview", e)
            }
            val clickLeftIcon = fun(){
                emit("clickLeftIcon")
            }
            val clickRightIcon = fun(){
                emit("clickRightIcon")
            }
            val iconStyle = computed(fun(): UTSJSONObject {
                return _uO("paddingLeft" to "6px", "opacity" to if (isDisabled.value) {
                    0.4
                } else {
                    1
                }
                )
            }
            )
            val rootStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (hasStrValue(props.bgColor)) {
                    css.set("background-color", props.bgColor!!)
                }
                if (props.height != null) {
                    css.set("height", addUnit(props.height!!))
                }
                return css
            }
            )
            val customInputStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (hasStrValue(props.color)) {
                    css.set("color", props.color!!)
                }
                if (props.fontSize != null) {
                    css.set("font-size", addUnit(props.fontSize!!))
                }
                return css
            }
            )
            val inputClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.b(""),
                    ns.theme(),
                    ns.`is`("disabled", isDisabled.value),
                    ns.m(props.border),
                    ns.m(props.shape),
                    ns.`is`("border--focus", isFocus.value && props.border != "none" && props.focusBorder)
                )
            }
            )
            val inputInnerClass = computed(fun(): UTSArray<String> {
                return _uA(
                    ns.e("input"),
                    ns.`is`("__input--disabled", isDisabled.value),
                    ns.e("input--" + (props.inputAlign ?: "left"))
                )
            }
            )
            val _placeholderStyle = computed(fun(): String {
                var baseColor = if (isDark.value) {
                    "#4d4d4d"
                } else {
                    "#c8c9cc"
                }
                var css = "color:" + baseColor + ";font-size:" + addUnit(props.fontSize ?: "15px") + ";"
                return css + (props.placeholderStyle ?: "")
            }
            )
            onUnmounted(fun(){
                if (timer != null) {
                    clearTimeout(timer!!)
                }
            }
            )
            return fun(): Any? {
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                return _cE("view", _uM("class" to _nC(unref(inputClass)), "style" to _nS(_uA(
                    unref(rootStyle),
                    _ctx.customStyle
                ))), _uA(
                    if (isTrue(_ctx.`$slots`["prefix"] != null || _ctx.prefixIcon != null)) {
                        _cE("view", _uM("key" to 0, "class" to "rice-input__prefix"), _uA(
                            renderSlot(_ctx.`$slots`, "prefix", _uO(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_rice_icon, _uM("name" to _ctx.prefixIcon, "size" to _ctx.iconSize, "color" to _ctx.iconColor, "onClick" to clickLeftIcon), null, 8, _uA(
                                        "name",
                                        "size",
                                        "color"
                                    ))
                                )
                            })
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("input", _uM("modelValue" to modelValue.value, "onInput" to _uA<Any?>(fun(`$event`: UniInputEvent){
                        modelValue.value = `$event`.detail.value
                    }
                    , onInput), "type" to unref(inputType), "inputmode" to _ctx.inputmode, "placeholder" to _ctx.placeholder, "password" to unref(isPassword), "disabled" to (unref(isDisabled) || unref(isReadonly)), "maxlength" to _ctx.maxlength, "placeholder-style" to unref(_placeholderStyle), "cursor-spacing" to _ctx.cursorSpacing, "cursor-color" to _ctx.cursorColor, "auto-focus" to _ctx.autoFocus, "focus" to _ctx.focus, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "cursor" to _ctx.cursor, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "adjust-position" to _ctx.adjustPosition, "hold-keyboard" to _ctx.holdKeyboard, "class" to _nC(unref(inputInnerClass)), "style" to _nS(_uA(
                        unref(customInputStyle),
                        _ctx.iputStyle
                    )), "onFocus" to onFocus, "onBlur" to onBlur, "onKeyboardheightchange" to onKeyboardheightchange, "onChange" to onChange, "onConfirm" to onConfirm, "onNicknamereview" to onNicknamereview), null, 46, _uA(
                        "modelValue",
                        "onInput",
                        "type",
                        "inputmode",
                        "placeholder",
                        "password",
                        "disabled",
                        "maxlength",
                        "placeholder-style",
                        "cursor-spacing",
                        "cursor-color",
                        "auto-focus",
                        "focus",
                        "confirm-type",
                        "confirm-hold",
                        "cursor",
                        "selection-start",
                        "selection-end",
                        "adjust-position",
                        "hold-keyboard"
                    )),
                    if (isTrue(unref(isShowPassword))) {
                        _cV(_component_rice_icon, _uM("key" to 1, "name" to if (unref(showPasswordValue)) {
                            "eyes"
                        } else {
                            "eyes-close"
                        }, "size" to "17px", "custom-style" to unref(iconStyle), "onClick" to changeShowPassword), null, 8, _uA(
                            "name",
                            "custom-style"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(unref(isShowClearable))) {
                        _cV(_component_rice_icon, _uM("key" to 2, "name" to _ctx.clearIcon, "size" to "17px", "custom-style" to unref(iconStyle), "onClick" to onClear), null, 8, _uA(
                            "name",
                            "custom-style"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.`$slots`["suffix"] != null || _ctx.suffixIcon != null)) {
                        _cE("view", _uM("key" to 3, "class" to "rice-input__suffix"), _uA(
                            renderSlot(_ctx.`$slots`, "suffix", _uO(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_rice_icon, _uM("name" to _ctx.suffixIcon, "size" to _ctx.iconSize, "color" to _ctx.iconColor, "onClick" to clickRightIcon), null, 8, _uA(
                                        "name",
                                        "size",
                                        "color"
                                    ))
                                )
                            })
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 6)
            }
        }
        var name = "rice-input"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-input" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "height" to 42, "paddingTop" to 0, "paddingRight" to 10, "paddingBottom" to 0, "paddingLeft" to 10)), "rice-input__prefix" to _pS(_uM("paddingRight" to 10)), "rice-input__suffix" to _pS(_uM("paddingLeft" to 10)), "rice-input__input" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "left", "fontSize" to 15, "height" to "100%", "color" to "var(--rice-text-color)")), "rice-input__input--disabled" to _pS(_uM("color" to "var(--rice-input-disabled-text-color)")), "rice-input__input--center" to _pS(_uM("textAlign" to "center")), "rice-input__input--right" to _pS(_uM("textAlign" to "right")), "rice-input--surround" to _pS(_uM("borderTopLeftRadius" to 4, "borderTopRightRadius" to 4, "borderBottomRightRadius" to 4, "borderBottomLeftRadius" to 4, "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "var(--rice-input-border-color)", "borderRightColor" to "var(--rice-input-border-color)", "borderBottomColor" to "var(--rice-input-border-color)", "borderLeftColor" to "var(--rice-input-border-color)")), "rice-input--bottom" to _pS(_uM("borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "var(--rice-input-border-color)", "paddingLeft" to 0, "paddingRight" to 0)), "rice-input--none" to _pS(_uM("paddingLeft" to 0, "paddingRight" to 0)), "rice-input--border--focus" to _pS(_uM("borderTopColor" to "var(--rice-primary-color)", "borderRightColor" to "var(--rice-primary-color)", "borderBottomColor" to "var(--rice-primary-color)", "borderLeftColor" to "var(--rice-primary-color)")), "rice-input--round" to _pS(_uM("borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100)), "rice-input--disabled" to _pS(_uM("backgroundColor" to "var(--rice-input-disabled-background)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("input" to null, "focus" to null, "blur" to null, "keyboardheightchange" to null, "change" to null, "confirm" to null, "nicknamereview" to null, "clickLeftIcon" to null, "clickRightIcon" to null, "update:modelValue" to null)
        var props = _nP(_uM("type" to _uM("type" to "String", "required" to false, "default" to "text"), "disabled" to _uM("type" to "Boolean", "required" to false), "readonly" to _uM("type" to "Boolean", "required" to false), "placeholder" to _uM("type" to "String", "required" to false), "placeholderStyle" to _uM("type" to "String", "required" to false), "maxlength" to _uM("type" to "Number", "required" to false, "default" to -1), "cursorSpacing" to _uM("type" to "Number", "required" to false, "default" to 0), "cursorColor" to _uM("type" to "String", "required" to false), "autoFocus" to _uM("type" to "Boolean", "required" to false, "default" to false), "focus" to _uM("type" to "Boolean", "required" to false, "default" to false), "confirmType" to _uM("type" to "String", "required" to false, "default" to "done"), "confirmHold" to _uM("type" to "Boolean", "required" to false, "default" to false), "cursor" to _uM("type" to "Number", "required" to false, "default" to 0), "selectionStart" to _uM("type" to "Number", "required" to false, "default" to -1), "selectionEnd" to _uM("type" to "Number", "required" to false, "default" to -1), "adjustPosition" to _uM("type" to "Boolean", "required" to false, "default" to true), "inputmode" to _uM("type" to "String", "required" to false), "holdKeyboard" to _uM("type" to "Boolean", "required" to false, "default" to false), "color" to _uM("type" to "String", "required" to false), "fontSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "border" to _uM("type" to "String", "required" to false, "default" to "surround"), "focusBorder" to _uM("type" to "Boolean", "required" to false, "default" to false), "bgColor" to _uM("type" to "String", "required" to false), "shape" to _uM("type" to "String", "required" to false, "default" to "square"), "height" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "clearable" to _uM("type" to "Boolean", "required" to false, "default" to false), "clearTrigger" to _uM("type" to "String", "required" to false, "default" to "focus"), "clearIcon" to _uM("type" to "String", "required" to false, "default" to "clear"), "showPassword" to _uM("type" to "Boolean", "required" to false, "default" to true), "showPasswordTrigger" to _uM("type" to "String", "required" to false, "default" to "focus"), "prefixIcon" to _uM("type" to "String", "required" to false), "suffixIcon" to _uM("type" to "String", "required" to false), "iconSize" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "16px"), "iconColor" to _uM("type" to "String", "required" to false), "inputAlign" to _uM("type" to "String", "required" to false), "iputStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "modelValue" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "type",
            "disabled",
            "readonly",
            "maxlength",
            "cursorSpacing",
            "autoFocus",
            "focus",
            "confirmType",
            "confirmHold",
            "cursor",
            "selectionStart",
            "selectionEnd",
            "adjustPosition",
            "holdKeyboard",
            "border",
            "focusBorder",
            "shape",
            "clearable",
            "clearTrigger",
            "clearIcon",
            "showPassword",
            "showPasswordTrigger",
            "iconSize",
            "iputStyle",
            "customStyle",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
