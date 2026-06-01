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
open class GenComponentsSelectCountry : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var modelValue: Any? by `$props`
    open var options: () -> UTSArray<UTSJSONObject> by `$props`
    open var valueKey: String by `$props`
    open var labelKey: String by `$props`
    open var searchPlaceholder: String by `$props`
    open var emptyText: String by `$props`
    open var maxHeight: String by `$props`
    open var resetSearch: () -> Unit
        get() {
            return unref(this.`$exposed`["resetSearch"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "resetSearch", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsSelectCountry, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsSelectCountry
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val searchKeyword = ref<String>("")
            val safeToString = fun(value: Any): String {
                if (value == null) {
                    return ""
                }
                if (UTSAndroid.`typeof`(value) === "string") {
                    return value as String
                }
                if (UTSAndroid.`typeof`(value) === "number") {
                    return (value as Number).toString()
                }
                return ""
            }
            val getItemLabel = fun(item: UTSJSONObject): String {
                val label = item.getString(props.labelKey)
                if (label != null) {
                    return label
                }
                val num = item.getNumber(props.labelKey)
                if (num != null) {
                    return num.toString(10)
                }
                return ""
            }
            val getItemValue = fun(item: UTSJSONObject): Any? {
                if (item == null) {
                    return null
                }
                val value = item[props.valueKey]
                if (value == null) {
                    return null
                }
                if (UTSAndroid.`typeof`(value) === "string" || UTSAndroid.`typeof`(value) === "number") {
                    return value as Any
                }
                return safeToString(value)
            }
            val getFilteredOptions = fun(): UTSArray<UTSJSONObject> {
                val optionsList = props.options as UTSArray<UTSJSONObject>
                if (!(optionsList != null) || optionsList.length === 0) {
                    return _uA()
                }
                val keyword = searchKeyword.value
                if (!(keyword != "") || keyword.trim().length === 0) {
                    return optionsList
                }
                val lowerKeyword = keyword.toLowerCase()
                val result: UTSArray<UTSJSONObject> = _uA()
                run {
                    var i: Number = 0
                    while(i < optionsList.length){
                        val opt = optionsList[i]
                        val label = getItemLabel(opt).toLowerCase()
                        val itemValue = getItemValue(opt)
                        var value = ""
                        if (itemValue != null) {
                            value = safeToString(itemValue).toLowerCase()
                        }
                        if (label.includes(lowerKeyword) || value.includes(lowerKeyword)) {
                            result.push(opt)
                        }
                        i++
                    }
                }
                return result
            }
            val filteredOptions = computed(fun(): UTSArray<UTSJSONObject> {
                return getFilteredOptions()
            }
            )
            val getItemKey = fun(item: UTSJSONObject, index: Number): String {
                val value = getItemValue(item)
                if (value != null) {
                    return safeToString(value)
                }
                return "option-" + index
            }
            val isSelected = fun(item: UTSJSONObject): Boolean {
                val currentValue = props.modelValue
                val itemValue = getItemValue(item)
                if (currentValue == null) {
                    return false
                }
                if (itemValue == null) {
                    return false
                }
                return safeToString(currentValue) === safeToString(itemValue)
            }
            val selectOption = fun(item: UTSJSONObject){
                val newValue = getItemValue(item)
                emit("update:modelValue", newValue)
                emit("change", newValue, item)
            }
            val handleSearch = fun(){}
            val clearSearch = fun(){
                searchKeyword.value = ""
            }
            val resetSearch = fun(){
                searchKeyword.value = ""
            }
            __expose(_uM("resetSearch" to resetSearch))
            return fun(): Any? {
                return _cE("view", _uM("class" to "search-select"), _uA(
                    _cE("view", _uM("class" to "search-bar"), _uA(
                        _cE("view", _uM("class" to "search-input-wrapper"), _uA(
                            _cE("text", _uM("class" to "search-icon"), "🔍"),
                            _cE("input", _uM("modelValue" to searchKeyword.value, "onInput" to _uA<Any?>(fun(`$event`: UniInputEvent){
                                searchKeyword.value = `$event`.detail.value
                            }
                            , handleSearch), "placeholder" to _ctx.searchPlaceholder, "class" to "search-input", "confirm-type" to "search"), null, 40, _uA(
                                "modelValue",
                                "onInput",
                                "placeholder"
                            )),
                            if (isTrue(searchKeyword.value)) {
                                _cE("text", _uM("key" to 0, "class" to "clear-icon", "onClick" to clearSearch), "✕")
                            } else {
                                _cC("v-if", true)
                            }
                        ))
                    )),
                    _cE("scroll-view", _uM("class" to "options-list", "scroll-y" to "", "enhanced" to true, "show-scrollbar" to false, "style" to _nS(_uM("maxHeight" to _ctx.maxHeight))), _uA(
                        if (filteredOptions.value.length === 0) {
                            _cE("view", _uM("key" to 0, "class" to "empty-state"), _uA(
                                _cE("text", _uM("class" to "empty-text"), _tD(_ctx.emptyText), 1)
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        _cE(Fragment, null, RenderHelpers.renderList(filteredOptions.value, fun(item, index, __index, _cached): Any {
                            return _cE("view", _uM("key" to getItemKey(item, index), "class" to _nC(_uA(
                                "option-item",
                                _uM("is-selected" to isSelected(item))
                            )), "onClick" to fun(){
                                selectOption(item)
                            }
                            ), _uA(
                                _cE("text", _uM("class" to "option-label"), _tD(getItemLabel(item)), 1),
                                if (isTrue(isSelected(item))) {
                                    _cE("view", _uM("key" to 0, "class" to "check-icon"), _uA(
                                        _cE("text", _uM("class" to "icon-check"), "✓")
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            ), 10, _uA(
                                "onClick"
                            ))
                        }
                        ), 128)
                    ), 4)
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
                return _uM("search-select" to _pS(_uM("display" to "flex", "flexDirection" to "column", "width" to "100%", "height" to "100%", "backgroundColor" to "#ffffff")), "search-bar" to _pS(_uM("paddingTop" to "24rpx", "paddingRight" to "32rpx", "paddingBottom" to "24rpx", "paddingLeft" to "32rpx", "borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f0f0f0", "flexShrink" to 0)), "search-input-wrapper" to _uM(".search-bar " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "backgroundColor" to "#f5f7fa", "borderTopLeftRadius" to "32rpx", "borderTopRightRadius" to "32rpx", "borderBottomRightRadius" to "32rpx", "borderBottomLeftRadius" to "32rpx", "paddingTop" to "16rpx", "paddingRight" to "24rpx", "paddingBottom" to "16rpx", "paddingLeft" to "24rpx")), "search-icon" to _uM(".search-bar .search-input-wrapper " to _uM("fontSize" to "28rpx", "color" to "#999999", "marginRight" to "16rpx", "flexShrink" to 0)), "search-input" to _uM(".search-bar .search-input-wrapper " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "28rpx", "color" to "#333333", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0)", "minHeight" to "40rpx")), "clear-icon" to _uM(".search-bar .search-input-wrapper " to _uM("fontSize" to "28rpx", "color" to "#999999", "paddingTop" to "8rpx", "paddingRight" to "8rpx", "paddingBottom" to "8rpx", "paddingLeft" to "8rpx", "flexShrink" to 0, "lineHeight" to 1)), "options-list" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "width" to "100%")), "option-item" to _uM("" to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "28rpx", "paddingRight" to "32rpx", "paddingBottom" to "28rpx", "paddingLeft" to "32rpx", "borderBottomWidth" to "2rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f5f5f5", "backgroundColor" to "#ffffff", "minHeight" to "88rpx", "boxSizing" to "border-box", "backgroundColor:active" to "#f5f7fa"), ".is-selected" to _uM("backgroundColor" to "#eff6ff")), "option-label" to _uM(".option-item.is-selected " to _uM("color" to "#2563eb"), ".option-item " to _uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%", "fontSize" to "28rpx", "color" to "#333333", "lineHeight" to 1.4)), "check-icon" to _uM(".option-item " to _uM("width" to "48rpx", "height" to "48rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "flexShrink" to 0, "marginLeft" to "16rpx")), "icon-check" to _uM(".option-item .check-icon " to _uM("fontSize" to "32rpx", "color" to "#2563eb", "fontWeight" to "bold", "lineHeight" to 1)), "empty-state" to _pS(_uM("paddingTop" to "120rpx", "paddingRight" to 0, "paddingBottom" to "120rpx", "paddingLeft" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "empty-text" to _uM(".empty-state " to _uM("fontSize" to "28rpx", "color" to "#999999", "textAlign" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null)
        var props = _nP(_uM("modelValue" to _uM("default" to null), "options" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "valueKey" to _uM("type" to "String", "default" to "value"), "labelKey" to _uM("type" to "String", "default" to "label"), "searchPlaceholder" to _uM("type" to "String", "default" to "请输入关键词搜索"), "emptyText" to _uM("type" to "String", "default" to "暂无数据"), "maxHeight" to _uM("type" to "String", "default" to "600rpx")))
        var propsNeedCastKeys = _uA(
            "modelValue",
            "options",
            "valueKey",
            "labelKey",
            "searchPlaceholder",
            "emptyText",
            "maxHeight"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
