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
open class GenPagesOrderRecordOrderRecord : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesOrderRecordOrderRecord) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesOrderRecordOrderRecord
            val _cache = __ins.renderCache
            val orderList = ref(_uA(
                _uO("packageName" to "车联网月包20G", "amount" to 90, "orderNo" to "0202604280001", "status" to "已完成", "time" to "2026-04-28 10:12:30"),
                _uO("packageName" to "车联网月包10G", "amount" to 50, "orderNo" to "0202604280002", "status" to "待支付", "time" to "2026-04-28 11:20:12"),
                _uO("packageName" to "测试套餐1G", "amount" to 10, "orderNo" to "0202603010001", "status" to "已退款", "time" to "2026-03-01 08:10:00")
            ))
            val getOrderText = fun(order: Any, key: String): String {
                val value = (order as UTSJSONObject)[key]
                return if (value == null) {
                    ""
                } else {
                    "" + value
                }
            }
            val getStatusClass = fun(status: String): String {
                when (status) {
                    "已完成" -> 
                        return "status-completed"
                    "待支付" -> 
                        return "status-pending"
                    "已退款" -> 
                        return "status-refunded"
                    else -> 
                        return ""
                }
            }
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "订单记录", "show-back" to true, "onBack" to goBack, "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "order-list"), _uA(
                            _cE("view", _uM("class" to "card-number-section"), _uA(
                                _cE("text", _uM("class" to "card-number-label"), "当前卡号"),
                                _cE("text", _uM("class" to "card-number-value"), "1064916585160")
                            )),
                            _cE(Fragment, null, RenderHelpers.renderList(orderList.value, fun(order, index, __index, _cached): Any {
                                return _cE("view", _uM("key" to index, "class" to "order-item"), _uA(
                                    _cE("view", _uM("class" to "order-header"), _uA(
                                        _cE("text", _uM("class" to "package-name"), _tD(getOrderText(order, "packageName")), 1),
                                        _cE("text", _uM("class" to "price"), "￥" + _tD(getOrderText(order, "amount")), 1)
                                    )),
                                    _cE("view", _uM("class" to "order-info"), _uA(
                                        _cE("text", _uM("class" to "order-no"), "订单号：" + _tD(getOrderText(order, "orderNo")), 1),
                                        _cE("text", _uM("class" to _nC(_uA(
                                            "status",
                                            getStatusClass(getOrderText(order, "status"))
                                        ))), _tD(getOrderText(order, "status")), 3)
                                    )),
                                    _cE("view", _uM("class" to "order-time"), _uA(
                                        _cE("text", _uM("class" to "time order-time-text"), _tD(getOrderText(order, "time")), 1)
                                    ))
                                ))
                            }
                            ), 128)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "24rpx", "paddingRight" to "32rpx", "paddingBottom" to "24rpx", "paddingLeft" to "32rpx")), "tip-text" to _pS(_uM("marginBottom" to "24rpx")), "tip-text-value" to _pS(_uM("fontSize" to "26rpx", "color" to "#9ca3af")), "card-number-section" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "marginTop" to "32rpx", "marginRight" to 0, "marginBottom" to "32rpx", "marginLeft" to 0, "paddingBottom" to "20rpx", "borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#e5e7eb")), "card-number-label" to _uM(".card-number-section " to _uM("fontSize" to "24rpx", "color" to "#64748b", "marginRight" to "24rpx")), "card-number-value" to _uM(".card-number-section " to _uM("fontSize" to "32rpx", "color" to "#1f2937", "fontWeight" to "bold")), "order-list" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "paddingTop" to 0, "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e2e8f0", "borderRightColor" to "#e2e8f0", "borderBottomColor" to "#e2e8f0", "borderLeftColor" to "#e2e8f0", "boxShadow" to "0 8rpx 20rpx rgba(15, 23, 42, 0.04)")), "order-item" to _pS(_uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f0f0")), "order-header" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "flex-start", "marginBottom" to "10rpx")), "package-name" to _uM(".order-header " to _uM("fontSize" to "26rpx", "fontWeight" to 600, "color" to "#0f172a")), "price" to _uM(".order-header " to _uM("fontSize" to "32rpx", "fontWeight" to 600, "color" to "#ef4444")), "order-info" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "marginBottom" to "10rpx")), "order-no" to _uM(".order-info " to _uM("fontSize" to "24rpx", "color" to "#0f172a")), "status" to _uM(".order-info " to _uM("fontSize" to "24rpx", "paddingTop" to "6rpx", "paddingRight" to "16rpx", "paddingBottom" to "6rpx", "paddingLeft" to "16rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "status-completed" to _uM(".order-info " to _uM("backgroundImage" to "none", "backgroundColor" to "#ecfdf5", "color" to "#059669", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#a7f3d0", "borderRightColor" to "#a7f3d0", "borderBottomColor" to "#a7f3d0", "borderLeftColor" to "#a7f3d0")), "status-pending" to _uM(".order-info " to _uM("backgroundImage" to "none", "backgroundColor" to "#fffbeb", "color" to "#d97706", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#fde68a", "borderRightColor" to "#fde68a", "borderBottomColor" to "#fde68a", "borderLeftColor" to "#fde68a")), "status-refunded" to _uM(".order-info " to _uM("backgroundColor" to "#fce4ec", "color" to "#c62828")), "time" to _uM(".order-time " to _uM("fontSize" to "24rpx", "color" to "#0f172a")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
