import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import { useNamespace } from "../../libs/use"
	import { isDark } from "../../libs/store"
	import { hasStrValue, addUnit } from "../../libs/utils"
	import { formDisabledInjectKey, formReadonlyInjectKey } from "../rice-form"
	import { formItemBlurInjectKey } from "../rice-form-item"
	import { InputProps } from "./type.uts"
	
const __sfc__ = defineComponent({
  __name: 'rice-input',

		name: 'rice-input',
		styleIsolation: 'app-and-page'
	,
  props: /*#__PURE__*/mergeModels({
    type: { type: String, required: false, default: "text" },
    disabled: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    placeholder: { type: String, required: false },
    placeholderStyle: { type: String, required: false },
    maxlength: { type: Number, required: false, default: -1 },
    cursorSpacing: { type: Number, required: false, default: 0 },
    cursorColor: { type: String, required: false },
    autoFocus: { type: Boolean, required: false, default: false },
    focus: { type: Boolean, required: false, default: false },
    confirmType: { type: String, required: false, default: 'done' },
    confirmHold: { type: Boolean, required: false, default: false },
    cursor: { type: Number, required: false, default: 0 },
    selectionStart: { type: Number, required: false, default: -1 },
    selectionEnd: { type: Number, required: false, default: -1 },
    adjustPosition: { type: Boolean, required: false, default: true },
    inputmode: { type: String, required: false },
    holdKeyboard: { type: Boolean, required: false, default: false },
    color: { type: String, required: false },
    fontSize: { type: [String, Number], required: false },
    border: { type: String, required: false, default: 'surround' },
    focusBorder: { type: Boolean, required: false, default: false },
    bgColor: { type: String, required: false },
    shape: { type: String, required: false, default: 'square' },
    height: { type: [String, Number], required: false },
    clearable: { type: Boolean, required: false, default: false },
    clearTrigger: { type: String, required: false, default: 'focus' },
    clearIcon: { type: String, required: false, default: 'clear' },
    showPassword: { type: Boolean, required: false, default: true },
    showPasswordTrigger: { type: String, required: false, default: 'focus' },
    prefixIcon: { type: String, required: false },
    suffixIcon: { type: String, required: false },
    iconSize: { type: [String, Number], required: false, default: '16px' },
    iconColor: { type: String, required: false },
    inputAlign: { type: String, required: false },
    iputStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  }, {
    "modelValue": {
		type: String,
		default: ""
	},
  }),
  emits: /*#__PURE__*/mergeModels(["input", "focus", "blur", "keyboardheightchange", "change", "confirm", "nicknamereview", "clickLeftIcon", "clickRightIcon"], ["update:modelValue"]),
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	
	const ns = useNamespace("input")
	const slots = useSlots();
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const props = __props

	const modelValue = useModel<String>(__ins.props, "modelValue")

	const inputType = computed(() => {
		const type = props.type
		if (type == 'password') return 'text'
		return type
	})

	const formDisabled = inject<Ref<boolean | null> | null>(formDisabledInjectKey, null)
	const formReadonly = inject<Ref<boolean | null> | null>(formReadonlyInjectKey, null)
	const formItemBlur = inject<(() => void) | null>(formItemBlurInjectKey, null)

	const isFocus = ref(false)
	const showPasswordValue = ref(false)






	const isPassword = computed<boolean>(() => props.type == 'password' && !showPasswordValue.value)


	const isDisabled = computed<boolean>(() => (formDisabled?.value ?? false) || (props.disabled ?? false))
	const isReadonly = computed<boolean>(() => (formReadonly?.value ?? false) || (props.readonly ?? false))

	const isShowClearable = computed<boolean>(() => {
		if (isDisabled.value) return false
		const shouldTrigger = props.clearTrigger == 'focus' ? isFocus.value : true
		return props.clearable && modelValue.value != "" && shouldTrigger
	})

	const isShowPassword = computed<boolean>(() => {
		if (props.showPassword == false) return false
		const isPasswordType = props.type == 'password'
		const shouldTrigger = props.showPasswordTrigger == 'focus' ? isFocus.value : true
		return isPasswordType && modelValue.value != "" && shouldTrigger
	})

	const changeShowPassword = () => {
		if (isDisabled.value || isReadonly.value) return
		showPasswordValue.value = !showPasswordValue.value
	}

	const onClear = () => {
		if (isDisabled.value || isReadonly.value) return
		modelValue.value = ""
	}

	const onInput = (e : UniInputEvent) => {
		emit('input', e.detail.value)
	}

	const onFocus = (e : UniInputFocusEvent) => {
		isFocus.value = true
		emit('focus', e)
	}

	let timer : null | number = null
	const onBlur = (e : UniInputBlurEvent) => {
		//加个延迟，防止web等端清除按钮点击不到
		timer = setTimeout(() => {
			isFocus.value = false
			emit('blur', e)
		}, 100)

		formItemBlur?.()
	}

	const onKeyboardheightchange = (e : UniInputKeyboardHeightChangeEvent) => {
		emit('keyboardheightchange', e)
	}

	const onChange = (e : UniInputChangeEvent) => {
		emit('change', e.detail.value)
	}

	const onConfirm = (e : UniInputConfirmEvent) => {
		emit('confirm', e.detail.value)
	}

	const onNicknamereview = (e : any) => {
		emit('nicknamereview', e)
	}

	const clickLeftIcon = () => {
		emit('clickLeftIcon')
	}

	const clickRightIcon = () => {
		emit('clickRightIcon')
	}

	const iconStyle = computed(() => {
		return {
			paddingLeft: '6px',
			opacity: isDisabled.value ? 0.4 : 1
		}
	})

	const rootStyle = computed(() => {
		const css = new Map<string, string>()
		if (hasStrValue(props.bgColor)) {
			css.set('background-color', props.bgColor!)
		}

		if (props.height != null) css.set('height', addUnit(props.height!))
		return css
	})

	const customInputStyle = computed(() => {
		const css = new Map<string, string>()
		if (hasStrValue(props.color)) css.set('color', props.color!)
		if (props.fontSize != null) css.set('font-size', addUnit(props.fontSize!))
		return css
	})

	const inputClass = computed(() => {
		return [
			ns.b(""),
			ns.theme(),
			ns.is("disabled", isDisabled.value),
			ns.m(props.border),
			ns.m(props.shape),
			ns.is("border--focus", isFocus.value && props.border != 'none' && props.focusBorder)
		]
	})

	const inputInnerClass = computed(() => {
		return [
			ns.e("input"),
			ns.is("__input--disabled", isDisabled.value),
			ns.e(`input--${props.inputAlign ?? 'left'}`),




		]
	})

	const _placeholderStyle = computed(() => {
		let baseColor = isDark.value ? '#4d4d4d' : '#c8c9cc'
		let css = `color:${baseColor};font-size:${addUnit(props.fontSize ?? '15px')};`
		return css + (props.placeholderStyle ?? "")
	})

	onUnmounted(() => {
		if (timer != null) clearTimeout(timer!)
	})

return (): any | null => {

const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)

  return _cE("view", _uM({
    class: _nC(unref(inputClass)),
    style: _nS([unref(rootStyle),_ctx.customStyle])
  }), [
    isTrue(_ctx.$slots['prefix']!=null || _ctx.prefixIcon!=null)
      ? _cE("view", _uM({
          key: 0,
          class: "rice-input__prefix"
        }), [
          renderSlot(_ctx.$slots, "prefix", {}, (): any[] => [
            _cV(_component_rice_icon, _uM({
              name: _ctx.prefixIcon,
              size: _ctx.iconSize,
              color: _ctx.iconColor,
              onClick: clickLeftIcon
            }), null, 8 /* PROPS */, ["name", "size", "color"])
          ])
        ])
      : _cC("v-if", true),
    _cE("input", _uM({
      modelValue: modelValue.value,
      onInput: [($event: UniInputEvent) => {(modelValue).value = $event.detail.value}, onInput] as Array<any | null>,
      type: unref(inputType),
      inputmode: _ctx.inputmode,
      placeholder: _ctx.placeholder,
      password: unref(isPassword),
      disabled: unref(isDisabled)||unref(isReadonly),
      maxlength: _ctx.maxlength,
      "placeholder-style": unref(_placeholderStyle),
      "cursor-spacing": _ctx.cursorSpacing,
      "cursor-color": _ctx.cursorColor,
      "auto-focus": _ctx.autoFocus,
      focus: _ctx.focus,
      "confirm-type": _ctx.confirmType,
      "confirm-hold": _ctx.confirmHold,
      cursor: _ctx.cursor,
      "selection-start": _ctx.selectionStart,
      "selection-end": _ctx.selectionEnd,
      "adjust-position": _ctx.adjustPosition,
      "hold-keyboard": _ctx.holdKeyboard,
      class: _nC(unref(inputInnerClass)),
      style: _nS([unref(customInputStyle),_ctx.iputStyle]),
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyboardheightchange: onKeyboardheightchange,
      onChange: onChange,
      onConfirm: onConfirm,
      onNicknamereview: onNicknamereview
    }), null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["modelValue", "onInput", "type", "inputmode", "placeholder", "password", "disabled", "maxlength", "placeholder-style", "cursor-spacing", "cursor-color", "auto-focus", "focus", "confirm-type", "confirm-hold", "cursor", "selection-start", "selection-end", "adjust-position", "hold-keyboard"]),
    isTrue(unref(isShowPassword))
      ? _cV(_component_rice_icon, _uM({
          key: 1,
          name: unref(showPasswordValue)?'eyes':'eyes-close',
          size: "17px",
          "custom-style": unref(iconStyle),
          onClick: changeShowPassword
        }), null, 8 /* PROPS */, ["name", "custom-style"])
      : _cC("v-if", true),
    isTrue(unref(isShowClearable))
      ? _cV(_component_rice_icon, _uM({
          key: 2,
          name: _ctx.clearIcon,
          size: "17px",
          "custom-style": unref(iconStyle),
          onClick: onClear
        }), null, 8 /* PROPS */, ["name", "custom-style"])
      : _cC("v-if", true),
    isTrue(_ctx.$slots['suffix']!=null||_ctx.suffixIcon!=null)
      ? _cE("view", _uM({
          key: 3,
          class: "rice-input__suffix"
        }), [
          renderSlot(_ctx.$slots, "suffix", {}, (): any[] => [
            _cV(_component_rice_icon, _uM({
              name: _ctx.suffixIcon,
              size: _ctx.iconSize,
              color: _ctx.iconColor,
              onClick: clickRightIcon
            }), null, 8 /* PROPS */, ["name", "size", "color"])
          ])
        ])
      : _cC("v-if", true)
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type RiceInputComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceInputRiceInputStyles = [_uM([["rice-input", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["height", 42], ["paddingTop", 0], ["paddingRight", 10], ["paddingBottom", 0], ["paddingLeft", 10]]))], ["rice-input__prefix", _pS(_uM([["paddingRight", 10]]))], ["rice-input__suffix", _pS(_uM([["paddingLeft", 10]]))], ["rice-input__input", _pS(_uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["textAlign", "left"], ["fontSize", 15], ["height", "100%"], ["color", "var(--rice-text-color)"]]))], ["rice-input__input--disabled", _pS(_uM([["color", "var(--rice-input-disabled-text-color)"]]))], ["rice-input__input--center", _pS(_uM([["textAlign", "center"]]))], ["rice-input__input--right", _pS(_uM([["textAlign", "right"]]))], ["rice-input--surround", _pS(_uM([["borderTopLeftRadius", 4], ["borderTopRightRadius", 4], ["borderBottomRightRadius", 4], ["borderBottomLeftRadius", 4], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-input-border-color)"], ["borderRightColor", "var(--rice-input-border-color)"], ["borderBottomColor", "var(--rice-input-border-color)"], ["borderLeftColor", "var(--rice-input-border-color)"]]))], ["rice-input--bottom", _pS(_uM([["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "var(--rice-input-border-color)"], ["paddingLeft", 0], ["paddingRight", 0]]))], ["rice-input--none", _pS(_uM([["paddingLeft", 0], ["paddingRight", 0]]))], ["rice-input--border--focus", _pS(_uM([["borderTopColor", "var(--rice-primary-color)"], ["borderRightColor", "var(--rice-primary-color)"], ["borderBottomColor", "var(--rice-primary-color)"], ["borderLeftColor", "var(--rice-primary-color)"]]))], ["rice-input--round", _pS(_uM([["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100]]))], ["rice-input--disabled", _pS(_uM([["backgroundColor", "var(--rice-input-disabled-background)"]]))]])]
