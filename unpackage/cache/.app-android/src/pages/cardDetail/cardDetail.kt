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
            val cardDetail = ref<CardDetail>(CardDetail())
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
                _uO("name" to "全部"),
                _uO("name" to "在用套餐"),
                _uO("name" to "待生效"),
                _uO("name" to "已失效")
            ))
            val orderDates = ref(_uA(
                "2026-03-25",
                "2026-02-25",
                "2026-01-25"
            ))
            val packageList = ref(_uA<PackageItem__1>(PackageItem__1(name = "车联网月包20G", status = "active", statusText = "在用", tagType = "success", startTime = "2026-04-01", totalFlow = "20GB", usedFlow = "11.34GB", leftFlow = "8.66GB"), PackageItem__1(name = "车联网月包20G", status = "pending", statusText = "待生效", tagType = "warning", startTime = "2026-05-01", totalFlow = "20GB", usedFlow = "0GB", leftFlow = "20GB"), PackageItem__1(name = "车联网月包20G", status = "pending", statusText = "待生效", tagType = "warning", startTime = "2026-06-01", totalFlow = "20GB", usedFlow = "0GB", leftFlow = "20GB"), PackageItem__1(name = "车联网月包20G", status = "expired", statusText = "已失效", tagType = "danger", startTime = "2025-03-01", totalFlow = "20GB", usedFlow = "20GB", leftFlow = "0GB"), PackageItem__1(name = "车联网月包20G", status = "expired", statusText = "已失效", tagType = "danger", startTime = "2025-02-01", totalFlow = "20GB", usedFlow = "20GB", leftFlow = "0GB")))
            val current__1 = ref(0)
            val filteredPackageList = computed<UTSArray<PackageItem__1>>(fun(): UTSArray<PackageItem__1> {
                if (current__1.value == 1) {
                    return packageList.value.filter(fun(item): Boolean {
                        return item.status == "active"
                    }
                    )
                }
                if (current__1.value == 2) {
                    return packageList.value.filter(fun(item): Boolean {
                        return item.status == "pending"
                    }
                    )
                }
                if (current__1.value == 3) {
                    return packageList.value.filter(fun(item): Boolean {
                        return item.status == "expired"
                    }
                    )
                }
                return packageList.value
            }
            )
            val handleClick = fun(e: UTSJSONObject){
                if (e["index"] != null) {
                    current__1.value = e["index"] as Number
                }
            }
            val changeTab = fun(e: CardDetailTabEvent){
                active.value = e.index
                activeName.value = e.name
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val getNavBarInfo = fun(){}
            val handleRecharge = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/recharge/recharge?cardNumber=" + card_number.value))
            }
            val getCardDetail = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(queryCardDetail(card_number.value))
                        console.log(res, " at pages/cardDetail/cardDetail.uvue:205")
                        if (res.code == 200) {
                            cardDetail.value = res.data
                        } else {
                            cardDetail.value = _uO()
                        }
                })
            }
            val isBinded = ref(false)
            val handleBindCard = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(userBindCard(BindCard(rechargeNo = cardDetail.value?.rechargeNo ?: "")))
                        console.log(res, " at pages/cardDetail/cardDetail.uvue:219")
                        if (res.code == 200) {
                            uni_showToast(ShowToastOptions(title = "绑定成功", icon = "success"))
                            isBinded.value = true
                        } else {
                            uni_showToast(ShowToastOptions(title = res.msg ?: "绑定失败", icon = "none"))
                        }
                })
            }
            val getPkgInfoList = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(queryPkgInfoList(PkgInfoListParams(rechargeNo = card_number.value)))
                        console.log(res, " at pages/cardDetail/cardDetail.uvue:239")
                })
            }
            onMounted(fun(){
                getNavBarInfo()
            }
            )
            onLoad(fun(options){
                val cardNumber = options["cardNumber"] ?: ""
                card_number.value = cardNumber
                getCardDetail()
                getPkgInfoList()
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_tabs = resolveEasyComponent("rice-tabs", GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass)
                val _component_rice_tag = resolveEasyComponent("rice-tag", GenUniModulesRiceUiComponentsRiceTagRiceTagClass)
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                return _cE("view", _uM("class" to "page-container"), _uA(
                    _cV(_component_topNavBar, _uM("title" to unref(card_number), "show-back" to true, "onBack" to goBack, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false), null, 8, _uA(
                        "title"
                    )),
                    if (isTrue(unref(cardDetail))) {
                        _cE("view", _uM("key" to 0), _uA(
                            _cE("view", _uM("class" to "card-box fixed-tabs", "style" to _nS(unref(fixedTabsStyle))), _uA(
                                _cV(_component_rice_tabs, _uM("modelValue" to unref(active), "onUpdate:modelValue" to fun(`$event`: Number){
                                    trySetRefValue(active, `$event`)
                                }, "line-color" to "#ffffff", "list" to unref(tabs), "line-width" to 0, "title-active-color" to "#2563eb", "onChange" to changeTab, "customStyle" to _uO("height" to "85rpx", "padding" to "10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                    "modelValue",
                                    "list"
                                ))
                            ), 4),
                            _cE("view", _uM("class" to "container"), _uA(
                                _cE("view", _uM("class" to "card-box content-card"), _uA(
                                    _cE("view", _uM("class" to "card-content"), _uA(
                                        _cE("view", _uM("class" to "section-title"), _tD(unref(activeName)), 1),
                                        if (unref(activeName) == "基本信息") {
                                            _cE("view", _uM("key" to 0, "class" to "section-content"), _uA(
                                                _cE("view", _uM("class" to "base-info-box"), _uA(
                                                    _cE("view", _uM("class" to "base-info"), _uA(
                                                        if (isTrue(unref(cardDetail).rechargeNo)) {
                                                            _cE("view", _uM("key" to 0, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "充值号"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).rechargeNo), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        if (isTrue(unref(cardDetail).pkgName)) {
                                                            _cE("view", _uM("key" to 1, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "套餐名称"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).pkgName), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        if (isTrue(unref(cardDetail).effectiveTime)) {
                                                            _cE("view", _uM("key" to 2, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "生效时间"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).effectiveTime), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        if (isTrue(unref(cardDetail).expirationTime)) {
                                                            _cE("view", _uM("key" to 3, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "到期时间"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).expirationTime), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        if (isTrue(unref(cardDetail).usedPeriod && unref(cardDetail).totalPeriod)) {
                                                            _cE("view", _uM("key" to 4, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "周期"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).usedPeriod) + " / " + _tD(unref(cardDetail).totalPeriod), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        },
                                                        if (isTrue(unref(cardDetail).expirationTime)) {
                                                            _cE("view", _uM("key" to 5, "class" to "info-item"), _uA(
                                                                _cE("text", _uM("class" to "info-label"), "到期时间"),
                                                                _cE("text", _uM("class" to "info-value"), _tD(unref(cardDetail).expirationTime), 1)
                                                            ))
                                                        } else {
                                                            _cC("v-if", true)
                                                        }
                                                    ))
                                                )),
                                                _cE("view", _uM("class" to "section-title"), "流量使用"),
                                                _cE("view", _uM("class" to "data-total"), _uA(
                                                    _cE("view", _uM("class" to "total-item"), _uA(
                                                        _cE("text", _uM("class" to "total-label"), "已用流量:"),
                                                        _cE("text", _uM("class" to "total-value"), _tD(if (unref(cardDetail).usedFlow != null && unref(cardDetail).usedFlow !== "") {
                                                            unref(cardDetail).usedFlow
                                                        } else {
                                                            "0"
                                                        }), 1)
                                                    )),
                                                    _cE("view", _uM("class" to "total-item"), _uA(
                                                        _cE("text", _uM("class" to "total-label"), "剩余流量:"),
                                                        _cE("text", _uM("class" to "total-value"), _tD(if (unref(cardDetail).unUsedFlow != null && unref(cardDetail).unUsedFlow !== "") {
                                                            unref(cardDetail).unUsedFlow
                                                        } else {
                                                            "0"
                                                        }), 1)
                                                    )),
                                                    _cE("view", _uM("class" to "total-item"), _uA(
                                                        _cE("text", _uM("class" to "total-label"), "总流量:"),
                                                        _cE("text", _uM("class" to "total-value"), _tD(if (unref(cardDetail).pkgFlow != null && unref(cardDetail).pkgFlow !== "") {
                                                            unref(cardDetail).pkgFlow
                                                        } else {
                                                            "0"
                                                        }), 1)
                                                    ))
                                                ))
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        },
                                        if (unref(activeName) == "卡片套餐") {
                                            _cE("view", _uM("key" to 1, "class" to "section-content"), _uA(
                                                _cV(_component_rice_tabs, _uM("modelValue" to unref(current__1), "onUpdate:modelValue" to fun(`$event`: Number){
                                                    trySetRefValue(current__1, `$event`)
                                                }, "line-color" to "#ffffff", "list" to unref(pkgTabs), "line-width" to 0, "title-active-color" to "#2563eb", "onChange" to handleClick, "customStyle" to _uO("height" to "85rpx", "padding" to "5rpx 10rpx", "border" to "1rpx solid #e5edf6")), null, 8, _uA(
                                                    "modelValue",
                                                    "list"
                                                )),
                                                _cE("view", _uM("class" to "card-pkg-box"), _uA(
                                                    _cE(Fragment, null, RenderHelpers.renderList(unref(filteredPackageList), fun(item, index, __index, _cached): Any {
                                                        return _cE("view", _uM("class" to "item", "key" to index), _uA(
                                                            _cE("view", _uM("class" to "item-head"), _uA(
                                                                _cE("text", _uM("class" to "item-label"), _tD(item.name), 1),
                                                                _cV(_component_rice_tag, _uM("text" to item.statusText, "round" to true, "plain" to true, "size" to "small", "type" to item.tagType), null, 8, _uA(
                                                                    "text",
                                                                    "type"
                                                                ))
                                                            )),
                                                            _cE("view", _uM("class" to "item-sub-title"), "生效时间：" + _tD(item.startTime), 1),
                                                            _cE("view", _uM("class" to "item-data"), _uA(
                                                                _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                    _cE("text", _uM("class" to "item-data-label"), "套餐流量"),
                                                                    _cE("text", _uM("class" to "item-data-value"), _tD(item.totalFlow), 1)
                                                                )),
                                                                _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                    _cE("text", _uM("class" to "item-data-label"), "已用流量"),
                                                                    _cE("text", _uM("class" to "item-data-value"), _tD(item.usedFlow), 1)
                                                                )),
                                                                _cE("view", _uM("class" to "item-data-item"), _uA(
                                                                    _cE("text", _uM("class" to "item-data-label"), "剩余流量"),
                                                                    _cE("text", _uM("class" to "item-data-value"), _tD(item.leftFlow), 1)
                                                                ))
                                                            ))
                                                        ))
                                                    }), 128)
                                                ))
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        },
                                        if (unref(activeName) == "卡片订单") {
                                            _cE("view", _uM("key" to 2, "class" to "section-content card-order"), _uA(
                                                _cE(Fragment, null, RenderHelpers.renderList(unref(orderDates), fun(date, __key, __index, _cached): Any {
                                                    return _cE("view", _uM("class" to "item", "key" to date), _uA(
                                                        _cE("view", _uM("class" to "item-head"), _uA(
                                                            _cE("text", _uM("class" to "item-label"), "车联网月包20G"),
                                                            _cV(_component_rice_tag, _uM("text" to "已完成", "round" to true, "plain" to true, "size" to "small", "type" to "success"))
                                                        )),
                                                        _cE("view", _uM("class" to "item-sub-title"), "订单号: " + _tD(unref(card_number)), 1),
                                                        _cE("view", _uM("class" to "item-data"), _uA(
                                                            _cE("text", null, _tD(date), 1),
                                                            _cE("text", _uM("class" to "total-value"), "¥200")
                                                        ))
                                                    ))
                                                }), 128)
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ))
                                )),
                                _cV(_component_rice_button, _uM("class" to "ml-24 mr-24 mt-24 mb-24", "type" to "error", "plain" to "", "text" to "解绑卡片", "customStyle" to _uO("backgroundColor" to "#ffffff"), "onClick" to _ctx.handleUnbind), null, 8, _uA(
                                    "onClick"
                                ))
                            )),
                            _cE("view", _uM("class" to "fixed-bottom-buttons"), _uA(
                                if (isTrue(unref(cardDetail).isBind || unref(isBinded))) {
                                    _cV(_component_rice_button, _uM("key" to 0, "class" to "btn", "bold" to true, "disabled" to true, "customStyle" to _uO("border" to "none")), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            "已绑定"
                                        )
                                    }), "_" to 1))
                                } else {
                                    _cV(_component_rice_button, _uM("key" to 1, "class" to "btn", "bold" to true, "customStyle" to _uO("border" to "none"), "onClick" to handleBindCard), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            "去绑定"
                                        )
                                    }), "_" to 1))
                                },
                                _cV(_component_rice_button, _uM("class" to "btn", "type" to "primary", "color" to "#1989fa", "textColor" to "#ffffff", "bold" to true, "shadow" to true, "customStyle" to _uO("border" to "none"), "onClick" to handleRecharge), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "去充值"
                                    )
                                }), "_" to 1))
                            ))
                        ))
                    } else {
                        _cE("view", _uM("key" to 1, "class" to "empty-state"), _uA(
                            _cE("text", _uM("class" to "empty-text"), "暂无卡片详情")
                        ))
                    }
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("page-container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "fixed-tabs" to _pS(_uM("position" to "fixed", "left" to 0, "right" to 0, "zIndex" to 99, "flexShrink" to 0, "backgroundColor" to "#f4f7fb", "paddingTop" to "12rpx", "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx")), "container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "150rpx", "paddingRight" to 0, "paddingBottom" to "150rpx", "paddingLeft" to 0)), "card-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to "24rpx", "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "content-card" to _pS(_uM("marginTop" to 0)), "card-content" to _pS(_uM("marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "section-title" to _uM(".card-content " to _uM("fontSize" to "28rpx", "fontWeight" to 800, "color" to "#0f172a", "marginBottom" to "20rpx")), "base-info-box" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "column")), "base-info" to _uM(".card-content .base-info-box " to _uM("display" to "flex", "flexDirection" to "column", "paddingBottom" to "24rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#eef2f7", "marginBottom" to "24rpx")), "info-item" to _uM(".card-content .base-info-box .base-info " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "26rpx", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0)), "info-label" to _uM(".card-content .base-info-box .base-info .info-item " to _uM("color" to "#64748b")), "info-value" to _uM(".card-content .base-info-box .base-info .info-item " to _uM("fontWeight" to "bold", "color" to "#0f172a")), "pkg-content" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx")), "pkg-item" to _uM(".card-content .pkg-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "22rpx", "marginBottom" to "12rpx")), "pkg-label" to _uM(".card-content .pkg-content .pkg-item " to _uM("color" to "#64748b")), "pkg-value" to _uM(".card-content .pkg-content .pkg-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "fontWeight" to "bold", "color" to "#0f172a")), "pkg-icon" to _uM(".card-content .pkg-content .pkg-item .pkg-value " to _uM("backgroundColor" to "#ffffff", "width" to "40rpx", "height" to "40rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%", "marginLeft" to "25rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "pkg-date" to _uM(".card-content .pkg-content " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#eef2f7", "paddingTop" to "20rpx")), "date-list" to _uM(".card-content .pkg-content .pkg-date " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "14rpx", "paddingRight" to 0, "paddingBottom" to "14rpx", "paddingLeft" to 0, "fontSize" to "26rpx", "color" to "#334155")), "date-period" to _uM(".card-content .pkg-content .pkg-date .date-list " to _uM("marginRight" to "10rpx")), "data-total" to _uM(".card-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "gap" to "12rpx")), "total-item" to _uM(".card-content .data-total " to _uM("backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center")), "total-label" to _uM(".card-content .data-total .total-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "lineHeight" to 1.4, "marginBottom" to "10rpx")), "total-value" to _uM(".card-content .data-total .total-item " to _uM("fontSize" to "25rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4), ".card-content .card-order .item-data " to _uM("fontSize" to "30rpx", "fontWeight" to 900, "color" to "#ef4444")), "item" to _uM(".card-content .card-pkg-box " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx"), ".card-content .card-order " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "marginTop" to "20rpx")), "item-head" to _uM(".card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "12rpx"), ".card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "12rpx")), "item-label" to _uM(".card-content .card-pkg-box .item .item-head " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#0f172a"), ".card-content .card-order .item .item-head " to _uM("fontSize" to "28rpx", "fontWeight" to "bold", "color" to "#0f172a")), "item-sub-title" to _uM(".card-content .card-pkg-box .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55), ".card-content .card-order .item " to _uM("fontSize" to "22rpx", "color" to "#64748b", "lineHeight" to 1.55)), "item-data" to _uM(".card-content .card-pkg-box .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "gap" to "12rpx"), ".card-content .card-order .item " to _uM("display" to "flex", "flexDirection" to "row", "marginTop" to "20rpx", "gap" to "12rpx"), ".card-content .card-order " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-data-item" to _uM(".card-content .card-pkg-box .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "16rpx", "paddingRight" to "10rpx", "paddingBottom" to "16rpx", "paddingLeft" to "10rpx"), ".card-content .card-order .item .item-data " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "16rpx", "paddingRight" to "10rpx", "paddingBottom" to "16rpx", "paddingLeft" to "10rpx")), "item-data-label" to _uM(".card-content .card-pkg-box .item .item-data .item-data-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "marginBottom" to "8rpx"), ".card-content .card-order .item .item-data .item-data-item " to _uM("fontSize" to "20rpx", "color" to "#94a3b8", "marginBottom" to "8rpx")), "item-data-value" to _uM(".card-content .card-pkg-box .item .item-data .item-data-item " to _uM("fontSize" to "24rpx", "fontWeight" to "bold", "color" to "#0f172a"), ".card-content .card-order .item .item-data .item-data-item " to _uM("fontSize" to "24rpx", "fontWeight" to "bold", "color" to "#0f172a")), "fixed-bottom-buttons" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "20rpx", "paddingRight" to "24rpx", "paddingBottom" to "20rpx", "paddingLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderTopStyle" to "solid", "borderTopColor" to "#e7edf5", "boxShadow" to "0 -4rpx 12rpx rgba(0, 0, 0, 0.04)", "zIndex" to 100)), "btn" to _uM(".fixed-bottom-buttons " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "empty-state" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to "120rpx", "paddingRight" to "32rpx", "paddingBottom" to "120rpx", "paddingLeft" to "32rpx", "backgroundColor" to "#ffffff", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "empty-text" to _uM(".empty-state " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
