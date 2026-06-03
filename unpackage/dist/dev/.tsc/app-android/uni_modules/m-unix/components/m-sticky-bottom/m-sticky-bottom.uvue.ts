
const __sfc__ = defineComponent({
	name: 'mStickyBottom',
	props: {
		// 层级
		zIndex: {
			type: [Number, String],
			default: 998
		},
		// 是否开启底部安全区域适配
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: '#ffffff'
		}
	}
});

export default __sfc__
function GenUniModulesMUnixComponentsMStickyBottomMStickyBottomRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: "m-sticky-bottom",
    style: _nS(_uM({ zIndex: _ctx.zIndex }))
  }), [
    _cE("view", _uM({
      class: _nC(["m-sticky-bottom__content", _uM({'m-sticky-bottom__content--safearea': _ctx.safeAreaInsetBottom})]),
      style: _nS(_uM({ backgroundColor: _ctx.bgColor }))
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 6 /* CLASS, STYLE */)
  ], 4 /* STYLE */)
}
export type MStickyBottomComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMStickyBottomMStickyBottomStyles = [_uM([["m-sticky-bottom", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["boxSizing", "border-box"], ["backgroundColor", "rgba(0,0,0,0)"]]))], ["m-sticky-bottom__content", _uM([[".m-sticky-bottom ", _uM([["boxSizing", "border-box"], ["paddingTop", "20rpx"], ["paddingRight", "30rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "30rpx"]])], [".m-sticky-bottom .m-sticky-bottom__content--safearea", _uM([["paddingBottom", "40rpx"]])]])]])]
