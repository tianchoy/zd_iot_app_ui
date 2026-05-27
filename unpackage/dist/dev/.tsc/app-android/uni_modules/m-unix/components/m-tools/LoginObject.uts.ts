import { StorageEnum } from '@/uni_modules/m-unix/components/m-tools/uenum/SysEnum.uts'
import { StoreMemberVo } from '@/uni_modules/m-unix/components/m-tools/utype/type.uts'
import CacheUtil from "@/uni_modules/m-unix/components/m-tools/CacheUtil.uts"
/**
 * 登录对象
 */
export class LoginObject {
	/**
	 * 获取Token
	 */
	getToken() : string | null {
		try {
			const u:StoreMemberVo|null= this.getMemberInfo();
			if(u!=null){
				return u.token;
			}
			return "";
		} catch (e) {
			__f__('log','at uni_modules/m-unix/components/m-tools/LoginObject.uts:19',"get token error,`{}`", e)
			return null;
		}
	}
	/**
	 * 设置登录对象
	 */
	setMemberInfo(m : StoreMemberVo) : void {
		CacheUtil.set(StorageEnum.MEMBER_INFO_KEY, m)
	}
	/**
	 * 获取登录对象
	 */
	getMemberInfo() : StoreMemberVo | null {
		try {
			return CacheUtil.get<StoreMemberVo>(StorageEnum.MEMBER_INFO_KEY);
		} catch (e) {
			__f__('log','at uni_modules/m-unix/components/m-tools/LoginObject.uts:36',"get token error,`{}`", e)
			return null;
		}
	}
	/**
	 * 登录
	 */
	login(userInfo : StoreMemberVo) : void {
		this.setMemberInfo(userInfo);
	}
	/**
	 * 退出
	 */
	logout(){
		CacheUtil.remove(StorageEnum.MEMBER_INFO_KEY)
	}
	/**
	 * 是否登录
	 */
	isLogin() : boolean {
		return this.getMemberInfo() != null;
	}
}