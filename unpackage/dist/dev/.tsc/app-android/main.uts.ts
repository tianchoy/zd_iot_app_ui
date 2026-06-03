import '/Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-console/src/runtime/app/index.ts';import './utils/inject-m-unix'
import App from './App.uvue'
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
export function main(app: IApp) {
    enableStyleIsolation();
    definePageRoutes();
    defineAppConfig();
    (createApp()['app'] as VueApp).mount(app, GenUniApp());
}

export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "zd_iot_app"
    override appid: string = "__UNI__1E9055A"
    override versionName: string = "1.0.0"
    override versionCode: string = "100"
    override uniCompilerVersion: string = "5.11"
    
    constructor() { super() }
}

import GenPagesIndexIndexClass from './pages/index/index.uvue'
import GenPagesCardCardClass from './pages/card/card.uvue'
import GenPagesMineMineClass from './pages/mine/mine.uvue'
import GenPagesCardDetailCardDetailClass from './pages/cardDetail/cardDetail.uvue'
import GenPagesRechargeRechargeClass from './pages/recharge/recharge.uvue'
import GenPagesPaySuccessPaySuccessClass from './pages/paySuccess/paySuccess.uvue'
import GenPagesPayFailedPayFailedClass from './pages/payFailed/payFailed.uvue'
import GenPagesMyOrderMyOrderClass from './pages/myOrder/myOrder.uvue'
import GenPagesOrderDetailOrderDetailClass from './pages/orderDetail/orderDetail.uvue'
import GenPagesScanCodeScanCodeClass from './pages/scanCode/scanCode.uvue'
import GenPagesH5SearchH5SearchClass from './pages/h5Search/h5Search.uvue'
import GenPagesOrderRecordOrderRecordClass from './pages/orderRecord/orderRecord.uvue'
import GenPagesMyPkgMyPkgClass from './pages/myPkg/myPkg.uvue'
import GenPagesLoginLoginClass from './pages/login/login.uvue'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: _uM() } as UniPageRoute)
__uniRoutes.push({ path: "pages/card/card", component: GenPagesCardCardClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/mine", component: GenPagesMineMineClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/cardDetail/cardDetail", component: GenPagesCardDetailCardDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/recharge/recharge", component: GenPagesRechargeRechargeClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/paySuccess/paySuccess", component: GenPagesPaySuccessPaySuccessClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/payFailed/payFailed", component: GenPagesPayFailedPayFailedClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/myOrder/myOrder", component: GenPagesMyOrderMyOrderClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/orderDetail/orderDetail", component: GenPagesOrderDetailOrderDetailClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/scanCode/scanCode", component: GenPagesScanCodeScanCodeClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/h5Search/h5Search", component: GenPagesH5SearchH5SearchClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/orderRecord/orderRecord", component: GenPagesOrderRecordOrderRecordClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/myPkg/myPkg", component: GenPagesMyPkgMyPkgClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/login/login", component: GenPagesLoginLoginClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
}
const __uniTabBar: Map<string, any | null> | null = _uM([["color","#64748b"],["selectedColor","#2563eb"],["borderStyle","black"],["backgroundColor","#ffffff"],["list",[_uM([["pagePath","pages/index/index"],["iconPath","/static/tabBar/home.png"],["selectedIconPath","/static/tabBar/home1.png"],["text","首页"]]),_uM([["pagePath","pages/card/card"],["iconPath","/static/tabBar/card.png"],["selectedIconPath","/static/tabBar/card1.png"],["text","卡片"]]),_uM([["pagePath","pages/mine/mine"],["iconPath","/static/tabBar/mine.png"],["selectedIconPath","/static/tabBar/mine1.png"],["text","我的"]])]]])
const __uniLaunchPage: Map<string, any | null> = _uM([["url","pages/index/index"],["style",_uM<string, any | null>()]])
function defineAppConfig(){
  __uniConfig.entryPagePath = '/pages/index/index'
  __uniConfig.globalStyle = _uM([["navigationStyle","custom"],["navigationBarTextStyle","black"],["navigationBarTitleText","云卡在线"],["navigationBarBackgroundColor","#F8F8F8"],["backgroundColor","#F8F8F8"]])
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  _uM([["color","#64748b"],["selectedColor","#2563eb"],["borderStyle","black"],["backgroundColor","#ffffff"],["list",[_uM([["pagePath","pages/index/index"],["iconPath","/static/tabBar/home.png"],["selectedIconPath","/static/tabBar/home1.png"],["text","首页"]]),_uM([["pagePath","pages/card/card"],["iconPath","/static/tabBar/card.png"],["selectedIconPath","/static/tabBar/card1.png"],["text","卡片"]]),_uM([["pagePath","pages/mine/mine"],["iconPath","/static/tabBar/mine.png"],["selectedIconPath","/static/tabBar/mine1.png"],["text","我的"]])]]])
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = ''
  __uniConfig.uniIdRouter = _uM()
  
  __uniConfig.ready = true
}
