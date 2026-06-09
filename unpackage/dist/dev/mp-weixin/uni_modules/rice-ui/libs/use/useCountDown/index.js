"use strict";
const common_vendor = require("../../../../../common/vendor.js");
class CurrentTime extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          days: { type: Number, optional: false },
          hours: { type: Number, optional: false },
          minutes: { type: Number, optional: false },
          seconds: { type: Number, optional: false },
          milliseconds: { type: Number, optional: false },
          remainTime: { type: Number, optional: false }
        };
      },
      name: "CurrentTime"
    };
  }
  constructor(options, metadata = CurrentTime.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.days = this.__props__.days;
    this.hours = this.__props__.hours;
    this.minutes = this.__props__.minutes;
    this.seconds = this.__props__.seconds;
    this.milliseconds = this.__props__.milliseconds;
    this.remainTime = this.__props__.remainTime;
    delete this.__props__;
  }
}
class UseCountDownOptions extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          time: { type: Number, optional: false },
          millisecond: { type: Boolean, optional: true },
          onChange: { type: "Unknown", optional: true },
          onFinish: { type: "Unknown", optional: true }
        };
      },
      name: "UseCountDownOptions"
    };
  }
  constructor(options, metadata = UseCountDownOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.time = this.__props__.time;
    this.millisecond = this.__props__.millisecond;
    this.onChange = this.__props__.onChange;
    this.onFinish = this.__props__.onFinish;
    delete this.__props__;
  }
}
class UseCountDownResult extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          current: { type: "Unknown", optional: false },
          start: { type: "Unknown", optional: false },
          pause: { type: "Unknown", optional: false },
          reset: { type: "Unknown", optional: false }
        };
      },
      name: "UseCountDownResult"
    };
  }
  constructor(options, metadata = UseCountDownResult.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.current = this.__props__.current;
    this.start = this.__props__.start;
    this.pause = this.__props__.pause;
    this.reset = this.__props__.reset;
    delete this.__props__;
  }
}
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/rice-ui/libs/use/useCountDown/index.js.map
