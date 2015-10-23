import * as git from './src/git';
import {Clone} from 'nodegit';


git.clone('cullophid/webapp-template')
  .map(stuff => {
    console.log('MAP', stuff);
  })
  .errors(err => {
    console.log('Error:', err);
  })
  .done();
