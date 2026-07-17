"use strict";
const common_vendor = require("../common/vendor.js");
let LoginData$1 = class LoginData extends common_vendor.UTS.UTSType {
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
};
let CountryData$1 = class CountryData extends common_vendor.UTS.UTSType {
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
};
let TenantInfoData$1 = class TenantInfoData extends common_vendor.UTS.UTSType {
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
};
let QueryCardListParams$1 = class QueryCardListParams extends common_vendor.UTS.UTSType {
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
};
let CardListSumData$1 = class CardListSumData extends common_vendor.UTS.UTSType {
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
};
let CardItem$1 = class CardItem extends common_vendor.UTS.UTSType {
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
          currentCycle: { type: String, optional: false },
          usedPeriod: { type: String, optional: false },
          totalPeriod: { type: String, optional: false }
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
    this.usedPeriod = this.__props__.usedPeriod;
    this.totalPeriod = this.__props__.totalPeriod;
    delete this.__props__;
  }
};
let QueryCardListData$1 = class QueryCardListData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          list: { type: common_vendor.UTS.UTSType.withGenerics(Array, [CardItem$1]), optional: false }
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
};
let PkgXcxVo$1 = class PkgXcxVo extends common_vendor.UTS.UTSType {
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
          sellingPrice: { type: String, optional: false },
          objectMap: { type: objectMapType$1, optional: false }
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
    this.objectMap = this.__props__.objectMap;
    delete this.__props__;
  }
};
let objectMapType$1 = class objectMapType extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeTip: { type: String, optional: false },
          servicePhone: { type: String, optional: false },
          serviceQrcode: { type: String, optional: false }
        };
      },
      name: "objectMapType"
    };
  }
  constructor(options, metadata = objectMapType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeTip = this.__props__.rechargeTip;
    this.servicePhone = this.__props__.servicePhone;
    this.serviceQrcode = this.__props__.serviceQrcode;
    delete this.__props__;
  }
};
let RechargeData$1 = class RechargeData extends common_vendor.UTS.UTSType {
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
          pkgXcxVos: { type: common_vendor.UTS.UTSType.withGenerics(Array, [PkgXcxVo$1]), optional: false }
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
};
let CardDetail$1 = class CardDetail extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: RechargeData$1, optional: false }
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
};
let BindCard$1 = class BindCard extends common_vendor.UTS.UTSType {
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
};
let PkgInfoListParams$1 = class PkgInfoListParams extends common_vendor.UTS.UTSType {
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
};
let PkgInfoItem$1 = class PkgInfoItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          name: { type: String, optional: false },
          status: { type: String, optional: false },
          statusText: { type: String, optional: false },
          tagType: { type: String, optional: false },
          startTime: { type: String, optional: false },
          endTime: { type: String, optional: false },
          totalFlow: { type: String, optional: false },
          usedFlow: { type: String, optional: false },
          leftFlow: { type: String, optional: false }
        };
      },
      name: "PkgInfoItem"
    };
  }
  constructor(options, metadata = PkgInfoItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.name = this.__props__.name;
    this.status = this.__props__.status;
    this.statusText = this.__props__.statusText;
    this.tagType = this.__props__.tagType;
    this.startTime = this.__props__.startTime;
    this.endTime = this.__props__.endTime;
    this.totalFlow = this.__props__.totalFlow;
    this.usedFlow = this.__props__.usedFlow;
    this.leftFlow = this.__props__.leftFlow;
    delete this.__props__;
  }
};
let QueryOrderListXcxParams$1 = class QueryOrderListXcxParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "QueryOrderListXcxParams"
    };
  }
  constructor(options, metadata = QueryOrderListXcxParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
};
let QueryOrderListXcxData$1 = class QueryOrderListXcxData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          rows: { type: common_vendor.UTS.UTSType.withGenerics(Array, [OrderListXcxItem$1]), optional: false },
          total: { type: Number, optional: false }
        };
      },
      name: "QueryOrderListXcxData"
    };
  }
  constructor(options, metadata = QueryOrderListXcxData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.rows = this.__props__.rows;
    this.total = this.__props__.total;
    delete this.__props__;
  }
};
let OrderListXcxItem$1 = class OrderListXcxItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          orderNo: { type: String, optional: false },
          rechargeNo: { type: String, optional: false },
          iccid: { type: String, optional: true },
          pkgName: { type: String, optional: false },
          createTime: { type: String, optional: false },
          status: { type: String, optional: false },
          payCurrencyAmount: { type: String, optional: false }
        };
      },
      name: "OrderListXcxItem"
    };
  }
  constructor(options, metadata = OrderListXcxItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.orderNo = this.__props__.orderNo;
    this.rechargeNo = this.__props__.rechargeNo;
    this.iccid = this.__props__.iccid;
    this.pkgName = this.__props__.pkgName;
    this.createTime = this.__props__.createTime;
    this.status = this.__props__.status;
    this.payCurrencyAmount = this.__props__.payCurrencyAmount;
    delete this.__props__;
  }
};
let Refund$1 = class Refund extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          property1: { type: String, optional: false },
          property2: { type: String, optional: false }
        };
      },
      name: "Refund"
    };
  }
  constructor(options, metadata = Refund.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.property1 = this.__props__.property1;
    this.property2 = this.__props__.property2;
    delete this.__props__;
  }
};
let QueryOrderDetailXcxData$1 = class QueryOrderDetailXcxData extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          orderNo: { type: String, optional: false },
          rechargeNo: { type: String, optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          pkgFlow: { type: Number, optional: false },
          validityPeriod: { type: String, optional: false },
          startDate: { type: String, optional: false },
          endDate: { type: String, optional: false },
          status: { type: String, optional: false },
          pkgRefundStatus: { type: String, optional: false },
          orderAmount: { type: Number, optional: false },
          payAmount: { type: Number, optional: false },
          orderCreateTime: { type: String, optional: false },
          payTime: { type: String, optional: false },
          refunds: { type: common_vendor.UTS.UTSType.withGenerics(Array, [Refund$1]), optional: false },
          cancelTime: { type: String, optional: false },
          payFailTime: { type: String, optional: false },
          payFailReason: { type: String, optional: false },
          usageInstructions: { type: String, optional: false },
          currentSeconds: { type: Number, optional: false }
        };
      },
      name: "QueryOrderDetailXcxData"
    };
  }
  constructor(options, metadata = QueryOrderDetailXcxData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.orderNo = this.__props__.orderNo;
    this.rechargeNo = this.__props__.rechargeNo;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.pkgFlow = this.__props__.pkgFlow;
    this.validityPeriod = this.__props__.validityPeriod;
    this.startDate = this.__props__.startDate;
    this.endDate = this.__props__.endDate;
    this.status = this.__props__.status;
    this.pkgRefundStatus = this.__props__.pkgRefundStatus;
    this.orderAmount = this.__props__.orderAmount;
    this.payAmount = this.__props__.payAmount;
    this.orderCreateTime = this.__props__.orderCreateTime;
    this.payTime = this.__props__.payTime;
    this.refunds = this.__props__.refunds;
    this.cancelTime = this.__props__.cancelTime;
    this.payFailTime = this.__props__.payFailTime;
    this.payFailReason = this.__props__.payFailReason;
    this.usageInstructions = this.__props__.usageInstructions;
    this.currentSeconds = this.__props__.currentSeconds;
    delete this.__props__;
  }
};
let QueryOrderSuccessParams$1 = class QueryOrderSuccessParams extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          orderNo: { type: String, optional: false },
          validityPeriod: { type: String, optional: false },
          availableRegions: { type: common_vendor.UTS.UTSType.withGenerics(Array, [String]), optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          msisdn: { type: String, optional: false },
          iccid: { type: String, optional: false },
          payTypeVos: { type: common_vendor.UTS.UTSType.withGenerics(Array, ["Any"]), optional: false },
          currencyCode: { type: String, optional: false },
          payAmount: { type: String, optional: false },
          createTime: { type: String, optional: false },
          payTime: { type: String, optional: false },
          status: { type: String, optional: false },
          payCurrencyAmount: { type: String, optional: false },
          symbol: { type: String, optional: false },
          signPosition: { type: String, optional: false },
          payType: { type: String, optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "QueryOrderSuccessParams"
    };
  }
  constructor(options, metadata = QueryOrderSuccessParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.orderNo = this.__props__.orderNo;
    this.validityPeriod = this.__props__.validityPeriod;
    this.availableRegions = this.__props__.availableRegions;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.msisdn = this.__props__.msisdn;
    this.iccid = this.__props__.iccid;
    this.payTypeVos = this.__props__.payTypeVos;
    this.currencyCode = this.__props__.currencyCode;
    this.payAmount = this.__props__.payAmount;
    this.createTime = this.__props__.createTime;
    this.payTime = this.__props__.payTime;
    this.status = this.__props__.status;
    this.payCurrencyAmount = this.__props__.payCurrencyAmount;
    this.symbol = this.__props__.symbol;
    this.signPosition = this.__props__.signPosition;
    this.payType = this.__props__.payType;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
};
let FeedbackItem$1 = class FeedbackItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          feedbackContent: { type: String, optional: false },
          status: { type: String, optional: false },
          createTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          orderNo: { type: String, optional: false },
          packageName: { type: String, optional: false },
          replyContent: { type: String, optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "FeedbackItem"
    };
  }
  constructor(options, metadata = FeedbackItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.feedbackContent = this.__props__.feedbackContent;
    this.status = this.__props__.status;
    this.createTime = this.__props__.createTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.orderNo = this.__props__.orderNo;
    this.packageName = this.__props__.packageName;
    this.replyContent = this.__props__.replyContent;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
};
let FeedbackMessageItem$1 = class FeedbackMessageItem extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sendType: { type: String, optional: false },
          time: { type: String, optional: false },
          replyContent: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false }
        };
      },
      name: "FeedbackMessageItem"
    };
  }
  constructor(options, metadata = FeedbackMessageItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sendType = this.__props__.sendType;
    this.time = this.__props__.time;
    this.replyContent = this.__props__.replyContent;
    this.imgOssUrl = this.__props__.imgOssUrl;
    delete this.__props__;
  }
};
let FeedbackDetail$1 = class FeedbackDetail extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          status: { type: String, optional: false },
          subTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          feedbackContentList: { type: common_vendor.UTS.UTSType.withGenerics(Array, [FeedbackMessageItem$1]), optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "FeedbackDetail"
    };
  }
  constructor(options, metadata = FeedbackDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.status = this.__props__.status;
    this.subTime = this.__props__.subTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.feedbackContentList = this.__props__.feedbackContentList;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
};
class LoginData2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = LoginData2.get$UTSMetadata$(), isJSONParse = false) {
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
class CountryData2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = CountryData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.fullName = this.__props__.fullName;
    this.letterCode = this.__props__.letterCode;
    delete this.__props__;
  }
}
class TenantInfoData2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = TenantInfoData2.get$UTSMetadata$(), isJSONParse = false) {
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
class QueryCardListParams2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = QueryCardListParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    this.status = this.__props__.status;
    this.isSort = this.__props__.isSort;
    delete this.__props__;
  }
}
class CardListSumData2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = CardListSumData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.all = this.__props__.all;
    this.inUse = this.__props__.inUse;
    this.inNotUse = this.__props__.inNotUse;
    delete this.__props__;
  }
}
class CardItem2 extends common_vendor.UTS.UTSType {
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
          currentCycle: { type: String, optional: false },
          usedPeriod: { type: String, optional: false },
          totalPeriod: { type: String, optional: false }
        };
      },
      name: "CardItem"
    };
  }
  constructor(options, metadata = CardItem2.get$UTSMetadata$(), isJSONParse = false) {
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
    this.usedPeriod = this.__props__.usedPeriod;
    this.totalPeriod = this.__props__.totalPeriod;
    delete this.__props__;
  }
}
class QueryCardListData2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          list: { type: common_vendor.UTS.UTSType.withGenerics(Array, [CardItem2]), optional: false }
        };
      },
      name: "QueryCardListData"
    };
  }
  constructor(options, metadata = QueryCardListData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.list = this.__props__.list;
    delete this.__props__;
  }
}
class PkgXcxVo2 extends common_vendor.UTS.UTSType {
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
          sellingPrice: { type: String, optional: false },
          objectMap: { type: objectMapType2, optional: false }
        };
      },
      name: "PkgXcxVo"
    };
  }
  constructor(options, metadata = PkgXcxVo2.get$UTSMetadata$(), isJSONParse = false) {
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
    this.objectMap = this.__props__.objectMap;
    delete this.__props__;
  }
}
class objectMapType2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeTip: { type: String, optional: false },
          servicePhone: { type: String, optional: false },
          serviceQrcode: { type: String, optional: false }
        };
      },
      name: "objectMapType"
    };
  }
  constructor(options, metadata = objectMapType2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeTip = this.__props__.rechargeTip;
    this.servicePhone = this.__props__.servicePhone;
    this.serviceQrcode = this.__props__.serviceQrcode;
    delete this.__props__;
  }
}
class RechargeData2 extends common_vendor.UTS.UTSType {
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
          pkgXcxVos: { type: common_vendor.UTS.UTSType.withGenerics(Array, [PkgXcxVo2]), optional: false }
        };
      },
      name: "RechargeData"
    };
  }
  constructor(options, metadata = RechargeData2.get$UTSMetadata$(), isJSONParse = false) {
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
class CardDetail2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          data: { type: RechargeData2, optional: false }
        };
      },
      name: "CardDetail"
    };
  }
  constructor(options, metadata = CardDetail2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class BindCard2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = BindCard2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
class PkgInfoListParams2 extends common_vendor.UTS.UTSType {
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
  constructor(options, metadata = PkgInfoListParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class PkgInfoItem2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          name: { type: String, optional: false },
          status: { type: String, optional: false },
          statusText: { type: String, optional: false },
          tagType: { type: String, optional: false },
          startTime: { type: String, optional: false },
          endTime: { type: String, optional: false },
          totalFlow: { type: String, optional: false },
          usedFlow: { type: String, optional: false },
          leftFlow: { type: String, optional: false }
        };
      },
      name: "PkgInfoItem"
    };
  }
  constructor(options, metadata = PkgInfoItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.name = this.__props__.name;
    this.status = this.__props__.status;
    this.statusText = this.__props__.statusText;
    this.tagType = this.__props__.tagType;
    this.startTime = this.__props__.startTime;
    this.endTime = this.__props__.endTime;
    this.totalFlow = this.__props__.totalFlow;
    this.usedFlow = this.__props__.usedFlow;
    this.leftFlow = this.__props__.leftFlow;
    delete this.__props__;
  }
}
class QueryOrderListXcxParams2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "QueryOrderListXcxParams"
    };
  }
  constructor(options, metadata = QueryOrderListXcxParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
class QueryOrderListXcxData2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          code: { type: Number, optional: false },
          msg: { type: String, optional: false },
          rows: { type: common_vendor.UTS.UTSType.withGenerics(Array, [OrderListXcxItem2]), optional: false },
          total: { type: Number, optional: false }
        };
      },
      name: "QueryOrderListXcxData"
    };
  }
  constructor(options, metadata = QueryOrderListXcxData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.code = this.__props__.code;
    this.msg = this.__props__.msg;
    this.rows = this.__props__.rows;
    this.total = this.__props__.total;
    delete this.__props__;
  }
}
class OrderListXcxItem2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          orderNo: { type: String, optional: false },
          rechargeNo: { type: String, optional: false },
          iccid: { type: String, optional: true },
          pkgName: { type: String, optional: false },
          createTime: { type: String, optional: false },
          status: { type: String, optional: false },
          payCurrencyAmount: { type: String, optional: false }
        };
      },
      name: "OrderListXcxItem"
    };
  }
  constructor(options, metadata = OrderListXcxItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.orderNo = this.__props__.orderNo;
    this.rechargeNo = this.__props__.rechargeNo;
    this.iccid = this.__props__.iccid;
    this.pkgName = this.__props__.pkgName;
    this.createTime = this.__props__.createTime;
    this.status = this.__props__.status;
    this.payCurrencyAmount = this.__props__.payCurrencyAmount;
    delete this.__props__;
  }
}
class Refund2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          property1: { type: String, optional: false },
          property2: { type: String, optional: false }
        };
      },
      name: "Refund"
    };
  }
  constructor(options, metadata = Refund2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.property1 = this.__props__.property1;
    this.property2 = this.__props__.property2;
    delete this.__props__;
  }
}
class QueryOrderDetailXcxData2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          orderNo: { type: String, optional: false },
          rechargeNo: { type: String, optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          pkgFlow: { type: Number, optional: false },
          validityPeriod: { type: String, optional: false },
          startDate: { type: String, optional: false },
          endDate: { type: String, optional: false },
          status: { type: String, optional: false },
          pkgRefundStatus: { type: String, optional: false },
          orderAmount: { type: Number, optional: false },
          payAmount: { type: Number, optional: false },
          orderCreateTime: { type: String, optional: false },
          payTime: { type: String, optional: false },
          refunds: { type: common_vendor.UTS.UTSType.withGenerics(Array, [Refund2]), optional: false },
          cancelTime: { type: String, optional: false },
          payFailTime: { type: String, optional: false },
          payFailReason: { type: String, optional: false },
          usageInstructions: { type: String, optional: false },
          currentSeconds: { type: Number, optional: false }
        };
      },
      name: "QueryOrderDetailXcxData"
    };
  }
  constructor(options, metadata = QueryOrderDetailXcxData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.orderNo = this.__props__.orderNo;
    this.rechargeNo = this.__props__.rechargeNo;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.pkgFlow = this.__props__.pkgFlow;
    this.validityPeriod = this.__props__.validityPeriod;
    this.startDate = this.__props__.startDate;
    this.endDate = this.__props__.endDate;
    this.status = this.__props__.status;
    this.pkgRefundStatus = this.__props__.pkgRefundStatus;
    this.orderAmount = this.__props__.orderAmount;
    this.payAmount = this.__props__.payAmount;
    this.orderCreateTime = this.__props__.orderCreateTime;
    this.payTime = this.__props__.payTime;
    this.refunds = this.__props__.refunds;
    this.cancelTime = this.__props__.cancelTime;
    this.payFailTime = this.__props__.payFailTime;
    this.payFailReason = this.__props__.payFailReason;
    this.usageInstructions = this.__props__.usageInstructions;
    this.currentSeconds = this.__props__.currentSeconds;
    delete this.__props__;
  }
}
class QueryOrderSuccessParams2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          orderNo: { type: String, optional: false },
          validityPeriod: { type: String, optional: false },
          availableRegions: { type: common_vendor.UTS.UTSType.withGenerics(Array, [String]), optional: false },
          pkgName: { type: String, optional: false },
          pkgCategory: { type: String, optional: false },
          pkgType: { type: String, optional: false },
          msisdn: { type: String, optional: false },
          iccid: { type: String, optional: false },
          payTypeVos: { type: common_vendor.UTS.UTSType.withGenerics(Array, ["Any"]), optional: false },
          currencyCode: { type: String, optional: false },
          payAmount: { type: String, optional: false },
          createTime: { type: String, optional: false },
          payTime: { type: String, optional: false },
          status: { type: String, optional: false },
          payCurrencyAmount: { type: String, optional: false },
          symbol: { type: String, optional: false },
          signPosition: { type: String, optional: false },
          payType: { type: String, optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "QueryOrderSuccessParams"
    };
  }
  constructor(options, metadata = QueryOrderSuccessParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.orderNo = this.__props__.orderNo;
    this.validityPeriod = this.__props__.validityPeriod;
    this.availableRegions = this.__props__.availableRegions;
    this.pkgName = this.__props__.pkgName;
    this.pkgCategory = this.__props__.pkgCategory;
    this.pkgType = this.__props__.pkgType;
    this.msisdn = this.__props__.msisdn;
    this.iccid = this.__props__.iccid;
    this.payTypeVos = this.__props__.payTypeVos;
    this.currencyCode = this.__props__.currencyCode;
    this.payAmount = this.__props__.payAmount;
    this.createTime = this.__props__.createTime;
    this.payTime = this.__props__.payTime;
    this.status = this.__props__.status;
    this.payCurrencyAmount = this.__props__.payCurrencyAmount;
    this.symbol = this.__props__.symbol;
    this.signPosition = this.__props__.signPosition;
    this.payType = this.__props__.payType;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
class FeedbackItem2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          feedbackContent: { type: String, optional: false },
          status: { type: String, optional: false },
          createTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          orderNo: { type: String, optional: false },
          packageName: { type: String, optional: false },
          replyContent: { type: String, optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "FeedbackItem"
    };
  }
  constructor(options, metadata = FeedbackItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.feedbackContent = this.__props__.feedbackContent;
    this.status = this.__props__.status;
    this.createTime = this.__props__.createTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.orderNo = this.__props__.orderNo;
    this.packageName = this.__props__.packageName;
    this.replyContent = this.__props__.replyContent;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
class FeedbackMessageItem2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sendType: { type: String, optional: false },
          time: { type: String, optional: false },
          replyContent: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false }
        };
      },
      name: "FeedbackMessageItem"
    };
  }
  constructor(options, metadata = FeedbackMessageItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sendType = this.__props__.sendType;
    this.time = this.__props__.time;
    this.replyContent = this.__props__.replyContent;
    this.imgOssUrl = this.__props__.imgOssUrl;
    delete this.__props__;
  }
}
class FeedbackDetail2 extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          feedbackNo: { type: String, optional: false },
          feedbackType: { type: String, optional: false },
          status: { type: String, optional: false },
          subTime: { type: String, optional: false },
          userPhone: { type: String, optional: false },
          imgOssUrl: { type: String, optional: false },
          feedbackContentList: { type: common_vendor.UTS.UTSType.withGenerics(Array, [FeedbackMessageItem2]), optional: false },
          rechargeNo: { type: String, optional: false }
        };
      },
      name: "FeedbackDetail"
    };
  }
  constructor(options, metadata = FeedbackDetail2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.feedbackNo = this.__props__.feedbackNo;
    this.feedbackType = this.__props__.feedbackType;
    this.status = this.__props__.status;
    this.subTime = this.__props__.subTime;
    this.userPhone = this.__props__.userPhone;
    this.imgOssUrl = this.__props__.imgOssUrl;
    this.feedbackContentList = this.__props__.feedbackContentList;
    this.rechargeNo = this.__props__.rechargeNo;
    delete this.__props__;
  }
}
exports.BindCard = BindCard2;
exports.CardListSumData = CardListSumData2;
exports.PkgInfoListParams = PkgInfoListParams$1;
exports.QueryCardListParams = QueryCardListParams$1;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/types.js.map
