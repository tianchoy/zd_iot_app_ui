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
import io.dcloud.uniapp.extapi.getEnterOptionsSync as uni_getEnterOptionsSync
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesOrderDetailOrderDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesOrderDetailOrderDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesOrderDetailOrderDetail
            val _cache = __ins.renderCache
            val showPopup = ref(false)
            val currentPrice = ref(0)
            val orderId = ref("")
            val payChannelId = ref("")
            val isFromPaySuccess = ref(false)
            val isInPaymentProcess = ref(false)
            val orderDetail = ref(_uO("orderNo" to "", "rechargeNo" to "", "pkgName" to "", "pkgCategory" to "", "pkgType" to "", "pkgFlow" to 0, "validityPeriod" to "", "startDate" to "", "endDate" to "", "status" to "", "pkgRefundStatus" to "", "orderAmount" to 0, "payAmount" to 0, "orderCreateTime" to "", "payTime" to "", "refunds" to _uA<Any>(), "cancelTime" to "", "payFailTime" to "", "payFailReason" to "", "usageInstructions" to "", "currentSeconds" to 0) as Any)
            fun gen_d_fn(key: String): Any {
                val kVal = (orderDetail.value as UTSJSONObject)[key]
                return kVal as Any
            }
            val d = ::gen_d_fn
            fun gen_ds_fn(key: String): String {
                val kVal = (orderDetail.value as UTSJSONObject)[key]
                return if (kVal != null) {
                    (kVal as String)
                } else {
                    ""
                }
            }
            val ds = ::gen_ds_fn
            fun gen_getDisplayAmount_fn(): Number {
                val detail = orderDetail.value as UTSJSONObject
                val pay = detail["payAmount"] as Number
                val order = detail["orderAmount"] as Number
                return if (pay != null) {
                    pay
                } else {
                    if (order != null) {
                        order
                    } else {
                        0
                    }
                }
            }
            val getDisplayAmount = ::gen_getDisplayAmount_fn
            fun gen_getRefunds_fn(): UTSArray<Any> {
                val detail = orderDetail.value as UTSJSONObject
                val list = detail["refunds"] as UTSArray<Any>
                return if (list != null) {
                    list
                } else {
                    _uA()
                }
            }
            val getRefunds = ::gen_getRefunds_fn
            fun gen_getRefundValue_fn(item: Any, key: String): String {
                val kVal = (item as UTSJSONObject)[key]
                return if (kVal != null) {
                    (kVal as String)
                } else {
                    ""
                }
            }
            val getRefundValue = ::gen_getRefundValue_fn
            fun gen_getCurrentSeconds_fn(): Number {
                val detail = orderDetail.value as UTSJSONObject
                val sec = detail["currentSeconds"] as Number
                return if (sec != null) {
                    sec
                } else {
                    0
                }
            }
            val getCurrentSeconds = ::gen_getCurrentSeconds_fn
            val getOrderStatusText = fun(status: String): String {
                val statusMap = Map<String, String>()
                statusMap.set("0", "待支付")
                statusMap.set("1", "已完成")
                statusMap.set("2", "已取消")
                statusMap.set("3", "支付失败")
                statusMap.set("4", "部分退款")
                statusMap.set("5", "全部退款")
                return statusMap.get(status) ?: status ?: "未知"
            }
            val getOrderStatusType = fun(status: String): String {
                val typeMap = Map<String, String>()
                typeMap.set("0", "success")
                typeMap.set("1", "primary")
                typeMap.set("2", "warning")
                typeMap.set("3", "error")
                typeMap.set("4", "error")
                typeMap.set("5", "error")
                return typeMap.get(status) ?: "primary"
            }
            val getPkgCategoryText = fun(): String {
                val detail = orderDetail.value as UTSJSONObject
                val category = detail["pkgCategory"] as String
                when (category) {
                    "1" -> 
                        return "日包"
                    "2" -> 
                        return "非自然月包"
                    "3" -> 
                        return "自然月包"
                    else -> 
                        return if (category != "") {
                            category
                        } else {
                            "-"
                        }
                }
            }
            val getPaymentMethod = fun(): String {
                if (isWechat()) {
                    return "微信小程序支付"
                }
                if (isH5()) {
                    return "H5支付"
                }
                return ""
            }
            val choosePayment = fun(){
                val detail = orderDetail.value as UTSJSONObject
                val payAmount = detail["payAmount"] as Number
                val orderAmount = detail["orderAmount"] as Number
                currentPrice.value = if (payAmount != null) {
                    payAmount
                } else {
                    if (orderAmount != null) {
                        orderAmount
                    } else {
                        0
                    }
                }
                showPopup.value = true
            }
            val getOrderDetail = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (!(orderId.value != "")) {
                            return@w1
                        }
                        try {
                            val res = await(queryOrderDetail(orderId.value))
                            if (res.code == 200) {
                                orderDetail.value = res.data
                            } else {
                                uni_showToast(ShowToastOptions(title = if (res.msg != "") {
                                    res.msg
                                } else {
                                    "查询订单详情失败"
                                }
                                , icon = "none"))
                            }
                        }
                         catch (error: Throwable) {
                            console.error("查询订单详情失败:", error, " at pages/orderDetail/orderDetail.uvue:303")
                            uni_showToast(ShowToastOptions(title = "网络错误，请稍后重试", icon = "none"))
                        }
                })
            }
            val handleCountDownFinish = fun(){
                uni_showToast(ShowToastOptions(title = "支付已过期，请重新下单", icon = "none", duration = 1000))
                getOrderDetail()
            }
            val handleCancelPayment = fun(){
                showPopup.value = false
            }
            val toPay = fun(data: UTSJSONObject){
                if (!(data != null)) {
                    return
                }
                orderId.value = data["orderId"] as String
                payChannelId.value = data["payChannelId"] as String
                isInPaymentProcess.value = true
            }
            val handleConfirmPayment = fun(e: UTSJSONObject): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        showPopup.value = false
                        try {
                            val res = await(goPayXcx(orderId.value))
                            if (res.code == 200) {
                                toPay(res.data as UTSJSONObject)
                            } else {
                                uni_showToast(ShowToastOptions(title = if (res.msg != "") {
                                    res.msg
                                } else {
                                    "支付失败"
                                }
                                , icon = "none"))
                            }
                        }
                         catch (error: Throwable) {
                            console.error("支付失败:", error, " at pages/orderDetail/orderDetail.uvue:435")
                            uni_showToast(ShowToastOptions(title = "支付失败，请稍后重试", icon = "none"))
                        }
                })
            }
            val onPopupClose = fun(){
                showPopup.value = false
            }
            val handleBack = fun(){
                val pages = getCurrentPages()
                if (pages.length > 1) {
                    uni_navigateBack(null)
                } else {
                    uni_reLaunch(ReLaunchOptions(url = "/pages/card/card"))
                }
            }
            onLoad(fun(options){
                val orderNo = options?.get("orderNo") as String?
                if (orderNo != null) {
                    orderId.value = orderNo
                    if (options?.get("from") === "paySuccess") {
                        isFromPaySuccess.value = true
                    }
                    getOrderDetail()
                }
            }
            )
            onShow(fun(){
                if (isFromPaySuccess.value) {
                    isFromPaySuccess.value = false
                    return
                }
                if (!isInPaymentProcess.value) {
                    return
                }
                var options = uni_getEnterOptionsSync()
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                val _component_rice_divider = resolveEasyComponent("rice-divider", GenUniModulesRiceUiComponentsRiceDividerRiceDividerClass)
                val _component_rice_count_down = resolveEasyComponent("rice-count-down", GenUniModulesRiceUiComponentsRiceCountDownRiceCountDownClass)
                val _component_rice_popup = resolveEasyComponent("rice-popup", GenUniModulesRiceUiComponentsRicePopupRicePopupClass)
                return _cE(Fragment, null, _uA(
                    _cE("view", _uM("style" to _nS(_uM("height" to "100%"))), _uA(
                        _cV(_component_topNavBar, _uM("title" to "订单详情", "onBack" to handleBack, "show-back" to true, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                        _cE("scroll-view", _uM("class" to "container", "scroll-y" to "", "enhanced" to true), _uA(
                            _cE("view", _uM("class" to "package-card"), _uA(
                                if (isTrue(d("pkgName"))) {
                                    _cE("view", _uM("key" to 0, "class" to "package-header"), _uA(
                                        _cE("text", _uM("class" to "package-name"), _tD(d("pkgName")), 1),
                                        _cV(_component_rice_tag, _uM("type" to getOrderStatusType(ds("status")), "text" to getOrderStatusText(ds("status")), "round" to true, "plain-fill" to "", "size" to "small"), null, 8, _uA(
                                            "type",
                                            "text"
                                        ))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("rechargeNo"))) {
                                    _cE("view", _uM("key" to 1, "class" to "card-number-row"), _uA(
                                        _cE("text", _uM("class" to "card-number-label"), "充值号："),
                                        _cE("text", _uM("class" to "card-number"), _tD(d("rechargeNo")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            )),
                            _cE("view", _uM("class" to "info-card"), _uA(
                                if (isTrue(d("orderNo"))) {
                                    _cE("view", _uM("key" to 0, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "订单编号"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("orderNo")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("iccid"))) {
                                    _cE("view", _uM("key" to 1, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "ICCID"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("iccid")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("orderAmount"))) {
                                    _cE("view", _uM("key" to 2, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "支付金额"),
                                        _cE("text", _uM("class" to "info-value price"), "¥" + _tD(getDisplayAmount()), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("orderStatus"))) {
                                    _cE("view", _uM("key" to 3, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "订单状态"),
                                        _cE("text", _uM("class" to "info-value status"), _tD(getOrderStatusText(ds("status"))), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("payMethod"))) {
                                    _cE("view", _uM("key" to 4, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "支付方式"),
                                        _cE("text", _uM("class" to "info-value"), _tD(getPaymentMethod()), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("orderCreateTime"))) {
                                    _cE("view", _uM("key" to 5, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "下单时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("orderCreateTime")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("payTime"))) {
                                    _cE("view", _uM("key" to 6, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "支付时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("payTime")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("payFailReason"))) {
                                    _cE("view", _uM("key" to 7, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "支付失败原因"),
                                        _cE("text", _uM("class" to "info-value status-fail"), _tD(d("payFailReason")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("cancelTime"))) {
                                    _cE("view", _uM("key" to 8, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "取消时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("cancelTime")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                _cV(_component_rice_divider),
                                if (isTrue(d("pkgCategory"))) {
                                    _cE("view", _uM("key" to 9, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "套餐类型"),
                                        _cE("text", _uM("class" to "info-value"), _tD(getPkgCategoryText()), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("pkgFlow"))) {
                                    _cE("view", _uM("key" to 10, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "套餐流量"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("pkgFlow")) + " GB", 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("validityPeriod"))) {
                                    _cE("view", _uM("key" to 11, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "有效期"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("validityPeriod")) + _tD(if (d("pkgType") == "1") {
                                            "天"
                                        } else {
                                            "个月"
                                        }), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("startDate"))) {
                                    _cE("view", _uM("key" to 12, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "生效时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("startDate")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("endDate"))) {
                                    _cE("view", _uM("key" to 13, "class" to "info-row"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "失效时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("endDate")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (getRefunds().length > 0) {
                                    _cV(_component_rice_divider, _uM("key" to 14, "dashed" to "", "customStyle" to _uO("margin" to "0")))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (getRefunds().length > 0) {
                                    _cE(Fragment, _uM("key" to 15), RenderHelpers.renderList(getRefunds(), fun(item, index, __index, _cached): Any {
                                        return _cE("view", _uM("class" to "info-refunds", "key" to index), _uA(
                                            _cE("view", _uM("class" to "times"), _uA(
                                                _cE("text", _uM("class" to "info-label"), "退款时间"),
                                                _cE("text", _uM("class" to "info-value"), _tD(getRefundValue(item, "refundTime")), 1)
                                            )),
                                            _cE("view", _uM("class" to "money"), _uA(
                                                _cE("text", _uM("class" to "info-label"), "退款金额"),
                                                _cE("text", _uM("class" to "info-value"), "¥" + _tD(getRefundValue(item, "refundAmount")), 1)
                                            ))
                                        ))
                                    }), 128)
                                } else {
                                    _cC("v-if", true)
                                }
                            )),
                            _cE("view", _uM("class" to "bottom-placeholder"))
                        )),
                        if (d("status") === "0") {
                            _cE("view", _uM("key" to 0, "class" to "bottom-bar"), _uA(
                                _cE("view", _uM("class" to "amount-section"), _uA(
                                    _cE("text", _uM("class" to "amount-label"), "待支付金额"),
                                    _cE("text", _uM("class" to "amount-value"), "¥" + _tD(getDisplayAmount()), 1)
                                )),
                                _cE("view", _uM("class" to "amount-time"), _uA(
                                    _cE("text", _uM("class" to "amount-label"), "支付剩余时间"),
                                    _cV(_component_rice_count_down, _uM("time" to (getCurrentSeconds() * 1000), "font-size" to "28rpx", "color" to "#f56c6c", "onFinish" to handleCountDownFinish), null, 8, _uA(
                                        "time"
                                    ))
                                )),
                                _cE("view", _uM("class" to "pay-button", "onClick" to choosePayment), _uA(
                                    _cE("text", _uM("class" to "pay-button-text"), "去支付")
                                ))
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                    ), 4),
                    _cV(_component_rice_popup, _uM("show" to unref(showPopup), "onUpdate:show" to fun(`$event`: Boolean){
                        trySetRefValue(showPopup, `$event`)
                    }
                    , "position" to "bottom", "onClose" to onPopupClose), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(unref(GenComponentsPaymentClass), _uM("amount" to unref(currentPrice), "onCancel" to handleCancelPayment, "onConfirm" to handleConfirmPayment, "cardNumber" to d("rechargeNo"), "," to "", "productName" to d("pkgName"), "traffic" to d("pkgFlow"), "validityPeriod" to d("validityPeriod"), "pkgType" to d("pkgType")), null, 8, _uA(
                                "amount",
                                "cardNumber",
                                "productName",
                                "traffic",
                                "validityPeriod",
                                "pkgType"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "show"
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
                return _uM("container" to _pS(_uM("backgroundColor" to "#f4f7fb", "height" to "100%", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "boxSizing" to "border-box")), "package-card" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "24rpx")), "package-header" to _uM(".package-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "16rpx")), "package-name" to _uM(".package-card .package-header " to _uM("fontSize" to "36rpx", "fontWeight" to 600, "color" to "#1f2937")), "status-tag" to _uM(".package-card .package-header " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "fontWeight" to 500), ".package-card .package-header .status-pending" to _uM("backgroundColor" to "#fff3e0", "color" to "#ed6c02"), ".package-card .package-header .status-completed" to _uM("backgroundColor" to "#e8f5e9", "color" to "#2e7d32"), ".package-card .package-header .status-refunded" to _uM("backgroundColor" to "#fce4ec", "color" to "#c62828"), ".package-card .package-header .status-cancelled" to _uM("backgroundColor" to "#eeeeee", "color" to "#757575")), "card-number-row" to _uM(".package-card " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "card-number-label" to _uM(".package-card .card-number-row " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")), "card-number" to _uM(".package-card .card-number-row " to _uM("fontSize" to "28rpx", "color" to "#374151", "fontWeight" to 500)), "info-card" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "24rpx")), "section-header" to _uM(".info-card " to _uM("marginBottom" to "24rpx", "paddingBottom" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f2f6")), "section-title" to _uM(".info-card .section-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "info-row" to _uM(".info-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "info-label" to _uM(".info-card .info-row " to _uM("fontSize" to "28rpx", "color" to "#64748b")), "info-value" to _uM(".info-card .info-row " to _uM("fontSize" to "28rpx", "color" to "#374151", "textAlign" to "right"), ".info-card .info-row .price" to _uM("fontSize" to "36rpx", "fontWeight" to "bold", "color" to "#ef4444"), ".info-card .info-row .status-fail" to _uM("color" to "#ef4444")), "info-refunds" to _uM(".info-card " to _uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "times" to _uM(".info-card .info-refunds " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginTop" to "10rpx", "marginRight" to 0, "marginBottom" to "10rpx", "marginLeft" to 0, "fontSize" to "24rpx", "color" to "#64748b")), "money" to _uM(".info-card .info-refunds " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginTop" to "10rpx", "marginRight" to 0, "marginBottom" to "10rpx", "marginLeft" to 0, "fontSize" to "24rpx", "color" to "#64748b")), "bottom-placeholder" to _pS(_uM("height" to "140rpx")), "bottom-bar" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "backgroundColor" to "#ffffff", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "24rpx", "paddingRight" to "32rpx", "paddingBottom" to "24rpx", "paddingLeft" to "32rpx", "boxShadow" to "0 -4rpx 20rpx rgba(0, 0, 0, 0.05)")), "amount-section" to _uM(".bottom-bar " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start")), "amount-label" to _uM(".bottom-bar .amount-section " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginRight" to "16rpx"), ".bottom-bar .amount-section .amount-value " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginRight" to "16rpx"), ".bottom-bar .amount-time " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginRight" to "16rpx")), "amount-value" to _uM(".bottom-bar .amount-section " to _uM("fontSize" to "48rpx", "fontWeight" to "bold", "color" to "#ef4444")), "amount-time" to _uM(".bottom-bar " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "flex-end")), "pay-button" to _uM(".bottom-bar " to _uM("backgroundColor" to "#2563eb", "paddingTop" to "20rpx", "paddingRight" to "40rpx", "paddingBottom" to "20rpx", "paddingLeft" to "40rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "pay-button-text" to _uM(".bottom-bar .pay-button " to _uM("color" to "#ffffff", "fontSize" to "30rpx", "fontWeight" to 500)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
