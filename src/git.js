import {Clone} from 'nodegit';
import _ from 'highland';


const options = {
  remoteCallbacks: {
    certificateCheck: () => 1
  },
  fetchOpts: {
    callbacks: {
      certificateCheck: () => 1
    }
  }
};

export const clone = repo =>
  _(Clone.clone(`http://github.com/${repo}`, "__tmp__", options));
