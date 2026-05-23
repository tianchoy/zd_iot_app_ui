/**
 * 登录拦截与认证逻辑
 */
import { storage } from './Storage.uts'
import { getHostProjectConfig } from './ProjectConfig.uts'

/** 是否已登录 */
export function isLoggedIn(): boolean {
	return storage.getToken() != ''
}

/** 检查并跳转登录 */
export function checkLogin(toPath?: string): boolean {
	if (isLoggedIn()) return true
	const lp = getHostProjectConfig().loginPagePath
	const loginPath = lp.length > 0 ? lp : '/pages_Me/login/login'
	const url = toPath != null && toPath != ''
		? loginPath + '?redirect=' + encodeURIComponent(toPath)
		: loginPath
	uni.navigateTo({ url })
	return false
}

/** 需要登录才能访问的页面 */
export function needLogin(path: string): boolean {
	const p = path.replace(/^\//, '').replace(/\.uvue$/, '')
	return getHostProjectConfig().loginRequiredPaths.some((r) => p.includes(r))
}
