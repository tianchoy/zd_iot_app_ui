"use strict";
const common_vendor = require("../../../../../common/vendor.js");
require("./useChildren.js");
class UseParent extends common_vendor.UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          childIndex: { type: "Unknown", optional: false }
        };
      },
      name: "UseParent"
    };
  }
  constructor(options, metadata = UseParent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = common_vendor.UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.childIndex = this.__props__.childIndex;
    delete this.__props__;
  }
}
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/rice-ui/libs/use/useRelation/useParent.js.map
