@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "SENSELESS_COMPARISON", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1E9055A
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlin.properties.Delegates
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMyOrderMyOrder : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMyOrderMyOrder) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMyOrderMyOrder
            val _cache = __ins.renderCache
            val tabs = ref(_uA<OrderStatusTab>(OrderStatusTab(name = "全部"), OrderStatusTab(name = "待支付"), OrderStatusTab(name = "已完成"), OrderStatusTab(name = "已退款"), OrderStatusTab(name = "已取消")))
            val current__1 = ref<Number>(0)
            val card_number = ref<String>("")
            val orders = ref(_uA<Any>(_uO("packageName" to "车联网月包20G", "status" to "已完成", "orderNo" to "O202604280001", "cardNo" to "1064916585160", "iccid" to "89860421123456789012", "time" to "2026-04-28 10:12:30", "amount" to 90), _uO("packageName" to "车联网月包10G", "status" to "待支付", "orderNo" to "O202604280002", "cardNo" to "1064916585160", "iccid" to "89860421123456789012", "time" to "2026-04-28 11:20:12", "amount" to 50), _uO("packageName" to "测试套餐1G", "status" to "已退款", "orderNo" to "O202603010001", "cardNo" to "1064916585160", "iccid" to "89860421123456789012", "time" to "2026-03-01 08:10:00", "amount" to 10), _uO("packageName" to "500MB加油包", "status" to "已完成", "orderNo" to "PO202605120001", "cardNo" to "14700002233", "iccid" to "8986032044208356010", "time" to "2026-05-12 11:02:00", "amount" to 19), _uO("packageName" to "1GB加油包", "status" to "已取消", "orderNo" to "PO202605120002", "cardNo" to "14700002233", "iccid" to "8986032044208356010", "time" to "2026-05-12 12:18:00", "amount" to 29)))
            val getOrderText = fun(order: Any, key: String): String {
                val value = (order as UTSJSONObject)[key]
                return if (value == null) {
                    ""
                } else {
                    "" + value
                }
            }
            val filteredOrders = computed<UTSArray<Any>>(fun(): UTSArray<Any> {
                var result = orders.value
                val currentStatus = tabs.value[current__1.value].name
                if (currentStatus !== "全部") {
                    result = result.filter(fun(order: Any): Boolean {
                        return getOrderText(order, "status") === currentStatus
                    }
                    )
                }
                if (card_number.value.trim().length > 0) {
                    val keyword = card_number.value.trim()
                    result = result.filter(fun(order: Any): Boolean {
                        return getOrderText(order, "iccid").includes(keyword) || getOrderText(order, "cardNo").includes(keyword)
                    }
                    )
                }
                return result
            }
            )
            val handleTabClick = fun(e: UTSJSONObject){
                val index = e["index"] as Number
                current__1.value = index
            }
            val handleSearch = fun(){
                console.log("搜索关键词:", card_number.value, " at pages/myOrder/myOrder.uvue:187")
            }
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "已完成" -> 
                        return "status-completed"
                    "待支付" -> 
                        return "status-pending"
                    "已退款" -> 
                        return "status-refunded"
                    "已取消" -> 
                        return "status-cancelled"
                    else -> 
                        return ""
                }
            }
            val handleBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val handlePay = fun(order: Any){
                val orderNo = getOrderText(order, "orderNo")
                console.log("去支付:", orderNo, " at pages/myOrder/myOrder.uvue:216")
                uni_showToast(ShowToastOptions(title = "支付订单 " + orderNo, icon = "none"))
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                return _cE("view", null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "我的订单", "show-back" to true, "onBack" to handleBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "search-value"), _uA(
                                _cE("input", _uM("modelValue" to card_number.value, "onInput" to fun(`$event`: UniInputEvent){
                                    card_number.value = `$event`.detail.value
                                }
                                , "placeholder" to "请输入 ICCID / MSISDN", "class" to "search-input"), null, 40, _uA(
                                    "modelValue",
                                    "onInput"
                                )),
                                _cV(_component_rice_button, _uM("class" to "scan-btn", "height" to "100%", "onClick" to _ctx.scanCode), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cV(_component_rice_icon, _uM("name" to "scan", "size" to "40rpx"))
                                    )
                                }
                                ), "_" to 1), 8, _uA(
                                    "onClick"
                                )),
                                _cV(_component_rice_button, _uM("type" to "primary", "color" to "#1989fa", "textColor" to "#ffffff", "height" to "100%", "onClick" to handleSearch), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "查询"
                                    )
                                }
                                ), "_" to 1))
                            )),
                            _cV(_component_rice_tabs, _uM("modelValue" to current__1.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                current__1.value = `$event`
                            }
                            , "line-color" to "#ffffff", "list" to tabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "onClick" to handleTabClick, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue",
                                "list"
                            ))
                        )),
                        _cE("scroll-view", _uM("class" to "order-list", "scroll-y" to "", "enhanced" to true, "show-scrollbar" to false), _uA(
                            if (filteredOrders.value.length === 0) {
                                _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                    _cE("text", _uM("class" to "empty-text"), "暂无订单")
                                ))
                            } else {
                                _cE("view", _uM("key" to 1, "class" to "orders-container"), _uA(
                                    _cE(Fragment, null, RenderHelpers.renderList(filteredOrders.value, fun(order, index, __index, _cached): Any {
                                        return _cE("view", _uM("key" to index, "class" to "order-card"), _uA(
                                            _cE("view", _uM("class" to "order-header"), _uA(
                                                _cE("text", _uM("class" to "package-name"), _tD(getOrderText(order, "packageName")), 1),
                                                _cE("text", _uM("class" to _nC(_uA(
                                                    "status-tag",
                                                    getStatusClass(getOrderText(order, "status"))
                                                ))), _tD(getOrderText(order, "status")), 3)
                                            )),
                                            _cE("view", _uM("class" to "order-details"), _uA(
                                                _cE("view", _uM("class" to "detail-row"), _uA(
                                                    _cE("text", _uM("class" to "detail-label"), "订单号"),
                                                    _cE("text", _uM("class" to "detail-value"), _tD(getOrderText(order, "orderNo")), 1)
                                                )),
                                                _cE("view", _uM("class" to "detail-row"), _uA(
                                                    _cE("text", _uM("class" to "detail-label"), "卡号"),
                                                    _cE("text", _uM("class" to "detail-value"), _tD(getOrderText(order, "cardNo")), 1)
                                                )),
                                                _cE("view", _uM("class" to "detail-row"), _uA(
                                                    _cE("text", _uM("class" to "detail-label"), "ICCID"),
                                                    _cE("text", _uM("class" to "detail-value"), _tD(getOrderText(order, "iccid")), 1)
                                                )),
                                                _cE("view", _uM("class" to "detail-row"), _uA(
                                                    _cE("text", _uM("class" to "detail-value"), _tD(getOrderText(order, "time")), 1),
                                                    _cE("view", _uM("class" to "order-footer"), _uA(
                                                        _cE("text", _uM("class" to "price"), "¥" + _tD(getOrderText(order, "amount")), 1),
                                                        if (getOrderText(order, "status") === "待支付") {
                                                            _cE("text", _uM("key" to 0, "class" to "pay-btn", "onClick" to fun(){
                                                                handlePay(order)
                                                            }), "去支付", 8, _uA(
                                                                "onClick"
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ))
                                            ))
                                        ))
                                    }
                                    ), 128)
                                ))
                            }
                        ))
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("backgroundColor" to "#f4f7fb", "minHeight" to "1000rpx", "display" to "flex", "flexDirection" to "column")), "card-box" to _uM(".container " to _uM("marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "search-value" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "marginBottom" to "24rpx")), "search-input" to _uM(".container .card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to 0, "paddingRight" to "25rpx", "paddingBottom" to 0, "paddingLeft" to "25rpx", "height" to "95rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#0f172a", "fontSize" to "30rpx")), "scan-btn" to _uM(".container .card-box .search-value " to _uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7")), "order-list" to _uM(".container " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "40rpx", "paddingLeft" to "24rpx", "minHeight" to "700rpx")), "empty-state" to _uM(".container .order-list " to _uM("display" to "flex", "justifyContent" to "center", "alignItems" to "center", "paddingTop" to "200rpx")), "empty-text" to _uM(".container .order-list .empty-state " to _uM("fontSize" to "28rpx", "color" to "#999999")), "order-card" to _uM(".container .order-list .orders-container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "marginBottom" to "24rpx", "boxShadow" to "0 2rpx 12rpx rgba(0, 0, 0, 0.04)")), "order-header" to _uM(".container .order-list .orders-container .order-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingBottom" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f2f6", "marginBottom" to "20rpx")), "package-name" to _uM(".container .order-list .orders-container .order-card .order-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "status-tag" to _uM(".container .order-list .orders-container .order-card .order-header " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "backgroundColor" to "#f3f4f6", "color" to "#6b7280")), "status-completed" to _uM(".container .order-list .orders-container .order-card .order-header .status-tag " to _uM("backgroundColor" to "#e8f5e9", "color" to "#2e7d32")), "status-pending" to _uM(".container .order-list .orders-container .order-card .order-header .status-tag " to _uM("backgroundColor" to "#fff3e0", "color" to "#ed6c02")), "status-refunded" to _uM(".container .order-list .orders-container .order-card .order-header .status-tag " to _uM("backgroundColor" to "#fce4ec", "color" to "#c62828")), "status-cancelled" to _uM(".container .order-list .orders-container .order-card .order-header .status-tag " to _uM("backgroundColor" to "#eeeeee", "color" to "#757575")), "order-details" to _uM(".container .order-list .orders-container .order-card " to _uM("marginBottom" to "20rpx")), "detail-row" to _uM(".container .order-list .orders-container .order-card .order-details " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "16rpx")), "detail-label" to _uM(".container .order-list .orders-container .order-card .order-details .detail-row " to _uM("width" to "100rpx", "fontSize" to "26rpx", "color" to "#9ca3af", "flexShrink" to 0)), "detail-value" to _uM(".container .order-list .orders-container .order-card .order-details .detail-row " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "26rpx", "color" to "#374151")), "order-footer" to _uM(".container .order-list .orders-container .order-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx")), "price" to _uM(".container .order-list .orders-container .order-card .order-footer " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#ef4444", "marginRight" to "20rpx")), "pay-btn" to _uM(".container .order-list .orders-container .order-card .order-footer " to _uM("backgroundImage" to "none", "backgroundColor" to "#eff6ff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#bfdbfe", "borderRightColor" to "#bfdbfe", "borderBottomColor" to "#bfdbfe", "borderLeftColor" to "#bfdbfe", "color" to "#2563eb", "fontSize" to "24rpx", "paddingTop" to "10rpx", "paddingRight" to "25rpx", "paddingBottom" to "10rpx", "paddingLeft" to "25rpx", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx", "fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
