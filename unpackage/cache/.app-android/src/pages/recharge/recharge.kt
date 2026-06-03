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
open class GenPagesRechargeRecharge : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesRechargeRecharge) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesRechargeRecharge
            val _cache = __ins.renderCache
            val showPopup = ref<Boolean>(false)
            val progress1 = ref<Number>(80)
            val active = ref<Number>(0)
            val tabs = ref(_uA<TabItem>(TabItem(name = "套餐包"), TabItem(name = "加油包")))
            val packageList = ref(_uA<PackageItem>(PackageItem(name = "车联网月包20G", tag = "推荐", data = "20GB", validity = "30天", price = 90, originalPrice = 100), PackageItem(name = "车联网月包10G", tag = "", data = "10GB", validity = "30天", price = 50, originalPrice = 0), PackageItem(name = "工业设备月包5G", tag = "", data = "5GB", validity = "30天", price = 30, originalPrice = 0)))
            val refillList = ref(_uA<PackageItem>(PackageItem(name = "加油包5G", tag = "推荐", data = "5GB", validity = "7天", price = 20, originalPrice = 30), PackageItem(name = "加油包10G", tag = "", data = "10GB", validity = "15天", price = 35, originalPrice = 45), PackageItem(name = "加油包20G", tag = "", data = "20GB", validity = "30天", price = 60, originalPrice = 80)))
            val selectedPackageIndex = ref<Number>(0)
            val selectedRefillIndex = ref<Number>(0)
            val currentPrice = computed<Number>(fun(): Number {
                if (active.value === 0) {
                    val item = packageList.value[selectedPackageIndex.value]
                    return if (item != null) {
                        item.price
                    } else {
                        0
                    }
                } else {
                    val item = refillList.value[selectedRefillIndex.value]
                    return if (item != null) {
                        item.price
                    } else {
                        0
                    }
                }
            }
            )
            val changeTab = fun(e: ChangeTabEvent){
                active.value = e.index
            }
            val selectPackage = fun(index: Number){
                selectedPackageIndex.value = index
            }
            val selectRefill = fun(index: Number){
                selectedRefillIndex.value = index
            }
            val choosePayment = fun(){
                showPopup.value = true
            }
            val handleCancelPayment = fun(){
                showPopup.value = false
            }
            val handleConfirmPayment = fun(e: Any){
                console.log(e, " at pages/recharge/recharge.uvue:267")
                showPopup.value = false
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val toMyPackage = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/myPkg/myPkg"))
            }
            val toOrderRecord = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/orderRecord/orderRecord"))
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_tag = resolveEasyComponent("m-tag", GenUniModulesMUnixComponentsMTagMTagClass)
                val _component_m_button = resolveEasyComponent("m-button", GenUniModulesMUnixComponentsMButtonMButtonClass)
                val _component_m_tabs = resolveEasyComponent("m-tabs", GenUniModulesMUnixComponentsMTabsMTabsClass)
                val _component_block = resolveComponent("block")
                val _component_m_bottom_popup = resolveEasyComponent("m-bottom-popup", GenUniModulesMUnixComponentsMBottomPopupMBottomPopupClass)
                val _component_m_sticky_bottom = resolveEasyComponent("m-sticky-bottom", GenUniModulesMUnixComponentsMStickyBottomMStickyBottomClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "充值首页", "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info"), _uA(
                            _cE("view", _uM("class" to "card-title"), _uA(
                                _cE("text", _uM("class" to "title"), "卡片信息"),
                                _cV(_component_m_tag, _uM("text" to "标签", "round" to true, "plain" to true, "size" to "small", "type" to "primary"))
                            )),
                            _cE("view", _uM("class" to "card-number"), _uA(
                                _cE("text", null, "1234567890123456")
                            )),
                            _cE("view", _uM("class" to "info-list"), _uA(
                                _cE("view", _uM("class" to "info-item"), _uA(
                                    _cE("text", _uM("class" to "label"), "当前套餐"),
                                    _cE("text", _uM("class" to "value"), "车联网月包20G（名称较长时自动换行展示）")
                                )),
                                _cE("view", _uM("class" to "info-item"), _uA(
                                    _cE("text", _uM("class" to "label"), "卡片余额"),
                                    _cE("text", _uM("class" to "value"), "¥1000.00")
                                ))
                            )),
                            _cE("view", _uM("class" to "flow-box"), _uA(
                                _cE("view", _uM("class" to "flow-label"), "充值成功"),
                                _cV(unref(GenComponentsProgressClass), _uM("value" to progress1.value), null, 8, _uA(
                                    "value"
                                ))
                            )),
                            _cE("view", _uM("class" to "card-bottom"), _uA(
                                _cV(_component_m_button, _uM("type" to "white", "plain" to true, "margin" to "0 20rpx", "height" to "70rpx", "shape" to "circle", "bold" to true, "onClick" to toMyPackage), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "卡片套餐"
                                    )
                                }
                                ), "_" to 1)),
                                _cV(_component_m_button, _uM("type" to "white", "plain" to true, "margin" to "0 20rpx", "height" to "70rpx", "shape" to "circle", "bold" to true, "onClick" to toOrderRecord), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "订单记录"
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )),
                        _cE("view", _uM("class" to "pkg-box"), _uA(
                            _cV(_component_m_tabs, _uM("tabs" to tabs.value, "width" to "100rpx", "padding" to 0, "isSlider" to true, "currentTab" to active.value, "onChange" to changeTab, "unlined" to false, "bold" to true), null, 8, _uA(
                                "tabs",
                                "currentTab"
                            )),
                            _cE("view", _uM("class" to "pkg-content"), _uA(
                                if (active.value === 0) {
                                    _cV(_component_block, _uM("key" to 0), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(packageList.value, fun(item, index, __index, _cached): Any {
                                                return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                                    "pkg-card",
                                                    _uM("pkg-card-selected" to (selectedPackageIndex.value === index))
                                                )), "onClick" to fun(){
                                                    selectPackage(index)
                                                }), _uA(
                                                    _cE("view", _uM("class" to "pkg-info"), _uA(
                                                        _cE("view", _uM("class" to "pkg-name"), _uA(
                                                            _cE("text", _uM("class" to "pkg-title"), _tD(item.name), 1),
                                                            if (isTrue(item.tag)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-tag"), _tD(item.tag), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        )),
                                                        _cE("view", _uM("class" to "pkg-desc"), _uA(
                                                            _cE("text", _uM("class" to "pkg-icon"), "流量 " + _tD(item.data), 1),
                                                            _cE("text", _uM("class" to "pkg-icon"), "有效期 " + _tD(item.validity), 1)
                                                        ))
                                                    )),
                                                    _cE("view", _uM("class" to "pkg-price"), _uA(
                                                        _cE("view", _uM("class" to "price-wrapper"), _uA(
                                                            _cE("text", _uM("class" to "price-symbol"), "¥"),
                                                            _cE("text", _uM("class" to "price-number"), _tD(item.price), 1)
                                                        )),
                                                        if (isTrue(item.originalPrice)) {
                                                            _cE("view", _uM("key" to 0, "class" to "price-original"), _uA(
                                                                _cE("text", null, "¥" + _tD(item.originalPrice), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ), 10, _uA(
                                                    "onClick"
                                                ))
                                            }), 128)
                                        )
                                    }), "_" to 1))
                                } else {
                                    _cV(_component_block, _uM("key" to 1), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(refillList.value, fun(item, index, __index, _cached): Any {
                                                return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                                    "pkg-card",
                                                    _uM("pkg-card-selected" to (selectedRefillIndex.value === index))
                                                )), "onClick" to fun(){
                                                    selectRefill(index)
                                                }
                                                ), _uA(
                                                    _cE("view", _uM("class" to "pkg-info"), _uA(
                                                        _cE("view", _uM("class" to "pkg-name"), _uA(
                                                            _cE("text", _uM("class" to "pkg-title"), _tD(item.name), 1),
                                                            if (isTrue(item.tag)) {
                                                                _cE("text", _uM("key" to 0, "class" to "pkg-tag"), _tD(item.tag), 1)
                                                            } else {
                                                                _cC("v-if", true)
                                                            }
                                                        )),
                                                        _cE("view", _uM("class" to "pkg-desc"), _uA(
                                                            _cE("text", _uM("class" to "pkg-icon"), "流量 " + _tD(item.data), 1),
                                                            _cE("text", _uM("class" to "pkg-icon"), "有效期 " + _tD(item.validity), 1)
                                                        ))
                                                    )),
                                                    _cE("view", _uM("class" to "pkg-price"), _uA(
                                                        _cE("view", _uM("class" to "price-wrapper"), _uA(
                                                            _cE("text", _uM("class" to "price-symbol"), "¥"),
                                                            _cE("text", _uM("class" to "price-number"), _tD(item.price), 1)
                                                        )),
                                                        if (isTrue(item.originalPrice)) {
                                                            _cE("view", _uM("key" to 0, "class" to "price-original"), _uA(
                                                                _cE("text", null, "¥" + _tD(item.originalPrice), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                ), 10, _uA(
                                                    "onClick"
                                                ))
                                            }
                                            ), 128)
                                        )
                                    }
                                    ), "_" to 1))
                                }
                            ))
                        ))
                    )),
                    _cV(_component_m_bottom_popup, _uM("show" to showPopup.value, "height" to "75%", "radius" to true, "onClose" to fun(){
                        showPopup.value = false
                    }
                    ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(unref(GenComponentsPaymentClass), _uM("amount" to currentPrice.value, "onCancel" to handleCancelPayment, "onConfirm" to handleConfirmPayment), null, 8, _uA(
                                "amount"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "show",
                        "onClose"
                    )),
                    _cV(_component_m_sticky_bottom, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "bottom-box"), _uA(
                                _cE("view", _uM("class" to "price-box"), _uA(
                                    _cE("text", _uM("class" to "price-label"), "当前套餐金额"),
                                    _cE("text", _uM("class" to "price-value"), "¥" + _tD(currentPrice.value), 1)
                                )),
                                _cV(_component_m_button, _uM("type" to "primary", "onClick" to choosePayment, "plain" to false, "margin" to "0 20rpx", "width" to "200rpx", "height" to "70rpx", "shape" to "circle", "bold" to true, "shadow" to false), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "去支付"
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )
                    }
                    ), "_" to 1))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "card-info" to _uM(".container " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx")), "card-title" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "title" to _uM(".container .card-info .card-title " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "card-number" to _uM(".container .card-info " to _uM("color" to "#475569", "marginTop" to "24rpx")), "info-list" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "column")), "info-item" to _uM(".container .card-info .info-list " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0)), "label" to _uM(".container .card-info .info-list .info-item " to _uM("color" to "#64748b", "marginRight" to "20rpx")), "value" to _uM(".container .card-info .info-list .info-item " to _uM("fontWeight" to "bold", "whiteSpace" to "pre-wrap", "lineHeight" to 1.5)), "flow-box" to _uM(".container .card-info " to _uM("marginTop" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "flow-label" to _uM(".container .card-info .flow-box " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginBottom" to "12rpx")), "card-bottom" to _uM(".container .card-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "marginTop" to "24rpx")), "pkg-box" to _uM(".container " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to "24rpx", "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx")), "pkg-content" to _uM(".container " to _uM("marginTop" to "20rpx")), "pkg-card" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "28rpx", "paddingRight" to "24rpx", "paddingBottom" to "28rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx", "transitionProperty" to "all", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease")), "pkg-info" to _uM(".container .pkg-card " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "pkg-name" to _uM(".container .pkg-card .pkg-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginBottom" to "12rpx", "flexWrap" to "wrap")), "pkg-title" to _uM(".container .pkg-card .pkg-info .pkg-name " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#1e293b")), "pkg-tag" to _uM(".container .pkg-card .pkg-info .pkg-name " to _uM("backgroundImage" to "linear-gradient(135deg, #ff9a3c, #ff6b3c)", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#ffffff", "fontSize" to "20rpx", "paddingTop" to "4rpx", "paddingRight" to "16rpx", "paddingBottom" to "4rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginLeft" to "12rpx")), "pkg-desc" to _uM(".container .pkg-card .pkg-info " to _uM("display" to "flex", "flexDirection" to "row", "fontSize" to "24rpx", "color" to "#64748b")), "pkg-icon" to _uM(".container .pkg-card .pkg-info .pkg-desc " to _uM("display" to "flex", "alignItems" to "center", "paddingTop" to "10rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "#f8fafc", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "color" to "#475569", "fontSize" to "20rpx", "fontWeight" to 700, "marginRight" to "20rpx")), "pkg-price" to _uM(".container .pkg-card " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-end")), "price-wrapper" to _uM(".container .pkg-card .pkg-price " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "price-symbol" to _uM(".container .pkg-card .pkg-price .price-wrapper " to _uM("fontSize" to "24rpx", "color" to "#ef4444", "fontWeight" to "bold")), "price-number" to _uM(".container .pkg-card .pkg-price .price-wrapper " to _uM("fontSize" to "40rpx", "color" to "#ef4444", "fontWeight" to "bold")), "price-original" to _uM(".container .pkg-card .pkg-price " to _uM("fontSize" to "22rpx", "color" to "#94a3b8", "marginTop" to "4rpx")), "pkg-card-selected" to _uM(".container " to _uM("borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#3b82f6", "borderRightColor" to "#3b82f6", "borderBottomColor" to "#3b82f6", "borderLeftColor" to "#3b82f6", "backgroundImage" to "none", "backgroundColor" to "#f8fafc", "boxShadow" to "0 4rpx 12rpx rgba(59, 130, 246, 0.08)")), "bottom-box" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "price-box" to _uM(".bottom-box " to _uM("display" to "flex", "flexDirection" to "column", "marginLeft" to "24rpx")), "price-label" to _uM(".bottom-box .price-box " to _uM("fontSize" to "24rpx", "color" to "#64748b")), "price-value" to _uM(".bottom-box .price-box " to _uM("fontWeight" to "bold", "color" to "#ef4444", "fontSize" to "40rpx")), "@TRANSITION" to _uM("pkg-card" to _uM("property" to "all", "duration" to "0.2s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
