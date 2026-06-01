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
            this.initDragMetrics()
            this.`$nextTick`(fun(){
                this.measureWrapSize()
            }
            )
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.expanded
        }
        , fun() {
            this.`$nextTick`(fun(){
                this.measureWrapSize()
            }
            )
        }
        )
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
                if (_ctx.btnList.length > 0) {
                    _cE("view", _uM("key" to 0, "class" to "m-fab__subs"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(_ctx.btnList, fun(btn, idx, __index, _cached): Any {
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
                _cE("view", _uM("class" to _nC(_ctx.mainDragClass), "style" to _nS(_ctx.mainStyle), "onClick" to _ctx.onMainTap, "onTouchstart" to withModifiers(_ctx.onDragStart, _uA(
                    "stop"
                )), "onTouchmove" to withModifiers(_ctx.onDragMove, _uA(
                    "stop",
                    "prevent"
                )), "onTouchend" to _ctx.onDragEnd, "onTouchcancel" to _ctx.onDragEnd), _uA(
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
                    "onClick",
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
    open var dragStartTouchX: Number by `$data`
    open var dragStartTouchY: Number by `$data`
    open var dragStartLeftPx: Number by `$data`
    open var dragStartTopPx: Number by `$data`
    open var dragMoved: Boolean by `$data`
    open var dragSuppressedTap: Boolean by `$data`
    open var iconName: String by `$data`
    open var baseZ: Number by `$data`
    open var maskZIndex: Number by `$data`
    open var wrapStyle: UTSJSONObject by `$data`
    open var mainStyle: UTSJSONObject by `$data`
    open var mainDragClass: UTSArray<String> by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("expanded" to false as Boolean, "winW" to 0 as Number, "winH" to 0 as Number, "dragLeftPx" to 0 as Number, "dragTopPx" to 0 as Number, "dragReady" to false as Boolean, "wrapWpx" to 0 as Number, "wrapHpx" to 0 as Number, "dragStartTouchX" to 0 as Number, "dragStartTouchY" to 0 as Number, "dragStartLeftPx" to 0 as Number, "dragStartTopPx" to 0 as Number, "dragMoved" to false as Boolean, "dragSuppressedTap" to false as Boolean, "iconName" to computed<String>(fun(): String {
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
            if (this.draggable as Boolean) {
                val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 185, 11))
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
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 197, 10))
            st["zIndex"] = this.baseZ
            st["position"] = "fixed"
            val t = this.top as Any
            val tp = if (UTSAndroid.`typeof`(t) === "number") {
                t as Number
            } else {
                parseInt("" + (t as String))
            }
            if (!isNaN(tp) && tp > 0) {
                st["top"] = t + "rpx"
                st["bottom"] = "auto"
            } else {
                st["bottom"] = this.bottom + "rpx"
            }
            val l = this.left as Any
            val ln = if (UTSAndroid.`typeof`(l) === "number") {
                l as Number
            } else {
                parseInt("" + (l as String))
            }
            if (!isNaN(ln) && ln > 0) {
                st["left"] = l + "rpx"
                st["right"] = "auto"
            } else {
                st["right"] = this.right + "rpx"
                st["left"] = "auto"
            }
            st["display"] = "flex"
            st["flexDirection"] = "column"
            st["alignItems"] = "flex-end"
            return st
        }
        ), "mainStyle" to computed<UTSJSONObject>(fun(): UTSJSONObject {
            val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 223, 10))
            st["width"] = this.width + "rpx"
            st["height"] = this.height + "rpx"
            st["borderRadius"] = this.radius as String
            st["backgroundColor"] = this.bgColor as String
            return st
        }
        ), "mainDragClass" to computed<UTSArray<String>>(fun(): UTSArray<String> {
            val out = _uA<String>()
            out.push("m-fab__main")
            val d = this.draggable as Boolean
            if (d) {
                out.push("m-fab__main--drag")
                if (!(this.custom as Boolean)) {
                    out.push("m-fab__main--drag-pass")
                }
            }
            return out
        }
        ))
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
    open var mainWidthPx = ::gen_mainWidthPx_fn
    open fun gen_mainWidthPx_fn(): Number {
        val w = this.width as Any
        val n = if (UTSAndroid.`typeof`(w) === "number") {
            w as Number
        } else {
            parseInt("" + (w as String))
        }
        return uni_rpx2px(if (isNaN(n)) {
            108
        } else {
            n
        }
        )
    }
    open var mainHeightPx = ::gen_mainHeightPx_fn
    open fun gen_mainHeightPx_fn(): Number {
        val h = this.height as Any
        val n = if (UTSAndroid.`typeof`(h) === "number") {
            h as Number
        } else {
            parseInt("" + (h as String))
        }
        return uni_rpx2px(if (isNaN(n)) {
            108
        } else {
            n
        }
        )
    }
    open var wrapWOrDefault = ::gen_wrapWOrDefault_fn
    open fun gen_wrapWOrDefault_fn(): Number {
        if (this.wrapWpx > 0) {
            return this.wrapWpx
        }
        return this.mainWidthPx()
    }
    open var wrapHOrDefault = ::gen_wrapHOrDefault_fn
    open fun gen_wrapHOrDefault_fn(): Number {
        if (this.wrapHpx > 0) {
            return this.wrapHpx
        }
        return this.mainHeightPx()
    }
    open var initDragMetrics = ::gen_initDragMetrics_fn
    open fun gen_initDragMetrics_fn() {
        if (!(this.draggable as Boolean)) {
            return
        }
        val sys = uni_getSystemInfoSync()
        this.winW = sys.windowWidth as Number
        this.winH = sys.windowHeight as Number
        val fabW = this.mainWidthPx()
        val fabH = this.mainHeightPx()
        val t = this.top as Any
        val tp = if (UTSAndroid.`typeof`(t) === "number") {
            t as Number
        } else {
            parseInt("" + (t as String))
        }
        val l = this.left as Any
        val ln = if (UTSAndroid.`typeof`(l) === "number") {
            l as Number
        } else {
            parseInt("" + (l as String))
        }
        val r = this.right as Any
        val rn = if (UTSAndroid.`typeof`(r) === "number") {
            r as Number
        } else {
            parseInt("" + (r as String))
        }
        val b = this.bottom as Any
        val bn = if (UTSAndroid.`typeof`(b) === "number") {
            b as Number
        } else {
            parseInt("" + (b as String))
        }
        if (!isNaN(tp) && tp > 0) {
            val lr = if (!isNaN(ln) && ln > 0) {
                uni_rpx2px(ln)
            } else {
                uni_rpx2px(80)
            }
            this.dragLeftPx = lr
            this.dragTopPx = uni_rpx2px(tp)
        } else {
            this.dragTopPx = this.winH - fabH - uni_rpx2px(if (isNaN(bn)) {
                100
            } else {
                bn
            }
            )
            if (!isNaN(ln) && ln > 0) {
                this.dragLeftPx = uni_rpx2px(ln)
            } else {
                this.dragLeftPx = this.winW - fabW - uni_rpx2px(if (isNaN(rn)) {
                    80
                } else {
                    rn
                }
                )
            }
        }
        this.dragReady = true
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
                val w = rect.width as Number
                val h = rect.height as Number
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
        val pad = uni_rpx2px(this.snapPaddingRpx())
        val w = this.wrapWOrDefault()
        val cx = this.dragLeftPx + w / 2
        if (cx < this.winW / 2) {
            this.dragLeftPx = pad
        } else {
            this.dragLeftPx = this.winW - w - pad
        }
        val h = this.wrapHOrDefault()
        this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad))
    }
    open var touchClientXY = ::gen_touchClientXY_fn
    open fun gen_touchClientXY_fn(e: Any): UTSArray<Number>? {
        val touches = e["touches"] as UTSArray<Any>?
        if (touches == null || touches.length == 0) {
            return null
        }
        val t0 = touches[0] as UTSJSONObject
        var x = t0["clientX"] as Number?
        var y = t0["clientY"] as Number?
        if (x == null) {
            x = t0["pageX"] as Number?
        }
        if (y == null) {
            y = t0["pageY"] as Number?
        }
        if (x == null || y == null) {
            return null
        }
        return _uA(
            x as Number,
            y as Number
        )
    }
    open var onDragStart = ::gen_onDragStart_fn
    open fun gen_onDragStart_fn(e: Any) {
        if (!(this.draggable as Boolean)) {
            return
        }
        if (this.winW <= 0 || this.winH <= 0) {
            this.initDragMetrics()
        }
        val xy = this.touchClientXY(e)
        if (xy == null) {
            return
        }
        this.dragStartTouchX = xy[0]
        this.dragStartTouchY = xy[1]
        this.dragStartLeftPx = this.dragLeftPx
        this.dragStartTopPx = this.dragTopPx
        this.dragMoved = false
    }
    open var onDragMove = ::gen_onDragMove_fn
    open fun gen_onDragMove_fn(e: Any) {
        if (!(this.draggable as Boolean)) {
            return
        }
        val xy = this.touchClientXY(e)
        if (xy == null) {
            return
        }
        val dx = xy[0] - this.dragStartTouchX
        val dy = xy[1] - this.dragStartTouchY
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
            this.dragMoved = true
        }
        val pad = uni_rpx2px(this.snapPaddingRpx())
        val w = this.wrapWOrDefault()
        val h = this.wrapHOrDefault()
        var nx = this.dragStartLeftPx + dx
        var ny = this.dragStartTopPx + dy
        nx = Math.max(pad, Math.min(nx, this.winW - w - pad))
        ny = Math.max(pad, Math.min(ny, this.winH - h - pad))
        this.dragLeftPx = nx
        this.dragTopPx = ny
    }
    open var onDragEnd = ::gen_onDragEnd_fn
    open fun gen_onDragEnd_fn() {
        if (!(this.draggable as Boolean)) {
            return
        }
        val didMove = this.dragMoved
        if (didMove && (this.snapEdge as Boolean)) {
            this.applySnap()
        }
        if (didMove) {
            this.dragSuppressedTap = true
            this.`$emit`("dragend", _uO("leftPx" to this.dragLeftPx, "topPx" to this.dragTopPx))
            val self = this
            setTimeout(fun(){
                self.dragSuppressedTap = false
            }
            , 120)
        }
        this.dragMoved = false
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
        val st: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 456, 10))
        val bg = btn["bgColor"]
        st["backgroundColor"] = if (bg == null) {
            "#16c2c2"
        } else {
            "" + bg
        }
        return st
    }
    open var collapse = ::gen_collapse_fn
    open fun gen_collapse_fn() {
        this.expanded = false
    }
    open var onMainTap = ::gen_onMainTap_fn
    open fun gen_onMainTap_fn() {
        if (this.dragSuppressedTap) {
            return
        }
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
    companion object {
        var name = "mFab"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("m-fab__mask" to _pS(_uM("position" to "fixed", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.2)")), "m-fab__subs" to _pS(_uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-end", "marginBottom" to "24rpx")), "m-fab__sub" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "paddingTop" to "16rpx", "paddingRight" to "28rpx", "paddingBottom" to "16rpx", "paddingLeft" to "28rpx", "borderTopLeftRadius" to "40rpx", "borderTopRightRadius" to "40rpx", "borderBottomRightRadius" to "40rpx", "borderBottomLeftRadius" to "40rpx", "marginBottom" to "16rpx")), "m-fab__sub-img" to _pS(_uM("width" to "40rpx", "height" to "40rpx", "marginRight" to "12rpx")), "m-fab__sub-text" to _pS(_uM("fontSize" to "28rpx")), "m-fab__main" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "m-fab__main-child" to _uM(".m-fab__main--drag-pass>" to _uM("pointerEvents" to "none")), "m-fab__plus" to _pS(_uM("fontSize" to "64rpx", "lineHeight" to 1)))
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
        ), "default" to 52), "draggable" to _uM("type" to "Boolean", "default" to false), "snapEdge" to _uM("type" to "Boolean", "default" to true), "snapPadding" to _uM("type" to _uA(
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
