import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
import _easycom_m_bottom_popup from '@/uni_modules/m-unix/components/m-bottom-popup/m-bottom-popup.uvue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
	import SearchSelect from '@/components/selectCountry.uvue'
	
	
const __sfc__ = defineComponent({
  __name: 'h5Search',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const cardNumber = ref<string>('1064916585160')
	
	// 国家/地区相关
	const showCountryPopup = ref<boolean>(false)
	const selectedCountry = ref<string>('')
	const searchSelectRef = ref(null)
	
	// 国家/地区选项列表
	const countryOptions = ref([
		{ value: '1', label: '中国' },
		{ value: '2', label: '美国' },
		{ value: '3', label: '日本' },
		{ value: '4', label: '韩国' },
		{ value: '5', label: '英国' },
		{ value: '6', label: '德国' },
		{ value: '7', label: '法国' },
		{ value: '8', label: '澳大利亚' },
		{ value: '9', label: '加拿大' },
		{ value: '10', label: '新加坡' },
		{ value: '11', label: '马来西亚' },
		{ value: '12', label: '泰国' }
	])
	
	// 显示选中的国家/地区标签
	const selectedCountryLabel = computed<string>(() : string => {
		if (!selectedCountry.value) return ''
		for (let i = 0; i < countryOptions.value.length; i++) {
			const opt = countryOptions.value[i] as UTSJSONObject
			if (opt['value'] === selectedCountry.value) {
				const label = opt['label']
				return label == null ? '' : '' + label
			}
		}
		return ''
	})
	
	// 打开国家/地区选择弹窗
	const openSelectCountry = () => {
		showCountryPopup.value = true
	}
	
	// 国家/地区选择变化
	const onCountryChange = (value: string | number | null, item: any) => {
		console.log('选中国家/地区:', value, item, " at pages/h5Search/h5Search.uvue:131")
		showCountryPopup.value = false
		uni.showToast({
			title: `已选择：${(item as UTSJSONObject)['label']}`,
			icon: 'success'
		})
	}
	
	// 关闭弹窗时重置搜索
	const onPopupClose = () => {
		showCountryPopup.value = false
	}
	
	// 扫码
	const handleScan = () => {
		uni.navigateTo({
			url: '/pages/scanCode/scanCode'
		})
	}
	
	// 查询缴费
	const handleQuery = () => {
		if (!cardNumber.value) {
			uni.showToast({
				title: '请输入卡号',
				icon: 'none'
			})
			return
		}
		if (!selectedCountry.value) {
			uni.showToast({
				title: '请选择国家/地区',
				icon: 'none'
			})
			return
		}
		console.log('查询卡号:', cardNumber.value, " at pages/h5Search/h5Search.uvue:167")
		console.log('国家/地区:', selectedCountryLabel.value, " at pages/h5Search/h5Search.uvue:168")
		uni.showToast({
			title: '查询中...',
			icon: 'loading'
		})
		// 跳转到充值页面
		// uni.navigateTo({
		// 	url: `/pages/recharge/recharge?cardNo=${cardNumber.value}&country=${selectedCountry.value}`
		// })
	}
	
	// 监听扫码结果
	const onScanResult = (data: UTSJSONObject) => {
		const result = data.getString('result') ?? ''
		if (result.length > 0) {
			cardNumber.value = result
			uni.showToast({
				title: '扫码成功',
				icon: 'success'
			})
		}
	}
	
	onMounted(() => {
		uni.$on('scanResult', onScanResult)
	})
	
	onUnmounted(() => {
		uni.$off('scanResult', onScanResult)
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)
const _component_m_bottom_popup = resolveEasyComponent("m-bottom-popup",_easycom_m_bottom_popup)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "查询卡号",
      "show-back": false,
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "main-content" }), [
        _cE("view", _uM({ class: "title-section" }), [
          _cE("text", _uM({ class: "main-title" }), "国内版H5快捷充值"),
          _cE("text", _uM({ class: "sub-title" }), "输入卡号，快速查询缴费"),
          _cE("text", _uM({ class: "desc-text" }), "支持短信链接、二维码、APP跳转进入H5页面，未登录"),
          _cE("text", _uM({ class: "desc-text" }), "也可直接充值。")
        ]),
        _cE("view", _uM({ class: "card-box" }), [
          _cE("view", _uM({ class: "card-label" }), "卡号查询"),
          _cE("view", _uM({ class: "search-value" }), [
            _cE("input", _uM({
              modelValue: cardNumber.value,
              onInput: ($event: UniInputEvent) => {(cardNumber).value = $event.detail.value},
              placeholder: "请输入ICCID/MSISDN，或点击输入框右侧扫描图标识别卡号",
              class: "search-input"
            }), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"]),
            _cE("view", _uM({
              class: "scan-btn",
              onClick: handleScan
            }), [
              _cV(_component_m_icon, _uM({
                name: "scanning",
                size: "40rpx",
                color: "#666"
              }))
            ])
          ]),
          _cE("view", _uM({ class: "select-country-wrapper" }), [
            _cE("view", _uM({ class: "select-label" }), "选择国家/地区"),
            _cE("view", _uM({
              class: "select-trigger",
              onClick: openSelectCountry
            }), [
              _cE("text", _uM({
                class: _nC(["select-value", _uM({ placeholder: !selectedCountry.value })])
              }), _tD(selectedCountryLabel.value || '请选择国家/地区'), 3 /* TEXT, CLASS */),
              _cE("text", _uM({ class: "select-arrow" }), "▼")
            ])
          ]),
          _cE("view", _uM({
            class: "query-btn",
            onClick: handleQuery
          }), [
            _cE("text", _uM({ class: "query-btn-text" }), "查询缴费")
          ])
        ]),
        _cE("view", _uM({ class: "instruction-box" }), [
          _cE("view", _uM({ class: "instruction-title" }), "使用说明"),
          _cE("view", _uM({ class: "instruction-list" }), [
            _cE("text", _uM({ class: "instruction-item" }), "1.H5支持未登录快速充值。"),
            _cE("text", _uM({ class: "instruction-item" }), "2.APP跳转场景可直接进入充值首页，无需经过本入口页。"),
            _cE("text", _uM({ class: "instruction-item" }), "3.本原型用于展示H5页面结构及跳转关系。")
          ])
        ])
      ])
    ]),
    _cV(_component_m_bottom_popup, _uM({
      show: showCountryPopup.value,
      height: '75%',
      radius: true,
      onClose: onPopupClose
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cE("view", _uM({ class: "popup-header" }), [
          _cE("text", _uM({ class: "popup-title" }), "选择国家/地区"),
          _cE("view", _uM({
            class: "popup-close",
            onClick: onPopupClose
          }), [
            _cV(_component_m_icon, _uM({
              name: "close-bold",
              size: "40rpx"
            }))
          ])
        ]),
        _cV(unref(SearchSelect), _uM({
          ref_key: "searchSelectRef",
          ref: searchSelectRef,
          modelValue: selectedCountry.value,
          "onUpdate:modelValue": $event => {(selectedCountry).value = $event},
          options: countryOptions.value,
          "search-placeholder": "搜索国家/地区名称",
          onChange: onCountryChange
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "options"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["show"])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesH5SearchH5SearchStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["minHeight", "1000rpx"], ["backgroundColor", "#f5f7fa"]]))], ["main-content", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["paddingTop", 0], ["paddingRight", "24rpx"], ["paddingBottom", 0], ["paddingLeft", "24rpx"]]))], ["title-section", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["marginBottom", "48rpx"], ["backgroundImage", "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)"], ["backgroundColor", "rgba(0,0,0,0)"], ["borderTopLeftRadius", "22rpx"], ["borderTopRightRadius", "22rpx"], ["borderBottomRightRadius", "22rpx"], ["borderBottomLeftRadius", "22rpx"], ["paddingTop", 24], ["paddingRight", "20rpx"], ["paddingBottom", 24], ["paddingLeft", "20rpx"], ["color", "#ffffff"]]))], ["main-title", _uM([[".title-section ", _uM([["fontSize", "24rpx"], ["fontWeight", "bold"], ["marginBottom", "16rpx"]])]])], ["sub-title", _uM([[".title-section ", _uM([["fontSize", "50rpx"], ["fontWeight", "bold"], ["marginBottom", "24rpx"]])]])], ["desc-text", _uM([[".title-section ", _uM([["fontSize", "24rpx"]])]])], ["card-box", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e2e8f0"], ["borderRightColor", "#e2e8f0"], ["borderBottomColor", "#e2e8f0"], ["borderLeftColor", "#e2e8f0"], ["borderTopLeftRadius", "32rpx"], ["borderTopRightRadius", "32rpx"], ["borderBottomRightRadius", "32rpx"], ["borderBottomLeftRadius", "32rpx"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "32rpx"], ["paddingLeft", "32rpx"], ["marginBottom", "48rpx"], ["boxShadow", "0 4rpx 20rpx rgba(0, 0, 0, 0.04)"]]))], ["card-label", _uM([[".card-box ", _uM([["fontSize", "32rpx"], ["fontWeight", 600], ["color", "#1f2937"], ["marginBottom", "24rpx"]])]])], ["search-value", _uM([[".card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e5e7eb"], ["borderRightColor", "#e5e7eb"], ["borderBottomColor", "#e5e7eb"], ["borderLeftColor", "#e5e7eb"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundColor", "#f9fafb"], ["marginBottom", "24rpx"]])]])], ["search-input", _uM([[".card-box .search-value ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", "24rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "28rpx"], ["height", "88rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#1f2937"], ["fontSize", "28rpx"]])]])], ["scan-btn", _uM([[".card-box .search-value ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["width", "88rpx"], ["height", "88rpx"], ["borderLeftWidth", "2rpx"], ["borderLeftStyle", "solid"], ["borderLeftColor", "#e5e7eb"]])]])], ["select-country-wrapper", _uM([[".card-box ", _uM([["marginBottom", "32rpx"]])]])], ["select-label", _uM([[".card-box .select-country-wrapper ", _uM([["fontSize", "28rpx"], ["color", "#666666"], ["marginBottom", "16rpx"]])]])], ["select-trigger", _uM([[".card-box .select-country-wrapper ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e5e7eb"], ["borderRightColor", "#e5e7eb"], ["borderBottomColor", "#e5e7eb"], ["borderLeftColor", "#e5e7eb"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundColor", "#f9fafb"], ["paddingTop", "24rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "28rpx"], ["minHeight", "88rpx"]])]])], ["select-value", _uM([[".card-box .select-country-wrapper .select-trigger ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "28rpx"], ["color", "#1f2937"]])], [".card-box .select-country-wrapper .select-trigger .placeholder", _uM([["color", "#999999"]])]])], ["select-arrow", _uM([[".card-box .select-country-wrapper .select-trigger ", _uM([["fontSize", "24rpx"], ["color", "#999999"], ["marginLeft", "16rpx"]])]])], ["query-btn", _uM([[".card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["backgroundImage", "linear-gradient(135deg, #2563eb, #1d4ed8)"], ["backgroundColor", "rgba(0,0,0,0)"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0]])]])], ["query-btn-text", _uM([[".card-box .query-btn ", _uM([["color", "#ffffff"], ["fontSize", "32rpx"], ["fontWeight", 600]])]])], ["instruction-box", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e2e8f0"], ["borderRightColor", "#e2e8f0"], ["borderBottomColor", "#e2e8f0"], ["borderLeftColor", "#e2e8f0"], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["borderBottomLeftRadius", "18rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["boxShadow", "0 8rpx 20rpx rgba(15, 23, 42, 0.04)"]]))], ["instruction-title", _uM([[".instruction-box ", _uM([["fontSize", "30rpx"], ["fontWeight", 600], ["color", "#1f2937"], ["marginBottom", "24rpx"]])]])], ["instruction-list", _uM([[".instruction-box ", _uM([["display", "flex"], ["flexDirection", "column"]])]])], ["instruction-item", _uM([[".instruction-box .instruction-list ", _uM([["fontSize", "26rpx"], ["color", "#6b7280"], ["lineHeight", 1.6]])]])], ["popup-header", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "32rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "16rpx"], ["paddingLeft", "32rpx"], ["borderBottomWidth", "2rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#f0f0f0"]]))], ["popup-title", _uM([[".popup-header ", _uM([["fontSize", "32rpx"], ["fontWeight", 600], ["color", "#1f2937"]])]])], ["popup-close", _uM([[".popup-header ", _uM([["width", "56rpx"], ["height", "56rpx"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["fontSize", "44rpx"], ["color", "#999999"]])]])]])]
