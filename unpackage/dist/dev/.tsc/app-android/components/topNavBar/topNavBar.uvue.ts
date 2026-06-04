import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
import { onMounted, computed } from 'vue'


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
	Icon: { type: String, default: 'add-circle' },
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

const statusBarHeight = ref(20);
const navBarHeight = ref(44);

// 计算总高度
const totalNavHeight = computed(() => statusBarHeight.value + navBarHeight.value);

// 状态栏样式
const statusBarStyle = computed(() => ({
	height: statusBarHeight.value + 'px',
	backgroundColor: props.backgroundColor,
	position: 'fixed',
	width: '100%',
	left: 0,
	top: 0,
	zIndex: 100
}));

// 导航栏样式
const navBarStyle = computed(() => ({
	height: navBarHeight.value + 'px',
	backgroundColor: props.backgroundColor,
	position: 'fixed',
	width: '100%',
	left: 0,
	top: statusBarHeight.value + 'px',
	zIndex: 100
}));

// 获取导航栏信息
const getNavBarInfo = () => {














	




};

// 处理返回事件
const handleBack = () => {
	if (props.showBack) {
		emit('back');
	}
};

onMounted(() => {
	getNavBarInfo();
});

return (): any | null => {

const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)

  return _cE(Fragment, null, [
    isTrue(_ctx.isShowStyle)
      ? _cE("view", _uM({
          key: 0,
          style: _nS(statusBarStyle.value)
        }), null, 4 /* STYLE */)
      : _cC("v-if", true),
    isTrue(_ctx.isShowStyle)
      ? _cE("view", _uM({
          key: 1,
          class: "navbar",
          style: _nS(navBarStyle.value)
        }), [
          _cE("view", _uM({
            class: "back-btn",
            style: _nS(_uM({ visibility: _ctx.showBack ? 'visible' : 'hidden' }))
          }), [
            isTrue(_ctx.showBack)
              ? _cV(_component_m_icon, _uM({
                  key: 0,
                  name: "arrow-left-bold",
                  size: "35rpx",
                  class: "icon",
                  onClick: handleBack
                }))
              : _cC("v-if", true)
          ], 4 /* STYLE */),
          _cE("view", _uM({
            class: "title",
            style: _nS(_uM({ color: _ctx.textColor, 'line-height': unref(navBarHeight) + 'px' }))
          }), [
            renderSlot(_ctx.$slots, "title", {}, (): any[] => [_tD(_ctx.title)])
          ], 4 /* STYLE */),
          _cE("view", _uM({ class: "capsule" }), [
            _cE("view", _uM({ class: "capsule-item" }), [
              isTrue(_ctx.showCapsule)
                ? _cE("view", _uM({
                    key: 0,
                    onClick: () => {emit('capsuleClick', 'menu')}
                  }), [
                    isTrue(_ctx.isIcon)
                      ? _cV(_component_m_icon, _uM({
                          key: 0,
                          name: _ctx.Icon,
                          size: "26",
                          color: _ctx.iconColor
                        }), null, 8 /* PROPS */, ["name", "color"])
                      : _cE("text", _uM({ key: 1 }), _tD(_ctx.rightText), 1 /* TEXT */)
                  ], 8 /* PROPS */, ["onClick"])
                : _cC("v-if", true)
            ])
          ])
        ], 4 /* STYLE */)
      : _cE(Fragment, _uM({ key: 2 }), [
          _cE("view", _uM({
            style: _nS(_uM({ height: unref(statusBarHeight) + 'px', backgroundColor: _ctx.backgroundColor }))
          }), null, 4 /* STYLE */),
          _cE("view", _uM({
            class: "navbar",
            style: _nS(_uM({ height: unref(navBarHeight) + 'px', backgroundColor: _ctx.backgroundColor }))
          }), [
            _cE("view", _uM({
              class: "back-btn",
              style: _nS(_uM({ visibility: _ctx.showBack ? 'visible' : 'hidden' }))
            }), [
              isTrue(_ctx.showBack)
                ? _cV(_component_m_icon, _uM({
                    key: 0,
                    name: "arrow-left-bold",
                    size: "40rpx",
                    class: "icon",
                    onClick: handleBack
                  }))
                : _cC("v-if", true)
            ], 4 /* STYLE */),
            _cE("view", _uM({
              class: "title",
              style: _nS(_uM({ color: _ctx.textColor, 'line-height': unref(navBarHeight) + 'px' }))
            }), [
              renderSlot(_ctx.$slots, "title", {}, (): any[] => [_tD(_ctx.title)])
            ], 4 /* STYLE */),
            _cE("view", _uM({ class: "capsule" }), [
              _cE("view", _uM({ class: "capsule-item" }), [
                isTrue(_ctx.showCapsule)
                  ? _cE("view", _uM({
                      key: 0,
                      onClick: () => {emit('capsuleClick', 'menu')}
                    }), [
                      isTrue(_ctx.isIcon)
                        ? _cV(_component_m_icon, _uM({
                            key: 0,
                            name: _ctx.Icon,
                            size: "26",
                            color: _ctx.iconColor
                          }), null, 8 /* PROPS */, ["name", "color"])
                        : _cE("text", _uM({ key: 1 }), _tD(_ctx.rightText), 1 /* TEXT */)
                    ], 8 /* PROPS */, ["onClick"])
                  : _cC("v-if", true)
              ])
            ])
          ], 4 /* STYLE */)
        ], 64 /* STABLE_FRAGMENT */),
    isTrue(_ctx.isShowStyle)
      ? _cE("view", _uM({
          key: 3,
          style: _nS(_uM({ height: totalNavHeight.value + 'px' }))
        }), null, 4 /* STYLE */)
      : _cC("v-if", true)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type TopNavBarComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenComponentsTopNavBarTopNavBarStyles = [_uM([["navbar", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "center"], ["alignItems", "center"], ["boxSizing", "border-box"], ["position", "relative"]]))], ["back-btn", _pS(_uM([["display", "flex"], ["alignItems", "center"], ["width", "70rpx"], ["height", "40rpx"], ["zIndex", 2], ["justifyContent", "center"], ["flexShrink", 0]]))], ["title", _pS(_uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["textAlign", "center"], ["fontWeight", "bold"], ["fontSize", "30rpx"], ["overflow", "hidden"], ["textOverflow", "ellipsis"], ["whiteSpace", "nowrap"], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "absolute"], ["left", 0], ["right", 0], ["width", "100%"], ["zIndex", 1]]))], ["capsule", _pS(_uM([["display", "flex"], ["alignItems", "center"], ["justifyContent", "flex-end"], ["flexShrink", 0], ["width", "70rpx"], ["zIndex", 2]]))], ["capsule-item", _pS(_uM([["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"]]))], ["icon", _pS(_uM([["width", "40rpx"], ["height", "40rpx"]]))]])]
