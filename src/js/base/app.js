//In this file we run all functions and they will be exported to index.js

import * as generalFunctions from '../modules/general';
import { menuFunctions } from '../modules/menu';
import { paginate } from '../modules/pagination';

export const run = ()=> {
  menuFunctions();
  paginate();
  generalFunctions.greetingFunction();
  generalFunctions.senderoReviews();
  generalFunctions.mapRender();

  console.log('Main Script Runnning | App started');
}