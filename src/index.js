import inquirer from 'inquirer';
import log from './log';
import readYml from './yaml';
import {sync as rmdir} from 'rimraf';
import _ from 'highland';
import vinyl from 'vinyl-fs';
import * as git from './git';
import transform from './transform';

const getDataInput = options => {
  return _(new Promise(resolve => {
    inquirer.prompt(options, resolve);
  }));
};

const processFiles = data => {
  return _(vinyl.src('__tmp__/template/**/*'))
    .map(transform(data))
    .through(vinyl.dest('./'));
};

const removeTmpDir = () => rmdir('__tmp__');

export default repo => {
  return git.clone(repo)
    .flatMap(() => readYml('./__tmp__/options.yml'))
    .flatMap(getDataInput)
    .flatMap(processFiles)
    .map(removeTmpDir)
    .errors(log('Error:'))
    .done(() => true);
};
