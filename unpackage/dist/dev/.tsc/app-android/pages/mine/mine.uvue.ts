import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'

const __sfc__ = defineComponent({
  __name: 'mine',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const title = ref('用户');

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)

  return _cE("view", _uM({ class: "container" }), [
    _cV(_component_topNavBar, _uM({
      title: "我的",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "card-info" }), [
      _cE("text", _uM({ class: "persion-name" }), "Hi," + _tD(unref(title)), 1 /* TEXT */),
      _cE("view", _uM({ class: "persion-card" }), [
        _cE("view", _uM({ class: "persion-card-item" }), [
          _cE("text", _uM({ class: "persion-card-item-title" }), "我的卡片"),
          _cE("text", _uM({ class: "persion-card-item-content" }), " 12")
        ]),
        _cE("view", _uM({ class: "persion-card-item" }), [
          _cE("text", _uM({ class: "persion-card-item-title" }), "在用卡片"),
          _cE("text", _uM({ class: "persion-card-item-content" }), " 12")
        ]),
        _cE("view", _uM({ class: "persion-card-item" }), [
          _cE("text", _uM({ class: "persion-card-item-title" }), "异常卡片"),
          _cE("text", _uM({ class: "persion-card-item-content" }), " 12")
        ])
      ])
    ]),
    _cE("view", _uM({ class: "card-box" }), [
      _cE("view", _uM({ class: "item" }), [
        _cE("text", _uM({ class: "order-label" }), "我的订单"),
        _cV(_component_m_icon, _uM({
          name: "arrow-right-bold",
          size: "20rpx"
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", _uM({ class: "order-label" }), "绑定卡片"),
        _cV(_component_m_icon, _uM({
          name: "arrow-right-bold",
          size: "20rpx"
        }))
      ]),
      _cE("view", _uM({ class: "item" }), [
        _cE("text", _uM({ class: "order-label" }), "常见问题"),
        _cV(_component_m_icon, _uM({
          name: "arrow-right-bold",
          size: "20rpx"
        }))
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMineMineStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["gap", "40rpx"], ["backgroundColor", "#f4f7fb"], ["marginTop", "180rpx"]]))], ["card-info", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundImage", "linear-gradient(135deg, #2f6de8 0%, #4d88f5 65%, #67a4ff 100%)"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#ffffff"], ["boxShadow", "0 8rpx 18rpx rgba(37, 99, 235, 0.14)"]])]])], ["persion-name", _uM([[".container .card-info ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#ffffff"]])]])], ["persion-card", _uM([[".container .card-info ", _uM([["marginTop", "30rpx"], ["gridTemplateColumns", "repeat(3, 1fr)"], ["gap", "10rpx"]])]])], ["persion-card-item", _uM([[".container .card-info .persion-card ", _uM([["minHeight", "120rpx"], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["borderBottomLeftRadius", "18rpx"], ["paddingTop", "20rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.12)"], ["boxShadow", "inset 0 1px 0 rgba(255, 255, 255, 0.18)"]])]])], ["persion-card-item-title", _uM([[".container .card-info .persion-card ", _uM([["fontSize", "22rpx"], ["lineHeight", 1.4], ["color", "#ffffff"]])]])], ["persion-card-item-content", _uM([[".container .card-info .persion-card ", _uM([["marginTop", "20rpx"], ["fontSize", "40rpx"], ["fontWeight", 800], ["lineHeight", 1]])]])], ["card-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"]])]])], ["item", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["gap", "10px"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "#e7edf5"], ["borderBottomWidth:last-child", "medium"], ["borderBottomStyle:last-child", "none"], ["borderBottomColor:last-child", "#000000"]])]])], ["order-label", _uM([[".container .card-box .item ", _uM([["fontWeight", "bold"]])]])]])]
