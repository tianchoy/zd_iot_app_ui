/**
 * 通用工具方法集合（含原 mUnix：$m 挂载、httpGet、登录态等）
 */
import { LoginObject } from '@/uni_modules/m-unix/components/m-tools/LoginObject.uts'
import { getHostProjectConfig } from '@/uni_modules/m-unix/components/m-tools/ProjectConfig.uts'
import { R, StoreMemberVo } from '@/uni_modules/m-unix/components/m-tools/utype/type.uts'
import { RunType, HttpStatus } from '@/uni_modules/m-unix/components/m-tools/uenum/SysEnum.uts'
import { storage } from '@/uni_modules/m-unix/components/m-tools/Storage.uts'
import { isLoggedIn, checkLogin, needLogin } from '@/uni_modules/m-unix/components/m-tools/Auth.uts'
import { http, request } from '@/uni_modules/m-unix/components/m-tools/Request.uts'
import { useAuth } from '@/uni_modules/m-unix/components/m-tools/useAuth.uts'
import {
	getMUiConfig,
	setMUiConfig,
	clearMUiRuntimeOverrides,
	M_UI_BUILTIN_APP_LOGO,
	M_UI_BUILTIN_PLACEHOLDER_AVATAR,
	M_UI_BUILTIN_PLACEHOLDER_ARTICLE,
} from '@/uni_modules/m-unix/config.uts'

export {
	getMUiConfig,
	setMUiConfig,
	clearMUiRuntimeOverrides,
	M_UI_BUILTIN_APP_LOGO,
	M_UI_BUILTIN_PLACEHOLDER_AVATAR,
	M_UI_BUILTIN_PLACEHOLDER_ARTICLE,
}

/** 当前宿主 configInfo（与 $m.configInfo() 函数区分；未 inject 时为库内默认） */
export function getProjectConfigInfo() {
	return getHostProjectConfig().configInfo
}

const tabBarPaths = [
	'/pages/components/components',
	'/pages/tools/tools',
	'/pages/templates/templates',
	'/pages/user/user',
]

/** 跳转 - type: to=navigateTo, redirectTo=redirectTo */
export function jumpTo(url: string, type: string = 'to') {
	if (url == '') return
	const path = url.split('?')[0]
	if (tabBarPaths.indexOf(path) >= 0) {
		uni.switchTab({ url })
		return
	}
	if (type === 'redirectTo') {
		uni.redirectTo({ url })
	} else {
		uni.navigateTo({ url })
	}
}

/** 消息提示 */
export function msg(title: string, duration: number = 1500) {
	if (title == '') return
	uni.showToast({ title, duration, icon: 'none' })
}

/** 手机号验证 */
export function checkPhone(phone: string): boolean {
	const regexPhone = /^1[3-9]\d{9}$/
	return regexPhone.test(phone)
}

/** 获取存储 */
export function get(key: string): any | null {
	try {
		const val = uni.getStorageSync(key) as any
		return val
	} catch (e) {
		return null
	}
}

/** 设置存储 */
export function set(key: string, value: any) {
	try {
		uni.setStorageSync(key, value)
	} catch (e) {
		__f__('error','at uni_modules/m-unix/components/m-tools/Ut.uts:84','ut set error', e)
	}
}

/** 打印格式化 */
export function jslog(title: string, obj: any) {
	if (title == '' || obj == null) return
	__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:91','【打印】:' + title + '=>', JSON.stringify(obj))
}

/** 开始加载 */
export function apiStart() {
	uni.showLoading({ title: '加载中...' })
}

/** 结束加载 */
export function apiStop() {
	uni.hideLoading()
}

/** 判空 */
export function isEmpty(content: string | null | undefined): boolean {
	if (content == null || content == undefined) return true
	const s = content as string
	return typeof s === 'string' && s.trim() == ''
}

/** 身份证验证 */
export function checkNumber(number: string): boolean {
	const regexCard = /^(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)?$)$/
	return regexCard.test(number)
}

export type MoneyUnitValue = {
	num: string
	unit: string
}

/** 数值转单位（元/万/亿） */
export function changeMoney(num: number): MoneyUnitValue {
	const n = Number(num)
	if (n <= 1) return { num: String(n), unit: '元' }
	const units = ['元', '万', '亿', '万亿']
	let curNum = n
	let curUnit = units[0]
	for (let i = 0; i < 4; i++) {
		curUnit = units[i]
		if (strNumSize(curNum) < 5) break
		curNum = curNum / 10000
	}
	return { num: Number(curNum).toFixed(2), unit: curUnit }
}
function strNumSize(tempNum: number): number {
	const s = tempNum.toString()
	const idx = s.indexOf('.')
	const newNum = idx != -1 ? s.substring(0, idx) : s
	return newNum.length
}

/** 时间戳转年月日 */
export function timestampToDate(timestamp: number): string {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = ('0' + (date.getMonth() + 1)).slice(-2)
	const day = ('0' + date.getDate()).slice(-2)
	return year + '.' + month + '.' + day
}

/** 获取当日0点时间戳（毫秒） */
export function getTodayStartTimestamp(): number {
	const now = new Date()
	now.setHours(0, 0, 0, 0)
	return now.getTime()
}

/** 验证邮箱 */
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

/** 手机号脱敏 */
export function maskPhoneNumber(phoneNumber: string | null | undefined): string {
	if (phoneNumber == null || phoneNumber == undefined) return ''
	return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/** 生成订单号 */
export function generateOrderNumber(): string {
	const date = new Date()
	const y = date.getFullYear()
	const m = (date.getMonth() + 1).toString().padStart(2, '0')
	const d = date.getDate().toString().padStart(2, '0')
	const h = date.getHours().toString().padStart(2, '0')
	const min = date.getMinutes().toString().padStart(2, '0')
	const s = date.getSeconds().toString().padStart(2, '0')
	const ms = date.getMilliseconds().toString().padEnd(3, '0')
	const rand = Math.floor(1000 + Math.random() * 9000).toString()
	return `${y}${m}${d}${h}${min}${s}${ms}${rand}`
}

/**
 * 转为 CSS 长度：数字默认补 rpx；已含 rpx/px/%/em 则原样返回。
 * 避免模板里 `size + 'rpx'` 在传入 `48rpx` 时变成 `48rpxrpx`。
 */
export function toCssLength(value: number | string): string {
	if (typeof value === 'number') {
		return value + 'rpx'
	}
	const s = (value as string).trim()
	if (s.length === 0) {
		return '0rpx'
	}
	const len = s.length
	if (len >= 3 && s.substring(len - 3) === 'rpx') {
		return s
	}
	if (len >= 2 && s.substring(len - 2) === 'px') {
		return s
	}
	if (len >= 1 && s.substring(len - 1) === '%') {
		return s
	}
	if (len >= 2 && s.substring(len - 2) === 'em') {
		return s
	}
	const n = parseFloat(s)
	if (!isNaN(n)) {
		return n + 'rpx'
	}
	return s
}

/**
 * H5：同步复制（与点击同一次事件循环，execCommand 才能成功；勿用 readonly 以免部分浏览器拒绝复制）
 */
function copyByExecCommand(data: string): boolean {
	const g = globalThis as any
	const doc = g.document
	if (doc == null) {
		return false
	}
	try {
		const ta = doc.createElement('textarea')
		ta.value = data
		ta.style.position = 'fixed'
		ta.style.left = '0'
		ta.style.top = '0'
		ta.style.width = '1px'
		ta.style.height = '1px'
		ta.style.padding = '0'
		ta.style.margin = '0'
		ta.style.border = 'none'
		ta.style.opacity = '0.01'
		ta.setAttribute('aria-hidden', 'true')
		const body = doc.body
		if (body == null) {
			return false
		}
		body.appendChild(ta)
		ta.focus()
		ta.select()
		const len = data.length
		if (typeof ta.setSelectionRange === 'function') {
			ta.setSelectionRange(0, len)
		}
		const ok = doc.execCommand('copy')
		body.removeChild(ta)
		return ok
	} catch (e) {
		return false
	}
}

function copyToClipboardUni(data: string, callback?: (success: boolean) => void) {
	uni.setClipboardData({
		data,
		showToast: false,
		success: () => {
			setTimeout(() => {
				uni.showToast({ title: '复制成功', icon: 'success' })
			}, 50)
			if (callback != null) {
				callback(true)
			}
		},
		fail: () => {
			if (copyByExecCommand(data)) {
				setTimeout(() => {
					uni.showToast({ title: '复制成功', icon: 'success' })
				}, 50)
				if (callback != null) {
					callback(true)
				}
			} else {
				uni.showToast({ title: '复制失败', icon: 'none' })
				if (callback != null) {
					callback(false)
				}
			}
		}
	})
}

/**
 * 写入剪贴板（便于非包裹场景调用）
 * 顺序：H5 优先同步 execCommand（与点击同栈）；再 Clipboard API；最后 uni（小程序/App）
 * @param data 要复制的文本
 * @param callback 可选，成功或失败时回调
 */
export function copyToClipboard(data: string, callback?: (success: boolean) => void) {
	if (data == null || data.length === 0) {
		if (callback != null) {
			callback(false)
		}
		return
	}
	const g = globalThis as any
	const doc = g.document
	if (doc != null) {
		if (copyByExecCommand(data)) {
			setTimeout(() => {
				uni.showToast({ title: '复制成功', icon: 'success' })
			}, 50)
			if (callback != null) {
				callback(true)
			}
			return
		}
	}
	const nav = g.navigator as any
	if (nav != null && nav.clipboard != null && typeof nav.clipboard.writeText === 'function') {
		nav.clipboard.writeText(data).then(() => {
			setTimeout(() => {
				uni.showToast({ title: '复制成功', icon: 'success' })
			}, 50)
			if (callback != null) {
				callback(true)
			}
		}).catch(() => {
			copyToClipboardUni(data, callback)
		})
		return
	}
	copyToClipboardUni(data, callback)
}

/** 去掉 rpx/px 等后缀得到数值，供 canvas、Number 计算使用 */
export function parseCssNumber(value: number | string): number {
	if (typeof value === 'number') {
		return value
	}
	const s = (value as string).trim()
	if (s.length === 0) {
		return 0
	}
	const len = s.length
	if (len >= 3 && s.substring(len - 3) === 'rpx') {
		return parseFloat(s.substring(0, len - 3))
	}
	if (len >= 2 && s.substring(len - 2) === 'px') {
		return parseFloat(s.substring(0, len - 2))
	}
	return parseFloat(s)
}

// ========== 原 mUnix：$m 挂载对象（configInfo、httpGet、href 等）==========

type HrefParams = object | boolean | string

/** 与 getMUiConfig 对齐，供 $m.httpGet、$m.configInfo() 使用 */
const mConfigInfo = () => {
	const c = getMUiConfig()
	return {
		development: c.apiDevelopmentBase,
		production: c.apiProductionBase,
		name: c.appName,
		logo: c.appLogo,
		agreement: c.agreementRoute,
		privacy: c.privacyRoute,
	}
}

/** 与 export function msg 区分：供 http 错误提示（默认 2s） */
const mToastMsg = (text: string) => {
	uni.showToast({
		title: text || '出错啦~',
		icon: 'none',
		duration: 2000,
	})
}

function parseApiEnvelope<T>(raw: any): R<T> | null {
	if (raw == null) {
		return null
	}
	if (typeof raw === 'object') {
		return raw as R<T>
	}
	if (typeof raw === 'string') {
		const s = raw.trim()
		if (s.length === 0) {
			return null
		}
		try {
			return JSON.parse(s) as R<T>
		} catch (e) {
			const preview = s.length > 80 ? s.substring(0, 80) + '…' : s
			throw new Error('接口返回非JSON：' + preview)
		}
	}
	throw new Error('无法解析的响应类型')
}

function httpStatusError(statusCode: number, resData: any): Error {
	let detail = ''
	if (typeof resData === 'string') {
		const s = resData.trim()
		if (s.length > 0) {
			detail = s.length > 160 ? s.substring(0, 160) + '…' : s
		}
	}
	const base = 'HTTP错误[' + statusCode.toString() + ']'
	if (detail.length > 0) {
		return new Error(base + '：' + detail)
	}
	return new Error(base)
}

const getReqUrl = () => {
	const envConfig = {
		development: mConfigInfo().development,
		production: mConfigInfo().production,
	}
	return (
		envConfig[process.env.NODE_ENV] ||
		(() => {
			__f__('error','at uni_modules/m-unix/components/m-tools/Ut.uts:421',`未知环境: ${process.env.NODE_ENV}`)
			return ''
		})()
	)
}

const showLoading = (title?: string, mask = true) => {
	uni.showLoading({
		mask: mask,
		title: title || '请稍候...',
	})
}

const tools = {
	configInfo: mConfigInfo,
	getReqUrl,
	msg: mToastMsg,
	/**
	 * 显示loading
	 */
	showLoading,
	/**
	 * 关闭loading
	 */
	hideLoading: () : void => {
		uni.hideLoading();
	},
	global: () => {
		const global = {
			"primary": '#5677fc',
			"danger": '#FD7783',
			"warning": '#ff7900',
			"success": '#07c160',
			"blue": '#007aff'
		}
		return global;
	},
	/**
	 * 获取ref对象
	 */
	getRef(than : any, name : string) {
		let toastRef = than.$refs[name] as any;
		return toastRef;
	},
	/**
	 * 显示tips
	 * this.$m.showTips(this,"toast","一般消息提示~")
	 */
	showTips(than : any, name : string, msg : string) {
		let toastRef = than.$refs[name] as any;
		let options = {
			msg: msg,
			duration: 2000
		};
		toastRef.showTips(options);
	},
	/**
	 * 提示消息
	 * @param {Object} text 内容
	 * @param {Object} time 显示时长
	 * @param {Object} icon 是否显示icon
	 */
	toast: (text : string, time ?: number, icon ?: boolean) => {
		uni.showToast({
			title: text || "出错啦~",
			icon: icon ? 'success' : 'none',
			duration: time || 2000
		})
	},
	/**
	 * 提示框
	 * @param {Object} title 标题
	 * @param {Object} content 内容
	 * @param {Object} showCancel 是否显示取消按钮
	 * @param {Object} callback 点击确认事件
	 * @param {Object} confirmColor 取消按钮的文字颜色
	 * @param {Object} confirmText 确定按钮的文字
	 */
	modal: (title : string, content : string, showCancel : boolean, callback ?: any, confirmColor ?: string, confirmText ?: string) => {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},

	//判断是否登录
	isLogin: () : boolean => {
		return new LoginObject().isLogin();
	},
	/**
	 * 获取会员对象
	 */
	getMemberInfo: () : StoreMemberVo | null => {
		return new LoginObject().getMemberInfo();
	},
	/**
	 * 登录
	 */
	login: (memberInfo : StoreMemberVo) : void => {
		new LoginObject().setMemberInfo(memberInfo)
	},
	logout: () : void => {
		new LoginObject().logout();
	},
	getTitleBarHeight:():number=>{
		  let systemInfo = uni.getSystemInfoSync()
		  let statusBarHeight = systemInfo.statusBarHeight || 0
		  let titleBarHeight = 0
		





		




		

		  // APP端：原生导航栏高度固定为44px（iOS标准）
		  titleBarHeight = 44

		
		  return statusBarHeight + titleBarHeight
	},
	/**
	 * 路由
	 * url :页面地址
	 * paramsOrVerify: 对象（页面传递参数）|（是否登录验证）布尔|（打开方式）字符串
	 * isLogin：是否登录验证 默认不验证
	 * target： 打开方式 默认 新窗口打开
	 */
	href(url : string, paramsOrVerify ?: HrefParams, isLogin : boolean = false, target : string = "_blank") {
		// 参数类型处理
		let params : object = {};
		if (typeof paramsOrVerify === 'boolean') {
			isLogin = paramsOrVerify;
		} else if (typeof paramsOrVerify === 'string') {
			target = paramsOrVerify;
		} else if (paramsOrVerify) {
			params = paramsOrVerify;
		}
		if (isLogin && !new LoginObject().isLogin()) {
			uni.navigateTo({
				url: '/pages/me/login'
			})
			return __f__('error','at uni_modules/m-unix/components/m-tools/Ut.uts:580','登录失效');
		}
		if (!url) return __f__('error','at uni_modules/m-unix/components/m-tools/Ut.uts:582','跳转路径不能为空');

		// 处理参数（自动编码）
		const query = Object.keys(params).map(k =>
			`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
		).join('&');

		const endUrl = url + (query ? `?${query}` : '');

		// 自动选择跳转方式
		try {
			if (url.startsWith('/pages/tab/')) { // 假设Tab页路径包含 /tab/
				uni.switchTab({ url: endUrl });
			} else if (getCurrentPages().length >= 9) {
				uni.redirectTo({ url: endUrl });
			} else {
				if (target === '_self') {
					uni.redirectTo({url: endUrl});
				} else {
					uni.navigateTo({ url: endUrl,animationType:"slide-in-right"});
				}
			}
		} catch (e) {
			uni.showToast({ title: '跳转失败', icon: 'none' });
		}
	},
	back(delta = 1) {
		__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:609',"Back")
		uni.navigateBack({ delta,animationType:"slide-out-left" });
	},
	upx2px(upx : number, def ?: number) {
		return upx * 2
	},
	/**
	 * 运行环境
	 */
	runType: () : RunType => {
		switch (uni.getDeviceInfo().platform) {
			case 'android':
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:621','运行Android上');
				return RunType.Android;
			case 'ios':
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:624','运行iOS上');
				return RunType.IOS;
			case 'harmonyos':
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:627','运行鸿蒙系统上');
				return RunType.HarmonyOs;
			case 'mac':
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:630','运行mac上');
				return RunType.IOS;
			case 'windows':
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:633','运行Windows上');
				return RunType.Windows;
			default:
				__f__('log','at uni_modules/m-unix/components/m-tools/Ut.uts:636','运行在开发者工具上');
				return RunType.WxAppl;
		}
	},
	/**
	 * @param {Object} value 字符串
	 * 去空格
	 */
	trim: function (value : string) {
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	/**
	 * @param {Object} text 字符串
	 * @param {Object} repstr 被替换字符
	 * @param {Object} newstr 替换成字符
	 * 内容替换
	 */
	replaceAll: function (text : string, repstr : string, newstr : string) {
		return text.replace(new RegExp(repstr, "gm"), newstr);
	},
	/**
	 * @param {Object} num 手机号
	 * 格式化手机号码
	 */
	formatNumber: function (num : string) {
		return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
	},
	/**
	 * @param {Object} money 金额
	 * 金额格式化
	 */
	rmoney: function (money : string) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	},
	/**
	 * @param {Object} formatStr 格式默认：y-m-d h:i:s
	 * @param {Object} fdate 时间
	 * 日期格式化
	 */
	formatDate: function (formatStr : string, fdate : string) {
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
	},
	/**
	 * 显示状态
	 */
	loadding: false as boolean,
	/**
	 * 共用loadding显示的任务
	 */
	loaddingTaskTime: null as number | null,

	/**
	 * GET请求
	 * @param {object} url 接口地址
	 * @param {object} params 报文
	 */
	httpGet: <T>(url : string, params : any, showMgs ?: boolean) : Promise<T> => {
		return new Promise((resolve, reject) => {
			let isTimeout = false;
			let requestTask : any = null;

			// 显示加载状态
			uni.showLoading({ title: '加载中', mask: true });

			// 处理超时逻辑
			const timeoutId = setTimeout(() => {
				isTimeout = true;
				if (requestTask != null) {
					requestTask.abort()
				}
				uni.hideLoading();
				mToastMsg("请求超时，请重试");
				reject(new Error('Request timeout'));
			}, 5000);

			// 构建查询字符串
			const queryString = Object.keys(params)
				.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
				.join('&');
			const finalUrl = `${getReqUrl()}${url}${url.includes('?') ? '&' : '?'}${queryString}`;

			requestTask = uni.request({
				url: finalUrl,
				header: {
					'Authorization': new LoginObject().getToken()
				},
				method: 'GET',
				// 使用 text，避免服务端返回 HTML/纯文本（如 401 Unauthorized）时框架层 JSON.parse 抛 SyntaxError
				dataType: 'text',
				success: (res) => {
					clearTimeout(timeoutId);
					uni.hideLoading();

					if (res.statusCode === HttpStatus.SUCCESS) {
						let response : R<T> | null = null
						try {
							response = parseApiEnvelope<T>(res.data)
						} catch (e) {
							const m = e instanceof Error ? e.message : String(e)
							reject(new Error(m))
							return
						}
						if (!response) {
							resolve(null as T)
							return
						}

						// 处理权限问题
						if (response.code === 403) {
							reject(new Error(response.msg != null && response.msg.length > 0 ? response.msg : '请重新登录'));
							return
						}

						// 处理业务成功状态
						if (response.code === HttpStatus.SUCCESS) {
							resolve(response.data);
						} else {
							if (showMgs) {
								mToastMsg(response.msg != null && response.msg.length > 0 ? response.msg : '请求处理失败');
							}
							reject(new Error(response.msg != null ? response.msg : '请求处理失败'));
						}
					} else {
						reject(httpStatusError(res.statusCode, res.data));
					}
				},
				fail: (err) => {
					clearTimeout(timeoutId);
					uni.hideLoading();

					// 过滤主动取消的请求
					if (!isTimeout && err.errMsg !== 'request:fail abort') {
						mToastMsg("网络连接异常，请检查网络");
					}
					reject(err);
				},
				complete: () => {
					requestTask = null;
				}
			});
		});
	},
	/**
	 * POST请求
	 * @param {object} url 接口地址
	 * @param {object} params 报文
	 */
	httpPost: <T>(url : string, params : object) : Promise<T> => {
		return new Promise((resolve, reject) => {
			let isTimeout = false;
			let requestTask : any = null;

			// 显示加载状态（与 GET 一致）
			uni.showLoading({ title: '加载中', mask: true });

			// 超时处理逻辑（5秒超时机制）
			const timeoutId = setTimeout(() => {
				isTimeout = true;
				if (requestTask != null) {
					requestTask.abort()
				}
				uni.hideLoading();
				mToastMsg("请求超时，请重试");
				reject(new Error('Request timeout'));
			}, 5000);

			// 构建完整请求地址（不拼接查询参数）
			const finalUrl = `${getReqUrl()}${url}`;

			// 发起 POST 请求
			requestTask = uni.request({
				url: finalUrl,
				method: 'POST', // 关键修改点：请求方法改为 POST
				header: {
					'Authorization': new LoginObject().getToken(),
					'Content-Type': 'application/json' // 新增 JSON 内容类型头
				},
				data: params, // POST 数据直接放在请求体
				dataType: 'text',
				success: (res) => {
					clearTimeout(timeoutId);
					uni.hideLoading();

					if (res.statusCode === HttpStatus.SUCCESS) {
						let response : R<T> | null = null
						try {
							response = parseApiEnvelope<T>(res.data)
						} catch (e) {
							const m = e instanceof Error ? e.message : String(e)
							reject(new Error(m))
							return
						}
						if (!response) {
							resolve(null as T)
							return
						}

						if (response.code === 403) {
							reject(new Error(response.msg != null && response.msg.length > 0 ? response.msg : '请重新登录'));
							return
						}

						if (response.code === HttpStatus.SUCCESS) {
							resolve(response.data);
						} else {
							mToastMsg(response.msg != null && response.msg.length > 0 ? response.msg : '请求处理失败');
							reject(new Error(response.msg != null ? response.msg : '请求处理失败'));
						}
					} else {
						reject(httpStatusError(res.statusCode, res.data));
					}
				},
				fail: (err) => {
					clearTimeout(timeoutId);
					uni.hideLoading();

					if (!isTimeout && err.errMsg !== 'request:fail abort') {
						mToastMsg("网络连接异常，请检查网络");
					}
					reject(err);
				},
				complete: () => {
					requestTask = null;
				}
			});
		});
	},
	/**
	 * 文件上传
	 * @param {object} url 接口地址
	 * @param {object} filePath 附件路径
	 */
	uploadFile: <T>(url : string, filePath : string) => {
		showLoading()
		return new Promise((resolve, reject) => {
			const uploadTask : UploadTask = uni.uploadFile({
				url: getReqUrl() + url,
				filePath: filePath,
				name: 'imageFile',
				header: {
					'Authorization': new LoginObject().getToken()
				},
				success: function (res) {
					uni.hideLoading()
					let d : R<T> | null = null
					try {
						let responseText = res.data.replace(/\ufeff/g, "")
							if (responseText.length === 0) {
								responseText = "{}"
							}
							d = JSON.parse(responseText) as R<T>
					} catch (e) {
						reject(e)
						mToastMsg("上传响应解析失败");
						return
					}
					if (d == null) {
						reject(new Error('empty upload response'))
						return
					}
					if (d.code == 200) {
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						mToastMsg(res.msg);
					}
				},
				fail: function (res) {
					reject(res)
					mToastMsg("系统繁忙！");
				}
			})
		})
	},

	// ========== 导出新增工具 ==========

	/** 存储工具 */
	storage: storage,

	/** 认证工具 */
	isLoggedIn: isLoggedIn,
	checkLogin: checkLogin,
	needLogin: needLogin,

	/** 请求工具 */
	request: request,
	http: http,

	/** 通用工具 */
	jumpTo: jumpTo,
	checkPhone: checkPhone,
	get: get,
	set: set,
	jslog: jslog,
	apiStart: apiStart,
	apiStop: apiStop,
	isEmpty: isEmpty,
	checkNumber: checkNumber,
	changeMoney: changeMoney,
	timestampToDate: timestampToDate,
	getTodayStartTimestamp: getTodayStartTimestamp,
	validateEmail: validateEmail,
	maskPhoneNumber: maskPhoneNumber,
	generateOrderNumber: generateOrderNumber,

	/** 响应式登录态 */
	useAuth: useAuth,
}

export default tools
