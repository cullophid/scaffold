'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodegit = require('nodegit');

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

var clone = function clone(repo) {
  return (0, _highland2['default'])(_nodegit.Clone.clone('https://github.com/' + repo, "__tmp__", null));
};
exports.clone = clone;