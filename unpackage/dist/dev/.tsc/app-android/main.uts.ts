import '/Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-console/src/runtime/app/index.ts';import App from './App.uvue'

import { createSSRApp } from 'vue'

import mUnix from '@/uni_modules/m-unix'

export function createApp() {
	const app = createSSRApp(App)
	app.use(mUnix)
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
    override uniCompilerVersion: string = "5.08"
    
    constructor() { super() }
}

import GenPagesIndexIndexClass from './pages/index/index.uvue'
import GenPagesCardCardClass from './pages/card/card.uvue'
import GenPagesMineMineClass from './pages/mine/mine.uvue'
function definePageRoutes() {
__uniRoutes.push({ path: "pages/index/index", component: GenPagesIndexIndexClass, meta: { isQuit: true } as UniPageMeta, style: _uM() } as UniPageRoute)
__uniRoutes.push({ path: "pages/card/card", component: GenPagesCardCardClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
__uniRoutes.push({ path: "pages/mine/mine", component: GenPagesMineMineClass, meta: { isQuit: false } as UniPageMeta, style: _uM([["navigationBarTitleText",""]]) } as UniPageRoute)
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
