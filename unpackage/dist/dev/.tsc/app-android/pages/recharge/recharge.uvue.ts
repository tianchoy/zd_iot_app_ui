import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_rice_tag from '@/uni_modules/rice-ui/components/rice-tag/rice-tag.uvue'
import _easycom_rice_progress from '@/uni_modules/rice-ui/components/rice-progress/rice-progress.uvue'
import _easycom_rice_button from '@/uni_modules/rice-ui/components/rice-button/rice-button.uvue'
import _easycom_rice_tabs from '@/uni_modules/rice-ui/components/rice-tabs/rice-tabs.uvue'
import _easycom_rice_popup from '@/uni_modules/rice-ui/components/rice-popup/rice-popup.uvue'
import { ref, computed } from 'vue';

	import LinearProgress from '@/components/progress.uvue';
	import Payment from '@/components/payment.uvue';
	
	// Tab 项类型
	type TabItem = { __$originalPosition?: UTSSourceMapPosition<"TabItem", "pages/recharge/recharge.uvue", 133, 7>;
		name: string;
	};
	
	// 套餐包/加油包项类型
	type PackageItem = { __$originalPosition?: UTSSourceMapPosition<"PackageItem", "pages/recharge/recharge.uvue", 138, 7>;
		name: string;
		tag: string;
		data: string;
		validity: string;
		price: number;
		originalPrice: number;
	};
	
	// changeTab 函数的参数类型
	type ChangeTabEvent = { __$originalPosition?: UTSSourceMapPosition<"ChangeTabEvent", "pages/recharge/recharge.uvue", 148, 7>;
		index: number;
	};
	
	
const __sfc__ = defineComponent({
  __name: 'recharge',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const showPopup = ref<boolean>(false);
	const percentage = ref<number>(60);
	
	const active = ref<number>(0);
	const tabs = ref<Array<TabItem>>([
		{
			name: '套餐包'
		},
		{
			name: '加油包',
		}
	]);
	
	// 套餐包列表数据
	const packageList = ref<Array<PackageItem>>([
		{
			name: '车联网月包20G',
			tag: '推荐',
			data: '20GB',
			validity: '30天',
			price: 90,
			originalPrice: 100
		},
		{
			name: '车联网月包10G',
			tag: '',
			data: '10GB',
			validity: '30天',
			price: 50,
			originalPrice: 0
		},
		{
			name: '工业设备月包5G',
			tag: '',
			data: '5GB',
			validity: '30天',
			price: 30,
			originalPrice: 0
		}
	]);
	
	// 加油包列表数据
	const refillList = ref<Array<PackageItem>>([
		{
			name: '加油包5G',
			tag: '推荐',
			data: '5GB',
			validity: '7天',
			price: 20,
			originalPrice: 30
		},
		{
			name: '加油包10G',
			tag: '',
			data: '10GB',
			validity: '15天',
			price: 35,
			originalPrice: 45
		},
		{
			name: '加油包20G',
			tag: '',
			data: '20GB',
			validity: '30天',
			price: 60,
			originalPrice: 80
		}
	]);
	
	// 选中的套餐包索引
	const selectedPackageIndex = ref<number>(0);
	// 选中的加油包索引
	const selectedRefillIndex = ref<number>(0);
	
	const currentPrice = computed<number>((): number => {
		if (active.value === 0) {
			const item = packageList.value[selectedPackageIndex.value];
			return item ? item.price : 0;
		} else {
			const item = refillList.value[selectedRefillIndex.value];
			return item ? item.price : 0;
		}
	});
	
	const changeTab = (e: ChangeTabEvent) => {
		active.value = e.index;
	}
	
	const selectPackage = (index: number) => {
		selectedPackageIndex.value = index;
	}
	
	const selectRefill = (index: number) => {
		selectedRefillIndex.value = index;
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
	const handleConfirmPayment = (e: any) => {
		console.log(e, " at pages/recharge/recharge.uvue:260");
		// 处理确认逻辑
		showPopup.value = false;
	}
	
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	
	// 跳转我的套餐
	const toMyPackage = () => {
		uni.navigateTo({
			url: '/pages/myPkg/myPkg'
		})
	}
	
	// 跳转订单记录
	const toOrderRecord = () => {
		uni.navigateTo({
			url: '/pages/orderRecord/orderRecord'
		})
	}

	onLoad(async () => {
	})
	

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_rice_tag = resolveEasyComponent("rice-tag",_easycom_rice_tag)
const _component_rice_progress = resolveEasyComponent("rice-progress",_easycom_rice_progress)
const _component_rice_button = resolveEasyComponent("rice-button",_easycom_rice_button)
const _component_rice_tabs = resolveEasyComponent("rice-tabs",_easycom_rice_tabs)
const _component_block = resolveComponent("block")
const _component_rice_popup = resolveEasyComponent("rice-popup",_easycom_rice_popup)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "充值首页",
      "show-back": true,
      onBack: goBack,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-info" }), [
        _cE("view", _uM({ class: "card-title" }), [
          _cE("text", _uM({ class: "title" }), "卡片信息"),
          _cV(_component_rice_tag, _uM({
            text: "标签",
            round: true,
            "plain-fill": "",
            size: "small",
            type: "success"
          }))
        ]),
        _cE("view", _uM({ class: "card-number" }), [
          _cE("text", null, "1234567890123456")
        ]),
        _cE("view", _uM({ class: "info-list" }), [
          _cE("view", _uM({ class: "info-item" }), [
            _cE("text", _uM({ class: "label" }), "当前套餐"),
            _cE("text", _uM({ class: "value" }), "车联网月包20G(名称较长时自动换行展示)")
          ]),
          _cE("view", _uM({ class: "info-item" }), [
            _cE("text", _uM({ class: "label" }), "卡片余额"),
            _cE("text", _uM({ class: "value" }), "¥1000.00")
          ])
        ]),
        _cE("view", _uM({ class: "flow-box" }), [
          _cE("view", _uM({ class: "flow-label" }), "流量信息"),
          _cV(_component_rice_progress, _uM({
            percentage: percentage.value,
            "show-text": ""
          }), null, 8 /* PROPS */, ["percentage"])
        ]),
        _cE("view", _uM({ class: "card-bottom" }), [
          _cV(_component_rice_button, _uM({
            class: "btn mr-24",
            onClick: toMyPackage
          }), _uM({
            default: withSlotCtx((): any[] => ["卡片套餐"]),
            _: 1 /* STABLE */
          })),
          _cV(_component_rice_button, _uM({
            class: "btn",
            onClick: toOrderRecord
          }), _uM({
            default: withSlotCtx((): any[] => ["订单记录"]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _cE("view", _uM({ class: "pkg-box" }), [
        _cV(_component_rice_tabs, _uM({
          modelValue: active.value,
          "onUpdate:modelValue": $event => {(active).value = $event},
          "line-color": "#ffffff",
          list: tabs.value,
          "line-width": 0,
          "title-active-color": '#2563eb',
          onChange: changeTab,
          customStyle: {height:'85rpx',padding:'10rpx',border:'1rpx solid #e5edf6'}
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "list"]),
        _cE("view", _uM({ class: "pkg-content" }), [
          active.value === 0
            ? _cV(_component_block, _uM({ key: 0 }), _uM({
                default: withSlotCtx((): any[] => [
                  _cE(Fragment, null, RenderHelpers.renderList(packageList.value, (item, index, __index, _cached): any => {
                    return _cE("view", _uM({
                      key: index,
                      class: _nC(["pkg-card", _uM({ 'pkg-card-selected': selectedPackageIndex.value === index })]),
                      onClick: () => {selectPackage(index)}
                    }), [
                      _cE("view", _uM({ class: "pkg-info" }), [
                        _cE("view", _uM({ class: "pkg-name" }), [
                          _cE("text", _uM({ class: "pkg-title" }), _tD(item.name), 1 /* TEXT */),
                          isTrue(item.tag)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-tag"
                              }), _tD(item.tag), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ]),
                        _cE("view", _uM({ class: "pkg-desc" }), [
                          _cE("text", _uM({ class: "pkg-icon" }), "流量 " + _tD(item.data), 1 /* TEXT */),
                          _cE("text", _uM({ class: "pkg-icon" }), "有效期 " + _tD(item.validity), 1 /* TEXT */)
                        ])
                      ]),
                      _cE("view", _uM({ class: "pkg-price" }), [
                        _cE("view", _uM({ class: "price-wrapper" }), [
                          _cE("text", _uM({ class: "price-symbol" }), "¥"),
                          _cE("text", _uM({ class: "price-number" }), _tD(item.price), 1 /* TEXT */)
                        ]),
                        isTrue(item.originalPrice)
                          ? _cE("view", _uM({
                              key: 0,
                              class: "price-original"
                            }), [
                              _cE("text", null, "¥" + _tD(item.originalPrice), 1 /* TEXT */)
                            ])
                          : _cC("v-if", true)
                      ])
                    ], 10 /* CLASS, PROPS */, ["onClick"])
                  }), 128 /* KEYED_FRAGMENT */)
                ]),
                _: 1 /* STABLE */
              }))
            : _cV(_component_block, _uM({ key: 1 }), _uM({
                default: withSlotCtx((): any[] => [
                  _cE(Fragment, null, RenderHelpers.renderList(refillList.value, (item, index, __index, _cached): any => {
                    return _cE("view", _uM({
                      key: index,
                      class: _nC(["pkg-card", _uM({ 'pkg-card-selected': selectedRefillIndex.value === index })]),
                      onClick: () => {selectRefill(index)}
                    }), [
                      _cE("view", _uM({ class: "pkg-info" }), [
                        _cE("view", _uM({ class: "pkg-name" }), [
                          _cE("text", _uM({ class: "pkg-title" }), _tD(item.name), 1 /* TEXT */),
                          isTrue(item.tag)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-tag"
                              }), _tD(item.tag), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ]),
                        _cE("view", _uM({ class: "pkg-desc" }), [
                          _cE("text", _uM({ class: "pkg-icon" }), "流量 " + _tD(item.data), 1 /* TEXT */),
                          _cE("text", _uM({ class: "pkg-icon" }), "有效期 " + _tD(item.validity), 1 /* TEXT */)
                        ])
                      ]),
                      _cE("view", _uM({ class: "pkg-price" }), [
                        _cE("view", _uM({ class: "price-wrapper" }), [
                          _cE("text", _uM({ class: "price-symbol" }), "¥"),
                          _cE("text", _uM({ class: "price-number" }), _tD(item.price), 1 /* TEXT */)
                        ]),
                        isTrue(item.originalPrice)
                          ? _cE("view", _uM({
                              key: 0,
                              class: "price-original"
                            }), [
                              _cE("text", null, "¥" + _tD(item.originalPrice), 1 /* TEXT */)
                            ])
                          : _cC("v-if", true)
                      ])
                    ], 10 /* CLASS, PROPS */, ["onClick"])
                  }), 128 /* KEYED_FRAGMENT */)
                ]),
                _: 1 /* STABLE */
              }))
        ])
      ])
    ]),
    _cV(_component_rice_popup, _uM({
      show: showPopup.value,
      "onUpdate:show": $event => {(showPopup).value = $event},
      position: "bottom",
      onClose: _ctx.onPopupClose
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cV(unref(Payment), _uM({
          amount: currentPrice.value,
          onCancel: handleCancelPayment,
          onConfirm: handleConfirmPayment
        }), null, 8 /* PROPS */, ["amount"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["show", "onUpdate:show", "onClose"]),
    _cE("view", _uM({ class: "bottom-box" }), [
      _cE("view", _uM({ class: "price-box" }), [
        _cE("text", _uM({ class: "price-label" }), "当前套餐金额"),
        _cE("text", _uM({ class: "price-value" }), "¥" + _tD(currentPrice.value), 1 /* TEXT */)
      ]),
      _cV(_component_rice_button, _uM({
        type: "primary",
        onClick: choosePayment,
        class: "btn"
      }), _uM({
        default: withSlotCtx((): any[] => ["去支付"]),
        _: 1 /* STABLE */
      }))
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesRechargeRechargeStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f4f7fb"], ["height", "100%"]]))], ["card-info", _uM([[".container ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"]])]])], ["card-title", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#333333"]])]])], ["title", _uM([[".container .card-info .card-title ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#333333"]])]])], ["card-number", _uM([[".container .card-info ", _uM([["color", "#475569"], ["marginTop", "24rpx"]])]])], ["info-list", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "column"]])]])], ["info-item", _uM([[".container .card-info .info-list ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "14rpx"], ["paddingRight", 0], ["paddingBottom", "14rpx"], ["paddingLeft", 0]])]])], ["label", _uM([[".container .card-info .info-list .info-item ", _uM([["color", "#64748b"], ["marginRight", "20rpx"], ["fontSize", "24rpx"]])]])], ["value", _uM([[".container .card-info .info-list .info-item ", _uM([["fontWeight", "bold"], ["whiteSpace", "pre-wrap"], ["lineHeight", 1.5], ["fontSize", "24rpx"]])]])], ["flow-box", _uM([[".container .card-info ", _uM([["marginTop", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e8eef7"], ["borderRightColor", "#e8eef7"], ["borderBottomColor", "#e8eef7"], ["borderLeftColor", "#e8eef7"], ["borderTopLeftRadius", "16rpx"], ["borderTopRightRadius", "16rpx"], ["borderBottomRightRadius", "16rpx"], ["borderBottomLeftRadius", "16rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["flow-label", _uM([[".container .card-info .flow-box ", _uM([["fontSize", "24rpx"], ["color", "#64748b"], ["marginBottom", "12rpx"]])]])], ["card-bottom", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["marginTop", "24rpx"]])]])], ["btn", _uM([[".container .card-info .card-bottom ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])], ["pkg-box", _uM([[".container ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", "24rpx"], ["marginRight", "24rpx"], ["marginBottom", "24rpx"], ["marginLeft", "24rpx"]])]])], ["pkg-content", _uM([[".container ", _uM([["marginTop", "20rpx"]])]])], ["pkg-card", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "28rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "24rpx"], ["marginBottom", "20rpx"], ["transitionProperty", "all"], ["transitionDuration", "0.2s"], ["transitionTimingFunction", "ease"]])]])], ["pkg-info", _uM([[".container .pkg-card ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])], ["pkg-name", _uM([[".container .pkg-card .pkg-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginBottom", "12rpx"], ["flexWrap", "wrap"]])]])], ["pkg-title", _uM([[".container .pkg-card .pkg-info .pkg-name ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#1e293b"]])]])], ["pkg-tag", _uM([[".container .pkg-card .pkg-info .pkg-name ", _uM([["backgroundImage", "linear-gradient(135deg, #ff9a3c, #ff6b3c)"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#ffffff"], ["fontSize", "20rpx"], ["paddingTop", "4rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "4rpx"], ["paddingLeft", "16rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["marginLeft", "12rpx"]])]])], ["pkg-desc", _uM([[".container .pkg-card .pkg-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["fontSize", "24rpx"], ["color", "#64748b"]])]])], ["pkg-icon", _uM([[".container .pkg-card .pkg-info .pkg-desc ", _uM([["display", "flex"], ["alignItems", "center"], ["paddingTop", "10rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f8fafc"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e2e8f0"], ["borderRightColor", "#e2e8f0"], ["borderBottomColor", "#e2e8f0"], ["borderLeftColor", "#e2e8f0"], ["color", "#475569"], ["fontSize", "20rpx"], ["fontWeight", 700], ["marginRight", "20rpx"]])]])], ["pkg-price", _uM([[".container .pkg-card ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-end"]])]])], ["price-wrapper", _uM([[".container .pkg-card .pkg-price ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["price-symbol", _uM([[".container .pkg-card .pkg-price .price-wrapper ", _uM([["fontSize", "24rpx"], ["color", "#ef4444"], ["fontWeight", "bold"]])]])], ["price-number", _uM([[".container .pkg-card .pkg-price .price-wrapper ", _uM([["fontSize", "40rpx"], ["color", "#ef4444"], ["fontWeight", "bold"]])]])], ["price-original", _uM([[".container .pkg-card .pkg-price ", _uM([["fontSize", "22rpx"], ["color", "#94a3b8"], ["marginTop", "4rpx"]])]])], ["pkg-card-selected", _uM([[".container ", _uM([["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#3b82f6"], ["borderRightColor", "#3b82f6"], ["borderBottomColor", "#3b82f6"], ["borderLeftColor", "#3b82f6"], ["backgroundImage", "none"], ["backgroundColor", "#f8fafc"], ["boxShadow", "0 4rpx 12rpx rgba(59, 130, 246, 0.08)"]])]])], ["bottom-box", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]]))], ["price-box", _uM([[".bottom-box ", _uM([["display", "flex"], ["flexDirection", "column"]])]])], ["price-label", _uM([[".bottom-box .price-box ", _uM([["fontSize", "24rpx"], ["color", "#64748b"]])]])], ["price-value", _uM([[".bottom-box .price-box ", _uM([["fontWeight", "bold"], ["color", "#ef4444"], ["fontSize", "40rpx"]])]])], ["@TRANSITION", _uM([["pkg-card", _uM([["property", "all"], ["duration", "0.2s"], ["timingFunction", "ease"]])]])]])]
