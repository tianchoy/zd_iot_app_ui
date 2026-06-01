import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'

const __sfc__ = defineComponent({
  __name: 'paySuccess',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	// 查看订单点击处理
	const handleViewOrder = () => {
		// 平台兼容处理

		console.log('查看订单', " at pages/paySuccess/paySuccess.uvue:70");







	}
	
	// 返回卡片详情点击处理
	const handleBackCard = () => {
		// 平台兼容处理

		console.log('返回卡片详情', " at pages/paySuccess/paySuccess.uvue:84");







	}

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "支付结果",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "status-section" }), [
        _cE("view", _uM({ class: "success-icon" }), [
          _cE("text", _uM({ class: "checkmark" }), "✓")
        ]),
        _cE("text", _uM({ class: "status-text" }), "支付成功")
      ]),
      _cE("view", _uM({ class: "card-container" }), [
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "卡号"),
          _cE("text", _uM({ class: "value" }), "1064916585160")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "ICCID"),
          _cE("text", _uM({ class: "value" }), "89860421123456789012")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "订单编号"),
          _cE("text", _uM({ class: "value" }), "0202604280001")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "套餐名称"),
          _cE("text", _uM({ class: "value" }), "车联网月包20G")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "套餐类型"),
          _cE("text", _uM({ class: "value" }), "套餐包")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "支付方式"),
          _cE("text", _uM({ class: "value" }), "微信小程序支付")
        ]),
        _cE("view", _uM({ class: "info-row" }), [
          _cE("text", _uM({ class: "label" }), "支付金额"),
          _cE("text", _uM({ class: "value amount" }), "￥90")
        ])
      ]),
      _cE("view", _uM({ class: "button-section" }), [
        _cE("button", _uM({
          class: "action-btn primary-btn",
          onClick: handleViewOrder
        }), "查看订单"),
        _cE("button", _uM({
          class: "action-btn secondary-btn",
          onClick: handleBackCard
        }), "返回卡片详情")
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesPaySuccessPaySuccessStyles = [_uM([["container", _pS(_uM([["backgroundColor", "#f5f5f5"], ["paddingTop", "40rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "32rpx"], ["display", "flex"], ["flexDirection", "column"], ["boxSizing", "border-box"]]))], ["status-section", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["marginBottom", "40rpx"]]))], ["success-icon", _uM([[".status-section ", _uM([["width", "120rpx"], ["height", "120rpx"], ["backgroundColor", "#07c160"], ["borderTopLeftRadius", "50%"], ["borderTopRightRadius", "50%"], ["borderBottomRightRadius", "50%"], ["borderBottomLeftRadius", "50%"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["marginBottom", "20rpx"]])]])], ["checkmark", _uM([[".status-section .success-icon ", _uM([["color", "#ffffff"], ["fontSize", "80rpx"], ["fontWeight", 600], ["lineHeight", 1]])]])], ["status-text", _uM([[".status-section ", _uM([["fontSize", "40rpx"], ["fontWeight", 500], ["color", "#333333"]])]])], ["card-container", _pS(_uM([["backgroundColor", "#ffffff"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "32rpx"], ["paddingLeft", "32rpx"], ["marginBottom", "60rpx"], ["boxShadow", "0 4rpx 20rpx rgba(0, 0, 0, 0.05)"]]))], ["info-row", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "24rpx"], ["paddingRight", 0], ["paddingBottom", "24rpx"], ["paddingLeft", 0], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f0f0f0"]]))], ["label", _uM([[".info-row ", _uM([["fontSize", "24rpx"], ["color", "#64748b"], ["flexShrink", 0], ["width", "160rpx"]])]])], ["value", _uM([[".info-row ", _uM([["fontSize", "25rpx"], ["color", "#0f172a"], ["fontWeight", "bold"], ["textAlign", "right"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])], ["amount", _uM([[".info-row ", _uM([["fontWeight", "bold"], ["color", "#ff6b00"]])]])], ["button-section", _pS(_uM([["display", "flex"], ["flexDirection", "column"]]))], ["action-btn", _uM([[".button-section ", _uM([["width", "100%"], ["height", "88rpx"], ["lineHeight", "88rpx"], ["borderTopLeftRadius", "44rpx"], ["borderTopRightRadius", "44rpx"], ["borderBottomRightRadius", "44rpx"], ["borderBottomLeftRadius", "44rpx"], ["fontSize", "30rpx"], ["fontWeight", 500], ["textAlign", "center"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["borderTopWidth::after", "medium"], ["borderRightWidth::after", "medium"], ["borderBottomWidth::after", "medium"], ["borderLeftWidth::after", "medium"], ["borderTopStyle::after", "none"], ["borderRightStyle::after", "none"], ["borderBottomStyle::after", "none"], ["borderLeftStyle::after", "none"], ["borderTopColor::after", "#000000"], ["borderRightColor::after", "#000000"], ["borderBottomColor::after", "#000000"], ["borderLeftColor::after", "#000000"]])]])], ["primary-btn", _uM([[".button-section ", _uM([["backgroundColor", "#07c160"], ["color", "#ffffff"]])]])], ["secondary-btn", _uM([[".button-section ", _uM([["backgroundColor", "#ffffff"], ["color", "#07c160"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#07c160"], ["borderRightColor", "#07c160"], ["borderBottomColor", "#07c160"], ["borderLeftColor", "#07c160"]])]])]])]
