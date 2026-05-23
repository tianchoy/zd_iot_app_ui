"use strict";
exports.HttpStatus = void 0;
(function(HttpStatus) {
  HttpStatus[HttpStatus["SUCCESS"] = 200] = "SUCCESS";
  HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
  HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
  HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpStatus[HttpStatus["MOVED_PERM"] = 301] = "MOVED_PERM";
  HttpStatus[HttpStatus["SEE_OTHER"] = 303] = "SEE_OTHER";
  HttpStatus[HttpStatus["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HttpStatus[HttpStatus["PARAM_ERROR"] = 400] = "PARAM_ERROR";
  HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpStatus[HttpStatus["BAD_METHOD"] = 405] = "BAD_METHOD";
  HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
  HttpStatus[HttpStatus["UNSUPPORTED_TYPE"] = 415] = "UNSUPPORTED_TYPE";
  HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
  HttpStatus[HttpStatus["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HttpStatus[HttpStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HttpStatus[HttpStatus["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HttpStatus[HttpStatus["UNKNOWN_ERROR"] = 520] = "UNKNOWN_ERROR";
  HttpStatus[HttpStatus["SERVICE_ERROR"] = 521] = "SERVICE_ERROR";
  HttpStatus[HttpStatus["DATABASE_ERROR"] = 522] = "DATABASE_ERROR";
  HttpStatus[HttpStatus["WARN"] = 601] = "WARN";
})(exports.HttpStatus || (exports.HttpStatus = {}));
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
