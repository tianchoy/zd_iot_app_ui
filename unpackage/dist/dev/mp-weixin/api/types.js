"use strict";
const common_vendor = require("../common/vendor.js");
class LoginData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          token: { type: String, optional: false },
          access_token: { type: String, optional: false },
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
    this.id = this.__props__.id;
    this.token = this.__props__.token;
    this.access_token = this.__props__.access_token;
    this.refreshToken = this.__props__.refreshToken;
    this.userId = this.__props__.userId;
    this.nickname = this.__props__.nickname;
    delete this.__props__;
  }
}
class CountryData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          fullName: { type: String, optional: false },
          letterCode: { type: String, optional: false }
        };
      },
      name: "CountryData"
    };
  }
  constructor(options, metadata = CountryData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.fullName = this.__props__.fullName;
    this.letterCode = this.__props__.letterCode;
    delete this.__props__;
  }
}
class TenantInfoData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeTip: { type: String, optional: false },
          servicePhone: { type: String, optional: false },
          serviceQrcode: { type: String, optional: false },
          wxAuditHide: { type: String, optional: false },
          wxAuditHideNo: { type: String, optional: false },
          wxGetPhoneLogin: { type: String, optional: false },
          wxMiniPayType: { type: String, optional: false },
          wxPayClass: { type: String, optional: false },
          h5IsPullMini: { type: String, optional: false },
          h5PayType: { type: String, optional: false },
          serviceJumpUrl: { type: String, optional: false }
        };
      },
      name: "TenantInfoData"
    };
  }
  constructor(options, metadata = TenantInfoData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeTip = this.__props__.rechargeTip;
    this.servicePhone = this.__props__.servicePhone;
    this.serviceQrcode = this.__props__.serviceQrcode;
    this.wxAuditHide = this.__props__.wxAuditHide;
    this.wxAuditHideNo = this.__props__.wxAuditHideNo;
    this.wxGetPhoneLogin = this.__props__.wxGetPhoneLogin;
    this.wxMiniPayType = this.__props__.wxMiniPayType;
    this.wxPayClass = this.__props__.wxPayClass;
    this.h5IsPullMini = this.__props__.h5IsPullMini;
    this.h5PayType = this.__props__.h5PayType;
    this.serviceJumpUrl = this.__props__.serviceJumpUrl;
    delete this.__props__;
  }
}
class QueryCardListParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false },
          status: { type: String, optional: false },
          isSort: { type: Boolean, optional: false }
        };
      },
      name: "QueryCardListParams"
    };
  }
  constructor(options, metadata = QueryCardListParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    this.status = this.__props__.status;
    this.isSort = this.__props__.isSort;
    delete this.__props__;
  }
}
class CardListSumData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          all: { type: Number, optional: false },
          inUse: { type: Number, optional: false },
          inNotUse: { type: Number, optional: false }
        };
      },
      name: "CardListSumData"
    };
  }
  constructor(options, metadata = CardListSumData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.all = this.__props__.all;
    this.inUse = this.__props__.inUse;
    this.inNotUse = this.__props__.inNotUse;
    delete this.__props__;
  }
}
class CardItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          cardNumber: { type: String, optional: false },
          iccid: { type: String, optional: false },
          tag: { type: String, optional: false },
          status: { type: String, optional: false },
          currentPackage: { type: String, optional: false },
          expireDate: { type: String, optional: false },
          usedTraffic: { type: String, optional: false },
          totalTraffic: { type: String, optional: false },
          currentCycle: { type: String, optional: false }
        };
      },
      name: "CardItem"
    };
  }
  constructor(options, metadata = CardItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.cardNumber = this.__props__.cardNumber;
    this.iccid = this.__props__.iccid;
    this.tag = this.__props__.tag;
    this.status = this.__props__.status;
    this.currentPackage = this.__props__.currentPackage;
    this.expireDate = this.__props__.expireDate;
    this.usedTraffic = this.__props__.usedTraffic;
    this.totalTraffic = this.__props__.totalTraffic;
    this.currentCycle = this.__props__.currentCycle;
    delete this.__props__;
  }
}
exports.CardItem = CardItem;
exports.CardListSumData = CardListSumData;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/types.js.map
