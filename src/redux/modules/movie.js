import actionTrio from 'utils/actionTrio';
import { fromJS } from 'immutable';

const LOAD = actionTrio('beanstalk-movie-search/movie/LOAD');

// id -> movie
const initialState = {};

export default function reducer(stateObj = initialState, action = {}) {
  const state = fromJS(stateObj);

  switch (action.type) {
    case LOAD.SUCCESS:
      return state.set(action.payload.id, fromJS(action.result));
    default:
      return state;
  }
}

export function isLoaded(state, id) {
  return Boolean(state.get(id));
}

export function load(id) {
  return {
    types: LOAD.trio,
    promise: client => client.get(`movies/${id}`),
    payload: {id}
  };
}
