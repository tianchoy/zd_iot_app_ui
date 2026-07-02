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
open class GenPagesMyPkgMyPkg : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMyPkgMyPkg) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMyPkgMyPkg
            val _cache = __ins.renderCache
            val card_number = ref<String>("")
            val pkgTabs = ref(_uA<PackageTab>(PackageTab(name = "全部", value = ""), PackageTab(name = "在用套餐", value = "1"), PackageTab(name = "待生效", value = "0"), PackageTab(name = "已失效", value = "2")))
            val current = ref<Number>(0)
            val pkgInfoList = ref(_uA<PkgInfoItem>())
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
                                console.log("查询套餐列表失败:", res.msg, " at pages/myPkg/myPkg.uvue:107")
                                pkgInfoList.value = _uA()
                            }
                        }
                         catch (error: Throwable) {
                            console.error("查询套餐列表异常:", error, " at pages/myPkg/myPkg.uvue:111")
                            pkgInfoList.value = _uA()
                        }
                })
            }
            val handleClick = fun(e: UTSJSONObject){
                if (e["index"] != null) {
                    current.value = e["index"] as Number
                    getPkgInfoList(e["value"].toString())
                }
            }
            val handlePkgDetail = fun(item: PkgInfoItem){
                console.log(item, " at pages/myPkg/myPkg.uvue:126")
                uni_navigateTo(NavigateToOptions(url = "/pages/pkgDetail/pkgDetail?pkgId=" + item.id))
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
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            onLoad(fun(options){
                val cardNumber = options["card_number"] ?: ""
                card_number.value = cardNumber
                getPkgInfoList("")
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "我的套餐", "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info"), _uA(
                            _cE("view", _uM("class" to "info-title"), "当前卡号"),
                            _cE("view", _uM("class" to "info-value"), _tD(card_number.value), 1)
                        )),
                        _cE("view", _uM("class" to "pkg-box"), _uA(
                            _cV(_component_rice_tabs, _uM("modelValue" to current.value, "onUpdate:modelValue" to fun(`$event`: Number){
                                current.value = `$event`
                            }
                            , "line-color" to "#ffffff", "list" to pkgTabs.value, "line-width" to 0, "title-active-color" to "#2563eb", "onChange" to handleClick, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue",
                                "list"
                            )),
                            _cE("scroll-view", _uM("class" to "package-list", "scroll-y" to "", "enhanced" to true), _uA(
                                if (pkgInfoList.value.length == 0) {
                                    _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                        _cE("text", _uM("class" to "empty-text"), "暂无套餐")
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                _cE(Fragment, null, RenderHelpers.renderList(pkgInfoList.value, fun(item, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to index, "class" to "package-card", "onClick" to fun(){
                                        handlePkgDetail(item)
                                    }
                                    ), _uA(
                                        _cE("view", _uM("class" to "package-header"), _uA(
                                            if (isTrue(item.name)) {
                                                _cE("text", _uM("key" to 0, "class" to "package-name"), _tD(item.name), 1)
                                            } else {
                                                _cC("v-if", true)
                                            }
                                            ,
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
                                            _cE("view", _uM("key" to 0, "class" to "effective-time", "style" to _nS(_uM("margin-bottom" to "0"))), _uA(
                                                _cE("text", _uM("class" to "time-label"), "生效时间："),
                                                _cE("text", _uM("class" to "time-value"), _tD(item.startTime), 1)
                                            ), 4)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                        ,
                                        if (isTrue(item.endTime)) {
                                            _cE("view", _uM("key" to 1, "class" to "effective-time"), _uA(
                                                _cE("text", _uM("class" to "time-label"), "到期时间："),
                                                _cE("text", _uM("class" to "time-value"), _tD(item.endTime), 1)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                        ,
                                        _cE("view", _uM("class" to "package-metrics"), _uA(
                                            if (isTrue(item.leftFlow)) {
                                                _cE("view", _uM("key" to 0, "class" to "metric-item"), _uA(
                                                    _cE("text", _uM("class" to "metric-label"), "剩余"),
                                                    _cE("text", _uM("class" to "metric-value"), _tD(item.leftFlow) + "GB", 1)
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
                                            ,
                                            if (isTrue(item.usedFlow)) {
                                                _cE("view", _uM("key" to 1, "class" to "metric-item"), _uA(
                                                    _cE("text", _uM("class" to "metric-label"), "已用"),
                                                    _cE("text", _uM("class" to "metric-value"), _tD(item.usedFlow) + "GB", 1)
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
                                            ,
                                            if (isTrue(item.totalFlow)) {
                                                _cE("view", _uM("key" to 2, "class" to "metric-item"), _uA(
                                                    _cE("text", _uM("class" to "metric-label"), "流量"),
                                                    _cE("text", _uM("class" to "metric-value"), _tD(item.totalFlow) + "GB", 1)
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        ))
                                    ), 8, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "card-info" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "pkg-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "info-title" to _uM(".card-info " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx"), ".pkg-box " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx")), "info-value" to _uM(".card-info " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333"), ".pkg-box " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "package-list" to _uM(".pkg-box " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "marginTop" to "24rpx", "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "package-card" to _uM(".pkg-box " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "marginBottom" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 4rpx 12rpx rgba(15, 23, 42, 0.04)", "marginBottom:last-child" to 0)), "package-header" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "20rpx")), "package-name" to _uM(".pkg-box .package-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "status-tag" to _uM(".pkg-box .package-header " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "status-active" to _uM(".pkg-box .package-header " to _uM("backgroundImage" to "none", "backgroundColor" to "#ecfdf5", "color" to "#059669", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#a7f3d0", "borderRightColor" to "#a7f3d0", "borderBottomColor" to "#a7f3d0", "borderLeftColor" to "#a7f3d0")), "status-pending" to _uM(".pkg-box .package-header " to _uM("backgroundColor" to "#fff3e0", "color" to "#ed6c02", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#f3cea7", "borderRightColor" to "#f3cea7", "borderBottomColor" to "#f3cea7", "borderLeftColor" to "#f3cea7")), "status-expired" to _uM(".pkg-box .package-header " to _uM("backgroundImage" to "none", "backgroundColor" to "#fef2f2", "color" to "#dc2626", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fecaca", "borderRightColor" to "#fecaca", "borderBottomColor" to "#fecaca", "borderLeftColor" to "#fecaca")), "effective-time" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "28rpx")), "time-label" to _uM(".pkg-box .effective-time " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "time-value" to _uM(".pkg-box .effective-time " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "package-metrics" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "metric-item" to _uM(".pkg-box .package-metrics " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "backgroundColor" to "#f8fafc", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0, "marginTop" to 0, "marginRight" to "12rpx", "marginBottom" to 0, "marginLeft" to "12rpx")), "metric-label" to _uM(".pkg-box .package-metrics .metric-item " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "metric-value" to _uM(".pkg-box .package-metrics .metric-item " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#1f2937", "marginTop" to "10rpx")), "empty-state" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center", "paddingTop" to "100rpx", "paddingRight" to 0, "paddingBottom" to "100rpx", "paddingLeft" to 0)), "empty-text" to _uM(".pkg-box .empty-state " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
