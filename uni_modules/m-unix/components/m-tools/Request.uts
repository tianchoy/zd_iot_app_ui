/**
 * 统一请求工具
 * 支持灵活配置：响应码、错误提示、Token、登录跳转等
 */
import { getHostProjectConfig } from './ProjectConfig.uts'
import { storage } from './Storage.uts'
import { uploadFileRequest, type UploadApiResponse, type UploadFileOptions } from './Upload.uts'
import { config, getToken,setToken, clearToken } from '@/common/config'

// ========== 类型定义 ==========

/** 请求方法类型 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** API 响应结构 */
export type ApiResponse<T = any> = {
	code: number
	msg: string
	data: T
}

/** 请求配置选项 */
export type RequestOptions = {
	/** 请求地址（相对路径或完整URL） */
	url: string
	/** 请求方法，默认 GET */
	method?: HttpMethod
	/** 请求数据 */
	data?: UTSJSONObject
	/** 请求头 */
	header?: UTSJSONObject
	/** 基础地址，默认使用 getHostProjectConfig().baseUrl */
	baseUrl?: string
	/** 超时时间（毫秒），默认 30000 */
	timeout?: number
	/** 是否携带 Token，默认 true */
	withToken?: boolean
	/** 是否显示错误提示，默认 true */
	showError?: boolean
	/** 是否显示加载提示，默认 false */
	showLoading?: boolean
	/** 加载提示文字 */
	loadingText?: string
	/** 未登录时是否跳转登录页，默认 true */
	redirectOnUnauthorized?: boolean
	/** 登录页路径 */
	loginPage?: string
	/** 成功的响应码，默认 0 或 200 */
	successCodes?: number[]
	/** 未授权的响应码，默认 401 或 403 */
	unauthorizedCodes?: number[]
	/** 自定义错误码处理 */
	onErrorCode?: (response: ApiResponse<any>) => void
}

/** 快捷请求方法参数 */
type QuickRequestParams = {
	url: string
	data?: UTSJSONObject
	options?: RequestOptions
}

// ========== 默认配置 ==========

const DEFAULT_TIMEOUT = 30000
const DEFAULT_SUCCESS_CODES = [0, 200]
const DEFAULT_UNAUTHORIZED_CODES = [401, 403]
const DEFAULT_LOGIN_PAGE = '/pages_Me/login/login'

// ========== 工具函数 ==========

/**
 * 构建完整 URL
 */
function buildUrl(url: string, baseUrl: string): string {
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url
	}
	return baseUrl + (url.startsWith('/') ? '' : '/') + url
}

/**
 * 构建 GET 请求参数
 */
function buildQueryString(data: UTSJSONObject): string {
	const parts: string[] = []
	for (const key in data) {
		const value = data.getString(key)
		if (value != null && value.length > 0) {
			parts.push(key + '=' + encodeURIComponent(value))
		}
	}
	return parts.length > 0 ? '?' + parts.join('&') : ''
}

/**
 * 显示加载提示
 */
function showLoadingModal(text: string): void {
	uni.showLoading({ title: text, mask: true })
}

/**
 * 隐藏加载提示
 */
function hideLoadingModal(): void {
	uni.hideLoading()
}

/**
 * 显示错误提示
 */
function showErrorToast(msg: string): void {
	uni.showToast({ title: msg || '请求失败', icon: 'none' })
}

/**
 * 跳转登录页
 */
function navigateToLogin(loginPage: string): void {
	storage.clearAuth()
	uni.showToast({ title: '请先登录', icon: 'none' })
	setTimeout(() => {
		uni.navigateTo({ url: loginPage })
		return
	}, 1200)
}

function createRequestOptions(url: string, method: HttpMethod, data?: UTSJSONObject, options?: RequestOptions): RequestOptions {
	const out: RequestOptions = {
		url,
		method,
		data,
	}
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

function copyRequestOptions(options: RequestOptions): RequestOptions {
	return createRequestOptions(options.url, options.method ?? 'GET', options.data, options)
}

// ========== 核心请求函数 ==========

/**
 * 统一请求方法
 */
export function request<T = any>(options: RequestOptions): Promise<ApiResponse<T>> {
	const {
		url,
		method = 'GET',
		data,
		header,
		baseUrl,
		timeout = DEFAULT_TIMEOUT,
		withToken = false,
		showError = true,
		showLoading = false,
		loadingText,
		redirectOnUnauthorized = true,
		loginPage,
		successCodes,
		unauthorizedCodes,
		onErrorCode
	} = options

	// 显示加载提示
	if (showLoading) {
		showLoadingModal(loadingText ?? '加载中...')
	}

	// 构建请求地址
	const base = baseUrl ?? getHostProjectConfig().baseUrl
	let fullUrl = buildUrl(url, base)

	// GET 请求参数拼接到 URL
	let requestData = data
	if (method === 'GET' && data != null) {
		fullUrl += buildQueryString(data)
		requestData = {}
	}

	// 构建请求头
	const reqHeader: UTSJSONObject = {
		'Content-Type': 'application/json'
	}

	// 添加 Token
	if (withToken) {
		const token = getToken()
		if (token != '') {
			reqHeader['token'] = token
		}
	}

	// 确保这些值不为 null
	const finalSuccessCodes = successCodes ?? DEFAULT_SUCCESS_CODES
	const finalUnauthorizedCodes = unauthorizedCodes ?? DEFAULT_UNAUTHORIZED_CODES
	const hpLogin = getHostProjectConfig().loginPagePath
	const finalLoginPage =
		loginPage ?? (hpLogin.length > 0 ? hpLogin : DEFAULT_LOGIN_PAGE)

	return new Promise((resolve, reject) => {
		uni.request({
			url: fullUrl,
			method,
			data: requestData,
			header: reqHeader as UTSJSONObject,
			timeout,
			success: (res) => {
				// 隐藏加载提示
				if (showLoading) {
					hideLoadingModal()
				}

				const result = res.data as ApiResponse<T>
				const { code, msg, data: resData } = result

				// 请求成功
				if (finalSuccessCodes.indexOf(code) >= 0) {
					resolve(result)
					return
				}

				// 未授权处理
				if (finalUnauthorizedCodes.indexOf(code) >= 0) {
					if (redirectOnUnauthorized) {
						navigateToLogin(finalLoginPage)
					}
					reject(result)
					return
				}

				// 自定义错误码处理
				if (onErrorCode != null) {
					onErrorCode(result as ApiResponse<any>)
				}

				// 显示错误提示
				if (showError) {
					showErrorToast(msg)
				}

				reject(result)
			},
			fail: (err) => {
				// 隐藏加载提示
				if (showLoading) {
					hideLoadingModal()
				}

				// 显示网络错误提示
				if (showError) {
					showErrorToast('网络异常，请检查网络连接')
				}

				reject({
					code: -1,
					msg: '网络异常',
					data: null
				} as ApiResponse<T>)
			}
		})
	})
}

// ========== 快捷方法 ==========

/**
 * GET 请求
 */
export function get<T = any>(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<T>> {
	return request<T>(createRequestOptions(url, 'GET', data, options))
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<T>> {
	return request<T>(createRequestOptions(url, 'POST', data, options))
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<T>> {
	return request<T>(createRequestOptions(url, 'PUT', data, options))
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<T>> {
	return request<T>(createRequestOptions(url, 'DELETE', data, options))
}

/**
 * 公开请求（不需要登录）
 */
export function publicRequest<T = any>(options: RequestOptions): Promise<ApiResponse<T>> {
	const requestOptions = copyRequestOptions(options)
	requestOptions.withToken = false
	requestOptions.redirectOnUnauthorized = false
	return request<T>(requestOptions)
}

/**
 * 静默请求（不显示任何提示）
 */
export function silentRequest<T = any>(options: RequestOptions): Promise<ApiResponse<T>> {
	const requestOptions = copyRequestOptions(options)
	requestOptions.showError = false
	requestOptions.redirectOnUnauthorized = false
	return request<T>(requestOptions)
}

/**
 * 带加载提示的请求
 */
export function loadingRequest<T = any>(options: RequestOptions, loadingText?: string): Promise<ApiResponse<T>> {
	const requestOptions = copyRequestOptions(options)
	requestOptions.showLoading = true
	requestOptions.loadingText = loadingText || '加载中...'
	return request<T>(requestOptions)
}

// ========== HTTP 对象（链式调用风格） ==========

export const http = {
	/** GET 请求 */
	get(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<any>> {
		return get<any>(url, data, options)
	},

	/** POST 请求 */
	post(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<any>> {
		return post<any>(url, data, options)
	},

	/** PUT 请求 */
	put(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<any>> {
		return put<any>(url, data, options)
	},

	/** DELETE 请求 */
	delete(url: string, data?: UTSJSONObject, options?: RequestOptions): Promise<ApiResponse<any>> {
		return del<any>(url, data, options)
	},

	/** 公开请求（不需要登录） */
	public(options: RequestOptions): Promise<ApiResponse<any>> {
		return publicRequest<any>(options)
	},

	/** 静默请求（不显示提示） */
	silent(options: RequestOptions): Promise<ApiResponse<any>> {
		return silentRequest<any>(options)
	},

	/** 带加载提示的请求 */
	loading(options: RequestOptions, loadingText?: string): Promise<ApiResponse<any>> {
		return loadingRequest<any>(options, loadingText)
	},

	/** multipart 上传单个文件（实现见 Upload.uts） */
	upload(options: UploadFileOptions): Promise<UploadApiResponse<any>> {
		return uploadFileRequest<any>(options)
	}
}

// ========== 默认导出 ==========

export default {
	request,
	public: publicRequest,
	silent: silentRequest,
	loading: loadingRequest,
	http
}