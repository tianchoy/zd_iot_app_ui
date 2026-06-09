import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_rice_input from '@/uni_modules/rice-ui/components/rice-input/rice-input.uvue'
import _easycom_rice_icon from '@/uni_modules/rice-ui/components/rice-icon/rice-icon.uvue'
import _easycom_rice_button from '@/uni_modules/rice-ui/components/rice-button/rice-button.uvue'
import _easycom_m_segmented_control from '@/uni_modules/m-unix/components/m-segmented-control/m-segmented-control.uvue'
import _easycom_rice_tabs from '@/uni_modules/rice-ui/components/rice-tabs/rice-tabs.uvue'
import _easycom_m_div from '@/uni_modules/m-unix/components/m-div/m-div.uvue'
import _easycom_customService from '@/components/customService/customService.uvue'
import { ref, computed, onMounted, nextTick } from 'vue'
import { queryCardList } from '@/api/http.uts'
import { getPageParams } from '@/utils/routerParams'
import { getToken } from '@/common/config.uts'
import { CardItem } from '@/api/types.uts'


const __sfc__ = defineComponent({
  __name: 'card',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const card_number = ref('')
const queryKeyword = ref('')
const tabs = ref(['全部', '在用', '异常'])
const tabs1 = ref([{name:'全部',},{name:'在用',},{name:'异常'}])
const current = ref(0)
const scrollViewHeight = ref(0)
const loading = ref<boolean>(false)

// 完整的卡片列表数据
const allCardList = ref<CardItem[]>([
	{
		id: 1,
		cardNumber: '1064916585160',
		iccid: '89860421123456789012',
		tag: '主卡',
		status: '在用',
		currentPackage: '车联网月包20G',
		expireDate: '2026-04-30',
		usedTraffic: '11.34GB',
		totalTraffic: '20GB',
		currentCycle: '第1期 / 共12期'
	},
	{
		id: 2,
		cardNumber: '1064916585161',
		iccid: '89860421123456789013',
		tag: '副卡',
		status: '在用',
		currentPackage: '车联网月包10G',
		expireDate: '2026-05-15',
		usedTraffic: '5.21GB',
		totalTraffic: '10GB',
		currentCycle: '第2期 / 共6期'
	},
	{
		id: 3,
		cardNumber: '1064916585162',
		iccid: '89860421123456789014',
		tag: '测试卡',
		status: '异常',
		currentPackage: '测试套餐1G',
		expireDate: '2026-03-31',
		usedTraffic: '1GB',
		totalTraffic: '1GB',
		currentCycle: '第1期 / 共1期'
	},
	{
		id: 4,
		cardNumber: '1064916585163',
		iccid: '89860421123456789015',
		tag: '备用卡',
		status: '在用',
		currentPackage: '工业设备月包5G',
		expireDate: '2026-06-30',
		usedTraffic: '2.15GB',
		totalTraffic: '5GB',
		currentCycle: '第1期 / 共3期'
	},
	{
		id: 5,
		cardNumber: '1064916585164',
		iccid: '89860421123456789016',
		tag: '体验卡',
		status: '停机',
		currentPackage: '体验套餐500M',
		expireDate: '2026-02-28',
		usedTraffic: '500MB',
		totalTraffic: '500MB',
		currentCycle: '第1期 / 共1期'
	}
])

// 计算每个 tab 对应的卡片数量
const tabNumbers = computed<number[]>(() => {
	const total = allCardList.value.length
	const inUse = allCardList.value.filter((card: CardItem) => card.status === '在用').length
	const abnormal = allCardList.value.filter((card: CardItem) => card.status !== '在用').length
	return [total, inUse, abnormal]
})

const handleDetail = (card: CardItem) => {
	console.log(card, " at pages/card/card.uvue:185")
	uni.navigateTo({
		url: '/pages/cardDetail/cardDetail?cardNumber=' + card.cardNumber
	})
}

// 根据选中的 tab 和查询卡号过滤卡片列表
const filteredCardList = computed<CardItem[]>(() : CardItem[] => {
	const currentStatus = tabs.value[current.value]
	let list = allCardList.value
	if (currentStatus !== '全部') {
		list = list.filter((card: CardItem) : boolean => {
			const status = '' + card.status
			if (currentStatus === '异常') {
				return status !== '在用'
			}
			return status === currentStatus
		})
	}
	if (queryKeyword.value !== '') {
		list = list.filter((card: CardItem) : boolean => {
			const cardNumber = '' + (card as UTSJSONObject)['cardNumber']
			return cardNumber.indexOf(queryKeyword.value) !== -1
		})
	}
	return list
})

const getCardText = (card: CardItem, key: string): string => {
	const value = card[key]
	return value == null ? '' : '' + value
}

// 获取状态样式类
const getStatusClass = (status: string): string => {
	switch (status) {
		case '在用':
			return 'status-completed'
		case '异常':
			return 'status-pending'
		case '停机':
			return 'status-refunded'
		default:
			return ''
	}
}

const handleClick = (e: UTSJSONObject) => {
	if(e.index != null){
		current.value = e.index as number
	}
}

const scanCode = () => {
	uni.navigateTo({
		url: '/pages/scanCode/scanCode'
	})
}


const handleInput = () => {
	if (card_number.value.trim() === '') {
		queryKeyword.value = ''
	}
}

const handleQuery = () => {
	const keyword = card_number.value.trim()
	if (!keyword) {
		uni.showToast({
			title: '请输入卡号',
			icon: 'none'
		})
		return
	}
	queryKeyword.value = keyword
}

// 接收扫码结果
const onScanResult = (data: UTSJSONObject) => {
	console.log(data, " at pages/card/card.uvue:265")
	const result = data.getString('result') ?? ''
	console.log(result, " at pages/card/card.uvue:267")
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

// 计算 scroll-view 的高度
const calculateScrollHeight = () => {

	nextTick(() => {
		const systemInfo = uni.getSystemInfoSync()
		const windowHeight = systemInfo.windowHeight
		const statusBarHeight = systemInfo.statusBarHeight || 0
		uni.createSelectorQuery().select('.container').boundingClientRect((rect) => {
			if (rect) {
				// 获取顶部搜索框区域高度
				uni.createSelectorQuery().select('.card-box').boundingClientRect((searchRect) => {
					if (searchRect) {
						// container 的 padding-bottom 40rpx 转换为 px
						const paddingBottom = 40 / 750 * systemInfo.windowWidth
						// 减去顶部搜索区域和容器内边距，剩余高度给 scroll-view
						scrollViewHeight.value = windowHeight - searchRect.top - paddingBottom - 20
					}
				}).exec()
			}
		}).exec()
	})

}

// 查询卡列表
const getCardList = async () => {
	loading.value = true
	try {
		const res = await queryCardList({
			rechargeNo: '',
			status: '',
			isSort: true
		})
		if (res.code === 200) {
			console.log('查询卡列表成功:', res.data, " at pages/card/card.uvue:313")
			// 假设返回的数据结构是 res.data.list 或 res.data 直接为数组，根据实际情况调整
			if (Array.isArray(res.data)) {
				allCardList.value = res.data
			} else if (res.data && Array.isArray(res.data.list)) {
				allCardList.value = res.data.list
			} else {
				allCardList.value = []
			}
		} else {
			console.log('查询卡列表失败:', res.msg, " at pages/card/card.uvue:323")
			allCardList.value = []
			uni.showToast({
				title: res.msg || '查询失败',
				icon: 'none'
			})
		}
	} catch (error) {
		console.error('查询卡列表异常:', error, " at pages/card/card.uvue:331")
		allCardList.value = []
		uni.showToast({
			title: '网络异常，请稍后重试',
			icon: 'none'
		})
	} finally {
		loading.value = false
	}
}

// 检查token状态
const checkToken = (): boolean => {
	const token = getToken()
	return !!token
}

// 检查是否登录
const isLogin = (): boolean => {
	if (!checkToken()) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		})
		return false
	}
	return true
}

onLoad((options) => {
	// // 检查token状态
	// if (checkToken()) {
	// 	//加载列表数据
	// 	getCardList()
	// }
	uni.$on('scanResult', onScanResult)
})

// 处理连接客服事件
const handleConnectService = () => {
	uni.showToast({
		title: '连接客服',
		icon: 'none'
	})
}



onMounted(() => {
	calculateScrollHeight()
})

onUnload(() => {
		// 移除事件监听
		uni.$off('scanResult', onScanResult)
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_rice_input = resolveEasyComponent("rice-input",_easycom_rice_input)
const _component_rice_icon = resolveEasyComponent("rice-icon",_easycom_rice_icon)
const _component_rice_button = resolveEasyComponent("rice-button",_easycom_rice_button)
const _component_m_segmented_control = resolveEasyComponent("m-segmented-control",_easycom_m_segmented_control)
const _component_rice_tabs = resolveEasyComponent("rice-tabs",_easycom_rice_tabs)
const _component_m_div = resolveEasyComponent("m-div",_easycom_m_div)
const _component_customService = resolveEasyComponent("customService",_easycom_customService)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "卡片",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-box mb-24" }), [
        _cE("view", _uM({ class: "card-label" }), "卡号查询"),
        _cE("view", _uM({ class: "search-value mt-24" }), [
          _cV(_component_rice_input, _uM({
            modelValue: card_number.value,
            "onUpdate:modelValue": $event => {(card_number).value = $event},
            placeholder: "请输入 ICCID / MSISDN",
            class: "search-input",
            onInput: handleInput
          }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"]),
          _cV(_component_rice_button, _uM({
            class: "scan-btn",
            height: "100%",
            onClick: scanCode
          }), _uM({
            default: withSlotCtx((): any[] => [
              _cV(_component_rice_icon, _uM({
                name: "scan",
                size: "40rpx"
              }))
            ]),
            _: 1 /* STABLE */
          })),
          _cV(_component_rice_button, _uM({
            type: "primary",
            height: "100%",
            onClick: handleQuery
          }), _uM({
            default: withSlotCtx((): any[] => ["查询"]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _cE("view", _uM({ class: "card-box" }), [
        _cE("view", _uM({ class: "card-tabs" }), [
          _cV(_component_m_segmented_control, _uM({
            values: tabs.value,
            current: current.value,
            textActiveColor: '#2563eb',
            onClick: handleClick,
            customStyle: {height:'72rpx',padding:'5rpx 10rpx',border:'1rpx solid #e5edf6'}
          }), null, 8 /* PROPS */, ["values", "current"]),
          _cV(_component_rice_tabs, _uM({
            modelValue: current.value,
            "onUpdate:modelValue": $event => {(current).value = $event},
            list: tabs1.value,
            "line-width": 0,
            "title-active-color": '#2563eb',
            onClick: handleClick,
            customStyle: {height:'72rpx',padding:'5rpx 10rpx',border:'1rpx solid #e5edf6'}
          }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "list"])
        ]),
        _cE("scroll-view", _uM({
          class: "card-list android-card-scroll",
          "scroll-y": "true",
          style: _nS(_uM({ height: scrollViewHeight.value + 'px' }))
        }), [
          _cE(Fragment, null, RenderHelpers.renderList(filteredCardList.value, (card, index, __index, _cached): any => {
            return _cE("view", _uM({
              class: "card-item",
              key: index,
              onClick: () => {handleDetail(card)}
            }), [
              _cE("view", _uM({ class: "item-head" }), [
                _cE("view", _uM({ class: "item-head-label" }), [
                  _cE("text", _uM({ class: "card-item-title" }), _tD(getCardText(card, 'cardNumber')), 1 /* TEXT */),
                  _cE("text", _uM({ class: "card-item-content" }), "ICCID: " + _tD(getCardText(card, 'iccid')), 1 /* TEXT */)
                ]),
                _cE("text", _uM({
                  class: _nC(["status-tag", getStatusClass(getCardText(card, 'status'))])
                }), _tD(getCardText(card, 'status')), 3 /* TEXT, CLASS */)
              ]),
              _cE("view", _uM({ class: "item-package" }), [
                _cE("text", _uM({ class: "package-label" }), "当前套餐:"),
                _cE("text", _uM({ class: "package-value" }), _tD(getCardText(card, 'currentPackage')), 1 /* TEXT */)
              ]),
              _cV(_component_m_div, _uM({
                backgroundColor: "#f1f5f9",
                textClass: "divider"
              })),
              _cE("view", _uM({ class: "card-metrics" }), [
                _cE("view", _uM({ class: "metric-box mr-24" }), [
                  _cE("view", _uM({ class: "metric-label" }), "到期时间"),
                  _cE("view", _uM({ class: "metric-value" }), _tD(getCardText(card, 'expireDate')), 1 /* TEXT */)
                ]),
                _cE("view", _uM({ class: "metric-box" }), [
                  _cE("view", _uM({ class: "metric-label" }), "本月流量"),
                  _cE("view", _uM({ class: "metric-value" }), _tD(getCardText(card, 'usedTraffic')) + " / " + _tD(getCardText(card, 'totalTraffic')), 1 /* TEXT */)
                ])
              ]),
              _cE("view", _uM({ class: "card-bottom" }), [
                _cE("view", _uM({ class: "card-cycle-text" }), [
                  _cE("text", _uM({ class: "cycle-label" }), "当前周期："),
                  _cE("text", _uM({ class: "cycle-value" }), _tD(getCardText(card, 'currentCycle')), 1 /* TEXT */)
                ]),
                _cE("view", _uM({ class: "android-recharge-btn" }), [
                  _cE("text", _uM({ class: "android-btn-text android-recharge-text" }), "去充值")
                ])
              ])
            ], 8 /* PROPS */, ["onClick"])
          }), 128 /* KEYED_FRAGMENT */)
        ], 4 /* STYLE */)
      ]),
      filteredCardList.value.length === 0
        ? _cE("view", _uM({
            key: 0,
            class: "empty-state"
          }), [
            _cE("text", _uM({ class: "empty-text" }), "暂无卡片数据")
          ])
        : _cC("v-if", true),
      _cV(_component_customService, _uM({ onConnect_service: handleConnectService }))
    ])
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesCardCardStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f4f7fb"], ["paddingBottom", "40rpx"]]))], ["card-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"]])]])], ["card-tabs", _uM([[".container .card-box ", _uM([["marginBottom", "30rpx"]])]])], ["search-value", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#dbe5f0"], ["borderRightColor", "#dbe5f0"], ["borderBottomColor", "#dbe5f0"], ["borderLeftColor", "#dbe5f0"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"]])]])], ["search-input", _uM([[".container .card-box .search-value ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", 0], ["paddingRight", "25rpx"], ["paddingBottom", 0], ["paddingLeft", "25rpx"], ["height", "95rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#0f172a"], ["fontSize", "30rpx"]])]])], ["scan-btn", _uM([[".container .card-box .search-value ", _uM([["borderLeftWidth", 1], ["borderLeftStyle", "solid"], ["borderLeftColor", "#eef2f7"]])]])], ["card-item", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "#e7edf5"], ["paddingBottom", "30rpx"], ["marginBottom", "30rpx"], ["borderBottomWidth:last-child", "medium"], ["borderBottomStyle:last-child", "none"], ["borderBottomColor:last-child", "#000000"], ["marginBottom:last-child", 0], ["paddingBottom:last-child", 0]])]])], ["item-head", _uM([[".container .card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-start"], ["justifyContent", "space-between"]])]])], ["card-item-title", _uM([[".container .card-box .card-item .item-head ", _uM([["fontSize", "32rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.25]])]])], ["card-item-content", _uM([[".container .card-box .card-item .item-head ", _uM([["marginTop", 5], ["fontSize", 12], ["color", "#94a3b8"], ["lineHeight", 1.45]])]])], ["status-tag", _uM([[".container .card-box .card-item .item-head ", _uM([["fontSize", "24rpx"], ["paddingTop", "6rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "6rpx"], ["paddingLeft", "16rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"]])]])], ["status-completed", _uM([[".container .card-box .card-item .item-head ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ecfdf5"], ["color", "#059669"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#a7f3d0"], ["borderRightColor", "#a7f3d0"], ["borderBottomColor", "#a7f3d0"], ["borderLeftColor", "#a7f3d0"]])]])], ["status-pending", _uM([[".container .card-box .card-item .item-head ", _uM([["backgroundImage", "none"], ["backgroundColor", "#fff7ed"], ["color", "#ea580c"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#fdba74"], ["borderRightColor", "#fdba74"], ["borderBottomColor", "#fdba74"], ["borderLeftColor", "#fdba74"]])]])], ["status-refunded", _uM([[".container .card-box .card-item .item-head ", _uM([["backgroundImage", "none"], ["backgroundColor", "#fef2f2"], ["color", "#dc2626"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#fecaca"], ["borderRightColor", "#fecaca"], ["borderBottomColor", "#fecaca"], ["borderLeftColor", "#fecaca"]])]])], ["item-package", _uM([[".container .card-box .card-item ", _uM([["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["minWidth", 0]])]])], ["package-label", _uM([[".container .card-box .card-item .item-package ", _uM([["fontSize", 12], ["color", "#64748b"], ["lineHeight", 1.4]])]])], ["package-value", _uM([[".container .card-box .card-item .item-package ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "25rpx"], ["fontWeight", 700], ["color", "#334155"], ["lineHeight", 1.45], ["whiteSpace", "nowrap"], ["overflow", "hidden"], ["textOverflow", "ellipsis"]])]])], ["card-metrics", _uM([[".container .card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["flexWrap", "wrap"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["gap", "24rpx"]])]])], ["metric-box", _uM([[".container .card-box .card-item .card-metrics ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["boxSizing", "border-box"], ["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e8eef7"], ["borderRightColor", "#e8eef7"], ["borderBottomColor", "#e8eef7"], ["borderLeftColor", "#e8eef7"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"], ["minWidth", 0]])]])], ["metric-label", _uM([[".container .card-box .card-item .card-metrics .metric-box ", _uM([["fontSize", "25rpx"], ["color", "#94a3b8"], ["lineHeight", 1.4]])]])], ["metric-value", _uM([[".container .card-box .card-item .card-metrics .metric-box ", _uM([["marginTop", "15rpx"], ["fontSize", "25rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.4]])]])], ["card-bottom", _uM([[".container .card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["card-cycle-text", _uM([[".container .card-box .card-item .card-bottom ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["cycle-label", _uM([[".container .card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "25rpx"], ["color", "#64748b"], ["lineHeight", 1.45]])]])], ["cycle-value", _uM([[".container .card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "25rpx"], ["color", "#334155"], ["fontWeight", 800]])]])], ["card-list", _uM([[".container ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["width", "100%"]])]])], ["android-card-scroll", _uM([[".container ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["width", "100%"]])]])], ["empty-state", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "120rpx"], ["paddingRight", "32rpx"], ["paddingBottom", "120rpx"], ["paddingLeft", "32rpx"], ["backgroundColor", "#ffffff"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"]])]])], ["empty-text", _uM([[".container .empty-state ", _uM([["fontSize", "28rpx"], ["color", "#9ca3af"]])]])]])]
