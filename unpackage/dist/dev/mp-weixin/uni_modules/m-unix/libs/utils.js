"use strict";
const common_vendor = require("../../../common/vendor.js");
function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
  let d;
  if (typeof date === "number") {
    d = new Date(date);
  } else {
    d = date;
  }
  const year = d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hour = padZero(d.getHours());
  const minute = padZero(d.getMinutes());
  const second = padZero(d.getSeconds());
  let result = format;
  result = result.replace("YYYY", String(year));
  result = result.replace("MM", month);
  result = result.replace("DD", day);
  result = result.replace("HH", hour);
  result = result.replace("mm", minute);
  result = result.replace("ss", second);
  return result;
}
function padZero(num) {
  return num < 10 ? "0" + num : String(num);
}
function debounce(func, wait = 300) {
  let timeout = null;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
function throttle(func, wait = 300) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (common_vendor.UTS.isInstanceOf(obj, Date)) {
    return new Date(obj.getTime());
  }
  if (common_vendor.UTS.isInstanceOf(obj, Array)) {
    return obj.map((item = null) => {
      return deepClone(item);
    });
  }
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isObject(value = null) {
  return typeof value === "object" && value !== null;
}
function isArray(value = null) {
  return Array.isArray(value);
}
function isFunction(value = null) {
  return typeof value === "function";
}
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debounce,
  deepClone,
  formatDate,
  getRandom,
  isArray,
  isFunction,
  isObject,
  padZero,
  throttle
}, Symbol.toStringTag, { value: "Module" }));
exports.utils = utils;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/m-unix/libs/utils.js.map
