import { fromJS } from 'immutable';
import actionTrio from 'utils/actionTrio';
import { isNull } from 'lodash';

const PERFORM_SEARCH = actionTrio('beanstalk-movie-search/search/PERFORM_SEARCH');

const initialState = {
  query: null,
  movies: null,
  total: null,
};

export default function reducer(stateObj = initialState, action = {}) {
  const state = fromJS(stateObj);
  switch (action.type) {
    case PERFORM_SEARCH.BEGIN:
      return state
        .set('movies', null)
        .set('query', action.payload.query);
    case PERFORM_SEARCH.SUCCESS:
      const movies = fromJS(action.result.movies);
      return state.set('movies', movies).set('total', action.result.total);
    default:
      return state;
  }
}

export function currentQuery(state: Object) {
  return fromJS(state).get('query');
}

export function performSearch(query: string, page = 1) {
  return {
    types: PERFORM_SEARCH.trio,
    promise: client => client.get('/search', {params: {q: query, page}}),
    payload: {query}
  };
}

export function isLoaded(state: Object) {
  return !isNull(fromJS(state).get('movies'));
}
