/**
 * 全局认证变更通知 - 类似 Vuex 的订阅机制
 * storage 在 setToken/setUserInfo/clearAuth 时调用 notifyAuthChange()
 * 使用 useAuth 的页面会实时响应
 */
import { ref } from 'vue'

export const authTrigger = ref(0)

export function notifyAuthChange(): void {
	authTrigger.value++
}
