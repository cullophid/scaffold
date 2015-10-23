import _ from 'highland';
import yaml from 'js-yaml';
import fs from 'fs';

const _readFile = path => _.wrapCallback(fs.readFile)(path, 'utf8');

export default path => _readFile(path)
  .map(yaml.safeLoad);
