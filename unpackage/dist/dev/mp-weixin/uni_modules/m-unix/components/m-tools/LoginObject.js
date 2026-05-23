"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_uenum_SysEnum = require("./uenum/SysEnum.js");
require("./utype/type.js");
const uni_modules_mUnix_components_mTools_CacheUtil = require("./CacheUtil.js");
class LoginObject {
  /**
   * 获取Token
   */
  getToken() {
    try {
      const u = this.getMemberInfo();
      if (u != null) {
        return u.token;
      }
      return "";
    } catch (e) {
      common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/LoginObject.uts:19", "get token error,`{}`", e);
      return null;
    }
  }
  /**
   * 设置登录对象
   */
  setMemberInfo(m) {
    uni_modules_mUnix_components_mTools_CacheUtil.CacheUtil.set(uni_modules_mUnix_components_mTools_uenum_SysEnum.StorageEnum.MEMBER_INFO_KEY, m);
  }
  /**
   * 获取登录对象
   */
  getMemberInfo() {
    try {
      return uni_modules_mUnix_components_mTools_CacheUtil.CacheUtil.get(uni_modules_mUnix_components_mTools_uenum_SysEnum.StorageEnum.MEMBER_INFO_KEY);
    } catch (e) {
      common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/LoginObject.uts:36", "get token error,`{}`", e);
      return null;
    }
  }
  /**
   * 登录
   */
  login(userInfo) {
    this.setMemberInfo(userInfo);
  }
  /**
   * 退出
   */
  logout() {
    uni_modules_mUnix_components_mTools_CacheUtil.CacheUtil.remove(uni_modules_mUnix_components_mTools_uenum_SysEnum.StorageEnum.MEMBER_INFO_KEY);
  }
  /**
   * 是否登录
   */
  isLogin() {
    return this.getMemberInfo() != null;
  }
}
exports.LoginObject = LoginObject;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/LoginObject.js.map
