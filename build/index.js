'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _yaml = require('./yaml');

var _yaml2 = _interopRequireDefault(_yaml);

var _rimraf = require('rimraf');

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _git = require('./git');

var git = _interopRequireWildcard(_git);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var getDataInput = function getDataInput(options) {
  return (0, _highland2['default'])(new Promise(function (resolve) {
    _inquirer2['default'].prompt(options, resolve);
  }));
};

var processFiles = function processFiles(data) {
  return (0, _highland2['default'])(_vinylFs2['default'].src('__tmp__/template/**/*')).map((0, _transform2['default'])(data)).through(_vinylFs2['default'].dest('./'));
};

var removeTmpDir = function removeTmpDir() {
  return (0, _rimraf.sync)('__tmp__');
};

exports['default'] = function (repo) {
  return git.clone(repo).flatMap(function () {
    return (0, _yaml2['default'])('./__tmp__/options.yml');
  }).flatMap(getDataInput).flatMap(processFiles).map(removeTmpDir).errors((0, _log2['default'])('Error:')).done(function () {
    return true;
  });
};

module.exports = exports['default'];