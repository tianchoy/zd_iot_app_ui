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
open class GenPagesPkgDetailPkgDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesPkgDetailPkgDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesPkgDetailPkgDetail
            val _cache = __ins.renderCache
            val showLoading = ref(false)
            val pkgId = ref<String>("")
            val pkgInfo = ref(_uO() as Any)
            fun gen_d_fn(key: String): Any {
                val kVal = (pkgInfo.value as UTSJSONObject)[key]
                return kVal as Any
            }
            val d = ::gen_d_fn
            val flowPercentage = computed(fun(): Number {
                if (!isTruthy(pkgInfo.value)) {
                    return 0
                }
                val info = pkgInfo.value as UTSJSONObject
                val usedFlowStr = info["usedFlow"] as String
                val pkgFlowStr = info["pkgFlow"] as String
                val usedFlow = if (usedFlowStr != null && usedFlowStr != "") {
                    UTSNumber.parseInt(usedFlowStr)
                } else {
                    0
                }
                val pkgFlow = if (pkgFlowStr != null && pkgFlowStr != "") {
                    UTSNumber.parseInt(pkgFlowStr)
                } else {
                    0
                }
                if (pkgFlow <= 0) {
                    return 0
                }
                return Math.min((usedFlow / pkgFlow) * 100, 100)
            }
            )
            val initPkgInfo = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (!(pkgId.value != "")) {
                            return@w1
                        }
                        showLoading.value = true
                        try {
                            val res = await(queryPkgInfoXcx(pkgId.value))
                            if (res.code == 200) {
                                pkgInfo.value = res.data
                                showLoading.value = false
                            } else {
                                showLoading.value = false
                                uni_showToast(ShowToastOptions(title = if (res.msg != "") {
                                    res.msg
                                } else {
                                    "查询套餐信息详情失败"
                                }
                                , icon = "none"))
                            }
                        }
                         catch (error: Throwable) {
                            showLoading.value = false
                            uni_showToast(ShowToastOptions(title = "查询套餐信息详情失败", icon = "none"))
                        }
                })
            }
            val handleBack = fun(){
                uni_navigateBack(null)
            }
            onLoad(fun(options: UTSJSONObject){
                console.log("pkgDetail onLoad", options, " at pages/pkgDetail/pkgDetail.uvue:145")
                val pid = options["pkgId"] as String
                pkgId.value = if (pid != null) {
                    pid
                } else {
                    ""
                }
                initPkgInfo()
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_loading = resolveEasyComponent("rice-loading", GenUniModulesRiceUiComponentsRiceLoadingRiceLoadingClass)
                val _component_rice_overlay = resolveEasyComponent("rice-overlay", GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                val _component_rice_progress = resolveEasyComponent("rice-progress", GenUniModulesRiceUiComponentsRiceProgressRiceProgressClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "套餐详情", "show-back" to true, "onBack" to handleBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cV(_component_rice_overlay, _uM("show" to showLoading.value, "onUpdate:show" to fun(`$event`: Boolean){
                        showLoading.value = `$event`
                    }
                    , "mode" to "snow", "bg-color" to "rgba(255, 255, 255, 0.4)"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(_component_rice_loading, _uM("customStyle" to _uO("height" to "100rpx", "width" to "100rpx", "position" to "absolute", "top" to "50%", "left" to "50%", "transform" to "translate(-50%,-50%)")), null, 8, _uA(
                                "customStyle"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "show",
                        "onUpdate:show"
                    )),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "card-header"), _uA(
                                if (isTrue(d("pkgName"))) {
                                    _cE("text", _uM("key" to 0, "class" to "package-name"), _tD(d("pkgName")), 1)
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("status"))) {
                                    _cV(_component_rice_tag, _uM("key" to 1, "text" to d("status"), "round" to true, "plain-fill" to "", "size" to "small", "type" to "success"), null, 8, _uA(
                                        "text"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            )),
                            if (isTrue(d("rechargeNo"))) {
                                _cE("view", _uM("key" to 0, "class" to "card-number"), _uA(
                                    _cE("text", _uM("class" to "number-label"), "当前卡号："),
                                    _cE("text", _uM("class" to "number-value"), _tD(d("rechargeNo")), 1)
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            if (isTrue(d("usedFlow") != null && d("unUsedFlow") != null)) {
                                _cE("view", _uM("key" to 1, "class" to "traffic-section"), _uA(
                                    _cE("view", _uM("class" to "traffic-text"), _uA(
                                        _cE("view", _uM("class" to "traffic-header"), _uA(
                                            _cE("text", _uM("class" to "traffic-title"), "流量使用")
                                        )),
                                        _cE("view", _uM("class" to "traffic-progress"), _uA(
                                            _cE("text", _uM("class" to "used-text"), "已用" + _tD(d("usedFlow")) + " GB", 1),
                                            _cE("text", _uM("class" to "divider"), "/"),
                                            _cE("text", _uM("class" to "total-text"), "剩余" + _tD(d("unUsedFlow")) + " GB", 1)
                                        ))
                                    )),
                                    _cE("view", _uM("class" to "progress-bar"), _uA(
                                        _cV(_component_rice_progress, _uM("percentage" to flowPercentage.value, "show-text" to ""), null, 8, _uA(
                                            "percentage"
                                        ))
                                    ))
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to "info-grid"), _uA(
                                if (isTrue(d("pkgFlow"))) {
                                    _cE("view", _uM("key" to 0, "class" to "info-item"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "套餐流量"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("pkgFlow")) + " GB", 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("startDate"))) {
                                    _cE("view", _uM("key" to 1, "class" to "info-item"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "生效时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("startDate")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("validityPeriod"))) {
                                    _cE("view", _uM("key" to 2, "class" to "info-item"), _uA(
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
                                if (isTrue(d("endDate"))) {
                                    _cE("view", _uM("key" to 3, "class" to "info-item"), _uA(
                                        _cE("text", _uM("class" to "info-label"), "到期时间"),
                                        _cE("text", _uM("class" to "info-value"), _tD(d("endDate")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box order-card"), _uA(
                            _cE("view", _uM("class" to "order-title"), _uA(
                                _cE("text", _uM("class" to "order-title-text"), "关联订单信息")
                            )),
                            _cE("view", _uM("class" to "order-detail"), _uA(
                                if (isTrue(d("orderNo"))) {
                                    _cE("view", _uM("key" to 0, "class" to "order-row"), _uA(
                                        _cE("text", _uM("class" to "order-label"), "关联订单号"),
                                        _cE("text", _uM("class" to "order-value"), _tD(d("orderNo")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("orderStatus"))) {
                                    _cE("view", _uM("key" to 1, "class" to "order-row"), _uA(
                                        _cE("text", _uM("class" to "order-label"), "订单状态"),
                                        _cE("text", _uM("class" to "order-value status-completed"), _tD(d("orderStatus")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("payAmount"))) {
                                    _cE("view", _uM("key" to 2, "class" to "order-row"), _uA(
                                        _cE("text", _uM("class" to "order-label"), "支付金额"),
                                        _cE("text", _uM("class" to "order-value price"), "￥" + _tD(d("payAmount")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(d("orderCreateTime"))) {
                                    _cE("view", _uM("key" to 3, "class" to "order-row"), _uA(
                                        _cE("text", _uM("class" to "order-label"), "下单时间"),
                                        _cE("text", _uM("class" to "order-value"), _tD(d("orderCreateTime")), 1)
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            ))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb", "paddingBottom" to "40rpx")), "card-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "card-header" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "16rpx")), "package-name" to _pS(_uM("fontSize" to "36rpx", "fontWeight" to "bold", "color" to "#1a2332")), "status-badge" to _pS(_uM("backgroundColor" to "#e8f5e9", "borderTopLeftRadius" to "30rpx", "borderTopRightRadius" to "30rpx", "borderBottomRightRadius" to "30rpx", "borderBottomLeftRadius" to "30rpx", "paddingTop" to "6rpx", "paddingRight" to "20rpx", "paddingBottom" to "6rpx", "paddingLeft" to "20rpx")), "status-text" to _pS(_uM("fontSize" to "24rpx", "color" to "#2e7d32", "fontWeight" to 500)), "card-number" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "flex-start", "marginBottom" to "24rpx")), "number-label" to _pS(_uM("fontSize" to "26rpx", "color" to "#8c9aa8")), "number-value" to _pS(_uM("fontSize" to "26rpx", "color" to "#1a2332", "fontWeight" to 500)), "traffic-section" to _pS(_uM("backgroundColor" to "#f8fafc", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginBottom" to "24rpx")), "traffic-text" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "traffic-header" to _pS(_uM("marginBottom" to "12rpx")), "traffic-title" to _pS(_uM("fontSize" to "28rpx", "color" to "#1a2332", "fontWeight" to 600)), "traffic-progress" to _pS(_uM("display" to "flex", "flexDirection" to "row", "marginBottom" to "12rpx")), "used-text" to _pS(_uM("fontSize" to "24rpx", "color" to "#8c9aa8")), "divider" to _pS(_uM("fontSize" to "28rpx", "color" to "#8c9aa8", "marginTop" to 0, "marginRight" to "8rpx", "marginBottom" to 0, "marginLeft" to "8rpx")), "total-text" to _pS(_uM("fontSize" to "24rpx", "color" to "#8c9aa8")), "info-grid" to _pS(_uM("gridTemplateColumns" to "1fr 1fr", "gap" to "20rpx 0")), "info-item" to _pS(_uM("display" to "flex", "flexDirection" to "column")), "info-label" to _pS(_uM("fontSize" to "24rpx", "color" to "#8c9aa8", "marginBottom" to "6rpx")), "info-value" to _pS(_uM("fontSize" to "28rpx", "color" to "#1a2332", "fontWeight" to 500)), "order-card" to _pS(_uM("marginTop" to 0)), "order-title" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginBottom" to "20rpx")), "order-title-text" to _pS(_uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#1a2332", "marginBottom" to "6rpx")), "order-desc" to _pS(_uM("fontSize" to "24rpx", "color" to "#8c9aa8")), "order-detail" to _pS(_uM("display" to "flex", "flexDirection" to "column", "gap" to "16rpx")), "order-row" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f2f5", "borderBottomWidth:last-child" to "medium", "borderBottomStyle:last-child" to "none", "borderBottomColor:last-child" to "#000000")), "order-label" to _pS(_uM("fontSize" to "26rpx", "color" to "#8c9aa8")), "order-value" to _pS(_uM("fontSize" to "26rpx", "color" to "#1a2332", "fontWeight" to 500)), "price" to _pS(_uM("color" to "#ef4444", "fontWeight" to "bold")), "status-completed" to _pS(_uM("color" to "#2e7d32")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
