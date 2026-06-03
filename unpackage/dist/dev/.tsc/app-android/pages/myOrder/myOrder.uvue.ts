import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
import _easycom_m_button from '@/uni_modules/m-unix/components/m-button/m-button.uvue'
import _easycom_m_segmented_control from '@/uni_modules/m-unix/components/m-segmented-control/m-segmented-control.uvue'
import { ref, computed } from 'vue'
	
	// 订单状态类型
	type OrderStatus = '全部' | '待支付' | '已完成' | '已退款' | '已取消'
	type OrderItemStatus = '待支付' | '已完成' | '已退款' | '已取消'

	// 订单数据结构
	interface Order {
		packageName: string
		status: OrderItemStatus
		orderNo: string
		cardNo: string
		iccid: string
		time: string
		amount: number
	}
	
	// Tab 列表
	
const __sfc__ = defineComponent({
  __name: 'myOrder',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const tabs = ref<OrderStatus[]>(['全部', '待支付', '已完成', '已退款', '已取消'])
	const current = ref<number>(0)
	const card_number = ref<string>('')
	
	// 订单数据（根据图片内容）
	const orders = ref<any[]>([
		{
			packageName: '车联网月包20G',
			status: '已完成',
			orderNo: 'O202604280001',
			cardNo: '1064916585160',
			iccid: '89860421123456789012',
			time: '2026-04-28 10:12:30',
			amount: 90
		},
		{
			packageName: '车联网月包10G',
			status: '待支付',
			orderNo: 'O202604280002',
			cardNo: '1064916585160',
			iccid: '89860421123456789012',
			time: '2026-04-28 11:20:12',
			amount: 50
		},
		{
			packageName: '测试套餐1G',
			status: '已退款',
			orderNo: 'O202603010001',
			cardNo: '1064916585160',
			iccid: '89860421123456789012',
			time: '2026-03-01 08:10:00',
			amount: 10
		},
		{
			packageName: '500MB加油包',
			status: '已完成',
			orderNo: 'PO202605120001',
			cardNo: '14700002233',
			iccid: '8986032044208356010',
			time: '2026-05-12 11:02:00',
			amount: 19
		},
		{
			packageName: '1GB加油包',
			status: '已取消',
			orderNo: 'PO202605120002',
			cardNo: '14700002233',
			iccid: '8986032044208356010',
			time: '2026-05-12 12:18:00',
			amount: 29
		}
	])
	
	const getOrderText = (order: any, key: string): string => {
		const value = (order as UTSJSONObject)[key]
		return value == null ? '' : '' + value
	}

	// 根据搜索词和Tab状态过滤订单
	const filteredOrders = computed<any[]>(() : any[] => {
		let result = orders.value

		// 按Tab筛选
		const currentStatus = tabs.value[current.value]
		if (currentStatus !== '全部') {
			result = result.filter((order: any) : boolean => getOrderText(order, 'status') === currentStatus)
		}

		// 按搜索词筛选（ICCID或卡号）
		if (card_number.value.trim().length > 0) {
			const keyword = card_number.value.trim()
			result = result.filter((order: any) : boolean =>
				getOrderText(order, 'iccid').includes(keyword) || getOrderText(order, 'cardNo').includes(keyword)
			)
		}

		return result
	})
	
	// 处理Tab切换
	const handleTabClick = (e: UTSJSONObject) => {
		const index = e.index as number
		current.value = index
	}
	
	// 处理搜索
	const handleSearch = () => {
		// 搜索逻辑已通过computed实现，此处可添加额外逻辑如埋点等
		console.log('搜索关键词:', card_number.value, " at pages/myOrder/myOrder.uvue:183")
	}
	
	// 获取状态样式类
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

	// 处理返回
	const handleBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	
	// 去支付
	const handlePay = (order: any) => {
		const orderNo = getOrderText(order, 'orderNo')
		console.log('去支付:', orderNo, " at pages/myOrder/myOrder.uvue:212")








		// App支付逻辑
		uni.showToast({
			title: `支付订单 ${orderNo}`,
			icon: 'none'
		})








	}

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)
const _component_m_button = resolveEasyComponent("m-button",_easycom_m_button)
const _component_m_segmented_control = resolveEasyComponent("m-segmented-control",_easycom_m_segmented_control)

  return _cE("view", null, [
    _cV(_component_topNavBar, _uM({
      title: "我的订单",
      "show-back": true,
      onBack: handleBack,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-box" }), [
        _cE("view", _uM({ class: "search-value" }), [
          _cE("input", _uM({
            modelValue: card_number.value,
            onInput: ($event: UniInputEvent) => {(card_number).value = $event.detail.value},
            placeholder: "请输入 ICCID / MSISDN",
            class: "search-input"
          }), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"]),
          _cV(_component_m_button, _uM({
            type: "white",
            plain: true,
            class: "scan-btn",
            width: "90rpx"
          }), _uM({
            default: withSlotCtx((): any[] => [
              _cV(_component_m_icon, _uM({
                name: "scanning",
                size: "40rpx"
              }))
            ]),
            _: 1 /* STABLE */
          })),
          _cV(_component_m_button, _uM({
            type: "primary",
            width: "120rpx",
            onClick: handleSearch
          }), _uM({
            default: withSlotCtx((): any[] => ["查询"]),
            _: 1 /* STABLE */
          }))
        ]),
        _cV(_component_m_segmented_control, _uM({
          values: tabs.value,
          current: current.value,
          textActiveColor: '#2563eb',
          onClick: handleTabClick,
          customStyle: {height:'unset',padding:'5rpx 10rpx',border:'1rpx solid #e5edf6'}
        }), null, 8 /* PROPS */, ["values", "current"])
      ]),
      _cE("scroll-view", _uM({
        class: "order-list",
        "scroll-y": "",
        enhanced: true,
        "show-scrollbar": false
      }), [
        filteredOrders.value.length === 0
          ? _cE("view", _uM({
              key: 0,
              class: "empty-state"
            }), [
              _cE("text", _uM({ class: "empty-text" }), "暂无订单")
            ])
          : _cE("view", _uM({
              key: 1,
              class: "orders-container"
            }), [
              _cE(Fragment, null, RenderHelpers.renderList(filteredOrders.value, (order, index, __index, _cached): any => {
                return _cE("view", _uM({
                  key: index,
                  class: "order-card"
                }), [
                  _cE("view", _uM({ class: "order-header" }), [
                    _cE("text", _uM({ class: "package-name" }), _tD(getOrderText(order, 'packageName')), 1 /* TEXT */),
                    _cE("text", _uM({
                      class: _nC(["status-tag", getStatusClass(getOrderText(order, 'status'))])
                    }), _tD(getOrderText(order, 'status')), 3 /* TEXT, CLASS */)
                  ]),
                  _cE("view", _uM({ class: "order-details" }), [
                    _cE("view", _uM({ class: "detail-row" }), [
                      _cE("text", _uM({ class: "detail-label" }), "订单号"),
                      _cE("text", _uM({ class: "detail-value" }), _tD(getOrderText(order, 'orderNo')), 1 /* TEXT */)
                    ]),
                    _cE("view", _uM({ class: "detail-row" }), [
                      _cE("text", _uM({ class: "detail-label" }), "卡号"),
                      _cE("text", _uM({ class: "detail-value" }), _tD(getOrderText(order, 'cardNo')), 1 /* TEXT */)
                    ]),
                    _cE("view", _uM({ class: "detail-row" }), [
                      _cE("text", _uM({ class: "detail-label" }), "ICCID"),
                      _cE("text", _uM({ class: "detail-value" }), _tD(getOrderText(order, 'iccid')), 1 /* TEXT */)
                    ]),
                    _cE("view", _uM({ class: "detail-row" }), [
                      _cE("text", _uM({ class: "detail-value" }), _tD(getOrderText(order, 'time')), 1 /* TEXT */),
                      _cE("view", _uM({ class: "order-footer" }), [
                        _cE("text", _uM({ class: "price" }), "¥" + _tD(getOrderText(order, 'amount')), 1 /* TEXT */),
                        getOrderText(order, 'status') === '待支付'
                          ? _cE("text", _uM({
                              key: 0,
                              class: "pay-btn",
                              onClick: () => {handlePay(order)}
                            }), "去支付", 8 /* PROPS */, ["onClick"])
                          : _cC("v-if", true)
                      ])
                    ])
                  ])
                ])
              }), 128 /* KEYED_FRAGMENT */)
            ])
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesMyOrderMyOrderStyles = [_uM([["container", _pS(_uM([["backgroundColor", "#f4f7fb"], ["minHeight", "1000rpx"], ["display", "flex"], ["flexDirection", "column"]]))], ["card-box", _uM([[".container ", _uM([["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]])]])], ["search-value", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#dbe5f0"], ["borderRightColor", "#dbe5f0"], ["borderBottomColor", "#dbe5f0"], ["borderLeftColor", "#dbe5f0"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["marginBottom", "24rpx"]])]])], ["search-input", _uM([[".container .card-box .search-value ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", 0], ["paddingRight", "25rpx"], ["paddingBottom", 0], ["paddingLeft", "25rpx"], ["height", "95rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#0f172a"], ["fontSize", "30rpx"]])]])], ["scan-btn", _uM([[".container .card-box .search-value ", _uM([["borderLeftWidth", 1], ["borderLeftStyle", "solid"], ["borderLeftColor", "#eef2f7"]])]])], ["order-list", _uM([[".container ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "40rpx"], ["paddingLeft", "24rpx"], ["minHeight", "700rpx"]])]])], ["empty-state", _uM([[".container .order-list ", _uM([["display", "flex"], ["justifyContent", "center"], ["alignItems", "center"], ["paddingTop", "200rpx"]])]])], ["empty-text", _uM([[".container .order-list .empty-state ", _uM([["fontSize", "28rpx"], ["color", "#999999"]])]])], ["order-card", _uM([[".container .order-list .orders-container ", _uM([["backgroundColor", "#ffffff"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "28rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "28rpx"], ["marginBottom", "24rpx"], ["boxShadow", "0 2rpx 12rpx rgba(0, 0, 0, 0.04)"]])]])], ["order-header", _uM([[".container .order-list .orders-container .order-card ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingBottom", "20rpx"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f0f2f6"], ["marginBottom", "20rpx"]])]])], ["package-name", _uM([[".container .order-list .orders-container .order-card .order-header ", _uM([["fontSize", "32rpx"], ["fontWeight", 600], ["color", "#1f2937"]])]])], ["status-tag", _uM([[".container .order-list .orders-container .order-card .order-header ", _uM([["fontSize", "24rpx"], ["paddingTop", "6rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "6rpx"], ["paddingLeft", "16rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["backgroundColor", "#f3f4f6"], ["color", "#6b7280"]])]])], ["status-completed", _uM([[".container .order-list .orders-container .order-card .order-header .status-tag ", _uM([["backgroundColor", "#e8f5e9"], ["color", "#2e7d32"]])]])], ["status-pending", _uM([[".container .order-list .orders-container .order-card .order-header .status-tag ", _uM([["backgroundColor", "#fff3e0"], ["color", "#ed6c02"]])]])], ["status-refunded", _uM([[".container .order-list .orders-container .order-card .order-header .status-tag ", _uM([["backgroundColor", "#fce4ec"], ["color", "#c62828"]])]])], ["status-cancelled", _uM([[".container .order-list .orders-container .order-card .order-header .status-tag ", _uM([["backgroundColor", "#eeeeee"], ["color", "#757575"]])]])], ["order-details", _uM([[".container .order-list .orders-container .order-card ", _uM([["marginBottom", "20rpx"]])]])], ["detail-row", _uM([[".container .order-list .orders-container .order-card .order-details ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginBottom", "16rpx"]])]])], ["detail-label", _uM([[".container .order-list .orders-container .order-card .order-details .detail-row ", _uM([["width", "100rpx"], ["fontSize", "26rpx"], ["color", "#9ca3af"], ["flexShrink", 0]])]])], ["detail-value", _uM([[".container .order-list .orders-container .order-card .order-details .detail-row ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "26rpx"], ["color", "#374151"]])]])], ["order-footer", _uM([[".container .order-list .orders-container .order-card ", _uM([["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"], ["alignItems", "center"], ["paddingTop", "20rpx"]])]])], ["price", _uM([[".container .order-list .orders-container .order-card .order-footer ", _uM([["fontSize", "28rpx"], ["fontWeight", "bold"], ["color", "#ef4444"], ["marginRight", "20rpx"]])]])], ["pay-btn", _uM([[".container .order-list .orders-container .order-card .order-footer ", _uM([["backgroundImage", "none"], ["backgroundColor", "#eff6ff"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#bfdbfe"], ["borderRightColor", "#bfdbfe"], ["borderBottomColor", "#bfdbfe"], ["borderLeftColor", "#bfdbfe"], ["color", "#2563eb"], ["fontSize", "24rpx"], ["paddingTop", "10rpx"], ["paddingRight", "25rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "25rpx"], ["borderTopLeftRadius", "40rpx"], ["borderTopRightRadius", "40rpx"], ["borderBottomRightRadius", "40rpx"], ["borderBottomLeftRadius", "40rpx"], ["fontWeight", "bold"]])]])]])]
