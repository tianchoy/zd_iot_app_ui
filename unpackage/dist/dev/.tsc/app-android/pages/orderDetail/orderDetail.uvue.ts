import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_bottom_popup from '@/uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.uvue'
import Payment from '@/components/payment.uvue';
	
const __sfc__ = defineComponent({
  __name: 'orderDetail',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const showPopup = ref(false);
	const currentPrice = ref(50);
	
	const getStatusClass = (status: string): string => {
		switch (status) {
			case '已完成':
				return 'status-completed'
			case '待支付':
				return 'status-pending'
			case '已退款':
				return 'status-refunded'
			case '已取消':
				return 'status-cancelled'
			default:
				return ''
		}
	}
	
	// 选择支付方式
	const choosePayment = () => {
		showPopup.value = true;
	}

	// 取消支付
	const handleCancelPayment = () => {
		showPopup.value = false;
	}

	// 确认支付
	const handleConfirmPayment = (e) => {
		console.log(e, " at pages/orderDetail/orderDetail.uvue:142");
		// 处理确认逻辑
		showPopup.value = false;
	}

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_bottom_popup = resolveEasyComponent("m-bottom-popup",_easycom_m_bottom_popup)

  return _cE(Fragment, null, [
    _cE("view", null, [
      _cV(_component_topNavBar, _uM({
        title: "订单详情",
        "show-back": true,
        backgroundColor: "#f4f7fb",
        textColor: "#333",
        showCapsule: false
      })),
      _cE("scroll-view", _uM({
        class: "container",
        "scroll-y": "",
        enhanced: true
      }), [
        _cE("view", _uM({ class: "package-card" }), [
          _cE("view", _uM({ class: "package-header" }), [
            _cE("text", _uM({ class: "package-name" }), "车联网月包10G"),
            _cE("text", _uM({
              class: _nC(["status-tag status-pending", getStatusClass('待支付')])
            }), "待支付", 2 /* CLASS */)
          ]),
          _cE("view", _uM({ class: "card-number-row" }), [
            _cE("text", _uM({ class: "card-number-label" }), "当前卡号："),
            _cE("text", _uM({ class: "card-number" }), "1064916585160")
          ])
        ]),
        _cE("view", _uM({ class: "info-card" }), [
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "订单编号"),
            _cE("text", _uM({ class: "info-value" }), "0202604280002")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "ICCID"),
            _cE("text", _uM({ class: "info-value" }), "89860421123456789012")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "支付金额"),
            _cE("text", _uM({ class: "info-value price" }), "¥50")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "订单状态"),
            _cE("text", _uM({ class: "info-value status" }), "待支付")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "支付方式"),
            _cE("text", _uM({ class: "info-value" }), "微信小程序支付")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "下单时间"),
            _cE("text", _uM({ class: "info-value" }), "2026-04-28 11:20:12")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "支付时间"),
            _cE("text", _uM({ class: "info-value" }), "--")
          ])
        ]),
        _cE("view", _uM({ class: "info-card" }), [
          _cE("view", _uM({ class: "section-header" }), [
            _cE("text", _uM({ class: "section-title" }), "套餐信息")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "套餐类型"),
            _cE("text", _uM({ class: "info-value" }), "套餐包")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "套餐流量"),
            _cE("text", _uM({ class: "info-value" }), "10GB")
          ]),
          _cE("view", _uM({ class: "info-row" }), [
            _cE("text", _uM({ class: "info-label" }), "有效期"),
            _cE("text", _uM({ class: "info-value" }), "30天")
          ])
        ]),
        _cE("view", _uM({ class: "notice-card" }), [
          _cE("view", _uM({ class: "section-header" }), [
            _cE("text", _uM({ class: "section-title" }), "说明")
          ]),
          _cE("text", _uM({ class: "notice-text" }), "订单尚未支付，支付完成后套餐才会生效。")
        ]),
        _cE("view", _uM({ class: "bottom-placeholder" }))
      ]),
      _cE("view", _uM({ class: "bottom-bar" }), [
        _cE("view", _uM({ class: "amount-section" }), [
          _cE("text", _uM({ class: "amount-label" }), "待支付金额"),
          _cE("text", _uM({ class: "amount-value" }), "¥50")
        ]),
        _cE("view", _uM({
          class: "pay-button",
          onClick: choosePayment
        }), [
          _cE("text", _uM({ class: "pay-button-text" }), "去支付")
        ])
      ])
    ]),
    _cV(_component_m_bottom_popup, _uM({
      show: unref(showPopup),
      height: '75%',
      radius: true,
      onClose: () => {showPopup.value = false}
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cV(unref(Payment), _uM({
          amount: unref(currentPrice),
          onCancel: handleCancelPayment,
          onConfirm: handleConfirmPayment
        }), null, 8 /* PROPS */, ["amount"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["show", "onClose"])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesOrderDetailOrderDetailStyles = [_uM([["container", _pS(_uM([["backgroundColor", "#f4f7fb"], ["minHeight", "1000rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["boxSizing", "border-box"]]))], ["package-card", _pS(_uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "32rpx"], ["paddingLeft", "32rpx"], ["marginBottom", "24rpx"]]))], ["package-header", _uM([[".package-card ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["marginBottom", "16rpx"]])]])], ["package-name", _uM([[".package-card .package-header ", _uM([["fontSize", "36rpx"], ["fontWeight", 600], ["color", "#1f2937"]])]])], ["status-tag", _uM([[".package-card .package-header ", _uM([["fontSize", "24rpx"], ["paddingTop", "6rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "6rpx"], ["paddingLeft", "16rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["backgroundColor", "#fff3e0"], ["color", "#ed6c02"], ["fontWeight", 500]])], [".package-card .package-header .status-pending", _uM([["backgroundColor", "#fff3e0"], ["color", "#ed6c02"]])]])], ["card-number-row", _uM([[".package-card ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["card-number-label", _uM([[".package-card .card-number-row ", _uM([["fontSize", "28rpx"], ["color", "#9ca3af"]])]])], ["card-number", _uM([[".package-card .card-number-row ", _uM([["fontSize", "28rpx"], ["color", "#374151"], ["fontWeight", 500]])]])], ["info-card", _pS(_uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "32rpx"], ["paddingLeft", "32rpx"], ["marginBottom", "24rpx"]]))], ["section-header", _uM([[".info-card ", _uM([["marginBottom", "24rpx"], ["paddingBottom", "20rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f0f2f6"]])], [".notice-card ", _uM([["marginBottom", "16rpx"]])]])], ["section-title", _uM([[".info-card .section-header ", _uM([["fontSize", "32rpx"], ["fontWeight", 600], ["color", "#1f2937"]])], [".notice-card .section-header ", _uM([["fontSize", "32rpx"], ["fontWeight", 600], ["color", "#1f2937"]])]])], ["info-row", _uM([[".info-card ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0]])]])], ["info-label", _uM([[".info-card .info-row ", _uM([["fontSize", "24rpx"], ["color", "#64748b"]])]])], ["info-value", _uM([[".info-card .info-row ", _uM([["fontSize", "28rpx"], ["color", "#374151"], ["textAlign", "right"], ["fontWeight", "bold"]])]])], ["price", _uM([[".info-card .info-row ", _uM([["fontSize", "36rpx"], ["fontWeight", "bold"], ["color", "#ef4444"]])]])], ["notice-card", _pS(_uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "32rpx"], ["paddingLeft", "32rpx"], ["marginBottom", "24rpx"]]))], ["notice-text", _uM([[".notice-card ", _uM([["fontSize", "28rpx"], ["color", "#6b7280"], ["lineHeight", 1.5]])]])], ["bottom-placeholder", _pS(_uM([["height", "140rpx"]]))], ["bottom-bar", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["backgroundColor", "#ffffff"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "24rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "32rpx"], ["boxShadow", "0 -4rpx 20rpx rgba(0, 0, 0, 0.05)"]]))], ["amount-section", _uM([[".bottom-bar ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-start"]])]])], ["amount-label", _uM([[".bottom-bar .amount-section ", _uM([["fontSize", "24rpx"], ["color", "#64748b"], ["marginRight", "16rpx"]])]])], ["amount-value", _uM([[".bottom-bar .amount-section ", _uM([["fontSize", "48rpx"], ["fontWeight", "bold"], ["color", "#ef4444"]])]])], ["pay-button", _uM([[".bottom-bar ", _uM([["backgroundColor", "#2563eb"], ["paddingTop", "20rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "40rpx"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"]])]])], ["pay-button-text", _uM([[".bottom-bar .pay-button ", _uM([["color", "#ffffff"], ["fontSize", "30rpx"], ["fontWeight", 500]])]])]])]
