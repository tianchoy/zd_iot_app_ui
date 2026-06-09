import _easycom_rice_overlay from '@/uni_modules/rice-ui/components/rice-overlay/rice-overlay.uvue'
import _easycom_rice_button from '@/uni_modules/rice-ui/components/rice-button/rice-button.uvue'
import _easycom_rice_loading from '@/uni_modules/rice-ui/components/rice-loading/rice-loading.uvue'
import { useNamespace } from '../../libs/use';
	import { addUnit, callInterceptor, hasStrValue } from "../../libs/utils"
	import { BeforeChangeInterceptor } from "../../libs/types"
	import { isDark } from "../../libs/store"
	import { showDialog, hideDialog } from "./api.uts"
	import { DialogProps } from './type.uts';

	
const __sfc__ = defineComponent({
  __name: 'rice-dialog',

		name: 'rice-dialog',
		styleIsolation: 'app-and-page'
	,
  props: /*#__PURE__*/mergeModels({
    title: { type: String, required: false },
    width: { type: [String, Number], required: false },
    message: { type: String, required: false },
    messageAlign: { type: String, required: false, default: 'center' },
    buttonTheme: { type: String, required: false, default: 'default' },
    buttonLayout: { type: String, required: false, default: 'row' },
    showConfirmButton: { type: Boolean, required: false, default: true },
    confirmButtonText: { type: String, required: false, default: '确认' },
    confirmButtonColor: { type: String, required: false },
    confirmButtonDisabled: { type: Boolean, required: false, default: false },
    showCancelButton: { type: Boolean, required: false, default: true },
    cancelButtonText: { type: String, required: false, default: '取消' },
    cancelButtonColor: { type: String, required: false },
    cancelButtonDisabled: { type: Boolean, required: false, default: false },
    duration: { type: Number, required: false, default: 250 },
    overlay: { type: Boolean, required: false, default: true },
    overlayBgColor: { type: String, required: false, default: 'rgba(0,0,0,.6)' },
    closeOnClickOverlay: { type: Boolean, required: false, default: false },
    beforeClose: { type: Object, required: false },
    zIndex: { type: Number, required: false, default: 999 },
    bgColor: { type: String, required: false },
    marginTop: { type: [String, Number], required: false },
    useDialogPage: { type: Boolean, required: false, default: true },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) },
    confirm: { type: Function as PropType<() => void>, required: false },
    cancel: { type: Function as PropType<() => void>, required: false },
    clickOverlay: { type: Function as PropType<() => void>, required: false },
    open: { type: Function as PropType<() => void>, required: false },
    close: { type: Function as PropType<() => void>, required: false },
    opened: { type: Function as PropType<() => void>, required: false },
    closed: { type: Function as PropType<() => void>, required: false },
    ready: { type: Function as PropType<(pageIns : UniPage) => void>, required: false },
    fail: { type: Function as PropType<(errMsg : string) => void>, required: false }
  }, {
    "show": {
		type: Boolean,
		default: false,
	},
  }),
  emits: /*#__PURE__*/mergeModels(["confirm", "cancel", "open", "close", "closed", "opened", "clickOverlay"], ["update:show"]),
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	

	const ns = useNamespace('dialog')
	const slots = useSlots()

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const show = useModel<Boolean>(__ins.props, "show")

	const props = __props

	const hasTitle = computed(() => slots['title'] != null || hasStrValue(props.title))

	let openTimer : number | null = null
	let openedTimer : number | null = null
	let closeTimer : number | null = null

	const handleOpenTimer = () => {
		if (openTimer != null) clearTimeout(openTimer!)
		if (openedTimer != null) clearTimeout(openedTimer!)
	}

	const handleCloseTimer = () => {
		if (closeTimer != null) clearTimeout(closeTimer!)
	}

	const realShow = ref(false)
	const dialogRef = shallowRef<UniElement | null>(null)

	const open = async () => {
		if (realShow.value) return
		realShow.value = true
		await nextTick()
		handleOpenTimer()
		openTimer = setTimeout(() => {
			dialogRef.value?.style.setProperty('transition-duration', props.duration + 'ms')
			dialogRef.value?.style.setProperty('opacity', '1')
			dialogRef.value?.style.setProperty('transform', 'translate(-50%, -50%) scale(1)')
			openedTimer = setTimeout(() => {
				emit('opened')
			}, props.duration)
		}, 30)
	}



	const hasDialogPage = ref(true)
	//使用dialogPage的前提：useDialogPage为true且没有使用插槽
	const isUseDialogPage = computed(() => props.useDialogPage == true && hasDialogPage.value && slots['title'] == null && slots['default'] == null && slots['footer'] == null)
	const dialogPageIns = ref<UniPage | null>(null)
	const handleShowDialog = () => {
		// toRefs() 仅支持 Array 和 UTSJSONObject, 不支持自定义类型。App端此处不能使用toRefs
		// 也不能使用JSON.parse 进行转换（APP端数据会丢失）
		showDialog({
			title: props.title,
			message: props.message,
			messageAlign: props.messageAlign,
			buttonTheme: props.buttonTheme,
			buttonLayout: props.buttonLayout,
			showConfirmButton: props.showConfirmButton,
			confirmButtonText: props.confirmButtonText,
			confirmButtonColor: props.confirmButtonColor,
			confirmButtonDisabled: props.confirmButtonDisabled,
			showCancelButton: props.showCancelButton,
			cancelButtonText: props.cancelButtonText,
			cancelButtonColor: props.cancelButtonColor,
			cancelButtonDisabled: props.cancelButtonDisabled,
			duration: props.duration,
			overlay: props.overlay,
			overlayBgColor: props.overlayBgColor,
			closeOnClickOverlay: props.closeOnClickOverlay,
			beforeClose: props.beforeClose as BeforeChangeInterceptor | null,
			bgColor: props.bgColor,
			zIndex: props.zIndex,
			marginTop: props.marginTop,
			confirm: () => {
				emit('confirm')
			},
			cancel: () => {
				emit('cancel')
			},
			ready: (pageIns : UniPage | null) => {
				dialogPageIns.value = pageIns
				hasDialogPage.value = true
			},
			open: () => {
				emit('open')
			},
			close: () => {
				if (show.value) {
					show.value = false
					emit('close')
				}
			},
			opened: () => {
				emit('opened')
			},
			closed: () => {
				emit('closed')
			},
			fail: () => {
				hasDialogPage.value = false
				emit('open')
				open()
			}
		})
	}

	watch(
		() : (any | null)[] =>
			[
				props.title,
				props.message,
			],
		() => {
			if (show.value) {
				dialogPageIns.value?.vm?.$callMethod('updateParams', {
					title: props.title,
					message: props.message,
				} as DialogProps)
			}
		})



	const showOverlay = computed(() => {

		return isUseDialogPage.value ? false : props.overlay




	})

	const close = () => {
		if (!realShow.value) return
		dialogRef.value?.style.setProperty('opacity', '0')
		dialogRef.value?.style.setProperty('transform', `translate(-50%, -50%) scale(0.85)`)
		handleCloseTimer()
		closeTimer = setTimeout(() => {
			realShow.value = false
			emit('closed')

			dialogPageIns.value = null

		}, props.duration)

	}


	const confirmLoading = ref(false)
	const confirm = () => {
		if (props.confirmButtonDisabled || confirmLoading.value) return
		emit('confirm')
		if (typeof props.beforeClose != 'function') {
			show.value = false
			return
		}
		//异步控制-
		confirmLoading.value = true
		callInterceptor(props.beforeClose as BeforeChangeInterceptor, {
			done() {
				show.value = false
			},
			complete() {
				confirmLoading.value = false
			}
		})
	}

	const cancel = () => {
		if (props.cancelButtonDisabled) return
		show.value = false
		emit('cancel')
	}

	const overlayClick = () => {
		if (props.closeOnClickOverlay) {
			show.value = false
		}
		emit('clickOverlay')
	}

	watch(show, (newVal : boolean) => {
		if (newVal && !realShow.value) {

			if (isUseDialogPage.value) {
				handleShowDialog()
				return
			}

			open()
			emit('open')
		}
		if (!newVal && realShow.value) {
			close()
			emit('close')
		}
	}, {
		immediate: true
	})

	const cancelButtonHover = computed(() => props.cancelButtonDisabled
		? 'none'
		: `rice-dialog__button--${isDark.value ? 'hover--dark' : 'hover'}`)
	const confirmButtonHover = computed(() => (props.confirmButtonDisabled || confirmLoading.value) ?
		'none' :
		`rice-dialog__button--${isDark.value ? 'hover--dark' : 'hover'}`)

	const dialogStyle = computed(() => {
		const css = new Map<string, string | number>()
		css.set('z-index', props.zIndex)
		if (props.width != null) {
			css.set('width', addUnit(props.width!))
		}
		if (props.marginTop != null) {
			css.set('margin-top', addUnit(props.marginTop!))
		}
		if (hasStrValue(props.bgColor)) {
			css.set('background-color', props.bgColor!)
		}
		return css
	})

	const cancelTextStyle = computed(() => {
		const css = new Map<string, string>()
		if (hasStrValue(props.cancelButtonColor)) {
			css.set('color', props.cancelButtonColor!)
		}
		return css
	})

	const confirmTextStyle = computed(() => {
		const css = new Map<string, string>()
		if (hasStrValue(props.confirmButtonColor)) {
			css.set('color', props.confirmButtonColor!)
		}
		return css
	})

	const dialogClass = computed(() => {
		return [
			ns.b(""),
			ns.theme(),

		]
	})

	const contentClass = computed(() => {
		return [
			ns.e("content"),
			ns.is("__content--has-title", hasTitle.value)
		]
	})

	const messageTextClass = computed(() => {
		return [
			ns.e('message__text'),
			ns.e(`message__${props.messageAlign}`),
		]
	})


	const footerClass = computed(() => {
		const hasSlot = slots['footer'] != null
		const isDefaultTheme = props.buttonTheme == 'default'
		return [
			ns.e('footer'),
			ns.is('__footer--border', isDefaultTheme && !hasSlot),
			ns.is('__footer--vertical', props.buttonLayout == 'col' && !isDefaultTheme && !hasSlot),
			ns.is('__footer--btn', !isDefaultTheme && !hasSlot)
		]
	})

	const getButtonClass = (type : string) => {
		const base = [
			ns.e("button"),
			ns.is(`__button--disabled`, type == 'cancel' ? props.cancelButtonDisabled : props.confirmButtonDisabled)
		]
		if (type == 'cancel' && props.showConfirmButton) {
			base.push(ns.e('button--border'))
		}
		return base
	}

	const cancelButtonStyle = computed(() => {
		const isVertical = props.buttonLayout == 'col'
		const css = new Map<string, string | number>()
		if (props.buttonLayout == 'row') {
			css.set('flex', 1)
		}
		css.set('marginRight', props.showConfirmButton && !isVertical ? '12px' : '0px')
		css.set('marginTop', props.showConfirmButton && isVertical ? '12px' : '0px')
		return css
		// return {
		// 	flex: props.buttonLayout == 'row' ? 1 : 'none',
		// 	marginRight: props.showConfirmButton && !isVertical ? '12px' : '0px',
		// 	marginTop: props.showConfirmButton && isVertical ? '12px' : '0px'
		// }
	})

	const confirmButtonStyle = computed(() => {
		const css = new Map<string, string | number>()
		if (props.buttonLayout == 'row') {
			css.set('flex', 1)
		}
		// return {
		// 	flex: props.buttonLayout == 'row' ? 1 : 'none',
		// }
		return css

	})

	onUnmounted(() => {
		handleOpenTimer()
		handleCloseTimer()
	})

return (): any | null => {

const _component_rice_overlay = resolveEasyComponent("rice-overlay",_easycom_rice_overlay)
const _component_rice_button = resolveEasyComponent("rice-button",_easycom_rice_button)
const _component_rice_loading = resolveEasyComponent("rice-loading",_easycom_rice_loading)

  return _cE(Fragment, null, [
    isTrue(unref(showOverlay))
      ? _cV(_component_rice_overlay, _uM({
          key: 0,
          show: show.value,
          duration: _ctx.duration,
          "close-on-click-overlay": false,
          "bg-color": _ctx.overlayBgColor,
          "z-index": _ctx.zIndex-1,
          onClick: overlayClick
        }), null, 8 /* PROPS */, ["show", "duration", "bg-color", "z-index"])
      : _cC("v-if", true),
    isTrue(unref(realShow))
      ? _cE("view", _uM({
          key: 1,
          class: _nC(unref(dialogClass)),
          style: _nS([unref(dialogStyle),_ctx.customStyle]),
          ref_key: "dialogRef",
          ref: dialogRef
        }), [
          isTrue(unref(hasTitle))
            ? _cE("view", _uM({
                key: 0,
                class: "rice-dialog__title"
              }), [
                renderSlot(_ctx.$slots, "title", {}, (): any[] => [
                  _cE("text", _uM({ class: "rice-dialog__title__text" }), _tD(_ctx.title), 1 /* TEXT */)
                ])
              ])
            : _cC("v-if", true),
          _cE("view", _uM({
            class: _nC(unref(contentClass))
          }), [
            renderSlot(_ctx.$slots, "default", {}, (): any[] => [
              isTrue(unref(hasStrValue)(_ctx.message))
                ? _cE("scroll-view", _uM({
                    key: 0,
                    class: "rice-dialog__message",
                    "show-scrollbar": false
                  }), [
                    _cE("text", _uM({
                      class: _nC(unref(messageTextClass))
                    }), _tD(_ctx.message), 3 /* TEXT, CLASS */)
                  ])
                : _cC("v-if", true)
            ])
          ], 2 /* CLASS */),
          _cE("view", _uM({
            class: _nC(unref(footerClass))
          }), [
            renderSlot(_ctx.$slots, "footer", {}, (): any[] => [
              isTrue(_ctx.showCancelButton)
                ? _cE(Fragment, _uM({ key: 0 }), [
                    _ctx.buttonTheme!='default'
                      ? _cV(_component_rice_button, _uM({
                          key: 0,
                          type: "primary",
                          "plain-fill": "",
                          text: _ctx.cancelButtonText,
                          shape: _ctx.buttonTheme=='round'?'round':'',
                          color: _ctx.cancelButtonColor,
                          disabled: _ctx.cancelButtonDisabled,
                          style: _nS(unref(cancelButtonStyle)),
                          onClick: cancel
                        }), null, 8 /* PROPS */, ["text", "shape", "color", "disabled", "style"])
                      : _cE("view", _uM({
                          key: 1,
                          class: _nC(getButtonClass('cancel')),
                          "hover-stay-time": 100,
                          "hover-class": unref(cancelButtonHover),
                          onClick: cancel
                        }), [
                          _cE("text", _uM({
                            class: "rice-dialog__button__text",
                            style: _nS(unref(cancelTextStyle))
                          }), _tD(_ctx.cancelButtonText), 5 /* TEXT, STYLE */)
                        ], 10 /* CLASS, PROPS */, ["hover-class"])
                  ], 64 /* STABLE_FRAGMENT */)
                : _cC("v-if", true),
              isTrue(_ctx.showConfirmButton)
                ? _cE(Fragment, _uM({ key: 1 }), [
                    _ctx.buttonTheme!='default'
                      ? _cV(_component_rice_button, _uM({
                          key: 0,
                          type: "primary",
                          text: _ctx.confirmButtonText,
                          color: _ctx.confirmButtonColor,
                          shape: _ctx.buttonTheme=='round'?'round':'',
                          style: _nS(unref(confirmButtonStyle)),
                          disabled: _ctx.confirmButtonDisabled,
                          loading: unref(confirmLoading),
                          onClick: confirm
                        }), null, 8 /* PROPS */, ["text", "color", "shape", "style", "disabled", "loading"])
                      : _cE("view", _uM({
                          key: 1,
                          class: _nC(getButtonClass('confirm')),
                          "hover-class": unref(confirmButtonHover),
                          "hover-stay-time": 100,
                          onClick: confirm
                        }), [
                          isTrue(!unref(confirmLoading))
                            ? _cE("text", _uM({
                                key: 0,
                                class: "rice-dialog__button__text rice-dialog__button__text__confirm",
                                style: _nS(unref(confirmTextStyle))
                              }), _tD(_ctx.confirmButtonText), 5 /* TEXT, STYLE */)
                            : _cV(_component_rice_loading, _uM({
                                key: 1,
                                color: _ctx.confirmButtonColor
                              }), null, 8 /* PROPS */, ["color"])
                        ], 10 /* CLASS, PROPS */, ["hover-class"])
                  ], 64 /* STABLE_FRAGMENT */)
                : _cC("v-if", true)
            ])
          ], 2 /* CLASS */)
        ], 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type RiceDialogComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceDialogRiceDialogStyles = [_uM([["rice-dialog", _pS(_uM([["position", "fixed"], ["top", "50%"], ["left", "50%"], ["width", 320], ["backgroundColor", "var(--rice-dialog-background)"], ["borderTopLeftRadius", 12], ["borderTopRightRadius", 12], ["borderBottomRightRadius", 12], ["borderBottomLeftRadius", 12], ["opacity", 0], ["transform", "translate(-50%, -50%) scale(0.8)"], ["transitionProperty", "opacity,transform"]]))], ["rice-dialog__title", _pS(_uM([["alignItems", "center"], ["paddingTop", 24], ["paddingRight", 16], ["paddingBottom", 0], ["paddingLeft", 16]]))], ["rice-dialog__title__text", _pS(_uM([["width", "100%"], ["fontSize", 17], ["fontWeight", "bold"], ["textAlign", "center"], ["color", "var(--rice-text-color)"], ["lines", 2], ["textOverflow", "ellipsis"]]))], ["rice-dialog__content", _pS(_uM([["justifyContent", "center"], ["alignItems", "center"], ["paddingTop", 24], ["paddingRight", 16], ["paddingBottom", 24], ["paddingLeft", 16]]))], ["rice-dialog__content--has-title", _pS(_uM([["paddingTop", 16]]))], ["rice-dialog__message", _pS(_uM([["maxHeight", 280], ["width", "100%"]]))], ["rice-dialog__message__text", _pS(_uM([["fontSize", 16], ["color", "var(--rice-dialog-message-text-color)"], ["textAlign", "center"]]))], ["rice-dialog__message__left", _pS(_uM([["textAlign", "left"]]))], ["rice-dialog__message__right", _pS(_uM([["textAlign", "right"]]))], ["rice-dialog__footer", _pS(_uM([["flexDirection", "row"], ["width", "100%"]]))], ["rice-dialog__footer--border", _pS(_uM([["borderTopWidth", 1], ["borderTopStyle", "solid"], ["borderTopColor", "var(--rice-border-color)"]]))], ["rice-dialog__footer--vertical", _pS(_uM([["flexDirection", "column-reverse"], ["flexWrap", "nowrap"]]))], ["rice-dialog__footer--btn", _pS(_uM([["paddingTop", 0], ["paddingRight", 16], ["paddingBottom", 24], ["paddingLeft", 16]]))], ["rice-dialog__button", _pS(_uM([["height", 48], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["rice-dialog__button__text", _pS(_uM([["textAlign", "center"], ["fontSize", 16], ["color", "var(--rice-text-color)"], ["fontWeight", "bold"]]))], ["rice-dialog__button__text__confirm", _pS(_uM([["color", "var(--rice-primary-color)"]]))], ["rice-dialog__button--disabled", _pS(_uM([["opacity", 0.5]]))], ["rice-dialog__button--border", _pS(_uM([["borderRightWidth", 1], ["borderRightStyle", "solid"], ["borderRightColor", "var(--rice-border-color)"]]))], ["rice-dialog__button--hover", _pS(_uM([["backgroundColor", "#f2f3f5"]]))], ["rice-dialog__button--hover--dark", _pS(_uM([["backgroundColor", "#3a3a3c"]]))], ["@TRANSITION", _uM([["rice-dialog", _uM([["property", "opacity,transform"]])]])]])]
