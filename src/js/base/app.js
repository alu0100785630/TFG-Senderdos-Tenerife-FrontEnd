//In this file we run all functions and they will be exported to index.js

import * as generalFunctions from '../modules/general';
import { menuFunctions } from '../modules/menu';
import { paginate } from '../modules/pagination';
import { loginUser } from '../modules/login';
import { logOutUser } from '../modules/login';
import { registerUser } from '../modules/login';
import { dynamicSearch } from '../modules/search';
import { addReview } from '../modules/add_review';

export const run = ()=> {
  menuFunctions();
  paginate();
  dynamicSearch();
  generalFunctions.clickFunctions();
  generalFunctions.greetingFunction();
  generalFunctions.senderoReviews();
  generalFunctions.mapRender();

  loginUser();
  logOutUser();
  registerUser();

  addReview();

  console.log('Main Script Runnning | App started');
}