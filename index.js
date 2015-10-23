const vinyl = require('vinyl-fs');
const transform = require('./transform');
const data = {
  name: 'hello'
}

vinyl.src('template/**/*')
  .pipe(transform(data))
  .pipe(vinyl.dest('app'));
