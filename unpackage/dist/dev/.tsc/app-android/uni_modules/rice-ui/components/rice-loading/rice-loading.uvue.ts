import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import { addUnit, hasStrValue } from '../../libs/utils';
	import { useNamespace } from '../../libs/use';
	import { Coloruts } from "../../libs/plugin";
	import { LoadingProps, LoadingMode, LoadingTimingFunction } from './type.uts';

	import { useLoading, UseLoadingOptions } from "./useLoading"


	
const __sfc__ = defineComponent({
  __name: 'rice-loading',

		name: 'rice-loading',
		styleIsolation: 'app-and-page',
		externalClasses: ['text-class']
	,
  props: {
    mode: { type: String, required: false, default: 'circular' },
    duration: { type: Number, required: false, default: 1100 },
    color: { type: String, required: false },
    inactiveColor: { type: String, required: false },
    size: { type: [String, Number], required: false, default: '24px' },
    text: { type: [String, Number], required: false },
    textColor: { type: String, required: false },
    textSize: { type: [String, Number], required: false },
    textClass: { type: String, required: false, default: '' },
    vertical: { type: Boolean, required: false, default: false },
    timingFunction: { type: String, required: false, default: 'ease-in-out' },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  },
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	



	const slot = useSlots()
	const ns = useNamespace('loading')

	const props = __props

	const color = computed(() => hasStrValue(props.color) ? props.color! : '#1989fa')

	const hasText = computed(() => (props.text != null && props.text != '') || slot['default'] != null)


	//https://issues.dcloud.net.cn/pages/issues/detail?id=29778 

	const _model = computed(() => props.mode)









	const rootClass = computed(() => {
		return [
			ns.b(""),
			ns.theme(),
			ns.is('vertical', props.vertical),
			ns.is('slot', slot['icon'] != null)
		]
	})

	//圆形/半圆
	const semicircleStyle = computed(() => {
		const css = new Map<string, string>()
		const size = addUnit(props.size!)
		css.set('height', size)
		css.set('width', size)

		if (props.mode == 'circle') {
			if (hasStrValue(props.inactiveColor)) {
				css.set('border-color', props.inactiveColor!)
			} else if (color.value != 'inherit') {
				const rgb = new Coloruts(color.value).toRgb()
				css.set('border-color', `rgba(${rgb['r']},${rgb['g']},${rgb['b']},.2)`)
			}
		}
		css.set('border-top-color', color.value)




		return css
	})

	// 默认loading
	const circularStyle = computed(() => {
		const css = new Map<string, string>()
		const size = addUnit(props.size!)
		css.set('height', size)
		css.set('width', size)
		return css
	})

	//文字样式
	const textStyle = computed(() => {
		const css = new Map<string, string>()
		if (props.textColor != null) css.set('color', props.textColor!)
		if (props.textSize != null) css.set('font-size', addUnit(props.textSize!))
		return css
	})

	const loadingTextClass = computed(() => `rice-loading__text--${props.vertical ? 'vertical' : 'row'}`)


	const rotateRef = shallowRef<UniElement | null>(null)
	const circularRef = shallowRef<UniElement | null>(null)

	//动画类型，snow 时恒为 linear
	const animationTimingFn = computed(() => (props.mode == 'snow' || slot['icon'] != null) ? 'linear' : props.timingFunction)

	useLoading({
		rotateRef,
		circularRef,
		timingFunction: animationTimingFn.value,
		mode: props.mode,
		color,
		size: props.size,
		duration: props.duration,
	} as UseLoadingOptions)














return (): any | null => {

const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)

  return _cE("view", _uM({
    class: _nC(unref(rootClass)),
    style: _nS(_ctx.customStyle)
  }), [
    isTrue(_ctx.mode=='snow' || unref(slot)['icon']!=null)
      ? _cE("view", _uM({
          key: 0,
          class: "rice-loading--snow",
          ref_key: "rotateRef",
          ref: rotateRef
        }), [
          renderSlot(_ctx.$slots, "icon", {}, (): any[] => [
            _cV(_component_rice_icon, _uM({
              name: "loading",
              size: _ctx.size,
              color: unref(color)
            }), null, 8 /* PROPS */, ["size", "color"])
          ])
        ], 512 /* NEED_PATCH */)
      : isTrue(_ctx.mode=='semicircle'||_ctx.mode=='circle')
        ? _cE("view", _uM({
            key: 1,
            class: _nC(unref(ns).m(_ctx.mode)),
            style: _nS(unref(semicircleStyle)),
            ref_key: "rotateRef",
            ref: rotateRef
          }), null, 6 /* CLASS, STYLE */)
        : _cE("view", _uM({
            key: 2,
            class: "rice-loading--circular",
            style: _nS(unref(circularStyle)),
            ref_key: "circularRef",
            ref: circularRef
          }), null, 4 /* STYLE */),
    isTrue(unref(hasText))
      ? _cE("text", _uM({
          key: 3,
          class: _nC(["rice-loading__text", [unref(loadingTextClass),props.textClass]]),
          style: _nS(unref(textStyle))
        }), [
          renderSlot(_ctx.$slots, "default", {}, (): any[] => [_tD(_ctx.text)])
        ], 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type RiceLoadingComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceLoadingRiceLoadingStyles = [_uM([["rice-loading", _pS(_uM([["flexDirection", "row"], ["alignItems", "center"]]))], ["rice-loading__text", _pS(_uM([["fontSize", 14], ["color", "var(--rice-text-color-2)"]]))], ["rice-loading__text--row", _pS(_uM([["marginLeft", 8]]))], ["rice-loading__text--vertical", _pS(_uM([["marginTop", 8]]))], ["rice-loading--vertical", _pS(_uM([["flexDirection", "column"], ["justifyContent", "center"]]))], ["rice-loading--semicircle", _pS(_uM([["borderTopLeftRadius", 999], ["borderTopRightRadius", 999], ["borderBottomRightRadius", 999], ["borderBottomLeftRadius", 999], ["borderTopWidth", 2], ["borderRightWidth", 2], ["borderBottomWidth", 2], ["borderLeftWidth", 2], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(0,0,0,0)"], ["borderRightColor", "rgba(0,0,0,0)"], ["borderBottomColor", "rgba(0,0,0,0)"], ["borderLeftColor", "rgba(0,0,0,0)"]]))], ["rice-loading--circle", _pS(_uM([["borderTopLeftRadius", 999], ["borderTopRightRadius", 999], ["borderBottomRightRadius", 999], ["borderBottomLeftRadius", 999], ["borderTopWidth", 2], ["borderRightWidth", 2], ["borderBottomWidth", 2], ["borderLeftWidth", 2], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(25,136,249,0.2)"], ["borderRightColor", "rgba(25,136,249,0.2)"], ["borderBottomColor", "rgba(25,136,249,0.2)"], ["borderLeftColor", "rgba(25,136,249,0.2)"]]))]])]
