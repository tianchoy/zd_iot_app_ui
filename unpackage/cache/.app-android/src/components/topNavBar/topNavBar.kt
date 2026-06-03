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
open class GenComponentsTopNavBarTopNavBar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var title: String? by `$props`
    open var showBack: Boolean by `$props`
    open var backText: String by `$props`
    open var showCapsule: Boolean by `$props`
    open var backgroundColor: String by `$props`
    open var textColor: String by `$props`
    open var isIcon: Boolean by `$props`
    open var Icon: String by `$props`
    open var rightText: String by `$props`
    open var isShowStyle: Boolean by `$props`
    open var iconColor: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsTopNavBarTopNavBar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsTopNavBarTopNavBar
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val statusBarHeight = ref(20)
            val navBarHeight = ref(44)
            val totalNavHeight = computed(fun(): Number {
                return statusBarHeight.value + navBarHeight.value
            }
            )
            val statusBarStyle = computed(fun(): UTSJSONObject {
                return (_uO("height" to (statusBarHeight.value + "px"), "backgroundColor" to props.backgroundColor, "position" to "fixed", "width" to "100%", "left" to 0, "top" to 0, "zIndex" to 100))
            }
            )
            val navBarStyle = computed(fun(): UTSJSONObject {
                return (_uO("height" to (navBarHeight.value + "px"), "backgroundColor" to props.backgroundColor, "position" to "fixed", "width" to "100%", "left" to 0, "top" to (statusBarHeight.value + "px"), "zIndex" to 100))
            }
            )
            val getNavBarInfo = fun(){}
            val handleBack = fun(){
                if (props.showBack) {
                    emit("back")
                }
            }
            onMounted(fun(){
                getNavBarInfo()
            }
            )
            return fun(): Any? {
                val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
                return _cE(Fragment, null, _uA(
                    if (isTrue(_ctx.isShowStyle)) {
                        _cE("view", _uM("key" to 0, "style" to _nS(statusBarStyle.value)), null, 4)
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.isShowStyle)) {
                        _cE("view", _uM("key" to 1, "class" to "navbar", "style" to _nS(navBarStyle.value)), _uA(
                            _cE("view", _uM("class" to "back-btn", "style" to _nS(_uM("visibility" to if (_ctx.showBack) {
                                "visible"
                            } else {
                                "hidden"
                            }))), _uA(
                                if (isTrue(_ctx.showBack)) {
                                    _cV(_component_m_icon, _uM("key" to 0, "name" to "arrow-left-bold", "size" to "35rpx", "class" to "icon", "onClick" to handleBack))
                                } else {
                                    _cC("v-if", true)
                                }
                            ), 4),
                            _cE("view", _uM("class" to "title", "style" to _nS(_uM("color" to _ctx.textColor, "line-height" to (unref(navBarHeight) + "px")))), _uA(
                                renderSlot(_ctx.`$slots`, "title", _uO(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(_ctx.title)
                                    )
                                })
                            ), 4),
                            _cE("view", _uM("class" to "capsule"), _uA(
                                _cE("view", _uM("class" to "capsule-item"), _uA(
                                    if (isTrue(_ctx.showCapsule)) {
                                        _cE("view", _uM("key" to 0, "onClick" to fun(){
                                            emit("capsuleClick", "menu")
                                        }), _uA(
                                            if (isTrue(_ctx.isIcon)) {
                                                _cV(_component_m_icon, _uM("key" to 0, "name" to _ctx.Icon, "size" to "26", "color" to _ctx.iconColor), null, 8, _uA(
                                                    "name",
                                                    "color"
                                                ))
                                            } else {
                                                _cE("text", _uM("key" to 1), _tD(_ctx.rightText), 1)
                                            }
                                        ), 8, _uA(
                                            "onClick"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                ))
                            ))
                        ), 4)
                    } else {
                        _cE(Fragment, _uM("key" to 2), _uA(
                            _cE("view", _uM("style" to _nS(_uM("height" to (unref(statusBarHeight) + "px"), "backgroundColor" to _ctx.backgroundColor))), null, 4),
                            _cE("view", _uM("class" to "navbar", "style" to _nS(_uM("height" to (unref(navBarHeight) + "px"), "backgroundColor" to _ctx.backgroundColor))), _uA(
                                _cE("view", _uM("class" to "back-btn", "style" to _nS(_uM("visibility" to if (_ctx.showBack) {
                                    "visible"
                                } else {
                                    "hidden"
                                }
                                ))), _uA(
                                    if (isTrue(_ctx.showBack)) {
                                        _cV(_component_m_icon, _uM("key" to 0, "name" to "arrow-left-bold", "size" to "40rpx", "class" to "icon", "onClick" to handleBack))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                ), 4),
                                _cE("view", _uM("class" to "title", "style" to _nS(_uM("color" to _ctx.textColor, "line-height" to (unref(navBarHeight) + "px")))), _uA(
                                    renderSlot(_ctx.`$slots`, "title", _uO(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(_ctx.title)
                                        )
                                    }
                                    )
                                ), 4),
                                _cE("view", _uM("class" to "capsule"), _uA(
                                    _cE("view", _uM("class" to "capsule-item"), _uA(
                                        if (isTrue(_ctx.showCapsule)) {
                                            _cE("view", _uM("key" to 0, "onClick" to fun(){
                                                emit("capsuleClick", "menu")
                                            }), _uA(
                                                if (isTrue(_ctx.isIcon)) {
                                                    _cV(_component_m_icon, _uM("key" to 0, "name" to _ctx.Icon, "size" to "26", "color" to _ctx.iconColor), null, 8, _uA(
                                                        "name",
                                                        "color"
                                                    ))
                                                } else {
                                                    _cE("text", _uM("key" to 1), _tD(_ctx.rightText), 1)
                                                }
                                            ), 8, _uA(
                                                "onClick"
                                            ))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ))
                                ))
                            ), 4)
                        ), 64)
                    }
                    ,
                    if (isTrue(_ctx.isShowStyle)) {
                        _cE("view", _uM("key" to 3, "style" to _nS(_uM("height" to (totalNavHeight.value + "px")))), null, 4)
                    } else {
                        _cC("v-if", true)
                    }
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
                return _uM("navbar" to _pS(_uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "boxSizing" to "border-box")), "back-btn" to _pS(_uM("display" to "flex", "alignItems" to "center", "width" to "70rpx", "height" to "40rpx", "zIndex" to 10, "justifyContent" to "center", "flexShrink" to 0)), "title" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "textAlign" to "center", "fontWeight" to "bold", "fontSize" to "30rpx", "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "capsule" to _pS(_uM("display" to "flex", "alignItems" to "center", "justifyContent" to "flex-end", "flexShrink" to 0, "minWidth" to "70rpx")), "capsule-item" to _pS(_uM("display" to "flex", "justifyContent" to "center", "alignItems" to "center")), "icon" to _pS(_uM("width" to "40rpx", "height" to "40rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("back" to null, "capsuleClick" to null)
        var props = _nP(_uM("title" to _uM("type" to "String"), "showBack" to _uM("type" to "Boolean", "default" to true), "backText" to _uM("type" to "String", "default" to ""), "showCapsule" to _uM("type" to "Boolean", "default" to true), "backgroundColor" to _uM("type" to "String", "default" to "#f4f7fb"), "textColor" to _uM("type" to "String", "default" to "#000000"), "isIcon" to _uM("type" to "Boolean", "default" to true), "Icon" to _uM("type" to "String", "default" to "add-circle"), "rightText" to _uM("type" to "String", "default" to ""), "isShowStyle" to _uM("type" to "Boolean", "default" to true), "iconColor" to _uM("type" to "String", "default" to "#606266")))
        var propsNeedCastKeys = _uA(
            "showBack",
            "backText",
            "showCapsule",
            "backgroundColor",
            "textColor",
            "isIcon",
            "Icon",
            "rightText",
            "isShowStyle",
            "iconColor"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
