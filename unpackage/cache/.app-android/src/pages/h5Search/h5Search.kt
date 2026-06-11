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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesH5SearchH5Search : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesH5SearchH5Search) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesH5SearchH5Search
            val _cache = __ins.renderCache
            val cardNumber = ref<String>("1064916585160")
            val showCountryPopup = ref<Boolean>(false)
            val selectedCountry = ref<String>("")
            val searchSelectRef = ref(null)
            val resCountry = ref<String>("")
            val countryOptions = ref(_uA<UTSJSONObject>())
            val selectedCountryLabel = computed<String>(fun(): String {
                if (!(selectedCountry.value != "")) {
                    return ""
                }
                run {
                    var i: Number = 0
                    while(i < countryOptions.value.length){
                        val opt = countryOptions.value[i] as UTSJSONObject
                        if (opt["value"] === selectedCountry.value) {
                            val label = opt["label"]
                            return if (label == null) {
                                ""
                            } else {
                                "" + label
                            }
                        }
                        i++
                    }
                }
                return ""
            }
            )
            val openSelectCountry = fun(){
                showCountryPopup.value = true
            }
            val onCountryChange = fun(value: Any?, item: Any){
                showCountryPopup.value = false
                resCountry.value = value as String
                console.log("选中国家/地区:", resCountry.value, " at pages/h5Search/h5Search.uvue:115")
            }
            val onPopupClose = fun(){
                showCountryPopup.value = false
            }
            val handleScan = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/scanCode/scanCode"))
            }
            val handleQuery = fun(){
                if (!(cardNumber.value != "")) {
                    uni_showToast(ShowToastOptions(title = "请输入卡号", icon = "none"))
                    return
                }
                if (!(selectedCountry.value != "")) {
                    uni_showToast(ShowToastOptions(title = "请选择国家/地区", icon = "none"))
                    return
                }
                console.log("查询卡号:", cardNumber.value, " at pages/h5Search/h5Search.uvue:146")
                console.log("国家/地区:", resCountry.value, " at pages/h5Search/h5Search.uvue:147")
                uni_showToast(ShowToastOptions(title = "查询中...", icon = "loading"))
            }
            val onScanResult = fun(data: UTSJSONObject){
                val result = data.getString("result") ?: ""
                if (result.length > 0) {
                    cardNumber.value = result
                    uni_showToast(ShowToastOptions(title = "扫码成功", icon = "success"))
                }
            }
            val initCountryList = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(getCountryList(false))
                        console.log("查询国家列表:", res, " at pages/h5Search/h5Search.uvue:173")
                        if (res.code == 200) {
                            countryOptions.value = res.data.map(fun(item: CountryData): UTSJSONObject {
                                return _uO("value" to item.letterCode, "label" to item.fullName)
                            }
                            )
                        }
                })
            }
            onMounted(fun(){
                initCountryList()
                uni__on("scanResult", onScanResult)
            }
            )
            onUnmounted(fun(){
                uni__off("scanResult", onScanResult)
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_rice_icon = resolveEasyComponent("rice-icon", GenUniModulesRiceUiComponentsRiceIconRiceIconClass)
                val _component_rice_popup = resolveEasyComponent("rice-popup", GenUniModulesRiceUiComponentsRicePopupRicePopupClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "查询卡号", "show-back" to false, "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "main-content"), _uA(
                            _cE("view", _uM("class" to "title-section"), _uA(
                                _cE("text", _uM("class" to "main-title"), "国内版H5快捷充值"),
                                _cE("text", _uM("class" to "sub-title"), "输入卡号，快速查询缴费"),
                                _cE("text", _uM("class" to "desc-text"), "支持短信链接、二维码、APP跳转进入H5页面，未登录"),
                                _cE("text", _uM("class" to "desc-text"), "也可直接充值。")
                            )),
                            _cE("view", _uM("class" to "card-box"), _uA(
                                _cE("view", _uM("class" to "card-label"), "卡号查询"),
                                _cE("view", _uM("class" to "search-value"), _uA(
                                    _cE("input", _uM("modelValue" to cardNumber.value, "onInput" to fun(`$event`: UniInputEvent){
                                        cardNumber.value = `$event`.detail.value
                                    }
                                    , "placeholder" to "请输入ICCID/MSISDN，或点击输入框右侧扫描图标识别卡号", "class" to "search-input"), null, 40, _uA(
                                        "modelValue",
                                        "onInput"
                                    )),
                                    _cE("view", _uM("class" to "scan-btn", "onClick" to handleScan), _uA(
                                        _cV(_component_rice_icon, _uM("name" to "scan", "size" to "40rpx", "color" to "#666"))
                                    ))
                                )),
                                _cE("view", _uM("class" to "select-country-wrapper"), _uA(
                                    _cE("view", _uM("class" to "select-label"), "选择国家/地区"),
                                    _cE("view", _uM("class" to "select-trigger", "onClick" to openSelectCountry), _uA(
                                        _cE("text", _uM("class" to _nC(_uA(
                                            "select-value",
                                            _uM("placeholder" to !(selectedCountry.value != ""))
                                        ))), _tD(if (selectedCountryLabel.value != "") {
                                            selectedCountryLabel.value
                                        } else {
                                            "请选择国家/地区"
                                        }
                                        ), 3),
                                        _cE("text", _uM("class" to "select-arrow"), "▼")
                                    ))
                                )),
                                _cE("view", _uM("class" to "query-btn", "onClick" to handleQuery), _uA(
                                    _cE("text", _uM("class" to "query-btn-text"), "查询缴费")
                                ))
                            )),
                            _cE("view", _uM("class" to "instruction-box"), _uA(
                                _cE("view", _uM("class" to "instruction-title"), "使用说明"),
                                _cE("view", _uM("class" to "instruction-list"), _uA(
                                    _cE("text", _uM("class" to "instruction-item"), "1.H5支持未登录快速充值。"),
                                    _cE("text", _uM("class" to "instruction-item"), "2.APP跳转场景可直接进入充值首页，无需经过本入口页。"),
                                    _cE("text", _uM("class" to "instruction-item"), "3.本原型用于展示H5页面结构及跳转关系。")
                                ))
                            ))
                        ))
                    )),
                    _cV(_component_rice_popup, _uM("show" to showCountryPopup.value, "onUpdate:show" to fun(`$event`: Boolean){
                        showCountryPopup.value = `$event`
                    }
                    , "position" to "bottom", "onClose" to onPopupClose), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "popup-header"), _uA(
                                _cE("text", _uM("class" to "popup-title"), "选择国家/地区")
                            )),
                            _cV(unref(GenComponentsSelectCountryClass), _uM("ref_key" to "searchSelectRef", "ref" to searchSelectRef, "modelValue" to selectedCountry.value, "onUpdate:modelValue" to fun(`$event`: String){
                                selectedCountry.value = `$event`
                            }
                            , "options" to countryOptions.value, "search-placeholder" to "搜索国家/地区名称", "onChange" to onCountryChange), null, 8, _uA(
                                "modelValue",
                                "onUpdate:modelValue",
                                "options"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "show",
                        "onUpdate:show"
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "minHeight" to "1000rpx", "backgroundColor" to "#f5f7fa")), "main-content" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to 0, "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx")), "title-section" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginBottom" to "48rpx", "backgroundImage" to "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)", "backgroundColor" to "rgba(0,0,0,0)", "borderTopLeftRadius" to "22rpx", "borderTopRightRadius" to "22rpx", "borderBottomRightRadius" to "22rpx", "borderBottomLeftRadius" to "22rpx", "paddingTop" to 24, "paddingRight" to "20rpx", "paddingBottom" to 24, "paddingLeft" to "20rpx", "color" to "#ffffff")), "main-title" to _uM(".title-section " to _uM("fontSize" to "24rpx", "fontWeight" to "bold", "marginBottom" to "16rpx")), "sub-title" to _uM(".title-section " to _uM("fontSize" to "50rpx", "fontWeight" to "bold", "marginBottom" to "24rpx")), "desc-text" to _uM(".title-section " to _uM("fontSize" to "24rpx")), "card-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "borderTopLeftRadius" to "32rpx", "borderTopRightRadius" to "32rpx", "borderBottomRightRadius" to "32rpx", "borderBottomLeftRadius" to "32rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "48rpx", "boxShadow" to "0 4rpx 20rpx rgba(0, 0, 0, 0.04)")), "card-label" to _uM(".card-box " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937", "marginBottom" to "24rpx")), "search-value" to _uM(".card-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e7eb", "borderRightColor" to "#e5e7eb", "borderBottomColor" to "#e5e7eb", "borderLeftColor" to "#e5e7eb", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundColor" to "#f9fafb", "marginBottom" to "24rpx")), "search-input" to _uM(".card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to "24rpx", "paddingRight" to "28rpx", "paddingBottom" to "24rpx", "paddingLeft" to "28rpx", "height" to "88rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#1f2937", "fontSize" to "28rpx")), "scan-btn" to _uM(".card-box .search-value " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "width" to "88rpx", "height" to "88rpx", "borderLeftWidth" to "2rpx", "borderLeftStyle" to "solid", "borderLeftColor" to "#e5e7eb")), "select-country-wrapper" to _uM(".card-box " to _uM("marginBottom" to "32rpx")), "select-label" to _uM(".card-box .select-country-wrapper " to _uM("fontSize" to "28rpx", "color" to "#666666", "marginBottom" to "16rpx")), "select-trigger" to _uM(".card-box .select-country-wrapper " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e7eb", "borderRightColor" to "#e5e7eb", "borderBottomColor" to "#e5e7eb", "borderLeftColor" to "#e5e7eb", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundColor" to "#f9fafb", "paddingTop" to "24rpx", "paddingRight" to "28rpx", "paddingBottom" to "24rpx", "paddingLeft" to "28rpx", "minHeight" to "88rpx")), "select-value" to _uM(".card-box .select-country-wrapper .select-trigger " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "28rpx", "color" to "#1f2937"), ".card-box .select-country-wrapper .select-trigger .placeholder" to _uM("color" to "#999999")), "select-arrow" to _uM(".card-box .select-country-wrapper .select-trigger " to _uM("fontSize" to "24rpx", "color" to "#999999", "marginLeft" to "16rpx")), "query-btn" to _uM(".card-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "backgroundImage" to "linear-gradient(135deg, #2563eb, #1d4ed8)", "backgroundColor" to "rgba(0,0,0,0)", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "query-btn-text" to _uM(".card-box .query-btn " to _uM("color" to "#ffffff", "fontSize" to "32rpx", "fontWeight" to 600)), "instruction-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "instruction-title" to _uM(".instruction-box " to _uM("fontSize" to "30rpx", "fontWeight" to 600, "color" to "#1f2937", "marginBottom" to "24rpx")), "instruction-list" to _uM(".instruction-box " to _uM("display" to "flex", "flexDirection" to "column")), "instruction-item" to _uM(".instruction-box .instruction-list " to _uM("fontSize" to "26rpx", "color" to "#6b7280", "lineHeight" to 1.6)), "popup-header" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "16rpx", "paddingLeft" to "32rpx", "borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f0f0", "backgroundColor" to "#ffffff")), "popup-title" to _uM(".popup-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "popup-close" to _uM(".popup-header " to _uM("width" to "56rpx", "height" to "56rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "fontSize" to "44rpx", "color" to "#999999")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
