const inquirer = require('inquirer');
const readJson = require('./readJson');
const rmdir = require('rimraf').sync;
const _ = require('highland');
const vinyl = require('vinyl-fs');
const clone = require('nodegit').Clone.clone;
const transform = require('./transform');

const getDataInput = (options) => {
  return new Promise (resolve => {
    inquirer.prompt(options, resolve);
  });
}

const processFiles = (data) => {
  return new Promise((resolve, reject) => {
    _(vinyl.src('__tmp__/template/**/*')
      .pipe(transform(data))
      .pipe(vinyl.dest('./')))
      .apply(() => resolve());
  });
};

const rmoveTmpDir = () => rmdir('__tmp__');

module.exports = (repo) => {
  clone(`https://github.com/${repo}`, "__tmp__", null)
    .then(() => readJson('./__tmp__/options.json'))
    .then(getDataInput)
    .then(processFiles)
    .then(rmoveTmpDir)
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};
