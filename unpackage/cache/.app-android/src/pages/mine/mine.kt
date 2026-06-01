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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
open class GenPagesMineMine : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineMine) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineMine
            val _cache = __ins.renderCache
            val title = ref("用户")
            val cardType = fun(type: Number){
                console.log(type, " at pages/mine/mine.uvue:44")
                uni_reLaunch(ReLaunchOptions(url = "/pages/card/card?type=" + type))
            }
            val toOrder = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/myOrder/myOrder"))
            }
            return fun(): Any? {
                val _component_topNavBar = resolveEasyComponent("topNavBar", GenComponentsTopNavBarTopNavBarClass)
                val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
                return _cE(Fragment, null, _uA(
                    _cV(_component_topNavBar, _uM("title" to "我的", "show-back" to false, "backgroundColor" to "#f4f7fb", "textColor" to "#333", "showCapsule" to false)),
                    _cE("view", _uM("class" to "container"), _uA(
                        _cE("view", _uM("class" to "card-info mb-24"), _uA(
                            _cE("text", _uM("class" to "persion-name"), "Hi," + _tD(unref(title)), 1),
                            _cE("view", _uM("class" to "persion-card"), _uA(
                                _cE("view", _uM("class" to "persion-card-item", "onClick" to fun(){
                                    cardType(0)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "我的卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), " 12")
                                ), 8, _uA(
                                    "onClick"
                                )),
                                _cE("view", _uM("class" to "persion-card-item", "onClick" to fun(){
                                    cardType(1)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "在用卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), " 12")
                                ), 8, _uA(
                                    "onClick"
                                )),
                                _cE("view", _uM("class" to "persion-card-item", "onClick" to fun(){
                                    cardType(2)
                                }
                                ), _uA(
                                    _cE("text", _uM("class" to "persion-card-item-title"), "异常卡片"),
                                    _cE("text", _uM("class" to "persion-card-item-content"), " 12")
                                ), 8, _uA(
                                    "onClick"
                                ))
                            ))
                        )),
                        _cE("view", _uM("class" to "card-box"), _uA(
                            _cE("view", _uM("class" to "item", "onClick" to toOrder), _uA(
                                _cE("text", _uM("class" to "order-label"), "我的订单"),
                                _cV(_component_m_icon, _uM("name" to "arrow-right-bold", "size" to "20rpx"))
                            )),
                            _cE("view", _uM("class" to "item"), _uA(
                                _cE("text", _uM("class" to "order-label"), "绑定卡片"),
                                _cV(_component_m_icon, _uM("name" to "arrow-right-bold", "size" to "20rpx"))
                            )),
                            _cE("view", _uM("class" to "item"), _uA(
                                _cE("text", _uM("class" to "order-label"), "常见问题"),
                                _cV(_component_m_icon, _uM("name" to "arrow-right-bold", "size" to "20rpx"))
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f4f7fb")), "card-info" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundImage" to "linear-gradient(135deg, #2f6de8 0%, #4d88f5 65%, #67a4ff 100%)", "backgroundColor" to "rgba(0,0,0,0)", "color" to "#ffffff", "boxShadow" to "0 8rpx 18rpx rgba(37, 99, 235, 0.14)")), "persion-name" to _uM(".container .card-info " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "color" to "#ffffff")), "persion-card" to _uM(".container .card-info " to _uM("marginTop" to "30rpx", "display" to "flex", "flexDirection" to "row")), "persion-card-item" to _uM(".container .card-info .persion-card " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "marginTop" to 0, "marginRight" to "10rpx", "marginBottom" to 0, "marginLeft" to "10rpx", "minHeight" to "120rpx", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "paddingTop" to "20rpx", "paddingRight" to "24rpx", "paddingBottom" to "20rpx", "paddingLeft" to "24rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.12)", "boxShadow" to "inset 0 1px 0 rgba(255, 255, 255, 0.18)")), "persion-card-item-title" to _uM(".container .card-info .persion-card " to _uM("fontSize" to "22rpx", "lineHeight" to 1.4, "color" to "#ffffff")), "persion-card-item-content" to _uM(".container .card-info .persion-card " to _uM("marginTop" to "20rpx", "fontSize" to "40rpx", "fontWeight" to 800, "lineHeight" to 1)), "card-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "marginTop" to 0, "marginRight" to "24rpx", "marginBottom" to 0, "marginLeft" to "24rpx", "backgroundColor" to "#ffffff")), "item" to _uM(".container .card-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "24rpx", "paddingRight" to "24rpx", "paddingBottom" to "24rpx", "paddingLeft" to "24rpx", "borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#e7edf5")), "order-label" to _uM(".container .card-box .item " to _uM("fontWeight" to "bold")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
