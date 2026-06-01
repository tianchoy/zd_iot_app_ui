// cache-util.uts
const CACHE_PREFIX = "app_cache_"

type CacheMeta = {
  /** 数据过期时间戳（毫秒） */
  expire: number | null
  /** 数据存储时间戳 */
  timestamp: number
  /** 实际缓存数据 */
  data: Any
}

class CacheUtil {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param data 缓存数据
   * @param expire 有效期（单位：秒）
   */
  static set<T>(key: string, data: T, expire: number | null = null): boolean {
    try {
      const cacheKey = CACHE_PREFIX + key
      const expireAt = expire != null ? Date.now() + expire * 1000 : null
      const meta: CacheMeta = {
        data: data as Any,
        timestamp: Date.now(),
        expire: expireAt
      }
      
      uni.setStorageSync(cacheKey, JSON.stringify(meta))
      return true
    } catch (e) {
      __f__('error','at uni_modules/m-unix/components/m-tools/CacheUtil.uts:33',`[CacheUtil] 设置缓存失败 ${key}`, e)
      return false
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @param validator 数据校验函数（可选）
   */
  static get<T>(key: string, validator: ((data: Any) => boolean) | null = null): T | null {
    const cacheKey = CACHE_PREFIX + key
    try {
      const cached = uni.getStorageSync(cacheKey)
      if (cached == null || cached == "") return null

      const meta = JSON.parse(cached as string) as CacheMeta
      
      if (meta.expire != null && Date.now() > meta.expire) {
        this.remove(key)
        return null
      }

      if (validator != null && !validator(meta.data)) {
        __f__('warn','at uni_modules/m-unix/components/m-tools/CacheUtil.uts:57',`[CacheUtil] 数据校验未通过 ${key}`)
        return null
      }

      return meta.data as T
    } catch (e) {
      __f__('error','at uni_modules/m-unix/components/m-tools/CacheUtil.uts:63',`[CacheUtil] 获取缓存失败 ${key}`, e)
      return null
    }
  }

  /** 移除缓存 */
  static remove(key: string): void {
    uni.removeStorageSync(CACHE_PREFIX + key)
  }

  /** 清空所有带前缀的缓存 */
  static clear(): void {
    const keys = uni.getStorageInfoSync().keys
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        uni.removeStorageSync(key)
      }
    })
  }
}

export default CacheUtil