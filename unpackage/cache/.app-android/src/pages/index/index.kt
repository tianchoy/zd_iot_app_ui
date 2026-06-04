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
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexIndex) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexIndex
            val _cache = __ins.renderCache
            val title = ref<String>("")
            val show = ref<Boolean>(false)
            val card_number = ref<String>("")
            val wxGetPhoneLogin = ref<String>("")
            val goRecharge = fun(){
                console.log("去充值", " at pages/index/index.uvue:131")
                uni_navigateTo(NavigateToOptions(url = "/pages/recharge/recharge"))
            }
            val scanCode = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/scanCode/scanCode"))
            }
            val handleQuery = fun(){
                if (!(card_number.value != "")) {
                    uni_showToast(ShowToastOptions(title = "请输入卡号", icon = "none"))
                    return
                }
                console.log("查询卡号:", card_number.value, " at pages/index/index.uvue:151")
            }
            val onScanResult = fun(data: UTSJSONObject){
                val result = data.getString("result") ?: ""
                if (result.length > 0) {
                    card_number.value = result
                    uni_showToast(ShowToastOptions(title = "扫码成功", icon = "success"))
                }
            }
            val cardType = fun(type: Number){
                console.log(type, " at pages/index/index.uvue:170")
                uni_reLaunch(ReLaunchOptions(url = "/pages/card/card?type=" + type))
            }
            val handleClick = fun(){
                console.log("联系客服1111", " at pages/index/index.uvue:178")
            }
            val userId = ref<String>("")
            val userLoginByOpenid = fun(codes: String): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(login(_uO("xcxCode" to codes, "isLogin" to "1")))
                        if (res.code == 200) {
                            userId.value = "" + res.data.id
                            uni_navigateTo(NavigateToOptions(url = "/pages/login/login?wxGetPhoneLogin=" + wxGetPhoneLogin.value + "&userId=" + userId.value))
                        }
                })
            }
            val code = ref<String>("")
            val getCode = fun(){
                uni_login(LoginOptions(success = fun(res){
                    code.value = res.code
                    userLoginByOpenid(res.code)
                }
                ))
            }
            val getTenantInfos = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        val res = await(getTenantInfo(getTenantId(), false))
                        if (res.code == 200) {
                            val tenantInfo = res.data
                            wxGetPhoneLogin.value = "" + tenantInfo.wxGetPhoneLogin
                            setStorageSync("tenant_infos", tenantInfo)
                        }
                })
            }
            val handleLogin = fun(){
                val token = getToken()
                if (!(token != "")) {
                    getTenantInfos().then(fun(){
                        getCode()
                    }
                    )
                }
            }
            onLoad(fun(_options){
                uni__on("scanResult", onScanResult)
            }
            )
            onUnload(fun(){
                uni__off("scanResult", onScanResult)
            }
            )
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
                val _component_m_tag = resolveEasyComponent("m-tag", GenUniModulesMUnixComponentsMTagMTagClass)
                val _component_m_div = resolveEasyComponent("m-div", GenUniModulesMUnixComponentsMDivMDivClass)
                val _component_customService = resolveEasyComponent("customService", GenComponentsCustomServiceCustomServiceClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "首页", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info", "style" to _nS(_uM("background-color" to "#4d88f5", "box-shadow" to "none"))), _uA(
                            if (isTrue(title.value)) {
                                _cE("text", _uM("key" to 0, "class" to "persion-name"), "Hi," + _tD(title.value), 1)
                            } else {
                                _cE("text", _uM("key" to 1, "class" to "persion-name", "onClick" to handleLogin), "Hi,请先登录")
                            }
                            ,
                            _cE("view", _uM("class" to "persion-card"), _uA(
                                _cE("view", _uM("class" to "persion-card-item", "style" to _nS(_uM("background-color" to "#6fa3ff", "box-shadow" to "none", "color" to "#fff")), "onClick" to fun(){
                                    cardType(0)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "我的卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), "12")
                                ), 12, _uA(
                                    "onClick"
                                )),
                                _cE("view", _uM("class" to "persion-card-item", "style" to _nS(_uM("background-color" to "#6fa3ff", "box-shadow" to "none", "color" to "#fff")), "onClick" to fun(){
                                    cardType(1)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "在用卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), "12")
                                ), 12, _uA(
                                    "onClick"
                                )),
                                _cE("view", _uM("class" to "persion-card-item", "style" to _nS(_uM("background-color" to "#6fa3ff", "box-shadow" to "none", "color" to "#fff")), "onClick" to fun(){
                                    cardType(2)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "异常卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), "12")
                                ), 12, _uA(
                                    "onClick"
                                ))
                            ))
                        ), 4),
                        _cE("view", _uM("class" to "card-box mt-24 mb-24"), _uA(
                            _cE("view", _uM("class" to "card-label mb-24"), "卡号查询"),
                            _cE("view", _uM("class" to "search-value"), _uA(
                                _cE("input", _uM("modelValue" to card_number.value, "onInput" to fun(`$event`: UniInputEvent){
                                    card_number.value = `$event`.detail.value
                                }
                                , "placeholder" to "请输入 ICCID / MSISDN", "class" to "search-input"), null, 40, _uA(
                                    "modelValue",
                                    "onInput"
                                )),
                                _cE("view", _uM("class" to "android-scan-btn", "style" to _nS(_uM("width" to "90rpx", "height" to "95rpx", "border-left" to "1px solid #eef2f7", "display" to "flex", "flex-direction" to "row", "align-items" to "center", "justify-content" to "center", "background-color" to "#ffffff")), "onClick" to scanCode), _uA(
                                    _cV(_component_m_icon, _uM("name" to "scanning", "size" to "40rpx", "color" to "#334155"))
                                ), 4),
                                _cE("view", _uM("class" to "android-query-btn", "style" to _nS(_uM("width" to "120rpx", "height" to "95rpx", "border-radius" to "0 24rpx 24rpx 0", "background-color" to "#5677fc", "display" to "flex", "flex-direction" to "row", "align-items" to "center", "justify-content" to "center")), "onClick" to handleQuery), _uA(
                                    _cE("text", _uM("class" to "android-btn-text"), "查询")
                                ), 4)
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "card-label mb-24"), _uA(
                                _cE("text", null, "最近常用卡片"),
                                _cE("text", _uM("class" to "view-all", "onClick" to fun(){
                                    cardType(0)
                                }
                                ), "查看全部", 8, _uA(
                                    "onClick"
                                ))
                            )),
                            _cE("view", _uM("class" to "card-list"), _uA(
                                _cE("view", _uM("class" to "card-item"), _uA(
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
                                        _cE("view", _uM("class" to "metric-box mr-24"), _uA(
                                            _cE("view", _uM("class" to "metric-label"), "到期时间"),
                                            _cE("view", _uM("class" to "metric-value"), "2026-04-30")
                                        )),
                                        _cE("view", _uM("class" to "metric-box"), _uA(
                                            _cE("view", _uM("class" to "metric-label"), "本月流量"),
                                            _cE("view", _uM("class" to "metric-value"), "11.34GB / 20GB")
                                        ))
                                    )),
                                    _cE("view", _uM("class" to "card-bottom"), _uA(
                                        _cE("view", _uM("class" to "card-cycle-text"), _uA(
                                            _cE("text", _uM("class" to "cycle-label"), "当前周期："),
                                            _cE("text", _uM("class" to "cycle-value"), "第1期 / 共12期")
                                        )),
                                        _cE("view", _uM("class" to "android-recharge-btn", "style" to _nS(_uM("padding" to "0 24rpx", "height" to "64rpx", "border-radius" to "220rpx", "background-color" to "#5677fc", "display" to "flex", "flex-direction" to "row", "align-items" to "center", "justify-content" to "center")), "onClick" to goRecharge), _uA(
                                            _cE("text", _uM("class" to "android-btn-text", "style" to _nS(_uM("color" to "#ffffff"))), "去充值", 4)
                                        ), 4)
                                    ))
                                ))
                            ))
                        )),
                        _cV(_component_customService, _uM("onConnect_service" to handleClick))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb", "minHeight" to "1000rpx", "paddingBottom" to "40rpx", "height" to "100%")), "card-info" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundImage" to "linear-gradient(135deg, #2f6de8 0%, #4d88f5 65%, #67a4ff 100%)", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#ffffff", "boxShadow" to "0 8rpx 18rpx rgba(37, 99, 235, 0.14)")), "persion-name" to _uM(".card-info " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#ffffff")), "persion-card" to _uM(".card-info " to _uM("marginTop" to "30rpx", "display" to "flex", "flexDirection" to "row")), "persion-card-item" to _uM(".card-info .persion-card " to _uM("minHeight" to "120rpx", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "24rpx", "paddingBottom" to "20rpx", "paddingLeft" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.12)", "boxShadow" to "inset 0 1px 0 rgba(255, 255, 255, 0.18)", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "marginTop" to 0, "marginRight" to "10rpx", "marginBottom" to 0, "marginLeft" to "10rpx")), "persion-card-item-title" to _uM(".card-info .persion-card " to _uM("fontSize" to "22rpx", "lineHeight" to 1.4, "color" to "#ffffff")), "persion-card-item-content" to _uM(".card-info .persion-card " to _uM("marginTop" to "20rpx", "fontSize" to "40rpx", "fontWeight" to 800, "lineHeight" to 1, "color" to "#ffffff")), "card-box" to _pS(_uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx")), "card-label" to _uM(".card-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#333333")), "view-all" to _uM(".card-box .card-label " to _uM("color" to "#2563eb")), "search-value" to _uM(".card-box " to _uM("display" to "flex", "flexDirection" to "row", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "search-input" to _uM(".card-box .search-value " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to 0, "paddingRight" to "25rpx", "paddingBottom" to 0, "paddingLeft" to "25rpx", "height" to "95rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#0f172a", "fontSize" to "30rpx")), "scan-btn" to _uM(".card-box .search-value " to _uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7")), "android-scan-btn" to _uM(".card-box .search-value " to _uM("width" to "90rpx", "height" to "95rpx", "borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#eef2f7", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "backgroundColor" to "#ffffff")), "android-query-btn" to _uM(".card-box .search-value " to _uM("width" to "120rpx", "height" to "95rpx", "borderTopLeftRadius" to 0, "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to 0, "backgroundColor" to "#5677fc", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "android-btn-text" to _uM(".card-box .search-value " to _uM("fontSize" to "30rpx", "color" to "#ffffff", "fontWeight" to 500)), "card-item" to _uM(".card-box " to _uM("display" to "flex", "flexDirection" to "column", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to 18, "borderTopRightRadius" to 18, "borderBottomRightRadius" to 18, "borderBottomLeftRadius" to 18, "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "20rpx")), "item-head" to _uM(".card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-start", "justifyContent" to "space-between")), "card-item-title" to _uM(".card-box .card-item .item-head " to _uM("fontSize" to "32rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.25)), "card-item-content" to _uM(".card-box .card-item .item-head " to _uM("marginTop" to 5, "fontSize" to "24rpx", "color" to "#94a3b8", "lineHeight" to 1.45)), "item-package" to _uM(".card-box .card-item " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "minWidth" to 0)), "package-label" to _uM(".card-box .card-item .item-package " to _uM("fontSize" to "24rpx", "color" to "#64748b", "lineHeight" to 1.4)), "package-value" to _uM(".card-box .card-item .item-package " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "28rpx", "fontWeight" to 700, "color" to "#334155", "lineHeight" to 1.45, "whiteSpace" to "nowrap", "overflow" to "hidden", "textOverflow" to "ellipsis")), "card-metrics" to _uM(".card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "metric-box" to _uM(".card-box .card-item .card-metrics " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "#f8fbff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e8eef7", "borderRightColor" to "#e8eef7", "borderBottomColor" to "#e8eef7", "borderLeftColor" to "#e8eef7", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "minWidth" to 0)), "metric-label" to _uM(".card-box .card-item .card-metrics .metric-box " to _uM("fontSize" to "24rpx", "color" to "#94a3b8", "lineHeight" to 1.4)), "metric-value" to _uM(".card-box .card-item .card-metrics .metric-box " to _uM("marginTop" to "15rpx", "fontSize" to "26rpx", "fontWeight" to 800, "color" to "#0f172a", "lineHeight" to 1.4)), "card-bottom" to _uM(".card-box .card-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "card-cycle-text" to _uM(".card-box .card-item .card-bottom " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "cycle-label" to _uM(".card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "24rpx", "color" to "#64748b", "lineHeight" to 1.45)), "cycle-value" to _uM(".card-box .card-item .card-bottom .card-cycle-text " to _uM("fontSize" to "24rpx", "color" to "#334155", "fontWeight" to 800)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
