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
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showModal as uni_showModal
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesCardDetailCardDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesCardDetailCardDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesCardDetailCardDetail
            val _cache = __ins.renderCache
            val card_number = ref("")
            val active = ref(0)
            val activeName = ref("基本信息")
            val statusBarHeight = ref(20)
            val navBarHeight = ref(44)
            val cardDetail = ref<RechargeData?>(null)
            val orderList = ref(_uA<OrderListXcxItem>())
            val pkgInfoList = ref(_uA<PkgInfoItem>())
            val fixedTabsStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                css.set("top", statusBarHeight.value + navBarHeight.value + "px")
                return css
            }
            )
            val tabs = ref(_uA(
                _uO("name" to "基本信息"),
                _uO("name" to "卡片套餐"),
                _uO("name" to "卡片订单")
            ))
            val pkgTabs = ref(_uA(
                _uO("name" to "全部", "value" to ""),
                _uO("name" to "在用套餐", "value" to "1"),
                _uO("name" to "生效中", "value" to "0"),
                _uO("name" to "已失效", "value" to "2")
            ))
            val current = ref(0)
            val getCardDetail = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(queryCardDetail(card_number.value, "", "1"))
                        console.log(res, " at pages/cardDetail/cardDetail.uvue:170")
                        if (res.code == 200) {
                            cardDetail.value = res.data
                        }
                })
            }
            val getOrderList = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        try {
                            val resp = await(queryOrderList(_uO("rechargeNo" to card_number.value)))
                            if (resp.code == 200) {
                                val rows = resp.rows as UTSArray<OrderListXcxItem>
                                if (rows != null && UTSArray.isArray(rows)) {
                                    orderList.value = rows
                                } else {
                                    orderList.value = _uA()
                                }
                            } else {
                                console.log("查询订单列表失败:", resp.msg, " at pages/cardDetail/cardDetail.uvue:190")
                                orderList.value = _uA()
                            }
                        }
                         catch (error: Throwable) {
                            console.error("查询订单列表异常:", error, " at pages/cardDetail/cardDetail.uvue:194")
                            orderList.value = _uA()
                        }
                })
            }
            val getPkgInfoList = fun(state: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        try {
                            val res = await(queryPkgInfoList(PkgInfoListParams(rechargeNo = card_number.value, status = state)))
                            if (res.code == 200) {
                                val rows = res.rows as UTSArray<PkgInfoItem>
                                if (rows != null && UTSArray.isArray(rows)) {
                                    pkgInfoList.value = rows
                                } else {
                                    pkgInfoList.value = _uA()
                                }
                            } else {
                                console.log("查询套餐列表失败:", res.msg, " at pages/cardDetail/cardDetail.uvue:214")
                                pkgInfoList.value = _uA()
                            }
                        }
                         catch (error: Throwable) {
                            console.error("查询套餐列表异常:", error, " at pages/cardDetail/cardDetail.uvue:218")
                            pkgInfoList.value = _uA()
                        }
                })
            }
            val getPackageStatusText = fun(status: String): String {
                val statusMap = Map<String, String>()
                statusMap.set("0", "未生效")
                statusMap.set("1", "生效中")
                statusMap.set("2", "已失效")
                return statusMap.get(status) ?: status ?: "未知"
            }
            val getPackageStatusType = fun(status: String): String {
                val typeMap = Map<String, String>()
                typeMap.set("0", "success")
                typeMap.set("1", "primary")
                typeMap.set("2", "error")
                return typeMap.get(status) ?: "primary"
            }
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
                typeMap.set("0", "primary")
                typeMap.set("1", "success")
                typeMap.set("2", "error")
                typeMap.set("3", "danger")
                typeMap.set("4", "warning")
                typeMap.set("5", "warning")
                return typeMap.get(status) ?: "primary"
            }
            val handleClick = fun(e: UTSJSONObject){
                if (e["index"] != null) {
                    current.value = e["index"] as Number
                    if (e["index"] == 1) {
                        getPkgInfoList(e["value"].toString())
                    }
                }
            }
            val changeTab = fun(e: CardDetailTabEvent){
                active.value = e.index
                activeName.value = e.name
                if (e.index == 0) {
                    getCardDetail()
                } else if (e.index == 1) {
                    getPkgInfoList("")
                } else if (e.index == 2) {
                    getOrderList()
                }
                current.value = 0
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val handleOrderDetail = fun(pkgId: String){
                console.log(pkgId, " at pages/cardDetail/cardDetail.uvue:300")
                uni_navigateTo(NavigateToOptions(url = "/pages/orderDetail/orderDetail?orderNo=" + pkgId))
            }
            val getNavBarInfo = fun(){
                if (isWechat()) {
                    try {
                        val systemInfo = uni_getSystemInfoSync()
                        statusBarHeight.value = if (systemInfo.statusBarHeight != 0) {
                            systemInfo.statusBarHeight
                        } else {
                            20
                        }
                    }
                     catch (e: Throwable) {
                        console.error("获取导航栏信息失败", e, " at pages/cardDetail/cardDetail.uvue:320")
                    }
                }
                if (isH5()) {
                    statusBarHeight.value = 0
                    navBarHeight.value = 44
                }
            }
            val handleRecharge = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/recharge/recharge?cardNumber=" + card_number.value))
            }
            val isBinded = ref(false)
            val handleBindCard = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(userBindCard(BindCard(rechargeNo = card_number.value)))
                        console.log(res, " at pages/cardDetail/cardDetail.uvue:342")
                        if (res.code == 200) {
                            uni_showToast(ShowToastOptions(title = "绑定成功", icon = "success"))
                            isBinded.value = true
                        } else {
                            uni_showToast(ShowToastOptions(title = res.msg ?: "绑定失败", icon = "none"))
                        }
                })
            }
            val handleUnbind = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        uni_showModal(ShowModalOptions(title = "确认解绑", content = "确定解绑该卡片吗？", success = fun(res){
                            if (res.confirm) {
                                userUnBindCard(card_number.value).then(fun(result){
                                    console.log(result, " at pages/cardDetail/cardDetail.uvue:365")
                                    if (result.code == 200) {
                                        uni_showToast(ShowToastOptions(title = "解绑成功", icon = "success"))
                                        isBinded.value = false
                                        uni_navigateBack(NavigateBackOptions(delta = 1))
                                    } else {
                                        uni_showToast(ShowToastOptions(title = result.msg ?: "解绑失败", icon = "none"))
                                    }
                                }
                                ).`catch`(fun(error){
                                    console.error("解绑请求失败:", error, " at pages/cardDetail/cardDetail.uvue:382")
                                    uni_showToast(ShowToastOptions(title = "网络异常，请重试", icon = "none"))
                                }
                                )
                            }
                        }
                        ))
                })
            }
            val handlePkgDetail = fun(pkgId: String){
                console.log(pkgId, " at pages/cardDetail/cardDetail.uvue:395")
                uni_navigateTo(NavigateToOptions(url = "/pages/pkgDetail/pkgDetail?pkgId=" + pkgId))
            }
            onMounted(fun(){
                getNavBarInfo()
            }
            )
            onLoad(fun(options){
                val cardNumber = options["cardNumber"] ?: ""
                card_number.value = cardNumber
                getCardDetail()
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                val _component_rice_divider = resolveEasyComponent("rice-divider", GenUniModulesRiceUiComponentsRiceDividerRiceDividerClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to card_number.value, "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false), null, 8, _uA(
                        "title"
                    )),
                    _cE("view", _uM("class" to "page-container"), _uA(
                        if (isTrue(cardDetail.value)) {
                            _cE("view", _uM("key" to 0), _uA(
                                _cE("view", _uM("class" to "card-box fixed-tabs", "style" to _nS(fixedTabsStyle.value)), _uA(
                                    _cV(_component_rice_tabs, _uM("modelValue" to active.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                        active.value = `$event`
                                    }, "line-color" to "#ffffff", "list" to tabs.value, "line-width" to 0, "item-style" to _uO("overflow" to "hidden"), "title-active-color" to "#2563eb", "title-inactive-color" to "#334155", "active-style" to _uO("backgroundColor" to "#ffffff", "border" to "1rpx solid #e5edf6", "borderRadius" to "24rpx"), "inactive-style" to _uO("backgroundColor" to "#f3f7fb", "border" to "1rpx solid #e5edf6", "borderRadius" to "24rpx"), "onChange" to changeTab, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "backgroundColor" to "#ffffff", "border" to "1rpx solid #ffffff")), null, 8, _uA(
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "list"
                                    ))
                                ), 4),
                                _cE("view", _uM("class" to "container"), _uA(
                                    _cE("view", _uM("class" to "card-box content-card"), _uA(
                                        _cE("view", _uM("class" to "card-content"), _uA(
                                            _cE("view", _uM("class" to "section-title"), _tD(activeName.value), 1),
                                            if (activeName.value == "基本信息") {
                                                _cE("view", _uM("key" to 0, "class" to "section-content"), _uA(
                                                    _cE("view", _uM("class" to "base-info-box"), _uA(
                                                        _cE("view", _uM("class" to "base-info"), _uA(
                                                            if (isTrue(cardDetail.value?.rechargeNo)) {
                                                                _cE("view", _uM("key" to 0, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "充值号"),
                                                                    _cE("text", _uM("class" to "info-value"), _tD(cardDetail.value?.rechargeNo), 1)
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(cardDetail.value?.statusStr)) {
                                                                _cE("view", _uM("key" to 1, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "状态"),
                                                                    _cV(_component_rice_tag, _uM("type" to "success", "plain-fill" to "", "text" to cardDetail.value?.statusStr, "size" to "small"), null, 8, _uA(
                                                                        "text"
                                                                    ))
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(cardDetail.value?.pkgName)) {
                                                                _cE("view", _uM("key" to 2, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "套餐名称"),
                                                                    _cE("text", _uM("class" to "info-value"), _tD(cardDetail.value?.pkgName), 1)
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(cardDetail.value?.effectiveTime)) {
                                                                _cE("view", _uM("key" to 3, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "生效时间"),
                                                                    _cE("text", _uM("class" to "info-value"), _tD(cardDetail.value?.effectiveTime), 1)
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(cardDetail.value?.expirationTime)) {
                                                                _cE("view", _uM("key" to 4, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "到期时间"),
                                                                    _cE("text", _uM("class" to "info-value"), _tD(cardDetail.value?.expirationTime), 1)
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            },
                                                            if (isTrue(if (isTruthy(cardDetail.value?.usedPeriod)) {
                                                                cardDetail.value?.totalPeriod
                                                            } else {
                                                                cardDetail.value?.usedPeriod
                                                            })) {
                                                                _cE("view", _uM("key" to 5, "class" to "info-item"), _uA(
                                                                    _cE("text", _uM("class" to "info-label"), "周期"),
                                                                    _cE("text", _uM("class" to "info-value"), _tD(cardDetail.value?.usedPeriod) + " / " + _tD(cardDetail.value?.totalPeriod), 1)
                                                                ))
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        )),
                                                        if (isTrue(cardDetail.value?.pkgFlow)) {
                                                            _cV(_component_rice_divider, _uM("key" to 0, "dashed" to ""))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    )),
                                                    if (isTrue(cardDetail.value?.pkgFlow)) {
                                                        _cE("view", _uM("key" to 0, "class" to "section-title"), "流量使用")
                                                    } else {
                                                        _cC("v-if", true)
                                                    },
                                                    if (isTrue(cardDetail.value?.pkgFlow)) {
                                                        _cE("view", _uM("key" to 1, "class" to "data-total"), _uA(
                                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                                _cE("text", _uM("class" to "total-label"), "已用流量:"),
                                                                _cE("text", _uM("class" to "total-value"), _tD(if (cardDetail.value?.usedFlow != null && cardDetail.value?.usedFlow !== "") {
                                                                    cardDetail.value?.usedFlow
                                                                } else {
                                                                    "0"
                                                                }), 1)
                                                            )),
                                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                                _cE("text", _uM("class" to "total-label"), "剩余流量:"),
                                                                _cE("text", _uM("class" to "total-value"), _tD(if (cardDetail.value?.unUsedFlow != null && cardDetail.value?.unUsedFlow !== "") {
                                                                    cardDetail.value?.unUsedFlow
                                                                } else {
                                                                    "0"
                                                                }), 1)
                                                            )),
                                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                                _cE("text", _uM("class" to "total-label"), "总流量:"),
                                                                _cE("text", _uM("class" to "total-value"), _tD(if (cardDetail.value?.pkgFlow != null && cardDetail.value?.pkgFlow !== "") {
                                                                    cardDetail.value?.pkgFlow
                                                                } else {
                                                                    "0"
                                                                }), 1)
                                                            ))
                                                        ))
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            if (activeName.value == "卡片套餐") {
                                                _cE("view", _uM("key" to 1, "class" to "section-content"), _uA(
                                                    _cV(_component_rice_tabs, _uM("modelValue" to current.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                                        current.value = `$event`
                                                    }, "line-color" to "#ffffff", "list" to pkgTabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "title-inactive-color" to "#334155", "onChange" to handleClick, "customStyle" to _uO("height" to "85rpx", "padding" to "5rpx 10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                                        "modelValue",
                                                        "onUpdate:modelValue",
                                                        "list"
                                                    )),
                                                    _cE("view", _uM("class" to "card-pkg-box"), _uA(
                                                        if (pkgInfoList.value.length == 0) {
                                                            _cE("view", _uM("key" to 0, "class" to "empty-order"), "暂无套餐记录")
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        _cE(Fragment, null, RenderHelpers.renderList(pkgInfoList.value, fun(item, index, __index, _cached): Any {
                                                            return _cE("view", _uM("class" to "item", "key" to index, "onClick" to fun(){
                                                                handlePkgDetail(item.id)
                                                            }), _uA(
                                                                _cE("view", _uM("class" to "item-head"), _uA(
                                                                    if (isTrue(item.name)) {
                                                                        _cE("text", _uM("key" to 0, "class" to "item-label"), _tD(item.name), 1)
                                                                    } else {
                                                                        _cC("v-if", true)
                                                                    },
                                                                    if (isTrue(item.status)) {
                                                                        _cV(_component_rice_tag, _uM("key" to 1, "text" to getPackageStatusText(item.status), "round" to true, "plain-fill" to "", "size" to "small", "type" to getPackageStatusType(item.status)), null, 8, _uA(
                                                                            "text",
                                                                            "type"
                                                                        ))
                                                                    } else {
                                                                        _cC("v-if", true)
                                                                    }
                                                                )),
                                                                if (isTrue(item.startTime)) {
                                                                    _cE("view", _uM("key" to 0, "class" to "item-sub-title"), "生效时间：" + _tD(item.startTime), 1)
                                                                } else {
                                                                    _cC("v-if", true)
                                                                },
                                                                if (isTrue(item.endTime)) {
                                                                    _cE("view", _uM("key" to 1, "class" to "item-sub-title"), "到期时间：" + _tD(item.endTime), 1)
                                                                } else {
                                                                    _cC("v-if", true)
                                                                },
                                                                _cE("view", _uM("class" to "item-data"), _uA(
                                                                    if (isTrue(item.totalFlow)) {
                                                                        _cE("view", _uM("key" to 0, "class" to "item-data-item"), _uA(
                                                                            _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                            _cE("text", _uM("class" to "item-data-value"), _tD(item.totalFlow) + "GB", 1)
                                                                        ))
                                                                    } else {
                                                                        _cC("v-if", true)
                                                                    },
                                                                    if (isTrue(item.usedFlow)) {
                                                                        _cE("view", _uM("key" to 1, "class" to "item-data-item"), _uA(
                                                                            _cE("text", _uM("class" to "item-data-label"), "已用流量"),
                                                                            _cE("text", _uM("class" to "item-data-value"), _tD(item.usedFlow) + "GB", 1)
                                                                        ))
                                                                    } else {
                                                                        _cC("v-if", true)
                                                                    },
                                                                    if (isTrue(item.leftFlow)) {
                                                                        _cE("view", _uM("key" to 2, "class" to "item-data-item"), _uA(
                                                                            _cE("text", _uM("class" to "item-data-label"), "剩余流量"),
                                                                            _cE("text", _uM("class" to "item-data-value"), _tD(item.leftFlow) + "GB", 1)
                                                                        ))
                                                                    } else {
                                                                        _cC("v-if", true)
                                                                    }
                                                                ))
                                                            ), 8, _uA(
                                                                "onClick"
                                                            ))
                                                        }), 128)
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            if (activeName.value == "卡片订单") {
                                                _cE("view", _uM("key" to 2, "class" to "section-content card-order"), _uA(
                                                    if (orderList.value.length == 0) {
                                                        _cE("view", _uM("key" to 0, "class" to "empty-order"), _uA(
                                                            _cE("view", _uM("class" to "empty-text"), "暂无订单记录")
                                                        ))
                                                    } else {
                                                        _cC("v-if", true)
                                                    },
                                                    _cE(Fragment, null, RenderHelpers.renderList(orderList.value, fun(order, index, __index, _cached): Any {
                                                        return _cE("view", _uM("class" to "item", "key" to index, "onClick" to fun(){
                                                            handleOrderDetail(order.id.toString(10))
                                                        }), _uA(
                                                            _cE("view", _uM("class" to "item-head"), _uA(
                                                                _cE("text", _uM("class" to "item-label"), _tD(if (order.pkgName != "") {
                                                                    order.pkgName
                                                                } else {
                                                                    "未知套餐"
                                                                }), 1),
                                                                _cV(_component_rice_tag, _uM("type" to getOrderStatusType(order.status), "text" to getOrderStatusText(order.status), "round" to true, "plain-fill" to "", "size" to "small"), null, 8, _uA(
                                                                    "type",
                                                                    "text"
                                                                ))
                                                            )),
                                                            _cE("view", _uM("class" to "item-sub-title"), "订单号: " + _tD(if (order.orderNo != "") {
                                                                order.orderNo
                                                            } else {
                                                                "未知"
                                                            }), 1),
                                                            _cE("view", _uM("class" to "item-data"), _uA(
                                                                _cE("text", _uM("class" to "date-label"), _tD(order.createTime), 1),
                                                                _cE("text", _uM("class" to "total-value"), "¥" + _tD(order.payCurrencyAmount), 1)
                                                            ))
                                                        ), 8, _uA(
                                                            "onClick"
                                                        ))
                                                    }), 128)
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        ))
                                    )),
                                    if (isTrue(if (isTruthy(cardDetail.value?.isBind)) {
                                        cardDetail.value?.isBind
                                    } else {
                                        isBinded.value
                                    })) {
                                        _cV(_component_rice_button, _uM("key" to 0, "class" to "ml-24 mr-24 mt-24 mb-24", "type" to "error", "plain-fill" to "", "text" to "解绑卡片", "customStyle" to _uO("backgroundColor" to "#ffffff"), "onClick" to handleUnbind))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                )),
                                _cE("view", _uM("class" to "fixed-bottom-buttons"), _uA(
                                    if (isTrue(if (isTruthy(cardDetail.value?.isBind)) {
                                        cardDetail.value?.isBind
                                    } else {
                                        isBinded.value
                                    })) {
                                        _cV(_component_rice_button, _uM("key" to 0, "height" to "100rpx", "class" to "btn", "bold" to true, "disabled" to true, "customStyle" to _uO("border" to "none")), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                "已绑定"
                                            )
                                        }), "_" to 1))
                                    } else {
                                        _cV(_component_rice_button, _uM("key" to 1, "height" to "100rpx", "class" to "btn", "bold" to true, "customStyle" to _uO("border" to "none"), "onClick" to handleBindCard), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                            return _uA(
                                                "去绑定"
                                            )
                                        }), "_" to 1))
                                    },
                                    _cV(_component_rice_button, _uM("height" to "100rpx", "class" to "btn", "type" to "primary", "color" to "#1989fa", "textColor" to "#ffffff", "bold" to true, "shadow" to true, "customStyle" to _uO("border" to "none"), "onClick" to handleRecharge), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            "去充值"
                                        )
                                    }), "_" to 1))
                                ))
                            ))
                        } else {
                            _cE("view", _uM("key" to 1, "class" to "empty-state"), _uA(
                                _cE("view", _uM("class" to "empty-text"), "暂无卡片详情")
                            ))
                        }
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
                return _uM("page-container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "fixed-tabs" to _pS(_uM("position" to "fixed", "left" to 0, "right" to 0, "zIndex" to 99, "flexShrink" to 0, "backgroundColor" to "#ffffff", "!paddingTop" to "12rpx", "!paddingRight" to "12rpx", "!paddingBottom" to "12rpx", "!paddingLeft" to "12rpx")), "container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "130rpx", "paddingRight" to 0, "paddingBottom" to "130rpx", "paddingLeft" to 0)), "card-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "content-card" to _pS(_uM("marginTop" to 0)), "card-content" to _pS(_uM("marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "section-title" to _uM(".card-content " to _uM("fontSize" to "28rpx", "fontWeight" to 800, "color" to "#0f172a", "marginBottom" to "20rpx")), "base-info-box" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "column")), "base-info" to _uM(".card-content .base-info-box " to _uM("display" to "flex", "flexDirection" to "column")), "info-item" to _uM(".card-content .base-info-box .base-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0)), "info-label" to _uM(".card-content .base-info-box .base-info .info-item " to _uM("color" to "#64748b")), "info-value" to _uM(".card-content .base-info-box .base-info .info-item " to _uM("fontWeight" to "bold", "color" to "#0f172a")), "pkg-content" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx")), "pkg-item" to _uM(".card-content .pkg-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "22rpx", "marginBottom" to "12rpx")), "pkg-label" to _uM(".card-content .pkg-content .pkg-item " to _uM("color" to "#64748b")), "pkg-value" to _uM(".card-content .pkg-content .pkg-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "fontWeight" to "bold", "color" to "#0f172a")), "pkg-icon" to _uM(".card-content .pkg-content .pkg-item .pkg-value " to _uM("backgroundColor" to "#ffffff", "width" to "40rpx", "height" to "40rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%", "marginLeft" to "25rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "pkg-date" to _uM(".card-content .pkg-content " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#eef2f7", "paddingTop" to "20rpx")), "date-list" to _uM(".card-content .pkg-content .pkg-date " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0, "fontSize" to "26rpx", "color" to "#334155")), "date-period" to _uM(".card-content .pkg-content .pkg-date .date-list " to _uM("marginRight" to "10rpx")), "data-total" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "gap" to "12rpx")), "total-item" to _uM(".card-content .data-total " to _uM("backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center")), "total-label" to _uM(".card-content .data-total .total-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "lineHeight" to 1.4, "marginBottom" to "10rpx")), "total-value" to _uM(".card-content .data-total .total-item " to _uM("fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4), ".card-content .card-order .item-data " to _uM("fontSize" to "30rpx", "fontWeight" to 900, "color" to "#ef4444")), "item" to _uM(".card-content .card-pkg-box " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx"), ".card-content .card-order " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx")), "item-head" to _uM(".card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "12rpx"), ".card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "12rpx")), "item-label" to _uM(".card-content .card-pkg-box .item .item-head " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#0f172a"), ".card-content .card-order .item .item-head " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#0f172a")), "item-sub-title" to _uM(".card-content .card-pkg-box .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55, "marginBottom" to "8rpx"), ".card-content .card-order .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55, "marginBottom" to "8rpx")), "item-data" to _uM(".card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "gap" to "12rpx"), ".card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "gap" to "12rpx"), ".card-content .card-order " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-data-item" to _uM(".card-content .card-pkg-box .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "16rpx", "paddingRight" to "10rpx", "paddingBottom" to "16rpx", "paddingLeft" to "10rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center"), ".card-content .card-order .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "16rpx", "paddingRight" to "10rpx", "paddingBottom" to "16rpx", "paddingLeft" to "10rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "item-data-label" to _uM(".card-content .card-pkg-box .item .item-data .item-data-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "marginBottom" to "8rpx"), ".card-content .card-order .item .item-data .item-data-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "marginBottom" to "8rpx")), "item-data-value" to _uM(".card-content .card-pkg-box .item .item-data .item-data-item " to _uM("fontSize" to "24rpx", "fontWeight" to "bold", "color" to "#0f172a"), ".card-content .card-order .item .item-data .item-data-item " to _uM("fontSize" to "24rpx", "fontWeight" to "bold", "color" to "#0f172a")), "date-label" to _uM(".card-content .card-pkg-box .item .item-data " to _uM("fontSize" to "24rpx"), ".card-content .card-order .item .item-data " to _uM("fontSize" to "24rpx")), "empty-order" to _uM(".card-content " to _uM("textAlign" to "center", "paddingTop" to "60rpx", "paddingRight" to "20rpx", "paddingBottom" to "60rpx", "paddingLeft" to "20rpx", "color" to "#94a3b8", "fontSize" to "28rpx")), "empty-state" to _uM(".card-content .empty-order " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "120rpx", "paddingRight" to "32rpx", "paddingBottom" to "120rpx", "paddingLeft" to "32rpx", "backgroundColor" to "#ffffff", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "empty-text" to _uM(".card-content .empty-order .empty-state " to _uM("textAlign" to "center", "fontSize" to "28rpx", "color" to "#9ca3af")), "fixed-bottom-buttons" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#e7edf5", "boxShadow" to "0 -4rpx 12rpx rgba(0, 0, 0, 0.04)", "zIndex" to 100)), "btn" to _uM(".fixed-bottom-buttons " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
