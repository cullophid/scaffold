'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readFile = function _readFile(path) {
  return _highland2['default'].wrapCallback(_fs2['default'].readFile)(path, 'utf8');
};

exports['default'] = function (path) {
  return _readFile(path).map(_jsYaml2['default'].safeLoad);
};

module.exports = exports['default'];