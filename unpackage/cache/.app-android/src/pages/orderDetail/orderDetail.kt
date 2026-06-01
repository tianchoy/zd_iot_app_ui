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
open class GenPagesOrderDetailOrderDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesOrderDetailOrderDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesOrderDetailOrderDetail
            val _cache = __ins.renderCache
            val showPopup = ref(false)
            val currentPrice = ref(50)
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "已完成" -> 
                        return "status-completed"
                    "待支付" -> 
                        return "status-pending"
                    "已退款" -> 
                        return "status-refunded"
                    "已取消" -> 
                        return "status-cancelled"
                    else -> 
                        return ""
                }
            }
            val choosePayment = fun(){
                showPopup.value = true
            }
            val handleCancelPayment = fun(){
                showPopup.value = false
            }
            val handleConfirmPayment = fun(e){
                console.log(e, " at pages/orderDetail/orderDetail.uvue:142")
                showPopup.value = false
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_bottom_popup = resolveEasyComponent("m-bottom-popup", GenUniModulesMUnixComponentsMBottomPopupMBottomPopupClass)
                return _cE(Fragment, null, _uA(
                    _cE("view", null, _uA(
                        _cV(_component_topNavBar, _uM("title" to "订单详情", "show-back" to true, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                        _cE("scroll-view", _uM("class" to "container", "scroll-y" to "", "enhanced" to true), _uA(
                            _cE("view", _uM("class" to "package-card"), _uA(
                                _cE("view", _uM("class" to "package-header"), _uA(
                                    _cE("text", _uM("class" to "package-name"), "车联网月包10G"),
                                    _cE("text", _uM("class" to _nC(_uA(
                                        "status-tag status-pending",
                                        getStatusClass("待支付")
                                    ))), "待支付", 2)
                                )),
                                _cE("view", _uM("class" to "card-number-row"), _uA(
                                    _cE("text", _uM("class" to "card-number-label"), "当前卡号："),
                                    _cE("text", _uM("class" to "card-number"), "1064916585160")
                                ))
                            )),
                            _cE("view", _uM("class" to "info-card"), _uA(
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "订单编号"),
                                    _cE("text", _uM("class" to "info-value"), "0202604280002")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "ICCID"),
                                    _cE("text", _uM("class" to "info-value"), "89860421123456789012")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "支付金额"),
                                    _cE("text", _uM("class" to "info-value price"), "¥50")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "订单状态"),
                                    _cE("text", _uM("class" to "info-value status"), "待支付")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "支付方式"),
                                    _cE("text", _uM("class" to "info-value"), "微信小程序支付")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "下单时间"),
                                    _cE("text", _uM("class" to "info-value"), "2026-04-28 11:20:12")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "支付时间"),
                                    _cE("text", _uM("class" to "info-value"), "--")
                                ))
                            )),
                            _cE("view", _uM("class" to "info-card"), _uA(
                                _cE("view", _uM("class" to "section-header"), _uA(
                                    _cE("text", _uM("class" to "section-title"), "套餐信息")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "套餐类型"),
                                    _cE("text", _uM("class" to "info-value"), "套餐包")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "套餐流量"),
                                    _cE("text", _uM("class" to "info-value"), "10GB")
                                )),
                                _cE("view", _uM("class" to "info-row"), _uA(
                                    _cE("text", _uM("class" to "info-label"), "有效期"),
                                    _cE("text", _uM("class" to "info-value"), "30天")
                                ))
                            )),
                            _cE("view", _uM("class" to "notice-card"), _uA(
                                _cE("view", _uM("class" to "section-header"), _uA(
                                    _cE("text", _uM("class" to "section-title"), "说明")
                                )),
                                _cE("text", _uM("class" to "notice-text"), "订单尚未支付，支付完成后套餐才会生效。")
                            )),
                            _cE("view", _uM("class" to "bottom-placeholder"))
                        )),
                        _cE("view", _uM("class" to "bottom-bar"), _uA(
                            _cE("view", _uM("class" to "amount-section"), _uA(
                                _cE("text", _uM("class" to "amount-label"), "待支付金额"),
                                _cE("text", _uM("class" to "amount-value"), "¥50")
                            )),
                            _cE("view", _uM("class" to "pay-button", "onClick" to choosePayment), _uA(
                                _cE("text", _uM("class" to "pay-button-text"), "去支付")
                            ))
                        ))
                    )),
                    _cV(_component_m_bottom_popup, _uM("show" to unref(showPopup), "height" to "75%", "radius" to true, "onClose" to fun(){
                        showPopup.value = false
                    }
                    ), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cV(unref(GenComponentsPaymentClass), _uM("amount" to unref(currentPrice), "onCancel" to handleCancelPayment, "onConfirm" to handleConfirmPayment), null, 8, _uA(
                                "amount"
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "show",
                        "onClose"
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
                return _uM("container" to _pS(_uM("backgroundColor" to "#f4f7fb", "minHeight" to "1000rpx", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "boxSizing" to "border-box")), "package-card" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "24rpx")), "package-header" to _uM(".package-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "16rpx")), "package-name" to _uM(".package-card .package-header " to _uM("fontSize" to "36rpx", "fontWeight" to 600, "color" to "#1f2937")), "status-tag" to _uM(".package-card .package-header " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "backgroundColor" to "#fff3e0", "color" to "#ed6c02", "fontWeight" to 500), ".package-card .package-header .status-pending" to _uM("backgroundColor" to "#fff3e0", "color" to "#ed6c02")), "card-number-row" to _uM(".package-card " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "card-number-label" to _uM(".package-card .card-number-row " to _uM("fontSize" to "28rpx", "color" to "#9ca3af")), "card-number" to _uM(".package-card .card-number-row " to _uM("fontSize" to "28rpx", "color" to "#374151", "fontWeight" to 500)), "info-card" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "24rpx")), "section-header" to _uM(".info-card " to _uM("marginBottom" to "24rpx", "paddingBottom" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f2f6"), ".notice-card " to _uM("marginBottom" to "16rpx")), "section-title" to _uM(".info-card .section-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937"), ".notice-card .section-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#1f2937")), "info-row" to _uM(".info-card " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "info-label" to _uM(".info-card .info-row " to _uM("fontSize" to "24rpx", "color" to "#64748b")), "info-value" to _uM(".info-card .info-row " to _uM("fontSize" to "28rpx", "color" to "#374151", "textAlign" to "right", "fontWeight" to "bold")), "price" to _uM(".info-card .info-row " to _uM("fontSize" to "36rpx", "fontWeight" to "bold", "color" to "#ef4444")), "notice-card" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "marginBottom" to "24rpx")), "notice-text" to _uM(".notice-card " to _uM("fontSize" to "28rpx", "color" to "#6b7280", "lineHeight" to 1.5)), "bottom-placeholder" to _pS(_uM("height" to "140rpx")), "bottom-bar" to _pS(_uM("position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "backgroundColor" to "#ffffff", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "24rpx", "paddingRight" to "32rpx", "paddingBottom" to "24rpx", "paddingLeft" to "32rpx", "boxShadow" to "0 -4rpx 20rpx rgba(0, 0, 0, 0.05)")), "amount-section" to _uM(".bottom-bar " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start")), "amount-label" to _uM(".bottom-bar .amount-section " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginRight" to "16rpx")), "amount-value" to _uM(".bottom-bar .amount-section " to _uM("fontSize" to "48rpx", "fontWeight" to "bold", "color" to "#ef4444")), "pay-button" to _uM(".bottom-bar " to _uM("backgroundColor" to "#2563eb", "paddingTop" to "20rpx", "paddingRight" to "40rpx", "paddingBottom" to "20rpx", "paddingLeft" to "40rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "pay-button-text" to _uM(".bottom-bar .pay-button " to _uM("color" to "#ffffff", "fontSize" to "30rpx", "fontWeight" to 500)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
