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
import io.dcloud.uniapp.extapi.`$off` as uni__off
import io.dcloud.uniapp.extapi.`$on` as uni__on
import io.dcloud.uniapp.extapi.addInterceptor as uni_addInterceptor
import io.dcloud.uniapp.extapi.clearStorageSync as uni_clearStorageSync
import io.dcloud.uniapp.extapi.connectSocket as uni_connectSocket
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.getFileSystemManager as uni_getFileSystemManager
import io.dcloud.uniapp.extapi.getStorageSync as uni_getStorageSync
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
import io.dcloud.uniapp.extapi.hideLoading as uni_hideLoading
import io.dcloud.uniapp.extapi.loadFontFace as uni_loadFontFace
import io.dcloud.uniapp.extapi.openDialogPage as uni_openDialogPage
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.removeStorageSync as uni_removeStorageSync
import io.dcloud.uniapp.extapi.request as uni_request
import io.dcloud.uniapp.extapi.rpx2px as uni_rpx2px
import io.dcloud.uniapp.extapi.setStorageSync as uni_setStorageSync
import io.dcloud.uniapp.extapi.setTabBarItem as uni_setTabBarItem
import io.dcloud.uniapp.extapi.showLoading as uni_showLoading
import io.dcloud.uniapp.extapi.showToast as uni_showToast
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
    val hosts: String = "127.0.0.1,192.168.1.21"
    val port: String = "8090"
    val id: String = "app-android_yIXczY"
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
    open var tenantId: String,
    @JsonNotNull
    open var clientId: String,
    @JsonNotNull
    open var grantType: String,
    @JsonNotNull
    open var appID: String,
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
        return UTSSourceMapPosition("ApiPaths", "common/config.uts", 9, 13)
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
        return UTSSourceMapPosition("ConfigInfo", "common/config.uts", 13, 13)
    }
}
open class StorageKeys (
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var refreshToken: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("StorageKeys", "common/config.uts", 21, 13)
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
    open var loginPagePath: String? = null,
    open var loginRequiredPaths: UTSArray<String>? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ProjectConfig", "common/config.uts", 25, 13)
    }
}
val ENV = "dev"
val API_CONFIG: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("API_CONFIG", "common/config.uts", 37, 7), "dev" to _uO("baseUrl" to "http://192.168.1.45:8081", "timeout" to 30000), "prod" to _uO("baseUrl" to "https://cmpapp.zdiot.cn/prod-api", "timeout" to 30000))
val currentConfig = API_CONFIG[ENV] as UTSJSONObject
val config = ProjectConfig(baseUrl = currentConfig["baseUrl"] as String, timeout = currentConfig["timeout"] as Number, env = ENV, api = ApiPaths(auth = AuthApiPaths(tenantId = "000000", clientId = "12353d4772a25656d6d2a67d53353cc3", grantType = "xcx", appID = "wxef277996acc166c3")), storage = StorageKeys(token = "access_token", refreshToken = "refresh_token"), configInfo = ConfigInfo(name = "中导云卡", versionCode = 1, versionName = "1.0.0", appId = "your-app-id"), loginPagePath = "", loginRequiredPaths = _uA())
fun getTenantId(): String {
    return config.api.auth.tenantId
}
fun getToken(): String {
    val token = uni_getStorageSync(config.storage.token)
    if (token == null) {
        return ""
    }
    return token as String
}
fun setToken(token: String, refreshToken: String = "") {
    uni_setStorageSync(config.storage.token, token)
    if (refreshToken.length > 0) {
        uni_setStorageSync(config.storage.refreshToken, refreshToken)
    }
}
fun clearToken() {
    uni_removeStorageSync(config.storage.token)
    uni_removeStorageSync(config.storage.refreshToken)
}
fun setStorageSync(key: String, value: Any) {
    uni_setStorageSync(key, value)
}
fun getStorageSync(key: String): String {
    return uni_getStorageSync(key) as String
}
fun isWechat(): Boolean {
    return false
}
fun isH5(): Boolean {
    return false
}
open class HostStorageConfig (
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var userInfo: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostStorageConfig", "api/ProjectConfig.uts", 6, 13)
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
        return UTSSourceMapPosition("HostApiLoginConfig", "api/ProjectConfig.uts", 10, 13)
    }
}
open class HostApiUpdateConfig (
    @JsonNotNull
    open var checkUpdate: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiUpdateConfig", "api/ProjectConfig.uts", 15, 13)
    }
}
open class HostApiUploadConfig (
    @JsonNotNull
    open var image: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HostApiUploadConfig", "api/ProjectConfig.uts", 18, 13)
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
        return UTSSourceMapPosition("HostApiConfig", "api/ProjectConfig.uts", 21, 13)
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
        return UTSSourceMapPosition("HostConfigInfo", "api/ProjectConfig.uts", 28, 13)
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
        return UTSSourceMapPosition("MUnixHostProjectConfig", "api/ProjectConfig.uts", 45, 13)
    }
}
val LOGO_BUILTIN = "/uni_modules/m-unix/static/m-app-logo.png"
val BUILTIN_DEFAULT = MUnixHostProjectConfig(env = "local", localBaseUrl = "", devBaseUrl = "", prodBaseUrl = "", baseUrl = "", storage = HostStorageConfig(token = "token", userInfo = "userInfo"), loginRequiredPaths = _uA(), loginPagePath = "/pages/login/login", api = HostApiConfig(login = HostApiLoginConfig(tokenLogin = "", codeGetOpenIdLogin = "", codeGetPhoneRegisterOrLogin = ""), update = HostApiUpdateConfig(checkUpdate = ""), upload = HostApiUploadConfig(image = ""), qrCodeImageApiBase = ""), configInfo = HostConfigInfo(name = "mUnix", logo = LOGO_BUILTIN, desc = "", versionCode = 0, versionName = "0.0.0"), mUi = null)
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
val mUnixConfig: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("mUnixConfig", "utils/inject-m-unix.uts", 4, 7), "env" to config.env, "baseUrl" to config.baseUrl, "storage" to _uO("token" to config.storage.token, "userInfo" to "userInfo"), "loginRequiredPaths" to config.loginRequiredPaths, "loginPagePath" to config.loginPagePath, "api" to _uO(), "configInfo" to _uO("name" to config.configInfo.name, "logo" to config.configInfo.logo, "desc" to config.configInfo.desc, "versionCode" to config.configInfo.versionCode, "versionName" to config.configInfo.versionName), "mUi" to null)
val runBlock3 = run {
    injectMUnixHostProjectConfig(mUnixConfig)
}
val injectedConfig = getHostProjectConfig()
open class I18nErrorCodesTypes (
    @JsonNotNull
    open var UNEXPECTED_RETURN_TYPE: Number,
    @JsonNotNull
    open var INVALID_ARGUMENT: Number,
    @JsonNotNull
    open var MUST_BE_CALL_SETUP_TOP: Number,
    @JsonNotNull
    open var NOT_INSTALLED: Number,
    @JsonNotNull
    open var REQUIRED_VALUE: Number,
    @JsonNotNull
    open var INVALID_VALUE: Number,
    @JsonNotNull
    open var CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Number,
    @JsonNotNull
    open var NOT_INSTALLED_WITH_PROVIDE: Number,
    @JsonNotNull
    open var UNEXPECTED_ERROR: Number,
    @JsonNotNull
    open var NOT_COMPATIBLE_LEGACY_VUE_I18N: Number,
    @JsonNotNull
    open var NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Number,
    @JsonNotNull
    open var TYPE_MISMATCH: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("I18nErrorCodesTypes", "uni_modules/lime-i18n/common/errors.uts", 1, 6)
    }
}
val I18nErrorCodes = I18nErrorCodesTypes(UNEXPECTED_RETURN_TYPE = 24, INVALID_ARGUMENT = 25, MUST_BE_CALL_SETUP_TOP = 26, NOT_INSTALLED = 27, REQUIRED_VALUE = 28, INVALID_VALUE = 29, CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN = 30, NOT_INSTALLED_WITH_PROVIDE = 31, UNEXPECTED_ERROR = 32, NOT_COMPATIBLE_LEGACY_VUE_I18N = 33, NOT_AVAILABLE_COMPOSITION_IN_LEGACY = 34, TYPE_MISMATCH = 35)
val errorMessages: Map<Number, String> = Map<Number, String>(_uA(
    _uA(
        I18nErrorCodes.UNEXPECTED_RETURN_TYPE,
        "composer中返回类型异常"
    ),
    _uA(
        I18nErrorCodes.INVALID_ARGUMENT,
        "参数无效"
    ),
    _uA(
        I18nErrorCodes.MUST_BE_CALL_SETUP_TOP,
        "必须在`setup`函数的顶部调用"
    ),
    _uA(
        I18nErrorCodes.NOT_INSTALLED,
        "需要用`app.use`函数安装"
    ),
    _uA(
        I18nErrorCodes.UNEXPECTED_ERROR,
        "意外错误"
    ),
    _uA(
        I18nErrorCodes.REQUIRED_VALUE,
        "值中必需，{0}"
    ),
    _uA(
        I18nErrorCodes.INVALID_VALUE,
        "值无效"
    ),
    _uA(
        I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN,
        "无法设置vue-devtools插件"
    ),
    _uA(
        I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE,
        "需要用`provide`函数安装"
    ),
    _uA(
        I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N,
        "不兼容的旧版VueI18n。"
    ),
    _uA(
        I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY,
        "在旧版API模式下，Compostion API不可用。请确保旧版API模式正常工作"
    ),
    _uA(
        I18nErrorCodes.TYPE_MISMATCH,
        "类型不匹配"
    )
))
open class warnMessagesTypes (
    @JsonNotNull
    open var FALLBACK_TO_ROOT: Number,
    @JsonNotNull
    open var NOT_FOUND_PARENT_SCOPE: Number,
    @JsonNotNull
    open var IGNORE_OBJ_FLATTEN: Number,
    @JsonNotNull
    open var DEPRECATE_TC: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("warnMessagesTypes", "uni_modules/lime-i18n/common/warnings.uts", 1, 6)
    }
}
val I18nWarnCodes = warnMessagesTypes(FALLBACK_TO_ROOT = 8, NOT_FOUND_PARENT_SCOPE = 9, IGNORE_OBJ_FLATTEN = 10, DEPRECATE_TC = 11)
val warnMessages: Map<Number, String> = Map<Number, String>(_uA(
    _uA(
        I18nWarnCodes.FALLBACK_TO_ROOT,
        "使用根语言环境回退到{type} '{key}'。"
    ),
    _uA(
        I18nWarnCodes.NOT_FOUND_PARENT_SCOPE,
        "未找到父作用域，使用全局作用域。"
    ),
    _uA(
        I18nWarnCodes.IGNORE_OBJ_FLATTEN,
        "忽略对象扁平化：'{key}'键具有字符串值。"
    ),
    _uA(
        I18nWarnCodes.DEPRECATE_TC,
        "'tc'和'\$tc'已在v10中被弃用，请使用't'或'\$t'代替。'tc'和'\$tc'将在v11中移除。"
    )
))
fun getAllKeys(map: Map<String, UTSJSONObject>): UTSArray<String> {
    var keys: UTSArray<String> = _uA()
    map.forEach(fun(_, key){
        keys.push(key)
    }
    )
    return keys
}
fun isObject(obj: Any?): Boolean {
    return obj != null && UTSAndroid.`typeof`(obj) == "object"
}
open class Token (
    @JsonNotNull
    open var type: String,
    @JsonNotNull
    open var value: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Token", "uni_modules/lime-i18n/common/format.uts", 3, 6)
    }
}
val RE_TOKEN_LIST_VALUE = UTSRegExp("^(?:\\d)+", "")
val RE_TOKEN_NAMED_VALUE = UTSRegExp("^(?:\\w)+", "")
fun parse(format: String): UTSArray<Token> {
    val tokens: UTSArray<Token> = _uA()
    var position: Number = 0
    var text: String = ""
    while(position < format.length){
        var char: String = format.charAt(position++)
        if (char == "{") {
            if (text.length > 0) {
                val token = Token(type = "text", value = text)
                tokens.push(token)
            }
            text = ""
            var sub: String = ""
            char = format.charAt(position++)
            while(char != "}"){
                sub += char
                char = format.charAt(position++)
            }
            val isClosed = char == "}"
            val type = if (RE_TOKEN_LIST_VALUE.test(sub)) {
                "list"
            } else {
                if (isClosed && RE_TOKEN_NAMED_VALUE.test(sub)) {
                    "named"
                } else {
                    "unknown"
                }
            }
            val token = Token(type = type, value = sub)
            tokens.push(token)
        } else if (char == "%") {
            if (format.charAt(position) != "{") {
                text += char
            }
        } else {
            text += char
        }
    }
    if (text.length > 0) {
        val token = Token(type = "text", value = text)
        tokens.push(token)
    }
    return tokens
}
fun compile(tokens: UTSArray<Token>, values: UTSJSONObject): UTSArray<Any> {
    return compile(tokens as UTSArray<Token>, values as Any)
}
fun compile(tokens: UTSArray<Token>, values: UTSArray<Any>): UTSArray<Any> {
    return compile(tokens as UTSArray<Token>, values as Any)
}
fun compile(tokens: UTSArray<Token>, values: Any): UTSArray<Any> {
    val compiled: UTSArray<Any> = _uA()
    var index: Number = 0
    val mode: String = if (UTSArray.isArray(values)) {
        "list"
    } else {
        if (isObject(values)) {
            "named"
        } else {
            "unknown"
        }
    }
    if (mode == "unknown") {
        return compiled
    }
    while(index < tokens.length){
        val token: Token = tokens[index]
        when (token.type) {
            "text" -> 
                compiled.push(token.value)
            "list" -> 
                {
                    val index__1 = parseInt(token.value, 10)
                    if (mode == "list") {
                        val value = (values as UTSArray<Any>)[index__1]
                        compiled.push(value)
                    } else {
                        if ("development" !== "production") {
                            warn("list did not receive a valid values array")
                        }
                    }
                }
            "named" -> 
                if (mode == "named") {
                    val value = (values as UTSJSONObject)[token.value] ?: ""
                    compiled.push("" + value)
                } else {
                    if ("development" !== "production") {
                        warn("Type of token '" + token.type + "' and format of value '" + mode + "' don't match!")
                    }
                }
            "unknown" -> 
                if (token.value.startsWith("'") && token.value.endsWith("'")) {
                    compiled.push(token.value.slice(1, -1))
                } else if ("development" !== "production") {
                    warn("Detect 'unknown' type of token!")
                }
        }
        index++
    }
    return compiled
}
open class BaseFormatter {
    private var _caches: Map<String, UTSArray<Token>>
    constructor(){
        this._caches = Map<String, UTSArray<Token>>()
    }
    open fun interpolate(message: String, values: Any?): UTSArray<Any> {
        if (values == null) {
            return _uA(
                message
            )
        }
        var tokens: UTSArray<Token>? = this._caches.get(message)
        if (tokens == null) {
            tokens = parse(message)
            this._caches.set(message, tokens)
        }
        return compile(tokens, values)
    }
}
typealias StringOrNull = String?
typealias Interpolate = (key: String, locale: StringOrNull, values: Any, visitedLinkStack: UTSArray<String>, interpolateMode: String) -> StringOrNull
typealias Link = (str: String, locale: StringOrNull, values: Any, visitedLinkStack: UTSArray<String>, interpolateMode: String) -> StringOrNull
typealias WarnDefault = (key: String, message: StringOrNull, values: Any, interpolateMode: String) -> StringOrNull
typealias LinkedModify = (str: String) -> String
typealias PluralizationRule = (choice: Number, choicesLength: Number) -> Number
interface Availabilities {
    var dateTimeFormat: Boolean
    var numberFormat: Boolean
}
open class AvailabilitiesImpl : Availabilities, IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("AvailabilitiesImpl", "uni_modules/lime-i18n/common/composer-class.uts", 15, 14)
    }
    override var dateTimeFormat: Boolean = false
    override var numberFormat: Boolean = false
    constructor(){}
}
val linkKeyMatcher = UTSRegExp("(?:@(?:\\.[a-zA-Z0-9_-]+)?:)(?:[\\w\\-_|:./]+|\\([\\w\\-_|:./]+\\)|(?:\\{[^}]+?\\}))", "g")
val linkKeyPrefixMatcher = UTSRegExp("^@(?:\\.([a-zA-Z]+))?:", "")
val bracketsMatcher = UTSRegExp("[()\\{\\}\\']", "g")
val defaultModifiers: Map<String, LinkedModify> = Map(_uA(
    _uA(
        "upper",
        fun(str: String): String {
            return str.toLocaleUpperCase()
        }
    ),
    _uA(
        "lower",
        fun(str: String): String {
            return str.toLocaleLowerCase()
        }
    ),
    _uA(
        "capitalize",
        fun(str: String): String {
            return "" + str.charAt(0).toLocaleUpperCase() + str.substring(1)
        }
    )
))
val DEFAULT_LOCALE = "en-US"
val defaultFormatter = BaseFormatter()
val availabilities = AvailabilitiesImpl()
fun setTabBarItems(tabbar: UTSArray<String>?) {
    if (tabbar == null) {
        return
    }
    val pages = getCurrentPages()
    val page = if (pages.length > 0) {
        pages[pages.length - 1]
    } else {
        null
    }
    val isTabBar = page != null
    if (!isTabBar) {
        return
    }
    tabbar.forEach(fun(text, index){
        uni_setTabBarItem(SetTabBarItemOptions(text = text, index = index, fail = fun(err) {
            console.warn(err.errMsg, " at uni_modules/lime-i18n/common/composer-class.uts:102")
        }
        ))
    }
    )
}
fun getLocaleMap(locale: String, key: String, options: UTSJSONObject, root: Any? = null): Map<String, UTSJSONObject> {
    val __messages = UTSJSONObject.assign(_uO(), options.getJSON(key) ?: _uO())
    var map = Map<String, UTSJSONObject>()
    __messages.toMap().forEach(fun(value, key){
        if (value is UTSJSONObject) {
            map.set(key, value as UTSJSONObject)
        }
    }
    )
    if (map.size == 0 && root != null) {
        if (!map.has(locale)) {
            map.set(locale, _uO())
        }
    }
    return map
}
fun getLocaleTabbarMap(locale: String, key: String, options: UTSJSONObject): Map<String, UTSArray<String>> {
    val __messages = options.getJSON(key) ?: _uO()
    var map = Map<String, UTSArray<String>>()
    __messages.toMap().forEach(fun(tabbar, key){
        if (UTSArray.isArray(tabbar)) {
            map.set(key, tabbar as UTSArray<String>)
            if (key == locale) {
                setTimeout(fun(){
                    setTabBarItems(tabbar as UTSArray<String>)
                }
                , 500)
            }
        }
    }
    )
    return map
}
fun getModifiers(options: UTSJSONObject): Map<String, LinkedModify> {
    val __modifiers = (options.getJSON("modifiers") ?: _uO()).toMap()
    val _modifiers = Map<String, LinkedModify>()
    __modifiers.forEach(fun(value, key){
        if (UTSAndroid.`typeof`(value) == "function") {
            try {
                _modifiers.set(key, value as LinkedModify)
            }
             catch (e: Throwable) {
                console.warn(35, "自定义修饰器函数必须是类型：(str: string) => string", " at uni_modules/lime-i18n/common/composer-class.uts:187")
            }
        }
    }
    )
    return _modifiers
}
fun getPluralizationRules(options: UTSJSONObject): Map<String, PluralizationRule> {
    val __pluralizationRules = (options.getJSON("pluralizationRules") ?: _uO()).toMap()
    val _pluralizationRules = Map<String, PluralizationRule>()
    __pluralizationRules.forEach(fun(value, key){
        if (UTSAndroid.`typeof`(value) == "function") {
            try {
                _pluralizationRules.set(key, value as PluralizationRule)
            }
             catch (e: Throwable) {
                if ("development" !== "production") {
                    console.warn(35, "自定义复数化规则函数必须是类型: ( choice: number, choicesLength: number) => number", " at uni_modules/lime-i18n/common/composer-class.uts:210")
                }
            }
        }
    }
    )
    return _pluralizationRules
}
fun getFormatter(options: UTSJSONObject): BaseFormatter {
    val __formatter = options.get("formatter")
    return if (__formatter != null && __formatter is BaseFormatter) {
        __formatter as BaseFormatter
    } else {
        defaultFormatter
    }
}
var composerID: Number = 0
open class ComposerClass : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ComposerClass", "uni_modules/lime-i18n/common/composer-class.uts", 196, 14)
    }
    open lateinit var id: Number
    open lateinit var locale: Ref<String>
    open lateinit var fallbackLocale: Ref<Any>
    open lateinit var messages: Ref<Map<String, UTSJSONObject>>
    open lateinit var availableLocales: UTSArray<String>
    open lateinit var availabilities: Availabilities
    private var _interpolate: Interpolate? = null
    private var _link: Link? = null
    private var _warnDefault: WarnDefault? = null
    private var _formatter: BaseFormatter
    private var _modifiers: Map<String, LinkedModify>
    private var _pluralizationRules: Map<String, PluralizationRule>
    private var _numberFormats: Ref<Map<String, UTSJSONObject>>
    private var _datetimeFormats: Ref<Map<String, UTSJSONObject>>
    private var _tabBars: Ref<Map<String, UTSArray<String>>>
    constructor(options: UTSJSONObject = _uO(), __root: ComposerClass? = null){
        this._formatter = getFormatter(options)
        this._modifiers = getModifiers(options)
        this._pluralizationRules = getPluralizationRules(options)
        val _inheritLocale = options.getBoolean("inheritLocale") ?: true
        val useRoot = __root != null && _inheritLocale
        val __locale = ref<String>(if (useRoot) {
            __root.locale.value
        } else {
            options.getString("locale") ?: DEFAULT_LOCALE
        }
        )
        val _fallbackLocale = ref<Any?>(if (useRoot) {
            __root.fallbackLocale.value
        } else {
            options.get("fallbackLocale")
        }
        )
        this.messages = ref<Map<String, UTSJSONObject>>(getLocaleMap(__locale.value, "messages", options, __root))
        this._numberFormats = ref<Map<String, UTSJSONObject>>(getLocaleMap(__locale.value, "numberFormats", options, __root))
        this._datetimeFormats = ref<Map<String, UTSJSONObject>>(getLocaleMap(__locale.value, "datetimeFormats", options, __root))
        this._tabBars = ref<Map<String, UTSArray<String>>>(getLocaleTabbarMap(__locale.value, "tabBars", options))
        this.locale = computed<String>(WritableComputedOptions(set = fun(kVal: String){
            __locale.value = kVal
            if (__root == null) {
                uni_setStorageSync("uVueI18nLocale", kVal)
            }
            setTabBarItems(this._tabBars.value.get(kVal))
        }
        , get = fun(): String {
            return __locale.value
        }
        ))
        this.fallbackLocale = computed<Any>(WritableComputedOptions(set = fun(kVal: Any){
            _fallbackLocale.value = kVal
        }
        , get = fun(): Any {
            return _fallbackLocale.value ?: false
        }
        ))
        this.availableLocales = getAllKeys(this.messages.value).sort()
        this.availabilities = uni.UNI1E9055A.availabilities
        this._initMethods()
        composerID++
        this.id = composerID
        val interceptor = Interceptor(complete = fun(_: NavigateToComplete){
            setTimeout(fun(){
                setTabBarItems(this._tabBars.value.get(this.locale.value))
            }
            , 50)
        }
        )
        if (__root == null) {
            uni_addInterceptor("switchTab", interceptor)
        }
    }
    private fun _initMethods(): Unit {
        this._link = fun(str: String, locale: String?, values: Any, visitedLinkStack: UTSArray<String>, interpolateMode: String): String? {
            val matches = str.match(linkKeyMatcher)
            var ret: String = str
            if (matches == null) {
                return str
            }
            run {
                var i: Number = 0
                while(i < matches.length){
                    val link = matches[i]
                    val linkKeyPrefixMatches = link!!.match(linkKeyPrefixMatcher)
                    if (linkKeyPrefixMatches == null) {
                        i++
                        continue
                    }
                    val linkPrefix = linkKeyPrefixMatches[0]
                    val formatterName = linkKeyPrefixMatches[1]
                    val linkPlaceholder: String = link.replace(linkPrefix!!, "").replace(bracketsMatcher, "")
                    if (visitedLinkStack.includes(linkPlaceholder)) {
                        console.warn("发现循环引用。\"" + link + "\"已经在link\"已经在" + visitedLinkStack.reverse().join(" <- ") + "链中访问过", " at uni_modules/lime-i18n/common/composer-class.uts:396")
                        return ret
                    }
                    if (this._interpolate == null || this._warnDefault == null) {
                        return ret
                    }
                    visitedLinkStack.push(linkPlaceholder)
                    var translated = this._interpolate!!(linkPlaceholder, locale, values, visitedLinkStack, interpolateMode)
                    translated = this._warnDefault!!(linkPlaceholder, translated, values, interpolateMode)
                    if (this._modifiers.size > 0 && formatterName != null && this._modifiers.has(formatterName)) {} else if (translated != null && formatterName != null && defaultModifiers.has(formatterName)) {
                        val modifier = defaultModifiers.get(formatterName) as LinkedModify
                        translated = modifier(translated)
                    }
                    visitedLinkStack.pop()
                    ret = if (translated == null) {
                        ret
                    } else {
                        ret.replace(link, translated)
                    }
                    i++
                }
            }
            return ret
        }
        this._interpolate = fun(key: String, locale: String?, values: Any, visitedLinkStack: UTSArray<String>, interpolateMode: String): String? {
            val ___locale = locale ?: this.locale.value
            var ret = UTSJSONObject.assign(_uO(), this.messages.value.get(___locale) ?: _uO())?.getString(key)
            if (this.fallbackLocale.value != false && ret == null) {
                if (UTSAndroid.`typeof`(this.fallbackLocale.value) == "string" && ___locale != this.fallbackLocale.value as String) {
                    ret = this.messages.value.get(this.fallbackLocale.value as String)?.getString(key) ?: ret
                } else if (UTSArray.isArray(this.fallbackLocale.value)) {
                    val arr = (this.fallbackLocale.value as UTSArray<String>)
                    run {
                        var i: Number = 0
                        while(i < arr.length){
                            val _ret = this.messages.value.get(arr[i])?.getString(key)
                            if (_ret != null) {
                                ret = _ret
                                break
                            }
                            i++
                        }
                    }
                }
            }
            if (UTSAndroid.`typeof`(ret) == "string" && (ret!!.indexOf("@:") >= 0 || ret!!.indexOf("@.") >= 0)) {
                ret = this._link!!(ret!!, locale, values, visitedLinkStack, interpolateMode)
            }
            return ret
        }
        this._warnDefault = fun(key: String, message: String?, values: Any, interpolateMode: String): String? {
            if (message == null) {
                console.warn("无法翻译键路径 '" + key + "'. " + "使用键路径的值作为默认值.", " at uni_modules/lime-i18n/common/composer-class.uts:483")
            }
            if (message == null) {
                return null
            }
            if (key == message) {
                return key
            }
            return this._render(message, values, interpolateMode)
        }
    }
    private fun _render(message: String, values: Any, interpolateMode: String): String {
        val ret = this._formatter.interpolate(message, values)
        return if (interpolateMode == "string") {
            "" + ret.join("")
        } else {
            JSON.stringify(ret)
        }
    }
    private fun fetchChoice(message: String, choice: Number? = null, locale: String? = null): String {
        if (message == "") {
            return message
        }
        val choices: UTSArray<String> = message.split("|")
        val defaultImpl = fun(reassigned_choice: Number?, _choicesLength: Number): Number {
            var _choice = reassigned_choice
            _choice = Math.abs(_choice ?: 1)
            if (_choicesLength == 2) {
                return if (_choice != 0) {
                    if (_choice > 1) {
                        1
                    } else {
                        0
                    }
                } else {
                    1
                }
            }
            return if (_choice != 0) {
                Math.min(_choice, 2)
            } else {
                0
            }
        }
        var index: Number
        if (this._pluralizationRules.has(locale ?: this.locale.value)) {
            index = this._pluralizationRules.get(locale ?: this.locale.value)!!(choice ?: 1, choices.length)
        } else {
            index = defaultImpl(choice, choices.length)
        }
        if (choices[index] == "") {
            return message
        }
        return choices[index].trim()
    }
    open fun t(key: String, values: Any? = null, locale: String? = null): String {
        val parsedArgs = values ?: _uO()
        val msg = this._warnDefault!!(key, this._interpolate!!(key, locale, parsedArgs, _uA(
            key
        ), "string"), parsedArgs, "string")
        return msg ?: ""
    }
    open fun tc(key: String, choice: Number? = null, values: Any? = null, locale: String? = null): String {
        val _obj: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("_obj", "uni_modules/lime-i18n/common/composer-class.uts", 498, 15), "count" to choice, "n" to choice)
        val predefined = if (values == null) {
            _obj
        } else {
            if (values is UTSJSONObject) {
                UTSJSONObject.assign(_obj, values as UTSJSONObject)
            } else {
                values
            }
        }
        return this.fetchChoice(this.t(key, predefined, locale), choice, locale)
    }
    open fun d(date: Any, key: String? = null, locale: String? = null, options: UTSJSONObject? = null): String {
        if (!this.availabilities.dateTimeFormat) {
            console.warn("无法格式化日期值，因为不支持 Intl.DateTimeFormat. " + ("key: " + key + ", locale: " + locale + ", options: " + options), " at uni_modules/lime-i18n/common/composer-class.uts:604")
            return "" + date
        }
        return "" + date
    }
    open fun n(number: Number, key: String? = null, locale: String? = null, options: UTSJSONObject? = null): String {
        if (!this.availabilities.numberFormat) {
            console.warn("无法格式化数字值，因为不支持 Intl.NumberFormat. " + ("key: " + key + ", locale: " + locale + ", options: " + options), " at uni_modules/lime-i18n/common/composer-class.uts:649")
            return number.toString(10)
        }
        return number.toString(10)
    }
    open fun setLocaleMessage(locale: String, message: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this.messages.value.forEach(fun(value, key){
            map.set(key, value)
        }
        )
        map.set(locale, message)
        this.messages.value = map
        this.availableLocales = getAllKeys(map).sort()
    }
    open fun getLocaleMessage(locale: String): UTSJSONObject {
        return this.messages.value.get(locale) ?: _uO()
    }
    open fun mergeLocaleMessage(locale: String, message: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this.messages.value.forEach(fun(value, key){
            if (key == locale) {
                map.set(key, UTSJSONObject.assign(_uO(), value, message))
            } else {
                map.set(key, value)
            }
        }
        )
        this.messages.value = map
        this.availableLocales = getAllKeys(map).sort()
    }
    open fun setDateTimeFormat(locale: String, format: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this._datetimeFormats.value.forEach(fun(value, key){
            map.set(key, value)
        }
        )
        map.set(locale, format)
        this._datetimeFormats.value = map
    }
    open fun getDateTimeFormat(locale: String): UTSJSONObject {
        return this._datetimeFormats.value.get(locale) ?: _uO()
    }
    open fun mergeDateTimeFormat(locale: String, format: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this._datetimeFormats.value.forEach(fun(value, key){
            if (key == locale) {
                map.set(key, UTSJSONObject.assign(_uO(), value, format))
            } else {
                map.set(key, value)
            }
        }
        )
        this._datetimeFormats.value = map
    }
    open fun setNumberFormat(locale: String, format: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this._numberFormats.value.forEach(fun(value, key){
            map.set(key, value)
        }
        )
        map.set(locale, format)
        this._numberFormats.value = map
    }
    open fun getNumberFormat(locale: String): UTSJSONObject {
        return this._numberFormats.value.get(locale) ?: _uO()
    }
    open fun mergeNumberFormat(locale: String, format: UTSJSONObject): Unit {
        val map = Map<String, UTSJSONObject>()
        this._numberFormats.value.forEach(fun(value, key){
            if (key == locale) {
                map.set(key, UTSJSONObject.assign(_uO(), value, format))
            } else {
                map.set(key, value)
            }
        }
        )
        this._numberFormats.value = map
    }
    open fun setTabBar(locale: String, tabbar: UTSArray<String>): Unit {
        val map = Map<String, UTSArray<String>>()
        this._tabBars.value.forEach(fun(value, key){
            map.set(key, value)
        }
        )
        map.set(locale, tabbar)
        this._tabBars.value = map
    }
    open fun getTabBar(locale: String): UTSArray<String> {
        return this._tabBars.value.get(locale) ?: _uA()
    }
}
fun createComposer(options: UTSJSONObject = _uO(), __root: ComposerClass? = null): ComposerClass {
    return ComposerClass(options, __root)
}
typealias I18nMode = String
var lime_i18n: UvueI18n? = null
open class UvueI18n : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UvueI18n", "uni_modules/lime-i18n/common/index.uts", 7, 7)
    }
    private var __global: ComposerClass
    private var __scope: EffectScope
    constructor(options: UTSJSONObject = _uO(), root: ComposerClass? = null){
        this.__scope = effectScope()
        this.__global = this.__scope.run(fun(): ComposerClass {
            return createComposer(UTSJSONObject.assign(_uO(), options), root)
        }
        )!!
    }
    open val mode: I18nMode
        get(): I18nMode {
            return "composition"
        }
    open val global: ComposerClass
        get(): ComposerClass {
            return this.__global
        }
    open val availableLocales: UTSArray<String>
        get(): UTSArray<String> {
            return getAllKeys(this.global.messages.value).sort()
        }
    open fun dispose() {
        this.__scope.stop()
    }
    open fun `$t`(key: String, values: Any? = null, locale: String? = null): String {
        val isLocale = UTSAndroid.`typeof`(values) == "string"
        val _values = if (isLocale) {
            null
        } else {
            values
        }
        val _locale = if (isLocale) {
            values as String
        } else {
            locale
        }
        return this.global.t(key, _values, _locale)
    }
    open fun `$tc`(key: String, choice: Number? = null, values: Any? = null, locale: String? = null): String {
        val isLocale = UTSAndroid.`typeof`(values) == "string"
        val _values = if (isLocale) {
            null
        } else {
            values
        }
        val _locale = if (isLocale) {
            values as String
        } else {
            locale
        }
        return this.global.tc(key, choice, _values, _locale)
    }
    open fun `$d`(date: Any, key: String? = null, locale: String? = null, options: UTSJSONObject? = null): String {
        return this.global.d(date, key, locale, options)
    }
    open fun `$n`(number: Number, key: String? = null, locale: Any? = null, options: UTSJSONObject? = null): String {
        val _locale = if (UTSAndroid.`typeof`(locale) == "string") {
            locale as String
        } else {
            null
        }
        val _options = if (UTSAndroid.`typeof`(locale) == "object" && locale != null) {
            locale as UTSJSONObject
        } else {
            options
        }
        return this.global.n(number, key, _locale, _options)
    }
    open val install: VuePlugin
        get(): VuePlugin {
            val _install = fun(app: VueApp){
                app.config.globalProperties["\$i18n"] = true
                app.config.globalProperties["\$t"] = true
                app.config.globalProperties["\$tc"] = true
                app.config.globalProperties["\$d"] = true
                app.config.globalProperties["\$n"] = true
                app.config.globalProperties["\$locale"] = true
            }
            return definePlugin(VuePlugin(install = _install))
        }
}
fun createI18n(options: UTSJSONObject = _uO()): UvueI18n {
    lime_i18n = UvueI18n(options)
    return lime_i18n!!
}
val zhCN: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("zhCN", "locales/zh-CN.uts", 1, 14), "recharge" to "充值")
val enUS: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("enUS", "locales/en_US.uts", 1, 14), "recharge" to "Recharge")
val i18n = createI18n(_uO("locale" to "zh-CN", "fallbackLocale" to "en-US", "messages" to _uO("zh-CN" to zhCN, "en-US" to enUS)))
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
                    console.log("图标字体加载成功", " at App.uvue:17")
                }
                , fail = fun(err){
                    console.log("图标字体加载失败", err, " at App.uvue:20")
                }
                ))
                console.log("App Launch", " at App.uvue:24")
            }
            )
            onAppShow(fun(_options){
                console.log("App Show", " at App.uvue:90")
            }
            )
            onAppHide(fun(){
                console.log("App Hide", " at App.uvue:94")
            }
            )
            onLastPageBackPress(fun(){
                console.log("App LastPageBackPress", " at App.uvue:99")
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
                console.log("App Exit", " at App.uvue:116")
            }
            )
            return fun(): Any? {
                return null
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("rice-theme-light" to _pS(_uM("--rice-primary-color" to "#1989fa", "--rice-primary-color-1" to "#e6f7ff", "--rice-primary-color-7" to "#0b68d4", "--rice-success-color" to "#07c160", "--rice-success-color-1" to "#e6ffee", "--rice-success-color-7" to "#009c50", "--rice-warning-color" to "#e6a23c", "--rice-warning-color-1" to "#fffbe8", "--rice-warning-color-7" to "#bf7e28", "--rice-error-color" to "#f56c6c", "--rice-error-color-1" to "#fff2f0", "--rice-error-color-7" to "#cf5155", "--rice-text-color" to "#323233", "--rice-text-color-2" to "#969799", "--rice-text-color-3" to "#c8c9cc", "--rice-text-color-white" to "#fff", "--rice-border-color" to "#ebedf0", "--rice-background" to "#f7f8fa", "--rice-background-2" to "#fff", "--rice-hover-color" to "#f2f3f5", "--rice-action-sheet-background" to "#f3f3f3", "--rice-action-sheet-menu-background" to "#fff", "--rice-action-sheet-hover-background" to "#f2f3f5", "--rice-action-sheet-cancel-text-color" to "#646566", "--rice-action-sheet-menu-disabled-text-color" to "#c8c9cc", "--rice-avatar-placeholder-background" to "#f7f8fa", "--rice-back-top-background" to "#fff", "--rice-button-default-border" to "#eaecf1", "--rice-button-default-background" to "#fff", "--rice-button-default-hover-background" to "#f1f1f1", "--rice-button-info-background" to "#e1e1e1", "--rice-button-info-hover-background" to "#c1c1c1", "--rice-calendar-background" to "#fff", "--rice-calendar-info-text" to "#969799", "--rice-calendar-disabled-text" to "#c8c9cc", "--rice-cascader-background" to "#fff", "--rice-cascader-disabled-text-color" to "rgba(0, 0, 0, .26)", "--rice-cell-background" to "#fff", "--rice-collapse-background" to "#fff", "--rice-code-input-background" to "#f2f2f2", "--rice-checkbox-disabled-background" to "#ebedf0", "--rice-checkbox-disabled-border-color" to "#c8c9cc", "--rice-checkbox-border-color" to "#c8c9cc", "--rice-checkbox-label-disabled-color" to "#c8c9cc", "--rice-color-picker-background" to "#fff", "--rice-dialog-background" to "#fff", "--rice-dialog-message-text-color" to "#969799", "--rice-radio-disabled-background" to "#ebedf0", "--rice-radio-disabled-border-color" to "#c8c9cc", "--rice-radio-border-color" to "#c8c9cc", "--rice-radio-label-disabled-color" to "#c8c9cc", "--rice-divider-line-color" to "#d6d7d9", "--rice-form-error-color" to "#ee0a24", "--rice-form-item-border" to "#e7e7e7", "--rice-grid-background" to "#fff", "--rice-image-placeholder-background" to "#f7f8fa", "--rice-image-icon-color" to "#dcdee0", "--rice-navbar-background" to "#fff", "--rice-progress-background" to "#ebedf0", "--rice-qrcode-status-background" to "rgba(255, 255, 255, .8)", "--rice-rate-color" to "#ee0a24", "--rice-rate-void-color" to "#cdd0d6", "--rice-scroll-x-indicator-background" to "#f1f1f1", "--rice-switch-background" to "#dcdcdc", "--rice-stepper-background" to "#f2f3f5", "--rice-slider-inactive-background" to "#dcdcdc", "--rice-signature-border-color" to "#dadada", "--rice-signature-background" to "#fff", "--rice-overlay-background" to "rgba(0, 0, 0, .7)", "--rice-picker-background" to "#fff", "--rice-picker-loading-background" to "rgba(255, 255, 255, .8)", "--rice-picker-disabled-text-color" to "rgba(0, 0, 0, .26)", "--rice-tag-default-border" to "#dcdfe6", "--rice-tabs-background" to "#fff", "--rice-tabs-disabled-text-color" to "#c8c9cc", "--rice-input-border-color" to "#dcdfe6", "--rice-input-disabled-background" to "#f5f7fa", "--rice-input-disabled-text-color" to "#c0c4cc", "--rice-textarea-background" to "#fff", "--rice-textarea-border-color" to "#dcdfe6", "--rice-textarea-disabled-background" to "#f5f7fa", "--rice-textarea-disabled-text-color" to "#c0c4cc", "--rice-subsection-background" to "#eee", "--rice-subsection-bar-background" to "#fff", "--rice-search-background" to "#fff", "--rice-search-input-background" to "#f7f8fa", "--rice-uploader-background" to "#f7f8fa")), "rice-theme-dark" to _pS(_uM("--rice-primary-color" to "#1989fa", "--rice-primary-color-1" to "#111c2b", "--rice-primary-color-7" to "#3d98e8", "--rice-success-color" to "#07c160", "--rice-success-color-1" to "#11231b", "--rice-success-color-7" to "#27bc6a", "--rice-warning-color" to "#e6a23c", "--rice-warning-color-1" to "#281f15", "--rice-warning-color-7" to "#dcae5e", "--rice-error-color" to "#f56c6c", "--rice-error-color-1" to "#2a1a1b", "--rice-error-color-7" to "#e88e8c", "--rice-border-color" to "#3a3a3c", "--rice-text-color" to "#f5f5f5", "--rice-text-color-2" to "#707070", "--rice-text-color-3" to "#4d4d4d", "--rice-text-color-white" to "#f5f5f5", "--rice-background" to "#181818", "--rice-background-2" to "#242424", "--rice-hover-color" to "#3a3a3c", "--rice-action-sheet-background" to "#181818", "--rice-action-sheet-menu-background" to "#242424", "--rice-action-sheet-hover-background" to "#3a3a3c", "--rice-action-sheet-cancel-text-color" to "#a6acaf", "--rice-action-sheet-menu-disabled-text-color" to "#4d4d4d", "--rice-avatar-placeholder-background" to "#262727", "--rice-back-top-background" to "#242424", "--rice-button-default-border" to "#383838", "--rice-button-default-background" to "#383838", "--rice-button-default-hover-background" to "#4b4b4b", "--rice-button-info-background" to "#2b2b2b", "--rice-button-info-hover-background" to "#3b3b3b", "--rice-calendar-background" to "#242424", "--rice-calendar-info-text" to "#cdcbcb", "--rice-calendar-disabled-text" to "#646566", "--rice-cascader-background" to "#242424", "--rice-cascader-disabled-text-color" to "rgba(255, 255, 255, .35)", "--rice-cell-background" to "#242424", "--rice-collapse-background" to "#242424", "--rice-code-input-background" to "#242424", "--rice-checkbox-disabled-background" to "#3a3a3c", "--rice-checkbox-border-color" to "#c8c9cc", "--rice-checkbox-disabled-border-color" to "#c8c9cc", "--rice-checkbox-label-disabled-color" to "#4d4d4d", "--rice-color-picker-background" to "#242424", "--rice-dialog-background" to "#242424", "--rice-dialog-message-text-color" to "rgba(255, 255, 255, .55)", "--rice-radio-disabled-background" to "#3a3a3c", "--rice-radio-border-color" to "#c8c9cc", "--rice-radio-disabled-border-color" to "#c8c9cc", "--rice-radio-label-disabled-color" to "#4d4d4d", "--rice-divider-line-color" to "#3a3a3c", "--rice-form-error-color" to "#ee0a24", "--rice-form-item-border" to "#3a3a3c", "--rice-grid-background" to "#242424", "--rice-image-placeholder-background" to "#262727", "--rice-image-icon-color" to "#8d9095", "--rice-navbar-background" to "#181818", "--rice-progress-background" to "#363637", "--rice-qrcode-status-background" to "rgba(0, 0, 0, .7)", "--rice-rate-color" to "#ee0a24", "--rice-rate-void-color" to "#636466", "--rice-scroll-x-indicator-background" to "#262727", "--rice-switch-background" to "#3a3a3a", "--rice-stepper-background" to "#3a3a3c", "--rice-signature-background" to "#242424", "--rice-signature-border-color" to "#dadada", "--rice-slider-inactive-background" to "#383838", "--rice-overlay-background" to "rgba(0, 0, 0, .6)", "--rice-picker-background" to "#181818", "--rice-picker-loading-background" to "rgba(0, 0, 0, .7)", "--rice-picker-disabled-text-color" to "rgba(255, 255, 255, .35)", "--rice-tag-default-border" to "#a5a5a5", "--rice-tabs-background" to "#242424", "--rice-tabs-disabled-text-color" to "#4d4d4d", "--rice-input-border-color" to "#4c4d4f", "--rice-input-disabled-background" to "#262727", "--rice-input-disabled-text-color" to "#8d9095", "--rice-textarea-background" to "#242424", "--rice-textarea-border-color" to "#4c4d4f", "--rice-textarea-disabled-background" to "#262727", "--rice-textarea-disabled-text-color" to "#8d9095", "--rice-subsection-background" to "#2c2c2c", "--rice-subsection-bar-background" to "#242424", "--rice-search-input-background" to "#181818", "--rice-search-background" to "#242424", "--rice-uploader-background" to "#262727")), "rice-safearea-bottom" to _pS(_uM("paddingBottom" to "var(--uni-safe-area-inset-bottom)")), "rice-safearea-top" to _pS(_uM("paddingTop" to "var(--uni-safe-area-inset-top)")), "uni-row" to _pS(_uM("flexDirection" to "row")), "uni-column" to _pS(_uM("flexDirection" to "column")), "mr-24" to _pS(_uM("!marginRight" to "24rpx")), "ml-24" to _pS(_uM("!marginLeft" to "24rpx")), "mb-24" to _pS(_uM("!marginBottom" to "24rpx")), "mt-24" to _pS(_uM("!marginTop" to "24rpx")))
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
open class LoginData (
    @JsonNotNull
    open var id: Number,
    @JsonNotNull
    open var token: String,
    @JsonNotNull
    open var access_token: String,
    @JsonNotNull
    open var refreshToken: String,
    @JsonNotNull
    open var userId: Number,
    @JsonNotNull
    open var nickname: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LoginData", "api/types.uts", 2, 13)
    }
}
open class CountryData (
    @JsonNotNull
    open var fullName: String,
    @JsonNotNull
    open var letterCode: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CountryData", "api/types.uts", 11, 13)
    }
}
open class TenantInfoData (
    @JsonNotNull
    open var rechargeTip: String,
    @JsonNotNull
    open var servicePhone: String,
    @JsonNotNull
    open var serviceQrcode: String,
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
    @JsonNotNull
    open var h5IsPullMini: String,
    @JsonNotNull
    open var h5PayType: String,
    @JsonNotNull
    open var serviceJumpUrl: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TenantInfoData", "api/types.uts", 16, 13)
    }
}
open class QueryCardListParams (
    open var rechargeNo: String? = null,
    @JsonNotNull
    open var status: String,
    open var isSort: Boolean? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("QueryCardListParams", "api/types.uts", 30, 13)
    }
}
open class CardListSumData (
    @JsonNotNull
    open var all: Number,
    @JsonNotNull
    open var inUse: Number,
    @JsonNotNull
    open var inNotUse: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CardListSumData", "api/types.uts", 36, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return CardListSumDataReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class CardListSumDataReactiveObject : CardListSumData, IUTSReactive<CardListSumData> {
    override var __v_raw: CardListSumData
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: CardListSumData, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(all = __v_raw.all, inUse = __v_raw.inUse, inNotUse = __v_raw.inNotUse) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): CardListSumDataReactiveObject {
        return CardListSumDataReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var all: Number
        get() {
            return _tRG(__v_raw, "all", __v_raw.all, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("all")) {
                return
            }
            val oldValue = __v_raw.all
            __v_raw.all = value
            _tRS(__v_raw, "all", oldValue, value)
        }
    override var inUse: Number
        get() {
            return _tRG(__v_raw, "inUse", __v_raw.inUse, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("inUse")) {
                return
            }
            val oldValue = __v_raw.inUse
            __v_raw.inUse = value
            _tRS(__v_raw, "inUse", oldValue, value)
        }
    override var inNotUse: Number
        get() {
            return _tRG(__v_raw, "inNotUse", __v_raw.inNotUse, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("inNotUse")) {
                return
            }
            val oldValue = __v_raw.inNotUse
            __v_raw.inNotUse = value
            _tRS(__v_raw, "inNotUse", oldValue, value)
        }
}
open class PkgXcxVo (
    @JsonNotNull
    open var pkgId: String,
    @JsonNotNull
    open var pkgName: String,
    @JsonNotNull
    open var pkgCategory: String,
    @JsonNotNull
    open var pkgType: String,
    open var validityPeriod: String? = null,
    open var pkgFlow: String? = null,
    @JsonNotNull
    open var crossedOutPrice: String,
    @JsonNotNull
    open var sellingPrice: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PkgXcxVo", "api/types.uts", 61, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return PkgXcxVoReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class PkgXcxVoReactiveObject : PkgXcxVo, IUTSReactive<PkgXcxVo> {
    override var __v_raw: PkgXcxVo
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: PkgXcxVo, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(pkgId = __v_raw.pkgId, pkgName = __v_raw.pkgName, pkgCategory = __v_raw.pkgCategory, pkgType = __v_raw.pkgType, validityPeriod = __v_raw.validityPeriod, pkgFlow = __v_raw.pkgFlow, crossedOutPrice = __v_raw.crossedOutPrice, sellingPrice = __v_raw.sellingPrice) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): PkgXcxVoReactiveObject {
        return PkgXcxVoReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var pkgId: String
        get() {
            return _tRG(__v_raw, "pkgId", __v_raw.pkgId, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgId")) {
                return
            }
            val oldValue = __v_raw.pkgId
            __v_raw.pkgId = value
            _tRS(__v_raw, "pkgId", oldValue, value)
        }
    override var pkgName: String
        get() {
            return _tRG(__v_raw, "pkgName", __v_raw.pkgName, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgName")) {
                return
            }
            val oldValue = __v_raw.pkgName
            __v_raw.pkgName = value
            _tRS(__v_raw, "pkgName", oldValue, value)
        }
    override var pkgCategory: String
        get() {
            return _tRG(__v_raw, "pkgCategory", __v_raw.pkgCategory, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgCategory")) {
                return
            }
            val oldValue = __v_raw.pkgCategory
            __v_raw.pkgCategory = value
            _tRS(__v_raw, "pkgCategory", oldValue, value)
        }
    override var pkgType: String
        get() {
            return _tRG(__v_raw, "pkgType", __v_raw.pkgType, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgType")) {
                return
            }
            val oldValue = __v_raw.pkgType
            __v_raw.pkgType = value
            _tRS(__v_raw, "pkgType", oldValue, value)
        }
    override var validityPeriod: String?
        get() {
            return _tRG(__v_raw, "validityPeriod", __v_raw.validityPeriod, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("validityPeriod")) {
                return
            }
            val oldValue = __v_raw.validityPeriod
            __v_raw.validityPeriod = value
            _tRS(__v_raw, "validityPeriod", oldValue, value)
        }
    override var pkgFlow: String?
        get() {
            return _tRG(__v_raw, "pkgFlow", __v_raw.pkgFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgFlow")) {
                return
            }
            val oldValue = __v_raw.pkgFlow
            __v_raw.pkgFlow = value
            _tRS(__v_raw, "pkgFlow", oldValue, value)
        }
    override var crossedOutPrice: String
        get() {
            return _tRG(__v_raw, "crossedOutPrice", __v_raw.crossedOutPrice, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("crossedOutPrice")) {
                return
            }
            val oldValue = __v_raw.crossedOutPrice
            __v_raw.crossedOutPrice = value
            _tRS(__v_raw, "crossedOutPrice", oldValue, value)
        }
    override var sellingPrice: String
        get() {
            return _tRG(__v_raw, "sellingPrice", __v_raw.sellingPrice, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("sellingPrice")) {
                return
            }
            val oldValue = __v_raw.sellingPrice
            __v_raw.sellingPrice = value
            _tRS(__v_raw, "sellingPrice", oldValue, value)
        }
}
open class RechargeData (
    @JsonNotNull
    open var rechargeNo: String,
    @JsonNotNull
    open var pkgName: String,
    @JsonNotNull
    open var status: String,
    @JsonNotNull
    open var statusStr: String,
    @JsonNotNull
    open var effectiveTime: String,
    open var expirationTime: String? = null,
    open var pkgFlow: String? = null,
    open var usedFlow: String? = null,
    open var unUsedFlow: String? = null,
    open var usedPeriod: String? = null,
    open var totalPeriod: String? = null,
    open var currentPeriodStartTime: String? = null,
    open var currentPeriodEndTime: String? = null,
    @JsonNotNull
    open var isBind: Boolean = false,
    @JsonNotNull
    open var pkgXcxVos: UTSArray<PkgXcxVo>,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RechargeData", "api/types.uts", 71, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return RechargeDataReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class RechargeDataReactiveObject : RechargeData, IUTSReactive<RechargeData> {
    override var __v_raw: RechargeData
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: RechargeData, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(rechargeNo = __v_raw.rechargeNo, pkgName = __v_raw.pkgName, status = __v_raw.status, statusStr = __v_raw.statusStr, effectiveTime = __v_raw.effectiveTime, expirationTime = __v_raw.expirationTime, pkgFlow = __v_raw.pkgFlow, usedFlow = __v_raw.usedFlow, unUsedFlow = __v_raw.unUsedFlow, usedPeriod = __v_raw.usedPeriod, totalPeriod = __v_raw.totalPeriod, currentPeriodStartTime = __v_raw.currentPeriodStartTime, currentPeriodEndTime = __v_raw.currentPeriodEndTime, isBind = __v_raw.isBind, pkgXcxVos = __v_raw.pkgXcxVos) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): RechargeDataReactiveObject {
        return RechargeDataReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var rechargeNo: String
        get() {
            return _tRG(__v_raw, "rechargeNo", __v_raw.rechargeNo, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("rechargeNo")) {
                return
            }
            val oldValue = __v_raw.rechargeNo
            __v_raw.rechargeNo = value
            _tRS(__v_raw, "rechargeNo", oldValue, value)
        }
    override var pkgName: String
        get() {
            return _tRG(__v_raw, "pkgName", __v_raw.pkgName, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgName")) {
                return
            }
            val oldValue = __v_raw.pkgName
            __v_raw.pkgName = value
            _tRS(__v_raw, "pkgName", oldValue, value)
        }
    override var status: String
        get() {
            return _tRG(__v_raw, "status", __v_raw.status, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("status")) {
                return
            }
            val oldValue = __v_raw.status
            __v_raw.status = value
            _tRS(__v_raw, "status", oldValue, value)
        }
    override var statusStr: String
        get() {
            return _tRG(__v_raw, "statusStr", __v_raw.statusStr, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("statusStr")) {
                return
            }
            val oldValue = __v_raw.statusStr
            __v_raw.statusStr = value
            _tRS(__v_raw, "statusStr", oldValue, value)
        }
    override var effectiveTime: String
        get() {
            return _tRG(__v_raw, "effectiveTime", __v_raw.effectiveTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("effectiveTime")) {
                return
            }
            val oldValue = __v_raw.effectiveTime
            __v_raw.effectiveTime = value
            _tRS(__v_raw, "effectiveTime", oldValue, value)
        }
    override var expirationTime: String?
        get() {
            return _tRG(__v_raw, "expirationTime", __v_raw.expirationTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("expirationTime")) {
                return
            }
            val oldValue = __v_raw.expirationTime
            __v_raw.expirationTime = value
            _tRS(__v_raw, "expirationTime", oldValue, value)
        }
    override var pkgFlow: String?
        get() {
            return _tRG(__v_raw, "pkgFlow", __v_raw.pkgFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgFlow")) {
                return
            }
            val oldValue = __v_raw.pkgFlow
            __v_raw.pkgFlow = value
            _tRS(__v_raw, "pkgFlow", oldValue, value)
        }
    override var usedFlow: String?
        get() {
            return _tRG(__v_raw, "usedFlow", __v_raw.usedFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("usedFlow")) {
                return
            }
            val oldValue = __v_raw.usedFlow
            __v_raw.usedFlow = value
            _tRS(__v_raw, "usedFlow", oldValue, value)
        }
    override var unUsedFlow: String?
        get() {
            return _tRG(__v_raw, "unUsedFlow", __v_raw.unUsedFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("unUsedFlow")) {
                return
            }
            val oldValue = __v_raw.unUsedFlow
            __v_raw.unUsedFlow = value
            _tRS(__v_raw, "unUsedFlow", oldValue, value)
        }
    override var usedPeriod: String?
        get() {
            return _tRG(__v_raw, "usedPeriod", __v_raw.usedPeriod, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("usedPeriod")) {
                return
            }
            val oldValue = __v_raw.usedPeriod
            __v_raw.usedPeriod = value
            _tRS(__v_raw, "usedPeriod", oldValue, value)
        }
    override var totalPeriod: String?
        get() {
            return _tRG(__v_raw, "totalPeriod", __v_raw.totalPeriod, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("totalPeriod")) {
                return
            }
            val oldValue = __v_raw.totalPeriod
            __v_raw.totalPeriod = value
            _tRS(__v_raw, "totalPeriod", oldValue, value)
        }
    override var currentPeriodStartTime: String?
        get() {
            return _tRG(__v_raw, "currentPeriodStartTime", __v_raw.currentPeriodStartTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("currentPeriodStartTime")) {
                return
            }
            val oldValue = __v_raw.currentPeriodStartTime
            __v_raw.currentPeriodStartTime = value
            _tRS(__v_raw, "currentPeriodStartTime", oldValue, value)
        }
    override var currentPeriodEndTime: String?
        get() {
            return _tRG(__v_raw, "currentPeriodEndTime", __v_raw.currentPeriodEndTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("currentPeriodEndTime")) {
                return
            }
            val oldValue = __v_raw.currentPeriodEndTime
            __v_raw.currentPeriodEndTime = value
            _tRS(__v_raw, "currentPeriodEndTime", oldValue, value)
        }
    override var isBind: Boolean
        get() {
            return _tRG(__v_raw, "isBind", __v_raw.isBind, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isBind")) {
                return
            }
            val oldValue = __v_raw.isBind
            __v_raw.isBind = value
            _tRS(__v_raw, "isBind", oldValue, value)
        }
    override var pkgXcxVos: UTSArray<PkgXcxVo>
        get() {
            return _tRG(__v_raw, "pkgXcxVos", __v_raw.pkgXcxVos, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgXcxVos")) {
                return
            }
            val oldValue = __v_raw.pkgXcxVos
            __v_raw.pkgXcxVos = value
            _tRS(__v_raw, "pkgXcxVos", oldValue, value)
        }
}
open class BindCard (
    @JsonNotNull
    open var rechargeNo: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("BindCard", "api/types.uts", 94, 13)
    }
}
open class PkgInfoListParams (
    @JsonNotNull
    open var rechargeNo: String,
    @JsonNotNull
    open var status: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PkgInfoListParams", "api/types.uts", 98, 13)
    }
}
open class PkgInfoItem (
    @JsonNotNull
    open var id: String,
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var status: String,
    @JsonNotNull
    open var statusText: String,
    @JsonNotNull
    open var tagType: String,
    @JsonNotNull
    open var startTime: String,
    @JsonNotNull
    open var endTime: String,
    @JsonNotNull
    open var totalFlow: String,
    @JsonNotNull
    open var usedFlow: String,
    @JsonNotNull
    open var leftFlow: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PkgInfoItem", "api/types.uts", 102, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return PkgInfoItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class PkgInfoItemReactiveObject : PkgInfoItem, IUTSReactive<PkgInfoItem> {
    override var __v_raw: PkgInfoItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: PkgInfoItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, name = __v_raw.name, status = __v_raw.status, statusText = __v_raw.statusText, tagType = __v_raw.tagType, startTime = __v_raw.startTime, endTime = __v_raw.endTime, totalFlow = __v_raw.totalFlow, usedFlow = __v_raw.usedFlow, leftFlow = __v_raw.leftFlow) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): PkgInfoItemReactiveObject {
        return PkgInfoItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
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
    override var status: String
        get() {
            return _tRG(__v_raw, "status", __v_raw.status, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("status")) {
                return
            }
            val oldValue = __v_raw.status
            __v_raw.status = value
            _tRS(__v_raw, "status", oldValue, value)
        }
    override var statusText: String
        get() {
            return _tRG(__v_raw, "statusText", __v_raw.statusText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("statusText")) {
                return
            }
            val oldValue = __v_raw.statusText
            __v_raw.statusText = value
            _tRS(__v_raw, "statusText", oldValue, value)
        }
    override var tagType: String
        get() {
            return _tRG(__v_raw, "tagType", __v_raw.tagType, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("tagType")) {
                return
            }
            val oldValue = __v_raw.tagType
            __v_raw.tagType = value
            _tRS(__v_raw, "tagType", oldValue, value)
        }
    override var startTime: String
        get() {
            return _tRG(__v_raw, "startTime", __v_raw.startTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("startTime")) {
                return
            }
            val oldValue = __v_raw.startTime
            __v_raw.startTime = value
            _tRS(__v_raw, "startTime", oldValue, value)
        }
    override var endTime: String
        get() {
            return _tRG(__v_raw, "endTime", __v_raw.endTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("endTime")) {
                return
            }
            val oldValue = __v_raw.endTime
            __v_raw.endTime = value
            _tRS(__v_raw, "endTime", oldValue, value)
        }
    override var totalFlow: String
        get() {
            return _tRG(__v_raw, "totalFlow", __v_raw.totalFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("totalFlow")) {
                return
            }
            val oldValue = __v_raw.totalFlow
            __v_raw.totalFlow = value
            _tRS(__v_raw, "totalFlow", oldValue, value)
        }
    override var usedFlow: String
        get() {
            return _tRG(__v_raw, "usedFlow", __v_raw.usedFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("usedFlow")) {
                return
            }
            val oldValue = __v_raw.usedFlow
            __v_raw.usedFlow = value
            _tRS(__v_raw, "usedFlow", oldValue, value)
        }
    override var leftFlow: String
        get() {
            return _tRG(__v_raw, "leftFlow", __v_raw.leftFlow, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("leftFlow")) {
                return
            }
            val oldValue = __v_raw.leftFlow
            __v_raw.leftFlow = value
            _tRS(__v_raw, "leftFlow", oldValue, value)
        }
}
open class QueryOrderListXcxData (
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var msg: String,
    @JsonNotNull
    open var rows: UTSArray<OrderListXcxItem>,
    @JsonNotNull
    open var total: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("QueryOrderListXcxData", "api/types.uts", 119, 13)
    }
}
open class OrderListXcxItem (
    @JsonNotNull
    open var id: Number,
    @JsonNotNull
    open var orderNo: String,
    @JsonNotNull
    open var cardNo: String,
    open var iccid: String? = null,
    @JsonNotNull
    open var pkgName: String,
    @JsonNotNull
    open var createTime: String,
    @JsonNotNull
    open var status: String,
    @JsonNotNull
    open var payCurrencyAmount: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("OrderListXcxItem", "api/types.uts", 125, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return OrderListXcxItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class OrderListXcxItemReactiveObject : OrderListXcxItem, IUTSReactive<OrderListXcxItem> {
    override var __v_raw: OrderListXcxItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: OrderListXcxItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(id = __v_raw.id, orderNo = __v_raw.orderNo, cardNo = __v_raw.cardNo, iccid = __v_raw.iccid, pkgName = __v_raw.pkgName, createTime = __v_raw.createTime, status = __v_raw.status, payCurrencyAmount = __v_raw.payCurrencyAmount) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): OrderListXcxItemReactiveObject {
        return OrderListXcxItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var id: Number
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
    override var orderNo: String
        get() {
            return _tRG(__v_raw, "orderNo", __v_raw.orderNo, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("orderNo")) {
                return
            }
            val oldValue = __v_raw.orderNo
            __v_raw.orderNo = value
            _tRS(__v_raw, "orderNo", oldValue, value)
        }
    override var cardNo: String
        get() {
            return _tRG(__v_raw, "cardNo", __v_raw.cardNo, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cardNo")) {
                return
            }
            val oldValue = __v_raw.cardNo
            __v_raw.cardNo = value
            _tRS(__v_raw, "cardNo", oldValue, value)
        }
    override var iccid: String?
        get() {
            return _tRG(__v_raw, "iccid", __v_raw.iccid, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("iccid")) {
                return
            }
            val oldValue = __v_raw.iccid
            __v_raw.iccid = value
            _tRS(__v_raw, "iccid", oldValue, value)
        }
    override var pkgName: String
        get() {
            return _tRG(__v_raw, "pkgName", __v_raw.pkgName, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("pkgName")) {
                return
            }
            val oldValue = __v_raw.pkgName
            __v_raw.pkgName = value
            _tRS(__v_raw, "pkgName", oldValue, value)
        }
    override var createTime: String
        get() {
            return _tRG(__v_raw, "createTime", __v_raw.createTime, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("createTime")) {
                return
            }
            val oldValue = __v_raw.createTime
            __v_raw.createTime = value
            _tRS(__v_raw, "createTime", oldValue, value)
        }
    override var status: String
        get() {
            return _tRG(__v_raw, "status", __v_raw.status, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("status")) {
                return
            }
            val oldValue = __v_raw.status
            __v_raw.status = value
            _tRS(__v_raw, "status", oldValue, value)
        }
    override var payCurrencyAmount: String
        get() {
            return _tRG(__v_raw, "payCurrencyAmount", __v_raw.payCurrencyAmount, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("payCurrencyAmount")) {
                return
            }
            val oldValue = __v_raw.payCurrencyAmount
            __v_raw.payCurrencyAmount = value
            _tRS(__v_raw, "payCurrencyAmount", oldValue, value)
        }
}
open class Refund (
    @JsonNotNull
    open var property1: String,
    @JsonNotNull
    open var property2: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Refund", "api/types.uts", 135, 13)
    }
}
open class QueryOrderDetailXcxData (
    @JsonNotNull
    open var orderNo: String,
    @JsonNotNull
    open var rechargeNo: String,
    @JsonNotNull
    open var pkgName: String,
    @JsonNotNull
    open var pkgCategory: String,
    @JsonNotNull
    open var pkgType: String,
    @JsonNotNull
    open var pkgFlow: Number,
    @JsonNotNull
    open var validityPeriod: String,
    @JsonNotNull
    open var startDate: String,
    @JsonNotNull
    open var endDate: String,
    @JsonNotNull
    open var status: String,
    @JsonNotNull
    open var pkgRefundStatus: String,
    @JsonNotNull
    open var orderAmount: Number,
    @JsonNotNull
    open var payAmount: Number,
    @JsonNotNull
    open var orderCreateTime: String,
    @JsonNotNull
    open var payTime: String,
    @JsonNotNull
    open var refunds: UTSArray<Refund>,
    @JsonNotNull
    open var cancelTime: String,
    @JsonNotNull
    open var payFailTime: String,
    @JsonNotNull
    open var payFailReason: String,
    @JsonNotNull
    open var usageInstructions: String,
    @JsonNotNull
    open var currentSeconds: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("QueryOrderDetailXcxData", "api/types.uts", 139, 13)
    }
}
open class QueryOrderSuccessParams (
    @JsonNotNull
    open var orderNo: String,
    @JsonNotNull
    open var validityPeriod: String,
    @JsonNotNull
    open var availableRegions: UTSArray<String>,
    @JsonNotNull
    open var pkgName: String,
    @JsonNotNull
    open var pkgCategory: String,
    @JsonNotNull
    open var pkgType: String,
    @JsonNotNull
    open var msisdn: String,
    @JsonNotNull
    open var iccid: String,
    @JsonNotNull
    open var payTypeVos: UTSArray<Any>,
    @JsonNotNull
    open var currencyCode: String,
    @JsonNotNull
    open var payAmount: String,
    @JsonNotNull
    open var createTime: String,
    @JsonNotNull
    open var payTime: String,
    @JsonNotNull
    open var status: String,
    @JsonNotNull
    open var payCurrencyAmount: String,
    @JsonNotNull
    open var symbol: String,
    @JsonNotNull
    open var signPosition: String,
    @JsonNotNull
    open var payType: String,
    @JsonNotNull
    open var rechargeNo: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("QueryOrderSuccessParams", "api/types.uts", 162, 13)
    }
}
open class Config (
    @JsonNotNull
    open var theme: String,
    @JsonNotNull
    open var unit: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Config", "uni_modules/rice-ui/libs/store/useConfig.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ConfigReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ConfigReactiveObject : Config, IUTSReactive<Config> {
    override var __v_raw: Config
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: Config, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(theme = __v_raw.theme, unit = __v_raw.unit) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ConfigReactiveObject {
        return ConfigReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var theme: String
        get() {
            return _tRG(__v_raw, "theme", __v_raw.theme, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("theme")) {
                return
            }
            val oldValue = __v_raw.theme
            __v_raw.theme = value
            _tRS(__v_raw, "theme", oldValue, value)
        }
    override var unit: String
        get() {
            return _tRG(__v_raw, "unit", __v_raw.unit, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("unit")) {
                return
            }
            val oldValue = __v_raw.unit
            __v_raw.unit = value
            _tRS(__v_raw, "unit", oldValue, value)
        }
}
val config__1 = reactive<Config>(Config(theme = "light", unit = "px"))
val isDark = computed(fun(): Boolean {
    return config__1.theme == "dark"
}
)
typealias BeforeChangeInterceptor = () -> Any
val addUnit = fun(value: Any): String {
    val isNumeric = UTSAndroid.`typeof`(value) == "number" || UTSRegExp("^\\d+(\\.\\d+)?\$", "").test(value as String)
    return if (isNumeric) {
        "" + value + config__1.unit
    } else {
        (value as String).toString()
    }
}
val clamp = fun(num: Number, min: Number, max: Number): Number {
    return Math.min(Math.max(num, min), max)
}
val closeto = fun(array: UTSArray<Number>, num: Number): Number {
    return array.reduce(fun(pre, next): Number {
        return if (Math.abs(pre - num) < Math.abs(next - num)) {
            pre
        } else {
            next
        }
    }
    )
}
fun getPxNum(reassignedValue: Any, totalWidth: Number = 0): Number {
    var value = reassignedValue
    if (UTSAndroid.`typeof`(value) == "number") {
        if (config__1.unit != "rpx") {
            return value as Number
        }
        value = (value as Number) + "rpx"
    }
    if ((value as String).endsWith("rpx")) {
        return uni_rpx2px(parseFloat(value as String))
    }
    if ((value as String).endsWith("%")) {
        return parseFloat(value as String) * 0.01 * totalWidth
    }
    return parseFloat(value as String)
}
fun getRandomStr(length: Number = 10): String {
    val characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    var result = ""
    run {
        var i: Number = 0
        while(i < length){
            val randomIndex = Math.floor(Math.random() * characters.length)
            result += characters.charAt(randomIndex)
            i++
        }
    }
    return result
}
val hasStrValue = fun(reassignedKVal: Any?): Boolean {
    var kVal = reassignedKVal
    if (kVal == null) {
        return false
    }
    if (UTSAndroid.`typeof`(kVal) != "string") {
        kVal = (kVal as Number).toString()
    }
    return (kVal as String).trim().length > 0
}
val toNum = fun(value: Any): Number {
    if (UTSAndroid.`typeof`(value) == "string") {
        return parseFloat(value as String)
    }
    return value as Number
}
val isGradientColor = fun(color: String?): Boolean {
    if (color == null || color == "") {
        return false
    }
    val gradientRegex = UTSRegExp("(linear-gradient|radial-gradient|conic-gradient)\\(", "i")
    return gradientRegex.test(color!!)
}
val isThemeColor = fun(type: String?): Boolean {
    if (type == null || type == "") {
        return false
    }
    return _uA(
        "primary",
        "success",
        "warning",
        "error"
    ).includes(type)
}
fun padZero(number: Any, len: Number = 2): String {
    val num = if (UTSAndroid.`typeof`(number) == "number") {
        (number as Number).toString()
    } else {
        number as String
    }
    return num.padStart(len, "0")
}
val isPromise = fun(kVal: Any): Boolean {
    return UTSAndroid.`typeof`(kVal) == "object" && kVal is UTSPromise<*>
}
open class InterceptorOption (
    open var done: () -> Unit,
    open var args: UTSArray<Any>? = null,
    open var canceled: (() -> Unit)? = null,
    open var error: (() -> Unit)? = null,
    open var undone: (() -> Unit)? = null,
    open var complete: (() -> Unit)? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("InterceptorOption", "uni_modules/rice-ui/libs/utils/basic.uts", 208, 13)
    }
}
fun callInterceptor(interceptor: BeforeChangeInterceptor, interceptorOption: InterceptorOption) {
    val done = interceptorOption.done
    val canceled = interceptorOption.canceled
    val error = interceptorOption.error
    val undone = interceptorOption.undone
    val complete = interceptorOption.complete
    val returnVal = interceptor!!()
    if (isPromise(returnVal)) {
        val promiseVal = returnVal as UTSPromise<Boolean>
        promiseVal.then(fun(result: Boolean){
            if (result == true) {
                done()
                if (complete != null) {
                    complete!!()
                }
            } else {
                if (canceled != null) {
                    canceled!!()
                }
                if (undone != null) {
                    undone!!()
                }
                if (complete != null) {
                    complete!!()
                }
            }
        }).`catch`(fun(){
            if (error != null) {
                error!!()
            }
            if (undone != null) {
                undone!!()
            }
            if (complete != null) {
                complete!!()
            }
        })
    } else {
        if (returnVal == true) {
            done()
        } else if (canceled != null) {
            canceled()
            if (undone != null) {
                undone!!()
            }
        }
        if (complete != null) {
            complete!!()
        }
    }
}
val getUID = fun(): String {
    return Date.now() + "" + Math.floor(Math.random() * 1e7)
}
fun debugWarn(scope: String, mess: String) {
    if ("development" != "production") {
        val err = "[RiceUI] " + scope + ":" + mess
        console.warn(err, " at uni_modules/rice-ui/libs/utils/debug.uts:4")
    }
}
open class CurrentTime (
    @JsonNotNull
    open var days: Number,
    @JsonNotNull
    open var hours: Number,
    @JsonNotNull
    open var minutes: Number,
    @JsonNotNull
    open var seconds: Number,
    @JsonNotNull
    open var milliseconds: Number,
    @JsonNotNull
    open var remainTime: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CurrentTime", "uni_modules/rice-ui/libs/use/useCountDown/index.uts", 2, 13)
    }
}
open class UseCountDownOptions (
    @JsonNotNull
    open var time: Number,
    open var millisecond: Boolean? = null,
    open var onChange: ((current: CurrentTime) -> Unit)? = null,
    open var onFinish: (() -> Unit)? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseCountDownOptions", "uni_modules/rice-ui/libs/use/useCountDown/index.uts", 10, 13)
    }
}
open class UseCountDownResult (
    @JsonNotNull
    open var current: ComputedRef<CurrentTime>,
    open var start: () -> Unit,
    open var pause: () -> Unit,
    open var reset: (totalTime: Number?) -> Unit,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseCountDownResult", "uni_modules/rice-ui/libs/use/useCountDown/index.uts", 16, 13)
    }
}
val SECOND: Number = 1000
val MINUTE = 60 * SECOND
val HOUR = 60 * MINUTE
val DAY = 24 * HOUR
val parseTime = fun(time: Number): CurrentTime {
    val days = Math.floor(time / DAY)
    val hours = Math.floor((time % DAY) / HOUR)
    val minutes = Math.floor((time % HOUR) / MINUTE)
    val seconds = Math.floor((time % MINUTE) / SECOND)
    val milliseconds = Math.floor(time % SECOND)
    return CurrentTime(days = days, hours = hours, minutes = minutes, seconds = seconds, milliseconds = milliseconds, remainTime = time)
}
val isSameSecond = fun(time1: Number, time2: Number): Boolean {
    return Math.floor(time1 / 1000) == Math.floor(time2 / 1000)
}
fun useCountDown(options: UseCountDownOptions): UseCountDownResult {
    var timerId = ref<Number?>(null)
    val runing = ref(false)
    val remainTime = ref(options.time)
    val endTime = ref(0)
    val current = computed(fun(): CurrentTime {
        return parseTime(remainTime.value)
    }
    )
    val clearTimer = fun(){
        if (timerId.value != null) {
            clearTimeout(timerId.value!!)
            timerId.value = null
        }
    }
    val pause = fun(){
        runing.value = false
        clearTimer()
    }
    val setRemainTime = fun(remain: Number){
        remainTime.value = remain
        options.onChange?.invoke(current.value)
        if (remain <= 0) {
            pause()
            options.onFinish?.invoke()
        }
    }
    val getRemainTime = fun(): Number {
        return Math.max(endTime.value - Date.now(), 0)
    }
    var millisecondTick: (() -> Unit)? = null
    var secondTick: (() -> Unit)? = null
    millisecondTick = fun(){
        clearTimer()
        timerId.value = setTimeout(fun(){
            setRemainTime(getRemainTime())
            if (remainTime.value > 0) {
                millisecondTick!!()
            }
        }
        , 30)
    }
    secondTick = fun(){
        clearTimer()
        timerId.value = setTimeout(fun(){
            val remain = getRemainTime()
            if (!isSameSecond(remain, remainTime.value) || remain == 0) {
                setRemainTime(remain)
            }
            if (remainTime.value > 0) {
                secondTick!!()
            }
        }
        , 30)
    }
    val toTick = fun(){
        if (options.millisecond == true) {
            millisecondTick!!()
        } else {
            secondTick!!()
        }
    }
    val start = fun(){
        if (!runing.value) {
            endTime.value = Date.now() + remainTime.value
            runing.value = true
            toTick()
        }
    }
    fun reset(reassignedTotalTime: Number?) {
        var totalTime = reassignedTotalTime
        if (totalTime == null) {
            totalTime = options.time
        }
        pause()
        remainTime.value = totalTime
    }
    onUnmounted(fun(){
        clearTimer()
    }
    )
    return UseCountDownResult(start = start, reset = fun(totalTime: Number?){
        return reset(totalTime)
    }
    , pause = pause, current = current)
}
fun useCssVar(prop: String, target: Ref<UniElement?>): Ref<String> {
    val variable = ref("")
    val updateCssVar = fun(){
        if (target.value != null && prop != "") {
            variable.value = target.value!!.style.getPropertyValue(prop)
        }
    }
    watch(_uA(
        target,
        isDark
    ), fun(): UTSPromise<Unit> {
        return wrapUTSPromise(suspend {
                await(nextTick())
                if (target.value != null) {
                    updateCssVar()
                }
        })
    }
    , WatchOptions(immediate = true))
    return variable
}
open class UseNamespace (
    open var b: (blockSuffix: String) -> String,
    open var e: (element: String?) -> String,
    open var m: (modifier: String?) -> String,
    open var `is`: (name: String, state: Boolean?) -> String,
    open var theme: () -> String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseNamespace", "uni_modules/rice-ui/libs/use/useNamespace/index.uts", 2, 13)
    }
}
val createBem = fun(block: String, blockSuffix: String, element: String, modifier: String): String {
    var cls = block
    if (blockSuffix != "") {
        cls += "-" + blockSuffix
    }
    if (element != "") {
        cls += "__" + element
    }
    if (modifier != "") {
        cls += "--" + modifier
    }
    return cls
}
fun useNamespace(block: String): UseNamespace {
    val prefix = "rice-" + block
    val b = fun(blockSuffix: String): String {
        return createBem(prefix, blockSuffix, "", "")
    }
    val e = fun(element: String?): String {
        return if ((element != null && element != "")) {
            createBem(prefix, "", element!!, "")
        } else {
            ""
        }
    }
    val m = fun(modifier: String?): String {
        return if ((modifier != null && modifier != "")) {
            createBem(prefix, "", "", modifier!!)
        } else {
            ""
        }
    }
    val kIs = fun(name: String, state: Boolean?): String {
        val symbol = if ((name.startsWith("-") || name.startsWith("_"))) {
            ""
        } else {
            "--"
        }
        return if (state == true) {
            prefix + symbol + name
        } else {
            ""
        }
    }
    val theme = fun(): String {
        return if (isDark.value) {
            "rice-theme-dark rice-variables"
        } else {
            "rice-theme-light rice-variables"
        }
    }
    return UseNamespace(b = b, e = e, m = m, `is` = kIs, theme = theme)
}
open class UsePopup (
    @JsonNotNull
    open var realShow: Ref<Boolean>,
    open var doClose: () -> Unit,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UsePopup", "uni_modules/rice-ui/libs/use/usePopup/index.uts", 4, 13)
    }
}
open class UsePopupOptions (
    @JsonNotNull
    open var show: Ref<Boolean>,
    open var position: Any? = null,
    open var duration: Any? = null,
    open var opacity: Any? = null,
    open var zoom: Any? = null,
    open var zoomScale: Number? = null,
    open var beforeClose: Ref<BeforeChangeInterceptor?>? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UsePopupOptions", "uni_modules/rice-ui/libs/use/usePopup/index.uts", 8, 13)
    }
}
fun usePopup(target: Ref<UniElement?>, options: UsePopupOptions): UsePopup {
    val show = options.show
    val instance = getCurrentInstance()!!
    val realShow = ref(false)
    val closing = ref(false)
    var openTimer: Number? = null
    var openedTimer: Number? = null
    var closeTimer: Number? = null
    val position = computed(fun(): String {
        return toValue(options.position ?: "bottom")
    }
    )
    val duration = computed(fun(): Number {
        return toValue(options.duration ?: 300)
    }
    )
    val isOpacity = computed(fun(): Boolean {
        return toValue(options.opacity ?: false)
    }
    )
    val isZoom = computed(fun(): Boolean {
        return toValue(options.zoom ?: true)
    }
    )
    val handleOpenTimer = fun(){
        if (openTimer != null) {
            clearTimeout(openTimer!!)
        }
        if (openedTimer != null) {
            clearTimeout(openedTimer!!)
        }
    }
    val handleCloseTimer = fun(){
        if (closeTimer != null) {
            clearTimeout(closeTimer!!)
        }
    }
    val open = fun(): UTSPromise<Unit> {
        return wrapUTSPromise(suspend w1@{
                if (realShow.value) {
                    return@w1
                }
                realShow.value = true
                await(nextTick())
                instance.emit("open")
                handleOpenTimer()
                openTimer = setTimeout(fun(){
                    target.value?.style?.setProperty("transition-duration", "" + duration.value + "ms")
                    target.value?.style?.setProperty("opacity", "1")
                    if (position.value == "center") {
                        target.value?.style?.setProperty("transform", "translate(-50%, -50%) scale(1)")
                    } else {
                        target.value?.style?.setProperty("transform", "translate(0, 0)")
                    }
                    openedTimer = setTimeout(fun(){
                        instance.emit("opened")
                    }
                    , duration.value)
                }
                , 50)
        })
    }
    val close = fun(){
        if (!realShow.value) {
            return
        }
        instance.emit("close")
        val opacity = if (isOpacity.value) {
            "0"
        } else {
            "1"
        }
        target.value?.style?.setProperty("opacity", opacity)
        if (position.value == "top") {
            target.value?.style?.setProperty("transform", "translate(0, -100%)")
        } else if (position.value == "bottom") {
            target.value?.style?.setProperty("transform", "translate(0px, 100%)")
        } else if (position.value == "left") {
            target.value?.style?.setProperty("transform", "translate(-100%, 0)")
        } else if (position.value == "right") {
            target.value?.style?.setProperty("transform", "translate(100%, 0)")
        } else {
            val scale = if (isZoom.value == true) {
                (options.zoomScale ?: 0.6)
            } else {
                1
            }
            target.value?.style?.setProperty("transform", "translate(-50%, -50%) scale(" + scale + ")")
        }
        handleCloseTimer()
        closeTimer = setTimeout(fun(){
            realShow.value = false
            instance.emit("closed")
        }
        , duration.value)
    }
    val doClose = fun(){
        if (!show.value || closing.value) {
            return
        }
        closing.value = true
        val beforeClose = options.beforeClose?.value
        if (UTSAndroid.`typeof`(beforeClose) == "function") {
            callInterceptor(beforeClose as BeforeChangeInterceptor, InterceptorOption(done = fun() {
                options.show.value = false
            }, complete = fun() {
                closing.value = false
            }))
        } else {
            options.show.value = false
            closing.value = false
        }
    }
    watch(show, fun(newVal: Boolean){
        if (newVal && !realShow.value) {
            open()
        }
        if (!newVal && realShow.value) {
            close()
        }
    }
    )
    onMounted(fun(){
        if (show.value) {
            realShow.value = true
            open()
        }
    }
    )
    onUnmounted(fun(){
        handleOpenTimer()
        handleCloseTimer()
    }
    )
    return UsePopup(realShow = realShow, doClose = doClose)
}
open class SafeAreaInsets (
    @JsonNotNull
    open var top: Number,
    @JsonNotNull
    open var bottom: Number,
    @JsonNotNull
    open var statusBarHeight: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("SafeAreaInsets", "uni_modules/rice-ui/libs/use/useSafeArea/index.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return SafeAreaInsetsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class SafeAreaInsetsReactiveObject : SafeAreaInsets, IUTSReactive<SafeAreaInsets> {
    override var __v_raw: SafeAreaInsets
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: SafeAreaInsets, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(top = __v_raw.top, bottom = __v_raw.bottom, statusBarHeight = __v_raw.statusBarHeight) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): SafeAreaInsetsReactiveObject {
        return SafeAreaInsetsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var top: Number
        get() {
            return _tRG(__v_raw, "top", __v_raw.top, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("top")) {
                return
            }
            val oldValue = __v_raw.top
            __v_raw.top = value
            _tRS(__v_raw, "top", oldValue, value)
        }
    override var bottom: Number
        get() {
            return _tRG(__v_raw, "bottom", __v_raw.bottom, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("bottom")) {
                return
            }
            val oldValue = __v_raw.bottom
            __v_raw.bottom = value
            _tRS(__v_raw, "bottom", oldValue, value)
        }
    override var statusBarHeight: Number
        get() {
            return _tRG(__v_raw, "statusBarHeight", __v_raw.statusBarHeight, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("statusBarHeight")) {
                return
            }
            val oldValue = __v_raw.statusBarHeight
            __v_raw.statusBarHeight = value
            _tRS(__v_raw, "statusBarHeight", oldValue, value)
        }
}
val safeAreaInsets = ref<SafeAreaInsets>(SafeAreaInsets(top = 0, bottom = 0, statusBarHeight = 25))
fun useSafeArea() {
    var timer: Number? = null
    val getWindowInfo = fun(){
        val windowInfo = uni_getWindowInfo()
        safeAreaInsets.value.bottom = windowInfo.safeAreaInsets.bottom
        safeAreaInsets.value.top = windowInfo.safeAreaInsets.top
        safeAreaInsets.value.statusBarHeight = windowInfo.statusBarHeight
    }
    onMounted(fun(){
        if (timer != null) {
            clearTimeout(timer!!)
        }
        timer = setTimeout(fun(){
            getWindowInfo()
        }
        , 200)
    }
    )
    onUnmounted(fun(){
        if (timer != null) {
            clearTimeout(timer!!)
        }
    }
    )
}
val MIN_DISTANCE: Number = 10
val LOCK_DIRECTION_DISTANCE: Number = 10
val TAP_OFFSET: Number = 5
typealias SlideDirection = String
open class UseTouch (
    @JsonNotNull
    open var startX: Ref<Number>,
    @JsonNotNull
    open var startY: Ref<Number>,
    @JsonNotNull
    open var deltaX: Ref<Number>,
    @JsonNotNull
    open var deltaY: Ref<Number>,
    @JsonNotNull
    open var offsetX: Ref<Number>,
    @JsonNotNull
    open var offsetY: Ref<Number>,
    @JsonNotNull
    open var direction: Ref<SlideDirection>,
    @JsonNotNull
    open var isTap: Ref<Boolean>,
    @JsonNotNull
    open var skipMove: Ref<Boolean>,
    @JsonNotNull
    open var dragging: Ref<Boolean>,
    open var start: (e: UniTouchEvent) -> Unit,
    open var move: (e: UniTouchEvent) -> Unit,
    open var end: () -> Unit,
    open var changeDragging: (flag: Boolean) -> Unit,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseTouch", "uni_modules/rice-ui/libs/use/useTouch/index.uts", 6, 6)
    }
}
fun getSlideDirection(x: Number, y: Number): SlideDirection {
    if (x > y && x > MIN_DISTANCE) {
        return "horizontal"
    }
    if (y > x && y > MIN_DISTANCE) {
        return "vertical"
    }
    return ""
}
fun useTouch(): UseTouch {
    val startX = ref(0)
    val startY = ref(0)
    val deltaX = ref(0)
    val deltaY = ref(0)
    val offsetX = ref(0)
    val offsetY = ref(0)
    val direction = ref<SlideDirection>("")
    val isTap = ref(false)
    val dragging = ref(false)
    val skipMove = ref(false)
    val reset = fun(){
        deltaX.value = 0
        deltaY.value = 0
        offsetX.value = 0
        offsetY.value = 0
        direction.value = ""
        isTap.value = true
        dragging.value = true
        skipMove.value = false
    }
    val start = fun(e: UniTouchEvent){
        val touches = e.touches[0]
        reset()
        startX.value = touches.clientX
        startY.value = touches.clientY
    }
    val move = fun(e: UniTouchEvent){
        val touches = e.touches[0]
        deltaX.value = touches.clientX - startX.value
        deltaY.value = touches.clientY - startY.value
        offsetX.value = Math.abs(deltaX.value)
        offsetY.value = Math.abs(deltaY.value)
        if (direction.value == "" || (offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE)) {
            direction.value = getSlideDirection(offsetX.value, offsetY.value)
        }
        if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
            isTap.value = false
        }
        if (direction.value == "vertical") {
            skipMove.value = true
        }
    }
    val end = fun(){
        dragging.value = false
    }
    val changeDragging = fun(flag: Boolean){
        dragging.value = flag
    }
    return UseTouch(startX = startX, startY = startY, deltaX = deltaX, deltaY = deltaY, offsetX = offsetX, offsetY = offsetY, direction = direction, isTap = isTap, dragging = dragging, skipMove = skipMove, start = start, move = move, end = end, changeDragging = changeDragging)
}
open class FontData (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var code: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FontData", "uni_modules/rice-ui/components/rice-icon/font.uts", 1, 13)
    }
}
val fontData = _uA(
    FontData(name = "arrow-up", code = "\ueaa4"),
    FontData(name = "arrow-down", code = "\ueaa1"),
    FontData(name = "arrow-left", code = "\ueaa2"),
    FontData(name = "arrow-right", code = "\ueaa3"),
    FontData(name = "up", code = "\ueab1"),
    FontData(name = "down", code = "\ueaa5"),
    FontData(name = "left", code = "\ueaa9"),
    FontData(name = "right", code = "\ueaab"),
    FontData(name = "back-top", code = "\ueaae"),
    FontData(name = "back-bottom", code = "\ueaad"),
    FontData(name = "double-right", code = "\ueaa0"),
    FontData(name = "double-left", code = "\ueaa7"),
    FontData(name = "minus", code = "\uea7e"),
    FontData(name = "plus", code = "\uea7d"),
    FontData(name = "search", code = "\uea8c"),
    FontData(name = "search-fill", code = "\uea89"),
    FontData(name = "scan", code = "\uea67"),
    FontData(name = "qr", code = "\ue6d8"),
    FontData(name = "sort", code = "\ue6e2"),
    FontData(name = "sort-menu", code = "\ueaac"),
    FontData(name = "bars", code = "\ue69f"),
    FontData(name = "remind-disabled", code = "\uea95"),
    FontData(name = "remind", code = "\uea96"),
    FontData(name = "volume", code = "\uea7c"),
    FontData(name = "volume-fill", code = "\uea6f"),
    FontData(name = "volume-up", code = "\uea78"),
    FontData(name = "volume-up-fill", code = "\uea70"),
    FontData(name = "volume-down", code = "\uea79"),
    FontData(name = "volume-down-fill", code = "\uea73"),
    FontData(name = "volume-mute", code = "\uea7a"),
    FontData(name = "volume-mute-fill", code = "\uea72"),
    FontData(name = "voice", code = "\uea77"),
    FontData(name = "voice-off", code = "\uea7b"),
    FontData(name = "play", code = "\uea76"),
    FontData(name = "play-fill", code = "\uea71"),
    FontData(name = "pause", code = "\uea75"),
    FontData(name = "pause-fill", code = "\uea6e"),
    FontData(name = "headset", code = "\uea74"),
    FontData(name = "headset-fill", code = "\uea6d"),
    FontData(name = "user", code = "\ueb30"),
    FontData(name = "peoples", code = "\ueb2f"),
    FontData(name = "peoples-fill", code = "\ueb2c"),
    FontData(name = "trophy", code = "\ueb35"),
    FontData(name = "trophy-fill", code = "\ueb33"),
    FontData(name = "add", code = "\uea84"),
    FontData(name = "add-fill", code = "\uea7f"),
    FontData(name = "reduce", code = "\uea87"),
    FontData(name = "reduce-fill", code = "\uea81"),
    FontData(name = "checked-circle", code = "\uea86"),
    FontData(name = "checked-circle-fill", code = "\uea80"),
    FontData(name = "help", code = "\uea8a"),
    FontData(name = "help-fill", code = "\uea82"),
    FontData(name = "info", code = "\uea88"),
    FontData(name = "info-fill", code = "\uea83"),
    FontData(name = "cross", code = "\uea85"),
    FontData(name = "checked", code = "\ue659"),
    FontData(name = "camera", code = "\uea8f"),
    FontData(name = "camera-fill", code = "\uea8b"),
    FontData(name = "app", code = "\uea91"),
    FontData(name = "app-fill", code = "\uea8d"),
    FontData(name = "like", code = "\uea90"),
    FontData(name = "like-fill", code = "\uea8e"),
    FontData(name = "eyes", code = "\uea92"),
    FontData(name = "eyes-close", code = "\uea94"),
    FontData(name = "sleep", code = "\uea93"),
    FontData(name = "sun", code = "\ueafe"),
    FontData(name = "menu-fold", code = "\uea9e"),
    FontData(name = "menu-unfold", code = "\uea9f"),
    FontData(name = "upload", code = "\ueab2"),
    FontData(name = "download", code = "\ueaa6"),
    FontData(name = "full-screen", code = "\ueaa8"),
    FontData(name = "off-screen", code = "\ueaaa"),
    FontData(name = "switch", code = "\ueaaf"),
    FontData(name = "revoke", code = "\ueab0"),
    FontData(name = "comments", code = "\ueac3"),
    FontData(name = "comments-fill", code = "\ueac2"),
    FontData(name = "phone-call", code = "\ueaba"),
    FontData(name = "phone-call-fill", code = "\ueab4"),
    FontData(name = "phone-in", code = "\ueabc"),
    FontData(name = "phone-in-fill", code = "\ueab5"),
    FontData(name = "phone-out", code = "\ueabb"),
    FontData(name = "phone-out-fill", code = "\ueab6"),
    FontData(name = "phone", code = "\ueabd"),
    FontData(name = "phone-fill", code = "\ueab7"),
    FontData(name = "phone-missed", code = "\ueabe"),
    FontData(name = "phone-missed-fill", code = "\ueab8"),
    FontData(name = "location", code = "\ueac0"),
    FontData(name = "location-fill", code = "\ueabf"),
    FontData(name = "bluetooth", code = "\ueacb"),
    FontData(name = "calendar", code = "\uead4"),
    FontData(name = "calendar-fill", code = "\uead2"),
    FontData(name = "clear", code = "\ueb34"),
    FontData(name = "clear-fill", code = "\ueb32"),
    FontData(name = "share", code = "\uea4e"),
    FontData(name = "share-fill", code = "\uea3d"),
    FontData(name = "edit", code = "\uea48"),
    FontData(name = "delete", code = "\uea45"),
    FontData(name = "delete-fill", code = "\uea37"),
    FontData(name = "shopping", code = "\uea68"),
    FontData(name = "shopping-fill", code = "\uea62"),
    FontData(name = "wallet", code = "\uea69"),
    FontData(name = "bag", code = "\uea6a"),
    FontData(name = "set", code = "\ue6dc"),
    FontData(name = "set-fill", code = "\ue6db"),
    FontData(name = "replay", code = "\ue6dd"),
    FontData(name = "home", code = "\ue6e9"),
    FontData(name = "home-fill", code = "\ue6e8"),
    FontData(name = "chat", code = "\ue6aa"),
    FontData(name = "chat-fill", code = "\ue6a3"),
    FontData(name = "good", code = "\ue6c3"),
    FontData(name = "good-fill", code = "\ue6c2"),
    FontData(name = "gift", code = "\ue6d4"),
    FontData(name = "gift-fill", code = "\ue6d3"),
    FontData(name = "loading", code = "\ue670"),
    FontData(name = "photo", code = "\ue6cf"),
    FontData(name = "photo-fail", code = "\ue6cd"),
    FontData(name = "star", code = "\ue6ec"),
    FontData(name = "star-fill", code = "\ue6ed"),
    FontData(name = "trend", code = "\uea6b"),
    FontData(name = "trend-fill", code = "\uea63"),
    FontData(name = "file-success-fill", code = "\uea25"),
    FontData(name = "file-success", code = "\uea2d")
) as UTSArray<FontData>
val GenUniModulesRiceUiComponentsRiceIconRiceIconClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceIconRiceIcon::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceIconRiceIcon.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceIconRiceIcon.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceIconRiceIcon.inject, props = GenUniModulesRiceUiComponentsRiceIconRiceIcon.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceIconRiceIcon.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceIconRiceIcon.emits, components = GenUniModulesRiceUiComponentsRiceIconRiceIcon.components, styles = GenUniModulesRiceUiComponentsRiceIconRiceIcon.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceIconRiceIcon.setup(props as GenUniModulesRiceUiComponentsRiceIconRiceIcon)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceIconRiceIcon {
    return GenUniModulesRiceUiComponentsRiceIconRiceIcon(instance)
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
val formInjectKey = "FormKey-" + getRandomStr()
val formDataInjectKey = "FormDataKey-" + getRandomStr()
val formDisabledInjectKey = "FormDisabledContextKey-" + getRandomStr()
val formReadonlyInjectKey = "FormReadonlyContextKey-" + getRandomStr()
val formItemContextInjectKey = "FormItemContextKey-" + getRandomStr()
val formItemBlurInjectKey = "FormItemBlurKey-" + getRandomStr()
val GenUniModulesRiceUiComponentsRiceInputRiceInputClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceInputRiceInput::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceInputRiceInput.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceInputRiceInput.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceInputRiceInput.inject, props = GenUniModulesRiceUiComponentsRiceInputRiceInput.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceInputRiceInput.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceInputRiceInput.emits, components = GenUniModulesRiceUiComponentsRiceInputRiceInput.components, styles = GenUniModulesRiceUiComponentsRiceInputRiceInput.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceInputRiceInput.setup(props as GenUniModulesRiceUiComponentsRiceInputRiceInput)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceInputRiceInput {
    return GenUniModulesRiceUiComponentsRiceInputRiceInput(instance)
}
)
fun __uts_large_presetColors_fill_fill_1(__obj: UTSJSONObject): Unit {
    __obj["aliceblue"] = "9ehhb"
    __obj["antiquewhite"] = "9sgk7"
    __obj["aqua"] = "1ekf"
    __obj["aquamarine"] = "4zsno"
    __obj["azure"] = "9eiv3"
    __obj["beige"] = "9lhp8"
    __obj["bisque"] = "9zg04"
    __obj["black"] = "0"
    __obj["blanchedalmond"] = "9zhe5"
    __obj["blue"] = "73"
    __obj["blueviolet"] = "5e31e"
    __obj["brown"] = "6g016"
    __obj["burlywood"] = "8ouiv"
    __obj["cadetblue"] = "3qba8"
    __obj["chartreuse"] = "4zshs"
    __obj["chocolate"] = "87k0u"
    __obj["coral"] = "9yvyo"
    __obj["cornflowerblue"] = "3xael"
    __obj["cornsilk"] = "9zjz0"
    __obj["crimson"] = "8l4xo"
    __obj["cyan"] = "1ekf"
    __obj["darkblue"] = "3v"
    __obj["darkcyan"] = "rkb"
    __obj["darkgoldenrod"] = "776yz"
    __obj["darkgray"] = "6mbhl"
    __obj["darkgreen"] = "jr4"
    __obj["darkgrey"] = "6mbhl"
    __obj["darkkhaki"] = "7ehkb"
    __obj["darkmagenta"] = "5f91n"
    __obj["darkolivegreen"] = "3bzfz"
    __obj["darkorange"] = "9yygw"
    __obj["darkorchid"] = "5z6x8"
    __obj["darkred"] = "5f8xs"
    __obj["darksalmon"] = "9441m"
    __obj["darkseagreen"] = "5lwgf"
    __obj["darkslateblue"] = "2th1n"
    __obj["darkslategray"] = "1ugcv"
    __obj["darkslategrey"] = "1ugcv"
    __obj["darkturquoise"] = "14up"
    __obj["darkviolet"] = "5rw7n"
    __obj["deeppink"] = "9yavn"
    __obj["deepskyblue"] = "11xb"
    __obj["dimgray"] = "442g9"
    __obj["dimgrey"] = "442g9"
    __obj["dodgerblue"] = "16xof"
    __obj["firebrick"] = "6y7tu"
    __obj["floralwhite"] = "9zkds"
    __obj["forestgreen"] = "1cisi"
}
fun __uts_large_presetColors_fill_fill_2(__obj: UTSJSONObject): Unit {
    __obj["fuchsia"] = "9y70f"
    __obj["gainsboro"] = "8m8kc"
    __obj["ghostwhite"] = "9pq0v"
    __obj["goldenrod"] = "8j4f4"
    __obj["gold"] = "9zda8"
    __obj["gray"] = "50i2o"
    __obj["green"] = "pa8"
    __obj["greenyellow"] = "6senj"
    __obj["grey"] = "50i2o"
    __obj["honeydew"] = "9eiuo"
    __obj["hotpink"] = "9yrp0"
    __obj["indianred"] = "80gnw"
    __obj["indigo"] = "2xcoy"
    __obj["ivory"] = "9zldc"
    __obj["khaki"] = "9edu4"
    __obj["lavenderblush"] = "9ziet"
    __obj["lavender"] = "90c8q"
    __obj["lawngreen"] = "4vk74"
    __obj["lemonchiffon"] = "9zkct"
    __obj["lightblue"] = "6s73a"
    __obj["lightcoral"] = "9dtog"
    __obj["lightcyan"] = "8s1rz"
    __obj["lightgoldenrodyellow"] = "9sjiq"
    __obj["lightgray"] = "89jo3"
    __obj["lightgreen"] = "5nkwg"
    __obj["lightgrey"] = "89jo3"
    __obj["lightpink"] = "9z6wx"
    __obj["lightsalmon"] = "9z2ii"
    __obj["lightseagreen"] = "19xgq"
    __obj["lightskyblue"] = "5arju"
    __obj["lightslategray"] = "4nwk9"
    __obj["lightslategrey"] = "4nwk9"
    __obj["lightsteelblue"] = "6wau6"
    __obj["lightyellow"] = "9zlcw"
    __obj["lime"] = "1edc"
    __obj["limegreen"] = "1zcxe"
    __obj["linen"] = "9shk6"
    __obj["magenta"] = "9y70f"
    __obj["maroon"] = "4zsow"
    __obj["mediumaquamarine"] = "40eju"
    __obj["mediumblue"] = "5p"
    __obj["mediumorchid"] = "79qkz"
    __obj["mediumpurple"] = "5r3rv"
    __obj["mediumseagreen"] = "2d9ip"
    __obj["mediumslateblue"] = "4tcku"
    __obj["mediumspringgreen"] = "1di2"
    __obj["mediumturquoise"] = "2uabw"
    __obj["mediumvioletred"] = "7rn9h"
}
fun __uts_large_presetColors_fill_fill_3(__obj: UTSJSONObject): Unit {
    __obj["midnightblue"] = "z980"
    __obj["mintcream"] = "9ljp6"
    __obj["mistyrose"] = "9zg0x"
    __obj["moccasin"] = "9zfzp"
    __obj["navajowhite"] = "9zest"
    __obj["navy"] = "3k"
    __obj["oldlace"] = "9wq92"
    __obj["olive"] = "50hz4"
    __obj["olivedrab"] = "472ub"
    __obj["orange"] = "9z3eo"
    __obj["orangered"] = "9ykg0"
    __obj["orchid"] = "8iu3a"
    __obj["palegoldenrod"] = "9bl4a"
    __obj["palegreen"] = "5yw0o"
    __obj["paleturquoise"] = "6v4ku"
    __obj["palevioletred"] = "8k8lv"
    __obj["papayawhip"] = "9zi6t"
    __obj["peachpuff"] = "9ze0p"
    __obj["peru"] = "80oqn"
    __obj["pink"] = "9z8wb"
    __obj["plum"] = "8nba5"
    __obj["powderblue"] = "6wgdi"
    __obj["purple"] = "4zssg"
    __obj["rebeccapurple"] = "3zk49"
    __obj["red"] = "9y6tc"
    __obj["rosybrown"] = "7cv4f"
    __obj["royalblue"] = "2jvtt"
    __obj["saddlebrown"] = "5fmkz"
    __obj["salmon"] = "9rvci"
    __obj["sandybrown"] = "9jn1c"
    __obj["seagreen"] = "1tdnb"
    __obj["seashell"] = "9zje6"
    __obj["sienna"] = "6973h"
    __obj["silver"] = "7ir40"
    __obj["skyblue"] = "5arjf"
    __obj["slateblue"] = "45e4t"
    __obj["slategray"] = "4e100"
    __obj["slategrey"] = "4e100"
    __obj["snow"] = "9zke2"
    __obj["springgreen"] = "1egv"
    __obj["steelblue"] = "2r1kk"
    __obj["tan"] = "87yx8"
    __obj["teal"] = "pds"
    __obj["thistle"] = "8ggk8"
    __obj["tomato"] = "9yqfb"
    __obj["turquoise"] = "2j4r4"
    __obj["violet"] = "9b10u"
    __obj["wheat"] = "9ld4j"
}
fun __uts_large_presetColors_fill_fill_4(__obj: UTSJSONObject): Unit {
    __obj["white"] = "9zldr"
    __obj["whitesmoke"] = "9lhpx"
    __obj["yellow"] = "9zl6o"
    __obj["yellowgreen"] = "61fzm"
}
fun __uts_large_presetColors_build_0(): UTSJSONObject {
    val __obj: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("__obj", "uni_modules/rice-ui/libs/plugin/coloruts/constant.uts", 158, 11))
    __uts_large_presetColors_fill_fill_1(__obj)
    __uts_large_presetColors_fill_fill_2(__obj)
    __uts_large_presetColors_fill_fill_3(__obj)
    __uts_large_presetColors_fill_fill_4(__obj)
    return __obj
}
val presetColors = __uts_large_presetColors_build_0()
fun fillArr(arr: UTSArray<String>): UTSArray<String> {
    while(arr.length < 4){
        arr.push("")
    }
    return arr
}
fun splitColorStr(str: String, parseNum: ParseNumber): UTSArray<Number> {
    val match = str.replace(UTSRegExp("^[^(]*\\((.*)", ""), "\$1").replace(UTSRegExp("\\).*", ""), "").match(UTSRegExp("\\d*\\.?\\d+%?", "g")) ?: _uA<String>()
    val m = fillArr(match as UTSArray<String>) as UTSArray<String>
    var numList = m.map(fun(item: String): Number {
        return parseFloat(item as String)
    }
    )
    run {
        var i: Number = 0
        while(i < 3){
            numList[i] = parseNum(numList[i], m[i], i)
            i += 1
        }
    }
    if (m[3] != "") {
        numList[3] = if (m[3].includes("%")) {
            numList[3] / 100
        } else {
            numList[3]
        }
    } else {
        numList[3] = 1
    }
    return numList
}
fun limitRange(value: Number, max: Number = 255): Number {
    val mergedMax = if (max == 0) {
        255
    } else {
        max
    }
    if (value > mergedMax) {
        return mergedMax
    }
    if (value < 0) {
        return 0
    }
    return value
}
val parseHSVorHSL: ParseNumber = fun(num: Number, _: String, index: Number): Number {
    return if (index == 0) {
        num
    } else {
        num / 100
    }
}
open class Coloruts : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Coloruts", "uni_modules/rice-ui/libs/plugin/coloruts/conversion.uts", 4, 14)
    }
    open var isValid: Boolean = true
    open var r: Number = 0
    open var g: Number = 0
    open var b: Number = 0
    open var a: Number = 1
    private var _h: Number? = null
    private var _s: Number? = null
    private var _l: Number? = null
    private var _v: Number? = null
    private var _max: Number? = null
    private var _min: Number? = null
    private var _brightness: Number? = null
    constructor(input: Any){
        fun isRgb(): Boolean {
            val inp = input as UTSJSONObject
            return inp["r"] != null && inp["g"] != null && inp["b"] != null
        }
        fun isHsl(): Boolean {
            val inp = input as UTSJSONObject
            return inp["h"] != null && inp["s"] != null && inp["l"] != null
        }
        fun isHsv(): Boolean {
            val inp = input as UTSJSONObject
            return inp["h"] != null && inp["s"] != null && inp["v"] != null
        }
        if (UTSAndroid.`typeof`(input) == "string") {
            val trimStr = (input as String).trim()
            fun matchPrefix(prefix: String): Boolean {
                return trimStr.startsWith(prefix)
            }
            if (UTSRegExp("^#?[A-F\\d]{3,8}\$", "i").test(trimStr)) {
                this.fromHexString(trimStr)
            } else if (matchPrefix("rgb")) {
                this.fromRgbString(trimStr)
            } else if (matchPrefix("hsl")) {
                this.fromHslString(trimStr)
            } else if (matchPrefix("hsv") || matchPrefix("hsb")) {
                this.fromHsvString(trimStr)
            } else {
                val presetColor = presetColors[trimStr.toLowerCase()] as String?
                if (presetColor != null) {
                    this.fromHexString(parseInt(presetColor, 36).toString(16).padStart(6, "0"))
                }
            }
        } else if (input is Coloruts) {
            this.r = (input as Coloruts).r
            this.g = (input as Coloruts).g
            this.b = (input as Coloruts).b
            this.a = (input as Coloruts).a
            this._h = (input as Coloruts)._h
            this._s = (input as Coloruts)._s
            this._l = (input as Coloruts)._l
            this._v = (input as Coloruts)._v
        } else if (isRgb()) {
            val data = input as UTSJSONObject
            this.r = limitRange(data["r"] as Number)
            this.g = limitRange(data["g"] as Number)
            this.b = limitRange(data["b"] as Number)
            this.a = if (UTSAndroid.`typeof`(data["a"]) == "number") {
                limitRange(data["a"] as Number, 1)
            } else {
                1
            }
        } else if (isHsl()) {
            this.fromHsl(input as UTSJSONObject)
        } else if (isHsv()) {
            this.fromHsv(input as UTSJSONObject)
        } else {
            console.warn("不支持当前的颜色值。" + input as UTSJSONObject, " at uni_modules/rice-ui/libs/plugin/coloruts/conversion.uts:78")
        }
    }
    private fun fromHexString(trimStr: String) {
        val withoutPrefix = trimStr.replace("#", "") as String
        fun connectNum(index1: Number, reassignedIndex2: Number?): Number {
            var index2 = reassignedIndex2
            if (index2 == null || index2 == 0) {
                index2 = index1
            }
            val str = "" + withoutPrefix[index1] + withoutPrefix[index2]
            return parseInt(str, 16)
        }
        if (withoutPrefix.length < 6) {
            this.r = connectNum(0, null)
            this.g = connectNum(1, null)
            this.b = connectNum(2, null)
            this.a = if (withoutPrefix.length >= 4) {
                connectNum(3, null) / 255
            } else {
                1
            }
        } else {
            this.r = connectNum(0, 1)
            this.g = connectNum(2, 3)
            this.b = connectNum(4, 5)
            this.a = if (withoutPrefix.length >= 7) {
                connectNum(6, 7) / 255
            } else {
                1
            }
        }
    }
    private fun fromHsv(hsva: UTSJSONObject) {
        val h = hsva["h"] as Number
        val s = hsva["s"] as Number
        val v = hsva["v"] as Number
        val a = hsva["a"] as Number?
        this._h = h % 360
        this._s = s
        this._v = v
        this.a = if (UTSAndroid.`typeof`(a) == "number") {
            a
        } else {
            1
        }
         as Number
        val vv = Math.round(v * 255)
        this.r = vv
        this.g = vv
        this.b = vv
        if (s <= 0) {
            return
        }
        val hh = h / 60
        val i = Math.floor(hh)
        val ff = hh - i
        val p = Math.round(v * (1.0 - s) * 255)
        val q = Math.round(v * (1.0 - s * ff) * 255)
        val t = Math.round(v * (1.0 - s * (1.0 - ff)) * 255)
        when (i) {
            0 -> 
                {
                    this.g = t
                    this.b = p
                }
            1 -> 
                {
                    this.r = q
                    this.b = p
                }
            2 -> 
                {
                    this.r = p
                    this.b = t
                }
            3 -> 
                {
                    this.r = p
                    this.g = q
                }
            4 -> 
                {
                    this.r = t
                    this.g = p
                }
            5 -> 
                {
                    this.g = p
                    this.b = q
                }
            else -> 
                {
                    this.g = p
                    this.b = q
                }
        }
    }
    private fun fromHsl(hsla: UTSJSONObject) {
        val h = hsla["h"] as Number
        val s = hsla["s"] as Number
        val l = hsla["l"] as Number
        val a = hsla["a"] as Number?
        this._h = h % 360
        this._s = s
        this._l = l
        this.a = if (UTSAndroid.`typeof`(a) == "number") {
            a
        } else {
            1
        }
         as Number
        if (s <= 0) {
            val rgb = Math.round(l * 255)
            this.r = rgb
            this.g = rgb
            this.b = rgb
        }
        var r: Number = 0
        var g: Number = 0
        var b: Number = 0
        val huePrime = h / 60
        val chroma = (1 - Math.abs(2 * l - 1)) * s
        val secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1))
        if (huePrime >= 0 && huePrime < 1) {
            r = chroma
            g = secondComponent
        } else if (huePrime >= 1 && huePrime < 2) {
            r = secondComponent
            g = chroma
        } else if (huePrime >= 2 && huePrime < 3) {
            g = chroma
            b = secondComponent
        } else if (huePrime >= 3 && huePrime < 4) {
            g = secondComponent
            b = chroma
        } else if (huePrime >= 4 && huePrime < 5) {
            r = secondComponent
            b = chroma
        } else if (huePrime >= 5 && huePrime < 6) {
            r = chroma
            b = secondComponent
        }
        val lightnessModification = l - chroma / 2
        this.r = Math.round((r + lightnessModification) * 255)
        this.g = Math.round((g + lightnessModification) * 255)
        this.b = Math.round((b + lightnessModification) * 255)
    }
    private fun fromHslString(trimStr: String) {
        val cells = splitColorStr(trimStr, parseHSVorHSL)
        this.fromHsl(_uO("h" to cells[0], "s" to cells[1], "l" to cells[2], "a" to cells[3]))
    }
    private fun fromHsvString(trimStr: String) {
        val cells = splitColorStr(trimStr, parseHSVorHSL)
        this.fromHsv(_uO("h" to cells[0], "s" to cells[1], "v" to cells[2], "a" to cells[3]))
    }
    private fun fromRgbString(trimStr: String) {
        val cells = splitColorStr(trimStr, fun(num, txt, _index): Number {
            return if (txt.includes("%")) {
                Math.round((num / 100) * 255)
            } else {
                num
            }
        }
        )
        this.r = cells[0]
        this.g = cells[1]
        this.b = cells[2]
        this.a = cells[3]
    }
    open fun _c(input: Any): Coloruts {
        return Coloruts(input)
    }
    private fun getMax(): Number {
        if (this._max == null) {
            this._max = Math.max(this.r, this.g, this.b)
        }
        return this._max!!
    }
    private fun getMin(): Number {
        if (this._min == null) {
            this._min = Math.min(this.r, this.g, this.b)
        }
        return this._min!!
    }
    private fun getHue(): Number {
        if (this._h == null) {
            val delta = this.getMax() - this.getMin()
            if (delta == 0) {
                this._h = 0
            } else {
                this._h = Math.round(60 * (if (this.r === this.getMax()) {
                    (this.g - this.b) / delta + (if (this.g < this.b) {
                        6
                    } else {
                        0
                    })
                } else {
                    if (this.g === this.getMax()) {
                        (this.b - this.r) / delta + 2
                    } else {
                        (this.r - this.g) / delta + 4
                    }
                }
                ))
            }
        }
        return this._h!!
    }
    private fun getSaturation(): Number {
        if (this._s == null) {
            val delta = this.getMax() - this.getMin()
            if (delta == 0) {
                this._s = 0
            } else {
                this._s = delta / this.getMax()
            }
        }
        return this._s!!
    }
    private fun getValue(): Number {
        if (this._v == null) {
            this._v = this.getMax() / 255
        }
        return this._v!!
    }
    private fun getLightness(): Number {
        if (this._l == null) {
            this._l = (this.getMax() + this.getMin()) / 510
        }
        return this._l!!
    }
    private fun getBrightness(): Number {
        if (this._brightness == null) {
            this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000
        }
        return this._brightness!!
    }
    open fun toHsv(): UTSJSONObject {
        return _uO("h" to this.getHue(), "s" to this.getSaturation(), "v" to this.getValue(), "a" to this.a)
    }
    open fun toRgb(): UTSJSONObject {
        return _uO("r" to this.r, "g" to this.g, "b" to this.b, "a" to this.a)
    }
    open fun toRgbString(): String {
        return if (this.a != 1) {
            "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
        } else {
            "rgb(" + this.r + "," + this.g + "," + this.b + ")"
        }
    }
    open fun toHexString(): String {
        var hex = "#"
        val rHex = this.r.toString(16)
        hex += if (rHex.length == 2) {
            rHex
        } else {
            "0" + rHex
        }
        val gHex = this.g.toString(16)
        hex += if (gHex.length == 2) {
            gHex
        } else {
            "0" + gHex
        }
        val bHex = this.b.toString(16)
        hex += if (bHex.length == 2) {
            bHex
        } else {
            "0" + bHex
        }
        if (UTSAndroid.`typeof`(this.a) == "number" && this.a >= 0 && this.a < 1) {
            val aHex = Math.round(this.a * 255).toString(16)
            hex += if (aHex.length == 2) {
                aHex
            } else {
                "0" + aHex
            }
        }
        return hex
    }
    open fun mix(input: Any, amount: Number = 50): Coloruts {
        val color = this._c(input)
        val p = amount / 100
        val calc = fun(key: String): Number {
            if (key == "r") {
                return (color.r - this.r) * p + this.r
            }
            if (key == "g") {
                return (color.g - this.g) * p + this.g
            }
            if (key == "b") {
                return (color.b - this.b) * p + this.b
            }
            if (key == "a") {
                return (color.a - this.a) * p + this.a
            }
            return 0
        }
        val rgba: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("rgba", "uni_modules/rice-ui/libs/plugin/coloruts/conversion.uts", 347, 15), "r" to Math.round(calc("r")), "g" to Math.round(calc("g")), "b" to Math.round(calc("b")), "a" to (Math.round(calc("a") * 100) / 100))
        return this._c(rgba)
    }
    open fun tint(amount: Number = 10): Coloruts {
        return this.mix(_uO("r" to 255, "g" to 255, "b" to 255, "a" to 1), amount)
    }
    open fun shade(amount: Number = 10): Coloruts {
        return this.mix(_uO("r" to 0, "g" to 0, "b" to 0, "a" to 1), amount)
    }
    open fun darken(amount: Number = 10): Coloruts {
        val h = this.getHue()
        val s = this.getSaturation()
        var l = this.getLightness() - amount / 100
        if (l < 0) {
            l = 0
        }
        return this._c(_uO("h" to h, "s" to s, "l" to l, "a" to this.a))
    }
    open fun lighten(amount: Number = 10): Coloruts {
        val h = this.getHue()
        val s = this.getSaturation()
        var l = this.getLightness() + amount / 100
        if (l > 1) {
            l = 1
        }
        return this._c(_uO("h" to h, "s" to s, "l" to l, "a" to this.a))
    }
    open fun isDark(): Boolean {
        return this.getBrightness() < 128
    }
    open fun isLight(): Boolean {
        return this.getBrightness() >= 128
    }
}
typealias ParseNumber = (num: Number, text: String, index: Number) -> Number
open class Locale (
    @JsonNotNull
    open var weekdays: UTSArray<String>,
    @JsonNotNull
    open var weekdaysShort: UTSArray<String>,
    @JsonNotNull
    open var weekdaysMin: UTSArray<String>,
    @JsonNotNull
    open var months: UTSArray<String>,
    @JsonNotNull
    open var monthsShort: UTSArray<String>,
    open var ordinal: (number: Number, period: String) -> String?,
    @JsonNotNull
    open var weekStart: Number,
    @JsonNotNull
    open var yearStart: Number,
    open var meridiem: (hour: Number, minute: Number) -> String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Locale", "uni_modules/rice-ui/libs/plugin/dateuts/locale.uts", 2, 6)
    }
}
val local = Locale(weekdays = _uA(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
), weekdaysShort = _uA(
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六"
), weekdaysMin = _uA(
    "日",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六"
), months = _uA(
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
), monthsShort = _uA(
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
), ordinal = fun(number: Number, period: String): String? {
    when (period) {
        "W" -> 
            return "" + number + "周"
        else -> 
            return "" + number + "日"
    }
}
, weekStart = 1, yearStart = 4, meridiem = fun(hour: Number, minute: Number): String {
    val hm = (hour * 100) + minute
    if (hm < 600) {
        return "凌晨"
    } else if (hm < 900) {
        return "早上"
    } else if (hm < 1100) {
        return "上午"
    } else if (hm < 1300) {
        return "中午"
    } else if (hm < 1800) {
        return "下午"
    }
    return "晚上"
}
)
val wrapper = fun(d: DateType): Dateuts {
    return dateuts(d)
}
val transform2Num = fun(kVal: String?): Number {
    if (kVal == null || kVal == "") {
        return 0
    }
    return parseInt(kVal)
}
val SECONDS_A_MINUTE: Number = 60
typealias DateType = Any
val isDateuts = fun(d: Any): Boolean {
    return d is Dateuts
}
val SECONDS_A_HOUR = SECONDS_A_MINUTE * 60
val SECONDS_A_DAY = SECONDS_A_HOUR * 24
val SECONDS_A_WEEK = SECONDS_A_DAY * 7
val MILLISECONDS_A_SECOND: Number = 1e3
val MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND
val MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND
val MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND
val MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND
val INVALID_DATE_STRING = "Invalid Date"
val Y: DateUnits = "year"
val M: DateUnits = "month"
val Q: DateUnits = "quarter"
val D: DateUnits = "day"
val W: DateUnits = "week"
val DATE: DateUnits = "date"
val H: DateUnits = "hour"
val MIN: DateUnits = "minute"
val S: DateUnits = "second"
val padStart = fun(str: Any, len: Number, pad: String): String {
    var s: Any
    if (UTSAndroid.`typeof`(str) == "number") {
        s = (str as Number).toString()
    } else {
        s = str as String
    }
    if ((s as String).length >= len) {
        return s as String
    }
    return (s as String).padStart(len, pad)
}
val MS: DateUnits = "millisecond"
val REGEX_PARSE = UTSRegExp("^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[Tt\\s]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?[.:]?(\\d+)?\$", "")
val REGEX_FORMAT = UTSRegExp("\\[([^\\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS", "g")
val REGEX_ENDWIRHZ = UTSRegExp("Z\$", "i")
val parseDate = fun(params: DateParams?): Date {
    var date = params?.date
    if (date == "" || date == null || date is Dateuts) {
        return Date()
    }
    if (date is Date) {
        return Date((date as Date).toString())
    }
    if (UTSAndroid.`typeof`(date) == "string" && !REGEX_ENDWIRHZ.test(date as String)) {
        val d = (date as String).match(REGEX_PARSE)
        if (d != null) {
            val year = transform2Num(d[1])
            val month = Math.max(transform2Num(d[2]) - 1, 0)
            val day = Math.max(transform2Num(d[3]), 1)
            val hour = transform2Num(d[4])
            val minutes = transform2Num(d[5])
            val seconds = transform2Num(d[6])
            val ms = parseInt(transform2Num(d[7]).toString(10).substring(0, 3))
            return Date(year, month, day, hour, minutes, seconds, ms)
        }
    }
    if (UTSAndroid.`typeof`(date) == "number") {
        return Date(date as Number)
    }
    if (UTSArray.isArray(date)) {
        val newd = (date as UTSArray<Number>).slice() as UTSArray<Number>
        while(newd.length < 7){
            newd.push(0)
        }
        return Date(newd[0], newd[1], Math.max(newd[2], 1), newd[3], newd[4], newd[5], newd[6])
    }
    return Date(date as String)
}
val getShort = fun(arr: UTSArray<String>, index: Number): String {
    return arr[index]
}
val getH = fun(hour: Number, len: Number): String {
    var h = hour % 12
    h = if (h == 0) {
        12
    } else {
        h
    }
    return padStart(h, len, "0")
}
fun monthDiff(a: Dateuts, b: Dateuts): Number {
    if (a.date() < b.date()) {
        return -monthDiff(b, a)
    }
    val ayear = a.year()
    val amonth = a.month()
    val byear = b.year()
    val bmonth = b.month()
    val wholeMonthDiff = ((byear - ayear) * 12) + (bmonth - amonth)
    val anchor = a.clone().add(wholeMonthDiff, M).valueOf()
    val bvalue = b.valueOf()
    val c = bvalue - anchor < 0
    val anchor2 = a.clone().add(wholeMonthDiff + (if (c) {
        -1
    } else {
        1
    }
    ), M).valueOf()
    val diff = (bvalue - anchor) / (if (c) {
        (anchor - anchor2)
    } else {
        (anchor2 - anchor)
    }
    )
    val result = wholeMonthDiff + diff
    val result2 = -result
    val absResult = +result2
    val finalResult = if (!isNaN(absResult)) {
        absResult
    } else {
        0
    }
    return finalResult
}
val absFloor = fun(n: Number): Number {
    return if (n < 0) {
        Math.ceil(n)
    } else {
        Math.floor(n)
    }
}
open class Dateuts : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Dateuts", "uni_modules/rice-ui/libs/plugin/dateuts/index.uts", 12, 14)
    }
    private var `$d`: Date
    private var `$y`: Number = 0
    private var `$M`: Number = 0
    private var `$D`: Number = 0
    private var `$W`: Number = 0
    private var `$H`: Number = 0
    private var `$m`: Number = 0
    private var `$s`: Number = 0
    private var `$ms`: Number = 0
    constructor(params: DateParams){
        this.`$d` = parseDate(params)
        this.init()
    }
    private fun init() {
        this.`$y` = this.`$d`.getFullYear()
        this.`$M` = this.`$d`.getMonth()
        this.`$D` = this.`$d`.getDate()
        this.`$W` = this.`$d`.getDay()
        this.`$H` = this.`$d`.getHours()
        this.`$m` = this.`$d`.getMinutes()
        this.`$s` = this.`$d`.getSeconds()
        this.`$ms` = this.`$d`.getMilliseconds()
    }
    open fun valueOf(): Number {
        return this.`$d`.getTime()
    }
    open fun unix(): Number {
        return Math.floor(this.valueOf() / 1000)
    }
    open fun toDate(): Date {
        return Date(this.valueOf())
    }
    open fun clone(): Dateuts {
        return wrapper(this.`$d`)
    }
    open fun startOf(unit: DateUnits, flag: Boolean = true): Dateuts {
        val isStartOf = flag
        val instanceFactory = fun(d: Number, m: Number): Dateuts {
            val ins = dateuts(Date(this.`$y`, m, d))
            return if (isStartOf) {
                ins
            } else {
                ins.endOf(D)
            }
        }
        val instanceFactorySet = fun(method: String, slice: Number): Dateuts {
            val argumentStart: UTSArray<Number> = _uA(
                0,
                0,
                0,
                0
            )
            val argumentEnd: UTSArray<Number> = _uA(
                23,
                59,
                59,
                999
            )
            val arg = (if (isStartOf) {
                argumentStart
            } else {
                argumentEnd
            }
            ).slice(slice)
            val date = this.toDate()
            if (method == "setHours") {
                date.setHours(arg[0])
                date.setMinutes(arg[1])
                date.setSeconds(arg[2])
                date.setMilliseconds(arg[3])
            } else if (method == "setMinutes") {
                date.setMinutes(arg[0])
                date.setSeconds(arg[1])
                date.setMilliseconds(arg[2])
            } else if (method == "setSeconds") {
                date.setSeconds(arg[0])
                date.setMilliseconds(arg[1])
            } else if (method == "setMilliseconds") {
                date.setMilliseconds(arg[0])
            }
            return dateuts(date)
        }
        if (unit == Y) {
            return if (isStartOf) {
                instanceFactory(1, 0)
            } else {
                instanceFactory(31, 11)
            }
        } else if (unit == M) {
            return if (isStartOf) {
                instanceFactory(1, this.`$M`)
            } else {
                instanceFactory(0, this.`$M` + 1)
            }
        } else if (unit == Q) {
            val quarter = this.quarter() - 1
            return if (isStartOf) {
                this.month(quarter * 3).startOf(M).startOf(D)
            } else {
                this.month((quarter * 3) + 2).endOf(M).endOf(D)
            }
        } else if (unit == W) {
            val weekStart = local.weekStart
            val gap = (if (this.`$W` < weekStart) {
                this.`$W` + 7
            } else {
                this.`$W`
            }) - weekStart
            return instanceFactory(if (isStartOf) {
                this.`$D` - gap
            } else {
                this.`$D` + (6 - gap)
            }, this.`$M`)
        } else if (unit == D || unit == DATE) {
            return instanceFactorySet("setHours", 0)
        } else if (unit == H) {
            return instanceFactorySet("setMinutes", 1)
        } else if (unit == MIN) {
            return instanceFactorySet("setSeconds", 2)
        } else if (unit == S) {
            return instanceFactorySet("setMilliseconds", 3)
        }
        return this.clone()
    }
    open fun endOf(unit: DateUnits): Dateuts {
        return this.startOf(unit, false)
    }
    open fun daysInMonth(): Number {
        return this.endOf(M).`$D`
    }
    open fun isValid(): Boolean {
        return !(this.`$d`.toString() == INVALID_DATE_STRING)
    }
    open fun format(formatStr: String): String {
        val matches = fun(match: String): String {
            when (match) {
                "YY" -> 
                    return this.`$y`.toString(10).slice(-2)
                "YYYY" -> 
                    return this.`$y`.toString(10)
                "M" -> 
                    return (this.`$M` + 1).toString(10)
                "MM" -> 
                    return padStart(this.`$M` + 1, 2, "0")
                "MMM" -> 
                    return getShort(local.monthsShort, this.`$M`)
                "MMMM" -> 
                    return getShort(local.months, this.`$M`)
                "D" -> 
                    return this.`$D`.toString(10)
                "DD" -> 
                    return padStart(this.`$D`, 2, "0")
                "d" -> 
                    return this.`$W`.toString(10)
                "dd" -> 
                    return getShort(local.weekdaysMin, this.`$W`)
                "ddd" -> 
                    return getShort(local.weekdaysShort, this.`$W`)
                "dddd" -> 
                    return getShort(local.weekdays, this.`$W`)
                "H" -> 
                    return this.`$H`.toString(10)
                "HH" -> 
                    return padStart(this.`$H`, 2, "0")
                "h" -> 
                    return getH(this.`$H`, 1)
                "hh" -> 
                    return getH(this.`$H`, 2)
                "m" -> 
                    return this.`$m`.toString(10)
                "mm" -> 
                    return padStart(this.`$m`, 2, "0")
                "s" -> 
                    return this.`$s`.toString(10)
                "ss" -> 
                    return padStart(this.`$s`, 2, "0")
                "SSS" -> 
                    return padStart(this.`$ms`, 3, "0")
                else -> 
                    {}
            }
            return ""
        }
        return formatStr.replace(REGEX_FORMAT, fun(match: String, p1: String?, offset: Number, str: String): String {
            if (p1 == null) {
                return matches(match)
            }
            return p1
        }
        )
    }
    private fun utcOffset(): Number {
        return 0
    }
    private fun `$set`(unit: DateUnits, num: Number): Dateuts {
        val arg = if (unit == D) {
            this.`$D` + (num - this.`$W`)
        } else {
            num
        }
        val setDate = fun(date: Dateuts, unit: DateUnits, kVal: Number){
            if (unit == D || unit == DATE) {
                date.`$d`.setDate(kVal)
            } else if (unit == Y) {
                date.`$d`.setFullYear(kVal)
            } else if (unit == M) {
                date.`$d`.setMonth(kVal)
            } else if (unit == H) {
                date.`$d`.setHours(kVal)
            } else if (unit == MIN) {
                date.`$d`.setMinutes(kVal)
            } else if (unit == S) {
                date.`$d`.setSeconds(kVal)
            } else if (unit == MS) {
                date.`$d`.setMilliseconds(kVal)
            }
        }
        if (unit == M || unit == Y) {
            val date = this.clone().set(DATE, 1)
            setDate(date, unit, arg)
            date.init()
            this.`$d` = date.set(DATE, Math.min(this.`$D`, date.daysInMonth())).`$d`
        } else {
            setDate(this, unit, arg)
        }
        this.init()
        return this
    }
    open fun set(str: DateUnits, value: Number): Dateuts {
        return this.clone().`$set`(str, value)
    }
    open fun get(unit: DateUnits): Number {
        if (unit == Y) {
            return this.year()
        }
        if (unit == M) {
            return this.month()
        }
        if (unit == Q) {
            return this.quarter()
        }
        if (unit == D || unit == W) {
            return this.day()
        }
        if (unit == DATE) {
            return this.date()
        }
        if (unit == H) {
            return this.hour()
        }
        if (unit == MIN) {
            return this.minute()
        }
        if (unit == S) {
            return this.second()
        }
        if (unit == MS) {
            return this.millisecond()
        }
        return 0
    }
    open fun year(): Number {
        return this.year(null) as Number
    }
    open fun year(input: Number): Dateuts {
        return this.year(input as Number?) as Dateuts
    }
    open fun year(input: Number?): Any {
        if (input == null) {
            return this.`$y`
        }
        return this.set(Y, input)
    }
    open fun month(): Number {
        return this.month(null) as Number
    }
    open fun month(input: Number): Dateuts {
        return this.month(input as Number?) as Dateuts
    }
    open fun month(input: Number?): Any {
        if (input == null) {
            return this.`$M`
        }
        return this.set(M, input)
    }
    open fun quarter(): Number {
        return this.quarter(null) as Number
    }
    open fun quarter(input: Number): Dateuts {
        return this.quarter(input as Number?) as Dateuts
    }
    open fun quarter(input: Number?): Any {
        val m = this.month()
        if (input == null) {
            return Math.ceil((m + 1) / 3)
        }
        val arg = (m % 3) + ((input - 1) * 3)
        return this.month(arg)
    }
    open fun day(): Number {
        return this.day(null) as Number
    }
    open fun day(input: Number): Dateuts {
        return this.day(input as Number?) as Dateuts
    }
    open fun day(input: Number?): Any {
        if (input == null) {
            return this.`$W`
        }
        return this.set(D, input)
    }
    open fun date(): Number {
        return this.date(null) as Number
    }
    open fun date(input: Number): Dateuts {
        return this.date(input as Number?) as Dateuts
    }
    open fun date(input: Number?): Any {
        if (input == null) {
            return this.`$D`
        }
        return this.set(DATE, input)
    }
    open fun hour(): Number {
        return this.hour(null) as Number
    }
    open fun hour(input: Number): Dateuts {
        return this.hour(input as Number?) as Dateuts
    }
    open fun hour(input: Number?): Any {
        if (input == null) {
            return this.`$H`
        }
        return this.set(H, input)
    }
    open fun minute(): Number {
        return this.minute(null) as Number
    }
    open fun minute(input: Number): Dateuts {
        return this.minute(input as Number?) as Dateuts
    }
    open fun minute(input: Number?): Any {
        if (input == null) {
            return this.`$m`
        }
        return this.set(MIN, input)
    }
    open fun second(): Number {
        return this.second(null) as Number
    }
    open fun second(input: Number): Dateuts {
        return this.second(input as Number?) as Dateuts
    }
    open fun second(input: Number?): Any {
        if (input == null) {
            return this.`$s`
        }
        return this.set(S, input)
    }
    open fun millisecond(): Number {
        return this.millisecond(null) as Number
    }
    open fun millisecond(input: Number): Dateuts {
        return this.millisecond(input as Number?) as Dateuts
    }
    open fun millisecond(input: Number?): Any {
        if (input == null) {
            return this.`$ms`
        }
        return this.set(MS, input)
    }
    open fun add(num: Number, unit: DateUnits): Dateuts {
        val instanceFactorySet = fun(n: Number): Dateuts {
            val d = dateuts(this)
            val ddate = d.date() as Number
            return wrapper(d.date(ddate + Math.round(n * num)))
        }
        if (unit == Y) {
            return this.set(Y, this.`$y` + num)
        }
        if (unit == M) {
            return this.set(M, this.`$M` + num)
        }
        if (unit == Q) {
            return this.add(num * 3, M)
        }
        if (unit == D) {
            return instanceFactorySet(1)
        }
        if (unit == W) {
            return instanceFactorySet(7)
        }
        val stepMap = Map<String, Number>(_uA(
            _uA(
                MIN,
                MILLISECONDS_A_MINUTE
            ),
            _uA(
                H,
                MILLISECONDS_A_HOUR
            ),
            _uA(
                S,
                MILLISECONDS_A_SECOND
            )
        ))
        val step = stepMap.get(unit) ?: 1
        val nextTimeStamp = this.`$d`.getTime() + (num * step)
        return wrapper(nextTimeStamp)
    }
    open fun subtract(num: Number, unit: DateUnits): Dateuts {
        return this.add(num * -1, unit)
    }
    open fun diff(input: Any, unit: DateUnits = "millisecond", float: Boolean = false): Number {
        val that = dateuts(input)
        val zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE
        val diff = this.valueOf() - that.valueOf()
        val getMonth = fun(): Number {
            return monthDiff(this, that)
        }
        var result: Number
        when (unit) {
            Y -> 
                result = getMonth() / 12
            M -> 
                result = getMonth()
            Q -> 
                result = getMonth() / 3
            W -> 
                result = (diff - zoneDelta) / MILLISECONDS_A_WEEK
            D -> 
                result = (diff - zoneDelta) / MILLISECONDS_A_DAY
            H -> 
                result = diff / MILLISECONDS_A_HOUR
            MIN -> 
                result = diff / MILLISECONDS_A_MINUTE
            S -> 
                result = diff / MILLISECONDS_A_SECOND
            else -> 
                result = diff
        }
        return if (float) {
            result
        } else {
            absFloor(result)
        }
    }
    open fun toArray(): UTSArray<Number> {
        return _uA(
            this.`$y`,
            this.`$M`,
            this.`$D`,
            this.`$H`,
            this.`$m`,
            this.`$s`,
            this.`$ms`
        )
    }
    open fun toObject(): DateObject {
        return DateObject(year = this.`$y`, month = this.`$M`, date = this.`$D`, hours = this.`$H`, minutes = this.`$m`, seconds = this.`$s`, milliseconds = this.`$ms`)
    }
    open fun isBefore(date: Any = "", unit: DateUnits = "millisecond"): Boolean {
        return this.endOf(unit).valueOf() < dateuts(date).valueOf()
    }
    open fun isSame(date: Any = "", unit: DateUnits = "millisecond"): Boolean {
        val other = dateuts(date).valueOf()
        return this.startOf(unit).valueOf() <= other && other <= this.endOf(unit).valueOf()
    }
    open fun isAfter(date: Any = "", unit: DateUnits = "millisecond"): Boolean {
        return dateuts(date).valueOf() < this.startOf(unit).valueOf()
    }
    open fun isSameOrBefore(date: Any = "", unit: DateUnits = "millisecond"): Boolean {
        return this.isSame(date, unit) || this.isBefore(date, unit)
    }
    open fun isSameOrAfter(date: Any = "", unit: DateUnits = "millisecond"): Boolean {
        return this.isSame(date, unit) || this.isAfter(date, unit)
    }
    open fun isBetween(date1: Any = "", date2: Any = "", unit: DateUnits = "millisecond", i: String = "()"): Boolean {
        val dA = dateuts(date1)
        val dB = dateuts(date2)
        var str = if (i.length == 2) {
            i
        } else {
            "()"
        }
        val dAi = str.startsWith("(")
        val dBi = str.endsWith(")")
        return ((if (dAi) {
            this.isAfter(dA, unit)
        } else {
            !this.isBefore(dA, unit)
        }
        ) && (if (dBi) {
            this.isBefore(dB, unit)
        } else {
            !this.isAfter(dB, unit)
        }
        )) || ((if (dAi) {
            this.isBefore(dA, unit)
        } else {
            !this.isAfter(dA, unit)
        }
        ) && (if (dBi) {
            this.isAfter(dB, unit)
        } else {
            !this.isBefore(dB, unit)
        }
        ))
    }
    open fun isLeapYear(): Boolean {
        return ((this.`$y` % 4 == 0) && (this.`$y` % 100 != 0)) || (this.`$y` % 400 == 0)
    }
}
fun dateuts(date: Any = "", customFormat: String = ""): Dateuts {
    if (isDateuts(date)) {
        return (date as Dateuts).clone()
    }
    val params = DateParams(date = date as DateType, customFormat = customFormat)
    return Dateuts(params)
}
open class DateParams (
    @JsonNotNull
    open var date: DateType,
    open var customFormat: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DateParams", "uni_modules/rice-ui/libs/plugin/dateuts/type.uts", 3, 13)
    }
}
open class DateObject (
    @JsonNotNull
    open var year: Number,
    @JsonNotNull
    open var month: Number,
    @JsonNotNull
    open var date: Number,
    @JsonNotNull
    open var hours: Number,
    @JsonNotNull
    open var minutes: Number,
    @JsonNotNull
    open var seconds: Number,
    @JsonNotNull
    open var milliseconds: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DateObject", "uni_modules/rice-ui/libs/plugin/dateuts/type.uts", 7, 13)
    }
}
typealias DateUnits = String
typealias LoadingMode = String
typealias LoadingTimingFunction = String
open class UseLoadingOptions (
    @JsonNotNull
    open var rotateRef: Ref<UniElement?>,
    @JsonNotNull
    open var circularRef: Ref<UniElement?>,
    @JsonNotNull
    open var timingFunction: LoadingTimingFunction,
    @JsonNotNull
    open var mode: LoadingMode,
    @JsonNotNull
    open var color: ComputedRef<String>,
    @JsonNotNull
    open var size: Any,
    @JsonNotNull
    open var duration: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseLoadingOptions", "uni_modules/rice-ui/components/rice-loading/useLoading.uts", 3, 13)
    }
}
fun useLoading(options: UseLoadingOptions) {
    var aniIns: UniAnimation? = null
    val startAnimate = fun(): UTSPromise<Unit> {
        return wrapUTSPromise(suspend {
                val rotateRef = options.rotateRef
                val timingFunction = options.timingFunction
                val duration = options.duration
                await(nextTick())
                aniIns = rotateRef.value?.animate(_uA(
                    UniAnimationKeyframe(transform = "rotate(0deg)"),
                    UniAnimationKeyframe(transform = "rotate(360deg)")
                ), UniAnimationOption(duration = duration, easing = timingFunction, iterations = Infinity))
        })
    }
    var timer: Number? = null
    var drawContext: DrawableContext? = null
    val easeInOutCubic = fun(t: Number): Number {
        return if (t < 0.5) {
            4 * t * t * t
        } else {
            (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }
    }
    val drawCircular = fun(ctx: DrawableContext){
        var rotate: Number = 0
        val size = getPxNum(options.size)
        val ARC_LENGTH: Number = 359
        val center = size / 2
        val lineWidth = size / 10
        val duration = options.duration
        val ARC_MAX: Number = 352
        var startTime: Number = 0
        var foreward_end: Number = 0
        var reversal_end = ARC_MAX
        fun pogressTime(): Number {
            val currentTime = Date.now()
            val elapsedTime = currentTime - startTime
            val progress = elapsedTime / duration
            val easedProgress = easeInOutCubic(progress)
            return easedProgress
        }
        val draw = fun(){
            ctx.reset()
            ctx.beginPath()
            if (reversal_end == ARC_MAX) {
                foreward_end = Math.min(pogressTime() * ARC_LENGTH, ARC_LENGTH)
                if (foreward_end >= ARC_MAX) {
                    reversal_end = 0
                    foreward_end = ARC_MAX
                    startTime = Date.now()
                }
            }
            if (foreward_end == ARC_MAX) {
                reversal_end = Math.min(pogressTime() * ARC_LENGTH, ARC_LENGTH)
                if (reversal_end >= ARC_MAX) {
                    reversal_end = ARC_MAX
                    foreward_end = 0
                    startTime = Date.now()
                }
            }
            ctx.arc(center, center, center - lineWidth, rotate + (reversal_end * Math.PI / 180), rotate + (foreward_end * Math.PI / 180))
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = options.color.value
            ctx.stroke()
            ctx.update()
            rotate += 0.05
        }
        timer = setInterval(fun(){
            return draw()
        }
        , 16)
    }
    val removeInterval = fun(){
        if (timer != null) {
            clearInterval(timer!!)
            timer = null
        }
    }
    val initCircular = fun(){
        val circularRef = options.circularRef
        if (circularRef.value == null) {
            return
        }
        removeInterval()
        drawContext = circularRef.value!!.getDrawableContext()!!
        drawContext!!.reset()
        drawCircular(drawContext!!)
    }
    watch(fun(): String {
        return options.color.value
    }
    , fun(){
        initCircular()
    }
    )
    val init = fun(): UTSPromise<Unit> {
        return wrapUTSPromise(suspend {
                await(nextTick())
                initCircular()
                startAnimate()
        })
    }
    onMounted(fun(){
        init()
    }
    )
    onUnmounted(fun(){
        removeInterval()
    }
    )
    var hasHide = false
    onPageShow(fun(){
        if (hasHide && drawContext != null) {
            drawCircular(drawContext!!)
        }
    }
    )
    onPageHide(fun(){
        hasHide = true
        removeInterval()
    }
    )
}
val GenUniModulesRiceUiComponentsRiceLoadingRiceLoadingClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceLoadingRiceLoading::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.inject, props = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.emits, components = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.components, styles = GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, externalClasses = _uA(
        "textClass"
    ), setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceLoadingRiceLoading.setup(props as GenUniModulesRiceUiComponentsRiceLoadingRiceLoading)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceLoadingRiceLoading {
    return GenUniModulesRiceUiComponentsRiceLoadingRiceLoading(instance)
}
)
val iconSizeTypes: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("iconSizeTypes", "uni_modules/rice-ui/components/rice-button/utils.uts", 1, 14), "large" to "18px", "default" to "16px", "small" to "14px", "mini" to "12px")
val loadingSizeTypes: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("loadingSizeTypes", "uni_modules/rice-ui/components/rice-button/utils.uts", 7, 14), "large" to "20px", "default" to "18px", "small" to "16px", "mini" to "14px")
val GenUniModulesRiceUiComponentsRiceButtonRiceButtonClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceButtonRiceButton::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceButtonRiceButton.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceButtonRiceButton.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceButtonRiceButton.inject, props = GenUniModulesRiceUiComponentsRiceButtonRiceButton.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceButtonRiceButton.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceButtonRiceButton.emits, components = GenUniModulesRiceUiComponentsRiceButtonRiceButton.components, styles = GenUniModulesRiceUiComponentsRiceButtonRiceButton.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceButtonRiceButton.setup(props as GenUniModulesRiceUiComponentsRiceButtonRiceButton)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceButtonRiceButton {
    return GenUniModulesRiceUiComponentsRiceButtonRiceButton(instance)
}
)
open class BadgeProps (
    open var value: Any? = null,
    open var max: Number? = null,
    open var isDot: Boolean? = null,
    open var hidden: Boolean? = null,
    open var type: String? = null,
    open var showZero: Boolean? = null,
    open var bgColor: String? = null,
    open var color: String? = null,
    open var fontSize: Any? = null,
    open var position: String? = null,
    open var offset: UTSArray<Any>? = null,
    open var absolute: Boolean? = null,
    open var textClass: String? = null,
    open var badgeStyle: UTSJSONObject? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("BadgeProps", "uni_modules/rice-ui/components/rice-badge/type.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return BadgePropsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class BadgePropsReactiveObject : BadgeProps, IUTSReactive<BadgeProps> {
    override var __v_raw: BadgeProps
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: BadgeProps, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(value = __v_raw.value, max = __v_raw.max, isDot = __v_raw.isDot, hidden = __v_raw.hidden, type = __v_raw.type, showZero = __v_raw.showZero, bgColor = __v_raw.bgColor, color = __v_raw.color, fontSize = __v_raw.fontSize, position = __v_raw.position, offset = __v_raw.offset, absolute = __v_raw.absolute, textClass = __v_raw.textClass, badgeStyle = __v_raw.badgeStyle) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): BadgePropsReactiveObject {
        return BadgePropsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var value: Any?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var max: Number?
        get() {
            return _tRG(__v_raw, "max", __v_raw.max, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("max")) {
                return
            }
            val oldValue = __v_raw.max
            __v_raw.max = value
            _tRS(__v_raw, "max", oldValue, value)
        }
    override var isDot: Boolean?
        get() {
            return _tRG(__v_raw, "isDot", __v_raw.isDot, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("isDot")) {
                return
            }
            val oldValue = __v_raw.isDot
            __v_raw.isDot = value
            _tRS(__v_raw, "isDot", oldValue, value)
        }
    override var hidden: Boolean?
        get() {
            return _tRG(__v_raw, "hidden", __v_raw.hidden, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("hidden")) {
                return
            }
            val oldValue = __v_raw.hidden
            __v_raw.hidden = value
            _tRS(__v_raw, "hidden", oldValue, value)
        }
    override var type: String?
        get() {
            return _tRG(__v_raw, "type", __v_raw.type, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("type")) {
                return
            }
            val oldValue = __v_raw.type
            __v_raw.type = value
            _tRS(__v_raw, "type", oldValue, value)
        }
    override var showZero: Boolean?
        get() {
            return _tRG(__v_raw, "showZero", __v_raw.showZero, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showZero")) {
                return
            }
            val oldValue = __v_raw.showZero
            __v_raw.showZero = value
            _tRS(__v_raw, "showZero", oldValue, value)
        }
    override var bgColor: String?
        get() {
            return _tRG(__v_raw, "bgColor", __v_raw.bgColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("bgColor")) {
                return
            }
            val oldValue = __v_raw.bgColor
            __v_raw.bgColor = value
            _tRS(__v_raw, "bgColor", oldValue, value)
        }
    override var color: String?
        get() {
            return _tRG(__v_raw, "color", __v_raw.color, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("color")) {
                return
            }
            val oldValue = __v_raw.color
            __v_raw.color = value
            _tRS(__v_raw, "color", oldValue, value)
        }
    override var fontSize: Any?
        get() {
            return _tRG(__v_raw, "fontSize", __v_raw.fontSize, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("fontSize")) {
                return
            }
            val oldValue = __v_raw.fontSize
            __v_raw.fontSize = value
            _tRS(__v_raw, "fontSize", oldValue, value)
        }
    override var position: String?
        get() {
            return _tRG(__v_raw, "position", __v_raw.position, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("position")) {
                return
            }
            val oldValue = __v_raw.position
            __v_raw.position = value
            _tRS(__v_raw, "position", oldValue, value)
        }
    override var offset: UTSArray<Any>?
        get() {
            return _tRG(__v_raw, "offset", __v_raw.offset, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("offset")) {
                return
            }
            val oldValue = __v_raw.offset
            __v_raw.offset = value
            _tRS(__v_raw, "offset", oldValue, value)
        }
    override var absolute: Boolean?
        get() {
            return _tRG(__v_raw, "absolute", __v_raw.absolute, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("absolute")) {
                return
            }
            val oldValue = __v_raw.absolute
            __v_raw.absolute = value
            _tRS(__v_raw, "absolute", oldValue, value)
        }
    override var textClass: String?
        get() {
            return _tRG(__v_raw, "textClass", __v_raw.textClass, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("textClass")) {
                return
            }
            val oldValue = __v_raw.textClass
            __v_raw.textClass = value
            _tRS(__v_raw, "textClass", oldValue, value)
        }
    override var badgeStyle: UTSJSONObject?
        get() {
            return _tRG(__v_raw, "badgeStyle", __v_raw.badgeStyle, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("badgeStyle")) {
                return
            }
            val oldValue = __v_raw.badgeStyle
            __v_raw.badgeStyle = value
            _tRS(__v_raw, "badgeStyle", oldValue, value)
        }
}
val GenUniModulesRiceUiComponentsRiceBadgeRiceBadgeClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceBadgeRiceBadge::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.inject, props = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.emits, components = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.components, styles = GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, externalClasses = _uA(
        "textClass"
    ), setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceBadgeRiceBadge.setup(props as GenUniModulesRiceUiComponentsRiceBadgeRiceBadge)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceBadgeRiceBadge {
    return GenUniModulesRiceUiComponentsRiceBadgeRiceBadge(instance)
}
)
open class TabsOptions (
    @JsonNotNull
    open var name: String,
    open var value: Any? = null,
    open var disabled: Boolean? = null,
    open var badge: BadgeProps? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabsOptions", "uni_modules/rice-ui/components/rice-tabs/type.uts", 2, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return TabsOptionsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class TabsOptionsReactiveObject : TabsOptions, IUTSReactive<TabsOptions> {
    override var __v_raw: TabsOptions
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: TabsOptions, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value, disabled = __v_raw.disabled, badge = __v_raw.badge) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): TabsOptionsReactiveObject {
        return TabsOptionsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
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
    override var value: Any?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var disabled: Boolean?
        get() {
            return _tRG(__v_raw, "disabled", __v_raw.disabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("disabled")) {
                return
            }
            val oldValue = __v_raw.disabled
            __v_raw.disabled = value
            _tRS(__v_raw, "disabled", oldValue, value)
        }
    override var badge: BadgeProps?
        get() {
            return _tRG(__v_raw, "badge", __v_raw.badge, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("badge")) {
                return
            }
            val oldValue = __v_raw.badge
            __v_raw.badge = value
            _tRS(__v_raw, "badge", oldValue, value)
        }
}
open class TabsClickTab (
    @JsonNotNull
    open var index: Number,
    @JsonNotNull
    open var name: String,
    open var value: Any? = null,
    @JsonNotNull
    open var disabled: Boolean = false,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabsClickTab", "uni_modules/rice-ui/components/rice-tabs/type.uts", 8, 13)
    }
}
open class TabsChange (
    @JsonNotNull
    open var index: Number,
    @JsonNotNull
    open var name: String,
    open var value: Any? = null,
    @JsonNotNull
    open var disabled: Boolean = false,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabsChange", "uni_modules/rice-ui/components/rice-tabs/type.uts", 14, 13)
    }
}
open class TabsItemRect (
    @JsonNotNull
    open var x: Number,
    @JsonNotNull
    open var w: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabsItemRect", "uni_modules/rice-ui/components/rice-tabs/type.uts", 20, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return TabsItemRectReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class TabsItemRectReactiveObject : TabsItemRect, IUTSReactive<TabsItemRect> {
    override var __v_raw: TabsItemRect
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: TabsItemRect, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(x = __v_raw.x, w = __v_raw.w) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): TabsItemRectReactiveObject {
        return TabsItemRectReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var x: Number
        get() {
            return _tRG(__v_raw, "x", __v_raw.x, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("x")) {
                return
            }
            val oldValue = __v_raw.x
            __v_raw.x = value
            _tRS(__v_raw, "x", oldValue, value)
        }
    override var w: Number
        get() {
            return _tRG(__v_raw, "w", __v_raw.w, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("w")) {
                return
            }
            val oldValue = __v_raw.w
            __v_raw.w = value
            _tRS(__v_raw, "w", oldValue, value)
        }
}
val GenUniModulesRiceUiComponentsRiceTabsRiceTabsClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceTabsRiceTabs::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.inject, props = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.emits, components = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.components, styles = GenUniModulesRiceUiComponentsRiceTabsRiceTabs.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, externalClasses = _uA(
        "activeTextClass",
        "inactiveTextClass",
        "disabledTextClass",
        "textClass"
    ), setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesRiceUiComponentsRiceTabsRiceTabs.setup(props as GenUniModulesRiceUiComponentsRiceTabsRiceTabs, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceTabsRiceTabs {
    return GenUniModulesRiceUiComponentsRiceTabsRiceTabs(instance)
}
)
val GenUniModulesRiceUiComponentsRiceDividerRiceDividerClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceDividerRiceDivider::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.inject, props = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.emits, components = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.components, styles = GenUniModulesRiceUiComponentsRiceDividerRiceDivider.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceDividerRiceDivider.setup(props as GenUniModulesRiceUiComponentsRiceDividerRiceDivider)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceDividerRiceDivider {
    return GenUniModulesRiceUiComponentsRiceDividerRiceDivider(instance)
}
)
open class FloatFabState (
    @JsonNotNull
    open var x: Number,
    @JsonNotNull
    open var y: Number,
    @JsonNotNull
    open var width: Number,
    @JsonNotNull
    open var height: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FloatFabState", "uni_modules/rice-ui/components/rice-float-fab/type.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return FloatFabStateReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class FloatFabStateReactiveObject : FloatFabState, IUTSReactive<FloatFabState> {
    override var __v_raw: FloatFabState
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: FloatFabState, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(x = __v_raw.x, y = __v_raw.y, width = __v_raw.width, height = __v_raw.height) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): FloatFabStateReactiveObject {
        return FloatFabStateReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var x: Number
        get() {
            return _tRG(__v_raw, "x", __v_raw.x, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("x")) {
                return
            }
            val oldValue = __v_raw.x
            __v_raw.x = value
            _tRS(__v_raw, "x", oldValue, value)
        }
    override var y: Number
        get() {
            return _tRG(__v_raw, "y", __v_raw.y, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("y")) {
                return
            }
            val oldValue = __v_raw.y
            __v_raw.y = value
            _tRS(__v_raw, "y", oldValue, value)
        }
    override var width: Number
        get() {
            return _tRG(__v_raw, "width", __v_raw.width, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("width")) {
                return
            }
            val oldValue = __v_raw.width
            __v_raw.width = value
            _tRS(__v_raw, "width", oldValue, value)
        }
    override var height: Number
        get() {
            return _tRG(__v_raw, "height", __v_raw.height, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("height")) {
                return
            }
            val oldValue = __v_raw.height
            __v_raw.height = value
            _tRS(__v_raw, "height", oldValue, value)
        }
}
open class FloatFabOffset (
    @JsonNotNull
    open var x: Number,
    @JsonNotNull
    open var y: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FloatFabOffset", "uni_modules/rice-ui/components/rice-float-fab/type.uts", 7, 13)
    }
}
open class FloatFabBoundary (
    @JsonNotNull
    open var top: Number,
    @JsonNotNull
    open var bottom: Number,
    @JsonNotNull
    open var left: Number,
    @JsonNotNull
    open var right: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FloatFabBoundary", "uni_modules/rice-ui/components/rice-float-fab/type.uts", 11, 13)
    }
}
open class FloatFabWindowSize (
    @JsonNotNull
    open var width: Number,
    @JsonNotNull
    open var height: Number,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FloatFabWindowSize", "uni_modules/rice-ui/components/rice-float-fab/type.uts", 17, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return FloatFabWindowSizeReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class FloatFabWindowSizeReactiveObject : FloatFabWindowSize, IUTSReactive<FloatFabWindowSize> {
    override var __v_raw: FloatFabWindowSize
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: FloatFabWindowSize, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(width = __v_raw.width, height = __v_raw.height) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): FloatFabWindowSizeReactiveObject {
        return FloatFabWindowSizeReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var width: Number
        get() {
            return _tRG(__v_raw, "width", __v_raw.width, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("width")) {
                return
            }
            val oldValue = __v_raw.width
            __v_raw.width = value
            _tRS(__v_raw, "width", oldValue, value)
        }
    override var height: Number
        get() {
            return _tRG(__v_raw, "height", __v_raw.height, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("height")) {
                return
            }
            val oldValue = __v_raw.height
            __v_raw.height = value
            _tRS(__v_raw, "height", oldValue, value)
        }
}
val GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFabClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.inject, props = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.emits, components = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.components, styles = GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab.setup(props as GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab {
    return GenUniModulesRiceUiComponentsRiceFloatFabRiceFloatFab(instance)
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
        return UTSSourceMapPosition("StorageApi", "api/Storage.uts", 13, 6)
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
        console.error("storage set error", e, " at api/Storage.uts:41")
    }
}
fun storageRemove(key: String): Unit {
    try {
        uni_removeStorageSync(key)
    }
     catch (e: Throwable) {
        console.error("storage remove error", e, " at api/Storage.uts:49")
    }
}
fun storageClear(): Unit {
    try {
        uni_clearStorageSync()
    }
     catch (e: Throwable) {
        console.error("storage clear error", e, " at api/Storage.uts:57")
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
open class UploadApiResponse<T> (
    @JsonNotNull
    open var code: Number,
    @JsonNotNull
    open var msg: String,
    @JsonNotNull
    open var data: T,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UploadApiResponse", "api/Upload.uts", 6, 13)
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
        return UTSSourceMapPosition("UploadFileOptions", "api/Upload.uts", 11, 13)
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
                parsed = UTSAndroid.consoleDebugError(JSON.parse(json), " at api/Upload.uts:135") as UploadApiResponse<T>
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
    open var rows: UTSArray<Any>? = null,
    open var total: Number? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ApiResponse", "api/Request.uts", 13, 13)
    }
}
val systemInfo = uni_getSystemInfoSync()
val DEFAULT_LANGUAGE = (systemInfo.language ?: "zh_CN").replace("-", "_") as String
val runBlock4 = run {
    setStorageSync("uVueI18nLocale", systemInfo.language.replace("_", "-"))
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
        return UTSSourceMapPosition("RequestOptions", "api/Request.uts", 24, 13)
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
val DEFAULT_LOGIN_PAGE = "/pages/card/card"
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
    if (!(data != null)) {
        return ""
    }
    val parts: UTSArray<String> = _uA()
    for(key in resolveUTSKeyIterator(data)){
        val value = data[key]
        if (value != null && value !== "") {
            var strValue = ""
            if (UTSAndroid.`typeof`(value) === "string") {
                strValue = value as String
            } else if (UTSAndroid.`typeof`(value) === "number") {
                strValue = (value as Number).toString()
            } else if (UTSAndroid.`typeof`(value) === "boolean") {
                strValue = (value as Boolean).toString()
            } else {
                strValue = JSON.stringify(value)
            }
            parts.push(key + "=" + UTSAndroid.consoleDebugError(encodeURIComponent(strValue), " at api/Request.uts:100"))
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
var isRedirectingToLogin = false
fun navigateToLogin(loginPage: String): Unit {
    if (isRedirectingToLogin) {
        return
    }
    isRedirectingToLogin = true
    clearToken()
    storage.clearAuth()
    uni_showToast(ShowToastOptions(title = "登录已过期，请重新登录", icon = "none"))
    setTimeout(fun(){
        uni_reLaunch(ReLaunchOptions(url = loginPage))
        isRedirectingToLogin = false
    }
    , 1000)
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
    val reqHeader: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("reqHeader", "api/Request.uts", 210, 11), "Content-Type" to "application/json", "Accept" to "application/json", "Content-Language" to DEFAULT_LANGUAGE, "clientId" to config.api.auth.clientId)
    if (withToken) {
        val token = getToken()
        if (token != "") {
            reqHeader["authorization"] = "Bearer " + token
            true
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
            val raw = res.data as UTSJSONObject
            val rawCode = raw["code"]
            var code: Number = 0
            if (UTSAndroid.`typeof`(rawCode) === "number") {
                code = rawCode as Number
            } else if (rawCode != null) {
                val parsedCode = parseInt("" + rawCode)
                code = if (isNaN(parsedCode)) {
                    0
                } else {
                    parsedCode
                }
            }
            val rawMsg = raw["msg"] ?: raw["message"]
            val result = ApiResponse(code = code, msg = if (rawMsg == null) {
                ""
            } else {
                "" + rawMsg
            }
            , data = raw["data"] as T, rows = raw["rows"] as UTSArray<Any>?, total = raw["total"] as Number?)
            val msg = result.msg
            var isSuccessCode = false
            run {
                var i: Number = 0
                while(i < finalSuccessCodes.length){
                    if (("" + finalSuccessCodes[i]) == ("" + code)) {
                        isSuccessCode = true
                        break
                    }
                    i++
                }
            }
            if (isSuccessCode) {
                resolve(result)
                return
            }
            if (isWechat()) {
                var isUnauthorizedCode = false
                run {
                    var i: Number = 0
                    while(i < finalUnauthorizedCodes.length){
                        if (("" + finalUnauthorizedCodes[i]) == ("" + code)) {
                            isUnauthorizedCode = true
                            break
                        }
                        i++
                    }
                }
                if (isUnauthorizedCode && redirectOnUnauthorized) {
                    if (showError) {
                        showErrorToast(if (msg != "") {
                            msg
                        } else {
                            "登录已过期，请重新登录"
                        }
                        )
                    }
                    navigateToLogin(finalLoginPage)
                    reject(result)
                    return
                }
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
val http: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("http", "api/Request.uts", 374, 14), "get" to fun(url: String, data: UTSJSONObject?, options: RequestOptions__1?): UTSPromise<ApiResponse<Any>> {
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
fun __uts_large_ApiUrl_fill_fill_1(__obj: UTSJSONObject): Unit {
    __obj["getTenantPageConfigXcx"] = "/system/tenantPageConfig/getTenantPageConfigXcx"
    __obj["getTenantPageConfigH"] = "/system/tenantPageConfig/getTenantPageConfigH"
    __obj["login"] = "/auth/login"
    __obj["queryCardListSum"] = "/app/card/listSum"
    __obj["card_detail"] = "/app/card/info/"
    __obj["countries"] = "/app/card/getH5CountryList"
    __obj["addOrder"] = "/order/pkgOrder"
    __obj["queryOrder"] = "/order/pkgOrder/"
    __obj["goPay"] = "/pay/order/goPayment"
    __obj["queryBySuccessId"] = "/order/pkgOrder/success/"
    __obj["queryPkgInfoDetail"] = "/card/pkgInfo/info/"
    __obj["queryOrderList"] = "/order/pkgOrder/list"
    __obj["queryOrderPackInfo"] = "/order/pkgOrder/getOrderPackInfo/"
    __obj["queryPkgInfoList"] = "/card/pkgInfo/list"
    __obj["queryXcxCardList"] = "/card/pkgInfo/xcxList"
    __obj["queryCardList"] = "/app/card/list"
    __obj["queryCardDetailXcx"] = "/app/card/infoXcx/"
    __obj["userBindCard"] = "/system/appUserCard/add"
    __obj["userUnBindCard"] = "/system/appUserCard/"
    __obj["queryOrderListXcx"] = "/order/pkgOrder/xcxList"
    __obj["addOrderXcx"] = "/order/pkgOrder/xcx/add"
    __obj["queryOrderDetailXcx"] = "/order/pkgOrder/getOrderPackInfo/xcx/"
    __obj["queryOrderSuccess"] = "/order/pkgOrder/xcxSuccess/"
    __obj["goPayXcx"] = "/pay/orderGn/xcx/goPayment/"
    __obj["queryPkgInfoXcx"] = "/card/pkgInfo/xcxInfo/"
}
fun __uts_large_ApiUrl_build_0(): UTSJSONObject {
    val __obj: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("__obj", "api/url.uts", 29, 11))
    __uts_large_ApiUrl_fill_fill_1(__obj)
    return __obj
}
val ApiUrl = __uts_large_ApiUrl_build_0()
fun getCountryList(withToken: Boolean = false): UTSPromise<ApiResponse<UTSArray<CountryData>>> {
    return request<UTSArray<CountryData>>(RequestOptions__1(url = ApiUrl["countries"] as String, method = "GET", withToken = withToken))
}
fun login(data: UTSJSONObject, withToken: Boolean = true): UTSPromise<ApiResponse<LoginData>> {
    return request<LoginData>(RequestOptions__1(url = ApiUrl["login"] as String, method = "POST", data = UTSJSONObject.assign(_uO(), data, _uO("tenantId" to config.api.auth.tenantId, "clientId" to config.api.auth.clientId, "grantType" to config.api.auth.grantType)), withToken = withToken))
}
fun getTenantInfo(tenantId: String, withToken: Boolean = true): UTSPromise<ApiResponse<TenantInfoData>> {
    val url = (ApiUrl["getTenantPageConfigH"] as String) + "/" + config.api.auth.tenantId
    val token = false
    return request<TenantInfoData>(RequestOptions__1(url = url, method = "GET", withToken = token))
}
fun queryCardList(params: QueryCardListParams, withToken: Boolean = true): UTSPromise<ApiResponse<UTSArray<RechargeData>>> {
    val data: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("data", "api/http.uts", 48, 11), "rechargeNo" to params.rechargeNo, "status" to params.status, "isSort" to params.isSort)
    return request<UTSArray<RechargeData>>(RequestOptions__1(url = ApiUrl["queryCardList"] as String, method = "GET", data = data, withToken = withToken))
}
fun queryCardListSum(withToken: Boolean = true): UTSPromise<ApiResponse<CardListSumData>> {
    return request<CardListSumData>(RequestOptions__1(url = ApiUrl["queryCardListSum"] as String, method = "GET", withToken = withToken))
}
fun queryCardDetail(id: String, countryCode: String?, isFind: String?, withToken: Boolean = true): UTSPromise<ApiResponse<RechargeData>> {
    val url = (ApiUrl["card_detail"] as String) + id
    val token = true
    return request<RechargeData>(RequestOptions__1(url = url, method = "GET", withToken = token))
}
fun userBindCard(data: BindCard, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    val body: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("body", "api/http.uts", 81, 11), "rechargeNo" to data.rechargeNo)
    return request<Any>(RequestOptions__1(url = ApiUrl["userBindCard"] as String, method = "POST", data = body, withToken = withToken))
}
fun userUnBindCard(id: String, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    return request<Any>(RequestOptions__1(url = (ApiUrl["userUnBindCard"] as String) + id, method = "DELETE", withToken = withToken))
}
fun queryPkgInfoList(data: PkgInfoListParams, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    val url = (ApiUrl["queryPkgInfoList"] as String)
    val token = false
    val body: UTSJSONObject = _uO("__\$originalPosition" to UTSSourceMapPosition("body", "api/http.uts", 104, 11), "rechargeNo" to data.rechargeNo, "status" to data.status)
    return request<Any>(RequestOptions__1(url = url, method = "GET", data = body, withToken = token))
}
fun queryOrderList(data: UTSJSONObject, withToken: Boolean = true): UTSPromise<ApiResponse<QueryOrderListXcxData>> {
    val url = (ApiUrl["queryOrderList"] as String)
    val token = false
    return request<QueryOrderListXcxData>(RequestOptions__1(url = url, method = "GET", data = data, withToken = token))
}
fun addOrder(data: UTSJSONObject, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    val url = (ApiUrl["addOrder"] as String)
    val token = false
    return request<Any>(RequestOptions__1(url = url, method = "POST", data = data, withToken = token))
}
fun queryOrderDetail(id: String, withToken: Boolean = true): UTSPromise<ApiResponse<QueryOrderDetailXcxData>> {
    val url = (ApiUrl["queryOrderPackInfo"] as String) + id
    val token = false
    return request<QueryOrderDetailXcxData>(RequestOptions__1(url = url, method = "GET", withToken = token))
}
fun queryOrderSuccess(id: String, payChannelId: String, withToken: Boolean = true): UTSPromise<ApiResponse<QueryOrderSuccessParams>> {
    return request<QueryOrderSuccessParams>(RequestOptions__1(url = (ApiUrl["queryOrderSuccess"] as String) + id + "/" + payChannelId, method = "GET", withToken = withToken))
}
fun goPayXcx(orderId: String, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    return request<Any>(RequestOptions__1(url = (ApiUrl["goPayXcx"] as String) + orderId, method = "POST", withToken = withToken))
}
fun queryPkgInfoXcx(id: String, withToken: Boolean = true): UTSPromise<ApiResponse<Any>> {
    return request<Any>(RequestOptions__1(url = (ApiUrl["queryPkgInfoXcx"] as String) + id, method = "GET", withToken = withToken))
}
open class TabItem (
    @JsonNotNull
    open var name: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabItem", "pages/card/card.uvue", 91, 6)
    }
}
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
val GenUniModulesRiceUiComponentsRiceTagRiceTagClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceTagRiceTag::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceTagRiceTag.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceTagRiceTag.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceTagRiceTag.inject, props = GenUniModulesRiceUiComponentsRiceTagRiceTag.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceTagRiceTag.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceTagRiceTag.emits, components = GenUniModulesRiceUiComponentsRiceTagRiceTag.components, styles = GenUniModulesRiceUiComponentsRiceTagRiceTag.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceTagRiceTag.setup(props as GenUniModulesRiceUiComponentsRiceTagRiceTag)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceTagRiceTag {
    return GenUniModulesRiceUiComponentsRiceTagRiceTag(instance)
}
)
val GenUniModulesRiceUiComponentsRiceProgressRiceProgressClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceProgressRiceProgress::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.inject, props = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.emits, components = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.components, styles = GenUniModulesRiceUiComponentsRiceProgressRiceProgress.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceProgressRiceProgress.setup(props as GenUniModulesRiceUiComponentsRiceProgressRiceProgress)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceProgressRiceProgress {
    return GenUniModulesRiceUiComponentsRiceProgressRiceProgress(instance)
}
)
val GenUniModulesRiceUiComponentsRiceOverlayRiceOverlayClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.inject, props = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.emits, components = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.components, styles = GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay.setup(props as GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay {
    return GenUniModulesRiceUiComponentsRiceOverlayRiceOverlay(instance)
}
)
val GenUniModulesRiceUiComponentsRicePopupRicePopupClass = CreateVueComponent(GenUniModulesRiceUiComponentsRicePopupRicePopup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRicePopupRicePopup.name, inheritAttrs = GenUniModulesRiceUiComponentsRicePopupRicePopup.inheritAttrs, inject = GenUniModulesRiceUiComponentsRicePopupRicePopup.inject, props = GenUniModulesRiceUiComponentsRicePopupRicePopup.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRicePopupRicePopup.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRicePopupRicePopup.emits, components = GenUniModulesRiceUiComponentsRicePopupRicePopup.components, styles = GenUniModulesRiceUiComponentsRicePopupRicePopup.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, externalClasses = _uA(
        "popupClass",
        "dragBarClass",
        "dragWrapClass"
    ), setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRicePopupRicePopup.setup(props as GenUniModulesRiceUiComponentsRicePopupRicePopup)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRicePopupRicePopup {
    return GenUniModulesRiceUiComponentsRicePopupRicePopup(instance)
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
        return UTSSourceMapPosition("PaymentMethod", "components/payment.uvue", 96, 6)
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
interface TabEvent {
    var index: Number
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
open class CardDetailTabItem (
    @JsonNotNull
    open var name: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CardDetailTabItem", "pages/cardDetail/cardDetail.uvue", 131, 7)
    }
}
open class CardDetailTabEvent (
    @JsonNotNull
    open var index: Number,
    @JsonNotNull
    open var item: CardDetailTabItem,
    @JsonNotNull
    open var name: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CardDetailTabEvent", "pages/cardDetail/cardDetail.uvue", 135, 7)
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
open class OrderStatusTab (
    @JsonNotNull
    open var name: OrderStatus,
    @JsonNotNull
    open var value: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("OrderStatusTab", "pages/myOrder/myOrder.uvue", 85, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return OrderStatusTabReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class OrderStatusTabReactiveObject : OrderStatusTab, IUTSReactive<OrderStatusTab> {
    override var __v_raw: OrderStatusTab
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: OrderStatusTab, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): OrderStatusTabReactiveObject {
        return OrderStatusTabReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: OrderStatus
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
    override var value: String
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
}
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
val formatTime = fun(reassignedFormat: String, current: CurrentTime): String {
    var format = reassignedFormat
    var days = current.days
    var hours = current.hours
    var minutes = current.minutes
    var seconds = current.seconds
    var milliseconds = current.milliseconds
    if (format.includes("DD")) {
        format = format.replace("DD", padZero(days))
    } else {
        hours += days * 24
    }
    if (format.includes("HH")) {
        format = format.replace("HH", padZero(hours))
    } else {
        minutes += hours * 60
    }
    if (format.includes("mm")) {
        format = format.replace("mm", padZero(minutes))
    } else {
        seconds += minutes * 60
    }
    if (format.includes("ss")) {
        format = format.replace("ss", padZero(seconds))
    } else {
        milliseconds += seconds * 1000
    }
    if (format.includes("S")) {
        val ms = padZero(milliseconds, 3)
        if (format.includes("SSS")) {
            format = format.replace("SSS", ms)
        } else if (format.includes("SS")) {
            format = format.replace("SS", ms.slice(0, 2))
        } else {
            format = format.replace("S", ms.charAt(0))
        }
    }
    return format
}
open class GenUniModulesRiceUiComponentsRiceCountDownRiceCountDownSlotDataDefault (
    @JsonNotNull
    open var current: CurrentTime,
) : SlotData()
val GenUniModulesRiceUiComponentsRiceCountDownRiceCountDownClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.inject, props = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.emits, components = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.components, styles = GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, externalClasses = _uA(
        "textClass"
    ), setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown.setup(props as GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown {
    return GenUniModulesRiceUiComponentsRiceCountDownRiceCountDown(instance)
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
typealias OrderStatus__1 = String
open class OrderStatusTab__1 (
    @JsonNotNull
    open var name: OrderStatus__1,
    @JsonNotNull
    open var value: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("OrderStatusTab", "pages/orderRecord/orderRecord.uvue", 76, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return OrderStatusTab__1ReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class OrderStatusTab__1ReactiveObject : OrderStatusTab__1, IUTSReactive<OrderStatusTab__1> {
    override var __v_raw: OrderStatusTab__1
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: OrderStatusTab__1, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): OrderStatusTab__1ReactiveObject {
        return OrderStatusTab__1ReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: OrderStatus__1
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
    override var value: String
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
}
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
open class PackageTab (
    @JsonNotNull
    open var name: PackageStatus,
    @JsonNotNull
    open var value: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("PackageTab", "pages/myPkg/myPkg.uvue", 73, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return PackageTabReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class PackageTabReactiveObject : PackageTab, IUTSReactive<PackageTab> {
    override var __v_raw: PackageTab
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: PackageTab, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): PackageTabReactiveObject {
        return PackageTabReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: PackageStatus
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
    override var value: String
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
}
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
open class ActionSheetAction (
    @JsonNotNull
    open var name: String,
    open var value: Any? = null,
    open var subname: String? = null,
    open var color: String? = null,
    open var icon: String? = null,
    open var iconSize: Any? = null,
    open var iconFontFamily: String? = null,
    open var disabled: Boolean? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ActionSheetAction", "uni_modules/rice-ui/components/rice-action-sheet/type.uts", 1, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ActionSheetActionReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ActionSheetActionReactiveObject : ActionSheetAction, IUTSReactive<ActionSheetAction> {
    override var __v_raw: ActionSheetAction
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ActionSheetAction, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, value = __v_raw.value, subname = __v_raw.subname, color = __v_raw.color, icon = __v_raw.icon, iconSize = __v_raw.iconSize, iconFontFamily = __v_raw.iconFontFamily, disabled = __v_raw.disabled) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ActionSheetActionReactiveObject {
        return ActionSheetActionReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
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
    override var value: Any?
        get() {
            return _tRG(__v_raw, "value", __v_raw.value, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("value")) {
                return
            }
            val oldValue = __v_raw.value
            __v_raw.value = value
            _tRS(__v_raw, "value", oldValue, value)
        }
    override var subname: String?
        get() {
            return _tRG(__v_raw, "subname", __v_raw.subname, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("subname")) {
                return
            }
            val oldValue = __v_raw.subname
            __v_raw.subname = value
            _tRS(__v_raw, "subname", oldValue, value)
        }
    override var color: String?
        get() {
            return _tRG(__v_raw, "color", __v_raw.color, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("color")) {
                return
            }
            val oldValue = __v_raw.color
            __v_raw.color = value
            _tRS(__v_raw, "color", oldValue, value)
        }
    override var icon: String?
        get() {
            return _tRG(__v_raw, "icon", __v_raw.icon, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("icon")) {
                return
            }
            val oldValue = __v_raw.icon
            __v_raw.icon = value
            _tRS(__v_raw, "icon", oldValue, value)
        }
    override var iconSize: Any?
        get() {
            return _tRG(__v_raw, "iconSize", __v_raw.iconSize, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("iconSize")) {
                return
            }
            val oldValue = __v_raw.iconSize
            __v_raw.iconSize = value
            _tRS(__v_raw, "iconSize", oldValue, value)
        }
    override var iconFontFamily: String?
        get() {
            return _tRG(__v_raw, "iconFontFamily", __v_raw.iconFontFamily, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("iconFontFamily")) {
                return
            }
            val oldValue = __v_raw.iconFontFamily
            __v_raw.iconFontFamily = value
            _tRS(__v_raw, "iconFontFamily", oldValue, value)
        }
    override var disabled: Boolean?
        get() {
            return _tRG(__v_raw, "disabled", __v_raw.disabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("disabled")) {
                return
            }
            val oldValue = __v_raw.disabled
            __v_raw.disabled = value
            _tRS(__v_raw, "disabled", oldValue, value)
        }
}
open class ActionSheetProps (
    open var actions: UTSArray<ActionSheetAction>? = null,
    open var title: String? = null,
    open var showCancel: Boolean? = null,
    open var cancelText: String? = null,
    open var duration: Number? = null,
    open var zIndex: Number? = null,
    open var opacity: Boolean? = null,
    open var overlay: Boolean? = null,
    open var overlayBgColor: String? = null,
    open var closeOnClickAction: Boolean? = null,
    open var closeOnClickOverlay: Boolean? = null,
    open var radius: Any? = null,
    open var safeAreaInsetBottom: Boolean? = null,
    open var useDialogPage: Boolean? = null,
    open var customStyle: UTSJSONObject? = null,
    open var select: ((action: ActionSheetAction, index: Number) -> Unit)? = null,
    open var cancel: (() -> Unit)? = null,
    open var clickOverlay: (() -> Unit)? = null,
    open var open: (() -> Unit)? = null,
    open var close: (() -> Unit)? = null,
    open var opened: (() -> Unit)? = null,
    open var closed: (() -> Unit)? = null,
    open var ready: ((pageIns: UniPage) -> Unit)? = null,
    open var fail: ((errMsg: String) -> Unit)? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ActionSheetProps", "uni_modules/rice-ui/components/rice-action-sheet/type.uts", 11, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return ActionSheetPropsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class ActionSheetPropsReactiveObject : ActionSheetProps, IUTSReactive<ActionSheetProps> {
    override var __v_raw: ActionSheetProps
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: ActionSheetProps, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(actions = __v_raw.actions, title = __v_raw.title, showCancel = __v_raw.showCancel, cancelText = __v_raw.cancelText, duration = __v_raw.duration, zIndex = __v_raw.zIndex, opacity = __v_raw.opacity, overlay = __v_raw.overlay, overlayBgColor = __v_raw.overlayBgColor, closeOnClickAction = __v_raw.closeOnClickAction, closeOnClickOverlay = __v_raw.closeOnClickOverlay, radius = __v_raw.radius, safeAreaInsetBottom = __v_raw.safeAreaInsetBottom, useDialogPage = __v_raw.useDialogPage, customStyle = __v_raw.customStyle, select = __v_raw.select, cancel = __v_raw.cancel, clickOverlay = __v_raw.clickOverlay, open = __v_raw.open, close = __v_raw.close, opened = __v_raw.opened, closed = __v_raw.closed, ready = __v_raw.ready, fail = __v_raw.fail) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): ActionSheetPropsReactiveObject {
        return ActionSheetPropsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var actions: UTSArray<ActionSheetAction>?
        get() {
            return _tRG(__v_raw, "actions", __v_raw.actions, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("actions")) {
                return
            }
            val oldValue = __v_raw.actions
            __v_raw.actions = value
            _tRS(__v_raw, "actions", oldValue, value)
        }
    override var title: String?
        get() {
            return _tRG(__v_raw, "title", __v_raw.title, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("title")) {
                return
            }
            val oldValue = __v_raw.title
            __v_raw.title = value
            _tRS(__v_raw, "title", oldValue, value)
        }
    override var showCancel: Boolean?
        get() {
            return _tRG(__v_raw, "showCancel", __v_raw.showCancel, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showCancel")) {
                return
            }
            val oldValue = __v_raw.showCancel
            __v_raw.showCancel = value
            _tRS(__v_raw, "showCancel", oldValue, value)
        }
    override var cancelText: String?
        get() {
            return _tRG(__v_raw, "cancelText", __v_raw.cancelText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cancelText")) {
                return
            }
            val oldValue = __v_raw.cancelText
            __v_raw.cancelText = value
            _tRS(__v_raw, "cancelText", oldValue, value)
        }
    override var duration: Number?
        get() {
            return _tRG(__v_raw, "duration", __v_raw.duration, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("duration")) {
                return
            }
            val oldValue = __v_raw.duration
            __v_raw.duration = value
            _tRS(__v_raw, "duration", oldValue, value)
        }
    override var zIndex: Number?
        get() {
            return _tRG(__v_raw, "zIndex", __v_raw.zIndex, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("zIndex")) {
                return
            }
            val oldValue = __v_raw.zIndex
            __v_raw.zIndex = value
            _tRS(__v_raw, "zIndex", oldValue, value)
        }
    override var opacity: Boolean?
        get() {
            return _tRG(__v_raw, "opacity", __v_raw.opacity, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("opacity")) {
                return
            }
            val oldValue = __v_raw.opacity
            __v_raw.opacity = value
            _tRS(__v_raw, "opacity", oldValue, value)
        }
    override var overlay: Boolean?
        get() {
            return _tRG(__v_raw, "overlay", __v_raw.overlay, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("overlay")) {
                return
            }
            val oldValue = __v_raw.overlay
            __v_raw.overlay = value
            _tRS(__v_raw, "overlay", oldValue, value)
        }
    override var overlayBgColor: String?
        get() {
            return _tRG(__v_raw, "overlayBgColor", __v_raw.overlayBgColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("overlayBgColor")) {
                return
            }
            val oldValue = __v_raw.overlayBgColor
            __v_raw.overlayBgColor = value
            _tRS(__v_raw, "overlayBgColor", oldValue, value)
        }
    override var closeOnClickAction: Boolean?
        get() {
            return _tRG(__v_raw, "closeOnClickAction", __v_raw.closeOnClickAction, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("closeOnClickAction")) {
                return
            }
            val oldValue = __v_raw.closeOnClickAction
            __v_raw.closeOnClickAction = value
            _tRS(__v_raw, "closeOnClickAction", oldValue, value)
        }
    override var closeOnClickOverlay: Boolean?
        get() {
            return _tRG(__v_raw, "closeOnClickOverlay", __v_raw.closeOnClickOverlay, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("closeOnClickOverlay")) {
                return
            }
            val oldValue = __v_raw.closeOnClickOverlay
            __v_raw.closeOnClickOverlay = value
            _tRS(__v_raw, "closeOnClickOverlay", oldValue, value)
        }
    override var radius: Any?
        get() {
            return _tRG(__v_raw, "radius", __v_raw.radius, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("radius")) {
                return
            }
            val oldValue = __v_raw.radius
            __v_raw.radius = value
            _tRS(__v_raw, "radius", oldValue, value)
        }
    override var safeAreaInsetBottom: Boolean?
        get() {
            return _tRG(__v_raw, "safeAreaInsetBottom", __v_raw.safeAreaInsetBottom, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("safeAreaInsetBottom")) {
                return
            }
            val oldValue = __v_raw.safeAreaInsetBottom
            __v_raw.safeAreaInsetBottom = value
            _tRS(__v_raw, "safeAreaInsetBottom", oldValue, value)
        }
    override var useDialogPage: Boolean?
        get() {
            return _tRG(__v_raw, "useDialogPage", __v_raw.useDialogPage, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("useDialogPage")) {
                return
            }
            val oldValue = __v_raw.useDialogPage
            __v_raw.useDialogPage = value
            _tRS(__v_raw, "useDialogPage", oldValue, value)
        }
    override var customStyle: UTSJSONObject?
        get() {
            return _tRG(__v_raw, "customStyle", __v_raw.customStyle, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("customStyle")) {
                return
            }
            val oldValue = __v_raw.customStyle
            __v_raw.customStyle = value
            _tRS(__v_raw, "customStyle", oldValue, value)
        }
}
open class ActionSheetBusEvent (
    @JsonNotNull
    open var type: String,
    open var action: ActionSheetAction? = null,
    open var index: Number? = null,
    open var errMsg: String? = null,
    open var pageIns: UniPage? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ActionSheetBusEvent", "uni_modules/rice-ui/components/rice-action-sheet/api.uts", 3, 13)
    }
}
val url = "uni_modules/rice-ui/pages/action-sheet/action-sheet"
val showActionSheet = fun(options: ActionSheetProps){
    val uid = getUID()
    val baseEventName = "rice_action_sheet_" + uid
    val readyEventName = baseEventName + "_ready"
    val optionsEventName = baseEventName + "_options"
    val busEventName = baseEventName + "_bus"
    uni__on(readyEventName, fun(){
        uni__emit(optionsEventName, options)
    }
    )
    uni__on(busEventName, fun(event: ActionSheetBusEvent){
        val type = event.type
        if (type == "select") {
            options.select?.invoke(event.action!!, event.index as Number)
        } else if (type == "cancel") {
            options.cancel?.invoke()
        } else if (type == "open") {
            options.open?.invoke()
        } else if (type == "close") {
            options.close?.invoke()
        } else if (type == "opened") {
            options.opened?.invoke()
        } else if (type == "closed") {
            options.closed?.invoke()
        } else if (type == "ready") {
            options.ready?.invoke(event.pageIns!!)
        } else if (type == "clickOverlay") {
            options.clickOverlay?.invoke()
        } else if (type == "fail") {
            options.fail?.invoke(event.errMsg ?: "")
        }
    }
    )
    uni_openDialogPage(OpenDialogPageOptions(url = "/" + url + "?readyEventName=" + readyEventName + "&optionsEventName=" + optionsEventName + "&busEventName=" + busEventName, fail = fun(err){
        options.fail?.invoke(err.errMsg)
        uni__off(readyEventName, null)
        uni__off(busEventName, null)
        debugWarn("action-sheet", "请在pages.json 中注册" + url + "页面！errMsg:" + err.errMsg)
    }
    ))
}
val GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheetClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.inject, props = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.emits, components = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.components, styles = GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet.setup(props as GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet {
    return GenUniModulesRiceUiComponentsRiceActionSheetRiceActionSheet(instance)
}
)
val GenUniModulesRiceUiPagesActionSheetActionSheetClass = CreateVueComponent(GenUniModulesRiceUiPagesActionSheetActionSheet::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = GenUniModulesRiceUiPagesActionSheetActionSheet.name, inheritAttrs = GenUniModulesRiceUiPagesActionSheetActionSheet.inheritAttrs, inject = GenUniModulesRiceUiPagesActionSheetActionSheet.inject, props = GenUniModulesRiceUiPagesActionSheetActionSheet.props, propsNeedCastKeys = GenUniModulesRiceUiPagesActionSheetActionSheet.propsNeedCastKeys, emits = GenUniModulesRiceUiPagesActionSheetActionSheet.emits, components = GenUniModulesRiceUiPagesActionSheetActionSheet.components, styles = GenUniModulesRiceUiPagesActionSheetActionSheet.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesRiceUiPagesActionSheetActionSheet.setup(props as GenUniModulesRiceUiPagesActionSheetActionSheet, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiPagesActionSheetActionSheet {
    return GenUniModulesRiceUiPagesActionSheetActionSheet(instance, renderer)
}
)
open class DialogProps (
    open var title: String? = null,
    open var width: Any? = null,
    open var message: String? = null,
    open var messageAlign: String? = null,
    open var buttonTheme: String? = null,
    open var buttonLayout: String? = null,
    open var showConfirmButton: Boolean? = null,
    open var confirmButtonText: String? = null,
    open var confirmButtonColor: String? = null,
    open var confirmButtonDisabled: Boolean? = null,
    open var showCancelButton: Boolean? = null,
    open var cancelButtonText: String? = null,
    open var cancelButtonColor: String? = null,
    open var cancelButtonDisabled: Boolean? = null,
    open var duration: Number? = null,
    open var overlay: Boolean? = null,
    open var overlayBgColor: String? = null,
    open var closeOnClickOverlay: Boolean? = null,
    open var beforeClose: BeforeChangeInterceptor? = null,
    open var zIndex: Number? = null,
    open var bgColor: String? = null,
    open var marginTop: Any? = null,
    open var useDialogPage: Boolean? = null,
    open var customStyle: UTSJSONObject? = null,
    open var confirm: (() -> Unit)? = null,
    open var cancel: (() -> Unit)? = null,
    open var clickOverlay: (() -> Unit)? = null,
    open var open: (() -> Unit)? = null,
    open var close: (() -> Unit)? = null,
    open var opened: (() -> Unit)? = null,
    open var closed: (() -> Unit)? = null,
    open var ready: ((pageIns: UniPage) -> Unit)? = null,
    open var fail: ((errMsg: String) -> Unit)? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DialogProps", "uni_modules/rice-ui/components/rice-dialog/type.uts", 2, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return DialogPropsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
class DialogPropsReactiveObject : DialogProps, IUTSReactive<DialogProps> {
    override var __v_raw: DialogProps
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: DialogProps, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(title = __v_raw.title, width = __v_raw.width, message = __v_raw.message, messageAlign = __v_raw.messageAlign, buttonTheme = __v_raw.buttonTheme, buttonLayout = __v_raw.buttonLayout, showConfirmButton = __v_raw.showConfirmButton, confirmButtonText = __v_raw.confirmButtonText, confirmButtonColor = __v_raw.confirmButtonColor, confirmButtonDisabled = __v_raw.confirmButtonDisabled, showCancelButton = __v_raw.showCancelButton, cancelButtonText = __v_raw.cancelButtonText, cancelButtonColor = __v_raw.cancelButtonColor, cancelButtonDisabled = __v_raw.cancelButtonDisabled, duration = __v_raw.duration, overlay = __v_raw.overlay, overlayBgColor = __v_raw.overlayBgColor, closeOnClickOverlay = __v_raw.closeOnClickOverlay, beforeClose = __v_raw.beforeClose, zIndex = __v_raw.zIndex, bgColor = __v_raw.bgColor, marginTop = __v_raw.marginTop, useDialogPage = __v_raw.useDialogPage, customStyle = __v_raw.customStyle, confirm = __v_raw.confirm, cancel = __v_raw.cancel, clickOverlay = __v_raw.clickOverlay, open = __v_raw.open, close = __v_raw.close, opened = __v_raw.opened, closed = __v_raw.closed, ready = __v_raw.ready, fail = __v_raw.fail) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): DialogPropsReactiveObject {
        return DialogPropsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var title: String?
        get() {
            return _tRG(__v_raw, "title", __v_raw.title, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("title")) {
                return
            }
            val oldValue = __v_raw.title
            __v_raw.title = value
            _tRS(__v_raw, "title", oldValue, value)
        }
    override var width: Any?
        get() {
            return _tRG(__v_raw, "width", __v_raw.width, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("width")) {
                return
            }
            val oldValue = __v_raw.width
            __v_raw.width = value
            _tRS(__v_raw, "width", oldValue, value)
        }
    override var message: String?
        get() {
            return _tRG(__v_raw, "message", __v_raw.message, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("message")) {
                return
            }
            val oldValue = __v_raw.message
            __v_raw.message = value
            _tRS(__v_raw, "message", oldValue, value)
        }
    override var messageAlign: String?
        get() {
            return _tRG(__v_raw, "messageAlign", __v_raw.messageAlign, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("messageAlign")) {
                return
            }
            val oldValue = __v_raw.messageAlign
            __v_raw.messageAlign = value
            _tRS(__v_raw, "messageAlign", oldValue, value)
        }
    override var buttonTheme: String?
        get() {
            return _tRG(__v_raw, "buttonTheme", __v_raw.buttonTheme, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("buttonTheme")) {
                return
            }
            val oldValue = __v_raw.buttonTheme
            __v_raw.buttonTheme = value
            _tRS(__v_raw, "buttonTheme", oldValue, value)
        }
    override var buttonLayout: String?
        get() {
            return _tRG(__v_raw, "buttonLayout", __v_raw.buttonLayout, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("buttonLayout")) {
                return
            }
            val oldValue = __v_raw.buttonLayout
            __v_raw.buttonLayout = value
            _tRS(__v_raw, "buttonLayout", oldValue, value)
        }
    override var showConfirmButton: Boolean?
        get() {
            return _tRG(__v_raw, "showConfirmButton", __v_raw.showConfirmButton, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showConfirmButton")) {
                return
            }
            val oldValue = __v_raw.showConfirmButton
            __v_raw.showConfirmButton = value
            _tRS(__v_raw, "showConfirmButton", oldValue, value)
        }
    override var confirmButtonText: String?
        get() {
            return _tRG(__v_raw, "confirmButtonText", __v_raw.confirmButtonText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("confirmButtonText")) {
                return
            }
            val oldValue = __v_raw.confirmButtonText
            __v_raw.confirmButtonText = value
            _tRS(__v_raw, "confirmButtonText", oldValue, value)
        }
    override var confirmButtonColor: String?
        get() {
            return _tRG(__v_raw, "confirmButtonColor", __v_raw.confirmButtonColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("confirmButtonColor")) {
                return
            }
            val oldValue = __v_raw.confirmButtonColor
            __v_raw.confirmButtonColor = value
            _tRS(__v_raw, "confirmButtonColor", oldValue, value)
        }
    override var confirmButtonDisabled: Boolean?
        get() {
            return _tRG(__v_raw, "confirmButtonDisabled", __v_raw.confirmButtonDisabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("confirmButtonDisabled")) {
                return
            }
            val oldValue = __v_raw.confirmButtonDisabled
            __v_raw.confirmButtonDisabled = value
            _tRS(__v_raw, "confirmButtonDisabled", oldValue, value)
        }
    override var showCancelButton: Boolean?
        get() {
            return _tRG(__v_raw, "showCancelButton", __v_raw.showCancelButton, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("showCancelButton")) {
                return
            }
            val oldValue = __v_raw.showCancelButton
            __v_raw.showCancelButton = value
            _tRS(__v_raw, "showCancelButton", oldValue, value)
        }
    override var cancelButtonText: String?
        get() {
            return _tRG(__v_raw, "cancelButtonText", __v_raw.cancelButtonText, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cancelButtonText")) {
                return
            }
            val oldValue = __v_raw.cancelButtonText
            __v_raw.cancelButtonText = value
            _tRS(__v_raw, "cancelButtonText", oldValue, value)
        }
    override var cancelButtonColor: String?
        get() {
            return _tRG(__v_raw, "cancelButtonColor", __v_raw.cancelButtonColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cancelButtonColor")) {
                return
            }
            val oldValue = __v_raw.cancelButtonColor
            __v_raw.cancelButtonColor = value
            _tRS(__v_raw, "cancelButtonColor", oldValue, value)
        }
    override var cancelButtonDisabled: Boolean?
        get() {
            return _tRG(__v_raw, "cancelButtonDisabled", __v_raw.cancelButtonDisabled, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("cancelButtonDisabled")) {
                return
            }
            val oldValue = __v_raw.cancelButtonDisabled
            __v_raw.cancelButtonDisabled = value
            _tRS(__v_raw, "cancelButtonDisabled", oldValue, value)
        }
    override var duration: Number?
        get() {
            return _tRG(__v_raw, "duration", __v_raw.duration, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("duration")) {
                return
            }
            val oldValue = __v_raw.duration
            __v_raw.duration = value
            _tRS(__v_raw, "duration", oldValue, value)
        }
    override var overlay: Boolean?
        get() {
            return _tRG(__v_raw, "overlay", __v_raw.overlay, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("overlay")) {
                return
            }
            val oldValue = __v_raw.overlay
            __v_raw.overlay = value
            _tRS(__v_raw, "overlay", oldValue, value)
        }
    override var overlayBgColor: String?
        get() {
            return _tRG(__v_raw, "overlayBgColor", __v_raw.overlayBgColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("overlayBgColor")) {
                return
            }
            val oldValue = __v_raw.overlayBgColor
            __v_raw.overlayBgColor = value
            _tRS(__v_raw, "overlayBgColor", oldValue, value)
        }
    override var closeOnClickOverlay: Boolean?
        get() {
            return _tRG(__v_raw, "closeOnClickOverlay", __v_raw.closeOnClickOverlay, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("closeOnClickOverlay")) {
                return
            }
            val oldValue = __v_raw.closeOnClickOverlay
            __v_raw.closeOnClickOverlay = value
            _tRS(__v_raw, "closeOnClickOverlay", oldValue, value)
        }
    override var zIndex: Number?
        get() {
            return _tRG(__v_raw, "zIndex", __v_raw.zIndex, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("zIndex")) {
                return
            }
            val oldValue = __v_raw.zIndex
            __v_raw.zIndex = value
            _tRS(__v_raw, "zIndex", oldValue, value)
        }
    override var bgColor: String?
        get() {
            return _tRG(__v_raw, "bgColor", __v_raw.bgColor, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("bgColor")) {
                return
            }
            val oldValue = __v_raw.bgColor
            __v_raw.bgColor = value
            _tRS(__v_raw, "bgColor", oldValue, value)
        }
    override var marginTop: Any?
        get() {
            return _tRG(__v_raw, "marginTop", __v_raw.marginTop, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("marginTop")) {
                return
            }
            val oldValue = __v_raw.marginTop
            __v_raw.marginTop = value
            _tRS(__v_raw, "marginTop", oldValue, value)
        }
    override var useDialogPage: Boolean?
        get() {
            return _tRG(__v_raw, "useDialogPage", __v_raw.useDialogPage, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("useDialogPage")) {
                return
            }
            val oldValue = __v_raw.useDialogPage
            __v_raw.useDialogPage = value
            _tRS(__v_raw, "useDialogPage", oldValue, value)
        }
    override var customStyle: UTSJSONObject?
        get() {
            return _tRG(__v_raw, "customStyle", __v_raw.customStyle, __v_isReadonly, __v_isShallow)
        }
        set(value) {
            if (!__v_canSet("customStyle")) {
                return
            }
            val oldValue = __v_raw.customStyle
            __v_raw.customStyle = value
            _tRS(__v_raw, "customStyle", oldValue, value)
        }
}
open class DialogBusEvent (
    @JsonNotNull
    open var type: String,
    open var errMsg: String? = null,
    open var pageIns: UniPage? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DialogBusEvent", "uni_modules/rice-ui/components/rice-dialog/api.uts", 3, 13)
    }
}
val url__1 = "uni_modules/rice-ui/pages/dialog/dialog"
val showDialog = fun(options: DialogProps){
    val uid = getUID()
    val baseEventName = "rice_dialog_" + uid
    val readyEventName = baseEventName + "_ready"
    val optionsEventName = baseEventName + "_options"
    val busEventName = baseEventName + "_bus"
    uni__on(readyEventName, fun(){
        uni__emit(optionsEventName, options)
    }
    )
    uni__on(busEventName, fun(event: DialogBusEvent){
        val type = event.type
        if (type == "confirm") {
            options.confirm?.invoke()
        } else if (type == "cancel") {
            options.cancel?.invoke()
        } else if (type == "open") {
            options.open?.invoke()
        } else if (type == "close") {
            options.close?.invoke()
        } else if (type == "opened") {
            options.opened?.invoke()
        } else if (type == "closed") {
            options.closed?.invoke()
        } else if (type == "ready") {
            options.ready?.invoke(event.pageIns!!)
        } else if (type == "clickOverlay") {
            options.clickOverlay?.invoke()
        } else if (type == "fail") {
            options.fail?.invoke(event.errMsg ?: "")
        }
    }
    )
    uni_openDialogPage(OpenDialogPageOptions(url = "/" + url__1 + "?readyEventName=" + readyEventName + "&optionsEventName=" + optionsEventName + "&busEventName=" + busEventName, fail = fun(err){
        options.fail?.invoke(err.errMsg)
        uni__off(readyEventName, null)
        uni__off(busEventName, null)
        debugWarn("action-sheet", "请在pages.json 中注册" + url__1 + "页面！errMsg:" + err.errMsg)
    }
    ))
}
val GenUniModulesRiceUiComponentsRiceDialogRiceDialogClass = CreateVueComponent(GenUniModulesRiceUiComponentsRiceDialogRiceDialog::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.name, inheritAttrs = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.inheritAttrs, inject = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.inject, props = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.props, propsNeedCastKeys = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.propsNeedCastKeys, emits = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.emits, components = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.components, styles = GenUniModulesRiceUiComponentsRiceDialogRiceDialog.styles, styleIsolation = UniSharedDataComponentStyleIsolation.AppAndPage, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesRiceUiComponentsRiceDialogRiceDialog.setup(props as GenUniModulesRiceUiComponentsRiceDialogRiceDialog)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiComponentsRiceDialogRiceDialog {
    return GenUniModulesRiceUiComponentsRiceDialogRiceDialog(instance)
}
)
val GenUniModulesRiceUiPagesDialogDialogClass = CreateVueComponent(GenUniModulesRiceUiPagesDialogDialog::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = GenUniModulesRiceUiPagesDialogDialog.name, inheritAttrs = GenUniModulesRiceUiPagesDialogDialog.inheritAttrs, inject = GenUniModulesRiceUiPagesDialogDialog.inject, props = GenUniModulesRiceUiPagesDialogDialog.props, propsNeedCastKeys = GenUniModulesRiceUiPagesDialogDialog.propsNeedCastKeys, emits = GenUniModulesRiceUiPagesDialogDialog.emits, components = GenUniModulesRiceUiPagesDialogDialog.components, styles = GenUniModulesRiceUiPagesDialogDialog.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesRiceUiPagesDialogDialog.setup(props as GenUniModulesRiceUiPagesDialogDialog, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesRiceUiPagesDialogDialog {
    return GenUniModulesRiceUiPagesDialogDialog(instance, renderer)
}
)
val GenPagesPkgDetailPkgDetailClass = CreateVueComponent(GenPagesPkgDetailPkgDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesPkgDetailPkgDetail.inheritAttrs, inject = GenPagesPkgDetailPkgDetail.inject, props = GenPagesPkgDetailPkgDetail.props, propsNeedCastKeys = GenPagesPkgDetailPkgDetail.propsNeedCastKeys, emits = GenPagesPkgDetailPkgDetail.emits, components = GenPagesPkgDetailPkgDetail.components, styles = GenPagesPkgDetailPkgDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesPkgDetailPkgDetail.setup(props as GenPagesPkgDetailPkgDetail)
    }
    )
}
, fun(instance, renderer): GenPagesPkgDetailPkgDetail {
    return GenPagesPkgDetailPkgDetail(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    app.use(i18n)
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
    override var uniCompilerVersion: String = "5.14"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/card/card", component = GenPagesCardCardClass, meta = UniPageMeta(isQuit = true), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/recharge/recharge", component = GenPagesRechargeRechargeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/mine", component = GenPagesMineMineClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/cardDetail/cardDetail", component = GenPagesCardDetailCardDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/paySuccess/paySuccess", component = GenPagesPaySuccessPaySuccessClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/payFailed/payFailed", component = GenPagesPayFailedPayFailedClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/myOrder/myOrder", component = GenPagesMyOrderMyOrderClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/orderDetail/orderDetail", component = GenPagesOrderDetailOrderDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/scanCode/scanCode", component = GenPagesScanCodeScanCodeClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/h5Search/h5Search", component = GenPagesH5SearchH5SearchClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/orderRecord/orderRecord", component = GenPagesOrderRecordOrderRecordClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/myPkg/myPkg", component = GenPagesMyPkgMyPkgClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "pages/login/login", component = GenPagesLoginLoginClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
    __uniRoutes.push(UniPageRoute(path = "uni_modules/rice-ui/pages/action-sheet/action-sheet", component = GenUniModulesRiceUiPagesActionSheetActionSheetClass, meta = UniPageMeta(isQuit = false), style = _uM()))
    __uniRoutes.push(UniPageRoute(path = "uni_modules/rice-ui/pages/dialog/dialog", component = GenUniModulesRiceUiPagesDialogDialogClass, meta = UniPageMeta(isQuit = false), style = _uM()))
    __uniRoutes.push(UniPageRoute(path = "pages/pkgDetail/pkgDetail", component = GenPagesPkgDetailPkgDetailClass, meta = UniPageMeta(isQuit = false), style = _uM("navigationBarTitleText" to "")))
}
val __uniTabBar: Map<String, Any?>? = _uM("color" to "#64748b", "selectedColor" to "#2563eb", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
    _uM("pagePath" to "pages/card/card", "iconPath" to "/static/tabBar/home.png", "selectedIconPath" to "/static/tabBar/home1.png", "text" to "首页"),
    _uM("pagePath" to "pages/mine/mine", "iconPath" to "/static/tabBar/mine.png", "selectedIconPath" to "/static/tabBar/mine1.png", "text" to "我的")
))
val __uniLaunchPage: Map<String, Any?> = _uM("url" to "pages/card/card", "style" to _uM("navigationBarTitleText" to ""))
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/card/card"
    __uniConfig.globalStyle = _uM("navigationStyle" to "custom", "navigationBarTextStyle" to "black", "navigationBarTitleText" to "云卡在线", "navigationBarBackgroundColor" to "#F8F8F8", "backgroundColor" to "#F8F8F8")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return _uM("color" to "#64748b", "selectedColor" to "#2563eb", "borderStyle" to "black", "backgroundColor" to "#ffffff", "list" to _uA(
            _uM("pagePath" to "pages/card/card", "iconPath" to "/static/tabBar/home.png", "selectedIconPath" to "/static/tabBar/home1.png", "text" to "首页"),
            _uM("pagePath" to "pages/mine/mine", "iconPath" to "/static/tabBar/mine.png", "selectedIconPath" to "/static/tabBar/mine1.png", "text" to "我的")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = _uM()
    __uniConfig.ready = true
}
var `___$i18n` = lime_i18n!!
var `___$locale` = lime_i18n!!.global.locale
var VueComponent.`$i18n`
    get() = `___$i18n`
    set(value) {
        `___$i18n` = value
    }
fun VueComponent.`$t`(key: String, values: Any? = null, locale: String? = null): String {
    val isLocale = UTSAndroid.`typeof`(values) == "string"
    val _values = if (isLocale) {
        null
    } else {
        values
    }
    val _locale = if (isLocale) {
        values as String
    } else {
        locale
    }
    return lime_i18n!!.global.t(key, _values, _locale)
}
fun VueComponent.`$tc`(key: String, choice: Number? = null, values: Any? = null, locale: String? = null): String {
    val isLocale = UTSAndroid.`typeof`(values) == "string"
    val _values = if (isLocale) {
        null
    } else {
        values
    }
    val _locale = if (isLocale) {
        values as String
    } else {
        locale
    }
    return lime_i18n!!.global.tc(key, choice, _values, _locale)
}
fun VueComponent.`$d`(date: Any, key: String? = null, locale: String? = null, options: UTSJSONObject? = null): String {
    return lime_i18n!!.global.d(date, key, locale, options)
}
fun VueComponent.`$n`(number: Number, key: String? = null, locale: Any? = null, options: UTSJSONObject? = null): String {
    val _locale = if (UTSAndroid.`typeof`(locale) == "string") {
        locale as String
    } else {
        null
    }
    val _options = if (UTSAndroid.`typeof`(locale) == "object" && locale != null) {
        locale as UTSJSONObject
    } else {
        options
    }
    return lime_i18n!!.global.n(number, key, _locale, _options)
}
var VueComponent.`$locale`
    get() = `___$locale`
    set(value) {
        `___$locale` = value
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
