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
open class GenPagesPaySuccessPaySuccess : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesPaySuccessPaySuccess) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesPaySuccessPaySuccess
            val _cache = __ins.renderCache
            val handleViewOrder = fun(){
                console.log("查看订单", " at pages/paySuccess/paySuccess.uvue:70")
            }
            val handleBackCard = fun(){
                console.log("返回卡片详情", " at pages/paySuccess/paySuccess.uvue:84")
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "支付结果", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "status-section"), _uA(
                            _cE("view", _uM("class" to "success-icon"), _uA(
                                _cE("text", _uM("class" to "checkmark"), "✓")
                            )),
                            _cE("text", _uM("class" to "status-text"), "支付成功")
                        )),
                        _cE("view", _uM("class" to "card-container"), _uA(
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "卡号"),
                                _cE("text", _uM("class" to "value"), "1064916585160")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "ICCID"),
                                _cE("text", _uM("class" to "value"), "89860421123456789012")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "订单编号"),
                                _cE("text", _uM("class" to "value"), "0202604280001")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "套餐名称"),
                                _cE("text", _uM("class" to "value"), "车联网月包20G")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "套餐类型"),
                                _cE("text", _uM("class" to "value"), "套餐包")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "支付方式"),
                                _cE("text", _uM("class" to "value"), "微信小程序支付")
                            )),
                            _cE("view", _uM("class" to "info-row"), _uA(
                                _cE("text", _uM("class" to "label"), "支付金额"),
                                _cE("text", _uM("class" to "value amount"), "￥90")
                            ))
                        )),
                        _cE("view", _uM("class" to "button-section"), _uA(
                            _cE("button", _uM("class" to "action-btn primary-btn", "onClick" to handleViewOrder), "查看订单"),
                            _cE("button", _uM("class" to "action-btn secondary-btn", "onClick" to handleBackCard), "返回卡片详情")
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
                return _uM("container" to _pS(_uM("backgroundColor" to "#f5f5f5", "paddingTop" to "40rpx", "paddingRight" to "32rpx", "paddingBottom" to "40rpx", "paddingLeft" to "32rpx", "display" to "flex", "flexDirection" to "column", "boxSizing" to "border-box")), "status-section" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginBottom" to "40rpx")), "success-icon" to _uM(".status-section " to _uM("width" to "120rpx", "height" to "120rpx", "backgroundColor" to "#07c160", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "marginBottom" to "20rpx")), "checkmark" to _uM(".status-section .success-icon " to _uM("color" to "#ffffff", "fontSize" to "80rpx", "fontWeight" to 600, "lineHeight" to 1)), "status-text" to _uM(".status-section " to _uM("fontSize" to "40rpx", "fontWeight" to 500, "color" to "#333333")), "card-container" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e7edf5", "borderRightColor" to "#e7edf5", "borderBottomColor" to "#e7edf5", "borderLeftColor" to "#e7edf5", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "60rpx", "boxShadow" to "0 4rpx 20rpx rgba(0, 0, 0, 0.05)")), "info-row" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "24rpx", "paddingRight" to 0, "paddingBottom" to "24rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f0f0")), "label" to _uM(".info-row " to _uM("fontSize" to "24rpx", "color" to "#64748b", "flexShrink" to 0, "width" to "160rpx")), "value" to _uM(".info-row " to _uM("fontSize" to "25rpx", "color" to "#0f172a", "fontWeight" to "bold", "textAlign" to "right", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "amount" to _uM(".info-row " to _uM("fontWeight" to "bold", "color" to "#ff6b00")), "button-section" to _pS(_uM("display" to "flex", "flexDirection" to "column")), "action-btn" to _uM(".button-section " to _uM("width" to "100%", "height" to "88rpx", "lineHeight" to "88rpx", "borderTopLeftRadius" to "44rpx", "borderTopRightRadius" to "44rpx", "borderBottomRightRadius" to "44rpx", "borderBottomLeftRadius" to "44rpx", "fontSize" to "30rpx", "fontWeight" to 500, "textAlign" to "center", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "borderTopWidth::after" to "medium", "borderRightWidth::after" to "medium", "borderBottomWidth::after" to "medium", "borderLeftWidth::after" to "medium", "borderTopStyle::after" to "none", "borderRightStyle::after" to "none", "borderBottomStyle::after" to "none", "borderLeftStyle::after" to "none", "borderTopColor::after" to "#000000", "borderRightColor::after" to "#000000", "borderBottomColor::after" to "#000000", "borderLeftColor::after" to "#000000")), "primary-btn" to _uM(".button-section " to _uM("backgroundColor" to "#07c160", "color" to "#ffffff")), "secondary-btn" to _uM(".button-section " to _uM("backgroundColor" to "#ffffff", "color" to "#07c160", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#07c160", "borderRightColor" to "#07c160", "borderBottomColor" to "#07c160", "borderLeftColor" to "#07c160")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
