import { useNamespace, useTouch } from "../../libs/use";
	import { hasStrValue } from "../../libs/utils"
	import { OverlayProps } from "./type.uts"

	
const __sfc__ = defineComponent({
  __name: 'rice-overlay',

		name: 'rice-overlay',
		styleIsolation: 'app-and-page'
	,
  props: /*#__PURE__*/mergeModels({
    zIndex: { type: Number, required: false, default: 998 },
    closeOnClickOverlay: { type: Boolean, required: false, default: true },
    duration: { type: Number, required: false, default: 300 },
    bgColor: { type: String, required: false },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) }
  }, {
    "show": {
		type: Boolean,
		default: false,
	},
  }),
  emits: /*#__PURE__*/mergeModels(["click", "opened", "closed"], ["update:show"]),
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const ns = useNamespace('overlay')
	const touch = useTouch()
	const props = __props


	const show = useModel<Boolean>(__ins.props, "show")

	const realShow = ref(false)
	const transitionClass = ref("")


	const overlayClick = (e : UniPointerEvent) => {
		e.stopPropagation()

		//App端手指按下后在组件区域内移动不会取消tap/click事件的触发，移动到组件区域外才会取消tap/click事件的触发。
		if (!touch.isTap.value) return

		if (props.closeOnClickOverlay) {
			show.value = false
		}
		emit('click', e)
	}


	const onTouchstart = (e : UniTouchEvent) => {
		touch.start(e)
	}


	const onTouchmove = (e : UniTouchEvent) => {


		touch.move(e)

	}






	/**
	 * 打开
	 */
	let timer1 : number | null = null
	let timer2 : number | null = null

	const open = async () => {
		realShow.value = true
		await nextTick()
		if (timer1 != null) clearTimeout(timer1!)

		timer1 = setTimeout(() => {



			transitionClass.value = "rice-overlay--show"
			emit('opened')
		}, 30)
	}

	/**
	 * 关闭
	 */
	const close = () => {
		transitionClass.value = ""

		if (timer2 != null) clearTimeout(timer2!)
		timer2 = setTimeout(() => {
			realShow.value = false
			emit('closed')
		}, props.duration)
	}

	watch(show, (newVal : boolean) => {
		if (newVal && !realShow.value) {
			open()
		}
		if (!newVal && realShow.value) {
			close()
		}
	}, {
		immediate: true
	})

	const rootClass = computed(() => {
		return [
			'rice-overlay',
			ns.theme(),
			transitionClass.value
		] as string[]
	})

	const overlayStyle = computed(() => {
		const css = new Map<string, string | number>()
		css.set('z-index', props.zIndex)

		css.set('transition-duration', props.duration + 'ms')

		if (hasStrValue(props.bgColor)) {
			css.set('background-color', props.bgColor!)
		}
		return css
	})

	onUnmounted(() => {
		if (timer1 != null) clearTimeout(timer1!)
		if (timer2 != null) clearTimeout(timer2!)
	})

return (): any | null => {

  return isTrue(unref(realShow))
    ? _cE("view", _uM({
        key: 0,
        class: _nC(unref(rootClass)),
        style: _nS([unref(overlayStyle),_ctx.customStyle]),
        ref: "overlayRef",
        onTouchstart: onTouchstart,
        onClick: overlayClick,
        onTouchmove: onTouchmove
      }), [
        renderSlot(_ctx.$slots, "default")
      ], 38 /* CLASS, STYLE, NEED_HYDRATION */)
    : _cC("v-if", true)
}
}

})
export default __sfc__
export type RiceOverlayComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayStyles = [_uM([["rice-overlay", _pS(_uM([["position", "fixed"], ["top", 0], ["left", 0], ["height", "100%"], ["width", "100%"], ["backgroundColor", "var(--rice-overlay-background)"], ["transitionProperty", "opacity"], ["opacity", 0]]))], ["rice-overlay--show", _pS(_uM([["opacity", 1]]))], ["@TRANSITION", _uM([["rice-overlay", _uM([["property", "opacity"]])]])]])]
