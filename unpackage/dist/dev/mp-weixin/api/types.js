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
          rechargeNo: { type: String, optional: true },
          status: { type: String, optional: false },
          isSort: { type: Boolean, optional: true }
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
class QueryCardListData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          list: { type: common_vendor.UTS.UTSType.withGenerics(Array, [CardItem]), optional: false }
        };
      },
      name: "QueryCardListData"
    };
  }
  constructor(options, metadata = QueryCardListData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.list = this.__props__.list;
    delete this.__props__;
  }
}
class PkgXcxVo extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          pkgId: { type: String, optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          validityPeriod: { type: String, optional: true },
          pkgFlow: { type: String, optional: true },
          crossedOutPrice: { type: String, optional: false },
          sellingPrice: { type: String, optional: false }
        };
      },
      name: "PkgXcxVo"
    };
  }
  constructor(options, metadata = PkgXcxVo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.pkgId = this.__props__.pkgId;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.validityPeriod = this.__props__.validityPeriod;
    this.pkgFlow = this.__props__.pkgFlow;
    this.crossedOutPrice = this.__props__.crossedOutPrice;
    this.sellingPrice = this.__props__.sellingPrice;
    delete this.__props__;
  }
}
class RechargeData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false },
          pkgName: { type: String, optional: false },
          status: { type: String, optional: false },
          statusStr: { type: String, optional: false },
          effectiveTime: { type: String, optional: false },
          expirationTime: { type: String, optional: true },
          pkgFlow: { type: String, optional: true },
          usedFlow: { type: String, optional: true },
          unUsedFlow: { type: String, optional: true },
          usedPeriod: { type: String, optional: true },
          totalPeriod: { type: String, optional: true },
          currentPeriodStartTime: { type: String, optional: true },
          currentPeriodEndTime: { type: String, optional: true },
          isBind: { type: Boolean, optional: false },
          pkgXcxVos: { type: common_vendor.UTS.UTSType.withGenerics(Array, [PkgXcxVo]), optional: false }
        };
      },
      name: "RechargeData"
    };
  }
  constructor(options, metadata = RechargeData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    this.pkgName = this.__props__.pkgName;
    this.status = this.__props__.status;
    this.statusStr = this.__props__.statusStr;
    this.effectiveTime = this.__props__.effectiveTime;
    this.expirationTime = this.__props__.expirationTime;
    this.pkgFlow = this.__props__.pkgFlow;
    this.usedFlow = this.__props__.usedFlow;
    this.unUsedFlow = this.__props__.unUsedFlow;
    this.usedPeriod = this.__props__.usedPeriod;
    this.totalPeriod = this.__props__.totalPeriod;
    this.currentPeriodStartTime = this.__props__.currentPeriodStartTime;
    this.currentPeriodEndTime = this.__props__.currentPeriodEndTime;
    this.isBind = this.__props__.isBind;
    this.pkgXcxVos = this.__props__.pkgXcxVos;
    delete this.__props__;
  }
}
class CardDetail extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: RechargeData, optional: false }
        };
      },
      name: "CardDetail"
    };
  }
  constructor(options, metadata = CardDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class BindCard extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "BindCard"
    };
  }
  constructor(options, metadata = BindCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
class PkgInfoListParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "PkgInfoListParams"
    };
  }
  constructor(options, metadata = PkgInfoListParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class PackageItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          status: { type: "Unknown", optional: false },
          statusText: { type: String, optional: false },
          tagType: { type: String, optional: false },
          startTime: { type: String, optional: false },
          totalFlow: { type: String, optional: false },
          usedFlow: { type: String, optional: false },
          leftFlow: { type: String, optional: false }
        };
      },
      name: "PackageItem"
    };
  }
  constructor(options, metadata = PackageItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.status = this.__props__.status;
    this.statusText = this.__props__.statusText;
    this.tagType = this.__props__.tagType;
    this.startTime = this.__props__.startTime;
    this.totalFlow = this.__props__.totalFlow;
    this.usedFlow = this.__props__.usedFlow;
    this.leftFlow = this.__props__.leftFlow;
    delete this.__props__;
  }
}
exports.BindCard = BindCard;
exports.CardDetail = CardDetail;
exports.CardItem = CardItem;
exports.CardListSumData = CardListSumData;
exports.PackageItem = PackageItem;
exports.PkgInfoListParams = PkgInfoListParams;
exports.QueryCardListParams = QueryCardListParams;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/types.js.map
