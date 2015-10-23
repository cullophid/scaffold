const rmdir = require('rimraf').sync;
const _ = require('highland');
const vinyl = require('vinyl-fs');
const clone = require('nodegit').Clone.clone;
const transform = require('./transform');
const data = {
  appName: 'hello',
  appDescription: ' AAAAAwesome'
}

clone('https://github.com/cullophid/webapp-template', "__tmp__", null)
  .then(() => {
    return new Promise((resolve, reject) => {
      _(vinyl.src('__tmp__/template/**/*')
        .pipe(transform(data))
        .pipe(vinyl.dest('app')))
        .apply(() => resolve());
    });
  })
  .then( () => {
    rmdir('__tmp__');
  })
  .catch(err => {
    console.log(err);
  })
