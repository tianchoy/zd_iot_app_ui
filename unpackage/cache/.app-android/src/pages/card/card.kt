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
open class GenPagesCardCard : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesCardCard) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesCardCard
            val _cache = __ins.renderCache
            val card_number = ref("")
            val tabs = ref(_uA(
                "全部",
                "在用",
                "异常"
            ))
            val current = ref(0)
            val allCardList = ref(_uA<CardItem>(CardItem(id = 1, cardNumber = "1064916585160", iccid = "89860421123456789012", tag = "主卡", status = "在用", currentPackage = "车联网月包20G", expireDate = "2026-04-30", usedTraffic = "11.34GB", totalTraffic = "20GB", currentCycle = "第1期 / 共12期"), CardItem(id = 2, cardNumber = "1064916585161", iccid = "89860421123456789013", tag = "副卡", status = "在用", currentPackage = "车联网月包10G", expireDate = "2026-05-15", usedTraffic = "5.21GB", totalTraffic = "10GB", currentCycle = "第2期 / 共6期"), CardItem(id = 3, cardNumber = "1064916585162", iccid = "89860421123456789014", tag = "测试卡", status = "异常", currentPackage = "测试套餐1G", expireDate = "2026-03-31", usedTraffic = "1GB", totalTraffic = "1GB", currentCycle = "第1期 / 共1期"), CardItem(id = 4, cardNumber = "1064916585163", iccid = "89860421123456789015", tag = "备用卡", status = "在用", currentPackage = "工业设备月包5G", expireDate = "2026-06-30", usedTraffic = "2.15GB", totalTraffic = "5GB", currentCycle = "第1期 / 共3期"), CardItem(id = 5, cardNumber = "1064916585164", iccid = "89860421123456789016", tag = "体验卡", status = "停机", currentPackage = "体验套餐500M", expireDate = "2026-02-28", usedTraffic = "500MB", totalTraffic = "500MB", currentCycle = "第1期 / 共1期")))
            val filteredCardList = computed(fun(): UTSArray<{
                var id: Number
                var cardNumber: String
                var iccid: String
                var tag: String
                var status: String
                var currentPackage: String
                var expireDate: String
                var usedTraffic: String
                var totalTraffic: String
                var currentCycle: String
            }> {
                val currentStatus = tabs.value[current.value]
                if (currentStatus === "全部") {
                    return allCardList.value
                }
                return allCardList.value.filter(fun(card): Boolean {
                    return card.status === currentStatus
                }
                )
            }
            )
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "在用" -> 
                        return "status-completed"
                    "异常" -> 
                        return "status-pending"
                    "停机" -> 
                        return "status-refunded"
                    else -> 
                        return ""
                }
            }
            val handleClick = fun(e: UTSJSONObject){
                console.log(e["index"], " at pages/card/card.uvue:174")
                if (e["index"] != null) {
                    current.value = e["index"]
                }
            }
            onLoad(fun(options){
                console.log(options, " at pages/card/card.uvue:181")
                if (isTruthy(options["type"])) {
                    current.value = Number(options["type"])
                }
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
                val _component_m_button = resolveEasyComponent("m-button", GenUniModulesMUnixComponentsMButtonMButtonClass)
                val _component_m_segmented_control = resolveEasyComponent("m-segmented-control", GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlClass)
                val _component_m_div = resolveEasyComponent("m-div", GenUniModulesMUnixComponentsMDivMDivClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "卡片", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box mb-24"), _uA(
                            _cE("view", _uM("class" to "card-label"), "卡号查询"),
                            _cE("view", _uM("class" to "search-value mt-24 mb-24"), _uA(
                                _cE("input", _uM("modelValue" to card_number.value, "onInput" to fun(`$event`: UniInputEvent){
                                    card_number.value = `$event`.detail.value
                                }
                                , "placeholder" to "请输入 ICCID / MSISDN", "class" to "search-input"), null, 40, _uA(
                                    "modelValue",
                                    "onInput"
                                )),
                                _cV(_component_m_button, _uM("type" to "white", "plain" to true, "class" to "scan-btn", "width" to "90rpx"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cV(_component_m_icon, _uM("name" to "scanning", "size" to "40rpx"))
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_m_button, _uM("type" to "primary", "width" to "120rpx"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "查询"
                                    )
                                }
                                ), "_" to 1))
                            )),
                            _cV(_component_m_segmented_control, _uM("values" to tabs.value, "current" to current.value, "textActiveColor" to "#2563eb", "onClick" to handleClick, "customStyle" to _uO("height" to "unset", "padding" to "5rpx 10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                "values",
                                "current"
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "card-list"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(filteredCardList.value, fun(card, index, __index, _cached): Any {
                                    return _cE("view", _uM("class" to "card-item", "key" to index), _uA(
                                        _cE("view", _uM("class" to "item-head"), _uA(
                                            _cE("view", _uM("class" to "item-head-label"), _uA(
                                                _cE("text", _uM("class" to "card-item-title"), _tD(card.cardNumber), 1),
                                                _cE("text", _uM("class" to "card-item-content"), "ICCID: " + _tD(card.iccid), 1)
                                            )),
                                            _cE("text", _uM("class" to _nC(_uA(
                                                "status-tag",
                                                getStatusClass(card.status)
                                            ))), _tD(card.status), 3)
                                        )),
                                        _cE("view", _uM("class" to "item-package"), _uA(
                                            _cE("text", _uM("class" to "package-label"), "当前套餐:"),
                                            _cE("text", _uM("class" to "package-value"), _tD(card.currentPackage), 1)
                                        )),
                                        _cV(_component_m_div, _uM("backgroundColor" to "#f1f5f9", "textClass" to "divider")),
                                        _cE("view", _uM("class" to "card-metrics"), _uA(
                                            _cE("view", _uM("class" to "metric-box mr-24"), _uA(
                                                _cE("view", _uM("class" to "metric-label"), "到期时间"),
                                                _cE("view", _uM("class" to "metric-value"), _tD(card.expireDate), 1)
                                            )),
                                            _cE("view", _uM("class" to "metric-box"), _uA(
                                                _cE("view", _uM("class" to "metric-label"), "本月流量"),
                                                _cE("view", _uM("class" to "metric-value"), _tD(card.usedTraffic) + " / " + _tD(card.totalTraffic), 1)
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "card-bottom"), _uA(
                                            _cE("view", _uM("class" to "card-cycle-text"), _uA(
                                                _cE("text", _uM("class" to "cycle-label"), "当前周期："),
                                                _cE("text", _uM("class" to "cycle-value"), _tD(card.currentCycle), 1)
                                            )),
                                            _cV(_component_m_button, _uM("type" to "primary", "width" to "200rpx", "btnSize" to "mini", "size" to "25rpx", "shape" to "circle"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    "去充值"
                                                )
                                            }
                                            ), "_" to 1))
                                        ))
                                    ))
                                }
                                ), 128)
                            ))
                        )),
                        if (filteredCardList.value.length === 0) {
                            _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                _cE("text", _uM("class" to "empty-text"), "暂无卡片数据")
                            ))
                        } else {
                            _cC("v-if", true)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb", "minHeight" to "1000rpx", "paddingBottom" to "40rpx")), "card-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "search-value" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "search-input" to _uM(".container .card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to 0, "paddingRight" to "25rpx", "paddingBottom" to 0, "paddingLeft" to "25rpx", "height" to "95rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#0f172a", "fontSize" to "30rpx")), "scan-btn" to _uM(".container .card-box .search-value " to _uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7")), "card-item" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "column", "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#e7edf5", "paddingBottom" to "30rpx", "marginBottom" to "30rpx")), "item-head" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-start", "justifyContent" to "space-between")), "card-item-title" to _uM(".container .card-box .card-item .item-head " to _uM("fontSize" to "32rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.25)), "card-item-content" to _uM(".container .card-box .card-item .item-head " to _uM("marginTop" to 5, "fontSize" to 12, "color" to "#94a3b8", "lineHeight" to 1.45)), "status-tag" to _uM(".container .card-box .card-item .item-head " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "status-completed" to _uM(".container .card-box .card-item .item-head " to _uM("backgroundImage" to "none", "backgroundColor" to "#ecfdf5", "color" to "#059669", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#a7f3d0", "borderRightColor" to "#a7f3d0", "borderBottomColor" to "#a7f3d0", "borderLeftColor" to "#a7f3d0")), "status-pending" to _uM(".container .card-box .card-item .item-head " to _uM("backgroundImage" to "none", "backgroundColor" to "#fff7ed", "color" to "#ea580c", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fdba74", "borderRightColor" to "#fdba74", "borderBottomColor" to "#fdba74", "borderLeftColor" to "#fdba74")), "status-refunded" to _uM(".container .card-box .card-item .item-head " to _uM("backgroundImage" to "none", "backgroundColor" to "#fef2f2", "color" to "#dc2626", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fecaca", "borderRightColor" to "#fecaca", "borderBottomColor" to "#fecaca", "borderLeftColor" to "#fecaca")), "item-package" to _uM(".container .card-box .card-item " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "minWidth" to 0)), "package-label" to _uM(".container .card-box .card-item .item-package " to _uM("fontSize" to 12, "color" to "#64748b", "lineHeight" to 1.4)), "package-value" to _uM(".container .card-box .card-item .item-package " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "25rpx", "fontWeight" to 700, "color" to "#334155", "lineHeight" to 1.45, "whiteSpace" to "nowrap", "overflow" to "hidden", "textOverflow" to "ellipsis")), "card-metrics" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "metric-box" to _uM(".container .card-box .card-item .card-metrics " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "minWidth" to 0)), "metric-label" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("fontSize" to "25rpx", "color" to "#94a3b8", "lineHeight" to 1.4)), "metric-value" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("marginTop" to "15rpx", "fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4)), "card-bottom" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "card-cycle-text" to _uM(".container .card-box .card-item .card-bottom " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "cycle-label" to _uM(".container .card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "25rpx", "color" to "#64748b", "lineHeight" to 1.45)), "cycle-value" to _uM(".container .card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "25rpx", "color" to "#334155", "fontWeight" to 800)), "empty-state" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "120rpx", "paddingRight" to "32rpx", "paddingBottom" to "120rpx", "paddingLeft" to "32rpx", "backgroundColor" to "#ffffff", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "empty-text" to _uM(".container .empty-state " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
