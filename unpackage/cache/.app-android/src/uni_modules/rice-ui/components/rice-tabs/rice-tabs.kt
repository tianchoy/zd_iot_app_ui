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
open class GenUniModulesRiceUiComponentsRiceTabsRiceTabs : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var list: UTSArray<TabsOptions> by `$props`
    open var shrink: Boolean by `$props`
    open var lineMode: String by `$props`
    open var titleActiveColor: String? by `$props`
    open var titleInactiveColor: String? by `$props`
    open var initAnimate: Boolean by `$props`
    open var bgColor: String? by `$props`
    open var height: Any? by `$props`
    open var lineColor: String? by `$props`
    open var lineWidth: Any by `$props`
    open var lineHeight: Any? by `$props`
    open var textClass: Any? by `$props`
    open var activeTextClass: Any? by `$props`
    open var inactiveTextClass: Any? by `$props`
    open var disabledTextClass: Any? by `$props`
    open var itemStyle: UTSJSONObject by `$props`
    open var activeStyle: UTSJSONObject? by `$props`
    open var inactiveStyle: UTSJSONObject? by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var modelValue: Number by `$props`
    open var resize: () -> UTSPromise<Unit>
        get() {
            return unref(this.`$exposed`["resize"]) as () -> UTSPromise<Unit>
        }
        set(value) {
            setRefValue(this.`$exposed`, "resize", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesRiceUiComponentsRiceTabsRiceTabs, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesRiceUiComponentsRiceTabsRiceTabs
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val ns = useNamespace("tabs")
            val props = __props
            val modelValue = useModel<Number>(__ins.props, "modelValue")
            val scrollLeft = ref(0)
            var isFirstMove = ref(true)
            val indicatorRef = shallowRef<UniElement?>(null)
            val tabScrollRef = shallowRef<UniElement?>(null)
            val tabsItemRef = ref(_uA<UniElement>())
            val tabsItemRect = ref(_uA<TabsItemRect>())
            val cacheTabItemsSize = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        tabsItemRect.value = _uA()
                        run {
                            var i: Number = 0
                            while(i < tabsItemRef.value.length){
                                val element = tabsItemRef.value[i]
                                val x = element.offsetLeft
                                val w = element.offsetWidth
                                tabsItemRect.value.push(TabsItemRect(x = x, w = w))
                                i++
                            }
                        }
                })
            }
            val updateTabIndicator = fun(currentIndex: Number, moveToIndex: Number, percentage: Number): UTSPromise<Unit> {
                return wrapUTSPromise(suspend w1@{
                        if (tabsItemRect.value.length == 0 || moveToIndex >= tabsItemRect.value.length) {
                            return@w1
                        }
                        val currentSize = tabsItemRect.value[currentIndex]
                        val moveToSize = tabsItemRect.value[moveToIndex]
                        val indicatorLineX = moveToSize.x
                        val indicatorLineW = getPxNum(props.lineWidth!!, moveToSize.w)
                        val x = indicatorLineX + (moveToSize.w - indicatorLineW) / 2
                        if (!isTruthy(props.initAnimate)) {
                            indicatorRef.value?.style?.setProperty("opacity", if (isFirstMove.value) {
                                0
                            } else {
                                1
                            }
                            )
                            indicatorRef.value?.style?.setProperty("transition-duration", if (isFirstMove.value) {
                                "0ms"
                            } else {
                                "300ms"
                            }
                            )
                        }
                        indicatorRef.value?.style?.setProperty("width", indicatorLineW + "px")
                        indicatorRef.value?.style?.setProperty("transform", "translateX(" + x + "px)")
                        val rect = await(tabScrollRef.value!!.getBoundingClientRectAsync()!!)
                        tabScrollRef.value!!.scrollLeft = x - rect.width / 2
                        await(nextTick())
                        indicatorRef.value?.style?.setProperty("opacity", 1)
                        isFirstMove.value = false
                })
            }
            val tabClick = fun(tab: TabsOptions, index: Number){
                emit("clickTab", TabsClickTab(index = index, name = tab.name, value = tab.value, disabled = tab.disabled ?: false))
                if (modelValue.value == index || tab.disabled == true) {
                    return
                }
                updateTabIndicator(modelValue.value, index, 1)
                modelValue.value = index
                emit("change", TabsChange(index = index, name = tab.name, value = tab.value, disabled = tab.disabled ?: false))
            }
            val getActiveZoomStyle = fun(index: Number): Map<String, String> {
                val css = Map<String, String>()
                var width = "0px"
                if (index == modelValue.value) {
                    width = addUnit(props.lineWidth ?: "20px")
                }
                css.set("width", width)
                return css
            }
            val resize = fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(nextTick())
                        await(cacheTabItemsSize())
                        updateTabIndicator(modelValue.value, modelValue.value, 1)
                })
            }
            val tabsStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.height != null) {
                    css.set("height", addUnit(props.height!!))
                }
                if (props.bgColor != null) {
                    css.set("background-color", props.bgColor!!)
                }
                return css
            }
            )
            val indicatorStyle = computed(fun(): Map<String, String> {
                val css = Map<String, String>()
                if (props.lineHeight != null) {
                    css.set("height", addUnit(props.lineHeight!!))
                }
                if (props.lineColor != null) {
                    css.set("background-color", props.lineColor!!)
                }
                return css
            }
            )
            val getItemStyle = fun(tab: TabsOptions, index: Number): UTSArray<UTSJSONObject> {
                val basic = _uA(
                    props.itemStyle
                ) as UTSArray<UTSJSONObject>
                if (tab.disabled == true) {
                    return basic
                }
                val isSelected = index == modelValue.value
                if (isSelected && props.activeStyle != null) {
                    basic.push(props.activeStyle!!)
                }
                if (!isSelected && props.inactiveStyle != null) {
                    basic.push(props.inactiveStyle!!)
                }
                return basic
            }
            val getTextClass = fun(tab: TabsOptions, index: Number): UTSArray<Any> {
                val basic = _uA<Any>()
                val isSelected = index == modelValue.value
                if (props.textClass != null) {
                    basic.push(props.textClass!!)
                }
                if (isSelected) {
                    basic.push("rice-tabs__item__active")
                    basic.push((props.activeTextClass ?: "") as String)
                } else {
                    basic.push((props.inactiveTextClass ?: "") as String)
                }
                if (tab.disabled == true) {
                    basic.push("rice-tabs__item__disabled")
                    basic.push((props.disabledTextClass ?: "") as String)
                }
                return basic
            }
            val getTextStyle = fun(tab: TabsOptions, index: Number): Map<String, String> {
                val css = Map<String, String>()
                val isSelected = index == modelValue.value
                if (isSelected && props.titleActiveColor != null) {
                    css.set("color", props.titleActiveColor!!)
                }
                if (!isSelected && props.titleInactiveColor != null) {
                    css.set("color", props.titleInactiveColor!!)
                }
                return css
            }
            watch(modelValue, fun(newVal: Number, oldVal: Number): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        updateTabIndicator(oldVal, newVal, 1)
                })
            }
            )
            watch(fun(): UTSArray<Any?> {
                return _uA(
                    props.lineWidth,
                    props.lineHeight,
                    props.list
                )
            }
            , fun(): UTSPromise<Unit> {
                return wrapUTSPromise(suspend {
                        await(nextTick())
                        resize()
                })
            }
            )
            onMounted(fun(){
                setTimeout(fun(){
                    resize()
                }
                , 100)
            }
            )
            __expose(_uM("resize" to resize))
            return fun(): Any? {
                val _component_rice_badge = resolveEasyComponent("rice-badge", GenUniModulesRiceUiComponentsRiceBadgeRiceBadgeClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "rice-tabs",
                    unref(ns).theme()
                )), "style" to _nS(_uA(
                    unref(tabsStyle),
                    _ctx.customStyle
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "left"),
                    _cE("scroll-view", _uM("class" to "rice-tabs__scroll", "ref_key" to "tabScrollRef", "ref" to tabScrollRef, "direction" to "horizontal", "show-scrollbar" to false, "scroll-with-animation" to true), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(_ctx.list, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("key" to index, "ref_for" to true, "ref_key" to "tabsItemRef", "ref" to tabsItemRef, "class" to _nC(_uA(
                                "rice-tabs__item",
                                _uM("rice-tabs--shrink" to props.shrink)
                            )), "style" to _nS(getItemStyle(item, index)), "onClick" to fun(){
                                tabClick(item, index)
                            }
                            ), _uA(
                                if (item.badge != null) {
                                    _cV(_component_rice_badge, _uM("key" to 0, "is-dot" to item.badge!!.isDot, "value" to item.badge!!.value, "show-zero" to (item.badge!!.showZero ?: true), "offset" to _uA(
                                        10,
                                        0
                                    )), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("text", _uM("class" to _nC(_uA(
                                                "rice-tabs__item__text",
                                                getTextClass(item, index)
                                            )), "style" to _nS(getTextStyle(item, index))), _tD(item.name), 7)
                                        )
                                    }), "_" to 2), 1032, _uA(
                                        "is-dot",
                                        "value",
                                        "show-zero"
                                    ))
                                } else {
                                    _cE("text", _uM("key" to 1, "class" to _nC(_uA(
                                        "rice-tabs__item__text",
                                        getTextClass(item, index)
                                    )), "style" to _nS(getTextStyle(item, index))), _tD(item.name), 7)
                                }
                                ,
                                if (_ctx.lineMode == "zoom") {
                                    _cE("view", _uM("key" to 2, "class" to "rice-tabs__item__line", "style" to _nS(_uA(
                                        getActiveZoomStyle(index),
                                        unref(indicatorStyle)
                                    ))), null, 4)
                                } else {
                                    _cC("v-if", true)
                                }
                            ), 14, _uA(
                                "onClick"
                            ))
                        }
                        ), 128),
                        if (_ctx.lineMode == "slide") {
                            _cE("view", _uM("key" to 0, "ref_key" to "indicatorRef", "ref" to indicatorRef, "style" to _nS(unref(indicatorStyle)), "class" to _nC(_uA(
                                "rice-tabs__indicator",
                                _uM("rice-tabs__indicator--animate" to !isTruthy(_ctx.initAnimate))
                            ))), null, 6)
                        } else {
                            _cC("v-if", true)
                        }
                    ), 512),
                    renderSlot(_ctx.`$slots`, "right")
                ), 6)
            }
        }
        var name = "rice-tabs"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-tabs" to _pS(_uM("display" to "flex", "flexDirection" to "row", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "backgroundColor" to "#f3f7fb", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5edf6", "borderRightColor" to "#e5edf6", "borderBottomColor" to "#e5edf6", "borderLeftColor" to "#e5edf6")), "rice-tabs__scroll" to _pS(_uM("position" to "relative", "flexDirection" to "row", "height" to "100%", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "rice-tabs__item" to _pS(_uM("flexGrow" to 1, "flexShrink" to 0, "flexBasis" to "0%", "position" to "relative", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "marginTop" to 0, "marginRight" to "10rpx", "marginBottom" to 0, "marginLeft" to "10rpx")), "rice-tabs__item__text" to _pS(_uM("transitionProperty" to "color", "transitionDuration" to "0.3s", "fontSize" to 15, "color" to "var(--rice-text-color-2)")), "rice-tabs__item__active" to _pS(_uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "paddingTop" to "12rpx", "paddingRight" to 0, "paddingBottom" to "12rpx", "paddingLeft" to 0, "textAlign" to "center")), "rice-tabs__item__disabled" to _pS(_uM("color" to "var(--rice-tabs-disabled-text-color)")), "rice-tabs__item__line" to _pS(_uM("position" to "absolute", "zIndex" to 1, "bottom" to 2, "left" to "50%", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "transform" to "translateX(-50%)", "transitionProperty" to "width", "transitionDuration" to "250ms", "width" to 0, "height" to 3, "backgroundColor" to "var(--rice-primary-color)")), "rice-tabs--shrink" to _pS(_uM("paddingTop" to 0, "paddingRight" to 8, "paddingBottom" to 0, "paddingLeft" to 8, "flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto")), "rice-tabs__indicator" to _pS(_uM("position" to "absolute", "zIndex" to 1, "bottom" to 2, "left" to 0, "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "transitionProperty" to "transform,width", "transitionDuration" to "250ms", "width" to 20, "height" to 3, "backgroundColor" to "var(--rice-primary-color)")), "rice-tabs__indicator--animate" to _pS(_uM("opacity" to 0)), "@TRANSITION" to _uM("rice-tabs__item__text" to _uM("property" to "color", "duration" to "0.3s"), "rice-tabs__item__line" to _uM("property" to "width", "duration" to "250ms"), "rice-tabs__indicator" to _uM("property" to "transform,width", "duration" to "250ms")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("clickTab" to null, "change" to null, "update:modelValue" to null)
        var props = _nP(_uM("list" to _uM("type" to "Array", "required" to true, "default" to fun(): UTSArray<TabsOptions> {
            return (_uA<TabsOptions>())
        }
        ), "shrink" to _uM("type" to "Boolean", "required" to false, "default" to false), "lineMode" to _uM("type" to "String", "required" to false, "default" to "slide"), "titleActiveColor" to _uM("type" to "String", "required" to false), "titleInactiveColor" to _uM("type" to "String", "required" to false), "initAnimate" to _uM("type" to "Boolean", "required" to false, "default" to true), "bgColor" to _uM("type" to "String", "required" to false), "height" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "lineColor" to _uM("type" to "String", "required" to false), "lineWidth" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false, "default" to "20px"), "lineHeight" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "textClass" to _uM("type" to null, "required" to false, "externalClasses" to true, "skipCheck" to true), "activeTextClass" to _uM("type" to null, "required" to false, "externalClasses" to true, "skipCheck" to true), "inactiveTextClass" to _uM("type" to null, "required" to false, "externalClasses" to true, "skipCheck" to true), "disabledTextClass" to _uM("type" to null, "required" to false, "externalClasses" to true, "skipCheck" to true), "itemStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "activeStyle" to _uM("type" to "UTSJSONObject", "required" to false), "inactiveStyle" to _uM("type" to "UTSJSONObject", "required" to false), "customStyle" to _uM("type" to "UTSJSONObject", "required" to false, "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "modelValue" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "list",
            "shrink",
            "lineMode",
            "initAnimate",
            "lineWidth",
            "itemStyle",
            "customStyle",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
