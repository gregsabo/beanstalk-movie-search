import { fromJS } from 'immutable';
import actionTrio from 'utils/actionTrio';
import { isNull } from 'lodash';

const PERFORM_SEARCH = actionTrio('beanstalk-movie-search/search/PERFORM_SEARCH');

const initialState = {
  query: null,
  movies: null,
  total: null,
  page: null,
};

export default function reducer(stateObj = initialState, action = {}) {
  const state = fromJS(stateObj);
  switch (action.type) {
    case PERFORM_SEARCH.BEGIN:
      return state
        .set('movies', null)
        .set('query', action.payload.query)
        .set('page', action.payload.page);
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
    payload: {query, page}
  };
}

export function isLoaded(stateObj = {}, query, page) {
  const state = fromJS(stateObj);
  if (isNull(state.get('movies'))) {
    return false;
  }
  if (state.get('query') !== query) {
    return false;
  }
  if (state.get('page') !== page) {
    return false;
  }
  return true;
}

export function totalPages(state: Object) {
  if (isNull(state.get('total'))) {
    return null;
  }
  return Math.floor(state.get('total') / 30) + 1;
}
