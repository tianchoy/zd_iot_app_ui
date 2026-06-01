"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_LoginObject = require("./LoginObject.js");
require("./ProjectConfig.js");
require("./utype/type.js");
const uni_modules_mUnix_components_mTools_uenum_SysEnum = require("./uenum/SysEnum.js");
const uni_modules_mUnix_components_mTools_Storage = require("./Storage.js");
const uni_modules_mUnix_components_mTools_Auth = require("./Auth.js");
const uni_modules_mUnix_components_mTools_Request = require("./Request.js");
const uni_modules_mUnix_components_mTools_useAuth = require("./useAuth.js");
const uni_modules_mUnix_config = require("../../config.js");
const tabBarPaths = [
  "/pages/components/components",
  "/pages/tools/tools",
  "/pages/templates/templates",
  "/pages/user/user"
];
function jumpTo(url, type = "to") {
  if (url == "")
    return null;
  const path = url.split("?")[0];
  if (tabBarPaths.indexOf(path) >= 0) {
    common_vendor.index.switchTab({ url });
    return null;
  }
  if (type === "redirectTo") {
    common_vendor.index.redirectTo({ url });
  } else {
    common_vendor.index.navigateTo({ url });
  }
}
function checkPhone(phone) {
  const regexPhone = /^1[3-9]\d{9}$/;
  return regexPhone.test(phone);
}
function get(key) {
  try {
    const val = common_vendor.index.getStorageSync(key);
    return val;
  } catch (e) {
    return null;
  }
}
function set(key, value = null) {
  try {
    common_vendor.index.setStorageSync(key, value);
  } catch (e) {
    common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/Ut.uts:84", "ut set error", e);
  }
}
function jslog(title, obj = null) {
  if (title == "" || obj == null)
    return null;
  common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:91", "【打印】:" + title + "=>", common_vendor.UTS.JSON.stringify(obj));
}
function apiStart() {
  common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: "加载中..." }));
}
function apiStop() {
  common_vendor.index.hideLoading();
}
function isEmpty(content = null) {
  if (content == null || content == void 0)
    return true;
  const s = content;
  return typeof s === "string" && s.trim() == "";
}
function checkNumber(number) {
  const regexCard = /^(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)?$)$/;
  return regexCard.test(number);
}
class MoneyUnitValue extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          num: { type: String, optional: false },
          unit: { type: String, optional: false }
        };
      },
      name: "MoneyUnitValue"
    };
  }
  constructor(options, metadata = MoneyUnitValue.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.num = this.__props__.num;
    this.unit = this.__props__.unit;
    delete this.__props__;
  }
}
function changeMoney(num) {
  const n = Number(num);
  if (n <= 1)
    return new MoneyUnitValue({ num: String(n), unit: "元" });
  const units = ["元", "万", "亿", "万亿"];
  let curNum = n;
  let curUnit = units[0];
  for (let i = 0; i < 4; i++) {
    curUnit = units[i];
    if (strNumSize(curNum) < 5)
      break;
    curNum = curNum / 1e4;
  }
  return new MoneyUnitValue({ num: Number(curNum).toFixed(2), unit: curUnit });
}
function strNumSize(tempNum) {
  const s = tempNum.toString();
  const idx = s.indexOf(".");
  const newNum = idx != -1 ? s.substring(0, idx) : s;
  return newNum.length;
}
function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "." + month + "." + day;
}
function getTodayStartTimestamp() {
  const now = /* @__PURE__ */ new Date();
  now.setHours(0, 0, 0, 0);
  return now.getTime();
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function maskPhoneNumber(phoneNumber = null) {
  if (phoneNumber == null || phoneNumber == void 0)
    return "";
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
function generateOrderNumber() {
  const date = /* @__PURE__ */ new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const h = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  const ms = date.getMilliseconds().toString().padEnd(3, "0");
  const rand = Math.floor(1e3 + Math.random() * 9e3).toString();
  return `${y}${m}${d}${h}${min}${s}${ms}${rand}`;
}
function toCssLength(value) {
  if (typeof value === "number") {
    return value + "rpx";
  }
  const s = value.trim();
  if (s.length === 0) {
    return "0rpx";
  }
  const len = s.length;
  if (len >= 3 && s.substring(len - 3) === "rpx") {
    return s;
  }
  if (len >= 2 && s.substring(len - 2) === "px") {
    return s;
  }
  if (len >= 1 && s.substring(len - 1) === "%") {
    return s;
  }
  if (len >= 2 && s.substring(len - 2) === "em") {
    return s;
  }
  const n = parseFloat(s);
  if (!isNaN(n)) {
    return n + "rpx";
  }
  return s;
}
function parseCssNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  const s = value.trim();
  if (s.length === 0) {
    return 0;
  }
  const len = s.length;
  if (len >= 3 && s.substring(len - 3) === "rpx") {
    return parseFloat(s.substring(0, len - 3));
  }
  if (len >= 2 && s.substring(len - 2) === "px") {
    return parseFloat(s.substring(0, len - 2));
  }
  return parseFloat(s);
}
const mConfigInfo = () => {
  const c = uni_modules_mUnix_config.getMUiConfig();
  return new common_vendor.UTSJSONObject({
    development: c.apiDevelopmentBase,
    production: c.apiProductionBase,
    name: c.appName,
    logo: c.appLogo,
    agreement: c.agreementRoute,
    privacy: c.privacyRoute
  });
};
const mToastMsg = (text) => {
  common_vendor.index.showToast({
    title: text || "出错啦~",
    icon: "none",
    duration: 2e3
  });
};
function parseApiEnvelope(raw = null) {
  if (raw == null) {
    return null;
  }
  if (typeof raw === "object") {
    return raw;
  }
  if (typeof raw === "string") {
    const s = raw.trim();
    if (s.length === 0) {
      return null;
    }
    try {
      return common_vendor.UTS.JSON.parse(s);
    } catch (e) {
      const preview = s.length > 80 ? s.substring(0, 80) + "…" : s;
      throw new Error("接口返回非JSON：" + preview);
    }
  }
  throw new Error("无法解析的响应类型");
}
function httpStatusError(statusCode, resData = null) {
  let detail = "";
  if (typeof resData === "string") {
    const s = resData.trim();
    if (s.length > 0) {
      detail = s.length > 160 ? s.substring(0, 160) + "…" : s;
    }
  }
  const base = "HTTP错误[" + statusCode.toString() + "]";
  if (detail.length > 0) {
    return new Error(base + "：" + detail);
  }
  return new Error(base);
}
const getReqUrl = () => {
  const envConfig = new common_vendor.UTSJSONObject({
    development: mConfigInfo().development,
    production: mConfigInfo().production
  });
  return envConfig["development"] || (() => {
    common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/Ut.uts:421", `未知环境: ${"development"}`);
    return "";
  })();
};
const showLoading = (title = null, mask = true) => {
  common_vendor.index.showLoading(new common_vendor.UTSJSONObject({
    mask,
    title: title || "请稍候..."
  }));
};
new common_vendor.UTSJSONObject({
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
  hideLoading: () => {
    common_vendor.index.hideLoading();
  },
  global: () => {
    const global = new common_vendor.UTSJSONObject({
      "primary": "#5677fc",
      "danger": "#FD7783",
      "warning": "#ff7900",
      "success": "#07c160",
      "blue": "#007aff"
    });
    return global;
  },
  /**
   * 获取ref对象
   */
  getRef(than = null, name) {
    let toastRef = than.$refs[name];
    return toastRef;
  },
  /**
   * 显示tips
   * this.$m.showTips(this,"toast","一般消息提示~")
   */
  showTips(than = null, name, msg2) {
    let toastRef = than.$refs[name];
    let options = new common_vendor.UTSJSONObject({
      msg: msg2,
      duration: 2e3
    });
    toastRef.showTips(options);
  },
  /**
   * 提示消息
   * @param {Object} text 内容
   * @param {Object} time 显示时长
   * @param {Object} icon 是否显示icon
   */
  toast: (text, time = null, icon = null) => {
    common_vendor.index.showToast({
      title: text || "出错啦~",
      icon: icon ? "success" : "none",
      duration: time || 2e3
    });
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
  modal: (title, content, showCancel, callback = null, confirmColor = null, confirmText = null) => {
    common_vendor.index.showModal(new common_vendor.UTSJSONObject({
      title: title || "提示",
      content,
      showCancel,
      cancelColor: "#555",
      confirmColor: confirmColor || "#5677fc",
      confirmText: confirmText || "确定",
      success(res) {
        if (res.confirm) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      }
    }));
  },
  //判断是否登录
  isLogin: () => {
    return new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().isLogin();
  },
  /**
   * 获取会员对象
   */
  getMemberInfo: () => {
    return new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().getMemberInfo();
  },
  /**
   * 登录
   */
  login: (memberInfo) => {
    new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().setMemberInfo(memberInfo);
  },
  logout: () => {
    new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().logout();
  },
  getTitleBarHeight: () => {
    let systemInfo = common_vendor.index.getSystemInfoSync();
    let statusBarHeight = systemInfo.statusBarHeight || 0;
    let titleBarHeight = 0;
    const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    titleBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height;
    return statusBarHeight + titleBarHeight;
  },
  /**
   * 路由
   * url :页面地址
   * paramsOrVerify: 对象（页面传递参数）|（是否登录验证）布尔|（打开方式）字符串
   * isLogin：是否登录验证 默认不验证
   * target： 打开方式 默认 新窗口打开
   */
  href(url, paramsOrVerify = null, isLogin = false, target = "_blank") {
    let params = {};
    if (typeof paramsOrVerify === "boolean") {
      isLogin = paramsOrVerify;
    } else if (typeof paramsOrVerify === "string") {
      target = paramsOrVerify;
    } else if (paramsOrVerify) {
      params = paramsOrVerify;
    }
    if (isLogin && !new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().isLogin()) {
      common_vendor.index.navigateTo({
        url: "/pages/me/login"
      });
      return common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/Ut.uts:580", "登录失效");
    }
    if (!url)
      return common_vendor.index.__f__("error", "at uni_modules/m-unix/components/m-tools/Ut.uts:582", "跳转路径不能为空");
    const query = Object.keys(params).map((k) => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    }).join("&");
    const endUrl = url + (query ? `?${query}` : "");
    try {
      if (url.startsWith("/pages/tab/")) {
        common_vendor.index.switchTab({ url: endUrl });
      } else if (getCurrentPages().length >= 9) {
        common_vendor.index.redirectTo({ url: endUrl });
      } else {
        if (target === "_self") {
          common_vendor.index.redirectTo({ url: endUrl });
        } else {
          common_vendor.index.navigateTo({ url: endUrl, animationType: "slide-in-right" });
        }
      }
    } catch (e) {
      common_vendor.index.showToast({ title: "跳转失败", icon: "none" });
    }
  },
  back(delta = 1) {
    common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:609", "Back");
    common_vendor.index.navigateBack(new common_vendor.UTSJSONObject({ delta, animationType: "slide-out-left" }));
  },
  upx2px(upx, def = null) {
    return upx * 2;
  },
  /**
   * 运行环境
   */
  runType: () => {
    switch (common_vendor.index.getDeviceInfo().platform) {
      case "android":
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:621", "运行Android上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.Android;
      case "ios":
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:624", "运行iOS上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.IOS;
      case "harmonyos":
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:627", "运行鸿蒙系统上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.HarmonyOs;
      case "mac":
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:630", "运行mac上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.IOS;
      case "windows":
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:633", "运行Windows上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.Windows;
      default:
        common_vendor.index.__f__("log", "at uni_modules/m-unix/components/m-tools/Ut.uts:636", "运行在开发者工具上");
        return uni_modules_mUnix_components_mTools_uenum_SysEnum.RunType.WxAppl;
    }
  },
  /**
   * @param {Object} value 字符串
   * 去空格
   */
  trim: function(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
  },
  /**
   * @param {Object} text 字符串
   * @param {Object} repstr 被替换字符
   * @param {Object} newstr 替换成字符
   * 内容替换
   */
  replaceAll: function(text, repstr, newstr) {
    return text.replace(new RegExp(repstr, "gm"), newstr);
  },
  /**
   * @param {Object} num 手机号
   * 格式化手机号码
   */
  formatNumber: function(num) {
    return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") : num;
  },
  /**
   * @param {Object} money 金额
   * 金额格式化
   */
  rmoney: function(money) {
    return parseFloat(money).toFixed(2).toString().split("").reverse().join("").replace(/(\d{3})/g, "$1,").replace(/\,$/, "").split("").reverse().join("");
  },
  /**
   * @param {Object} formatStr 格式默认：y-m-d h:i:s
   * @param {Object} fdate 时间
   * 日期格式化
   */
  formatDate: function(formatStr, fdate) {
    if (fdate) {
      if (~fdate.indexOf(".")) {
        fdate = fdate.substring(0, fdate.indexOf("."));
      }
      fdate = fdate.toString().replace("T", " ").replace(/\-/g, "/");
      var fTime = null, fStr = "ymdhis";
      if (!formatStr)
        formatStr = "y-m-d h:i:s";
      if (fdate)
        fTime = new Date(fdate);
      else
        fTime = /* @__PURE__ */ new Date();
      var month = fTime.getMonth() + 1;
      var day = fTime.getDate();
      var hours = fTime.getHours();
      var minu = fTime.getMinutes();
      var second = fTime.getSeconds();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hours = hours < 10 ? "0" + hours : hours;
      minu = minu < 10 ? "0" + minu : minu;
      second = second < 10 ? "0" + second : second;
      var formatArr = [
        fTime.getFullYear().toString(),
        month.toString(),
        day.toString(),
        hours.toString(),
        minu.toString(),
        second.toString()
      ];
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
  loadding: false,
  /**
   * 共用loadding显示的任务
   */
  loaddingTaskTime: null,
  /**
   * GET请求
   * @param {object} url 接口地址
   * @param {object} params 报文
   */
  httpGet: (url, params = null, showMgs = null) => {
    return new Promise((resolve, reject) => {
      let isTimeout = false;
      let requestTask = null;
      common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: "加载中", mask: true }));
      const timeoutId = setTimeout(() => {
        isTimeout = true;
        if (requestTask != null) {
          requestTask.abort();
        }
        common_vendor.index.hideLoading();
        mToastMsg("请求超时，请重试");
        reject(new Error("Request timeout"));
      }, 5e3);
      const queryString = Object.keys(params).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      }).join("&");
      const finalUrl = `${getReqUrl()}${url}${url.includes("?") ? "&" : "?"}${queryString}`;
      requestTask = common_vendor.index.request({
        url: finalUrl,
        header: new common_vendor.UTSJSONObject({
          "Authorization": new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().getToken()
        }),
        method: "GET",
        // 使用 text，避免服务端返回 HTML/纯文本（如 401 Unauthorized）时框架层 JSON.parse 抛 SyntaxError
        dataType: "text",
        success: (res) => {
          clearTimeout(timeoutId);
          common_vendor.index.hideLoading();
          if (res.statusCode === uni_modules_mUnix_components_mTools_uenum_SysEnum.HttpStatus.SUCCESS) {
            let response = null;
            try {
              response = parseApiEnvelope(res.data);
            } catch (e) {
              const m = common_vendor.UTS.isInstanceOf(e, Error) ? e.message : String(e);
              reject(new Error(m));
              return null;
            }
            if (!response) {
              resolve(null);
              return null;
            }
            if (response.code === 403) {
              reject(new Error(response.msg != null && response.msg.length > 0 ? response.msg : "请重新登录"));
              return null;
            }
            if (response.code === uni_modules_mUnix_components_mTools_uenum_SysEnum.HttpStatus.SUCCESS) {
              resolve(response.data);
            } else {
              if (showMgs) {
                mToastMsg(response.msg != null && response.msg.length > 0 ? response.msg : "请求处理失败");
              }
              reject(new Error(response.msg != null ? response.msg : "请求处理失败"));
            }
          } else {
            reject(httpStatusError(res.statusCode, res.data));
          }
        },
        fail: (err) => {
          clearTimeout(timeoutId);
          common_vendor.index.hideLoading();
          if (!isTimeout && err.errMsg !== "request:fail abort") {
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
  httpPost: (url, params) => {
    return new Promise((resolve, reject) => {
      let isTimeout = false;
      let requestTask = null;
      common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: "加载中", mask: true }));
      const timeoutId = setTimeout(() => {
        isTimeout = true;
        if (requestTask != null) {
          requestTask.abort();
        }
        common_vendor.index.hideLoading();
        mToastMsg("请求超时，请重试");
        reject(new Error("Request timeout"));
      }, 5e3);
      const finalUrl = `${getReqUrl()}${url}`;
      requestTask = common_vendor.index.request({
        url: finalUrl,
        method: "POST",
        header: new common_vendor.UTSJSONObject({
          "Authorization": new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().getToken(),
          "Content-Type": "application/json"
          // 新增 JSON 内容类型头
        }),
        data: params,
        dataType: "text",
        success: (res) => {
          clearTimeout(timeoutId);
          common_vendor.index.hideLoading();
          if (res.statusCode === uni_modules_mUnix_components_mTools_uenum_SysEnum.HttpStatus.SUCCESS) {
            let response = null;
            try {
              response = parseApiEnvelope(res.data);
            } catch (e) {
              const m = common_vendor.UTS.isInstanceOf(e, Error) ? e.message : String(e);
              reject(new Error(m));
              return null;
            }
            if (!response) {
              resolve(null);
              return null;
            }
            if (response.code === 403) {
              reject(new Error(response.msg != null && response.msg.length > 0 ? response.msg : "请重新登录"));
              return null;
            }
            if (response.code === uni_modules_mUnix_components_mTools_uenum_SysEnum.HttpStatus.SUCCESS) {
              resolve(response.data);
            } else {
              mToastMsg(response.msg != null && response.msg.length > 0 ? response.msg : "请求处理失败");
              reject(new Error(response.msg != null ? response.msg : "请求处理失败"));
            }
          } else {
            reject(httpStatusError(res.statusCode, res.data));
          }
        },
        fail: (err) => {
          clearTimeout(timeoutId);
          common_vendor.index.hideLoading();
          if (!isTimeout && err.errMsg !== "request:fail abort") {
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
  uploadFile: (url, filePath) => {
    showLoading();
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: getReqUrl() + url,
        filePath,
        name: "imageFile",
        header: new common_vendor.UTSJSONObject({
          "Authorization": new uni_modules_mUnix_components_mTools_LoginObject.LoginObject().getToken()
        }),
        success: function(res) {
          common_vendor.index.hideLoading();
          let d = null;
          try {
            let responseText = res.data.replace(/\ufeff/g, "");
            if (responseText.length === 0) {
              responseText = "{}";
            }
            d = common_vendor.UTS.JSON.parse(responseText);
          } catch (e) {
            reject(e);
            mToastMsg("上传响应解析失败");
            return null;
          }
          if (d == null) {
            reject(new Error("empty upload response"));
            return null;
          }
          if (d.code == 200) {
            let fileObj = d.data;
            resolve(fileObj);
          } else {
            mToastMsg(res.msg);
          }
        },
        fail: function(res) {
          reject(res);
          mToastMsg("系统繁忙！");
        }
      });
    });
  },
  // ========== 导出新增工具 ==========
  /** 存储工具 */
  storage: uni_modules_mUnix_components_mTools_Storage.storage,
  /** 认证工具 */
  isLoggedIn: uni_modules_mUnix_components_mTools_Auth.isLoggedIn,
  checkLogin: uni_modules_mUnix_components_mTools_Auth.checkLogin,
  needLogin: uni_modules_mUnix_components_mTools_Auth.needLogin,
  /** 请求工具 */
  request: uni_modules_mUnix_components_mTools_Request.request,
  http: uni_modules_mUnix_components_mTools_Request.http,
  /** 通用工具 */
  jumpTo,
  checkPhone,
  get,
  set,
  jslog,
  apiStart,
  apiStop,
  isEmpty,
  checkNumber,
  changeMoney,
  timestampToDate,
  getTodayStartTimestamp,
  validateEmail,
  maskPhoneNumber,
  generateOrderNumber,
  /** 响应式登录态 */
  useAuth: uni_modules_mUnix_components_mTools_useAuth.useAuth
});
exports.parseCssNumber = parseCssNumber;
exports.toCssLength = toCssLength;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/Ut.js.map
