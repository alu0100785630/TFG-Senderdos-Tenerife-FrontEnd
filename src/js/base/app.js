//In this file we run all functions and they will be exported to index.js

import * as generalFunctions from '../modules/general';
import { menuFunctions } from '../modules/menu';

export const run = ()=> {
  menuFunctions();
  generalFunctions.greetingFunction();
  generalFunctions.senderoReviews();

  console.log('Main Script Runnning | App started');
}