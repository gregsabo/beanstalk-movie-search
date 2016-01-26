import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
});
