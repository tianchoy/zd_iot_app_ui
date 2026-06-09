import { BadgeProps } from './type.uts';
	import { useNamespace } from "../../libs/use"
	import { addUnit, hasStrValue } from "../../libs/utils"

	
const __sfc__ = defineComponent({
  __name: 'rice-badge',

		name: "rice-badge",
		styleIsolation: "app-and-page",
		externalClasses: ["text-class"]
	,
  props: {
    value: { type: [String, Number], required: false },
    max: { type: Number, required: false },
    isDot: { type: Boolean, required: false, default: false },
    hidden: { type: Boolean, required: false, default: false },
    type: { type: String, required: false, default: 'error' },
    showZero: { type: Boolean, required: false, default: true },
    bgColor: { type: String, required: false },
    color: { type: String, required: false },
    fontSize: { type: [String, Number], required: false },
    position: { type: String, required: false, default: 'top-right' },
    offset: { type: Array as PropType<Array<number | string>>, required: false, default: () : Array<number | string> => ([]) },
    absolute: { type: Boolean, required: false },
    textClass: { type: String, required: false, default: "" },
    badgeStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  },
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	const ns = useNamespace('badge')

	const slots = useSlots()

	const props = __props

	const single = computed(() => slots['default'] == null)
	const isAbsolute = computed(() => !single.value || props.absolute == true)

	//是否显示徽标





	const isNumZero = computed(() => props.value == 0)

	const showBadge = computed(() => !props.hidden && (props.isDot || props.showZero || !isNumZero.value))

	//徽标的内容
	const formatValue = computed(() => {
		if (props.isDot) return ""
		if (typeof props.value == 'number' && typeof props.max == 'number') {
			return props.max < props.value ? `${props.max}+` : props.value
		}
		return props.value
	})


	//内容的class

	const contentClass = computed(() => {
		return [
			ns.e("content"),
			ns.m(props.type),
			ns.is("fixed", isAbsolute.value),
			ns.is("dot", props.isDot),
			ns.m(isAbsolute.value ? props.position : ''),
			ns.theme(),
		]
	})

	/**
	 * 获取数值单位
	 */
	const getOffsetUumString = (val : string) => {
		return val.startsWith('-') ? addUnit(val.replace('-', '')) : `-${addUnit(val)}`;
	}

	//内容的style
	const contentStyle = computed(() => {
		const css = new Map<string, string>()
		if (props.bgColor != null) {
			css.set('background-color', props.bgColor!)
		}
		if (props.offset.length > 0) {
			const x = props.offset[0]
			const y = props.offset.length >= 2 ? props.offset[1] : 0
			if (!isAbsolute.value) {
				css.set('margin-left', addUnit(x))
				css.set('margin-top', addUnit(y))
			} else {
				const p = props.position.split('-')
				const offsetY = p[0] //top bottom
				const offsetX = p[1] // left right
				if (typeof x == 'number') {
					css.set(offsetX, addUnit(offsetX == 'left' ? x : -x))
				} else {
					css.set(offsetX, offsetX == 'left' ? addUnit(x) : getOffsetUumString(x as string))
				}
				if (typeof y == 'number') {
					css.set(offsetY, addUnit(offsetY == 'top' ? y : -y))
				} else {
					css.set(offsetY, offsetY == 'top' ? addUnit(y) : getOffsetUumString(y as string))
				}
			}
		}
		return css
	})

	//文字的style
	const textStyle = computed(() => {
		const css = new Map<string, string>()
		if (props.color != null) {
			css.set('color', props.color!)
		}
		if (props.fontSize != null) {
			css.set('font-size', addUnit(props.fontSize!))
		}
		return css
	})

return (): any | null => {

  return isTrue(!unref(single))
    ? _cE("view", _uM({
        key: 0,
        class: "rice-badge"
      }), [
        renderSlot(_ctx.$slots, "default"),
        isTrue(unref(showBadge))
          ? _cE("view", _uM({
              key: 0,
              class: _nC(unref(contentClass)),
              style: _nS([unref(contentStyle),_ctx.badgeStyle])
            }), [
              renderSlot(_ctx.$slots, "content", {}, (): any[] => [
                isTrue(unref(hasStrValue)(unref(formatValue)))
                  ? _cE("text", _uM({
                      key: 0,
                      class: _nC(["rice-badge__content__text", _ctx.textClass]),
                      style: _nS(unref(textStyle))
                    }), _tD(unref(formatValue)), 7 /* TEXT, CLASS, STYLE */)
                  : _cC("v-if", true)
              ])
            ], 6 /* CLASS, STYLE */)
          : _cC("v-if", true)
      ])
    : _cE("view", _uM({
        key: 1,
        class: _nC([unref(ns).b(''),unref(contentClass)]),
        style: _nS([unref(contentStyle),_ctx.badgeStyle])
      }), [
        renderSlot(_ctx.$slots, "content", {}, (): any[] => [
          isTrue(unref(hasStrValue)(unref(formatValue)))
            ? _cE("text", _uM({
                key: 0,
                class: _nC(["rice-badge__content__text", _ctx.textClass]),
                style: _nS(unref(textStyle))
              }), _tD(unref(formatValue)), 7 /* TEXT, CLASS, STYLE */)
            : _cC("v-if", true)
        ])
      ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type RiceBadgeComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceBadgeRiceBadgeStyles = [_uM([["rice-badge", _pS(_uM([["position", "relative"], ["overflow", "visible"]]))], ["rice-badge__content", _pS(_uM([["paddingTop", 0], ["paddingRight", 4], ["paddingBottom", 0], ["paddingLeft", 4], ["minWidth", 16], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 100], ["borderTopRightRadius", 100], ["borderBottomRightRadius", 100], ["borderBottomLeftRadius", 100], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ffffff"], ["borderRightColor", "#ffffff"], ["borderBottomColor", "#ffffff"], ["borderLeftColor", "#ffffff"], ["backgroundColor", "var(--rice-error-color)"]]))], ["rice-badge__content__text", _pS(_uM([["fontSize", 12], ["color", "#ffffff"], ["whiteSpace", "nowrap"]]))], ["rice-badge--fixed", _pS(_uM([["position", "absolute"], ["zIndex", 99]]))], ["rice-badge--dot", _pS(_uM([["height", 12], ["width", 12], ["borderTopLeftRadius", 12], ["borderTopRightRadius", 12], ["borderBottomRightRadius", 12], ["borderBottomLeftRadius", 12], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["minWidth", 0]]))], ["rice-badge--top-left", _pS(_uM([["top", 0], ["left", 0], ["transform", "translate(-50%, -50%)"]]))], ["rice-badge--top-right", _pS(_uM([["top", 0], ["right", 0], ["transform", "translate(50%, -50%)"]]))], ["rice-badge--bottom-left", _pS(_uM([["bottom", 0], ["left", 0], ["transform", "translate(-50%, 50%)"]]))], ["rice-badge--bottom-right", _pS(_uM([["bottom", 0], ["right", 0], ["transform", "translate(50%, 50%)"]]))], ["rice-badge--primary", _pS(_uM([["backgroundColor", "var(--rice-primary-color)"]]))], ["rice-badge--success", _pS(_uM([["backgroundColor", "var(--rice-success-color)"]]))], ["rice-badge--warning", _pS(_uM([["backgroundColor", "var(--rice-warning-color)"]]))], ["rice-badge--error", _pS(_uM([["backgroundColor", "var(--rice-error-color)"]]))]])]
