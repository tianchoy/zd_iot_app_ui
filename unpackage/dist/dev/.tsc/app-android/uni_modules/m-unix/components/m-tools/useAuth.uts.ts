/**
 * 全局响应式登录态 - 类似 Vuex，任一处的 setToken/clearAuth 都会让所有使用 useAuth 的页面实时刷新
 */
import { computed } from 'vue'
import { storage } from './Storage.uts'
import { authTrigger } from './AuthNotifier.uts'

export function useAuth() {
	const hasLogin = computed(() => {
		authTrigger.value
		const token = storage.getToken()
		const info = storage.getUserInfo()
		return token != '' || info != null
	})

	const userInfo = computed(() => {
		authTrigger.value
		return storage.getUserInfo() ?? {}
	})

	return { hasLogin, userInfo }
}
