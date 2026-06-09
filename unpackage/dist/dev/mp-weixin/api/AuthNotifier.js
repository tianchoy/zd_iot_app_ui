"use strict";
const common_vendor = require("../common/vendor.js");
const authTrigger = common_vendor.ref(0);
function notifyAuthChange() {
  authTrigger.value++;
}
exports.notifyAuthChange = notifyAuthChange;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/AuthNotifier.js.map
