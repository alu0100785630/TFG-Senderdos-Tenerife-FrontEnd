//In this file we run all functions and they will be exported to index.js

import { generalFunctions } from '../modules/general';
import { menuFunctions } from '../modules/menu';

export const run = ()=> {
  menuFunctions();
  generalFunctions();

  console.log('Main Script Runnning');
}