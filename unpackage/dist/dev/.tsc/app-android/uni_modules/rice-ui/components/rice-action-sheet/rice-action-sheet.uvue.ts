import _easycom_rice_overlay from '@/uni_modules/rice-ui/components/rice-overlay/rice-overlay.uvue'
import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import { addUnit, hasStrValue } from "../../libs/utils"
	import { ActionSheetProps, ActionSheetAction } from "./index.uts"
	import { showActionSheet } from "./index.uts"
	import { useCssVar, useNamespace, useSafeArea, safeAreaInsets } from "../../libs/use"
	
const __sfc__ = defineComponent({
  __name: 'rice-action-sheet',

		name: 'rice-action-sheet',
		styleIsolation: 'app-and-page'
	,
  props: /*#__PURE__*/mergeModels({
    actions: { type: Array as PropType<ActionSheetAction[]>, required: false },
    title: { type: String, required: false },
    showCancel: { type: Boolean, required: false, default: true },
    cancelText: { type: String, required: false, default: '取消' },
    duration: { type: Number, required: false, default: 300 },
    zIndex: { type: Number, required: false, default: 999 },
    opacity: { type: Boolean, required: false },
    overlay: { type: Boolean, required: false, default: true },
    overlayBgColor: { type: String, required: false, default: 'rgba(0,0,0,.6)' },
    closeOnClickAction: { type: Boolean, required: false, default: true },
    closeOnClickOverlay: { type: Boolean, required: false, default: true },
    radius: { type: [Number, String], required: false, default: '12px' },
    safeAreaInsetBottom: { type: Boolean, required: false, default: true },
    useDialogPage: { type: Boolean, required: false, default: true },
    customStyle: { type: UTSJSONObject, required: false, default: () : UTSJSONObject => ({}) },
    select: { type: Function as PropType<(action : ActionSheetAction, index : number) => void>, required: false },
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
  emits: /*#__PURE__*/mergeModels(["select", "cancel", "open", "close", "opened", "closed", "clickOverlay"], ["update:show"]),
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	
	const ns = useNamespace('action-sheet')
	useSafeArea()
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}


	const props = __props

	const show = useModel<Boolean>(__ins.props, "show")

	const actionsList = computed<ActionSheetAction[]>(() => props.actions ?? [] as ActionSheetAction[])
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
	const actionSheetRef = shallowRef<UniElement | null>(null)


	const open = async () => {
		if (realShow.value) return
		realShow.value = true
		await nextTick()
		handleOpenTimer()
		openTimer = setTimeout(() => {
			actionSheetRef.value?.style.setProperty('transition-duration', props.duration + 'ms')
			actionSheetRef.value?.style.setProperty('opacity', '1')
			actionSheetRef.value?.style.setProperty('transform', 'translate(0px, 0px)')
			openedTimer = setTimeout(() => {
				emit('opened')
			}, props.duration)
		}, 30)
	}

	const handleSelect = (action : ActionSheetAction, index : number) => {
		if (action.disabled == true) return
		if (props.closeOnClickAction == true) {
			show.value = false
		}
		emit('select', action, index)
	}

	const cancel = () => {
		show.value = false
		emit('cancel')
	}



	const hasDialogPage = ref(true)
	//使用dialogPage的前提：useDialogPage为true且没有使用插槽
	const isUseDialogPage = computed(() => props.useDialogPage == true && hasDialogPage.value)
	const dialogPageIns = ref<UniPage | null>(null)
	const handleShowDialog = () => {
		// toRefs() 仅支持 Array 和 UTSJSONObject, 不支持自定义类型。App端此处不能使用toRefs
		// 也不能使用JSON.parse 进行转换（APP端数据会丢失）
		showActionSheet({
			actions: actionsList.value,
			title: props.title,
			showCancel: props.showCancel,
			cancelText: props.cancelText,
			duration: props.duration,
			zIndex: props.zIndex,
			opacity: props.opacity,
			overlay: props.overlay,
			overlayBgColor: props.overlayBgColor,
			closeOnClickAction: props.closeOnClickAction,
			closeOnClickOverlay: props.closeOnClickOverlay,
			radius: props.radius,
			safeAreaInsetBottom: props.safeAreaInsetBottom,
			customStyle: props.customStyle,
			select: (action : ActionSheetAction, index : number) => {
				emit('select', action, index)
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
			clickOverlay: () => {
				emit('clickOverlay')
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
				props.actions,
			],
		() => {
			if (show.value) {
				dialogPageIns.value?.vm?.$callMethod('updateParams', {
					title: props.title,
					actions: props.actions,
				} as ActionSheetProps)
			}
		}, {
		deep: true,
	})



	const close = () => {
		if (!realShow.value) return
		const opacity = props.opacity == true ? '0' : '1'
		actionSheetRef.value?.style.setProperty('opacity', opacity)
		actionSheetRef.value?.style.setProperty('transform', 'translate(0px, 100%)')
		handleCloseTimer()
		closeTimer = setTimeout(() => {
			realShow.value = false
			emit('closed')

			dialogPageIns.value = null

		}, props.duration)
	}

	const overlayClick = () => {
		if (props.closeOnClickOverlay == true) {
			show.value = false
		}
		emit('clickOverlay')
	}

	const showOverlay = computed(() => {

		return isUseDialogPage.value ? false : props.overlay




	})

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


	const menuDisabledColor = useCssVar('--rice-action-sheet-menu-disabled-text-color', actionSheetRef)
	const menuTextColor = useCssVar('--rice-text-color', actionSheetRef)


	const getIconColor = (menu : ActionSheetAction) => {
		if (hasStrValue(menu.color)) return menu.color!






		return menu.disabled == true ? menuDisabledColor.value : menuTextColor.value

	}

	const getMenuTextStyle = (menu : ActionSheetAction) => {
		const css = new Map<string, string>()
		if (hasStrValue(menu.color)) css.set('color', menu.color!)
		return css
	}

	const getMenuTextClass = (menu : ActionSheetAction) => {
		return [
			ns.e('menu__text'),

			ns.is(`__menu__text--disabled`, menu.disabled == true)

		]
	}

	const getMenuSubnameClass = (menu : ActionSheetAction) => {
		return [
			ns.e('menu__subname'),

			ns.is(`__menu__subname--disabled`, menu.disabled == true)

		]
	}

	const actionSheetStyle = computed(() => {
		const css = new Map<string, string | number>()
		css.set('z-index', props.zIndex)
		css.set('border-top-left-radius', addUnit(props.radius))
		css.set('border-top-right-radius', addUnit(props.radius))

		if (props.safeAreaInsetBottom) {
			css.set('padding-bottom', safeAreaInsets.value.bottom + 'px')
		}

		return css
	})

	const actionSheetClass = computed(() => {
		return [
			ns.b(""),
			ns.theme(),
			ns.is('opacity', props.opacity),



		]
	})

	const getMenuClass = (menu : ActionSheetAction, index : number) => {
		return [
			ns.e("menu"),
			ns.is("__menu--border", index < actionsList.value.length - 1),



		]
	}

	onUnmounted(() => {
		handleOpenTimer()
		handleCloseTimer()
	})

return (): any | null => {

const _component_rice_overlay = resolveEasyComponent("rice-overlay",_easycom_rice_overlay)
const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)

  return _cE(Fragment, null, [
    isTrue(unref(showOverlay))
      ? _cV(_component_rice_overlay, _uM({
          key: 0,
          show: show.value,
          "z-index": _ctx.zIndex-1,
          "close-on-click-overlay": false,
          duration: _ctx.duration,
          "bg-color": _ctx.overlayBgColor,
          onClick: overlayClick
        }), null, 8 /* PROPS */, ["show", "z-index", "duration", "bg-color"])
      : _cC("v-if", true),
    isTrue(unref(realShow))
      ? _cE("view", _uM({
          key: 1,
          class: _nC(unref(actionSheetClass)),
          style: _nS([unref(actionSheetStyle),_ctx.customStyle]),
          ref_key: "actionSheetRef",
          ref: actionSheetRef
        }), [
          isTrue(unref(hasStrValue)(props.title))
            ? _cE("view", _uM({
                key: 0,
                class: "rice-action-sheet__title"
              }), [
                _cE("text", _uM({ class: "rice-action-sheet__title__text" }), _tD(props.title), 1 /* TEXT */)
              ])
            : _cC("v-if", true),
          _cE("scroll-view", _uM({
            class: "rice-action-sheet__container",
            direction: "vertical"
          }), [
            _cE(Fragment, null, RenderHelpers.renderList(unref(actionsList), (item, index, __index, _cached): any => {
              return _cE("view", _uM({
                key: `${item.name}${index}`,
                class: _nC(getMenuClass(item,index)),
                "hover-stay-time": 100,
                "hover-class": item.disabled==true?'none':'rice-action-sheet--hover',
                onClick: () => {handleSelect(item,index)}
              }), [
                isTrue(unref(hasStrValue)(item.icon))
                  ? _cV(_component_rice_icon, _uM({
                      key: 0,
                      color: getIconColor(item),
                      name: item.icon,
                      size: item.iconSize,
                      "font-family": item.iconFontFamily,
                      "custom-style": {marginRight:'6px'}
                    }), null, 8 /* PROPS */, ["color", "name", "size", "font-family"])
                  : _cC("v-if", true),
                _cE("text", _uM({
                  class: _nC(getMenuTextClass(item)),
                  style: _nS(getMenuTextStyle(item))
                }), _tD(item.name), 7 /* TEXT, CLASS, STYLE */),
                isTrue(unref(hasStrValue)(item.subname))
                  ? _cE("text", _uM({
                      key: 1,
                      class: _nC(getMenuSubnameClass(item))
                    }), _tD(item.subname), 3 /* TEXT, CLASS */)
                  : _cC("v-if", true)
              ], 10 /* CLASS, PROPS */, ["hover-class", "onClick"])
            }), 128 /* KEYED_FRAGMENT */)
          ]),
          isTrue(_ctx.showCancel)
            ? _cE("view", _uM({
                key: 1,
                class: "rice-action-sheet__gap"
              }))
            : _cC("v-if", true),
          isTrue(_ctx.showCancel)
            ? _cE("view", _uM({
                key: 2,
                class: "rice-action-sheet__cancel",
                "hover-stay-time": 100,
                "hover-class": "rice-action-sheet--hover",
                onClick: cancel
              }), [
                _cE("text", _uM({ class: "rice-action-sheet__cancel__text" }), _tD(_ctx.cancelText), 1 /* TEXT */)
              ])
            : _cC("v-if", true)
        ], 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type RiceActionSheetComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheetStyles = [_uM([["rice-action-sheet", _pS(_uM([["position", "fixed"], ["left", 0], ["bottom", 0], ["width", "100%"], ["zIndex", 999], ["transitionProperty", "transform,opacity"], ["transform", "translate(0px, 100%)"], ["backgroundColor", "var(--rice-action-sheet-menu-background)"]]))], ["rice-action-sheet--opacity", _pS(_uM([["opacity", 0]]))], ["rice-action-sheet__title", _pS(_uM([["borderBottomWidth", 0.5], ["borderBottomStyle", "solid"], ["borderBottomColor", "var(--rice-border-color)"], ["width", "100%"], ["paddingTop", 16], ["paddingRight", 16], ["paddingBottom", 16], ["paddingLeft", 16], ["backgroundColor", "var(--rice-action-sheet-menu-background)"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["flexWrap", "wrap"]]))], ["rice-action-sheet__title__text", _pS(_uM([["textOverflow", "ellipsis"], ["overflow", "hidden"], ["whiteSpace", "nowrap"], ["width", "100%"], ["textAlign", "center"], ["fontSize", 15], ["color", "var(--rice-text-color-2)"]]))], ["rice-action-sheet__container", _pS(_uM([["maxHeight", 350]]))], ["rice-action-sheet__menu", _pS(_uM([["width", "100%"], ["paddingTop", 16], ["paddingRight", 16], ["paddingBottom", 16], ["paddingLeft", 16], ["backgroundColor", "var(--rice-action-sheet-menu-background)"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["flexWrap", "wrap"]]))], ["rice-action-sheet__menu__text", _pS(_uM([["textAlign", "center"], ["color", "var(--rice-text-color)"]]))], ["rice-action-sheet__menu__text--disabled", _pS(_uM([["color", "var(--rice-action-sheet-menu-disabled-text-color)"]]))], ["rice-action-sheet__menu__subname", _pS(_uM([["width", "100%"], ["color", "var(--rice-text-color-2)"], ["fontSize", 12], ["marginTop", 6], ["textAlign", "center"]]))], ["rice-action-sheet__menu__subname--disabled", _pS(_uM([["color", "var(--rice-action-sheet-menu-disabled-text-color)"]]))], ["rice-action-sheet__menu--border", _pS(_uM([["borderBottomWidth", 0.5], ["borderBottomStyle", "solid"], ["borderBottomColor", "var(--rice-border-color)"]]))], ["rice-action-sheet__gap", _pS(_uM([["backgroundColor", "var(--rice-action-sheet-background)"], ["height", 6]]))], ["rice-action-sheet__cancel", _pS(_uM([["width", "100%"], ["paddingTop", 16], ["paddingRight", 16], ["paddingBottom", 16], ["paddingLeft", 16], ["backgroundColor", "var(--rice-action-sheet-menu-background)"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["flexWrap", "wrap"]]))], ["rice-action-sheet__cancel__text", _pS(_uM([["color", "var(--rice-action-sheet-cancel-text-color)"]]))], ["rice-action-sheet--hover", _pS(_uM([["backgroundColor", "var(--rice-action-sheet-hover-background)"]]))], ["@TRANSITION", _uM([["rice-action-sheet", _uM([["property", "transform,opacity"]])]])]])]
