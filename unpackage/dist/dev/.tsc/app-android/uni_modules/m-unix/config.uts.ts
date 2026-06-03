/**
 * m-unix UI 资源与主题配置（库内默认值 + 项目覆盖）
 * 路径：uni_modules/m-unix/config.uts（组件包根目录）
 *
 * 覆盖优先级（从高到低，同一字段取第一个非空）：
 * 1. setMUiConfig() 运行时写入
 * 2. getHostProjectConfig().mUi（宿主 inject 的配置）
 * 3. configInfo（appLogo 用 logo；appName 用 name）
 * 4. baseUrl（仅 apiDevelopmentBase 的兜底）
 * 5. api.qrCodeImageApiBase（仅 qrCodeImageApiBase，兼容旧配置）
 * 6. 库内 M_UI_DEFAULTS
 *
 * 使用方式：
 * - 在宿主 inject 的配置对象的 mUi 中填写需要覆盖的字段；
 * - 或在 App onLaunch 中调用 setMUiConfig({ appLogo: '...' })。
 *
 * 内置静态资源（`uni_modules/m-unix/static/`）随插件发布，不依赖业务项目 `/static`。
 * 配置无法检测「加载失败」；若远程图可能 404，请在 `<image @error>` 中改用
 * `M_UI_BUILTIN_PLACEHOLDER_AVATAR` / `M_UI_BUILTIN_PLACEHOLDER_ARTICLE` 等常量兜底。
 */
import { getHostProjectConfig } from './components/m-tools/ProjectConfig.uts'

/** 内置应用 Logo（随插件发布，合并链最后兜底） */
export const M_UI_BUILTIN_APP_LOGO = '/uni_modules/m-unix/static/m-app-logo.png'
/** 内置头像占位（中性灰块，非品牌图） */
export const M_UI_BUILTIN_PLACEHOLDER_AVATAR = '/uni_modules/m-unix/static/m-placeholder-avatar.png'
/** 内置文章/列表占位（中性灰、约 16:9） */
export const M_UI_BUILTIN_PLACEHOLDER_ARTICLE = '/uni_modules/m-unix/static/m-placeholder-article.png'

/** 可由业务覆盖的字段（均为可选） */
export type MUiPartial = {
	/** 应用展示名（登录页、关于等；与 getHostProjectConfig().configInfo.name 合并） */
	appName?: string
	/** 开发环境 API 根地址（与 Ut.uts getReqUrl / $m.configInfo 中 development 一致） */
	apiDevelopmentBase?: string
	/** 生产环境 API 根地址 */
	apiProductionBase?: string
	/** 用户协议页路由，如 pages/article/article?id=1 */
	agreementRoute?: string
	/** 隐私政策页路由 */
	privacyRoute?: string
	appLogo?: string
	/** m-empty 未传 icon 时的默认 m-icon name */
	emptyDefaultIcon?: string
	avatarDefault?: string
	articlePlaceholder?: string
	/** 演示页示例图（card 缩略图、cropper 示例源图） */
	demoImage?: string
	/** H5/App 二维码 PNG 接口根地址，query 需兼容 size、color、bgcolor、data */
	qrCodeImageApiBase?: string
}

/** 合并后的完整配置（只读语义，每次 getMUiConfig() 即时计算） */
export type MUiConfig = {
	appName: string
	apiDevelopmentBase: string
	apiProductionBase: string
	agreementRoute: string
	privacyRoute: string
	appLogo: string
	emptyDefaultIcon: string
	avatarDefault: string
	articlePlaceholder: string
	demoImage: string
	qrCodeImageApiBase: string
}

const M_UI_DEFAULTS: MUiConfig = {
	appName: 'mUnix',
	apiDevelopmentBase: 'https://demo.mmsadmin.cn/prod-api',
	apiProductionBase: 'https://demo.mmsadmin.cn/prod-api',
	agreementRoute: '',
	privacyRoute: '',
	// 应用 Logo（关于页、工具类；合并链见文件头；默认用库内资源）
	appLogo: M_UI_BUILTIN_APP_LOGO,
	// m-empty 未传 icon 时的默认 m-icon name
	emptyDefaultIcon: 'file-common-filling',
	// 默认头像占位（库内中性灰，勿用品牌 logo）
	avatarDefault: M_UI_BUILTIN_PLACEHOLDER_AVATAR,
	// 文章列表/详情占位（库内中性灰）
	articlePlaceholder: M_UI_BUILTIN_PLACEHOLDER_ARTICLE,
	// 演示页示例图（card 缩略图、cropper 源图）
	demoImage: 'https://picsum.photos/200',
	// 二维码 PNG 接口根（与 qrserver 查询参数兼容）；小程序/H5 无原生生成时常用
	qrCodeImageApiBase: 'https://api.qrserver.com/v1/create-qr-code/',
}

let mUiRuntime: MUiPartial | null = null

function trimStr(s: string | null | undefined): string {
	if (s == null) {
		return ''
	}
	return '' + s
}

/** 依次取第一个非空字符串，否则返回 defaultVal */
function pickChain(a: string, b: string, c: string, defaultVal: string): string {
	const x = trimStr(a)
	if (x.length > 0) {
		return x
	}
	const y = trimStr(b)
	if (y.length > 0) {
		return y
	}
	const z = trimStr(c)
	if (z.length > 0) {
		return z
	}
	return defaultVal
}

function pickChain2(a: string, b: string, defaultVal: string): string {
	return pickChain(a, b, '', defaultVal)
}

export function getMUiConfig(): MUiConfig {
	const cfg = getHostProjectConfig()
	const r = (mUiRuntime != null ? mUiRuntime : ({} as MUiPartial)) as MUiPartial
	const mu = cfg.mUi
	const f = (mu != null ? (mu as MUiPartial) : ({} as MUiPartial)) as MUiPartial
	const ci = cfg.configInfo
	const api = cfg.api
	return {
		appName: pickChain(trimStr(r.appName), trimStr(f.appName), trimStr(ci.name), M_UI_DEFAULTS.appName),
		apiDevelopmentBase: pickChain(
			trimStr(r.apiDevelopmentBase),
			trimStr(f.apiDevelopmentBase),
			trimStr(cfg.baseUrl),
			M_UI_DEFAULTS.apiDevelopmentBase
		),
		apiProductionBase: pickChain2(trimStr(r.apiProductionBase), trimStr(f.apiProductionBase), M_UI_DEFAULTS.apiProductionBase),
		agreementRoute: pickChain2(trimStr(r.agreementRoute), trimStr(f.agreementRoute), M_UI_DEFAULTS.agreementRoute),
		privacyRoute: pickChain2(trimStr(r.privacyRoute), trimStr(f.privacyRoute), M_UI_DEFAULTS.privacyRoute),
		appLogo: pickChain(trimStr(r.appLogo), trimStr(f.appLogo), trimStr(ci.logo), M_UI_DEFAULTS.appLogo),
		emptyDefaultIcon: pickChain2(trimStr(r.emptyDefaultIcon), trimStr(f.emptyDefaultIcon), M_UI_DEFAULTS.emptyDefaultIcon),
		avatarDefault: pickChain2(trimStr(r.avatarDefault), trimStr(f.avatarDefault), M_UI_DEFAULTS.avatarDefault),
		articlePlaceholder: pickChain2(trimStr(r.articlePlaceholder), trimStr(f.articlePlaceholder), M_UI_DEFAULTS.articlePlaceholder),
		demoImage: pickChain2(trimStr(r.demoImage), trimStr(f.demoImage), M_UI_DEFAULTS.demoImage),
		qrCodeImageApiBase: pickChain(
			trimStr(r.qrCodeImageApiBase),
			trimStr(f.qrCodeImageApiBase),
			trimStr(api.qrCodeImageApiBase),
			M_UI_DEFAULTS.qrCodeImageApiBase
		),
	}
}

/** 运行时覆盖（可多次调用，未传入的字段保留上次运行时值） */
export function setMUiConfig(p: MUiPartial): void {
	const cur = mUiRuntime != null ? mUiRuntime : ({} as MUiPartial)
	if (p.appName != null) {
		cur.appName = p.appName
	}
	if (p.apiDevelopmentBase != null) {
		cur.apiDevelopmentBase = p.apiDevelopmentBase
	}
	if (p.apiProductionBase != null) {
		cur.apiProductionBase = p.apiProductionBase
	}
	if (p.agreementRoute != null) {
		cur.agreementRoute = p.agreementRoute
	}
	if (p.privacyRoute != null) {
		cur.privacyRoute = p.privacyRoute
	}
	if (p.appLogo != null) {
		cur.appLogo = p.appLogo
	}
	if (p.emptyDefaultIcon != null) {
		cur.emptyDefaultIcon = p.emptyDefaultIcon
	}
	if (p.avatarDefault != null) {
		cur.avatarDefault = p.avatarDefault
	}
	if (p.articlePlaceholder != null) {
		cur.articlePlaceholder = p.articlePlaceholder
	}
	if (p.demoImage != null) {
		cur.demoImage = p.demoImage
	}
	if (p.qrCodeImageApiBase != null) {
		cur.qrCodeImageApiBase = p.qrCodeImageApiBase
	}
	mUiRuntime = cur
}

/** 清除运行时覆盖（恢复仅注入的宿主 mUi + 默认值） */
export function clearMUiRuntimeOverrides(): void {
	mUiRuntime = null
}
