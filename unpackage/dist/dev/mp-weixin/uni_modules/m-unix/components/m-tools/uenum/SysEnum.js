"use strict";
var HttpStatus;
(function(HttpStatus2) {
  HttpStatus2[HttpStatus2["SUCCESS"] = 200] = "SUCCESS";
  HttpStatus2[HttpStatus2["CREATED"] = 201] = "CREATED";
  HttpStatus2[HttpStatus2["ACCEPTED"] = 202] = "ACCEPTED";
  HttpStatus2[HttpStatus2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpStatus2[HttpStatus2["MOVED_PERM"] = 301] = "MOVED_PERM";
  HttpStatus2[HttpStatus2["SEE_OTHER"] = 303] = "SEE_OTHER";
  HttpStatus2[HttpStatus2["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HttpStatus2[HttpStatus2["PARAM_ERROR"] = 400] = "PARAM_ERROR";
  HttpStatus2[HttpStatus2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatus2[HttpStatus2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatus2[HttpStatus2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpStatus2[HttpStatus2["BAD_METHOD"] = 405] = "BAD_METHOD";
  HttpStatus2[HttpStatus2["CONFLICT"] = 409] = "CONFLICT";
  HttpStatus2[HttpStatus2["UNSUPPORTED_TYPE"] = 415] = "UNSUPPORTED_TYPE";
  HttpStatus2[HttpStatus2["SERVER_ERROR"] = 500] = "SERVER_ERROR";
  HttpStatus2[HttpStatus2["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HttpStatus2[HttpStatus2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HttpStatus2[HttpStatus2["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HttpStatus2[HttpStatus2["UNKNOWN_ERROR"] = 520] = "UNKNOWN_ERROR";
  HttpStatus2[HttpStatus2["SERVICE_ERROR"] = 521] = "SERVICE_ERROR";
  HttpStatus2[HttpStatus2["DATABASE_ERROR"] = 522] = "DATABASE_ERROR";
  HttpStatus2[HttpStatus2["WARN"] = 601] = "WARN";
})(HttpStatus || (HttpStatus = {}));
var HttpEnum;
(function(HttpEnum2) {
  HttpEnum2["GET"] = "GET";
  HttpEnum2["POST"] = "POST";
  HttpEnum2["PUT"] = "PUT";
  HttpEnum2["DELETE"] = "DELETE";
})(HttpEnum || (HttpEnum = {}));
exports.RunType = void 0;
(function(RunType) {
  RunType["Android"] = "android";
  RunType["IOS"] = "ios";
  RunType["HarmonyOs"] = "harmonyos";
  RunType["WxAppl"] = "devtools";
  RunType["Windows"] = "windows";
})(exports.RunType || (exports.RunType = {}));
exports.StorageEnum = void 0;
(function(StorageEnum) {
  StorageEnum["MEMBER_INFO_KEY"] = "memberInfo";
  StorageEnum["TOKEN_KEY"] = "token";
})(exports.StorageEnum || (exports.StorageEnum = {}));
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/m-unix/components/m-tools/uenum/SysEnum.js.map
