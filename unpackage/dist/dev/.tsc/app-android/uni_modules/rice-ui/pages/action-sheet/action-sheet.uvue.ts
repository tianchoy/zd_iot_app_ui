import _easycom_rice_action_sheet from '@/uni_modules/rice-ui/components/rice-action-sheet/rice-action-sheet.uvue'
import { ActionSheetProps, ActionSheetBusEvent, ActionSheetAction } from '../../components/rice-action-sheet/index';
	
const __sfc__ = defineComponent({
  __name: 'action-sheet',

		name: 'rice-action-sheet-page'
	,
  setup(__props, __setupCtx: SetupContext) {
const __expose = __setupCtx.expose
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	const show = ref(false)
	const params = ref<ActionSheetProps>({})
	let busEventName : string | null = null
	let optionsEventName : string | null = null
	let readyEventName : string | null = null
	let closeTimer : number | null = null
	const dialogPageIns = ref<UniPage | null>(null)

	const actionsList = computed(() => params.value.actions ?? [] as ActionSheetAction[])

	const handleBusEvent = (event : ActionSheetBusEvent) => {
		if (busEventName != null) {
			uni.$emit(busEventName!, event)
		}
	}

	const onSelect = (action : ActionSheetAction, index : number) => {
		handleBusEvent({
			type: 'select',
			action,
			index
		})
	}
	const onCancel = () => {
		handleBusEvent({ type: 'cancel' })
	}

	const onOpen = () => {
		handleBusEvent({ type: 'open' })
	}

	const onClose = () => {
		show.value = false
	}

	const onOpened = () => {
		handleBusEvent({ type: 'opened' })
	}

	const onClosed = () => {
		handleBusEvent({ type: 'closed' })
		uni.closeDialogPage({
			dialogPage: dialogPageIns.value
		})
	}

	const clickOverlay = () => {
		handleBusEvent({ type: 'clickOverlay' })
	}

	const updateParams = (data : ActionSheetProps) => {
		for (let key in data) {
			if (data[key] != null) {
				params.value[key] = data[key]
			}
		}
	}

	watch(show, (newVal : boolean) => {
		if (!newVal) {
			handleBusEvent({ type: 'close' })
		}
	})

	const close = () => {
		show.value = false
	}

	onLoad((options) => {
		readyEventName = options['readyEventName']
		optionsEventName = options['optionsEventName']
		busEventName = options['busEventName']
		if (readyEventName != null && optionsEventName != null) {
			uni.$on(optionsEventName!, (data : ActionSheetProps) => {
				params.value = data
			})
			uni.$emit(readyEventName!, {})
		}

	})

	onReady(() => {
		show.value = true
		dialogPageIns.value = getCurrentInstance()?.proxy?.$page
		handleBusEvent({
			type: 'ready',
			pageIns: dialogPageIns.value!
		})
	})

	onBackPress(() => {
		close()
		return true
	})

	onUnload(() => {
		if (busEventName != null) uni.$off(busEventName!, null)
		if (optionsEventName != null) uni.$off(optionsEventName!, null)
		if (readyEventName != null) uni.$off(readyEventName!, null)
		if (closeTimer != null) clearTimeout(closeTimer!)
	})



	__expose({
		updateParams,
		close,
	})

return (): any | null => {

const _component_rice_action_sheet = resolveEasyComponent("rice-action-sheet",_easycom_rice_action_sheet)

  return _cV(_component_rice_action_sheet, _uM({
    show: unref(show),
    "onUpdate:show": $event => {trySetRefValue(show, $event)},
    title: unref(params).title,
    actions: unref(actionsList),
    "use-dialog-page": false,
    "show-cancel": unref(params).showCancel,
    "cancel-text": unref(params).cancelText,
    duration: unref(params).duration,
    "z-index": unref(params).zIndex,
    opacity: unref(params).opacity,
    overlay: unref(params).overlay,
    "overlay-bg-color": unref(params).overlayBgColor,
    "close-on-click-action": unref(params).closeOnClickAction,
    "close-on-click-overlay": unref(params).closeOnClickOverlay,
    radius: unref(params).radius,
    "safe-area-inset-bottom": unref(params).safeAreaInsetBottom,
    "custom-style": unref(params).customStyle,
    onSelect: onSelect,
    onCancel: onCancel,
    onOpen: onOpen,
    onClose: onClose,
    onOpened: onOpened,
    onClosed: onClosed,
    onClickOverlay: clickOverlay
  }), null, 8 /* PROPS */, ["show", "title", "actions", "show-cancel", "cancel-text", "duration", "z-index", "opacity", "overlay", "overlay-bg-color", "close-on-click-action", "close-on-click-overlay", "radius", "safe-area-inset-bottom", "custom-style"])
}
}

})
export default __sfc__
const GenUniModulesRiceUiPagesActionSheetActionSheetStyles = []
