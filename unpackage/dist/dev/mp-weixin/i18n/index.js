"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_limeI18n_common_index = require("../uni_modules/lime-i18n/common/index.js");
const locales_zhCN = require("../locales/zh-CN.js");
const locales_en_US = require("../locales/en_US.js");
const i18n = uni_modules_limeI18n_common_index.createI18n(new common_vendor.UTSJSONObject({
  // 使用uni.getStorageSync('uVueI18nLocale') 能获取上次退出应用后保存的语言
  locale: "zh-CN",
  fallbackLocale: "en-US",
  messages: new common_vendor.UTSJSONObject({
    "zh-CN": locales_zhCN.zhCN,
    "en-US": locales_en_US.enUS
  })
}));
exports.i18n = i18n;
//# sourceMappingURL=../../.sourcemap/mp-weixin/i18n/index.js.map
