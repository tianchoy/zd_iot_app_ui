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
open class GenPagesMyPkgMyPkg : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMyPkgMyPkg) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMyPkgMyPkg
            val _cache = __ins.renderCache
            val pkgTabs = ref(_uA<PackageStatus>("全部", "在用套餐", "待生效", "已失效"))
            val current = ref<Number>(0)
            val packageList = ref(_uA<Any>(_uO("name" to "车联网月包20G", "status" to "在用套餐", "effectiveTime" to "2026-04-01", "totalTraffic" to "20GB", "remainingTraffic" to "8.66GB", "expireDate" to "2026-04-30"), _uO("name" to "车联网月包10G", "status" to "待生效", "effectiveTime" to "待生效", "totalTraffic" to "10GB", "remainingTraffic" to "10GB", "expireDate" to "2026-05-30"), _uO("name" to "工业设备月包5G", "status" to "待生效", "effectiveTime" to "待生效", "totalTraffic" to "5GB", "remainingTraffic" to "5GB", "expireDate" to "2026-06-30"), _uO("name" to "测试套餐1G", "status" to "已失效", "effectiveTime" to "2026-03-01", "totalTraffic" to "1GB", "remainingTraffic" to "0", "expireDate" to "2026-03-31")))
            val getPackageText = fun(item: Any, key: String): String {
                val value = (item as UTSJSONObject)[key]
                return if (value == null) {
                    ""
                } else {
                    "" + value
                }
            }
            val filteredPackages = computed<UTSArray<Any>>(fun(): UTSArray<Any> {
                val currentStatus = pkgTabs.value[current.value]
                if (currentStatus === "全部") {
                    return packageList.value
                }
                return packageList.value.filter(fun(item: Any): Boolean {
                    return getPackageText(item, "status") === currentStatus
                }
                )
            }
            )
            val handleClick = fun(e: UTSJSONObject){
                current.value = e["index"] as Number
            }
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "在用套餐" -> 
                        return "status-active"
                    "待生效" -> 
                        return "status-pending"
                    "已失效" -> 
                        return "status-expired"
                    else -> 
                        return ""
                }
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_segmented_control = resolveEasyComponent("m-segmented-control", GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "我的套餐", "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info"), _uA(
                            _cE("view", _uM("class" to "info-title"), "当前卡号"),
                            _cE("view", _uM("class" to "info-value"), "1064916585160")
                        )),
                        _cE("view", _uM("class" to "pkg-box"), _uA(
                            _cV(_component_m_segmented_control, _uM("values" to pkgTabs.value, "current" to current.value, "textActiveColor" to "#2563eb", "onClick" to handleClick, "customStyle" to _uO("height" to "unset", "padding" to "5rpx 10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "values",
                                "current"
                            )),
                            _cE("scroll-view", _uM("class" to "package-list", "scroll-y" to "", "enhanced" to true), _uA(
                                if (filteredPackages.value.length === 0) {
                                    _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                        _cE("text", _uM("class" to "empty-text"), "暂无套餐")
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                _cE(Fragment, null, RenderHelpers.renderList(filteredPackages.value, fun(item, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to index, "class" to "package-card"), _uA(
                                        _cE("view", _uM("class" to "package-header"), _uA(
                                            _cE("text", _uM("class" to "package-name"), _tD(getPackageText(item, "name")), 1),
                                            _cE("text", _uM("class" to _nC(_uA(
                                                "status-tag",
                                                getStatusClass(getPackageText(item, "status"))
                                            ))), _tD(getPackageText(item, "status")), 3)
                                        )),
                                        _cE("view", _uM("class" to "effective-time"), _uA(
                                            _cE("text", _uM("class" to "time-label"), "生效时间："),
                                            _cE("text", _uM("class" to "time-value"), _tD(getPackageText(item, "effectiveTime")), 1)
                                        )),
                                        _cE("view", _uM("class" to "package-metrics"), _uA(
                                            _cE("view", _uM("class" to "metric-item"), _uA(
                                                _cE("text", _uM("class" to "metric-label"), "流量"),
                                                _cE("text", _uM("class" to "metric-value"), _tD(getPackageText(item, "totalTraffic")), 1)
                                            )),
                                            _cE("view", _uM("class" to "metric-item"), _uA(
                                                _cE("text", _uM("class" to "metric-label"), "剩余"),
                                                _cE("text", _uM("class" to "metric-value"), _tD(getPackageText(item, "remainingTraffic")), 1)
                                            )),
                                            _cE("view", _uM("class" to "metric-item"), _uA(
                                                _cE("text", _uM("class" to "metric-label"), "到期"),
                                                _cE("text", _uM("class" to "metric-value"), _tD(getPackageText(item, "expireDate")), 1)
                                            ))
                                        ))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb", "minHeight" to "1000rpx")), "card-info" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "pkg-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "info-title" to _uM(".card-info " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx"), ".pkg-box " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx")), "info-value" to _uM(".card-info " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333"), ".pkg-box " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "package-list" to _uM(".pkg-box " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "marginTop" to "24rpx", "marginRight" to 0, "marginBottom" to "24rpx", "marginLeft" to 0)), "package-card" to _uM(".pkg-box " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "28rpx", "paddingRight" to "28rpx", "paddingBottom" to "28rpx", "paddingLeft" to "28rpx", "marginBottom" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 4rpx 12rpx rgba(15, 23, 42, 0.04)")), "package-header" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "20rpx")), "package-name" to _uM(".pkg-box .package-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "status-tag" to _uM(".pkg-box .package-header " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "status-active" to _uM(".pkg-box .package-header " to _uM("backgroundImage" to "none", "backgroundColor" to "#ecfdf5", "color" to "#059669", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#a7f3d0", "borderRightColor" to "#a7f3d0", "borderBottomColor" to "#a7f3d0", "borderLeftColor" to "#a7f3d0")), "status-pending" to _uM(".pkg-box .package-header " to _uM("backgroundColor" to "#fff3e0", "color" to "#ed6c02", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#f3cea7", "borderRightColor" to "#f3cea7", "borderBottomColor" to "#f3cea7", "borderLeftColor" to "#f3cea7")), "status-expired" to _uM(".pkg-box .package-header " to _uM("backgroundImage" to "none", "backgroundColor" to "#fef2f2", "color" to "#dc2626", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fecaca", "borderRightColor" to "#fecaca", "borderBottomColor" to "#fecaca", "borderLeftColor" to "#fecaca")), "effective-time" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "28rpx")), "time-label" to _uM(".pkg-box .effective-time " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "time-value" to _uM(".pkg-box .effective-time " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "package-metrics" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "metric-item" to _uM(".pkg-box .package-metrics " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "backgroundColor" to "#f8fafc", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0, "marginTop" to 0, "marginRight" to "12rpx", "marginBottom" to 0, "marginLeft" to "12rpx")), "metric-label" to _uM(".pkg-box .package-metrics .metric-item " to _uM("fontSize" to "22rpx", "color" to "#64748b")), "metric-value" to _uM(".pkg-box .package-metrics .metric-item " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#1f2937")), "empty-state" to _uM(".pkg-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center", "paddingTop" to "200rpx")), "empty-text" to _uM(".pkg-box .empty-state " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
