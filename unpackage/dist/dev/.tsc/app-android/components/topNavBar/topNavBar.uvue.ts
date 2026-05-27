import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'

const __sfc__ = defineComponent({
  __name: 'topNavBar',
  props: {
		title: String,
		showBack: { type: Boolean, default: true },
		backText: { type: String, default: '' },
		showCapsule: { type: Boolean, default: true },
		backgroundColor: { type: String, default: '#f4f7fb' },
		textColor: { type: String, default: '#000000' },
		isIcon: { type: Boolean, default: true },
		Icon: { type: String, default: 'plus-circle' },
		rightText: { type: String, default: '' },
		isShowStyle: { type: Boolean, default: true },
		iconColor: { type: String, default: '#606266' }
	},
  emits: ['back', 'capsuleClick'],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const props = __props;

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	const statusBarHeight = ref(45);
	const navBarHeight = ref(44);
	const menuButtonInfo = ref({
		top: 4,
		right: 10,
		width: 87,
		height: 32
	});

return (): any | null => {

const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)
const _component_uv_icon = resolveComponent("uv-icon")

  return _cE(Fragment, null, [
    _cE("view", _uM({
      style: _nS(_ctx.isShowStyle?_uM({ height: unref(statusBarHeight) + 'px','background-color':_ctx.backgroundColor,position:'fixed',width:'100%',letf:0,top:0,'z-index':'100'})
		:
		_uM({ height: unref(statusBarHeight) + 'px','background-color':_ctx.backgroundColor,}) )
    }), null, 4 /* STYLE */),
    _cE("view", _uM({
      class: "navbar",
      style: _nS(_ctx.isShowStyle?_uM({
    height: unref(navBarHeight) +'px',
    background: _ctx.backgroundColor,
	position:'fixed',width:'100%',letf:'0',top:unref(statusBarHeight) + 'px','z-index':'100'
  })
  :
  _uM({
    height: unref(navBarHeight) +'px',
    background: _ctx.backgroundColor
  }))
    }), [
      _cE("view", _uM({ class: "back-btn" }), [
        isTrue(_ctx.showBack)
          ? _cV(_component_m_icon, _uM({
              key: 0,
              name: "arrow-left-bold",
              size: "40rpx",
              class: "icon",
              onClick: () => {emit('back')}
            }), null, 8 /* PROPS */, ["onClick"])
          : _cC("v-if", true)
      ]),
      _cE("view", _uM({
        class: "title",
        style: _nS(_uM({ color: _ctx.textColor,'line-height':unref(navBarHeight) + 'px'}))
      }), [
        renderSlot(_ctx.$slots, "title", {}, (): any[] => [_tD(_ctx.title)])
      ], 4 /* STYLE */),
      _cE("view", _uM({
        class: "capsule",
        style: _nS(_uM({
      right: 200+'rpx',
    }))
      }), [
        _cE("view", _uM({ class: "capsule-item" }), [
          isTrue(_ctx.showCapsule)
            ? _cE("view", _uM({
                key: 0,
                onClick: () => {emit('capsuleClick', 'menu')}
              }), [
                isTrue(_ctx.isIcon)
                  ? _cV(_component_uv_icon, _uM({
                      key: 0,
                      name: _ctx.Icon,
                      size: "26",
                      color: _ctx.iconColor
                    }), null, 8 /* PROPS */, ["name", "color"])
                  : _cE("text", _uM({ key: 1 }), _tD(_ctx.rightText), 1 /* TEXT */)
              ], 8 /* PROPS */, ["onClick"])
            : _cC("v-if", true)
        ])
      ], 4 /* STYLE */)
    ], 4 /* STYLE */)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type TopNavBarComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenComponentsTopNavBarTopNavBarStyles = [_uM([["navbar", _pS(_uM([["position", "relative"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"]]))], ["back-btn", _pS(_uM([["display", "flex"], ["alignItems", "center"], ["width", "70rpx"], ["height", "40rpx"], ["zIndex", 10], ["justifyContent", "center"]]))], ["title", _pS(_uM([["textAlign", "center"], ["fontWeight", "bold"], ["fontSize", "36rpx"]]))], ["capsule", _pS(_uM([["textAlign", "center"]]))], ["capsule-item", _pS(_uM([["width", 40], ["height", "100%"], ["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["icon", _pS(_uM([["width", "40rpx"], ["height", "40rpx"]]))], ["menu-icon", _pS(_uM([["width", "60rpx"], ["height", "60rpx"]]))]])]
