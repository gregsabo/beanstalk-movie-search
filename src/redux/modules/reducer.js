import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import search from './search';

export default combineReducers({
  router: routerStateReducer,
  search,
  auth,
  form,
});
