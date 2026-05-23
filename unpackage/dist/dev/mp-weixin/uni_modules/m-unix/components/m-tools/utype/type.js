"use strict";
const common_vendor = require("../../../../../common/vendor.js");
class R extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          status: { type: Number, optional: true },
          isSecurity: { type: Boolean, optional: true },
          data: { type: "Unknown", optional: false }
        };
      },
      name: "R"
    };
  }
  constructor(options, metadata = R.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.status = this.__props__.status;
    this.isSecurity = this.__props__.isSecurity;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class GlobalColor extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          primary: { type: String, optional: false },
          danger: { type: String, optional: false },
          warning: { type: String, optional: false },
          success: { type: String, optional: false },
          blue: { type: String, optional: false }
        };
      },
      name: "GlobalColor"
    };
  }
  constructor(options, metadata = GlobalColor.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.primary = this.__props__.primary;
    this.danger = this.__props__.danger;
    this.warning = this.__props__.warning;
    this.success = this.__props__.success;
    this.blue = this.__props__.blue;
    delete this.__props__;
  }
}
class StoreMemberVo extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          token: { type: String, optional: false },
          id: { type: Number, optional: true },
          nickname: { type: String, optional: true },
          phone: { type: String, optional: true },
          avatar: { type: String, optional: true }
        };
      },
      name: "StoreMemberVo"
    };
  }
  constructor(options, metadata = StoreMemberVo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.token = this.__props__.token;
    this.id = this.__props__.id;
    this.nickname = this.__props__.nickname;
    this.phone = this.__props__.phone;
    this.avatar = this.__props__.avatar;
    delete this.__props__;
  }
}
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/utype/type.js.map
