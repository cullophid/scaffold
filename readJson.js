const fs = require('fs');
module.exports = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, result) => {
      if (err) {
        return reject(err);
      }

      try {
        return resolve(JSON.parse(result));
      } catch (e) {
        return reject(e);
      }
    });
  });
}
