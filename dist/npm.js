// Generated by CoffeeScript 1.10.0
(function() {
  var npm;

  npm = require('npm');

  exports.init = function() {
    return new Promise(function(resolve, reject) {
      return npm.load({}, function(err) {
        if (err) {
          return reject(err);
        }
        return npm.init(function(err) {
          if (err) {
            return reject(err);
          } else {
            return resolve();
          }
        });
      });
    });
  };

}).call(this);