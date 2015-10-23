'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodegit = require('nodegit');

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

var options = {
  remoteCallbacks: {
    certificateCheck: function certificateCheck() {
      return 1;
    }
  },
  fetchOpts: {
    callbacks: {
      certificateCheck: function certificateCheck() {
        return 1;
      }
    }
  }
};

var clone = function clone(repo) {
  return (0, _highland2['default'])(_nodegit.Clone.clone('http://github.com/' + repo, "__tmp__", options));
};
exports.clone = clone;