"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (key) {
  return function (value) {
    console.log(key, value);
    return value;
  };
};

module.exports = exports["default"];