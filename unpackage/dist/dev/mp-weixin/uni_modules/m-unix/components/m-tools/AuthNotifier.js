"use strict";
const common_vendor = require("../../../../common/vendor.js");
const authTrigger = common_vendor.ref(0);
function notifyAuthChange() {
  authTrigger.value++;
}
exports.authTrigger = authTrigger;
exports.notifyAuthChange = notifyAuthChange;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/AuthNotifier.js.map
