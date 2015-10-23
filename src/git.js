import {Clone} from 'nodegit';
import _ from 'highland';


export const clone = repo =>
  _(Clone.clone(`https://github.com/${repo}`, "__tmp__", null));
