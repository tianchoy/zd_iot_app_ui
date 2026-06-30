import { useCountDown, useNamespace, CurrentTime, UseCountDownOptions } from '../../libs/use';
	import { addUnit, padZero } from "../../libs/utils"
	import { formatTime } from "./utils"
	import { CountDownProps } from "./type.uts"

	
const __sfc__ = defineComponent({
  __name: 'rice-count-down',

		name: 'rice-count-down',
		styleIsolation: "app-and-page",
		externalClasses: ['text-class']
	,
  slots: Object as SlotsType<{default:  { current : CurrentTime }}>,
  props: {
    time: { type: Number, required: false, default: 0 },
    format: { type: String, required: false, default: 'HH:mm:ss' },
    autoStart: { type: Boolean, required: false, default: true },
    millisecond: { type: Boolean, required: false, default: false },
    fontSize: { type: [String, Number], required: false },
    color: { type: String, required: false },
    textClass: { type: String, required: false, default: "" },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  },
  emits: ["change", "finish"],
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const ns = useNamespace('count-down')
	const props = __props

	const { current, start, pause, reset } = useCountDown({
		time: props.time,
		millisecond: props.millisecond,
		onChange: (current : CurrentTime) => emit('change', current),
		onFinish: () => emit('finish')
	} as UseCountDownOptions)

	const timeValue = computed(() => formatTime(props.format, current.value))

	const resetTime = () => {
		reset(props.time)
		if (props.autoStart) {
			start()
		}
	}

	watch(() : number => props.time, () => {
		resetTime()
	}, {
		immediate: true
	})

	const textStyle = computed(() => {
		const css = new Map<string, string>()
		if (props.fontSize != null) css.set('font-size', addUnit(props.fontSize!))
		if (props.color != null) css.set('color', props.color!)

		return css
	})

	__expose({
		//兼容 Android的写法
		start: () => start(),
		pause: () => pause(),
		reset: resetTime
	})

return (): any | null => {

  return _cE("view", _uM({
    class: _nC(["rice-count-down", unref(ns).theme()]),
    style: _nS(_ctx.customStyle)
  }), [
    renderSlot(_ctx.$slots, "default", _uM({ current: unref(current) }), (): any[] => [
      _cE("text", _uM({
        class: _nC(["rice-count-down__text", _ctx.textClass]),
        style: _nS(unref(textStyle))
      }), _tD(unref(timeValue)), 7 /* TEXT, CLASS, STYLE */)
    ])
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type RiceCountDownComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceCountDownRiceCountDownStyles = [_uM([["rice-count-down__text", _pS(_uM([["fontSize", 15], ["color", "var(--rice-text-color)"]]))]])]
