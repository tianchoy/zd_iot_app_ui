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
import io.dcloud.uniapp.extapi.hideLoading as uni_hideLoading
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.redirectTo as uni_redirectTo
import io.dcloud.uniapp.extapi.requestPayment as uni_requestPayment
import io.dcloud.uniapp.extapi.showLoading as uni_showLoading
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesRechargeRecharge : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesRechargeRecharge) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesRechargeRecharge
            val _cache = __ins.renderCache
            val showPopup = ref<Boolean>(false)
            val isInPaymentProcess = ref<Boolean>(false)
            val showBack = ref<Boolean>(true)
            val cardDetail = ref<RechargeData?>(null)
            val percentage = computed<Number>(fun(): Number {
                val detail = cardDetail.value
                if (detail == null) {
                    return 0
                }
                val usedFlow = detail.usedPeriod
                val totalFlow = detail.pkgFlow
                if (usedFlow == null || totalFlow == null) {
                    return 0
                }
                val used = UTSNumber.parseFloat(usedFlow)
                val total = UTSNumber.parseFloat(totalFlow)
                if (total === 0) {
                    return 0
                }
                var percent = (used / total) * 100
                percent = Math.min(100, Math.max(0, percent))
                return Math.round(percent)
            }
            )
            val active = ref<Number>(0)
            val tabs = ref(_uA<Any>(_uO("name" to "套餐包"), _uO("name" to "加油包")))
            val packageList = ref(_uA<PkgXcxVo>())
            val refillList = ref(_uA<PkgXcxVo>())
            val selectedPackageIndex = ref<Number>(0)
            val selectedRefillIndex = ref<Number>(0)
            val selectedPackage = ref<PkgXcxVo?>(null)
            val currentPackage = computed<PkgXcxVo?>(fun(): PkgXcxVo? {
                if (active.value === 0) {
                    return packageList.value[selectedPackageIndex.value] ?: null
                }
                return refillList.value[selectedRefillIndex.value] ?: null
            }
            )
            val currentPrice = computed<String>(fun(): String {
                if (active.value === 0) {
                    val item = packageList.value[selectedPackageIndex.value]
                    return if (item != null) {
                        item.sellingPrice
                    } else {
                        "0.00"
                    }
                } else {
                    val item = refillList.value[selectedRefillIndex.value]
                    return if (item != null) {
                        item.sellingPrice
                    } else {
                        "0.00"
                    }
                }
            }
            )
            val classifyPackages = fun(packages: UTSArray<PkgXcxVo>){
                val packagesList: UTSArray<PkgXcxVo> = _uA()
                val refillsList: UTSArray<PkgXcxVo> = _uA()
                packages.forEach(fun(item, index){
                    if (item.pkgCategory == "3") {
                        packagesList.push(item)
                    } else if (item.pkgCategory == "4") {
                        refillsList.push(item)
                    }
                }
                )
                packageList.value = packagesList
                refillList.value = refillsList
                selectedPackageIndex.value = 0
                selectedRefillIndex.value = 0
            }
            val getOrderStatusType = fun(status: String): String {
                val typeMap = Map<String, String>()
                typeMap.set("在用", "success")
                typeMap.set("停机", "error")
                return typeMap.get(status) ?: "warning"
            }
            val changeTab = fun(e: TabEvent){
                active.value = e.index
            }
            val selectPackage = fun(index: Number, item: PkgXcxVo){
                selectedPackageIndex.value = index
                selectedPackage.value = item
            }
            val selectRefill = fun(index: Number){
                selectedRefillIndex.value = index
            }
            val choosePayment = fun(){
                if (active.value === 0 && packageList.value.length === 0) {
                    uni_showToast(ShowToastOptions(title = "暂无套餐包可选", icon = "none"))
                    return
                }
                if (active.value === 1 && refillList.value.length === 0) {
                    uni_showToast(ShowToastOptions(title = "暂无加油包可选", icon = "none"))
                    return
                }
                showPopup.value = true
            }
            val handleCancelPayment = fun(){
                showPopup.value = false
            }
            val orderId = ref<String>("")
            val payChannelId = ref<String>("")
            val toPay = fun(data: Any){
                if (!isTruthy(data)) {
                    return
                }
                val res = data as Any
                orderId.value = res.orderId
                payChannelId.value = res.payChannelId
                isInPaymentProcess.value = true
                if (res.payWxType == "wechat_pay") {
                    uni_requestPayment(RequestPaymentOptions(provider = "wxpay", timeStamp = res.timeStamp, nonceStr = res.nonceStr, `package` = res.`package`, paySign = res.paySign, signType = res.signType, success = fun(res){
                        console.log("微信支付成功", res, " at pages/recharge/recharge.uvue:309")
                        uni_hideLoading(null)
                        uni_redirectTo(RedirectToOptions(url = "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value))
                    }, fail = fun(res){
                        uni_hideLoading(null)
                        uni_showToast(ShowToastOptions(title = "微信支付失败，请您重新支付", icon = "none", duration = 1000))
                        setTimeout(fun(){
                            uni_reLaunch(ReLaunchOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + orderId.value))
                        }, 1000)
                        isInPaymentProcess.value = false
                    }))
                } else if (res.payWxType == "allin_pay") {
                    if (res.payWxClass == "0") {
                        uni_requestPayment(RequestPaymentOptions(timeStamp = res.timeStamp, nonceStr = res.nonceStr, `package` = res.`package`, paySign = res.paySign, signType = res.signType, success = fun(res) {
                            console.log("通联支付成功", res, " at pages/recharge/recharge.uvue:341")
                            uni_hideLoading(null)
                            uni_redirectTo(RedirectToOptions(url = "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value))
                        }, fail = fun(err) {
                            uni_hideLoading(null)
                            uni_showToast(ShowToastOptions(title = "通联支付失败，请您重新支付", icon = "none", duration = 1000))
                            setTimeout(fun(){
                                uni_reLaunch(ReLaunchOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + orderId.value))
                            }, 1000)
                            isInPaymentProcess.value = false
                        }))
                    } else {
                        var param: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("param", "pages/recharge/recharge.uvue", 364, 9), "cusid" to res.cusid, "appid" to res.appid, "orgid" to res.orgid, "version" to res.version, "trxamt" to res.trxamt, "reqsn" to res.reqsn, "notify_url" to res.notify_url, "body" to res.body, "remark" to res.remark, "randomstr" to res.randomstr, "paytype" to res.paytype, "signtype" to res.signtype, "sign" to res.sign)
                        wx.navigateToMiniProgram(_uO("appId" to config.api.auth.appID, "extraData" to param, "success" to fun(res) {
                            console.log("支付成功:", res, " at pages/recharge/recharge.uvue:384")
                        }
                        , "fail" to fun(res) {
                            console.log("支付失败:", res, " at pages/recharge/recharge.uvue:387")
                            uni_hideLoading(null)
                            isInPaymentProcess.value = false
                        }
                        ))
                    }
                }
            }
            val handleConfirmPayment = fun(e: Any): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        uni_showLoading(ShowLoadingOptions(title = "支付中..."))
                        showPopup.value = false
                        val currentItem = if (active.value === 0) {
                            packageList.value[selectedPackageIndex.value]
                        } else {
                            refillList.value[selectedRefillIndex.value]
                        }
                        try {
                            val res = await(addOrder(_uO("pkgId" to currentItem.pkgId, "rechargeNo" to cardNumber.value)))
                            if (res.code == 200) {
                                toPay(res.data)
                            } else {
                                uni_hideLoading(null)
                                uni_showToast(ShowToastOptions(title = if (res.msg != "") {
                                    res.msg
                                } else {
                                    "支付失败"
                                }
                                , icon = "none"))
                            }
                        }
                         catch (error: Throwable) {
                            console.error("添加订单失败:", error, " at pages/recharge/recharge.uvue:425")
                            uni_hideLoading(null)
                            uni_showToast(ShowToastOptions(title = "添加订单失败", icon = "none"))
                        }
                })
            }
            val onPopupClose = fun(){
                console.log("弹窗关闭", " at pages/recharge/recharge.uvue:435")
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val toMyPackage = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/myPkg/myPkg?card_number=" + cardNumber.value))
            }
            val toOrderRecord = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/orderRecord/orderRecord?rechargeNo=" + cardNumber.value))
            }
            val getCardDetail = fun(cardNumber: String, country: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        try {
                            val res = await(queryCardDetail(cardNumber, country, "0"))
                            if (res.code == 200) {
                                cardDetail.value = res.data as Any
                                if (res.data?.pkgXcxVos != null && res.data.pkgXcxVos.length > 0) {
                                    classifyPackages(res.data.pkgXcxVos as UTSArray<PkgXcxVo>)
                                }
                            }
                        }
                         catch (error: Throwable) {
                            console.error("获取卡片详情失败:", error, " at pages/recharge/recharge.uvue:468")
                            uni_showToast(ShowToastOptions(title = "获取卡片信息失败", icon = "none"))
                        }
                })
            }
            val cardNumber = ref<String>("")
            val country = ref<String>("")
            onLoad(fun(options: UTSJSONObject){
                console.log("options:", options, " at pages/recharge/recharge.uvue:479")
                val opt = options as Any
                val cardNumberValue = opt.cardNumber
                val countryValue = opt.country
                val from = opt.from
                showBack.value = isH5() && from == "h5Search"
                if (isTruthy(cardNumberValue)) {
                    cardNumber.value = cardNumberValue
                    country.value = countryValue ?: ""
                    getCardDetail(cardNumber.value, country.value)
                } else {
                    console.error("未获取到卡片号码", " at pages/recharge/recharge.uvue:492")
                    uni_showToast(ShowToastOptions(title = "卡片号码不存在", icon = "none"))
                }
            }
            )
            onShow(fun(){
                if (!isInPaymentProcess.value) {
                    return
                }
                var options = uni_getEnterOptionsSync()
                if (options.scene == "1038" && options.referrerInfo.appId == config.api.auth.appID) {
                    var extraData = options.referrerInfo.extraData
                    if (!isTruthy(extraData)) {
                        uni_hideLoading(null)
                        uni_showToast(ShowToastOptions(title = "支付取消，请您重新支付", icon = "none", duration = 1000))
                        isInPaymentProcess.value = false
                        return
                    } else {
                        if (extraData.code == "success") {
                            uni_hideLoading(null)
                            uni_showToast(ShowToastOptions(title = "支付成功", icon = "success", duration = 1000, success = fun(_) {
                                isInPaymentProcess.value = false
                                uni_redirectTo(RedirectToOptions(url = "/pages/paySuccess/paySuccess?orderId=" + orderId.value + "&payChannelId=" + payChannelId.value))
                            }))
                        } else if (extraData.code == "cancel") {
                            uni_hideLoading(null)
                            uni_showToast(ShowToastOptions(title = "支付取消，请您重新支付", icon = "none", duration = 1000))
                            setTimeout(fun(){
                                uni_reLaunch(ReLaunchOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + orderId.value))
                            }, 1000)
                            isInPaymentProcess.value = false
                            return
                        } else {
                            uni_hideLoading(null)
                            uni_showToast(ShowToastOptions(title = "支付失败，请您重新支付", icon = "none", duration = 1000))
                            isInPaymentProcess.value = false
                            return
                        }
                    }
                }
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                val _component_rice_progress = resolveEasyComponent("rice-progress", GenUniModulesRiceUiComponentsRiceProgressRiceProgressClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_block = resolveComponent("block")
                val _component_rice_popup = resolveEasyComponent("rice-popup", GenUniModulesRiceUiComponentsRicePopupRicePopupClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "充值首页", "show-back" to showBack.value, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false), null, 8, _uA(
                        "show-back"
                    )),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info"), _uA(
                            _cE("view", _uM("class" to "card-title"), _uA(
                                _cE("text", _uM("class" to "title"), "卡片信息"),
                                _cV(_component_rice_tag, _uM("text" to if (isTruthy(cardDetail.value?.statusStr)) {
                                    cardDetail.value?.statusStr
                                } else {
                                    "未知"
                                }
                                , "round" to true, "plain-fill" to "", "size" to "small", "type" to getOrderStatusType(cardDetail.value?.statusStr)), null, 8, _uA(
                                    "text",
                                    "type"
                                ))
                            )),
                            if (isTrue(cardDetail.value?.rechargeNo)) {
                                _cE("view", _uM("key" to 0, "class" to "card-number"), _tD(if (isTruthy(cardDetail.value?.rechargeNo)) {
                                    cardDetail.value?.rechargeNo
                                } else {
                                    "未知"
                                }), 1)
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to "info-list"), _uA(
                                if (isTrue(cardDetail.value?.pkgName)) {
                                    _cE("view", _uM("key" to 0, "class" to "info-item"), _uA(
                                        _cE("text", _uM("class" to "label"), "当前套餐"),
                                        _cE("text", _uM("class" to "value"), _tD(if (isTruthy(cardDetail.value?.pkgName)) {
                                            cardDetail.value?.pkgName
                                        } else {
                                            "未知"
                                        }), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            )),
                            _cE("view", _uM("class" to "flow-box"), _uA(
                                _cE("view", _uM("class" to "flow-label"), _uA(
                                    _cE("text", _uM("class" to "label"), "流量信息"),
                                    _cE("text", _uM("class" to "value"), "已用 " + _tD(if (isTruthy(cardDetail.value?.usedFlow)) {
                                        cardDetail.value?.usedFlow
                                    } else {
                                        0
                                    }
                                    ) + "GB / 剩余 " + _tD(if (isTruthy(cardDetail.value?.unUsedFlow)) {
                                        cardDetail.value?.unUsedFlow
                                    } else {
                                        0
                                    }
                                    ) + "GB / 总流量 " + _tD(if (isTruthy(cardDetail.value?.pkgFlow)) {
                                        cardDetail.value?.pkgFlow
                                    } else {
                                        0
                                    }
                                    ) + "GB", 1)
                                )),
                                _cV(_component_rice_progress, _uM("percentage" to percentage.value, "show-text" to ""), null, 8, _uA(
                                    "percentage"
                                ))
                            )),
                            _cE("view", _uM("class" to "card-bottom"), _uA(
                                _cV(_component_rice_button, _uM("class" to "btn mr-24", "onClick" to toMyPackage), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "卡片套餐"
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_rice_button, _uM("class" to "btn", "onClick" to toOrderRecord), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "订单记录"
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )),
                        _cE("view", _uM("class" to "pkg-box"), _uA(
                            _cV(_component_rice_tabs, _uM("modelValue" to active.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                active.value = `$event`
                            }
                            , "line-color" to "#ffffff", "list" to tabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "title-inactive-color" to "#64748b", "onChange" to changeTab, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue",
                                "list"
                            )),
                            _cE("view", _uM("class" to "pkg-content"), _uA(
                                if (active.value === 0) {
                                    _cV(_component_block, _uM("key" to 0), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(packageList.value, fun(item, index, __index, _cached): Any {
                                                return _cE("view", _uM("key" to if (item.pkgId != "") {
                                                    item.pkgId
                                                } else {
                                                    index
                                                }, "class" to _nC(_uA(
                                                    "pkg-card",
                                                    _uM("pkg-card-selected" to (selectedPackageIndex.value === index))
                                                )), "onClick" to fun(){
                                                    selectPackage(index, item)
                                                }), _uA(
                                                    _cE("view", _uM("class" to "pkg-info"), _uA(
                                                        _cE("view", _uM("class" to "pkg-name"), _uA(
                                                            _cE("text", _uM("class" to "pkg-title"), _tD(item.pkgName), 1),
                                                            if (isTrue(item.tag)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-tag"), _tD(item.tag), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        )),
                                                        _cE("view", _uM("class" to "pkg-desc"), _uA(
                                                            if (isTrue(item.pkgFlow)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-icon"), "流量 " + _tD(item.pkgFlow), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(item.validityPeriod)) {
                                                                _cE("text", _uM("key" to 1, "class" to "pkg-icon"), "有效期 " + _tD(item.validityPeriod) + _tD(if (item?.pkgType == "1") {
                                                                    "天"
                                                                } else {
                                                                    "个月"
                                                                }), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        ))
                                                    )),
                                                    _cE("view", _uM("class" to "pkg-price"), _uA(
                                                        _cE("view", _uM("class" to "price-wrapper"), _uA(
                                                            _cE("text", _uM("class" to "price-symbol"), "¥"),
                                                            _cE("text", _uM("class" to "price-number"), _tD(item.sellingPrice), 1)
                                                        )),
                                                        if (isTrue(if (item.crossedOutPrice != "") {
                                                            item.crossedOutPrice != item.sellingPrice
                                                        } else {
                                                            item.crossedOutPrice
                                                        })) {
                                                            _cE("view", _uM("key" to 0, "class" to "price-original"), " ¥" + _tD(item.crossedOutPrice), 1)
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ), 10, _uA(
                                                    "onClick"
                                                ))
                                            }), 128),
                                            if (packageList.value.length == 0) {
                                                _cE("view", _uM("key" to 0, "class" to "empty-state"), "暂无套餐包")
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        )
                                    }), "_" to 1))
                                } else {
                                    _cV(_component_block, _uM("key" to 1), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(refillList.value, fun(item, index, __index, _cached): Any {
                                                return _cE("view", _uM("key" to if (item.pkgId != "") {
                                                    item.pkgId
                                                } else {
                                                    index
                                                }
                                                , "class" to _nC(_uA(
                                                    "pkg-card",
                                                    _uM("pkg-card-selected" to (selectedRefillIndex.value == index))
                                                )), "onClick" to fun(){
                                                    selectRefill(index)
                                                }
                                                ), _uA(
                                                    _cE("view", _uM("class" to "pkg-info"), _uA(
                                                        _cE("view", _uM("class" to "pkg-name"), _uA(
                                                            _cE("text", _uM("class" to "pkg-title"), _tD(item.pkgName), 1),
                                                            if (isTrue(item.tag)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-tag"), _tD(item.tag), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        )),
                                                        _cE("view", _uM("class" to "pkg-desc"), _uA(
                                                            if (isTrue(item.pkgFlow)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-icon"), "流量 " + _tD(item.pkgFlow), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                            ,
                                                            if (isTrue(item.validityPeriod)) {
                                                                _cE("text", _uM("key" to 1, "class" to "pkg-icon"), "有效期 " + _tD(item.validityPeriod) + _tD(if (item?.pkgType == "1") {
                                                                    "天"
                                                                } else {
                                                                    "个月"
                                                                }), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        ))
                                                    )),
                                                    _cE("view", _uM("class" to "pkg-price"), _uA(
                                                        _cE("view", _uM("class" to "price-wrapper"), _uA(
                                                            _cE("text", _uM("class" to "price-symbol"), "¥"),
                                                            _cE("text", _uM("class" to "price-number"), _tD(item.sellingPrice), 1)
                                                        )),
                                                        if (isTrue(if (item.crossedOutPrice != "") {
                                                            item.crossedOutPrice != item.sellingPrice
                                                        } else {
                                                            item.crossedOutPrice
                                                        }
                                                        )) {
                                                            _cE("view", _uM("key" to 0, "class" to "price-original"), " ¥" + _tD(item.crossedOutPrice), 1)
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ), 10, _uA(
                                                    "onClick"
                                                ))
                                            }
                                            ), 128),
                                            if (refillList.value.length == 0) {
                                                _cE("view", _uM("key" to 0, "class" to "empty-state"), "暂无加油包")
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        )
                                    }
                                    ), "_" to 1))
                                }
                            ))
                        ))
                    )),
                    _cV(_component_rice_popup, _uM("show" to showPopup.value, "onUpdate:show" to fun(`$event`: Boolean){
                        showPopup.value = `$event`
                    }
                    , "position" to "bottom", "onClose" to onPopupClose), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(unref(GenComponentsPaymentClass), _uM("amount" to currentPrice.value, "onCancel" to handleCancelPayment, "onConfirm" to handleConfirmPayment, "cardNumber" to cardDetail.value?.rechargeNo, "productName" to currentPackage.value?.pkgName, "traffic" to currentPackage.value?.pkgFlow, "validityPeriod" to currentPackage.value?.validityPeriod, "pkgType" to currentPackage.value?.pkgType), null, 8, _uA(
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
                        "show",
                        "onUpdate:show"
                    )),
                    if (isTrue(packageList.value.length > 0 || refillList.value.length > 0)) {
                        _cE("view", _uM("key" to 0, "class" to "bottom-box"), _uA(
                            _cE("view", _uM("class" to "price-box"), _uA(
                                _cE("text", _uM("class" to "price-label"), "当前套餐金额"),
                                _cE("text", _uM("class" to "price-value"), "¥" + _tD(currentPrice.value), 1)
                            )),
                            _cV(_component_rice_button, _uM("type" to "primary", "width" to "300rpx", "height" to "110rpx", "onClick" to choosePayment, "class" to "btn"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                return _uA(
                                    "去支付"
                                )
                            }), "_" to 1))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "card-info" to _uM(".container " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx")), "card-title" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "title" to _uM(".container .card-info .card-title " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "card-number" to _uM(".container .card-info " to _uM("color" to "#47556A", "fontSize" to "32rpx", "marginTop" to "24rpx")), "info-list" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "column")), "info-item" to _uM(".container .card-info .info-list " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0)), "label" to _uM(".container .card-info .info-list .info-item " to _uM("color" to "#64748b", "marginRight" to "20rpx", "fontSize" to "24rpx")), "value" to _uM(".container .card-info .info-list .info-item " to _uM("fontWeight" to "bold", "whiteSpace" to "pre-wrap", "lineHeight" to 1.5, "fontSize" to "24rpx")), "flow-box" to _uM(".container .card-info " to _uM("marginTop" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "flow-label" to _uM(".container .card-info .flow-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx")), "card-bottom" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginTop" to "24rpx")), "btn" to _uM(".container .card-info .card-bottom " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "pkg-box" to _uM(".container " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to "24rpx", "marginRight" to "24rpx", "marginBottom" to "120rpx", "marginLeft" to "24rpx")), "pkg-content" to _uM(".container " to _uM("marginTop" to "24rpx", "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "pkg-card" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "28rpx", "paddingRight" to "24rpx", "paddingBottom" to "28rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx", "transitionProperty" to "all", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease")), "pkg-info" to _uM(".container .pkg-card " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "pkg-name" to _uM(".container .pkg-card .pkg-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "12rpx", "flexWrap" to "wrap")), "pkg-title" to _uM(".container .pkg-card .pkg-info .pkg-name " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#1e293b")), "pkg-tag" to _uM(".container .pkg-card .pkg-info .pkg-name " to _uM("backgroundImage" to "linear-gradient(135deg, #ff9a3c, #ff6b3c)", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#ffffff", "fontSize" to "20rpx", "paddingTop" to "4rpx", "paddingRight" to "16rpx", "paddingBottom" to "4rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginLeft" to "12rpx")), "pkg-desc" to _uM(".container .pkg-card .pkg-info " to _uM("display" to "flex", "flexDirection" to "row", "fontSize" to "24rpx", "color" to "#64748b")), "pkg-icon" to _uM(".container .pkg-card .pkg-info .pkg-desc " to _uM("display" to "flex", "alignItems" to "center", "paddingTop" to "10rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "#f8fafc", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "color" to "#475569", "fontSize" to "20rpx", "fontWeight" to 700, "marginRight" to "20rpx")), "pkg-price" to _uM(".container .pkg-card " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-end")), "price-wrapper" to _uM(".container .pkg-card .pkg-price " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "price-symbol" to _uM(".container .pkg-card .pkg-price .price-wrapper " to _uM("fontSize" to "24rpx", "color" to "#ef4444", "fontWeight" to "bold")), "price-number" to _uM(".container .pkg-card .pkg-price .price-wrapper " to _uM("fontSize" to "40rpx", "color" to "#ef4444", "fontWeight" to "bold")), "price-original" to _uM(".container .pkg-card .pkg-price " to _uM("fontSize" to "22rpx", "color" to "#94a3b8", "marginTop" to "4rpx", "textDecoration" to "line-through")), "pkg-card-selected" to _uM(".container " to _uM("borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#3b82f6", "borderRightColor" to "#3b82f6", "borderBottomColor" to "#3b82f6", "borderLeftColor" to "#3b82f6", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "boxShadow" to "0 4rpx 12rpx rgba(59, 130, 246, 0.08)")), "empty-state" to _uM(".container " to _uM("textAlign" to "center", "paddingTop" to "60rpx", "paddingRight" to "60rpx", "paddingBottom" to "60rpx", "paddingLeft" to "60rpx", "color" to "#94a3b8", "fontSize" to "28rpx")), "bottom-box" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "boxShadow" to "0 -2rpx 10rpx rgba(0, 0, 0, 0.05)")), "price-box" to _uM(".bottom-box " to _uM("display" to "flex", "flexDirection" to "column", "marginLeft" to "50rpx")), "price-label" to _uM(".bottom-box .price-box " to _uM("fontSize" to "24rpx", "color" to "#64748b")), "price-value" to _uM(".bottom-box .price-box " to _uM("fontWeight" to "bold", "color" to "#ef4444", "fontSize" to "40rpx")), "@TRANSITION" to _uM("pkg-card" to _uM("property" to "all", "duration" to "0.2s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
