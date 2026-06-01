import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
import _easycom_m_button from '@/uni_modules/m-unix/components/m-button/m-button.uvue'
import _easycom_m_tag from '@/uni_modules/m-unix/components/m-tag/m-tag.uvue'
import _easycom_m_div from '@/uni_modules/m-unix/components/m-div/m-div.uvue'
import _easycom_customService from '@/components/customService/customService.uvue'
import { ref, onMounted, onUnmounted } from 'vue'
	import { card_detail } from '@/api/http.uts'
	
	
const __sfc__ = defineComponent({
  __name: 'index',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const title = ref('Hello')
	const show = ref(false)
	const card_number = ref('1064916585160')

	const goRecharge = () => {
		console.log('去充值', " at pages/index/index.uvue:87")
		uni.navigateTo({
			url: '/pages/recharge/recharge'
		})
	}
	
	const scanCode = () => {
		uni.navigateTo({
			url: '/pages/scanCode/scanCode'
		})
	}
	
	const handleQuery = () => {
		if (!card_number.value) {
			uni.showToast({
				title: '请输入卡号',
				icon: 'none'
			})
			return
		}
		console.log('查询卡号:', card_number.value, " at pages/index/index.uvue:107")
		// 处理查询逻辑
	}
	
	// 接收扫码结果
	const onScanResult = (data: UTSJSONObject) => {
		const result = data.getString('result') ?? ''
		if (result.length > 0) {
			card_number.value = result
			uni.showToast({
				title: '扫码成功',
				icon: 'success'
			})
			// 自动查询
			// handleQuery()
		}
	}

	// 卡片类型切换
	const cardType = (type: number) => {
		console.log(type, " at pages/index/index.uvue:127")
		uni.reLaunch({
			url: '/pages/card/card?type=' + type
		})
	}
	
	const getLogin = async () => {
		const res = await card_detail(card_number.value, 'CHN')
	}

	onMounted(() => {
		// 监听扫码结果事件
		uni.$on('scanResult', onScanResult)
		getLogin()
	})
	
	onUnmounted(() => {
		// 移除事件监听
		uni.$off('scanResult', onScanResult)
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)
const _component_m_button = resolveEasyComponent("m-button",_easycom_m_button)
const _component_m_tag = resolveEasyComponent("m-tag",_easycom_m_tag)
const _component_m_div = resolveEasyComponent("m-div",_easycom_m_div)
const _component_customService = resolveEasyComponent("customService",_easycom_customService)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "首页",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-info" }), [
        _cE("text", _uM({ class: "persion-name" }), "Hi," + _tD(title.value), 1 /* TEXT */),
        _cE("view", _uM({ class: "persion-card" }), [
          _cE("view", _uM({
            class: "persion-card-item",
            onClick: () => {cardType(0)}
          }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "我的卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), "12")
          ], 8 /* PROPS */, ["onClick"]),
          _cE("view", _uM({
            class: "persion-card-item",
            onClick: () => {cardType(1)}
          }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "在用卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), "12")
          ], 8 /* PROPS */, ["onClick"]),
          _cE("view", _uM({
            class: "persion-card-item",
            onClick: () => {cardType(2)}
          }), [
            _cE("text", _uM({ class: "persion-card-item-title" }), "异常卡片"),
            _cE("text", _uM({ class: "persion-card-item-content" }), "12")
          ], 8 /* PROPS */, ["onClick"])
        ])
      ]),
      _cE("view", _uM({ class: "card-box mt-24 mb-24" }), [
        _cE("view", _uM({ class: "card-label" }), "卡号查询"),
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
            width: "90rpx",
            onClick: scanCode
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
            onClick: handleQuery
          }), _uM({
            default: withSlotCtx((): any[] => ["查询"]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _cE("view", _uM({ class: "card-box" }), [
        _cE("view", _uM({ class: "card-label mb-24" }), [
          _cE("text", null, "最近常用卡片"),
          _cE("text", _uM({
            class: "view-all",
            onClick: () => {cardType(0)}
          }), "查看全部", 8 /* PROPS */, ["onClick"])
        ]),
        _cE("view", _uM({ class: "card-list" }), [
          _cE("view", _uM({ class: "card-item" }), [
            _cE("view", _uM({ class: "item-head" }), [
              _cE("view", _uM({ class: "item-head-label" }), [
                _cE("text", _uM({ class: "card-item-title" }), "1064916585160"),
                _cE("text", _uM({ class: "card-item-content" }), "ICCID: 89860421123456789012")
              ]),
              _cV(_component_m_tag, _uM({
                text: "标签",
                round: true,
                plain: true,
                size: "small",
                type: "primary"
              }))
            ]),
            _cE("view", _uM({ class: "item-package" }), [
              _cE("text", _uM({ class: "package-label" }), "当前套餐:"),
              _cE("text", _uM({ class: "package-value" }), "车联网月包20G")
            ]),
            _cV(_component_m_div, _uM({
              backgroundColor: "#f1f5f9",
              textClass: "divider"
            })),
            _cE("view", _uM({ class: "card-metrics" }), [
              _cE("view", _uM({ class: "metric-box mr-24" }), [
                _cE("view", _uM({ class: "metric-label" }), "到期时间"),
                _cE("view", _uM({ class: "metric-value" }), "2026-04-30")
              ]),
              _cE("view", _uM({ class: "metric-box" }), [
                _cE("view", _uM({ class: "metric-label" }), "本月流量"),
                _cE("view", _uM({ class: "metric-value" }), "11.34GB / 20GB")
              ])
            ]),
            _cE("view", _uM({ class: "card-bottom" }), [
              _cE("view", _uM({ class: "card-cycle-text" }), [
                _cE("text", _uM({ class: "cycle-label" }), "当前周期："),
                _cE("text", _uM({ class: "cycle-value" }), "第1期 / 共12期")
              ]),
              _cV(_component_m_button, _uM({
                type: "primary",
                width: "200rpx",
                btnSize: "mini",
                size: "25rpx",
                shape: "circle",
                onClick: goRecharge
              }), _uM({
                default: withSlotCtx((): any[] => ["去充值"]),
                _: 1 /* STABLE */
              }))
            ])
          ])
        ])
      ]),
      _cV(_component_customService)
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesIndexIndexStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f4f7fb"], ["minHeight", "1000rpx"], ["paddingBottom", "40rpx"]]))], ["card-info", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundImage", "linear-gradient(135deg, #2f6de8 0%, #4d88f5 65%, #67a4ff 100%)"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#ffffff"], ["boxShadow", "0 8rpx 18rpx rgba(37, 99, 235, 0.14)"]]))], ["persion-name", _uM([[".card-info ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#ffffff"]])]])], ["persion-card", _uM([[".card-info ", _uM([["marginTop", "30rpx"], ["display", "flex"], ["flexDirection", "row"]])]])], ["persion-card-item", _uM([[".card-info .persion-card ", _uM([["minHeight", "120rpx"], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["borderBottomLeftRadius", "18rpx"], ["paddingTop", "20rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.12)"], ["boxShadow", "inset 0 1px 0 rgba(255, 255, 255, 0.18)"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["marginTop", 0], ["marginRight", "10rpx"], ["marginBottom", 0], ["marginLeft", "10rpx"]])]])], ["persion-card-item-title", _uM([[".card-info .persion-card ", _uM([["fontSize", "22rpx"], ["lineHeight", 1.4], ["color", "#ffffff"]])]])], ["persion-card-item-content", _uM([[".card-info .persion-card ", _uM([["marginTop", "20rpx"], ["fontSize", "40rpx"], ["fontWeight", 800], ["lineHeight", 1]])]])], ["card-box", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]]))], ["card-label", _uM([[".card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#333333"]])]])], ["view-all", _uM([[".card-box .card-label ", _uM([["color", "#2563eb"]])]])], ["search-value", _uM([[".card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#dbe5f0"], ["borderRightColor", "#dbe5f0"], ["borderBottomColor", "#dbe5f0"], ["borderLeftColor", "#dbe5f0"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"]])]])], ["search-input", _uM([[".card-box .search-value ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", 0], ["paddingRight", "25rpx"], ["paddingBottom", 0], ["paddingLeft", "25rpx"], ["height", "95rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#0f172a"], ["fontSize", "30rpx"]])]])], ["scan-btn", _uM([[".card-box .search-value ", _uM([["borderLeftWidth", 1], ["borderLeftStyle", "solid"], ["borderLeftColor", "#eef2f7"]])]])], ["card-item", _uM([[".card-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", 18], ["borderTopRightRadius", 18], ["borderBottomRightRadius", 18], ["borderBottomLeftRadius", 18], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginBottom", "20rpx"]])]])], ["item-head", _uM([[".card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-start"], ["justifyContent", "space-between"]])]])], ["card-item-title", _uM([[".card-box .card-item .item-head ", _uM([["fontSize", "32rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.25]])]])], ["card-item-content", _uM([[".card-box .card-item .item-head ", _uM([["marginTop", 5], ["fontSize", "24rpx"], ["color", "#94a3b8"], ["lineHeight", 1.45]])]])], ["item-package", _uM([[".card-box .card-item ", _uM([["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["minWidth", 0]])]])], ["package-label", _uM([[".card-box .card-item .item-package ", _uM([["fontSize", "24rpx"], ["color", "#64748b"], ["lineHeight", 1.4]])]])], ["package-value", _uM([[".card-box .card-item .item-package ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "28rpx"], ["fontWeight", 700], ["color", "#334155"], ["lineHeight", 1.45], ["whiteSpace", "nowrap"], ["overflow", "hidden"], ["textOverflow", "ellipsis"]])]])], ["card-metrics", _uM([[".card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["flexWrap", "wrap"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0]])]])], ["metric-box", _uM([[".card-box .card-item .card-metrics ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["boxSizing", "border-box"], ["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e8eef7"], ["borderRightColor", "#e8eef7"], ["borderBottomColor", "#e8eef7"], ["borderLeftColor", "#e8eef7"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"], ["minWidth", 0]])]])], ["metric-label", _uM([[".card-box .card-item .card-metrics .metric-box ", _uM([["fontSize", "24rpx"], ["color", "#94a3b8"], ["lineHeight", 1.4]])]])], ["metric-value", _uM([[".card-box .card-item .card-metrics .metric-box ", _uM([["marginTop", "15rpx"], ["fontSize", "26rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.4]])]])], ["card-bottom", _uM([[".card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["card-cycle-text", _uM([[".card-box .card-item .card-bottom ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["cycle-label", _uM([[".card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "24rpx"], ["color", "#64748b"], ["lineHeight", 1.45]])]])], ["cycle-value", _uM([[".card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "24rpx"], ["color", "#334155"], ["fontWeight", 800]])]])]])]
