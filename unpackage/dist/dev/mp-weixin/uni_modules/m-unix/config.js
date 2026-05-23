"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("./components/m-tools/ProjectConfig.js");
const M_UI_BUILTIN_APP_LOGO = "/uni_modules/m-unix/static/m-app-logo.png";
const M_UI_BUILTIN_PLACEHOLDER_AVATAR = "/uni_modules/m-unix/static/m-placeholder-avatar.png";
const M_UI_BUILTIN_PLACEHOLDER_ARTICLE = "/uni_modules/m-unix/static/m-placeholder-article.png";
class MUiPartial extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          appName: { type: String, optional: true },
          apiDevelopmentBase: { type: String, optional: true },
          apiProductionBase: { type: String, optional: true },
          agreementRoute: { type: String, optional: true },
          privacyRoute: { type: String, optional: true },
          appLogo: { type: String, optional: true },
          emptyDefaultIcon: { type: String, optional: true },
          avatarDefault: { type: String, optional: true },
          articlePlaceholder: { type: String, optional: true },
          demoImage: { type: String, optional: true },
          qrCodeImageApiBase: { type: String, optional: true }
        };
      },
      name: "MUiPartial"
    };
  }
  constructor(options, metadata = MUiPartial.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.appName = this.__props__.appName;
    this.apiDevelopmentBase = this.__props__.apiDevelopmentBase;
    this.apiProductionBase = this.__props__.apiProductionBase;
    this.agreementRoute = this.__props__.agreementRoute;
    this.privacyRoute = this.__props__.privacyRoute;
    this.appLogo = this.__props__.appLogo;
    this.emptyDefaultIcon = this.__props__.emptyDefaultIcon;
    this.avatarDefault = this.__props__.avatarDefault;
    this.articlePlaceholder = this.__props__.articlePlaceholder;
    this.demoImage = this.__props__.demoImage;
    this.qrCodeImageApiBase = this.__props__.qrCodeImageApiBase;
    delete this.__props__;
  }
}
class MUiConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          appName: { type: String, optional: false },
          apiDevelopmentBase: { type: String, optional: false },
          apiProductionBase: { type: String, optional: false },
          agreementRoute: { type: String, optional: false },
          privacyRoute: { type: String, optional: false },
          appLogo: { type: String, optional: false },
          emptyDefaultIcon: { type: String, optional: false },
          avatarDefault: { type: String, optional: false },
          articlePlaceholder: { type: String, optional: false },
          demoImage: { type: String, optional: false },
          qrCodeImageApiBase: { type: String, optional: false }
        };
      },
      name: "MUiConfig"
    };
  }
  constructor(options, metadata = MUiConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.appName = this.__props__.appName;
    this.apiDevelopmentBase = this.__props__.apiDevelopmentBase;
    this.apiProductionBase = this.__props__.apiProductionBase;
    this.agreementRoute = this.__props__.agreementRoute;
    this.privacyRoute = this.__props__.privacyRoute;
    this.appLogo = this.__props__.appLogo;
    this.emptyDefaultIcon = this.__props__.emptyDefaultIcon;
    this.avatarDefault = this.__props__.avatarDefault;
    this.articlePlaceholder = this.__props__.articlePlaceholder;
    this.demoImage = this.__props__.demoImage;
    this.qrCodeImageApiBase = this.__props__.qrCodeImageApiBase;
    delete this.__props__;
  }
}
const M_UI_DEFAULTS = new MUiConfig({
  appName: "mUnix",
  apiDevelopmentBase: "https://demo.mmsadmin.cn/prod-api",
  apiProductionBase: "https://demo.mmsadmin.cn/prod-api",
  agreementRoute: "",
  privacyRoute: "",
  // 应用 Logo（关于页、工具类；合并链见文件头；默认用库内资源）
  appLogo: M_UI_BUILTIN_APP_LOGO,
  // m-empty 未传 icon 时的默认 m-icon name
  emptyDefaultIcon: "file-common-filling",
  // 默认头像占位（库内中性灰，勿用品牌 logo）
  avatarDefault: M_UI_BUILTIN_PLACEHOLDER_AVATAR,
  // 文章列表/详情占位（库内中性灰）
  articlePlaceholder: M_UI_BUILTIN_PLACEHOLDER_ARTICLE,
  // 演示页示例图（card 缩略图、cropper 源图）
  demoImage: "https://picsum.photos/200",
  // 二维码 PNG 接口根（与 qrserver 查询参数兼容）；小程序/H5 无原生生成时常用
  qrCodeImageApiBase: "https://api.qrserver.com/v1/create-qr-code/"
});
function trimStr(s = null) {
  if (s == null) {
    return "";
  }
  return s.trim();
}
function pickChain(a, b, c, defaultVal) {
  const x = trimStr(a);
  if (x.length > 0) {
    return x;
  }
  const y = trimStr(b);
  if (y.length > 0) {
    return y;
  }
  const z = trimStr(c);
  if (z.length > 0) {
    return z;
  }
  return defaultVal;
}
function pickChain2(a, b, defaultVal) {
  return pickChain(a, b, "", defaultVal);
}
function getMUiConfig() {
  const cfg = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig();
  const r = new MUiPartial({
    appName: null,
    apiDevelopmentBase: null,
    apiProductionBase: null,
    agreementRoute: null,
    privacyRoute: null,
    appLogo: null,
    emptyDefaultIcon: null,
    avatarDefault: null,
    articlePlaceholder: null,
    demoImage: null,
    qrCodeImageApiBase: null
  });
  const mu = cfg.mUi;
  const f = mu != null ? mu : new MUiPartial({
    appName: null,
    apiDevelopmentBase: null,
    apiProductionBase: null,
    agreementRoute: null,
    privacyRoute: null,
    appLogo: null,
    emptyDefaultIcon: null,
    avatarDefault: null,
    articlePlaceholder: null,
    demoImage: null,
    qrCodeImageApiBase: null
  });
  const ci = cfg.configInfo;
  const api = cfg.api;
  return new MUiConfig({
    appName: pickChain(trimStr(r.appName), trimStr(f.appName), trimStr(ci.name), M_UI_DEFAULTS.appName),
    apiDevelopmentBase: pickChain(trimStr(r.apiDevelopmentBase), trimStr(f.apiDevelopmentBase), trimStr(cfg.baseUrl), M_UI_DEFAULTS.apiDevelopmentBase),
    apiProductionBase: pickChain2(trimStr(r.apiProductionBase), trimStr(f.apiProductionBase), M_UI_DEFAULTS.apiProductionBase),
    agreementRoute: pickChain2(trimStr(r.agreementRoute), trimStr(f.agreementRoute), M_UI_DEFAULTS.agreementRoute),
    privacyRoute: pickChain2(trimStr(r.privacyRoute), trimStr(f.privacyRoute), M_UI_DEFAULTS.privacyRoute),
    appLogo: pickChain(trimStr(r.appLogo), trimStr(f.appLogo), trimStr(ci.logo), M_UI_DEFAULTS.appLogo),
    emptyDefaultIcon: pickChain2(trimStr(r.emptyDefaultIcon), trimStr(f.emptyDefaultIcon), M_UI_DEFAULTS.emptyDefaultIcon),
    avatarDefault: pickChain2(trimStr(r.avatarDefault), trimStr(f.avatarDefault), M_UI_DEFAULTS.avatarDefault),
    articlePlaceholder: pickChain2(trimStr(r.articlePlaceholder), trimStr(f.articlePlaceholder), M_UI_DEFAULTS.articlePlaceholder),
    demoImage: pickChain2(trimStr(r.demoImage), trimStr(f.demoImage), M_UI_DEFAULTS.demoImage),
    qrCodeImageApiBase: pickChain(trimStr(r.qrCodeImageApiBase), trimStr(f.qrCodeImageApiBase), trimStr(api.qrCodeImageApiBase), M_UI_DEFAULTS.qrCodeImageApiBase)
  });
}
exports.getMUiConfig = getMUiConfig;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/uni_modules/m-unix/config.js.map
