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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesOrderRecordOrderRecord : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesOrderRecordOrderRecord) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesOrderRecordOrderRecord
            val _cache = __ins.renderCache
            val rechargeNo = ref<String>("")
            val tabs = ref(_uA<OrderStatusTab__1>(OrderStatusTab__1(name = "全部", value = ""), OrderStatusTab__1(name = "待支付", value = "0"), OrderStatusTab__1(name = "已完成", value = "1"), OrderStatusTab__1(name = "已退款", value = "5"), OrderStatusTab__1(name = "已取消", value = "2")))
            val current = ref<Number>(0)
            val card_number = ref<String>("")
            val orderList = ref(_uA<OrderListXcxItem>())
            val getStatusText = fun(status: String): String {
                when (status) {
                    "0" -> 
                        return "待支付"
                    "1" -> 
                        return "已完成"
                    "2" -> 
                        return "已取消"
                    "3" -> 
                        return "支付失败"
                    "4" -> 
                        return "部分退款"
                    "5" -> 
                        return "全部退款"
                    else -> 
                        return "未知状态"
                }
            }
            val getOrderList = fun(status: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        try {
                            val params: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("params", "pages/orderRecord/orderRecord.uvue", 116, 10), "rechargeNo" to rechargeNo.value)
                            if (status !== "") {
                                params["status"] = status
                            }
                            val resp = await(queryOrderList(params))
                            if (resp.code == 200) {
                                if (isTruthy(resp.rows) && UTSArray.isArray(resp.rows)) {
                                    orderList.value = resp.rows as UTSArray<OrderListXcxItem>
                                } else if (resp.data != null && UTSArray.isArray(resp.data)) {
                                    orderList.value = resp.data as UTSArray<OrderListXcxItem>
                                } else {
                                    orderList.value = _uA()
                                }
                            } else {
                                orderList.value = _uA()
                                uni_showToast(ShowToastOptions(title = if (resp.msg != "") {
                                    resp.msg
                                } else {
                                    "获取订单列表失败"
                                }
                                , icon = "none"))
                            }
                        }
                         catch (error: Throwable) {
                            console.error("获取订单列表失败:", error, " at pages/orderRecord/orderRecord.uvue:139")
                            orderList.value = _uA()
                            uni_showToast(ShowToastOptions(title = "网络错误，请稍后重试", icon = "none"))
                        }
                })
            }
            val handleTabClick = fun(e: UTSJSONObject){
                console.log(e, " at pages/orderRecord/orderRecord.uvue:150")
                val index = e["index"] as Number
                current.value = index
                getOrderList(e["value"] as String)
            }
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "0" -> 
                        return "success"
                    "1" -> 
                        return "primary"
                    "2" -> 
                        return "warning"
                    "3" -> 
                        return "error"
                    "4" -> 
                        return "error"
                    "5" -> 
                        return "error"
                    else -> 
                        return ""
                }
            }
            val handleOrderClick = fun(order: Any){
                uni_navigateTo(NavigateToOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + (order as UTSJSONObject)["id"]))
            }
            val handleBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val handlePay = fun(order: Any){
                val o = order as UTSJSONObject
                console.log("去支付:", order, " at pages/orderRecord/orderRecord.uvue:193")
                if (isWechat()) {
                    uni_showToast(ShowToastOptions(title = "支付订单 " + o["id"], icon = "none"))
                    uni_navigateTo(NavigateToOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + o["id"]))
                }
                if (isH5()) {
                    uni_navigateTo(NavigateToOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + o["id"]))
                }
            }
            onLoad(fun(options: UTSJSONObject){
                rechargeNo.value = options["rechargeNo"] as String
                getOrderList("")
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "我的订单", "show-back" to true, "onBack" to handleBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cV(_component_rice_tabs, _uM("modelValue" to current.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                current.value = `$event`
                            }
                            , "line-color" to "#ffffff", "list" to tabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "title-inactive-color" to "#334155", "onChange" to handleTabClick, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue",
                                "list"
                            ))
                        )),
                        _cE("scroll-view", _uM("class" to "order-list", "scroll-y" to "", "enhanced" to true, "show-scrollbar" to false), _uA(
                            if (orderList.value.length === 0) {
                                _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                    _cE("text", _uM("class" to "empty-text"), "暂无订单")
                                ))
                            } else {
                                _cE("view", _uM("key" to 1, "class" to "orders-container"), _uA(
                                    _cE(Fragment, null, RenderHelpers.renderList(orderList.value, fun(order, index, __index, _cached): Any {
                                        return _cE("view", _uM("key" to index, "class" to "order-card", "onClick" to fun(){
                                            handleOrderClick(order)
                                        }
                                        ), _uA(
                                            _cE("view", _uM("class" to "order-header"), _uA(
                                                if (isTrue(order.pkgName)) {
                                                    _cE("text", _uM("key" to 0, "class" to "package-name"), _tD(order.pkgName), 1)
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                                ,
                                                if (isTrue(order.status)) {
                                                    _cV(_component_rice_tag, _uM("key" to 1, "text" to getStatusText(order.status), "round" to true, "plain-fill" to "", "size" to "small", "type" to getStatusClass(order.status)), null, 8, _uA(
                                                        "text",
                                                        "type"
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                            )),
                                            _cE("view", _uM("class" to "order-details"), _uA(
                                                if (isTrue(order.orderNo)) {
                                                    _cE("view", _uM("key" to 0, "class" to "detail-row"), _uA(
                                                        _cE("text", _uM("class" to "detail-label"), "订单号"),
                                                        _cE("text", _uM("class" to "detail-value"), _tD(order.orderNo), 1)
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                                ,
                                                if (isTrue(order.cardNo)) {
                                                    _cE("view", _uM("key" to 1, "class" to "detail-row"), _uA(
                                                        _cE("text", _uM("class" to "detail-label"), "卡号"),
                                                        _cE("text", _uM("class" to "detail-value"), _tD(order.cardNo), 1)
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                                ,
                                                if (isTrue(order.iccid)) {
                                                    _cE("view", _uM("key" to 2, "class" to "detail-row"), _uA(
                                                        _cE("text", _uM("class" to "detail-label"), "ICCID"),
                                                        _cE("text", _uM("class" to "detail-value"), _tD(order.iccid), 1)
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                                ,
                                                _cE("view", _uM("class" to "detail-row last"), _uA(
                                                    if (isTrue(order.createTime)) {
                                                        _cE("text", _uM("key" to 0, "class" to "detail-value"), _tD(order.createTime), 1)
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                    ,
                                                    _cE("view", _uM("class" to "order-footer"), _uA(
                                                        _cE("text", _uM("class" to "price"), "¥" + _tD(order.payCurrencyAmount), 1),
                                                        if (order.status === "0") {
                                                            _cE("text", _uM("key" to 0, "class" to "pay-btn", "onClick" to withModifiers(fun(){
                                                                handlePay(order)
                                                            }, _uA(
                                                                "stop"
                                                            ))), "去支付", 8, _uA(
                                                                "onClick"
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ))
                                            ))
                                        ), 8, _uA(
                                            "onClick"
                                        ))
                                    }
                                    ), 128)
                                ))
                            }
                        ))
                    ))
                ), 64)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("backgroundColor" to "#f4f7fb", "height" to "100%", "display" to "flex", "flexDirection" to "column")), "card-box" to _uM(".container " to _uM("marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "search-value" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "marginBottom" to "24rpx")), "search-input" to _uM(".container .card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to 0, "paddingRight" to "25rpx", "paddingBottom" to 0, "paddingLeft" to "25rpx", "height" to "95rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#0f172a", "fontSize" to "30rpx")), "scan-btn" to _uM(".container .card-box .search-value " to _uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7")), "order-list" to _uM(".container " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "40rpx", "paddingLeft" to "24rpx", "minHeight" to "700rpx")), "empty-state" to _uM(".container .order-list " to _uM("display" to "flex", "justifyContent" to "center", "alignItems" to "center", "paddingTop" to "200rpx")), "empty-text" to _uM(".container .order-list .empty-state " to _uM("fontSize" to "28rpx", "color" to "#999999")), "order-card" to _uM(".container .order-list .orders-container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "marginBottom" to "24rpx", "boxShadow" to "0 2rpx 12rpx rgba(0, 0, 0, 0.04)")), "order-header" to _uM(".container .order-list .orders-container .order-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingBottom" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f2f6", "marginBottom" to "20rpx")), "package-name" to _uM(".container .order-list .orders-container .order-card .order-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "detail-row" to _uM(".container .order-list .orders-container .order-card .order-details " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "16rpx")), "detail-label" to _uM(".container .order-list .orders-container .order-card .order-details .detail-row " to _uM("width" to "100rpx", "fontSize" to "26rpx", "color" to "#9ca3af", "flexShrink" to 0)), "detail-value" to _uM(".container .order-list .orders-container .order-card .order-details .detail-row " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "26rpx", "color" to "#374151")), "last" to _uM(".container .order-list .orders-container .order-card .order-details " to _uM("marginBottom" to 0)), "order-footer" to _uM(".container .order-list .orders-container .order-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx")), "price" to _uM(".container .order-list .orders-container .order-card .order-footer " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#ef4444", "marginRight" to "20rpx")), "pay-btn" to _uM(".container .order-list .orders-container .order-card .order-footer " to _uM("backgroundImage" to "none", "backgroundColor" to "#eff6ff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#bfdbfe", "borderRightColor" to "#bfdbfe", "borderBottomColor" to "#bfdbfe", "borderLeftColor" to "#bfdbfe", "color" to "#2563eb", "fontSize" to "24rpx", "paddingTop" to "10rpx", "paddingRight" to "25rpx", "paddingBottom" to "10rpx", "paddingLeft" to "25rpx", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx", "fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
