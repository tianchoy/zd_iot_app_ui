
	import { toCssLength, parseCssNumber } from '@/uni_modules/m-unix/components/m-tools/Ut.uts'

	const __sfc__ = defineComponent({
		name: 'mBottomPopup',
		emits: ['close'],
		props: {
			//是否需要mask
			mask: {
				type: Boolean,
				default: true
			},
			//控制显示
			show: {
				type: Boolean,
				default: false
			},
			//背景颜色
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			// 高度（数字默认 rpx，也可传带单位的字符串）
			height: {
				type: [Number, String],
				default: 0
			},
			//设置圆角
			radius: {
				type: Boolean,
				default: true
			},
			zIndex: {
				type: [Number, String],
				default: 999
			},
			maskZIndex: {
				type: [Number, String],
				default: 998
			},
			//弹层显示时，垂直方向移动的距离
			translateY: {
				type: String,
				default: '0'
			},
			//是否需要判断底部安全区域（主要针对iphonex以上机型）
			isSafeArea: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			popupHeightCss(): string {
				const h = this.height as number | string
				if (h === 0 || h === '0') {
					return 'auto'
				}
				if (typeof h === 'string' && h.trim() === '') {
					return 'auto'
				}
				if (parseCssNumber(h) === 0) {
					return 'auto'
				}
				return toCssLength(h)
			}
		},
		methods: {
			preventScroll() {
				// 阻止遮罩下方页面滚动穿透
			},
			handleClose() {
				if (!this.show) {
					return;
				}
				this.$emit('close', {});
			}
		}
	});

export default __sfc__
function GenUniModulesMUnixComponentsMBottomPopupMBottomPopupRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    onTouchmove: withModifiers(_ctx.preventScroll, ["stop","prevent"])
  }), [
    _cE("view", _uM({
      class: _nC(["m-popup-class m-bottom-popup", _uM({ 'm-popup-show': _ctx.show, 'm-popup-radius': _ctx.radius,'m-bp__safearea':_ctx.isSafeArea })]),
      style: _nS(_uM({ background: _ctx.backgroundColor, height: _ctx.popupHeightCss, zIndex: _ctx.zIndex,transform:`translate3d(0, ${_ctx.show?_ctx.translateY:'100%'}, 0)`}))
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 6 /* CLASS, STYLE */),
    isTrue(_ctx.mask)
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["m-popup-mask", [_ctx.show ? 'm-mask-show' : '']]),
          style: _nS(_uM({ zIndex: _ctx.maskZIndex })),
          onClick: _ctx.handleClose
        }), null, 14 /* CLASS, STYLE, PROPS */, ["onClick"])
      : _cC("v-if", true)
  ], 40 /* PROPS, NEED_HYDRATION */, ["onTouchmove"])
}
export type MBottomPopupComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMBottomPopupMBottomPopupStyles = [_uM([["m-popup-class", _pS(_uM([["boxSizing", "border-box"]]))], ["m-bottom-popup", _pS(_uM([["width", "100%"], ["position", "fixed"], ["left", 0], ["right", 0], ["bottom", 0], ["opacity", 0], ["transform", "translate3d(0, 100%, 0)"], ["transformOrigin", "center"], ["transitionProperty", "all"], ["transitionDuration", "0.3s"], ["transitionTimingFunction", "ease-in-out"], ["minHeight", "20rpx"]]))], ["m-bp__safearea", _pS(_uM([["paddingBottom", 0]]))], ["m-popup-radius", _pS(_uM([["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["overflow", "hidden"]]))], ["m-popup-show", _pS(_uM([["opacity", 1]]))], ["m-popup-mask", _pS(_uM([["position", "fixed"], ["top", 0], ["left", 0], ["right", 0], ["bottom", 0], ["backgroundColor", "rgba(0,0,0,0.6)"], ["transitionProperty", "all"], ["transitionDuration", "0.3s"], ["transitionTimingFunction", "ease-in-out"], ["opacity", 0], ["visibility", "hidden"]]))], ["m-mask-show", _pS(_uM([["opacity", 1], ["visibility", "visible"]]))], ["@TRANSITION", _uM([["m-bottom-popup", _uM([["property", "all"], ["duration", "0.3s"], ["timingFunction", "ease-in-out"]])], ["m-popup-mask", _uM([["property", "all"], ["duration", "0.3s"], ["timingFunction", "ease-in-out"]])]])]])]
