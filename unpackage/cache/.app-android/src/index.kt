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
import io.dcloud.uniapp.extapi.clearStorageSync as uni_clearStorageSync
import io.dcloud.uniapp.extapi.connectSocket as uni_connectSocket
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.getDeviceInfo as uni_getDeviceInfo
import io.dcloud.uniapp.extapi.getFileSystemManager as uni_getFileSystemManager
import io.dcloud.uniapp.extapi.getStorageInfoSync as uni_getStorageInfoSync
import io.dcloud.uniapp.extapi.getStorageSync as uni_getStorageSync
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.hideLoading as uni_hideLoading
import io.dcloud.uniapp.extapi.loadFontFace as uni_loadFontFace
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.redirectTo as uni_redirectTo
import io.dcloud.uniapp.extapi.removeStorageSync as uni_removeStorageSync
import io.dcloud.uniapp.extapi.request as uni_request
import io.dcloud.uniapp.extapi.setStorageSync as uni_setStorageSync
import io.dcloud.uniapp.extapi.showLoading as uni_showLoading
import io.dcloud.uniapp.extapi.showModal as uni_showModal
import io.dcloud.uniapp.extapi.showToast as uni_showToast
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
import io.dcloud.uniapp.extapi.uploadFile as uni_uploadFile
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
typealias currentPageCaptureScreenshotCallBack = (base64: String, error: String) -> Unit
fun currentPageCaptureScreenshot(fullPage: Boolean, callback: currentPageCaptureScreenshotCallBack) {
    val pages = getCurrentPages() as UTSArray<UniPage>
    val currentPage = pages[pages.length - 1]
    currentPage.vm?.`$viewToTempFilePath`(ViewToTempFilePathOptions(wholeContent = fullPage, overwrite = true, success = fun(res){
        val fileManager = uni_getFileSystemManager()
        fileManager.readFile(ReadFileOptions(encoding = "base64", filePath = res.tempFilePath, success = fun(readFileRes) {
            callback(readFileRes.data as String, "")
        }
        , fail = fun(err) {
            callback("", "captureScreenshot fail: " + JSON.stringify(err))
        }
        ))
    }
    , fail = fun(err){
        callback("", "captureScreenshot fail: " + JSON.stringify(err))
    }
    ))
}
fun initRuntimeSocket(hosts: String, port: String, id: String): UTSPromise<SocketTask?> {
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(null)
    }
    return hosts.split(",").reduce<UTSPromise<SocketTask?>>(fun(promise: UTSPromise<SocketTask?>, host: String): UTSPromise<SocketTask?> {
        return promise.then(fun(socket): UTSPromise<SocketTask?> {
            if (socket != null) {
                return UTSPromise.resolve(socket)
            }
            return tryConnectSocket(host, port, id)
        }
        )
    }
    , UTSPromise.resolve(null))
}
val SOCKET_TIMEOUT: Number = 500
fun tryConnectSocket(host: String, port: String, id: String): UTSPromise<SocketTask?> {
    return UTSPromise(fun(resolve, reject){
        val socket = uni_connectSocket(ConnectSocketOptions(url = "ws://" + host + ":" + port + "/" + id, fail = fun(_) {
            resolve(null)
        }
        ))
        val timer = setTimeout(fun(){
            socket.close(CloseSocketOptions(code = 1006, reason = "connect timeout"))
            resolve(null)
        }
        , SOCKET_TIMEOUT)
        socket.onOpen(fun(e){
            clearTimeout(timer)
            resolve(socket)
        }
        )
        socket.onClose(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
        socket.onError(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
        socket.onMessage(fun(result){
            if (UTSAndroid.`typeof`(result["data"]) == "string") {
                val message = UTSAndroid.consoleDebugError(JSON.parse<UTSJSONObject>(result["data"] as String), " at ../../../../../../../../../Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-console/src/runtime/app/socket.ts:67")!!
                if ((message["type"] as String) == "screencap") {
                    val id = message["id"] as String
                    currentPageCaptureScreenshot(message["fullPage"] as Boolean, fun(base64: String, error: String){
                        socket.send(SendSocketMessageOptions(data = JSON.stringify(_uO("id" to id, "base64" to base64, "error" to error))))
                    }
                    )
                }
            }
            resolve(null)
        }
        )
    }
    )
}
fun initRuntimeSocketService(): UTSPromise<Boolean> {
    val hosts: String = "127.0.0.1,192.168.3.229"
    val port: String = "8090"
    val id: String = "app-android_C192Ju"
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(false)
    }
    return UTSPromise.resolve().then(fun(): UTSPromise<Boolean> {
        return initRuntimeSocket(hosts, port, id).then(fun(socket): Boolean {
            if (socket == null) {
                return false
            }
            socket
            return true
        }
        )
    }
    ).`catch`(fun(): Boolean {
        return false
    }
    )
}
val runBlock2 = run {
    initRuntimeSocketService()
}
open class AuthApiPaths (
    @JsonNotNull
    open var login: String,
    @JsonNotNull
    open var logout: String,
    @JsonNotNull
    open var refreshToken: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("AuthApiPaths", "common/config.uts", 2, 13)
    }
}
open class ApiPaths (
    @JsonNotNull
    open var auth: AuthApiPaths,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ApiPaths", "common/config.uts", 8, 13)
    }
}
open class ConfigInfo (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var versionCode: Number,
    @JsonNotNull
    open var versionName: String,
    open var appId: String? = null,
    open var logo: String? = null,
    open var desc: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ConfigInfo", "common/config.uts", 12, 13)
    }
}
open class StorageKeys (
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var refreshToken: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("StorageKeys", "common/config.uts", 20, 13)
    }
}
open class ProjectConfig (
    @JsonNotNull
    open var baseUrl: String,
    @JsonNotNull
    open var timeout: Number,
    @JsonNotNull
    open var env: String,
    @JsonNotNull
    open var api: ApiPaths,
    @JsonNotNull
    open var storage: StorageKeys,
    @JsonNotNull
    open var configInfo: ConfigInfo,
    @JsonNotNull
    open var tenantId: String,
    open var loginPagePath: String? = null,
    open var loginRequiredPaths: UTSArray<String>? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ProjectConfig", "common/config.uts", 24, 13)
    }
}
val ENV = "dev"
val API_CONFIG: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("API_CONFIG", "common/config.uts", 38, 7), "dev" to _uO("baseUrl" to "http://192.168.3.7:8081", "timeout" to 30000), "prod" to _uO("baseUrl" to "https://cmpapp.zdiot.cn/prod-api", "timeout" to 30000))
val currentConfig = API_CONFIG[ENV] as UTSJSONObject
val config = ProjectConfig(baseUrl = currentConfig["baseUrl"] as String, timeout = currentConfig["timeout"] as Number, env = ENV, tenantId = "000000", api = ApiPaths(auth = AuthApiPaths(login = "/auth/login", logout = "/auth/logout", refreshToken = "/auth/refresh")), storage = StorageKeys(token = "access_token", refreshToken = "refresh_token"), configInfo = ConfigInfo(name = "我的应用", versionCode = 1, versionName = "1.0.0", appId = "your-app-id"), loginPagePath = "", loginRequiredPaths = _uA())
fun getToken(): String {
    val token = uni_getStorageSync(config.storage.token)
    if (token == null) {
        return ""
    }
    return token as String
}
fun setStorageSync(key: String, value: Any) {
    uni_setStorageSync(key, value)
}
open class HostStorageConfig (
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var userInfo: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostStorageConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 6, 13)
    }
}
open class HostApiLoginConfig (
    @JsonNotNull
    open var tokenLogin: String,
    @JsonNotNull
    open var codeGetOpenIdLogin: String,
    @JsonNotNull
    open var codeGetPhoneRegisterOrLogin: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiLoginConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 10, 13)
    }
}
open class HostApiUpdateConfig (
    @JsonNotNull
    open var checkUpdate: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiUpdateConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 15, 13)
    }
}
open class HostApiUploadConfig (
    @JsonNotNull
    open var image: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiUploadConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 18, 13)
    }
}
open class HostApiConfig (
    @JsonNotNull
    open var login: HostApiLoginConfig,
    @JsonNotNull
    open var update: HostApiUpdateConfig,
    @JsonNotNull
    open var upload: HostApiUploadConfig,
    @JsonNotNull
    open var qrCodeImageApiBase: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 21, 13)
    }
}
open class HostConfigInfo (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var logo: String,
    @JsonNotNull
    open var desc: String,
    @JsonNotNull
    open var versionCode: Number,
    @JsonNotNull
    open var versionName: String,
    open var appDownloadUrl: String? = null,
    open var appDownloadUrlAndroid: String? = null,
    open var userAgreementArticleId: String? = null,
    open var privacyPolicyArticleId: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostConfigInfo", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 28, 13)
    }
}
open class MUnixHostProjectConfig (
    @JsonNotNull
    open var env: String,
    @JsonNotNull
    open var localBaseUrl: String,
    @JsonNotNull
    open var devBaseUrl: String,
    @JsonNotNull
    open var prodBaseUrl: String,
    @JsonNotNull
    open var baseUrl: String,
    @JsonNotNull
    open var storage: HostStorageConfig,
    @JsonNotNull
    open var loginRequiredPaths: UTSArray<String>,
    @JsonNotNull
    open var loginPagePath: String,
    @JsonNotNull
    open var api: HostApiConfig,
    @JsonNotNull
    open var configInfo: HostConfigInfo,
    open var mUi: Any? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("MUnixHostProjectConfig", "uni_modules/m-unix/components/m-tools/ProjectConfig.uts", 45, 13)
    }
}
val LOGO_BUILTIN = "/uni_modules/m-unix/static/m-app-logo.png"
val BUILTIN_DEFAULT = MUnixHostProjectConfig(env = "local", localBaseUrl = "", devBaseUrl = "", prodBaseUrl = "", baseUrl = "", storage = HostStorageConfig(token = "token", userInfo = "userInfo"), loginRequiredPaths = _uA(), loginPagePath = "/pages_Me/login/login", api = HostApiConfig(login = HostApiLoginConfig(tokenLogin = "", codeGetOpenIdLogin = "", codeGetPhoneRegisterOrLogin = ""), update = HostApiUpdateConfig(checkUpdate = ""), upload = HostApiUploadConfig(image = ""), qrCodeImageApiBase = ""), configInfo = HostConfigInfo(name = "mUnix", logo = LOGO_BUILTIN, desc = "", versionCode = 0, versionName = "0.0.0"), mUi = null)
var _hostOverride: MUnixHostProjectConfig? = null
fun readValue(source: Any?, key: String): Any? {
    if (source == null) {
        return null
    }
    val obj = source as UTSJSONObject
    return obj[key]
}
fun readString(source: Any?, key: String): String? {
    val value = readValue(source, key)
    if (value == null) {
        return null
    }
    return "" + value
}
fun readObject(source: Any?, key: String): Any? {
    val value = readValue(source, key)
    if (value != null && UTSAndroid.`typeof`(value) === "object") {
        return value
    }
    return null
}
fun mergeStorage(base: HostStorageConfig, p: Any?): HostStorageConfig {
    val out = HostStorageConfig(token = base.token, userInfo = base.userInfo)
    val pt = readString(p, "token")
    if (pt != null && pt.length > 0) {
        out.token = pt
    }
    val pu = readString(p, "userInfo")
    if (pu != null && pu.length > 0) {
        out.userInfo = pu
    }
    return out
}
fun mergeApi(base: HostApiConfig, p: Any?): HostApiConfig {
    val out = HostApiConfig(login = UTSJSONObject.assign<HostApiLoginConfig>(_uO(), base.login) as HostApiLoginConfig, update = UTSJSONObject.assign<HostApiUpdateConfig>(_uO(), base.update) as HostApiUpdateConfig, upload = UTSJSONObject.assign<HostApiUploadConfig>(_uO(), base.upload) as HostApiUploadConfig, qrCodeImageApiBase = base.qrCodeImageApiBase)
    val loginConfig = readObject(p, "login")
    if (loginConfig != null) {
        val t1 = readString(loginConfig, "tokenLogin")
        if (t1 != null) {
            out.login.tokenLogin = t1
        }
        val t2 = readString(loginConfig, "codeGetOpenIdLogin")
        if (t2 != null) {
            out.login.codeGetOpenIdLogin = t2
        }
        val t3 = readString(loginConfig, "codeGetPhoneRegisterOrLogin")
        if (t3 != null) {
            out.login.codeGetPhoneRegisterOrLogin = t3
        }
    }
    val authConfig = readObject(p, "auth")
    if (authConfig != null) {
        val authLogin = readString(authConfig, "login")
        if (authLogin != null && authLogin.length > 0) {
            out.login.tokenLogin = authLogin
        }
    }
    val updateConfig = readObject(p, "update")
    if (updateConfig != null) {
        val c = readString(updateConfig, "checkUpdate")
        if (c != null) {
            out.update.checkUpdate = c
        }
    }
    val uploadConfig = readObject(p, "upload")
    if (uploadConfig != null) {
        val im = readString(uploadConfig, "image")
        if (im != null) {
            out.upload.image = im
        }
    }
    val pq = readString(p, "qrCodeImageApiBase")
    if (pq != null) {
        out.qrCodeImageApiBase = pq
    }
    return out
}
fun mergeConfigInfo(base: HostConfigInfo, p: Any?): HostConfigInfo {
    val out = HostConfigInfo(name = base.name, logo = base.logo, desc = base.desc, versionCode = base.versionCode, versionName = base.versionName)
    val n = readString(p, "name")
    if (n != null) {
        out.name = n
    }
    val l = readString(p, "logo")
    if (l != null) {
        out.logo = l
    }
    val d = readString(p, "desc")
    if (d != null) {
        out.desc = d
    }
    val vc = readString(p, "versionCode")
    if (vc != null) {
        val num = parseInt(vc, 10)
        if (!isNaN(num)) {
            out.versionCode = num
        }
    }
    val vn = readString(p, "versionName")
    if (vn != null) {
        out.versionName = vn
    }
    val ad = readString(p, "appDownloadUrl")
    if (ad != null) {
        out.appDownloadUrl = ad
    }
    val ada = readString(p, "appDownloadUrlAndroid")
    if (ada != null) {
        out.appDownloadUrlAndroid = ada
    }
    val ua = readString(p, "userAgreementArticleId")
    if (ua != null) {
        out.userAgreementArticleId = ua
    }
    val pp = readString(p, "privacyPolicyArticleId")
    if (pp != null) {
        out.privacyPolicyArticleId = pp
    }
    return out
}
fun mergeHostPatch(patch: Any): MUnixHostProjectConfig {
    val base = BUILTIN_DEFAULT
    val out = MUnixHostProjectConfig(env = base.env, localBaseUrl = base.localBaseUrl, devBaseUrl = base.devBaseUrl, prodBaseUrl = base.prodBaseUrl, baseUrl = base.baseUrl, storage = UTSJSONObject.assign<HostStorageConfig>(_uO(), base.storage) as HostStorageConfig, loginRequiredPaths = _uA(), loginPagePath = base.loginPagePath, api = HostApiConfig(login = HostApiLoginConfig(tokenLogin = base.api.login.tokenLogin, codeGetOpenIdLogin = base.api.login.codeGetOpenIdLogin, codeGetPhoneRegisterOrLogin = base.api.login.codeGetPhoneRegisterOrLogin), update = HostApiUpdateConfig(checkUpdate = base.api.update.checkUpdate), upload = HostApiUploadConfig(image = base.api.upload.image), qrCodeImageApiBase = base.api.qrCodeImageApiBase), configInfo = HostConfigInfo(name = base.configInfo.name, logo = base.configInfo.logo, desc = base.configInfo.desc, versionCode = base.configInfo.versionCode, versionName = base.configInfo.versionName), mUi = base.mUi)
    if (patch == null) {
        return out
    }
    val e = readString(patch, "env")
    if (e != null) {
        out.env = e
    }
    val lb = readString(patch, "localBaseUrl")
    if (lb != null) {
        out.localBaseUrl = lb
    }
    val db = readString(patch, "devBaseUrl")
    if (db != null) {
        out.devBaseUrl = db
    }
    val pb = readString(patch, "prodBaseUrl")
    if (pb != null) {
        out.prodBaseUrl = pb
    }
    val bu = readString(patch, "baseUrl")
    if (bu != null) {
        out.baseUrl = bu
    }
    out.storage = mergeStorage(base.storage, readObject(patch, "storage"))
    val paths = readValue(patch, "loginRequiredPaths")
    if (paths != null && paths is UTSArray<*>) {
        val arr: UTSArray<String> = _uA()
        val pa = paths as UTSArray<Any>
        run {
            var i: Number = 0
            while(i < pa.length){
                arr.push("" + pa[i])
                i++
            }
        }
        out.loginRequiredPaths = arr
    }
    val lp = readString(patch, "loginPagePath")
    if (lp != null && lp.length > 0) {
        out.loginPagePath = lp
    }
    out.api = mergeApi(base.api, readObject(patch, "api"))
    out.configInfo = mergeConfigInfo(base.configInfo, readObject(patch, "configInfo"))
    val mui = readValue(patch, "mUi")
    if (mui != null) {
        out.mUi = mui
    }
    return out
}
fun injectMUnixHostProjectConfig(hostConfig: Any): Unit {
    _hostOverride = mergeHostPatch(hostConfig)
}
fun getHostProjectConfig(): MUnixHostProjectConfig {
    val hostOverride = _hostOverride
    if (hostOverride != null) {
        return hostOverride
    }
    return BUILTIN_DEFAULT
}
val runBlock3 = run {
    injectMUnixHostProjectConfig(config)
}
val injectedConfig = getHostProjectConfig()
val runBlock4 = run {
    console.log("配置注入成功:", injectedConfig.baseUrl, " at utils/inject-m-unix.uts:10")
}
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        setCurrentInstance(__ins)
        __ins.proxy = this
        GenApp.setup(this)
    }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenApp) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenApp
            val _cache = __ins.renderCache
            var firstBackTime: Number = 0
            onLaunch(fun(_options){
                uni_loadFontFace(LoadFontFaceOptions(family = "iconfont", source = "url(\"/static/iconfont/iconfont.ttf\")", success = fun(_){
                    console.log("图标字体加载成功", " at App.uvue:12")
                }
                , fail = fun(err){
                    console.log("图标字体加载失败", err, " at App.uvue:15")
                }
                ))
                console.log("App Launch", " at App.uvue:19")
            }
            )
            onAppShow(fun(_options){
                console.log("App Show", " at App.uvue:23")
            }
            )
            onAppHide(fun(){
                console.log("App Hide", " at App.uvue:27")
            }
            )
            onLastPageBackPress(fun(){
                console.log("App LastPageBackPress", " at App.uvue:32")
                if (firstBackTime == 0) {
                    uni_showToast(ShowToastOptions(title = "再按一次退出应用", position = "bottom"))
                    firstBackTime = Date.now()
                    setTimeout(fun(){
                        firstBackTime = 0
                    }, 2000)
                } else if (Date.now() - firstBackTime < 2000) {
                    firstBackTime = Date.now()
                    uni_exit(null)
                }
            }
            )
            onExit(fun(){
                console.log("App Exit", " at App.uvue:49")
            }
            )
            return fun(): Any? {
                return null
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0,
                styles1
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("flex" to _pS(_uM("display" to "flex", "flexDirection" to "row")), "flex-row" to _pS(_uM("display" to "flex", "flexDirection" to "row")), "flex-column" to _pS(_uM("display" to "flex", "flexDirection" to "column")), "flex-wrap" to _pS(_uM("flexWrap" to "wrap")), "flex-nowrap" to _pS(_uM("flexWrap" to "nowrap")), "justify-start" to _pS(_uM("justifyContent" to "flex-start")), "justify-end" to _pS(_uM("justifyContent" to "flex-end")), "justify-center" to _pS(_uM("justifyContent" to "center")), "justify-between" to _pS(_uM("justifyContent" to "space-between")), "justify-around" to _pS(_uM("justifyContent" to "space-around")), "items-start" to _pS(_uM("alignItems" to "flex-start")), "items-end" to _pS(_uM("alignItems" to "flex-end")), "items-center" to _pS(_uM("alignItems" to "center")), "items-stretch" to _pS(_uM("alignItems" to "stretch")), "flex-auto" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "auto")), "flex-1" to _pS(_uM("flexGrow" to 1, "flexShrink" to 1, "flexBasis" to "0%")), "flex-2" to _pS(_uM("flexGrow" to 2, "flexShrink" to 1, "flexBasis" to "0%")), "flex-3" to _pS(_uM("flexGrow" to 3, "flexShrink" to 1, "flexBasis" to "0%")), "flex-none" to _pS(_uM("flexGrow" to 0, "flexShrink" to 0, "flexBasis" to "auto")), "self-auto" to _pS(_uM("alignSelf" to "auto")), "self-start" to _pS(_uM("alignSelf" to "flex-start")), "self-end" to _pS(_uM("alignSelf" to "flex-end")), "self-center" to _pS(_uM("alignSelf" to "center")), "self-stretch" to _pS(_uM("alignSelf" to "stretch")), "flex-center" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center")), "flex-between" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "w-10" to _pS(_uM("width" to "10%")), "w-20" to _pS(_uM("width" to "20%")), "w-25" to _pS(_uM("width" to "25%")), "w-30" to _pS(_uM("width" to "30%")), "w-40" to _pS(_uM("width" to "40%")), "w-50" to _pS(_uM("width" to "50%")), "w-60" to _pS(_uM("width" to "60%")), "w-70" to _pS(_uM("width" to "70%")), "w-75" to _pS(_uM("width" to "75%")), "w-80" to _pS(_uM("width" to "80%")), "w-90" to _pS(_uM("width" to "90%")), "w-100" to _pS(_uM("width" to "100%")), "p-0" to _pS(_uM("paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0)), "p-10" to _pS(_uM("paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "p-20" to _pS(_uM("paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "40rpx", "paddingLeft" to "40rpx")), "p-30" to _pS(_uM("paddingTop" to "60rpx", "paddingRight" to "60rpx", "paddingBottom" to "60rpx", "paddingLeft" to "60rpx")), "p-l-0" to _pS(_uM("paddingLeft" to 0)), "p-l-10" to _pS(_uM("paddingLeft" to "20rpx")), "p-l-20" to _pS(_uM("paddingLeft" to "40rpx")), "p-r-0" to _pS(_uM("paddingRight" to 0)), "p-r-10" to _pS(_uM("paddingRight" to "20rpx")), "p-r-20" to _pS(_uM("paddingRight" to "40rpx")), "p-t-0" to _pS(_uM("paddingTop" to 0)), "p-t-10" to _pS(_uM("paddingTop" to "20rpx")), "p-t-20" to _pS(_uM("paddingTop" to "40rpx")), "p-b-0" to _pS(_uM("paddingBottom" to 0)), "p-b-10" to _pS(_uM("paddingBottom" to "20rpx")), "p-b-20" to _pS(_uM("paddingBottom" to "40rpx")), "m-0" to _pS(_uM("marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0)), "m-10" to _pS(_uM("marginTop" to "20rpx", "marginRight" to "20rpx", "marginBottom" to "20rpx", "marginLeft" to "20rpx")), "m-20" to _pS(_uM("marginTop" to "40rpx", "marginRight" to "40rpx", "marginBottom" to "40rpx", "marginLeft" to "40rpx")), "m-l-0" to _pS(_uM("marginLeft" to 0)), "m-l-10" to _pS(_uM("marginLeft" to "20rpx")), "m-l-20" to _pS(_uM("marginLeft" to "40rpx")), "m-r-0" to _pS(_uM("marginRight" to 0)), "m-r-10" to _pS(_uM("marginRight" to "20rpx")), "m-r-20" to _pS(_uM("marginRight" to "40rpx")), "m-t-0" to _pS(_uM("marginTop" to 0)), "m-t-10" to _pS(_uM("marginTop" to "20rpx")), "m-t-20" to _pS(_uM("marginTop" to "40rpx")), "m-b-0" to _pS(_uM("marginBottom" to 0)), "m-b-10" to _pS(_uM("marginBottom" to "20rpx")), "m-b-20" to _pS(_uM("marginBottom" to "40rpx")), "rounded" to _pS(_uM("borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx")), "rounded-full" to _pS(_uM("borderTopLeftRadius" to "9999rpx", "borderTopRightRadius" to "9999rpx", "borderBottomRightRadius" to "9999rpx", "borderBottomLeftRadius" to "9999rpx")), "rounded-sm" to _pS(_uM("borderTopLeftRadius" to "8rpx", "borderTopRightRadius" to "8rpx", "borderBottomRightRadius" to "8rpx", "borderBottomLeftRadius" to "8rpx")), "rounded-lg" to _pS(_uM("borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx", "borderBottomRightRadius" to "24rpx", "borderBottomLeftRadius" to "24rpx")), "border" to _pS(_uM("borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#e5e5e5", "borderRightColor" to "#e5e5e5", "borderBottomColor" to "#e5e5e5", "borderLeftColor" to "#e5e5e5")), "border-t" to _pS(_uM("borderTopWidth" to 1, "borderTopStyle" to "solid", "borderTopColor" to "#e5e5e5")), "border-b" to _pS(_uM("borderBottomWidth" to 1, "borderBottomStyle" to "solid", "borderBottomColor" to "#e5e5e5")), "border-l" to _pS(_uM("borderLeftWidth" to 1, "borderLeftStyle" to "solid", "borderLeftColor" to "#e5e5e5")), "border-r" to _pS(_uM("borderRightWidth" to 1, "borderRightStyle" to "solid", "borderRightColor" to "#e5e5e5")), "text-left" to _pS(_uM("textAlign" to "left")), "text-center" to _pS(_uM("textAlign" to "center")), "text-right" to _pS(_uM("textAlign" to "right")), "ellipsis" to _pS(_uM("overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "f-x" to _pS(_uM("display" to "flex", "flexDirection" to "row")), "f-y" to _pS(_uM("display" to "flex", "flexDirection" to "column")), "f-c" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "f-y-c" to _pS(_uM("justifyContent" to "center")), "f-y-l" to _pS(_uM("justifyContent" to "flex-start")), "f-y-r" to _pS(_uM("justifyContent" to "flex-end")), "f-y-b" to _pS(_uM("justifyContent" to "space-between")), "f-y-a" to _pS(_uM("justifyContent" to "space-around")), "f-x-c" to _pS(_uM("alignItems" to "center")), "f-x-l" to _pS(_uM("alignItems" to "flex-start")), "f-x-r" to _pS(_uM("alignItems" to "flex-end")), "f-x-st" to _pS(_uM("alignItems" to "stretch")), "m-primary" to _pS(_uM("color" to "#ff0844")), "m-success" to _pS(_uM("color" to "#52c41a")), "m-warning" to _pS(_uM("color" to "#faad14")), "m-danger" to _pS(_uM("color" to "#f56c6c")), "m-info" to _pS(_uM("color" to "#1890ff")), "text-primary" to _pS(_uM("color" to "#333333")))
            }
        val styles1: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("text-secondary" to _pS(_uM("color" to "#666666")), "text-muted" to _pS(_uM("color" to "#999999")), "text-white" to _pS(_uM("color" to "#ffffff")), "bg-primary" to _pS(_uM("backgroundColor" to "#ff0844")), "bg-white" to _pS(_uM("backgroundColor" to "#ffffff")), "bg-gray" to _pS(_uM("backgroundColor" to "#f5f5f5")), "text-xs" to _pS(_uM("fontSize" to "24rpx")), "text-sm" to _pS(_uM("fontSize" to "26rpx")), "text-base" to _pS(_uM("fontSize" to "28rpx")), "text-md" to _pS(_uM("fontSize" to "30rpx")), "text-lg" to _pS(_uM("fontSize" to "32rpx")), "text-xl" to _pS(_uM("fontSize" to "36rpx")), "text-2xl" to _pS(_uM("fontSize" to "40rpx")), "font-normal" to _pS(_uM("fontWeight" to 400)), "font-medium" to _pS(_uM("fontWeight" to 500)), "font-bold" to _pS(_uM("fontWeight" to 700)), "safe-area-top" to _pS(_uM("paddingTop" to "40rpx")), "safe-area-bottom" to _pS(_uM("paddingBottom" to "40rpx")), "m-animate" to _pS(_uM("transitionProperty" to "opacity,transform", "transitionDuration" to "300ms", "transitionTimingFunction" to "ease-out")), "m-animate-fast" to _pS(_uM("transitionDuration" to "150ms")), "m-animate-slow" to _pS(_uM("transitionDuration" to "450ms")), "m-animate-ease-in" to _pS(_uM("transitionTimingFunction" to "ease-in")), "m-animate-ease-in-out" to _pS(_uM("transitionTimingFunction" to "ease-in-out")), "m-opacity-0" to _pS(_uM("opacity" to 0)), "m-opacity-1" to _pS(_uM("opacity" to 1)), "m-fade-from" to _pS(_uM("opacity" to 0)), "m-fade-to" to _pS(_uM("opacity" to 1)), "m-slide-up-from" to _pS(_uM("opacity" to 0, "transform" to "translateY(24rpx)")), "m-slide-up-to" to _pS(_uM("opacity" to 1, "transform" to "translateY(0)")), "m-slide-up-out" to _pS(_uM("opacity" to 0, "transform" to "translateY(-24rpx)")), "m-slide-down-from" to _pS(_uM("opacity" to 0, "transform" to "translateY(-24rpx)")), "m-slide-down-to" to _pS(_uM("opacity" to 1, "transform" to "translateY(0)")), "m-slide-left-from" to _pS(_uM("opacity" to 0, "transform" to "translateX(24rpx)")), "m-slide-left-to" to _pS(_uM("opacity" to 1, "transform" to "translateX(0)")), "m-slide-right-from" to _pS(_uM("opacity" to 0, "transform" to "translateX(-24rpx)")), "m-slide-right-to" to _pS(_uM("opacity" to 1, "transform" to "translateX(0)")), "m-scale-from" to _pS(_uM("opacity" to 0, "transform" to "scale(0.92)")), "m-scale-to" to _pS(_uM("opacity" to 1, "transform" to "scale(1)")), "m-visible" to _pS(_uM("opacity" to 1)), "m-hidden" to _pS(_uM("opacity" to 0)), "m-hidden-touch" to _pS(_uM("opacity" to 0, "pointerEvents" to "none")), "m-rotate-0" to _pS(_uM("transform" to "rotate(0deg)")), "m-rotate-90" to _pS(_uM("transform" to "rotate(90deg)")), "m-rotate-180" to _pS(_uM("transform" to "rotate(180deg)")), "m-rotate-270" to _pS(_uM("transform" to "rotate(270deg)")), "iconfont" to _pS(_uM("!fontFamily" to "iconfont", "fontSize" to "32rpx", "fontStyle" to "normal", "WebkitFontSmoothing" to "antialiased", "MozOsxFontSmoothing" to "grayscale")), "uni-row" to _pS(_uM("flexDirection" to "row")), "uni-column" to _pS(_uM("flexDirection" to "column")), "mr-24" to _pS(_uM("!marginRight" to "24rpx")), "ml-24" to _pS(_uM("!marginLeft" to "24rpx")), "mb-24" to _pS(_uM("!marginBottom" to "24rpx")), "mt-24" to _pS(_uM("!marginTop" to "24rpx")), "@TRANSITION" to _uM("m-animate" to _uM("property" to "opacity,transform", "duration" to "300ms", "timingFunction" to "ease-out"), "m-animate-fast" to _uM("duration" to "150ms"), "m-animate-slow" to _uM("duration" to "450ms"), "m-animate-ease-in" to _uM("timingFunction" to "ease-in"), "m-animate-ease-in-out" to _uM("timingFunction" to "ease-in-out")))
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = _uA(), emits = Map(), components = Map(), styles = GenApp.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenApp.setup(props as GenApp)
    }
    )
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
fun getIconChar(name: String): String {
    if (name === "print") {
        return "\ue6bd"
    }
    if (name === "mobile-phone") {
        return "\ue6be"
    }
    if (name === "minus") {
        return "\ue6bf"
    }
    if (name === "navigation") {
        return "\ue6c0"
    }
    if (name === "pdf") {
        return "\ue6c1"
    }
    if (name === "prompt") {
        return "\ue6c2"
    }
    if (name === "move") {
        return "\ue6c3"
    }
    if (name === "refresh") {
        return "\ue6c4"
    }
    if (name === "run-up") {
        return "\ue6c5"
    }
    if (name === "picture" || name === "photo") {
        return "\ue6c6"
    }
    if (name === "run-in") {
        return "\ue6c7"
    }
    if (name === "pin") {
        return "\ue6c8"
    }
    if (name === "save") {
        return "\ue6c9"
    }
    if (name === "search") {
        return "\ue6ca"
    }
    if (name === "share") {
        return "\ue6cb"
    }
    if (name === "scanning") {
        return "\ue6cc"
    }
    if (name === "security") {
        return "\ue6cd"
    }
    if (name === "sign-out") {
        return "\ue6ce"
    }
    if (name === "select") {
        return "\ue6cf"
    }
    if (name === "stop") {
        return "\ue6d0"
    }
    if (name === "success") {
        return "\ue6d1"
    }
    if (name === "smile") {
        return "\ue6d2"
    }
    if (name === "switch") {
        return "\ue6d3"
    }
    if (name === "setting") {
        return "\ue6d4"
    }
    if (name === "survey") {
        return "\ue6d5"
    }
    if (name === "task") {
        return "\ue6d6"
    }
    if (name === "skip") {
        return "\ue6d7"
    }
    if (name === "text") {
        return "\ue6d8"
    }
    if (name === "time") {
        return "\ue6d9"
    }
    if (name === "telephone-out") {
        return "\ue6da"
    }
    if (name === "toggle-left") {
        return "\ue6db"
    }
    if (name === "toggle-right") {
        return "\ue6dc"
    }
    if (name === "telephone" || name === "phone") {
        return "\ue6dd"
    }
    if (name === "top") {
        return "\ue6de"
    }
    if (name === "unlock") {
        return "\ue6df"
    }
    if (name === "user" || name === "person") {
        return "\ue6e0"
    }
    if (name === "upload") {
        return "\ue6e1"
    }
    if (name === "work") {
        return "\ue6e2"
    }
    if (name === "training") {
        return "\ue6e3"
    }
    if (name === "warning") {
        return "\ue6e4"
    }
    if (name === "zoom-in") {
        return "\ue6e5"
    }
    if (name === "zoom-out") {
        return "\ue6e6"
    }
    if (name === "add-bold") {
        return "\ue6e7"
    }
    if (name === "arrow-left-bold") {
        return "\ue6e8"
    }
    if (name === "arrow-up-bold") {
        return "\ue6e9"
    }
    if (name === "close-bold") {
        return "\ue6ea"
    }
    if (name === "arrow-down-bold") {
        return "\ue6eb"
    }
    if (name === "minus-bold") {
        return "\ue6ec"
    }
    if (name === "arrow-right-bold") {
        return "\ue6ed"
    }
    if (name === "select-bold") {
        return "\ue6ee"
    }
    if (name === "arrow-up-filling") {
        return "\ue6ef"
    }
    if (name === "arrow-down-filling") {
        return "\ue6f0"
    }
    if (name === "arrow-left-filling") {
        return "\ue6f1"
    }
    if (name === "arrow-right-filling") {
        return "\ue6f2"
    }
    if (name === "caps-unlock-filling") {
        return "\ue6f3"
    }
    if (name === "comment-filling") {
        return "\ue6f4"
    }
    if (name === "check-item-filling") {
        return "\ue6f5"
    }
    if (name === "clock-filling") {
        return "\ue6f6"
    }
    if (name === "delete-filling") {
        return "\ue6f7"
    }
    if (name === "decline-filling") {
        return "\ue6f8"
    }
    if (name === "dynamic-filling") {
        return "\ue6f9"
    }
    if (name === "intermediate-filling") {
        return "\ue6fa"
    }
    if (name === "favorite-filling") {
        return "\ue6fb"
    }
    if (name === "layout-filling") {
        return "\ue6fc"
    }
    if (name === "help-filling") {
        return "\ue6fd"
    }
    if (name === "history-filling") {
        return "\ue6fe"
    }
    if (name === "filter-filling") {
        return "\ue6ff"
    }
    if (name === "file-common-filling") {
        return "\ue700"
    }
    if (name === "news-filling") {
        return "\ue701"
    }
    if (name === "edit-filling") {
        return "\ue702"
    }
    if (name === "fullscreen-expand-filling") {
        return "\ue703"
    }
    if (name === "smile-filling") {
        return "\ue704"
    }
    if (name === "rise-filling") {
        return "\ue705"
    }
    if (name === "picture-filling") {
        return "\ue706"
    }
    if (name === "notification-filling") {
        return "\ue707"
    }
    if (name === "user-filling") {
        return "\ue708"
    }
    if (name === "setting-filling") {
        return "\ue709"
    }
    if (name === "switch-filling") {
        return "\ue70a"
    }
    if (name === "work-filling") {
        return "\ue70b"
    }
    if (name === "task-filling") {
        return "\ue70c"
    }
    if (name === "success-filling") {
        return "\ue70d"
    }
    if (name === "warning-filling") {
        return "\ue70e"
    }
    if (name === "folder-filling") {
        return "\ue70f"
    }
    if (name === "map-filling") {
        return "\ue710"
    }
    if (name === "prompt-filling") {
        return "\ue711"
    }
    if (name === "meh-filling") {
        return "\ue712"
    }
    if (name === "cry-filling") {
        return "\ue713"
    }
    if (name === "top-filling") {
        return "\ue714"
    }
    if (name === "home-filling") {
        return "\ue715"
    }
    if (name === "sorting") {
        return "\ue716"
    }
    if (name === "column-3" || name === "category") {
        return "\ue663"
    }
    if (name === "column-4") {
        return "\ue664"
    }
    if (name === "column-vertical" || name === "listview") {
        return "\ue67d"
    }
    if (name === "column-horizontal") {
        return "\ue67e"
    }
    if (name === "add") {
        return "\ue665"
    }
    if (name === "add-circle") {
        return "\ue666"
    }
    if (name === "adjust") {
        return "\ue667"
    }
    if (name === "arrow-up-circle" || name === "arrow-up") {
        return "\ue668"
    }
    if (name === "arrow-right-circle") {
        return "\ue669"
    }
    if (name === "arrow-down") {
        return "\ue66a"
    }
    if (name === "ashbin") {
        return "\ue66b"
    }
    if (name === "arrow-right") {
        return "\ue66c"
    }
    if (name === "browse") {
        return "\ue66d"
    }
    if (name === "bottom") {
        return "\ue66e"
    }
    if (name === "back" || name === "arrow-left") {
        return "\ue66f"
    }
    if (name === "arrow-left-circle") {
        return "\ue672"
    }
    if (name === "arrow-double-right") {
        return "\ue673"
    }
    if (name === "camera") {
        return "\ue675"
    }
    if (name === "chart-bar") {
        return "\ue676"
    }
    if (name === "attachment") {
        return "\ue677"
    }
    if (name === "code") {
        return "\ue678"
    }
    if (name === "close") {
        return "\ue679"
    }
    if (name === "check" || name === "check-item") {
        return "\ue67a"
    }
    if (name === "calendar") {
        return "\ue67b"
    }
    if (name === "comment") {
        return "\ue67c"
    }
    if (name === "complete") {
        return "\ue67f"
    }
    if (name === "cry") {
        return "\ue681"
    }
    if (name === "customer-service") {
        return "\ue682"
    }
    if (name === "delete") {
        return "\ue683"
    }
    if (name === "download") {
        return "\ue68d"
    }
    if (name === "edit") {
        return "\ue693"
    }
    if (name === "email") {
        return "\ue695"
    }
    if (name === "error") {
        return "\ue696"
    }
    if (name === "favorite" || name === "heart" || name === "tag" || name === "label") {
        return "\ue697"
    }
    if (name === "file") {
        return "\ue69d"
    }
    if (name === "folder-close") {
        return "\ue69e"
    }
    if (name === "folder") {
        return "\ue70f"
    }
    if (name === "filter") {
        return "\ue69f"
    }
    if (name === "good" || name === "star") {
        return "\ue6a0"
    }
    if (name === "hide") {
        return "\ue6a1"
    }
    if (name === "home") {
        return "\ue6a2"
    }
    if (name === "history") {
        return "\ue6a3"
    }
    if (name === "link") {
        return "\ue6aa"
    }
    if (name === "lock") {
        return "\ue6ae"
    }
    if (name === "map") {
        return "\ue6b0"
    }
    if (name === "meh") {
        return "\ue6b1"
    }
    if (name === "menu") {
        return "\ue6b2"
    }
    if (name === "loading") {
        return "\ue6b3"
    }
    if (name === "help") {
        return "\ue6b4"
    }
    if (name === "minus-circle") {
        return "\ue6b5"
    }
    if (name === "more") {
        return "\ue6b9"
    }
    if (name === "notification" || name === "message") {
        return "\ue6b7"
    }
    if (name === "wechat") {
        return "\ue641"
    }
    if (name === "play") {
        return "\ue6bc"
    }
    if (name === "film") {
        return "\ue69b"
    }
    if (name === "fabulous" || name === "good-filling") {
        return "\ue69c"
    }
    if (name === "like") {
        return "\ue720"
    }
    if (name === "like-fill") {
        return "\ue71f"
    }
    if (name === "elipsis") {
        return "\ue690"
    }
    if (name === "location") {
        return "\ue6c0"
    }
    if (name === "wallet") {
        return "\ue6a6"
    }
    if (name === "shop" || name === "apps" || name === "modular") {
        return "\ue6b6"
    }
    if (name === "layers") {
        return "\ue6ad"
    }
    if (name === "cart" || name === "shopping-cart" || name === "trolley") {
        return "\ue6ad"
    }
    if (name === "imface") {
        return "\ue728"
    }
    if (name === "imkeyboard") {
        return "\ue727"
    }
    if (name === "immore") {
        return "\ue726"
    }
    if (name === "imvoice") {
        return "\ue725"
    }
    if (name === "video") {
        return "\ue64b"
    }
    return ""
}
val GenUniModulesMUnixComponentsMIconMIconClass = CreateVueComponent(GenUniModulesMUnixComponentsMIconMIcon::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMIconMIcon.name, inheritAttrs = GenUniModulesMUnixComponentsMIconMIcon.inheritAttrs, inject = GenUniModulesMUnixComponentsMIconMIcon.inject, props = GenUniModulesMUnixComponentsMIconMIcon.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMIconMIcon.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMIconMIcon.emits, components = GenUniModulesMUnixComponentsMIconMIcon.components, styles = GenUniModulesMUnixComponentsMIconMIcon.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMIconMIcon {
    return GenUniModulesMUnixComponentsMIconMIcon(instance)
}
)
val GenComponentsTopNavBarTopNavBarClass = CreateVueComponent(GenComponentsTopNavBarTopNavBar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsTopNavBarTopNavBar.inheritAttrs, inject = GenComponentsTopNavBarTopNavBar.inject, props = GenComponentsTopNavBarTopNavBar.props, propsNeedCastKeys = GenComponentsTopNavBarTopNavBar.propsNeedCastKeys, emits = GenComponentsTopNavBarTopNavBar.emits, components = GenComponentsTopNavBarTopNavBar.components, styles = GenComponentsTopNavBarTopNavBar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsTopNavBarTopNavBar.setup(props as GenComponentsTopNavBarTopNavBar)
    }
    )
}
, fun(instance, renderer): GenComponentsTopNavBarTopNavBar {
    return GenComponentsTopNavBarTopNavBar(instance)
}
)
open class R<T> (
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var msg: String,
    open var status: Number? = null,
    open var isSecurity: Boolean? = null,
    @JsonNotNull
    open var data: T,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("R", "uni_modules/m-unix/components/m-tools/utype/type.uts", 4, 13)
    }
}
open class StoreMemberVo (
    @JsonNotNull
    open var token: String,
    open var id: Number? = null,
    open var nickname: String? = null,
    open var phone: String? = null,
    open var avatar: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("StoreMemberVo", "uni_modules/m-unix/components/m-tools/utype/type.uts", 29, 13)
    }
}
enum class RunType__1(override val value: String) : UTSEnumString {
    Android("android"),
    IOS("ios"),
    HarmonyOs("harmonyos"),
    WxAppl("devtools"),
    Windows("windows")
}
enum class StorageEnum__1(override val value: String) : UTSEnumString {
    MEMBER_INFO_KEY("memberInfo"),
    TOKEN_KEY("token")
}
val CACHE_PREFIX = "app_cache_"
open class CacheMeta (
    open var expire: Number? = null,
    @JsonNotNull
    open var timestamp: Number,
    @JsonNotNull
    open var data: Any,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CacheMeta", "uni_modules/m-unix/components/m-tools/CacheUtil.uts", 3, 6)
    }
}
open class CacheUtil : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CacheUtil", "uni_modules/m-unix/components/m-tools/CacheUtil.uts", 11, 7)
    }
    companion object {
        fun <T> set(key: String, data: T, expire: Number? = null): Boolean {
            try {
                val cacheKey = CACHE_PREFIX + key
                val expireAt = if (expire != null) {
                    Date.now() + expire * 1000
                } else {
                    null
                }
                val meta = CacheMeta(data = data as Any, timestamp = Date.now(), expire = expireAt)
                uni_setStorageSync(cacheKey, JSON.stringify(meta))
                return true
            }
             catch (e: Throwable) {
                console.error("[CacheUtil] 设置缓存失败 " + key, e, " at uni_modules/m-unix/components/m-tools/CacheUtil.uts:33")
                return false
            }
        }
        fun <T> get(key: String, validator: ((data: Any) -> Boolean)? = null): T? {
            val cacheKey = CACHE_PREFIX + key
            try {
                val cached = uni_getStorageSync(cacheKey)
                if (cached == null || cached == "") {
                    return null
                }
                val meta = UTSAndroid.consoleDebugError(JSON.parse(cached as String), " at uni_modules/m-unix/components/m-tools/CacheUtil.uts:46") as CacheMeta
                if (meta.expire != null && Date.now() > meta.expire!!) {
                    this.remove(key)
                    return null
                }
                if (validator != null && !validator(meta.data)) {
                    console.warn("[CacheUtil] 数据校验未通过 " + key, " at uni_modules/m-unix/components/m-tools/CacheUtil.uts:57")
                    return null
                }
                return meta.data as T
            }
             catch (e: Throwable) {
                console.error("[CacheUtil] 获取缓存失败 " + key, e, " at uni_modules/m-unix/components/m-tools/CacheUtil.uts:63")
                return null
            }
        }
        fun remove(key: String): Unit {
            uni_removeStorageSync(CACHE_PREFIX + key)
        }
        fun clear(): Unit {
            val keys = uni_getStorageInfoSync().keys
            keys.forEach(fun(key){
                if (key.startsWith(CACHE_PREFIX)) {
                    uni_removeStorageSync(key)
                }
            }
            )
        }
    }
}
open class LoginObject : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LoginObject", "uni_modules/m-unix/components/m-tools/LoginObject.uts", 7, 14)
    }
    open fun getToken(): String? {
        try {
            val u: StoreMemberVo? = this.getMemberInfo()
            if (u != null) {
                return u.token
            }
            return ""
        }
         catch (e: Throwable) {
            console.log("get token error,`{}`", e, " at uni_modules/m-unix/components/m-tools/LoginObject.uts:19")
            return null
        }
    }
    open fun setMemberInfo(m: StoreMemberVo): Unit {
        CacheUtil.set(StorageEnum__1.MEMBER_INFO_KEY.toString(), m)
    }
    open fun getMemberInfo(): StoreMemberVo? {
        try {
            return CacheUtil.get<StoreMemberVo>(StorageEnum__1.MEMBER_INFO_KEY.toString())
        }
         catch (e: Throwable) {
            console.log("get token error,`{}`", e, " at uni_modules/m-unix/components/m-tools/LoginObject.uts:36")
            return null
        }
    }
    open fun login(userInfo: StoreMemberVo): Unit {
        this.setMemberInfo(userInfo)
    }
    open fun logout() {
        CacheUtil.remove(StorageEnum__1.MEMBER_INFO_KEY.toString())
    }
    open fun isLogin(): Boolean {
        return this.getMemberInfo() != null
    }
}
val authTrigger = ref(0)
fun notifyAuthChange(): Unit {
    authTrigger.value++
}
fun tokenKey(): String {
    return getHostProjectConfig().storage.token
}
fun userInfoKey(): String {
    return getHostProjectConfig().storage.userInfo
}
open class StorageApi (
    open var get: (key: String) -> Any?,
    open var set: (key: String, value: Any) -> Unit,
    open var remove: (key: String) -> Unit,
    open var clear: () -> Unit,
    open var getToken: () -> String,
    open var setToken: (token: String) -> Unit,
    open var getUserInfo: () -> Any?,
    open var setUserInfo: (info: Any) -> Unit,
    open var clearAuth: () -> Unit,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("StorageApi", "uni_modules/m-unix/components/m-tools/Storage.uts", 13, 6)
    }
}
fun storageGet(key: String): Any? {
    try {
        val kVal = uni_getStorageSync(key) as Any
        return kVal
    }
     catch (e: Throwable) {
        return null
    }
}
fun storageSet(key: String, value: Any): Unit {
    try {
        uni_setStorageSync(key, value)
    }
     catch (e: Throwable) {
        console.error("storage set error", e, " at uni_modules/m-unix/components/m-tools/Storage.uts:41")
    }
}
fun storageRemove(key: String): Unit {
    try {
        uni_removeStorageSync(key)
    }
     catch (e: Throwable) {
        console.error("storage remove error", e, " at uni_modules/m-unix/components/m-tools/Storage.uts:49")
    }
}
fun storageClear(): Unit {
    try {
        uni_clearStorageSync()
    }
     catch (e: Throwable) {
        console.error("storage clear error", e, " at uni_modules/m-unix/components/m-tools/Storage.uts:57")
    }
}
val storage = StorageApi(get = fun(key: String): Any? {
    return storageGet(key)
}
, set = fun(key: String, value: Any): Unit {
    storageSet(key, value)
}
, remove = fun(key: String): Unit {
    storageRemove(key)
}
, clear = fun(): Unit {
    storageClear()
}
, getToken = fun(): String {
    val token = storageGet(tokenKey())
    return if (token != null) {
        (token as String)
    } else {
        ""
    }
}
, setToken = fun(token: String): Unit {
    storageSet(tokenKey(), token)
    notifyAuthChange()
}
, getUserInfo = fun(): Any? {
    return storageGet(userInfoKey())
}
, setUserInfo = fun(info: Any): Unit {
    storageSet(userInfoKey(), info)
    notifyAuthChange()
}
, clearAuth = fun(): Unit {
    storageRemove(tokenKey())
    storageRemove(userInfoKey())
    notifyAuthChange()
}
)
fun isLoggedIn(): Boolean {
    return storage.getToken() != ""
}
fun checkLogin(toPath: String?): Boolean {
    if (isLoggedIn()) {
        return true
    }
    val lp = getHostProjectConfig().loginPagePath
    val loginPath = if (lp.length > 0) {
        lp
    } else {
        "/pages_Me/login/login"
    }
    val url = if (toPath != null && toPath != "") {
        loginPath + "?redirect=" + UTSAndroid.consoleDebugError(encodeURIComponent(toPath), " at uni_modules/m-unix/components/m-tools/Auth.uts:17")
    } else {
        loginPath
    }
    uni_navigateTo(NavigateToOptions(url = url))
    return false
}
fun needLogin(path: String): Boolean {
    val p = path.replace(UTSRegExp("^\\/", ""), "").replace(UTSRegExp("\\.uvue\$", ""), "")
    return getHostProjectConfig().loginRequiredPaths.some(fun(r): Boolean {
        return p.includes(r)
    }
    )
}
open class UploadApiResponse<T> (
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var msg: String,
    @JsonNotNull
    open var data: T,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UploadApiResponse", "uni_modules/m-unix/components/m-tools/Upload.uts", 6, 13)
    }
}
open class UploadFileOptions__1 (
    @JsonNotNull
    open var url: String,
    @JsonNotNull
    open var filePath: String,
    open var name: String? = null,
    open var formData: UTSJSONObject? = null,
    open var baseUrl: String? = null,
    open var withToken: Boolean? = null,
    open var header: UTSJSONObject? = null,
    open var showLoading: Boolean? = null,
    open var loadingText: String? = null,
    open var showError: Boolean? = null,
    open var successCodes: UTSArray<Number>? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UploadFileOptions", "uni_modules/m-unix/components/m-tools/Upload.uts", 11, 13)
    }
}
fun resolveUploadBase(override: String?): String {
    if (override != null && override !== "") {
        return override
    }
    return getHostProjectConfig().baseUrl
}
fun buildUploadFullUrl(path: String, baseOverride: String?): String {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }
    val base = resolveUploadBase(baseOverride)
    val sep = if (path.startsWith("/")) {
        ""
    } else {
        "/"
    }
    return base + sep + path
}
fun <T> uploadFileRequest(options: UploadFileOptions__1): UTSPromise<UploadApiResponse<T>> {
    val url = options.url
    val filePath = options.filePath
    val name = if (options.name != null && options.name !== "") {
        options.name!!
    } else {
        "file"
    }
    val formData = options.formData
    val baseUrl = options.baseUrl
    val withToken = if (options.withToken != null) {
        options.withToken!!
    } else {
        true
    }
    val header = if (options.header != null) {
        options.header!!
    } else {
        _uO()
    }
    val showLoading = if (options.showLoading != null) {
        options.showLoading!!
    } else {
        false
    }
    val loadingText = if (options.loadingText != null) {
        options.loadingText!!
    } else {
        "上传中..."
    }
    val showError = if (options.showError != null) {
        options.showError!!
    } else {
        true
    }
    val successCodes = if (options.successCodes != null) {
        options.successCodes!!
    } else {
        _uA(
            0,
            200
        )
    }
    val fullUrl = buildUploadFullUrl(url, baseUrl)
    if (showLoading) {
        uni_showLoading(ShowLoadingOptions(title = loadingText, mask = true))
    }
    val reqHeader: UTSJSONObject = header
    if (withToken) {
        val token = storage.getToken()
        if (token !== "") {
            reqHeader["Authorization"] = token
        }
    }
    return UTSPromise(fun(resolve, reject){
        val fd = if (formData != null) {
            formData
        } else {
            _uO()
        }
        uni_uploadFile(UploadFileOptions(url = fullUrl, filePath = filePath, name = name, formData = fd as UTSJSONObject, header = reqHeader as UTSJSONObject, success = fun(res){
            if (showLoading) {
                uni_hideLoading(null)
            }
            var parsed: UploadApiResponse<T>
            try {
                val raw = ((res.data as String) ?: "").replace(UTSRegExp("\\ufeff", "g"), "")
                val json = if (raw !== "") {
                    raw
                } else {
                    "{}"
                }
                parsed = UTSAndroid.consoleDebugError(JSON.parse(json), " at uni_modules/m-unix/components/m-tools/Upload.uts:135") as UploadApiResponse<T>
            }
             catch (e: Throwable) {
                if (showError) {
                    uni_showToast(ShowToastOptions(title = "上传响应解析失败", icon = "none"))
                }
                reject(UploadApiResponse(code = -1, msg = "parse error", data = null))
                return
            }
            val code = parsed.code
            var ok = false
            run {
                var j: Number = 0
                while(j < successCodes.length){
                    if (successCodes[j] === code) {
                        ok = true
                        break
                    }
                    j++
                }
            }
            if (ok) {
                resolve(parsed)
                return
            }
            val m = parsed.msg
            if (showError && m != null && m !== "") {
                uni_showToast(ShowToastOptions(title = m, icon = "none"))
            }
            reject(parsed)
        }
        , fail = fun(err){
            if (showLoading) {
                uni_hideLoading(null)
            }
            if (showError) {
                uni_showToast(ShowToastOptions(title = "上传失败", icon = "none"))
            }
            reject(UploadApiResponse(code = -1, msg = "network", data = err))
        }
        ))
    }
    )
}
typealias HttpMethod = String
open class ApiResponse<T> (
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var msg: String,
    @JsonNotNull
    open var data: T,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ApiResponse", "uni_modules/m-unix/components/m-tools/Request.uts", 13, 13)
    }
}
val systemInfo = uni_getSystemInfoSync()
val DEFAULT_LANGUAGE = (systemInfo.language ?: "zh_CN").replace("-", "_") as String
val runBlock5 = run {
    console.log("DEFAULT_LANGUAGE", DEFAULT_LANGUAGE, " at uni_modules/m-unix/components/m-tools/Request.uts:25")
}
open class RequestOptions__1 (
    @JsonNotNull
    open var url: String,
    open var method: HttpMethod? = null,
    open var data: UTSJSONObject? = null,
    open var header: UTSJSONObject? = null,
    open var baseUrl: String? = null,
    open var timeout: Number? = null,
    open var withToken: Boolean? = null,
    open var showError: Boolean? = null,
    open var showLoading: Boolean? = null,
    open var loadingText: String? = null,
    open var redirectOnUnauthorized: Boolean? = null,
    open var loginPage: String? = null,
    open var successCodes: UTSArray<Number>? = null,
    open var unauthorizedCodes: UTSArray<Number>? = null,
    open var onErrorCode: ((response: ApiResponse<Any>) -> Unit)? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RequestOptions", "uni_modules/m-unix/components/m-tools/Request.uts", 22, 13)
    }
}
val DEFAULT_TIMEOUT: Number = 30000
val DEFAULT_SUCCESS_CODES: UTSArray<Number> = _uA(
    0,
    200
)
val DEFAULT_UNAUTHORIZED_CODES: UTSArray<Number> = _uA(
    401,
    403
)
val DEFAULT_LOGIN_PAGE = "/pages_Me/login/login"
fun buildUrl(url: String, baseUrl: String): String {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url
    }
    return baseUrl + (if (url.startsWith("/")) {
        ""
    } else {
        "/"
    }
    ) + url
}
fun buildQueryString(data: UTSJSONObject): String {
    val parts: UTSArray<String> = _uA()
    for(key in resolveUTSKeyIterator(data)){
        val value = data.getString(key)
        if (value != null && value.length > 0) {
            parts.push(key + "=" + UTSAndroid.consoleDebugError(encodeURIComponent(value), " at uni_modules/m-unix/components/m-tools/Request.uts:83"))
        }
    }
    return if (parts.length > 0) {
        "?" + parts.join("&")
    } else {
        ""
    }
}
fun showLoadingModal(text: String): Unit {
    uni_showLoading(ShowLoadingOptions(title = text, mask = true))
}
fun hideLoadingModal(): Unit {
    uni_hideLoading(null)
}
fun showErrorToast(msg: String): Unit {
    uni_showToast(ShowToastOptions(title = if (msg != "") {
        msg
    } else {
        "请求失败"
    }
    , icon = "none"))
}
fun navigateToLogin(loginPage: String): Unit {
    storage.clearAuth()
    uni_showToast(ShowToastOptions(title = "请先登录", icon = "none"))
    setTimeout(fun(){
        uni_navigateTo(NavigateToOptions(url = loginPage))
        return
    }
    , 1200)
}
fun createRequestOptions(url: String, method: HttpMethod, data: UTSJSONObject?, options: RequestOptions__1?): RequestOptions__1 {
    val out = RequestOptions__1(url = url, method = method, data = data)
    if (options == null) {
        return out
    }
    if (options.header != null) {
        out.header = options.header
    }
    if (options.baseUrl != null) {
        out.baseUrl = options.baseUrl
    }
    if (options.timeout != null) {
        out.timeout = options.timeout
    }
    if (options.withToken != null) {
        out.withToken = options.withToken
    }
    if (options.showError != null) {
        out.showError = options.showError
    }
    if (options.showLoading != null) {
        out.showLoading = options.showLoading
    }
    if (options.loadingText != null) {
        out.loadingText = options.loadingText
    }
    if (options.redirectOnUnauthorized != null) {
        out.redirectOnUnauthorized = options.redirectOnUnauthorized
    }
    if (options.loginPage != null) {
        out.loginPage = options.loginPage
    }
    if (options.successCodes != null) {
        out.successCodes = options.successCodes
    }
    if (options.unauthorizedCodes != null) {
        out.unauthorizedCodes = options.unauthorizedCodes
    }
    if (options.onErrorCode != null) {
        out.onErrorCode = options.onErrorCode
    }
    return out
}
fun copyRequestOptions(options: RequestOptions__1): RequestOptions__1 {
    return createRequestOptions(options.url, options.method ?: "GET", options.data, options)
}
fun <T> request(options: RequestOptions__1): UTSPromise<ApiResponse<T>> {
    val url = options.url
    val _options_method = options.method
    val method = if (_options_method == null) {
        "GET"
    } else {
        _options_method
    }
    val data = options.data
    val header = options.header
    val baseUrl = options.baseUrl
    val _options_timeout = options.timeout
    val timeout = if (_options_timeout == null) {
        DEFAULT_TIMEOUT
    } else {
        _options_timeout
    }
    val _options_withToken = options.withToken
    val withToken = if (_options_withToken == null) {
        false
    } else {
        _options_withToken
    }
    val _options_showError = options.showError
    val showError = if (_options_showError == null) {
        true
    } else {
        _options_showError
    }
    val _options_showLoading = options.showLoading
    val showLoading = if (_options_showLoading == null) {
        false
    } else {
        _options_showLoading
    }
    val loadingText = options.loadingText
    val _options_redirectOnUnauthorized = options.redirectOnUnauthorized
    val redirectOnUnauthorized = if (_options_redirectOnUnauthorized == null) {
        true
    } else {
        _options_redirectOnUnauthorized
    }
    val loginPage = options.loginPage
    val successCodes = options.successCodes
    val unauthorizedCodes = options.unauthorizedCodes
    val onErrorCode = options.onErrorCode
    if (showLoading) {
        showLoadingModal(loadingText ?: "加载中...")
    }
    val base = baseUrl ?: getHostProjectConfig().baseUrl
    var fullUrl = buildUrl(url, base)
    var requestData = data
    if (method === "GET" && data != null) {
        fullUrl += buildQueryString(data)
        requestData = _uO()
    }
    val reqHeader: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("reqHeader", "uni_modules/m-unix/components/m-tools/Request.uts", 187, 11), "Content-Type" to "application/json", "Accept" to "application/json", "Content-Language" to DEFAULT_LANGUAGE)
    console.log("request", withToken, " at uni_modules/m-unix/components/m-tools/Request.uts:233")
    if (withToken) {
        val token = getToken()
        console.log("otken", token, " at uni_modules/m-unix/components/m-tools/Request.uts:238")
        if (token != "") {
            reqHeader["token"] = token
        }
    }
    val finalSuccessCodes = successCodes ?: DEFAULT_SUCCESS_CODES
    val finalUnauthorizedCodes = unauthorizedCodes ?: DEFAULT_UNAUTHORIZED_CODES
    val hpLogin = getHostProjectConfig().loginPagePath
    val finalLoginPage = loginPage ?: (if (hpLogin.length > 0) {
        hpLogin
    } else {
        DEFAULT_LOGIN_PAGE
    }
    )
    return UTSPromise(fun(resolve, reject){
        uni_request<Any>(RequestOptions(url = fullUrl, method = method, data = requestData, header = reqHeader as UTSJSONObject, timeout = timeout, success = fun(res){
            if (showLoading) {
                hideLoadingModal()
            }
            val result = res.data as ApiResponse<T>
            val code = result.code
            val msg = result.msg
            val resData = result.data
            if (finalSuccessCodes.indexOf(code) >= 0) {
                resolve(result)
                return
            }
            if (finalUnauthorizedCodes.indexOf(code) >= 0) {
                if (redirectOnUnauthorized) {
                    navigateToLogin(finalLoginPage)
                }
                reject(result)
                return
            }
            if (onErrorCode != null) {
                onErrorCode(result as ApiResponse<Any>)
            }
            if (showError) {
                showErrorToast(msg)
            }
            reject(result)
        }
        , fail = fun(err){
            if (showLoading) {
                hideLoadingModal()
            }
            if (showError) {
                showErrorToast("网络异常，请检查网络连接")
            }
            reject(ApiResponse(code = -1, msg = "网络异常", data = null))
        }
        ))
    }
    )
}
fun <T> get(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<T>> {
    return request<T>(createRequestOptions(url, "GET", data, options))
}
fun <T> post(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<T>> {
    return request<T>(createRequestOptions(url, "POST", data, options))
}
fun <T> put(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<T>> {
    return request<T>(createRequestOptions(url, "PUT", data, options))
}
fun <T> del(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<T>> {
    return request<T>(createRequestOptions(url, "DELETE", data, options))
}
fun <T> publicRequest(options: RequestOptions__1): UTSPromise<ApiResponse<T>> {
    val requestOptions = copyRequestOptions(options)
    requestOptions.withToken = false
    requestOptions.redirectOnUnauthorized = false
    return request<T>(requestOptions)
}
fun <T> silentRequest(options: RequestOptions__1): UTSPromise<ApiResponse<T>> {
    val requestOptions = copyRequestOptions(options)
    requestOptions.showError = false
    requestOptions.redirectOnUnauthorized = false
    return request<T>(requestOptions)
}
fun <T> loadingRequest(options: RequestOptions__1, loadingText: String?): UTSPromise<ApiResponse<T>> {
    val requestOptions = copyRequestOptions(options)
    requestOptions.showLoading = true
    requestOptions.loadingText = if (isTruthy(loadingText)) {
        loadingText
    } else {
        "加载中..."
    }
    return request<T>(requestOptions)
}
val http: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("http", "uni_modules/m-unix/components/m-tools/Request.uts", 314, 14), "get" to fun(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<Any>> {
    return get<Any>(url, data, options)
}
, "post" to fun(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<Any>> {
    return post<Any>(url, data, options)
}
, "put" to fun(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<Any>> {
    return put<Any>(url, data, options)
}
, "delete" to fun(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<Any>> {
    return del<Any>(url, data, options)
}
, "public" to fun(options: RequestOptions__1): UTSPromise<ApiResponse<Any>> {
    return publicRequest<Any>(options)
}
, "silent" to fun(options: RequestOptions__1): UTSPromise<ApiResponse<Any>> {
    return silentRequest<Any>(options)
}
, "loading" to fun(options: RequestOptions__1, loadingText: String?): UTSPromise<ApiResponse<Any>> {
    return loadingRequest<Any>(options, loadingText)
}
, "upload" to fun(options: UploadFileOptions__1): UTSPromise<UploadApiResponse<Any>> {
    return uploadFileRequest<Any>(options)
}
)
fun useAuth(): UTSJSONObject {
    val hasLogin = computed(fun(): Boolean {
        authTrigger.value
        val token = storage.getToken()
        val info = storage.getUserInfo()
        return token != "" || info != null
    }
    )
    val userInfo = computed(fun(): Any {
        authTrigger.value
        return storage.getUserInfo() ?: _uO()
    }
    )
    return _uO("hasLogin" to hasLogin, "userInfo" to userInfo)
}
val M_UI_BUILTIN_APP_LOGO = "/uni_modules/m-unix/static/m-app-logo.png"
val M_UI_BUILTIN_PLACEHOLDER_AVATAR = "/uni_modules/m-unix/static/m-placeholder-avatar.png"
val M_UI_BUILTIN_PLACEHOLDER_ARTICLE = "/uni_modules/m-unix/static/m-placeholder-article.png"
open class MUiPartial (
    open var appName: String? = null,
    open var apiDevelopmentBase: String? = null,
    open var apiProductionBase: String? = null,
    open var agreementRoute: String? = null,
    open var privacyRoute: String? = null,
    open var appLogo: String? = null,
    open var emptyDefaultIcon: String? = null,
    open var avatarDefault: String? = null,
    open var articlePlaceholder: String? = null,
    open var demoImage: String? = null,
    open var qrCodeImageApiBase: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("MUiPartial", "uni_modules/m-unix/config.uts", 29, 13)
    }
}
open class MUiConfig (
    @JsonNotNull
    open var appName: String,
    @JsonNotNull
    open var apiDevelopmentBase: String,
    @JsonNotNull
    open var apiProductionBase: String,
    @JsonNotNull
    open var agreementRoute: String,
    @JsonNotNull
    open var privacyRoute: String,
    @JsonNotNull
    open var appLogo: String,
    @JsonNotNull
    open var emptyDefaultIcon: String,
    @JsonNotNull
    open var avatarDefault: String,
    @JsonNotNull
    open var articlePlaceholder: String,
    @JsonNotNull
    open var demoImage: String,
    @JsonNotNull
    open var qrCodeImageApiBase: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("MUiConfig", "uni_modules/m-unix/config.uts", 51, 13)
    }
}
val M_UI_DEFAULTS = MUiConfig(appName = "mUnix", apiDevelopmentBase = "https://demo.mmsadmin.cn/prod-api", apiProductionBase = "https://demo.mmsadmin.cn/prod-api", agreementRoute = "", privacyRoute = "", appLogo = M_UI_BUILTIN_APP_LOGO, emptyDefaultIcon = "file-common-filling", avatarDefault = M_UI_BUILTIN_PLACEHOLDER_AVATAR, articlePlaceholder = M_UI_BUILTIN_PLACEHOLDER_ARTICLE, demoImage = "https://picsum.photos/200", qrCodeImageApiBase = "https://api.qrserver.com/v1/create-qr-code/")
var mUiRuntime: MUiPartial? = null
fun trimStr(s: Any?): String {
    if (s == null) {
        return ""
    }
    return "" + s
}
fun pickChain(a: String, b: String, c: String, defaultVal: String): String {
    val x = trimStr(a)
    if (x.length > 0) {
        return x
    }
    val y = trimStr(b)
    if (y.length > 0) {
        return y
    }
    val z = trimStr(c)
    if (z.length > 0) {
        return z
    }
    return defaultVal
}
fun pickChain2(a: String, b: String, defaultVal: String): String {
    return pickChain(a, b, "", defaultVal)
}
fun getMUiConfig(): MUiConfig {
    val cfg = getHostProjectConfig()
    val r = if (mUiRuntime != null) {
        mUiRuntime
    } else {
        (MUiPartial())
    }
     as MUiPartial
    val mu = cfg.mUi
    val f = if (mu != null) {
        (mu as MUiPartial)
    } else {
        (MUiPartial())
    }
     as MUiPartial
    val ci = cfg.configInfo
    val api = cfg.api
    return MUiConfig(appName = pickChain(trimStr(r.appName), trimStr(f.appName), trimStr(ci.name), M_UI_DEFAULTS.appName), apiDevelopmentBase = pickChain(trimStr(r.apiDevelopmentBase), trimStr(f.apiDevelopmentBase), trimStr(cfg.baseUrl), M_UI_DEFAULTS.apiDevelopmentBase), apiProductionBase = pickChain2(trimStr(r.apiProductionBase), trimStr(f.apiProductionBase), M_UI_DEFAULTS.apiProductionBase), agreementRoute = pickChain2(trimStr(r.agreementRoute), trimStr(f.agreementRoute), M_UI_DEFAULTS.agreementRoute), privacyRoute = pickChain2(trimStr(r.privacyRoute), trimStr(f.privacyRoute), M_UI_DEFAULTS.privacyRoute), appLogo = pickChain(trimStr(r.appLogo), trimStr(f.appLogo), trimStr(ci.logo), M_UI_DEFAULTS.appLogo), emptyDefaultIcon = pickChain2(trimStr(r.emptyDefaultIcon), trimStr(f.emptyDefaultIcon), M_UI_DEFAULTS.emptyDefaultIcon), avatarDefault = pickChain2(trimStr(r.avatarDefault), trimStr(f.avatarDefault), M_UI_DEFAULTS.avatarDefault), articlePlaceholder = pickChain2(trimStr(r.articlePlaceholder), trimStr(f.articlePlaceholder), M_UI_DEFAULTS.articlePlaceholder), demoImage = pickChain2(trimStr(r.demoImage), trimStr(f.demoImage), M_UI_DEFAULTS.demoImage), qrCodeImageApiBase = pickChain(trimStr(r.qrCodeImageApiBase), trimStr(f.qrCodeImageApiBase), trimStr(api.qrCodeImageApiBase), M_UI_DEFAULTS.qrCodeImageApiBase))
}
fun stringify(value: Any): String {
    return "" + value
}
fun trimCompat(value: String): String {
    return value.replace(UTSRegExp("^\\s+|\\s+\$", "g"), "")
}
val tabBarPaths = _uA(
    "/pages/components/components",
    "/pages/tools/tools",
    "/pages/templates/templates",
    "/pages/user/user"
)
fun jumpTo(url: String, type: String = "to") {
    if (url == "") {
        return
    }
    val path = url.split("?")[0]
    if (tabBarPaths.indexOf(path) >= 0) {
        uni_switchTab(SwitchTabOptions(url = url))
        return
    }
    if (type === "redirectTo") {
        uni_redirectTo(RedirectToOptions(url = url))
    } else {
        uni_navigateTo(NavigateToOptions(url = url))
    }
}
fun checkPhone(phone: String): Boolean {
    val regexPhone = UTSRegExp("^1[3-9]\\d{9}\$", "")
    return regexPhone.test(phone)
}
fun get__1(key: String): Any? {
    try {
        val kVal = uni_getStorageSync(key) as Any
        return kVal
    }
     catch (e: Throwable) {
        return null
    }
}
fun set(key: String, value: Any) {
    try {
        uni_setStorageSync(key, value)
    }
     catch (e: Throwable) {
        console.error("ut set error", e, " at uni_modules/m-unix/components/m-tools/Ut.uts:92")
    }
}
fun jslog(title: String, obj: Any) {
    if (title == "" || obj == null) {
        return
    }
    console.log("【打印】:" + title + "=>", JSON.stringify(obj), " at uni_modules/m-unix/components/m-tools/Ut.uts:99")
}
fun apiStart() {
    uni_showLoading(ShowLoadingOptions(title = "加载中..."))
}
fun apiStop() {
    uni_hideLoading(null)
}
fun isEmpty(content: Any?): Boolean {
    if (content == null) {
        return true
    }
    val s = content as String
    return trimCompat(s) == ""
}
fun checkNumber(number: String): Boolean {
    val regexCard = UTSRegExp("^(^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}(\\d|X|x)?\$)\$", "")
    return regexCard.test(number)
}
open class MoneyUnitValue (
    @JsonNotNull
    open var num: String,
    @JsonNotNull
    open var unit: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("MoneyUnitValue", "uni_modules/m-unix/components/m-tools/Ut.uts", 103, 13)
    }
}
fun changeMoney(num: Number): MoneyUnitValue {
    val n = num
    if (n <= 1) {
        return MoneyUnitValue(num = stringify(n), unit = "元")
    }
    val units = _uA(
        "元",
        "万",
        "亿",
        "万亿"
    )
    var curNum = n
    var curUnit = units[0]
    run {
        var i: Number = 0
        while(i < 4){
            curUnit = units[i]
            if (strNumSize(curNum) < 5) {
                break
            }
            curNum = curNum / 10000
            i++
        }
    }
    return MoneyUnitValue(num = curNum.toFixed(2), unit = curUnit)
}
fun strNumSize(tempNum: Number): Number {
    val s = tempNum.toString(10)
    val idx = s.indexOf(".")
    val newNum = if (idx != -1) {
        s.substring(0, idx)
    } else {
        s
    }
    return newNum.length
}
fun timestampToDate(timestamp: Number): String {
    val date = Date(timestamp)
    val year = date.getFullYear()
    val month = ("0" + (date.getMonth() + 1)).slice(-2)
    val day = ("0" + date.getDate()).slice(-2)
    return year + "." + month + "." + day
}
fun getTodayStartTimestamp(): Number {
    val now = Date()
    now.setHours(0, 0, 0, 0)
    return now.getTime()
}
fun validateEmail(email: String): Boolean {
    val emailRegex = UTSRegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+\$", "")
    return emailRegex.test(email)
}
fun maskPhoneNumber(phoneNumber: Any?): String {
    if (phoneNumber == null) {
        return ""
    }
    val phone = phoneNumber as String
    if (phone.length != 11) {
        return phone
    }
    return phone.substring(0, 3) + "****" + phone.substring(7, 11)
}
fun generateOrderNumber(): String {
    val date = Date()
    val y = date.getFullYear()
    val m = (date.getMonth() + 1).toString(10).padStart(2, "0")
    val d = date.getDate().toString(10).padStart(2, "0")
    val h = date.getHours().toString(10).padStart(2, "0")
    val min = date.getMinutes().toString(10).padStart(2, "0")
    val s = date.getSeconds().toString(10).padStart(2, "0")
    val ms = date.getMilliseconds().toString(10).padEnd(3, "0")
    val rand = Math.floor(1000 + Math.random() * 9000).toString(10)
    return "" + y + m + d + h + min + s + ms + rand
}
fun toCssLength(value: Any): String {
    if (UTSAndroid.`typeof`(value) === "number") {
        return (value as Number) + "rpx"
    }
    val s = trimCompat(value as String)
    if (s.length === 0) {
        return "0rpx"
    }
    val len = s.length
    if (len >= 3 && s.substring(len - 3) === "rpx") {
        return s
    }
    if (len >= 2 && s.substring(len - 2) === "px") {
        return s
    }
    if (len >= 1 && s.substring(len - 1) === "%") {
        return s
    }
    if (len >= 2 && s.substring(len - 2) === "em") {
        return s
    }
    val n = parseFloat(s)
    if (!isNaN(n)) {
        return n + "rpx"
    }
    return s
}
fun parseCssNumber(value: Any): Number {
    if (UTSAndroid.`typeof`(value) === "number") {
        return value as Number
    }
    val s = trimCompat(value as String)
    if (s.length === 0) {
        return 0
    }
    val len = s.length
    if (len >= 3 && s.substring(len - 3) === "rpx") {
        return parseFloat(s.substring(0, len - 3))
    }
    if (len >= 2 && s.substring(len - 2) === "px") {
        return parseFloat(s.substring(0, len - 2))
    }
    return parseFloat(s)
}
val mConfigInfo = fun(): UTSJSONObject {
    val c = getMUiConfig()
    return _uO("development" to c.apiDevelopmentBase, "production" to c.apiProductionBase, "name" to c.appName, "logo" to c.appLogo, "agreement" to c.agreementRoute, "privacy" to c.privacyRoute)
}
val mToastMsg = fun(text: String){
    uni_showToast(ShowToastOptions(title = if (text != "") {
        text
    } else {
        "出错啦~"
    }
    , icon = "none", duration = 2000))
}
fun <T> parseApiEnvelope(raw: Any): R<Any>? {
    if (raw == null) {
        return null
    }
    if (UTSAndroid.`typeof`(raw) === "object") {
        return raw as R<Any>
    }
    if (UTSAndroid.`typeof`(raw) === "string") {
        val s = trimCompat(raw as String)
        if (s.length === 0) {
            return null
        }
        try {
            return UTSAndroid.consoleDebugError(JSON.parse(s), " at uni_modules/m-unix/components/m-tools/Ut.uts:367") as R<Any>
        }
         catch (e: Throwable) {
            val preview = if (s.length > 80) {
                s.substring(0, 80) + "…"
            } else {
                s
            }
            throw UTSError("接口返回非JSON：" + preview)
        }
    }
    throw UTSError("无法解析的响应类型")
}
fun httpStatusError(statusCode: Number, resData: Any): UTSError {
    var detail = ""
    if (UTSAndroid.`typeof`(resData) === "string") {
        val s = trimCompat(resData as String)
        if (s.length > 0) {
            detail = if (s.length > 160) {
                s.substring(0, 160) + "…"
            } else {
                s
            }
        }
    }
    val base = "HTTP错误[" + statusCode.toString(10) + "]"
    if (detail.length > 0) {
        return UTSError(base + "：" + detail)
    }
    return UTSError(base)
}
val getReqUrl = fun(): String {
    val env = "development"
    val config = mConfigInfo()
    if (env == "production") {
        return config["production"] as String
    }
    if (env == "development") {
        return config["development"] as String
    }
    console.error("未知环境: " + env, " at uni_modules/m-unix/components/m-tools/Ut.uts:432")
    return ""
}
val showLoading = fun(title: String?, mask: Boolean?){
    val useMask = if (mask == null) {
        true
    } else {
        mask
    }
    uni_showLoading(ShowLoadingOptions(mask = useMask, title = if (isTruthy(title)) {
        title
    } else {
        "请稍候..."
    }
    ))
}
val tools: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("tools", "uni_modules/m-unix/components/m-tools/Ut.uts", 409, 7), "configInfo" to mConfigInfo, "getReqUrl" to getReqUrl, "msg" to mToastMsg, "showLoading" to showLoading, "hideLoading" to fun(): Unit {
    uni_hideLoading(null)
}
, "global" to fun(): UTSJSONObject {
    val global: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("global", "uni_modules/m-unix/components/m-tools/Ut.uts", 424, 15), "primary" to "#5677fc", "danger" to "#FD7783", "warning" to "#ff7900", "success" to "#07c160", "blue" to "#007aff")
    return global
}
, "getRef" to fun(than: Any, name: String): Any {
    var refs = (than as UTSJSONObject)["\$refs"] as UTSJSONObject
    var toastRef = refs[name] as Any
    return toastRef
}
, "showTips" to fun(than: Any, name: String, msg: String) {
    uni_showToast(ShowToastOptions(title = msg, icon = "none", duration = 2000))
}
, "toast" to fun(text: String, time: Number?, icon: Boolean?){
    uni_showToast(ShowToastOptions(title = if (text != "") {
        text
    } else {
        "出错啦~"
    }
    , icon = if (isTruthy(icon)) {
        "success"
    } else {
        "none"
    }
    , duration = if (isTruthy(time)) {
        time
    } else {
        2000
    }
    ))
}
, "modal" to fun(title: String, content: String, showCancel: Boolean, callback: (success: Boolean) -> Unit?, confirmColor: String?, confirmText: String?){
    val cb = callback
    uni_showModal(ShowModalOptions(title = if (title != "") {
        title
    } else {
        "提示"
    }
    , content = content, showCancel = showCancel, cancelColor = "#555", confirmColor = if (isTruthy(confirmColor)) {
        confirmColor
    } else {
        "#5677fc"
    }
    , confirmText = if (isTruthy(confirmText)) {
        confirmText
    } else {
        "确定"
    }
    , success = fun(res) {
        if (res.confirm) {
            if (cb != null) {
                cb(true)
            }
        } else {
            if (cb != null) {
                cb(false)
            }
        }
    }
    ))
}
, "isLogin" to fun(): Boolean {
    return LoginObject().isLogin()
}
, "getMemberInfo" to fun(): StoreMemberVo? {
    return LoginObject().getMemberInfo()
}
, "login" to fun(memberInfo: StoreMemberVo): Unit {
    LoginObject().setMemberInfo(memberInfo)
}
, "logout" to fun(): Unit {
    LoginObject().logout()
}
, "getTitleBarHeight" to fun(): Number {
    var systemInfo = uni_getSystemInfoSync()
    var statusBarHeight = if (systemInfo.statusBarHeight != 0) {
        systemInfo.statusBarHeight
    } else {
        0
    }
    var titleBarHeight: Number = 0
    titleBarHeight = 44
    return statusBarHeight + titleBarHeight
}
, "href" to fun(url: String, paramsOrVerify: Any?, isLogin: Boolean?, target: String?): Unit {
    var needVerify = if (isLogin == null) {
        false
    } else {
        isLogin
    }
    var openTarget = if (target == null) {
        "_blank"
    } else {
        target
    }
    var query = ""
    if (UTSAndroid.`typeof`(paramsOrVerify) === "boolean") {
        needVerify = paramsOrVerify as Boolean
    } else if (UTSAndroid.`typeof`(paramsOrVerify) === "string") {
        openTarget = paramsOrVerify as String
    }
    if (needVerify && !LoginObject().isLogin()) {
        uni_navigateTo(NavigateToOptions(url = "/pages/me/login"))
        return console.error("登录失效", " at uni_modules/m-unix/components/m-tools/Ut.uts:595")
    }
    if (!(url != "")) {
        return console.error("跳转路径不能为空", " at uni_modules/m-unix/components/m-tools/Ut.uts:597")
    }
    val endUrl = url + (if (query.length > 0) {
        "?" + query
    } else {
        ""
    }
    )
    if (url.startsWith("/pages/tab/")) {
        uni_switchTab(SwitchTabOptions(url = endUrl))
        return
    }
    if (getCurrentPages().length >= 9) {
        uni_redirectTo(RedirectToOptions(url = endUrl))
        return
    }
    if (openTarget === "_self") {
        uni_redirectTo(RedirectToOptions(url = endUrl))
        return
    }
    uni_navigateTo(NavigateToOptions(url = endUrl, animationType = "slide-in-right"))
}
, "back" to fun(delta: Number?) {
    val backDelta = if (delta == null) {
        1
    } else {
        delta
    }
    console.log("Back", " at uni_modules/m-unix/components/m-tools/Ut.uts:617")
    uni_navigateBack(NavigateBackOptions(delta = backDelta, animationType = "slide-out-left"))
}
, "upx2px" to fun(upx: Number, def: Number?): Number {
    return upx * 2
}
, "runType" to fun(): RunType__1 {
    when (uni_getDeviceInfo(null).platform) {
        "android" -> 
            {
                console.log("运行Android上", " at uni_modules/m-unix/components/m-tools/Ut.uts:629")
                return RunType__1.Android
            }
        "ios" -> 
            {
                console.log("运行iOS上", " at uni_modules/m-unix/components/m-tools/Ut.uts:632")
                return RunType__1.IOS
            }
        "harmonyos" -> 
            {
                console.log("运行鸿蒙系统上", " at uni_modules/m-unix/components/m-tools/Ut.uts:635")
                return RunType__1.HarmonyOs
            }
        "mac" -> 
            {
                console.log("运行mac上", " at uni_modules/m-unix/components/m-tools/Ut.uts:638")
                return RunType__1.IOS
            }
        "windows" -> 
            {
                console.log("运行Windows上", " at uni_modules/m-unix/components/m-tools/Ut.uts:641")
                return RunType__1.Windows
            }
        else -> 
            {
                console.log("运行在开发者工具上", " at uni_modules/m-unix/components/m-tools/Ut.uts:644")
                return RunType__1.WxAppl
            }
    }
}
, "trim" to fun(value: String): String {
    return value.replace(UTSRegExp("(^\\s*)|(\\s*\$)", "g"), "")
}
, "replaceAll" to fun(text: String, repstr: String, newstr: String): String {
    return text.replace(UTSRegExp(repstr, "gm"), newstr)
}
, "formatNumber" to fun(num: String): String {
    return if (num.length === 11) {
        num.replace(UTSRegExp("^(\\d{3})\\d{4}(\\d{4})\$", ""), "\$1****\$2")
    } else {
        num
    }
}
, "rmoney" to fun(money: String): String {
    return parseFloat(money).toFixed(2).toString().split("").reverse().join("").replace(UTSRegExp("(\\d{3})", "g"), "\$1,").replace(UTSRegExp("\\,\$", ""), "").split("").reverse().join("")
}
, "formatDate" to fun(reassignedFormatStr: String, reassignedFdate: String): String {
    var fdate = reassignedFdate
    var formatStr = reassignedFormatStr
    if (fdate != "") {
        if (fdate.indexOf(".").inv() != 0) {
            fdate = fdate.substring(0, fdate.indexOf("."))
        }
        fdate = fdate.toString().replace("T", " ").replace(UTSRegExp("\\-", "g"), "/")
        var fStr = "ymdhis"
        if (!(formatStr != "")) {
            formatStr = "y-m-d h:i:s"
        }
        var fTime = Date(fdate)
        var month = fTime.getMonth() + 1
        var day = fTime.getDate()
        var hours = fTime.getHours()
        var minu = fTime.getMinutes()
        var second = fTime.getSeconds()
        var monthStr = if (month < 10) {
            "0" + month
        } else {
            month.toString(10)
        }
        var dayStr = if (day < 10) {
            "0" + day
        } else {
            day.toString(10)
        }
        var hoursStr = if (hours < 10) {
            "0" + hours
        } else {
            hours.toString(10)
        }
        var minuStr = if (minu < 10) {
            "0" + minu
        } else {
            minu.toString(10)
        }
        var secondStr = if (second < 10) {
            "0" + second
        } else {
            second.toString(10)
        }
        var formatArr = _uA(
            fTime.getFullYear().toString(10),
            monthStr,
            dayStr,
            hoursStr,
            minuStr,
            secondStr
        )
        run {
            var i: Number = 0
            while(i < formatArr.length){
                formatStr = formatStr.replace(fStr.charAt(i), formatArr[i])
                i++
            }
        }
        return formatStr
    } else {
        return ""
    }
}
, "loadding" to false as Boolean, "loaddingTaskTime" to null as Number?, "httpGet" to fun(url: String, params: Any, showMgs: Boolean?): UTSPromise<Any> {
    return UTSPromise(fun(resolve, reject){
        var isTimeout = false
        var requestTask: Any? = null
        uni_showLoading(ShowLoadingOptions(title = "加载中", mask = true))
        val timeoutId = setTimeout(fun(){
            isTimeout = true
            uni_hideLoading(null)
            mToastMsg("请求超时，请重试")
            reject(UTSError("Request timeout"))
        }
        , 5000)
        val queryString = ""
        val finalUrl = "" + getReqUrl() + url + (if (queryString.length > 0) {
            (if (url.includes("?")) {
                "&"
            } else {
                "?"
            }) + queryString
        } else {
            ""
        }
        )
        requestTask = uni_request<Any>(RequestOptions(url = finalUrl, header = _uO("Authorization" to LoginObject().getToken()), method = "GET", dataType = "text", success = fun(res){
            clearTimeout(timeoutId)
            uni_hideLoading(null)
            if (res.statusCode === 200) {
                var response: R<Any>? = null
                try {
                    response = parseApiEnvelope<Any>(res.data as Any)
                } catch (e: Throwable) {
                    val m = if (e is UTSError) {
                        (e as UTSError).message
                    } else {
                        "" + e
                    }
                    reject(UTSError(m))
                    return
                }
                if (!isTruthy(response)) {
                    reject(UTSError("响应为空"))
                    return
                }
                val resp = response as R<Any>
                if (resp.code === 403) {
                    reject(UTSError(if (resp.msg != null && resp.msg.length > 0) {
                        resp.msg
                    } else {
                        "请重新登录"
                    }
                    ))
                    return
                }
                if (resp.code === 200) {
                    resolve(resp.data)
                } else {
                    if (isTruthy(showMgs)) {
                        mToastMsg(if (resp.msg != null && resp.msg.length > 0) {
                            resp.msg
                        } else {
                            "请求处理失败"
                        }
                        )
                    }
                    reject(UTSError(if (resp.msg != null) {
                        resp.msg
                    } else {
                        "请求处理失败"
                    }))
                }
            } else {
                reject(httpStatusError(res.statusCode, res.data as Any))
            }
        }
        , fail = fun(err){
            clearTimeout(timeoutId)
            uni_hideLoading(null)
            if (!isTimeout && err.errMsg !== "request:fail abort") {
                mToastMsg("网络连接异常，请检查网络")
            }
            reject(err)
        }
        , complete = fun(_){
            null
        }
        ))
    }
    )
}
, "httpPost" to fun(url: String, params: Any): UTSPromise<Any> {
    return UTSPromise(fun(resolve, reject){
        var isTimeout = false
        var requestTask: Any? = null
        uni_showLoading(ShowLoadingOptions(title = "加载中", mask = true))
        val timeoutId = setTimeout(fun(){
            isTimeout = true
            uni_hideLoading(null)
            mToastMsg("请求超时，请重试")
            reject(UTSError("Request timeout"))
        }
        , 5000)
        val finalUrl = "" + getReqUrl() + url
        requestTask = uni_request<Any>(RequestOptions(url = finalUrl, method = "POST", header = _uO("Authorization" to LoginObject().getToken(), "Content-Type" to "application/json"), data = params, dataType = "text", success = fun(res){
            clearTimeout(timeoutId)
            uni_hideLoading(null)
            if (res.statusCode === 200) {
                var response: R<Any>? = null
                try {
                    response = parseApiEnvelope<Any>(res.data as Any)
                } catch (e: Throwable) {
                    val m = if (e is UTSError) {
                        (e as UTSError).message
                    } else {
                        "" + e
                    }
                    reject(UTSError(m))
                    return
                }
                if (!isTruthy(response)) {
                    reject(UTSError("响应为空"))
                    return
                }
                val resp = response as R<Any>
                if (resp.code === 403) {
                    reject(UTSError(if (resp.msg != null && resp.msg.length > 0) {
                        resp.msg
                    } else {
                        "请重新登录"
                    }
                    ))
                    return
                }
                if (resp.code === 200) {
                    resolve(resp.data)
                } else {
                    mToastMsg(if (resp.msg != null && resp.msg.length > 0) {
                        resp.msg
                    } else {
                        "请求处理失败"
                    })
                    reject(UTSError(if (resp.msg != null) {
                        resp.msg
                    } else {
                        "请求处理失败"
                    }))
                }
            } else {
                reject(httpStatusError(res.statusCode, res.data as Any))
            }
        }
        , fail = fun(err){
            clearTimeout(timeoutId)
            uni_hideLoading(null)
            if (!isTimeout && err.errMsg !== "request:fail abort") {
                mToastMsg("网络连接异常，请检查网络")
            }
            reject(err)
        }
        , complete = fun(_){
            null
        }
        ))
    }
    )
}
, "uploadFile" to fun(url: String, filePath: String): UTSPromise<Any> {
    showLoading(null, null)
    return UTSPromise(fun(resolve, reject){
        val uploadTask: UploadTask = uni_uploadFile(UploadFileOptions(url = getReqUrl() + url, filePath = filePath, name = "imageFile", header = _uO("Authorization" to LoginObject().getToken()), success = fun(res) {
            uni_hideLoading(null)
            var d: R<Any>? = null
            try {
                var responseText = res.data.replace(UTSRegExp("\\ufeff", "g"), "")
                if (responseText.length === 0) {
                    responseText = "{}"
                }
                d = UTSAndroid.consoleDebugError(JSON.parse(responseText), " at uni_modules/m-unix/components/m-tools/Ut.uts:861") as R<Any>
            }
             catch (e: Throwable) {
                reject(e)
                mToastMsg("上传响应解析失败")
                return
            }
            if (d == null) {
                reject(UTSError("empty upload response"))
                return
            }
            val resp = d as R<Any>
            if (resp.code == 200) {
                var fileObj = resp.data
                resolve(fileObj)
            } else {
                mToastMsg(if (resp.msg != null && resp.msg.length > 0) {
                    resp.msg
                } else {
                    "上传失败"
                }
                )
                reject(UTSError(if (resp.msg != null) {
                    resp.msg
                } else {
                    "上传失败"
                }
                ))
            }
        }
        , fail = fun(res) {
            reject(res)
            mToastMsg("系统繁忙！")
        }
        ))
    }
    )
}
, "storage" to storage, "isLoggedIn" to fun(): Boolean {
    return isLoggedIn()
}
, "checkLogin" to fun(toPath: String?): Boolean {
    return checkLogin(toPath)
}
, "needLogin" to fun(path: String): Boolean {
    return needLogin(path)
}
, "request" to fun(options: RequestOptions__1): UTSPromise<ApiResponse<Any>> {
    return request<Any>(options)
}
, "http" to http, "jumpTo" to fun(url: String, type: String?): Unit {
    return jumpTo(url, if (type == null) {
        "to"
    } else {
        type
    }
    )
}
, "checkPhone" to fun(phone: String): Boolean {
    return checkPhone(phone)
}
, "get" to fun(key: String): Any? {
    return get__1(key)
}
, "set" to fun(key: String, value: Any): Unit {
    return set(key, value)
}
, "jslog" to fun(title: String, obj: Any): Unit {
    return jslog(title, obj)
}
, "apiStart" to fun(): Unit {
    return apiStart()
}
, "apiStop" to fun(): Unit {
    return apiStop()
}
, "isEmpty" to fun(content: Any?): Boolean {
    return isEmpty(content)
}
, "checkNumber" to fun(number: String): Boolean {
    return checkNumber(number)
}
, "changeMoney" to fun(num: Number): MoneyUnitValue {
    return changeMoney(num)
}
, "timestampToDate" to fun(timestamp: Number): String {
    return timestampToDate(timestamp)
}
, "getTodayStartTimestamp" to fun(): Number {
    return getTodayStartTimestamp()
}
, "validateEmail" to fun(email: String): Boolean {
    return validateEmail(email)
}
, "maskPhoneNumber" to fun(phoneNumber: Any?): String {
    return maskPhoneNumber(phoneNumber)
}
, "generateOrderNumber" to fun(): String {
    return generateOrderNumber()
}
, "useAuth" to fun(): UTSJSONObject {
    return useAuth()
}
)
val GenUniModulesMUnixComponentsMLoadingMLoadingClass = CreateVueComponent(GenUniModulesMUnixComponentsMLoadingMLoading::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMLoadingMLoading.name, inheritAttrs = GenUniModulesMUnixComponentsMLoadingMLoading.inheritAttrs, inject = GenUniModulesMUnixComponentsMLoadingMLoading.inject, props = GenUniModulesMUnixComponentsMLoadingMLoading.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMLoadingMLoading.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMLoadingMLoading.emits, components = GenUniModulesMUnixComponentsMLoadingMLoading.components, styles = GenUniModulesMUnixComponentsMLoadingMLoading.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMLoadingMLoading {
    return GenUniModulesMUnixComponentsMLoadingMLoading(instance)
}
)
val GenUniModulesMUnixComponentsMButtonMButtonClass = CreateVueComponent(GenUniModulesMUnixComponentsMButtonMButton::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMButtonMButton.name, inheritAttrs = GenUniModulesMUnixComponentsMButtonMButton.inheritAttrs, inject = GenUniModulesMUnixComponentsMButtonMButton.inject, props = GenUniModulesMUnixComponentsMButtonMButton.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMButtonMButton.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMButtonMButton.emits, components = GenUniModulesMUnixComponentsMButtonMButton.components, styles = GenUniModulesMUnixComponentsMButtonMButton.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMButtonMButton {
    return GenUniModulesMUnixComponentsMButtonMButton(instance)
}
)
val GenUniModulesMUnixComponentsMTagMTagClass = CreateVueComponent(GenUniModulesMUnixComponentsMTagMTag::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMTagMTag.name, inheritAttrs = GenUniModulesMUnixComponentsMTagMTag.inheritAttrs, inject = GenUniModulesMUnixComponentsMTagMTag.inject, props = GenUniModulesMUnixComponentsMTagMTag.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMTagMTag.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMTagMTag.emits, components = GenUniModulesMUnixComponentsMTagMTag.components, styles = GenUniModulesMUnixComponentsMTagMTag.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMTagMTag {
    return GenUniModulesMUnixComponentsMTagMTag(instance)
}
)
val GenUniModulesMUnixComponentsMDivMDivClass = CreateVueComponent(GenUniModulesMUnixComponentsMDivMDiv::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMDivMDiv.name, inheritAttrs = GenUniModulesMUnixComponentsMDivMDiv.inheritAttrs, inject = GenUniModulesMUnixComponentsMDivMDiv.inject, props = GenUniModulesMUnixComponentsMDivMDiv.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMDivMDiv.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMDivMDiv.emits, components = GenUniModulesMUnixComponentsMDivMDiv.components, styles = GenUniModulesMUnixComponentsMDivMDiv.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMDivMDiv {
    return GenUniModulesMUnixComponentsMDivMDiv(instance)
}
)
typealias FabBtn = UTSJSONObject
open class TouchPoint {
    open lateinit var x: Number
    open lateinit var y: Number
    constructor(x: Number, y: Number){
        this.x = x
        this.y = y
    }
}
val GenUniModulesMUnixComponentsMFabMFabClass = CreateVueComponent(GenUniModulesMUnixComponentsMFabMFab::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMFabMFab.name, inheritAttrs = GenUniModulesMUnixComponentsMFabMFab.inheritAttrs, inject = GenUniModulesMUnixComponentsMFabMFab.inject, props = GenUniModulesMUnixComponentsMFabMFab.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMFabMFab.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMFabMFab.emits, components = GenUniModulesMUnixComponentsMFabMFab.components, styles = GenUniModulesMUnixComponentsMFabMFab.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMFabMFab {
    return GenUniModulesMUnixComponentsMFabMFab(instance)
}
)
val GenComponentsCustomServiceCustomServiceClass = CreateVueComponent(GenComponentsCustomServiceCustomService::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsCustomServiceCustomService.inheritAttrs, inject = GenComponentsCustomServiceCustomService.inject, props = GenComponentsCustomServiceCustomService.props, propsNeedCastKeys = GenComponentsCustomServiceCustomService.propsNeedCastKeys, emits = GenComponentsCustomServiceCustomService.emits, components = GenComponentsCustomServiceCustomService.components, styles = GenComponentsCustomServiceCustomService.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsCustomServiceCustomService.setup(props as GenComponentsCustomServiceCustomService)
    }
    )
}
, fun(instance, renderer): GenComponentsCustomServiceCustomService {
    return GenComponentsCustomServiceCustomService(instance)
}
)
val ApiUrl: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("ApiUrl", "api/url.uts", 1, 14), "getTenantPageConfigXcx" to "/system/tenantPageConfig/getTenantPageConfigXcx", "getTenantPageConfigH" to "/system/tenantPageConfig/getTenantPageConfigH", "login" to "/auth/login", "card_detail" to "/app/card/info/", "countries" to "/app/card/getH5CountryList", "addOrder" to "/order/pkgOrder", "queryOrder" to "/order/pkgOrder/", "goPay" to "/pay/order/goPayment", "queryBySuccessId" to "/order/pkgOrder/success/", "queryPkgInfoList" to "/card/pkgInfo/list", "queryPkgInfoDetail" to "/card/pkgInfo/info/", "queryOrderList" to "/order/pkgOrder/list", "queryOrderPackInfo" to "/order/pkgOrder/getOrderPackInfo/")
open class CountryData (
    @JsonNotNull
    open var fullName: String,
    @JsonNotNull
    open var letterCode: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CountryData", "api/http.uts", 12, 13)
    }
}
open class TenantInfoData (
    @JsonNotNull
    open var rechargeTip: String,
    @JsonNotNull
    open var servicePhone: String,
    @JsonNotNull
    open var serviceQrcode: null,
    @JsonNotNull
    open var wxAuditHide: String,
    @JsonNotNull
    open var wxAuditHideNo: String,
    @JsonNotNull
    open var wxGetPhoneLogin: String,
    @JsonNotNull
    open var wxMiniPayType: String,
    @JsonNotNull
    open var wxPayClass: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TenantInfoData", "api/http.uts", 16, 13)
    }
}
fun getCountryList(withToken: Boolean = false): UTSPromise<ApiResponse<UTSArray<CountryData>>> {
    return request<UTSArray<CountryData>>(RequestOptions__1(url = ApiUrl["countries"] as String, method = "GET", withToken = withToken))
}
fun getTenantInfo(tenantId: String, withToken: Boolean = true): UTSPromise<ApiResponse<TenantInfoData>> {
    val url = (ApiUrl["getTenantPageConfigH"] as String) + "/" + tenantId
    return request<TenantInfoData>(RequestOptions__1(url = url, method = "GET", withToken = withToken))
}
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexIndex.inheritAttrs, inject = GenPagesIndexIndex.inject, props = GenPagesIndexIndex.props, propsNeedCastKeys = GenPagesIndexIndex.propsNeedCastKeys, emits = GenPagesIndexIndex.emits, components = GenPagesIndexIndex.components, styles = GenPagesIndexIndex.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexIndex.setup(props as GenPagesIndexIndex)
    }
    )
}
, fun(instance, renderer): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance, renderer)
}
)
val GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlClass = CreateVueComponent(GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.name, inheritAttrs = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.inheritAttrs, inject = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.inject, props = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.emits, components = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.components, styles = GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl {
    return GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControl(instance)
}
)
val GenPagesCardCardClass = CreateVueComponent(GenPagesCardCard::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesCardCard.inheritAttrs, inject = GenPagesCardCard.inject, props = GenPagesCardCard.props, propsNeedCastKeys = GenPagesCardCard.propsNeedCastKeys, emits = GenPagesCardCard.emits, components = GenPagesCardCard.components, styles = GenPagesCardCard.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesCardCard.setup(props as GenPagesCardCard)
    }
    )
}
, fun(instance, renderer): GenPagesCardCard {
    return GenPagesCardCard(instance, renderer)
}
)
val GenPagesMineMineClass = CreateVueComponent(GenPagesMineMine::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineMine.inheritAttrs, inject = GenPagesMineMine.inject, props = GenPagesMineMine.props, propsNeedCastKeys = GenPagesMineMine.propsNeedCastKeys, emits = GenPagesMineMine.emits, components = GenPagesMineMine.components, styles = GenPagesMineMine.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineMine.setup(props as GenPagesMineMine)
    }
    )
}
, fun(instance, renderer): GenPagesMineMine {
    return GenPagesMineMine(instance, renderer)
}
)
typealias TabItem = UTSJSONObject
val GenUniModulesMUnixComponentsMTabsMTabsClass = CreateVueComponent(GenUniModulesMUnixComponentsMTabsMTabs::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMTabsMTabs.name, inheritAttrs = GenUniModulesMUnixComponentsMTabsMTabs.inheritAttrs, inject = GenUniModulesMUnixComponentsMTabsMTabs.inject, props = GenUniModulesMUnixComponentsMTabsMTabs.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMTabsMTabs.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMTabsMTabs.emits, components = GenUniModulesMUnixComponentsMTabsMTabs.components, styles = GenUniModulesMUnixComponentsMTabsMTabs.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMTabsMTabs {
    return GenUniModulesMUnixComponentsMTabsMTabs(instance)
}
)
open class CardDetailTabItem (
    @JsonNotNull
    open var name: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CardDetailTabItem", "pages/cardDetail/cardDetail.uvue", 264, 7)
    }
}
open class CardDetailTabEvent (
    @JsonNotNull
    open var index: Number,
    @JsonNotNull
    open var item: CardDetailTabItem,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CardDetailTabEvent", "pages/cardDetail/cardDetail.uvue", 268, 7)
    }
}
val GenPagesCardDetailCardDetailClass = CreateVueComponent(GenPagesCardDetailCardDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesCardDetailCardDetail.inheritAttrs, inject = GenPagesCardDetailCardDetail.inject, props = GenPagesCardDetailCardDetail.props, propsNeedCastKeys = GenPagesCardDetailCardDetail.propsNeedCastKeys, emits = GenPagesCardDetailCardDetail.emits, components = GenPagesCardDetailCardDetail.components, styles = GenPagesCardDetailCardDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesCardDetailCardDetail.setup(props as GenPagesCardDetailCardDetail)
    }
    )
}
, fun(instance, renderer): GenPagesCardDetailCardDetail {
    return GenPagesCardDetailCardDetail(instance, renderer)
}
)
val GenUniModulesMUnixComponentsMBottomPopupMBottomPopupClass = CreateVueComponent(GenUniModulesMUnixComponentsMBottomPopupMBottomPopup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.name, inheritAttrs = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.inheritAttrs, inject = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.inject, props = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.emits, components = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.components, styles = GenUniModulesMUnixComponentsMBottomPopupMBottomPopup.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMBottomPopupMBottomPopup {
    return GenUniModulesMUnixComponentsMBottomPopupMBottomPopup(instance)
}
)
val GenUniModulesMUnixComponentsMStickyBottomMStickyBottomClass = CreateVueComponent(GenUniModulesMUnixComponentsMStickyBottomMStickyBottom::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.name, inheritAttrs = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.inheritAttrs, inject = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.inject, props = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.emits, components = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.components, styles = GenUniModulesMUnixComponentsMStickyBottomMStickyBottom.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMStickyBottomMStickyBottom {
    return GenUniModulesMUnixComponentsMStickyBottomMStickyBottom(instance)
}
)
val GenComponentsProgressClass = CreateVueComponent(GenComponentsProgress::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsProgress.inheritAttrs, inject = GenComponentsProgress.inject, props = GenComponentsProgress.props, propsNeedCastKeys = GenComponentsProgress.propsNeedCastKeys, emits = GenComponentsProgress.emits, components = GenComponentsProgress.components, styles = GenComponentsProgress.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsProgress.setup(props as GenComponentsProgress)
    }
    )
}
, fun(instance, renderer): GenComponentsProgress {
    return GenComponentsProgress(instance)
}
)
open class PaymentMethod (
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var label: String,
    open var desc: String? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PaymentMethod", "components/payment.uvue", 114, 6)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return PaymentMethodReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class PaymentMethodReactiveObject : PaymentMethod, IUTSReactive<PaymentMethod> {
    override var __v_raw: PaymentMethod
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: PaymentMethod, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, label = __v_raw.label, desc = __v_raw.desc) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): PaymentMethodReactiveObject {
        return PaymentMethodReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: String
        get() {
            return _tRG(__v_raw, "id", __v_raw.id, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("id")) {
                return
            }
            val oldValue = __v_raw.id
            __v_raw.id = value
            _tRS(__v_raw, "id", oldValue, value)
        }
    override var label: String
        get() {
            return _tRG(__v_raw, "label", __v_raw.label, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("label")) {
                return
            }
            val oldValue = __v_raw.label
            __v_raw.label = value
            _tRS(__v_raw, "label", oldValue, value)
        }
    override var desc: String?
        get() {
            return _tRG(__v_raw, "desc", __v_raw.desc, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("desc")) {
                return
            }
            val oldValue = __v_raw.desc
            __v_raw.desc = value
            _tRS(__v_raw, "desc", oldValue, value)
        }
}
val GenComponentsPaymentClass = CreateVueComponent(GenComponentsPayment::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsPayment.inheritAttrs, inject = GenComponentsPayment.inject, props = GenComponentsPayment.props, propsNeedCastKeys = GenComponentsPayment.propsNeedCastKeys, emits = GenComponentsPayment.emits, components = GenComponentsPayment.components, styles = GenComponentsPayment.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsPayment.setup(props as GenComponentsPayment)
    }
    )
}
, fun(instance, renderer): GenComponentsPayment {
    return GenComponentsPayment(instance)
}
)
open class TabItem__1 (
    @JsonNotNull
    open var name: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabItem", "pages/recharge/recharge.uvue", 140, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return TabItem__1ReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class TabItem__1ReactiveObject : TabItem__1, IUTSReactive<TabItem__1> {
    override var __v_raw: TabItem__1
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: TabItem__1, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): TabItem__1ReactiveObject {
        return TabItem__1ReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
}
open class PackageItem (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var tag: String,
    @JsonNotNull
    open var data: String,
    @JsonNotNull
    open var validity: String,
    @JsonNotNull
    open var price: Number,
    @JsonNotNull
    open var originalPrice: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PackageItem", "pages/recharge/recharge.uvue", 145, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return PackageItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class PackageItemReactiveObject : PackageItem, IUTSReactive<PackageItem> {
    override var __v_raw: PackageItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: PackageItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, tag = __v_raw.tag, data = __v_raw.data, validity = __v_raw.validity, price = __v_raw.price, originalPrice = __v_raw.originalPrice) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): PackageItemReactiveObject {
        return PackageItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: String
        get() {
            return _tRG(__v_raw, "name", __v_raw.name, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            _tRS(__v_raw, "name", oldValue, value)
        }
    override var tag: String
        get() {
            return _tRG(__v_raw, "tag", __v_raw.tag, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("tag")) {
                return
            }
            val oldValue = __v_raw.tag
            __v_raw.tag = value
            _tRS(__v_raw, "tag", oldValue, value)
        }
    override var data: String
        get() {
            return _tRG(__v_raw, "data", __v_raw.data, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("data")) {
                return
            }
            val oldValue = __v_raw.data
            __v_raw.data = value
            _tRS(__v_raw, "data", oldValue, value)
        }
    override var validity: String
        get() {
            return _tRG(__v_raw, "validity", __v_raw.validity, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("validity")) {
                return
            }
            val oldValue = __v_raw.validity
            __v_raw.validity = value
            _tRS(__v_raw, "validity", oldValue, value)
        }
    override var price: Number
        get() {
            return _tRG(__v_raw, "price", __v_raw.price, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("price")) {
                return
            }
            val oldValue = __v_raw.price
            __v_raw.price = value
            _tRS(__v_raw, "price", oldValue, value)
        }
    override var originalPrice: Number
        get() {
            return _tRG(__v_raw, "originalPrice", __v_raw.originalPrice, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("originalPrice")) {
                return
            }
            val oldValue = __v_raw.originalPrice
            __v_raw.originalPrice = value
            _tRS(__v_raw, "originalPrice", oldValue, value)
        }
}
open class ChangeTabEvent (
    @JsonNotNull
    open var index: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ChangeTabEvent", "pages/recharge/recharge.uvue", 155, 7)
    }
}
val GenPagesRechargeRechargeClass = CreateVueComponent(GenPagesRechargeRecharge::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesRechargeRecharge.inheritAttrs, inject = GenPagesRechargeRecharge.inject, props = GenPagesRechargeRecharge.props, propsNeedCastKeys = GenPagesRechargeRecharge.propsNeedCastKeys, emits = GenPagesRechargeRecharge.emits, components = GenPagesRechargeRecharge.components, styles = GenPagesRechargeRecharge.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesRechargeRecharge.setup(props as GenPagesRechargeRecharge)
    }
    )
}
, fun(instance, renderer): GenPagesRechargeRecharge {
    return GenPagesRechargeRecharge(instance, renderer)
}
)
val GenPagesPaySuccessPaySuccessClass = CreateVueComponent(GenPagesPaySuccessPaySuccess::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesPaySuccessPaySuccess.inheritAttrs, inject = GenPagesPaySuccessPaySuccess.inject, props = GenPagesPaySuccessPaySuccess.props, propsNeedCastKeys = GenPagesPaySuccessPaySuccess.propsNeedCastKeys, emits = GenPagesPaySuccessPaySuccess.emits, components = GenPagesPaySuccessPaySuccess.components, styles = GenPagesPaySuccessPaySuccess.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesPaySuccessPaySuccess.setup(props as GenPagesPaySuccessPaySuccess)
    }
    )
}
, fun(instance, renderer): GenPagesPaySuccessPaySuccess {
    return GenPagesPaySuccessPaySuccess(instance, renderer)
}
)
val GenPagesPayFailedPayFailedClass = CreateVueComponent(GenPagesPayFailedPayFailed::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesPayFailedPayFailed.inheritAttrs, inject = GenPagesPayFailedPayFailed.inject, props = GenPagesPayFailedPayFailed.props, propsNeedCastKeys = GenPagesPayFailedPayFailed.propsNeedCastKeys, emits = GenPagesPayFailedPayFailed.emits, components = GenPagesPayFailedPayFailed.components, styles = GenPagesPayFailedPayFailed.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesPayFailedPayFailed.setup(props as GenPagesPayFailedPayFailed)
    }
    )
}
, fun(instance, renderer): GenPagesPayFailedPayFailed {
    return GenPagesPayFailedPayFailed(instance, renderer)
}
)
typealias OrderStatus = String
val GenPagesMyOrderMyOrderClass = CreateVueComponent(GenPagesMyOrderMyOrder::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMyOrderMyOrder.inheritAttrs, inject = GenPagesMyOrderMyOrder.inject, props = GenPagesMyOrderMyOrder.props, propsNeedCastKeys = GenPagesMyOrderMyOrder.propsNeedCastKeys, emits = GenPagesMyOrderMyOrder.emits, components = GenPagesMyOrderMyOrder.components, styles = GenPagesMyOrderMyOrder.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMyOrderMyOrder.setup(props as GenPagesMyOrderMyOrder)
    }
    )
}
, fun(instance, renderer): GenPagesMyOrderMyOrder {
    return GenPagesMyOrderMyOrder(instance, renderer)
}
)
val GenPagesOrderDetailOrderDetailClass = CreateVueComponent(GenPagesOrderDetailOrderDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesOrderDetailOrderDetail.inheritAttrs, inject = GenPagesOrderDetailOrderDetail.inject, props = GenPagesOrderDetailOrderDetail.props, propsNeedCastKeys = GenPagesOrderDetailOrderDetail.propsNeedCastKeys, emits = GenPagesOrderDetailOrderDetail.emits, components = GenPagesOrderDetailOrderDetail.components, styles = GenPagesOrderDetailOrderDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesOrderDetailOrderDetail.setup(props as GenPagesOrderDetailOrderDetail)
    }
    )
}
, fun(instance, renderer): GenPagesOrderDetailOrderDetail {
    return GenPagesOrderDetailOrderDetail(instance, renderer)
}
)
val GenPagesScanCodeScanCodeClass = CreateVueComponent(GenPagesScanCodeScanCode::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesScanCodeScanCode.inheritAttrs, inject = GenPagesScanCodeScanCode.inject, props = GenPagesScanCodeScanCode.props, propsNeedCastKeys = GenPagesScanCodeScanCode.propsNeedCastKeys, emits = GenPagesScanCodeScanCode.emits, components = GenPagesScanCodeScanCode.components, styles = GenPagesScanCodeScanCode.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesScanCodeScanCode.setup(props as GenPagesScanCodeScanCode)
    }
    )
}
, fun(instance, renderer): GenPagesScanCodeScanCode {
    return GenPagesScanCodeScanCode(instance, renderer)
}
)
val GenComponentsSelectCountryClass = CreateVueComponent(GenComponentsSelectCountry::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsSelectCountry.inheritAttrs, inject = GenComponentsSelectCountry.inject, props = GenComponentsSelectCountry.props, propsNeedCastKeys = GenComponentsSelectCountry.propsNeedCastKeys, emits = GenComponentsSelectCountry.emits, components = GenComponentsSelectCountry.components, styles = GenComponentsSelectCountry.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenComponentsSelectCountry.setup(props as GenComponentsSelectCountry, ctx)
    }
    )
}
, fun(instance, renderer): GenComponentsSelectCountry {
    return GenComponentsSelectCountry(instance)
}
)
val GenPagesH5SearchH5SearchClass = CreateVueComponent(GenPagesH5SearchH5Search::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesH5SearchH5Search.inheritAttrs, inject = GenPagesH5SearchH5Search.inject, props = GenPagesH5SearchH5Search.props, propsNeedCastKeys = GenPagesH5SearchH5Search.propsNeedCastKeys, emits = GenPagesH5SearchH5Search.emits, components = GenPagesH5SearchH5Search.components, styles = GenPagesH5SearchH5Search.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesH5SearchH5Search.setup(props as GenPagesH5SearchH5Search)
    }
    )
}
, fun(instance, renderer): GenPagesH5SearchH5Search {
    return GenPagesH5SearchH5Search(instance, renderer)
}
)
val GenPagesOrderRecordOrderRecordClass = CreateVueComponent(GenPagesOrderRecordOrderRecord::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesOrderRecordOrderRecord.inheritAttrs, inject = GenPagesOrderRecordOrderRecord.inject, props = GenPagesOrderRecordOrderRecord.props, propsNeedCastKeys = GenPagesOrderRecordOrderRecord.propsNeedCastKeys, emits = GenPagesOrderRecordOrderRecord.emits, components = GenPagesOrderRecordOrderRecord.components, styles = GenPagesOrderRecordOrderRecord.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesOrderRecordOrderRecord.setup(props as GenPagesOrderRecordOrderRecord)
    }
    )
}
, fun(instance, renderer): GenPagesOrderRecordOrderRecord {
    return GenPagesOrderRecordOrderRecord(instance, renderer)
}
)
typealias PackageStatus = String
val GenPagesMyPkgMyPkgClass = CreateVueComponent(GenPagesMyPkgMyPkg::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMyPkgMyPkg.inheritAttrs, inject = GenPagesMyPkgMyPkg.inject, props = GenPagesMyPkgMyPkg.props, propsNeedCastKeys = GenPagesMyPkgMyPkg.propsNeedCastKeys, emits = GenPagesMyPkgMyPkg.emits, components = GenPagesMyPkgMyPkg.components, styles = GenPagesMyPkgMyPkg.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMyPkgMyPkg.setup(props as GenPagesMyPkgMyPkg)
    }
    )
}
, fun(instance, renderer): GenPagesMyPkgMyPkg {
    return GenPagesMyPkgMyPkg(instance, renderer)
}
)
val GenUniModulesMUnixComponentsMWxLoginMWxLoginClass = CreateVueComponent(GenUniModulesMUnixComponentsMWxLoginMWxLogin::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesMUnixComponentsMWxLoginMWxLogin.name, inheritAttrs = GenUniModulesMUnixComponentsMWxLoginMWxLogin.inheritAttrs, inject = GenUniModulesMUnixComponentsMWxLoginMWxLogin.inject, props = GenUniModulesMUnixComponentsMWxLoginMWxLogin.props, propsNeedCastKeys = GenUniModulesMUnixComponentsMWxLoginMWxLogin.propsNeedCastKeys, emits = GenUniModulesMUnixComponentsMWxLoginMWxLogin.emits, components = GenUniModulesMUnixComponentsMWxLoginMWxLogin.components, styles = GenUniModulesMUnixComponentsMWxLoginMWxLogin.styles)
}
, fun(instance, renderer): GenUniModulesMUnixComponentsMWxLoginMWxLogin {
    return GenUniModulesMUnixComponentsMWxLoginMWxLogin(instance)
}
)
val GenPagesLoginLoginClass = CreateVueComponent(GenPagesLoginLogin::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesLoginLogin.inheritAttrs, inject = GenPagesLoginLogin.inject, props = GenPagesLoginLogin.props, propsNeedCastKeys = GenPagesLoginLogin.propsNeedCastKeys, emits = GenPagesLoginLogin.emits, components = GenPagesLoginLogin.components, styles = GenPagesLoginLogin.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesLoginLogin.setup(props as GenPagesLoginLogin)
    }
    )
}
, fun(instance, renderer): GenPagesLoginLogin {
    return GenPagesLoginLogin(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    return _uO("app" to app)
}
fun main(app: IApp) {
    enableStyleIsolation()
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "zd_iot_app"
    override var appid: String = "__UNI__1E9055A"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "5.11"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = _uM()))
    __uniRoutes.push(UniPageRoute(path = "pages/card/card", component = GenPagesCardCardClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/mine", component = GenPagesMineMineClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/cardDetail/cardDetail", component = GenPagesCardDetailCardDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/recharge/recharge", component = GenPagesRechargeRechargeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/paySuccess/paySuccess", component = GenPagesPaySuccessPaySuccessClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/payFailed/payFailed", component = GenPagesPayFailedPayFailedClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/myOrder/myOrder", component = GenPagesMyOrderMyOrderClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/orderDetail/orderDetail", component = GenPagesOrderDetailOrderDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/scanCode/scanCode", component = GenPagesScanCodeScanCodeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/h5Search/h5Search", component = GenPagesH5SearchH5SearchClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/orderRecord/orderRecord", component = GenPagesOrderRecordOrderRecordClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/myPkg/myPkg", component = GenPagesMyPkgMyPkgClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/login/login", component = GenPagesLoginLoginClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
}
val __uniTabBar: Map<String, Any?>? = _uM("color" to "#64748b", "selectedColor" to "#2563eb", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
    _uM("pagePath" to "pages/index/index", "iconPath" to "/static/tabBar/home.png", "selectedIconPath" to "/static/tabBar/home1.png", "text" to "首页"),
    _uM("pagePath" to "pages/card/card", "iconPath" to "/static/tabBar/card.png", "selectedIconPath" to "/static/tabBar/card1.png", "text" to "卡片"),
    _uM("pagePath" to "pages/mine/mine", "iconPath" to "/static/tabBar/mine.png", "selectedIconPath" to "/static/tabBar/mine1.png", "text" to "我的")
))
val __uniLaunchPage: Map<String, Any?> = _uM("url" to "pages/index/index", "style" to _uM<String, Any?>())
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index"
    __uniConfig.globalStyle = _uM("navigationStyle" to "custom", "navigationBarTextStyle" to "black", "navigationBarTitleText" to "云卡在线", "navigationBarBackgroundColor" to "#F8F8F8", "backgroundColor" to "#F8F8F8")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return _uM("color" to "#64748b", "selectedColor" to "#2563eb", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
            _uM("pagePath" to "pages/index/index", "iconPath" to "/static/tabBar/home.png", "selectedIconPath" to "/static/tabBar/home1.png", "text" to "首页"),
            _uM("pagePath" to "pages/card/card", "iconPath" to "/static/tabBar/card.png", "selectedIconPath" to "/static/tabBar/card1.png", "text" to "卡片"),
            _uM("pagePath" to "pages/mine/mine", "iconPath" to "/static/tabBar/mine.png", "selectedIconPath" to "/static/tabBar/mine1.png", "text" to "我的")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = _uM()
    __uniConfig.ready = true
}
open class GenUniApp : UniAppImpl() {
    open val vm: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
    open val `$vm`: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
}
fun getApp(): GenUniApp {
    return getUniApp() as GenUniApp
}
