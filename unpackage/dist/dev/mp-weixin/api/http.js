"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_mUnix_components_mTools_Request = require("../uni_modules/m-unix/components/m-tools/Request.js");
require("../common/config.js");
class LoginParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          phone: { type: String, optional: false },
          password: { type: String, optional: false }
        };
      },
      name: "LoginParams"
    };
  }
  constructor(options, metadata = LoginParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.phone = this.__props__.phone;
    this.password = this.__props__.password;
    delete this.__props__;
  }
}
class LoginData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          token: { type: String, optional: false },
          refreshToken: { type: String, optional: false },
          userId: { type: Number, optional: false },
          nickname: { type: String, optional: false }
        };
      },
      name: "LoginData"
    };
  }
  constructor(options, metadata = LoginData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.token = this.__props__.token;
    this.refreshToken = this.__props__.refreshToken;
    this.userId = this.__props__.userId;
    this.nickname = this.__props__.nickname;
    delete this.__props__;
  }
}
const card_detail = (id, countryCode) => {
  return uni_modules_mUnix_components_mTools_Request.http.get("/app/card/info/" + id + "/" + countryCode);
};
exports.card_detail = card_detail;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
