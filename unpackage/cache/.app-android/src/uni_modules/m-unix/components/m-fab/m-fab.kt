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
import io.dcloud.uniapp.extapi.createSelectorQuery as uni_createSelectorQuery
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.rpx2px as uni_rpx2px
open class GenUniModulesMUnixComponentsMFabMFab : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onMounted(fun() {
            this.initPosition()
            this.`$nextTick`(fun(){
                this.measureWrapSize()
            }
            )
        }
        , __ins)
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_m_icon = resolveEasyComponent("m-icon", GenUniModulesMUnixComponentsMIconMIconClass)
        return _cE("view", null, _uA(
            if (isTrue(_ctx.expanded && _ctx.maskClosable)) {
                _cE("view", _uM("key" to 0, "class" to "m-fab__mask", "style" to _nS(_uM("zIndex" to _ctx.maskZIndex)), "onClick" to _ctx.collapse), null, 12, _uA(
                    "onClick"
                ))
            } else {
                _cC("v-if", true)
            }
            ,
            _cE("view", _uM("class" to "m-fab__wrap", "style" to _nS(_ctx.wrapStyle)), _uA(
                if (_ctx.safeBtnList.length > 0) {
                    _cE("view", _uM("key" to 0, "class" to "m-fab__subs"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(_ctx.safeBtnList, fun(btn, idx, __index, _cached): Any {
                            return withDirectives(_cE("view", _uM("key" to idx, "class" to "m-fab__sub", "style" to _nS(_ctx.subStyle(btn)), "onClick" to withModifiers(fun(){
                                _ctx.onSubTap(idx)
                            }, _uA(
                                "stop"
                            ))), _uA(
                                if (_ctx.subImg(btn) !== "") {
                                    _cE("image", _uM("key" to 0, "class" to "m-fab__sub-img", "src" to _ctx.subImg(btn), "mode" to "aspectFit"), null, 8, _uA(
                                        "src"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                },
                                _cE("text", _uM("class" to "m-fab__sub-text", "style" to _nS(_uM("color" to _ctx.subColor(btn), "font-size" to (_ctx.subFontSize(btn) + "rpx")))), _tD(_ctx.subText(btn)), 5)
                            ), 12, _uA(
                                "onClick"
                            )), _uA(
                                _uA(
                                    vShow,
                                    _ctx.expanded
                                )
                            ))
                        }), 128)
                    ))
                } else {
                    _cC("v-if", true)
                }
                ,
                _cE("view", _uM("class" to _nC(_ctx.mainDragClass), "style" to _nS(_ctx.mainStyle), "onTouchstart" to _ctx.onTouchStart, "onTouchmove" to _ctx.onTouchMove, "onTouchend" to _ctx.onTouchEnd, "onTouchcancel" to _ctx.onTouchCancel), _uA(
                    if (isTrue(_ctx.custom)) {
                        _cE("view", _uM("key" to 0, "class" to "m-fab__main-child"), _uA(
                            renderSlot(_ctx.`$slots`, "default")
                        ))
                    } else {
                        if (_ctx.iconName !== "") {
                            _cE("view", _uM("key" to 1, "class" to "m-fab__main-child"), _uA(
                                _cV(_component_m_icon, _uM("name" to _ctx.iconName, "size" to _ctx.iconSize, "color" to _ctx.color), null, 8, _uA(
                                    "name",
                                    "size",
                                    "color"
                                ))
                            ))
                        } else {
                            _cE("text", _uM("key" to 2, "class" to "m-fab__main-child m-fab__plus", "style" to _nS(_uM("color" to _ctx.color))), "+", 4)
                        }
                    }
                ), 46, _uA(
                    "onTouchstart",
                    "onTouchmove",
                    "onTouchend",
                    "onTouchcancel"
                ))
            ), 4)
        ))
    }
    open var left: Any by `$props`
    open var right: Any by `$props`
    open var bottom: Any by `$props`
    open var top: Any by `$props`
    open var zIndex: Any by `$props`
    open var width: Any by `$props`
    open var height: Any by `$props`
    open var radius: String by `$props`
    open var custom: Boolean by `$props`
    open var icon: String by `$props`
    open var iconSize: Any by `$props`
    open var draggable: Boolean by `$props`
    open var snapEdge: Boolean by `$props`
    open var snapPadding: Any by `$props`
    open var bgColor: String by `$props`
    open var color: String by `$props`
    open var btnList: UTSArray<Any?>? by `$props`
    open var textField: String by `$props`
    open var imgField: String by `$props`
    open var size: Any by `$props`
    open var maskClosable: Boolean by `$props`
    open var expanded: Boolean by `$data`
    open var winW: Number by `$data`
    open var winH: Number by `$data`
    open var dragLeftPx: Number by `$data`
    open var dragTopPx: Number by `$data`
    open var dragReady: Boolean by `$data`
    open var wrapWpx: Number by `$data`
    open var wrapHpx: Number by `$data`
    open var touchStartX: Number by `$data`
    open var touchStartY: Number by `$data`
    open var touchStartLeft: Number by `$data`
    open var touchStartTop: Number by `$data`
    open var isDragging: Boolean by `$data`
    open var hasMoved: Boolean by `$data`
    open var moveDistance: Number by `$data`
    open var clickTimer: Any by `$data`
    open var safeBtnList: UTSArray<UTSJSONObject> by `$data`
    open var iconName: String by `$data`
    open var baseZ: Number by `$data`
    open var maskZIndex: Number by `$data`
    open var wrapStyle: UTSJSONObject by `$data`
    open var mainStyle: UTSJSONObject by `$data`
    open var mainDragClass: UTSArray<String> by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("expanded" to false as Boolean, "winW" to 0 as Number, "winH" to 0 as Number, "dragLeftPx" to 0 as Number, "dragTopPx" to 0 as Number, "dragReady" to false as Boolean, "wrapWpx" to 0 as Number, "wrapHpx" to 0 as Number, "touchStartX" to 0 as Number, "touchStartY" to 0 as Number, "touchStartLeft" to 0 as Number, "touchStartTop" to 0 as Number, "isDragging" to false as Boolean, "hasMoved" to false as Boolean, "moveDistance" to 0 as Number, "clickTimer" to null as Any, "safeBtnList" to computed<UTSArray<UTSJSONObject>>(fun(): UTSArray<UTSJSONObject> {
            val list = this.btnList as UTSArray<UTSJSONObject>?
            return if (list == null) {
                _uA()
            } else {
                list
            }
        }
        ), "iconName" to computed<String>(fun(): String {
            val s = this.icon as String
            if (s == null) {
                return ""
            }
            val t = s.trim()
            return t
        }
        ), "baseZ" to computed<Number>(fun(): Number {
            val zi = this.zIndex
            val n = if (UTSAndroid.`typeof`(zi) === "number") {
                zi as Number
            } else {
                parseInt("" + (zi as String))
            }
            return if (isNaN(n)) {
                997
            } else {
                n
            }
        }
        ), "maskZIndex" to computed<Number>(fun(): Number {
            return this.baseZ - 1
        }
        ), "wrapStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 193, 10))
            st["zIndex"] = this.baseZ
            st["position"] = "fixed"
            st["left"] = this.dragLeftPx + "px"
            st["top"] = this.dragTopPx + "px"
            st["right"] = "auto"
            st["bottom"] = "auto"
            st["display"] = "flex"
            st["flexDirection"] = "column"
            st["alignItems"] = "flex-end"
            return st
        }
        ), "mainStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 206, 10))
            st["width"] = "" + this.width + "rpx"
            st["height"] = "" + this.height + "rpx"
            st["borderRadius"] = this.radius as String
            st["backgroundColor"] = this.bgColor as String
            if (!this.isDragging) {
                st["transition"] = "left 0.2s ease, top 0.2s ease"
            }
            return st
        }
        ), "mainDragClass" to computed<UTSArray<String>>(fun(): UTSArray<String> {
            val out = _uA<String>()
            out.push("m-fab__main")
            if (this.isDragging) {
                out.push("m-fab__main--dragging")
            }
            return out
        }
        ))
    }
    open var initPosition = ::gen_initPosition_fn
    open fun gen_initPosition_fn() {
        if (!(this.draggable as Boolean)) {
            val sys = uni_getSystemInfoSync()
            this.winW = sys.windowWidth as Number
            this.winH = sys.windowHeight as Number
            val fabW = uni_rpx2px(parseInt(this.width as String))
            val fabH = uni_rpx2px(parseInt(this.height as String))
            val right = uni_rpx2px(parseInt(this.right as String))
            val bottom = uni_rpx2px(parseInt(this.bottom as String))
            this.dragLeftPx = this.winW - fabW - right
            this.dragTopPx = this.winH - fabH - bottom
        } else {
            val sys = uni_getSystemInfoSync()
            this.winW = sys.windowWidth as Number
            this.winH = sys.windowHeight as Number
            val fabW = uni_rpx2px(parseInt(this.width as String))
            val fabH = uni_rpx2px(parseInt(this.height as String))
            val right = uni_rpx2px(parseInt(this.right as String))
            val bottom = uni_rpx2px(parseInt(this.bottom as String))
            this.dragLeftPx = this.winW - fabW - right
            this.dragTopPx = this.winH - fabH - bottom
        }
    }
    open var measureWrapSize = ::gen_measureWrapSize_fn
    open fun gen_measureWrapSize_fn() {
        val self = this
        try {
            val q = uni_createSelectorQuery().`in`(self as Any)
            q.select(".m-fab__wrap").boundingClientRect(fun(rect: Any){
                if (rect == null) {
                    return
                }
                val data = rect as UTSJSONObject
                val w = data["width"] as Number
                val h = data["height"] as Number
                if (w > 0 && h > 0) {
                    self.wrapWpx = w
                    self.wrapHpx = h
                }
            }
            ).exec()
        }
         catch (_e: Throwable) {}
    }
    open var applySnap = ::gen_applySnap_fn
    open fun gen_applySnap_fn() {
        if (!(this.snapEdge as Boolean)) {
            return
        }
        val pad = uni_rpx2px(this.snapPaddingRpx())
        val w = if (this.wrapWpx > 0) {
            this.wrapWpx
        } else {
            uni_rpx2px(parseInt(this.width as String))
        }
        val currentCenter = this.dragLeftPx + w / 2
        if (currentCenter < this.winW / 2) {
            this.dragLeftPx = pad
        } else {
            this.dragLeftPx = this.winW - w - pad
        }
        val h = if (this.wrapHpx > 0) {
            this.wrapHpx
        } else {
            uni_rpx2px(parseInt(this.height as String))
        }
        this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad))
    }
    open var snapPaddingRpx = ::gen_snapPaddingRpx_fn
    open fun gen_snapPaddingRpx_fn(): Number {
        val sp = this.snapPadding as Any
        val n = if (UTSAndroid.`typeof`(sp) === "number") {
            sp as Number
        } else {
            parseInt("" + (sp as String))
        }
        return if (isNaN(n)) {
            16
        } else {
            n
        }
    }
    open var getTouchPoint = ::gen_getTouchPoint_fn
    open fun gen_getTouchPoint_fn(e: Any): TouchPoint? {
        val event = e as UTSJSONObject
        val touches = event["touches"] as UTSArray<Any>?
        if (touches == null || touches.length == 0) {
            return null
        }
        val touch = touches[0] as UTSJSONObject
        var x = touch["clientX"] as Number?
        var y = touch["clientY"] as Number?
        if (x == null) {
            x = touch["pageX"] as Number?
        }
        if (y == null) {
            y = touch["pageY"] as Number?
        }
        return TouchPoint(if (x == null) {
            0
        } else {
            x
        }
        , if (y == null) {
            0
        } else {
            y
        }
        )
    }
    open var onTouchStart = ::gen_onTouchStart_fn
    open fun gen_onTouchStart_fn(e: Any) {
        if (!(this.draggable as Boolean)) {
            this.onClick()
            return
        }
        val point = this.getTouchPoint(e)
        if (point == null) {
            return
        }
        this.touchStartX = point!!!!.x
        this.touchStartY = point!!!!.y
        this.touchStartLeft = this.dragLeftPx
        this.touchStartTop = this.dragTopPx
        this.hasMoved = false
        this.moveDistance = 0
        if (isTruthy(this.clickTimer)) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null
        }
    }
    open var onTouchMove = ::gen_onTouchMove_fn
    open fun gen_onTouchMove_fn(e: Any) {
        if (!(this.draggable as Boolean)) {
            return
        }
        val point = this.getTouchPoint(e)
        if (point == null) {
            return
        }
        val deltaX = point!!!!.x - this.touchStartX
        val deltaY = point!!!!.y - this.touchStartY
        val distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (distance > 10) {
            if (!this.hasMoved) {
                this.hasMoved = true
                this.isDragging = true
            }
            this.moveDistance = distance
            var newLeft = this.touchStartLeft + deltaX
            var newTop = this.touchStartTop + deltaY
            val pad = uni_rpx2px(this.snapPaddingRpx())
            val w = if (this.wrapWpx > 0) {
                this.wrapWpx
            } else {
                uni_rpx2px(parseInt(this.width as String))
            }
            val h = if (this.wrapHpx > 0) {
                this.wrapHpx
            } else {
                uni_rpx2px(parseInt(this.height as String))
            }
            newLeft = Math.max(pad, Math.min(newLeft, this.winW - w - pad))
            newTop = Math.max(pad, Math.min(newTop, this.winH - h - pad))
            this.dragLeftPx = newLeft
            this.dragTopPx = newTop
            e.preventDefault?.invoke()
        }
    }
    open var onTouchEnd = ::gen_onTouchEnd_fn
    open fun gen_onTouchEnd_fn(e: Any) {
        if (!(this.draggable as Boolean)) {
            return
        }
        if (this.hasMoved && this.moveDistance > 10) {
            this.isDragging = false
            this.applySnap()
            this.`$emit`("dragend", _uO("leftPx" to this.dragLeftPx, "topPx" to this.dragTopPx))
        } else if (!this.hasMoved || this.moveDistance <= 10) {
            this.clickTimer = setTimeout(fun(){
                this.onClick()
                this.clickTimer = null
            }
            , 50)
        }
        setTimeout(fun(){
            this.hasMoved = false
            this.moveDistance = 0
            this.isDragging = false
        }
        , 100)
    }
    open var onTouchCancel = ::gen_onTouchCancel_fn
    open fun gen_onTouchCancel_fn(e: Any) {
        if (isTruthy(this.clickTimer)) {
            clearTimeout(this.clickTimer)
            this.clickTimer = null
        }
        this.hasMoved = false
        this.moveDistance = 0
        this.isDragging = false
    }
    open var onClick = ::gen_onClick_fn
    open fun gen_onClick_fn() {
        val list = this.btnList as UTSArray<Any>
        if (list.length > 0) {
            this.expanded = !this.expanded
            this.`$emit`("click", _uO("index" to 0))
            return
        }
        this.`$emit`("click", _uO("index" to 0))
    }
    open var onSubTap = ::gen_onSubTap_fn
    open fun gen_onSubTap_fn(idx: Number) {
        this.`$emit`("click", _uO("index" to (idx + 1)))
        this.expanded = false
    }
    open var collapse = ::gen_collapse_fn
    open fun gen_collapse_fn() {
        this.expanded = false
    }
    open var subText = ::gen_subText_fn
    open fun gen_subText_fn(btn: FabBtn): String {
        val k = this.textField as String
        val v = btn[k]
        return if (v == null) {
            ""
        } else {
            "" + v
        }
    }
    open var subImg = ::gen_subImg_fn
    open fun gen_subImg_fn(btn: FabBtn): String {
        val k = this.imgField as String
        val v = btn[k]
        return if (v == null) {
            ""
        } else {
            "" + v
        }
    }
    open var subColor = ::gen_subColor_fn
    open fun gen_subColor_fn(btn: FabBtn): String {
        val c = btn["color"]
        return if (c == null) {
            "#ffffff"
        } else {
            "" + c
        }
    }
    open var subFontSize = ::gen_subFontSize_fn
    open fun gen_subFontSize_fn(btn: FabBtn): Number {
        val fs = btn["fontSize"]
        if (fs != null) {
            val n = if (UTSAndroid.`typeof`(fs) === "number") {
                fs as Number
            } else {
                parseInt("" + fs)
            }
            if (!isNaN(n)) {
                return n
            }
        }
        val d = this.size
        return if (UTSAndroid.`typeof`(d) === "number") {
            d as Number
        } else {
            parseInt("" + (d as String))
        }
    }
    open var subStyle = ::gen_subStyle_fn
    open fun gen_subStyle_fn(btn: FabBtn): UTSJSONObject {
        val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 486, 10))
        val bg = btn["bgColor"]
        st["backgroundColor"] = if (bg == null) {
            "#16c2c2"
        } else {
            "" + bg
        }
        return st
    }
    companion object {
        var name = "mFab"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-fab__mask" to _pS(_uM("position" to "fixed", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.2)", "zIndex" to 996)), "m-fab__subs" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-end", "marginBottom" to "24rpx")), "m-fab__sub" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "paddingTop" to "16rpx", "paddingRight" to "28rpx", "paddingBottom" to "16rpx", "paddingLeft" to "28rpx", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx", "marginBottom" to "16rpx", "boxShadow" to "0 2rpx 8rpx rgba(0, 0, 0, 0.15)", "transform:active" to "scale(0.95)")), "m-fab__sub-img" to _pS(_uM("width" to "40rpx", "height" to "40rpx", "marginRight" to "12rpx")), "m-fab__sub-text" to _pS(_uM("fontSize" to "28rpx")), "m-fab__main" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "boxShadow" to "0 4rpx 12rpx rgba(0, 0, 0, 0.2)", "cursor" to "pointer", "transitionProperty" to "transform", "transitionDuration" to "0.1s", "transitionTimingFunction" to "ease", "transform:active" to "scale(0.95)")), "m-fab__main--dragging" to _pS(_uM("opacity" to 0.9, "transitionProperty" to "none", "transform:active" to "none")), "m-fab__main-child" to _pS(_uM("pointerEvents" to "none")), "m-fab__plus" to _pS(_uM("fontSize" to "64rpx", "lineHeight" to 1)), "@TRANSITION" to _uM("m-fab__main" to _uM("property" to "transform", "duration" to "0.1s", "timingFunction" to "ease"), "m-fab__main--dragging" to _uM("property" to "none")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "dragend" to null)
        var props = _nP(_uM("left" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 0), "right" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 80), "bottom" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 100), "top" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 0), "zIndex" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 997), "width" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 80), "height" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 80), "radius" to _uM("type" to "String", "default" to "50%"), "custom" to _uM("type" to "Boolean", "default" to false), "icon" to _uM("type" to "String", "default" to ""), "iconSize" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 52), "draggable" to _uM("type" to "Boolean", "default" to true), "snapEdge" to _uM("type" to "Boolean", "default" to true), "snapPadding" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 16), "bgColor" to _uM("type" to "String", "default" to "#5677fc"), "color" to _uM("type" to "String", "default" to "#ffffff"), "btnList" to _uM("type" to "Array", "default" to fun(): UTSArray<Any> {
            return _uA()
        }
        ), "textField" to _uM("type" to "String", "default" to "text"), "imgField" to _uM("type" to "String", "default" to "imgUrl"), "size" to _uM("type" to _uA(
            "Number",
            "String"
        ), "default" to 28), "maskClosable" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "left",
            "right",
            "bottom",
            "top",
            "zIndex",
            "width",
            "height",
            "radius",
            "custom",
            "icon",
            "iconSize",
            "draggable",
            "snapEdge",
            "snapPadding",
            "bgColor",
            "color",
            "textField",
            "imgField",
            "size",
            "maskClosable"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
