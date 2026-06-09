"use strict";
const common_vendor = require("../common/vendor.js");
class HostStorageConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          token: { type: String, optional: false },
          userInfo: { type: String, optional: false }
        };
      },
      name: "HostStorageConfig"
    };
  }
  constructor(options, metadata = HostStorageConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.token = this.__props__.token;
    this.userInfo = this.__props__.userInfo;
    delete this.__props__;
  }
}
class HostApiLoginConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          tokenLogin: { type: String, optional: false },
          codeGetOpenIdLogin: { type: String, optional: false },
          codeGetPhoneRegisterOrLogin: { type: String, optional: false }
        };
      },
      name: "HostApiLoginConfig"
    };
  }
  constructor(options, metadata = HostApiLoginConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.tokenLogin = this.__props__.tokenLogin;
    this.codeGetOpenIdLogin = this.__props__.codeGetOpenIdLogin;
    this.codeGetPhoneRegisterOrLogin = this.__props__.codeGetPhoneRegisterOrLogin;
    delete this.__props__;
  }
}
class HostApiUpdateConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          checkUpdate: { type: String, optional: false }
        };
      },
      name: "HostApiUpdateConfig"
    };
  }
  constructor(options, metadata = HostApiUpdateConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.checkUpdate = this.__props__.checkUpdate;
    delete this.__props__;
  }
}
class HostApiUploadConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          image: { type: String, optional: false }
        };
      },
      name: "HostApiUploadConfig"
    };
  }
  constructor(options, metadata = HostApiUploadConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.image = this.__props__.image;
    delete this.__props__;
  }
}
class HostApiConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          login: { type: HostApiLoginConfig, optional: false },
          update: { type: HostApiUpdateConfig, optional: false },
          upload: { type: HostApiUploadConfig, optional: false },
          qrCodeImageApiBase: { type: String, optional: false }
        };
      },
      name: "HostApiConfig"
    };
  }
  constructor(options, metadata = HostApiConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.login = this.__props__.login;
    this.update = this.__props__.update;
    this.upload = this.__props__.upload;
    this.qrCodeImageApiBase = this.__props__.qrCodeImageApiBase;
    delete this.__props__;
  }
}
class HostConfigInfo extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          logo: { type: String, optional: false },
          desc: { type: String, optional: false },
          versionCode: { type: Number, optional: false },
          versionName: { type: String, optional: false },
          appDownloadUrl: { type: String, optional: true },
          appDownloadUrlAndroid: { type: String, optional: true },
          userAgreementArticleId: { type: String, optional: true },
          privacyPolicyArticleId: { type: String, optional: true }
        };
      },
      name: "HostConfigInfo"
    };
  }
  constructor(options, metadata = HostConfigInfo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.logo = this.__props__.logo;
    this.desc = this.__props__.desc;
    this.versionCode = this.__props__.versionCode;
    this.versionName = this.__props__.versionName;
    this.appDownloadUrl = this.__props__.appDownloadUrl;
    this.appDownloadUrlAndroid = this.__props__.appDownloadUrlAndroid;
    this.userAgreementArticleId = this.__props__.userAgreementArticleId;
    this.privacyPolicyArticleId = this.__props__.privacyPolicyArticleId;
    delete this.__props__;
  }
}
class MUnixHostProjectConfig extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          env: { type: String, optional: false },
          localBaseUrl: { type: String, optional: false },
          devBaseUrl: { type: String, optional: false },
          prodBaseUrl: { type: String, optional: false },
          baseUrl: { type: String, optional: false },
          storage: { type: HostStorageConfig, optional: false },
          loginRequiredPaths: { type: common_vendor.UTS.UTSType.withGenerics(Array, [String]), optional: false },
          loginPagePath: { type: String, optional: false },
          api: { type: HostApiConfig, optional: false },
          configInfo: { type: HostConfigInfo, optional: false },
          mUi: { type: "Any", optional: true }
        };
      },
      name: "MUnixHostProjectConfig"
    };
  }
  constructor(options, metadata = MUnixHostProjectConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.env = this.__props__.env;
    this.localBaseUrl = this.__props__.localBaseUrl;
    this.devBaseUrl = this.__props__.devBaseUrl;
    this.prodBaseUrl = this.__props__.prodBaseUrl;
    this.baseUrl = this.__props__.baseUrl;
    this.storage = this.__props__.storage;
    this.loginRequiredPaths = this.__props__.loginRequiredPaths;
    this.loginPagePath = this.__props__.loginPagePath;
    this.api = this.__props__.api;
    this.configInfo = this.__props__.configInfo;
    this.mUi = this.__props__.mUi;
    delete this.__props__;
  }
}
const LOGO_BUILTIN = "/uni_modules/m-unix/static/m-app-logo.png";
const BUILTIN_DEFAULT = new MUnixHostProjectConfig({
  env: "local",
  localBaseUrl: "",
  devBaseUrl: "",
  prodBaseUrl: "",
  baseUrl: "",
  storage: new HostStorageConfig({
    token: "token",
    userInfo: "userInfo"
  }),
  loginRequiredPaths: [],
  loginPagePath: "/pages_Me/login/login",
  api: new HostApiConfig({
    login: new HostApiLoginConfig({
      tokenLogin: "",
      codeGetOpenIdLogin: "",
      codeGetPhoneRegisterOrLogin: ""
    }),
    update: new HostApiUpdateConfig({
      checkUpdate: ""
    }),
    upload: new HostApiUploadConfig({
      image: ""
    }),
    qrCodeImageApiBase: ""
  }),
  configInfo: new HostConfigInfo({
    appDownloadUrl: null,
    appDownloadUrlAndroid: null,
    userAgreementArticleId: null,
    privacyPolicyArticleId: null,
    name: "mUnix",
    logo: LOGO_BUILTIN,
    desc: "",
    versionCode: 0,
    versionName: "0.0.0"
  }),
  mUi: null
});
function getHostProjectConfig() {
  return BUILTIN_DEFAULT;
}
exports.getHostProjectConfig = getHostProjectConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/ProjectConfig.js.map
