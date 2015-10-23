'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var FILE_PATTERN = /^__/; // used to identify template files
var fileName = _ramda2['default'].compose(_ramda2['default'].last, _ramda2['default'].split('/'), _ramda2['default'].last, _ramda2['default'].prop('history'));
var shouldCompile = _ramda2['default'].compose(_ramda2['default'].test(FILE_PATTERN), fileName);

// generate a new path for the history
var newPath = _ramda2['default'].compose(_ramda2['default'].join('/'), _ramda2['default'].over(_ramda2['default'].lensIndex(-1), _ramda2['default'].replace(FILE_PATTERN, '')), _ramda2['default'].split('/'), _ramda2['default'].last);

var render = function render(data) {
  return function (source) {
    return _handlebars2['default'].compile(source)(data);
  };
};

// pass the value of the contents buffer through handlebars
var transformContents = function transformContents(data, contents) {
  return _ramda2['default'].compose(function (x) {
    return new Buffer(x);
  }, render(data), function (x) {
    return x.toString();
  })(contents);
};

exports['default'] = function (data) {
  return function (file) {
    if (!file.contents || !shouldCompile(file)) {
      return file;
    }

    file.history = [].concat(_toConsumableArray(file.history), [newPath(file.history)]);
    file.contents = transformContents(data, file.contents);
    return file;
  };
};

module.exports = exports['default'];