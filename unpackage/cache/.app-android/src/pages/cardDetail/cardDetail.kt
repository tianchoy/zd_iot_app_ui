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
            val pkgMore = ref(false)
            val tabs = ref(_uA(
                _uO("name" to "基本信息"),
                _uO("name" to "卡片套餐"),
                _uO("name" to "卡片订单")
            ))
            val pkgTabs = ref(_uA(
                "全部",
                "在用套餐",
                "待生效",
                "已失效"
            ))
            val current = ref(0)
            val handleClick = fun(e: UTSJSONObject){
                current.value = e.getNumber("index") ?: 0
            }
            val changeTab = fun(e: CardDetailTabEvent){
                active.value = e.index
                activeName.value = e.item.name
            }
            val showMore = fun(){
                console.log(pkgMore.value, " at pages/cardDetail/cardDetail.uvue:296")
                pkgMore.value = !pkgMore.value
            }
            val cardDetail = fun(cardNumber: String){
                card_number.value = cardNumber
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            onLoad(fun(options){
                val cardNumber = options.getString("card_number") ?: ""
                console.log(cardNumber, " at pages/cardDetail/cardDetail.uvue:312")
                card_number.value = cardNumber
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_tag = resolveEasyComponent("m-tag", GenUniModulesMUnixComponentsMTagMTagClass)
                val _component_m_div = resolveEasyComponent("m-div", GenUniModulesMUnixComponentsMDivMDivClass)
                val _component_m_button = resolveEasyComponent("m-button", GenUniModulesMUnixComponentsMButtonMButtonClass)
                val _component_m_tabs = resolveEasyComponent("m-tabs", GenUniModulesMUnixComponentsMTabsMTabsClass)
                val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
                val _component_m_segmented_control = resolveEasyComponent("m-segmented-control", GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "卡片详情", "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "card-item", "onClick" to fun(){
                                cardDetail("1064916585160")
                            }
                            ), _uA(
                                _cE("view", _uM("class" to "item-head"), _uA(
                                    _cE("view", _uM("class" to "item-head-label"), _uA(
                                        _cE("text", _uM("class" to "card-item-title"), "1064916585160"),
                                        _cE("text", _uM("class" to "card-item-content"), "ICCID: 89860421123456789012")
                                    )),
                                    _cV(_component_m_tag, _uM("text" to "标签", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                )),
                                _cE("view", _uM("class" to "item-package"), _uA(
                                    _cE("text", _uM("class" to "package-label"), "当前套餐:"),
                                    _cE("text", _uM("class" to "package-value"), "车联网月包20G")
                                )),
                                _cV(_component_m_div, _uM("backgroundColor" to "#f1f5f9", "textClass" to "divider")),
                                _cE("view", _uM("class" to "card-metrics"), _uA(
                                    _cE("view", _uM("class" to "metric-box"), _uA(
                                        _cE("view", _uM("class" to "metric-label"), "到期时间"),
                                        _cE("view", _uM("class" to "metric-value"), "2026-04-30")
                                    )),
                                    _cE("view", _uM("class" to "metric-box"), _uA(
                                        _cE("view", _uM("class" to "metric-label"), "本月流量"),
                                        _cE("view", _uM("class" to "metric-value"), "11.34GB / 20GB")
                                    ))
                                )),
                                _cE("view", _uM("class" to "card-bottom"), _uA(
                                    _cE("text", _uM("class" to "cycle-label"), "总流量 20GB")
                                ))
                            ), 8, _uA(
                                "onClick"
                            )),
                            _cE("view", _uM("class" to "card-botton"), _uA(
                                _cV(_component_m_button, _uM("type" to "black", "plain" to true, "margin" to "0 20rpx", "height" to "70rpx", "shape" to "circle", "bold" to true), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "诊断"
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_m_button, _uM("type" to "black", "plain" to true, "margin" to "0 20rpx", "height" to "70rpx", "shape" to "circle", "bold" to true, "disabledGray" to true, "disabled" to true), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "已绑定"
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_m_button, _uM("type" to "primary", "plain" to false, "margin" to "0 20rpx", "height" to "70rpx", "shape" to "circle", "bold" to true, "shadow" to true), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "去充值"
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cV(_component_m_tabs, _uM("tabs" to unref(tabs), "width" to "auto", "padding" to 0, "isSlider" to false, "currentTab" to unref(active), "onChange" to changeTab, "unlined" to true, "bold" to true, "itemStyle" to _uO("backgroundColor" to "#fff", "borderRadius" to "24rpx", "padding" to "0 40rpx", "border" to "1rpx solid #e7edf5"), "selectedBgColor" to "#eff6ff", "selectedBorderColor" to "#bfdbfe"), null, 8, _uA(
                                "tabs",
                                "currentTab"
                            )),
                            _cE("view", _uM("class" to "card-content"), _uA(
                                _cE("view", _uM("class" to "section-title"), _tD(unref(activeName)), 1),
                                if (unref(activeName) == "基本信息") {
                                    _cE("view", _uM("key" to 0, "class" to "section-content"), _uA(
                                        _cE("view", _uM("class" to "base-info-box"), _uA(
                                            _cE("view", _uM("class" to "base-info"), _uA(
                                                _cE("view", _uM("class" to "info-item"), _uA(
                                                    _cE("text", _uM("class" to "info-label"), "卡片号"),
                                                    _cE("text", _uM("class" to "info-value"), _tD(unref(card_number)), 1)
                                                )),
                                                _cE("view", _uM("class" to "info-item"), _uA(
                                                    _cE("text", _uM("class" to "info-label"), "ICCID"),
                                                    _cE("text", _uM("class" to "info-value"), _tD(unref(card_number)), 1)
                                                )),
                                                _cE("view", _uM("class" to "info-item"), _uA(
                                                    _cE("text", _uM("class" to "info-label"), "IMSI"),
                                                    _cE("text", _uM("class" to "info-value"), _tD(unref(card_number)), 1)
                                                )),
                                                _cE("view", _uM("class" to "info-item"), _uA(
                                                    _cE("text", _uM("class" to "info-label"), "最近使用"),
                                                    _cE("text", _uM("class" to "info-value"), _tD(unref(card_number)), 1)
                                                ))
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "section-title"), "套餐状态"),
                                        _cE("view", _uM("class" to "pkg-content"), _uA(
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "当前套餐:"),
                                                _cE("text", _uM("class" to "pkg-value"), "车联网月包20G")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "套餐流量:"),
                                                _cE("text", _uM("class" to "pkg-value"), "20GB")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "套餐有效期:"),
                                                _cE("text", _uM("class" to "pkg-value"), "2026-04-30")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "待生效期数:"),
                                                _cE("view", _uM("class" to "pkg-value"), _uA(
                                                    _cE("text", null, "11"),
                                                    _cE("text", _uM("class" to "pkg-icon", "onClick" to showMore), _uA(
                                                        if (isTrue(!unref(pkgMore))) {
                                                            _cV(_component_m_icon, _uM("key" to 0, "name" to "arrow-down-filling", "size" to "20rpx"))
                                                        } else {
                                                            _cV(_component_m_icon, _uM("key" to 1, "name" to "arrow-up-filling", "size" to "20rpx"))
                                                        }
                                                    ))
                                                ))
                                            )),
                                            if (isTrue(unref(pkgMore))) {
                                                _cE("view", _uM("key" to 0, "class" to "pkg-date"), _uA(
                                                    _cE("view", _uM("class" to "date-list"), _uA(
                                                        _cE("text", _uM("class" to "date-label"), _uA(
                                                            _cE("text", _uM("class" to "date-period"), "第 1 期"),
                                                            _cE("text", null, "2026-04-30")
                                                        )),
                                                        _cV(_component_m_tag, _uM("text" to "标签", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "下期开始时间:"),
                                                _cE("text", _uM("class" to "pkg-value"), "2026-04-30")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "当前期次:"),
                                                _cE("text", _uM("class" to "pkg-value"), "第 1 期")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "当前期有效期:"),
                                                _cE("text", _uM("class" to "pkg-value"), "2026-04-30")
                                            )),
                                            _cE("view", _uM("class" to "pkg-item"), _uA(
                                                _cE("text", _uM("class" to "pkg-label"), "计费方式:"),
                                                _cE("text", _uM("class" to "pkg-value"), "按月计费")
                                            ))
                                        )),
                                        _cE("view", _uM("class" to "section-title"), "流量使用"),
                                        _cE("view", _uM("class" to "data-total"), _uA(
                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                _cE("text", _uM("class" to "total-label"), "本月已用:"),
                                                _cE("text", _uM("class" to "total-value"), "20GB")
                                            )),
                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                _cE("text", _uM("class" to "total-label"), "剩余流量:"),
                                                _cE("text", _uM("class" to "total-value"), "20GB")
                                            )),
                                            _cE("view", _uM("class" to "total-item"), _uA(
                                                _cE("text", _uM("class" to "total-label"), "总流量:"),
                                                _cE("text", _uM("class" to "total-value"), "20GB")
                                            ))
                                        ))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (unref(activeName) == "卡片套餐") {
                                    _cE("view", _uM("key" to 1, "class" to "section-content"), _uA(
                                        _cV(_component_m_segmented_control, _uM("values" to unref(pkgTabs), "current" to unref(current), "textActiveColor" to "#2563eb", "onClick" to handleClick, "customStyle" to _uO("height" to "unset", "padding" to "5rpx 10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                            "values",
                                            "current"
                                        )),
                                        _cE("view", _uM("class" to "card-pkg-box"), _uA(
                                            if (unref(current) == 0) {
                                                _cE("view", _uM("key" to 0, "class" to "card-pkg-all-box"), _uA(
                                                    _cE("view", _uM("class" to "item"), _uA(
                                                        _cE("view", _uM("class" to "item-head"), _uA(
                                                            _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                            _cV(_component_m_tag, _uM("text" to "全部", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                                        )),
                                                        _cE("view", _uM("class" to "item-sub-title"), "生效时间：待生效"),
                                                        _cE("view", _uM("class" to "item-data"), _uA(
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            ))
                                                        ))
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            if (unref(current) == 1) {
                                                _cE("view", _uM("key" to 1, "class" to "card-pkg-active-box"), _uA(
                                                    _cE("view", _uM("class" to "item"), _uA(
                                                        _cE("view", _uM("class" to "item-head"), _uA(
                                                            _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                            _cV(_component_m_tag, _uM("text" to "在用", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                                        )),
                                                        _cE("view", _uM("class" to "item-sub-title"), "生效时间：待生效"),
                                                        _cE("view", _uM("class" to "item-data"), _uA(
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            ))
                                                        ))
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            if (unref(current) == 2) {
                                                _cE("view", _uM("key" to 2, "class" to "card-pkg-exp-box"), _uA(
                                                    _cE("view", _uM("class" to "item"), _uA(
                                                        _cE("view", _uM("class" to "item-head"), _uA(
                                                            _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                            _cV(_component_m_tag, _uM("text" to "待生效", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                                        )),
                                                        _cE("view", _uM("class" to "item-sub-title"), "生效时间：待生效"),
                                                        _cE("view", _uM("class" to "item-data"), _uA(
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            ))
                                                        ))
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            },
                                            if (unref(current) == 3) {
                                                _cE("view", _uM("key" to 3, "class" to "card-pkg-fail-box"), _uA(
                                                    _cE("view", _uM("class" to "item"), _uA(
                                                        _cE("view", _uM("class" to "item-head"), _uA(
                                                            _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                            _cV(_component_m_tag, _uM("text" to "已失效", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                                        )),
                                                        _cE("view", _uM("class" to "item-sub-title"), "生效时间：待生效"),
                                                        _cE("view", _uM("class" to "item-data"), _uA(
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            )),
                                                            _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                _cE("text", _uM("class" to "item-data-value"), "20GB")
                                                            ))
                                                        ))
                                                    ))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        ))
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (unref(activeName) == "卡片订单") {
                                    _cE("view", _uM("key" to 2, "class" to "section-content card-order"), _uA(
                                        _cE("view", _uM("class" to "item"), _uA(
                                            _cE("view", _uM("class" to "item-head"), _uA(
                                                _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                _cV(_component_m_tag, _uM("text" to "已失效", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                                            )),
                                            _cE("view", _uM("class" to "item-sub-title"), "订单号: " + _tD(unref(card_number)), 1),
                                            _cE("view", _uM("class" to "item-data"), _uA(
                                                _cE("text", null, "2023-01-01"),
                                                _cE("text", _uM("class" to "total-value"), "¥200")
                                            ))
                                        ))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "card-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "card-item" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "column")), "item-head" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-start", "justifyContent" to "space-between"), ".container .card-box .card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "color" to "#334155", "marginBottom" to "12rpx"), ".container .card-box .card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "color" to "#334155", "marginBottom" to "12rpx")), "card-item-title" to _uM(".container .card-box .card-item .item-head " to _uM("fontSize" to "32rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.25)), "card-item-content" to _uM(".container .card-box .card-item .item-head " to _uM("marginTop" to 5, "fontSize" to 12, "color" to "#94a3b8", "lineHeight" to 1.45)), "item-package" to _uM(".container .card-box .card-item " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "minWidth" to 0)), "package-label" to _uM(".container .card-box .card-item .item-package " to _uM("fontSize" to 12, "color" to "#64748b", "lineHeight" to 1.4)), "package-value" to _uM(".container .card-box .card-item .item-package " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "25rpx", "fontWeight" to 700, "color" to "#334155", "lineHeight" to 1.45, "whiteSpace" to "nowrap", "overflow" to "hidden", "textOverflow" to "ellipsis")), "card-metrics" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "metric-box" to _uM(".container .card-box .card-item .card-metrics " to _uM("width" to "48%", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "minWidth" to 0)), "metric-label" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("fontSize" to "25rpx", "color" to "#94a3b8", "lineHeight" to 1.4)), "metric-value" to _uM(".container .card-box .card-item .card-metrics .metric-box " to _uM("marginTop" to "15rpx", "fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4)), "card-bottom" to _uM(".container .card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "cycle-label" to _uM(".container .card-box .card-item .card-bottom " to _uM("fontSize" to "25rpx", "color" to "#64748b", "lineHeight" to 1.45)), "card-botton" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "card-content" to _uM(".container .card-box " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to "20rpx")), "section-title" to _uM(".container .card-box .card-content " to _uM("fontSize" to "28rpx", "fontWeight" to 800, "color" to "#0f172a", "marginBottom" to "20rpx")), "base-info-box" to _uM(".container .card-box .card-content " to _uM("display" to "flex", "flexDirection" to "column")), "base-info" to _uM(".container .card-box .card-content .base-info-box " to _uM("display" to "flex", "flexDirection" to "column", "paddingBottom" to "24rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#eef2f7", "marginBottom" to "24rpx")), "info-item" to _uM(".container .card-box .card-content .base-info-box .base-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0)), "info-label" to _uM(".container .card-box .card-content .base-info-box .base-info .info-item " to _uM("color" to "#64748b")), "info-value" to _uM(".container .card-box .card-content .base-info-box .base-info .info-item " to _uM("fontWeight" to "bold", "color" to "#0f172a")), "pkg-content" to _uM(".container .card-box .card-content " to _uM("display" to "flex", "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx")), "pkg-item" to _uM(".container .card-box .card-content .pkg-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "marginBottom" to "12rpx")), "pkg-label" to _uM(".container .card-box .card-content .pkg-content .pkg-item " to _uM("color" to "#64748b")), "pkg-value" to _uM(".container .card-box .card-content .pkg-content .pkg-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "fontWeight" to "bold", "color" to "#0f172a")), "pkg-icon" to _uM(".container .card-box .card-content .pkg-content .pkg-item .pkg-value " to _uM("backgroundColor" to "#ffffff", "width" to "40rpx", "height" to "40rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%", "marginLeft" to "25rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "lineHeight" to "15rpx")), "pkg-date" to _uM(".container .card-box .card-content .pkg-content " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#eef2f7", "paddingTop" to "20rpx")), "date-list" to _uM(".container .card-box .card-content .pkg-content .pkg-date " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0, "fontSize" to "26rpx", "color" to "#334155")), "date-period" to _uM(".container .card-box .card-content .pkg-content .pkg-date .date-list " to _uM("marginRight" to "10rpx")), "data-total" to _uM(".container .card-box .card-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "color" to "#334155")), "total-item" to _uM(".container .card-box .card-content .data-total " to _uM("backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "marginTop" to 0, "marginRight" to "10rpx", "marginBottom" to 0, "marginLeft" to "10rpx", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "total-label" to _uM(".container .card-box .card-content .data-total .total-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "lineHeight" to 1.4, "marginBottom" to "10rpx")), "total-value" to _uM(".container .card-box .card-content .data-total .total-item " to _uM("fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4), ".container .card-box .card-content .card-order .item-data " to _uM("fontSize" to "30rpx", "fontWeight" to 900, "color" to "#ef4444")), "item" to _uM(".container .card-box .card-content .card-pkg-box " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx"), ".container .card-box .card-content .card-order " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx")), "item-label" to _uM(".container .card-box .card-content .card-pkg-box .item .item-head " to _uM("color" to "#64748b", "fontWeight" to "bold"), ".container .card-box .card-content .card-order .item .item-head " to _uM("color" to "#64748b", "fontWeight" to "bold")), "item-sub-title" to _uM(".container .card-box .card-content .card-pkg-box .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55), ".container .card-box .card-content .card-order .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55)), "item-data" to _uM(".container .card-box .card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55), ".container .card-box .card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55), ".container .card-box .card-content .card-order " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-data-item" to _uM(".container .card-box .card-content .card-pkg-box .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "10rpx", "marginRight" to "10rpx", "marginBottom" to "10rpx", "marginLeft" to "10rpx"), ".container .card-box .card-content .card-order .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "10rpx", "marginRight" to "10rpx", "marginBottom" to "10rpx", "marginLeft" to "10rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
