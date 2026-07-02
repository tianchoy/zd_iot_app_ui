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
import io.dcloud.uniapp.extapi.`$off` as uni__off
import io.dcloud.uniapp.extapi.`$on` as uni__on
import io.dcloud.uniapp.extapi.login as uni_login
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesCardCard : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesCardCard) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesCardCard
            val _cache = __ins.renderCache
            val card_number = ref("gn20260603164757")
            val queryKeyword = ref("")
            val current = ref(0)
            val scrollViewHeight = ref(0)
            val cardList = ref(_uA<RechargeData>())
            val cardCounts = ref(_uA<Number>(0, 0, 0))
            val tabs = computed<UTSArray<TabItem>>(fun(): UTSArray<TabItem> {
                return _uA(
                    TabItem(name = "全部 " + cardCounts.value[0]),
                    TabItem(name = "在用 " + cardCounts.value[1]),
                    TabItem(name = "异常 " + cardCounts.value[2])
                )
            }
            )
            val handleDetail = fun(card: RechargeData){
                uni_navigateTo(NavigateToOptions(url = "/pages/cardDetail/cardDetail?cardNumber=" + card.rechargeNo))
            }
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "在用" -> 
                        return "status-completed"
                    "停机" -> 
                        return "status-pending"
                    else -> 
                        return ""
                }
            }
            val getFlowText = fun(card: RechargeData): String {
                val used = card.usedFlow ?: 0
                val total = card.pkgFlow ?: 0
                return "" + used as Any + " / " + total as Any
            }
            val getCycleText = fun(card: RechargeData): String {
                val used = card.usedPeriod ?: "-"
                val total = card.totalPeriod ?: "-"
                return "" + used + " / " + total
            }
            val checkToken = fun(): Boolean {
                val token = getToken()
                return !!(token != "")
            }
            val scanCode = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/scanCode/scanCode"))
            }
            val handleInput = fun(){
                if (card_number.value.trim() === "") {
                    queryKeyword.value = ""
                }
            }
            val handleQuery = fun(){
                val keyword = card_number.value.trim()
                if (!(keyword != "")) {
                    uni_showToast(ShowToastOptions(title = "请输入卡号", icon = "none"))
                    return
                }
                queryKeyword.value = keyword
                uni_navigateTo(NavigateToOptions(url = "/pages/cardDetail/cardDetail?cardNumber=" + keyword))
            }
            val onScanResult = fun(data: UTSJSONObject): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val result = data.getString("result") ?: ""
                        if (result.length > 0) {
                            card_number.value = result
                            uni_showToast(ShowToastOptions(title = "扫码成功", icon = "success"))
                            await(handleQuery())
                        }
                })
            }
            val getCardList = fun(state: String): UTSPromise<UTSArray<RechargeData>> {
                return wrapUTSPromise(suspend w1@{
                        try {
                            val res = await(queryCardList(QueryCardListParams(status = state, isSort = true)))
                            if (res.code == 200) {
                                return@w1 if (UTSArray.isArray(res.data)) {
                                    res.data
                                } else {
                                    _uA<RechargeData>()
                                }
                            }
                            return@w1 _uA<RechargeData>()
                        }
                         catch (error: Throwable) {
                            uni_showToast(ShowToastOptions(title = "查询失败，请稍后重试", icon = "none"))
                            return@w1 _uA<RechargeData>()
                        }
                })
            }
            val handleRecharge = fun(rechargeNo: String){
                uni_navigateTo(NavigateToOptions(url = "/pages/recharge/recharge?cardNumber=" + rechargeNo))
            }
            val code = ref<String>("")
            val getCode = fun(): UTSPromise<Boolean> {
                return wrapUTSPromise(suspend w1@{
                        return@w1 UTSPromise(fun(resolve, _reject){
                            uni_login(LoginOptions(provider = "weixin", success = fun(res){
                                code.value = res.code
                                login(_uO("isLogin" to "1", "xcxCode" to code.value)).then(fun(loginRes){
                                    if (loginRes.code == 200) {
                                        setToken(loginRes.data.access_token, loginRes.data.refreshToken)
                                        resolve(true)
                                    } else {
                                        resolve(false)
                                    }
                                }
                                ).`catch`(fun(){
                                    resolve(false)
                                }
                                )
                            }
                            , fail = fun(err){
                                console.error("登录失败:", err, " at pages/card/card.uvue:228")
                                resolve(false)
                            }
                            ))
                        }
                        )
                })
            }
            val wxGetPhoneLogin = ref<String>("")
            val getTenantInfos = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(getTenantInfo(getTenantId(), false))
                        if (res.code == 200) {
                            val tenantInfo = res.data
                            wxGetPhoneLogin.value = "" + tenantInfo.wxGetPhoneLogin
                        }
                })
            }
            val loadCardData = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val _ref = await(UTSPromise.all(_uA(
                            getCardList("0"),
                            getCardList("1"),
                            getCardList("2")
                        )))
                        val allList = _ref[0]
                        val inUseList = _ref[1]
                        val abnormalList = _ref[2]
                        cardCounts.value = _uA(
                            allList.length,
                            inUseList.length,
                            abnormalList.length
                        )
                        cardList.value = allList
                })
            }
            val platform = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (isWechat()) {
                            if (!checkToken()) {
                                await(getTenantInfos())
                                if (wxGetPhoneLogin.value != "1") {
                                    cardList.value = _uA()
                                    cardCounts.value = _uA(
                                        0,
                                        0,
                                        0
                                    )
                                    return@w1
                                }
                                val loginSuccess = await(getCode())
                                if (!loginSuccess) {
                                    console.log("登录失败，跳过数据加载", " at pages/card/card.uvue:275")
                                    uni_showToast(ShowToastOptions(title = "登录失败，请重试", icon = "none"))
                                    return@w1
                                }
                            }
                        }
                        await(loadCardData())
                })
            }
            val handleClick = fun(e: UTSJSONObject){
                if (isWechat()) {
                    if (!checkToken()) {
                        return
                    }
                }
                if (e["index"] != null) {
                    current.value = e["index"] as Number
                    getCardList(current.value.toString(10)).then(fun(list){
                        cardList.value = list
                    }
                    )
                }
            }
            onLoad(fun(_options){
                uni__on("scanResult", onScanResult)
            }
            )
            onShow(fun(){
                platform()
            }
            )
            onUnload(fun(){
                uni__off("scanResult", onScanResult)
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_input = resolveEasyComponent("rice-input", GenUniModulesRiceUiComponentsRiceInputRiceInputClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_rice_divider = resolveEasyComponent("rice-divider", GenUniModulesRiceUiComponentsRiceDividerRiceDividerClass)
                val _component_customService = resolveEasyComponent("customService", GenComponentsCustomServiceCustomServiceClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "卡片", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box mb-24"), _uA(
                            _cE("view", _uM("class" to "card-label"), "卡号查询"),
                            _cE("view", _uM("class" to "search-value mt-24"), _uA(
                                _cV(_component_rice_input, _uM("modelValue" to card_number.value, "onUpdate:modelValue" to fun(`$event`: String){
                                    card_number.value = `$event`
                                }
                                , "placeholder" to "请输入 ICCID / MSISDN", "class" to "search-input", "onInput" to handleInput), null, 8, _uA(
                                    "modelValue",
                                    "onUpdate:modelValue"
                                )),
                                _cV(_component_rice_button, _uM("class" to "scan-btn", "height" to "100%", "icon" to "scan", "onClick" to scanCode)),
                                _cV(_component_rice_button, _uM("type" to "primary", "color" to "#1989fa", "textColor" to "#ffffff", "height" to "100%", "onClick" to handleQuery), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "查询"
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box card-list-box"), _uA(
                            _cE("view", _uM("class" to "card-tabs"), _uA(
                                _cV(_component_rice_tabs, _uM("modelValue" to current.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                    current.value = `$event`
                                }
                                , "line-color" to "#ffffff", "list" to tabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "title-inactive-color" to "#334155", "onChange" to handleClick, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                    "modelValue",
                                    "onUpdate:modelValue",
                                    "list"
                                ))
                            )),
                            _cE("view", _uM("class" to "card-list"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(cardList.value, fun(card, index, __index, _cached): Any {
                                    return _cE("view", _uM("class" to "card-item", "key" to index, "onClick" to fun(){
                                        handleDetail(card)
                                    }
                                    ), _uA(
                                        _cE("view", _uM("class" to "item-head"), _uA(
                                            _cE("view", _uM("class" to "item-head-label"), _uA(
                                                if (isTrue(card.rechargeNo)) {
                                                    _cE("text", _uM("key" to 0, "class" to "card-item-title"), _tD(if (card.rechargeNo != "") {
                                                        card.rechargeNo
                                                    } else {
                                                        "-"
                                                    }), 1)
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                                ,
                                                if (isTrue(card.pkgName)) {
                                                    _cE("text", _uM("key" to 1, "class" to "card-item-content"), "套餐：" + _tD(if (card.pkgName != "") {
                                                        card.pkgName
                                                    } else {
                                                        "-"
                                                    }), 1)
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                            )),
                                            if (isTrue(card.statusStr)) {
                                                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                                    "status-tag",
                                                    getStatusClass(card.statusStr)
                                                ))), _tD(if (card.statusStr != "") {
                                                    card.statusStr
                                                } else {
                                                    "未知"
                                                }), 3)
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        )),
                                        if (isTrue(if (isTruthy(card.usedFlow)) {
                                            card.usedFlow
                                        } else {
                                            card.pkgFlow
                                        }
                                        )) {
                                            _cE("view", _uM("key" to 0, "class" to "item-package"), _uA(
                                                _cE("text", _uM("class" to "package-label"), "流量："),
                                                _cE("text", _uM("class" to "package-value"), _tD(getFlowText(card)), 1)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                        ,
                                        _cV(_component_rice_divider, _uM("dashed" to "", "customStyle" to _uO("margin" to "0"))),
                                        _cE("view", _uM("class" to "card-metrics"), _uA(
                                            _cE("view", _uM("class" to "metric-box mr-24"), _uA(
                                                _cE("view", _uM("class" to "metric-label"), "生效时间"),
                                                _cE("view", _uM("class" to "metric-value"), _tD(if (card.effectiveTime != "") {
                                                    card.effectiveTime
                                                } else {
                                                    "-"
                                                }
                                                ), 1)
                                            )),
                                            _cE("view", _uM("class" to "metric-box"), _uA(
                                                _cE("view", _uM("class" to "metric-label"), "到期时间"),
                                                _cE("view", _uM("class" to "metric-value"), _tD(if (isTruthy(card.expirationTime)) {
                                                    card.expirationTime
                                                } else {
                                                    "-"
                                                }
                                                ), 1)
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "card-bottom"), _uA(
                                            _cE("view", _uM("class" to "card-cycle-text"), _uA(
                                                _cE("text", _uM("class" to "cycle-label"), "当前周期："),
                                                _cE("text", _uM("class" to "cycle-value"), _tD(getCycleText(card)), 1)
                                            )),
                                            _cV(_component_rice_button, _uM("type" to "primary", "size" to "mini", "customStyle" to _uO("fontSize" to "24rpx"), "onClick" to fun(){
                                                handleRecharge(card.rechargeNo)
                                            }
                                            ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    "去充值"
                                                )
                                            }
                                            ), "_" to 2), 1032, _uA(
                                                "onClick"
                                            ))
                                        ))
                                    ), 8, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128)
                            ))
                        )),
                        if (cardList.value.length === 0) {
                            _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                _cE("text", _uM("class" to "empty-text"), "暂无卡片数据")
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        _cV(_component_customService)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb", "paddingBottom" to "40rpx")), "card-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "card-tabs" to _uM(".container .card-box " to _uM("marginTop" to "24rpx", "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx")), "search-value" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "search-input" to _uM(".container .card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to 0, "paddingRight" to "25rpx", "paddingBottom" to 0, "paddingLeft" to "25rpx", "height" to "95rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#0f172a", "fontSize" to "30rpx")), "scan-btn" to _uM(".container .card-box .search-value " to _uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7")), "card-item" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "column", "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#e7edf5", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "30rpx", "paddingLeft" to "24rpx", "marginBottom" to "30rpx", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000", "marginBottom:last-child" to 0)), "item-head" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-start", "justifyContent" to "space-between", "marginBottom" to "18rpx")), "card-item-title" to _uM(".container .card-box .card-item .item-head " to _uM("fontSize" to "32rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.25)), "card-item-content" to _uM(".container .card-box .card-item .item-head " to _uM("marginTop" to 5, "fontSize" to 12, "color" to "#94a3b8", "lineHeight" to 1.45)), "status-tag" to _uM(".container .card-box .card-item .item-head " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "status-completed" to _uM(".container .card-box .card-item .item-head " to _uM("backgroundImage" to "none", "backgroundColor" to "#ecfdf5", "color" to "#059669", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#a7f3d0", "borderRightColor" to "#a7f3d0", "borderBottomColor" to "#a7f3d0", "borderLeftColor" to "#a7f3d0")), "status-pending" to _uM(".container .card-box .card-item .item-head " to _uM("backgroundImage" to "none", "backgroundColor" to "#fff7ed", "color" to "#ea580c", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fdba74", "borderRightColor" to "#fdba74", "borderBottomColor" to "#fdba74", "borderLeftColor" to "#fdba74")), "item-package" to _uM(".container .card-box .card-item " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "minWidth" to 0)), "package-label" to _uM(".container .card-box .card-item .item-package " to _uM("fontSize" to 12, "color" to "#64748b", "lineHeight" to 1.4)), "package-value" to _uM(".container .card-box .card-item .item-package " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "25rpx", "fontWeight" to 700, "color" to "#334155", "lineHeight" to 1.45, "whiteSpace" to "nowrap", "overflow" to "hidden", "textOverflow" to "ellipsis")), "card-metrics" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "gap" to "24rpx")), "metric-box" to _uM(".container .card-box .card-item .card-metrics " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "minWidth" to 0)), "metric-label" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("fontSize" to "25rpx", "color" to "#94a3b8", "lineHeight" to 1.4)), "metric-value" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("marginTop" to "15rpx", "fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4)), "card-bottom" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "card-cycle-text" to _uM(".container .card-box .card-item .card-bottom " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "cycle-label" to _uM(".container .card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "25rpx", "color" to "#64748b", "lineHeight" to 1.45)), "cycle-value" to _uM(".container .card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "25rpx", "color" to "#334155", "fontWeight" to 800)), "card-list-box" to _uM(".container " to _uM("paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0)), "card-list" to _uM(".container " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "width" to "100%")), "empty-state" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "120rpx", "paddingRight" to "32rpx", "paddingBottom" to "120rpx", "paddingLeft" to "32rpx", "backgroundColor" to "#ffffff", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "empty-text" to _uM(".container .empty-state " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
