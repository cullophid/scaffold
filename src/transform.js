import Handlebars from 'handlebars';
import R from 'ramda';

const FILE_PATTERN = /^__/; // used to identify template files
const fileName = R.compose(R.last, R.split('/'), R.last, R.prop('history'));
const shouldCompile = R.compose(R.test(FILE_PATTERN), fileName);

// generate a new path for the history
const newPath = R.compose(
  R.join('/'),
  R.over(R.lensIndex(-1), R.replace(FILE_PATTERN, '')),
  R.split('/'),
  R.last
);

const render = data => source => Handlebars.compile(source)(data);

// pass the value of the contents buffer through handlebars
const transformContents = (data, contents) =>
  R.compose(x => new Buffer(x), render(data), x => x.toString())(contents);

export default data => file => {
  if (!file.contents || !shouldCompile(file)) {
    return file;
  }

  file.history = [...file.history, newPath(file.history)];
  file.contents = transformContents(data, file.contents);
  return file;
};