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
open class GenUniModulesMUnixComponentsMTabsMTabs : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "m-tabs",
            _uM("m-tabs--fixed" to _ctx.isFixed)
        )), "style" to _nS(_ctx.rootStyle)), _uA(
            _cE("view", _uM("class" to "m-tabs__inner", "style" to _nS(_uM("height" to (_ctx.height + "rpx"), "paddingLeft" to (_ctx.padding + "rpx"), "paddingRight" to (_ctx.padding + "rpx"), "backgroundColor" to _ctx.backgroundColor))), _uA(
                _cE(Fragment, null, RenderHelpers.renderList(_ctx.tabs, fun(tab, idx, __index, _cached): Any {
                    return _cE("view", _uM("key" to idx, "class" to "m-tabs__item", "style" to _nS(_uM("width" to _ctx.itemWidthComputed)), "onClick" to fun(){
                        _ctx.onTabTap(idx, tab)
                    }
                    ), _uA(
                        _cE("view", _uM("class" to "m-tabs__item-inner", "style" to _nS(_ctx.itemInnerStyle(idx, tab))), _uA(
                            _cE("text", _uM("class" to "m-tabs__text", "style" to _nS(_ctx.textStyle(idx, tab))), _tD(_ctx.tabLabel(tab)), 5),
                            if (_ctx.badgeText(tab) !== "") {
                                _cE("view", _uM("key" to 0, "class" to "m-tabs__badge-wrap"), _uA(
                                    _cE("text", _uM("class" to "m-tabs__badge", "style" to _nS(_uM("color" to _ctx.badgeColor, "backgroundColor" to _ctx.badgeBgColor))), _tD(_ctx.badgeText(tab)), 5)
                                ))
                            } else {
                                if (isTrue(_ctx.tabDot(tab))) {
                                    _cE("view", _uM("key" to 1, "class" to "m-tabs__dot", "style" to _nS(_uM("backgroundColor" to _ctx.badgeBgColor))), null, 4)
                                } else {
                                    _cC("v-if", true)
                                }
                            }
                        ), 4)
                    ), 12, _uA(
                        "onClick"
                    ))
                }
                ), 128),
                if (isTrue(_ctx.isSlider && _ctx.tabCount > 0)) {
                    _cE("view", _uM("key" to 0, "class" to "m-tabs__slider-anchor", "style" to _nS(_ctx.sliderAnchorStyle)), _uA(
                        _cE("view", _uM("class" to "m-tabs__slider", "style" to _nS(_uM("backgroundColor" to _ctx.sliderBgColor, "height" to (_ctx.sliderHeight + "rpx"), "borderRadius" to _ctx.sliderRadius, "width" to (_ctx.sliderWidth + "rpx")))), null, 4)
                    ), 4)
                } else {
                    _cC("v-if", true)
                }
            ), 4),
            if (isTrue(!_ctx.unlined)) {
                _cE("view", _uM("key" to 0, "class" to "m-tabs__line"))
            } else {
                _cC("v-if", true)
            }
        ), 6)
    }
    open var tabs: UTSArray<Any?>? by `$props`
    open var field: String by `$props`
    open var badgeField: String by `$props`
    open var height: Number by `$props`
    open var padding: Number by `$props`
    open var backgroundColor: String by `$props`
    open var isFixed: Boolean by `$props`
    open var top: Number by `$props`
    open var unlined: Boolean by `$props`
    open var currentTab: Number by `$props`
    open var isSlider: Boolean by `$props`
    open var sliderWidth: Number by `$props`
    open var sliderHeight: Number by `$props`
    open var sliderBgColor: String by `$props`
    open var sliderRadius: String by `$props`
    open var itemWidth: String by `$props`
    open var color: String by `$props`
    open var selectedColor: String by `$props`
    open var size: Number by `$props`
    open var bold: Boolean by `$props`
    open var scale: Any by `$props`
    open var badgeColor: String by `$props`
    open var badgeBgColor: String by `$props`
    open var zIndex: Any by `$props`
    open var customStyle: UTSJSONObject by `$props`
    open var itemStyle: UTSJSONObject by `$props`
    open var selectedBgColor: String by `$props`
    open var selectedBorderColor: String by `$props`
    open var selectedBorderWidth: String by `$props`
    open var selectedBorderRadius: String by `$props`
    open var unselectedBgColor: String by `$props`
    open var showSelectedBorder: Boolean by `$props`
    open var tabCount: Number by `$data`
    open var itemWidthComputed: String by `$data`
    open var rootStyle: UTSJSONObject by `$data`
    open var sliderAnchorStyle: UTSJSONObject by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("tabCount" to computed<Number>(fun(): Number {
            return (this.tabs as UTSArray<Any>).length
        }
        ), "itemWidthComputed" to computed<String>(fun(): String {
            val iw = this.itemWidth as String
            if (iw != null && iw.length > 0) {
                return iw
            }
            val n = this.tabCount
            if (n <= 0) {
                return "25%"
            }
            return ((100 as Number) / n) + "%"
        }
        ), "rootStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 203, 10))
            val z = this.zIndex
            st["zIndex"] = if (UTSAndroid.`typeof`(z) === "number") {
                z
            } else {
                parseInt("" + (z as String))
            }
            if (this.isFixed) {
                st["position"] = "fixed"
                st["left"] = "0"
                st["right"] = "0"
                st["top"] = (this.top as Number) + "px"
            }
            if (this.customStyle != null) {
                Object.assign(st, this.customStyle)
            }
            return st
        }
        ), "sliderAnchorStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val n = this.tabCount
            if (n <= 0) {
                return _uO()
            }
            var i = this.currentTab as Number
            if (i < 0) {
                i = 0
            }
            if (i >= n) {
                i = n - 1
            }
            val pct = ((i + 0.5) / n) * 100
            return _uO("left" to (pct + "%"), "transition" to "left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)")
        }
        ))
    }
    open var tabLabel = ::gen_tabLabel_fn
    open fun gen_tabLabel_fn(tab: TabItem): String {
        val k = this.field as String
        val v = tab[k]
        return if (v == null) {
            ""
        } else {
            "" + v
        }
    }
    open var badgeText = ::gen_badgeText_fn
    open fun gen_badgeText_fn(tab: TabItem): String {
        val k = this.badgeField as String
        val v = tab[k]
        if (v == null) {
            return ""
        }
        val s = "" + v
        if (s === "0" || s === "") {
            return ""
        }
        return s
    }
    open var tabDot = ::gen_tabDot_fn
    open fun gen_tabDot_fn(tab: TabItem): Boolean {
        return tab["isDot"] === true
    }
    open var tabDisabled = ::gen_tabDisabled_fn
    open fun gen_tabDisabled_fn(tab: TabItem): Boolean {
        return tab["disabled"] === true
    }
    open var itemInnerStyle = ::gen_itemInnerStyle_fn
    open fun gen_itemInnerStyle_fn(idx: Number, tab: TabItem): UTSJSONObject {
        val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 262, 10))
        val isSelected = (this.currentTab as Number) === idx
        val isDisabled = this.tabDisabled(tab)
        if (this.itemStyle != null) {
            Object.assign(st, this.itemStyle)
        }
        if (isDisabled) {
            st["opacity"] = "0.5"
        } else if (isSelected) {
            if (this.selectedBgColor != "" && this.selectedBgColor !== "") {
                st["backgroundColor"] = this.selectedBgColor
            }
            if (this.showSelectedBorder && this.selectedBorderColor != "") {
                st["borderColor"] = this.selectedBorderColor
                st["borderWidth"] = this.selectedBorderWidth
                st["borderStyle"] = "solid"
            }
            if (this.selectedBorderRadius != "" && this.selectedBorderRadius !== "0") {
                st["borderRadius"] = this.selectedBorderRadius
            }
        } else {
            if (this.unselectedBgColor != "" && this.unselectedBgColor !== "") {
                st["backgroundColor"] = this.unselectedBgColor
            }
        }
        return st
    }
    open var textStyle = ::gen_textStyle_fn
    open fun gen_textStyle_fn(idx: Number, tab: TabItem): UTSJSONObject {
        val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 297, 10))
        val sel = (this.currentTab as Number) === idx
        val dis = this.tabDisabled(tab)
        if (dis) {
            st["color"] = "#cccccc"
        } else if (sel) {
            st["color"] = this.selectedColor as String
        } else {
            st["color"] = this.color as String
        }
        st["font-size"] = (this.size as Number) + "rpx"
        if (this.bold && sel) {
            st["font-weight"] = "bold"
        }
        if (sel) {
            val sc = this.scale
            val f = if (UTSAndroid.`typeof`(sc) === "number") {
                sc as Number
            } else {
                parseFloat("" + (sc as String))
            }
            if (!isNaN(f) && f !== 1) {
                st["transform"] = "scale(" + f + ")"
            }
        }
        return st
    }
    open var onTabTap = ::gen_onTabTap_fn
    open fun gen_onTabTap_fn(idx: Number, tab: TabItem) {
        if (this.tabDisabled(tab)) {
            return
        }
        this.`$emit`("change", _uO("index" to idx, "item" to tab))
    }
    companion object {
        var name = "mTabs"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-tabs" to _pS(_uM("width" to "100%", "position" to "relative", "boxSizing" to "border-box")), "m-tabs__inner" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "stretch", "width" to "100%", "boxSizing" to "border-box", "position" to "relative")), "m-tabs__item" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "boxSizing" to "border-box", "position" to "relative", "zIndex" to 2)), "m-tabs__item-inner" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "position" to "relative", "paddingTop" to "8rpx", "paddingRight" to "4rpx", "paddingBottom" to "8rpx", "paddingLeft" to "4rpx", "flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "transitionProperty" to "all", "transitionDuration" to "0.3s", "transitionTimingFunction" to "ease")), "m-tabs__text" to _pS(_uM("lineHeight" to 1.2)), "m-tabs__badge-wrap" to _pS(_uM("position" to "absolute", "top" to "-4rpx", "right" to "-16rpx")), "m-tabs__badge" to _pS(_uM("fontSize" to "20rpx", "paddingTop" to "2rpx", "paddingRight" to "8rpx", "paddingBottom" to "2rpx", "paddingLeft" to "8rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "minWidth" to "28rpx", "textAlign" to "center")), "m-tabs__dot" to _pS(_uM("position" to "absolute", "top" to 0, "right" to "-6rpx", "width" to "12rpx", "height" to "12rpx", "borderTopLeftRadius" to "50%", "borderTopRightRadius" to "50%", "borderBottomRightRadius" to "50%", "borderBottomLeftRadius" to "50%")), "m-tabs__slider-anchor" to _pS(_uM("position" to "absolute", "bottom" to 0, "left" to 0, "transform" to "translateX(-50%)", "zIndex" to 1, "pointerEvents" to "none")), "m-tabs__slider" to _pS(_uM("marginTop" to "4rpx")), "m-tabs__line" to _pS(_uM("height" to "1rpx", "backgroundColor" to "#eeeeee", "width" to "100%")), "@TRANSITION" to _uM("m-tabs__item-inner" to _uM("property" to "all", "duration" to "0.3s", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null)
        var props = _nP(_uM("tabs" to _uM("type" to "Array", "default" to fun(): UTSArray<Any> {
            return _uA()
        }
        ), "field" to _uM("type" to "String", "default" to "name"), "badgeField" to _uM("type" to "String", "default" to "num"), "height" to _uM("type" to "Number", "default" to 80), "padding" to _uM("type" to "Number", "default" to 30), "backgroundColor" to _uM("type" to "String", "default" to "#FFFFFF"), "isFixed" to _uM("type" to "Boolean", "default" to false), "top" to _uM("type" to "Number", "default" to 0), "unlined" to _uM("type" to "Boolean", "default" to false), "currentTab" to _uM("type" to "Number", "default" to 0), "isSlider" to _uM("type" to "Boolean", "default" to true), "sliderWidth" to _uM("type" to "Number", "default" to 68), "sliderHeight" to _uM("type" to "Number", "default" to 6), "sliderBgColor" to _uM("type" to "String", "default" to "#5677fc"), "sliderRadius" to _uM("type" to "String", "default" to "50rpx"), "itemWidth" to _uM("type" to "String", "default" to ""), "color" to _uM("type" to "String", "default" to "#666666"), "selectedColor" to _uM("type" to "String", "default" to "#5677fc"), "size" to _uM("type" to "Number", "default" to 28), "bold" to _uM("type" to "Boolean", "default" to false), "scale" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 1), "badgeColor" to _uM("type" to "String", "default" to "#ffffff"), "badgeBgColor" to _uM("type" to "String", "default" to "#F74D54"), "zIndex" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 996), "customStyle" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "itemStyle" to _uM("type" to "Object", "default" to fun(): UTSJSONObject {
            return (_uO())
        }
        ), "selectedBgColor" to _uM("type" to "String", "default" to ""), "selectedBorderColor" to _uM("type" to "String", "default" to ""), "selectedBorderWidth" to _uM("type" to "String", "default" to "0"), "selectedBorderRadius" to _uM("type" to "String", "default" to "0"), "unselectedBgColor" to _uM("type" to "String", "default" to ""), "showSelectedBorder" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "field",
            "badgeField",
            "height",
            "padding",
            "backgroundColor",
            "isFixed",
            "top",
            "unlined",
            "currentTab",
            "isSlider",
            "sliderWidth",
            "sliderHeight",
            "sliderBgColor",
            "sliderRadius",
            "itemWidth",
            "color",
            "selectedColor",
            "size",
            "bold",
            "scale",
            "badgeColor",
            "badgeBgColor",
            "zIndex",
            "customStyle",
            "itemStyle",
            "selectedBgColor",
            "selectedBorderColor",
            "selectedBorderWidth",
            "selectedBorderRadius",
            "unselectedBgColor",
            "showSelectedBorder"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
