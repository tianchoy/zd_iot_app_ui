"use strict";
const common_vendor = require("../../../../common/vendor.js");
class InfoType extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          lunarY: { type: Number, optional: false },
          lunarM: { type: Number, optional: false },
          lunarD: { type: Number, optional: false },
          isLeap: { type: Boolean, optional: false }
        };
      },
      name: "InfoType"
    };
  }
  constructor(options, metadata = InfoType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.lunarY = this.__props__.lunarY;
    this.lunarM = this.__props__.lunarM;
    this.lunarD = this.__props__.lunarD;
    this.isLeap = this.__props__.isLeap;
    delete this.__props__;
  }
}
class LunarInfoType extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          lYear: { type: Number, optional: false },
          lMonth: { type: Number, optional: false },
          lDay: { type: Number, optional: false },
          IMonthCn: { type: String, optional: false },
          IDayCn: { type: String, optional: false },
          cYear: { type: Number, optional: false },
          cMonth: { type: Number, optional: false },
          cDay: { type: Number, optional: false },
          gzYear: { type: String, optional: true },
          gzMonth: { type: String, optional: true },
          gzDay: { type: String, optional: true },
          isToday: { type: Boolean, optional: false },
          isLeap: { type: Boolean, optional: false },
          nWeek: { type: Number, optional: true },
          ncWeek: { type: String, optional: true },
          isTerm: { type: Boolean, optional: true },
          Term: { type: String, optional: true },
          astro: { type: String, optional: true }
        };
      },
      name: "LunarInfoType"
    };
  }
  constructor(options, metadata = LunarInfoType.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.lYear = this.__props__.lYear;
    this.lMonth = this.__props__.lMonth;
    this.lDay = this.__props__.lDay;
    this.IMonthCn = this.__props__.IMonthCn;
    this.IDayCn = this.__props__.IDayCn;
    this.cYear = this.__props__.cYear;
    this.cMonth = this.__props__.cMonth;
    this.cDay = this.__props__.cDay;
    this.gzYear = this.__props__.gzYear;
    this.gzMonth = this.__props__.gzMonth;
    this.gzDay = this.__props__.gzDay;
    this.isToday = this.__props__.isToday;
    this.isLeap = this.__props__.isLeap;
    this.nWeek = this.__props__.nWeek;
    this.ncWeek = this.__props__.ncWeek;
    this.isTerm = this.__props__.isTerm;
    this.Term = this.__props__.Term;
    this.astro = this.__props__.astro;
    delete this.__props__;
  }
}
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/rice-ui/components/rice-calendar/lunar.js.map
