import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import * as searchActions from 'redux/modules/search';
import { QueryInput } from 'components';
import { pushState } from 'redux-router';
import { reduxForm } from 'redux-form';

function fetchDataDeferred(getState, dispatch) {
  const query = getState().router.location.query.q;
  if (searchActions.currentQuery(getState().search) !== query) {
    return dispatch(searchActions.performSearch(query));
  }
}

function renderMovie(inMovie) {
  return (<div key={inMovie.get('id')}>
    {inMovie.get('title')}
  </div>);
}

@connectData(null, fetchDataDeferred)
@reduxForm({
  form: 'search',
  fields: ['query'],
}, state => ({
  searchState: state.search,
  initialValues: {query: state.search.get('query')}
}), {pushState})
export default class Search extends Component {
  static propTypes = {
    searchState: PropTypes.object,
    fields: PropTypes.object,
    pushState: PropTypes.func,
    initialValues: PropTypes.object,
  };

  render() {
    const queryField = this.props.fields.query;
    const movies = this.props.searchState.get('movies');
    if (!searchActions.isLoaded(this.props.searchState)) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        <QueryInput queryField={queryField} onSubmit={newQuery => {
          this.props.pushState(null, '/search', {q: newQuery});
        }} />
        {movies.map(renderMovie)}
      </div>
    );
  }
}