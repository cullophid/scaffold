const rmdir = require('rimraf').sync;
const _ = require('highland');
const vinyl = require('vinyl-fs');
const clone = require('nodegit').Clone.clone;
const transform = require('./transform');

const data = {
  appName: 'hello',
  appDescription: ' AAAAAwesome'
};

const processFiles = () => {
  return new Promise((resolve, reject) => {
    _(vinyl.src('__tmp__/template/**/*')
      .pipe(transform(data))
      .pipe(vinyl.dest('app')))
      .apply(() => resolve());
  });
};

const rmoveTmpDir = () => rmdir('__tmp__');

module.exports = (repo) => {
  clone(`https://github.com/${repo}`, "__tmp__", null)
    .then(processFiles)
    .then(rmoveTmpDir)
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};
