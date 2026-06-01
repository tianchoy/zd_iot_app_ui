"use strict";
const common_vendor = require("../common/vendor.js");
const common_config = require("../common/config.js");
const uni_modules_mUnix_components_mTools_ProjectConfig = require("../uni_modules/m-unix/components/m-tools/ProjectConfig.js");
uni_modules_mUnix_components_mTools_ProjectConfig.injectMUnixHostProjectConfig(common_config.config);
const injectedConfig = uni_modules_mUnix_components_mTools_ProjectConfig.getHostProjectConfig();
common_vendor.index.__f__("log", "at utils/inject-m-unix.uts:10", "配置注入成功:", injectedConfig.baseUrl);
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/inject-m-unix.js.map
