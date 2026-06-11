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
open class GenComponentsPayment : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var cardNumber: String? by `$props`
    open var productName: String? by `$props`
    open var traffic: String? by `$props`
    open var validityPeriod: String? by `$props`
    open var amount: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsPayment) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsPayment
            val _cache = __ins.renderCache
            val props = __props
            val cardNumber = props.cardNumber ?: "1064916585160"
            val productName = props.productName ?: "车联网月包20G"
            val traffic = props.traffic ?: "20GB"
            val validityPeriod = props.validityPeriod ?: "30天"
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val formattedAmount = computed(fun(): String {
                return "￥" + props.amount
            }
            )
            val paymentMethods = ref(_uA<PaymentMethod>(PaymentMethod(id = "wechat_h5", label = "微信H5支付", desc = "推荐使用微信完成支付"), PaymentMethod(id = "alipay", label = "支付宝支付", desc = "通过支付宝完成支付"), PaymentMethod(id = "bank_card", label = "银行卡支付", desc = "支持常见银行卡支付")))
            val selectedMethodId = ref<String>("wechat_h5")
            val selectPaymentMethod = fun(methodId: String){
                selectedMethodId.value = methodId
            }
            val handleCancel = fun(){
                emit("cancel")
            }
            val handleConfirm = fun(){
                emit("confirm", selectedMethodId.value)
            }
            return fun(): Any? {
                val _component_rice_button = resolveEasyComponent("rice-button", GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass)
                return _cE("view", _uM("class" to "payment-content"), _uA(
                    _cE("view", _uM("class" to "payment-info"), _uA(
                        _cE("text", _uM("class" to "info-title"), "确认支付信息"),
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", _uM("class" to "item-label"), "卡号"),
                            _cE("text", _uM("class" to "item-value"), _tD(unref(cardNumber)), 1)
                        )),
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", _uM("class" to "item-label"), "商品"),
                            _cE("text", _uM("class" to "item-value"), _tD(unref(productName)), 1)
                        )),
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", _uM("class" to "item-label"), "流量"),
                            _cE("text", _uM("class" to "item-value"), _tD(unref(traffic)), 1)
                        )),
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", _uM("class" to "item-label"), "有效期"),
                            _cE("text", _uM("class" to "item-value"), _tD(unref(validityPeriod)), 1)
                        )),
                        _cE("view", _uM("class" to "payment-methods"), _uA(
                            _cE("view", _uM("class" to "method-section"), _uA(
                                _cE("text", _uM("class" to "section-title"), "选择支付方式"),
                                _cE(Fragment, null, RenderHelpers.renderList(unref(paymentMethods), fun(method, __key, __index, _cached): Any {
                                    return _cE("view", _uM("class" to _nC(_uA(
                                        "method-option",
                                        _uM("method-selected" to (unref(selectedMethodId) === method.id))
                                    )), "key" to method.id, "onClick" to fun(){
                                        selectPaymentMethod(method.id)
                                    }
                                    ), _uA(
                                        _cE("view", _uM("class" to "method-left"), _uA(
                                            _cE("text", _uM("class" to "method-label"), _tD(method.label), 1),
                                            if (isTrue(method.desc)) {
                                                _cE("text", _uM("key" to 0, "class" to "method-desc"), _tD(method.desc), 1)
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        )),
                                        _cE("view", _uM("class" to "method-right"), _uA(
                                            _cE("view", _uM("class" to _nC(_uA(
                                                "radio",
                                                _uM("radio-selected" to (unref(selectedMethodId) === method.id))
                                            ))), null, 2)
                                        ))
                                    ), 10, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128)
                            ))
                        )),
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", _uM("class" to "item-label"), "应付金额"),
                            _cE("text", _uM("class" to "item-value amount"), _tD(unref(formattedAmount)), 1)
                        ))
                    )),
                    _cE("view", _uM("class" to "tips"), _uA(
                        _cE("text", _uM("class" to "tips-text"), "续费后套餐将在30分钟内生效，如续费后设备始终无法上线，请您联系客服处理！")
                    )),
                    _cE("view", _uM("class" to "action-buttons"), _uA(
                        _cV(_component_rice_button, _uM("class" to "btn cancel-btn mr-24", "onClick" to handleCancel), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                "取消"
                            )
                        }
                        ), "_" to 1)),
                        _cV(_component_rice_button, _uM("class" to "btn confirm-btn ml-24", "textColor" to "#fff", "onClick" to handleConfirm), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                "确认支付"
                            )
                        }
                        ), "_" to 1))
                    ))
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
                return _uM("payment-content" to _pS(_uM("backgroundColor" to "#ffffff", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "48rpx", "paddingLeft" to "32rpx", "boxSizing" to "border-box")), "payment-info" to _pS(_uM("marginBottom" to "32rpx")), "info-title" to _pS(_uM("fontSize" to "36rpx", "fontWeight" to 600, "color" to "#333333", "textAlign" to "center", "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#eef2f7", "marginBottom" to "40rpx", "paddingBottom" to "20rpx")), "info-item" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "item-label" to _pS(_uM("fontSize" to "24rpx", "color" to "#666666")), "item-value" to _pS(_uM("fontSize" to "24rpx", "color" to "#333333", "fontWeight" to "bold")), "amount" to _pS(_uM("color" to "#f23030", "fontSize" to "32rpx", "fontWeight" to 700)), "payment-methods" to _pS(_uM("marginBottom" to "24rpx")), "method-item" to _uM(".fixed-method" to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingBottom" to "20rpx")), "method-label" to _uM(".method-item " to _uM("fontSize" to "24rpx", "color" to "#666666"), "" to _uM("fontSize" to "24rpx", "color" to "#333333", "fontWeight" to 500, "marginBottom" to "8rpx")), "method-name" to _uM(".method-item " to _uM("fontSize" to "24rpx", "color" to "#333333", "fontWeight" to 500)), "method-section" to _pS(_uM("marginTop" to "8rpx")), "section-title" to _pS(_uM("fontSize" to "24rpx", "color" to "#666666", "marginBottom" to "24rpx")), "method-option" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginBottom" to "16rpx", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e5e5", "borderRightColor" to "#e5e5e5", "borderBottomColor" to "#e5e5e5", "borderLeftColor" to "#e5e5e5", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "backgroundColor" to "#ffffff", "transitionProperty" to "all", "transitionDuration" to "0.3s", "transitionTimingFunction" to "ease"), ".method-selected" to _uM("borderTopColor" to "#2563eb", "borderRightColor" to "#2563eb", "borderBottomColor" to "#2563eb", "borderLeftColor" to "#2563eb", "backgroundColor" to "#f8fbff")), "method-left" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "display" to "flex", "flexDirection" to "column")), "method-desc" to _pS(_uM("fontSize" to "20rpx", "color" to "#999999")), "method-right" to _pS(_uM("paddingLeft" to "20rpx")), "radio" to _pS(_uM("width" to "25rpx", "height" to "25rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dddddd", "borderRightColor" to "#dddddd", "borderBottomColor" to "#dddddd", "borderLeftColor" to "#dddddd", "backgroundColor" to "#ffffff", "position" to "relative", "boxSizing" to "border-box", "transitionProperty" to "all", "transitionDuration" to "0.2s", "transitionTimingFunction" to "ease")), "radio-selected" to _pS(_uM("borderTopColor" to "#2563eb", "borderRightColor" to "#2563eb", "borderBottomColor" to "#2563eb", "borderLeftColor" to "#2563eb", "backgroundColor" to "#2563eb")), "tips" to _pS(_uM("backgroundColor" to "#f9f9f9", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx", "marginBottom" to "48rpx")), "tips-text" to _pS(_uM("fontSize" to "24rpx", "color" to "#999999", "lineHeight" to 1.4)), "action-buttons" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "btn" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "fontSize" to "32rpx", "fontWeight" to 500, "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundColor" to "rgba(0,0,0,0)")), "cancel-btn" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#dbe5f0", "borderRightColor" to "#dbe5f0", "borderBottomColor" to "#dbe5f0", "borderLeftColor" to "#dbe5f0", "color" to "#334155")), "confirm-btn" to _pS(_uM("backgroundImage" to "linear-gradient(135deg, #2563eb 0%, #4c88f4 100%)", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#ffffff")), "@TRANSITION" to _uM("method-option" to _uM("property" to "all", "duration" to "0.3s", "timingFunction" to "ease"), "radio" to _uM("property" to "all", "duration" to "0.2s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("cancel" to null, "confirm" to null)
        var props = _nP(_uM("cardNumber" to _uM("type" to "String", "required" to false), "productName" to _uM("type" to "String", "required" to false), "traffic" to _uM("type" to "String", "required" to false), "validityPeriod" to _uM("type" to "String", "required" to false), "amount" to _uM("type" to "Number", "required" to true)))
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
