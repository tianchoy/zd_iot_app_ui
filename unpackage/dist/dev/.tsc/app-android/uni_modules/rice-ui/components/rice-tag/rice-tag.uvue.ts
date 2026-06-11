import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import { useNamespace } from '../../libs/use';
	import { isDark } from "../../libs/store";
	import { Coloruts } from "../../libs/plugin";
	import { addUnit, hasStrValue, isGradientColor, isThemeColor } from '../../libs/utils';
	import { TagProps, TagType } from './type.uts';

	
const __sfc__ = defineComponent({
  __name: 'rice-tag',

		name: 'rice-tag',
		styleIsolation: 'app-and-page'
	,
  props: {
    type: { type: String, required: false },
    size: { type: String, required: false },
    color: { type: String, required: false },
    text: { type: [String, Number], required: false },
    icon: { type: String, required: false },
    textColor: { type: String, required: false },
    textSize: { type: [String, Number], required: false },
    show: { type: Boolean, required: false, default: true },
    plain: { type: Boolean, required: false, default: false },
    plainFill: { type: Boolean, required: false, default: false },
    round: { type: Boolean, required: false, default: true },
    mark: { type: Boolean, required: false, default: false },
    closeable: { type: Boolean, required: false, default: false },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  },
  emits: ["click", "close"],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	const ns = useNamespace('tag')
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const props = __props

	const isPlain = computed(() => props.plain || props.plainFill)

	const realShow = ref(props.show)


	const handleClick = () => {
		emit('click')
	}

	const handleClose = (e : UniPointerEvent) => {
		e.stopPropagation();
		emit('close')
	}

	const onTransitionend = () => {
		realShow.value = props.show
	}


	watch(() : boolean => props.show, () => {
		if (props.show) realShow.value = true
	})

	const getTextColor = () : string => {
		if (props.textColor != null) return props.textColor!
		if (props.color != null) {
			return (isPlain.value && !isGradientColor(props.color!))
				? props.color!
				: '#f5f5f5'
		}
		return ""

	}

	const iconSize = computed(() => {
		if (props.size == 'large') return 18;
		if (props.size == 'small') return 14
		return 16
	})


	const iconColor = computed<string>(() => {
		const textColor = getTextColor()

		if (textColor != "") return textColor
		const baseColor = 'var(--rice-text-color)'
		const themeColor = `var(--rice-${props.type}-color)`

		if (isPlain.value) return isThemeColor(props.type) ? themeColor : baseColor

		return isThemeColor(props.type) ? '#f5f5f5' : baseColor

	})


	function darken(color : Coloruts, amount = 20) {
		return color.mix('#141414', amount).toHexString()
	}

	const tagStyle = computed(() => {
		const css = new Map<string, any>()

		if (props.color != null) {
			const color = props.color!
			if (isGradientColor(color)) {
				css.set('background', color)
				css.set('border-style', 'none')
			} else {
				const colorUts = new Coloruts(color)
				css.set('border-color', color)
				if (!isPlain.value) {
					css.set('background', color)
				} else if (props.plainFill) {
					css.set('background', isDark.value ? darken(colorUts, 90) : colorUts.tint(90).toHexString())
				}
			}
		}

		css.set('opacity', props.show ? 1 : 0)

		return css
	})

	const tagClass = computed<string[]>(() => {
		const basic = [
			ns.b(""),
			ns.theme(),
			ns.is('round', props.round),
			ns.is('mark', props.mark),
			ns.m(props.size),
		]
		if (isThemeColor(props.type)) {
			const theme = ns.m(props.plainFill ? `${props.type}--plain-fill` : props.type!)
			basic.push(theme)
		}
		basic.push(ns.is("plain", props.plain))
		return basic
	})


	const textStyle = computed(() => {
		const css = new Map<string, string>()
		const textColor = getTextColor()
		if (textColor != "") css.set('color', textColor)
		if (props.textSize != null) css.set('font-size', addUnit(props.textSize!))
		return css
	})

	const textClass = computed(() => {
		const basic = [ns.e("text")]
		if (isThemeColor(props.type)) {
			const theme = ns.m(isPlain.value ? `${props.type}--plain__text` : `${props.type!}__text`)
			basic.push(theme)
		}
		if (props.size != null) {
			basic.push(ns.m(`${props.size}__text`))
		}
		return basic
	})

return (): any | null => {

const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)

  return isTrue(unref(realShow))
    ? _cE("view", _uM({
        key: 0,
        class: _nC(unref(tagClass)),
        style: _nS([unref(tagStyle),_ctx.customStyle]),
        onClick: handleClick,
        onTransitionend: onTransitionend
      }), [
        renderSlot(_ctx.$slots, "default", {}, (): any[] => [
          isTrue(unref(hasStrValue)(_ctx.icon))
            ? _cV(_component_rice_icon, _uM({
                key: 0,
                name: _ctx.icon,
                color: unref(iconColor),
                size: `${unref(iconSize)}px`,
                "custom-style": {marginRight:'2px'}
              }), null, 8 /* PROPS */, ["name", "color", "size"])
            : _cC("v-if", true),
          _cE("text", _uM({
            class: _nC(unref(textClass)),
            style: _nS(unref(textStyle))
          }), _tD(_ctx.text), 7 /* TEXT, CLASS, STYLE */)
        ]),
        isTrue(_ctx.closeable)
          ? _cE("view", _uM({
              key: 0,
              onClick: withModifiers(handleClose, ["stop"])
            }), [
              _cV(_component_rice_icon, _uM({
                name: "cross",
                color: unref(iconColor),
                size: `${unref(iconSize)-2}px`,
                "custom-style": {marginLeft:'4px'}
              }), null, 8 /* PROPS */, ["color", "size"])
            ])
          : _cC("v-if", true)
      ], 38 /* CLASS, STYLE, NEED_HYDRATION */)
    : _cC("v-if", true)
}
}

})
export default __sfc__
export type RiceTagComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceTagRiceTagStyles = [_uM([["rice-tag", _pS(_uM([["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", 0], ["paddingRight", 10], ["paddingBottom", 0], ["paddingLeft", 10], ["height", 26], ["boxSizing", "border-box"], ["transitionProperty", "opacity"], ["transitionDuration", "0.3s"], ["opacity", 1], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-tag-default-border)"], ["borderRightColor", "var(--rice-tag-default-border)"], ["borderBottomColor", "var(--rice-tag-default-border)"], ["borderLeftColor", "var(--rice-tag-default-border)"]]))], ["rice-tag__text", _pS(_uM([["color", "var(--rice-text-color)"], ["fontSize", 14]]))], ["rice-tag--round", _pS(_uM([["borderTopLeftRadius", 4], ["borderTopRightRadius", 4], ["borderBottomRightRadius", 4], ["borderBottomLeftRadius", 4]]))], ["rice-tag--mark", _pS(_uM([["borderTopLeftRadius", 0], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 0]]))], ["rice-tag--primary", _pS(_uM([["backgroundColor", "var(--rice-primary-color)"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-primary-color)"], ["borderRightColor", "var(--rice-primary-color)"], ["borderBottomColor", "var(--rice-primary-color)"], ["borderLeftColor", "var(--rice-primary-color)"]]))], ["rice-tag--primary__text", _pS(_uM([["color", "var(--rice-text-color-white)"]]))], ["rice-tag--primary--plain__text", _pS(_uM([["color", "var(--rice-primary-color)"]]))], ["rice-tag--success", _pS(_uM([["backgroundColor", "var(--rice-success-color)"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-success-color)"], ["borderRightColor", "var(--rice-success-color)"], ["borderBottomColor", "var(--rice-success-color)"], ["borderLeftColor", "var(--rice-success-color)"]]))], ["rice-tag--success__text", _pS(_uM([["color", "var(--rice-text-color-white)"]]))], ["rice-tag--success--plain__text", _pS(_uM([["color", "var(--rice-success-color)"]]))], ["rice-tag--warning", _pS(_uM([["backgroundColor", "var(--rice-warning-color)"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-warning-color)"], ["borderRightColor", "var(--rice-warning-color)"], ["borderBottomColor", "var(--rice-warning-color)"], ["borderLeftColor", "var(--rice-warning-color)"]]))], ["rice-tag--warning__text", _pS(_uM([["color", "var(--rice-text-color-white)"]]))], ["rice-tag--warning--plain__text", _pS(_uM([["color", "var(--rice-warning-color)"]]))], ["rice-tag--error", _pS(_uM([["backgroundColor", "var(--rice-error-color)"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "var(--rice-error-color)"], ["borderRightColor", "var(--rice-error-color)"], ["borderBottomColor", "var(--rice-error-color)"], ["borderLeftColor", "var(--rice-error-color)"]]))], ["rice-tag--error__text", _pS(_uM([["color", "var(--rice-text-color-white)"]]))], ["rice-tag--error--plain__text", _pS(_uM([["color", "var(--rice-error-color)"]]))], ["rice-tag--primary--plain-fill", _pS(_uM([["backgroundColor", "var(--rice-primary-color-1)"], ["borderTopColor", "var(--rice-primary-color)"], ["borderRightColor", "var(--rice-primary-color)"], ["borderBottomColor", "var(--rice-primary-color)"], ["borderLeftColor", "var(--rice-primary-color)"]]))], ["rice-tag--success--plain-fill", _pS(_uM([["backgroundColor", "var(--rice-success-color-1)"], ["borderTopColor", "var(--rice-success-color)"], ["borderRightColor", "var(--rice-success-color)"], ["borderBottomColor", "var(--rice-success-color)"], ["borderLeftColor", "var(--rice-success-color)"]]))], ["rice-tag--warning--plain-fill", _pS(_uM([["backgroundColor", "var(--rice-warning-color-1)"], ["borderTopColor", "var(--rice-warning-color)"], ["borderRightColor", "var(--rice-warning-color)"], ["borderBottomColor", "var(--rice-warning-color)"], ["borderLeftColor", "var(--rice-warning-color)"]]))], ["rice-tag--error--plain-fill", _pS(_uM([["backgroundColor", "var(--rice-error-color-1)"], ["borderTopColor", "var(--rice-error-color)"], ["borderRightColor", "var(--rice-error-color)"], ["borderBottomColor", "var(--rice-error-color)"], ["borderLeftColor", "var(--rice-error-color)"]]))], ["rice-tag--large", _pS(_uM([["height", 30], ["paddingTop", 0], ["paddingRight", 14], ["paddingBottom", 0], ["paddingLeft", 14]]))], ["rice-tag--large__text", _pS(_uM([["fontSize", 15]]))], ["rice-tag--small", _pS(_uM([["height", 22], ["paddingTop", 0], ["paddingRight", 6], ["paddingBottom", 0], ["paddingLeft", 6]]))], ["rice-tag--small__text", _pS(_uM([["fontSize", 12]]))], ["rice-tag--plain", _pS(_uM([["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"]]))], ["@TRANSITION", _uM([["rice-tag", _uM([["property", "opacity"], ["duration", "0.3s"]])]])]])]
