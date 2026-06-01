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
import io.dcloud.uniapp.extapi.`$emit` as uni__emit
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.scanCode as uni_scanCode
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesScanCodeScanCode : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesScanCodeScanCode) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesScanCodeScanCode
            val _cache = __ins.renderCache
            val goBackWithResult = fun(result: String){
                console.log("扫码结果:", result, " at pages/scanCode/scanCode.uvue:38")
                uni__emit("scanResult", _uO("result" to result))
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            onMounted(fun(){
                setTimeout(fun(){
                    uni_scanCode(ScanCodeOptions(scanType = _uA(
                        "qrCode",
                        "barCode"
                    ), success = fun(res){
                        console.log("App扫码成功:", res.result, " at pages/scanCode/scanCode.uvue:102")
                        goBackWithResult(res.result as String)
                    }
                    , fail = fun(err){
                        console.log("App扫码失败或取消:", err, " at pages/scanCode/scanCode.uvue:106")
                        uni_showToast(ShowToastOptions(title = "扫码失败或已取消", icon = "none", duration = 1500, complete = fun(_){
                            setTimeout(fun(){
                                uni_navigateBack(NavigateBackOptions(delta = 1))
                            }
                            , 500)
                        }
                        ))
                    }
                    ))
                }
                , 100)
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to "scan-page"), _uA(
                    _cE("view", _uM("class" to "other-scan-container"), _uA(
                        _cE("view", _uM("class" to "scan-tip"), _uA(
                            _cE("text", _uM("class" to "tip-icon"), "📷"),
                            _cE("text", _uM("class" to "tip-text"), "正在启动相机...")
                        ))
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
                return _uM("scan-page" to _pS(_uM("position" to "fixed", "top" to 0, "left" to 0, "width" to "100%", "height" to "100%", "backgroundColor" to "#000000", "zIndex" to 999)), "other-scan-container" to _pS(_uM("display" to "flex", "alignItems" to "center", "justifyContent" to "center", "width" to "100%", "height" to "100%")), "scan-tip" to _uM(".other-scan-container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "tip-icon" to _uM(".other-scan-container .scan-tip " to _uM("fontSize" to "120rpx")), "tip-text" to _uM(".other-scan-container .scan-tip " to _uM("fontSize" to "32rpx", "color" to "#ffffff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
