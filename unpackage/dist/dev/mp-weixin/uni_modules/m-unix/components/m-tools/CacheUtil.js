"use strict";
const common_vendor = require("../../../../common/vendor.js");
const CACHE_PREFIX = "app_cache_";
class CacheMeta extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          expire: { type: Number, optional: true },
          timestamp: { type: Number, optional: false },
          data: { type: "Any", optional: false }
        };
      },
      name: "CacheMeta"
    };
  }
  constructor(options, metadata = CacheMeta.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.expire = this.__props__.expire;
    this.timestamp = this.__props__.timestamp;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class CacheUtil {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param data 缓存数据
   * @param expire 有效期（单位：秒）
   */
  static set(key, data, expire = null) {
    try {
      const cacheKey = CACHE_PREFIX + key;
      const expireAt = expire != null ? Date.now() + expire * 1e3 : null;
      const meta = new CacheMeta({
        data,
        timestamp: Date.now(),
        expire: expireAt
      });
      common_vendor.index.setStorageSync(cacheKey, common_vendor.UTS.JSON.stringify(meta));
      return true;
    } catch (e) {
      common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/CacheUtil.uts:33", `[CacheUtil] 设置缓存失败 ${key}`, e);
      return false;
    }
  }
  /**
   * 获取缓存
   * @param key 缓存键
   * @param validator 数据校验函数（可选）
   */
  static get(key, validator = null) {
    const cacheKey = CACHE_PREFIX + key;
    try {
      const cached = common_vendor.index.getStorageSync(cacheKey);
      if (cached == null || cached == "")
        return null;
      const meta = common_vendor.UTS.JSON.parse(cached);
      if (meta.expire != null && Date.now() > meta.expire) {
        this.remove(key);
        return null;
      }
      if (validator != null && !validator(meta.data)) {
        common_vendor.index.__f__("warn", "at uni_modules/m-unix/components/m-tools/CacheUtil.uts:57", `[CacheUtil] 数据校验未通过 ${key}`);
        return null;
      }
      return meta.data;
    } catch (e) {
      common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/CacheUtil.uts:63", `[CacheUtil] 获取缓存失败 ${key}`, e);
      return null;
    }
  }
  /** 移除缓存 */
  static remove(key) {
    common_vendor.index.removeStorageSync(CACHE_PREFIX + key);
  }
  /** 清空所有带前缀的缓存 */
  static clear() {
    const keys = common_vendor.index.getStorageInfoSync().keys;
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        common_vendor.index.removeStorageSync(key);
      }
    });
  }
}
exports.CacheUtil = CacheUtil;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/CacheUtil.js.map
