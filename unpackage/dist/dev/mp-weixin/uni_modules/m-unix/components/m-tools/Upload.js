"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("./ProjectConfig.js");
const uni_modules_mUnix_components_mTools_Storage = require("./Storage.js");
class UploadApiResponse extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: "Unknown", optional: false }
        };
      },
      name: "UploadApiResponse"
    };
  }
  constructor(options, metadata = UploadApiResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class UploadFileOptions extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: false },
          filePath: { type: String, optional: false },
          name: { type: String, optional: true },
          formData: { type: "Unknown", optional: true },
          baseUrl: { type: String, optional: true },
          withToken: { type: Boolean, optional: true },
          header: { type: "Unknown", optional: true },
          showLoading: { type: Boolean, optional: true },
          loadingText: { type: String, optional: true },
          showError: { type: Boolean, optional: true },
          successCodes: { type: common_vendor.UTS.UTSType.withGenerics(Array, [Number]), optional: true }
        };
      },
      name: "UploadFileOptions"
    };
  }
  constructor(options, metadata = UploadFileOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.url = this.__props__.url;
    this.filePath = this.__props__.filePath;
    this.name = this.__props__.name;
    this.formData = this.__props__.formData;
    this.baseUrl = this.__props__.baseUrl;
    this.withToken = this.__props__.withToken;
    this.header = this.__props__.header;
    this.showLoading = this.__props__.showLoading;
    this.loadingText = this.__props__.loadingText;
    this.showError = this.__props__.showError;
    this.successCodes = this.__props__.successCodes;
    delete this.__props__;
  }
}
function resolveUploadBase(override = null) {
  if (override != null && override !== "") {
    return override;
  }
  return uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig().baseUrl;
}
function buildUploadFullUrl(path, baseOverride = null) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = resolveUploadBase(baseOverride);
  const sep = path.startsWith("/") ? "" : "/";
  return base + sep + path;
}
function uploadFileRequest(options) {
  const url = options.url;
  const filePath = options.filePath;
  const name = options.name != null && options.name !== "" ? options.name : "file";
  const formData = options.formData;
  const baseUrl = options.baseUrl;
  const withToken = options.withToken != null ? options.withToken : true;
  const header = options.header != null ? options.header : new common_vendor.UTSJSONObject({});
  const showLoading = options.showLoading != null ? options.showLoading : false;
  const loadingText = options.loadingText != null ? options.loadingText : "上传中...";
  const showError = options.showError != null ? options.showError : true;
  const successCodes = options.successCodes != null ? options.successCodes : [0, 200];
  const fullUrl = buildUploadFullUrl(url, baseUrl);
  if (showLoading) {
    common_vendor.index.showLoading(new common_vendor.UTSJSONObject({ title: loadingText, mask: true }));
  }
  const reqHeader = header;
  if (withToken) {
    const token = uni_modules_mUnix_components_mTools_Storage.storage.getToken();
    if (token !== "") {
      reqHeader["Authorization"] = token;
    }
  }
  return new Promise((resolve, reject) => {
    const fd = formData != null ? formData : new common_vendor.UTSJSONObject({});
    common_vendor.index.uploadFile({
      url: fullUrl,
      filePath,
      name,
      formData: fd,
      header: reqHeader,
      success: (res) => {
        var _a;
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        let parsed;
        try {
          const raw = ((_a = res.data) !== null && _a !== void 0 ? _a : "").replace(/\ufeff/g, "");
          const json = raw !== "" ? raw : "{}";
          parsed = common_vendor.UTS.JSON.parse(json);
        } catch (e) {
          if (showError) {
            common_vendor.index.showToast({ title: "上传响应解析失败", icon: "none" });
          }
          reject(new UploadApiResponse({
            code: -1,
            msg: "parse error",
            data: null
          }));
          return null;
        }
        const code = parsed.code;
        let ok = false;
        for (let j = 0; j < successCodes.length; j++) {
          if (successCodes[j] === code) {
            ok = true;
            break;
          }
        }
        if (ok) {
          resolve(parsed);
          return null;
        }
        const m = parsed.msg;
        if (showError && m != null && m !== "") {
          common_vendor.index.showToast({ title: m, icon: "none" });
        }
        reject(parsed);
      },
      fail: (err) => {
        if (showLoading) {
          common_vendor.index.hideLoading();
        }
        if (showError) {
          common_vendor.index.showToast({ title: "上传失败", icon: "none" });
        }
        reject(new UploadApiResponse({
          code: -1,
          msg: "network",
          data: err
        }));
      }
    });
  });
}
exports.uploadFileRequest = uploadFileRequest;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/Upload.js.map
